
//Testing listener function for table
AddEventListener('DOMContentLoaded', trackerApp);

function trackerApp(){
        document.getElementByID('trackerSubmit').addEventListener('click', function(event){

                var req = new XMLHttpRequest();
                var sendData = {
                        name:null,
                        reps:null,
                        weight:null,
                        date:null,
                        lbs:null
                };
                sendData.name = document.getElementById('trackerName').value;
                sendData.reps = document.getElementById('trackerReps').value;
                sendData.weight = document.getElementById('trackerWeight').value;
                sendData.date = document.getElementById('trackerDate').value;

		if(document.getElementById('trackerUnit').value == "lbs")
			sendData.lbs = 1;
		else
			sendData.lbs = 0;

                req.open("GET", "/insert?" + sendData, true);


		req.addEventListener('load', function(){

                var response = JSON.parse(req.responseText);
		var id = response.inserted;
	
		//Referenced "Table insertRow() Method" from w3schools:
		//https://www.w3schools.com/jsref/met_table_insertrow.asp
		var table = document.getElementById("dbTable");
		var row = table.insertRow(-1);
		
		var form = document.getElementById("dataForm");
		
		var workoutName = document.createElement('td');
		workoutName.textContent = form.elements.name.value;
		row.appendChild(workoutName);

		var workoutReps = document.createElement('td');
		workoutReps.textContent = form.elements.reps.value;
		row.appendChild(workoutReps);

		var workoutWeight = document.createElement('td');
		workoutWeight.textContent = form.elements.weight.value;
		row.appendChild(workoutWeight);

		var workoutDate = document.createElement('td');
		workoutDate.textContent = form.elements.date.value;
		row.appendChild(workoutDate);

		var workoutUnit = document.createElement('td');
		if(document.getELementById('trackerUnit').value == "lbs")
			workoutUnit.textContent = "lbs";
		else
			workoutUnit.textContent = "kg";
		

        })
}

