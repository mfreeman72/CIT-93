const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

let myBook = {
  title: '1984',
  author: 'George Orwell',
  pageCount: 326,
};

let otherBook = {
  title: 'A Peoples History',
  author: 'Howard Zinn',
  pageCount: 723,
};

let getSummary = function (book) {
  return {
    summary: `${book.title} by ${book.author}`,
    pageCountSummary: `${book.title} is ${book.pageCount} pages long`,
  };
};

let bookSummary = getSummary(myBook);
let otherBookSummary = getSummary(otherBook);

showOnPage(bookSummary.pageCountSummary);

// Challenge area
// Create function - take fahrenheit in - return object with all three (fahrenheit, celcius, and kelvin)

let fahrenheit = 65;

let convert = function (tempFahr) {
  return {
    celcius: (tempFahr - 32) * (5 / 9),
    kelvin: (tempFahr - 32) * (5 / 9) + 273.15,
  };
};

let temperature = convert(fahrenheit);

showOnPage(`Fahrenheit: ${fahrenheit}`);
showOnPage(`Celcius: ${temperature.celcius}`);
showOnPage(`Kelvin: ${temperature.kelvin}`);
