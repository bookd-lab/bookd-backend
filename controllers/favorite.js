const Favorite = require("../models/Favorite")

exports.getFavorites = (req, res) => {
	var creator = req.query.creator

	Favorite.find({
		creator: creator
	})
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

exports.createFavorite = (req, res) => {
	var favData = req.body

	var favSave = Favorite(favData)
	favSave.save((error, result) => {
		if(error) {
			res.status(500).send({
				error: error
			})

			return
		}

		res.send(result)
	})
}

exports.removeFavorite = (req, res) => {
	var favData = req.body

	Favorite.remove({
		creator: favData.creator,
		business: favData.business
	}, (error, result) => {
		if(error) {
			res.status(500).send({
				error: error
			})

			return
		}

		res.send()
	})
}