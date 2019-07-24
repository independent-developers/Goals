const goals = require('./goals')
const users  = require('./users')

// Routes for goals
const routes = [
  {
    method: "GET",
    path: "/users/{userId}",
    handler: users.fetch
  },
  {
    method: "POST",
    path: "/users/{userId?}",
    handler: users.create
  },
  {
    method: "POST",
    path: "/users/{userId}/goals",
    handler: goals.create
  },
  {
    method: "DELETE",
    path: "/users",
    handler: users.remove
  },
  {
    method: "DELETE",
    path: "/users/{userId}",
    handler: users.remove
  }
];

module.exports = routes;