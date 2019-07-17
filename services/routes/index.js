const { create, read, update, remove } = require('./Lists')
const { colorCycleHandler, colorQueryHandler } = require('./color')

// Routes for lists
const Lists = [{
    method: 'POST',
    path: '/goals',
    handler: create
}, {
    method: 'GET',
    path: '/goals',
    handler: read
}, {
    method: 'PUT',
    path: '/goals',
    handler: update
}, {
    method: 'DELETE',
    path: '/goals',
    handler: remove
}]

const Colors = [{
    method: 'POST',
    path: '/color/cycle',
    handler: colorCycleHandler
}, {
    method: 'GET',
    path: '/color/query',
    handler: colorQueryHandler
}]

const routes = Lists.concat(Colors)
console.log(routes)

module.exports = routes;