function uiShowMsg(msg){
	console.log(msg);
}

function uiShowError(error){
	if(error)
		uiShowMsg(error.reason);
}