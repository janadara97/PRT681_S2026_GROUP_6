export const personal = {
    name: "Chathura Janadara Kodithuwakku",
    title: "Full-Stack Software Engineer",
    location: "Berrimah, NT 0828, Australia",
    email: "chathurajanadara97@gmail.com",
    phone: "+61 408 193 825",
    linkedin: "https://www.linkedin.com/in/chathura-janadara/",
    github: "https://github.com/janadara97",
    website: "https://www.chathura.com.au",
    summary:
        "Full-Stack Software Engineer with nearly four years of commercial experience building multi-layered web applications and REST/SOAP integrations across aviation, banking, education and telecommunications. Skilled in C#, .NET (ASP.NET Core Web API, MVC, Entity Framework Core), SQL Server, Java (Spring Boot), React, AngularJS and Azure. Proven ability to turn operational data into actionable business insights using MySQL and Power BI. Holds a current NT Ochre Card and National Police Check.",
};

export const quickFacts = [
    { label: "Based in", value: "Darwin, NT — available now" },
    { label: "Experience", value: "Nearly 4 years, full-stack" },
    {
        label: "Compliance",
        value: "Current NT Ochre Card & National Police Check",
    },
    {
        label: "Study",
        value: "Master of IT (Software Engineering), CDU — Nov 2024 – Oct 2026",
    },
];

export const heroIntro = [
    { text: "I'm a " },
    { text: "Full-Stack Software Engineer", emphasis: "italic" },
    { text: " based in Darwin, Australia, building " },
    { text: "multi-layered web applications and REST/SOAP integrations", emphasis: "bold" },
    { text: " across aviation, banking, education and telecommunications. " },
    { text: "Nearly 4 years", emphasis: "bold" },
    { text: " of commercial experience designing and shipping " },
    { text: "software", emphasis: "italic" },
    { text: " that scales." },
];

export const coreToolkit = [
    "C# & .NET (ASP.NET Core Web API, MVC)",
    "Entity Framework Core & SQL Server",
    "REST / SOAP Integrations & Microservices",
    "Java & Spring Boot",
    "React & AngularJS",
    "Azure (App Service, Container Apps, Blob Storage)",
    "DevOps & CI/CD (Docker, Jenkins, Azure DevOps)",
    "MySQL & Power BI Reporting",
    "Agile Delivery (Jira, Scrum)",
];

export const coreStack = [
    ".NET / C#",
    "ASP.NET Core",
    "SQL Server",
    "Java / Spring Boot",
    "React",
    "REST / SOAP APIs",
    "Azure",
];

export const skillGroups = [
    {
        title: "Programming Languages",
        items: ["C#", "Java", "JavaScript", "TypeScript", "Python", "PHP", "SQL"],
    },
    {
        title: "Backend",
        items: [
            ".NET Core",
            "ASP.NET Core",
            "Entity Framework Core",
            "LINQ",
            "Spring Boot",
            "Spring Security",
            "Spring Data JPA",
            "Spring Cloud",
            "Node.js",
            "Express.js",
            "Sequelize",
            "Laravel",
        ],
    },
    {
        title: "Integration & APIs",
        items: [
            "REST APIs",
            "SOAP Web Services",
            "gRPC",
            "RabbitMQ",
            "Swagger",
            "Microservices",
            "Third-party & Payment Integrations",
        ],
    },
    {
        title: "Databases",
        items: ["SQL Server", "MySQL", "PostgreSQL", "SQLite", "Redis", "Firebase"],
    },
    {
        title: "Frontend & Mobile",
        items: [
            "React",
            "Next.js",
            "AngularJS",
            "Vue.js",
            "Vuex",
            "KendoReact",
            "React Native",
            "Expo",
            "HTML5",
            "CSS3",
            "SCSS",
            "jQuery",
            "Bootstrap",
            "Tailwind CSS",
        ],
    },
    {
        title: "UI Design & Prototyping",
        items: ["Figma", "Adobe XD"],
    },
    {
        title: "CMS & Content Platforms",
        items: ["Squiz DXP", "Custom CMS Development", "SharePoint"],
    },
    {
        title: "Testing",
        items: ["Unit Testing", "Cross-device Testing", "NUnit", "JUnit", "Jest"],
    },
    {
        title: "Authentication",
        items: ["MSAL / Entra ID", "Keycloak", "Clerk", "OpenLDAP", "Firebase Auth", "JWT"],
    },
    {
        title: "DevOps & CI/CD",
        items: [
            "Git",
            "GitHub",
            "Azure DevOps",
            "GitHub Actions",
            "GitLab CI",
            "Bitbucket Pipelines",
            "Jenkins",
            "Docker",
            "SonarQube",
            "IIS",
            "Nginx",
            "Apache",
            "Linux",
            "PowerShell",
        ],
    },
    {
        title: "Cloud, BI & Microsoft Platform",
        items: [
            "Azure Container Apps",
            "Azure Container Registry",
            "Azure App Service",
            "Azure Blob Storage",
            "Azure VMs",
            "Power BI",
            "Power Apps",
            "Power Automate",
            "SPFx",
            "Microsoft 365",
        ],
    },
    {
        title: "Logging & Monitoring",
        items: ["Serilog", "Seq", "Exceptionless", "Temporal.io"],
    },
    {
        title: "Data & Machine Learning",
        items: ["Machine Learning", "Deep Learning", "EDA", "Acoustic Signal Processing"],
    },
    {
        title: "Development Tools",
        items: [
            "Visual Studio",
            "SSMS",
            "Rider",
            "VS Code",
            "IntelliJ IDEA",
            "DataGrip",
            "PhpStorm",
            "Chrome DevTools",
            "Jira",
        ],
    },
    {
        title: "Methodologies",
        items: ["Agile", "Scrum"],
    },
];

