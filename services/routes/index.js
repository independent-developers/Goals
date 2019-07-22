const lists = require('./lists')
const users  = require('./users')

// Routes for lists
const Lists = [
  {
    method: "POST",
    path: "/goals",
    handler: lists.create
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
    method: "PUT",
    path: "/users/{userId?}",
    config: {
      handler: users.update
    }
  },
  {
    method: "DELETE",
    path: "/users",
    handler: users.remove
  }
];

const routes = Lists.concat(Users);

module.exports = routes;