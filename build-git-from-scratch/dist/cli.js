#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("./commands/init");
const hash_1 = require("./commands/hash");
const add_1 = require("./commands/add");
const commit_1 = require("./commands/commit");
const log_1 = require("./commands/log");
const program = new commander_1.Command();
program.name("mygit").description("Build Your Own Git");
program.command("init").description("Initialize a new Git repository").action(() => {
    (0, init_1.initRepository)();
});
program.command("hash <filePath>").description("Generate SHA1 hash").action((filePath) => {
    (0, hash_1.hashFile)(filePath);
});
program.command("add <filePath>").description("Add file to index").action((filePath) => {
    (0, add_1.addFile)(filePath);
});
program.command("commit <message>").description("Create Commit").action((message) => {
    (0, commit_1.commit)(message);
});
program.command("log").description("Show commit history").action(() => {
    (0, log_1.showLog)();
});
program.parse();
//# sourceMappingURL=cli.js.map