export const featuredProjects = [
    {
        title: "GovWallet NT — Privacy-First Concession Card Wallet",
        period: "CDU IT Code Fair 2026, Darwin",
        problem:
            "Proving you are eligible for a concession usually means showing a card that reveals your personal details to whoever checks it.",
        solution:
            "A digital wallet that lets a cardholder prove eligibility by QR code without revealing personal details, using SD-JWT selective disclosure. An ASP.NET Core issuer API signs credentials with ECDSA P-256, and two React PWAs — a wallet with a non-extractable device key and an offline verifier that shows only \"eligible\" or \"not eligible\" — are deployed on Azure, with tests and a threat model.",
        stack: [
            "C#",
            "ASP.NET Core Web API",
            "Entity Framework Core",
            "SQLite",
            "React",
            "Progressive Web Apps (PWA)",
            "SD-JWT",
            "KB-JWT",
            "JWK",
            "ECDSA P-256",
            "WebCrypto API",
            "html5-qrcode",
            "SCSS",
        ],
        link: "https://www.govwallet.wallet.chathura.com.au",
    },
    {
        title: "NT FireWatch — Geospatial Bushfire Monitoring Platform",
        period: "Personal full-stack project, Darwin",
        problem:
            "Communities and responders need near-real-time visibility into bushfire activity across the Northern Territory's vast geography.",
        solution:
            "A cross-platform application that visualises near-real-time satellite fire-hotspot data across the Northern Territory, ingesting and spatially filtering feeds to an interactive map with recency-based styling and secure user access, deployed to the cloud through an automated CI/CD pipeline.",
        stack: [
            "React",
            "Expo (web and mobile)",
            "Express.js",
            "PostgreSQL",
            "PostGIS",
            "QGIS",
            "Clerk",
            "Docker",
            "Jenkins CI/CD",
            "Apache HTTP Server",
            "AlmaLinux (RHEL)",
            "Azure",
        ],
        githubUrl: "https://github.com/janadara97/nt-fire-watch",
        link: "https://www.firewatch.chathura.com.au",
        powerBiEmbedUrl:
            "https://app.powerbi.com/view?r=eyJrIjoiMTE5ODcwZjgtZWMyZC00MDllLWFhOTctMGIzYTZkMjliNTZlIiwidCI6IjlmMjQ4NzY3LThlMWEtNDJmMy04MzZmLWMwOTJhYjk1ZmY3MCJ9",
    },
    {
        title: "NT Wet Season Incident & Resource Coordinator",
        period: "Personal full-stack project (in development), Darwin",
        problem:
            "During NT wet season emergencies, field officers and coordinators need a reliable way to report incidents and allocate limited equipment without conflicts like double-booking the same resource.",
        solution:
            "A full-stack incident coordination system that enables field officers to report incidents and coordinators to assign resources, while enforcing business rules that prevent conflicts such as double-booked equipment.",
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
            { label: "Backend API (ASP.NET Core + EF Core)", done: true },
            { label: "Frontend (React)", done: true },
            { label: "Deployment & Testing", active: true },
        ],
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
    {
        title: "Digital Platform for Medical Student Progression & Records",
        period: "Charles Darwin University",
        description: "Developed a platform for tracking medical students' progress and records.",
        stack: ["Power Apps", "Power Automate", "SharePoint", "Microsoft 365"],
    },
];

