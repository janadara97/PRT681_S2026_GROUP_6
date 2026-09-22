export default function Toast({ message, onDismiss }) {
    if (!message) {
        return null;
    }

    return (
        <div className="flex items-center gap-2.5 rounded-md border border-teal-600/35 border-l-[3px] border-l-teal-600 bg-teal-100 px-3.5 py-3">
            <span className="text-[13px] text-teal-800">{message}</span>
            <button
                type="button"
                onClick={onDismiss}
                className="ml-auto font-mono text-xs text-teal-800"
                aria-label="Dismiss"
            >
                ✕
            </button>
        </div>
    );
}
