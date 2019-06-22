/*******************************************************************************
** Name: Katrine Chow
** Date: May 18, 2019
** Class: CS 290 Section 400 Web Development
** Description: This is the script for receiving and parsing GET and POST
**		request contents. It should display the content back to the user
**		via a list.
*******************************************************************************/

// The following code references and uses the sample lecture code in CS 290,
// Lecture: Server Side with Node.js, by Professor Wolford


var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3739);

// Declaring bodyParser here for use to parse POST data later
//
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Below is to parse data received via GET

app.get('/',function(req,res){
  res.render('home');
});

app.get('/get-post',function(req,res){
  var qParams = [];
  for (var p in req.query){
	qParams.push({'name':p,'value':req.query[p]})
  }
  
  var context = {};
  context = qParams;
  res.render('get', context);
});


// Below is getting data from POST and rendering the POST template

app.post('/',function(req,res){
  res.render('home');
});

app.post('/get-post',function(req,res){
  var pParams = [];
  for (var p in req.body){
	pParams.push({'name':p,'value':req.body[p]})
  }

  var context = {};
  context = pParams;
  res.render('post', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
