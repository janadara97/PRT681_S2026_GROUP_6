export const personal = {
    name: "Chathura Janadara Kodithuwakku",
    title: "Tech Explorer | Software Engineer | Data Enthusiast | Passionate About IT Evolution",
    location: "Darwin, NT, Australia",
    email: "chathurajanadara97@gmail.com",
    phone: "+61 408 193 825",
    linkedin: "https://www.linkedin.com/in/chathura-janadara/",
    github: "https://github.com/janadara97",
    website: "https://www.chathura.com.au",
    summary:
        "Software Developer and Associate Member of the Australian Computer Society with nearly 4 years of experience supporting digital transformation initiatives across government, education and aviation sectors. Skilled in full-stack development, scripting, and the administration of development, test and production environments across Windows and Linux platforms. Proven ability to build, maintain and support core enterprise applications. Based locally in Darwin.",
};

export const quickFacts = [
    { label: "Based in", value: "Darwin, NT — available now" },
    { label: "Experience", value: "Nearly 4 years, full-stack" },
    {
        label: "Compliance",
        value: "Current WWCC (Ochre) & National Police Check",
    },
    {
        label: "Study",
        value: "Master of IT (Software Engineering), CDU — completing Oct 2026",
    },
];

export const heroIntro = [
    { text: "I'm a " },
    { text: "Full-Stack Software Engineer", emphasis: "italic" },
    { text: " based out of Darwin, Australia, building " },
    { text: "practical software and data-driven systems", emphasis: "bold" },
    { text: " across government, education and aviation. " },
    { text: "Nearly 4 years", emphasis: "bold" },
    { text: " designing and shipping " },
    { text: "software", emphasis: "italic" },
    { text: " that scales." },
];

export const coreToolkit = [
    "Full-Stack Development (React & .NET)",
    "ASP.NET Core & Entity Framework",
    "Java & Spring Boot",
    "DevOps & CI/CD (Docker, Jenkins)",
    "Azure Cloud & Identity (App Services, Blob Storage, MSAL)",
    "Azure DevOps & CI/CD Pipelines",
    "SQL Server & MySQL",
    "Power BI & Data Analytics",
    "Agile Delivery (Jira, Scrum)",
];

export const coreStack = [
    "React",
    ".NET / C#",
    "Java / Spring Boot",
    "REST APIs",
    "SQL Server / MySQL",
    "Azure",
];

export const skillGroups = [
    {
        title: "Backend / APIs",
        items: [
            "Java",
            "C#",
            ".NET Core",
            "Spring Boot",
            "PHP",
            "Laravel",
            "Node.js",
            "Express.js",
            "Python",
            "REST",
            "gRPC",
            "SOAP",
            "Swagger",
            "OpenAPI",
            "Microservices",
            "RabbitMQ",
        ],
    },
    {
        title: "Frontend / Mobile",
        items: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "KendoReact",
            "React Native",
            "Expo",
            "Vue.js",
            "Vuex",
            "AngularJS",
            "Vite",
            "Tailwind CSS",
            "Bootstrap",
            "jQuery",
            "HTML5",
            "CSS3",
            "SCSS",
            "Responsive UI",
        ],
    },
    {
        title: "UI Design & Accessibility",
        items: [
            "Figma",
            "Adobe XD",
            "Semantic HTML",
            "ARIA",
            "Keyboard Navigation",
            "Colour Contrast Testing",
            "Google Lighthouse",
            "User-Centred Design",
        ],
    },
    {
        title: "DevOps / CI-CD",
        items: [
            "Docker",
            "Jenkins",
            "Git",
            "GitHub Actions",
            "Azure DevOps",
            "GitLab CI",
            "Bitbucket Pipelines",
            "SonarQube",
            "Nginx",
            "Linux",
        ],
    },
    {
        title: "Cloud & Databases",
        items: [
            "Azure Container Apps",
            "Azure Container Registry",
            "Azure App Service",
            "Azure Blob Storage",
            "SQL Server",
            "PostgreSQL",
            "MySQL",
            "Oracle",
            "Redis",
            "SQLite",
        ],
    },
    {
        title: "Identity & Security",
        items: [
            "JWT",
            "MSAL / Entra ID",
            "Keycloak",
            "Clerk",
            "Firebase Auth",
            "Role-Based Access Control",
            "Secure Coding (XSS, CSRF, SQL Injection)",
            "PCI Standards",
        ],
    },
    {
        title: "Observability & Tools",
        items: [
            "Serilog",
            "Seq",
            "Exceptionless",
            "Temporal.io",
            "Jira",
            "Chrome DevTools",
            "VS Code",
            "Agile",
            "Scrum",
        ],
    },
    {
        title: "CMS / Low-code / BI",
        items: [
            "Squiz DXP",
            "Custom CMS",
            "SharePoint",
            "SPFx",
            "Power Apps",
            "Power Automate",
            "Microsoft 365",
            "Power BI",
            "Drupal (learning)",
        ],
    },
    {
        title: "Data / ML",
        items: [
            "Python",
            "Machine Learning",
            "Deep Learning",
            "EDA",
            "Acoustic Signal Processing",
        ],
    },
];

