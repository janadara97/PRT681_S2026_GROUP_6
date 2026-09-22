// One small stat tile, e.g. "Total: 10". The colours change depending
// on which "tone" is passed in (plain, open, alert, muted).
function Card({ label, value, tone }) {
    let boxClasses = "border-hairline bg-white";
    let labelClasses = "text-ink-muted";
    let valueClasses = "text-ink";

    if (tone === "alert") {
        boxClasses = "border-amber-600/45 bg-amber-100";
        labelClasses = "text-amber-800";
        valueClasses = "text-amber-800";
    } else if (tone === "open") {
        valueClasses = "text-teal-600";
    } else if (tone === "muted") {
        valueClasses = "text-ink-muted";
    }

    return (
        <div className={`rounded-lg border px-4 py-3.5 ${boxClasses}`}>
            <div
                className={`font-mono text-[10px] uppercase tracking-[.14em] ${labelClasses}`}
            >
                {label}
            </div>
            <div
                className={`mt-1.5 text-[26px] font-semibold leading-none ${valueClasses}`}
            >
                {value}
            </div>
        </div>
    );
}

export default function StatCards({ total, open, critical, closed }) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(148px,1fr))] gap-3">
            <Card label="Total" value={total} />
            <Card label="Open" value={open} tone="open" />
            <Card label="Severity 4" value={critical} tone="alert" />
            <Card label="Closed" value={closed} tone="muted" />
        </div>
    );
}
