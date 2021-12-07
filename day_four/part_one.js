/* 
    --- Day 4: Giant Squid ---
You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can't see any sunlight. What you can see, however, is a giant squid that has attached itself to the outside of your submarine.

Maybe it wants to play bingo?

Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at random, and the chosen number is marked on all boards on which it appears. (Numbers may not appear on all boards.) If all numbers in any row or any column of a board are marked, that board wins. (Diagonals don't count.)

The submarine has a bingo subsystem to help passengers (currently, you and the giant squid) pass the time. It automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input). For example:

7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
After the first five numbers are drawn (7, 4, 9, 5, and 11), there are no winners, but the boards are marked as follows (shown here adjacent to each other to save space):

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
After the next six numbers are drawn (17, 23, 2, 0, 14, and 21), there are still no winners:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
Finally, 24 is drawn:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
At this point, the third board wins because it has at least one complete row or column of marked numbers (in this case, the entire top row is marked: 14 21 17 24 4).

The score of the winning board can now be calculated. Start by finding the sum of all unmarked numbers on that board; in this case, the sum is 188. Then, multiply that sum by the number that was just called when the board won, 24, to get the final score, 188 * 24 = 4512.

To guarantee victory against the giant squid, figure out which board will win first. What will your final score be if you choose that board?
*/

/* 
    Steps to solve this problem: 
        1. figure out a way to isolate each puzzle input individually. 
        2. isolate the numbers drawn. 
        3. create a solution that compares numbers drawn to each board. 
        3.1 create a variable that stores numbers that match a board. 
        4. use this tracked information of numbers that match, and check and see if any of the BINGO conditions are met. ie
            5 in a row either horizontal, vertical, or diagonally. 
        5. IF a BINGO condition is met, we can begin calculatin the SCORE. 
        6. WE will get the SUM of all UNTRACKED numbers in the winning BINGO board. 
        7. We will then take that SUM and multiply it by the number that was JUST called to get us a WINNING board. 
        8. This number will be our answer. 
*/

const { pseudoRandomBytes } = require("crypto");
var fs = require("fs");

require.extensions[".txt"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

var bingo_tables = require("./test_input.txt");
var drawn_numbers = require("./test_numbers.txt");

let bingo_boards = bingo_tables.split(/\n\s*\n/);
let bingo_numbers = drawn_numbers.split(",");
let bingo_boards_rows = [];
let bingo_boards_columns = [];

for (var i = 0; i < bingo_boards.length; i++) {
  let board = bingo_boards[i];
  let rows = board.split("\n").map((rowString) => {
    rowString = rowString.trim();
    rowString = rowString.replace(/  /g, " ");

    return (rowString = rowString.split(" "));
  });

  bingo_boards_rows.push(rows);
}
console.log(bingo_boards_rows);
for (var i = 0; i < 12; i++) {
  let bingoNumber = bingo_numbers[i];
  for (var j = 0; j < bingo_boards_rows.length; j++) {
    let board = bingo_boards_rows[j];
    board.forEach((row) => {
      row.forEach((number) => {
        if (number === bingoNumber) {
          let bingoNumberIndex = row.indexOf(number);
          row.splice(bingoNumberIndex, 1);
        }
      });
    });
  }
}
