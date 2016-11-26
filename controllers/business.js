const Business = require("../models/Business")
const async = require("async")

exports.getBusinesses = (req, res) => {

	var page = parseInt(req.query.page || 1)
	var limit = parseInt(req.query.limit || 20)
	var sortBy = req.query.sort || 'rating'
	
	Business.find({
		//query
	})
	.sort('-' + sortBy)
	.skip((page - 1) * limit)
	.limit(limit)
	.exec((error, result) => {

		if(error) {
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