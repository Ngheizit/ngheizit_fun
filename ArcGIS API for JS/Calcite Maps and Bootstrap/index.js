var app;
window.onload = function(){
    this.Main();
}

function Main(){
    var bool_sketch = false;
    var cmd = document.getElementById("cmd");
    function print(str){
        cmd.innerHTML = str;
    }

    require([
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/BasemapGallery",
        "esri/layers/GraphicsLayer",
        "esri/widgets/Sketch",
        "esri/layers/Layer",
        "esri/PopupTemplate",
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
        BasemapGallery,
        GraphicsLayer,
        Sketch,
        Layer,
        PopupTemplate,
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
                top: 0,
                bottom: 50
            },
            // 默认地图控件
            uiComponents: [
                // "zoom", // 缩放
                // "compass" // 罗盘
                // "attribution" // 地图脚注
            ],
            mapView: null,
            containerMap: "axMapView",
            activeView: null, // 当前视窗下（被激活）的视图（MapView or SceneView）
            searchWidget: null
        };
        /**
         * 创建地图和场景及相关ui控件
         */
        // Map
        let graphicsLayer = new GraphicsLayer();
        let map = new Map({
            basemap: app.basemap,
            layers: [graphicsLayer]
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
        // 设置当前激活状态的视图（MapView or Scene View）
        app.activeView = app.mapView;



        // 底图选择功能
        // Create basemap widget
        app.basemapWidget = new BasemapGallery({
            view: app.activeView,
            container: "axBasemapPanel"
        });

        app.activeView.when(function(){
            app.mapView.popup.autoOpenEnabled = true; // disable popups
            let sketch = new Sketch({
                view: app.activeView,
                layer: graphicsLayer
            })
            document.getElementById("btn-drawGraphics").onclick = function(){
                bool_sketch = !bool_sketch
                if (bool_sketch) {
                    app.activeView.ui.add(sketch, "top-left");
                }else{
                    app.activeView.ui.remove(sketch);
                }
            };
            document.getElementById("btn-addlyr-url").onclick = function(){
                let url = document.getElementById("txt-addlyr-url").value;
                Layer.fromArcGISServerUrl({
                    url: url,
                    properties:{
                        popupTemplate: new PopupTemplate({
                            title: "{NAME}"
                        })
                    }
                }).then(function(layer){
                    map.add(layer);
                    print('成功：添加图层 ' + layer.title);
                }).catch(function(error){
                    print('错误：URL格式错误或不存在');
                });
            };
            document.getElementById("btn-addlyr-id").onclick = function(){
                let id = document.getElementById("txt-addlyr-id").value;
                Layer.fromPortalItem({
                    portalItem: {
                      id: id
                    },
                    properties:{
                        popupTemplate: new PopupTemplate({
                            title: "{NAME}"
                        })
                    }
                }).then(function(layer){
                    map.add(layer);
                    print('成功：添加图层 ' + layer.title);
                }).catch(function(error){
                    print('错误：ID格式错误或不存在');
                });
            };
            document.getElementById("btn-addlyr-clear").onclick = function(){
                document.getElementById("txt-addlyr-id").value = "";
                document.getElementById("txt-addlyr-url").value = "";
            };
        });
    });
}