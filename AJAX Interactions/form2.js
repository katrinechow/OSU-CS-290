/*******************************************************************************
 * Name: Katrine Chow
 * Date: May 12, 2019
 * Class: CS 290 Section 400 Web Development
 * File: form1.js
 * Description: This activity asks us to create a HTML form asking user for text,
 *				submit it to httpbin.org, and then process and display the data
 *				we receive. As practice, I also referenced the first sample code in
 *				CS 290's "Asynchronous Requests" lecture to try a delayed message.
*******************************************************************************/
		
	document.addEventListener('DOMContentLoaded', firstText);
		
	function firstText(){
		// To TA: I wanted to see the asynchronous request happening so I am placing
		//a 7 second delay here
		window.setTimeout(delayedText, 7000);
		document.getElementById('textSubmit').addEventListener('click', function(event){
			
			var req = new XMLHttpRequest();
			var sendData = {text:null};
			sendData.text = document.getElementById('textInput').value;
			req.open("POST", "http://httpbin.org/post", false);
			//req.setRequestHeader() and asynchronous request referenced example code in CS 290 lecture "Asynchronous Requests", section "Converting to Asynchronous".
			req.setRequestHeader('Content-Type', 'application/json');
			req.addEventListener('load', function(){
				if(req.status >= 200 && req.status < 400){
					var response = JSON.parse(req.responseText);
					document.getElementById('receivedText').textContent = response.data;
				}
				else{
					console.log("Error in network request: " + req.statusText);
				}
			});
			req.send(sendData.text);
			event.preventDefault();
			})
	}

// After about 7 seconds, the received text span should be replaced by the following:	
function delayedText(){
	document.getElementById('receivedText').textContent = "Did that take awhile?";
}