class Command {
    constructor(name, executor, handlerObject) {
        this.name = name;
        this.executor = executor;
        this.handler = handlerObject;
        this.active = true;
    }
}

class CommandTool {
    constructor() {
        this.registeredCommands = new Map();
    }

    registerCommand = (name, executor) => {
        try {
            var res = require(`./${executor}.js`);
        } catch {
            if (res === undefined) {    
                console.log("module not found");
                return;
            }
        }
        let handlerObject = eval("new " + res + "()");
        if (Object.getOwnPropertyNames(handlerObject).length === 0) {
            console.log("Class is empty");
            return;
        }
        let nameArray = name.split(",");
        for (let splittedIndex = 0; splittedIndex < nameArray.length; splittedIndex++) {
            const commandName = nameArray[splittedIndex];
            if (this.registeredCommands.has(commandName)) {
                console.log(`Command ${commandName} already exists`);
                continue;
            }
            const command = new Command(commandName, executor, handlerObject);
            this.registeredCommands.set(commandName, command);
            console.log(`Registered command: ${commandName}`);
        }
    }

    unregisterCommand = (name) => {
        let nameArray = name.split(",");
        let check, splittedName;
        while (nameArray.length) {
            check = false;
            splittedName = nameArray.shift()
            if (this.registeredCommands.has(splittedName)) {
                this.registeredCommands.delete(splittedName);
                console.log(`Unregistered command: ${splittedName}`);
                check = true;
            }
        }
        if (!check) {
            console.log(`Command not found: ${splittedName}`);
        }
    }

    activateCommand = (name) => {
        let nameArray = name.split(",");
        let check, splittedName;
        while (nameArray.length) {
            check = false;
            let splittedName = nameArray.shift()
            if (this.registeredCommands.has(splittedName)) {
                const command = this.registeredCommands.get(splittedName);
                if (command.active) {
                    console.log(`Command is already activated: ${splittedName}`);
                } else {
                    console.log(`Activated command: ${splittedName}`);
                    command.active = true;
                }
                check = true;
            }
        }
        if (!check) {
            console.log(`Command not found: ${splittedName}`);
        }
    }

    deactivateCommand = (name) => {
        let nameArray = name.split(",");
        let check, splittedName;
        while (nameArray.length) {
            check = false;
            let splittedName = nameArray.shift()
            if (this.registeredCommands.has(splittedName)) {
                const command = this.registeredCommands.get(splittedName);
                if (command.active) {
                    console.log(`Deactivated command: ${splittedName}`);
                    command.active = false;
                } else {
                    console.log(`command is already deactivated: ${splittedName}`);
                }
                check = true;
            }
        }
        if (!check) {
            console.log(`Command not found: ${splittedName}`);
        }
    }

    editCommand = (registeredName, changingName) => {
        if (this.registeredCommands.has(registeredName)) {
            const command = this.registeredCommands.get(registeredName);
            if (command.name == registeredName) {
                command.name = changingName;
                this.registeredCommands.delete(registeredName);
                this.registeredCommands.set(changingName, command);
                console.log(`command changed from ${registeredName} to ${changingName}`);
            }
        }
    }
}

module.exports = CommandTool