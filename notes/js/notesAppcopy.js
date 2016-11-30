// Array of notes
var notesArray = [];

// The <div> element that is the parent of notesBody
var notesList = document.getElementById("notesList");

// creating a selector for the HTML <input> field
var noteInput = document.getElementById('noteInput');

// Add note button
var addNoteButton = document.getElementById('addNoteButton');

var addNote = function() {
	var newNote = noteInput.value;
	notesArray.push(newNote);
};

var displayNotes = function() {
	var notesBody = document.createElement("div");
	notesBody.id = 'notesBody';
	notesList.appendChild(notesBody);
	for (var i = 0; i < notesArray.length; i++) {
		var note = document.createTextNode(notesArray[i]);
		var newP = document.createElement('p');
		newP.id = i;
		newP.className = 'note';
		var deleteNoteButton = document.createElement('button');
		deleteNoteButton.innerHTML = 'Delete Note';
		newP.appendChild(note);
		newP.appendChild(deleteNoteButton);
		notesBody.insertBefore(newP, notesBody.firstChild);
	}
};

var clearNotesDiv = function() {
	notesList.removeChild(notesBody);
};

var removableNotes = function() {
	$('p.note').on('click', function() {
		var itemNumber = this.id;
		notesArray.splice(itemNumber, 1);
		clearNotesDiv();
		displayNotes();
		removableNotes();
	});
};

displayNotes();

addNoteButton.onclick = function() {
	clearNotesDiv();
	addNote();
	displayNotes();
	removableNotes();
};

/*
var whoTheFuckKnows = function() {
	var myItem = document.getElementById("3");
	myItem.onclick = function() {
  		console.log(this.id);
	};
}
*/

// figure out how to do the deleting thing with JS
// think about using an object where the key is the classname
// Firebase? hosted database
// Local Storage, kinda hacky but will work, browser has local storage