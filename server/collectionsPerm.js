////////////////////////////////////////////////////////////////
//  Deny

conversations.allow({
	insert: function(userId, doc){
		return true;
	}
});

conversations.deny({
	insert: function(userId, doc){
		doc.TimeStamp = Math.round(new Date().getTime() / 1000);
		return false;
	}
});

buffers.allow({
	insert: function(userId, doc){
		return true;
	},

	update: function(userId, doc){
		return true;
	}
});

buffers.deny({
	insert: function(userId, doc){
		doc.TimeStamp = Math.round(new Date().getTime() / 1000);
		return false;
	},

	update: function(userId, doc){
		doc.TimeStamp = Math.round(new Date().getTime() / 1000);
		return false;
	}
});