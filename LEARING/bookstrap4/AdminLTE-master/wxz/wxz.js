window.onload = function(){

    // css 动态设置地图控件高度
    let content = document.querySelectorAll('.main-sidebar')[0];
    document.getElementById('axMapView').style.height = content.clientHeight - document.querySelectorAll('.main-header')[0].clientHeight + 'px';

    window.bool_sketch = false;

    this.Main();
}
function Main(){
    require([
        "esri/Map", 
        "esri/views/MapView",
        "esri/widgets/Sketch",
        "esri/layers/GraphicsLayer"
    ],
    function(
        Map, 
        MapView,
        Sketch,
        GraphicsLayer
    ){
        let graphicsLayer = new GraphicsLayer();
        let map = new Map({
            basemap: "streets",
            layers: [graphicsLayer]
        });
        let view = new MapView({
            container:"axMapView",
            map:map,
            zoom:  4,
            center:[15,65]
        });

        // 清除地图底部说明标注函数
        let ClearWidgetsOfBottom = function(){
            let widget_bottom = document.getElementsByClassName("esri-component esri-attribution esri-widget")[0];
            widget_bottom.remove();
        };

        // 控制sketch绘制图形控件开关函数
        let OpenOrCloseSketch = function(){
            let sketch = new Sketch({
                view: view,
                layer: graphicsLayer
            });
            let btn = document.getElementById('btn-drawGraphics');
            btn.addEventListener('click', function(){
                window.bool_sketch = !window.bool_sketch;
                if(window.bool_sketch){
                    view.ui.add(sketch, "top-right");
                }else{
                    view.ui.remove(sketch);
                }
            });
        };

        // 地图视图加载完成后触发此事件
        view.when(function(){
            ClearWidgetsOfBottom();
            OpenOrCloseSketch();
        });

    });
}