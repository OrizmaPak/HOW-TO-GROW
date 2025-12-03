var form; datasource = []
async function approveWithdrawals() {
    await httpRequest('approvewithdrawals.php')
    form = document.getElementById('filterapprovewithdrawalsform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateApproveWithdrawalTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(approveWithdrawalsetCurrentPage)
            await fetchApproveWithdrawalTableData()
        }
}

async function fetchApproveWithdrawalTableData() {
    await fetchUsersForApproveWithdrawal()
}

async function generateApproveWithdrawalTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchwithdrawalsforapproval.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            withdrawals = datasource = res.data;
            withdrawals.length && initPagination(withdrawals, approveWithdrawalsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function approveWithdrawalsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(withdrawals.length) {
        withdrawals.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendApproveWithdrawalsTableRows(item, index)
            }
        })
        if(document.querySelector('#approvewithdrawalstable tbody').innerHTML === '') approvewithdrawalsbtn.click()
    }
}

async function appendApproveWithdrawalsTableRows(item, index) {
    let user = await withdrawalusers.find(val => val.email == item.user)
    let officerById = await withdrawalusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await withdrawalusers.find(val => val.email == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')} </td>
            <td> ${ item.accountnumber } </td>
            <td style="text-align:left"> ${ formatMoney(item.debit) } </td>
            <td> ${ item.reference} </td>
            <td> ${ new Date(item.transactiondate).toLocaleDateString() }</td>
            <td style="text-transform:none"> ${  item.accountofficer == undefined ? '' : ( officerById ? officerById.email : (officerByEmail ?  officerByEmail.email : '' )) } </td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="approveWithdrawalTransaction(event, ${index})">Approve</button>
                </div>
            </td>
        </tr>
    `
}

async function approveWithdrawalTransaction(event, index) {
    
    
    if(!confirm('Are you sure you want to approve?')) return
    
    let selecteditem = withdrawals[index]
    if(selecteditem) {
        let paramstr = new FormData()
        paramstr.append('id', selecteditem.id)
        
        let result = await httpJsonRequest('../controllers/approvetransaction.php', 'POST', paramstr)
        if(result) {
            if(result?.status) {
                
                callModal('Withdrawal approved successfully', 1)
                let arr = withdrawals.filter( item => item.id !== selecteditem.id)
                withdrawals = datasource = arr;
                initPagination(withdrawals, approveWithdrawalsetCurrentPage)
            }
            else return callModal(result.message, 0)
        }
        else return callModal('Error: Unable to perform request', 0)
    }
    else return Modal('Item Selected not available', 0)
}

async function fetchUsersForApproveWithdrawal () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) withdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var approvewithdrawalsbtn = document.getElementById("approvewithdrawals");
if (approvewithdrawalsbtn) approvewithdrawalsbtn.addEventListener("click", approveWithdrawals);