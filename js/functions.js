//url参数替换
function replaceParamVal(url, name, value) {
	var newUrl = url;
	if(hasParameter(name)){
	    var re = eval('/(' + paramName + '=)([^&]*)/gi');
	    newUrl = oldUrl.replace(re, paramName + '=' + replaceWith);	
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