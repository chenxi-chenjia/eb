     
$(function(){
    // 商标注册常见问题
    if($('#issueList').length>0){
        $("#issueList").slide({
            interTime: 30000,
            titCell: ".hd ul",
            mainCell: ".bd ul",
            autoPage: true,
            effect: "left",
            autoPlay: true,
            scroll: 4,
            vis: 4,
            delayTime: 1000
        });
    }
    function banner_slide(){
        var fa=$('#demark-banner');
        var flag=true;
        $('.slide-button',fa).on('click',function(){
            $('.slide-box').slideToggle();
            if(flag){
                $('input',fa).css('borderBottomLeftRadius','0')
            }else{
                $('input',fa).css('borderBottomLeftRadius','4px')
            }
            flag=!flag;
        })
        $(document).on('click',function(){
            $('.slide-box').slideUp();
        })
        $('.input-box',fa).on('click',function(){
            return false;
        })
    }
    if($('#demark').length>0){
        banner_slide();
    }
         
})
    