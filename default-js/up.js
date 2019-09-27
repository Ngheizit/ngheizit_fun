window.onload = function(){
    var body = document.body;
    body.style.position = "relative";
    body.style.left = "0";
    
    var up = document.createElement("a");
    up.href = "#title";
    up.style.height = "25px";
    up.style.width = "25px";
    up.style.position = "fixed"
    up.style.left = "90%";
    up.style.top = "90%";
    up.style.zIndex = "2";
    up.style.backgroundColor = "#000";
    up.style.opacity = "0.3";
    up.innerHTML = "☝";
	up.style.cursor = "pointer";
    up.style.textAlign = "center";
    up.onmouseenter = function(){
        up.style.opacity = "1";
    };
    up.onmouseleave = function(){
        up.style.opacity = "0.3";
    };
    body.appendChild(up);
}