function searchAddress() {
  var nominatimURL = 'http://nominatim.openstreetmap.org/search?format=json&limit=5&q=';
  var input = $('#address');

  $.getJSON(nominatimURL + input.val(), function(data) {
    var items = [];

    $.each(data, function(key, val) {
      items.push(
        '<li><a href="#" onclick="chooseAddress(' +
        val.lat + ', ' + val.lon + ');return false;">' + val.display_name +
        '</a></li>'
      );
    });

    $('#results').empty();
    if (items.length != 0) {
      $('<ul/>', {html: items.join('')}).appendTo('#results');
    } else {
      $('<p>', { html: 'No results found' }).appendTo('#results');
      }
  });
}

function chooseAddress(lat, lng, type) {
  var location = new L.LatLng(lat, lng);
  map.setView(location, 15);
}
