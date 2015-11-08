var waiting = [],
	games = {};

module.exports = {
	join: function() {
		var self = this;
		setTimeout(() => {
			if(waiting.length > 0) {
				var o = waiting.shift();
				var m = {
					l: [self.id, o.id].join(''),
					p1: self,
					p2: o
				}

				start(m);
			} else
				waiting.push(self)
		}, 3000)
	},

	move: function(data) {
		var g = games[data.id];

		if(g.p1.id !== this.id)
			g.p1.emit('move', {x: data.playerPosX, y: data.playerPosY})
		else
			g.p2.emit('move', {x: data.playerPosX, y: data.playerPosY})
	},

	health: function(data) {
		var g = games[data.id];

		if(g.p1.id !== this.id)
			g.p1.emit('health', {health: data.playerHealth})
		else
			g.p2.emit('health', {health: data.playerHealth})

	}
}

function start(o) {
	console.log(o.toString());
	games[o.l] = o;
	o.p1.emit('start', {side: 'left', matchId: o.l})
	o.p2.emit('start', {side: 'right', matchId: o.l})
}