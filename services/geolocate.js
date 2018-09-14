const geoip2ws = require("geoip2ws")("118153", "4hDarTsp3WGo", "city");

module.exports = ip => {
  return new Promise((resolve, reject) => {
    geoip2ws(ip, (err, data) => {
      if (err || !data.location || !data.country) {
        return reject(err);
      }
      const geo = {};
      geo.geolocation = [data.location.latitude, data.location.longitude];
      if (data.city) {
        geo.name = data.city.names.en;
      } else if (data.most_specific_subdivision) {
        geo.name = data.most_specific_subdivision.names.en;
      } else {
        geo.name = data.country.names.en;
      }
      return resolve(geo);
    });
  });
};
