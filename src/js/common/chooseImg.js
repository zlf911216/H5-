/**
 * Created by YYBJ on 2017/1/10.
 */
function kind(val){
    var width = document.body.clientWidth
    if(val.indexOf('.gif')>-1){
        return val+'@!gif'
    }else {
        return val+'@!640_db'
    }
}
$(".choose-img").each(function(){
    var now_url=$(this).data('src');
    if($(this).data('water')==1){
        var water='_w';
    }else{
        var water='';
    }
    var change_url=kind(now_url)
    $(this).attr("src",change_url+water);
})


/*首页产品*/
function kindproduct(val){
    var width = document.body.clientWidth
    if(val.indexOf('.gif')>-1){
        return val+'@!gif'
    }else {
        return val+'@!200x300'
    }
}
$(".chooseproduct-img").each(function(){
    var now_url=$(this).data('src');
    if($(this).data('water')==1){
        var water='_w';
    }else{
        var water='';
    }
    var change_url=kindproduct(now_url)
    $(this).attr("src",change_url+water);
})
/*end*/

/*产品列表页*/
function kindList(val){
    var width = document.body.clientWidth
    if(val.indexOf('.gif')>-1){
        return val+'@!gif'
    }else {
        return val+'@!300x200'
    }
}
$(".chooselist-img").each(function(){
    var now_url=$(this).data('src');
    var change_url=kindList(now_url)
    $(this).attr("src",change_url);
})
/*end*/
