
//////////////////////////////////
//								//
//Handlebars Helper Functions:  //
//								//
//////////////////////////////////

//Return username from the provided user ID
Handlebars.registerHelper('getUserById',function(input){
	var user = Meteor.users.findOne({_id: input});
	if(user)
		return user.username;
	else
		return "guest";
});