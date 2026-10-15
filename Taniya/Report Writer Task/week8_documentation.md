# Week 3 — Delivery & Governance

**Tools:** Power BI Service, SSAS, Microsoft Fabric (Warehouse), SAP BusinessObjects (overview), Data Storytelling
**Deliverables:** Published report, scheduled refresh, and a Report Definition Document

---

## 1. Objective
Move the report from desktop to a governed, shared, automatically refreshed environment, and document metric logic for future maintainers.

## 2. Publishing & Sharing in Power BI Service

### Steps
1. In Power BI Desktop: **Home → Publish → select workspace**
2. In the Service, open the workspace and confirm the semantic model + report exist
3. Configure **data source credentials** (Settings → Semantic model → Data source credentials)
4. Set up **scheduled refresh** (Settings → Scheduled refresh → On; pick frequency and time zone)
5. Share via:
   - Workspace roles (Admin / Member / Contributor / Viewer)
   - Report share link
   - **Power BI App** (recommended for wide audiences)

### Workspace Roles
| Role | Can do |
|---|---|
| Admin | Everything, including manage access |
| Member | Edit content, share, publish apps |
| Contributor | Create/edit content, cannot share |
| Viewer | View only |

### Scheduled Refresh Setup
| Setting | Value (example) |
|---|---|
| Data source | Sample Excel/CSV on OneDrive or SharePoint (no gateway needed) |
| Frequency | Daily |
| Time | 06:00 (local time zone) |
| Failure notification | Email dataset owner |

> **Note:** a local file or on-premises SQL source requires an **on-premises data gateway**. Cloud sources (OneDrive, SharePoint, Azure SQL, Fabric) do not.

## 3. SSAS and Power BI

| Mode | Description | When to use |
|---|---|---|
| Import | Data copied into Power BI | Small/medium data, fastest visuals |
| DirectQuery | Queries source live | Large data / near real-time |
| Live Connection | Connects to an SSAS Tabular / Azure AS model | Centralized enterprise semantic model |

**Key points**
- SSAS Tabular holds the *semantic layer* (tables, relationships, measures) centrally; many reports reuse it.
- Benefit: "one version of truth" and consistent KPI definitions.
- Power BI semantic models are the cloud-native equivalent, and Fabric is where Microsoft is consolidating these workloads.

## 4. Fabric & Data Warehouse (Overview)
- **Fabric Warehouse**: T-SQL, fully managed, stored in OneLake as Delta/Parquet
- **Lakehouse vs. Warehouse**: Lakehouse = Spark/files + tables; Warehouse = T-SQL-first, multi-table transactions
- Typical flow: Source → Data Factory pipeline → Lakehouse/Warehouse → Semantic model → Power BI report

## 5. SAP BusinessObjects (Overview)
| Component | Purpose |
|---|---|
| Universe Design Tool / IDT | Semantic layer over databases |
| Web Intelligence (WebI) | Ad-hoc and scheduled reports |
| Crystal Reports | Pixel-perfect formatted reports |
| CMC (Central Management Console) | Administration, security, scheduling |

_Comparison note:_ BusinessObjects is a legacy-enterprise reporting suite; Power BI paginated reports play a similar role to Crystal/WebI for formatted output.

## 6. Data Storytelling Framework
1. **Context**: who is the audience and what decision do they need to make?
2. **Insight**: one headline finding per page
3. **Visual choice**: simplest chart that shows the comparison
4. **Narrative flow**: Situation → Complication → Resolution
5. **Call to action**: state the recommended next step on the page

Checklist: remove chart junk, use color for emphasis only, write action titles ("West margin fell 4 pts", not "Margin by Region").

---

## 7. Report Definition Document (Template)

**Report name:** Superstore Sales Performance
**Owner:** _your name_ | **Version:** 1.0 | **Last updated:** _date_
**Source:** Superstore dataset (sample Excel/CSV) | **Refresh:** Daily at 06:00

### Purpose
This report gives sales leadership a single view of revenue, profitability, and growth across regions, segments, and product categories, so they can identify under-performing areas and monitor trends over time.

### Metric Definitions

| Metric | Business Definition | Calculation Logic | DAX |
|---|---|---|---|
| Total Sales | Total revenue from all orders in the selected filter context | Sum of the Sales column | `SUM(FactOrders[Sales])` |
| Total Profit | Net profit after cost and discounts | Sum of the Profit column | `SUM(FactOrders[Profit])` |
| Profit Margin % | Share of sales retained as profit | Total Profit ÷ Total Sales; blank-safe division | `DIVIDE([Total Profit],[Total Sales])` |
| Order Count | Number of unique orders | Distinct count of Order ID | `DISTINCTCOUNT(FactOrders[Order ID])` |
| Sales YTD | Cumulative sales from Jan 1 of the selected year to the selected date | Running total reset each calendar year | `TOTALYTD([Total Sales], DimDate[Date])` |
| Sales PY | Sales for the same period in the previous year | Shifts date filter back one year | `CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date]))` |
| Sales YoY % | Growth versus prior year | (Sales − Sales PY) ÷ Sales PY | `DIVIDE([Total Sales]-[Sales PY],[Sales PY])` |

### Maintenance Notes
- Measures live in the `_Measures` table; do not edit calculated logic without updating this document.
- Date table is generated with `CALENDARAUTO()` and marked as the model's date table.
- If a new region or category is added, no model change is needed; refresh only.
- Known limitation: YoY returns blank for the first year of data.

### Change Log
| Version | Date | Change | Author |
|---|---|---|---|
| 1.0 | _date_ | Initial release | _name_ |

---

## 8. Governance Checklist
- [ ] Report certified/endorsed (Promoted or Certified)
- [ ] Sensitivity label applied
- [ ] Dev / Test / Prod workspace separation considered
- [ ] Refresh failure alerts configured
- [ ] Owner and contact listed on the report

## 9. Repository Files
```
/week3
  ├── report_definition.md
  ├── refresh_setup_screenshots/
  └── Superstore_Dashboard.pbix
```
