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
                //if "=" is entered then the value on the screen is second operand:
                secondValueString = screen.value;
                screen.value  = handleOperation(firstValueString, operator, secondValueString);
                secondScreen.value+=secondValueString+"=";
                //after operation is completed, reset all variables:
                firstValueString = secondValueString = null;
                isFirstNumberCompleted=false;
                resultIsBeingShowed=true; 
                operator=null;
            }
            //This else if block is entered if an operator except equal sign is clicked
            else if (!element.matches(".equalSign")) {
                if (!isFirstNumberCompleted) {
                    firstValueString  = screen.value;
                    operator = element.value;
                    secondScreen.value=firstValueString+operator;
                    //after first operand is completed and operator is specified, go on to second operand:
                    screen.value= "0";
                    isFirstNumberCompleted = true;
                }
                else {   //this else block is entered when an operator is clicked even if 
                         //main operator is already specified.
                    secondValueString=screen.value;   //first operation is done by using first operator
                    firstValueString = handleOperation(firstValueString, operator, secondValueString);
                    screen.value="0";  //after that point, it seems a normal operation. 
                    operator=element.value;   //second operator changed to first operator.
                    secondScreen.value=firstValueString+operator;
                    isFirstNumberCompleted=true;
                    
                    
                }
            }
        }
        else if (element.matches(".number")) {
            // if result is being showed in the screen and we click a number, then screen should restart with 0
            if (resultIsBeingShowed){screen.value="0"; resultIsBeingShowed=false;}
            //if first number is not finished:
            if (!isFirstNumberCompleted) { 
                updateScreen(element.value);
                //after an operation completed and a different operation has started, second screen should be empty
                secondScreen.value=""; }
            else if (isFirstNumberCompleted) { updateScreen(element.value); }
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
// in updateScreen function, starting with zero problem is solved.
function updateScreen(num) {
    screen.value = screen.value === "0" ? num : screen.value + num;
}


function handleOperation(firstValueString, operator, secondValueString) {
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

