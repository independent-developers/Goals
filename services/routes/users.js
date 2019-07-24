const Boom = require('boom')

const DAL = require('../DAL')

async function fetch(request, h) {
  const { userId } = request.params
  console.log(':: fetching ..')
  if (!userId) return Boom.badRequest('Missing userId')
  const res = await DAL.fetch(DAL.firebase, userId)
  return h.response(res).code(200)
}

function create(request, h) {
  const { userId } = request.params;
  console.log(':: creating user..', userId)
  const userCreated = DAL.create.user(DAL.firebase, request.payload, userId)
  return h
    .response({
      success: true,
      userId: userCreated.uuid
    })
    .code(201)
}

function update(request, h) {
  const { userId } = request.params
  console.log(':: updating user..')
  if (!userId) return Boom.badRequest('Missing userId')
  DAL.update('users', DAL.firebase, request.payload, userId)
  return {
    success: true,
    user: request.payload
  }
}

function remove(request, h) {
  const { userId } = request.params
  if (userId && userId !== undefined) {
    console.log(`:: remove user ${userId}..`)
    DAL.remove.user(DAL.firebase, userId)
    return h
      .response({
        success: true,
        message: `User ${userId} has been removed.`
      })
      .code(200)
  }
  console.log(`:: remove all..`)
  DAL.remove.all(DAL.firebase)
  return h
    .response({
      success: true,
      message: `All users has been removed.`
    })
    .code(200)
}

module.exports = {
  fetch,
  create,
  update,
  remove
}
