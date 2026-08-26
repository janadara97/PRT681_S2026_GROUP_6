import IncidentTable from "../components/IncidentTable";
import { fetchIncidents } from "../api/incidents";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function IncidentBoard() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchIncidents()
            .then((data) => setIncidents(data))
            .catch(() => setError("Failed to load incidents."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Incidents</h1>
                <Link
                    to="/incidents/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Report Incident
                </Link>
            </div>

            {loading && <p className="text-gray-600">Loading incidents...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && <IncidentTable incidents={incidents} />}
        </div>
    );
}

export default IncidentBoard;
