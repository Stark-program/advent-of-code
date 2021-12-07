/* --- Day 3: Binary Diagnostic ---
The submarine has been making some odd creaking noises, so you ask it to produce a diagnostic report just in case.

The diagnostic report (your puzzle input) consists of a list of binary numbers which, when decoded properly, can tell you many useful things about the conditions of the submarine. The first parameter to check is the power consumption.

You need to use the binary numbers in the diagnostic report to generate two new binary numbers (called the gamma rate and the epsilon rate). The power consumption can then be found by multiplying the gamma rate by the epsilon rate.

Each bit in the gamma rate can be determined by finding the most common bit in the corresponding position of all numbers in the diagnostic report. For example, given the following diagnostic report:

00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
Considering only the first bit of each number, there are five 0 bits and seven 1 bits. Since the most common bit is 1, the first bit of the gamma rate is 1.

The most common second bit of the numbers in the diagnostic report is 0, so the second bit of the gamma rate is 0.

The most common value of the third, fourth, and fifth bits are 1, 1, and 0, respectively, and so the final three bits of the gamma rate are 110.

So, the gamma rate is the binary number 10110, or 22 in decimal.

The epsilon rate is calculated in a similar way; rather than use the most common bit, the least common bit from each position is used. So, the epsilon rate is 01001, or 9 in decimal. Multiplying the gamma rate (22) by the epsilon rate (9) produces the power consumption, 198.

Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then multiply them together. What is the power consumption of the submarine? (Be sure to represent your answer in decimal, not binary.)
*/

// first step: find the Gamma Rate by using the most common number in the corresponding position.
// second step: convert the binary number of the most common numbers into decimal.
// third step: find the epsilon rate by finding the LEAST common number from each position. We can just use opposite numbers from the gamma rate for each position. if 1 use 0, if 0 use 1.
// fourth step: convert the epsilon rate to decimal.
// fifth step: multiply the Gamma rate by the Epsilon rate to get your power consumption.

var fs = require("fs");

require.extensions[".txt"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

var words = require("./input.txt");
let data = words.split("\n");
var position_count = {
  "0.0": 0,
  0.1: 0,
  "1.0": 0,
  1.1: 0,
  "2.0": 0,
  2.1: 0,
  "3.0": 0,
  3.1: 0,
  "4.0": 0,
  4.1: 0,
  "5.0": 0,
  5.1: 0,
  "6.0": 0,
  6.1: 0,
  "7.0": 0,
  7.1: 0,
  "8.0": 0,
  8.1: 0,
  "9.0": 0,
  9.1: 0,
  "10.0": 0,
  10.1: 0,
  "11.0": 0,
  11.1: 0,
};
for (var i = 0; i < data.length; i++) {
  for (var j = 0; j < 12; j++) {
    if (data[i][j] === "0") {
      position_count[`${j}.0`]++;
    }
    if (data[i][j] === "1") {
      position_count[`${j}.1`]++;
    }
  }
}
let gamma_rate = "";
let position_count_array = Object.entries(position_count);

for (var i = 0; i < position_count_array.length; i++) {
  if (i % 2 === 0) {
    if (position_count_array[i][1] > position_count_array[i + 1][1]) {
      gamma_rate += "0";
    } else gamma_rate += "1";
  }
}
let gamma_rate_decimal = parseInt(gamma_rate, 2);

let epsilon_rate = "";

for (var i = 0; i < gamma_rate.length; i++) {
  if (gamma_rate[i] === "0") {
    epsilon_rate += "1";
  } else epsilon_rate += "0";
}
let epsilon_rate_decimal = parseInt(epsilon_rate, 2);

/* Answer: 3277364 */ let answer = gamma_rate_decimal * epsilon_rate_decimal;
