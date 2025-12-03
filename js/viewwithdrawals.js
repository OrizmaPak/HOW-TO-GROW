var form; var withdrawals;
async function viewWithdrawals() {
    await httpRequest('viewwithdrawals.php')
    form = document.getElementById('filterviewwithdrawalsform')
    if(form) {
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateWithdrawalTable)
        if(form.querySelector('button#print-wl')) form.querySelector('button#print-wl').addEventListener('click', printWithdrawalTable)
        if(form.querySelector('button#export-wl')) form.querySelector('button#export-wl').addEventListener('click', exportWithdrawalTable)
        form.querySelector('#startdate').valueAsDate = new Date()
        form.querySelector('#enddate').valueAsDate = new Date()
        
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(viewWithdrawalsetCurrentPage)
        await fetchViewwithdrawalsTableData()
    }
}

async function fetchViewwithdrawalsTableData() {
    await fetchViewWithdrawalOrganizationInfo()
    await fetchUsersForwithdrawal()
}

async function generateWithdrawalTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchwithdrawals.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            withdrawals = datasource = res.data;
            withdrawals.length && initPagination(withdrawals, viewWithdrawalsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewWithdrawalsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(withdrawals.length) {
        withdrawals.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendWithdrawalsTableRows(item, index)
            }
        })
        if(document.querySelector('#viewwithdrawalstable tbody').innerHTML === '') viewwithdrawalsbtn.click()
    }
}

async function appendWithdrawalsTableRows(item, index) {
    let user = await withdrawlusers.find(val => val.email == item.user)
    let officer = await withdrawlusers.find(val => val.id == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')} </td>
            <td> ${ item.accountnumber } </td>
            <td> ${ formatMoney(item.debit) } </td>
            <td> ${ item.reference} </td>
            <td> ${ new Date(item.transactiondate).toLocaleDateString() }</td>
            <td style="text-transform:none"> ${ officer?.email == undefined ? '' : officer.email } </td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="printWithdrawalTransaction(event, ${index})">Print</button>
                </div>
            </td>
        </tr>
    `
}


async function fetchViewWithdrawalOrganizationInfo() {
        let result = await fetchRequest('../controllers/fetchorganisationscript.php');
        if(result) {
            let parseResult  =  JSON.parse(result);
            if(parseResult.status) orginfo = parseResult.data.data[0]
        }
    }
        
async function printWithdrawalTransaction(event, index) {
    let selecteditem = withdrawals[index]
    let user = await withdrawlusers.find(val => val.email == selecteditem.user)
    let html = `
        <div class="transaction-receipt">
            <div>
                <h4>Transaction Receipt</h4>
                <div>
                    <div>
                        <p style="text-transform:capitalize">${orginfo.companyname}</p>
                        <p style="text-transform:capitalize">${orginfo.address}</p>
                    </div> 
                    <span>${new Date().toLocaleString()}</span>
                </div>
            </div>
            <ul>
                <li>
                    <span>Name </span>
                    <span> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')}</span>
                </li>
                <li>
                    <span>Account </span>
                    <span>${ selecteditem.accountnumber } </span>
                </li>
                <li>
                    <span>Reference </span>
                    <span style="text-transform: none;">${ selecteditem.reference} </span>
                </li>
                <li>
                    <span>Date </span>
                    <span> ${ new Date(selecteditem.transactiondate).toLocaleString() }</span>
                </li>
                <li>
                    <span>Transaction Type </span>
                    <span>Withdrawal</span>
                </li>
                <li style="font-weight:bold">
                    <span>Amount </span>
                    <span>N${ formatMoney(selecteditem.debit) }</span>
                </li>
            </ul>
            <div class="footer">
                <p>We appreciate you doing business with us</p>
                <span>THANK YOU</span>
            </div>
        </div>
    `
    let div = document.createElement('div')
    div.innerHTML = html;
    div.id = 'printable-transact'
    if(document.getElementById('printable-transact')) document.getElementById('printable-transact').remove()
    document.body.appendChild(div)
    printContent(' ', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-transact')
}


function printWithdrawalTable() {
    if(withdrawals?.length) printContent('Withdrawals', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportWithdrawalTable() {
    if(withdrawals?.length) tableToExcel('viewwithdrawalstable', 'withdrawals')
}


async function fetchUsersForwithdrawal () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) withdrawlusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewwithdrawalsbtn = document.getElementById("viewwithdrawals");
if (viewwithdrawalsbtn) viewwithdrawalsbtn.addEventListener("click", viewWithdrawals);