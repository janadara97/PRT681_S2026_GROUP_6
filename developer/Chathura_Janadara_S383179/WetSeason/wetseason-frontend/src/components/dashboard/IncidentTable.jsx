import { SEV_META, STATUS_META, formatRef, formatAge } from "../../data/incidents";

export default function IncidentTable({ rows, onEdit, onDelete }) {
    if (rows.length === 0) {
        return (
            <div className="rounded-lg border border-hairline bg-white">
                <div className="flex flex-col items-center gap-1.5 px-5 py-10">
                    <div className="text-[15px] font-medium">
                        No incidents match
                    </div>
                    <div className="max-w-[34ch] text-center text-xs text-ink-muted">
                        Clear the search or status filter, or create a new
                        incident.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-hairline bg-white">
            <table className="w-full min-w-[566px] border-collapse">
                <thead>
                    <tr className="border-b border-hairline bg-[#eceeea] font-mono text-[10px] uppercase tracking-[.12em] text-ink-muted">
                        <th className="px-3.5 py-3 text-left">Sev</th>
                        <th className="px-3.5 py-3 text-left">Community</th>
                        <th className="px-3.5 py-3 text-left">Type</th>
                        <th className="px-3.5 py-3 text-left">Status</th>
                        <th className="px-3.5 py-3 text-left">Age</th>
                        <th className="px-3.5 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((incident) => (
                        <IncidentRow
                            key={incident.id}
                            incident={incident}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function IncidentRow({ incident, onEdit, onDelete }) {
    const severityInfo = SEV_META[incident.severity];
    const statusClasses = STATUS_META[incident.status];

    return (
        <tr className="border-b border-ink/[.07] hover:bg-amber-50/70">
            <td className="px-3.5 py-2.5">
                <div
                    className={`grid h-7 w-[30px] place-items-center rounded-md border font-mono text-[13px] font-semibold ${severityInfo.badge}`}
                    title={severityInfo.label}
                >
                    {incident.severity}
                </div>
            </td>
            <td className="px-3.5 py-2.5">
                <div className="truncate text-[13px] font-medium">
                    {incident.community}
                </div>
                <div className="mt-0.5 truncate font-mono text-[10px] text-ink-muted">
                    {formatRef(incident.id)} · {incident.region}
                </div>
            </td>
            <td className="px-3.5 py-2.5 text-xs text-ink-soft">
                {incident.type}
            </td>
            <td className="px-3.5 py-2.5">
                <span
                    className={`inline-block rounded border px-2 py-0.5 text-[11px] font-medium ${statusClasses}`}
                >
                    {incident.status}
                </span>
            </td>
            <td className="px-3.5 py-2.5 font-mono text-[11px] text-ink-muted">
                {formatAge(incident.createdAt)}
            </td>
            <td className="px-3.5 py-2.5">
                <div className="flex justify-end gap-1.5">
                    <button
                        type="button"
                        onClick={() => onEdit(incident)}
                        className="rounded-md border border-ink/20 bg-white px-2.5 py-1.5 text-[11px] font-medium hover:border-amber-600 hover:text-amber-800"
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(incident)}
                        className="rounded-md border border-ink/20 bg-white px-2.5 py-1.5 text-[11px] font-medium text-danger-600 hover:border-danger-600 hover:bg-danger-50"
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}
