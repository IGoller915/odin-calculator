let currentNumber = null
let storedNumber = null
let currentOperator = null

const displayTop = document.querySelector('.display-top')
const displayBottom = document.querySelector('.display-bottom')

displayTop.textContent = null
displayBottom.textContent = 0

function operate(a, b, operator){
    if (a === null || b === null) return
    if (operator === "+") return Number(a) + Number(b)
    if (operator === "-") return Number(a) - Number(b)
    if (operator === "*") return Number(a) * Number(b)
    if (operator === "/") return Number(a) / Number(b)
    return 'derp'
}

function buttonPush(e) {
    if (this.classList.contains('number')) {
        let digit = this.textContent
        currentNumber == null ? currentNumber = digit : currentNumber = `${currentNumber}${digit}`
        displayBottom.textContent = currentNumber
    }

    if (this.classList.contains('operator')) {
        if (storedNumber == null && currentNumber != null){ //initial operator push after clear
            currentOperator = this.textContent
            storedNumber = currentNumber
            currentNumber = null
            displayTop.textContent = `${storedNumber} ${currentOperator}`
        }
        if (storedNumber != null && currentNumber == null){ //any operator push after an equals push
            currentOperator = this.textContent
            displayTop.textContent = `${storedNumber} ${currentOperator}`
            displayBottom.textContent = 0
        }
        else{ //any operator push following a string of operator pushes
            let result = operate(storedNumber,currentNumber,currentOperator)
            currentOperator = this.textContent
            storedNumber = result
            currentNumber = null
            displayTop.textContent = `${storedNumber} ${currentOperator}`
            displayBottom.textContent = result
            
        }
    }

    if (this.classList.contains('clear')) {
        currentNumber = null
        storedNumber = null
        currentOperator = null
        displayTop.textContent = storedNumber
        displayBottom.textContent = 0

    }

    if (this.classList.contains('delete')) {
        if (currentNumber == null) return
        currentNumber = currentNumber.slice(0,-1)
        currentNumber == "" ? displayBottom.textContent = 0 : displayBottom.textContent = currentNumber
    }

    if (this.classList.contains('equal')) {
        if (storedNumber != null && currentNumber != null && currentOperator != null){
            let result = operate(storedNumber,currentNumber,currentOperator)
            displayTop.textContent = `${storedNumber} ${currentOperator} ${currentNumber} =`
            storedNumber = result
            displayBottom.textContent = result
            currentNumber = null
            currentOperator = null
        }

        else if (storedNumber != null && currentNumber == null){
            displayTop.textContent = `${storedNumber} =`
            currentOperator = null
        }
        else {
            storedNumber = currentNumber
            currentNumber = null
            displayTop.textContent = `${storedNumber} =`
            currentOperator = null
        }
    }
}

const buttons = document.querySelectorAll('.button')
buttons.forEach(button => button.addEventListener('click', buttonPush))

document.addEventListener('keydown', e => {
    const key = e.key
    const button = document.querySelector(`.button[data-key="${key}"]`)
    if (button) button.click()

})


