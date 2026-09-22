"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { createIncidentAction, updateIncidentAction } from "./incidentActions";

const SEV_META = {
    4: { label: "Critical", badge: "bg-amber-100 border-amber-600/55 text-amber-800" },
    3: { label: "Major", badge: "bg-amber-50 border-amber-600/35 text-amber-800" },
    2: { label: "Moderate", badge: "bg-teal-100 border-teal-600/35 text-teal-800" },
    1: { label: "Minor", badge: "bg-canvas border-ink/20 text-ink-soft" },
};

function formatRef(id) {
    return "INC-" + String(id).padStart(4, "0");
}

const initialState = { error: "" };

// key={incident ? incident.id : "new"} on the call site (IncidentsBoard)
// remounts this component whenever you switch between "new" and
// "editing incident X" - so it's safe to pick the action once, here,
// based on whether an incident was passed in.
export default function IncidentFormModal({ open, incident, communities, types, onClose, onSaved }) {
    const action = incident ? updateIncidentAction : createIncidentAction;
    const [state, formAction, pending] = useActionState(action, initialState);
    const [severity, setSeverity] = useState(incident ? incident.severity : 3);

    useEffect(() => {
        if (state.success) {
            onSaved(state.message);
        }
    }, [state]);

    if (!open) return null;

    const initialCommunityId = incident
        ? communities.find((c) => c.name === incident.communityName)?.id ?? ""
        : "";

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-5">
            <form
                action={formAction}
                className="flex max-h-[90vh] w-full max-w-[460px] flex-col gap-4 overflow-auto rounded-xl border border-ink/15 bg-white p-5 shadow-[0_18px_48px_rgba(22,32,43,.2)]"
            >
                {incident && <input type="hidden" name="id" value={incident.id} />}
                <input type="hidden" name="severity" value={severity} />

                <div className="flex items-start gap-3">
                    <div className="min-w-0">
                        <div className="text-lg font-semibold">
                            {incident ? "Edit incident" : "New incident"}
                        </div>
                        <div className="mt-0.5 text-xs text-ink-muted">
                            {incident
                                ? `${formatRef(incident.id)} · changes apply immediately`
                                : "Logged against your account as the reporter"}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-auto font-mono text-sm text-ink-muted hover:text-ink"
                    >
                        ✕
                    </button>
                </div>

                <label className="flex flex-col gap-1.5">
                    <span className="label-caps">Community</span>
                    <select
                        name="communityId"
                        defaultValue={initialCommunityId}
                        className="field"
                    >
                        <option value="">Select a community</option>
                        {communities.map((community) => (
                            <option key={community.id} value={community.id}>
                                {community.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="label-caps">Type</span>
                    <select
                        name="type"
                        defaultValue={incident ? incident.type : types[0]}
                        className="field"
                    >
                        {types.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="flex flex-col gap-2">
                    <span className="label-caps">Severity</span>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map((v) => {
                            const on = severity === v;
                            return (
                                <button
                                    key={v}
                                    type="button"
                                    onClick={() => setSeverity(v)}
                                    className={`flex-1 rounded-md border px-1.5 py-2 text-center hover:border-amber-600 ${on ? SEV_META[v].badge : "border-ink/20 bg-white text-ink-soft"}`}
                                >
                                    <div className="font-mono text-base font-semibold leading-none">
                                        {v}
                                    </div>
                                    <div className="mt-1 text-[9px] leading-tight">
                                        {SEV_META[v].label}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <label className="flex flex-col gap-1.5">
                    <span className="label-caps">Description</span>
                    <textarea
                        name="description"
                        rows={3}
                        defaultValue={incident ? incident.description : ""}
                        placeholder="Where, what, who's affected"
                        className="field resize-y"
                    />
                </label>

                {state.error && (
                    <div className="rounded-md border border-danger-600/40 border-l-[3px] border-l-danger-600 bg-danger-50 px-3 py-2.5 text-xs text-danger-600">
                        {state.error}
                    </div>
                )}

                <div className="flex gap-2.5 pt-0.5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn-secondary flex-1"
                    >
                        Cancel
                    </button>
                    <button type="submit" disabled={pending} className="btn-primary flex-[1.2]">
                        {pending ? "Saving…" : incident ? "Save changes" : "Create incident"}
                    </button>
                </div>
            </form>
        </div>
    );
}
