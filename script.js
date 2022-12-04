
let expenseList = localStorage.getItem("expenseList") ? JSON.parse(localStorage.getItem("expenseList")) : [];
let totalBudget = localStorage.getItem("totalBudget") ? JSON.parse(localStorage.getItem("totalBudget")) : 0;
let availableBudget = localStorage.getItem("availableBudget") ? JSON.parse(localStorage.getItem("availableBudget")) : 0;




function setBudget() {

    let budgetVal = document.getElementById("setBudget").value;

    totalBudget = budgetVal;

    localStorage.setItem("totalBudget", JSON.stringify(totalBudget))

    availableBudget = budgetVal;

    localStorage.setItem("availableBudget", JSON.stringify(availableBudget))

    expenseList = []

    localStorage.setItem("expenseList", JSON.stringify(expenseList))


    generateHtmlForExpenseList()

}



function addBudget() {

    let expenseText = document.getElementById("expense").value;
    let amountVal = document.getElementById("amount").value;

    if (expenseText && amountVal) {


        if (availableBudget - amountVal >= 0) {


            let n = new Date()

            expenseList.push({
                id: 'id' + (new Date()).getTime(),
                expense: expenseText,
                amount: amountVal,
                date: n.toLocaleDateString()
            })

            localStorage.setItem("expenseList", JSON.stringify(expenseList))

            availableBudget = availableBudget - amountVal

            localStorage.setItem("availableBudget", JSON.stringify(availableBudget))

            generateHtmlForExpenseList()

        } else {


            const toastLiveExample = document.getElementById('liveToast')

            const toast = new bootstrap.Toast(toastLiveExample)

            toast.show()

        }
    } else {

        const toastLiveExample = document.getElementById('liveToast1')

        const toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
    }
}



function removeExpense(id) {
    console.log("inside remove")
    let updatedExpenseList = expenseList.filter((item, index) => {

        if (item.id === id) {
            availableBudget = Number(availableBudget) + Number(item.amount);
            localStorage.setItem("availableBudget", JSON.stringify(availableBudget));
            return false
        } else {
            return true
        }
    })

    expenseList = updatedExpenseList;

    localStorage.setItem("expenseList", JSON.stringify(expenseList))

    generateHtmlForExpenseList();
}



function clearList() {
    expenseList = [];
    localStorage.setItem("expenseList", JSON.stringify(expenseList));
    availableBudget = totalBudget;
    localStorage.setItem("availableBudget", JSON.stringify(availableBudget))
    generateHtmlForExpenseList()
}


function generateHtmlForExpenseList() {
    let expenseConatainer = document.getElementById("expenseContainer");

    let html = "";


    document.getElementById("totalBudget").innerHTML = `&#8377; ${totalBudget}`;
    document.getElementById("availableBudget").innerHTML = `&#8377; ${availableBudget}`

    if (expenseList.length > 0) {

        expenseList.forEach((expenseItem, index) => {

            html += ` <div class="row align-items-center border border-secondary rounded my-3">
    
                 <p class="col-md-6 text-center text-md-start pt-2 ">${expenseItem.expense}
                 </p>
    
                 <p class="col-md-2 text-success text-center pt-2">&#8377; ${expenseItem.amount}</p>
    
                 <p class="col-md-3 text-secondary text-center pt-2">${expenseItem.date}</p>
    
    
                 <p class="col-md-1 text-center pt-2" id=${expenseItem.id} onClick="removeExpense(this.id)"><i class="fa-solid fa-trash fa-lg"></i></p>
    
             </div>`
        })

    } else {
        html = `<div class="alert alert-primary text-center" role="alert">
        No Expenses...Add Some...
      </div>`
    }

    expenseConatainer.innerHTML = html


}

generateHtmlForExpenseList();


