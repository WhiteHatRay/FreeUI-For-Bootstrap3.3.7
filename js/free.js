$(document).ready(function(){
	//功能区的展开与收缩
	$('.free-left-function-top').click(function(){
		var left_function = $('.free-left-function'); 
		if(left_function.hasClass('free-left-function-full')){ //transform 2 part
			left_function.removeClass('free-left-function-full').addClass('free-left-function-part');
			$('.free-right-container').removeClass('free-right-container-area-normal').addClass('free-right-container-area-more');
		} else if(left_function.hasClass('free-left-function-part')) { //transform 2 full
			left_function.removeClass('free-left-function-part').addClass('free-left-function-full');
			$('.free-right-container').removeClass('free-right-container-area-more').addClass('free-right-container-area-normal');
		}
	});
	
	//v-nav的展开与收缩
	$('.free-vnav-parent').click(function(){
		var children = $(this).next('ul');
		if(children.hasClass('free-vnav-children')){ //confirm this is vnav-children
			if(children.is(':visible')){ //change the arrow direction && set vnav-children disable
				$(this).children('span').first().html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
				children.removeClass('show-on').addClass('show-off');
			} else if (children.is(':hidden')) { //change the arrow direction && set vnav-children visible
				$(this).children('span').first().html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
				children.removeClass('show-off').addClass('show-on');
			}
		}
	});
	
	//将功能区的当前选项卡free-vnav-child设置为active
	var pathName = "/abc/abc";
	$('.free-vnav-child').removeClass('active');
	$("[href='" + pathName + "']").parent().addClass('active');
	
	if(document.body.style.overflow!="hidden" && document.body.scroll!="no" && document.body.scrollHeight>document.body.offsetHeight){
		//屏幕内容 < 屏幕高度，footer居于最底部
			$('.free-footer').addClass('align-bottom');
	} else {
		//屏幕内容 > 屏幕高度, footer居于内容底部
		if($('.free-footer').hasClass('align-bottom')){
			$('.free-footer').removeClass('align-bottom');
		}
	}
});
