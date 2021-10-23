

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  clear() {
    this.currentOperand = "";
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }

  shekelsIntoDollars() {
    this.currentOperand = (this.currentOperand / 3.2).toFixed(3);
  }
  dollarsIntoShekels(number) {
    this.currentOperand = (this.currentOperand * 3.2).toFixed(3);
  }
  shekelsIntoEuros(number) {
    this.currentOperand = (this.currentOperand * 0.27).toFixed(3);
  }
  eurosIntoShekels(number) {
    this.currentOperand = (this.currentOperand / 0.27).toFixed(3);
  }
}


// Entered Numbers
const numberButtons = document.querySelectorAll(".num");
// Operation
const operationButtons = document.querySelectorAll(".op");
// Equal
const equalsButton = document.querySelector(".op-equal");
// Delete Operation
const del = document.querySelector(".del");
// clear
const clearStep = document.querySelector(".clear-step");
// Fully clear
const clearAll = document.querySelector(".clear-all");
// Display Prev.
const previousOperandTextElement = document.querySelector(".display-1");
// Display Now
const currentOperandTextElement = document.querySelector(".display-2");

// Make Object
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
// Make Input Number
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
// Choose Operation
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
// Select Equal Button
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
// Select Fully Clear
clearAll.addEventListener("click", (button) => {
  calculator.clearAll();
  calculator.updateDisplay();
});
// Select delete
del.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
// Select delete
clearStep.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});





// convert

const shToDo = document.querySelector(".conv-1");
const doToSh = document.querySelector(".conv-2");
const shToEu = document.querySelector(".conv-3");
const euToSh = document.querySelector(".conv-4");


shToDo.addEventListener("click", (button) => {
  calculator.shekelsIntoDollars();
  calculator.updateDisplay();
  // document.querySelector(".display-1").innerHTML = numberButtons * 6;

});

doToSh.addEventListener("click", (button) => {
  calculator.dollarsIntoShekels(button.innerText);
  calculator.updateDisplay();
});

shToEu.addEventListener("click", (button) => {
  calculator.shekelsIntoEuros(button.innerText);
  calculator.updateDisplay();
});

euToSh.addEventListener("click", (button) => {
  calculator.eurosIntoShekels(button.innerText);
  calculator.updateDisplay();
});