const Event = require("../models/Event")

exports.getEvents = (req, res) => {

	var page = req.query.page || 1
	var limit = req.query.limit || 20
	var creator = req.query.creator

	Event.find({
		creator: creator
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

exports.createEvent = (req, res) => {
	var eventData = req.body

	var eventSave = Event(eventData)
	eventSave.save((error, result) => {
		if(error) {
			res.status(500).send({
				error: error
			})

			return
		}

		res.send(result)
	})
}

exports.updateEvent = (req, res) => {
	var eventData = req.body

	var eventSave = Event(eventData)
	eventSave.update({
		_id: eventData._id
	}, {
		$set: {
		eventData
		}
	}, (err, result) => {
		if(err) {
			res.status(500).send({
				error: error
			})
			return
		}

		res.send()
	})
}