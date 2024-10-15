$(document).ready(function(){
	const today = new Date().toISOString().split('T')[0].replaceAll('-', '');
	let nextDay = null;
	const schedule = new Map([
		[20241017, { time: '17 Oct, 6:50 pm', team: 'Team Lang', court: 2, duty: 'NA' }],
		[20241024, { time: '24 Oct, 6:00 pm', team: 'Kilbirnie Kreamers', court: 3, duty: 'NA' }],
		[20241031, { time: '31 Oct, 6:50 pm', team: 'Amy & Co', court: 2, duty: '6:00 pm' }],
		[20241107, { time: '07 Nov, 6:00 pm', team: 'Spike the Stegosaurus', court: 3, duty: 'NA' }],
		[20241114, { time: '14 Nov, 7:40 pm', team: 'Twenty Twenty', court: 3, duty: 'NA' }],
		[20241121, { time: '21 Nov, 6:50 pm', team: 'Team Lang', court: 2, duty: '6:00 pm' }],
		[20241128, { time: '28 Nov, 6:00 pm', team: 'Kilbirnie Kreamers', court: 3, duty: 'NA' }],
		[20241205, { time: '05 Dec, 6:50 pm', team: 'Amy & Co', court: 2, duty: 'NA' }],
		[20241212, { time: '12 Dec, 6:00 pm', team: 'Spike the Stegosaurus', court: 3, duty: 'NA' }]
	]);

	schedule.keys().forEach(key => {
		if (today < key && nextDay == null) { nextDay = key; }
	});

	if (nextDay != null) {
		let nextGame = schedule.get(nextDay);

		document.getElementById('time').innerHTML = nextGame.time;
		document.getElementById('team').innerHTML = nextGame.team;
		document.getElementById('court').innerHTML = nextGame.court;
		document.getElementById('duty').innerHTML = nextGame.duty;
	}
});