var http = require('http').createServer();
var io = require('socket.io')(http);
var redis = require('redis').createClient();

redis
	.on('connect', () => console.log('Connected to redis'))
	.on('error', (err) => console.log(err));

// var events = require('./events');

io.on('connection', (socket) => {
	console.log('New connection: ' + socket.id)

	socket
		.on('u_join', null)
		.on('move', null)
		.on('atk', null);
})

http.listen(3000, () => console.log('Running..'))