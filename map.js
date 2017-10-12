// set up the map
var map = new L.Map('map');

var lat = getUrlParameter('lat');
var lon = getUrlParameter('lon');

if(lat && lon) {
  map.setView(new L.LatLng(lat, lon), 15);

  var icon = L.AwesomeMarkers.icon({
    prefix: 'ion',
    icon: 'android-locate',
    markerColor: 'red'
  });

  var marker = L.marker([lat, lon], {icon: icon}).addTo(map);

  marker.bindPopup("You are here!");
} else {
  map.fitWorld();
}

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> &#124; made by <a href="http://fraulyoner.de">fraulyoner</a>';
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

var minZoomMessage = "Please zoom in to see the recycling containers<br/>(current zoom level is CURRENTZOOM, required is MINZOOMLEVEL)";

// OverPassAPI overlays
var clothesLayer = new L.OverPassLayer({
  query: 'node["amenity"="recycling"]["recycling:clothes"="yes"]({{bbox}});out;',
  markerIcon: clothesMarker,
  minZoomIndicatorOptions: {
    minZoomMessage: minZoomMessage
  },
  beforeRequest: function() {
    map.spin(true);
  },
  afterRequest: function() {
    map.spin(false);
  }
});

var glassLayer = new L.OverPassLayer({
  query: 'node["amenity"="recycling"]["recycling:glass"="yes"]({{bbox}});out;',
  markerIcon: glassMarker,
  minZoomIndicatorOptions: {
    minZoomMessage: minZoomMessage
  },
  beforeRequest: function() {
    map.spin(true);
  },
  afterRequest: function() {
    map.spin(false);
  }
});

var batteriesLayer = new L.OverPassLayer({
  query: 'node["amenity"="recycling"]["recycling:batteries"="yes"]({{bbox}});out;',
  markerIcon: batteriesMarker,
  minZoomIndicatorOptions: {
    minZoomMessage: minZoomMessage
  },
  beforeRequest: function() {
    map.spin(true);
  },
  afterRequest: function() {
    map.spin(false);
  }
});

map.addLayer(clothesLayer);
map.addLayer(glassLayer);
map.addLayer(batteriesLayer);

// Layer control (switch on/off layers)
var overlays = {
  '<i class="ion ion-battery-low"></i>': batteriesLayer,
  '<i class="ion ion-tshirt"></i>': clothesLayer,
  '<i class="ion ion-wineglass"></i>': glassLayer
};

L.control.layers({}, overlays, {collapsed: false}).addTo(map);
