"use strict"
//引入公共css
import '../../css/common/flex.scss'
import '../../css/common/reset.scss'
//顶部公用css
import '../../css/common/top.scss'
//顶部公用js
import '../common/back_open.js'
//底部公用css
import '../../css/common/foot.scss'
// 引入swiper
import '../../css/lib/swiper.scss'
import Swiper from '../lib/swiper'
//引入本页面css
import '../../css/page/wed_details.scss'
//引入百度统计
import '../common/bdtj.js'

$(function () {
    $(".swiper-slide ").on('click', function () {
        location.href = $("#picUrl").val();
    });
    var start,
        gotopicture = false,
        allnum = $("#picNum").val();
    var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        lazyLoading: true,
        lazyLoadingInPrevNext : true,
        lazyLoadingInPrevNextAmount : 2,
        watchSlidesVisibility: true,
        preventLinksPropagation: false,
        resistanceRatio: 0.8,
        paginationType: 'custom',
        paginationCustomRender: function (swiper, current, total) {
            return current + ' / ' + allnum;
        },
        onTouchStart: function (swiper, event) {
            start = event.targetTouches[0].clientX
        },
        onTouchMove: function (swiper, event) {
            if (swiper.activeIndex == ($(".swiper-slide").length - 1) && start - event.targetTouches[0].clientX > 230) {
                $(".last-show>p").text("释放查看商品详情")
                $(".last-show .arrow")[0].style.webkitTransform = "rotate(180deg)";
                $(".last-show .arrow")[0].style.webkitTransition = "-webkit-transform 0.2s linear 0s";
                gotopicture = true
            } else {
                $(".last-show>p").text("拖动查看商品详情")
                $(".last-show .arrow")[0].style.webkitTransform = "rotate(0deg)";
                $(".last-show .arrow")[0].style.webkitTransition = "-webkit-transform 0.2s linear 0s";
                gotopicture = false
            }
        },
        onTouchEnd: function (swiper, event) {
            if (gotopicture) {
                location.href = $("#picUrl").val();
            }
        }
    })
});
