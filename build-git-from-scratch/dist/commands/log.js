"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showLog = showLog;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function showLog() {
    const gitDir = path_1.default.join(process.cwd(), ".mygit");
    const headPath = path_1.default.join(gitDir, "HEAD");
    if (!fs_1.default.existsSync(headPath)) {
        console.log("No commits found");
        return;
    }
    let currentCommitHash = fs_1.default
        .readFileSync(headPath, "utf8")
        .trim();
    if (!currentCommitHash) {
        console.log("No commits found");
        return;
    }
    while (currentCommitHash) {
        const commitPath = path_1.default.join(gitDir, "commits", `${currentCommitHash}.json`);
        if (!fs_1.default.existsSync(commitPath)) {
            break;
        }
        const commit = JSON.parse(fs_1.default.readFileSync(commitPath, "utf8"));
        console.log("\n----------------");
        console.log(`Commit: ${commit.id}`);
        console.log(`Message: ${commit.message}`);
        console.log(`Date: ${commit.timestamp}`);
        currentCommitHash =
            commit.parent || "";
    }
}
//# sourceMappingURL=log.js.map