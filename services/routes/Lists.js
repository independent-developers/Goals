const STORE = {
    name: "",
    amount: "",
    params: []
}

function create(request, h) {
    console.log(':: create', request.payload)
    STORE.name = request.payload.name
    STORE.amount = request.payload.amount
    return {
        "success": true,
        "goal": {
            "name": STORE.name,
            "name": STORE.amount
        }
    }
}
function read(request, h) {
    console.log(':: read')
    return {
        "success": true,
        "goal": STORE
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
    read,
    update,
    remove
}