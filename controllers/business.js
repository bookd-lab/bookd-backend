const Business = require("../models/Business")
const mongoose = require("mongoose")
const async = require("async")

exports.getBusinesses = (req, res) => {

	var page = parseInt(req.query.page || 1)
	var limit = parseInt(req.query.limit || 20)
	var priceMax = parseInt(req.query.price) || 5
	var ratingMin = parseInt(req.query.rating) || 0

	//search for food by default
	//disabled since moved to full text search
	// var tags = ["food"]
	// if(req.query.tags) {
	// 	tags = req.query.tags.split(",")
	// }

	var sortBy = req.query.sort || 'rating'

	var filtes = []
	filtes.push({"price": { $lte: priceMax }})
	filtes.push({"rating": { $gte: ratingMin }}) 
	//filtes.push({"tags" : { $in: tags }})

	if(req.query.q) {
		filtes.push({$text : { $search: req.query.q }})
	}

	Business.find({
		$and: filtes
	})
	.sort('-' + sortBy)
	.skip((page - 1) * limit)
	.limit(limit)
	.exec((error, result) => {

		if(error) {
			console.log(error)
			res.status(500).send({
				error: error
			})

			return
		}

		res.send(result)
	})
}

exports.getBusinessesByIds = (req, res) => {

	if(!req.query.ids.length || req.query.ids.length == 0) {
		res.send([])
		return
	}

	var ids = (req.query.ids || "").split(",") || []
	var objectIds = []
	for(var i = 0; i < ids.length; i++) {
		objectIds.push(mongoose.Types.ObjectId(ids[i]))
		console.log(objectIds[i])
	}
	
	Business.find({
		_id: { $in : objectIds }
	})
	.exec((error, result) => {
		if(error) {
			console.log(error)
			res.status(500).send({
				error: error
			})

			return
		}

		res.send(result)
	})
}

exports.Import = (req, res) => {

	var items = req.body
	async.forEach(items,
		(data, callback) => {
			Business.find({
				name: data.name
			})
			.exec((error, result) => {
				if(result.length > 0) {
					callback()
					console.log("skipping business for similar ones: " + result.length)
					return
				}

				var business = new Business(data)
				console.log("saving business: " + business.name)
				business.save((err, r) => {
					//console.log(err)
				})
			})
	},
	(err) => {
		res.send()
	})
}