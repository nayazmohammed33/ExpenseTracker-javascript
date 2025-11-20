console.log('Hello!');
document.addEventListener("DOMContentLoaded", () => {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const amountInput = document.getElementById("amount");
  const descriptionInput = document.getElementById("description");
  const categorySelect = document.getElementById("category");
  const expenseList = document.getElementById("expense-list");

 document.getElementById("add-expense").addEventListener("click", addExpense);

  function addExpense() {
    const amount = amountInput.value;
    const description = descriptionInput.value;
    const category = categorySelect.value;

    if (!amount || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const expense = {
      id: Date.now(),
      amount,
      description,
      category
    };

    expenses.push(expense);
    saveToLocalStorage();
    renderExpenses();
    clearInputs();
  }

  function renderExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach(exp => {
      const li = document.createElement("li");
      li.innerHTML = `${exp.amount} - ${exp.category} - ${exp.description}
        <button onclick="editExpense(${exp.id})">Edit</button>
        <button onclick="deleteExpense(${exp.id})">Delete</button>`;
      expenseList.appendChild(li);
    });
  }

  function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  window.deleteExpense = function(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveToLocalStorage();
    renderExpenses();
  };

  window.editExpense = function(id) {
    const exp = expenses.find(e => e.id === id);
    amountInput.value = exp.amount;
    descriptionInput.value = exp.description;
    categorySelect.value = exp.category;
    deleteExpense(id);
  };

  function clearInputs() {
    amountInput.value = "";
    descriptionInput.value = "";
    categorySelect.value = "Movie";
  }
  renderExpenses();
});
