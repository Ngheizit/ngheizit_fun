// 函数：创建链接对象（名字 + 地址）
function createURL(bURL, bNAME){
	var oURL = new Object;
	oURL.url = bURL;
	oURL.name = bNAME;
	return oURL;
}

// 链接集合
var items_n_e = [
    new createURL("note/note.html", "🌏 学识归档 🌏"),
    new createURL("MaySaying.html", "🌏 地图留言板 🌏"),
    new createURL("#", ""),
    new createURL("https://g3.luciaz.me/", "Google"),
    new createURL("https://translate.google.cn/", "Translate"),
    new createURL("Older/index.html", "个人网站(旧)入口1"),
    new createURL("https://ngheizit.github.io/winner", "个人网站(旧)入口2"),
    new createURL("https://ngheizit.github.io/win", "个人网站(旧)入口3"),
];
var items_n_w = [
    new createURL("https://github.com/", "Github"),
    new createURL("https://outlook.live.com/mail/inbox", "Outlook"),
    new createURL("http://mail.163.com", "163"),
    new createURL("#", ""),
    new createURL("http://www.cnki.net/", "CHKI"),
    new createURL("https://sci-hub.tw/", "Sic-Hub"),
    new createURL("https://en.wikipedia.org/wiki/Wikipedia", "Wikipedia"),
    new createURL("#", ""),
    new createURL("http://gaohr.win/", "GaoHR | Homepage"),
    new createURL("https://3nice.cc/", "3NICE"),
    new createURL("#", ""),
    new createURL("http://www.hebtu.edu.cn", "Hebei Normal University"),
    new createURL("https://www.12306.cn/", "12306"),
    new createURL("https://www.pnglot.com/", "PNGs"),
    new createURL("https://www.zamzar.com/convert/png-to-ico/", "PNG to icon")
];
var items_s_e = [
    new createURL("https://unbug.github.io/codelf/", "Code Name Search"),
    new createURL("http://www.runoob.com/", "Runnoob"),
    new createURL("http://www.w3school.com.cn/index.html", "W3School"),
    new createURL("http://www.android-studio.org/index.php/download/hisversion", "Android Studio China"),
    new createURL("https://developer.android.google.cn/", "Android Developer"),
    new createURL("#", ""),
    new createURL("https://www.openstreetmap.org/", "Openstreetmap"),
    new createURL("http://webmap.cn/main.do?method=index", "全国地理信息资源目录服务系统"),
    new createURL("https://freegisdata.rtwilson.com/", "ree GIS Datasets"),
    new createURL("http://www.gscloud.cn/", "地理数据云"),
    new createURL("http://www.resdc.cn/Default.aspx", "中国科学院资源环境科学数据中心"),
    new createURL("http://data.casearth.cn/", "地球大数据科学工程数据共享服务系统")
]
var items_s_w = [
    new createURL("https://developers.arcgis.com/", "ArcGIS for developers"),
    new createURL("https://www.esri.com/arcgis-blog/overview/", "ArcGIS Blog"),
    new createURL("http://contest.esrichina.com.cn/", "Esri Contest"),
    new createURL("https://www.gislounge.com/", "GISLounge"),
    new createURL("http://zhihu.esrichina.com.cn/", "ArcGIS Zhihu"),
    new createURL("https://www.nasa.gov/", "NASA"),
    new createURL("https://openlayers.org/", "OpenLayers"),
    new createURL("#", ""),
    new createURL("http://www.mnr.gov.cn/zt/ch/sbh_30619/gjbtzs/", "国家版图知识"),
    new createURL("http://bzdt.ch.mnr.gov.cn/index.jsp", "标准地图服务"),
    new createURL("http://dtsc.sbsm.gov.cn/dtsc/", "地图技术审查中心"),
    new createURL("http://kmap.ckcest.cn/", "地理信息专业知识服务系统"),
    new createURL("https://www.gps.gov/systems/gps/space/", "GPS卫星星座当前状态参阅网站")
]

// 脚本入口（html部分完全加载后执行）
window.onload = function(){
    this.Main();
}

