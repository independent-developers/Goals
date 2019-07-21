const lists = require('./lists')
const users  = require('./users')

const { colorCycleHandler, colorQueryHandler } = require('./color')

// Routes for lists
const Lists = [
  {
    method: "POST",
    path: "/goals",
    handler: lists.create
  },
  {
    method: "GET",
    path: "/goals",
    handler: lists.read
  },
  {
    method: "PUT",
    path: "/goals",
    handler: lists.update
  },
  {
    method: "DELETE",
    path: "/goals",
    handler: lists.remove
  }
];

// Routes for lists
const Users = [
  {
    method: "POST",
    path: "/users",
    handler: users.create
  },
  {
    method: "GET",
    path: "/users",
    handler: users.read
  },
  {
    method: "PUT",
    path: "/users",
    handler: users.update
  },
  {
    method: "DELETE",
    path: "/users",
    handler: users.remove
  }
];

const routes = Lists.concat(Users);

module.exports = routes;