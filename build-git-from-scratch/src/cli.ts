#!/usr/bin/env node

import { Command } from "commander";
import { initRepository } from "./commands/init";
import { hashFile } from "./commands/hash";
import { addFile } from "./commands/add";
import { commit } from "./commands/commit";
import { showLog } from "./commands/log";

const program = new Command();

program.name("mygit").description("Build Your Own Git");

program.command("init").description("Initialize a new Git repository").action(() => {
    initRepository();
});

program.command("hash <filePath>").description("Generate SHA1 hash").action((filePath: string) => {
    hashFile(filePath);
});

program.command("add <filePath>").description("Add file to index").action((filePath: string) => {
    addFile(filePath);
});

program.command("commit <message>").description("Create Commit").action((message) => {
    commit(message);
});

program.command("log").description("Show commit history").action(() => {
    showLog();
});

program.parse();