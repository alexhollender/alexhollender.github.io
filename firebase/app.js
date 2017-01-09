// Initialize Firebase
var config = {
apiKey: "AIzaSyDFp1WQbk_Mys0wgOmKHHy21xkZtsrFPaQ",
authDomain: "ah1989-test.firebaseapp.com",
databaseURL: "https://ah1989-test.firebaseio.com",
storageBucket: "ah1989-test.appspot.com",
messagingSenderId: "677438152600"
};
firebase.initializeApp(config);

// creating a reference to our database
var defaultDatabase = firebase.database();

// creating/referencing a section in our database called messages
var messagesDataObject = defaultDatabase.ref('messages');
    
$(document).ready(function() {

	// on form submit push a new item to the database
	$('#message-form').submit(function(event) {
		event.preventDefault();
		var message = $('#message').val();
		$('#message').val('');
		// this is the firebase part
		var newItem = messagesDataObject.push({
			message : message,
			votes : 0,
		});
	});

	messageClass.getPosts();

});

var messageClass = (function() {
	// read the database items (will trigger anytime an item is added or removed)
	function getPosts() {
		messagesDataObject.on('value', function(result) {
		    
		    // variable for accessing messages in the main object
		    var messageList = result.val();
		  
		    // clear messages		  
		    $('ul.message-board').find('li').remove();
		    // append all messages
		    for(x in messageList) {
		  	  var newMessage = $('<li>');
		  	  newMessage.attr('data-id', x);
		  	  newMessage.html(messageList[x].message + '<i class="fa fa-trash pull-right delete"></i><i class="fa fa-thumbs-down pull-right"></i><i class="fa fa-thumbs-up pull-right"></i><div class="pull-right">' + messageList[x].votes + '</div>');
		  	  $('ul.message-board').append(newMessage);
		    }
			
			// upvoting
			$('ul.message-board').on('click', 'i.fa-thumbs-up', function(){
				var msgId = $(this).parent().data('id');
				var msgVotes = messageList[msgId].votes;
				updateMessage(msgId, ++msgVotes);
			});

			// downvoting
			$('ul.message-board').on('click', 'i.fa-thumbs-down', function(){
				var msgId = $(this).parent().data('id');
				var msgVotes = messageList[msgId].votes;
				updateMessage(msgId, --msgVotes);
			});

			// deleting
			$('ul.message-board').on('click', 'i.delete', function(){
				var msgId = $(this).parent().data('id');
				deleteMessage(msgId);
			});

		});
	};

	function updateMessage(id, votes) {
		var specificMessage = messagesDataObject.child(id);
		specificMessage.update({
			votes : votes
		});
	};

	function deleteMessage(id) {
		var specificMessage = messagesDataObject.child(id);
		specificMessage.remove(); 
	};

	return {
      getPosts: getPosts
    };

})();