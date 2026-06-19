"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commit = commit;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const hash_1 = require("../utils/hash");
function commit(message) {
    const gitDir = path_1.default.join(process.cwd(), ".mygit");
    const indexPath = path_1.default.join(gitDir, "index");
    if (!fs_1.default.existsSync(indexPath)) {
        console.log("Nothing staged");
        return;
    }
    const indexContent = fs_1.default.readFileSync(indexPath, "utf8");
    if (!indexContent.trim()) {
        console.log("Nothing staged");
        return;
    }
    const files = JSON.parse(indexContent);
    const headPath = path_1.default.join(gitDir, "HEAD");
    let parent = null;
    if (fs_1.default.existsSync(headPath)) {
        const headContent = fs_1.default.readFileSync(headPath, "utf8");
        parent =
            headContent.trim() ||
                null;
    }
    const commitObject = {
        message,
        timestamp: new Date().toISOString(),
        parent,
        files
    };
    const commitHash = (0, hash_1.createHash)(JSON.stringify(commitObject));
    const commitsDir = path_1.default.join(gitDir, "commits");
    if (!fs_1.default.existsSync(commitsDir)) {
        fs_1.default.mkdirSync(commitsDir, {
            recursive: true
        });
    }
    const commitPath = path_1.default.join(commitsDir, `${commitHash}.json`);
    fs_1.default.writeFileSync(commitPath, JSON.stringify({
        id: commitHash,
        ...commitObject
    }, null, 2));
    fs_1.default.writeFileSync(headPath, commitHash);
    fs_1.default.writeFileSync(indexPath, "[]");
    console.log("\nCommit Created");
    console.log(`Hash: ${commitHash}`);
    console.log(`Message: ${message}`);
}
//# sourceMappingURL=commit.js.map