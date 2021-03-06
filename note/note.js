// 函数：创建链接对象（名字 + 地址）
function createURL(bURL, bNAME){
	var oURL = new Object;
	oURL.url = bURL;
	oURL.name = bNAME;
	return oURL;
}
var items = [
    new createURL("./database/xf20191207.html", "$ 阿里云服务器+nodejs命令"),
    new createURL("./database/xf20191021.html", "$ glyphicon符号集字典"),
    new createURL("./database/xf20191007.html", "$ WebGL Matrix4对象所支持的方法和属性"),
    new createURL("./database/xf20191005.html", "$ Android 部分依赖项配置"),
    new createURL("./database/xf20190930_3.html", "$ WebGL gl.drawArrays()方法与基本绘图"),
    new createURL("./database/xf20190930_2.html", "$ WebGL 使用缓冲区对象的步骤"),
    new createURL("./database/xf20190930.html", "$ WebGL 语法规范总结"),
    new createURL("./database/xf20190929.html", "$ SQL关系型数据库标准语言 - 数据类型"),
    new createURL("./database/xf20190927_3.html", "$ ArcGIS Engine开发常见问题总结"),
    new createURL("./database/xf20190927_2.html", "$ 在VS中使用C#调用GDAL库的方式"),
    new createURL("./database/xf20190927.html", "$ 配置ArcGIS Runtime SDK for Android")
];


// 脚本入口（html部分完全加载后执行）
window.onload = function(){
    this.Main();
}

// 脚本主函数
function Main(){
    // ArcGIS for JS API 请求
    require([
        "esri/Map",
        "esri/views/SceneView",
        "esri/widgets/Expand"
    ], function(Map, SceneView, Expand){
        // 地图加载
        var map = new Map({
            basemap: "topo-vector"
        });
        var view = new SceneView({
            container: "axSceneView",
            map: map,
            camera: {
                position: {
                    x: 114,
                    y: 20,
                    z: 2500000000000000000
                },
                tilt: 0
            }
        });
        view.watch("stationary", function(isStationary){
            view.camera.position.z = 2500000000000000000;
        });
        view.on("pointer-move", function(evt){
            view.camera.position.z = 2500000000000000000;
        });
        view.when(function(){
            // 关闭地图浏览控件
            var zoom_widget = document.getElementsByClassName("esri-component esri-zoom esri-widget")[0];
            var navigation_toggle_widget = document.getElementsByClassName("esri-component esri-navigation-toggle esri-widget")[0];
            var interactive_widget = document.getElementsByClassName("esri-component esri-compass esri-widget--button esri-widget esri-interactive")[0];
            zoom_widget.remove();
            navigation_toggle_widget.remove();
            interactive_widget.remove();
        });


        var ModuleList = document.createElement("div");
        // ModuleList.style.opacity = "0.9";
        ModuleList.style.fontFamily = "华文楷体";
        ModuleList.style.fontSize = "22px";
        ModuleList.className = "esri-widget esri-component";
        var ModuleBox = document.createElement("div");
        ModuleBox.className = "esri-editor__temp-wrapper";
        // 控件 Header
        var ModuleHeader = document.createElement("div");
        ModuleHeader.className = "esri-editor__header";
        var ModuleHeader_text = document.createElement("h4");
        ModuleHeader_text.className = "esri-editor__title esri-heading";
        ModuleHeader_text.innerHTML = "学 识 归 档";
        ModuleHeader_text.style.fontSize = "22px";
        // 控件 Content
        var ModuleContent = document.createElement("div");
        ModuleContent.className = "esri-editor__content";
        var ModuleSeletor = document.createElement("div");
        ModuleSeletor.className = "esri-editor__mode-selection";
        ModuleSeletor.style.overflow = "auto";
        ModuleSeletor.style.maxHeight = "350px";
        function createModuleItem(){
            var ModuleShow = document.createElement("iframe");
            ModuleShow.style.backgroundColor = "#fff";
            ModuleShow.style.height = "550px";
            ModuleShow.style.width = "520px";
            ModuleShow.frameborder = "0";
            ModuleShow.style.visibility = "hidden";
            // 检测设备源
            if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
                //alert(navigator.userAgent);  
                ModuleShow.style.width = "100%";
                var expand_ModuleShow = new Expand({
                    view: view,
                    content: ModuleShow
                });
                view.ui.add(expand_ModuleShow, "top-right");
            } else {
                view.ui.add(ModuleShow, "top-right");
            };
            for(var i = 0; i < items.length; i++){
                var ModuleItem = document.createElement("div");
                var src = items[i].url;
                ModuleItem.className = "esri-editor__feature-list-item";
                ModuleItem.name = items[i].url;
                ModuleItem.onclick = function(){
                    if(ModuleShow.src != ""){
                        $("iframe").animate({
                            opacity: "0"
                        }, 0.1);
                    }
                    ModuleShow.style.visibility = "visible";
                    ModuleShow.src = this.name;
                    $("iframe").animate({
                        opacity: "0.95"
                    });
                }
                var ModuleItemName = document.createElement("div");
                ModuleItemName.className = "esri-editor__feature-list-name";
                ModuleItemName.innerHTML = items[i].name;
                ModuleItem.appendChild(ModuleItemName);
                
                ModuleSeletor.appendChild(ModuleItem);
            }
        }
        createModuleItem();

        // 检测设备源
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            //alert(navigator.userAgent);  
            ModuleList.style.width = "100%";
            var expand_ModuleList = new Expand({
                view: view,
                content: ModuleList
            });
            view.ui.add(expand_ModuleList, "top-left");
        } else {
            // ModuleList.style.width = width_body * 0.25;
            view.ui.add(ModuleList, "top-left");
        };
        ModuleList.appendChild(ModuleBox);
        ModuleBox.appendChild(ModuleHeader);
        ModuleHeader.appendChild(ModuleHeader_text);
        ModuleBox.appendChild(ModuleContent);
        ModuleContent.appendChild(ModuleSeletor);
        btn_back_home.style.opacity = "0.7";
        view.ui.add(btn_back_home, "bottom-right");

        var form = document.getElementById("form");
        form.style.opacity = "0.3";
        form.onmouseenter = function() {
            $("form").animate({
                opacity: "0.8"
            });
        }
        form.onmouseleave = function() {
            $("form").animate({
                opacity: "0.3"
            });
        }
        view.ui.add(form, "bottom-left");
    });


}