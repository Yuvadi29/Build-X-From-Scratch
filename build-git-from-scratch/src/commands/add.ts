import fs from "fs";
import path from "path";
import { storeObject } from "../core/objectStore";

export function addFile(filePath: string) {
    const gitDir = path.join(process.cwd(), ".mygit");

    const indexPath = path.join(
        gitDir,
        "index"
    );

    const content = fs.readFileSync(
        filePath,
        "utf8"
    );

    const hash = storeObject(content);

    let index: {
        path: string;
        hash: string;
    }[] = [];

    if (fs.existsSync(indexPath)) {
        const existingContent =
            fs.readFileSync(
                indexPath,
                "utf8"
            );

        if (existingContent.trim()) {
            index = JSON.parse(
                existingContent
            );
        }
    }

    const existingEntry =
        index.find(
            (item) =>
                item.path === filePath
        );

    if (existingEntry) {
        existingEntry.hash = hash;
    } else {
        index.push({
            path: filePath,
            hash
        });
    }

    fs.writeFileSync(
        indexPath,
        JSON.stringify(
            index,
            null,
            2
        )
    );

    console.log(
        `Added ${filePath}`
    );

    console.log(
        `Object Hash: ${hash}`
    );
}