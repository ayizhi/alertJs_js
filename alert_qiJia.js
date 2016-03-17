//===========================
	// 默认mask的class为'theMask';
	// 默认弹框的class为'theAlertBox',id需要初始化设置;

	// 接受两个参数:
	// 		alert框的id(因为同时只会存在一个mask和多个alert框,所以只需要设定alert的id),
	// 		true／false来确定有没有右上角的关闭按钮(这个参数可以不写)


	// 封装的方法：
	// 	removeAlert：删掉这个弹窗框
	// 	removeAll：删掉全部
	// 	reborn：状态需要保留，比如勾选关闭后，再打开还需要显示原来勾选的结果
	// 	appendDom：可以是拼接字符串，也可以是dom对象或者jq对象
	// 	bindEvent：绑定事件，需要传入一个function

	//其中css可以通过_init方法设置，其中例如大小尺寸这种属性需要在css中设置

///==========================


function AlertFunc(alertId,boole){
	this.alertId = alertId;
	this._appendAlert = function(id,className,box) {
		if(!box){
			var box = document.body;
		}else{
			var box = box;
		}
		if (document.getElementById(id)) {
			var theDom = document.getElementById(id);
		} else {
			var theDom = document.createElement('div')
			if(id){
				theDom.setAttribute('id', id);
			}
			if(className){
				theDom.setAttribute('class',className)
			}
			box.appendChild(theDom)
		}
		return theDom;
	};

	this.theMask = this._appendAlert('','theMask');
	this.theAlertBox = this._appendAlert(this.alertId,'alertBox',this.theMask);

	if(boole){
		this.theOutsideCloseButton = this._appendAlert('','outsideCloseButton',this.theAlertBox);
	}
	this._init();
}

AlertFunc.prototype = {
	_init : function(){
		
		var t = this;
		var maskNum = $('.theMask').length;
		$(this.theMask).css({
			'width': '100%',
			'height': '100%',
			'position': 'fixed',
			'left': 0,
			'top': 0,
			'z-index':10000 + maskNum*10,
			'backgroundColor': maskNum <= 1 ? 'rgba(0,0,0,0.2)' : 'none',
		});
		


		var theAlertBoxWidth = $('#'+this.alertId).width();

		if(this.theOutsideCloseButton){
			$(this.theOutsideCloseButton).css({
			'width':'20px',
			'height':'20px',
			'backgroundColor':'red',
			'position':'absolute',
			'left':theAlertBoxWidth,
			'top':0,
		})
			this.theOutsideCloseButton.onclick = function(){
				t.removeAlert()
			}
		}


		if($('.theMask').length == 1){
			document.body.onkeydown = function(e){//按esc删除
				console.log($('.theMask').length)
				if(e.keyCode == 27){
					if($('.theMask').length > 1){
						$('.theMask')[$('.theMask').length-1].remove();
					}else if($('.theMask').length == 1){
						t.removeAll()
					}
				}
			}
		}


		document.body.style.overflow = 'hidden';
	},

	removeAlert : function(){
		if(document.getElementById(this.alertId)){
			$(this.theAlertBox).parent().remove();
		}
	},

	removeAll : function(){
		if($('.theMask')){
			$('.theMask').remove()
		}
		document.body.style.overflow = 'auto'
	},

	reborn : function(){
		if(!document.getElementById(this.alertId)){
			document.body.appendChild(this.theMask);
		}
		if(!document.getElementById(this.alertId)){
			this.theMask.appendChild(this.theAlertBox)
		}
		document.body.style.overflow = 'hidden'
	},

	appendDom : function(dom){//此处dom应为拼接好的字符串；
		$(this.theAlertBox).append($(dom));
	},
	bindEvent : function(callback){
		callback();
	}
}