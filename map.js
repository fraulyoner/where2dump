// set up the map
var map = new L.Map('map');

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 10, maxZoom: 20, attribution: osmAttrib});

// start the map in Karlsruhe, Germany
map.setView(new L.LatLng(49.00, 8.40), 15);
map.addLayer(osm);

  // add marker to Karlsruhe Schloss
var marker = L.marker([49.013397, 8.404370]).addTo(map);
marker.bindPopup("<b>Karlsruhe</b><br>Schloss Karlsruhe");

// show something when clicking on map
var popup = L.popup();

function onMapClick(e) {
  popup.setLatLng(e.latlng)
       .setContent("You clicked the map at " + e.latlng.toString())
       .openOn(map);
}

map.on('click', onMapClick);

// OverPassAPI overlay
var opl = new L.OverPassLayer({
  query: "node['amenity'='recycling']['recycling:clothes'='yes']({{bbox}});out;",
});

map.addLayer(opl);
