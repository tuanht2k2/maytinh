import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './GridBox.css';
import './Calculator.css';
import { Fragment, useState } from 'react';

function Calculator() {
  const [displayValue, setDisplayValue] = useState([0]);

  const calculations = [
    { value: '+' },
    { value: '-' },
    { value: 'x' },
    { value: '/' },
  ];

  const handleClearScreen = () => {
    setDisplayValue([0]);
  };

  const numbers = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 0 },
    { value: 'C', onClick: handleClearScreen },
  ];

  const handleDelete = () => {
    setDisplayValue((prev) => {
      prev.pop();
      return [...prev];
    });
  };

  const handleKeyDown = (value) => {
    setDisplayValue((prev) =>
      prev[0] == 0 && prev.length < 2 && typeof value === 'number'
        ? [value]
        : [...prev, value]
    );
  };

  const handleCalculate = (expression) => {
    if (typeof expression[expression.length - 1] != 'number') {
      setDisplayValue(['Syntax error']);
      return;
    }

    let devide;

    while (devide !== -1) {
      devide = expression.indexOf('/');
      if (devide === -1) break;

      const first = expression[devide - 1];
      const second = expression[devide + 1];

      expression.splice(devide - 1, 3, first / second);
    }

    let multiply;

    while (multiply !== -1) {
      multiply = expression.indexOf('x');
      if (multiply === -1) break;

      const first = expression[multiply - 1];
      const second = expression[multiply + 1];

      expression.splice(multiply - 1, 3, first * second);
    }

    let minus;
    while (minus !== -1) {
      minus = expression.indexOf('-');
      if (minus === -1) break;

      const first = expression[minus - 1];
      const second = expression[minus + 1];

      expression.splice(minus - 1, 3, first - second);
    }

    let plus;
    while (plus !== -1) {
      plus = expression.indexOf('+');
      if (plus === -1) break;

      const first = expression[plus - 1];
      const second = expression[plus + 1];

      expression.splice(plus - 1, 3, first + second);
    }

    setDisplayValue((prev) => [...expression]);
  };

  return (
    <div className="wrapper">
      <div className=" calculator-wrapper">
        <div className="display">
          {displayValue.map((value, index) => (
            <Fragment key={`value-${value}${index}`}>{value}</Fragment>
          ))}
        </div>
        <div className="key-board">
          <div className="key-board-calculation">
            {calculations.map((calculation, index) => (
              <div
                key={`calculation-${calculation}-${index}`}
                className="key-board-item item-bgr"
                onClick={() => {
                  handleKeyDown(calculation.value);
                }}
              >
                {calculation.value}
              </div>
            ))}
          </div>
          <div className="key-board-number grid">
            <div className="key-board-number-left row">
              {numbers.map((number, index) => (
                <div
                  key={`key-board${number}-${index}`}
                  className="col l-4 m-4 c-4 "
                >
                  <div
                    className="key-board-item"
                    onClick={() => {
                      number.onClick
                        ? number.onClick()
                        : handleKeyDown(number.value);
                    }}
                  >
                    {number.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="key-board-number-right">
              <div
                className="key-board-item"
                onClick={() => {
                  handleDelete();
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <div
                className="key-board-item"
                onClick={() => {
                  handleCalculate(displayValue);
                }}
              >
                =
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
