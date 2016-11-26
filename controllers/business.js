const Business = require("../models/Business")

exports.getBusinesses = (req, res) => {

	var page = req.query.page || 1
	var limit = req.query.limit || 20

	Business.find({
		//query
	})
	.skip((page - 1) * limit)
	.limit(limit)
	.exec((error, result) => {

		if(error) {
			res.error({
				error: error
			})

			return
		}

		res.send(result)
	})
}

exports.Import = (req, res) => {

	var items = req.body
	items.forEach((data) => {

		Business.find({
			name: data.name
		})
		.exec((error, result) => {
			if(result.length > 0) {
				//console.log("skipping business for similar ones: " + result.length)
				return
			}

			var business = new Business(data)
			business.loc = [data.latitude, data.longitude]
				
			business.save((err, res) => {
				console.log("saved: " + res.id)
			})
		})
	})
}