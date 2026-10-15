# Week 5 (Part 1) — Paginated Reports: Monthly Operational Audit (.rdl)

**Tools:** Power BI Report Builder, Power BI Service / Fabric, SSRS (concepts), SAP BusinessObjects (comparison)
**Deliverable:** Pixel-perfect monthly operational audit report (`.rdl`), published and scheduled for PDF/Excel delivery

---

## 1. Objective
Create a printable, parameter-driven paginated report for monthly operational auditing, and distribute it automatically as PDF/Excel.

## 2. When to Use Paginated Reports
| Use case | Interactive Power BI | Paginated (.rdl) |
|---|---|---|
| Exploration, dashboards | ✅ | ❌ |
| Invoices, statements, audit packs | ❌ | ✅ |
| Exact page layout, repeating headers | Limited | ✅ |
| Export to PDF/Excel/Word | Limited | ✅ Full control |
| Very large detail tables | Limited | ✅ |

Paginated reports replace the classic **SSRS** workload. Comparable tools: Crystal Reports / WebI in BusinessObjects.

> **Licensing note:** publishing paginated reports to the Service requires the workspace to be on a Fabric/Premium capacity (or PPU).

## 3. Report Specification — "Monthly Operational Audit"

| Item | Definition |
|---|---|
| Audience | Operations managers, internal audit |
| Parameters | `Year`, `Month`, `Region` (multi-value) |
| Header | Company name, report title, selected period, run date |
| Section 1 | Summary KPIs: Orders, Sales, Profit, Avg Ship Days, % Late Shipments |
| Section 2 | Detail table grouped by Region → Territory, with subtotals |
| Section 3 | Exceptions list: orders with negative profit or ship days > 7 |
| Footer | Page X of Y, confidentiality notice, report version |

## 4. Build Steps

### Step 1 — Connect to Data
1. Open **Power BI Report Builder** → *Data Sources → Add Power BI Dataset Connection* (choose the Fabric semantic model), or use SQL endpoint of the Lakehouse/Warehouse.
2. Create datasets with a query.

SQL example (Lakehouse SQL endpoint):
```sql
SELECT g.region, g.territory, o.order_id, o.order_date, o.ship_date,
       DATEDIFF(day, o.order_date, o.ship_date) AS ship_days,
       o.sales, o.profit
FROM fact_orders o
JOIN dim_geography g ON o.postal_code = g.postal_code
WHERE YEAR(o.order_date)  = @Year
  AND MONTH(o.order_date) = @Month
  AND g.region IN (@Region);
```

### Step 2 — Parameters
| Parameter | Type | Source |
|---|---|---|
| Year | Integer | Query for available years |
| Month | Integer | Static list (1–12) |
| Region | Text, multi-value | Query: distinct regions |

### Step 3 — Layout
1. Insert a **Table (Tablix)** → group by `Region`, then `Territory`
2. Add group headers/footers with `=Sum(Fields!sales.Value)` subtotals
3. Set **Repeat header rows on each page** (Tablix → Row Groups → Advanced → RepeatOnNewPage = True)
4. Add page breaks between regions (Group Properties → Page Breaks)
5. Insert header/footer text boxes

### Step 4 — Expressions
```vb
' Page footer
="Page " & Globals!PageNumber & " of " & Globals!TotalPages

' Run date
="Generated: " & Format(Globals!ExecutionTime, "dd MMM yyyy HH:mm")

' % Late shipments
=Sum(IIf(Fields!ship_days.Value > 7, 1, 0)) / Count(Fields!order_id.Value)

' Row highlighting for negative profit
=IIf(Fields!profit.Value < 0, "#FDE0E0", "Transparent")
```

### Step 5 — Test
- [ ] Preview with different parameter combinations
- [ ] Export to PDF and check page breaks and widths
- [ ] Export to Excel and check that columns align and headers repeat
- [ ] Set page size/margins (A4 or Letter) and make sure the body width fits

### Step 6 — Publish
**File → Publish → select Fabric/Premium workspace.** Then set credentials for the dataset in the Service.

## 5. Distribution & Automation

| Method | How | Notes |
|---|---|---|
| Email subscription | Report → **Subscribe** → set schedule, recipients, format (PDF/Excel/Word/PPTX), parameters | Per-subscription fixed parameter values |
| Power Automate | Trigger: schedule → action **Export to file for paginated reports** → send email/save to SharePoint | Use this for "bursts" with different parameter values per recipient |
| Paginated report export API | REST API for scripted export | For engineering-led automation |

**Burst pattern:** Excel/SharePoint list of recipients + regions → Power Automate "Apply to each" → export with `Region` parameter → email each manager their own PDF.

> Classic SSRS *data-driven subscriptions* are not natively available in the Power BI Service; Power Automate is the usual replacement.

## 6. Paginated vs. Business Objects (Comparison)
| Feature | Power BI Paginated | BusinessObjects (WebI/Crystal) |
|---|---|---|
| Authoring tool | Report Builder (free) | Web Intelligence / Crystal Reports |
| Data layer | Semantic model / SQL | Universe |
| Scheduling | Subscriptions / Power Automate | CMC scheduling and publications |
| Hosting | Fabric / Power BI Service | On-prem BO server or SAP BI platform |

## 7. Learnings
- Paginated reports are for layout control; interactive reports are for exploration
- Parameters push filtering to the query, making large reports efficient
- Plan for page width early; wide tables break PDF output

## 8. Repository Files
```
/week5
  ├── MonthlyOperationalAudit.rdl
  ├── sample_output/Audit_2026-09.pdf
  └── screenshots/
```
