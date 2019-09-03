function createBlogObjext(title, subtitle, keywords, url, emoticons, time){
    var oBlog = new Object;
    oBlog.title = title;
    oBlog.subtitle = subtitle;
    oBlog.keywords = keywords;
    oBlog.url = url;
	oBlog.emoticons = emoticons;
	oBlog.time = time;
    return oBlog;
}
function createBox(blogObj){
    var content = document.getElementById("content");
	var blogBox = document.createElement("div");
	blogBox.setAttribute("class", "blogbox");
    blogBox.style.cssFloat = "left";
    blogBox.style.width = "46%";
    blogBox.style.height = "126px";
	blogBox.style.margin = "1%";
	blogBox.style.position = "relative";
	blogBox.onclick = function(){
		window.open(blogObj.url, "_self");
	};

	var bEmoticons = document.createElement("span");
	bEmoticons.innerHTML = blogObj.emoticons;
	bEmoticons.style.display = "inline-block";
	bEmoticons.style.width = "90px";
	bEmoticons.style.height = "90px";
	bEmoticons.style.fontSize = "64px";
	bEmoticons.style.position = "absolute";
	bEmoticons.style.top = "17px";
	bEmoticons.style.left = "15px";
	bEmoticons.style.border = "#A9A9A9 1px solid";
	blogBox.onmouseenter = function(){
		bEmoticons.innerText = emoticons[randomNum(0, emoticons.length-1)];
	}

	var bTitle = document.createElement("span");
	bTitle.innerHTML = blogObj.title;
	bTitle.style.position = "absolute";
	bTitle.style.top = "10px";
	bTitle.style.left = "120px";
	bTitle.style.fontSize = "22px";
	bTitle.style.fontStyle = "华文楷体";

	var bSubtitle = document.createElement("span");
	bSubtitle.innerHTML = blogObj.subtitle;
	bSubtitle.style.position = "absolute";
	bSubtitle.style.top = "40px";
	bSubtitle.style.left = "125px";
	bSubtitle.style.fontSize = "16px";
	bSubtitle.style.color = "#AFB0B4"
	bSubtitle.style.fontStyle = "华文楷体";

	var bTime = document.createElement("div");
	bTime.innerHTML = "⏰" + blogObj.time;
	bTime.style.display = "inline-block";
	bTime.style.position = "absolute";
	bTime.style.top = "15px";
	bTime.style.left = "78%";
	bTime.style.fontSize = "14px";
	bTime.style.color = "#AFB0B4"
	bTime.style.fontStyle = "华文楷体";

	var bKeyword = document.createElement("div");
	for(var i = 0; i < blogObj.keywords.length; i++){
		var word = document.createElement("span");
		word.innerHTML = blogObj.keywords[i];
		word.style.marginRight = "5px";
		word.style.padding = "1px 2px";
		word.style.borderRadius = "25px";
		word.style.backgroundColor = "#EFEFEF";
		bKeyword.append(word);
	}
	bKeyword.style.display = "inline-block";
	bKeyword.style.position = "absolute";
	bKeyword.style.top = "80%";
	bKeyword.style.left = "50%";
	bKeyword.style.fontSize = "12px";
	bKeyword.style.color = "#AFB0B4"
	bKeyword.style.fontStyle = "华文楷体";
	
	blogBox.appendChild(bEmoticons);
	blogBox.appendChild(bTitle);
	blogBox.appendChild(bSubtitle);
	blogBox.appendChild(bTime);
	blogBox.appendChild(bKeyword);
    content.appendChild(blogBox);
}


window.onload = function(){
    var blogList = [
		createBlogObjext("ArcGIS Engine | 唯一值符号化", "使用C#和ArcGIS Engine商业组件进行的数据符号化二次开发", ["C#", "ArcGIS Engine", "符号化"], "./sharedir/date/2019-6-20/index.html", emoticons[randomNum(0, emoticons.length-1)], "2019年6月20日"),
        createBlogObjext("图形面积的计算 - 坐标解析法", "利用编程语言实现坐标解析法计算二维图形面积", ["面积度量", "二维平面", "JavaScript"], "./sharedir/date/2019-6-18/index.html", emoticons[randomNum(0, emoticons.length-1)], "2019年6月18日"),
        createBlogObjext("This is my blog's title", "This is my blog's subtitle", ["keyword1", "keyword2", "keyword3"], "../index.html", emoticons[randomNum(0, emoticons.length-1)], "2019年6月18日"),
        createBlogObjext("This is my blog's title", "This is my blog's subtitle", ["keyword1", "keyword2", "keyword3"], "../index.html", emoticons[randomNum(0, emoticons.length-1)], "2019年6月18日")
    ];

    for(var i = 0; i < blogList.length; i++){
        createBox(blogList[i]);
    }


};

































































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