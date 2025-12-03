// expenditures --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form;
async function openExpenditure() {
    await httpRequest('expenditure.php')
    form = document.getElementById('expenditureform')
    if(form) {
        trows = form.querySelector('#trows')
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', validateExpenditureForm)
        form.querySelector('#transactiondate').valueAsDate = new Date()
        await fetchExpenditureFormData()
    }
}

function removeTransactionRow(event) {
     let itemcolumns = trows.querySelectorAll('.item')
     if(itemcolumns.length !== 1) event.target.parentElement.parentElement.remove()
    
}

function calculateexpendituredebit(){
    let x = 0;
    for(let i=0;i<document.getElementsByClassName('calculateexpendituredebit').length;i++){
        if(document.getElementsByClassName('calculateexpendituredebit')[i].value)x = x + Number(document.getElementsByClassName('calculateexpendituredebit')[i].value)
    }
    document.getElementById('totaldebit').value = x
}
 
function appendTransactionRow(event) {
    let div = document.createElement('div')
    div.style.cssText = 'align-items:end'; 
    div.classList.add('jformgroup', 'form_row', 'item')
    div.innerHTML = ` 
        <div class="jformgroup jformgroupcol"> 
            <label for="company-name" class="jcontrollabel">Description.</label>
            <input class="jformcontrol jmargin-top description" type="text">
        </div>
         
        <div class="jformgroup jformgroupcol  jmargin-left">
            <label for="company-name" class="jcontrollabel">Debit</label>
            <input onchange="calculateexpendituredebit()" class="calculateexpendituredebit jformcontrol jmargin-top debit" type="number">
        </div>
        <div class="jformgroup jformgroupcol" style="width: auto;margin-left: 5px">
            <button type="button" class="j-action-btn"
                style="text-transform: capitalize;background-color:red" onclick="removeTransactionRow(event)">del</button>
        </div>
    `
    trows.appendChild(div)
}

async function fetchExpenditureFormData() {
    await fetchExpenditureLocations()
    await fetchExpenditureSuppliers()
}

