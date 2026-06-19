import fs from "fs";
import path from "path";

export function initRepository() {
    const root = path.join(process.cwd(), ".mygit");

    fs.mkdirSync(root, {
        recursive: true
    });

    fs.mkdirSync(path.join(root, "objects"), {
        recursive: true,
    });

    fs.mkdirSync(path.join(root, "refs", "heads"), {
        recursive: true,
    });

    fs.mkdirSync(path.join(root, "commits"), {
        recursive: true,
    });

    fs.writeFileSync(path.join(root, "HEAD"), "main");

    console.log("Initialized empty MyGit repository in ", root);
}