var express = require('express'),
		parser = require('body-parser'),
		hbs = require('hbs'),
		mongoose = require('mongoose'),
		User = require('./models/user'),
		Event = require('./models/event'),
		app = express();

//configure body-parser
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
//serve static files from public folder
app.use(express.static('__dirname' + '/public'));

//set view engine
app.set('view engine', 'hbs');
//connect to mongodb
mongoose.connect("mongodb://localhost/weekend_planner");

// ALL API ROUTES

//GET EVENTS
app.get('/api/events', function(req, res){
	Event.find(function(err, allInterest){
		if(err) {
			res.status(500).json({ error: err.message })
		} else {
			res.json(allInterest);
			}
	});
});

//CREATE EVENTS

//SHOW EVENTS

//UPDATE EVENTS

//DELETE EVENTS


app.get('*', function(req, res){
	res.render('index');
});

//Listen on port 3000
var port = 3000;
app.listen(port, function(err){
	if(err){
		console.log(err);
	} else console.log('server started at:', port);
});
