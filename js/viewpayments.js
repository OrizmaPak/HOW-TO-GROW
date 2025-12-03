var form; datasource = [];

async function openViewPayments () {
    await  httpRequest('viewpayments.php');
    form = document.getElementById('filterviewpaymentsform')
    if(form.querySelector('button')) form.querySelector('button').addEventListener('click', generateViewPaymentReport)
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(viewPaymentsetCurrentPage)
    await fetchViewPaymentTableData()
}


async function fetchViewPaymentTableData() {
    await fetchViewPaymentSuppliers()
    await fetchViewPaymentLocations()
}   
    
async function generateViewPaymentReport(event) {
    event.target.disabled = true;
    let paramstr = new FormData(form)
    paramstr.append('ttype','EXPENSES')
    let result = await fetch('../controllers/fetchpayments.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        document.querySelector('#viewpaymentstable tbody').innerHTML === ''
        event.target.disabled = false;
        payments = datasource = res.data;
        payments.length && initPagination(payments, viewPaymentsetCurrentPage)
    }
    else {
        callModal('No records retrieved')
        event.target.disabled = false;
    }
}

var viewPaymentsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(payments.length) {
        payments.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendViewPaymentsTableRows(item, index)
            }
        })
        
        if (pageCount === currentPage) appendViewPaymentTableFoot()
        else {
            try {
                document.querySelector('#viewpaymentstable #tablefooter')?.remove()
            }
            catch(e) {console.log(e)}
        }
        
        if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#viewpaymentstable #tablefooter')){
            document.querySelector('#viewpaymentstable #tablefooter')?.remove()
            viewpaymentsbtn.click()
            form.querySelector('button').click()
        }
        
    }
}

function appendViewPaymentsTableRows(item, index) {
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ (Number.isInteger(+item.accountnumber) && item.accountnumber !== null)  ? (viewpaymentsuppliers.find(val => val.id == item.accountnumber))?.companyname : item.accountnumber }</td>
            <td>${ (viewpaymentlocations.find(val => val.id == item.location)).location } </td>
            <td>${ new Date(item.transactiondate).toLocaleDateString()} </td>
            <td>${item.description}</td>
            <td style="text-align:left">${formatMoney(item.debit)}</td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="editPayments(event, 0)">Edit</button>
                </div>
            </td>
        </tr>
    `
}

async function editPayments(event, index) {
   let selecteditem =  payments[index]
   if(selecteditem) {
       sessionStorage.setItem('payment', JSON.stringify(selecteditem))
       if(document.getElementById('payments')) document.getElementById('payments').click()
   }
   else return callModal('Item selected is unavaliable', 0)
}

function appendViewPaymentTableFoot() {

     document.querySelector('#viewpaymentstable tbody').innerHTML += `
        <tr id="tablefooter">
            <td colspan="5" style="text-align:left;padding:7px;font-weight:bolder;font-size:12px"> TOTAL</td>
            <td style="font-weight:bolder;padding:7px;font-size:12px;text-align:left;">${formatMoney(datasource.reduce((total, curr) => total + (+curr.debit), 0))}</td>
            <td style="font-weight:bolder;padding:7px;font-size:12px;text-align:left;"></td>
        </tr>
    `
}

async function fetchViewPaymentSuppliers() {
    let result = await fetch('../controllers/fetchsupplierscript.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) viewpaymentsuppliers = res.data?.data;
}

async function fetchViewPaymentLocations() {
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) viewpaymentlocations = res.data?.data;
}

var viewpaymentsbtn = document.getElementById("viewpayments");
if (viewpaymentsbtn) viewpaymentsbtn.addEventListener("click", openViewPayments);
