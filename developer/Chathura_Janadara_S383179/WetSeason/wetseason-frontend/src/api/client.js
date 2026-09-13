// VITE_API_ROOT is set as an environment variable in Azure Static Web
// Apps for the production build; falls back to the local backend when
// running locally, where that variable isn't set.
const API_ROOT = import.meta.env.VITE_API_ROOT || "http://localhost:5118/api";

export const TOKEN_STORAGE_KEY = "wetseason.token";

export async function apiFetch(path, method, body) {
    const headers = { "Content-Type": "application/json" };
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
        headers.Authorization = "Bearer " + token;
    }
    const request = { method: method, headers: headers };
    if (body) {
        request.body = JSON.stringify(body);
    }
    const response = await fetch(API_ROOT + path, request);
    if (!response.ok) {
        const error = new Error(
            "Request failed with status " + response.status,
        );
        error.status = response.status;
        throw error;
    }
    // A 204 No Content response (e.g. after a delete) has no body -
    // calling .json() on it would throw, since there's nothing to parse.
    if (response.status === 204) {
        return null;
    }
    return response.json();
}
