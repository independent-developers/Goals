const DAL = require("../DAL");

function create(request, h) {
    console.log(':: create', request.payload)
    return {
        "success": true,
        "goal": {
            "name": STORE.name,
            "name": STORE.amount
        }
    }
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