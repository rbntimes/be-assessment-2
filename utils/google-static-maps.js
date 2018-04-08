// https://stackoverflow.com/a/35660617

module.exports = function(lat, lng, rad, key, detail = 8) {
  var uri = 'https://maps.googleapis.com/maps/api/staticmap?';
  var staticMapSrc = 'center=' + lat + ',' + lng;
  staticMapSrc += '&size=600x300';
  staticMapSrc += '&path=color:0xff0000ff:weight:1';

  var r = 6371;

  var pi = Math.PI;

  var _lat = lat * pi / 180;
  var _lng = lng * pi / 180;
  var d = rad / 1000 / r;

  var i = 0;

  for (i = 0; i <= 360; i += detail) {
    var brng = i * pi / 180;

    var pLat = Math.asin(
      Math.sin(_lat) * Math.cos(d) +
        Math.cos(_lat) * Math.sin(d) * Math.cos(brng)
    );
    var pLng =
      (_lng +
        Math.atan2(
          Math.sin(brng) * Math.sin(d) * Math.cos(_lat),
          Math.cos(d) - Math.sin(_lat) * Math.sin(pLat)
        )) *
      180 /
      pi;
    pLat = pLat * 180 / pi;

    staticMapSrc += '|' + pLat + ',' + pLng;
  }

  return uri + encodeURI(staticMapSrc) + '&key=' + key;
};
