$(document).ready(function(){
	populateSchedule();
	populateNextGame();
	populateScores();
});

const schedule = new Map([
	[20250612, { time: '12 June, 6:50 pm', team: 'Amy & Co', court: 2, duty: '7:40 pm' }],
	[20250619, { time: '19 June, 6:50 pm', team: 'Kiss my Ace', court: 3, duty: 'NA' }],
	[20250626, { time: '26 June, 6:00 pm', team: 'Team Lang', court: 2, duty: 'NA' }],
	[20250701, { time: '03 June, 7:40 pm', team: 'Twenty Twenty', court: 1, duty: 'NA' }]
]);

const scores = [
	{ team: 'Volley Cojones',        score: 5.5, wins: 1, draws: 0, losses: 4 },
	{ team: 'Team Lang',             score: 18,  wins: 4, draws: 0, losses: 1 },
	{ team: 'Amy & Co',              score: 16,  wins: 4, draws: 0, losses: 1 },
	{ team: 'Kiss my Ace',           score: 3.5, wins: 0, draws: 0, losses: 5 },
	{ team: 'Twenty Twenty',         score: 11.5,wins: 3, draws: 0, losses: 2 },
	{ team: 'Spike the Stegosaurus', score: 14,  wins: 3, draws: 0, losses: 2 }
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
