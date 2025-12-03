var form; datasource = []
async function viewEditedWithdraws() {
    await httpRequest('vieweditedwithdraws.php')
    form = document.getElementById('filtervieweditedwithdrawsform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateEditedWithdrawTable)
            if(form.querySelector('button#print-dl')) form.querySelector('button#print-dl').addEventListener('click', printEditedWithdrawTable)
            if(form.querySelector('button#export-dl')) form.querySelector('button#export-dl').addEventListener('click', exportEditedWithdrawTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewEditedWithdrawsetCurrentPage)
            await fetchViewEditedWithdrawsTableData()
        }
}

async function fetchViewEditedWithdrawsTableData() {
    await fetchViewEditedWithdrawOrganizationInfo()
    await fetchUsersForEditedWithdraw()
}

async function generateEditedWithdrawTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchupdatedwithrawals.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            withdraws = datasource = res.data;
            withdraws.length && initPagination(withdraws, viewEditedWithdrawsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewEditedWithdrawsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(withdraws.length) {
        withdraws.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendWithdrawsTableRows(item, index)
            }
        })
        if(document.querySelector('#vieweditedwithdrawstable tbody').innerHTML === '') vieweditedwithdrawsbtn.click()
    }
}

async function appendWithdrawsTableRows(item, index) {
    let user = await withdrawusers.find(val => val.email == item.user)
    // let officer = await withdrawusers.find(val => val.id == item.accountofficer)
    let officerById = await withdrawusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await withdrawusers.find(val => val.email == item.accountofficer)
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
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="printEditedWithdrawTransaction(event, ${index})">Print</button>
                </div>
            </td>
        </tr>
    `
}

async function fetchViewEditedWithdrawOrganizationInfo() {
        let result = await fetchRequest('../controllers/fetchorganisationscript.php');
        if(result) {
            let parseResult  =  JSON.parse(result);
            if(parseResult.status) orginfo = parseResult.data.data[0]
        }
    }
        
async function printEditedWithdrawTransaction(event, index) {
    let selecteditem = withdraws[index]
    let user = await withdrawusers.find(val => val.email == selecteditem.user)
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

function printEditedWithdrawTable() {
    if(withdraws?.length) printContent('Withdraws', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportEditedWithdrawTable() {
    if(withdraws?.length) tableToExcel('vieweditedwithdrawstable', 'withdraws')
}

async function fetchUsersForEditedWithdraw () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) withdrawusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var vieweditedwithdrawsbtn = document.getElementById("vieweditedwithdraws");
if (vieweditedwithdrawsbtn) vieweditedwithdrawsbtn.addEventListener("click", viewEditedWithdraws);