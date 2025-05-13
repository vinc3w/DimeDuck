const moment = require("moment");

module.exports = (x, y) => {
  const format = "YYYY-MM-DD";
  x = moment(new Date(x), format);
  y = moment(new Date(y), format);
  if (x.isSame(y, "day")) {
    return [y];
  }
  let date = x;
  const dates = [date.format(format)];
  do {
    date = moment(date).add(1, "day");
    dates.push(date.format(format));
  } while (moment(date).isBefore(y));
  return dates;
}