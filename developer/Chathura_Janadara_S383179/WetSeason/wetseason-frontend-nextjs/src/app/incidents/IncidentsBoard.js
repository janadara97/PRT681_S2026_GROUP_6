"use client";

import { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import StatCards from "./StatCards";
import Toast from "./Toast";
import IncidentFormModal from "./IncidentFormModal";
import ConfirmDialog from "./ConfirmDialog";

const STATUS_FLOW = ["Reported", "Triaged", "Responding", "Resolved", "Closed"];
const CLOSED_STATUSES = ["Resolved", "Closed"];

// Only the incidents that match the current search text and status filter.
function getFilteredRows(items, query, statusFilter) {
    const trimmedQuery = query.trim().toLowerCase();

    return items.filter((incident) => {
        if (statusFilter !== "all" && incident.status !== statusFilter) {
            return false;
        }
        if (trimmedQuery === "") {
            return true;
        }
        const searchableText = (
            incident.communityName +
            " " +
            incident.type +
            " " +
            incident.region
        ).toLowerCase();
        return searchableText.includes(trimmedQuery);
    });
}

// Counts shown in the stat cards at the top of the page.
function getStats(items) {
    let open = 0;
    let critical = 0;
    let closed = 0;

    for (const incident of items) {
        if (CLOSED_STATUSES.includes(incident.status)) {
            closed = closed + 1;
        } else {
            open = open + 1;
            if (incident.severity === 4) {
                critical = critical + 1;
            }
        }
    }

    return { total: items.length, open: open, critical: critical, closed: closed };
}

// The Grid manages its own sorting/paging state internally with React
// hooks, so this whole board has to be a Client Component. The data
// itself still arrives as a plain prop from the Server Component that
// fetched it (IncidentsPage) - it's just filtered and rendered here.
export default function IncidentsBoard({ incidents, communities, types }) {
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [formOpen, setFormOpen] = useState(false);
    const [editingIncident, setEditingIncident] = useState(null);
    const [incidentPendingDelete, setIncidentPendingDelete] = useState(null);
    const [toastMessage, setToastMessage] = useState("");

    // Auto-hide the toast a few seconds after it appears.
    useEffect(() => {
        if (!toastMessage) {
            return;
        }
        const timerId = setTimeout(() => setToastMessage(""), 3600);
        return () => clearTimeout(timerId);
    }, [toastMessage]);

    const filteredRows = getFilteredRows(incidents, query, statusFilter);
    const stats = getStats(incidents);

    function openCreateForm() {
        setEditingIncident(null);
        setFormOpen(true);
    }

    function openEditForm(incident) {
        setEditingIncident(incident);
        setFormOpen(true);
    }

    function closeForm() {
        setFormOpen(false);
        setEditingIncident(null);
    }

    function handleSaved(message) {
        setToastMessage(message);
        closeForm();
    }

    function askToDelete(incident) {
        setIncidentPendingDelete(incident);
    }

    function handleDeleted(message) {
        setToastMessage(message);
        setIncidentPendingDelete(null);
    }

    function ActionsCell(props) {
        const incident = props.dataItem;
        const content = (
            <td {...props.tdProps}>
                <div className="flex justify-end gap-1.5">
                    <button
                        type="button"
                        onClick={() => openEditForm(incident)}
                        className="rounded-md border border-ink/20 bg-white px-2.5 py-1.5 text-[11px] font-medium hover:border-amber-600 hover:text-amber-800"
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={() => askToDelete(incident)}
                        className="rounded-md border border-ink/20 bg-white px-2.5 py-1.5 text-[11px] font-medium text-danger-600 hover:border-danger-600 hover:bg-danger-50"
                    >
                        Delete
                    </button>
                </div>
            </td>
        );
        // Grid features like grouping/virtualization sometimes need to wrap
        // this cell themselves - when that's happening, props.render does
        // it instead of us returning the <td> directly.
        return props.render ? props.render(content, props) : content;
    }

    return (
        <div className="flex flex-col gap-5">
            <StatCards {...stats} />

            <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-lg font-semibold">Incidents</h1>

                <div className="flex min-w-[160px] max-w-[250px] flex-1 items-center gap-2 rounded-md border border-ink/15 bg-white px-3 py-2">
                    <span className="font-mono text-xs text-ink-muted">
                        ⌕
                    </span>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search community or type"
                        className="w-full min-w-0 border-none bg-transparent text-[13px] outline-none"
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-md border border-ink/15 bg-white px-3 py-2.5 text-[13px] outline-none"
                >
                    <option value="all">All statuses</option>
                    {STATUS_FLOW.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={openCreateForm}
                    className="btn-primary ml-auto whitespace-nowrap"
                >
                    + New incident
                </button>
            </div>

            <Toast message={toastMessage} onDismiss={() => setToastMessage("")} />

            <Grid
                data={filteredRows}
                dataItemKey="id"
                sortable={true}
                pageable={true}
                autoProcessData={{ sort: true, page: true }}
            >
                <GridColumn field="type" title="Type" />
                <GridColumn field="severity" title="Severity" />
                <GridColumn field="status" title="Status" />
                <GridColumn field="communityName" title="Community" />
                <GridColumn field="region" title="Region" />
                <GridColumn field="reportedBy" title="Reported by" />
                <GridColumn title="Actions" width="160px" cells={{ data: ActionsCell }} />
            </Grid>

            <div className="font-mono text-[11px] text-ink-muted">
                Showing {filteredRows.length} of {incidents.length} incidents
            </div>

            <IncidentFormModal
                key={editingIncident ? editingIncident.id : "new"}
                open={formOpen}
                incident={editingIncident}
                communities={communities}
                types={types}
                onClose={closeForm}
                onSaved={handleSaved}
            />

            <ConfirmDialog
                incident={incidentPendingDelete}
                onCancel={() => setIncidentPendingDelete(null)}
                onDeleted={handleDeleted}
            />
        </div>
    );
}
