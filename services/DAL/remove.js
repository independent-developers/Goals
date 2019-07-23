function remove(resource, firebase, payload) {
    console.log(`:: Removing all ${resource}..`)
    return firebase
        .database()
        .ref(`${resource}/`)
        .remove();
}

module.exports = remove;