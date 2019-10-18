var app;

window.onload = function(){
    this.Main();
}

function Main(){
    require([
        "esri/Map",
        "esri/views/MapView",
        "esri/views/SceneView",
        "esri/widgets/Search",
        "esri/widgets/BasemapGallery",
        "esri/core/watchUtils",
        "calcite-maps/calcitemaps-v0.8", // Calcite Maps
        "calcite-maps/calcitemaps-arcgis-support-v0.8", // Calcite Maps ArcGIS Support
        "bootstrap/Collapse", // Bootstrap
        "bootstrap/Dropdown",
        "bootstrap/Tab",
        "@dojo/framework/shim/array" // Can use @dojo shim for Array.from for IE11
    ], function(
        Map, 
        MapView, 
        SceneView, 
        Search, 
        BasemapGallery, 
        watchUtils, 
        CalciteMaps, 
        CalciteMapsArcGIS
    ){
        /**
         * App setting
         */
        window.app = {
            center: [103, 23], // 经纬度
            scale: 60000000, // 缩放比例
            basemap: "streets", // 底图源
            viewPadding: {
                top: 50,
                bottom: 0
            },
            // 默认地图控件
            uiComponents: [
                // "zoom", // 缩放
                // "compass" // 罗盘
                // "attribution" // 地图脚注
            ],
            mapView: null,
            containerMap: "axMapView",
            containerScene: "axSceneView",
            activeView: null, // 当前视窗下（被激活）的视图（MapView or SceneView）
            searchWidget: null
        };
        /**
         * 创建地图和场景及相关ui控件
         */
        // Map
        const map = new Map({
            basemap: app.basemap
        });
        // 2D View
        app.mapView = new MapView({
            container: app.containerMap,
            map: map,
            center: app.center,
            scale: app.scale,
            padding: app.viewPadding,
            ui: {
                components: app.uiComponents
            }
        });
        CalciteMapsArcGIS.setPopupPanelSync(app.mapView);
        // 3D View
        app.sceneView = new SceneView({
            container: app.containerScene,
            map: map,
            center: app.center,
            scale: app.scale,
            padding: app.viewPadding,
            ui: {
                components: app.uiComponents
            }
        });
        CalciteMapsArcGIS.setPopupPanelSync(app.sceneView);

        


        // 设置当前激活状态的视图（MapView or Scene View）
        var setActiveView = function(view){
            app.activeView = view
        };
        // 切换视图时，同步MapView视图和SceneView视图位置
        var syncViews = function(fromView, toView){
            const viewPt = fromView.viewpoint.clone();
            if(fromView.type === "3d"){ // MapView => SceneView
                toView.container = app.containerMap;
            }else{ // MapView => SceneView
                toView.container = app.containerScene;
            }
            toView.padding = app.viewPadding;
            toView.viewpoint = viewPt;
        };
        setActiveView(app.mapView); // 默认激活MapView视图

        // 地图切换与同步
        const tabs = Array.from(document.querySelectorAll(".calcite-navbar li a[data-toggle='tab']"));
        tabs.forEach(function(tab){
            tab.addEventListener("click", function(event){
                if(event.target.text.indexOf("Map") > -1){ // 切换为SceneView视图
                    syncViews(app.sceneView, app.mapView);
                    setActiveView(app.mapView);
                }else{ // 切换为MapView视图
                    syncViews(app.mapView, app.sceneView);
                    setActiveView(app.sceneView);
                }
            });
        });

        // 底图选择功能
        // Create basemap widget
        app.basemapWidget = new BasemapGallery({
            view: app.activeView,
            container: "axBasemapPanel"
        });

        // Settings 设置
        
        
    });
}