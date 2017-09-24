function searchAddress() {
  var nominatimURL = 'http://nominatim.openstreetmap.org/search?format=json&limit=3&q=';

  var $address = $('#address');
  var searchQuery = $address.val();

  var resultsSelector = '#searchResults';
  var $results = $(resultsSelector);
  $results.html('<div class="loading"></div>');

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

    $results.empty();
    if (numberOfSearchResults != 0) {
      $('<ul/>', {html: items.join('')}).appendTo(resultsSelector);
    } else {
      $('<p>', { html: 'No results found' }).appendTo(resultsSelector);
      }
  });
}

$('#search').submit(function(event) {
  event.preventDefault();
  searchAddress();
});
