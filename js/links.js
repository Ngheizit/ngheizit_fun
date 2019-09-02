// 生成一个指定范围的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 

// 创建一个链接对象
function createURL(bURL, bNAME, bDescription){
	var oURL = new Object;
	oURL.Url = bURL;
	oURL.name = bNAME;
	oURL.description = bDescription;
	return oURL;
}

var bookmarks = {
	user: [
		createURL("https://g3.luciaz.me/", "Google搜索", "镜像的Google搜索引擎，通过代号“心灵之约”可以实现重定向！"),
		createURL("https://translate.google.cn/", "Google翻译", "Google少有的在大陆不被禁用的网址，好好珍惜哈！"),
		createURL("https://github.com/", "GitHub社区", "著名的996ICU网站就出自这里哈，也是该网站的服务依托，希望不要倒闭啦哈哈哈哈！"),
		createURL("https://sci-hub.tw/", "Sic-Hub", "强大大的外国文献检索引擎？"),
		createURL("https://en.wikipedia.org/wiki/Wikipedia", "Wikipedia", "维基（危机）系列的百度 百科，感受到学习危机了吗，来着吧哈哈哈哈（免费广告）！"),
		createURL("http://www.cnki.net/", "China知网", "趁着还能用校园网，快点下论文呀呀呀呀呀呀！"),
		createURL("https://www.12306.cn/index/", "12306中铁", "来一场说走就走的旅游吗，一起还收藏火车票呀！"),
		createURL("https://outlook.live.com/mail/inbox", "Outlook邮箱", "微软旗下的邮箱，大陆唯一能顺畅使用的国际邮箱啊，珍惜珍惜！"),
		createURL("http://mail.163.com", "163邮箱", "emmmmm,这邮箱在大陆生存得还行吧"),
		createURL("http://www.hebtu.edu.cn","河北师大官网","建站创始人的本科就读院校～")
	],
	coding: [
		createURL("https://unbug.github.io/codelf/", "标识符命名", "代码变量名卡壳解决网站"),
		createURL("http://www.runoob.com/", "菜鸟教程", "编程语言初等入门"),
		createURL("https://www.python-course.eu/index.php", "Tutorials, Python Courses: Online and On Site", "python外文教程"),
		createURL("https://www.python.org/", "Welcome to Python.org", "python官网"),
		createURL("https://www.geeksforgeeks.org/", "GeeksforGeeks", "极客的计算机科学门户网站"),
		createURL("https://www.lfd.uci.edu/~gohlke/pythonlibs", "python第三方库", "手动下载PYTHON包的第三方网站"),
		createURL("http://www.w3school.com.cn/index.html", "w3school 在线教程", "WEB开发教程"),
		createURL("https://www.oracle.com/index.html", "Oracle官网", "忘记是什么东东啦哈哈哈"),
		createURL("https://netbeans.org/downloads/8.2/", "NetBeans IDE 下载", "Java编程环境？"),
		createURL("https://developer.mozilla.org/zh-CN/", "MDN Web 文档", "WEB开发教程"),
		createURL("https://dojotoolkit.org/documentation/", "Dojo教程 - Dojo Toolkit", "ArcGIS API for JavaScript的重要依托")
	],
	mapData: [
		createURL("https://www.openstreetmap.org/", "OpenStreetMap", "开源的全球地理数据共享网，可惜的是中国片区的数据贡献率还是太少了..."),
		createURL("http://webmap.cn/main.do?method=index", "全国地理信息资源目录服务系统", "中国的，分幅的，可以练习数据的拼接操作，我可以批量实现拼接哦，需要的可以联系我哈哈哈哈"),
		createURL("https://freegisdata.rtwilson.com/", "Free GIS Datasets", "可能会有意想不到的收获哦！"),
		createURL("https://ghsl.jrc.ec.europa.eu/", "全球人类住区", "欧洲委员会, 单体数据量好大...下载后显示的时候卡爆了"),
		createURL("http://www.gscloud.cn/", "地理数据云", "下遥感影像数据的，特别是Landset"),
		createURL("https://modis.gsfc.nasa.gov/data/dataprod/mod01.php", "MODIS", "传说中的MODIS数据下载网站，传说"),
		createURL("http://www.glcf.umd.edu/data/", "GLCF", "那啥啥啥，貌似是点云数据处理的python第三方库官网"),
		createURL("https://extract.bbbike.org/", "BBBike extracts OSM", "传说中可以指定范围下载OSM数据的网站，传说"),
		createURL("https://developers.arcgis.com/downloads/apis-and-sdks?product=javascript", "下载| ArcGIS for Developers", "反正是ArcGIS系列很高大上的东西"),
		createURL("http://www.resdc.cn/Default.aspx", "中国科学院资源环境科学数据中心", "普通用户一天只能下5个，呵"),
		createURL("https://earthquake.usgs.gov/earthquakes/search/", "Search Earthquake", "全球地震数据下载网站，很不错，更新神速"),
		createURL("http://data.casearth.cn/", "地球大数据科学工程数据共享服务系统", "潜力很大的地理数据获取网站")
	],
	gisShare: [
		createURL("http://contest.esrichina.com.cn/", "ESRI大赛官网", "灵感源地"),
		createURL("https://pro.arcgis.com/zh-cn/pro-app/help/analysis/geoprocessing/modelbuilder/modelbuilder-tutorial.htm", "模型构建器教程", "ArcGIS Pro | ArcGIS Desktop"),
		createURL("http://ivt.maps.arcgis.com/apps/MapSeries/index.html?appid=9766dba97c954fcaa175da83b72ccf06&adumkts=social&utm_source=social&aduc=social&adum=external&aduSF=facebook&aduca=social_technical&aduco=unlocking_information_imagery_3&aduat=storymap&adbsc=social_20190105_2655151&adbid=6486562228236615680&adbpl=li&adbpr=5311&adbid=10156755029730281&adbpl=fb&adbpr=211211155280", "Unlocking Information from Imagery in ArcGIS", "？？？未知东东"),
		createURL("https://www.gislounge.com/", "GISLounge", "灵感源地"),
		createURL("http://pro.arcgis.com/zh-cn/pro-app/tool-reference/main/arcgis-pro-tool-reference.htm", "ArcToolBoxs", "ArcGIS工具箱参考手册"),
		createURL("http://html.rhhz.net/CHXB/html/2017-11-1919.htm", "加权泰森多边形", "神奇的东东"),
		createURL("http://zhihu.esrichina.com.cn/", "ArcGIS知乎", "ArcGIS技术交流平台"),
		createURL("https://www.nasa.gov/", "NASA", "也是神奇的东东"),
		createURL("https://www.gislounge.com/using-gis-in-golf-management/", "在高尔夫管理中使用GIS", "神奇的东东"),
		createURL("https://www.gislounge.com/web-based-gis/", "基于Web的GIS", "神奇的东东"),
		createURL("https://www.geography.com/", "地理| 我们的世界科学", "神奇的东东"),
		createURL("https://gis.stackovernet.com/", "Stack Overnet：gis", "神奇的东东"),
		createURL("https://earthobservatory.nasa.gov/", "NASA Earth Observatory - Home", "神奇的东东"),
		createURL("https://developers.arcgis.com/javascript/", "ArcGIS API for JavaScript", "WebGIS强大的API"),
		createURL("https://gis.3nice.cc/cn/index.html", "GIS.3nice.cc", "地理信息网站导航"),
		createURL("https://openlayers.org/", "OpenLayers - Welcome", "WebGIS强大的API"),
		createURL("https://www.esri.com/arcgis-blog/products/arcgis-online/mapping/smart-choices-for-basemaps-and-color-ramps-when-mapping-demographic-data/","地图的底图和颜色渐变选择","一片很有趣的GIS地图制图技巧文章"),
		createURL("https://developers.arcgis.com/labs/", "ArcGIS API for Developers", "GIS开发的样式档案"),
		createURL("http://www.mnr.gov.cn/zt/ch/sbh_30619/gjbtzs/", "国家版图知识", "发布于中国自然资源部网站"),
		createURL("http://bzdt.ch.mnr.gov.cn/index.jsp", "标准地图服务", "标准的世界地图和中国地图图片"),
		createURL("http://dtsc.sbsm.gov.cn/dtsc/", "地图技术审查中心", "发布于国家测绘地理信息局"),
		createURL("http://kmap.ckcest.cn/", "地理信息专业知识服务系统", "地图知识"),
		createURL("https://www.gps.gov/systems/gps/space/", "GPS卫星星座当前状态参阅网站", "GPS")
	],
	elses: [
		createURL("http://gaohr.win/", "GaoHR | Homepage", "一位GIS领域的人物的个人网站"),
		createURL("https://www.csdn.net/", "CSDN", "IT博客"),
		createURL("https://www.oschina.net/", "OSCHINA", "IT博客"),
		createURL("https://www.cnblogs.com/", "CNBLOGS", "IT博客"),
		createURL("http://ac.scmor.com/", "Google镜像", "Google学术和Google搜索的镜像网站导览"),
		createURL("https://vvp0.499994.xyz/googlebak.html", "Google镜像", "Google学术和Google搜索的镜像网站导览"),
		createURL("https://www.fbi.gov/", "Welcome to FBI.gov — FBI", "联邦调查局？？？"),
		createURL("https://www.geogebra.org/graphing?lang=zh-CN", "图形计算器 - GeoGebra", "神奇的东东"),
		createURL("https://tuna.moe/", "清华大学 TUNA 协会 - Home", "清华镜像？？？"),
		createURL("https://www.ireus.uni-stuttgart.de/Internationales/WorldRiskIndex", "世界风险指数| 空间规划与发展规划研究所| 斯图加特大学", "神奇的东东"),
        createURL("https://github.com/PKUanonym/REKCARC-TSC-UHT","清华计算机系课程资源","github资源"),
        createURL("https://qsctech.github.io/zju-icicles/","浙大课程资源","github资源"),
        createURL("https://github.com/USTC-Resource/USTC-Course","中科大课程资源","github资源"),
        createURL("https://github.com/CoolPhilChen/SJTU-Courses","上交大课程资源","github资源")
	]
};

