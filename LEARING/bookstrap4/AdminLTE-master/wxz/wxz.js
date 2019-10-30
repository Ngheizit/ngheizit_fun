window.onload = function(){

    // css
    let content = document.querySelectorAll('.content-wrapper')[0];
    console.log(content.offsetHeight);
    document.getElementById('axMapView').style.height = content.offsetHeight + 'px';
    console.log(document.getElementById('axMapView'));

    this.Main();
}
function Main(){
    require(["esri/Map", "esri/views/MapView"],function(Map, MapView){
    
        var map = new Map({
            basemap: "streets"
        });
        var view = new MapView({
            container:"axMapView",
            map:map,
            zoom:  4,
            center:[15,65]
        });

    });
}