	var notes = [{text:'Go to the bank' , date:'17.2.18' , time: '14:30' ,},
			{text:'Meeting' , date:'20.2.18' , time: '17:00'},
			{text:'To Do List - Project' , date:'16.2.18' , time: '17:00'},];


localStorage.setItem('notes', JSON.stringify(notes));

var retrievedNotes = JSON.parse(localStorage.getItem('notes'));


for (var i = 0; i < notes.length; i++) {
	
	createNote(event);

	soundEffect();

	noteContent(event);

	putContent(event);

	closeBtn(event);

	x.addEventListener('click', function deleteNote() {
		var index = Array.from(document.querySelectorAll('button')).indexOf(event.target);
		notes.splice(index, 1);
		var removeThis = document.querySelector('#notes_wrapper > div');
  		event.target.parentElement.remove(removeThis);
  		soundEffect();
  		console.log(notes);
		return;
	});
};

function createNote(event) {
	wrapper = document.createElement('div');
	notes_wrapper.append(wrapper);
	note = document.createElement('div');
	wrapper.append(note);
};

function noteContent(event) {
	textNote = document.createElement('p');
	wrapper.append(textNote);

	dateNote = document.createElement('span');
	wrapper.append(dateNote);

	timeNote = document.createElement('span');
	wrapper.append(timeNote);
};

function putContent(event) {
	textNote.textContent = 'To Do: ' + notes[i].text;
	dateNote.textContent = 'Deadline: ' + notes[i].date;
	timeNote.textContent = 'Time: ' + notes[i].time;
};

function closeBtn(event) {
	x = document.createElement('button');
	x.textContent = '✖';
	wrapper.append(x);
};

function deleteNote() {
	var index = Array.from(document.querySelectorAll('button')).indexOf(event.target);
	notes.splice(index, 1);
	var removeThis = document.querySelector('#notes_wrapper > div');
 	event.target.parentElement.remove(removeThis);
  	console.log(notes);
	return;
};

document.querySelector('form').addEventListener('submit', function createNewNote(event) {

	event.preventDefault();

	validate();
});

function soundEffect(event) {
	mysound = new Audio("sound/paper.mp3");
	mysound.play();
}

function validate(event) {

	var text = document.querySelector('#input-text').value;
	var date = document.querySelector('#date').value;
	var time = document.querySelector('#time').value;

	var valText = "";
	var now = new Date();
	var month = now.getMonth() +1;
	var today = now.getFullYear() + "-" + month + "-" + now.getDate();
	var hourNow = now.getHours() + ':' + now.getMinutes();

	if (month < 10) {
		month = '0' + month;
		today = now.getFullYear() + "-" + month + "-" + now.getDate();
	}

	if (valText == text) {
		document.querySelector("#error").innerHTML ="please enter a note";
	} else if (date == "") {
		document.getElementById("error").innerHTML ="date must be filled";	 
	} else if (date < today) {	
		document.getElementById("error").innerHTML ="please enter a valid date"; 
	} else if (time == "") {
		document.getElementById("error").innerHTML ="time must be filled";
	} else if (time < hourNow && date == today) {
		document.getElementById("error").innerHTML ="please enter a vaild time";	
	} else {
		document.getElementById("error").innerHTML ="";
		createNote(event);
		closeBtn();	
		noteContent();
		addContent();
		soundEffect();
		document.querySelector('form').reset();
	};
};

function addContent (event) {

	var text = document.querySelector('#input-text').value;
	var date = document.querySelector('#date').value;
	var time = document.querySelector('#time').value;
	
	textNote.textContent = 'To Do: ' + text;
	dateNote.textContent = 'Deadline: ' + date;
	timeNote.textContent = 'Time: ' + time;

	notes.push({text, date, time});

	// updating localStorage
	localStorage.setItem('notes', JSON.stringify(notes));

	x.addEventListener('click', function deleteNote(event) {
		var index = Array.from(document.querySelectorAll('button')).indexOf(event.target);
		notes.splice(index, 1);
		var removeThis = document.querySelector('#notes_wrapper > div');
  		event.target.parentElement.remove(removeThis);
  		// updating localStorage
		localStorage.setItem('notes', JSON.stringify(notes));
  		soundEffect();
  		console.log(notes);
		return;
	});	
};