export const featuredProjects = [
    {
        title: "NT Wet Season Incident & Resource Coordinator",
        period: "Personal full-stack project — in development",
        problem:
            "During NT wet season emergencies, field officers and coordinators need a reliable way to report incidents and allocate limited equipment without conflicts like double-booking the same resource.",
        solution:
            "A full-stack incident coordination system where field officers log incidents and coordinators assign resources, with business-rule enforcement built into the API layer to prevent scheduling conflicts.",
        stack: [
            ".NET",
            "C#",
            "ASP.NET Core Web API",
            "Entity Framework Core",
            "SQL Server",
            "React",
            "Docker",
            "Azure",
            "RabbitMQ",
            "IIS",
            "OpenLDAP",
        ],
        githubUrl:
            "https://github.com/janadara97/PRT681_S2026_GROUP_6/tree/main/developer/Chathura_Janadara_S383179/WetSeason",
        comingSoon: true,
        progress: [
            { label: "Planning & Architecture", done: true },
            { label: "Backend API (ASP.NET Core + EF Core)", active: true },
            { label: "Frontend (React)" },
            { label: "Deployment & Testing" },
        ],
    },
    {
        title: "NT FireWatch — Geospatial Bushfire Monitoring Platform",
        period: "Personal full-stack project",
        problem:
            "Communities and responders need near-real-time visibility into bushfire activity across the Northern Territory's vast geography.",
        solution:
            "A cross-platform (web & mobile) application that ingests and spatially filters satellite fire-hotspot feeds onto an interactive map with recency-based styling and secure access, deployed to the cloud through an automated CI/CD pipeline.",
        stack: [
            "React",
            "Expo",
            "Express",
            "PostgreSQL",
            "PostGIS",
            "QGIS",
            "Clerk",
            "Docker",
            "Jenkins CI/CD",
            "Apache HTTP Server",
            "AlmaLinux",
            "Azure",
        ],
        githubUrl: "https://github.com/janadara97/nt-fire-watch",
        link: "https://www.firewatch.chathura.com.au",
        powerBiEmbedUrl:
            "https://app.powerbi.com/view?r=eyJrIjoiMTE5ODcwZjgtZWMyZC00MDllLWFhOTctMGIzYTZkMjliNTZlIiwidCI6IjlmMjQ4NzY3LThlMWEtNDJmMy04MzZmLWMwOTJhYjk1ZmY3MCJ9",
    },
    {
        title: "Underwater Acoustic & Sonar-Based Ship Detection",
        period: "Master's Research — Charles Darwin University",
        problem:
            "Passive sonar (hydrophone) data is noisy and high-dimensional, making reliable vessel classification a hard signal-processing and modelling problem.",
        solution:
            "Deep-learning classification of vessels from passive sonar data, combining acoustic signal processing and exploratory data analysis to build a robust detection pipeline.",
        stack: [
            "Python",
            "Machine Learning",
            "Deep Learning",
            "Acoustic Signal Processing",
            "Passive Sonar",
        ],
        githubUrl: "https://github.com/janadara97",
    },
];

export const otherProjects = [
    // {
    //     title: "Digital Platform for Medical Student Progression & Records",
    //     period: "Charles Darwin University",
    //     description:
    //         "A low-code platform for tracking medical student progression and records.",
    //     stack: ["Power Apps", "Power Automate", "SharePoint", "Microsoft 365"],
    // },
];

