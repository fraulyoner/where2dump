// set up the map
var map = new L.Map('map').fitWorld();

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});
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
  query: 'node["amenity"="recycling"]["recycling:clothes"="yes"]({{bbox}});out;',
  markerIcon: clothesMarker,
});

var glassLayer = new L.OverPassLayer({
  query: 'node["amenity"="recycling"]["recycling:glass"="yes"]({{bbox}});out;',
  markerIcon: glassMarker,
});

var batteriesLayer = new L.OverPassLayer({
  query: 'node["amenity"="recycling"]["recycling:batteries"="yes"]({{bbox}});out;',
  markerIcon: batteriesMarker,
});

map.addLayer(clothesLayer);
map.addLayer(glassLayer);
map.addLayer(batteriesLayer);

// Layer control (switch on/off layers)
var overlays = {
  '<i class="ion ion-battery-low"></i> Batteries': batteriesLayer,
  '<i class="ion ion-tshirt"></i> Clothes': clothesLayer,
  '<i class="ion ion-wineglass"></i> Glass': glassLayer
};

L.control.layers({}, overlays, {collapsed: false}).addTo(map);
