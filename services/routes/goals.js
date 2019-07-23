const DAL = require("../DAL");

function create(request, h) {
    console.log(':: creating goal..')
    
    const listCreated = DAL.create("goals", DAL.firebase, request.payload);
    return {
        success: true,
        list: listCreated.payload,
        listId: listCreated.uuid
    };
}

function update(request, h) {
    console.log(':: update')
    return {
        "success": true,
        "goal": STORE
    }
}
function remove(request, h) {
    console.log(':: remove')
    return {
        "success": true,
        "goal": {
            "name": "coucou"
        }
    }
}

module.exports = {
    create,
    update,
    remove
}