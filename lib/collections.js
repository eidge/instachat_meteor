// ConversationModel:
conversations = new Meteor.Collection('conversations');
// RoomName
// User
// Line
// TimeStamp

//BufferModel:
buffers = new Meteor.Collection('buffers');
//	RoomName
//	
//	Id
//	Buffer
//	TimeStamp

//buffers.insert({RoomName: "teste", UserId: 0, Buffer: "", TimeStamp: 0});

//Nas sessions guardo se sou o user 1 ou 2, apenas um buffer por room
//O timestamp serve para ver se o utilizador saiu da sala, (ping de 5 em 5 s, offline depois de 20)