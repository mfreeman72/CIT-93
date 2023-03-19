const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

const account = {
  name: 'Mike Freeman',
  expenses: [],
  income: [],
  addExpense: function (description, amount) {
    this.expenses.push({
      description: description,
      amount: amount,
    });
  },
  addIncome: function (description, amount) {
    this.income.push({
      description: description,
      amount: amount,
    });
  },
  getAccountSummary: function () {
    let totalExpenses = 0;
    let totalIncome = 0;
    let accountBalance = 0;
    this.expenses.forEach(function (expense) {
      totalExpenses = totalExpenses + expense.amount;
    });
    this.income.forEach(function (income) {
      totalIncome = totalIncome + income.amount;
    });

    accountBalance = totalIncome - totalExpenses;

    return `${this.name} has a balance of $${accountBalance}. $${totalIncome} in income. $${totalExpenses} in expenses.`;
  },
};

// 1. Add income array to account
// 2. addIncome method -> description, amount
// 3. Tweak getAccountSummary

// Mike Freeman has a balance of $10. $100 in income. $90 in expenses.

account.addExpense('Rent', 950);
account.addExpense('Coffee', 2);
account.addIncome('Job', 1000);
showOnPage(account.getAccountSummary());
