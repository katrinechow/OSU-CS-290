/*******************************************************************************
 * Name: Katrine Chow
 * Date: May 5, 2019
 * Class: CS 290 Section 400 Web Development
 * Description: This assignment requires a 4 x 4 table created via Javascript,
 *				with a header row, and the remaining cells showing their row,
 *				column positions. There are buttons to select cells up, down,
 *				left, and right, as well as to mark a cell yellow. Once a cell
 *				is marked, the yellow background persists.
*******************************************************************************/

function createTable() {

function selectcell(){
	cell.style.borderWidth = '4px';
    cell.style.borderStyle = 'solid';
    cell.style.borderColor = 'black';
	cell.id = 'selected';
}

function unselectcell(){
	var unselect = document.getElementById("selected");
	unselect.style.borderWidth='thin';
	unselect.id = 'inner';
}


//Referenced MDN Web Docs - "Traversing an HTML table with JavaScript and DOM Interfaces". https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces

//Access <body> object
var body = document.getElementsByTagName("body")[0];

//Create <table>, <thead>, and <tbody> objects
var newtable = document.createElement("table");
var tablebody = document.createElement("tbody");

//Create 4x4 table
for(var i = 0; i < 4; i++){
	var row = document.createElement("tr");
       
    //Fill row with cells
    for (var j = 0; j < 4; j++){
     
    	var cell = document.createElement("td");
       	if(i == 0){
       		var textnode = document.createTextNode("Header " + (j+1));
            cell.appendChild(textnode);
			cell.id = i;
            row.appendChild(cell);
        }
        else{
			//Cell 1,1 starts as Selected Cell
			if(i == 1 && j == 0)
				selectcell();
			else{
				//Update Element id
				cell.id = "inner";
			}
			
        	//Create text
        	var textnode = document.createTextNode(i + ", " + (j+1));

      	  	//Append text to cell
       	 	cell.appendChild(textnode);
        	row.appendChild(cell);
        }
        	
    }
    
    //Append row to tbody
    tablebody.appendChild(row);
}

//Append tbody to table
newtable.appendChild(tablebody);

//Append table into body
body.appendChild(newtable);

//Set border attribute
newtable.setAttribute("border", "2");




//Create buttons
function buttonup(){
	var buttonup = document.createElement("button");
	var t = document.createTextNode("UP");
	buttonup.appendChild(t);
	document.body.appendChild(buttonup);
	buttonup.id = "upbutton";
	
	var currentb = document.getElementById("upbutton");
	currentb.addEventListener("click", function(){ moveup(); });
}



function buttondown(){
	var buttondown = document.createElement("button");
	var t = document.createTextNode("DOWN");
	buttondown.appendChild(t);
	document.body.appendChild(buttondown);
	buttondown.id = "downbutton";
	
	var currentb = document.getElementById("downbutton");
	currentb.addEventListener("click", function(){ movedown(); });
}

function buttonleft(){
	var buttonleft = document.createElement("button");
	var t = document.createTextNode("LEFT");
	buttonleft.appendChild(t);
	document.body.appendChild(buttonleft);
	buttonleft.id = "leftbutton";
	
	var currentb = document.getElementById("leftbutton");
	currentb.addEventListener("click", function(){ moveleft(); });
}

function buttonright(){
	var buttonright = document.createElement("button");
	var t = document.createTextNode("RIGHT");
	buttonright.appendChild(t);
	document.body.appendChild(buttonright);
	buttonright.id = "rightbutton";
	
	var currentb = document.getElementById("rightbutton");
	currentb.addEventListener("click", function(){ moveright(); });
}

function buttonmark(){
	var buttonmark = document.createElement("button");
	var t = document.createTextNode("MARK CELL");
	buttonmark.appendChild(t);
	document.body.appendChild(buttonmark);
	buttonmark.id = "markbutton";
	
	var currentb = document.getElementById("markbutton");
	currentb.addEventListener("click", function(){ markcell(); });
}

function moveup(){
	console.log("Up!");
	var uppity = document.getElementById("selected");
	uppity = uppity.parentNode.nextElementSibling; //moving to parent (row)'s sibling
}

function movedown(){
	console.log("Down!");
}

function moveleft(){
	console.log("Left!");
	var leftity = document.getElementById("selected");
	if(leftity.previousElementSibling != null){
		console.log("LeftHere");
		unselectcell();
		leftity = leftity.previousElementSibling;
		selectcell();
	}
}

function moveright(){
	var rightity = document.getElementById("selected");
	console.log("Right!");
	if(rightity.nextElementSibling !=null){
		console.log("RightHere");
		unselectcell();
		rightity = rightity.nextElementSibling;
		selectcell();
	}
}

function markcell(){
	console.log("Marking!");
	var markity = document.getElementById("selected");
	markity.style.backgroundColor = 'yellow';
}

function unmarkcell(){
	var unmarkity = document.getElementById("selected");
	unmarkity.style.backgroundColor = 'white';
}

buttonup();
buttondown();
buttonleft();
buttonright();
buttonmark();

} //end table

createTable();




