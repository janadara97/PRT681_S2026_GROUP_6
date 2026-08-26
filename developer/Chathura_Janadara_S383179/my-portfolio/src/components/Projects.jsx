import { motion } from "framer-motion";
import { featuredProjects, otherProjects } from "../data/portfolioData";
import ProjectCard from "./ProjectCard";

// One accent per featured project, loosely tied to its domain (wet season = blue, fire = amber, sonar/water = cyan).
const projectAccents = ["#2563EB", "#D97706", "#0891B2"];

export default function Projects() {
    return (
        <section id="projects" className="bg-white py-20 dark:bg-slate-900">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">
                        Featured Work
                    </h2>
                    <p className="mt-3 max-w-2xl text-2xl font-bold text-slate-900 dark:text-white">
                        Real systems, built and shipped.
                    </p>
                </motion.div>

                <div className="mt-10 grid gap-6">
                    {featuredProjects.map((project, i) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={i}
                            accent={projectAccents[i % projectAccents.length]}
                        />
                    ))}
                </div>

                {otherProjects.length > 0 && (
                    <div className="mt-10">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            Other Projects
                        </h3>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {otherProjects.map((project) => (
                                <div
                                    key={project.title}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
                                >
                                    <h4 className="font-semibold text-slate-900 dark:text-white">
                                        {project.title}
                                    </h4>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                        {project.description}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {project.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
