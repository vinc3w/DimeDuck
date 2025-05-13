const moment = require("moment");

module.exports = (x, y) => {
  x = moment(x);
  y = moment(y);
  return (
    x.get("date") === y.get("date") &&
    x.get("month") === y.get("month") &&
    x.get("year") === y.get("year")
  );
}
