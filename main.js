

const displayOne = document.querySelector("#display-one")
const displayTwo = document.querySelector("#display-two")
const equal = document.querySelector('#equal');

const buttons = Array.from(document.querySelectorAll(".button"));

buttons.map((button)=>{
    button.addEventListener('click',(e)=>{
        var text = e.target.innerText;
        
        switch(text){
            case 'C':
                displayOne.innerText = ''
                displayTwo.innerText = '0'
                break;
            case 'X':
                if(displayOne.innerText){
                displayOne.innerText = displayOne.innerText.slice(0, -1);
                }
                break;
            case '=':
                let expression = displayOne.innerText;
                console.log(typeof expression);
                displayTwo.innerText = calculate(infixToPostfix(expression));
                break;
            default:
                displayOne.innerText +=  e.target.innerText ;
                break;
        }
        
    })
})


// calculate function 


const presedence = (x)=>{
    if(x === '('){
        return 0;
    }
    if(x === '+' || x === '-'){
        return 1;
    }
    if(x === "*" || x === "/")
    {
        return 2;
    }
}





// calculating postfix expression 
const calculate = (expression)=>{
    console.log("Evaluvating " + expression);

    // not handle empty expression


    let spaceExpression = expression.split(" ");

    // stack to hold numbers
    const numbers = [];

    spaceExpression.forEach(value=>{
        if(!isNaN(value)){
            numbers.push(parseFloat(value)); // parsing to number
        }
        else{
            // pop last two numbers
            let lastNumber = numbers.pop();
            let secondLastNumber = numbers.pop();

            // when an operator is founded ,
            // calculate with last two numbers in stack

            switch(value){
                case "+":
                    numbers.push(lastNumber+secondLastNumber);
                    break;
                
                case "-":
                    numbers.push(secondLastNumber- lastNumber);
                    break;

                case "*":
                    numbers.push(lastNumber*
                        secondLastNumber);
                        console.log(numbers);
                    break;

                case "/":
                    numbers.push(secondLastNumber/lastNumber);
                    break;
            }
            // console.log(numbers,lastNumber,secondLastNumber);
        }
        console.log(numbers);
    })
    // return the calculated value
    return numbers[numbers.length - 1]

}












// Convert infix expression to postfix expression
const infixToPostfix = (expression)=>{
    console.log(expression);
    let spaceExpression = expression; 
    
    spaceExpression = spaceExpression.split("*").join(" * "); 
    spaceExpression = spaceExpression.split("/").join(" / "); 
    spaceExpression = spaceExpression.split("+").join(" + "); 
    spaceExpression = spaceExpression.split("-").join(" - "); 
    spaceExpression = spaceExpression.split("(").join("( "); 
    spaceExpression = spaceExpression.split(")").join(" )"); 
    console.log(spaceExpression);
    let spaceCharacters = spaceExpression.split(" "); 


    // Stack for postfix expression
    const postFix=[];

    // Stack for operators
    const operators = [];

    spaceCharacters.forEach((value)=>{
        // console.log(value);
        if(!isNaN(value)){
            postFix.push(value);
        }
        else if(value === '('){
            operators.push(value)
        }
        // pop out all operators when stack found "(" 
        else if(value === ')'){
            for(let i = operators[operators.length - 1]; i>= '('; i--){
                postFix.push(operators.pop())
            }

            // also pop out this operator "("
            if(operators.length > 0){
                operators.pop();
            }
            
        }
        // check the presidence of operators 
        else{

            if(operators[operators.length -1] === undefined){
                operators.push(value);
                console.log(operators);
            }
            else{
                while(presedence(operators[operators.length - 1]) >= presedence(value)){
                    postFix.push(operators.pop());
                }    
                operators.push(value);
            }
            
            
        }

    })

    // if the operator stack is not empty pop out all operators from stack 
    while(operators.length !== 0){
        postFix.push(operators.pop())
    }

    console.log(postFix,operators);

    return postFix.join(" ");

}
// let s = '( 4 * 5 ) + 8 / 2'
// let s = '5 * 5 + ( 4 - 2 )'
// let s = '( 53 + ( 4 * 12 ) - ( 10 + 8 ) - 1 )'


// console.log(calculate(infixToPostfix('')));








