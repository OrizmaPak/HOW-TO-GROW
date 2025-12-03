var form; datasource = [];

async function viewexpenditures () {
    await  httpRequest('viewexpenditures.php');
    form = document.getElementById('filterviewexpenditureform')
    if(form.querySelector('button')) form.querySelector('button').addEventListener('click', generateExpenditureReport)
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(viewExpendituresetCurrentPage)
    await fetchViewExpenditureTableData()
}


async function fetchViewExpenditureTableData() {
    await fetchViewExpenditureSuppliers()
    await fetchViewExpenditureLocations()
}   
    
async function generateExpenditureReport(event) {
    event.target.disabled = true;
    let paramstr = new FormData(form)
    paramstr.append('ttype','EXPENSES')
    let result = await fetch('../controllers/fetchtdetail.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        document.querySelector('#viewexpendituretable tbody').innerHTML === ''
        event.target.disabled = false;
        expenditures = datasource = res.data;
        expenditures.length && initPagination(expenditures, viewExpendituresetCurrentPage)
    }
    else {
        callModal('No records retrieved')
        event.target.disabled = false;
    }
}

var viewExpendituresetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(expenditures.length) {
        expenditures.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendExpendituresTableRows(item, index)
            }
        })
        
        if (pageCount === currentPage) appendViewExpenditureTableFoot()
        else {
            try {
                document.querySelector('#viewexpendituretable tfoot')?.remove()
            }
            catch(e) {console.log(e)}
        }
        
         if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#viewexpendituretable #tablefooter')){
            document.querySelector('#viewexpendituretable #tablefooter')?.remove()
            viewpaymentsbtn.click()
            form.querySelector('button').click()
        }
        
    }
}

function appendExpendituresTableRows(item, index) {
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ (Number.isInteger(+item.accountnumber) && item.accountnumber !== null)  ? (viewexpendituresuppliers.find(val => val.id == item.accountnumber))?.companyname : item.accountnumber }</td>
            <td>${ (viewexpenditurelocations.find(val => val.id == item.location)).location } </td>
            <td>${ new Date(item.transactiondate).toLocaleDateString()} </td>
            <td>${item.description}</td>
            <td style="text-align:left">${formatMoney(item.credit)}</td>
            <td style="text-align:left">${formatMoney(item.debit)}</td>
        </tr>
    `
}

function appendViewExpenditureTableFoot() {
    let footer = document.createElement('tfoot')
    let html = `
        <tfoot>
            <tr>
                <td colspan="5" style="text-align:left;padding:7px;font-weight:bolder;font-size:12px"> TOTAL</td>
                <td style="font-weight:bolder;padding:7px;font-size:12px">${formatMoney(datasource.reduce((total, curr) => total + (+curr.credit), 0))}</td>
                <td style="font-weight:bolder;padding:7px;font-size:12px">${formatMoney(datasource.reduce((total, curr) => total + (+curr.debit), 0))}</td>
            </tr>
        </tfoot>
    `
    footer.innerHTML = html; 
    if(document.getElementById('viewexpendituretable')) {
        document.getElementById('viewexpendituretable')?.querySelector('tfoot')?.remove()
        document.getElementById('viewexpendituretable').appendChild(footer)
    }
}

async function fetchViewExpenditureSuppliers() {
    let result = await fetch('../controllers/fetchsupplierscript.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) viewexpendituresuppliers = res.data?.data;
}

async function fetchViewExpenditureLocations() {
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) viewexpenditurelocations = res.data?.data;
}

var viewexpendituresbtn = document.getElementById("viewexpenditures");
if (viewexpendituresbtn) viewexpendituresbtn.addEventListener("click", viewexpenditures);
