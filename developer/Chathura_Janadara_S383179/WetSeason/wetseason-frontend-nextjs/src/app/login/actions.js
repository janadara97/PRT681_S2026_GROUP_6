"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_ROOT, TOKEN_COOKIE } from "../../lib/config";

// Runs only on the server (never sent to the browser) - called by the
// <form> in LoginForm.js, which hands it the typed username/password.
export async function loginAction(previousState, formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch(API_ROOT + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
    });

    if (!response.ok) {
        return { error: "Invalid username or password." };
    }

    const data = await response.json();
    const token = data.token;

    // httpOnly: true - the browser stores this cookie but page JavaScript can never read it back.
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_COOKIE, token, { httpOnly: true });

    redirect("/incidents");
}
