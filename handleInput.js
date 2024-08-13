const LogHandler = require("./logHandler.js")
const CommandTool = require("./CMD.js")
const promptSync = require("prompt-sync");
const prompt = promptSync();

const mainCommands = {
    REGISTER: "register",
    UNREGISTER: "unregister",
    ACTIVATE: "activate",
    DEACTIVATE: "deactivate",
    HISTORY: "history",
    LOG: "log",
    EDIT: "edit",
}

const logCommands = {
    ALL: "--all",
    TAIL: "--tail",
    HEAD: "--head",
    CLEAR: "--clear",
    STOP: "--stop",
    HELP: "--help",
    SHORTCUT_ALL: "-a",
    SHORTCUT_TAIL: "-t",
    SHORTCUT_HEAD: "-h",
    SHORTCUT_CLEAR: "-c",
    SHORTCUT_CLR: "-clr",
    SHORTCUT_STOP: "-s",
}

var commandTool = new CommandTool();
const logFilePath = './logTesting.txt'
var logHandler = new LogHandler(logFilePath);
function handleInput(command) {
    command = command.trim().replace(/\s+/g, " ");
    var inputCommand = command;
    command = command.split(" ");
    logHandler.logCommand(inputCommand);
    let availableCommands = [mainCommands.REGISTER, mainCommands.UNREGISTER, mainCommands.ACTIVATE, mainCommands.DEACTIVATE, mainCommands.HISTORY, mainCommands.LOG, mainCommands.EDIT];
    if (availableCommands.includes(command[0])) {
        if (command[0] == mainCommands.REGISTER && command.includes(logCommands.HELP) == false && command.includes("-h") == false) {
            if (command.length == 3) {
                commandTool.registerCommand(command[1], command[2]);
            }
            else {
                console.log("Command Imperfect ! \n Try register --help");
            }
        }
        else if (command[0] == mainCommands.EDIT && command.includes(logCommands.HELP) == false && command.includes("-h") == false)// calling deactivate fucntion inside commandTool class
        {
            if (command.length == 3) {
                commandTool.editCommand(command[1], command[2]);
            }
            else {
                console.log("Command Imperfect ! \n Try edit --help");
            }

        }
        else if (command[0] == mainCommands.UNREGISTER && command.includes(logCommands.HELP) == false && command.includes("-h") == false)// calling unregister fucntion inside commandTool class
        {
            if (command.length == 2) {
                commandTool.unregisterCommand(command[1]);
            }
            else {
                console.log("Command Imperfect ! \n Try unregister --help");
            }
        }
        else if (command[0] == mainCommands.ACTIVATE && command.includes(logCommands.HELP) == false && command.includes("-h") == false)// calling activate fucntion inside commandTool class
        {
            if (command.length == 2) {
                commandTool.activateCommand(command[1]);
            }
            else {
                console.log("Command Imperfect ! \n Try activate --help");
            }
        }
        else if (command[0] == mainCommands.DEACTIVATE && command.includes(logCommands.HELP) == false && command.includes("-h") == false)// calling deactivate fucntion inside commandTool class
        {
            if (command.length == 2) {
                commandTool.deactivateCommand(command[1]);
            }
            else {
                console.log("Command Imperfect ! \n Try deactivate --help");
            }
        }
        else if (command[0] == mainCommands.LOG && command.includes(logCommands.HELP) == false && command.includes("-h") == false) {
            switch (command[1]) {
                case logCommands.ALL:
                case logCommands.SHORTCUT_ALL:
                    logHandler.printAllLogs();
                    break;
                case logCommands.TAIL:
                case logCommands.SHORTCUT_TAIL:
                    logHandler.printTail(parseInt(command[2]));
                    break;
                case logCommands.HEAD:
                case logCommands.SHORTCUT_HEAD:
                    logHandler.printHead(parseInt(command[2]));
                    break;
                case logCommands.CLEAR:
                case logCommands.SHORTCUT_CLEAR:
                case logCommands.SHORTCUT_CLR:
                    logHandler.clearLogs();
                    break;
                case logCommands.STOP:
                case logCommands.SHORTCUT_STOP:
                    logHandler.stopLogging();
                    break;
                default:
                    console.log("looking for log commands! Try log --help");
            }
        }
        else if (command[0] == "history" && command.includes(logCommands.HELP) == false && command.includes("-h") == false) {
            logHandler.printHistory();
        }
        else if (command.includes("-h") || command.includes(logCommands.HELP)) {
            help(command);
        }
    }
    else {
        if (commandTool.registeredCommands.has(command[0])) {
            const command_name = commandTool.registeredCommands.get(command[0])
            if (command.includes(logCommands.HELP) || command.includes("-h")) {
                command_name.handler.handleCommand(command);
            }
            else if (command_name.active == true) {
                command_name.handler.handleCommand(command);
            }
            else {
                console.log("command is not active");
            }
            return;
        }

        console.log("command imperfect");
    }
}

function help(command) {
    switch (command[0]) {
        case mainCommands.REGISTER:
            console.log("Registers a command and actions assigned to the command. \n `register command_name Executor`");
            break;
        case mainCommands.UNREGISTER:
            console.log("Registers a command and actions assigned to the command. \n `unregister command_name`");
            break;
        case mainCommands.ACTIVATE:
            console.log("Gains access to run the command \n `activate command_name`");
            break;
        case mainCommands.DEACTIVATE:
            console.log("Loses access to run the command \n `deactivate command_name`");
            break;
        case mainCommands.HISTORY:
            console.log("print count latest commands (no need to persist), default count is 5");
            break;
        case mainCommands.EDIT:
            console.log("It changes the command name : Use edit old name new name");
            break;
        case mainCommands.LOG:
            switch (command[1]) {
                case logCommands.HELP:
                case "-h":
                    console.log("use command log command and displays log actions");
                    break;
                case logCommands.ALL.includes(command[1]):
                    console.log("want to check all the commands! use command: log --all");
                    break;
                case logCommands.TAIL.includes(command[1]):
                    console.log("want to see the recent commands! use command: log --tail");
                    break;
                case logCommands.HEAD.includes(command[1]):
                    console.log("want to see the fisrt entered commands! use command: log --head");
                    break;
                case logCommands.CLEAR.includes(command[1]):
                    console.log("want to delete all the commands! use command: log --clear");
                    break;
                case logCommands.STOP.includes(command[1]):
                    console.log("want to stop storing commands! use command: log --stop");
                    break;
                default:
                    console.log("wrong command");
            }
            break;
    }
}

function launchPrompt() {
    while (true) {
        let command = prompt("enter the command: ");
        handleInput(command);
    }
}
launchPrompt();