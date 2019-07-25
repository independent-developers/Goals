const goals = require('./goals')
const users = require('./users')

// Routes for goals
const routes = [
	{
		method: 'GET',
		path: '/users/{userId}/goals',
		handler: goals.fetch,
	},
	{
		method: 'POST',
		path: '/users/{userId?}',
		handler: users.create,
	},
	{
		method: 'DELETE',
		path: '/users/{userId?}',
		handler: users.remove,
	},
	{
		method: 'POST',
		path: '/users/{userId}/goals',
		handler: goals.create,
	},
	{
		method: 'DELETE',
		path: '/users/{userId}/goals/{goalId?}',
		handler: goals.remove,
	},
]

module.exports = routes
