import { motion } from "framer-motion";
import { coreStack, skillGroups } from "../data/portfolioData";
import { skillIcons } from "../data/skillIcons";

const categoryAccents = {
  "Backend / APIs": "#2563EB",
  "Frontend / Mobile": "#059669",
  "DevOps / CI-CD": "#D97706",
  "Databases & Identity": "#E11D48",
  "BI / Low-code": "#7C3AED",
  "Data / ML": "#0891B2",
};

function SkillChip({ item }) {
  const entry = skillIcons[item];

  if (!entry) {
    return (
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        {item}
      </span>
    );
  }

  const { icon: Icon, color } = entry;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold"
      style={{ backgroundColor: `${color}1A`, borderColor: `${color}40`, color }}
    >
      <Icon size={13} />
      {item}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="bg-slate-50 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">
            Skills
          </h2>
          <p className="mt-3 max-w-2xl text-2xl font-bold text-slate-900 dark:text-white">
            Broad technical range, anchored by a clear core stack.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/40"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
            Core Stack
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {coreStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-blue-700 px-3.5 py-1.5 text-sm font-semibold text-white dark:bg-blue-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const accent = categoryAccents[group.title] ?? "#2563EB";
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-t-4 border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                style={{ borderTopColor: accent }}
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{group.title}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <SkillChip key={item} item={item} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
