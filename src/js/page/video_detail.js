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
import '../../css/page/video_detail.scss'
//下载app
import '../lib/preview.js'
//引入百度统计
import '../common/bdtj.js'

var client_id = document.querySelector('#client_id').value;
var vid = document.querySelector('#vid').value;
var article_id = document.querySelector('#article_id').value;
var first = true;
var player = new YKU.Player('youkuplayer', {
	styleid: '0',
	client_id: client_id, //优酷开放平台创建应用的client_id 这个是必须的登录优酷在后台创建一个应用就有。
	vid: vid, //视频ID 这个视频id就是优酷视频连接后面的字符串，这个应该懂吧。
	autoplay: false, //是否自动播放视频
	newPlayer: true,
	show_related: false, //播放完成是否显示相关视频
	events: {
		onPlayStart: function() {
			if (!first) {
				return
			}
			first = false
			$.ajax({
				url: '/api/h5/article/UpdateVideoPlayCount',
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify({
					article_info_list:[{
						article_id: parseInt(article_id),
						count: 1						
					}]
				})
			})
		}
	}
});