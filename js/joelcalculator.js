//run main function.
init();

function init(){
   mouse_events();
   keyboard_events();
}

function mouse_events()
{
    let buttons = document.getElementsByTagName('button');

    for(let i = 0; i < buttons.length; i++)
    {
        buttons[i].onclick = function ()
        {
            operations(buttons[i]);
        }//end onclick event
    }//end for loop

}//end function

function calculate(string){
    //use javascript eval to evaluate the string input 
    //and calculate the result as ints.
    const result = eval(string);
    return result;
}

function keyboard_events(){
    let screen  = document.getElementById('calc_screen');
    screen.onkeydown = function(e){
        if(screen.value.length > 0)
        {
            //if there is an input and enter is pressed, calculate.
            if(e.keyCode === 13){
                screen.value = calculate(screen.value);
            }
            //if ESC is pressed erase input.
            if(e.keyCode === 27){
                screen.value = '';
            }
        }
    };
}//end keyboard events

function operations(input)
{
    //get the input element emulating a screen.
    let screen  = document.getElementById('calc_screen');
    //Unless defined otherwise concatenate everything on the screen.
    screen.value += input.value;

    //check if test field is not empty
    if(screen.value.length > 0)
    {
        if(input.classList[1] === "_equal")
        {
            //calculate the result of the input.
            screen.value = calculate(screen.value);
        }

        if(input.classList[1] === "_clear")
        {
            //just replace any existing string with an empty string.
            screen.value = '';
        }

        if(input.classList[1] === "_plus-minus")
        {
            //if the first character of the string is a minus
            //erase it otherwise add it to change the magnitude of a number.
            if(screen.value.charAt(0) === '-')
            {
                screen.value = screen.value.slice(1, screen.value.length);
            }else
            {
                screen.value = "-" + screen.value;
            }
        }

        if(input.classList[1] === "_()")
        {
            //if the input does not contain the character '(' add it.
            //otherwise close the braces.
            if(! screen.value.includes("(") ){
                screen.value += "(";
            }else{
                screen.value += ")";
            }
        }

        if(input.classList[1] === "_erase")
        {
            //if there is input erase the rightmost character.
            //By slicing the string from the beginning to the penultimate character.
            //only erase if there is an input.
            let result = screen.value.slice(0, screen.value.length - 1);
            screen.value = result;
        }

        if(input.classList[1] === "_mod")
        {
            //add the mod operator if there is an input
            screen.value += " % ";
        }

        if(input.classList[1] === "_div")
        {
            //add the division operator if there is an input
            screen.value += " / ";
        }

        if(input.classList[1] === "_plus")
        {
            //add the plus operator if there is an input
            screen.value += " + ";
        }

        if(input.classList[1] === "_minus")
        {
            //add the minus operator if there is an input
            screen.value += " - ";
        }

        if(input.classList[1] === "_multi")
        {
            //add the minus operator if there is an input
            screen.value += " * ";
        }

        if(input.classList[1] === "_sqr")
        {
            //find the square of the input.
            screen.value = Math.pow(parseInt(screen.value), 2);
        }

        if(input.classList[1] === "_sqrt")
        {
            //find the square root of the input.
            screen.value = Math.sqrt(parseInt(screen.value));
        }

    }//end check if text field is not empty

    if(input.classList[1] === "_radix"){
        //if the input is empty add the '.' character with a leading zero.
        if(screen.value.length === 0)
        {
            screen.value = "0.";
        }else if(! screen.value.includes(".") )
        {
            //if there is no '.' in the string add it for fractional numbers.
            screen.value += ".";
        }
    }//end radix validation.

}//end operations
