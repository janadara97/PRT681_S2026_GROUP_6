"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

const initialState = { error: "" };

export default function LoginForm() {
    // state = loginAction's last return value, pending = true while it's running.
    const [state, formAction, pending] = useActionState(
        loginAction,
        initialState,
    );

    return (
        <form action={formAction} className="space-y-5" noValidate>
            {state.error !== "" && (
                <div
                    role="alert"
                    className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-300"
                >
                    {state.error}
                </div>
            )}

            <div>
                <label
                    htmlFor="username"
                    className="block text-sm text-slate-300 mb-1.5"
                >
                    Username
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm text-slate-300 mb-1.5"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
            </div>

            <button
                type="submit"
                disabled={pending}
                className="w-full rounded-md bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60"
            >
                {pending ? "Signing in…" : "Sign in"}
            </button>
        </form>
    );
}
