import { useEffect, useState } from "react";
import { BLANK_INCIDENT, SEV_META, formatRef } from "../../data/incidents";
import { fetchCommunities } from "../../api/community";
import { fetchTypes } from "../../api/incidents";

export default function IncidentFormModal({ open, incident, onClose, onSave }) {
    const [draft, setDraft] = useState(
        incident ? { ...incident } : { ...BLANK_INCIDENT },
    );
    const [error, setError] = useState("");
    const [communities, setCommunities] = useState([]);
    const [types, setTypes] = useState([]);

    // Load the community list once, the first time the modal is opened.
    useEffect(() => {
        fetchCommunities()
            .then((data) => setCommunities(data))
            .catch((err) => console.error("Failed to load communities:", err));
    }, []);

    // Load the incident type list once, the first time the modal is opened.
    useEffect(() => {
        fetchTypes()
            .then((data) => setTypes(data))
            .catch((err) =>
                console.error("Failed to load incident types:", err),
            );
    }, []);

    if (!open) return null;

    const set = (key) => (e) =>
        setDraft((d) => ({ ...d, [key]: e.target.value }));

    const submit = (e) => {
        e.preventDefault();
        if (!draft.community.trim()) {
            setError("Community is required.");
            return;
        }
        // The backend identifies a community by id, not by name, so look
        // up the id of whichever community name is selected in the form.
        const selectedCommunity = communities.find(
            (community) => community.name === draft.community,
        );
        onSave({
            ...draft,
            severity: Number(draft.severity),
            communityId: selectedCommunity ? selectedCommunity.id : null,
        });
    };

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-5">
            <form
                onSubmit={submit}
                className="flex max-h-[90vh] w-full max-w-[460px] flex-col gap-4 overflow-auto rounded-xl border border-ink/15 bg-white p-5 shadow-[0_18px_48px_rgba(22,32,43,.2)]"
            >
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
                        value={draft.community}
                        onChange={set("community")}
                        className="field"
                    >
                        <option value="">Select a community</option>
                        {communities.map((community) => (
                            <option key={community.id} value={community.name}>
                                {community.name}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
                    <label className="flex flex-col gap-1.5">
                        <span className="label-caps">Type</span>
                        <select
                            value={draft.type}
                            onChange={set("type")}
                            className="field"
                        >
                            {types.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="label-caps">Severity</span>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map((v) => {
                            const on = Number(draft.severity) === v;
                            return (
                                <button
                                    key={v}
                                    type="button"
                                    onClick={() =>
                                        setDraft((d) => ({ ...d, severity: v }))
                                    }
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
                        rows={3}
                        value={draft.description}
                        onChange={set("description")}
                        placeholder="Where, what, who's affected"
                        className="field resize-y"
                    />
                </label>

                {error && (
                    <div className="rounded-md border border-danger-600/40 border-l-[3px] border-l-danger-600 bg-danger-50 px-3 py-2.5 text-xs text-danger-600">
                        {error}
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
                    <button type="submit" className="btn-primary flex-[1.2]">
                        {incident ? "Save changes" : "Create incident"}
                    </button>
                </div>
            </form>
        </div>
    );
}
