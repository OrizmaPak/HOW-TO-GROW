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
            <input class="jformcontrol jmargin-top debit" type="number">
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