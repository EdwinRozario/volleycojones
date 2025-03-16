$(document).ready(function(){
	populateSchedule();
	populateNextGame();
	populateScores();
});

const schedule = new Map([
	[20250213, { time: '13 Feb, 6:00 pm', team: 'Kilbernie Kreamers', court: 1, duty: '6:50 pm' }],
	[20250220, { time: '20 Feb, 6:00 pm', team: 'Spike the Stegosaurus', court: 1, duty: 'NA' }],
	[20250227, { time: '27 Feb, 6:50 pm', team: 'Kilbirnie Kreamers', court: 1, duty: 'NA' }],
	[20250306, { time: '06 Mar, 6:50 pm', team: 'Dirty Dogs', court: 2, duty: 'NA' }],
	[20250313, { time: '13 Mar, 8:30 pm', team: 'Twenty Twenty', court: 3, duty: 'NA' }],
	[20250320, { time: '20 Mar, 6:00 pm', team: 'Kiss my Ace', court: 2, duty: 'NA' }]
]);

const scores = [
	{ team: 'Volley Cojones',        score: 11,   wins: 2, draws: 0, losses: 2 },
	{ team: 'Dirty Dogs',            score: 8.5,  wins: 1, draws: 1, losses: 2 },
	{ team: 'Kilbirnie Kreamers',    score: 14.5, wins: 3, draws: 0, losses: 1 },
	{ team: 'Kiss my Ace',           score: 13,   wins: 3, draws: 0, losses: 1 },
	{ team: 'Twenty Twenty',         score: 8,    wins: 1, draws: 1, losses: 2 },
	{ team: 'Spike the Stegosaurus', score: 8,    wins: 2, draws: 0, losses: 2 }
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
