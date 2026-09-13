import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";

// These values must match the backend's UserRole enum names exactly
// (Models/Enums.cs), since they're sent as-is in the request body.
const ROLE_OPTIONS = [
    { value: "PublicUser", label: "Public User" },
    { value: "FieldOfficer", label: "Field Officer" },
    { value: "Coordinator", label: "Coordinator" },
    { value: "Admin", label: "Admin" },
];

function Register() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("PublicUser");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await register({ name, username, email, password, role });
            navigate("/login");
        } catch (err) {
            if (err.status === 400) {
                setError("That username is already taken.");
            } else {
                setError("Failed to create account. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row">
            {/* Branding panel */}
            <div className="relative overflow-hidden md:w-1/2 lg:w-3/5 flex flex-col justify-between px-8 py-10 md:px-16 md:py-14 border-b md:border-b-0 md:border-r border-slate-700/60">
                <div className="relative">
                    <span className="text-sm font-medium text-teal-300/80">
                        Northern Territory
                    </span>
                    <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-slate-50 leading-tight max-w-md">
                        Wet Season Incident &amp; Resource Coordinator
                    </h1>
                </div>

                <p className="relative mt-10 md:mt-0 max-w-sm text-slate-300 text-base leading-relaxed">
                    Create an account to start reporting incidents and
                    coordinating the response for your community.
                </p>
            </div>

            {/* Form panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 md:px-12">
                <div className="w-full max-w-sm">
                    <h2 className="text-xl font-semibold text-slate-50 mb-1">
                        Create an account
                    </h2>
                    <p className="text-sm text-slate-400 mb-8">
                        Register to start coordinating.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                        noValidate
                    >
                        {error && (
                            <div
                                role="alert"
                                className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-300"
                            >
                                {error}
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm text-slate-300 mb-1.5"
                            >
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm text-slate-300 mb-1.5"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm text-slate-300 mb-1.5"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="role"
                                className="block text-sm text-slate-300 mb-1.5"
                            >
                                Role
                            </label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            >
                                {ROLE_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
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
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full rounded-md bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60"
                        >
                            {submitting
                                ? "Creating account…"
                                : "Create account"}
                        </button>
                    </form>

                    <p className="mt-8 text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-teal-300 hover:text-teal-200 underline underline-offset-2"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