async function fetchExpenditureLocations() {
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        expenditurelocations = res.data?.data;
        let options = '';
        expenditurelocations?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.location} </option>
            `
        })
        if(form.querySelector('#branch')){
            form.querySelector('#branch').innerHTML = ''
            form.querySelector('#branch').innerHTML = '<option value="" selected="">--Select branch --</option>'+options
            form.querySelector('#branch').value = assetsUrl.sessionLocation
        }
    }
}

async function fetchExpenditureSuppliers() {
    let result = await fetch('../controllers/fetchsupplierscript.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        expendituresuppliers = res.data?.data;
        let options = ''
        expendituresuppliers?.map(function(item, index){
            options += `
                <option value="${item.companyname}">
            `
        })
        if(form.querySelector('#supplier')){
            let list = document.createElement('datalist')
            list.id = 'supplierslist';
            list.innerHTML = options
            form.querySelector('#supplier').parentElement.appendChild(list)
        }
    }
}

function validateExpenditureForm() {
    inputs = [
        { input: form.querySelector('#supplier'), validation: {required: 'particulars is required'}},
        { input: form.querySelector('#branch'), validation: {required: 'branch is required'}},
        { input: form.querySelector('#transactiondate'), validation: {required: 'transaction date is required'}},
        { input: form.querySelector('#postvoucherno'), validation: {required: 'post voucher no is required'}},
        { input: form.querySelector('#totaldebit'), validation: {required: 'Total debit is required'}},
        { input: form.querySelector('#amountpaid'), validation: {required: 'Amount paid is required'}},
    ]
    
    let itemcolumns = trows.querySelectorAll('.item')
    if(itemcolumns.length > 0) {
        Array.from(itemcolumns).map( (item, index) => {
            inputs.push({ input: item.querySelector('.description'), validation: {required: `Row ${index + 1} description is required`}})
            inputs.push({ input: item.querySelector('.debit'), validation: {required: `Row ${index + 1} debit is required`}})
        })
    }

    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else  {
        
        let supplieritem = expendituresuppliers.find(item => item.companyname.toLowerCase().trim() === form.querySelector('#supplier').value.toLowerCase().trim())
        if(!supplieritem) {
            if(parseFloat(form.totaldebit.value) !== parseFloat(form.amountpaid.value)) {
                form.totaldebit.style.borderColor = 'red'
                form.amountpaid.style.borderColor = 'red'
                return callModal('This transaction is not allowed')
            }
            else {
                form.totaldebit.style.borderColor = ''
                form.amountpaid.style.borderColor = ''
                saveExpenditure()
            }
        }
        else {
            form.totaldebit.style.borderColor = ''
            form.amountpaid.style.borderColor = ''
            saveExpenditure()
        }
    }
}

async function saveExpenditure() {
    
    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/tdetailscript.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Information saved successfully', 1)
                    form.reset();
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }

    request.setRequestHeader('Connection','close'); 
    request.send(getExpenditeFormParams());
}

function getExpenditeFormParams() {
    let paramstr = new FormData(document.getElementById('expenditureform'))
    paramstr.append('paymentmethod', form.querySelector('input[type="checkbox"]').checked ? 'CHEQUE' : 'CASH')
    let supplieritem = expendituresuppliers.find(item => item.companyname.toLowerCase().trim() === form.querySelector('#supplier').value.toLowerCase().trim())
    paramstr.append('accountnumber', supplieritem ? supplieritem.id : form.querySelector('#supplier').value)
    paramstr.append('ttype', 'EXPENSES')
    if(paramstr) {
        let itemcolumns = trows.querySelectorAll('.item')
        if(itemcolumns.length > 0) {
            paramstr.append('gridsize', itemcolumns.length)
            Array.from(itemcolumns).map( (item, index) => {
                paramstr.append(`description${index}`, item.querySelector('.description').value)
                paramstr.append(`debit${index}`, item.querySelector('.debit').value)
            })
        }
    }
    return paramstr
}

var expenditurebtn = document.getElementById('expenditure')
if(expenditurebtn) expenditurebtn.addEventListener('click', openExpenditure, false)


//   --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = [];
let approveexpendituresuppliers;
let approveexpenditurelocations;
async function approveexpenditures () {
    await  httpRequest('approveexpenditures.php');
    form = document.getElementById('filterapproveexpenditureform')
    if(form.querySelector('button')) form.querySelector('button').addEventListener('click', generateExpenditureReportapprove)
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(approveExpendituresetCurrentPage)
    await fetchapproveExpenditureTableData()
}


async function fetchapproveExpenditureTableData() {
    await fetchapproveExpenditureSuppliers()
    await fetchapproveExpenditureLocations()
}   
    
async function generateExpenditureReportapprove(event) {
    // alert('reset')
        document.querySelector('#approveexpendituretable tbody').innerHTML = ''
        // document.querySelector('#approveexpendituretable tfoot').innerHTML = ''
    event.target.disabled = true;
    let paramstr = new FormData(form)
    // paramstr.append('ttype','EXPENSES')
    let result = await fetch('../controllers/fetchexpensesforapproval.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        document.querySelector('#approveexpendituretable tbody').innerHTML = ''
        event.target.disabled = false;
        expenditures = datasource = res.data;
        expenditures.length && initPagination(expenditures, approveExpendituresetCurrentPage)
    }
    else {
        callModal('No records retrieved')
        event.target.disabled = false;
    }
}

var approveExpendituresetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(expenditures.length) {
        expenditures.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendExpendituresTableRowsapprove(item, index)
            }
        })
        
        if (pageCount === currentPage) appendapproveExpenditureTableFoot()
        else {
            try {
                document.querySelector('#approveexpendituretable tfoot')?.remove()
            }
            catch(e) {console.log(e)}
        }
        
         if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#approveexpendituretable #tablefooter')){
            document.querySelector('#approveexpendituretable #tablefooter')?.remove()
            approvepaymentsbtn.click()
            form.querySelector('button').click()
        }
        
    }
}

function appendExpendituresTableRowsapprove(item, index) {
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ (Number.isInteger(+item.accountnumber) && item.accountnumber !== null)  ? (approveexpendituresuppliers.find(val => val.id == item.accountnumber))?.companyname : item.accountnumber }</td>
            <td>${ (approveexpenditurelocations.find(val => val.id == item.location)).location } </td>
            <td>${ new Date(item.transactiondate).toLocaleDateString()} </td>
            <td>${item.description}</td>
            <td style="text-align:left">${formatMoney(item.credit)}</td>
            <td style="text-align:left">${formatMoney(item.debit)}</td>
            <td class="no-pr">
                <div style="align-items:center;display: ${item.status == 'ACTIVE' ? 'flex': 'none'};display: flex;gap: 10px" class="flex no-pr">
                    <button ${item.transactionstatus == 'PENDING' ? 'disabled': ''} style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px; display: ${item.status == 'PENDING' ? 'none': 'block'}" value="${index}" onclick="cancelapproveexpenditureTransfer('${item.id}', 'APPROVED')">Approve</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:tomato;border-radius:3px;" value="${index}" onclick="cancelapproveexpenditureTransfer('${item.id}', 'DECLINED')">Decline</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px;" value="${index}" onclick="viewexpenditureapproveTransfer(${item.id})">View</button>
                </div>
            </td>
        </tr>
    `
}

