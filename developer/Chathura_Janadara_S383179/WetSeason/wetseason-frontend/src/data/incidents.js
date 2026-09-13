export const INCIDENT_TYPES = [
    "Flooding",
    "Cyclone damage",
    "Road closure",
    "Evacuation",
    "Power outage",
];

export const STATUS_FLOW = [
    "Reported",
    "Triaged",
    "Responding",
    "Resolved",
    "Closed",
];

export const SEV_META = {
    4: {
        label: "Critical",
        badge: "bg-amber-100 border-amber-600/55 text-amber-800",
    },
    3: {
        label: "Major",
        badge: "bg-amber-50 border-amber-600/35 text-amber-800",
    },
    2: {
        label: "Moderate",
        badge: "bg-teal-100 border-teal-600/35 text-teal-800",
    },
    1: { label: "Minor", badge: "bg-canvas border-ink/20 text-ink-soft" },
};

export const STATUS_META = {
    Reported: "bg-amber-100 border-amber-600/50 text-amber-800",
    Triaged: "bg-teal-50 border-teal-600/30 text-teal-800",
    Responding: "bg-teal-200 border-teal-600/50 text-teal-800",
    Resolved: "bg-canvas border-ink/15 text-ink-soft",
    Closed: "bg-white border-ink/15 text-ink-muted",
};

export const BLANK_INCIDENT = {
    community: "",
    region: "Top End",
    type: "Flooding",
    severity: 3,
    status: "Reported",
    description: "",
};

export const SEED_INCIDENTS = [
    {
        id: 142,
        community: "Daly River",
        region: "Top End",
        type: "Flooding",
        severity: 4,
        status: "Responding",
        age: "2h",
        description:
            "Causeway under 1.2m of water, impassable both directions.",
    },
    {
        id: 141,
        community: "Wadeye",
        region: "Top End",
        type: "Cyclone damage",
        severity: 4,
        status: "Triaged",
        age: "5h",
        description: "Roofing damage to six houses and the clinic awning.",
    },
    {
        id: 140,
        community: "Borroloola",
        region: "Gulf",
        type: "Road closure",
        severity: 3,
        status: "Reported",
        age: "6h",
        description: "Carpentaria Hwy cut at the Robinson River crossing.",
    },
    {
        id: 139,
        community: "Jabiru",
        region: "Kakadu",
        type: "Evacuation",
        severity: 3,
        status: "Responding",
        age: "11h",
        description: "22 residents moved to the sports hall.",
    },
    {
        id: 138,
        community: "Ngukurr",
        region: "Roper",
        type: "Road closure",
        severity: 3,
        status: "Triaged",
        age: "14h",
        description: "Access track washed out 8km south.",
    },
    {
        id: 137,
        community: "Timber Creek",
        region: "Victoria Daly",
        type: "Flooding",
        severity: 2,
        status: "Responding",
        age: "1d",
        description: "Low-lying houses on the river flat taking water.",
    },
    {
        id: 136,
        community: "Nhulunbuy",
        region: "East Arnhem",
        type: "Power outage",
        severity: 2,
        status: "Triaged",
        age: "1d",
        description: "Feeder fault affecting 340 premises.",
    },
    {
        id: 135,
        community: "Katherine",
        region: "Katherine",
        type: "Flooding",
        severity: 2,
        status: "Responding",
        age: "2d",
        description: "River at 14.1m, monitoring the low bridge.",
    },
    {
        id: 134,
        community: "Gunbalanya",
        region: "West Arnhem",
        type: "Road closure",
        severity: 1,
        status: "Resolved",
        age: "2d",
        description: "Cahills Crossing reopened at low tide.",
    },
    {
        id: 133,
        community: "Batchelor",
        region: "Top End",
        type: "Power outage",
        severity: 1,
        status: "Closed",
        age: "3d",
        description: "Supply restored after storm damage to a pole.",
    },
];

export function formatRef(id) {
    const paddedId = String(id).padStart(4, "0");
    return "INC-" + paddedId;
}

// Turns a createdAt timestamp (e.g. "2026-09-09T14:46:20") into a short
// relative age like "5m", "2h", or "3d" for display in the table.
export function formatAge(createdAt) {
    if (!createdAt) {
        return "";
    }

    const createdDate = new Date(createdAt);
    const millisecondsAgo = Date.now() - createdDate.getTime();

    const minutesAgo = Math.floor(millisecondsAgo / (1000 * 60));
    if (minutesAgo < 1) {
        return "just now";
    }
    if (minutesAgo < 60) {
        return `${minutesAgo}m`;
    }

    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
        return `${hoursAgo}h`;
    }

    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo}d`;
}
