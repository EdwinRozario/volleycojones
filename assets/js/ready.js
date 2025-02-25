$(document).ready(function(){
	populateSchedule();

	populateNextGame();
});

const schedule = new Map([
	[20250213, { time: '13 Feb, 6:00 pm', team: 'Kilbernie Kreamers', court: 1, duty: '6:50 pm' }],
	[20250220, { time: '20 Feb, 6:00 pm', team: 'Spike the Stegosaurus', court: 1, duty: 'NA' }],
	[20250227, { time: '27 Feb, 6:50 pm', team: 'Kilbirnie Kreamers', court: 1, duty: 'NA' }],
	[20250306, { time: '06 Mar, 6:00 pm', team: 'Spatial Needs', court: 2, duty: 'NA' }],
	[20250313, { time: '13 Mar, 8:30 pm', team: 'Twenty Twenty', court: 3, duty: 'NA' }],
	[20250320, { time: '20 Mar, 6:00 pm', team: 'Kiss my Ace', court: 2, duty: 'NA' }]
]);

const scrores = [
	[{ team: 'Kilbirnie Kreamers',    score: 5,   wins: 1, draws: 0, losses: 0 }],
	[{ team: 'Volley Cojones',        score: 4,   wins: 1, draws: 0, losses: 0 }],
	[{ team: 'Kiss my Ace',           score: 3.5, wins: 1, draws: 0, losses: 0 }],
	[{ team: 'Twenty Twenty',         score: 1,   wins: 0, draws: 0, losses: 1 }],
	[{ team: 'Spike the Stegosaurus', score: 1,   wins: 0, draws: 0, losses: 1 }],
	[{ team: 'Spatial Needs',         score: 0,   wins: 0, draws: 0, losses: 1 }]
];

function populateSchedule(){
	const table = document.getElementById('schedule');

	schedule.keys().forEach(key => {
		var game = schedule.get(key);
		var row = table.insertRow(-1);
		row.setAttribute('id', key)
		var time = row.insertCell(0);
		var team = row.insertCell(1);

		time.innerHTML = game.time;
		team.innerHTML = game.team;
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
