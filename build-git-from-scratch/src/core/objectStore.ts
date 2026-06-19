import fs from "fs";
import path from "path";
import { createHash } from "../utils/hash";

export function storeObject(
    content: string
) {
    const hash =
        createHash(content);

    const objectDir =
        path.join(
            process.cwd(),
            ".mygit",
            "objects"
        );

    if (
        !fs.existsSync(objectDir)
    ) {
        fs.mkdirSync(
            objectDir,
            {
                recursive: true
            }
        );
    }

    const objectPath =
        path.join(
            objectDir,
            hash
        );

    if (
        !fs.existsSync(
            objectPath
        )
    ) {
        fs.writeFileSync(
            objectPath,
            content
        );
    }

    return hash;
}