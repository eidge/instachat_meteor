function parseCommand(chat_string){
	//0 - none
	//1 - login
	//2 - logout
	//3 - register
	var command = Session.get("command")
	
	switch(command){
		case 0:{
				if(chat_string.indexOf("/login") == 0){
					var username = chat_string.substring(6);
					//Remember we tried to login, so that we can ask user to enter password
					
					Session.set("command", 1);
				}

				if(chat_string.indexOf("/logout") == 0){
					Meteor.logout(uiShowError);
					Session.set("command", 0);
				}

				if(chat_string.indexOf("/register") == 0){ //set error if logged in
					if(Meteor.userId()){
						uiShowMsg("Error: Can't register while logged in.");
						return;
					}

					var command_options = chat_string.split(" ");

					Accounts.createUser({username: command_options[1], password: command_options[2]}, uiShowError);
				}

				if(chat_string.indexOf("/join") == 0){
					var roomname = chat_string.split(" ");
					Session.set("current_room", roomname[1]);
				}
			}
			break;

		case 1:
			break;

		case 2:
			break;

		case 3:
			break;

	}



}