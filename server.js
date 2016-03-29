var express = require('express'),
		parser = require('body-parser'),
		hbs = require('hbs'),
		mongoose = require('mongoose'),
		User = require('./models/user'),
		Wod = require('./models/wod'),
		router = require('./routes'),
		app = express();

//configure body-parser
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
//serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use('/api', router);

//set view engine
app.set('view engine', 'hbs');
//connect to mongodb
mongoose.connect("mongodb://localhost/workout_planner");



app.get('*', function(req, res){
	res.render('../views/index.hbs');
});


//Listen on port 3000
var port = 3000;
app.listen(port, function(err){
	if(err){
		console.log(err);
	} else console.log('server started at:', port);
});
