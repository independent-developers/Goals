const DAL = require("../DAL");

function all(resource, payload) {
    console.log(`:: Removing all ${resource}..`)
    return DAL.firebase
        .database()
        .ref(`${resource}`)
        .remove();
}

function user (payload) {
    console.log(`:: Removing User ${payload}..`)
    return DAL.firebase
        .database()
        .ref(`users/${payload.userId}`)
        .remove();
}

function goals (payload) {
    console.log(`:: Removing User ${payload}..`)
    return DAL.firebase
        .database()
        .ref(`users/${payload.userId}`)
        .remove();
}

module.exports = {
    all,
    user,
    goals
};