const fetch = require('./fetch')
const update = require('./update')

async function goal(firebase, payload, userId, goalId) {
	let timestamp = new Date();

	const existingGoals = await fetch(firebase, userId)

	if(Array.isArray(existingGoals) && existingGoals.length > 0){
		console.log(':: Found goals !')

		for (let index = 0; index < existingGoals.length; index++) {
			const goal = existingGoals[index];
			if(goal.key === goalId){
				console.log(':: Goal already exists, updating..', goalId)
				const updatedGoal = update.goal(firebase, userId, goalId, payload);
				console.log(':: Goal updated !', goalId)
				return updatedGoal;
			}
		}
	}
	console.log(':: No goals found, creating the first goal..')
	payload.createdAt = (timestamp / 1000);
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
