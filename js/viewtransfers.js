var form; datasource = []
async function openViewTransfers() {
    await httpRequest('viewtransfers.php')
    form = document.getElementById('filterviewtransfersform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateViewTransfersTable)
            if(form.querySelector('button#print-vt')) form.querySelector('button#print-vt').addEventListener('click', printViewTransfersTable)
            if(form.querySelector('button#export-vt')) form.querySelector('button#export-vt').addEventListener('click', exportViewTransfersTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewTransferssetCurrentPage)
            // await fetchViewTransfersTableData()
        }
}

async function fetchViewTransfersTableData() {
    await fetchUsersForViewTransfers()
}


function printViewTransfersTable() {
    if(viewtransferss?.length) printContent('Transfers', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportViewTransfersTable() {
    if(viewtransferss?.length) tableToExcel('viewtransferstable', 'withdrawals')
}


async function generateViewTransfersTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchinterbanktransactionsbystatus.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            viewtransferss = datasource = res.data;
            viewtransferss.length && initPagination(viewtransferss, viewTransferssetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewTransferssetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewtransferss.length) {
        viewtransferss.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendViewTransferssTableRows(item, index)
            }
        })
        if(document.querySelector('#viewtransferstable tbody').innerHTML === '') viewtransfersbtn.click()
    }
}

async function appendViewTransferssTableRows(item, index) {
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${index.accounttype}</td>
            <td>${index.accountnumber}</td>
            <td>${index.accountname}</td>
            <td>${index.bankcode}</td>
            <td>${index.bankname}</td>
            <td>${index.currency}</td>
            <td>${index.description}</td>
            <td>${index.authorisationcode}</td>
            <td>${index.customeraccountnumber}</td>
            <td>${index.recipient_code}</td>
            <td>${index.status}</td>
            <td class="flex no-pr">
                <div>
                    <button ${item.transactionstatus == 'FAILED' || item.transactionstatus == 'REVERSED' ? 'none': 'disabled'} style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px; display: ${item.transactionstatus == 'FAILED' || item.transactionstatus == 'REVERSED' ? 'block': 'none'}" value="${index}" onclick="retryInterbankTransfer(${index})">Retry</button>
                </div>
            </td>
        </tr>
    `
}

async function retryInterbankTransfer() {
    let selecteditem = viewtransferss[index]
    if(confirm('Are you sure you want to retry transfer?')) {
        if(selecteditem) {
            let paramstr = new FormData()
            paramstr.append('id', selecteditem?.id)
            
            let result = await httpJsonRequest('../controllers/payinterbanktransfer.php', 'POST', paramstr)
            if(result) {
                let res = JSON.parse(JSON.stringify(result))
                if(res.status) {
                    callModal('Transfer successfully', 1)
                    generateViewTransfersTable()
                }
                else return callModal(res.message, 0)
            }
            else return callModal('Error: Unable to complete task', 0)
        }
    }
}
       
async function fetchUsersForViewTransfers () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deletedwithdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewtransfersbtn = document.getElementById("viewtransfers");
if (viewtransfersbtn) viewtransfersbtn.addEventListener("click", openViewTransfers, false);