var form; var editeddeposits; datasource = []
async function viewEditedDeposits() {
    await httpRequest('viewediteddeposits.php')
    form = document.getElementById('filterviewediteddepositsform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateEditedDepositTable)
            if(form.querySelector('button#print-dl')) form.querySelector('button#print-dl').addEventListener('click', printEditedDepositTable)
            if(form.querySelector('button#export-dl')) form.querySelector('button#export-dl').addEventListener('click', exportEditedDepositTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewEditedDepositsetCurrentPage)
            await fetchViewEditedDepositsTableData()
        }
}

async function fetchViewEditedDepositsTableData() {
    await fetchViewEditedDepositOrganizationInfo()
    await fetchUsersForEditedDeposit()
}

async function generateEditedDepositTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchupdateddeposits.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            editeddeposits = datasource = res.data;
            editeddeposits.length && initPagination(editeddeposits, viewEditedDepositsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewEditedDepositsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(editeddeposits.length) {
        editeddeposits.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendDepositsTableRows(item, index)
            }
        })
        if(document.querySelector('#viewediteddepositstable tbody').innerHTML === '') viewediteddepositsbtn.click()
    }
}

async function appendDepositsTableRows(item, index) {
    let user = await depositusers.find(val => val.email == item.user)
    // let officer = await depositusers.find(val => val.id == item.accountofficer)
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
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="printEditedDepositTransaction(event, ${index})">Print</button>
                </div>
            </td>
        </tr>
    `
}

async function fetchViewEditedDepositOrganizationInfo() {
        let result = await fetchRequest('../controllers/fetchorganisationscript.php');
        if(result) {
            let parseResult  =  JSON.parse(result);
            if(parseResult.status) orginfo = parseResult.data.data[0]
        }
    }
        
async function printEditedDepositTransaction(event, index) {
    let selecteditem = editeddeposits[index]
    let user = await depositusers.find(val => val.email == selecteditem.user)
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
                    <span>Deposit</span>
                </li>
                <li style="font-weight:bold">
                    <span>Amount </span>
                    <span>N${ formatMoney(selecteditem.credit) }</span>
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

function printEditedDepositTable() {
    if(editeddeposits?.length) printContent('Deposits', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportEditedDepositTable() {
    if(editeddeposits?.length) tableToExcel('viewediteddepositstable', 'deposits')
}

async function fetchUsersForEditedDeposit () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) depositusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewediteddepositsbtn = document.getElementById("viewediteddeposits");
if (viewediteddepositsbtn) viewediteddepositsbtn.addEventListener("click", viewEditedDeposits);