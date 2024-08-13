HELP = Object.freeze({
    ADD: "add",
    SUBTRACT: "subtract",
    DIVIDE: "divide",
    MULTIPLY: "multiply"
})

OPERATIONS = Object.freeze({
    ADD: "--add",
    SUBTRACT: "--subtract",
    DIVIDE: "--divide",
    MULTIPLY: "--multiply",
    HELP: "--help",
    SHORTCUT_ADD: "-a",
    SHORTCUT_SUBTRACT: "-s",
    SHORTCUT_MULTIPLY: "-m",
    SHORTCUT_DIVIDE: "-d",
    SHORTCUT_HELP: "-h"
})

class MathHandler {

    add = (...args) => {
        if (args.length == 0 || args.some((arg) => isNaN(arg))) {
            return "Please Enter valid Arguments"
        }
        return args.reduce((accumulateValue, currentValue) => accumulateValue + currentValue, 0);
    }

    subtract = (...args) => {
        if (args.length == 0 || args.some((arg) => isNaN(arg))) {
            return "Please Enter valid Arguments"
        }
        const [first, ...rest] = args
        return rest.reduce((accumulateValue, currentValue) => accumulateValue - currentValue, first);
    }

    multiply = (...args) => {
        if (args.length == 0 || args.some((arg) => isNaN(arg))) {
            return "Please Enter valid Arguments"
        }
        return args.reduce((accumulateValue, currentValue) => accumulateValue * currentValue, 1);
    }

    divide = (firstValue, secondValue) => {
        if (secondValue === 0) {
            return ("Division by Zero is not allowed")
        }
        if (isNaN(firstValue) || isNaN(secondValue)) {
            return "please enter valid arguments"
        }
        return firstValue / secondValue;
    }

    help = (command, registerName) => {
        switch (command) {
            case HELP.ADD:
                console.log("It should take list of elements as input and return their sum");
                console.log(`${registerName} --add number1 number2 ..remaining numbers`);
                break;
            case HELP.SUBTRACT:
                console.log("It should take list of elements as input and return their subtraction");
                console.log(`${registerName} --subtract number1 number2  ..remaining numbers`);
                break;
            case HELP.MULTIPLY:
                console.log(`${registerName} --multiply number1 number2 ..remaining numbers`);
                break;
            case HELP.DIVIDE:
                console.log(`${registerName} --divide firstNumber secondNumber`);
                break;
            default:
                console.log(`command not found: ${command}`);
                break;
        }
    }

    handleCommand = (args) => {
        if (args.length == 0) {
            return "There is no command"
        }
        let command = args[1];
        let registerName = args[0];
        let remainingCommand = args.slice(2);
        if (remainingCommand == OPERATIONS.HELP || remainingCommand == OPERATIONS.SHORTCUT_HELP) {
            this.help(command, registerName);
            return;
        }
        let numbers = args.slice(2).map(Number);
        if (numbers.some((number) => isNaN(number))) {
            console.log(`Invalid numeric arguments for command: ${command}`);
            return;
        }
        switch (command) {
            case OPERATIONS.ADD:
            case OPERATIONS.SHORTCUT_ADD:
                console.log("Result: " + this.add(...numbers));
                break;
            case OPERATIONS.SUBTRACT:
            case OPERATIONS.SHORTCUT_SUBTRACT:
                console.log("Result: " + this.subtract(...numbers));
                break;
            case OPERATIONS.MULTIPLY:
            case OPERATIONS.SHORTCUT_MULTIPLY:
                console.log("Result: " + this.multiply(...numbers));
                break;
            case OPERATIONS.DIVIDE:
            case OPERATIONS.SHORTCUT_DIVIDE:
                const [firstValue, secondValue, ...rest] = numbers;
                if (rest.length !== 0) {
                    console.log("Invalid arguments");
                    return;
                }
                console.log("Result: " + this.divide(firstValue, secondValue));
                break;
            case OPERATIONS.HELP:
            case OPERATIONS.SHORTCUT_HELP:
                console.log(`${registerName} add --help Adding`);
                console.log(`${registerName} subtract --help Subtract`);
                console.log(`${registerName} multiply --help multiply`);
                console.log(`${registerName} divide --help Divide`);
                break;
            default:
                console.log("This is not a right command");
                console.log(`Please Enter ${registerName} --help command`);
                break;
        }
    }

}
module.exports = MathHandler