"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHash = createHash;
const crypto_1 = __importDefault(require("crypto"));
function createHash(content) {
    return crypto_1.default
        .createHash("sha1")
        .update(content)
        .digest("hex");
}
//# sourceMappingURL=hash.js.map