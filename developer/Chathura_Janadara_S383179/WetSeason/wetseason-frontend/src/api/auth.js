import { apiFetch } from "./client";

export function login(username, password) {
    return apiFetch("/auth/login", "POST", {
        username: username,
        password: password,
    });
}

export function register({ name, username, email, password, role }) {
    return apiFetch("/auth/register", "POST", {
        name: name,
        username: username,
        email: email,
        password: password,
        role: role,
    });
}
