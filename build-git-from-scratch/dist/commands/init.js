"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRepository = initRepository;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function initRepository() {
    const root = path_1.default.join(process.cwd(), ".mygit");
    fs_1.default.mkdirSync(root, {
        recursive: true
    });
    fs_1.default.mkdirSync(path_1.default.join(root, "objects"), {
        recursive: true,
    });
    fs_1.default.mkdirSync(path_1.default.join(root, "refs", "heads"), {
        recursive: true,
    });
    fs_1.default.mkdirSync(path_1.default.join(root, "commits"), {
        recursive: true,
    });
    fs_1.default.writeFileSync(path_1.default.join(root, "HEAD"), "main");
    console.log("Initialized empty MyGit repository in ", root);
}
//# sourceMappingURL=init.js.map