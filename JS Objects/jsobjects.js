function deepEqual(x, y){  
  
  //Checking for null. If both are null then they are the same
  if(x == null && y == null)
    return true;
    
  //Here we know that x or y can be null, but not both
  else if(x == null || y == null)
    return false;
  
  //Here we know that neither x nor y are null, but can potentially be objects
  if((typeof x == "object") || (typeof y == "object")){
      
      //Get a list of properties from both x and y objects
  		var xprop = Object.keys(x);
  		var yprop = Object.keys(y);
      
      //Check to see if the number of properties are the same
      if(xprop.length === yprop.length){
         
        //Check to see if property names are the same
        for(let i=0; i < xprop.length; i++){
          if(xprop[i] != yprop[i])
            return false;
        }
        
 		//Here means that property names ARE the same
        //Begin comparing each property
        for(var p in x){
          check = deepEqual(x[p], y[p]);
          if(!check)
            return false;
        }
        
        return true;
      }
      //if property length different, the two objects are different
      else
        return false;
      
    }
  	
  	else if(typeof x != "object" && typeof y != "object"){
  		//Here we know that x and y are not objects and not null
  		//We will use a direct comparison method ===
  		if(x === y)
    		return true;
  		else
    		return false;
	}
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true