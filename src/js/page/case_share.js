"use strict"
//引入公共css
import '../../css/common/reset.scss'
import '../../css/common/flex.scss'
import '../../css/page/case_share.scss'
import '../lib/preview.js'
//引入百度统计
import '../common/bdtj.js'
$(function(){
    var first = true;
    var article_id = $("#article_id").val();
    $('span[vid]').each(function(){
        new YKU.Player(this.id,{
            styleid:'0',
            client_id:$(this).attr('clid'),
            vid:$(this).attr('vid'),
            newPlayer: true,
            show_related: false, //播放完成是否显示相关视频
            events:{
                onPlayStart:function(){
                    if (!first) {
                        return
                    }
                    first = false;
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
        })
    });
})
