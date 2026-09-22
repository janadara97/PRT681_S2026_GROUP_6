// Decodes a JWT's payload WITHOUT checking its signature - that's fine
// here because the token only ever reaches this code after the backend
// itself already validated it (via the Authorization header on our
// fetch calls). This is just for reading the username/role to display.
export function decodeJwtPayload(token) {
    const parts = token.split(".");
    const payloadBase64Url = parts[1];
    const payloadBase64 = payloadBase64Url
        .replace(/-/g, "+")
        .replace(/_/g, "/");
    const payloadJson = Buffer.from(payloadBase64, "base64").toString("utf8");
    return JSON.parse(payloadJson);
}

const NAME_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
const ROLE_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role";

export function getUserFromToken(token) {
    const payload = decodeJwtPayload(token);
    return {
        username: payload[NAME_CLAIM],
        role: payload[ROLE_CLAIM],
    };
}
