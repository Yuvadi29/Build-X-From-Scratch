import crypto from "crypto";

export function createHash(content: string): string {
    return crypto
        .createHash("sha1")
        .update(content)
        .digest("hex");
}

