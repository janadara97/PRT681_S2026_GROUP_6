import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(username, password);
            navigate("/incidents");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row">
            {/* Hero panel */}
            <div className="relative overflow-hidden md:w-1/2 lg:w-3/5 flex flex-col justify-between px-8 py-10 md:px-16 md:py-14 border-b md:border-b-0 md:border-r border-slate-700/60">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                    <RadarRings />
                </div>

                <div className="relative">
                    <span className="text-sm font-medium text-teal-300/80">
                        Northern Territory
                    </span>
                    <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-slate-50 leading-tight max-w-md">
                        Wet Season Incident &amp; Resource Coordinator
                    </h1>
                </div>

                <p className="relative mt-10 md:mt-0 max-w-sm text-slate-300 text-base leading-relaxed">
                    Track incidents as they're reported, assign generators,
                    crews and vehicles without double-booking, and keep affected
                    communities informed through the wet season.
                </p>
            </div>

            {/* Form panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 md:px-12">
                <div className="w-full max-w-sm">
                    <h2 className="text-xl font-semibold text-slate-50 mb-1">
                        Sign in
                    </h2>
                    <p className="text-sm text-slate-400 mb-8">
                        Use the account issued by your coordinator.
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
                                htmlFor="password"
                                className="block text-sm text-slate-300 mb-1.5"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-md bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60"
                        >
                            {loading ? "Signing in…" : "Sign in"}
                        </button>
                    </form>

                    <p className="mt-8 text-sm text-slate-400">
                        New here?{" "}
                        <Link
                            to="/register"
                            className="text-teal-300 hover:text-teal-200 underline underline-offset-2"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

function RadarRings() {
    return (
        <svg
            viewBox="0 0 560 560"
            className="w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] lg:w-[680px] lg:h-[680px]"
        >
            <defs>
                <linearGradient
                    id="sweepFade"
                    gradientUnits="userSpaceOnUse"
                    x1="530"
                    y1="280"
                    x2="484.8"
                    y2="423.5"
                >
                    <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0" />
                    <stop
                        offset="100%"
                        stopColor="#5EEAD4"
                        stopOpacity="0.45"
                    />
                </linearGradient>
            </defs>

            {/* static scope boundary and centre */}
            <circle
                cx="280"
                cy="280"
                r="250"
                fill="none"
                stroke="#5EEAD4"
                strokeWidth="1"
                opacity="0.3"
            />
            <circle cx="280" cy="280" r="4" fill="#5EEAD4" opacity="0.6" />

            {/* crosshairs */}
            <line
                x1="30"
                y1="280"
                x2="530"
                y2="280"
                stroke="#5EEAD4"
                strokeWidth="1"
                strokeDasharray="2 7"
                opacity="0.25"
            />
            <line
                x1="280"
                y1="30"
                x2="280"
                y2="530"
                stroke="#5EEAD4"
                strokeWidth="1"
                strokeDasharray="2 7"
                opacity="0.25"
            />

            {/* compass labels */}
            <text
                x="280"
                y="45"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#5EEAD4"
                fontSize="13"
                opacity="0.55"
            >
                N
            </text>
            <text
                x="280"
                y="515"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#5EEAD4"
                fontSize="13"
                opacity="0.55"
            >
                S
            </text>
            <text
                x="515"
                y="280"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#5EEAD4"
                fontSize="13"
                opacity="0.55"
            >
                E
            </text>
            <text
                x="45"
                y="280"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#5EEAD4"
                fontSize="13"
                opacity="0.55"
            >
                W
            </text>

            {/* pulsing rings — hidden for reduced motion */}
            <g className="motion-reduce:hidden">
                <circle
                    cx="280"
                    cy="280"
                    r="60"
                    fill="none"
                    stroke="#5EEAD4"
                    strokeWidth="1.5"
                    opacity="0.5"
                >
                    <animate
                        attributeName="r"
                        values="60;260"
                        dur="7.5s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.5;0"
                        dur="7.5s"
                        repeatCount="indefinite"
                    />
                </circle>
                <circle
                    cx="280"
                    cy="280"
                    r="60"
                    fill="none"
                    stroke="#5EEAD4"
                    strokeWidth="1.5"
                    opacity="0.5"
                >
                    <animate
                        attributeName="r"
                        values="60;260"
                        dur="7.5s"
                        begin="2.5s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.5;0"
                        dur="7.5s"
                        begin="2.5s"
                        repeatCount="indefinite"
                    />
                </circle>
                <circle
                    cx="280"
                    cy="280"
                    r="60"
                    fill="none"
                    stroke="#5EEAD4"
                    strokeWidth="1.5"
                    opacity="0.5"
                >
                    <animate
                        attributeName="r"
                        values="60;260"
                        dur="7.5s"
                        begin="5s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.5;0"
                        dur="7.5s"
                        begin="5s"
                        repeatCount="indefinite"
                    />
                </circle>
            </g>

            {/* rotating sweep beam — hidden for reduced motion */}
            <g className="motion-reduce:hidden">
                <path
                    d="M280,280 L530,280 A250,250 0 0,1 484.8,423.5 Z"
                    fill="url(#sweepFade)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 280 280"
                        to="360 280 280"
                        dur="8s"
                        repeatCount="indefinite"
                    />
                </path>
            </g>
            {/* detection points */}
            <g>
                <circle cx="360" cy="220" r="4" fill="#FBBF24" opacity="0.9" />
                <circle cx="340" cy="330" r="3" fill="#FBBF24" opacity="0.7" />
                <circle cx="410" cy="260" r="5" fill="#FBBF24" opacity="0.85" />
                <circle cx="230" cy="200" r="3" fill="#FBBF24" opacity="0.6" />
                <circle cx="195" cy="340" r="4" fill="#FBBF24" opacity="0.8" />
                <circle cx="300" cy="380" r="3" fill="#FBBF24" opacity="0.65" />
            </g>
        </svg>
    );
}

export default Login;
