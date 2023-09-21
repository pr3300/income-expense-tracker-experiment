// Get elements
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addTransactionBtn = document.getElementById('addTransaction');
const balanceSpan = document.getElementById('balance');
const transactionList = document.getElementById('transactionList');

// Initialize balance
let balance = 0;

// Transaction history array
const transactions = [];

// Function to update balance and transaction list
function updateUI() {
    balanceSpan.textContent = balance.toFixed(2);

    // Clear transaction list
    transactionList.innerHTML = '';

    // Update transaction list
    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${transaction.description}: $${transaction.amount.toFixed(2)} <button onclick="removeTransaction(${transaction.id})">Delete</button>`;
        transactionList.appendChild(listItem);
    });
}

// Function to add a new transaction
function addTransaction() {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    if (description.trim() === '' || isNaN(amount)) {
        alert('Please enter a valid description and amount.');
        return;
    }

    // Create a new transaction object
    const transaction = {
        id: transactions.length + 1,
        description,
        amount,
    };

    // Add the transaction to the array
    transactions.push(transaction);

    // Update the balance
    balance += amount;

    // Clear input fields
    descriptionInput.value = '';
    amountInput.value = '';

    // Update the UI
    updateUI();
}

// Function to remove a transaction
function removeTransaction(id) {
    const index = transactions.findIndex(transaction => transaction.id === id);

    if (index !== -1) {
        // Update the balance
        balance -= transactions[index].amount;

        // Remove the transaction from the array
        transactions.splice(index, 1);

        // Update the UI
        updateUI();
    }
}

// Add event listener to the Add Transaction button
addTransactionBtn.addEventListener('click', addTransaction);

// Initial UI update
updateUI();
