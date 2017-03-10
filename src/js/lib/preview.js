window.addEventListener('load',function() {
    var QueryString = {data: {},Initial: function() {
        var aPairs,aTmp;
        var queryString = location.search;
        queryString = queryString.substr(1, queryString.length);
        aPairs = queryString.split("&");
	    for (var i = 0; i < aPairs.length; i++) {
	        aTmp = aPairs[i].split("=");
	        this.data[aTmp[0]] = aTmp[1];
	    	}
		},GetValue: function(key) {
	    		return QueryString.data[key];
		}
	};
    var dUrl = 'http://product-uploadtoapps.oss-cn-beijing.aliyuncs.com/';
    var itunesUrl = 'itms-apps://itunes.apple.com/app/id1151257188';
    var appUrl = 'yuanbo.mobileapp://dreamweddingApp/detail_news?article_id=0';
    var version = 'version',from = 'default',name='mhl-release';

	QueryString.Initial();
    var fromId = QueryString.GetValue("hq_f");
    var versionId = QueryString.GetValue("hq_v");
	var nameId = QueryString.GetValue("hq_n");
    if(!versionId || versionId==""){
        // version不存在的情况，所有参数均走默认值
        dUrl = dUrl + version + '/' + from + '/' + name + '.apk';
    }else{
        // fromId不存在的情况下，走默认值
        from = fromId || from;
        name = nameId || name;
        dUrl = dUrl + versionId + '/' + from + '/' + name + '.apk';
    }
	
    function browserRedirect() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var explorer = navigator.userAgent;
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        var iE = explorer.indexOf("MSIE")>-1;
        var fIre = explorer.indexOf("Firefox")>-1;
        var chrome = explorer.indexOf("Chrome")>-1;
        var safari = explorer.indexOf("Safari")>-1;
        var bIsWechat = sUserAgent.indexOf('micromessenger')>-1;
        console&&console.log(sUserAgent);
        if(bIsWechat){
            // 微信
            if(QueryString.GetValue("isappinstalled")){
                console&&console.log("微信 ，应用已安装，打开应用");
                location.href=appUrl;
            }else{
                /*if (bIsIpad || bIsIphoneOs){
                    // ios
                    console&&console.log("ios , 跳转itunes。");
                    location.href = itunesUrl;
                }else{*/
                    // android
                    console&&console.log("android 微信 , 弹出弹窗。");
                    popupDiv.style.display = 'block';
                /*}*/
            }
        }else if (bIsIpad || bIsIphoneOs){
            // ios
            console&&console.log("ios , 跳转itunes。");
            location.href = itunesUrl;
        }else if (bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            // android
            console&&console.log("android , 下载安装包。");
            location.href = dUrl;
        } else if(iE||fIre||chrome||safari){
            // pc
            console&&console.log("pc , 下载安装包。");
            location.href = dUrl;
        }
    }
    var clickDiv = document.querySelector('#downloadapp')
        ,clickApp = document.querySelector('#download')
/*        ,popupDiv = document.querySelector('#popupDiv');*/
    clickDiv&&clickDiv.addEventListener('click',function(){
        browserRedirect();
    },false);
    clickApp&&clickApp.addEventListener('click',function(){
        browserRedirect();
    },false);
/*   popupDiv.addEventListener('click',function(){
        popupDiv.style.display = 'none';
    },false);*/
},false);