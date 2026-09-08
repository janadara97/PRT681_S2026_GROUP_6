const API_ROOT = "http://localhost:5118/api";

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
    return response.json();
}
