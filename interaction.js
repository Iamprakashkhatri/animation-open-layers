    //Define a view
    var view = new ol.View({
        // projection:'EPSG:4326',
        center:[9383318.30542374, 2869498.645099184],
        zoom:12
    });
    //Define basemap
    var OSMBaseMap = new ol.layer.Tile({
        source: new ol.source.OSM({
            // wrapX: false
        })
    });

    //Define Stamen water color
    var waterStamen = new ol.layer.Tile({
        source : new ol.source.Stamen({
            layer:'toner'
        })
    });
    
    //Define array of layers
    var layerArray = [OSMBaseMap]
    
    map = new ol.Map({
        target:'interaction',
        layers:layerArray,
        view:view
    });
