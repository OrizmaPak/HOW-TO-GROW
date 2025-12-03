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