export const experience = [
    {
        company: "Haileybury Rendall School",
        location: "Berrimah, Darwin",
        period: "Jul 2026 – Present",
        roles: ["DevOps Engineer — Internship"],
        bullets: [
            "Redesigned a legacy school web application as a responsive React and Tailwind CSS single-page app, using semantic HTML, keyboard navigation, contrast checks and Lighthouse audits to improve accessibility.",
            "Built and administered the Subject Guide application, a content management system where staff create and publish subject content and videos, managing user roles and permissions.",
            "Integrated MSAL (Microsoft Entra ID) single sign-on, Azure Blob Storage, a Laravel REST API and MySQL, deployed with Docker.",
            "Designed user-friendly admin workflows with one task per screen, tooltips, validation and confirmation messages, reducing input errors for staff.",
            "Gathered requirements from teachers and admin staff, and wrote plain-language user guides and developer documentation.",
            "Collaborate in an Agile team using Git, Jira and CI/CD, contributing to code reviews and continuous improvement, and providing IT support to students and staff.",
        ],
    },
    {
        company: "True Blue IT — Darwin Innovation Hub",
        location: "Darwin",
        period: "Apr 2025 – Jul 2025",
        roles: ["Software Engineer"],
        bullets: [
            "Designed app screens and user flows in Figma, then built a cross-platform mobile app using React Native and Express.js, covering the user interface and secure API integration.",
            "Applied accessibility and performance practices, including colour contrast, screen reader labels and optimised loading, so the app worked well for all users across devices.",
            "Set up Google Analytics to track user behaviour and used the insights to improve usability.",
            "Created marketing and presentation visuals in Canva and presented progress demos to stakeholders.",
            "Tested and resolved bugs, and wrote technical documentation and handover notes to support project continuity.",
            "Collaborated with mentors and industry experts through the CodeUp NT program.",
        ],
    },
    {
        company: "Information Systems Associates (ISA)",
        location: "Colombo, Sri Lanka",
        period: "Aug 2022 – Oct 2024",
        roles: [
            "Senior Software Engineer (Jan 2024 – Oct 2024)",
            "Software Engineer (Aug 2022 – Dec 2023)",
        ],
        bullets: [
            "Led front-end development for Air Arabia's customer-facing Internet Booking Engine using AngularJS and SCSS, integrated with a Java Spring Boot backend, focusing on usability, performance and security.",
            "Built and integrated REST APIs for payments and third-party services, following PCI security standards and protecting sensitive passenger data.",
            "Prioritised and resolved production issues within SLA, tracing root causes through log analysis while keeping planned releases on track.",
            "Improved service reliability through Jenkins and Docker deployment automation and database optimisation.",
            "Worked closely with product managers and the UI/UX team to clarify requirements, and mentored junior developers through code reviews.",
            "Built Power BI dashboards to identify recurring issues and support service improvements.",
        ],
    },
    {
        company: "VizuaMatix (Pvt) Ltd",
        location: "Colombo, Sri Lanka",
        period: "Jul 2021 – Jul 2022",
        roles: [
            "Associate Software Engineer (Jan 2022 – Jul 2022)",
            "Intern Software Engineer (Jul 2021 – Dec 2021)",
        ],
        bullets: [
            "Developed front-end features for a Vue.js CRM for a Sri Lankan government client, enabling administrators to create and publish dynamic forms and manage content, users and access.",
            "Built responsive dashboards using Vue.js and React.js that worked across desktop and mobile.",
            "Developed REST APIs using Spring Boot and MySQL, with Swagger documentation for reliable integration.",
            "Implemented identity and access management using Keycloak.",
            "Took part in sprint planning, design discussions and peer code reviews.",
        ],
    },
];

export const achievements = [
    {
        title: "GovHack 2025",
        description:
            "Built an AI tool using RAG and vectorised metadata, providing full audit trails for reliable government decision support.",
    },
    {
        title: "CDU IT Code Fair 2025",
        description:
            "Designed a sentiment-analysis solution on public tourism data to predict economic impacts and propose data-driven growth strategies for the Territory.",
    },
];

export const education = [
    {
        degree: "Master of Information Technology (Software Engineering)",
        school: "Charles Darwin University, Casuarina, NT",
        period: "Nov 2024 – Oct 2026",
    },
    {
        degree: "B.Sc. (Hons) Degree in Computer Science",
        school: "General Sir John Kotelawala Defence University, Ratmalana, Sri Lanka",
        period: "Jan 2018 – Jan 2022",
    },
];

export const certifications = [
    "Component Service: Building and managing components for developers — Squiz Academy",
    "Microsoft AZ-900 (In progress) — Microsoft",
    "ASP.NET Core Full Course For Beginners (.NET 10) — YouTube",
    "Power BI Essential Training — LinkedIn Learning",
    "Learning Jira (Cloud Edition) — LinkedIn Learning",
    "Getting Started with Microsoft 365 — LinkedIn Learning",
    "Microsoft SQL Server 2022 Essential Training — LinkedIn Learning",
];

export const compliance = [
    "Associate Member — Australian Computer Society",
    "Ochre (Working with Children) Card",
    "National Police Check",
    "NT Driving Licence",
];

export const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
];
