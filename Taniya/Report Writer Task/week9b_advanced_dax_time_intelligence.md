# Week 4 (Part 2) — Advanced DAX: Time Intelligence & Dynamic Segmentation

**Tools:** Power BI Desktop / Fabric semantic model, DAX Studio (optional)
**Deliverable:** A reusable library of time-intelligence and segmentation measures powering the geospatial dashboard

---

## 1. Prerequisites
- A dedicated **Date table**, contiguous, covering all dates, marked as Date table
- Relationship: `fact_orders[order_date]` → `dim_date[date]`

```dax
dim_date =
ADDCOLUMNS (
    CALENDAR ( DATE ( 2020, 1, 1 ), DATE ( 2026, 12, 31 ) ),
    "Year", YEAR ( [Date] ),
    "Quarter", "Q" & QUARTER ( [Date] ),
    "Month No", MONTH ( [Date] ),
    "Month", FORMAT ( [Date], "mmm" ),
    "Year-Month", FORMAT ( [Date], "yyyy-MM" )
)
```
> In a Fabric Lakehouse/Direct Lake model, build the date table in the Lakehouse (Spark/SQL) instead of a DAX calculated table, since Direct Lake does not support calculated tables/columns that reference Direct Lake tables.

## 2. Base Measures
```dax
Total Sales   = SUM ( fact_orders[sales] )
Total Profit  = SUM ( fact_orders[profit] )
Margin %      = DIVIDE ( [Total Profit], [Total Sales] )
```

## 3. Time Intelligence Measures

| Measure | DAX |
|---|---|
| Sales YTD | `TOTALYTD ( [Total Sales], dim_date[Date] )` |
| Sales QTD | `TOTALQTD ( [Total Sales], dim_date[Date] )` |
| Sales MTD | `TOTALMTD ( [Total Sales], dim_date[Date] )` |
| Sales PY | `CALCULATE ( [Total Sales], SAMEPERIODLASTYEAR ( dim_date[Date] ) )` |
| YoY % | `DIVIDE ( [Total Sales] - [Sales PY], [Sales PY] )` |
| Sales PM (prior month) | `CALCULATE ( [Total Sales], DATEADD ( dim_date[Date], -1, MONTH ) )` |
| MoM % | `DIVIDE ( [Total Sales] - [Sales PM], [Sales PM] )` |

```dax
-- Rolling 3-month sales
Sales R3M =
CALCULATE (
    [Total Sales],
    DATESINPERIOD ( dim_date[Date], MAX ( dim_date[Date] ), -3, MONTH )
)

-- Moving average (3 months)
Sales 3M Avg = DIVIDE ( [Sales R3M], 3 )

-- Year-to-date vs prior year-to-date
Sales PYTD =
CALCULATE ( [Sales YTD], SAMEPERIODLASTYEAR ( dim_date[Date] ) )

YTD Growth % = DIVIDE ( [Sales YTD] - [Sales PYTD], [Sales PYTD] )

-- Show values only up to the last date with data
Sales YTD (to last sale) =
VAR LastSaleDate = MAX ( fact_orders[order_date] )
RETURN
    IF ( MAX ( dim_date[Date] ) <= LastSaleDate, [Sales YTD] )
```

### Dynamic Time-Period Selector (Calculation Group-style with a disconnected table)
```dax
-- Disconnected table: Period Selector with values "MTD","QTD","YTD","Rolling 3M"
Selected Period Sales =
SWITCH (
    SELECTEDVALUE ( 'Period Selector'[Period], "YTD" ),
    "MTD",        [Sales MTD],
    "QTD",        [Sales QTD],
    "YTD",        [Sales YTD],
    "Rolling 3M", [Sales R3M]
)
```

## 4. Dynamic Segmentation

**Goal:** classify territories/customers into bands based on a live measure and let users change the band thresholds.

### 4.1 Static banding with SWITCH
```dax
Territory Performance Band =
VAR s = [Total Sales]
RETURN
    SWITCH (
        TRUE (),
        s >= 500000, "High",
        s >= 200000, "Medium",
        "Low"
    )
```

### 4.2 Dynamic segmentation with a disconnected segment table
```dax
-- Table: Segments (disconnected)
Segments =
DATATABLE (
    "Segment", STRING,
    "Min",     INTEGER,
    "Max",     INTEGER,
    {
        { "Low",    0,      200000 },
        { "Medium", 200000, 500000 },
        { "High",   500000, 99999999 }
    }
)

-- Count territories in the selected segment
Territories in Segment =
VAR MinV = MIN ( Segments[Min] )
VAR MaxV = MAX ( Segments[Max] )
RETURN
    COUNTROWS (
        FILTER (
            VALUES ( dim_geography[territory] ),
            VAR s = [Total Sales]
            RETURN s >= MinV && s < MaxV
        )
    )

-- Sales that belong to territories in the selected segment
Sales in Segment =
VAR MinV = MIN ( Segments[Min] )
VAR MaxV = MAX ( Segments[Max] )
RETURN
    SUMX (
        VALUES ( dim_geography[territory] ),
        VAR s = [Total Sales]
        RETURN IF ( s >= MinV && s < MaxV, s )
    )
```

### 4.3 What-If parameter threshold
Create a **What-If parameter** (Modeling → New parameter) named `High Threshold` (range 100k–1M, step 50k):

```dax
Is High Territory =
IF ( [Total Sales] >= [High Threshold Value], "High", "Other" )
```

### 4.4 Conditional formatting by segment
Use **Format → Conditional formatting → Rules** on the map color, or a measure returning hex colors:
```dax
Band Color =
SWITCH ( [Territory Performance Band], "High", "#2E7D32", "Medium", "#F9A825", "#C62828" )
```

## 5. Using the Measures in the Geospatial Dashboard
| Visual | Measure |
|---|---|
| Shape Map color saturation | `Total Sales` or `Margin %` |
| Shape Map tooltip | `YoY %`, `Sales YTD`, `Territory Performance Band` |
| KPI cards | `Sales YTD`, `YTD Growth %`, `MoM %` |
| Line chart | `Total Sales`, `Sales PY`, `Sales 3M Avg` |
| Slicer | `Period Selector` and `Segments[Segment]` |

## 6. Testing & Validation
- [ ] Compare YTD for one territory against a manual Excel/SQL calculation
- [ ] Confirm PY is blank (not zero) for the first year
- [ ] Test with Year, Quarter, and Month slicers and in a matrix with Month rows
- [ ] Review performance in **Performance Analyzer** and **DAX Studio**

## 7. Common Pitfalls
| Issue | Cause | Fix |
|---|---|---|
| Time intelligence returns wrong values | Date table not marked / has gaps | Mark as date table, make contiguous |
| `SAMEPERIODLASTYEAR` blank | Relationship on datetime, not date | Use a date-only key |
| Segments don't filter facts | Disconnected table is intentional | Use measures, not relationships |
| Slow measures | Iterating high-cardinality columns | Use variables, reduce iterator scope |

## 8. Learnings
- Time intelligence depends on a clean Date table
- Variables (`VAR`) make DAX faster and more readable
- Disconnected tables enable user-driven what-if and segmentation without changing the model

## 9. Repository Files
```
/week4
  └── dax/
      ├── time_intelligence.dax
      └── dynamic_segmentation.dax
```
