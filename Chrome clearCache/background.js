
//监听页面
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    
    if(request.msg == 'clearCache'){		//如果是清理命令
		var days = request.days||1;
		toclean(days,request.data);			//则调用执行清除方法
    }
	sendResponse({farewell:true});			//返回信息
});

//监听快捷键
chrome.commands.onCommand.addListener(function(command) {
  if (command == "cleanKey") {				//如果快捷键是指定的按钮
    toclean(1,{ "appcache": true,			//则调用执行清除方法
                "cache": true,
                "cookies": false,
                "downloads": false,
                "fileSystems": true,
                "formData": true,
                "history": false,
                "indexedDB": true,
                "localStorage": true,
                "serverBoundCertificates": true,
                "pluginData": true,
                "passwords": false,
                "webSQL": true});
  }
});

//执行清除方法
function toclean(days,data){
	
	var millisecondsPerWeek = 1000 * 60 * 60 * 24 * days;
	var ago = (new Date()).getTime() - millisecondsPerWeek;
	chrome.browsingData.remove({ "since": ago }, data , function () {
		
		//弹出框
		new Notification('chrome chernCache', {
			icon: 'clean48.png',
			body: '清理缓存成功!'
		});
	});
	
}