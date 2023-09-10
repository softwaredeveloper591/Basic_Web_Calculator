const button_div = document.querySelector(".buttonsForInput");
const screen = document.querySelector(".display-screen");
const secondScreen = document.querySelector(".second-screen");
let firstValueString = null;
let operator = null;
let isFirstNumberCompleted = false;
let secondValueString=null;
let resultIsBeingShowed=false;
button_div.addEventListener("click", function (e) {
    let element = e.target;
    if (element.matches("button")) {
        if (element.matches(".operator")) {
            if (element.matches(".equalSign") && isFirstNumberCompleted) {
                secondValueString = screen.value;
                screen.value  = handleProcess(firstValueString, operator, secondValueString);
                secondScreen.value+=secondValueString+"=";
                firstValueString = secondValueString = null;
                isFirstNumberCompleted=false;
                resultIsBeingShowed=true;
            }
            else if (!element.matches(".equalSign")) {
                if (!isFirstNumberCompleted) {
                    firstValueString  = screen.value;
                    operator = element.value;
                    secondScreen.value=firstValueString+operator;
                    screen.value= "0";
                    isFirstNumberCompleted = true;
                }
                else {
                    secondValueString=screen.value;
                    screen.value=firstValueString = handleProcess(firstValueString, operator, secondValueString);
                    operator=element.value;
                    isFirstNumberCompleted=true;
                    
                    
                }
            }
        }
        else if (element.matches(".number")) {
            if (resultIsBeingShowed){screen.value="0"; resultIsBeingShowed=false;}
            if (!isFirstNumberCompleted) { 
                updateScreen(element.value);
                secondScreen.value=""; }
            else if (isFirstNumberCompleted) { updateScreen(element.value); }
            else { }
        }
        else if (element.matches(".clear")) {
            isFirstNumberCompleted=false;
            operator=firstValueString=null;
            screen.value="0";
            secondScreen.value="";
            

        }
        else if (element.matches(".decimal") && !screen.value.includes(".")) {
            screen.value=="0" ? screen.value="0." : updateScreen(element.value);
        }
    }
})

function updateScreen(num) {
    screen.value = screen.value === "0" ? num : screen.value + num;
}

function handleProcess(firstValueString, operator, secondValueString) {
    const first = parseFloat(firstValueString);
    const second = parseFloat(secondValueString);
    let result = null;
    switch (operator) {
        case ("+"): result = first + second; break;
        case ("-"): result = first - second; break;
        case ("*"): result = first * second; break;
        case ("/"): result = first / second; break;
    }
    return result;
}