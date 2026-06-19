import fs from "fs";
import path from "path";

export function showLog() {
    const gitDir = path.join(process.cwd(), ".mygit");

    const headPath = path.join(gitDir, "HEAD");

    if (!fs.existsSync(headPath)) {
        console.log("No commits found");
        return;
    }

    let currentCommitHash = fs
        .readFileSync(headPath, "utf8")
        .trim();

    if (!currentCommitHash) {
        console.log("No commits found");
        return;
    }

    while (currentCommitHash) {
        const commitPath = path.join(
            gitDir,
            "commits",
            `${currentCommitHash}.json`
        );

        if (!fs.existsSync(commitPath)) {
            break;
        }

        const commit = JSON.parse(
            fs.readFileSync(
                commitPath,
                "utf8"
            )
        );

        console.log("\n----------------");
        console.log(
            `Commit: ${commit.id}`
        );
        console.log(
            `Message: ${commit.message}`
        );
        console.log(
            `Date: ${commit.timestamp}`
        );

        currentCommitHash =
            commit.parent || "";
    }
}