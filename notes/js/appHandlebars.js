var notesArray = [
	{
		NoteContents: 'hello first note'
	},
	{
		NoteContents: 'hello second note'
	},
	{
		NoteContents: 'hello third note'
	}
]

$('#noteInput').focus();

// Function that adds a new items to the list
var addNewItem = function() {
	if ($('#noteInput').val() === '') {
		alert('You need to add text first');
	} else {
		var newNote = $('#noteInput').val();
		notesArray.push({ NoteContents: newNote, Status: 'active' });
	}
};

// Complile Handlebar template with notesArray
notesArray.build = function(x) {
  var source = $("#taskListTemplate").html();
  // Handlebars compiles the template into a callable function
  var template = Handlebars.compile(source);
  
  // call the compiled function with the template data
  var compiledTemplate = template(notesArray[x]);
  return compiledTemplate;
};

//Add notes list
var renderNotesList = function() {
	// for (var x in notesArray) {
	// 	$("div#notesList").append(notesArray.build(x));
	// };
	
	for(var i = 0; i < notesArray.length; i++) {
	    $("div#notesList").append(notesArray.build(i));
	};
};

renderNotesList();

// Add Note button
$('#addNoteButton').on('click', function() {
	addNewItem();
	renderNotesList();
});

// Delete Note button
$('main').on('click', 'div#notesList button.delete, div#disabledNotesList button.delete', function() {
	var luckyNumber = $(this).parent('div').attr('id');
	notesArray.splice(luckyNumber, 1);
});

// Change status button
$('main').on('click', 'div#notesList button.status, div#disabledNotesList button.status', function() {
	var luckyNumber = $(this).parent('div').attr('id');
	if (notesArray[luckyNumber].noteStatus === 'active') {
		notesArray[luckyNumber].noteStatus = 'disabled';
	} else {
		notesArray[luckyNumber].noteStatus = 'active';
	}
});

// need to use hoisting to move the status and delete note into their own functions, but need access to luckyNumber