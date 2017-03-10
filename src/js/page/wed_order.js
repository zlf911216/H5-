"use strict"
//引入公共css
import '../../css/common/flex.scss'
import '../../css/common/reset.scss'
//顶部公用js
import '../common/back_open.js'
//顶部公用css
import '../../css/common/top.scss'
//底部公用css
import '../../css/common/foot.scss'
//引入本页面css
import '../../css/page/wed_order.scss'
//引入百度统计
import '../common/bdtj.js'


$(function(){
    var choose = {},
		choose_upload=true,
        list = [];
    Object.defineProperty(choose, 'list', {
        configurable: true,
        set: function(val) {
            $(".business-box").removeClass('choose-business');
            $(".business-box").each(function() {
                for (var i = 0; i < val.length; i++) {
                    if ($(this).data('id') == val[i]) {
                        $(this).addClass('choose-business')
                    }
                }
            });
            list = val;
        },
        get: function() {
            return list
        }
    });
    choose.list=list;
    $(".business-box").each(function(index){
        if(index<=2){
            list.push($(this).data('id'));
            choose.list=list;
        }
    });
    $(".business-box").on('click', function(event) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] == $(this).data('id')) {
                list.splice(i, 1);
                choose.list=list;
                return
            }
        }
        list.push($(this).data('id'));
        choose.list=list;
    });
    $(".upload-msg .upload").on('touchstart', function(event) {
    	if(!choose_upload){return}
        choose_upload=false;
        $.ajax({
            url: '/api/h5/common/AddReservationToStore',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                commodity_list:choose.list,
                username:$("#name").val(),
                phone:$("#tel").val(),
            }),
            success: function(msg) {
				if(msg.retcode==0){
                    $(".alert-box>p").text('提交成功');
                    $(".shandow,.alert-box").removeClass('hidden');
                    setTimeout(function(){
                        if(document.referrer.indexOf('menghunli')>-1){
                            history.go(-1)
                        }else{
                            location.href="/"
                        }
                    },1000);
                }else{
                    $(".alert-box>p").text(msg.msg);
                    $(".shandow,.alert-box").removeClass('hidden');
                    setTimeout(function() {
                        $(".shandow,.alert-box").addClass('hidden');
                    }, 1500);
                    choose_upload=true;
				}
            },
			error:function(){
                $(".alert-box>p").text('网络出错，请刷新后重新提交');
                $(".shandow,.alert-box").removeClass('hidden');
                setTimeout(function() {
                    $(".shandow,.alert-box").addClass('hidden');
                }, 1500);
                choose_upload=true;
			}
        })
    });
});
