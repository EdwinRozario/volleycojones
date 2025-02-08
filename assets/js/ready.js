$(document).ready(function(){
	populateSchedule();

	populateNextGame();
});

const schedule = new Map([
	[20250113, { time: '13 Jan, 6:00 pm', team: 'Kilbernie Kreamers', court: 1, duty: '6:50 pm' }]
]);


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
