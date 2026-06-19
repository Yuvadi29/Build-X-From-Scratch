import fs from "fs";
import path from "path";
import { createHash } from "../utils/hash";

export function commit(
    message: string
) {
    const gitDir = path.join(
        process.cwd(),
        ".mygit"
    );

    const indexPath = path.join(
        gitDir,
        "index"
    );

    if (!fs.existsSync(indexPath)) {
        console.log(
            "Nothing staged"
        );
        return;
    }

    const indexContent =
        fs.readFileSync(
            indexPath,
            "utf8"
        );

    if (!indexContent.trim()) {
        console.log(
            "Nothing staged"
        );
        return;
    }

    const files =
        JSON.parse(indexContent);

    const headPath = path.join(
        gitDir,
        "HEAD"
    );

    let parent: string | null =
        null;

    if (fs.existsSync(headPath)) {
        const headContent =
            fs.readFileSync(
                headPath,
                "utf8"
            );

        parent =
            headContent.trim() ||
            null;
    }

    const commitObject = {
        message,
        timestamp:
            new Date().toISOString(),
        parent,
        files
    };

    const commitHash =
        createHash(
            JSON.stringify(
                commitObject
            )
        );

    const commitsDir =
        path.join(
            gitDir,
            "commits"
        );

    if (
        !fs.existsSync(commitsDir)
    ) {
        fs.mkdirSync(
            commitsDir,
            {
                recursive: true
            }
        );
    }

    const commitPath =
        path.join(
            commitsDir,
            `${commitHash}.json`
        );

    fs.writeFileSync(
        commitPath,
        JSON.stringify(
            {
                id: commitHash,
                ...commitObject
            },
            null,
            2
        )
    );

    fs.writeFileSync(
        headPath,
        commitHash
    );

    fs.writeFileSync(
        indexPath,
        "[]"
    );

    console.log(
        "\nCommit Created"
    );

    console.log(
        `Hash: ${commitHash}`
    );

    console.log(
        `Message: ${message}`
    );
}