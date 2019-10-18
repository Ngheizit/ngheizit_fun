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
            center: [-40, 40],
            scale: 50000000,
            basemap: "streets",
            viewPadding: {
                top: 50,
                bottom: 0
            },
            uiComponents: ["zoom", "compass", "attribution"],
            mapView: null,
            sceneView: null,
            containerMap: "axMapView",
            containerScene: "axSceneView",
            activeView: null,
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
        var setActiveView = function(view){
            app.activeView = view
        };
        setActiveView(app.mapView);
    });
}