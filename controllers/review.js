const Review = require("../models/Review")

exports.getReview = (req, res) => {

	var page = parseInt(req.query.page || 1)
	var limit = parseInt(req.query.limit || 20)
	var businessId = req.query.businessId

	Review.find({
		businessId: businessId
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

exports.createReview = (req, res) => {
	var reviewData = req.body

	var reviewSave = Review(reviewData)
	reviewSave.save((error, result) => {
		if(error) {
			res.status(500).send({
				error: error
			})

			return
		}

		res.send(result)
	})
}