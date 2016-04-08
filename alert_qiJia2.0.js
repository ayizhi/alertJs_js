//====================================================  小弹窗  =========================================================
//*****  弹窗z-index为10000 + 10*num  ******

// 默认mask的class为'theMask';
	// 默认弹框的class为'theAlertBox',id需要初始化设置;

	// 接受参数:
	// 		alert框的id(因为同时只会存在一个mask和多个alert框,所以只需要设定alert的id),
	//		title = '',名称
	//		info = {
	//				'width':'',   默认550px
	//				'height':'',  默认260px
	//				'hasCloseBtn':false,  默认为true
	//    			'bottomBtn':{'className':'content'}  有几个btn写几个,默认是一个确定按钮 key为类名,value为按钮内容
	// 			}
	//

	// 封装的方法：
	// 	rmThis：删掉这个弹窗框
	// 	rmAll：删掉全部谈窗框
	// 	reborn：状态需要保留，比如勾选关闭后，再打开还需要显示原来勾选的结果
	// 	appendDom：可以是拼接字符串，也可以是dom对象或者jq对象
	// 	bindEvent：绑定事件，需要传入一个function

	//其中css可以通过_init方法设置，其中例如大小尺寸这种属性需要在css中设置


//======================================================================================================================

//=====================================================  跳出窗口  =======================================================
	//AlertWin(winId,title,obj)
	//参数:
	//winId:新生成window的ID,
	//title:新win的标题
	//obj = {
	// 			'width':'',//默认100%,
	//			'height':'',//默认100%,
	//			'from':''//上左下右,left,right,top,bottom,弹出的位置,默认为bottom,
	//			'closeBtn':''//true or false , 默认为true,
	//			'titleIcon':''//传一个类名,默认为''
	// 	    	'bottomBtn':{'className':'content'}  有几个btn写几个,默认是一个确定按钮 key为类名,value为按钮内容
	// 		}

//======================================================================================================================


