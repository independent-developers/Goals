const Boom = require('boom');

const DAL = require('../DAL')

function create(request, h) {
    console.log(':: creating user..')
    
    const userCreated = DAL.create("users", DAL.firebase, request.payload);
    
    return h.response({
      success: true,
      user: userCreated.payload,
      userId: userCreated.uuid
  }).code(201);
}


function update(request, h) {
    const { userId } = request.params;
    console.log(':: updating user..')
    
    if(!userId) return Boom.badRequest('Missing userId');
    DAL.update("users", DAL.firebase, request.payload, userId);

    return h.response({
      success: true,
      user: request.payload
    }).code(200)
}

function remove(request, h) {
  const resource = request.url.pathname.split('/')[1];
  console.log(`:: remove all ${resource}..`)
  
  DAL.removeUser(resource, DAL.firebase, request.payload);

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