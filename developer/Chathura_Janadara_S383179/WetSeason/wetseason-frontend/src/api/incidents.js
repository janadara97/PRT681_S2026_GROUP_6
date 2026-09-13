import { apiFetch } from "./client";

// The backend calls this field "communityName"; the rest of the frontend
// (table, search, edit form) reads it as "community" - map it once here
// so every other file can stay as it is.
function addCommunityField(incident) {
    return { ...incident, community: incident.communityName };
}

export function fetchIncidents() {
    return apiFetch("/incident/getAll", "GET").then((incidents) =>
        incidents.map(addCommunityField),
    );
}

export function createIncident(incident) {
    return apiFetch("/incident", "POST", incident);
}

export function updateIncident(id, incident) {
    return apiFetch(`/incident/${id}`, "PUT", incident);
}

export function deleteIncident(id) {
    return apiFetch(`/incident/delete/${id}`, "DELETE");
}

export function fetchTypes() {
    return apiFetch("/incident/types", "GET");
}
