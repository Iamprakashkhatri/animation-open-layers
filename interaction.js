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

    var dragBox = new ol.interaction.DragBox({})

    dragBox.on('boxstart',function(evt){
        console.log('Box event started')
    })
    dragBox.on('boxend',function(evt){
        console.log('Box ended successfully')
        map.getView().fit(dragBox.getGeometry().getExtent(),map.getSize());
    })
    // map.addInteraction(dragBox)

    //Drag and drop

    var dragSource = new ol.source.Vector()

    var dragLayer = new ol.layer.Vector({
        soure:dragSource
    })
    map.addLayer(dragLayer)

    var dragDrop = new ol.interaction.DragAndDrop({
        formatConstructors:[ol.format.GeoJSON],
        source:dragSource
    })
    dragDrop.on('addfeatures',function(evt){
        console.log('added new features')
    })
    // map.addInteraction(dragDrop)

    var drawSource = new ol.source.Vector()

    var drawLayer=new ol.layer.Vector({
        source: drawSource
    })
    map.addLayer(drawLayer)
    var draw = new ol.interaction.Draw({
        source:drawSource,
        // type:'Polygon'
        type:'LineString',
        freehand:true
    })
    draw.on('drawend',function(evt){
        drawSource.clear()
    })
    map.addInteraction(draw)