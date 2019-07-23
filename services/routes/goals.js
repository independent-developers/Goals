const Boom = require('boom');

const DAL = require("../DAL");

function create(request, h) {
    console.log(':: creating goal..')
    if(!request.params.userId) {
        return h.response({
            message: "Missing userId"
        }).code(400)
    }
    const goalCreated = DAL.create.goal(DAL.firebase, request.payload, request.params.userId);
    return h.response({
        success: true,
        goalId: goalCreated.uuid
    }).code(201)
}

module.exports = {
    create
}