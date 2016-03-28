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
app.post('api/events', function(req,res){
	var newEvent = new Event(req.body);
	newEvent.save(function(err, savedEvent){
		if(err){
			res.status(500).json({error: err.message})
		} else {
			res.json(savedEvent);
		}
	});
});

//SHOW EVENTS
app.get('api/events/:id', function(req, res){
	var id = req.params.id;
	Event.findById({_id: id}, function(err, foundEvent){
		if (err) {
			res.status(500).json({error: err.message})
		} else {
			res.json(foundEvent);
		}
	})
})

//UPDATE EVENTS
app.put('api/events/:id', function(req,res){
	var id = req.params.id;
	Event.findById({_id: id}, function(err, updateEvent){
		if (err) {
			res.status(500).json(err);
		} else {
			updateEvent.title = req.body.title;
			Event.save(function(err, savedEvent){
				if(err){
					res.status(500).json({error: err.message})
				} else {
					res.json(savedEvent);
				}
			});
		}
	})
});

//DELETE EVENTS
app.delete('api/events/:id', function(req,res){
	var id = req.params.id;
	Event.findOneandRemove({_id: id}, function(err, removedEvent){
		if (err){
			res.status(500).json({error: err.message});
		} else {
			res.json(removedEvent)
		}
	})
})


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
