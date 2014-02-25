if (Meteor.isClient){
  Session.set("command", 0)

  if(!Meteor.userId())
    Session.set("current_room", "none");

	Template.chat_room.conversation_lines = function(){
    	return conversations.find({RoomName: Session.get("current_room")}, {sort: {TimeStamp: 1}});
  	};

  Template.chat_room.rendered = function(){
    window.scrollTo(0, document.body.scrollHeight);
  }

  Template.input.buffer = function(){
      //Get every buffer in the room which has been active for the last 5 seconds.
      return buffers.find({RoomName: Session.get("current_room"), UserId: {$ne: Meteor.userId()}, TimeStamp: {$gt: Math.round(new Date().getTime() / 1000) - 60} }, {sort: {TimeStamp: 1}});
  };

  Template.input.rendered = function(){
    window.scrollTo(0, document.body.scrollHeight);
  };


  Template.main_input.current_user = function() {
    if(Meteor.userId())
      return Meteor.user().username;
    else
      return "guest";
  };

  Template.main_input.room = function() {
    return Session.get("current_room");
  };


	Template.main_input.events = {
		"keypress" : function(event) {

      var input_text = $("#chat_input").text();
      var cbuffer = buffers.findOne({UserId: Meteor.userId()}, {sort: {TimeStamp: -1}});

      //ENTER
			if(event.type === "keypress" && event.which === 13 && input_text != ""){
        //Check if commands are run (logout, change room etc) and parse them:
        if(input_text[0] == "/" || Session.get("command") != 0 ){
          parseCommand(input_text);
          $("#chat_input").text("");
          return false;
        }
        
        buffers.update({_id: cbuffer._id}, {$set: {Buffer: ""}});
				conversations.insert({RoomName: Session.get("current_room"), User: Meteor.user().username, Line: input_text});
				$("#chat_input").text("");

        return false;
			}

      //Update the buffer on each keypress
			if(event.type === "keypress" && event.which !== 13 && Session.get("command") == 0){
        //Check if a command is being typed
        if(input_text[0] == "/")
          return true;

        if(cbuffer)
          buffers.update({_id: cbuffer._id}, {$set: {RoomName: Session.get("current_room"), UserId: Meteor.userId(), Buffer: input_text + String.fromCharCode(event.which)}});
        else
          buffers.insert({RoomName: Session.get("current_room"), UserId: Meteor.userId(), Buffer: ""});

        return true;
			}

      //If event isn't caught propagate:
      return true;
		}
	}
}