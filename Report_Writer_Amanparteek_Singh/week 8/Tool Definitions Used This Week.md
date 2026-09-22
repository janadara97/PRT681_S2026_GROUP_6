## Glossary — Easy Definitions

**Lakehouse (Fabric Lakehouse)**
Think of it as a big cloud storage folder that also acts like a database. It's cheap and flexible like a "data lake" (can hold any kind of file), but organized enough to run queries and reports like a proper database. It's where your raw and processed data lives in Fabric.

**OneLake**
The single shared storage space that sits underneath everything in Microsoft Fabric — like one giant hard drive that all Fabric tools (pipelines, lakehouses, Power BI, etc.) automatically read and write to, so you don't have to move data between separate storage systems.

**GeoJSON**
A simple text/JSON file format for describing map shapes — points (like a store location), lines (like a route), or polygons (like a state's outline). Power BI's Shape Map visual uses it to know the exact boundary to draw and color in.

**ArcGIS**
A professional mapping software platform (made by Esri) used for serious geographic analysis — things like layering multiple maps, measuring distances, or analyzing spatial patterns. It's an alternative/more powerful option compared to Power BI's built-in maps.

**Direct Lake**
A mode where Power BI reads data straight out of OneLake/the Lakehouse without copying or importing it first. It's fast like importing data, but always up to date like a live connection — best of both.

**Semantic Model**
The "business layer" on top of your raw tables — it defines relationships (e.g., Orders link to Customers), plus calculations (measures), so Power BI reports have clean, ready-to-use data instead of raw database tables.

**DAX**
The formula language used inside Power BI to create calculations, like "Total Sales" or "Year-over-Year Growth" — similar in spirit to Excel formulas, but built for reporting models.
