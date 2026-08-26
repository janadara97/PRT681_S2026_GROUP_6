export const personal = {
    name: "Chathura Janadara Kodithuwakku",
    title: "Tech Explorer | Software Engineer | Data Enthusiast | Passionate About IT Evolution",
    location: "Darwin, NT, Australia",
    email: "chathurajanadara97@gmail.com",
    phone: "+61 408 193 825",
    linkedin: "https://www.linkedin.com/in/chathura-janadara/",
    github: "https://github.com/janadara97",
    summary:
        "Software engineer with 3+ years' industry experience across aviation, banking, telecom and education, currently completing a Master of IT (Software Engineering) at Charles Darwin University. Experienced across modern frontend frameworks (React, Vue, Angular) and REST API development, with hands-on exposure to the Microsoft technology stack — .NET Core, Azure, Entra ID (MSAL) and the Power Platform. Skilled in relational databases, DevOps automation (Docker, Jenkins) and identity management (Keycloak). Current research applies deep learning to passive sonar acoustic data for vessel detection.",
};

export const quickFacts = [
    { label: "Based in", value: "Darwin, NT — available now" },
    { label: "Experience", value: "3+ years, full-stack" },
    {
        label: "Compliance",
        value: "Current WWCC (Ochre) & National Police Check",
    },
    {
        label: "Study",
        value: "Master of IT (Software Engineering), CDU — in progress",
    },
];

export const heroIntro = [
    { text: "I'm a " },
    { text: "Full-Stack Software Engineer", emphasis: "italic" },
    { text: " based out of Darwin, Australia, building " },
    { text: "practical software and data-driven systems", emphasis: "bold" },
    { text: " across enterprise and community platforms. Over " },
    { text: "3+ years", emphasis: "bold" },
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
            "React",
            "React Native",
            "Expo",
            "Vue.js",
            "Vuex",
            "AngularJS",
            "Responsive UI",
            "Tailwind CSS",
            "HTML5",
            "CSS3",
            "SCSS",
        ],
    },
    {
        title: "DevOps / CI-CD",
        items: [
            "Docker",
            "Jenkins",
            "Git",
            "Azure DevOps",
            "SonarQube",
            "GitHub Actions",
            "Nginx",
            "GitLab CI",
            "Bitbucket Pipelines",
        ],
    },
    {
        title: "Databases & Identity",
        items: [
            "MySQL",
            "Oracle",
            "Redis",
            "SQLite",
            "Firebase Auth",
            "Keycloak",
            "Clerk",
            "MSAL / Entra ID",
        ],
    },
    {
        title: "BI / Low-code",
        items: [
            "Power BI",
            "Power Apps",
            "Power Automate",
            "SharePoint",
            "Microsoft 365",
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
        githubUrl: "https://github.com/janadara97",
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
        githubUrl: "https://github.com/janadara97",
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
            "Built and improved internal web applications with a React frontend and secure REST APIs connected to a Laravel backend.",
            "Implemented secure authentication using Microsoft Authentication Library (MSAL) and configured Azure Blob Storage (SAS) for secure media management.",
            "Streamlined development with Git, Docker and CI/CD pipelines for automated deployments.",
        ],
    },
    {
        company: "True Blue IT — Darwin Innovation Hub",
        location: "Darwin",
        period: "Apr 2025 – Jul 2025",
        roles: ["Software Engineer — Internship"],
        bullets: [
            "Designed and built a cross-platform mobile app using React Native and Express.js, covering both UI and secure API integration.",
            "Tested across devices and resolved bugs to achieve reliable performance in production.",
            "Collaborated with mentors and industry experts through the CodeUp NT program at the Darwin Innovation Hub.",
        ],
    },
    {
        company: "Information Systems Associates (ISA)",
        location: "Colombo, Sri Lanka",
        period: "Aug 2021 – Oct 2024",
        roles: [
            "Senior Software Engineer (Jan 2024 – Oct 2024)",
            "Software Engineer (Aug 2021 – Dec 2023)",
        ],
        bullets: [
            "Engineered full-stack solutions for the Air Arabia online booking platform — AngularJS frontends and secure Java backend services.",
            "Developed REST APIs for secure payments and third-party integrations, adhering to PCI security standards.",
            "Automated deployments with Jenkins and Docker; tuned MySQL/Redis and resolved live production issues via Kibana.",
            "Progressed from Software Engineer to Senior Software Engineer, mentoring junior developers and leading code reviews.",
        ],
    },
    {
        company: "VizuaMatix (Pvt) Ltd",
        location: "Colombo, Sri Lanka",
        period: "Jul 2020 – Jul 2021",
        roles: [
            "Associate Software Engineer (Jan 2021 – Jul 2021)",
            "Intern Software Engineer (Jul 2020 – Dec 2020)",
        ],
        bullets: [
            "Designed scalable backend REST APIs using Spring Boot and MySQL with clear Swagger documentation.",
            "Built responsive dashboards using React.js and Vue.js for managing complex data.",
            "Set up identity and access management with Keycloak to secure user logins.",
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
        period: "Nov 2024 – Present",
    },
    {
        degree: "B.Sc. (Hons) Degree in Computer Science",
        school: "General Sir John Kotelawala Defence University, Ratmalana, Sri Lanka",
        period: "Jan 2018 – Dec 2022",
    },
];

export const certifications = [
    "Microsoft AZ-900 (In progress) — Microsoft",
    "ASP.NET Core Full Course For Beginners (.NET 10) — YouTube",
    "Power BI Essential Training — LinkedIn Learning",
    "Learning Jira (Cloud Edition) — LinkedIn Learning",
    "Getting Started with Microsoft 365 — LinkedIn Learning",
    "Microsoft SQL Server 2022 Essential Training — LinkedIn Learning",
];

export const compliance = [
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
