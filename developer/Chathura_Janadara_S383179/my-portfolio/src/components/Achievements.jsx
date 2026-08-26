import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { achievements } from "../data/portfolioData";

const accents = ["#D97706", "#0891B2", "#7C3AED", "#E11D48"];

export default function Achievements() {
  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-950">
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {achievements.map((item, i) => {
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
