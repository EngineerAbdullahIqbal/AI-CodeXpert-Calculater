let firstNumber = '';
let secondNumber = '';
let operator = '';
let resultDisplayed = false;



// Function to append the clicked number to the display
function appendNumber(number) {
    const display = document.getElementById('display');

    if (resultDisplayed) {
        display.value = '';  // Clear the display if a result was shown
        resultDisplayed = false;
    }

    display.value += number;  // Append the clicked number to the display
}

// Add event listeners to all number buttons
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', function() {
        appendNumber(button.textContent);
    });
});

// Function to calculate the result using backend
function calculate(firstNumber, secondNumber, operator) {
    if (!firstNumber || !secondNumber || !operator) {
        console.error('Incomplete input: Please enter both numbers and an operator.');
        alert('Incomplete input: Please enter both numbers and an operator.');
        return;  // Prevent the backend call if inputs are missing
    }

 // Ensure this URL is updated to your deployed backend server URL
fetch('https://127.0.0.1:5000/calculate', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operator: operator
    }),
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log('Backend response:', data);
    document.getElementById('display').value = data.result;
    resultDisplayed = true;
})
.catch(error => {
    console.error('Error fetching data:', error);
});
}

// Event handler for operator buttons
function onOperatorClick(op) {
    const display = document.getElementById('display');

    if (firstNumber === '') {
        firstNumber = display.value;  // Set first number from the display
    } else if (resultDisplayed) {
        firstNumber = display.value;  // If a result is shown, use it as the first number
        resultDisplayed = false;
    }

    operator = op;
    display.value = '';  // Clear the display for the next number input
}

// Event handler for equal button
function onEqualClick() {
    const display = document.getElementById('display');

    if (firstNumber !== '' && operator !== '') {
        secondNumber = display.value;  // Get second number from display
        calculate(firstNumber, secondNumber, operator);
    } else {
        alert('Incomplete input: Please enter both numbers and an operator.');
    }
}

// Event handler for clear button
function onClearClick() {
    document.getElementById('display').value = '';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    resultDisplayed = false;
}

// Attach event listeners to operator buttons
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', function() {
        onOperatorClick(button.textContent);
    });
});

// Attach event listener to the equal button
document.getElementById('equals').addEventListener('click', function() {
    onEqualClick();
});

// Attach event listener to the clear button
document.getElementById('clear').addEventListener('click', function() {
    onClearClick();
});
