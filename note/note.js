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
    });
}