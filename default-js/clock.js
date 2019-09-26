function clock(){
    var $=function(id){return document.getElementById(id)};
    //写入刻度DOM，以及刻度的定位
    function mark(){
        //圆的半径
        var r=parseFloat(window.getComputedStyle?window.getComputedStyle($("clock"),null).width:$("clock").currentStyle["width"])/2;
        //插入DOM
        for(var i=1;i<61;i++){
                $("clock-mark").innerHTML+="<b class='c"+i+"'><i></i></b>";
                var ci=document.getElementsByClassName("c"+i)[0];
                var cii=ci.getElementsByTagName("i")[0];
                //利用正弦定理计算刻度的定位
                ci.style.left=r+r*(Math.sin(i*6*2*Math.PI/360))+"px";
                /*注意正弦的角度制算法和弧度制算法，Math.sin的参数是弧度制算法，所以先把角度转换成弧度，再计算*/
                ci.style.top=r-r*(Math.sin((90-i*6)*2*Math.PI/360))+"px";
                //计算转动的角度
                /*other*/
                ci.style.transform="rotate("+i*6+"deg)";
                /*FF*/
                ci.style.MozTransform="rotate("+i*6+"deg)";
                /*webkit*/
                ci.style.WebkitTransform="rotate("+i*6+"deg)";
                /*opera*/
                ci.style.OTransform="rotate("+i*6+"deg)";
                /*ms*/
                ci.style.msTransform="rotate("+i*6+"deg)";
                //大刻度
                if(i%5==0){
                        ci.className="c"+i+" "+"big-mark";
                        cii.innerHTML=i/5;
                        }
                //小刻度
                else{
                        ci.className="c"+i+" "+"small-mark";
                        ci.removeChild(cii);
                        }
                //把数字转正
                var iRotate=-i*6;
                cii.style.transform="rotate("+iRotate+"deg)";
                cii.style.MozTransform="rotate("+iRotate+"deg)";
                cii.style.WebkitTransform="rotate("+iRotate+"deg)";
                cii.style.OTransform="rotate("+iRotate+"deg)";
                cii.style.msTransform="rotate("+iRotate+"deg)";
        }
    }
    //指针的转动
    function turnR(){
        var d=new Date();
        var h=d.getHours();
        var m=d.getMinutes();
        var s=d.getSeconds();
        var sRadius=360/60*s;
        var mRadius=360/60*m;
        //如果需要分针匀速移动，就赋值var mRadius=360/60*m+360/60/60*s
        var hRadius=360/12*h+30/60*m;
        var ch=$("clock-h");
        var cm=$("clock-m");
        var cs=$("clock-s");
        /*other*/
        ch.style.transform="rotate("+hRadius+"deg)";
        cm.style.transform="rotate("+mRadius+"deg)";
        cs.style.transform="rotate("+sRadius+"deg)";
        /*FF*/
        ch.style.MozTransform="rotate("+hRadius+"deg)";
        cm.style.MozTransform="rotate("+mRadius+"deg)";
        cs.style.MozTransform="rotate("+sRadius+"deg)";
        /*webkit*/
        ch.style.WebkitTransform="rotate("+hRadius+"deg)";
        cm.style.WebkitTransform="rotate("+mRadius+"deg)";
        cs.style.WebkitTransform="rotate("+sRadius+"deg)";
        /*opera*/
        ch.style.OTransform="rotate("+hRadius+"deg)";
        cm.style.OTransform="rotate("+mRadius+"deg)";
        cs.style.OTransform="rotate("+sRadius+"deg)";
        /*ms*/
        ch.style.msTransform="rotate("+hRadius+"deg)";
        cm.style.msTransform="rotate("+mRadius+"deg)";
        cs.style.msTransform="rotate("+sRadius+"deg)";
        setTimeout(turnR,1000);
    }
    //调用函数
    mark();
    turnR();
}


window.onload=clock;