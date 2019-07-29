function goal(firebase, payload, userId, goalId) {
	let timestamp = new Date();
	payload.created_at = (timestamp / 1000);
	return firebase
		.database()
		.ref(`app/${userId}/${goalId}`)
		.set(payload)
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
