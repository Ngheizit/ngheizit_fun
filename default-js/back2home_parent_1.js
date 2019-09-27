var btn_back_home = document.createElement("div");
btn_back_home.id = "btn_back_home";
btn_back_home.style.cursor = "pointer";
btn_back_home.style.fontSize = "26px";
btn_back_home.innerHTML = "BACK to HOME";
btn_back_home.onmouseenter = function(){
    btn_back_home.style.color = "#fff";
    btn_back_home.style.backgroundColor = "#333"
}
btn_back_home.onmouseleave = function(){
    btn_back_home.style.color = "#333";
    btn_back_home.style.backgroundColor = "#fff"
}
btn_back_home.onclick = function(){
    window.location = "../index.html";
};
btn_back_home.className = "esri-widget esri-component";
btn_back_home.style.padding = "7px 15px 5px";