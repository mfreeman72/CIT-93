// Daily decisions program

//showOnPage function
const showOnPage = function (text) {
  let newParagraph = document.createElement("p");
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById("output");
  outputDiv.append(newParagraph);
};

// Global variables
let day = 2;
let child1 = "Drew";
let child2 = "Tori";
let leaveTime1 = "7:20";
let leaveTime2 = "7:35";
let dropTime1 = "7:30";
let dropTime2 = "7:50";
let assemblyDay = false;

// Display global variable data
showOnPage("<h1>This output is based on my global variables:</h1><p>");
showOnPage("Day of the week (1=Sunday, 7=Saturday): " + day);
showOnPage("Child being dropped off first: " + child1);
showOnPage("Child being dropped off second: " + child2);
showOnPage("Early time to leave: " + leaveTime1);
showOnPage("Late time to leave: " + leaveTime2);
showOnPage("Drew&rsquo;s drop-off time: " + dropTime1);
showOnPage("Tori&rsquo;s drop-off time: " + dropTime2);
showOnPage("Is it an assembly day at Drew&rsquo;s school: " + assemblyDay);
showOnPage("<br><hr><br>");

// Main program
showOnPage("<h1><i>Today&rsquo;s School Drop-off Schedule:</h1></i></h1><p>");

if (day === 1 || day === 7) {
  showOnPage("It&rsquo;s the weekend! No need to drive the kids to school!");
} else if (day === 4 || day === 5 || assemblyDay) {
  showOnPage("<i>Kids being driven today: " + child2 + "</i><br><br>");
  showOnPage(leaveTime2 + " - Leave for " + child2 + "&rsquo;s school");
  showOnPage(dropTime2 + " - Drop off " + child2);
} else {
  showOnPage(
    "<i>Kids being driven today: " + child1 + " and " + child2 + "</i><br><br>"
  );
  showOnPage(leaveTime1 + " - Leave for " + child1 + "&rsquo;s school");
  showOnPage(dropTime1 + " - Drop off " + child1);
  showOnPage(leaveTime2 + " - Head to " + child2 + "&rsquo;s school");
  showOnPage(dropTime2 + " - Drop off " + child2);
}
