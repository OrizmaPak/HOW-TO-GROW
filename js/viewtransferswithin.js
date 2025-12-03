var form; datasource = []
async function openviewtransferswithin() {
    await httpRequest('viewtransferswithin.php')
    form = document.getElementById('filterviewtransferswithinform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateviewtransferswithinTable)
            if(form.querySelector('button#print-vt')) form.querySelector('button#print-vt').addEventListener('click', printviewtransferswithinTable)
            if(form.querySelector('button#export-vt')) form.querySelector('button#export-vt').addEventListener('click', exportviewtransferswithinTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewtransferswithinsetCurrentPage)
            // await fetchviewtransferswithinTableData()
        }
}

async function fetchviewtransferswithinTableData() {
    await fetchUsersForviewtransferswithin()
}


function printviewtransferswithinTable() {
    if(viewtransferswithins?.length) printContent('Transfers', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportviewtransferswithinTable() {
    if(viewtransferswithins?.length) tableToExcel('viewtransferswithintable', 'withdrawals')
}


async function generateviewtransferswithinTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchinterbanktransactionsbystatus.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            viewtransferswithins = datasource = res.data;
            viewtransferswithins.length && initPagination(viewtransferswithins, viewtransferswithinsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewtransferswithinsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewtransferswithins.length) {
        viewtransferswithins.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewtransferswithinsTableRows(item, index)
            }
        })
        if(document.querySelector('#viewtransferswithintable tbody').innerHTML === '') viewtransferswithinbtn.click()
    }
}

async function appendviewtransferswithinsTableRows(item, index) {
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
    let selecteditem = viewtransferswithins[index]
    if(confirm('Are you sure you want to retry transfer?')) {
        if(selecteditem) {
            let paramstr = new FormData()
            paramstr.append('id', selecteditem?.id)
            
            let result = await httpJsonRequest('../controllers/payinterbanktransfer.php', 'POST', paramstr)
            if(result) {
                let res = JSON.parse(JSON.stringify(result))
                if(res.status) {
                    callModal('Transfer successfully', 1)
                    generateviewtransferswithinTable()
                }
                else return callModal(res.message, 0)
            }
            else return callModal('Error: Unable to complete task', 0)
        }
    }
}
       
async function fetchUsersForviewtransferswithin () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deletedwithdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewtransferswithinbtn = document.getElementById("viewtransferswithin");
if (viewtransferswithinbtn) viewtransferswithinbtn.addEventListener("click", openviewtransferswithin, false);