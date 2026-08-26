import { personal } from "../data/portfolioData";

export default function Footer() {
    return (
        <footer className="bg-slate-950 py-6">
            <div className="mx-auto max-w-6xl px-6 text-center text-xs text-slate-500">
                © {new Date().getFullYear()} {personal.name}.{" "}
            </div>
        </footer>
    );
}
