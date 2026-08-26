import { motion } from "framer-motion";
import { experience } from "../data/portfolioData";

export default function Experience() {
  return (
    <section id="experience" className="bg-white py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">
            Experience
          </h2>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Career timeline</p>
        </motion.div>

        <div className="relative mt-10 space-y-8 border-l border-slate-200 pl-8 dark:border-slate-800">
          {experience.map((job, i) => (
            <motion.div
              key={job.company + job.period}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative"
            >
              <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-blue-700 bg-white dark:border-blue-400 dark:bg-slate-900" />
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                {job.period}
              </p>
              <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{job.company}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{job.location}</p>
              <div className="mt-2 space-y-0.5">
                {job.roles.map((role) => (
                  <p key={role} className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                    {role}
                  </p>
                ))}
              </div>
              <ul className="mt-3 space-y-1.5">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
