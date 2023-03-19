// Initialize the running total
let runningTotal = 0;

// Supply a list of names
const names = [
  'Alexis',
  'Bill',
  'Cameron',
  'Deborah',
  'Ellen',
  'Fred',
  'Gustav',
  'Holly',
  'Ignacio',
  'John',
  'Kelly',
  'Lauren',
  'Michael',
  'Nicole',
  'Oliver',
  'Perry',
  'Quincy',
  'Ramon',
  'Stacy',
  'Thomas',
  'Uma',
  'Veronica',
  'Will',
  'Xavier',
  'Yuri',
  'Zorro',
];

// Supply a list of items
const products = [
  'Smartphone',
  'Computer',
  'Camera',
  'Microphone',
  '3-D Printer',
  'TV',
];

// Order object constructor function
const Order = function (customerName, product, price) {
  this.customerName = customerName;
  this.product = product;
  this.price = price;
};

// Prototype method to create the display text for an order and add to the running total
Order.prototype.summary = function () {
  let summaryText = `${this.customerName} ordered `;
  this.product.forEach((item, index) => {
    if (summaryText.includes('$')) {
      summaryText += ` and a ${this.product[index]} for $${this.price[
        index
      ].toFixed(2)}`;
    } else {
      summaryText += `a ${this.product[index]} for $${this.price[index].toFixed(
        2
      )}`;
    }
    runningTotal += this.price[index];
  });
  return summaryText;
};

// Random number generator
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Create the running total division line and text
const getRunningTotal = () => {
  document.querySelector('div.total').innerHTML = '';
  const line = document.createElement('hr');
  const displayTotal = document.createElement('p');
  displayTotal.textContent = `Order Total: $${runningTotal.toFixed(2)}`;
  document.querySelector('div.total').appendChild(line);
  document.querySelector('div.total').appendChild(displayTotal);
};

// Display the order list and running total
const getOrderDisplay = (orderInfo) => {
  const displayOrder = document.createElement('p');
  displayOrder.textContent = orderInfo.summary();
  document.querySelector('div.orders').appendChild(displayOrder);
  getRunningTotal();
};

// Listen for a button click and pass a random name, items, and prices to a new Order and trigger display
document.querySelector('#new').addEventListener('click', () => {
  const orderInfo = new Order(
    names[random(0, 25)],
    [products[random(0, 5)], products[random(0, 5)]],
    [random(20000, 100000) / 100, random(20000, 100000) / 100]
  );
  getOrderDisplay(orderInfo);
});
