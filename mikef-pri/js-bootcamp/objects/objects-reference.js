const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

let myAccount = {
  name: 'Mike Freeman',
  expenses: 0,
  income: 0,
};

let addExpense = function (account, amount) {
  account.expenses = account.expenses + amount;
};

// addIncome - take account to manipulate and the amount to add

let addIncome = function (account, amount) {
  account.income = account.income + amount;
};

// resetAccount - reset the expenses and the income for account to 0

let resetAccount = function (account) {
  account.expenses = 0;
  account.income = 0;
};

// getAccountSummary - print summary of account, including current account balance as well as total expenses and income
// Example output: Account for Andrew has $900. $1000 in income. $100 in expenses.

let getAccountSummary = function (account) {
  return {
    summary: `Account for ${account.name} has $${
      account.income - account.expenses
    }. $${account.income} in income. $${account.expenses} in expenses.`,
  };
};

// addIncome
addIncome(myAccount, 1000);

// addExpense
addExpense(myAccount, 100);

// addExpense
addExpense(myAccount, 52.47);

// getAccountSummary
let accountSummary = getAccountSummary(myAccount);
showOnPage(accountSummary.summary);

// resetAccount
resetAccount(myAccount);

// getAccountSummary
accountSummary = getAccountSummary(myAccount);
showOnPage(accountSummary.summary);
