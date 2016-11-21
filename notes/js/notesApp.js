// Array of notes
var notesArray = [];

// creating a selector for the HTML <input> field
var noteInput = document.getElementById('noteInput');

// The <div> element that contains the list of notes
var notesList = document.getElementById('notesBody');

// Add note button
var addNoteButton = document.getElementById('addNoteButton');


// Incrementer
var plus = 0;

var addNote = function() {
	// store the current value of the <input> in var x, and push it to notesArray
	var x = noteInput.value;
	notesArray.push(x);
	
	// store the latest note in var newNote
	var newNote = notesArray[notesArray.length - 1];

	// make a new paragraph as a child of the notesBody <div> with a classname of "noteItem-(plus)"
	var makeParagraph = function() {
		var makeP = document.createElement("p");
		notesList.appendChild(makeP);

		var makePID = "noteItem-" + plus;
		makeP.id = makePID;
		plus++;

		// for the exciting part...insert the newNote into the newly created <p>
		var insertNote = function() {
			var newP = document.getElementById(makePID);
			newP.innerHTML = newNote;
		};
		insertNote();
	};
	makeParagraph();
	
	// a more simple way where you just stick the text directly into a new HTML element
	// var newContent = document.createTextNode(x);
	// makeP.appendChild(newContent);

	console.log(newNote);

};