import fs from "fs";
import { createHash } from "../utils/hash";

export function hashFile(filePath: string) {
    const content = fs.readFileSync(filePath, "utf8");

    const hash = createHash(content);
    console.log("Hash Generated: ", hash);
}