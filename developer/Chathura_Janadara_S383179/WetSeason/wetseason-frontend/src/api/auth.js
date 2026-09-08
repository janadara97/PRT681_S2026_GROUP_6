import { apiFetch } from "./client";

export function login(username, password) {
    return apiFetch("/auth/login", "POST", {
        username: username,
        password: password,
    });
}
