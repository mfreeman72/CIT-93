// Global (name)
// Local
// Local
// Local

//let firstName = 'Andrew'

if (true) {
  //let firstName = 'Mike' // Variable shadowing - overrides the Global variable, but only within the local scope

  if (true) {
    let firstName = "Jen"; // Leaked global - When variable not defined globally, but given a value (without let) locally, it delares that value globally
    console.log(firstName);
  }
}

if (true) {
  console.log(firstName);
}
