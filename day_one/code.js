var fs = require("fs");

require.extensions[".txt"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

var words = require("./day_one/inputDayOne.txt");

let data = words.split("\n");
data = data.map((e) => {
  return parseInt(e);
});
console.log(data.length);

let count = 0;
function increase() {
  for (var i = 0; i < data.length; i++) {
    let first = data[i] + data[i + 1] + data[i + 2];
    let second = data[i + 1] + data[i + 2] + data[i + 3];
    if (first < second) {
      count += 1;
    }
  }
  console.log(count);
  return count;
}
increase();
