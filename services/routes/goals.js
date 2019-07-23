const Boom = require('boom');

const DAL = require("../DAL");

function create(request, h) {
    console.log(':: creating goal..')
    
    const goalCreated = DAL.create("goals", DAL.firebase, request.payload);
    return h.response({
        success: true,
        goalId: goalCreated.uuid
    }).code(201)
}

function update(request, h) {
    const { goalId } = request.params;
    console.log(':: updating goal..')
    if(!goalId) return Boom.badRequest('Missing userId');
    DAL.update("goals", DAL.firebase, request.payload, goalId);
    return {
      success: true,
      user: request.payload
    };
}

function remove(request, h) {
    const resource = request.url.pathname.split('/')[1];
    console.log(`:: remove all ${resource}..`)
    DAL.remove(resource, DAL.firebase, request.payload);
    return h.response({
        success: true,
        message: `All ${resource} have been removed.`
    }).code(200)
}

module.exports = {
    create,
    update,
    remove
}