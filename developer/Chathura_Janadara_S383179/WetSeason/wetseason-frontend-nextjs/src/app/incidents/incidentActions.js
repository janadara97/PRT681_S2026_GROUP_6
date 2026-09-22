"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { API_ROOT, TOKEN_COOKIE } from "../../lib/config";

async function getToken() {
    const cookieStore = await cookies();
    return cookieStore.get(TOKEN_COOKIE)?.value;
}

export async function createIncidentAction(previousState, formData) {
    const token = await getToken();

    const response = await fetch(API_ROOT + "/incident", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
            communityId: Number(formData.get("communityId")),
            type: formData.get("type"),
            severity: Number(formData.get("severity")),
            description: formData.get("description"),
        }),
    });

    if (!response.ok) {
        return { error: "Failed to create incident. Please try again." };
    }

    revalidatePath("/incidents");
    return { success: true, message: "Incident created." };
}

export async function updateIncidentAction(previousState, formData) {
    const token = await getToken();
    const id = formData.get("id");

    const response = await fetch(API_ROOT + "/incident/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
            communityId: Number(formData.get("communityId")),
            type: formData.get("type"),
            severity: Number(formData.get("severity")),
            description: formData.get("description"),
        }),
    });

    if (!response.ok) {
        return { error: "Failed to update incident. Please try again." };
    }

    revalidatePath("/incidents");
    return { success: true, message: "Incident updated." };
}

export async function deleteIncidentAction(id) {
    const token = await getToken();

    const response = await fetch(API_ROOT + "/incident/delete/" + id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
    });

    if (!response.ok) {
        throw new Error("Failed to delete incident");
    }

    revalidatePath("/incidents");
}
