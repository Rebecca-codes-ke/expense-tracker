
        class ExpenseTracker {
            constructor() {
                this.expenses = [];
                this.totalAmount = 0;
                
                
                this.categorySelect = document.getElementById('category-select');
                this.amountInput = document.getElementById('amount-input');
                this.dateInput = document.getElementById('date-input');
                this.addBtn = document.getElementById('add-btn');
                this.expensesTableBody = document.getElementById('expense-table-body');
                this.totalAmountCell = document.getElementById('total-amount');
                
                
                this.dateInput.valueAsDate = new Date();
                
                
                this.addBtn.addEventListener('click', () => this.addExpense());
                
                
                this.loadFromLocalStorage();
                this.renderExpenses();
            }
            
            addExpense() {
                
                const category = this.categorySelect.value;
                const amount = Number(this.amountInput.value);
                const date = this.dateInput.value;
                
                
                if (category === '') {
                    alert('Please select a category');
                    return;
                }
                if (isNaN(amount) || amount <= 0) {
                    alert('Please enter a valid amount in KES');
                    return;
                }
                if (date === '') {
                    alert('Please select a date');
                    return;
                }
                
            
                this.expenses.push({category, amount, date});
                
                
                this.totalAmount += amount;
                
        
                this.saveToLocalStorage();
                
            
                this.updateTotalAmount();
                this.renderExpenses();
                
                
                this.amountInput.value = '';
            }
            
            deleteExpense(index) {
                
                const { amount } = this.expenses[index];
                this.totalAmount -= amount;
                this.expenses.splice(index, 1);
                
                
                this.saveToLocalStorage();
                
            
                this.updateTotalAmount();
                this.renderExpenses();
            }
            
            renderExpenses() {
                
                this.expensesTableBody.innerHTML = '';
                
                
                this.expenses.forEach((expense, index) => {
                    const newRow = this.expensesTableBody.insertRow();
                    
                    const categoryCell = newRow.insertCell();
                    const amountCell = newRow.insertCell();
                    const dateCell = newRow.insertCell();
                    const deleteCell = newRow.insertCell();
                    
                    categoryCell.textContent = expense.category;
                    categoryCell.className = 'category-cell';
                    
                
                    amountCell.textContent = `KES ${expense.amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
                    amountCell.className = 'amount-cell';
                    
                    
                    const formattedDate = new Date(expense.date).toLocaleDateString();
                    dateCell.textContent = formattedDate;
                    
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.classList.add('delete-btn');
                    
                    
                    deleteBtn.addEventListener('click', () => this.deleteExpense(index));
                    
                    deleteCell.appendChild(deleteBtn);
                });
            }
            
            updateTotalAmount() {
                
                this.totalAmountCell.textContent = `KES ${this.totalAmount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
            }
            
            saveToLocalStorage() {
                localStorage.setItem('expenses', JSON.stringify(this.expenses));
                localStorage.setItem('totalAmount', this.totalAmount.toString());
            }
            
            loadFromLocalStorage() {
                const storedExpenses = localStorage.getItem('expenses');
                const storedTotalAmount = localStorage.getItem('totalAmount');
                
                if (storedExpenses) {
                    
                    this.expenses = [...JSON.parse(storedExpenses)];
                }
                
                if (storedTotalAmount) {
                    this.totalAmount = Number(storedTotalAmount);
                }
                
                this.updateTotalAmount();
            }
        }

    
        document.addEventListener('DOMContentLoaded', () => {
            new ExpenseTracker();
        });
        