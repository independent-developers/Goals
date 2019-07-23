const Boom = require('boom');
const DAL = require('../DAL')

function create(request, h) {
    console.log(':: creating user..')
    
    const userCreated = DAL.create("users", DAL.firebase, request.payload);
    return {
        success: true,
        user: userCreated.payload,
        userId: userCreated.uuid
    };
}


function update(request, h) {
    const { userId } = request.params;
    console.log(':: updating user..')
    if(!userId) return Boom.badRequest('Missing userId');
    DAL.update("users", DAL.firebase, request.payload, userId);
    return {
      success: true,
      user: request.payload
    };
}

function remove(request, h) {
    console.log(':: deleting user..')
    return {
      success: true,
      user: {
        name: "coucou"
      }
    };
}

module.exports = {
    create,
    update,
    remove
}