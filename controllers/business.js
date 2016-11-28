const Business = require("../models/Business")
const async = require("async")

exports.getBusinesses = (req, res) => {

	var page = parseInt(req.query.page || 1)
	var limit = parseInt(req.query.limit || 20)
	var priceMax = parseInt(req.query.price) || 5
	var ratingMin = parseInt(req.query.rating) || 0

	//search for food by default
	var tags = ["food"]
	if(req.query.tags) {
		tags = req.query.tags.split(",")
	}

	var sortBy = req.query.sort || 'rating'

	var filtes = []
	filtes.push({"price": { $lte: priceMax }})
	filtes.push({"rating": { $gte: ratingMin }}) 
	filtes.push({"tags" : { $in: tags }})

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
				business.loc = [data.latitude, data.longitude]
				console.log("saving business: " + business.name)
				business.save(callback)
			})
	},
	(err) => {
		res.send()
	})
}