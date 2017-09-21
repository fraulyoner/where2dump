function searchAddress() {
  var nominatimURL = 'http://nominatim.openstreetmap.org/search?format=json&limit=3&q=';
  var searchQuery = $('#address').val();

  $.getJSON(nominatimURL + searchQuery, function(data) {
    var items = [];

    $.each(data, function(key, val) {
      items.push(
        '<li><a href="map.html?lat=' +
        val.lat + '&lon=' + val.lon + '">' + val.display_name +
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

$('#search').submit(function(event) {
  event.preventDefault();
  searchAddress();
});
