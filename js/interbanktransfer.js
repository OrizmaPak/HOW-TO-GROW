var form; datasource = []
async function openInterbankTransfer() {
    await httpRequest('interbanktransfer.php')
    form = document.getElementById('filterinterbanktransferform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateInterbanktransferTable)
            if(form.querySelector('button#print-it')) form.querySelector('button#print-it').addEventListener('click', printInterbanktransferTable)
            if(form.querySelector('button#export-it')) form.querySelector('button#export-it').addEventListener('click', exportInterbanktransferTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewInterbanktransfersetCurrentPage)
            // await fetchInterbankTransferTableData()
        }
}

async function fetchInterbankTransferTableData() {
    await fetchUsersForInterbanktransfer()
}


function printInterbanktransferTable() {
    if(interbanktransfers?.length) printContent('Interbank Transfers', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportInterbanktransferTable() {
    if(interbanktransfers?.length) tableToExcel('interbanktransfertable', 'withdrawals')
}


async function generateInterbanktransferTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchinterbanktransfers.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            interbanktransfers = datasource = res.data;
            interbanktransfers.length && initPagination(interbanktransfers, viewInterbanktransfersetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewInterbanktransfersetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(interbanktransfers.length) {
        interbanktransfers.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendInterbanktransfersTableRows(item, index)
            }
        })
        if(document.querySelector('#interbanktransfertable tbody').innerHTML === '') interbanktransferbtn.click()
    }
}

async function appendInterbanktransfersTableRows(item, index) {
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.source}</td>
            <td>${item.currency}</td>
            <td>${item.reason}</td>
            <td>${item.recipient}</td>
            <td>${item.reference}</td>
            <td>${item.transfer_code}</td>
            <td>${new Date(item.transferdate).toLocaleDateString() }</td>
            <td>${item.accountnumber}</td>
            <td>${item.transactionstatus}</td>
            <td>${item.localreference}</td>
            <td style="text-align:left">${formatMoney(item.amount)}</td>
            <td class="no-pr>
                <div style="align-items:center;display: ${item.authorisation == 'APPROVED' ? 'block': 'none'}" class="flex no-pr">
                    <button ${item.transactionstatus == 'PENDING' ? 'disabled': ''} style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px; display: ${item.transactionstatus == 'PENDING' ? 'none': 'block'}" value="${index}" onclick="payInterbankTransfer(${index})">Pay</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:tomato;border-radius:3px;" value="${index}" onclick="cancelInterbankTransfer(${index})">Cancel</button>
                </div>
            </td>
        </tr>
    `
}

async function payInterbankTransfer() {
    let selecteditem = interbanktransfers[index]
    if(confirm('Are you sure you want to cancel transfer?')) {
        if(selecteditem) {
            let paramstr = new FormData()
            paramstr.append('id', selecteditem?.id)
            
            let result = await httpJsonRequest('../controllers/payinterbanktransfer.php', 'POST', paramstr)
            if(result) {
                let res = JSON.parse(JSON.stringify(result))
                if(res.status) {
                    callModal('Transfer cancelled successfully', 1)
                    generateInterbanktransferTable()
                }
                else return callModal(res.message, 0)
            }
            else return callModal('Error: Unable to complete task', 0)
        }
    }
}

async function cancelInterbankTransfer() {
    let selecteditem = interbanktransfers[index]
    if(confirm('Are you sure you want to cancel transfer?')) {
        if(selecteditem) {
            let paramstr = new FormData()
            paramstr.append('id', selecteditem?.id)
            
            let result = await httpJsonRequest('../controllers/cancelinterbanktransfer.php', 'POST', paramstr)
            if(result) {
                let res = JSON.parse(JSON.stringify(result))
                if(res.status) {
                    callModal('Transfer cancelled successfully', 1)
                    generateInterbanktransferTable()
                }
                else return callModal(res.message, 0)
            }
            else return callModal('Error: Unable to complete task', 0)
        }
    }
}
       
async function fetchUsersForInterbanktransfer () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deletedwithdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var interbanktransferbtn = document.getElementById("interbanktransfer");
if (interbanktransferbtn) interbanktransferbtn.addEventListener("click", openInterbankTransfer, false);