export const experience = [
    {
        company: "Haileybury Rendall School",
        location: "Berrimah, Darwin, NT",
        period: "Jul 2026 – Sep 2026",
        roles: ["DevOps Engineer — Internship"],
        bullets: [
            "Modernised Subject Guide, a legacy web application that helps students and parents choose school subjects, into a responsive React single-page application backed by a Laravel REST API with strict request validation and versioned endpoints.",
            "Built a CRM-style admin panel for staff to manage subject content and to create and manage parent–teacher meetings.",
            "Learned Microsoft Entra ID (MSAL) and Azure Blob Storage on the job, delivering role-based authentication and secure file delivery with SAS tokens.",
            "Analysed legacy systems by tracing data flows across the database and application code, documenting findings before changes, and consolidating duplicate and inconsistent records into a single trusted record.",
            "Containerised the application with Docker, managed Git branching and pull requests in Bitbucket, and wrote unit tests with Jest.",
            "Worked in an Agile team using Jira, contributing to code reviews and technical documentation, including API reference guides and database schemas.",
            "Delivered daily IT help desk support, resolving application, hardware and account access issues for students and staff.",
        ],
    },
    {
        company: "True Blue IT — Darwin Innovation Hub",
        location: "Darwin, NT",
        period: "Apr 2025 – Jul 2025",
        roles: ["Software Engineer"],
        bullets: [
            "Designed and built a cross-platform mobile app with React Native, and developed the Express.js REST API behind it, including secure authentication and data integration.",
            "Tested the app across devices, wrote unit tests with Jest, and resolved bugs before release, delivering a stable app on iOS and Android.",
            "Designed and managed MySQL databases, keeping data accurate and consistent for business reporting.",
            "Wrote technical documentation and handover notes so the next development team could continue without disruption.",
            "Presented progress and worked with mentors and industry experts through the CodeUp NT program.",
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
            "Led feature development on Air Arabia's booking platform from design to release, including design documents, design reviews and Swagger API contracts, coordinating work across developers, QA, designers and product managers.",
            "Built and maintained features in a legacy ASP.NET MVC (C#) backend with SQL Server, including new endpoints, request validation and error handling.",
            "Integrated the .NET backend with search, payment and ancillary microservices via gRPC, and built REST APIs exposed through the API gateway.",
            "Developed and supported SOAP web services for online travel agency (OTA) partners, tested with SoapUI, and used RabbitMQ to send booking confirmation emails asynchronously.",
            "Worked with business analysts, product managers and third-party payment teams to gather requirements and deliver PCI-compliant integrations.",
            "Investigated and resolved high-priority production issues across services, and wrote NUnit unit tests for fixes and new features, running in the CI pipeline.",
            "Automated builds and deployments with Jenkins and Docker, and built Power BI dashboards to track recurring issues.",
            "Mentored junior engineers through code reviews and knowledge sharing.",
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
            "Built features for a government client's CRM in Vue.js and Vuex, letting administrators create and publish dynamic forms and manage content and users.",
            "Developed scalable REST APIs using Spring Boot, Spring Data JPA and MySQL, with clear Swagger documentation.",
            "Built responsive dashboards using React.js and Vue.js, helping users access and manage information efficiently.",
            "Improved system security by implementing identity and access management with Keycloak.",
            "Collaborated in an Agile team through design discussions, sprint planning and peer code reviews.",
        ],
    },
];

export const achievements = [
    {
        title: "CDU IT Code Fair 2026",
        description:
            "Built GovWallet NT, a privacy-first concession card wallet that proves eligibility by QR code without revealing personal details, using SD-JWT selective disclosure.",
    },
    {
        title: "GovHack 2025",
        description:
            "Built an AI decision-support tool with full audit trails to support reliable government decision-making.",
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
        school: "Charles Darwin University, Darwin, NT",
        period: "Nov 2024 – Oct 2026",
    },
    {
        degree: "B.Sc. (Hons) Computer Science",
        school: "General Sir John Kotelawala Defence University, Sri Lanka",
        period: "Jan 2018 – Jan 2022",
    },
];

export const certifications = [
    "Microsoft AZ-900 Azure Fundamentals (in progress) — Microsoft",
    "ASP.NET Core (.NET 10) — Professional Development",
    "Microsoft SQL Server 2022 Essential Training — LinkedIn Learning",
    "Power BI Essential Training — LinkedIn Learning",
    "Learning Jira (Cloud Edition) — LinkedIn Learning",
    "Getting Started with Microsoft 365 — LinkedIn Learning",
];

export const compliance = [
    "NT Working with Children Clearance (Ochre Card)",
    "National Police Check",
    "NT Driver Licence",
];

export const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
];
