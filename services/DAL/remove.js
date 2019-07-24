function all(firebase) {
	console.log(`:: Removing all users..`)
	return firebase
		.database()
		.ref(`app/`)
		.remove()
}

function user(firebase, userId) {
	console.log(`:: Removing user ${userId}..`)
	return firebase
		.database()
		.ref(`app/${userId}`)
		.remove()
}

function goal(firebase, userId, goalId) {
	console.log(`:: Removing goal ${goalId} for user ${userId}..`)
	return firebase
		.database()
		.ref(`app/${userId}/${goalId}`)
		.remove()
}

function goals(firebase, userId) {
	console.log(`:: Removing goals for user ${userId}..`)
	return firebase
		.database()
		.ref(`app/${userId}`)
		.remove()
}

module.exports = {
	all,
	user,
	goal,
	goals,
}
