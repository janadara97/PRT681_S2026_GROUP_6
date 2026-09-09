import { apiFetch } from "./client";

export function fetchIncidents() {
    return apiFetch("/incident/getAll", "GET");
}

export function createIncident(incident) {
    return apiFetch("/incident", "POST", incident);
}
