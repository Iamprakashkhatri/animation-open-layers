window.onload=init;
var map;
var Feature
var Style
function init(){
    
    //Define a view
    var view = new ol.View({
        // projection:'EPSG:4326',
        center:[9275174.760236427, 89.91279602050781 ],
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
        target:'lodha',
        layers:layerArray,
        view:view
    });

    // Static Image covering the given extent
    // Image sourceS
    var ImageSource = new ol.source.ImageStatic({
        attributions:'<b>ready</b>',
        url: './Ready.png',
        imageExtent:[9262983.054224942, 3220827.060852472, 9287366.466247912, 3236573.088679218 ]
        // imageExtent:map.getView().calculateExtent()
        
    });
    // Image Layer

    var ImageLayer = new ol.layer.Image({
        source :ImageSource
    });
    //Adding layer to map
    // map.addLayer(ImageLayer)

    //Image source for another image

    /* var anotherImageSource = new ol.source.ImageStatic({
        attributions:'<b>another image</b>',
        url: './Ready_1.png',
        imageExtent:[9362983.054224942, 3320827.060852472, 9387366.466247912, 3336573.088679218]
        
    });
    const map_extent = map.getView().calculateExtent()

    //Layer for another image

    var anotherLayer = new ol.layer.Image({
        source:anotherImageSource
    })

    map.addLayer(anotherLayer)

    return map_extent
    */

    //Adding image based on coordinates
    // LAYER-> SOURCE -> FEATURE:CO-ORDINATE and image:
    Feature = new ol.Feature({
        geometry : new ol.geom.Point([9065174.760236427, 2928700.074765845])
    })

    style = new ol.style.Style({
        image: new ol.style.Icon({
            src:'./images/Ready.png',
            scale:0.05
        })
    });
    Feature.setStyle(style)

    //Define a source
    var vectorSource = new ol.source.Vector({
        features:[Feature]
    });
    //Define a layer
    var vectorLayer = new ol.layer.Vector({
        source:vectorSource
    });
    map.addLayer(vectorLayer)

    //Adding MWS layer to the map
    //Tile: image is divided into different tile. eg in first sec first tile loaded, in 2nd second second tile, in 3 second 3rd tile and finally 4th one.
    //Define WMS source
    var tileSource = new ol.source.TileWMS({
        url:'http://localhost:8080/geoserver/tiger/wms',
        params:{'LAYERS':'tiger:poly_landmarks','TILED':true},
        serverType:'geoserver',
        crossOrigin: 'anonymous'
    })
    //Define tile layer
    var tileLayer = new ol.layer.Tile({
        source:tileSource
    })
    //adding layer to map
    // map.addLayer(tileLayer)
    //Image: image loads in some seconds. eg it took 4 second to load
    var imageSource = new ol.source.ImageWMS({
        url:'http://localhost:8080/geoserver/tiger/wms',
        params:{'LAYERS':'tiger:poly_landmarks'},
        serverType:'geoserver',
        crossOrigin: 'anonymous'
    })
    //Define tile layer
    var imageLayer = new ol.layer.Tile({
        source:imageSource
    })
    //adding layer to map
    // map.addLayer(imageLayer)



    // Vector Layers

    var inputJSON = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    81.441650390625,
                    29.888280933159265
                  ],
                  [
                    80.57373046875,
                    29.544787796199465
                  ],
                  [
                    80.540771484375,
                    28.98892237190413
                  ],
                  [
                    81.23291015625,
                    28.65203063036226
                  ],
                  [
                    81.82617187499999,
                    29.094577077511826
                  ],
                  [
                    81.123046875,
                    29.19053283229458
                  ],
                  [
                    82.5732421875,
                    29.38217507514529
                  ],
                  [
                    82.30957031249999,
                    29.80251790576445
                  ],
                  [
                    81.441650390625,
                    29.888280933159265
                  ]
                ]
              ]
            }
          }
        ]
      }
      
      //Vector source
      var vectorSource = new ol.source.Vector({
          features:(new ol.format.GeoJSON().readFeatures(inputJSON))
      })
      // Vector Layer
      var vectorLayer = new ol.layer.Vector({
          source:vectorSource,
          style: new ol.style.Style({
              stroke: new ol.style.Stroke({
                  color:'#ff00ff',
                  width:4,
                  lineDash:[5,10]
              })
          })
      })

    //   map.addLayer(vectorLayer)

    var extSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url:'./data/vector_data/lodha-map.geojson'
    })
    var extLayer = new ol.layer.Vector({
        source:extSource,
        style: new ol.style.Style({
            fill:new ol.style.Fill({
                color:'rgba(142,226,136,0.5)'
            }),
            stroke: new ol.style.Stroke({
                color:'#000000',
                width:3
            })
        })
    })

    // map.addLayer(extLayer)
 
  // Using properties and providing color

  var externalSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url:'./data/vector_data/polygons.geojson'
  })
  var propLayer = new ol.layer.Vector({
      source:externalSource,
      style: function(feature){
        if(feature.getProperties().prop=='a'){
          return new ol.style.Style({
              fill:new ol.style.Fill({
                  color:'#ff0000'
              }),
              stroke: new ol.style.Stroke({
                  color:'#000000',
                  width:3
              })
        })
        }
        else if(feature.getProperties().prop=='b'){
          return new ol.style.Style({
              fill:new ol.style.Fill({
                  color:'#ffff00'
              }),
              stroke: new ol.style.Stroke({
                  color:'#000000',
                  width:3
              })
        })
        }
        else {
          return new ol.style.Style({
            fill:new ol.style.Fill({
                color:'#00ffff'
            }),
            stroke: new ol.style.Stroke({
                color:'#000000',
                width:3
            })
      })
        }
      }
  })

  // map.addLayer(propLayer)


    //Create Heatmap
    //Define heatmap source

    var heatmapsource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url:'./data/vector_data/linemap.geojson'
    })
    //Define heatmap layer
    var heatmaplayer = new ol.layer.Heatmap({
      source:heatmapsource
    })
    // map.addLayer(heatmaplayer)

    //Graticule
    // var graticule = new ol.layer.Graticule({
    //   map:map,
    //   showLabels:true
    // })




}
var n = new init()
// console.log(map)
// console.log('feature',Feature)
// console.log('style',style)
console.log('feature',Feature.get('geometry'))
// console.log('heatmap',heatmaplayer)