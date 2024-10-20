const operators = ['+', '-', '*', '/'];
const numbers = ['0', '1', '2', '3', '4', '5', '6',
                 '7', '8', '9'];
const display = document.getElementById('display');
let calculationDisplayed = false;

function appendToDisplay(value) {
    const currentValue = display.value;
    const lastChar = currentValue.slice(-1);
    
    // Adjusts font size
    adjustFontSize();
    
    // If screen shows error, replace with value
    if (display.value === 'Error') {
      display.value = value;
      return;
    }
    
    // If a calculation is being displayed
    // then replace the entire display
    if (calculationDisplayed) {
      display.value = value;
      calculationDisplayed = false;
      return;
    }

    // Prevent multiple dots in the same number segment
    if (value === '.') {
        // Split the current value by operators to get the current number segment
        const segments = currentValue.split(/[\+\-\*\/]/);
        const lastSegment = segments[segments.length - 1];
        
        // Check if the last segment already contains a dot
        if (lastSegment.includes('.')) {
            return;  // Prevent appending another dot
        }
    }

    if (operators.includes(value)) {
        if (currentValue === '') {
            // Prevent starting the expression with an operator except minus
            if (value === '-') {
                display.value += value;
            }
            return;
        }
        
        if (operators.includes(lastChar)) {
            // Replace the last operator with the new one
            display.value = currentValue.slice(0, -1) + value;
            return;
        }
        
        if (numbers.includes(lastChar)) {
          display.value += ' ' + value;
          return;
        }
    }
    
    if (operators.includes(lastChar)) {
      display.value += ' ' + value;
      return;
    }

    display.value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    if (display.value === 'Error') {
      display.value = '';
      return;
    }
    
    display.value = display.value.slice(0, -1);
    adjustFontSize();
}

function calculateResult() {
    if (display.value === 'Error') {
      display.value = 'Error'; 
      return;
    }
    
    try {
        // Evaluate the expression
        const result = eval(display.value);
        display.value = result;
        calculationDisplayed = true;
    } catch {
        display.value = 'Error';
    }
}

function adjustFontSize() {
    const display = document.getElementById('display');
    if (window.innerWidth <= 500) { // Typical breakpoint for mobile screens
        if (display.value.length >= 10) {
            display.style.fontSize = "20px";
        } else {
            display.style.fontSize = "35px";
        }
    }
}

// Add an event listener for when the window is resized
window.addEventListener('resize', adjustFontSize);

// Optionally call it once when the page is loaded
window.addEventListener('load', adjustFontSize);