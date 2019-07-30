const http = require('http')
const io = require('socket.io')(http);

// starCountRef.on('value', function(snapshot) {
// 	updateStarCount(postElement, snapshot.val());
// });

io.on('connection', function(socket){
    console.log('a user connected');
});

function live(){
    return 'ok'
}

module.exports = live;