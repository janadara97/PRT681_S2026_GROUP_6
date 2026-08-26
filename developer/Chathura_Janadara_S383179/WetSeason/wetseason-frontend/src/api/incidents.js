const BASE_URL = "http://localhost:5118/api/incident";

export async function fetchIncidents() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch incidents");
    }
    return response.json();
}

export async function createIncident(incident) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incident),
    });
    if (!response.ok) {
        throw new Error("Failed to create incident");
    }
    return response.json();
}
