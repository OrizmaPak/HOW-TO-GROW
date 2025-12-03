var form; datasource = [] ; var missedmaturities;

async function openMissedMaturity () {
    await httpRequest('missedmaturity.php')
    
    form = document.getElementById('filtermissedmaturityform')

    if(document.querySelector('button#submit')) document.querySelector('button#submit').addEventListener('click', generateMissedMaturityReport)
    document.querySelector('button#print-missed-maturity').addEventListener('click', printMissedMaturityTable)
    document.querySelector('button#export-missed-maturity').addEventListener('click', exportMissedMaturityTable)
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(maturedMissedMaturitysetCurrentPage)
    document.querySelector('button#submit').click()
}


function printMissedMaturityTable() {
    if(missedmaturities.length) printContent('Missed Property Matured', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportMissedMaturityTable() {
    if(missedmaturities.length) tableToExcel('missedmaturitytable', 'missed_maturity')
}


async function generateMissedMaturityReport(event) {
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/exceededmaturityproperties.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        event.target.disabled = false;
        missedmaturities = datasource = res.data;
        missedmaturities.length && initPagination(res.data, maturedMissedMaturitysetCurrentPage)
    }
    else {
        if(jtabledata) jtabledata.innerHTML = '';
        event.target.disabled = false;
        callModal(res.message, 0)
    }
}


function maturedMissedMaturitysetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(missedmaturities.length) {
        missedmaturities.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendMissedMaturityTableRows(item, index)
            }
        })
        if(document.querySelector('#missedmaturitytable tbody').innerHTML === '') openMissedMaturity()
    }
}

async function appendMissedMaturityTableRows(item, index) {
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.missedpropertymaturity.accountnumber}</td>
            <td>${item.accountname}</td>
            <td>${new Date(item.missedpropertymaturity.registrationdate).toLocaleDateString()}</td>
            <td>${new Date(item.missedpropertymaturity.expectedmaturitydate).toLocaleDateString()}</td>
            <td>${formatMoney(item.pendingbalance)}</td>
            <td>${formatMoney(item.totalpaid)}</td>
        </tr>
    `
} 



var missedmaturitybtn = document.getElementById('missedmaturity')
if(missedmaturitybtn) missedmaturitybtn.addEventListener('click', openMissedMaturity, false)