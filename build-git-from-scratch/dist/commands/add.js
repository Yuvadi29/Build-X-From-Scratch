"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFile = addFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const objectStore_1 = require("../core/objectStore");
function addFile(filePath) {
    const gitDir = path_1.default.join(process.cwd(), ".mygit");
    const indexPath = path_1.default.join(gitDir, "index");
    const content = fs_1.default.readFileSync(filePath, "utf8");
    const hash = (0, objectStore_1.storeObject)(content);
    let index = [];
    if (fs_1.default.existsSync(indexPath)) {
        const existingContent = fs_1.default.readFileSync(indexPath, "utf8");
        if (existingContent.trim()) {
            index = JSON.parse(existingContent);
        }
    }
    const existingEntry = index.find((item) => item.path === filePath);
    if (existingEntry) {
        existingEntry.hash = hash;
    }
    else {
        index.push({
            path: filePath,
            hash
        });
    }
    fs_1.default.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    console.log(`Added ${filePath}`);
    console.log(`Object Hash: ${hash}`);
}
//# sourceMappingURL=add.js.map