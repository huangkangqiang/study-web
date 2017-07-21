// 设置侧边栏点击展开按钮
$(function(){
    $(".toggle-sidebar")
        .click(function(){
            toggleSideBar();
        });
});
// 设置侧边栏状态
function toggleSideBar(){
    if($("#page-wrapper").hasClass("show-sidebar")){//如果侧边栏处于展开状态，移除show-sidebar，即可收缩侧边栏
        $("#page-wrapper").removeClass("show-sidebar");
    }else{
        $("#page-wrapper").addClass("show-sidebar");//如果侧边栏处于收缩状态，则添加show-sidebar，即可展开侧边栏
    }
}