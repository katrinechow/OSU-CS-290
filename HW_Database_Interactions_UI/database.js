var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3739);

//Declaring bodyParser here for use to parse POST data later
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//MySQL database setup
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host		  : 'classmysql.engr.oregonstate.edu',
  user		  : 'cs290_chowk',
  password	  : '6280',
  database	  : 'cs290_chowk'
});

module.exports.pool = pool;


//static path settings referenced "Loading css file on front-end[Solved]
//https://www.freecodecamp.org/forum/t/loading-css-file-on-front-end-solved/25550
//var path requirement referenced "app.use(express.static(path.join(__dirname,
//'/public'))); ReferenceError:path is not defined what is issue?"
//https://stackoverflow.com/questions/45137898/app-useexpress-staticpath-join-dirname-public-referenceerror-path-is
var path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/reset-table',function(req,res,next){
        var context = {};
        pool.query("DROP TABLE IF EXISTS workouts", function(err){
                var createString = "CREATE TABLE workouts("+
                "id INT PRIMARY KEY AUTO_INCREMENT,"+
                "name VARCHAR(255) NOT NULL,"+
                "reps INT,"+
                "weight INT,"+
                "date DATE,"+
                "lbs BOOLEAN)";
                pool.query(createString, function(err){
                context.results = "Table reset";
                res.render('home',context);
                })
        });
});



//"Inserting Data" from "Using MySQL With Node" lecture, Professor Wolford
app.get('/insert',function(req,res,next){
	var context = {};
	console.log("Inserting...");
	pool.query("INSERT INTO workouts (`id`, `name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?, ?)", [req.query.id, req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], 
	function(err, result){
		if(err){
			next(err);
			return;
		}

		context.inserted = result.insertId;
		res.send(JSON.stringify(context));
	});

});


//Display the current table
app.get('/',function(req,res,next){
var context = {};
pool.query('SELECT * FROM workouts', function(err, rows, fields){
	if(err){
		next(err);
		return;
	}
	
	var dbParams = [];
	for(var r in rows){
		var addRow = {	'id': rows[r].id,
				'name': rows[r].name,
				'reps': rows[r].reps, 
				'weight': rows[r].weight, 
				'date':rows[r].date};

		if(rows[r].lbs == 1)
			addRow.lbs = "lbs";
		else
			addRow.lbs = "kgs";

		dbParams.push(addRow);
	}

	context.result = dbParams;
	res.render('home', context);
	
	});

});


//"Updating Data" from lecture "Using MySQL With Node" by Professor Wolford
app.get('/safe-update',function(req,res,next){
var context = {};

	pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
		if(err){
			next(err);
			return;
		}

		if(result.length == 1){
			var curVals = result[0];
			pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=? WHERE id=? ",
			[req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.date || curVals.date, req.query.id],
			function(err, result){
				if(err){
					next(err);
					return;
				}

			context.results = "Updated " + result.changedRows + " rows.";
			res.render('home',context);
			});
		}
	});

});


app.get('/delete', function(req,res,next){
	var context = {};
	pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
		if(err){
			next(err);
			return;
		}
	});

});


//testing server-side app.post()

/*app.post('/',function(req,res){
  res.render('home');
});

app.post('/posting',function(req,res){
console.log("Got a POST request");
  var qParams = [];
  for (var p in req.body){
        qParams.push({'name':p,'value':req.body[p]})
  }

  var context = {};
  context = qParams;
  res.render('post', context);
});
*/


app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
