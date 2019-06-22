/*******************************************************************************
 * Name: Katrine Chow
 * Date: February 3, 2019
 * Class: CS 290 Section 400 Web Development
 * Description: This assignment requires us to use knowledge of Javascript
 * 		prototypes and objects to sort an array of automobiles in three
 * 		ways. We also set rules for printing to console based on the
 * 		sort (sorting by type would display the car's type, while other
 * 		sorting methods would not display types).
*******************************************************************************/



function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

// prototypes for class Automobile. Added logMe function here
Automobile.prototype.getYear = function(){return(this.year)};
Automobile.prototype.getMake = function(){return (this.make).toUpperCase()};
Automobile.prototype.getType = function(){return (this.type).toLowerCase()};
Automobile.prototype.logMe = function(status){ 
	if(status == true)
		console.log(this.year + ' ' + this.make + ' ' + this.model + ' ' + this.type);
	else
		console.log(this.year + ' ' + this.make + ' ' + this.model);
	}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];


//Opening stars
console.log("*****");
console.log("The cars sorted by year are:");

//Sort by year
var sortedAuto = sortArr(yearComparator, automobiles);

//logMe function referenced Braden Hitchcock's response on Piazza, at:
//https://piazza.com/class/jqiq5lwpaoq5ua?cid=66

sortedAuto.forEach(function(automobile){
	automobile.logMe(false);
});

console.log();

console.log("The cars sorted by make are:");

//Sort by make
var sortedAuto = sortArr(makeComparator, automobiles);

sortedAuto.forEach(function(automobile){
	automobile.logMe(false);
});

console.log();

console.log("The cars sorted by type are:");

//Sort by type
var sortedAuto = sortArr(typeComparator, automobiles);

//logMe is passed true so that it'll display car's type
sortedAuto.forEach(function(automobile){
	automobile.logMe(true);
});

//Closing stars
console.log("*****");



/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){

  	  //Bubblesort algorithm referenced response by Ignatius Andrew @: 
   	 //https://stackoverflow.com/questions/7502489/bubble-sort-algorithm-javascript
	for(let i = 0; i < array.length; i++){
		for(let j = 0; j < (array.length - i - 1); j++){
        		var result = comparator(array[j], array[j+1]);
        		
			if (result == false){
        			//Swap
          			var temp = array[j];
       				array[j] = array[j+1];
     				array[j+1] = temp;
      			}
    		}
   	}
     return array;
}


/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){

    if(auto1.getYear() > auto2.getYear()){
    		return true;
    }
    else
    		return false;
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){

	if(auto1.getMake() < auto2.getMake())
		return true;
	else
		return false;    
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/


function typeComparator( auto1, auto2){

//This is probably not very elegant. I basically hard-coded all the paths.

	if(auto1.getType() == 'roadster'){
		if(auto2.getType() == 'roadster'){
			var test = yearComparator(auto1, auto2);
			if (test == true)
				return true;
			else
				return false;
		}
		else
			return true;
	}
	
	else if(auto1.getType() == 'pickup'){
		if(auto2.getType() == 'roadster')
			return false;
		else if(auto2.getType() == 'pickup'){
			var test2 = yearComparator(auto1, auto2);
			if(test2 == true)
				return true;
			else
				return false;
		}
		else
			return true;
	}

	else if(auto1.getType() == 'suv'){
		if(auto2.getType() == 'roadster' || auto2.getType() == 'pickup')
			return false;
		else if(auto2.getType() == 'suv'){
			var test3 = yearComparator(auto1, auto2);
			if(test3 == true)
				return true;
			else
				return false;
		}
		else
			return true;
	}

	else if(auto1.getType() == 'wagon'){
		if(auto2.getType() == 'roadster' || auto2.getType() == 'pickup' || auto2.getType() == 'suv')
			return false;
		else if(auto2.getType() == 'wagon'){
			var test4 = yearComparator(auto1, auto2);
			if(test4 == true)
				return true;
			else
				return false;
		}
		else
			return true;
	}

	else{
		if(auto2.getType() == 'roadster' || auto2.getType() == 'pickup' || auto2.getType() == 'suv' || auto2.getType() == 'wagon')
			return false;
		else{
			var test5 = yearComparator(auto1, auto2);
			if(test5 == true)
				return true;
			else
				return false;
		}
	}
}

