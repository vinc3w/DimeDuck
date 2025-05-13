const moment = require("moment");

module.exports = (x, y) => {
  x = moment(x).startOf("day");
  y = moment(y).startOf("day");
  return x.diff(y, "days");
}
