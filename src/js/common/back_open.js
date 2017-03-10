$(function () {
	$(".head .logo-box,.head .back-box").on('click',function(event) {
		if(document.referrer.indexOf('menghunli')>-1){
            history.go(-1)
        }else{
            location.href="/"
        }
	});
	var config = {};
	var side_open = false; //侧栏开关
	Object.defineProperty(config, 'side_open', {
	    configurable: true,
	    set: function(val) {
	        if (val) {
	            $(".shandow").removeClass('hidden')
	            $("#nav-choose").addClass('open')
	        } else {
	            $("#nav-choose").addClass('close')
	            setTimeout(function() {
	                $(".shandow").addClass('hidden')
	                $("#nav-choose").removeClass('open close')
	            }, 400)
	        }
	        side_open = val
	    },
	    get: function() {
	        return side_open
	    }
	});
	$(".head .nav").on('click', function(event) {
	    config.side_open = true;
	});
	$(".shandow").on('click', function(event) {
	    config.side_open = false;
	});
})