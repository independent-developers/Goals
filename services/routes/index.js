const goals = require('./goals')
const users  = require('./users')

// Routes for goals
const Goals = [
  {
    method: "POST",
    path: "/goals",
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
    method: "PUT",
    path: "/users/{userId?}",
    handler: users.update
  },
  {
    method: "DELETE",
    path: "/users",
    handler: users.remove
  }
];

const routes = Goals.concat(Users);

module.exports = routes;