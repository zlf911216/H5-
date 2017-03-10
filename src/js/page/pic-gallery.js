"use strict"
//引入公共css
import '../../css/common/flex.scss'
import '../../css/common/reset.scss'
//顶部公用css
import '../../css/common/top.scss'
//顶部公用js
import '../common/back_open.js'
// 引入swiper
import '../../css/lib/swiper.scss'
import Swiper from 'swiper'
//引入本页面css
import '../../css/page/pic-gallery.scss'
//引入百度统计
import '../common/bdtj.js'

$(function(){
    $('.swiper-slide img').each(function() {
        if ($(this).data('kind') == 0) {
            $(".kind .model").addClass('has_kind')
        } else if ($(this).data('kind') == 1) {
            $(".kind .details").addClass('has_kind')
        } else if ($(this).data('kind') == 2) {
            $(".kind .graphic").addClass('has_kind')
        } else if ($(this).data('kind') == 3) {
            $(".kind .official").addClass('has_kind')
        }
    })
    $(document).on('click', '.swiper-slide', function(event) {
        $(".head,.foot_float").toggleClass('show');
    });
    switch ($('.swiper-slide img').eq(0).data('kind')) {
        case 0:
            $(".kind .model").addClass('choose')
            break;
        case 1:
            $(".kind .details").addClass('choose')
            break;
        case 2:
            $(".kind .graphic").addClass('choose')
            break;
        case 3:
            $(".kind .official").addClass('choose')
            break;
    }
    var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        lazyLoading: true,
        lazyLoadingInPrevNext : true,
        lazyLoadingInPrevNextAmount : 2,
        watchSlidesVisibility: true,
        zoom: false,
        zoomToggle: false,
        loop: true,
        nested: true,
        threshold: 85,
        resistanceRatio: 0.75,
        onSlideChangeStart: function(swiper) {
            $(".head .title .now").text(swiper.realIndex+1);
            $(".kind>p").removeClass('choose')
            switch ($('.swiper-slide img').eq(swiper.activeIndex).data('kind')) {
                case 0:
                    $(".kind .model").addClass('choose')
                    break;
                case 1:
                    $(".kind .details").addClass('choose')
                    break;
                case 2:
                    $(".kind .graphic").addClass('choose')
                    break;
                case 3:
                    $(".kind .official").addClass('choose')
                    break;
            }
        },
        onTouchEnd: function (swiper) {
            $(".head .title .now").text(swiper.realIndex+1);
            $(".kind>p").removeClass('choose');
            switch ($('.swiper-slide img').eq(swiper.activeIndex).data('kind')) {
                case 0:
                    $(".kind .model").addClass('choose');
                    break;
                case 1:
                    $(".kind .details").addClass('choose');
                    break;
                case 2:
                    $(".kind .graphic").addClass('choose');
                    break;
                case 3:
                    $(".kind .official").addClass('choose');
                    break;
            }
        }
    });
    function sortNum(a,b) {
        return a - b;
    }
    var model_list=[],
        details_list=[],
        graphic_list=[],
        official_list=[];
    $('.swiper-slide img').each(function(index){
        switch ($(this).data('kind')) {
            case 0:
                model_list.push($(this).parent().parent().data('swiper-slide-index'));
                break;
            case 1:
                details_list.push($(this).parent().parent().data('swiper-slide-index'));
                break;
            case 2:
                graphic_list.push($(this).parent().parent().data('swiper-slide-index'))
                break;
            case 3:
                official_list.push($(this).parent().parent().data('swiper-slide-index'))
                break;
        }
    });
    $('.model').click(function(){
        if(model_list.length!=0){
            mySwiper.slideTo(model_list.sort(sortNum)[0]+1, 300, true);
        }
    });
    $('.details').click(function(){
        if(details_list.length!=0){
            mySwiper.slideTo(details_list.sort(sortNum)[0]+1, 300, true);
        }
    });
    $('.graphic').click(function(){
        if(graphic_list.length!=0){
            mySwiper.slideTo(graphic_list.sort(sortNum)[0]+1, 300, true);
        }
    });
    $('.official').click(function(){
        if(official_list.length!=0){
            mySwiper.slideTo(official_list.sort(sortNum)[0]+1, 300, true);
        }
    })
});

