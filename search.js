function searchAddress() {
  var nominatimURL = 'http://nominatim.openstreetmap.org/search?format=json&limit=5&q=';
  var searchQuery = $('#address').val();

  $.getJSON(nominatimURL + searchQuery, function(data) {
    var items = [];

    $.each(data, function(key, val) {
      items.push(
        '<li><a href="#" onclick="chooseAddress(' +
        val.lat + ', ' + val.lon + ');return false;">' + val.display_name +
        '</a></li>'
      );
    });

    var numberOfSearchResults = items.length;
    console.log('Found ' + numberOfSearchResults + ' results for query = ' + searchQuery)

    $('#searchResults').empty();
    if (numberOfSearchResults != 0) {
      $('<ul/>', {html: items.join('')}).appendTo('#searchResults');
    } else {
      $('<p>', { html: 'No results found' }).appendTo('#searchResults');
      }
  });
}

function chooseAddress(lat, lng, type) {
  var location = new L.LatLng(lat, lng);
  map.setView(location, 15);
}

$('#search').submit(function(event) {
  event.preventDefault();
  searchAddress();
});
