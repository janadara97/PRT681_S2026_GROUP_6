import { motion } from "framer-motion";
import { quickFacts } from "../data/portfolioData";

export default function About() {
  return (
    <section id="about" className="bg-slate-50 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">About</h2>
          <p className="mt-3 max-w-3xl text-2xl font-bold text-slate-900 dark:text-white">
            Full-stack engineer who ships — from enterprise booking platforms to Northern Territory
            emergency-response tooling.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickFacts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                {fact.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{fact.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
