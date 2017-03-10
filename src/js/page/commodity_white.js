"use strict"
//引入公共css
import '../../css/common/reset.scss'
import '../../css/common/flex.scss'
//顶部公用css
import '../../css/common/top.scss'
//顶部公用js
import '../common/back_open.js'
//一级导航css
import '../../css/common/first_nav.scss'
//底部公用css
import '../../css/common/foot.scss'
//引入本页面css
import '../../css/common/white.scss'
//下载app
import '../lib/preview.js'
//引入百度统计
import '../common/bdtj.js'

$(function(){
    setTimeout(function(){
        if(document.referrer.indexOf('menghunli')>-1){
            history.go(-1)
        }else{
            location.href="/"
        }
    },3000)
});