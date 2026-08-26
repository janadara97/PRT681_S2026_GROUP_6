import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createIncident } from "../api/incidents";

function ReportIncident() {
    const [type, setType] = useState("Flooding");
    const [communityId, setCommunityId] = useState("");
    const [severity, setSeverity] = useState(1);
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await createIncident({
                communityId: Number(communityId),
                type,
                severity,
                description,
            });
            navigate("/");
        } catch {
            setError("Failed to report incident. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Link to="/" className="text-blue-600 hover:underline text-sm">
                &larr; Back to Incidents
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                Report Incident
            </h1>

            {error && (
                <p className="text-red-600 text-sm mb-4 max-w-lg">{error}</p>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow p-6 max-w-lg space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="Flooding">Flooding</option>
                        <option value="CycloneDamage">Cyclone Damage</option>
                        <option value="RoadClosure">Road Closure</option>
                        <option value="Evacuation">Evacuation</option>
                        <option value="InfrastructureDamage">
                            Infrastructure Damage
                        </option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Community ID
                    </label>
                    <input
                        type="number"
                        value={communityId}
                        onChange={(e) => setCommunityId(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Severity (1–4)
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="4"
                        value={severity}
                        onChange={(e) => setSeverity(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {submitting ? "Submitting..." : "Report Incident"}
                </button>
            </form>
        </div>
    );
}

export default ReportIncident;