function cancelapproveexpenditureTransfer(id, status) {
    // Determine the action message dynamically based on the status
    let actionMessage = status === 'approve' 
        ? 'approve this expenditure transfer' 
        : 'cancel this expenditure transfer';

    // Show confirmation modal using SweetAlert2
    Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to ${actionMessage}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, ${status}`,
        cancelButtonText: 'No, cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Proceed with the action if confirmed
            let param = new FormData();
            param.append('id', id);
            param.append('status', status);

            function action(result) {
                if (result.status) {
                    Swal.fire(
                        'Success!',
                        result.message,
                        'success'
                    ).then(() => {
                        // Call the report generation function after success
                        generateExpenditureReportapprove();
                    });
                } else {
                    Swal.fire(
                        'Error!',
                        result.message,
                        'error'
                    );
                        generateExpenditureReportapprove();
                }
            }

            // Call the controller function
            callController('approveexpenditures.php', param, 'approveexpenditures', null, action);
        } else {
            // Optional: Handle the case where the user cancels the action
            Swal.fire(
                'Cancelled',
                'Your action has been aborted.',
                'info'
            );
        }
    });
}


function viewexpenditureapproveTransfer(id){
    let data = datasource.filter(sdata => sdata.id == id)[0];
    console.log('thedata', data);

    // Helper function to safely retrieve nested properties
    const getNestedProperty = (array, id, property) => {
        const item = array.find(val => val.id == id);
        return item ? item[property] : 'N/A';
    };

    // Determine the Recipient/Rayee name
    const recipientName = (Number.isInteger(+data.accountnumber) && data.accountnumber !== null) 
        ? getNestedProperty(approveexpendituresuppliers, data.accountnumber, 'companyname') 
        : data.accountnumber;

    // Determine the Location
    const locationName = getNestedProperty(approveexpenditurelocations, data.location, 'location');

    // Determine the Status with color-coding
    const statusStyles = {
        'Pending': 'color: #FFA500;', // Orange
        'Approved': 'color: #28a745;', // Green
        'Rejected': 'color: #dc3545;', // Red
        // Add more statuses and colors as needed
    };
    const statusStyle = statusStyles[data.status] || 'color: #6c757d;'; // Default Grey

    // HTML Content for the Modal
    let htmlContent = `
        <style>
            .modal-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }
            .modal-table th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                width: 30%;
                font-size: 14px;
                color: #333;
            }
            .modal-table td {
                padding: 8px;
                font-size: 14px;
                color: #555;
                border-bottom: 1px solid #ddd;
            }
            .status-badge {
                font-weight: bold;
                padding: 4px 8px;
                border-radius: 4px;
                display: inline-block;
            }
        </style>
        <div style="text-align: left;">
            <table class="modal-table">
                <tr>
                    <th>Recipient / Rayee:</th>
                    <td>${recipientName}</td>
                </tr>
                <tr>
                    <th>Credit:</th>
                    <td>${data.credit}</td>
                </tr>
                <tr>
                    <th>Credit Total:</th>
                    <td>${data.credittotal}</td>
                </tr>
                <tr>
                    <th>Debit:</th>
                    <td>${data.debit}</td>
                </tr>
                <tr>
                    <th>Debit Slip No:</th>
                    <td>${data.debitslipno || "N/A"}</td>
                </tr>
                <tr>
                    <th>Debit Total:</th>
                    <td>${data.debittotal}</td>
                </tr>
                <tr>
                    <th>Description:</th>
                    <td>${data.description}</td>
                </tr>
                <tr>
                    <th>Location:</th>
                    <td>${locationName}</td>
                </tr>
                <tr>
                    <th>Payment Method:</th>
                    <td>${data.paymentmethod}</td>
                </tr>
                <tr>
                    <th>Reference:</th>
                    <td>${data.reference}</td>
                </tr>
                <tr>
                    <th>Serial Number:</th>
                    <td>${data.serialnumber || "N/A"}</td>
                </tr>
                <tr>
                    <th>Service Charge:</th>
                    <td>${data.servicecharge}</td>
                </tr>
                <tr>
                    <th>Status:</th>
                    <td><span class="status-badge" style="${statusStyle}">${data.status}</span></td>
                </tr>
                <tr>
                    <th>Transaction Date:</th>
                    <td>${formatDate(data.transactiondate)}</td>
                </tr>
                <tr>
                    <th>Transaction Type:</th>
                    <td>${data.ttype}</td>
                </tr>
            </table>
        </div>
    `;

    // Display the Modal using SweetAlert2
    Swal.fire({
        title: 'Transaction Details',
        html: htmlContent,
        icon: 'info',
        confirmButtonText: 'Close',
        width: '600px',
        customClass: {
            popup: 'swal2-border-radius',
            title: 'swal2-title-custom',
        }
    });
}



function appendapproveExpenditureTableFoot() {
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
    if(document.getElementById('approveexpendituretable')) {
        document.getElementById('approveexpendituretable')?.querySelector('tfoot')?.remove()
        document.getElementById('approveexpendituretable').appendChild(footer)
    } 
}

async function fetchapproveExpenditureSuppliers() { 
    let result = await fetch('../controllers/fetchsupplierscript.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) approveexpendituresuppliers = res.data?.data;
} 

async function fetchapproveExpenditureLocations() {
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) approveexpenditurelocations = res.data?.data;
}

var approveexpendituresbtn = document.getElementById("approveexpenditures");
if (approveexpendituresbtn) approveexpendituresbtn.addEventListener("click", approveexpenditures);


//   --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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



//  payments  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form;
async function openPayments() {
    await httpRequest('payments.php')
    form = document.getElementById('expenditurepaymentform')
    if(form) {
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', validatePaymentsForm)
        await fetchPaymentsFormData()
        if(!!sessionStorage.getItem('payment')) templateMode('edit')
        else templateMode()
    }
}

async function templateMode(mode='save') {
    if(mode == 'edit') {
        localitem = JSON.parse(sessionStorage.getItem('payment'))
        let supplier = paymentsuppliers.find(item => item.id === localitem.accountnumber)
        form.supplier.value = supplier.companyname;
        form.supplier.setAttribute('readonly','readonly')
        fetchSupplierPayment(appendPaymentTransactionInfo)
    }
    else {
        form.querySelector('#transactiondate').valueAsDate = new Date()
        form.querySelector('#supplier').addEventListener('change', fetchSupplierPayment)
        sessionStorage.clear()
    }
}

function appendPaymentTransactionInfo() {
    try {
        form.querySelector('#transactiondate').value = localitem.transactiondate.split(' ')[0]
        form.querySelector('#amountpaid').value = localitem.debit
        form.querySelector('#description').value = localitem.description.toLowerCase()
        form.querySelector('input[type="checkbox"]').checked = (localitem.paymentmethod == 'CASH' ? false: true)
        form.querySelector('button#submit').innerHTML = 'Save Changes'
        let input = document.createElement('input')
        input.type = 'hidden'; input.name = 'id'; input.value = value=`${localitem.id}`
        form.appendChild(input)
        sessionStorage.clear()
        
    }
    catch(e) {console.log(e)}
}

async function fetchPaymentsFormData() {
    // await fetchPaymentsLocations()
    await fetchPaymentsSuppliers()
}

async function fetchSupplierPayment(callback=null) {
    
    let supplier = paymentsuppliers.find(item => item.companyname.toLowerCase().trim() === form.querySelector('#supplier').value.toLowerCase().trim())

    let paramstr = new FormData()
    paramstr.append('id', supplier.id)
    
    let result = await httpJsonRequest('../controllers/fetchsupplierprofile.php', 'POST', paramstr)
    if(result) {
        if(result.status) {
            form.querySelector('#balance').innerHTML = formatMoney(result.data.balance)
            form.querySelector('#balance').parentElement.parentElement.style.backgroundColor = '#dae8e0'
            if(callback) callback()
        }
        else {
            form.querySelector('#balance').parentElement.parentElement.style.backgroundColor = 'rgb(225, 227, 230, 0.5)'
            sessionStorage.clear()
            return callModal(result.message, 1)
        }
    }
    else {
        sessionStorage.clear()
        return callModal('Error: Unable to perform operation', 0)
    }
}

async function fetchPaymentsLocations() {
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        expenditurelocations = res.data?.data;
        let options = '';
        expenditurelocations?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.location} </option>
            `
        })
        if(form.querySelector('#branch')){
            form.querySelector('#branch').innerHTML = ''
            form.querySelector('#branch').innerHTML = '<option value="" selected="">--Select branch --</option>'+options
            form.querySelector('#branch').value = assetsUrl.sessionLocation
        }
    }
}

