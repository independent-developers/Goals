const goals = require('./goals')
const users = require('./users')
const key = 'api'

// Routes for goals
const routes = [
	{
		method: 'GET',
		path: '/',
		handler: goals.fetch,
	},
	{
		method: 'GET',
		path: `/${key}/users/{userId}/goals`,
		handler: goals.fetch,
	},
	{
		method: 'POST',
		path: `/${key}/users/{userId?}`,
		handler: users.create,
	},
	{
		method: 'DELETE',
		path: `/${key}/users/{userId?}`,
		handler: users.remove,
	},
	{
		method: 'POST',
		path: `/${key}/users/{userId}/goals/{goalId?}`,
		handler: goals.create,
	},
	{
		method: 'DELETE',
		path: `/${key}/users/{userId}/goals/{goalId?}`,
		handler: goals.remove,
	},
]

module.exports = routes
