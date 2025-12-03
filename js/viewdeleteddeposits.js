var form; datasource = []
async function openViewDeletedDeposits() {
    await httpRequest('viewdeleteddeposits.php')
    form = document.getElementById('filterviewdeleteddepositsform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateDeletedDepositTable)
            if(form.querySelector('button#print-ddl')) form.querySelector('button#print-ddl').addEventListener('click', printDeletedDepositTable)
            if(form.querySelector('button#export-ddl')) form.querySelector('button#export-ddl').addEventListener('click', exportDeletedDepositTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewDeletedDepositsetCurrentPage)
            await fetchViewDeletedDepositsTableData()
        }
}

async function fetchViewDeletedDepositsTableData() {
    await fetchUsersForDeletedDeposit()
}


function printDeletedDepositTable() {
    if(deleteddeposits?.length) printContent('Deleted Deposits', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportDeletedDepositTable() {
    if(deleteddeposits?.length) tableToExcel('viewdeleteddepositstable', 'deposits')
}


async function generateDeletedDepositTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchremoveddeposits.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            deleteddeposits = datasource = res.data;
            deleteddeposits.length && initPagination(deleteddeposits, viewDeletedDepositsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewDeletedDepositsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(deleteddeposits.length) {
        deleteddeposits.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendDeletedDepositsTableRows(item, index)
            }
        })
        if(document.querySelector('#viewdeleteddepositstable tbody').innerHTML === '') viewdeleteddepositsbtn.click()
    }
}

async function appendDeletedDepositsTableRows(item, index) {
    let user = await deleteddepositusers.find(val => val.email == item.user)
    // let officer = await deleteddepositusers.find(val => val.id == item.accountofficer)
    let officerById = await deleteddepositusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await deleteddepositusers.find(val => val.email == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')} </td>
            <td> ${ item.accountnumber } </td>
            <td style="text-align:left"> ${ formatMoney(item.credit) } </td>
            <td> ${ item.reference} </td>
            <td> ${ new Date(item.transactiondate).toLocaleDateString() }</td>
            <td style="text-transform:none"> ${  item.accountofficer == undefined ? '' : ( officerById ? officerById.email : (officerByEmail ?  officerByEmail.email : '' )) } </td>
        </tr>
    `
}

       
async function fetchUsersForDeletedDeposit () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deleteddepositusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewdeleteddepositsbtn = document.getElementById("viewdeleteddeposits");
if (viewdeleteddepositsbtn) viewdeleteddepositsbtn.addEventListener("click", openViewDeletedDeposits, false);