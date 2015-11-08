// ===============================================
//			  CodeDayLA - Conquest
// ===============================================


// ===============================================
//				   Modules
// ===============================================

var http = require('http').createServer();
var io = require('socket.io')(http);
var events = require('./events');


io.on('connection', function(socket) {
	console.log('New connection: ' + socket.id);

	socket
		.on('join', events.join)
		.on('move', events.move)
		.on('health', events.health)

})

http.listen(3000, function() {
	console.log('Running..')
})