import { useEffect, useState } from "react";
import Header from "../components/dashboard/Header";
import StatCards from "../components/dashboard/StatCards";
import Toast from "../components/dashboard/Toast";
import IncidentTable from "../components/dashboard/IncidentTable";
import IncidentFormModal from "../components/dashboard/IncidentFormModal";
import ConfirmDialog from "../components/dashboard/ConfirmDialog";
import { STATUS_FLOW, formatRef } from "../data/incidents";
import {
    fetchIncidents,
    createIncident,
    updateIncident,
    deleteIncident,
} from "../api/incidents";

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
            incident.community +
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

    return { total: items.length, open, critical, closed };
}

export default function Dashboard() {
    const [items, setItems] = useState([]);
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

    useEffect(() => {
        fetchIncidents()
            .then((data) => {
                setItems(data);
            })
            .catch((error) => {
                console.error("Failed to fetch incidents:", error);
            });
    }, []);

    const filteredRows = getFilteredRows(items, query, statusFilter);
    const stats = getStats(items);

    function handleSearchChange(event) {
        setQuery(event.target.value);
    }

    function handleStatusFilterChange(event) {
        setStatusFilter(event.target.value);
    }

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

    async function handleEditSave(draft) {
        try {
            await updateIncident(editingIncident.id, {
                communityId: draft.communityId,
                type: draft.type,
                severity: draft.severity,
                description: draft.description,
            });
            const refreshedItems = await fetchIncidents();
            setItems(refreshedItems);
            setToastMessage(`${formatRef(editingIncident.id)} updated.`);
            closeForm();
        } catch (error) {
            console.error("Failed to update incident:", error);
            setToastMessage("Failed to update incident. Please try again.");
        }
    }

    async function handleCreateSave(draft) {
        try {
            const created = await createIncident({
                communityId: draft.communityId,
                type: draft.type,
                severity: draft.severity,
                description: draft.description,
            });
            const refreshedItems = await fetchIncidents();
            setItems(refreshedItems);
            setToastMessage(
                `${formatRef(created.id)} created for ${draft.community}.`,
            );
            closeForm();
        } catch (error) {
            console.error("Failed to create incident:", error);
            setToastMessage("Failed to create incident. Please try again.");
        }
    }

    function handleSave(draft) {
        if (editingIncident) {
            handleEditSave(draft);
        } else {
            handleCreateSave(draft);
        }
    }

    function askToDelete(incident) {
        setIncidentPendingDelete(incident);
    }

    function cancelDelete() {
        setIncidentPendingDelete(null);
    }

    async function confirmDelete() {
        try {
            await deleteIncident(incidentPendingDelete.id);
            const remainingItems = items.filter(
                (incident) => incident.id !== incidentPendingDelete.id,
            );
            setItems(remainingItems);
            setToastMessage(`${formatRef(incidentPendingDelete.id)} deleted.`);
            setIncidentPendingDelete(null);
        } catch (error) {
            console.error("Failed to delete incident:", error);
            setToastMessage("Failed to delete incident. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-canvas px-7 pb-10 pt-6">
            <div className="mx-auto flex max-w-[1100px] flex-col gap-5">
                <Header />
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
                            onChange={handleSearchChange}
                            placeholder="Search community or type"
                            className="w-full min-w-0 border-none bg-transparent text-[13px] outline-none"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
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

                <Toast
                    message={toastMessage}
                    onDismiss={() => setToastMessage("")}
                />

                <IncidentTable
                    rows={filteredRows}
                    onEdit={openEditForm}
                    onDelete={askToDelete}
                />

                <div className="font-mono text-[11px] text-ink-muted">
                    Showing {filteredRows.length} of {items.length} incidents
                </div>
            </div>

            <IncidentFormModal
                key={editingIncident ? editingIncident.id : "new"}
                open={formOpen}
                incident={editingIncident}
                onClose={closeForm}
                onSave={handleSave}
            />

            <ConfirmDialog
                incident={incidentPendingDelete}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
