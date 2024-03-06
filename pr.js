
//Sets object that has an amount and methods to change the amount
var bank = {
    amount: 0,
    //Adds money to the amount property
    deposit(pay){
        this.amount = pay + this.amount
    },
    //List that logs each deposit
    payLog: [],
    //A dictionary of expenses
    expense: {}

}
//Adds money to the amount in the bank object
//This code is ran when the submit button is clicked
const amountBox = document.getElementById('amountBox')
const addMoney = () => {
    var payAmount = Number(document.getElementById('payAmount').value)
    if (payAmount){
        bank.payLog.push(payAmount)
        bank.deposit(bank.payLog[bank.payLog.length - 1])
        amountBox.innerHTML = bank.amount
        // bank.payLog.push(bank.amount)
        document.getElementById('payAmount').value = ''
    } else {
        amountBox.innerHTML = 'INVALID'
    };
    // console.log(bank)
    // fetch('/writeJSON', {method : 'POST', body : bank})
    // .then(response => {
    //     console.log(response)
    // })
};
//Prints the last deposit submitted to the page
const lastDeposit = () => {
    return bank.payLog[bank.payLog.length - 1]
}
//Prints the entire log of deposits to the page
const depositLog = () => {
    document.getElementById('depositLog').innerHTML = bank.payLog.join('  ')
};
//Adds an expense to the expense log
const newExpense = () => {
    let value = document.getElementById('expenseAmount').value
    let numValue = Number(value)
    if (numValue){
        var desc = document.getElementById('description').value
        if (desc){
            bank.expense[desc] = numValue
            document.getElementById('expenseAmount').value = ''
            document.getElementById('description').value = ''
        }
    }
}
//Prints the expense log to the page
const expenseLog = () => {
    var value = []
    var desc = []
    for (let item in bank.expense){
        value.push(bank.expense[item])
        desc.push(item)
    }
    var expenseList = []
    for (let i = 0; i < value.length; i++){
        expenseList.push(`${desc[i]} : ${value[i]}`)
    }
    document.getElementById('expenseLog').innerHTML = expenseList.join(', ')
    if (value.length != 0){
        return value.reduce((a,b) => a + b)
    }
}
//Removes a selected item from the expense log
const removeItem = () => {
    let des = document.getElementById('description').value
    if (des in bank.expense){
        delete bank.expense[des]
        document.getElementById('description').value = ''
    }
}
//Applies all expenses to the balance
//Will print an error if balance isn't high enough
const applyAll = () => {
    if (expenseLog() <= bank.amount){
        bank.amount -= expenseLog()
        amountBox.innerHTML = bank.amount
        bank.expense = {}
    } else if (expenseLog() > bank.amount) {
        amountBox.innerHTML = 'Insufficient Funds'
    }
}
//applies only one expense from an existing description
const applyOne = () => {
    var des = document.getElementById('description').value
    if (bank.expense[des] <= bank.amount){
        bank.amount -= bank.expense[des]
        amountBox.innerHTML = bank.amount
    }
}
//Can undo an accidental deposit
const undo = () => {
    var lastPay = bank.payLog[bank.payLog.length - 1]
    if (lastPay > bank.amount){
        amountBox.innerHTML = 'Funds have been used'
    } else if (bank.payLog.length){
        bank.amount -= lastDeposit()
        bank.payLog.pop()
        amountBox.innerHTML = bank.amount
    }
}



