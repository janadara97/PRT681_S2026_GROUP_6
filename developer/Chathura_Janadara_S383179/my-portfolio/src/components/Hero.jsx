import { motion } from "framer-motion";
import { FiArrowRight, FiChevronRight, FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import profilePhoto from "../assets/profile.jpg";
import { coreToolkit, heroIntro, personal } from "../data/portfolioData";

const firstName = personal.name.split(" ")[0];

export default function Hero() {
    return (
        <section id="top" className="relative overflow-hidden bg-white dark:bg-slate-900">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-40 blur-3xl dark:opacity-20"
                style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full opacity-30 blur-3xl dark:opacity-15"
                style={{ background: "radial-gradient(circle, #D97706, transparent 70%)" }}
            />
            <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.4fr_1fr] md:items-start md:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="mb-5 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
                        Darwin-Based · Current WWCC & National Police Check
                    </p>

                    <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                        Hello, I'm {firstName}.
                    </h1>

                    <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                        {heroIntro.map((part) => {
                            if (part.emphasis === "italic") {
                                return (
                                    <em
                                        key={part.text}
                                        className="font-semibold not-italic text-slate-900 dark:text-white"
                                    >
                                        {part.text}
                                    </em>
                                );
                            }
                            if (part.emphasis === "bold") {
                                return (
                                    <strong key={part.text} className="font-bold text-slate-900 dark:text-white">
                                        {part.text}
                                    </strong>
                                );
                            }
                            return <span key={part.text}>{part.text}</span>;
                        })}
                    </p>

                    <div className="mt-8">
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                            Core toolkit:
                        </p>
                        <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                            {coreToolkit.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200"
                                >
                                    <FiChevronRight className="shrink-0 text-blue-700 dark:text-blue-400" size={14} />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <a
                            href="#projects"
                            className="flex items-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                        >
                            View Projects <FiArrowRight size={16} />
                        </a>
                        <a
                            href="/resume.pdf"
                            download
                            className="flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
                        >
                            <FiDownload size={16} /> Download Resume
                        </a>
                        <div className="flex items-center gap-3 pl-2">
                            <a
                                href={personal.github}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="text-slate-500 transition hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-400"
                            >
                                <FiGithub size={20} />
                            </a>
                            <a
                                href={personal.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="text-slate-500 transition hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-400"
                            >
                                <FiLinkedin size={20} />
                            </a>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="relative mx-auto w-full max-w-xs md:max-w-none"
                >
                    <div className="absolute -inset-3 -z-10 rounded-4xl bg-linear-to-br from-blue-100 to-slate-100 dark:from-blue-950 dark:to-slate-800" />
                    <img
                        src={profilePhoto}
                        alt={personal.name}
                        className="aspect-3/4 w-full rounded-3xl border border-slate-200 object-cover shadow-sm dark:border-slate-800"
                    />
                </motion.div>
            </div>
        </section>
    );
}
