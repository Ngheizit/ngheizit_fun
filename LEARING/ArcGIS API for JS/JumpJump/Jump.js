window.onload = function(){
    this.Main();
}
function Main(){

    let isMouseDown = false;
    let isJumping = false;
    let startTime, endTime;
    
    require([
        "esri/Map", 
        "esri/views/SceneView",
        "esri/geometry/Point",
        "esri/geometry/Polygon",
        "esri/Graphic",
        "esri/layers/GraphicsLayer"
    ], function(Map, SceneView, Point, Polygon, Graphic, GraphicsLayer){

        var lon = 113;
        var lat = 23;
        var height = 500;
        let time;
        let length, length_to, maxHeight = 550, distance;
        let value = 0;


        const graphicsLayer = new GraphicsLayer();

        var map = new Map({
            basemap: "streets",
            layers: [graphicsLayer]
        });
        var view = new SceneView({
            container: "axSceneView",
            map:map,
            camera: {
                position: {  // observation point
                    x: lon,
                    y: lat - 0.1,
                    z: 10000 // altitude in meters
                },
                tilt: 45  // perspective in degrees
            }
        });



        let createBox = function(mapX, mapY, height){
            const xmin = mapX - 0.005,
                  xmax = mapX + 0.005,
                  ymin = mapY - 0.005,
                  ymax = mapY + 0.005
            const polygon = {
                type: "polygon",
                rings: [
                    [
                        [xmin, ymin, height],
                        [xmin, ymax, height],
                        [xmax, ymax, height],
                        [xmax, ymin, height],
                        [xmin, ymin, height]
                    ],
                    [
                        [xmin, ymin, 10],
                        [xmin, ymax, 10],
                        [xmax, ymax, 10],
                        [xmax, ymin, 10],
                        [xmin, ymin, 10]
                    ],
                    [
                        [xmin, ymin, height],
                        [xmin, ymax, height],
                        [xmin, ymax, 0],
                        [xmin, ymin, 0],
                        [xmin, ymin, height]
                    ],
                    [
                        [xmax, ymin, height],
                        [xmax, ymax, height],
                        [xmax, ymax, 0],
                        [xmax, ymin, 0],
                        [xmax, ymin, height]
                    ]
                ]
            };
            return polygon
        };
        let fillSymbol_b = {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [0, 0, 0, 0.8],
            outline: {
              // autocasts as new SimpleLineSymbol()
              color: [0, 0, 0],
              width: 2
            }
        };
        let fillSymbol_w = {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [200, 200, 200, 0.8],
            outline: {
              // autocasts as new SimpleLineSymbol()
              color: [200, 200, 200],
              width: 2
            }
        };


        let jumpDis = parseInt(Math.random()*5 + 1) / 100;
        let box_from = new Graphic({
            geometry: createBox(lon, lat, height),
            symbol: fillSymbol_b
        });
        let box_to = new Graphic({
            geometry: createBox(lon + jumpDis, lat, height),
            symbol: fillSymbol_w
        });

        let point = {
            type: "point", // autocasts as new Point()
            x: lon,
            y: lat,
            z: 550
        };
        let markerSymbol = {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: [226, 119, 40],
            outline: {
              // autocasts as new SimpleLineSymbol()
              color: [255, 255, 255],
              width: 2
            }
        };
        var pt = new Graphic({
            geometry: point,
            symbol: markerSymbol
        });
        

        view.when(function(){

            
            graphicsLayer.add(box_from);
            graphicsLayer.add(box_to);
            graphicsLayer.add(pt);

            let axSceneView = document.getElementById("axSceneView");
            axSceneView.onmousedown = function(event){
                if(event.button == 0){
                    isMouseDown = true;
                    startTime = new Date().getTime();
                }
            };
            axSceneView.onmouseup = function(){

                if(isMouseDown){
                    time = endTime - startTime;
                    isJumping = true;
                    length = lon;
                    length_to = lon + (time * 0.00003);
                    distance = time * 0.00003;

                    // pt.geometry = {
                    //     type: "point", // autocasts as new Point()
                    //     x: lon + (time * 0.00003),
                    //     y: lat,
                    //     z: 550
                    // };
                    
                   


                    lon = lon + jumpDis;
                    isMouseDown = false;
                    endTime = new Date().getTime();
                    box_from.geometry = createBox(lon, lat, 500);
                    box_from.symbol = box_to.symbol;
                    height = 500;
                    jumpDis = parseInt(Math.random()*1.5 + 2) / 100;
                    console.log("dis: " + jumpDis);
                    box_to.geometry =createBox(lon + jumpDis, lat, height);

                    box_to.symbol = {
                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                        color: [
                            parseInt(Math.random()*255),
                            parseInt(Math.random()*255),
                            parseInt(Math.random()*255)
                        ],
                        outline: {
                          // autocasts as new SimpleLineSymbol()
                          color: [200, 200, 200],
                          width: 2
                        }
                    };
                    view.goTo({
                        target: [lon, lat]
                    });

                    
                }
            }

            
            var timer = function(){
                // 鼠标按下时触发
                if(isMouseDown){
                    endTime = new Date().getTime();
                    height = height - 10;
                    box_from.geometry = createBox(lon, lat, height);
                }
                // 跳跃动画
                if(isJumping){
                    

                    if((length_to - length) > (distance / 2)){
                        maxHeight += 500;
                    }else{
                        maxHeight -= 500;
                    }
                    if((length_to - length) < (distance / 4)){
                        maxHeight = 550;
                    }
                    

                    length += (time * 0.00003) / 10;
                    if(length < length_to){
                        pt.geometry = {
                            type: "point",
                            x: length,
                            y: lat,
                            z: maxHeight
                        };
                    }else{
                        isJumping = false;
                        maxHeight = 550;
                        if(pt.geometry.x > lon + 0.005 || pt.geometry.x < lon - 0.005){
                            document.getElementById("failure").style.visibility = "visible";
                            return;
                        }
                        value += 1;
                        document.getElementById("value").innerHTML = "得分：" + value;
                    }
                }
            };
            window.setInterval(function(){timer()}, 100);

            document.getElementById("redo").onclick = function(){
                pt.geometry = {
                    type: "point",
                    x: lon,
                    y: lat,
                    z: maxHeight
                };
                document.getElementById("failure").style.visibility = "hidden";
                value = 0;
                document.getElementById("value").innerHTML = "得分：" + value;
            };
            
            
        //     var polygonGraphic = new Graphic({
        //         geometry: createBox(lon, lat, height),
        //         symbol: fillSymbol
        //     });
    
        //     graphicsLayer.add(polygonGraphic);
        //     lon += 0.02;

        //     var polygonGraphic_to = new Graphic({
        //         geometry: createBox(lon, lat, height),
        //         symbol: fillSymbol
        //     });
        //     graphicsLayer.add(polygonGraphic_to);

        //     var test = function(){
        //         if(isMouseDown){
        //             endTime = new Date().getTime();
        //             console.log(endTime - startTime);
        //             height = height - 10;
        //             polygonGraphic.geometry = createBox(lon, lat, height);
        //         }
        //     };

        //     window.setInterval(function(){test()}, 100);

        //     document.getElementById("axSceneView").onmousedown = function(e){
        //         isMouseDown = true;
        //         startTime = new Date().getTime();
                
        //     }
        //     document.getElementById("axSceneView").onmouseup = function(){
        //         isMouseDown = false;
        //         endTime = new Date().getTime();
        //         console.log('ok: ' + (endTime - startTime));

        //         let polygonGraphic2 = new Graphic({
        //             geometry: createBox(lon, lat, 500),
        //             symbol: fillSymbol
        //         });
                
        //         graphicsLayer.add(polygonGraphic2);

        //         lon += 0.02;
        //         polygonGraphic.geometry = createBox(lon, lat, 500);
        //         height = 500
        //         view.camera = {
        //             position: {  // observation point
        //                 x: lon,
        //                 y: 23.004259120475426,
        //                 z: 10000 // altitude in meters
        //             },
        //             tilt: 45  // perspective in degrees
        //         }
        //     }
        });

    });

}