"use strict"
//引入公共css
import '../../css/common/reset.scss'
import '../../css/common/flex.scss'
//顶部公用css
import '../../css/common/top.scss'
//顶部公用js
import '../common/back_open.js'
//底部公用css
import '../../css/common/foot.scss'
//引入本页面css
import '../../css/page/video_list.scss'
//分页css
import '../../css/common/page.scss'
//下载app
import '../lib/preview.js'
//引入百度统计
import '../common/bdtj.js'

var config = {};
var side_open = false; //侧栏开关

Object.defineProperty(config, 'side_open', {
    configurable: true,
    set: function(val) {
        if (val) {
            $(".shandow").removeClass('hidden')
            $("#side-choose").addClass('open')
        } else {
            $("#side-choose").addClass('close')
            setTimeout(function() {
                $(".shandow").addClass('hidden')
                $("#side-choose").removeClass('open close')
            }, 400)
        }
        side_open = val
    },
    get: function() {
        return side_open
    }
});
$(".condition.condition,.open_side").on('click', function(event) {
    $(".detail").addClass('hidden');
    config.side_open = true;
});
$(".shandow").on('click', function(event) {
    config.side_open = false;
});
