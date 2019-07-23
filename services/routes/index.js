const goals = require('./goals')
const users  = require('./users')

// Routes for goals
const Goals = [
  {
    method: "POST",
    path: "/goals/{userId}",
    handler: goals.create
  },
  {
    method: "PUT",
    path: "/goals/{goalId?}",
    handler: goals.update
  },
  {
    method: "DELETE",
    path: "/goals",
    handler: goals.remove
  }
];

// Routes for goals
const Users = [
  {
    method: "POST",
    path: "/users",
    handler: users.create
  },
  {
    method: "POST",
    path: "/users/{userId}/goals",
    handler: goals.create
  },
  {
    method: "PUT",
    path: "/users/{userId}",
    handler: users.update
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
  },
  {
    method: "DELETE",
    path: "/users/{userId}/goals",
    handler: goals.remove
  }
];

const routes = Goals.concat(Users);

module.exports = routes;