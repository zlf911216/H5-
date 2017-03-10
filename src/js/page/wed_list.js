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
//分页css
import '../../css/common/page.scss'
//引入本页面css
import '../../css/page/wed_list.scss'
//下载app
import '../lib/preview.js'
//引入百度统计
import '../common/bdtj.js'


$(function () {
    //参数
    var config = {};
    var order = null,
        side_para,
        side_out_para,
        side_open = false, //侧栏开关
        choose_side, //品类选择
        side_name,
        outside_name;

    Object.defineProperty(config, 'order', {
        configurable: true,
        set: function (val) {
            order = val
        },
        get: function () {
            return order
        }
    });
    Object.defineProperty(config, 'side_para', {
        configurable: true,
        set: function (val) {
            side_para = val
        },
        get: function () {
            return side_para
        }
    });
    Object.defineProperty(config, 'side_out_para', {
        configurable: true,
        set: function (val) {
            side_out_para = val
        },
        get: function () {
            return side_out_para
        }
    });
    Object.defineProperty(config, 'side_open', {
        configurable: true,
        set: function (val) {
            if (val) {
                $('html,body').addClass('over')
                $(".shandow").removeClass('hidden')
                $("#side-choose").addClass('open')
            } else {
                $("#side-choose").addClass('close')
                setTimeout(function () {
                    $('html,body').removeClass('over')
                    $(".shandow").addClass('hidden')
                    $("#side-choose").removeClass('open close')
                }, 400)
            }
            side_open = val
        },
        get: function () {
            return side_open
        }
    });
    Object.defineProperty(config, 'choose_side', {
        configurable: true,
        set: function (val) {
            $(".kind-box .kind-name,.kind-box .kind-list").addClass('no-show');
            $(".filter-kind").removeClass('choose-filter');
            if (val == 0) {
                config.side_name = "hunfu";
                $(".kind-box .kind-name.all,.kind-box .kind-list.all").removeClass('no-show');
            }
            if (val == 1) {
                config.side_name = "hunsha"
                $(".kind-box .kind-name.wed,.kind-box .kind-list.wed").removeClass('no-show')
            }
            if (val == 2) {
                config.side_name = "lifu"
                $(".kind-box .kind-name.dre,.kind-box .kind-list.dre").removeClass('no-show')
            }
            $(".filter-kind").each(function () {
                if ($(this).data("filter") == val) {
                    $(this).addClass('choose-filter')
                }
            });
            choose_side = val
        },
        get: function () {
            return choose_side
        }
    });
    Object.defineProperty(config, 'side_name', {
        configurable: true,
        set: function (val) {
            side_name = val
        },
        get: function () {
            return side_name
        }
    });
    Object.defineProperty(config, 'outside_name', {
        configurable: true,
        set: function (val) {
            outside_name = val
        },
        get: function () {
            return outside_name
        }
    });
    //筛选栏参数
    function mySorter(a, b) {
        var _a = a.match(/^[a-z]/)[0]
        var _b = b.match(/^[a-z]/)[0]
        var num_a = parseInt(a.match(/\d+/)[0])
        var num_b = parseInt(b.match(/\d+/)[0])
        if (_a == _b) {
            return num_a > num_b ? 1 : (num_a == num_b ? 0 : -1);
        }
        return _a > _b ? 1 : (_a == _b ? 0 : -1);
    };
    //查询数量接口
    function findcount() {
        $.ajax({
            url: '/api/h5/wedding_dress/GetWeddingDressListCount',
            type: 'POST',
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({
                search_kind: config.side_name,
                select_parameter_string: config.side_out_para.sort(mySorter).join('')
            }),
            success: function (msg) {
                var num = "确定(有" + msg.resp.count + "个结果)";
                $(".make_sure").text(num)
            }
        })
    }

    //参数初始化
    $(".remove_id").addClass('choose-side');
    if (location.pathname.indexOf('lifu') > -1) {
        config.outside_name = 'lifu';
        config.choose_side = 2;
    } else if (location.pathname.indexOf('hunsha') > -1) {
        config.outside_name = 'hunsha';
        config.choose_side = 1;
    } else if (location.pathname.indexOf('hunfu') > -1) {
        config.outside_name = 'hunfu';
        config.choose_side = 0;
    } else {
        config.outside_name = 'hunfu';
        config.choose_side = 0;
    }
    if ($("#parameter").val() == "") {
        config.side_out_para = [];
        config.side_para = [];
    } else {
        config.side_out_para = $("#parameter").val().match(/[a-z]{1}\d+/g).sort(mySorter);
        config.side_para = $("#parameter").val().match(/[a-z]{1}\d+/g).sort(mySorter);
    }
    config.side_para.forEach(function (value, index, array) {
        switch (true) {
            case /^[a-q,s-z]/.test(value):
                if (value == 's2') {
                    $(".Lease.search").addClass('islease')
                }
                var choose_sha = false;
                if (value == "d4" || value == 'd5') {
                    choose_sha = true
                }
                $(".side-choose .kind-list>li").each(function () {
                    if ($(this).data('id') == value) {
                        $(this).parent().children('.remove_id').removeClass('choose-side');
                        $(this).addClass('choose-side');
                    }
                    if ($(this).data('id') == 'd4,d5' && choose_sha) {
                        $(this).addClass('choose-side')
                    }
                });
                if (sessionStorage.getItem("outside") == 'true' && config.side_para.length <= 3) {
                    $(".choose-box .choose-kind>li").each(function () {
                        if ($(this).data('id') == value) {
                            $(this).addClass('choose-side')
                        }
                    })
                }
                break;
            case /^r/.test(value):
                if (value == 'r2') {
                    $(".Intelligence .choose").text('价格从低到高');
                } else {
                    $(".Intelligence .choose").text('价格从高到低');
                }
                var c = config.side_out_para.indexOf(value);
                if (c > -1) {
                    config.side_out_para.splice(c, 1);
                }
                break;
            default:
                break;
        }
    });
    //执行动作
    //热度排序
    $(".dm-choose .Intelligence").on('click', function (event) {
        $(".Intelligence .detail").toggleClass("hidden");
    });
    $(".Intelligence .detail span").on('click', function (event) {
        event.stopPropagation();
        var arr = ['r1', 'r2'];
        arr.forEach((a) => {
            var c = config.side_para.indexOf(a);
            if (c > -1) {
                config.side_para.splice(c, 1);
            }
        });
        if ($(this).data("ordertype")) {
            config.side_para.push($(this).data("ordertype"))
        }
        if (config.side_para.length == 0) {
            location.href = "/" + config.outside_name + "/";
        } else {
            location.href = "/" + config.outside_name + "/" + config.side_para.sort(mySorter).join('') + "/";
        }
        return false;
    });
    //是否租赁
    $(".Lease").on('click', function (event) {
        if ($(this).hasClass('islease')) {
            var c = config.side_para.indexOf('s2');
            console.log(c+"ha")
            if (c > -1) {
                config.side_para.splice(c, 1);
            }
        } else {
            config.side_para.push('s2')
        }

        if (config.side_para.length == 0) {
            location.href = "/" + config.outside_name + "/";
        } else {
            location.href = "/" + config.outside_name + "/" + config.side_para.sort(mySorter).join('') + "/";
        }
    });
    //开关侧栏
    $(".condition,.open_side").on('click', function (event) {
        $(".detail").addClass('hidden');
        config.side_open = true;
        findcount()
    });
    $(".shandow").on('touchstart',function(event){
        config.side_open = false;
        event.preventDefault();
    });
    //外部参数选择
    $(".choose-box .choose-kind>li").on('click', function (event) {
        if ($(this).data("id") && sessionStorage.getItem("outside") == 'false') {
            sessionStorage.setItem("outside", true);
            location.href = "/" + config.outside_name + "/" + $(this).data("id") + "/";
        } else if ($(this).data("id") && sessionStorage.getItem("outside") == null) {
            var notsimple = false;
            var r_num = 0;
            for (var i = 0; i < config.side_para.length; i++) {
                if (/^[^rs]/.test(config.side_para[i])) {
                    notsimple = true
                }
                if (/^[r]/.test(config.side_para[i])) {
                    r_num += 1
                }
            }
            if (notsimple && side_para.length <= 2 && r_num < 2) {
                sessionStorage.setItem("outside", true);
                location.href = "/" + config.outside_name + "/" + $(this).data("id") + "/";
            } else {
                sessionStorage.setItem("outside", true);
                config.side_para.push($(this).data("id"));
                location.href = "/" + config.outside_name + "/" + config.side_para.sort(mySorter).join('') + "/";
            }
        } else if ($(this).data("id") && sessionStorage.getItem("outside") == 'true' && config.side_para.length <= 3) {
            sessionStorage.setItem("outside", true);
            config.side_para.forEach(function (value, index, array) {
                switch (true) {
                    case /^[at]/.test(value):
                        var c = config.side_para.indexOf(value);
                        if (c > -1) {
                            config.side_para.splice(c, 1);
                        }
                        break;
                    default:
                        break;
                }
            });
            if (!$(this).hasClass('choose-side')) {
                config.side_para.push($(this).data("id"))
            }
            if (config.side_para.length == 0) {
                location.href = "/" + config.outside_name + "/";
            } else {
                location.href = "/" + config.outside_name + "/" + config.side_para.sort(mySorter).join('') + "/";
            }
        } else {
            $(".detail").addClass('hidden');
            config.side_open = true;
            findcount()
        }
    });
    //参数选项卡
    $(".top-choose").on('touchstart', '.filter-kind', function (event) {
        config.choose_side = $(this).data("filter");
        $(".kind-list>li").removeClass('choose-side');
        $(".remove_id").addClass('choose-side');
        config.side_out_para = [];
        findcount();
        event.preventDefault();
    });
    //参数选择
    $(".side-choose .kind-list>li").on('click', function (event) {
        event.preventDefault();
        if (!$(this).hasClass('choose-side') && $(this).data("id")) {
            $(this).parent().children('.remove_id').removeClass('choose-side')
            var arr = String($(this).data('id')).split(',')
            arr.forEach((a) => {
                config.side_out_para.push(a);
            });
        } else if ($(this).hasClass('choose-side') && $(this).data("id")) {
            var arr = String($(this).data('id')).split(',')
            arr.forEach((a) => {
                var c = config.side_out_para.indexOf(a);
                if (c > -1) {
                    config.side_out_para.splice(c, 1);
                }
            });
        }
        $(this).toggleClass('choose-side')
        if ($(this).parent().children('.choose-side').length == 0) {
            $(this).parent().children('.remove_id').addClass('choose-side')
        }
        findcount()
    });
    $(".side-choose .kind-list").on('click', 'li.remove_id', function (event) {
        $(this).parent().children('li').removeClass('choose-side')
        $(this).addClass('choose-side');
        $(this).parent().children('li').each(function () {
            if ($(this).data('id')) {
                var arr = String($(this).data('id')).split(',')
                arr.forEach((a) => {
                    var c = config.side_out_para.indexOf(a);
                    if (c > -1) {
                        config.side_out_para.splice(c, 1);
                    }
                });
            }
        });
        findcount()
    });
    //点击确定
    $(".make_sure").on('click', function (event) {
        sessionStorage.setItem("outside", 'false');
        if (config.side_out_para.length == 0) {
            location.href = "/" + config.side_name + '/';
        } else {
            location.href = "/" + config.side_name + '/' + config.side_out_para.sort(mySorter).join('') + "/";
        }
    });
    //清除数据
    $(".clear").on('click', function (event) {
        $('.side-choose .kind-list>li').removeClass('choose-side');
        $(".remove_id").addClass('choose-side');
        config.side_out_para = [];
        findcount();
    });
});