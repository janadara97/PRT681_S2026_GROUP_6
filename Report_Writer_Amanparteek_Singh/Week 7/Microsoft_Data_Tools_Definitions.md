# Tools – Definitions

## SQL Server
SQL Server is a relational database management system developed by Microsoft.  
It is used to store, organize, manage, and retrieve structured data.  
It supports SQL queries, relationships, transactions, security, and data processing.  
It is commonly used in business applications, reporting systems, and data platforms.  

## SQL Server Management Studio (SSMS)
SQL Server Management Studio is a graphical tool used to work with Microsoft SQL Server.  
It allows users to create databases, tables, views, stored procedures, and other database objects.  
It provides an editor for writing and executing SQL queries.  
It is also used for database administration, monitoring, security, and troubleshooting.  

## Microsoft Fabric
Microsoft Fabric is a cloud-based data and analytics platform developed by Microsoft.  
It combines data engineering, data integration, data warehousing, data science, and business intelligence.  
It provides a single environment for storing, processing, analysing, and visualising data.  
It integrates closely with services such as OneLake, Data Factory, Lakehouse, and Power BI.  

## Microsoft Fabric Data Pipeline
A Fabric Data Pipeline is a data integration workflow used to move and process data between different systems.  
It can connect to data sources such as SQL Server, files, cloud storage, and databases.  
Pipelines contain activities such as copying, transforming, and scheduling data movement.  
They are used to automate repeatable ETL and ELT data workflows.  

## Copy Data Activity
Copy Data Activity is a pipeline activity used to transfer data from a source to a destination.  
It can copy data from databases, files, APIs, and other supported systems.  
The activity allows users to define the source, destination, column mapping, and copy settings.  
It is commonly used to load data into a Lakehouse, warehouse, or another database.  

## Microsoft Fabric Lakehouse
A Lakehouse is a data storage and analytics architecture that combines features of a data lake and a data warehouse.  
In Microsoft Fabric, it can store both files and structured tables in OneLake.  
It supports large-scale data engineering, SQL analytics, and Spark-based processing.  
It is designed to provide a central location for storing and analysing different types of data.  

## On-Premises Data Gateway
The On-Premises Data Gateway is software that connects local data sources to Microsoft cloud services.  
It acts as a secure bridge between systems such as a local SQL Server and Microsoft Fabric.  
The gateway allows cloud services to access on-premises data without exposing the database directly to the internet.  
It is commonly used for data refreshes, pipeline connections, and cloud-based reporting.  

## OneLake
OneLake is the unified cloud data storage layer used by Microsoft Fabric.  
It provides one central storage location for data across different Fabric workloads.  
It is designed to reduce duplication and make data easier to share between analytics tools.  
Lakehouses, warehouses, notebooks, and Power BI can all work with data stored in OneLake.  

## Power BI
Power BI is Microsoft’s business intelligence and data visualisation platform.  
It is used to create interactive reports, dashboards, charts, and analytical models.  
It can connect to databases, Lakehouses, Excel files, and many other data sources.  
It helps users turn raw data into meaningful business insights and visual reports.  
