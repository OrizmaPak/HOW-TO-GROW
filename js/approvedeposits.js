var form; datasource = []
async function approveDeposits() {
    await httpRequest('approvedeposits.php')
    form = document.getElementById('filterapprovedepositsform')
    if(form) {
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateApproveDepositTable)
        form.querySelector('#startdate').valueAsDate = new Date()
        form.querySelector('#enddate').valueAsDate = new Date()
        
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(approveDepositsetCurrentPage)
        await fetchApproveDepositTableData()
    }
}

async function fetchApproveDepositTableData() {
    await fetchUsersForApproveDeposit()
}

async function generateApproveDepositTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchdepositsforapproval.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            deposits = datasource = res.data;
            deposits.length && initPagination(deposits, approveDepositsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function approveDepositsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(deposits.length) {
        deposits.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendApproveDepositsTableRows(item, index)
            }
        })
        if(document.querySelector('#approvedepositstable tbody').innerHTML === '') approvedepositsbtn.click()
    }
}

async function appendApproveDepositsTableRows(item, index) {
    let user = await depositusers.find(val => val.email == item.user)
    let officerById = await depositusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await depositusers.find(val => val.email == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')} </td>
            <td> ${ item.accountnumber } </td>
            <td style="text-align:left"> ${ formatMoney(item.credit) } </td>
            <td> ${ item.reference} </td>
            <td> ${ new Date(item.transactiondate).toLocaleDateString() }</td>
            <td style="text-transform:none"> ${  item.accountofficer == undefined ? '' : ( officerById ? officerById.email : (officerByEmail ?  officerByEmail.email : '' )) } </td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="approveDepositTransaction(event, ${index})">Approve</button>
                </div>
            </td>
        </tr>
    `
}

async function approveDepositTransaction(event, index) {
    if(!confirm('Are you sure you want to approve?')) return
    
    let selecteditem = deposits[index]
    if(selecteditem) {
        let paramstr = new FormData()
        paramstr.append('id', selecteditem.id)
        
        let result = await httpJsonRequest('../controllers/approvetransaction.php', 'POST', paramstr)
        if(result) {
            if(result?.status) {
                
                callModal('Deposit approved successfully', 1)
                let arr = deposits.filter( item => item.id !== selecteditem.id)
                deposits = datasource = arr;
                initPagination(deposits, approveDepositsetCurrentPage)
            }
            else return callModal(result.message, 0)
        }
        else return callModal('Error: Unable to perform request', 0)
    }
    else return Modal('Item Selected not available', 0)
}

async function fetchUsersForApproveDeposit () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) depositusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var approvedepositsbtn = document.getElementById("approvedeposits");
if (approvedepositsbtn) approvedepositsbtn.addEventListener("click", approveDeposits);