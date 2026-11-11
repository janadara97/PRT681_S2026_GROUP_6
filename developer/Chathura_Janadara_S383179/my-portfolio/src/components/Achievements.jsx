import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import { FiArrowRight, FiAward } from "react-icons/fi";
import { achievements } from "../data/portfolioData";

const accents = ["#0891B2", "#7C3AED", "#E11D48", "#D97706"];

// Wins get their own highlighted trophy card; everything else goes in the grid below it.
const wins = achievements.filter((item) => item.winner);
const others = achievements.filter((item) => !item.winner);

export default function Achievements() {
  return (
    <section id="achievements" className="bg-page-alt py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">
            Achievements
          </h2>
          <p className="mt-3 max-w-2xl text-2xl font-bold text-slate-900 dark:text-white">
            Active in the Territory's tech community.
          </p>
        </motion.div>

        {wins.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="relative mt-8 overflow-hidden rounded-3xl border-2 border-amber-300 bg-linear-to-br from-amber-50 via-white to-amber-100 p-6 shadow-sm dark:border-amber-700/60 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 sm:p-8"
          >
            {/* Large faded trophy in the corner, decoration only */}
            <FaTrophy
              aria-hidden="true"
              size={200}
              className="pointer-events-none absolute -right-8 -bottom-10 text-amber-200/60 dark:text-amber-500/10"
            />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              {/* The trophy "pops" in with a small spring when the card scrolls into view */}
              <motion.div
                initial={{ scale: 0.5, rotate: -15 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.2 }}
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-amber-300 to-amber-500 text-white shadow-lg shadow-amber-500/30"
              >
                <FaTrophy size={36} aria-hidden="true" />
              </motion.div>

              <div>
                <span className="inline-block rounded-full bg-amber-700 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {item.award}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm font-semibold text-amber-700 dark:text-amber-400">
                  Winning project: {item.project}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
                <a
                  href="#projects"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 transition hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
                >
                  See the project <FiArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {others.map((item, i) => {
            const accent = accents[i % accents.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-4 rounded-2xl border border-t-4 border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                style={{ borderTopColor: accent }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${accent}1A`, color: accent }}
                >
                  <FiAward size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
