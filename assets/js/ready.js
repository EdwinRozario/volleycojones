$(document).ready(function(){
	populateSchedule();
	populateNextGame();
	populateScores();
});

const schedule = new Map([
	[20250925, { time: '25 Sep, 6:50 pm', team: 'Super', court: 3, duty: '6:00 pm' }],
	[20251030, { time: '30 Oct, 7:40 pm', team: 'Big Dig Energy', court: 3, duty: 'NA' }],
	[20251106, { time: '06 Nov, 7:40 pm', team: 'Boom', court: 2, duty: 'NA' }],
	[20251113, { time: '13 Nov, 6:00 pm', team: 'Team Lang', court: 3, duty: 'NA' }],
	[20251120, { time: '20 Nov, 8:30 pm', team: 'Street Pancakes', court: 2, duty: 'NA' }]
]);

const scores = [
	// { team: 'Volley Cojones',        score: 13.5, wins: 2, draws: 1, losses: 7 },
	// { team: 'Team Lang',             score: 34.5,  wins: 7, draws: 1, losses: 2 },
	// { team: 'Amy & Co',              score: 33,  wins: 8, draws: 0, losses: 2 },
	// { team: 'Kiss my Ace',           score: 7, wins: 1, draws: 0, losses: 9 },
	// { team: 'Twenty Twenty',         score: 20.5, wins: 5, draws: 0, losses: 5 },
	// { team: 'Spike the Stegosaurus', score: 28.5,  wins: 6, draws: 0, losses: 4 }
];

function populateScores() {
	const table = document.getElementById('scores');

	sorted_score = scores.sort((a, b) => b.score - a.score);

	sorted_score.forEach(score => {
		var row = table.insertRow(-1);

		var team = row.insertCell(0);
		team.textContent = score.team;

		var total_score = row.insertCell(1);
		total_score.textContent = score.score;

		var wins = row.insertCell(2);
		wins.textContent = score.wins;

		var draws = row.insertCell(3);
		draws.textContent = score.draws;

		var losses = row.insertCell(4);
		losses.textContent = score.losses;

		if (score.team == 'Volley Cojones') {
			row.classList.add('highlight');
		}
	});
}

function populateSchedule() {
	const table = document.getElementById('schedule');

	schedule.keys().forEach(key => {
		var game = schedule.get(key);
		var row = table.insertRow(-1);
		row.setAttribute('id', key)

		var time = row.insertCell(0);
		time.textContent = game.time;

		var team = row.insertCell(1);
		team.textContent = game.team;
	});
}

function populateNextGame() {
	const today = new Date().toISOString().split('T')[0].replaceAll('-', '');
	let nextDay = null;

	schedule.keys().forEach(key => {
		if (today <= key) {
			if (nextDay == null) {
				nextDay = key;

				var element = document.getElementById(key);
				element.classList.add('highlight');
			}
		}
	});

	if (nextDay != null) {
		let nextGame = schedule.get(nextDay);

		document.getElementById('time').innerHTML = nextGame.time;
		document.getElementById('team').innerHTML = nextGame.team;
		document.getElementById('court').innerHTML = nextGame.court;
		document.getElementById('duty').innerHTML = nextGame.duty;
	}
}
