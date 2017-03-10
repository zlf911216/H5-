"use strict"
//引入公共css
import '../../css/common/reset.scss'
import '../../css/common/flex.scss'
//引入本页面css
import '../../css/page/mobile_share.scss'
//下载app
import '../lib/preview.js'
//引入百度统计
import '../common/bdtj.js'

$(function(){
    $(".close-footer").on('click',function(event) {
    	$(".app_down,.nav-space").hide()
    });
});