function AlertBox(alertId,title,obj){//小弹窗
	if(document.getElementById(alertId)){//防止alertId重复
		return
	}
	var obj = obj?obj:{};
	this.alertId = alertId;
	this.title = title;
	this.hasCloseBtn = (obj['hasCloseBtn'] == undefined) ? true : obj['hasCloseBtn'];
	this.width = obj['width'] ? obj['width'] : '550px';
	this.height = obj['height'] ? obj['height'] : '260px';

	var btns = obj['bottomBtn'] ? obj['bottomBtn'] : {'confirmBtn':'确定'}
	this.bottomBtn = "";
	for(var key in btns){
		this.bottomBtn += '<div class = "bottomBtn ' + key + '">' + btns[key] + '</div>'
	}

	this.theMask = appendAlert('','theMask');
	this.theAlertBox = appendAlert(this.alertId,'alertBox',this.theMask);

	if(this.hasCloseBtn){
		this.theCloseBtn = appendAlert('','theCloseButton',this.theAlertBox);
	}

	this._init();

	function appendAlert(id,className,box) {
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
}

AlertBox.prototype = {
	_init : function(){

		var t = this,
			maskNum = $('.theMask').length,
			screenHeight = $(document.body).height(),
			alertMarginTop = (screenHeight - parseInt(this.height))/ 2;

		if(this.title){//如果有标题则设置标题
			$(this.theAlertBox).append($(
				'<div class = "alertTitle">' + this.title +'</div>' +
				'<div class = "alertBody"></div>' +
				'<div class = "alertFooter">' + this.bottomBtn + '</div>'
			))
		}else{
			$(this.theAlertBox).append($(
				'<div class = "alertBody"></div>' +
				'<div class = "alertFooter">' + this.bottomBtn + '</div>'
			))
		}

		//样式预设
		$(this.theMask).css({
			'width': '100%',
			'height': '100%',
			'position': 'fixed',
			'left': 0,
			'top': 0,
			'z-index': 10000 + maskNum * 10,
			'backgroundColor': maskNum <= 1 ? 'rgba(227, 227, 227,0.6)' : 'none',
		})


		$(this.theAlertBox).css({
			'width' : this.width,
			//'min-height' : this.height,
			'margin': 'auto',
			'margin-top': alertMarginTop + 'px',
			'box-shadow':'0 0 4px #aaaaaa',
			'background-color':'#fff',
			'position':'relative'
		})



		if(this.theCloseBtn){
			var theAlertBoxWidth = $('#'+this.alertId).width();

			$(this.theCloseBtn).css({//关闭按钮的样式跟显示
				'width':'50px',
				'height':'50px',
				'position':'absolute',
				'left':theAlertBoxWidth - 50 + 'px',
				'top':0,
				'background-color':'pink',
				'cursor':'pointer'
			}).html(
				'<i class = "fa fa-close"></i>'
			)

			this.theCloseBtn.onclick = function(){
				t.rmThis()
			}
		}

		//设置alert内基础样式
		$(this.theAlertBox).find('.alertTitle').css({//标题
			'height':'50px',
			'border-bottom':'1px solid rgb(238, 236, 236)',
			'color':'#a3a3a3',
			'line-height':'50px',
			'text-align':'center',
			'font-weight':'normal',
			'font-style':'normal',
			'font-size':'16px',
		})

		$(this.theAlertBox).find('.alertBody').css({//主体
			'padding':'30px 30px 30px 30px',

		})

		$(this.theAlertBox).find('.alertFooter').css({//按钮体
			'height':'70px',
			'border-top':'1px solid rgb(238, 236, 236)',
			'text-align':'center',
			'line-height':'70px',
		}).find('.bottomBtn').css({
			'padding':'0 30px 0 30px',
			'height':'40px',
			'display':'inline-block',
			'background-color':'#26a69a',
			'text-align':'center',
			'line-height':'40px',
			'margin-left':'40px',
			'color':'#fff',
			'border-radius':'5px',
			'cursor':'pointer',
		})

		$(this.theAlertBox).find('.bottomBtn:first').css({
			'margin-left':'0',
		})

		if($('.theMask').length == 1){
			document.body.onkeydown = function(e){//按esc删除
				if(e.keyCode == 27){
					if($('.theMask').length > 1){
						$('.theMask')[$('.theMask').length-1].remove();
					}else if($('.theMask').length == 1){
						t.rmAll()
					}
				}
			}
		}

		document.body.style.overflow = 'hidden';
	},

	rmThis : function(){
		if(document.getElementById(this.alertId)){
			$(this.theMask).remove();
		}
	},

	rmAll : function(){
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
		$(this.theAlertBox).find('.alertBody').append($(dom));
	},
	bindEvent : function(callback){
		callback.call(this.theAlertBox);
	}
}


function AlertWin(winId,title,obj){
	if(document.getElementById(winId)){//防止alertId重复
		return
	}

	$(document.body).css({//禁止滚动
		'overflow':'hidden',
	})

	var obj = obj?obj:{},
		location = {
			'left':{'left':'-100%','top':'0'},
			'right':{'left':'100%','top':'0'},
			'bottom': {'left':'0','top':'100%'},
			'top':{'left':'0','top':'-100%'},
		};

	this.winId = winId;
	this.titleName = $.trim(title);
	this.width = obj['width'] ? obj['width'] : '100%';
	this.height = obj['height'] ? obj['height'] : '100%';
	this.fromDir = obj['from'] ? obj['from'] : 'bottom';
	this.from = location[this.fromDir]
	this.titleIcon = obj['titleIcon'] ? obj['titleIcon'] : 'fa-home';
	var btns = obj['bottomBtn'] ? obj['bottomBtn'] : false;
	this.bottomBtn = '';

	for(var key in btns){
		this.bottomBtn += '<div class = "bottomBtn ' + key + '">' + btns[key] + '</div>'
	}

	this.title = '<div class = "winTitle">' +
		'<span class = "titleBtn icon"><i class = "' + this.titleIcon + '"></i></span>' +
		'<span class = "title">' + this.titleName + '</span>' +
		'<span class = "titleBtn closeBtn"><i class = "fa-close"></i></span>' +
		'</div>';
	this.body = '<div class = "winBody"><div class = "bodyContent"></div></div>';
	this.footer = '<div class = "winFooter">' + this.bottomBtn + '</div>'


	//设置dom
	this.$win = $('<div class = "alertWin" id = "' + this.winId + '"></div>');


	if(this.titleName){
		this.$win.append($(this.title))
	}
	this.$win.append($(this.body));
	if(this.bottomBtn){
		this.$win.append($(this.footer))
	}


	this.init();


}

AlertWin.prototype = {
	init : function(){
		var t = this,
			$tWin = t.$win,
			from = this.from,
			upFooterHeight = 70,
			winLen = $('.alertWin').length;

		$tWin.css({
			'width':'100%',
			'height':'100%',
			'position':'absolute',
			'left':from['left'],
			'top':from['top'],
			'z-index':999 + winLen*10,
			'background-color':'#fff'
		})

		$tWin.find('.winTitle').css({
			'width' : '100%',
			'height' : upFooterHeight + 'px',
			'border-bottom' : '1px solid #bbbbbb',
			'text-align' : 'center',
			'line-height' : upFooterHeight + 'px',
			'color':'black',
			'font-size':'24px',
		})
		$tWin.find('.winTitle .icon').css({
			'float':'left',
			'margin-left':'10px',
			'width' : upFooterHeight + 'px',
			'height' : upFooterHeight + 'px',
			'background-color' :'#ccc',
		})
		$tWin.find('.winTitle .closeBtn').css({
			'float':'right',
			'margin-right':'10px',
			'width' : upFooterHeight + 'px',
			'height' : upFooterHeight + 'px',
			'background-color' :'#ccc',
			'cursor':'pointer',

		})

		if(this.bottomBtn){
			var bodyHeight = parseInt($(document.body).height()) - upFooterHeight*2;
		}else{
			var bodyHeight = parseInt($(document.body).height()) - upFooterHeight - 20;
		}



		$tWin.find('.winBody').css({
			//'padding' : '30px 30px 100px 30px',
			'height': bodyHeight,
			'overflow-y':'scroll',

		})
		$tWin.find('.winBody .bodyContent').css({
			'margin':'30px 30px'
		})


		$tWin.find('.winFooter').css({
			'height':upFooterHeight + 'px',
			'width' : '100%',
			'background-color' : 'rgb(245, 245, 245)',
			'text-align' : 'center',
			'line-height' : upFooterHeight + 'px',
		}).find('.bottomBtn').css({
			'padding':'0 30px 0 30px',
			'height':'40px',
			'display':'inline-block',
			'background-color':'#26a69a',
			'text-align':'center',
			'line-height':'40px',
			'margin-left':'40px',
			'color':'#fff',
			'border-radius':'5px',
			'cursor':'pointer',
		})

		$tWin.find('.bottomBtn:first').css({
			'margin-left':'0',
		})



		$(document.body).append(t.$win)

		var timer = setTimeout(function(){
			t.$win.animate({'top':0,'left':0},200,'swing')
		},1)



	},

	rmWin:function(){
		var t = this;
		$(document.body).css({
			'overflow':'auto',
		})
		t.$win.animate({'top': t.from['top'],'left': t.from['left']},100,'swing',function(){
			t.$win.remove();
		})
	},


	appendDom : function(str){
		this.$win.find('.winBody .bodyContent').append($(str));
	},

	bindEvent : function(callBack){
		callBack.call(t.$win);
	}
}