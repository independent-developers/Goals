const Boom = require('boom')
const crypto = require('crypto')

const DAL = require('../DAL')

async function fetch(request, h) {
	const { userId } = request.params
	console.log(':: fetching goals ..')
	if (!userId) return Boom.badRequest('Missing userId')
	const res = await DAL.fetch(DAL.firebase, userId)
	return h.response(res).code(200)
}

function create(request, h) {
	console.log(':: creating goal..')
	if (!request.params.userId) {
		return h
			.response({ message: 'Missing userId' })
			.code(400)
	}
	const goalId = request.params.goalId || crypto.randomBytes(20).toString('hex')
	const goalCreated = DAL.create.goal(
		DAL.firebase,
		request.payload,
		request.params.userId,
		goalId)
	return h
		.response({
			success: true,
			goalId: goalCreated.uuid,
		})
		.code(201)
}

function remove(request, h) {
	const { userId, goalId } = request.params
	if (!request.params.userId) {
		return h
			.response({ message: 'Missing userId' })
			.code(400)
	}
	if (userId && goalId) {
		// Remove goal
		console.log(':: Removing goal..')
		DAL.remove.goal(DAL.firebase, userId, goalId)
		return h
			.response({
				success: true,
				goalId,
			})
			.code(200)
	}
	DAL.remove.goals(DAL.firebase, userId)
	return h.response().code(201)
}

async function update(request, h){
	const { userId, goalId } = request.params;
	const { payload } = request;
	const updatedGoal = await DAL.update.goal(
		DAL.firebase,
		userId,
		goalId,
		payload
	)
	return h.response(updatedGoal).code(200)
}

module.exports = {
	create,
	remove,
	fetch,
	update
}
