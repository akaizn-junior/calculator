/**
 * Joel Calculator
 * Simao Nziaka
 * v0.1.1
 */

/**
 * @param (JSON) sets - Calculator settings
 */
function Joel(sets) {
    build(sets);
    events();
}

function build(sets) {
    //get an element with an id of joel
    let joel = document.getElementById('joel');
    //create parts of the calculator
    let jHeader = document.createElement('div');
    let jBody = document.createElement('div');
    let jScreen = document.createElement('input');
    //set attributes
    jHeader.id = 'joel-header';
    jBody.id = 'joel-body';
    jScreen.id = 'joel-screen';
    jScreen.type = 'text';
    jScreen.autofocus = true;
    jScreen.maxLength = sets.screen.maxlength;
    jScreen.readOnly = sets.screen.readonly;
    //get buttons
    let btns_grid = create_buttons_grid();
    //append to joel
    jHeader.appendChild(jScreen);
    jBody.appendChild(btns_grid);
    joel.appendChild(jHeader);
    joel.appendChild(jBody);
}

function create_buttons(btns) {
    let btns_tr = document.createElement('tr');
    for(let i = 0; i < btns.length; i++) {
        //create td and button
        let btn_td = document.createElement('td');
        let btn = document.createElement('button');
        //add classes to the button
        btn.classList.add('jbutton');
        btn.classList.add(btns[i].type);
        btn.classList.add(btns[i].class);
        btn.innerHTML = btns[i].text;
        if (btns[i].type === 'number') btn.value = btns[i].text;
        //append elements
        btn_td.appendChild(btn);
        btns_tr.appendChild(btn_td);
    }
    return btns_tr;
}

function create_buttons_grid() {
    let grid = document.createElement('table');

    let buttons = [
    [   
        {
            class: '_clear',
            text: 'C',
            type: 'operator'
        }, {
            class: '_()',
            text: '()',
            type: 'operator'
        }, {
            class: '_mod',
            text: '%',
            type: 'operator'
        }, {
            class: '_erase',
            text: 'Del',
            type: 'operator'
        }, {
            class: '_div',
            text: '/',
            type: 'operator'
        }
    ], [
        {
            class: '_7',
            text: '7',
            type: 'number'
        }, {
            class: '_8',
            text: '8',
            type: 'number'
        }, {
            class: '_9',
            text: '9',
            type: 'number'
        }, {
            class: '_multi',
            text: 'x',
            type: 'operator'
        }, {
            class: '_sqrt',
            text: '&Sqrt;',
            type: 'operator'
        }
    ], [
        {
            class: '_4',
            text: '4',
            type: 'number'
        }, {
            class: '_5',
            text: '5',
            type: 'number'
        }, {
            class: '_6',
            text: '6',
            type: 'number'
        }, {
            class: '_minus',
            text: '-',
            type: 'operator'
        }, {
            class: '_sqr',
            text: 'x<sup>2</sup>',
            type: 'operator'
        }
    ], [
        {
            class: '_1',
            text: '1',
            type: 'number'
        }, {
            class: '_2',
            text: '2',
            type: 'number'
        }, {
            class: '_3',
            text: '3',
            type: 'number'
        }, {
            class: '_plus',
            text: '+',
            type: 'operator'
        }
    ], [
        {
            class: '_plus-minus',
            text: '+/-',
            type: 'operator'
        },
        {
            class: '_0',
            text: '0',
            type: 'number'
        }, {
            class: '_radix',
            text: '.',
            type: 'operator'
        }, {
            class: '_equal',
            text: '=',
            type: 'operator'
        }
    ]];

    //create buttons row by row and append to the grid
    for(let i = 0; i < buttons.length; i++) 
        grid.appendChild(create_buttons(buttons[i]));

    return grid;
}

function calculate(string) {
    //use javascript eval to evaluate the string input 
    //and calculate the result as ints.
    return eval(string);
}

function events() {
    mouse_events();
    keyboard_events();
}

function mouse_events() {
    let buttons = document.getElementsByClassName('jbutton');
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            apply_buttonEvent(buttons[i]);
        }
    }
}

function keyboard_events() {
    let screen  = document.getElementById('joel-screen');

    screen.onkeydown = function(e) {
        if(screen.value.length > 0) {
            //if there is an input and enter is pressed, calculate.
            if(e.keyCode === 13) {
                screen.value = calculate(screen.value);
            }
            //if ESC is pressed erase input.
            if(e.keyCode === 27) {
                screen.value = '';
            }
        }
    };
}

function apply_buttonEvent(input) {
    var operator_classIndex = 2;

    //get the input element emulating a screen.
    let screen  = document.getElementById('joel-screen');
    //Unless defined otherwise concatenate everything on the screen.
    screen.value += input.value;

    //check if input is not empty
    if(screen.value.length > 0) {
        switch_ops(screen, input.classList[operator_classIndex]);
    }
}

function switch_ops(screen, op) { 
    switch (op) {
        case "_equal": 
            //calculate the result of the input.
            screen.value = calculate(screen.value);
        break;
        case "_clear":
            //just replace any existing string with an empty string.
            screen.value = '';
        break;
        case "_plus-minus":
            //if the first character of the string is a minus
            //erase it otherwise add it to change the magnitude of a number.
            if(screen.value.charAt(0) === '-') {
                screen.value = screen.value.slice(1, screen.value.length);
            } else {
                screen.value = "-" + screen.value;
            }
        break;
        case  "_()":
            //if the input does not contain the character '(' add it.
            //otherwise close the braces.
            if(! screen.value.includes("(")) {
                screen.value += " * (";
            } else {
                screen.value += ")";
            }
        break;
        case "_erase":
            //if there is input erase the rightmost character.
            //By slicing the string from the beginning to the penultimate character.
            //only erase if there is an input.
            let result = screen.value.slice(0, screen.value.length - 1);
            screen.value = result;
        break;
        case "_mod":
            //add the mod operator if there is an input
            screen.value += " % ";
        break;
        case "_div":
            //add the division operator if there is an input
            screen.value += " / ";
        break;
        case "_plus":
            //add the plus operator if there is an input
            screen.value += " + ";
        break;
        case "_minus":
            //add the minus operator if there is an input
            screen.value += " - ";
        break;
        case "_multi":
            //add the minus operator if there is an input
            screen.value += " * ";
        break;
        case "_sqr":
             //find the square of the input.
             screen.value = Math.pow(parseInt(screen.value), 2);
        break;
        case "_sqrt":
            //find the square root of the input.
            screen.value = Math.sqrt(parseInt(screen.value));
        break;
        case "_radix":
            //if the input is empty add the '.' character with a leading zero.
            if(screen.value.length === 0) {
                screen.value = "0.";
            } else if(! screen.value.includes(".")) {
                //if there is no '.' in the string add it for fractional numbers.
                screen.value += ".";
            }
        break;
    }
 }