async function fetchPaymentsSuppliers() {
    let result = await fetch('../controllers/fetchsupplierscript.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        paymentsuppliers = res.data?.data;
        let options = ''
        paymentsuppliers?.map(function(item, index){
            options += `
                <option value="${item.companyname}">
            `
        })
        if(form.querySelector('#supplier')){
            let list = document.createElement('datalist')
            list.id = 'supplierslist';
            list.innerHTML = options
            form.querySelector('#supplier').parentElement.appendChild(list)
        }
    }
}

function validatePaymentsForm() {
    inputs = [
        { input: form.querySelector('#supplier'), validation: {required: 'particulars is required'}},
        { input: form.querySelector('#transactiondate'), validation: {required: 'transaction date is required'}},
        { input: form.querySelector('#description'), validation: {required: 'Descriptionis required'}},
        { input: form.querySelector('#amountpaid'), validation: {required: 'Amount paid is required'}},
    ]

    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else  savePayments()
}

async function savePayments() {
    
    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/paymentscript.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Payments posted successfully', 1)
                    form.querySelector('button#submit').innerHTML = 'Submit'
                    form.supplier.removeAttribute('readonly')
                    form.reset();
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }

    request.setRequestHeader('Connection','close'); 
    request.send(getPaymentsFormParams());
}

function getPaymentsFormParams() {
    let paramstr = new FormData(document.getElementById('expenditurepaymentform'))
    let supplieritem = paymentsuppliers.find(item => item.companyname.toLowerCase().trim() === form.querySelector('#supplier').value.toLowerCase().trim())
    paramstr.append('accountnumber', supplieritem ? supplieritem.id : form.querySelector('#supplier').value)
    paramstr.append('paymentmethod', form.querySelector('input[type="checkbox"]').checked ? 'CHEQUE' : 'CASH')
    paramstr.append('location', assetsUrl.sessionLocation)
    return paramstr
}

var paymentsbtn = document.getElementById('payments')
if(paymentsbtn) paymentsbtn.addEventListener('click', openPayments, false)



//  view payments  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
