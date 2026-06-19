"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashFile = hashFile;
const fs_1 = __importDefault(require("fs"));
const hash_1 = require("../utils/hash");
function hashFile(filePath) {
    const content = fs_1.default.readFileSync(filePath, "utf8");
    const hash = (0, hash_1.createHash)(content);
    console.log("Hash Generated: ", hash);
}
//# sourceMappingURL=hash.js.map