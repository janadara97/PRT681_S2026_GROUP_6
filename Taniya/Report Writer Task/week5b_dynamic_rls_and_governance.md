# Week 5 (Part 2) — Dynamic Row-Level Security, Governance & Administration

**Tools:** Power BI Desktop, Power BI Service, Fabric admin portal, Entra ID (Azure AD), SAP BusinessObjects (comparison)
**Deliverable:** Dynamic RLS ensuring regional managers see only their assigned territories, plus a governance and workspace lifecycle framework

---

## 1. Objective
Secure the geospatial model so each regional manager only sees data (and map shapes) for their assigned territories, and document enterprise governance practices.

## 2. RLS Concepts
| Type | Description | Use when |
|---|---|---|
| Static RLS | Fixed filter per role, e.g. `[Region] = "West"` | Few, rarely changing groups |
| **Dynamic RLS** | Filter uses logged-in user (`USERPRINCIPALNAME()`) and a mapping table | Many users, changing assignments |
| Object-level security (OLS) | Hides tables/columns | Sensitive columns |

## 3. Dynamic RLS Design

### 3.1 Security mapping table
`dim_security` (can live in the Lakehouse or be maintained in SharePoint/Excel):

| user_email | territory |
|---|---|
| alice@company.com | West-01 |
| alice@company.com | West-02 |
| bob@company.com | East-01 |
| carol@company.com | Central-01 |

One user can map to **many** territories; one territory is typically owned by one manager.

### 3.2 Model relationships
```
dim_security ──(territory)──► dim_geography ──► fact_orders
```
- `dim_security[territory]` → `dim_geography[territory]` (one-to-many; filter flows to geography, then to facts)
- Hide `dim_security` from report view.

### 3.3 Define the role (Modeling → Manage roles)
Role name: `RegionalManager`
Table filter on **dim_security**:
```dax
[user_email] = USERPRINCIPALNAME ()
```

**Alternative (single table, no mapping table):** put a `manager_email` column on `dim_geography`:
```dax
[manager_email] = USERPRINCIPALNAME ()
```

### 3.4 Admin / executive access
Create a second role `ExecAll` with no filter (or `TRUE()`), and assign only to executives. Membership in multiple roles is additive (union).

## 4. Testing
**Desktop:** Modeling → **View as** → select role + *Other user* → enter `alice@company.com`.

| Test | Expected |
|---|---|
| Alice views map | Only West-01 and West-02 shaded |
| Alice KPI cards | Totals equal sum of her territories only |
| Bob views same report | Only East-01 |
| User not in `dim_security` | Sees no data (blank) |
| Exec user | Sees all territories |

Also test: slicers, drill-through, and tooltips do not expose other territories; Shape Map should not show hidden regions' values.

## 5. Deployment Steps
1. Publish the model/report to the workspace
2. Semantic model → **Security** → add users or Entra security groups to `RegionalManager`
3. Re-test using **Test as role** in the Service
4. Share the report as an **App** with *Viewer* access (RLS is enforced only for Viewers; Admin, Member, and Contributor roles bypass RLS on the model's workspace)

> **Fabric / Direct Lake note:** define RLS in the semantic model (DAX roles) so Direct Lake mode is preserved. SQL endpoint-level security can force fallback to DirectQuery.

## 6. Applying RLS to Paginated Reports
- Paginated reports on a semantic model honor the model's RLS for the viewing user.
- For SQL data sources, pass `User!UserID` as a query filter or use SQL-level RLS.
```sql
WHERE g.territory IN (SELECT territory FROM dim_security WHERE user_email = @UserID)
```
(`@UserID` mapped to `=User!UserID`.)

## 7. Governance & Administration Framework

### 7.1 Workspace lifecycle
```
Dev workspace ──► Test workspace ──► Prod workspace
 (build)          (UAT / validation)   (certified, App for users)
```
- Use **deployment pipelines** to promote content
- Separate **Authoring** (Contributors) from **Consumption** (Apps)
- Archive or delete workspaces with no activity after a defined period

### 7.2 Roles & Responsibilities
| Role | Responsibility |
|---|---|
| Tenant / Fabric admin | Tenant settings, capacity, audit logs |
| Workspace admin | Membership, workspace settings |
| Data owner | Approves access, defines KPI logic |
| Report author | Builds and documents content |
| Consumer | Views via App |

### 7.3 Tenant Settings to Review (Admin portal)
- Who can create workspaces / publish to web
- Export and sharing settings (export to Excel/PDF, external sharing)
- Certification and endorsement permissions
- ArcGIS / Azure Maps / custom visuals permissions
- Sensitivity labels (Microsoft Purview)

### 7.4 Monitoring & Auditing
| Tool | Use |
|---|---|
| Admin monitoring workspace | Usage and adoption metrics |
| Activity log / Purview audit | Who viewed, exported, shared |
| Capacity Metrics app | CU consumption and throttling |
| Lineage view | Impact analysis of source changes |
| Scanner / Admin REST APIs | Inventory of workspaces, datasets, owners |

### 7.5 Content Quality
- **Endorsement:** Promoted → Certified for trusted models
- **Naming standard:** `[Domain]_[Subject]_[Env]` (e.g., `Sales_Superstore_Prod`)
- **Documentation:** Report definition doc (Week 3) linked in report description
- **Change control:** version in deployment pipeline, change log updated

## 8. BusinessObjects Governance Comparison
| Topic | Power BI / Fabric | SAP BusinessObjects |
|---|---|---|
| Admin console | Admin portal | Central Management Console (CMC) |
| Security model | Workspace roles, RLS, OLS, labels | Users/groups, folder rights, universe security |
| Row-level security | DAX roles on semantic model | Row restrictions in Universe |
| Promotion | Deployment pipelines | Promotion Management / LCM |
| Scheduling | Scheduled refresh, subscriptions | Scheduled instances, publications |

## 9. Governance Checklist
- [ ] Dynamic RLS role created and tested for 3+ users
- [ ] Entra security groups used instead of individual users where possible
- [ ] Viewer-only access for end users (not Contributor/Member)
- [ ] Sensitivity label applied
- [ ] Dev → Test → Prod pipeline documented
- [ ] Audit/usage monitoring reviewed monthly
- [ ] Mapping table owner and update process defined

## 10. Common Pitfalls
| Issue | Cause | Fix |
|---|---|---|
| Everyone sees all data | Users are Admin/Member/Contributor in workspace | Move to Viewer or use App |
| Blank report for a valid user | Email in mapping table mismatches UPN | Match `USERPRINCIPALNAME()` exactly; trim and lowercase |
| Filter not reaching facts | Relationship direction wrong | Ensure security → geography → facts chain; use bi-directional security filtering only if required |
| Slow with many users | Complex RLS DAX | Keep filters on dimension columns, avoid iterators |

## 11. Learnings
- Dynamic RLS scales: update the mapping table, not the model
- RLS applies to Viewers only; test with real viewer accounts
- Governance is process (lifecycle, ownership, audit) as much as tooling

## 12. Repository Files
```
/week5
  ├── rls/
  │   ├── dim_security_sample.csv
  │   └── rls_role_definitions.md
  ├── governance/workspace_lifecycle.md
  └── screenshots/view_as_role/
```
