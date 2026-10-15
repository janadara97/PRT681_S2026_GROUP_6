# Week 4 (Part 1) — Fabric Lakehouse Ingestion & Geospatial Dashboard

**Tools:** Microsoft Fabric (Lakehouse, Direct Lake), Power BI (Shape Map, Azure Maps, Filled Map), ArcGIS, GeoJSON/TopoJSON
**Deliverable:** Interactive geospatial dashboard showing KPIs by territory, sourced from a Fabric Lakehouse

---

## 1. Objective
Ingest a geographic dataset with postal/regional data into a Fabric Lakehouse, then visualize KPIs by territory using custom boundary shapes.

## 2. Key Concepts

| Concept | Meaning |
|---|---|
| Latitude / Longitude | Coordinates (WGS84, EPSG:4326) for point locations |
| Choropleth map | Regions shaded by a metric value |
| Boundary shape | Polygon geometry for a region (state, postcode, territory) |
| GeoJSON | JSON format for geometries and properties |
| TopoJSON | Compressed topology-based format; **required by Power BI Shape Map** |
| Direct Lake | Semantic model reads Delta tables in OneLake directly: import-like speed, no data copy |

## 3. Architecture
```
Postal/Regional CSV ─┐
Superstore Orders  ──┼─► Lakehouse (Files → Delta tables) ─► Semantic Model (Direct Lake) ─► Power BI Report
GeoJSON boundaries ──┘                                              │
                                                        Shape Map / Azure Maps / ArcGIS visual
```

## 4. Step-by-Step

### Step 1 — Create the Lakehouse
1. Fabric workspace (needs a Fabric/trial capacity) → **New → Lakehouse** → name `lh_geo_reporting`
2. In **Files**, create folders: `raw/postal`, `raw/orders`, `raw/geojson`

### Step 2 — Ingest Data
- Upload CSVs via **Get data → Upload files**, or use a Dataflow Gen2 / pipeline Copy activity.
- Load to Delta tables: right-click file → **Load to Tables**.

Notebook alternative (PySpark):
```python
df = spark.read.option("header", True).option("inferSchema", True) \
        .csv("Files/raw/postal/postal_codes.csv")

# Clean
from pyspark.sql import functions as F
df = (df.withColumn("postal_code", F.lpad(F.col("postal_code").cast("string"), 5, "0"))
        .dropDuplicates(["postal_code"]))

df.write.mode("overwrite").format("delta").saveAsTable("dim_geography")
```

### Step 3 — Expected Tables
| Table | Key columns |
|---|---|
| `dim_geography` | postal_code, city, state, region, territory, latitude, longitude |
| `fact_orders` | order_id, order_date, postal_code, sales, profit, quantity |
| `dim_date` | date, year, quarter, month |

### Step 4 — Build the Semantic Model (Direct Lake)
1. Lakehouse → **New semantic model** → select tables
2. Define relationships: `fact_orders[postal_code]` → `dim_geography[postal_code]`; `fact_orders[order_date]` → `dim_date[date]`
3. Set data categories on geography columns (State, Postal Code, Latitude, Longitude)
4. Add measures (see Part 2 document)

> **Direct Lake tip:** if a model falls back to DirectQuery (e.g., due to SQL endpoint security or unsupported features), performance drops. Check the fallback behavior in model settings and define RLS in the semantic model rather than the SQL endpoint.

### Step 5 — Prepare the Boundary Shapes
1. Obtain boundaries (GeoJSON) from an open data source or ArcGIS.
2. Convert GeoJSON → TopoJSON for Shape Map (e.g., with [mapshaper.org](https://mapshaper.org) → export TopoJSON).
3. Make sure a property in the shapes (e.g., `territory_id`) **exactly matches** the values in your data.
4. Simplify geometry (10–20%) to keep the file small.

### Step 6 — Build the Dashboard
| Visual | Configuration |
|---|---|
| **Shape Map** | Add custom TopoJSON via Format → Map settings → Add map; Location = `territory`, Color saturation = `Total Sales` |
| **Filled Map / Azure Maps** | Location = state/postcode, bubble size = Profit |
| **ArcGIS Maps for Power BI** | Reference layers, heat map, drive-time analysis (check tenant availability) |
| KPI cards | Sales, Profit, Margin %, YoY % |
| Bar chart | Top 10 territories |
| Slicers | Year, Region, Category |

**Interaction:** map ↔ bar chart cross-filtering, drill-through to a territory detail page, bookmark for "Map view / Table view".

## 5. Shape Map vs. Other Options
| Option | Pros | Cons |
|---|---|---|
| Shape Map | Custom regions, choropleth | Needs TopoJSON; preview feature limitations |
| Filled Map | Built-in boundaries (country/state/postcode) | Limited custom territories |
| Azure Maps | Rich layers, reference layers (GeoJSON) | Needs tenant setting + Azure Maps enabled |
| ArcGIS | Advanced spatial analytics | May require license for premium features |

## 6. Common Issues
| Problem | Fix |
|---|---|
| Regions not shaded | Names/IDs don't match shape properties; standardize keys |
| Leading zeros lost in postal codes | Store as text, pad in Spark/Power Query |
| Map visual disabled | Admin must enable map/ArcGIS visuals in tenant settings |
| Slow shape rendering | Simplify geometry, reduce polygons |

## 7. Learnings
- Geographic keys must be clean text and match boundary files exactly
- Direct Lake removes scheduled-refresh dependency; the model reads fresh Delta data after transformation
- Choropleths show rate/ratio better than raw totals; normalize when territory size varies

## 8. Repository Files
```
/week4
  ├── data/postal_codes.csv
  ├── geo/territories.topojson
  ├── notebooks/ingest_geography.ipynb
  ├── Geo_Dashboard.pbix
  └── screenshots/
```