function createbox(i, classBM, idBM){
	var bookmarks_div = document.getElementById(idBM);
	bookmarks_div.setAttribute('class','bookmarks clearfix');
	var bdiv = document.createElement("div");
	bdiv.setAttribute('class', 'box clearfix');
	bdiv.style.cursor = "pointer";
	var bName = document.createElement("div");
	bName.setAttribute('class', 'name')
    var bDescription = document.createElement("div");
    bdiv.style.color = "#FFFFFF";
	bDescription.setAttribute('class', 'description')
	bName.innerHTML = classBM[i].name;
	bDescription.innerHTML = classBM[i].description;
	bdiv.appendChild(bName);
	bdiv.appendChild(bDescription);
	bdiv.onclick = function(){
		window.open(classBM[i].Url);
	};
	bdiv.onmousemove = function(){
		bdiv.style.backgroundImage = "linear-gradient(225deg, #A8BFFF 0%, purple 100%)";
		bdiv.style.color = "yellow";
		bDescription.style.visibility = ' hidden';
		bName.style.position = "relative";
		bName.style.textAlign = "center";
		bName.style.top = "7px";
		if(bName.innerText == classBM[i].name)
		bName.innerText = emoticons[randomNum(0, emoticons.length-1)] + classBM[i].name + emoticons[randomNum(0, emoticons.length-1)];
	};
	bdiv.onmouseleave = function(){
		bdiv.style.backgroundImage = "linear-gradient(225deg, #333333 100%, #333333 100%)";
		bdiv.style.color = "#FFFFFF";
		bDescription.style.visibility = 'visible';
		bName.style.textAlign = "left";
		bName.style.top = "0px";
		bName.innerText = classBM[i].name;
	};
	
	bookmarks_div.appendChild(bdiv);
}


