# Week 1 — Reporting Fundamentals

**Tools:** Excel (Advanced Formulas, PivotTables, PivotCharts), SQL, Power BI (intro)
**Dataset:** Superstore Sales (Orders sheet)
**Deliverable:** Static Excel report answering 5 stakeholder questions

---

## 1. Objective
Build a static Excel report from the Superstore dataset using PivotTables and PivotCharts, and validate the numbers with SQL queries.

## 2. Dataset Overview

| Column | Description |
|---|---|
| Order ID / Order Date / Ship Date | Order identifiers and dates |
| Customer ID / Segment | Customer and segment (Consumer, Corporate, Home Office) |
| Country / State / City / Postal Code / Region | Geography |
| Category / Sub-Category / Product Name | Product hierarchy |
| Sales / Quantity / Discount / Profit | Measures |

## 3. Data Preparation Checklist
- [ ] Convert the data range to an Excel Table (`Ctrl + T`) and name it `tblOrders`
- [ ] Confirm date columns are true dates, not text
- [ ] Remove duplicates and check for blanks
- [ ] Add helper columns with formulas:
  - `Year` = `=YEAR([@[Order Date]])`
  - `Month` = `=TEXT([@[Order Date]],"mmm")`
  - `Profit Margin` = `=IFERROR([@Profit]/[@Sales],0)`
  - `Ship Days` = `=[@[Ship Date]]-[@[Order Date]]`

## 4. The 5 Stakeholder Questions

| # | Stakeholder | Question | Pivot Setup | Chart |
|---|---|---|---|---|
| 1 | Sales Director | What are total sales and profit by year? | Rows: Year; Values: Sum of Sales, Sum of Profit | Clustered column |
| 2 | Regional Head | Which regions perform best and worst on profit? | Rows: Region; Values: Sum of Profit | Bar chart (sorted) |
| 3 | Product Manager | Which sub-categories lose money? | Rows: Sub-Category; Values: Sum of Profit; filter negatives | Bar chart |
| 4 | Marketing | How does discount level relate to profit margin? | Rows: Discount (grouped); Values: Avg Profit Margin | Line chart |
| 5 | Operations | What is average shipping time by ship mode? | Rows: Ship Mode; Values: Average of Ship Days | Column chart |

Add **Slicers** (Region, Segment, Year) and a **Timeline** slicer on Order Date.

## 5. Formula Practice (Advanced Excel)
```excel
=XLOOKUP(A2, tblCustomers[Customer ID], tblCustomers[Customer Name], "Not found")
=SUMIFS(tblOrders[Sales], tblOrders[Region], "West", tblOrders[Year], 2017)
=IF(AND([@Profit]<0,[@Discount]>0.3),"Review","OK")
=LET(s, SUM(tblOrders[Sales]), p, SUM(tblOrders[Profit]), p/s)
=INDEX(tblOrders[Product Name], MATCH(MAX(tblOrders[Sales]), tblOrders[Sales], 0))
```

## 6. SQL Practice (to validate the pivots)
```sql
-- Q1: Sales and profit by year
SELECT YEAR(order_date) AS yr, SUM(sales) AS total_sales, SUM(profit) AS total_profit
FROM orders
GROUP BY YEAR(order_date)
ORDER BY yr;

-- Q2: Profit by region
SELECT region, SUM(profit) AS total_profit
FROM orders
GROUP BY region
ORDER BY total_profit DESC;

-- Q3: Loss-making sub-categories
SELECT sub_category, SUM(profit) AS total_profit
FROM orders
GROUP BY sub_category
HAVING SUM(profit) < 0;

-- Q4: Average ship days by ship mode
SELECT ship_mode, AVG(DATEDIFF(day, order_date, ship_date)) AS avg_ship_days
FROM orders
GROUP BY ship_mode;

-- Q5: Top 10 customers by sales (window function)
SELECT TOP 10 customer_name, SUM(sales) AS total_sales,
       RANK() OVER (ORDER BY SUM(sales) DESC) AS sales_rank
FROM orders
GROUP BY customer_name;
```

## 7. Report Layout
1. **Summary sheet** — KPI cards (Total Sales, Profit, Margin, Orders) built from `GETPIVOTDATA`
2. **Analysis sheets** — one per question (pivot + chart + 2-line insight)
3. **Notes sheet** — data source, refresh date, assumptions

## 8. Key Insights Template
| Question | Finding | Recommended Action |
|---|---|---|
| Q1 | _e.g., Sales grew X% YoY_ | |
| Q2 | _e.g., Central region has the lowest margin_ | |
| Q3 | _e.g., Tables lose money at high discounts_ | |
| Q4 | _e.g., Margin drops sharply above 30% discount_ | |
| Q5 | _e.g., Standard Class averages 5 days_ | |

## 9. Learnings
- Pivot design, calculated fields, grouping, slicers
- Difference between row context in Excel formulas and aggregation in SQL
- Why Excel is good for ad-hoc analysis but limited for refresh and sharing (motivation for Power BI)

## 10. Repository Files
```
/week1
  ├── Superstore_Report.xlsx
  ├── queries.sql
  └── screenshots/
```
