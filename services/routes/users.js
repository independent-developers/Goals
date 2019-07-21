const DAL = require('../DAL')

function create(request, h) {
    console.log(':: create user', request.payload)
    
    DAL.generic.create("users", DAL.firebase, request.payload);
    // DAL.users.create(DAL.firebase, request.payload);
    return {
        success: true,
        user: request.payload
    };
}


function update(request, h) {
    console.log(':: create user', request.payload)
    DAL.generic.update("users", DAL.firebase, request.payload);
    return {
      success: true,
      user: request.payload
    };
}

function remove(request, h) {
    console.log(':: create user', request.payload)
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