// set up the map
var map = new L.Map('map');

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 10, maxZoom: 20, attribution: osmAttrib});

// start the map in Karlsruhe, Germany
map.setView(new L.LatLng(49.00, 8.40), 15);
map.addLayer(osm);

// markers for containers
var clothesMarker = L.AwesomeMarkers.icon({
  prefix: 'ion',
  icon: 'tshirt',
  markerColor: 'cadetblue'
});

var glassMarker = L.AwesomeMarkers.icon({
  prefix: 'ion',
  icon: 'wineglass',
  markerColor: 'blue'
});

var batteriesMarker = L.AwesomeMarkers.icon({
  prefix: 'ion',
  icon: 'battery-low',
  markerColor: 'orange'
});

// OverPassAPI overlays
var clothesLayer = new L.OverPassLayer({
  query: "node['amenity'='recycling']['recycling:clothes'='yes']({{bbox}});out;",
  markerIcon: clothesMarker,
});

var glassLayer = new L.OverPassLayer({
  query: "node['amenity'='recycling']['recycling:glass'='yes']({{bbox}});out;",
  markerIcon: glassMarker,
});

var batteriesLayer = new L.OverPassLayer({
  query: "node['amenity'='recycling']['recycling:batteries'='yes']({{bbox}});out;",
  markerIcon: batteriesMarker,
});

map.addLayer(clothesLayer);
map.addLayer(glassLayer);
map.addLayer(batteriesLayer);

// Layer control (switch on/off layers)
var baseMap = {
    "Base": osm
};

var overlayMaps = {
    "Clothes": clothesLayer,
    "Glass": glassLayer,
    "Batteries": batteriesLayer
};

L.control.layers(baseMap, overlayMaps).addTo(map);
