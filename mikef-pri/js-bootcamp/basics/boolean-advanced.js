let isAccountLocked = false;
let userRole = "user";

if (isAccountLocked) {
  console.log("Is account locked");
} else if (userRole === "admin") {
  console.log("Welcome Admin");
} else {
  console.log("Welcome");
}

// Challenge area

let temp = 45;

// It is freezing outside!
// It is hot outside!
// Go for it. It is pretty nice.

if (temp <= 32) {
  console.log("It is freezing outside!");
} else if (temp >= 100) {
  console.log("It is hot outside!");
} else {
  console.log("Go for it. It is pretty nice.");
}
