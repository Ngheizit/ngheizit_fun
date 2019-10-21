window.onload = function(){
    this.Main();
}

function Main(){
    require(["esri/views/MapView", 
            "esri/WebMap",
            "esri/widgets/Editor",
            "esri/widgets/Bookmarks"], function(MapView, WebMap,Editor, Bookmarks) {
        
        // black blue green yellow purple red  orange

        var webmap = new WebMap({
            portalItem: {
            id: "a09189d13e77459dbbe57383e250e375"
            }
        });
        var view = new MapView({
            map: webmap,
            container: "axMapView"
        });


        // 小部件：编辑器
        view.when(function(){
            var zoom_widget = document.getElementsByClassName("esri-component esri-zoom esri-widget")[0];
            zoom_widget.remove();
            // Create the Editor
            var editor = new Editor({
                view: view
            });
            var bookmarks = new Bookmarks({
                view: view,
                editingEnabled: false
            });
            if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
                var eExpand = new Expand({
                    view: view,
                    content: editor,
                    expanded: false
                });
                view.ui.add(eExpand, "top-right");
                var bkExpand = new Expand({
                    view: view,
                    content: bookmarks,
                    expanded: false
                });
                view.ui.add(bkExpand, "top-right");
            } else {
                view.ui.add(editor, "top-right");
                view.ui.add(bookmarks, "top-right");
            };
            
        });

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
            window.location = "./index.html";
        };
        btn_back_home.className = "esri-widget esri-component";
        btn_back_home.style.padding = "7px 15px 5px";
        view.ui.add(btn_back_home, "bottom-left");

    });
}

