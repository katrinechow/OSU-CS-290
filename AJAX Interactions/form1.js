/*******************************************************************************
 * Name: Katrine Chow
 * Date: May 12, 2019
 * Class: CS 290 Section 400 Web Development
 * File: form1.js
 * Description: This activity asks us to create a HTML form asking user for a City name or
 *				zip code. Using the OpenWeatherMap API, receive and parse result to display
 *				the location name, current temperature, and humidity.
*******************************************************************************/

	var link = 'https://api.openweathermap.org/data/2.5/weather?q=';
	var apiKey = ',us&appid=fa7d80c48643dfadde2cced1b1be6ca1';
		
	document.addEventListener('DOMContentLoaded', weatherApp);
		
	function weatherApp(){
		document.getElementById('citySubmit').addEventListener('click', function(event){
			
			var req = new XMLHttpRequest();
			var sendData = {city:null};
			sendData.city = document.getElementById('cityCode').value;
			req.open("GET", link+sendData.city+apiKey, false);
			req.send(null);
			var response = JSON.parse(req.responseText);

				
			document.getElementById('cityName').textContent = response.name;
			//Kelvin to Fahrenheit conversion courtesy of Google.com search by keyboard "kelvin to fahrenheit", and inspired by Anonymous' post on Piazza https://piazza.com/class/jqiq5lwpaoq5ua?cid=111
			document.getElementById('currentTemp').textContent = (Math.floor((response.main.temp - 273.15)*(9/5) + 32));
			document.getElementById('humidity').textContent = response.main.humidity;
			event.preventDefault();
			})
	}