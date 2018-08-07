// Looping a triangle
// for (let stars="#"; stars.length <=7; stars+="#") {
//     console.log(stars);
// }

// FizzBuzz
// for (let nbrs=1 ; nbrs<=100 ; nbrs++ ) {
//     let output = "";
//     if (nbrs%3 == 0) output += "Fizz";
//     if (nbrs%5 == 0) output += "Buzz";
//     console.log(output || nbrs);
// }

// // ChessBoard
// let size = 8;

// let board = "";

// for (let y = 0; y < size; y++) {
//   for (let x = 0; x < size; x++) {
//     if ((x + y) % 2 == 0) {
//       board += " ";
//     } else {
//       board += "#";
//     }
//   }
//   board += "\n";
// }

// console.log(board);

// const power = (base, exponent) => {
//   let result = 1;
//   for (let count=0; count<exponent; count++) {
//     result *= base;
//   }
//   return result;
// };

// function greet(who) {
//   console.log("Hello " + who);
// }
// greet("Harry");
// console.log("Bye");

// function chicken() {
//   return egg();
// }
// function egg() {
//   return chicken();
// }
// console.log(chicken() + " came first.");
// //console.log(egg() + " came first.");

// const giveMin = (a,b) => {
//     if (a<b) return a;
//     else return b;
// }
// console.log(giveMin(0,10));
// console.log(giveMin(6,11));

function isEven(n) {
    if (n == 0) return true;
    else if (n == 1) return false;
    else if (n < 0) return isEven(-n);
    else return isEven(n - 2);
  }
console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));