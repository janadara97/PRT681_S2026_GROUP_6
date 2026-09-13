import { apiFetch } from "./client";

export function fetchCommunities() {
    return apiFetch("/community/getAll", "GET");
}
