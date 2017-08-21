$.fn.extend({ //空对象
	
	//拖拽函数
	drag:function(title){
		
		//return返回对象实例
		//先return this.each(), 后调用each()里的方法
		return this.each(function(){ //this:被拖拽对象(jQuery对象)
			
			var _this = $(this); //this:被拖拽对象(原生对象)
			
			title=title || $(this); //判断有没有title
			
			title.mousedown(function(e){ //this:被拖拽对象(原生对象)
				
				var disX = e.pageX-$(this).offset().left; //鼠标按下时x轴偏移量(值固定)
				var disY = e.pageY-$(this).offset().top; //鼠标按下时y轴偏移量(值固定)
			
				//浏览器页面事件，鼠标在document上移动
				$(document).mousemove(function(e){
					
					var pX = e.pageX-disX; //盒子拖拽时鼠标距窗口左侧距离
					var pY = e.pageY-disY; //盒子拖拽时鼠标距窗口上方距离
					var screenWidth = $(window).width(); //浏览器窗口宽度
					var screenHeight = $(window).height(); //浏览器窗口高度
					
					//判断左边
					if(pX < 0){
						pX = 0;
					}
					//判断右边
					if(pX > screenWidth-_this.outerWidth()){
						pX = screenWidth-_this.outerWidth();
					}
					//判断上方
					if(pY < 0){
						pY = 0;
					}
					//判断下方
					if(pY > screenHeight-_this.outerHeight()){
						pY = screenHeight-_this.outerHeight();
					}
					
					//改变css
					_this.css({"left":pX,"top":pY});
					
				});
			
				//停止拖拽 利用事件冒泡 在document上停止
				$(document).mouseup(function(){
					$(document).unbind("mouseup");
					$(document).unbind("mousemove");
					
				});
			
				//阻止鼠标按下选文字
				return false;	
			
			});
			
		
		});
		
	},
	
	//默认居中函数
	showCenter:function(){
		
		return this.each(function(){ //this:对象实例(jQuery对象)
			var _this = $(this); //this:要遍历的对象(原生对象)
			
			function run(){ //this:window
				
				var screenWidth = $(window).width(); //浏览器窗口宽度
				var screenHeight = $(window).height(); //浏览器窗口高度
				//水平位置
				var pX = ( screenWidth - _this.outerWidth())/2;
				//上下位置
				var pY = ( screenHeight - _this.outerHeight() )/2;
				
				_this.css({"left":pX,"top":pY}); 
			};
			run();
			$(window).resize(run); //窗口大小调整时
			
		})
	},
	
	//图片拖拽函数
	imgTab:function(opt){
		
		return this.each(function(){ //this:new出的对象实例(jQuery对象)
			var def={
				"autoplay":true,
				"time": 1000
			}
			var new_opt = $.extend(def, opt);
			
			var state=0; //轮播图下标状态
			var timer;
			var aUli = $(this).find("ul li"); //当前对象中寻找ul-li
			console.log(aUli.size());
			
			$(this).append("<ol></ol>"); //当前对象中插ol
			//根据ul-li长度添加ol-li
			for (var i=0; i<aUli.size(); i++){
				$(this).find("ol").append("<li>"+(i+1)+"</li>"); //ol中插li
			}
			
			$(this).find("ol li").first().addClass("active"); //默认第一个按钮为active状态
			
			var _this = $(this);
			
			//绑定按钮点击事件
			$(this).find("ol li").click(function(){
				$(this).addClass("active").siblings().removeClass("active"); //当前按钮点亮，其它按钮关闭
				var index = $(this).index(); //获取当前按钮索引
				_this.find("ul li").eq(index).show().siblings().hide(); //_this:当前对象实例; $(this):当前按钮
				state = index; //改变轮播图下标
				
			});
			
			//自动播放
			if(new_opt.autoplay){
				function run(){
					_this.find("ul li").eq(state).show().siblings().hide(); //_this:当前对象实例
					_this.find("ol li").eq(state).addClass("active").siblings().removeClass("active"); //当前按钮点亮，其它按钮关闭
					
					state>=aUli.size()-1 ? state=0 : state++;
				};
				
				timer = setInterval(run, new_opt.time);
				
				//hover事件
				_this.hover(function(){
					clearInterval(timer);
				},function(){
					timer = setInterval(run, new_opt.time);
					
				})
				
			}
			
		});
		
	},
	
	//图片放大镜函数
	imgZoom:function(opt){
		
		return this.each(function(){
			var def = {"mult": 3} //默认放大三倍
			var new_opt = {};
			new_opt = $.extend(new_opt, def, opt); //创建新的对象
			
			var imgSrc = $(this).children("img").attr("src"); //获取图片路径(相对路径)
			var picZoom = $("<div>"); //创建放大后图片对象
			var bigPic = $("<img src='"+imgSrc+"' >"); //picZoom内的图片
			picZoom.addClass("picZoom").html(bigPic); //给picZoom添加图片
			
			//判定默认放大倍数是否改变?
//			if(new_opt.mult != def.mult){
//				console.log("ok");
//				picZoom.css({"width":new_opt.mult*100, "height":new_opt.mult*100});
//			}
			
			picZoom.appendTo($(this).parent()); //至该对象的父级?
			
			var zoom = $("<div>"); //创建放大镜对象
			zoom.addClass("zoom").appendTo($(this)); //this：new对象实例(原生对象)
			
			//鼠标移入事件
			$(this).mousemove(function(ev){ //this:当前对象实例
				
				zoom.show();
				picZoom.show();
				
				var pX = ev.pageX - $(this).offset().left - zoom.width()/2;
				var pY = ev.pageY - $(this).offset().top - zoom.height()/2;
				
				//条件判定
				if( pX < 0 ){ //左边
					pX = 0;
				}
				if( pY < 0 ){ //上方
					pY = 0;
				}
				if( pX > $(this).width()-zoom.width() ){ //右边
					pX = $(this).width()-zoom.width();
				}
				if( pY > $(this).height()-zoom.height() ){ //下边
					pY = $(this).height()-zoom.height();
				}
				
				zoom.css({"left":pX,"top":pY}); //移动放大镜；定位，相对与父级
				
				bigPic.css({"left":-new_opt.mult*pX,"top":-new_opt.mult*pY}); //定位，相对与父级
				
			});
			
			//鼠标离开事件
			$(this).mouseout(function(ev){
				zoom.hide();
				picZoom.hide();
				
			});
		
		
		});
		
			
	}
	
});