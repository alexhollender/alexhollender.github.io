var notesArray = []

$('#noteInput').focus();

// Function that adds a new items to the list
var addNewItem = function() {
	if ($('#noteInput').val() === '') {
		alert('You need to add text first');
	} else {
		var newNote = $('#noteInput').val();
		notesArray.push({ noteContents: newNote, noteStatus: 'active' });
	}
};

// Function that renders notesArray into the two divs
var renderNotesList2 = function() {
	$('#notesList').html('<p class="title">Active Tasks:</p>');

	for (var x in notesArray) {
		if (notesArray[x].noteStatus === 'active') {
			$('#notesList').append(
				'<div id="' + x + '" class="noteItem active">' + notesArray[x].noteContents + '<button class="delete">Delete</button>' + '<button class="status">Copmplete</button>'
			)
		} else {
			console.log('hello');
		}
	}

	$('#disabledNotesList').html('<p class="title">Completed Tasks:</p>');

	for (var x in notesArray) {
		if (notesArray[x].noteStatus === 'disabled') {
			$('#disabledNotesList').append(
				'<div id="' + x + '" class="noteItem disabled">' + notesArray[x].noteContents + '<button class="delete">Delete</button>' + '<button class="status">Copmplete</button>'
			)
		} else {
			console.log('hello');
		}
	}
};

// Add Note button
$('#addNoteButton').on('click', function() {
	addNewItem();
	renderNotesList2();
});

// Delete Note button
$('main').on('click', 'div#notesList button.delete, div#disabledNotesList button.delete', function() {
	var luckyNumber = $(this).parent('div').attr('id');
	notesArray.splice(luckyNumber, 1);
	renderNotesList2();
});

// Change status button
$('main').on('click', 'div#notesList button.status, div#disabledNotesList button.status', function() {
	var luckyNumber = $(this).parent('div').attr('id');
	if (notesArray[luckyNumber].noteStatus === 'active') {
		notesArray[luckyNumber].noteStatus = 'disabled';
	} else {
		notesArray[luckyNumber].noteStatus = 'active';
	}
	renderNotesList2();
});

// need to use hoisting to move the status and delete note into their own functions, but need access to luckyNumber