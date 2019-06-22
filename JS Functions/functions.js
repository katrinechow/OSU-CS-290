// *****************************************************************************
// ** Name: Katrine Chow
// ** Class: CS 290 Section 400 Spring 2019
// ** Date: April 21, 2019
// ** Assignment: Activity: JS Functions
// ** Description: Creating 1) JavaScript function that is used before it
// **		is declared. This shows function hoisting. and 2) Create
// **		JS function assigned to a variable, and use the function
// **		before it is assigned to var. This will not work, and
// **		shows that we must take care to assign to var before using
// **		JS functions.
// *****************************************************************************


// Calling function before it is declared to show function hoisting

greet("Sunshine");

function greet(input){
	console.log("Hello " + input + "!");
}


//Assigning function to variable, then call it before function is
//assigned to var to show that this method does not work
//Please comment out the code above before testing this section

greet("Sunshine");

var greet = function(input){
	console.log("Nice try " + input + "!");
};

//If you un-comment the line below, this code will work
//greet("Sunshine");
