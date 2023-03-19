//showOnPage function
const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

let restaurant = {
  name: 'Coltons',
  guestCapacity: 75,
  guestCount: 0,
  checkAvailability: function (partySize) {
    let seatsLeft = this.guestCapacity - this.guestCount;
    return partySize <= seatsLeft;
  },
  seatParty: function (partySize) {
    this.guestCount = this.guestCount + partySize;
  },
  removeParty: function (partySize) {
    this.guestCount = this.guestCount - partySize;
  },
};

// seatParty - take party size to be seated and adds to guestCount
// removeParty - take party size leaving and remove from guestCount

restaurant.seatParty(72);
showOnPage(restaurant.checkAvailability(4));
restaurant.removeParty(5);
showOnPage(restaurant.checkAvailability(4));
