$(document).ready(function(){
	//url参数替换
	function replaceParamVal(url, name, value) {
		var newUrl = url;
		if(hasParameter(name)){
		    var re = eval('/(' + name + '=)([^&]*)/gi');
		    newUrl = url.replace(re, name + '=' + value);
		} else {
			newUrl = addParameter(url, name, value);
		}
	    return newUrl;
	}
	//url增加参数
	function addParameter(url, name, value){
		var newUrl = url;
		var paremeter = name + "=" + value;
		if (url.match("[\?]")) {
	        newUrl = url + "&" + paremeter;
	    } else {
	        newUrl = url + "?" + paremeter;
	    }
	    return newUrl;
	}
	//判断url是否有某个参数
	function hasParameter(name){
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]);
	        return null;
	}
	
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
	
	//根据网页内容决定footer是固定在底部还是处于内容最底部
	if(document.body.style.overflow!="hidden" && document.body.scroll!="no" && document.body.scrollHeight>document.body.offsetHeight){
		//屏幕内容 < 屏幕高度，footer居于最底部
			$('.free-footer').addClass('align-bottom');
	} else {
		//屏幕内容 > 屏幕高度, footer居于内容底部
		if($('.free-footer').hasClass('align-bottom')){
			$('.free-footer').removeClass('align-bottom');
		}
	}
	
	//单选表格的选择事件
	$('.table-single-choose tbody tr').click(function(){
		$('.table-single-choose tbody tr').removeClass('selected');
		$(this).addClass('selected');
	});
	
	
	
	//分页
	$.pagination = {
		//config array(currentPage, sumPages)
		config: function(configArg){
			//分页控件ID
			var pagination = configArg['paginationId'];
			var uri = configArg['url'] ? (configArg['url'] + window.location.search) : (window.location.pathname + window.location.search); //
			var currentPage = configArg['currentPage']; //当前页
			var sumPages = configArg['sumPages']; //总页数
			var sumShow = configArg['sumShow'] ? configArg['sumShow'] : 10; //共显示几个，默认10个
			if(sumShow < 3){
				sumShow = 3;
			}
			//起始页和结束页的默认值
			var startPage = 1;
			var endPage = sumPages;
			if(sumPages > sumShow){
				//当前页作为sumShow的后一半的第一个
				if((currentPage + Math.ceil(sumShow/2)) <= sumPages){
					//仍然有未显示的
					startPage = currentPage - Math.floor(sumShow / 2);
					if(startPage < 1){
						startPage = 1;
					}
					endPage = startPage + sumShow - 1;
				} else {
					//不够显示的了，最大页数显示出来
					startPage = sumPages - sumShow + 1;
					endPage = sumPages;
				}
			}
			if(currentPage > 1){
				$("#" + pagination + " .free-pagination").append('<li class="free-pagination-item free-pagination-before"><a href="javascript:void(0)" data-target="previous"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a></li>');
			}
			for(var i = startPage; i <= endPage; i++){
				var url = replaceParamVal(uri, "page", i);
				if(i == currentPage){
					$("#" + pagination + " .free-pagination").append('<li class="free-pagination-item active"><a href="'+ url +'">'+ i +'</a></li>');
				} else {
					$("#" + pagination + " .free-pagination").append('<li class="free-pagination-item"><a href="'+ url +'">'+ i +'</a></li>');
				}
			}
			if(currentPage < sumPages){
				$("#" + pagination + " .free-pagination").append('<li class="free-pagination-item free-pagination-after"><a href="javascript:void(0)" data-target="next"><i class="fa fa-angle-double-right" aria-hidden="true"></i></a></li>');
			}
			
			$("#" + pagination + " .free-pagination a").click(function(){
				if($(this).attr('data-target') == 'previous' && currentPage > 1){
					self.location = replaceParamVal(uri, "page", currentPage-1);
				} else if($(this).attr('data-target') == 'next' && currentPage < sumPages){
					self.location = replaceParamVal(uri, "page", currentPage+1);
				}
			});
		}
	};
});