for(var i = 0; i < bookmarks.user.length; i++){
	createbox(i, bookmarks.user, "bookmarks_user");
}
for(var i = 0; i < bookmarks.coding.length; i++){
	createbox(i, bookmarks.coding, "bookmarks_coding");
}
for(var i = 0; i < bookmarks.mapData.length; i++){
	createbox(i, bookmarks.mapData, "bookmarks_mapData");
}
for(var i = 0; i < bookmarks.gisShare.length; i++){
	createbox(i, bookmarks.gisShare, "bookmarks_gisShare");
}
for(var i = 0; i < bookmarks.elses.length; i++){
	createbox(i, bookmarks.elses, "bookmarks_elses");
}
























var emoticons = [
	"😀",
	"😁",
	"😂",
	"🤣",
	"😃",
	"😄",
	"😅",
	"😆",
	"😉",
	"😊",
	"😋",
	"😎",
	"😍",
	"😘",
	"😗",
	"😙",
	"😚",
	"🙂",
	"🤗",
	"🤩",
	"🤔",
	"🤨",
	"😐",
	"😑",
	"😶",
	"🙄",
	"😏",
	"😣",
	"😥",
	"😮",
	"🤐",
	"😯",
	"😪",
	"😫",
	"😴",
	"😌",
	"😛",
	"😜",
	"😝",
	"🤤",
	"😒",
	"😓",
	"😔",
	"😕",
	"🙃",
	"🤑",
	"😲",
	"☹",
	"🙁",
	"😖",
	"😞",
	"😟",
	"😤",
	"😢",
	"😭",
	"😦",
	"😧",
	"😨",
	"😩",
	"🤯",
	"😬",
	"😰",
	"😱",
	"😳",
	"🤪",
	"😵",
	"😠",
	"😡",
	"🤬",
	"🤥",
	"🤡",
	"🤠",
	"😇",
	"🤧",
	"🤮",
	"🤢",
	"🤕",
	"🤒",
	"😷",
	"🤫",
	"🤭",
	"🧐",
	"🤓",
	"😈",
	"👿",
	"👹",
	"👺",
	"💀",
	"☠",
	"😼",
	"😻",
	"😹",
	"😸",
	"😺",
	"💩",
	"🤖",
	"👾",
	"👽",
	"👻",
	"😽",
	"🙀",
	"😿",
	"😾",
	"🐱",
	"👤",
	"🐱",
	"🏍",
	"🐱‍",
	"💻",
	"🐱",
	"🐉",
	"🐱",
	"👓",
	"🐱‍",
	"🚀",
	"🦒",
	"🐯",
	"🐱",
	"🦁",
	"🐺",
	"🐶",
	"🐵",
	"🙊",
	"🙉",
	"🙈",
	"🦊",
	"🐮",
	"🐷",
	"🐗",
	"🐭",
	"🐹",
	"🐰",
	"🐻",
	"🐨",
	"🐼",
	"🦌",
	"🐩",
	"🐾",
	"🐽",
	"🐲",
	"🐔",
	"🦄",
	"🐴",
	"🦓",
	"🐸",
	"🦍",
	"🦏",
	"🐒",
	"🐕",
	"🐈",
	"🐅",
	"🐆",
	"🐎",
	"🐂",
	"🐃",
	"🐀",
	"🐁",
	"🐘",
	"🐫",
	"🐪",
	"🐐",
	"🐑",
	"🐏",
	"🐖",
	"🐄",
	"🦔",
	"🐇",
	"🐿",
	"🦎",
	"🐊",
	"🐢",
	"🐍",
	"🐉",
	"🦕",
	"🦖",
	"🐙",
	"🐡",
	"🦐",
	"🐠",
	"🐟",
	"🐋",
	"🐳",
	"🦑",
	"🐬",
	"🦈",
	"🐚",
	"🦀",
	"🦅",
	"🦆",
	"🦉",
	"🦃",
	"🐓",
	"🐣",
	"🐤",
	"🐥",
	"🐝",
	"🐜",
	"🦗",
	"🐛",
	"🐌",
	"🦋",
	"🦇",
	"🕊",
	"🐧",
	"🐦",
	"🐞",
	"🦂",
	"🕷",
	"🕸"
];