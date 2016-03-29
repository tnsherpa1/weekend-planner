'use strict';
var express = require('express');
var User = require('./models/user');
var Wod = require('./models/wod');
var router = express.Router();

// ALL API ROUTES

//GET WODS
router.get('/wods', function(req, res){
	Wod.find(function(err, allWod){
		if(err) {
			res.status(500).json({ error: err.message })
		} else {
    res.json(allWod);
			}
	});
});

//CREATE WODS
router.post('/wods', function(req,res){
	var newWod = new Wod(req.body);
	console.log(newWod);
	newWod.save(function(err, savedWod){
		if(err){
			res.status(500).json({error: err.message})
		} else {
			res.json(savedWod);
		}
	});
});

//SHOW WODS
router.get('/wods/:id', function(req, res){
	var id = req.params.id;
	Wod.findById({_id: id}, function(err, foundWod){
		if (err) {
			res.status(500).json({error: err.message})
		} else {
			res.json(foundWod);
		}
	})
})

//UPDATE WODS
router.put('/wods/:id', function(req,res){
	var id = req.params.id;
	Wod.findById({_id: id}, function(err, updateWod){
		if (err) {
			res.status(500).json(err);
		} else {
			updateWod.title = req.body.title;
			Wod.save(function(err, savedWod){
				if(err){
					res.status(500).json({error: err.message})
				} else {
					res.json(savedWod);
				}
			});
		}
	})
});

//DELETE WODS
router.delete('/wods/:id', function(req,res){
	var id = req.params.id;
	Wod.findOneAndRemove({_id: id}, function(err, removedWod){
		if (err){
			res.status(500).json({error: err.message});
		} else {
			res.json(removedWod)
		}
	})
})

module.exports = router;
