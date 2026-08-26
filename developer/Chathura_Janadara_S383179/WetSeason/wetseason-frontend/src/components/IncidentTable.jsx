function IncidentTable({ incidents }) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Community
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Severity
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {incidents.map((incident) => (
                        <tr key={incident.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">
                                {incident.communityName}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                                {incident.type}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                                {incident.severity}
                            </td>
                            <td className="px-4 py-3">
                                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                    {incident.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default IncidentTable;
