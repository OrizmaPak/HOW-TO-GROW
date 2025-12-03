var form; datasource = []
async function openViewDeletedWithdrawals() {
    await httpRequest('viewdeletedwithdrawals.php')
    form = document.getElementById('filterviewdeletedwithdrawalsform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateDeletedWithdrawalTable)
            if(form.querySelector('button#print-dw')) form.querySelector('button#print-dw').addEventListener('click', printDeletedWithdrawalTable)
            if(form.querySelector('button#export-dw')) form.querySelector('button#export-dw').addEventListener('click', exportDeletedWithdrawalTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewDeletedWithdrawalsetCurrentPage)
            await fetchViewDeletedWithdrawalsTableData()
        }
}

async function fetchViewDeletedWithdrawalsTableData() {
    await fetchUsersForDeletedWithdrawal()
}


function printDeletedWithdrawalTable() {
    if(deletedwithdrawals?.length) printContent('Deleted Withdrawals', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportDeletedWithdrawalTable() {
    if(deletedwithdrawals?.length) tableToExcel('viewdeletedwithdrawalstable', 'withdrawals')
}


async function generateDeletedWithdrawalTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchremovedwithdrawals.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            deletedwithdrawals = datasource = res.data;
            deletedwithdrawals.length && initPagination(deletedwithdrawals, viewDeletedWithdrawalsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewDeletedWithdrawalsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(deletedwithdrawals.length) {
        deletedwithdrawals.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendDeletedWithdrawalsTableRows(item, index)
            }
        })
        if(document.querySelector('#viewdeletedwithdrawalstable tbody').innerHTML === '') viewdeletedwithdrawalsbtn.click()
    }
}

async function appendDeletedWithdrawalsTableRows(item, index) {
    let user = await deletedwithdrawalusers.find(val => val.email == item.user)
    // let officer = await deletedwithdrawalusers.find(val => val.id == item.accountofficer)
    let officerById = await deletedwithdrawalusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await deletedwithdrawalusers.find(val => val.email == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')} </td>
            <td> ${ item.accountnumber } </td>
            <td style="text-align:left"> ${ formatMoney(item.debit) } </td>
            <td> ${ item.reference} </td>
            <td> ${ new Date(item.transactiondate).toLocaleDateString() }</td>
            <td style="text-transform:none"> ${  item.accountofficer == undefined ? '' : ( officerById ? officerById.email : (officerByEmail ?  officerByEmail.email : '' )) } </td>
        </tr>
    `
}

       
async function fetchUsersForDeletedWithdrawal () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deletedwithdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewdeletedwithdrawalsbtn = document.getElementById("viewdeletedwithdrawals");
if (viewdeletedwithdrawalsbtn) viewdeletedwithdrawalsbtn.addEventListener("click", openViewDeletedWithdrawals, false);