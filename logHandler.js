const { writeFileSync } = require('fs');

const fixedvalues = {
    HISTORYCOUNT: 5
}

class LogHandler {
    constructor(logFilePath) {
        this.logFilePath = logFilePath;
        this.commandLogs = [];
        this.status = true;
    }

    saveLogs = () => {
        const fileContent = this.commandLogs.join('\n');
        this.writeFile(this.logFilePath, fileContent);
    }

    writeFile = (path, contents) => {
        writeFileSync(path, contents, 'utf8', err => {
            if (err) {
                console.log('Error saving command logs:', err);
            }
        });
    }

    logCommand = (command) => {
        if (this.status) {
            this.commandLogs.push(` [${new Date().toLocaleString()}]  ${command}`);
            this.saveLogs();
        }
    }

    printAllLogs = () => {
        for (let logIndex = 0; logIndex < this.commandLogs.length; logIndex++) {
            console.log(this.commandLogs[logIndex]);
        }
    }

    printTail = (count) => {
        const startIndex = Math.max(0, this.commandLogs.length - count);
        for (let index = startIndex; index < this.commandLogs.length; index++) {
            console.log(`${this.commandLogs[index]}`);
        }
    }

    printHistory = (count = fixedvalues.HISTORYCOUNT) => {
        const startIndex = Math.max(0, this.commandLogs.length - count);
        console.log("recent history:");
        for (let index = startIndex; index < this.commandLogs.length; index++) {
            console.log(` ${this.commandLogs[index]}`);
        }
    }

    printHead = (count) => {
        for (let index = 0; index < count && index < this.commandLogs.length; index++) {
            console.log(`${this.commandLogs[index]}`);
        }
    }

    stopLogging = () => {
        console.log("stopped logging commands");
        this.status = false;
    }

    clearLogs = () => {
        this.writeFile(this.logFilePath, '', err => {
            if (err) {
                console.log('Error clearing logs:', err);
                return;
            }
        });
        this.commandLogs = [];
        console.log('Logs cleared');
    }
}

module.exports = LogHandler;