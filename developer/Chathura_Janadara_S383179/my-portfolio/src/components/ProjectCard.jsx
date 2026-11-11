import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiBarChart2, FiChevronDown, FiClock, FiGithub, FiPlayCircle } from "react-icons/fi";

export default function ProjectCard({ project, index, accent = "#2563EB" }) {
    const [showProgress, setShowProgress] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    // Only draw the button bar when the project has at least one button,
    // otherwise an empty bordered strip would show.
    const hasActions =
        project.comingSoon || project.powerBiEmbedUrl || project.videoEmbedUrl || project.githubUrl;

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl border border-t-4 border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-8"
            style={{
                borderTopColor: accent,
                // A soft wash of the project's own colour, strongest in the top-left corner.
                // The colour is see-through (the "1F" / "05" on the end is opacity), so the same
                // value sits on white in light mode and on dark slate in dark mode.
                backgroundImage: `linear-gradient(135deg, ${accent}1F 0%, ${accent}05 60%, transparent 100%)`,
            }}
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
                        className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:ring-slate-700"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {hasActions && (
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
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

                    {project.powerBiEmbedUrl && (
                        <motion.button
                            type="button"
                            onClick={() => setShowReport((v) => !v)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition"
                            style={{ borderColor: `${accent}40`, color: accent, backgroundColor: `${accent}0D` }}
                        >
                            <FiBarChart2 size={15} />
                            View Report
                            <FiChevronDown size={14} className={`transition-transform ${showReport ? "rotate-180" : ""}`} />
                        </motion.button>
                    )}

                    {project.videoEmbedUrl && (
                        <motion.button
                            type="button"
                            onClick={() => setShowVideo((v) => !v)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition"
                            style={{ borderColor: `${accent}40`, color: accent, backgroundColor: `${accent}0D` }}
                        >
                            <FiPlayCircle size={15} />
                            Watch Intro
                            <FiChevronDown size={14} className={`transition-transform ${showVideo ? "rotate-180" : ""}`} />
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
            )}

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

            <AnimatePresence>
                {showReport && project.powerBiEmbedUrl && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div
                            className="mt-4 w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
                            style={{ aspectRatio: "600 / 373.5" }}
                        >
                            <iframe
                                title={`${project.title} — Power BI Report`}
                                src={project.powerBiEmbedUrl}
                                className="h-full w-full border-0"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showVideo && project.videoEmbedUrl && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-black dark:border-slate-800">
                            {/* The player is only created when the panel opens, so the page doesn't
                                load YouTube for visitors who never click the button.
                                referrerPolicy is needed: YouTube refuses to play embeds that send no referrer. */}
                            <iframe
                                title={`${project.title} — Intro Video`}
                                src={project.videoEmbedUrl}
                                className="h-full w-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
}
