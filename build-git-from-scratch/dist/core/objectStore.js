"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeObject = storeObject;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const hash_1 = require("../utils/hash");
function storeObject(content) {
    const hash = (0, hash_1.createHash)(content);
    const objectDir = path_1.default.join(process.cwd(), ".mygit", "objects");
    if (!fs_1.default.existsSync(objectDir)) {
        fs_1.default.mkdirSync(objectDir, {
            recursive: true
        });
    }
    const objectPath = path_1.default.join(objectDir, hash);
    if (!fs_1.default.existsSync(objectPath)) {
        fs_1.default.writeFileSync(objectPath, content);
    }
    return hash;
}
//# sourceMappingURL=objectStore.js.map