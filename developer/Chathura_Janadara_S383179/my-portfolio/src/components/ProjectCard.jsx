import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiArrowUpRight, FiChevronDown, FiClock, FiGithub } from "react-icons/fi";

export default function ProjectCard({ project, index, accent = "#2563EB" }) {
    const [showProgress, setShowProgress] = useState(false);

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl border border-t-4 border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-8"
            style={{ borderTopColor: accent }}
        >
            <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                <p className="mt-1 text-sm font-medium" style={{ color: accent }}>
                    {project.period}
                </p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        The Problem
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {project.problem}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        The Solution
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {project.solution}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                    <span
                        key={tech}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                {project.link && (
                    <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm transition"
                        style={{ backgroundColor: accent }}
                    >
                        View Live
                        <FiArrowUpRight
                            size={15}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </motion.a>
                )}

                {project.comingSoon && (
                    <motion.button
                        type="button"
                        onClick={() => setShowProgress((v) => !v)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 rounded-full border border-dashed px-4 py-2 text-sm font-semibold transition"
                        style={{ borderColor: `${accent}60`, color: accent, backgroundColor: `${accent}0D` }}
                    >
                        <FiClock size={15} />
                        Coming Soon
                        <FiChevronDown
                            size={14}
                            className={`transition-transform ${showProgress ? "rotate-180" : ""}`}
                        />
                    </motion.button>
                )}

                {project.githubUrl && (
                    <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition"
                        style={{ borderColor: `${accent}40`, color: accent, backgroundColor: `${accent}0D` }}
                    >
                        <FiGithub size={15} />
                        Source Code
                    </motion.a>
                )}
            </div>

            <AnimatePresence>
                {showProgress && project.progress && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                            {project.progress.map((step) => (
                                <div key={step.label} className="flex items-center gap-2.5 text-sm">
                                    <span
                                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                                        style={
                                            step.done
                                                ? { backgroundColor: accent, color: "#fff" }
                                                : step.active
                                                  ? { border: `2px solid ${accent}`, color: accent }
                                                  : { border: "2px solid #cbd5e1", color: "transparent" }
                                        }
                                    >
                                        {step.done ? "✓" : ""}
                                    </span>
                                    <span
                                        className={
                                            step.active
                                                ? "font-semibold"
                                                : step.done
                                                  ? "text-slate-500 dark:text-slate-400"
                                                  : "text-slate-400 dark:text-slate-500"
                                        }
                                        style={step.active ? { color: accent } : undefined}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
}
