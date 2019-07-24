const crypto = require('crypto')

function goal(firebase, payload, userId) {
	const goalId = crypto.randomBytes(20).toString('hex')

	firebase
		.database()
		.ref(`app/${userId}/${goalId}`)
		.set(payload, error => {
			if (!error) {
				console.log(':: Goal created !', goalId)
			}
			console.log(':: Error while creating goal', error)
		})
	return {
		goalId,
		userId,
	}
}

function user(firebase, payload, userId) {
	const uuid = userId || crypto.randomBytes(20).toString('hex')
	firebase
		.database()
		.ref(`app/${uuid}`)
		.set(payload, error => {
			if (error) {
				console.log('An error occurred while creating data', error)
			}
			console.log(`:: User created !`)
		})
	return {
		uuid,
		payload,
	}
}

module.exports = {
	goal,
	user,
}
