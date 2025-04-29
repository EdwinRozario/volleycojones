$(document).ready(function(){
	populateSchedule();
	populateNextGame();
	populateScores();
});

const schedule = new Map([
	[20250501, { time: '1 May, 6:00 pm', team: 'Spike the Stegasaurus', court: 2, duty: 'NA' }],
	[20250508, { time: '8 May, 6:50 pm', team: 'Amy & Co ', court: 2, duty: 'NA' }],
	[20250515, { time: '15 May, 6:50 pm', team: 'Kiss my Ace', court: 3, duty: 'NA' }],
	[20250522, { time: '22 May, 6:00 pm', team: 'Team Lang', court: 2, duty: 'NA' }],
	[20250529, { time: '29 May, 7:40 pm', team: 'Twenty Twenty', court: 1, duty: 'NA' }]
]);

const scores = [
	{ team: 'Volley Cojones',        score: 31.5, wins: 6, draws: 0, losses: 4 },
	{ team: 'Dirty Dogs',            score: 14,   wins: 1, draws: 2, losses: 7 },
	{ team: 'Kilbirnie Kreamers',    score: 38.5, wins: 8, draws: 1, losses: 1 },
	{ team: 'Kiss my Ace',           score: 22,   wins: 5, draws: 0, losses: 5 },
	{ team: 'Twenty Twenty',         score: 18.5, wins: 2, draws: 3, losses: 5 },
	{ team: 'Spike the Stegosaurus', score: 29,   wins: 6, draws: 0, losses: 4 }
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
