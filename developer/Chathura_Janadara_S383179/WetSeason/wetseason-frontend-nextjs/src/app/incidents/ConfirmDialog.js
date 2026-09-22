"use client";

import { useState } from "react";
import { deleteIncidentAction } from "./incidentActions";

function formatRef(id) {
    return "INC-" + String(id).padStart(4, "0");
}

export default function ConfirmDialog({ incident, onCancel, onDeleted }) {
    const [deleting, setDeleting] = useState(false);

    if (!incident) {
        return null;
    }

    async function handleConfirm() {
        setDeleting(true);
        await deleteIncidentAction(incident.id);
        onDeleted(`${formatRef(incident.id)} deleted.`);
    }

    return (
        <div className="fixed inset-0 z-60 grid place-items-center bg-ink/40 p-5">
            <div className="flex w-full max-w-[390px] flex-col gap-3 rounded-xl border border-ink/15 bg-white p-5 shadow-[0_18px_48px_rgba(22,32,43,.2)]">
                <div className="text-[17px] font-semibold">
                    Delete this incident?
                </div>
                <div className="text-[13px] text-ink-soft">
                    {formatRef(incident.id)} — {incident.type} at{" "}
                    {incident.communityName}
                </div>
                <div className="text-xs text-ink-muted">
                    This removes it from the dashboard permanently.
                </div>
                <div className="flex gap-2.5 pt-0.5">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn-secondary flex-1"
                    >
                        Keep it
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={deleting}
                        className="flex-1 rounded-md border border-danger-600 bg-danger-600 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-danger-700 disabled:opacity-60"
                    >
                        {deleting ? "Deleting…" : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
