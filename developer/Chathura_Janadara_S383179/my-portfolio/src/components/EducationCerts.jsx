import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { compliance, education } from "../data/portfolioData";

export default function EducationCerts() {
    return (
        <section id="education" className="bg-white py-20 dark:bg-slate-900">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">
                        Education & Credentials
                    </h2>
                </motion.div>

                <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Education</h3>
                        <div className="mt-4 space-y-4">
                            {education.map((ed) => (
                                <div
                                    key={ed.degree}
                                    className="rounded-2xl border border-t-4 border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                                    style={{ borderTopColor: "#2563EB" }}
                                >
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                        {ed.degree}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{ed.school}</p>
                                    <p className="mt-1 text-xs font-medium text-blue-700 dark:text-blue-400">
                                        {ed.period}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* <div className="md:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Certifications & Training</h3>
            <ul className="mt-4 space-y-2">
              {certifications.map((cert) => (
                <li key={cert} className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {cert}
                </li>
              ))}
            </ul>
          </div> */}

                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            Right to Work & Compliance
                        </h3>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {compliance.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                                >
                                    <FiCheckCircle
                                        className="shrink-0 text-emerald-600 dark:text-emerald-400"
                                        size={16}
                                    />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
