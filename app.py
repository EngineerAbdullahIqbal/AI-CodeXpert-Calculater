from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire Flask app

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    first_number = data.get('firstNumber', '')
    second_number = data.get('secondNumber', '')
    operator = data.get('operator', '')

    # Debugging logs to trace the inputs
    print(f"Received: first_number={first_number}, second_number={second_number}, operator={operator}")

    try:
        # Convert numbers to floats, handle empty string cases
        if first_number == '':
            first_number = 0
        if second_number == '':
            second_number = 0
        else:
            second_number = float(second_number)

        first_number = float(first_number)

        # Perform operations based on the operator
        if operator == '+':
            result = first_number + second_number
        elif operator == '-':
            result = first_number - second_number
        elif operator == '*':
            result = first_number * second_number
        elif operator == '/':
            result = first_number / second_number if second_number != 0 else 'Error'
        elif operator == 'sqrt':
            result = math.sqrt(first_number)
        elif operator == '^':
            result = first_number ** second_number
        elif operator == 'sin':
            result = math.sin(math.radians(first_number))
        elif operator == 'cos':
            result = math.cos(math.radians(first_number))
        elif operator == 'tan':
            result = math.tan(math.radians(first_number))
        elif operator == 'log':
            result = math.log10(first_number)
        else:
            result = 'Invalid Operation'
    except Exception as e:
        result = str(e)

    # Return the result as JSON
    print(f"Result: {result}")  # Logging the result
    return jsonify(result=result)

if __name__ == '__main__':
    app.run(debug=True)
