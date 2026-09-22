import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_ROOT, TOKEN_COOKIE } from "../../lib/config";
import { getUserFromToken } from "../../lib/jwt";
import Header from "./Header";
import IncidentsBoard from "./IncidentsBoard";

async function fetchJson(path, token) {
    const response = await fetch(API_ROOT + path, {
        headers: { Authorization: "Bearer " + token },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to load " + path);
    }

    return response.json();
}

// async on a page component = runs on the server before any HTML is sent - no useState/useEffect needed.
export default async function IncidentsPage() {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(TOKEN_COOKIE);

    if (!tokenCookie) {
        redirect("/login");
    }

    const token = tokenCookie.value;
    const user = getUserFromToken(token);

    const [incidents, communities, types] = await Promise.all([
        fetchJson("/incident/getAll", token),
        fetchJson("/community/getAll", token),
        fetchJson("/incident/types", token),
    ]);

    return (
        <div className="min-h-screen bg-canvas px-7 pb-10 pt-6">
            <div className="mx-auto flex max-w-[1100px] flex-col gap-5">
                <Header user={user.username} role={user.role} />
                <IncidentsBoard
                    incidents={incidents}
                    communities={communities}
                    types={types}
                />
            </div>
        </div>
    );
}
