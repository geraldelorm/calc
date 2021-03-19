let runningTotal = 0;
let buffer = '0';
let prevOperator = null;

const screen = document.querySelector('.calc-screen');

const button = document.querySelector('.calc-btns');

button.addEventListener('click', (event) => {
    buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if (isNaN(parseFloat(value)) && value !== '.') {
        handleSymbol(value);
        console.log(value);
    } else if (value == '.') {
        handleDot(value);
    } else {
        handleNumber(value);
    }
    reWriteOnScreen();
}

function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
    } else {
        buffer = buffer + value;
    }
}

function handleDot(value) {
    buffer = buffer + value;
}

function handleSymbol(value) {
    switch (value) {
        case 'C':
            runningTotal = 0;
            buffer = '0';
            prevOperator = null;
            break;
        case '⇦':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '=':
            if (prevOperator === null) {
                return;
            }
            showResult(parseFloat(buffer));
            prevOperator = null;
            buffer = '' + runningTotal;
            runningTotal = 0;
            break;
        default:
            handleMath(value);
            break;
        // case '-':
        // case '×':
        // case '÷':
        //     handleMath(value);
        //     break;
    }
}

function handleMath(value) {
    if (buffer === '0') {
        return;
    }
    const intOfBuffer = parseFloat(buffer);
    if (runningTotal === 0) {
        runningTotal = intOfBuffer;
    } else {
        showResult(intOfBuffer);
    }

    prevOperator = value;

    buffer = '0';
}

function showResult(intBuffer) {
    if (prevOperator === '+') {
        runningTotal += intBuffer;
    } else if (prevOperator === '-') {
        runningTotal -= intBuffer;
    } else if (prevOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
    // switch (value) {
    //     case prevOperator === '+':
    //         runningTotal += intBuffer;
    //         break;
    //     case prevOperator === '-':
    //         runningTotal -= intBuffer;
    //         break;
    //     case prevOperator === '×':
    //         runningTotal *= intBuffer;
    //         break;
    //     default:
    //         runningTotal /= intBuffer;
    //         break;
    // }
}

function reWriteOnScreen() {
    screen.innerText = buffer;
}
