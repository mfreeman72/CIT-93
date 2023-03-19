const showOnPage = function (text) {
  let newParagraph = document.createElement("p");
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById("output");
  outputDiv.append(newParagraph);
};
  
let myBook = {
  title: '1984',
  author: 'George Orwell',
  pageCount: 326,
};

showOnPage(`${myBook.title} by ${myBook.author}`);

myBook.title = 'Animal Farm';

showOnPage(`${myBook.title} by ${myBook.author}`);

// Challenge area

// Model a person: name, age, location (city, country, whatever)

// Example output: Mike is 49 and lives in Fresno.
// Then, increase age by 1 and print message again.

let person = {
  name: 'Mike',
  age: 49,
  location: 'Fresno'
};

showOnPage(`${person.name} is ${person.age} and lives in ${person.location}`);

person.age = person.age + 1;

showOnPage(`${person.name} is ${person.age} and lives in ${person.location}`);
