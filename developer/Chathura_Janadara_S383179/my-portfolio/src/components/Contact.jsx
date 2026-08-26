import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { personal } from "../data/portfolioData";

const links = [
  { label: personal.email, href: `mailto:${personal.email}`, icon: FiMail },
  { label: personal.phone, href: `tel:${personal.phone.replace(/\s/g, "")}`, icon: FiPhone },
  { label: "LinkedIn", href: personal.linkedin, icon: FiLinkedin },
  { label: "GitHub", href: personal.github, icon: FiGithub },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-slate-900 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400">Contact</h2>
          <p className="mt-3 text-3xl font-bold text-white">Let's talk about your next hire.</p>
          <p className="mt-4 text-slate-300">
            Based in Darwin, NT, and ready for opportunities across government and industry.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-blue-400 hover:text-blue-400"
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
