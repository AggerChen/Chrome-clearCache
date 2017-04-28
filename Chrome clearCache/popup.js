/*
* author:aggerChen
*/
document.addEventListener('DOMContentLoaded', function () {
		
	
		$("#cleanBtn").on("click",function(){
				$("#cleanBtn").attr('disabled',true);
				$("#showMsg").text('缓存清除中...');
				$("#showMsg").fadeIn();
				
				//向扩展程序发送消息，并传递数据
			   chrome.runtime.sendMessage({
					msg: 'clearCache',
					data: getSelectDatas(),			//获取清除选项			
					days: $("#time").val()			//获取清除多长时间
				},function(response){
				   //响应函数
					$("#cleanBtn").attr('disabled',false);
					$("#showMsg").text('清除成功!');
					$('#showMsg').delay(2000).fadeOut(500);
			   });
        });
		
		//选项监听
		options.cleanOpt.onchange = function() {	
			var status = options.cleanOpt.checked;
			console.log(status);
		};
});

//获取选中的清理选项
function getSelectDatas(){
	var datas = $("input[name='cleanOpt']");			//获取清除哪些内容
	var data = {};
	$.each(datas,function(index,item){					//组装数据
		if(item.checked) data[item.value] = true;
	});
	return data;
}