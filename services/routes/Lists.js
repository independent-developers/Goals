function create(request, h) {
    console.log(':: create')
    return {
        "success": true,
        "list": {
            "name": "coucou"
        }
    }
}
function read(request, h) {
    console.log(':: read')
    return {
        "success": true,
        "list": {
            "name": "coucou"
        }
    }
}
function update(request, h) {
    console.log(':: update')
    return {
        "success": true,
        "list": {
            "name": "coucou"
        }
    }
}
function remove(request, h) {
    console.log(':: remove')
    return {
        "success": true,
        "list": {
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