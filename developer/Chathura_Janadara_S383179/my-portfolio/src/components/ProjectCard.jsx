import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";

export default function ProjectCard({ project, index, accent = "#2563EB" }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl border border-t-4 border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-8"
      style={{ borderTopColor: accent }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
          <p className="mt-1 text-sm font-medium" style={{ color: accent }}>
            {project.period}
          </p>
        </div>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.title} on GitHub`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition"
          style={{ borderColor: `${accent}40`, color: accent, backgroundColor: `${accent}0D` }}
        >
          <FiGithub size={16} />
        </a>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            The Problem
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.problem}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            The Solution
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.solution}</p>
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
    </motion.article>
  );
}
