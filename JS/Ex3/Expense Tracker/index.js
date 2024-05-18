document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".add");
    const incomeList = document.querySelector(".income-list");
    const expenseList = document.querySelector(".expense-list");
    const balanceElement = document.getElementById("balance");
    const incomeElement = document.getElementById("income");
    const expenseElement = document.getElementById("expense");

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    const addTransactionDOM = transaction => {
        const list = transaction.type === "income" ? incomeList : expenseList;
        const listItem = document.createElement("li");
        listItem.dataset.id = transaction.id;

        listItem.innerHTML = `
            <p>
                <span>${transaction.source}</span>
                <span id="time">${new Date(transaction.time).toLocaleString()}</span>
            </p>
            <span>$${Math.abs(transaction.amount).toFixed(2)}</span>
            <i class="bi bi-trash delete"></i>
        `;
        
        list.appendChild(listItem);
    };

    const updateStats = () => {
        const income = transactions
            .filter(t => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions
            .filter(t => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);
        const balance = income - expense;

        balanceElement.textContent = balance.toFixed(2);
        incomeElement.textContent = income.toFixed(2);
        expenseElement.textContent = Math.abs(expense).toFixed(2);
    };

    const removeTransaction = id => {
        transactions = transactions.filter(transaction => transaction.id !== id);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        init();
    };

    form.addEventListener("submit", event => {
        event.preventDefault();
        
        const transaction = {
            id: Date.now(),
            source: form.source.value,
            amount: parseFloat(form.amount.value),
            type: form.type.value,
            time: new Date().toISOString()
        };

        transactions.push(transaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        addTransactionDOM(transaction);
        updateStats();
        form.reset();
    });

    document.querySelector(".transaction-history").addEventListener("click", event => {
        if (event.target.classList.contains("delete")) {
            const id = parseInt(event.target.parentElement.dataset.id, 10);
            removeTransaction(id);
        }
    });

    const init = () => {
        incomeList.innerHTML = "";
        expenseList.innerHTML = "";
        transactions.forEach(addTransactionDOM);
        updateStats();
    };

    init();
});
s