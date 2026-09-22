import { logoutAction } from "./actions";

export default function Header({ user, role }) {
    return (
        <header className="flex flex-wrap items-center gap-3.5 border-b border-hairline pb-4">
            <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-8 w-8 flex-none place-items-center rounded-full border-[1.5px] border-amber-600">
                    <div className="grid h-4 w-4 place-items-center rounded-full border-[1.5px] border-teal-600/70">
                        <div className="h-1 w-1 rounded-full bg-amber-700" />
                    </div>
                </div>
                <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase leading-tight tracking-[.15em]">
                        NT Wet Season
                    </div>
                    <div className="font-mono text-[10px] text-ink-muted">
                        Incident dashboard
                    </div>
                </div>
            </div>
            <div className="ml-auto flex items-center gap-3.5">
                <div className="text-right font-mono text-[11px] text-ink-muted">
                    Signed in as {user} · {role}
                </div>
                <form action={logoutAction}>
                    <button
                        type="submit"
                        className="font-mono text-[11px] text-ink-muted hover:text-amber-700"
                    >
                        Sign out
                    </button>
                </form>
            </div>
        </header>
    );
}