// 脚本主函数
function Main(){
    // ArcGIS for JS API 请求
    require([
        "esri/WebScene",
        "esri/views/SceneView",
        "esri/widgets/Expand"
    ], function(WebScene, SceneView, Expand){
        // 地图加载
        var scene = new WebScene({
            portalItem: {
                id: "aea83120c07947f4b5305ffc499fd08b"
              }
        });
        var view = new SceneView({
            container: "axSceneView",
            map: scene,
            camera: {
                position: {
                    x: 114,
                    y: 20,
                    z: 25000000
                },
                tilt: 0
            }
        });

        // 自定义控件
        var ModuleList = document.createElement("div");
        ModuleList.style.fontFamily = "华文楷体";
        ModuleList.style.fontSize = "22px";
        ModuleList.className = "esri-widget esri-component";
        var ModuleContent = document.createElement("div");
        ModuleContent.className = "esri-editor__temp-wrapper";
        // 控件 Header
        var ModuleHeader = document.createElement("div");
        ModuleHeader.className = "esri-editor__header";
        var ModuleHeader_text = document.createElement("h4");
        ModuleHeader_text.className = "esri-editor__title esri-heading";
        ModuleHeader_text.innerHTML = "Ngheizit's GIS world";
        // 控件 Content
        var ModuleSeletor_bg = document.createElement("div");
        ModuleSeletor_bg.className = "esri-editor__content";
        var ModuleSeletor = document.createElement("div");
        ModuleSeletor.className = "esri-editor__mode-selection";
        ModuleSeletor.style.height = "200px";
        ModuleSeletor.style.minHeight = "100px";
        ModuleSeletor.style.overflow = "auto";
        function createModuleItem(items){
            try{
                var childs = ModuleSeletor.childNodes;
                var len = childs.length == 0 ? items.length : childs.length;
                for(var i = len - 1; i >= 0; i--){
                    ModuleSeletor.removeChild(childs[i]);
                }
            }catch(e){}
            for(var i = 0; i < items.length; i++){
                var ModuleItem = document.createElement("a");
                ModuleItem.className = "esri-editor__feature-list-item";
                var ModuleItemName = document.createElement("div");
                ModuleItemName.className = "esri-editor__feature-list-name";
                ModuleItemName.innerHTML = items[i].name;
                if(items[i].name == ""){
                    ModuleItem.style.background = "linear-gradient(to right, #999, #fff)";
                }
                ModuleItem.href = items[i].url;
                ModuleItem.appendChild(ModuleItemName);
                
                ModuleSeletor.appendChild(ModuleItem);
            }
        } // 循环载入链接集
        createModuleItem(items_n_e);

        ModuleList.appendChild(ModuleContent);
        ModuleContent.appendChild(ModuleHeader);
        ModuleHeader.appendChild(ModuleHeader_text);
        ModuleContent.appendChild(ModuleSeletor_bg);
        ModuleSeletor_bg.appendChild(ModuleSeletor);



        // 检测设备源
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            //alert(navigator.userAgent);  
            ModuleList.style.width = "100%";
            ModuleSeletor.style.height = "100%";
            var expand_ModuleList = new Expand({
                view: view,
                content: ModuleList
            });
            view.ui.add(expand_ModuleList, "top-right");
        } else {
            ModuleList.style.width = "250px";
            view.ui.add(ModuleList, "top-right");
        };
        function showCoordinates(pt){
            // 中点：-70, 0 ; 70, 0
            var lon = pt.longitude.toFixed(3); // 经度
            var lat = pt.latitude.toFixed(3); // 纬度
            if(lat >= 0){ // 北半球
                if(lon < -20 || lon > 160){ // 西半球
                    items = items_n_w;
                }else{ // 东半球
                    items = items_n_e;
                }
            }else{ // 南半球
                if(lon < -20 || lon > 160){ // 西半球
                    items = items_s_w;
                }else{ // 东半球
                    items = items_s_e;
                }
            }
            createModuleItem(items);
            if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                var height = 750 * Math.abs(lat)/ 90;
                height = Math.round(height);
                $(".esri-editor__mode-selection").animate({
                    height: height
                });
            }
        }
        view.watch("stationary", function(isStationary){
            showCoordinates(view.center);
        });

        var ModuleList2 = document.createElement("div");
        ModuleList2.style.fontFamily = "华文楷体";
        ModuleList2.style.fontSize = "22px";
        ModuleList2.className = "esri-widget esri-component";
        ModuleList2.style.textAlign = "center";
        var ModuleBox = document.createElement("div");
        ModuleBox.className = "esri-editor__temp-wrapper";
        // 控件 Header
        var ModuleHeader = document.createElement("div");
        ModuleHeader.className = "esri-basemap-gallery esri-widget esri-widget--panel-height-only";
        var img = document.createElement("img");
        img.src = "./default-img/infomation.jpg";
        img.style.width = "100px";
        img.style.marginTop = "10px";
        var info = document.createElement("div");
        info.innerHTML = "🏬 Studying from school"
        info.style.textAlign = "center";
        info.style.margin = "10px"; 
        var info2 = document.createElement("div");
        info2.innerHTML = "🐱‍👤 希浙 加油 ( •̀ ω •́ )y"
        info2.style.textAlign = "center";
        info2.style.margin = "10px"; 
        var info3 = document.createElement("div");
        info3.innerHTML = "🏩 河北师范大学资源与环境科学学院"
        info3.style.textAlign = "center";
        info3.style.margin = "10px"; 
        var info4 = document.createElement("div");
        info4.innerHTML = "🗺 Now: 河北石家庄; Home: 广东佛山"
        info4.style.textAlign = "center";
        info4.style.margin = "10px"; 
        var info5 = document.createElement("a");
        info5.style.display = "block";
        info5.href = "https://github.com/Ngheizit"
        info5.innerHTML = "👀 Github - Ngheizit"
        info5.style.textAlign = "center";
        info5.style.margin = "10px"; 
        info5.style.color = "#007ACC";
        info5.onmouseenter = function(){
            info5.style.textDecoration = "underine";
        };
        info5.onmouseleave = function(){
            info5.style.textDecoration = "none";
        };
        var info6 = document.createElement("div");
        info6.innerHTML = "🖨 ngheizitgis@outlook.com";
        info6.style.textAlign = "center";
        info6.style.margin = "10px"; 



        ModuleList2.appendChild(ModuleBox);
        ModuleBox.appendChild(ModuleHeader);
        ModuleHeader.appendChild(img);
        ModuleHeader.appendChild(info);
        ModuleHeader.appendChild(info2);
        ModuleHeader.appendChild(info3);
        ModuleHeader.appendChild(info4);
        ModuleHeader.appendChild(info5);
        ModuleHeader.appendChild(info6);
        var expand_ModuleList2 = new Expand({
            view: view,
            content: ModuleList2
        });
        view.ui.add(expand_ModuleList2, "bottom-left");

    });
}

