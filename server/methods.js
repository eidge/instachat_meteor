Meteor.methods({

joinRoom: function (room_name) {
	if(buffer = buffers.findOne({RoomName: room_name})){

	}
	else{
		buffers.insert({RoomName: "teste", UserId: 0, Buffer: "", TimeStamp: 0});
	}
} 

});