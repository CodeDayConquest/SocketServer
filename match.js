module.exports = {
	get: (matchId, call) => {
		redis.hget('matches', matchId, (err, match) => {
			if(err) return console.log(err);
			call(JSON.parse(match));
		})
	},

	add: (matchId, s1, s2) => {
		redis.hset('matches', matchId, {p1: s1, p2: s2});
	},

	start: (s1, s2) => {
		var num = Math.random() * 2000 / 100;
		matchUtil.add(s1, s2);

		var p1 = {
			x: 0,
			y: 0,
			direction: 'right'
		}

		var p2 = {
			x: 0,
			y: 0,
			direction: 'left'
		}

		s1.emit('game_start', p1);
		s2.emit('game_start', p2)
	},

	remove: (matchId) => {
		redis.hdel('matches', matchId, (err) => {
			if(err) 
				return console.log(err);
		})
	}
}