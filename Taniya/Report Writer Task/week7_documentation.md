# Week 2 — Dashboarding & Automation

**Tools:** Power BI Desktop, DAX, Tableau (comparison), Azure/Microsoft Fabric (basics), Excel VBA
**Deliverables:** Interactive Power BI dashboard (3+ DAX measures) and one VBA automation macro

---

## 1. Objective
Convert the Week 1 static Excel report into an interactive Power BI dashboard on a proper data model, and automate one repetitive Excel task with VBA.

## 2. Data Model (Star Schema)

```
        DimDate ──────┐
                      │
DimCustomer ──── FactOrders ──── DimProduct
                      │
                 DimGeography
```

| Table | Type | Key |
|---|---|---|
| FactOrders | Fact | Order ID, Row ID |
| DimDate | Dimension | Date |
| DimCustomer | Dimension | Customer ID |
| DimProduct | Dimension | Product ID |
| DimGeography | Dimension | Postal Code / State |

**Modeling rules followed**
- One-to-many relationships, single direction (dimension → fact)
- Dedicated Date table marked as *Date table*
- Hide foreign keys and raw numeric columns; expose measures only

## 3. Power Query Steps
1. Get Data → Excel/CSV
2. Promote headers, set data types
3. Split into dimension tables (Reference → Remove Duplicates)
4. Add a custom column for `Ship Days`
5. Close & Apply

## 4. DAX Measures

```dax
-- Date table
DimDate = CALENDARAUTO()

-- Base measures
Total Sales  = SUM(FactOrders[Sales])
Total Profit = SUM(FactOrders[Profit])
Profit Margin % = DIVIDE([Total Profit], [Total Sales])
Order Count = DISTINCTCOUNT(FactOrders[Order ID])

-- Time intelligence
Sales YTD = TOTALYTD([Total Sales], DimDate[Date])

Sales PY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date]))

Sales YoY % = DIVIDE([Total Sales] - [Sales PY], [Sales PY])

-- Ranking
Region Rank = RANKX(ALL(DimGeography[Region]), [Total Sales])
```

| Measure | Purpose |
|---|---|
| Total Sales / Profit | Core KPIs |
| Profit Margin % | Profitability |
| Sales YTD | Year-to-date running total |
| Sales YoY % | Growth vs. same period last year |

## 5. Dashboard Layout
| Page | Visuals |
|---|---|
| Overview | KPI cards (Sales, Profit, Margin, YoY %), line chart (Sales vs PY), slicers (Year, Region, Segment) |
| Products | Matrix by Category → Sub-Category, bar chart of profit, scatter (Discount vs Margin) |
| Customers | Top 10 customers, segment donut, Drill-through to customer detail |

**Interactivity:** slicers, cross-filtering, drill-through, bookmarks, tooltips pages

## 6. Tableau Comparison (Second Tool)
| Area | Power BI | Tableau |
|---|---|---|
| Modeling | Strong (relationships + DAX) | Lighter (relationships + LOD calcs) |
| Calculations | DAX | Calculated fields / LOD expressions |
| Cost / ecosystem | Microsoft 365 / Fabric integration | Salesforce ecosystem |
| Visual flexibility | Good | Excellent |
| Learning notes | _add your own_ | _add your own_ |

## 7. Azure / Fabric Basics (Overview)
- **Microsoft Fabric** = unified analytics platform (OneLake, Lakehouse, Warehouse, Data Factory pipelines, Power BI)
- **OneLake**: single storage layer for all workloads, "OneDrive for data"
- **Workspace**: container for items; assigned to a Fabric capacity
- Practice item: create a Fabric workspace and a Lakehouse, upload Superstore CSV

## 8. VBA Automation

**Task automated:** refresh all pivots, format the summary sheet, and export it to PDF.

```vba
Option Explicit

Sub RefreshAndExportReport()
    Dim ws As Worksheet
    Dim pt As PivotTable
    Dim pdfPath As String

    Application.ScreenUpdating = False

    ' 1. Refresh all data connections and pivots
    ThisWorkbook.RefreshAll

    ' 2. Autofit columns on every pivot sheet
    For Each ws In ThisWorkbook.Worksheets
        For Each pt In ws.PivotTables
            pt.TableRange1.Columns.AutoFit
        Next pt
    Next ws

    ' 3. Export Summary sheet to PDF with a dated filename
    pdfPath = ThisWorkbook.Path & "\Superstore_Summary_" & _
              Format(Date, "yyyy-mm-dd") & ".pdf"

    ThisWorkbook.Worksheets("Summary").ExportAsFixedFormat _
        Type:=xlTypePDF, Filename:=pdfPath, Quality:=xlQualityStandard

    Application.ScreenUpdating = True
    MsgBox "Report refreshed and exported to:" & vbCrLf & pdfPath, vbInformation
End Sub
```

**How to use:** save the workbook as `.xlsm` → `Alt + F11` → Insert Module → paste → assign to a button on the Summary sheet.

## 9. Learnings
- Star schema keeps DAX simple and fast
- Measures (not calculated columns) for aggregations
- `CALCULATE` changes filter context; that is the core of DAX
- VBA is good for local desktop tasks; Power Automate / scheduled refresh scale better

## 10. Repository Files
```
/week2
  ├── Superstore_Dashboard.pbix
  ├── dax_measures.dax
  ├── RefreshAndExport.bas
  └── screenshots/
```
