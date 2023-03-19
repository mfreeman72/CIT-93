// Initialize the running total
let runningTotal = 0;

let items = [];

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

// Supply a list of items
const products = [
  { product: 'Smartphone', price: 650 },
  { product: 'Computer', price: 895 },
  { product: 'Camera', price: 325 },
  { product: 'Microphone', price: 295 },
  { product: '3-D Printer', price: 625 },
  { product: 'TV', price: 550 },
];

// Order class and constructor
class Order {
  constructor(customerName, product, price) {
    this.customerName = customerName;
    this.product = product;
    this.price = price;
  }
  summary(index) {
    console.log(items[index]);
    console.log(items[index].length - 1);
    let summaryText = `${items[index][items[index].length - 1].firstName} ${
      items[index][items[index].length - 1].lastName
    } ordered `;
    for (let i = 0; i < items[index].length - 1; i++) {
      if (summaryText.includes('$')) {
        summaryText += ` and a ${items[index][i].product} for $${Number(
          items[index][i].price
        ).toFixed(2)}`;
      } else {
        summaryText += `a ${items[index][i].product} for $${Number(
          items[index][i].price
        ).toFixed(2)}`;
      }
      runningTotal += Number(items[index][i].price);
    }
    return summaryText;
  }
  getRunningTotal() {
    document.querySelector('div.total').innerHTML = '';
    const displayTotal = document.createElement('p');
    displayTotal.textContent = `Total for all orders: $${runningTotal.toFixed(
      2
    )}`;
    document.querySelector('div.total').appendChild(displayTotal);
  }
  getOrderDisplay() {
    runningTotal = 0;
    document.querySelector('div.orders').innerHTML = '';
    items.forEach((item, index) => {
      const displayOrder = document.createElement('p');
      displayOrder.textContent = this.summary(index);
      document.querySelector('div.orders').appendChild(displayOrder);
    });
    this.getRunningTotal();
  }
  initCart() {
    document.querySelector('div.item').style.display = 'block';
    document.querySelector('button#start').style.display = 'none';
    const cartTitle = document.createElement('h3');
    cartTitle.innerHTML = 'Your cart items:';
    document.querySelector('td#cart').appendChild(cartTitle);
    items.push([]);
  }
  itemForm() {
    document.querySelector('td#form').innerHTML = '';
    const itemSelector = document.createElement('select');
    const addButton = document.createElement('button');
    const space = document.createElement('span');
    itemSelector.setAttribute('id', 'item');
    addButton.setAttribute('id', 'add');
    let itemOption = document.createElement('option');
    itemOption.setAttribute('disabled', '');
    itemOption.setAttribute('selected', '');
    itemOption.innerHTML = 'Select a product';
    itemSelector.appendChild(itemOption);
    products.forEach((item) => {
      itemOption = document.createElement('option');
      itemOption.setAttribute('value', `${item.product}`);
      itemOption.innerHTML = `${item.product} - $${item.price}`;
      itemSelector.appendChild(itemOption);
    });
    document.querySelector('td#form').appendChild(itemSelector);
    space.innerHTML = ' ';
    addButton.innerHTML = 'Add to cart';
    document.querySelector('td#form').appendChild(space);
    addButton.addEventListener('click', () => {
      if (document.querySelector('select#item').value === 'Select a product') {
        document.querySelector('div.error').style.visibility = 'visible';
      } else {
        document.querySelector('div.error').style.visibility = 'hidden';
        this.newItem();
      }
    });
    document.querySelector('td#form').appendChild(addButton);
  }
  checkout() {
    document.querySelector('td#form').innerHTML = '';
    document.querySelector('button#checkout').outerHTML = '';
    const formTitle = document.createElement('h3');
    const firstNameInput = document.createElement('input');
    const lastNameInput = document.createElement('input');
    const streetInput = document.createElement('input');
    const cityInput = document.createElement('input');
    const stateDrop = document.createElement('select');
    const zipInput = document.createElement('input');
    const lineBreak1 = document.createElement('p');
    const lineBreak2 = document.createElement('p');
    const submitButton = document.createElement('button');
    const cancelButton = document.createElement('button');
    formTitle.innerHTML = 'Please fill out the delivery information:';
    firstNameInput.setAttribute('id', 'firstName');
    lastNameInput.setAttribute('id', 'lastName');
    streetInput.setAttribute('id', 'street');
    streetInput.setAttribute('size', '50');
    cityInput.setAttribute('id', 'city');
    stateDrop.setAttribute('id', 'state');
    let stateOption = document.createElement('option');
    stateOption.setAttribute('disabled', '');
    stateOption.setAttribute('selected', '');
    stateOption.innerHTML = 'Select State';
    stateDrop.appendChild(stateOption);
    states.forEach((state) => {
      stateOption = document.createElement('option');
      stateOption.value = state;
      stateOption.innerHTML = state;
      stateDrop.appendChild(stateOption);
    });
    zipInput.setAttribute('id', 'zip');
    zipInput.setAttribute('pattern', 'd*');
    zipInput.setAttribute('maxlength', '10');
    zipInput.setAttribute('size', '10');
    submitButton.setAttribute('id', 'submit');
    cancelButton.setAttribute('id', 'cancel');
    submitButton.innerHTML = 'Submit Order';
    cancelButton.innerHTML = 'Cancel';
    submitButton.addEventListener('click', () => {
      if (
        document.querySelector('#firstName').value === '' ||
        document.querySelector('#lastName').value === '' ||
        document.querySelector('#street').value === '' ||
        document.querySelector('#city').value === '' ||
        document.querySelector('#state').value === '' ||
        document.querySelector('#zip').value === ''
      ) {
        document.querySelector('div.error').style.visibility = 'visible';
      } else {
        document.querySelector('div.error').style.visibility = 'hidden';
        const temp = {
          firstName: `${document.querySelector('#firstName').value}`,
          lastName: `${document.querySelector('#lastName').value}`,
          street: `${document.querySelector('#street').value}`,
          city: `${document.querySelector('#city').value}`,
          state: `${document.querySelector('#state').value}`,
          zip: `${document.querySelector('#zip').value}`,
        };
        items[items.length - 1].push(temp);
        document.querySelector('td#form').innerHTML =
          'Thank you for your order!';
        document.querySelector('td#cart').innerHTML = '';
        document.querySelector('button#start').style.display = 'block';
        this.getOrderDisplay();
      }
    });
    cancelButton.addEventListener('click', () => {
      items.splice(-1);
      document.querySelector('td#form').innerHTML = '';
      document.querySelector('td#cart').innerHTML = '';
      document.querySelector('div.item').style.display = 'none';
      document.querySelector('button#start').style.display = 'block';
    });
    firstNameInput.setAttribute('placeholder', 'First Name');
    lastNameInput.setAttribute('placeholder', 'Last Name');
    streetInput.setAttribute('placeholder', 'Street Address');
    cityInput.setAttribute('placeholder', 'City');
    zipInput.setAttribute('placeholder', 'Zip Code');
    document.querySelector('td#form').appendChild(formTitle);
    document.querySelector('td#form').appendChild(firstNameInput);
    document.querySelector('td#form').appendChild(lastNameInput);
    document.querySelector('td#form').appendChild(lineBreak1);
    document.querySelector('td#form').appendChild(streetInput);
    document.querySelector('td#form').appendChild(cityInput);
    document.querySelector('td#form').appendChild(stateDrop);
    document.querySelector('td#form').appendChild(zipInput);
    document.querySelector('td#form').appendChild(lineBreak2);
    document.querySelector('td#form').appendChild(submitButton);
    document.querySelector('td#form').appendChild(cancelButton);
  }
  updateCart() {
    let subtotal = 0;
    document.querySelector('td#cart').innerHTML = '';
    const cartTitle = document.createElement('h3');
    const line = document.createElement('hr');
    const subtotalDisp = document.createElement('p');
    const checkoutButton = document.createElement('button');
    cartTitle.innerHTML = 'Your cart items:';
    document.querySelector('td#cart').appendChild(cartTitle);
    items[items.length - 1].forEach((item, index) => {
      const itemList = document.createElement('li');
      itemList.innerHTML = `${item.product} - Price: $${item.price}`;
      document.querySelector('td#cart').appendChild(itemList);
      subtotal += Number(item.price);
    });
    document.querySelector('td#cart').appendChild(line);
    subtotalDisp.innerHTML = `Total: $${subtotal.toFixed(2)}`;
    document.querySelector('td#cart').appendChild(subtotalDisp);
    document.querySelector('td#cart').appendChild(line);
    checkoutButton.setAttribute('id', 'checkout');
    checkoutButton.innerHTML = 'Checkout';
    checkoutButton.addEventListener('click', () => {
      this.checkout();
    });
    document.querySelector('td#cart').appendChild(checkoutButton);
  }
  newItem() {
    const index = products.findIndex((object) => {
      return object.product === document.querySelector('select#item').value;
    });
    items[items.length - 1].push({
      product: `${document.querySelector('select#item').value}`,
      price: `${products[index].price}`,
    });
    this.updateCart();
  }
}

// Listen for a button click, start new Order, and trigger form and cart display
document.querySelector('div.error').style.visibility = 'hidden';
document.querySelector('div.item').style.display = 'none';
document.querySelector('#start').addEventListener('click', () => {
  const orderInfo = new Order(items);
  orderInfo.initCart();
  orderInfo.itemForm();
});
