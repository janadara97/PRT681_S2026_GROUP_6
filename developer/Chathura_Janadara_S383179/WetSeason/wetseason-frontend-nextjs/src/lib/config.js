// No NEXT_PUBLIC_ prefix on purpose - this file is only ever imported by
// server-only code (Server Actions, Server Components), so the backend's
// address never needs to reach the browser at all.
export const API_ROOT = process.env.API_ROOT || "http://localhost:5118/api";

export const TOKEN_COOKIE = "wetseason_token";
