;(function($){
	
	//图片放大镜函数
	$.fn.imgZoom = function(opt){
		
		var def = {
			"mult": 3, //默认放大三倍
			"size": 100, //放大镜默认大小100*100
		} 
		var new_opt = {};
		new_opt = $.extend(new_opt, def, opt); //创建新的对象
		
		return this.each(function(){
			var imgWidth = $(this).width(); //当前图片盒子宽度
			var imgHeight = $(this).height(); //当前图片盒子高度
			var imgSrc = $(this).children("img").attr("src"); //获取图片路径(相对路径)
			//创建放大镜对象
			var zoom = $("<div>"); 
			zoom.addClass("zoom").appendTo($(this)); 
			
			//创建放大后图片对象
			var picZoom = $("<div>"); //图片盒子
			var bigPic = $("<img src='"+imgSrc+"' >"); //picZoom内的图片
			picZoom.addClass("picZoom").html(bigPic); //给picZoom添加图片
			$(this).after(picZoom); //将picZoom插入到当前对象后面
			
			zoom.css({"width":new_opt.size,"height":new_opt.size}); //改变放大镜大小
			picZoom.css({"width":new_opt.mult*new_opt.size, "height":new_opt.mult*new_opt.size}); //改变放大后的图片盒子大小
			bigPic.css({"width":imgWidth*new_opt.mult, "height":imgHeight*new_opt.mult}); //改变放大后的图片大小
			
			
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
	
	
})(jQuery);

