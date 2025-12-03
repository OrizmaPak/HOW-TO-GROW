var form; datasource = []
async function openViewRecipients() {
    await httpRequest('viewrecipients.php')
    form = document.getElementById('filterviewrecipientsform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateViewRecipientsTable)
            if(form.querySelector('button#print-vr')) form.querySelector('button#print-vr').addEventListener('click', printViewRecipientsTable)
            if(form.querySelector('button#export-vr')) form.querySelector('button#export-vr').addEventListener('click', exportViewRecipientsTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewRecipientssetCurrentPage)
            // await fetchViewRecipientsTableData()
        }
}

async function fetchViewRecipientsTableData() {
    await fetchUsersForViewRecipients()
}


function printViewRecipientsTable() {
    if(viewrecipientss?.length) printContent('Recipients', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportViewRecipientsTable() {
    if(viewrecipientss?.length) tableToExcel('viewrecipientstable', 'withdrawals')
}


async function generateViewRecipientsTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchrecipients.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            viewrecipientss = datasource = res.data;
            viewrecipientss.length && initPagination(viewrecipientss, viewRecipientssetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewRecipientssetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewrecipientss.length) {
        viewrecipientss.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendViewRecipientssTableRows(item, index)
            }
        })
        if(document.querySelector('#viewrecipientstable tbody').innerHTML === '') viewrecipientsbtn.click()
    }
}

async function appendViewRecipientssTableRows(item, index) {
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.accounttype}</td>
            <td>${item.accountnumber}</td>
            <td>${item.accountname}</td>
            <td>${item.bankcode}</td>
            <td>${item.bankname}</td>
            <td>${item.currency}</td>
            <td>${item.description}</td>
            <td>${item.authorisationcode}</td>
            <td>${item.customeraccountnumber}</td>
            <td>${item.recipient_code}</td>
            <td>${item.status}</td>
        </tr>
    `
}

       
async function fetchUsersForViewRecipients () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deletedwithdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewrecipientsbtn = document.getElementById("viewrecipients");
if (viewrecipientsbtn) viewrecipientsbtn.addEventListener("click", openViewRecipients, false);