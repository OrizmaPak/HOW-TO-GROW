// loan fee  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
var form;
async function openAddloanFee () {
    await httpRequest('addloanfee.php')
    form = document.getElementById('addloanfeeform');
    let saveLoanFeeBtn = form.querySelector('button#saveloanfeebtn');
    if(document.querySelector('#addloanfeeform #swittchhtr8')){
        document.querySelector('#addloanfeeform #swittchhtr8').addEventListener('click', e=>{
            if(document.querySelector('#addloanfeeform #swittchhtr8').checked){
                document.querySelector('#addloanfeeform #swittchhtr8').checked = false;
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div small').style.left = '0%';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.backgroundColor = 'grey';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.borderColor = 'grey';
            }else{
                document.querySelector('#addloanfeeform #swittchhtr8').checked = true;
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.backgroundColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.borderColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div small').style.left = '50%'
            }
        })
    }
    if(document.querySelector('#addloanfeeform #swittchhtr9')){
        document.querySelector('#addloanfeeform #swittchhtr9').addEventListener('click', e=>{
            if(document.querySelector('#addloanfeeform #swittchhtr9').checked){
               document.querySelector('#addloanfeeform #swittchhtr9').checked = false;
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div small').style.left = '0%';
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.backgroundColor = 'grey';
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.borderColor = 'grey';
            }else{
                document.querySelector('#addloanfeeform #swittchhtr9').checked = true;
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.backgroundColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.borderColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div small').style.left = '50%'
            }
        })
    }
    if(saveLoanFeeBtn) saveLoanFeeBtn.addEventListener('click', runLoanFeeFormValidations)
      
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(viewloanFeessetCurrentPage)
    await fetchPageData()
}

async function fetchPageData() {
    await fetchAddLoanGLAccounts()
    await fetchExistingLoanFees()
}

function runLoanFeeFormValidations() {
    
    inputs = [
        {input: form.querySelector('#addfeename'), validation: { required: 'fee is required'}}, 
        {input: form.querySelector('#feemethod'), validation: { required: 'fee posting frequency is required'}},
        {input: form.querySelector('#chargebasedon'), validation: { required: 'fee addition period is required'}},
        {input: form.querySelector('#addloanfeeglaccount'), validation: { required: 'loan fee gl is required'}}
    ]

    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else saveLoanFee()
}

async function saveLoanFee() {
    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/loanfeescript.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    
                    form.querySelector('button#saveloanfeebtn').innerHTML = 'Submit'
                    form.querySelector('#addfeename').removeAttribute('readonly')
                    
                    callModal('loan fee saved successfully', 1)
                    form.reset();
                    openAddloanFee()
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
    request.send(getAddLoanFormFormData());
}

function getAddLoanFormFormData() {
    let paramstr = new FormData(form);
    return paramstr
}

async function fetchAddLoanGLAccounts() {
    let paramstr = new FormData();
    paramstr.append('accounttype', 'INCOME')
    let result = await httpJsonRequest('../controllers/fetchglbyaccounttype.php', 'POST', paramstr);
    if(result?.status) {
        addloanfeeglaccounts = result.data
        let options = ''
        result.data?.map(function(item, index){
            options += `
                <option value="${item.accountnumber}"> ${ item.description} | ${item.accountnumber} </option>
            `
        })
        if(form.querySelector('#addloanfeeglaccount')){
            form.querySelector('#addloanfeeglaccount').innerHTML = ''
            form.querySelector('#addloanfeeglaccount').innerHTML = '<option value=""> -- Select Fee GL Account -- </option>' + options
        }
    }
}

async function fetchExistingLoanFees() {
    let result = await httpJsonRequest('../controllers/fetchloanfees.php');
     if(result?.status) {
         existingfees = datasource = result.data.data;
         existingfees.length && initPagination(existingfees, viewloanFeessetCurrentPage)
     }
}

function viewloanFeessetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(existingfees.length) {
        existingfees.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendLoanFeesTableRows(item, index)
            }
        })
        if(document.querySelector('#viewdepositstable tbody').innerHTML === '') addloanfeebtn.click()
    }
}

async function appendLoanFeesTableRows(item, index) {
    let gl = addloanfeeglaccounts?.find(val => val.accountnumber === item.loanfeeglaccount)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ item.feename } </td>
            <td>${ item.feemethod } </td>
            <td>${ item.chargebasedon} </td>
            <td>${gl?.description}</td>
            <td>
                <div class="flex" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="editLoanFee(${index})">Edit</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="removeLoanFee(${index})">Delete</button>
                </div>
            </td>
        </tr>
    `
}

async function removeLoanFee(index) {
    let selecteditem = existingfees[index];
    if(confirm(`Are you sure you want to delete ${selecteditem.feename.toLowerCase()}?`)) {
        let paramstr = new FormData() 
        paramstr.append('id', selecteditem?.id)
        let result = await httpJsonRequest('../controllers/deleteloanfee.php', 'POST', paramstr);
        if(result?.status) {
            callModal('Loan fee deleted', 1)
            openAddloanFee()
        }
        else callModal(result.message, 0)
    }
}

function editLoanFee(index) {

    let selecteditem = existingfees[index];
    if(selecteditem) {
        try {
            form.querySelector('button#saveloanfeebtn').innerHTML = 'Update Fee'
            form.querySelector('#addfeename').setAttribute('readonly', true);
            
            form.querySelector('#addfeename').value = selecteditem.feename
            form.querySelector('#addloanfeeglaccount').value = selecteditem.loanfeeglaccount
            form.querySelector('#feemethod').value = selecteditem.feemethod
            form.querySelector('#chargebasedon').value = selecteditem.chargebasedon

        }
        catch(e) {console.log(e)}
    }
}

const addloanfeebtn = document.getElementById('addloanfee')
if(addloanfeebtn) addloanfeebtn.addEventListener('click', openAddloanFee, false)


// loan  products -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
 var form;
async function openLoanProducts () {
    await httpRequest('loanproducts.php')
    form = document.getElementById('loanproductform');
    if(form) {
        
        form.querySelector('button').addEventListener('click', function() {
            if(form.querySelector('#loanproduct').value < 1) {
                errorBox('Product name is required')
                form.querySelector('#loanproduct').style.borderColor ='red'
            }
            else {
                form.querySelector('#loanproduct').style.borderColor =''
                saveLoanProduct()
            }
        })
        
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(existingLoanProductsSetCurrentPage)
        await fetchExistingLoanProducts()
    }
}

async function fetchExistingLoanProducts() {
    let result = await httpJsonRequest('../controllers/fetchloanproducts.php')
    if(result?.status) {
        existingloansproducts = datasource = result.data.data
        existingloansproducts.length && initPagination(existingloansproducts, existingLoanProductsSetCurrentPage)
    }
}

function existingLoanProductsSetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(existingloansproducts.length) {
        existingloansproducts.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendLoanProductsTableRows(item, index)
            }
        })
        
        if(document.querySelector('#loanproducttable tbody').innerHTML === '') LoanProductsbtn.click()
    }
}

async function appendLoanProductsTableRows(item, index) {
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ item.loanproductname } </td>
            <td>
                <div class="flex" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="removeLoanProduct(${index})">Delete</button>
                </div>
            </td>
        </tr>
    `
}

async function removeLoanProduct(index) {
    let selecteditem = existingloansproducts[index];
    if(confirm(`Are you sure you want to delete ${selecteditem.loanproductname.toLowerCase()}?`)) {
        let paramstr = new FormData() 
        paramstr.append('id', selecteditem?.id)
        let result = await httpJsonRequest('../controllers/deleteloanproduct.php', 'POST', paramstr);
        if(result?.status) {
            callModal('Loan product deleted', 1)
            openLoanProducts()
        }
        else callModal(result.message, 0)
    }
}


async function saveLoanProduct() {
    let paramstr = new FormData(form)
    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/loanproductscript.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Loan product saved successfully', 1)
                    form.reset();
                    openLoanProducts()
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
    request.send(paramstr);
    
}

const LoanProductsbtn = document.getElementById('loanproducts')
if(LoanProductsbtn) LoanProductsbtn.addEventListener('click', openLoanProducts, false)



// add loan  account  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 async function openLoanAccount () { 
    
    await httpRequest('loanaccount.php')

    feeAppendBtn = document.getElementById('feeappendbtn');
    saveLoanAccountBtn = document.getElementById('saveloanaccountbtn');
    if(saveLoanAccountBtn) saveLoanAccountBtn.disabled = true;
    loanSetContainer = document.querySelector('.col-form-group .loan-set');
    
    customerIds = document.getElementById('customerids');
    loanProduct = document.querySelector('.jformgroup #loanproduct');
    principalAmount = document.getElementById('principalamount');
    beginDate = document.getElementById('begindate');
    interestMethod = document.getElementById('interestmethod');
    interestType = document.getElementById('interesttype');
    interestRate = document.getElementById('interestrate');
    interestPeriod = document.getElementById('interestperiod');
    loanDuration = document.getElementById('loanduration');
    loanDurationFactor = document.getElementById('loandurationfactor')
    loanFrequency = document.getElementById('frequency');
    noOfRepayments = document.getElementById('no_repayments'); 
    loantype = document.getElementById('loantype');
    installmentAmount = document.getElementById('installmentamount');
    loanCurrency = document.getElementById('lcurrency');
    loanPurpose = document.getElementById('purpose');
    loanSecurity = document.getElementById('security')
    previousbranch = document.getElementById('previousbranch')
    previousaccount = document.getElementById('previousaccount')
    connectcustomeraccount = document.getElementById('connectcustomeraccount')
    loanOfficer = document.getElementById('loanofficer');
    customerAccountNumber = document.querySelector('.jformgroup #customeraccount')
    customerAccountName = document.getElementById('customeraccountname');
    glloanaccount = document.getElementById('glloanaccount');
    glcashaccount = document.getElementById('glcashaccount');
    loanAccountDecription = document.getElementById('loanaccountdecription');
    
    authorisationPassword = document.getElementById('authorisation');
    if(authorisationPassword) authorisationPassword.disabled = true;
    
    sendforapproval = document.getElementById('sendforapproval');
    if(sendforapproval) sendforapproval.addEventListener('change', e => authorisationPassword.disabled = e.target.checked ? true : false )
    
    loanaccountform = document.getElementById('loanaccountform');
    resetloanaccountbtn  = document.getElementById('resetloanaccountbtn')

    let loanFees = [];
    
    
    
    if(feeAppendBtn) feeAppendBtn.addEventListener('click', () => appendLoanFeeHTML())
    if(saveLoanAccountBtn) saveLoanAccountBtn.addEventListener('click', () => runLoanFormValidations())
    if(interestPeriod) interestPeriod.addEventListener('click', e => {
        if(loanFrequency) {
            loanFrequency.selectedIndex = +e.target.selectedIndex;
            return
        }
    })
    if(loanFrequency) loanFrequency.addEventListener('click', e => {
        if(interestPeriod) {
            interestPeriod.selectedIndex = +e.target.selectedIndex;
            return
        }
    })
    
    if(resetloanaccountbtn) resetloanaccountbtn.addEventListener('click', () => resetLoanAccountForm())
    if(customerAccountNumber) customerAccountNumber.addEventListener('blur', fetchLoanAccountCustomerAccount)
    if(document.querySelector('button#calculatebtn')) document.querySelector('button#calculatebtn').addEventListener('click', validateCalculateLoanParams)
    if(interestMethod) interestMethod.addEventListener('change', e => {
        switch(e.target.selectedIndex) {
            case 0 :
                 ((interestType.selectedIndex = 0),disableSwitch(0))
                 break;
            case 1 :
                 ((interestType.selectedIndex = 0), disableSwitch(0))
                 break;
            case 2 :
                 ((interestType.selectedIndex = 1), disableSwitch(1))
                 break;
            case 3 :
                 ((interestType.selectedIndex = 3), disableSwitch(3))
                 break;
            case 4 :
                 ((interestType.selectedIndex = 1), disableSwitch(1))
                 break;
            case 5 :
                 ((interestType.selectedIndex = 1), disableSwitch(interestType.options.length))
                 break;
        }
       
    })
    
    if(beginDate) beginDate.valueAsDate = new Date();
    await fetchLoanAccountPageData();
}

function disableSwitch(index) {
    if(interestType) {
        Array.from(interestType.options).map( option => option.disabled = true);
        if(index === interestType.options.length) interestType.disabled = true
        else interestType.disabled = false
        interestType.options[index].disabled = false;
    }
}

function validateCalculateLoanParams() {
    
    inputs = [
        {input: principalAmount, validation: { required: 'Loan amount is required', pattern: 'Loan amount not valid'}, pattern: new RegExp(/^[0-9.]+$/)},
        {input: beginDate, validation: { required: 'Loan begindate is invalid'}},
        {input: loanFrequency, validation: { required: 'Loan repayment frequency is required'}},
        {input: loanDuration, validation: { required: 'Loan duration factor is required', pattern: 'Loan duration not valid'}, pattern: new RegExp(/^[0-9]+$/) },
        {input: loanDurationFactor, validation: { required: 'Loan duration factor is required'}},
        {input: interestMethod, validation: { required: 'Interest method is required'}},
    ]
    
    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field?.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)
    
    else {
        let mssg = '';
        if(interestMethod.value.trim() !== '' && interestMethod.value.trim() !== 'No Interest') {
            
            interestType.value.trim() === '' ? ((interestType.style.borderColor = 'red'), errorBox(mssg+= 'Loan interest type is invalid<br/>')) : interestType.style.borderColor = ''
            interestRate.value.trim() === '' ? ((interestRate.style.borderColor = 'red'), errorBox(mssg+= 'Loan interestrate is invalid<br/>')) : interestRate.style.borderColor = ''
        }
        if(mssg == '') calulateLoan()
    }

    
}

async function calulateLoan() {
    try {
        
        document.querySelector('button#calculatebtn').innerHTML = `Calculating...`;
        document.querySelector('button#calculatebtn').disabled = true;
        
        const result = await httpJsonRequest("../controllers/calculateloanscript.php", 'POST', getCalculateLoanParams());
        if (result.status) {
            if(saveLoanAccountBtn) saveLoanAccountBtn.disabled = false;
            if (result.type === "flatrate" || result.type === "One Off Interest" || result.type === "interestonly" || result.type === "No Interest") {
                installmentamount.value = result.data.installmentamount;
                noOfRepayments.value = result.data.numberofpayments;
                showResponse(result.message);
            }
    
            if (result.type === "reducingbalance") {
                installmentAmount.value = "N/A";
                noOfRepayments.value = result.data.numberofpayments;
                showResponse(result.message);
            }
        } 
        
        else {
            showResponse(result.message);
            installmentAmount.value = 0;
            noOfRepayments.value = 0;
        }
        
    } 
    
    catch(error) {
        console.log(error)
        showResponse("Error, please check your inputs")
    } 
    
    finally {
        document.querySelector('button#calculatebtn').innerHTML = `Calculate`;
        document.querySelector('button#calculatebtn').disabled = false;
    }

}

function getCalculateLoanParams() {
    const params = new FormData();
    params.append("principle", parseFloat(principalAmount.value));
    params.append("interestrate", parseFloat(interestRate.value));
    params.append("frequency", loanFrequency.value);
    params.append("loanduration", parseFloat(loanDuration.value));
    params.append("durationfactor", loanDurationFactor.value);
    params.append("interestmethod", interestMethod.value);
    params.append("interesttype", interestType.options[interestType.selectedIndex].value);
    params.append("begindate", beginDate.value);
    return params;
}

async function fetchLoanAccountPageData() {
    fetchLoanAccountCustomers()
    await fetchLoanAccountLoanFees()
    await fetchGlaAccounts('CASH', glcashaccount)
    await fetchGlaAccounts('ACCOUNTS RECEIVABLE', glloanaccount)
    fetchLoanAccountAccountOfficers()
    await fetchLoanProducts()
}

async function fetchLoanProducts() {
    let result = await httpJsonRequest('../controllers/fetchloanproducts.php')
    if(result?.status) {
        loansproducts =  result.data.data
        let options = ''
        loansproducts?.map(item => {
            options += `<option value="${ item.loanproductname}">`
        })
        if(loanProduct) {
            let list = document.createElement('datalist')
            list.innerHTML = options
            list.id = 'loanproductss'
            loanProduct.appendChild(list)
        }
    }
}

async function fetchLoanAccountCustomers () {
    let result = await httpJsonRequest('../controllers/fetchcustomeraccountscript.php')
    if(result?.status) {
        loanaccountcustomers = result.data.data
        let options = ''
        loanaccountcustomers?.map(item => {
            options += `<option value="${item.firstname + ' ' + item.lastname +  ' ' +(item.othernames ?? '')}">`
        })
        if(customerIds) {
            let list = document.createElement('datalist')
            list.innerHTML = options
            list.id = 'customers'
            customerIds.appendChild(list)
        }
    }
}

async function fetchLoanAccountCustomerAccount()  {
    let paramstr = new FormData();
    paramstr.append('accountnumber', document.querySelector('#loanaccountform #customeraccount').value)
    let result = await httpJsonRequest('../controllers/fetchaccountprofile.php', 'POST', paramstr)
    if(result.status) {
        let parseResult = customerlist = JSON.parse(JSON.stringify(result))
        try {
            document.querySelector('#loanaccountform #customeraccountname').value = parseResult.data[0].customerdetail.firstname + ' ' + parseResult.data[0].customerdetail.lastname + ' ' + (parseResult.data[0].customerdetail.othernames ?? '')
        }
        catch(e) {console.log(e)}
       
    } else {
        if(result.message.includes('Not successful')) callModal('Account not found', 0)
        else callModal(result.message || 'Error! Unable to perform task', 0)
        document.querySelector('#loanaccountform #customeraccountname').value = null
    }
}

async function fetchGlaAccounts(type, selector) {
    let paramstr = new FormData();
    paramstr.append('accounttype', type)
    let result = await httpJsonRequest('../controllers/fetchglbyaccounttype.php', 'POST', paramstr);
    if(result?.status) {
        glacashccounts = result.data
        let options = ''
        result.data?.map(function(item, index){
            options += `
                <option value="${item.accountnumber}"> ${ item.description} - ${ item.accountnumber } </option>
            `
        })
        if(selector){
            selector.innerHTML = ''
            selector.innerHTML = `<option value=""> -- Select GL Account -- </option>` + options
        }
    }
}

async function fetchLoanAccountAccountOfficers () {
    let result = await httpJsonRequest('../controllers/fetchallusers.php');
    if(result?.status) {
        officers = result.data;
        let options = '';
        officers.map((item, index) =>{
            options += `
                <option value="${item.email}"> ${item.firstname} ${item.othername ?? ''} ${item.lastname} </option>
            `
        })
        if(loanOfficer){
            loanOfficer.innerHTML = ''
            loanOfficer.innerHTML = '<option value="" selected=""> --Select officer --</option>'+options
        }
        
    } 
}

function saveLoanAccount() { 
    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/loanscript.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.code == '200'){
                    callModal('Loan successfully posted', 1)
                    let html = `<div style="padding:5px;font-size:12px;background-color:white">${parseRequest.nessage}</div>`
                    showResponse(html);
                    loanaccountform.reset();
                }
                else if(parseRequest.code == '204') return callModal(parseRequest.nessage, 0)
                
                else if(parseRequest.nessage) return callModal(parseRequest.nessage, 0)
                
                else return callModal('Sorry! Unable to perform operation', 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }

    request.setRequestHeader('Connection','close'); 
    request.send(getLoanParams());
}

function getLoanParams() {
  let form = document.getElementById('loanaccountform')
  const approvelater = form.querySelector("#sendforapproval");
  const approvetransaction = form.querySelector("#authorisation");
  const cnumber = form.querySelector("#customeraccount");  
  const principle = form.querySelector("#principalamount");
  const installmentamount = form.querySelector("#installmentamount");
  const customeraccountnumber = cnumber.value.trim() === "" ? "-" : cnumber.value;
  const approvaltype = approvelater.checked ? "LATER" : "NOW";
  const params = new FormData(form);
  
  params.append("authorized", approvaltype);
  params.append("interesttype", form.querySelector("#interesttype").options[form.querySelector("#interesttype").selectedIndex].value);
  params.append("interestperiod", form.querySelector("#interestperiod").options[form.querySelector("#interestperiod").selectedIndex].value);
  params.append("password", approvetransaction.value);
  params.append("customeraccountnumber", customeraccountnumber);
  params.append("amount", principle.value);
  params.append("installmentamount", installmentamount.value);
  let selectedcustomer = loanaccountcustomers.find( item => item.firstname.concat(' ', item.lastname, ' ', (item.othernames ?? '')) == customerIds?.value )
  params.set('customerids', `${ selectedcustomer?.id }|${ selectedcustomer.firstname.concat(' ', selectedcustomer.lastname, ' ', selectedcustomer.othernames ) }`)
  return params;
}

function getLoanAccountFormParams() {

    let paramstr; 
    let loanfeesarr = [];
    paramstr = new FormData(loanaccountform);
    let selectedcustomer = loanaccountcustomers.find( item => item.firstname.concat(' ', item.lastname, ' ', (item.othernames ?? '')) == customerIds?.value )
    paramstr.set('customerids', `${ selectedcustomer?.id }|${ item.firstname.concat(' ', item.lastname, ' ', item.othernames ) }`)

    let loanfeeset = loanSetContainer.querySelectorAll(`.loan-fee-set`);
    if(loanfeeset.length) {
        loanfeeset.forEach( feeset => {
            let loanfeename = feeset.querySelector('select')
            let loanfeevalue = feeset.querySelector('input[type="text"]')
            if(loanfeename?.value && loanfeevalue?.value) loanfeesarr.push({fee: loanfeename.value, value: loanfeevalue.value});
        })
        if(loanfeesarr.length) paramstr.append('loanfees', loanfeesarr) 
    }

    if(loanaccountform) { 
        loanaccountform.querySelectorAll('input:disabled').forEach( input => paramstr.append(input.getAttribute('name'), input.value)) 
        loanaccountform.querySelectorAll('select:disabled').forEach( input => paramstr.append(input.getAttribute('name'), input.value)) 
    }

    paramstr.append('sendforapproval', sendforapproval.checked ? 'yes': 'no')

    return paramstr
}

async function fetchLoanAccountLoanFees() {
    let result = await httpJsonRequest('../controllers/fetchloanfees.php');
     if(result?.status) {
         loanFees = result.data.data;
         appendLoanFeeHTML();
     }
}

function appendLoanFeeHTML() {
    if(loanSetContainer) {  
        let setPresentInDom = loanSetContainer.querySelectorAll(`.loan-fee-set`);
        let options = '<option value="" selected> -- Select loan fee -- </option>';
        loanFees?.map( (fee)=> options += `<option value="${fee.feename}"> ${fee.feename}</option>`)
        let node = document.createElement('div')
        node.style.cssText = 'align-items:end';
        node.classList.add('jformgroup', 'loan-fee-set')
        node.innerHTML = `
                <div class="jformgroup jformgroupcol">
                    <label class="jcontrollabel"> Loan Fee Name ${++setPresentInDom.length }: </label>
                    <select name="loanfeename[]" type="text" class="jformcontrol jmargin-top"> ${options}</select>
                </div>
                <div class="jformgroup jformgroupcol jmargin-left">
                    <label class="jcontrollabel"> fee value ${++setPresentInDom.length }: </label>
                    <input onchange="feeItemChange(event)" name="loanfeepercent[]" type="number" class="jformcontrol jmargin-top" placeholder="Enter fee value">
                </div>
                 <div class="jmargin-left">
                    <button type="button" class="j-action-btn" onclick="removeLoanFeeItem(event)" style="background-color:red;"> remove </button>
                </div>`
                
        loanSetContainer.appendChild(node)
    }
}

function feeItemChange(event) {
    if (event?.target.value.trim() === "") event.target.value = ""; 
    else {
        event.target.value = (parseFloat(event.target.value).toString() == 'NaN') ? '' : parseFloat(event.target.value);
    }
}

function removeLoanFeeItem(event) {
    if(event) event.target.parentElement.parentElement.remove()
}

function runLoanFormValidations() {
    
    inputs = [
        {input: customerIds, validation: { required: 'Borrower name is required'}},
        {input: principalAmount, validation: { required: 'Loan amount is required', pattern: 'Loan amount not valid'}, pattern: new RegExp(/^[0-9.]+$/)},
        {input: interestMethod, validation: { required: 'Interest method is required'}},
        {input: loanDurationFactor, validation: { required: 'Loan duration factor is required'}},
        {input: loanDuration, validation: { required: 'Loan duration factor is required', pattern: 'Loan duration not valid'}, pattern: new RegExp(/^[0-9]+$/) },
        {input: loanFrequency, validation: { required: 'Loan repayment frequency is required'}},
        {input: loanOfficer, validation: { required: 'Loan officer is required'}},
        {input: customerAccountNumber, validation: { required: 'Customer account number is required', pattern: 'customer account number is not valid'}, pattern: new RegExp(/^[0-9]+$/)},
        {input: customerAccountName, validation: { required: 'Customer account name is required'}},
        {input: glloanaccount, validation: { required: 'Gl loan account required'}},
        {input: glcashaccount, validation: { required: 'GL cash account required'}},
        {input: interestRate, validation: { required: 'Interest rate required', pattern: 'Interest rate not valid'}, pattern: new RegExp(/^[0-9]+$/)},
        {input: noOfRepayments, validation: { required: 'Number of repayments required'}},
        {input: installmentAmount, validation: { required: 'Installment Amount required'}},
        {input: loanAccountDecription, validation: { required: 'Installment Amount required'}},
        {input: loanPurpose, validation: { required: 'Purpose Of Facility required'}},
        {input: loantype, validation: { required: 'Loan type required'}},
    ]
    
    if(!sendforapproval.checked) inputs.push({input: authorisationPassword, validation: { required: 'Authorizing officer password required'}})
    else authorisationPassword.style.borderColor = ''
    
    
    let setPresentInDom = loanSetContainer.querySelectorAll(`.loan-fee-set`)
    if(setPresentInDom.length) {
        setPresentInDom.forEach((row, index) => {
            inputs.push({input: row.querySelector('select'), validation: {required: `Select fee for fee ${ index + 1}`}})
            inputs.push({input: row.querySelector('input'), validation: {required: `Enter value for fee ${ index + 1}`}})
        })
    }
    
    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field?.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else {
        let validBorrowerName = loanaccountcustomers?.find(item => (item.firstname + ' ' + item.lastname +  ' ' +(item.othernames ?? '')) == customerIds?.value)
        if(validBorrowerName) {
            customerIds.style.borderColor = '';
            saveLoanAccount()
        }
        else {
            customerIds.style.borderColor = 'red';
            return errorBox('Borrower not verified')
        }
    }
}

function resetLoanAccountForm()  {
    if(loanaccountform) loanaccountform.reset();
    if(saveLoanAccountBtn) saveLoanAccountBtn.disabled = true;
}


let loanaccountbtn = document.getElementById('loanaccount');
if(loanaccountbtn) loanaccountbtn.addEventListener('click', openLoanAccount, false)



// view loans -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function openViewLoan() {
    await httpRequest('viewloans.php');
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)
    
    let filterviewloans = document.getElementById('filterviewloans');
    const printBtn = document.getElementById('loan-print-action')
    const exportDataToExcel = document.getElementById('export-list-excel')
    const viewloanstable = document.getElementById('viewloanstable')
    
    datasource = [];
    
    if(filterviewloans) filterviewloans.addEventListener('keyup', (e) => datasource.length && filterLoansTable(e.target.value));
    if(printBtn) printBtn.addEventListener('click', () => datasource.length && printLoanList())
    if(exportDataToExcel) exportDataToExcel.addEventListener('click', () => datasource.length && exportLoans('viewloans', 'loans'))
    if(document.querySelector('#filterloansform button')) document.querySelector('#filterloansform button').addEventListener('click', fetchLoans)
     
    function filterLoansTable(q) {
        let query = q.toUpperCase();
        let table = document.getElementById('viewloanstable')
        let tablerows = table.getElementsByTagName('tr')
        if(table) {
            for (let i = 0; i < tablerows.length; i++) { 
                let td = tablerows[i].getElementsByTagName("td")[1];
                if (td) {
                    let txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(query) > -1) {
                      tablerows[i].style.display = "";
                    } else {
                      tablerows[i].style.display = "none";
                    }
                }
                // if(i === tablerows.length - 1) {
                //     let result = jtabledata.querySelectorAll('source-row-item');
                //     if(result.length === 0) jtabledata.innerHTML = `${renderNoTableData()}`;
                // }
            }
        }
    }
    
    function renderTableHTML(item, index) {
        if(datasource.length) {
             let tablebody = viewloanstable.querySelector('tbody')
            if(tablebody) {
                tablebody.innerHTML += `
                    <tr class="source-row-item">
                        <td><span> ${ index + 1 } </span></td>
                        <td>${item.accountnumber}</td>
                        <td>${item.accountname}</td>
                        <td>${item.openingdate}</td>
                        <td>${item.maturitydate}</td>
                        <td>${item.loantype}</td>
                        <td>${item.loanduration}</td>
                        <td>${formatMoney(item.amount)}</td>
                        <td>${item.interestrate}%</td>
                        <td>${item.interesttype}</td>
                        <td>${item.interestperiod}</td>
                        <td>${item.interestmethod}</td>
                        <td>${item.reference}</td>
                        <td>${formatMoney(item.installmentamount)}</td>
                        <td style="text-transform:none">${item.loanofficer}</td>
                    </tr>
                `
            }
        }
    }
    
    function renderNoTableData() {
        return  `
            <tr>
                <td colspan="14">
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
    }
    
    function printLoanList() {
        printContent('Loans', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
    }
    
    function exportLoans() {
        tableToExcel('viewloans', 'loans')
    }
    
    async function fetchLoans() {
        if(document.querySelector('#filterloansform #loanstatus')?.value < 1) {
            errorBox('Loan Status is required')
            document.querySelector('#filterloansform #loanstatus').style.borderColor = 'red'
            return;
        }
        document.querySelector('#filterloansform #loanstatus').style.borderColor = ''
        
        showSpinner();
        
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchmyloans.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(jtabledata) jtabledata.innerHTML = '';
                        data = datasource = parseRequest.data
                        if(data.length) initPagination(data, setCurrentPage)
                    }
                    else return callModal('No records retrieved',)
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        
        request.setRequestHeader('Connection','close');
        
        let paramstr = new FormData(document.getElementById('filterloansform'))
        let officer = officers.find( item => document.querySelector('#filterloansform #loanofficer').value == (item.firstname.concat(' ',item.lastname, ' ',item.othernames ?? '' )))
        paramstr.set('loanofficer', officer ? officer.email : '')
        request.send(paramstr);
    
    }
    
    function setCurrentPage(pageNum) {
                
        currentPage = pageNum;
        handleActivePageNumber();
        handlePageButtonsStatus();
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        if(jtabledata) jtabledata.innerHTML = '';
        if(datasource.length) {
            datasource.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    renderTableHTML(item, index)
                }
            })
            if(document.querySelector('#viewloanstable tbody').innerHTML === '') viewloanbtn.click()
        }
    }

    async function fetchLoanAccountOfficers () {
        let result = await httpJsonRequest('../controllers/fetchallusers.php');
        if(result?.status) {
            officers = result.data;
            let options = '';
            officers.map((item, index) =>{
                options += `
                    <option value="${item.firstname} ${item.lastname} ${item.othernames ?? ''}">
                `
            })
            if(document.querySelector('#filterloansform #loanofficer')){
                let datalist = document.createElement('datalist')
                datalist.id="officers"
                datalist.innerHTML = options;
                document.querySelector('#filterloansform #loanofficer').appendChild(datalist)
  
            }
            
        } 
    }
    
    await fetchLoanAccountOfficers()
}

var viewloanbtn = document.getElementById('viewloans');
if(viewloanbtn) viewloanbtn.addEventListener('click', openViewLoan, false)


// add collateral -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; let updateId = null;
async function openCollateral() {
    await httpRequest('collateral.php')
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCollateralCurrentPage)
    
    pFiles = document.querySelector('#document')
    fileselect = document.querySelector('.file-action')
    if(fileselect) input = fileselect.querySelector('input[id="document"]')
    
    if(fileselect) fileselect.addEventListener('click', () =>{ if(input) input.click()})
    if(input) input.addEventListener('change', (e) => onCollateralFileInputChange(e.target))
    
    form = document.getElementById('collateralform')
    filterform = document.getElementById('filtercollateralform')
    
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', validateCollateralForm)
    if(form.querySelector('button#resetbtn')) form.querySelector('button#resetbtn').addEventListener('click', resetCollateralForm)
    if(filterform.querySelector('button#submit')) filterform.querySelector('button#submit').addEventListener('click', () => fetchCollaterals(true))
    
    fetchCollaterals()
}


function validateCollateralForm() {

    inputs = [
        { input: form.querySelector('#accountnumber'), validation: {required: 'account number is required'}},
        { input: form.querySelector('#documenttitle'), validation: {required: 'document title is required'}},
        { input: form.querySelector('#documentid'), validation: {required: 'document ID is required'}},
    ]
    
    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field?.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else {
        if(form.querySelector('#document').files.length) {
            form.querySelector('#document').parentElement.style.borderColor = ''
            saveCollateral()
        }
        else {
            form.querySelector('#document').parentElement.style.borderColor = 'red';
            return errorBox('Please Select a file')
        }
    }
}

async function saveCollateral() {
    showSpinner();
    var request = getAjaxObject();
    request.open('POST','../controllers/collateralscript.php',true);
    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    resetCollateralForm()
                    fetchCollaterals()
                    callModal('Collacteral successful saved', 1)

                }
                else return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();
        try{
            e.stopPropagation();
        }catch(ex){}
    }
    
    request.setRequestHeader('Connection','close'); 
    request.send(getCollateralFormParams());
}

async function fetchCollaterals(filtered=false) {
    showSpinner();
    var request = getAjaxObject();
    request.open('POST','../controllers/fetchcollaterals.php',true);
    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    if(jtabledata) jtabledata.innerHTML = '';
                    data = datasource = parseRequest.data
                    if(data.length) initPagination(data, setCollateralCurrentPage)
                    
                }
                else return callModal('Not records retrieved')
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();
        try{
            e.stopPropagation();
        }catch(ex){}
    }
    
    request.setRequestHeader('Connection','close'); 
    if(filtered) {
        let paramstr = new FormData(filterform)
        request.send(paramstr);
    }
    else request.send();
    
}

function setCollateralCurrentPage(pageNum) {
                
    currentPage = pageNum;
    
    handleActivePageNumber();
    handlePageButtonsStatus();

    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    
    if(jtabledata) jtabledata.innerHTML = '';
    
    if(datasource.length) {
        datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                renderCollateralTable(item, index)
            }
        })
        if(document.querySelector('#collateralstable tbody').innerHTML === '') collateralbtn.click()
    }
}

function renderCollateralTable(item, index) {
    if(jtabledata) {
        jtabledata.innerHTML +=`
            <tr class="source-row-item">
                <td>${ index + 1 }</td>
                <td>${ item.accountnumber }</td>
                <td>${ item.documentid == '-' ? '' :  item.documentid}</td>
                <td>${ item.documenttitle} </td>
                <td>
                    <div class="flex" style="align-items:center">
                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="editCollateral(${index})">Edit</button>
                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="removeCollateral(${index})">Delete</button>
                    </div>
                </td>
            </tr>
        `
    }
}

function resetCollateralForm() {
    try {
        form.reset();
        updateId = null;
        form.querySelector('button#submit').innerHTML = 'Upload'
        let previewEl = document.querySelector('.file-area');
        if(previewEl) previewEl.innerHTML = '';
    }
    catch(e) {console.log(e)}
}

function editCollateral(index) {
    let selectedItem = datasource[+index]
    if(selectedItem) {
        updateId = selectedItem.id
        try {
            form.querySelector('#documenttitle').value = selectedItem.documenttitle
            form.querySelector('#documentid').value = selectedItem.documenttitle
            form.querySelector('#accountnumber').value = selectedItem.accountnumber
            form.querySelector('button#submit').innerHTML = 'Save Update'
        }
        catch(e) {console.log(e)}
    }
}

async function removeCollateral(index) {
    let selecteditem = datasource[index];
    if(confirm(`Are you sure you want to delete this collateral?`)) {
        let paramstr = new FormData() 
        paramstr.append('id', selecteditem?.id)
        let result = await httpJsonRequest('../controllers/deletecollateral.php', 'POST', paramstr);
        if(result?.status) {
            callModal('Collateral deleted', 1)
            openCollateral() 
        }
        else callModal(result.message, 0)
    }
}

function getCollateralFormParams() {
    let paramstr = new FormData(form)
    if(updateId) paramstr.append('id', updateId)
    if(paramstr) {
        try {
            paramstr.append('photofilename',input.files[0].name);		
		    paramstr.append('userphotoname',input.files[0]);
        }
        catch(ex){
    	 paramstr.append('photofilename','-');		
    	 paramstr.append('userphotoname','-');
    	 
       }
    }
    return paramstr
}

function collateralFileTypeValidator(selectedFiles) {
    let isValid = false;
    let selectedFilesArray = Object.values(selectedFiles);
    selectedFilesArray.forEach(file => {
        let splitFileName = file.name.split('.');
        let extension = splitFileName[splitFileName.length - 1];
        if (['jpg','jpeg', 'png','pdf','docx'].includes(extension)) isValid = true;
        else isValid = false;
    })  
    return isValid;
}

function onCollateralFileInputChange(event) {

    let previewEl = document.querySelector('.file-area');
    if(previewEl) previewEl.innerHTML = '';
    
    let selectedFiles = input.files;

    if (!collateralFileTypeValidator(selectedFiles)) {
        errorBox('Unsupported file selected')
        input.value = event = null;
    }

    else {
                
        for(let i = 0; i < selectedFiles.length; i++) {
            let splitFileName = selectedFiles[i].name.split('.');
            let extension = splitFileName[splitFileName.length - 1];
            if(['pdf', 'docx'].includes(extension?.toLowerCase())) {
                const div = document.createElement('div')
                div.style.cssText = 'border-radius:5px;border:1px solid rgba(0, 0, 0, 0.2);padding:30px;font-size:12px'
                div.innerHTML = selectedFiles[i].name;
                previewEl.appendChild(div)
            }
            else {
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `promotion-file-${i}`)
                previewEl.appendChild(img);
                img.src = URL.createObjectURL(event.files[i]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
            }
        }

    }
}

var collateralbtn = document.getElementById('collateral')
if(collateralbtn) collateralbtn.addEventListener('click', openCollateral, false)


// approve loans -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function openApproveLoan() {

    await httpRequest('approveloans.php')
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)
    
    const selectAllLoansBtn = document.getElementById('selectall-l');
    const approveLoanBtn = document.getElementById('approve-l');
    const declineLoanBtn = document.getElementById('decline-l');
    const approveloanstable = document.getElementById('approveloanstable')
    
    datasource = []
    let selectedLoans = []
    
    if(selectAllLoansBtn) selectAllLoansBtn.addEventListener('click', selectAllLoans)
    if(approveLoanBtn)approveLoanBtn .addEventListener('click', approveLoan)
    if(declineLoanBtn) declineLoanBtn.addEventListener('click', declineALoan)
    
    
    function selectAllLoans() { 
        let tablebody = approveloanstable.querySelector('tbody') 
        let inputs = tablebody.querySelectorAll('input[type="checkbox"]')
        if(inputs.length) inputs.forEach ( item => item.checked = true)
    }
    
    function approveLoan() { 
        let selectedLoans = getSelectedLoans()
        if(!selectedLoans.length) return errorBox('Please make loan(s) selection')
        else assignLoanAction('APPROVE', selectedLoans)
    }
    
    function declineALoan() { 
        let selectedLoans = getSelectedLoans()
        if(!selectedLoans.length) return errorBox('Please make loan(s) selection')
        else assignLoanAction('DECLINE', selectedLoans)
    }
    
    async function assignLoanAction(action, selectedLoans) {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/loanapprovalscript.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        callModal(`Loan ${action.toLowerCase() == 'approve' ? 'approval' : 'decline'} successful`, 1)
                        openApproveLoan()
                    }
                    else return callModal(parseRequest.message)
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        request.setRequestHeader('Connection','close'); 
        
        let paramstr = new FormData()
        paramstr.append('buttonselected', action)
        paramstr.append('idsize', selectedLoans.length)
        if(selectedLoans.length) selectedLoans.map( (item, index) => paramstr.append(`ids${index}`, +item.id))
        request.send(paramstr);
    }
    
    async function fetchNewLoans() {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchnonapprovedloans.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(jtabledata) jtabledata.innerHTML = '';
                        data = datasource = parseRequest.data
                        if(data.length) initPagination(datasource, setCurrentPage)
                    }
                    else return callModal('Not records retrieved.')
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        request.setRequestHeader('Connection','close'); 
        request.send();
    }
    
    
    function renderAprroveLoansTable(item, index) {
        if(approveloanstable && datasource.length) {
            let tablebody = approveloanstable.querySelector('tbody')
            if(tablebody) {
                tablebody.innerHTML += `
                    <tr class="source-row-item">
                        <td>
                            <span class="jflex" style="align-items:end;">
                                <span> ${ index + 1 } </span>
                                <span class="jmargin-left"> <input type="checkbox" id="l-${index}"> </span>
                            </span>
                        </td>
                        <td>${item.accountnumber}</td>
                        <td>${item.accountname}</td>
                        <td>${new Date(item.openingdate).toLocaleDateString()}</td>
                        <td>${item.maturitydate}</td>
                        <td>${item.loantype}</td>
                        <td>${item.loanduration}</td>
                        <td>${formatMoney(item.amount)}</td>
                        <td>${item.interestrate}</td>
                        <td>${item.interesttype}</td>
                        <td>${item.interestperiod}</td>
                        <td>${item.interestmethod}</td>
                        <td>${item.reference}</td>
                        <td>${formatMoney(item.installmentamount)}</td>
                        <td style="text-transform:none">${item.loanofficer}</td>
                    </tr>
                `
            }
        }
    }
    
    function getSelectedLoans() {
        let arr = [];
        let tablebody = approveloanstable.querySelector('tbody')
        let inputs = tablebody.querySelectorAll('input[type="checkbox"]:checked');
        if(inputs.length) inputs.forEach( item => arr.push({id: getLoanId(item.id.split('-')[1])}))
        return arr
    }
    
    function getLoanId(loanindex) {
        return datasource[+loanindex].id
    }
    
    function setCurrentPage(pageNum) {
                
        currentPage = pageNum;
        
        handleActivePageNumber();
        handlePageButtonsStatus();
    
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        
        if(jtabledata) jtabledata.innerHTML = '';
        
        datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                renderAprroveLoansTable(item, index)
            }
        })
    }
    
   fetchNewLoans()
}

let approveloansbtn = document.getElementById('approveloans')
if(approveloansbtn) approveloansbtn.addEventListener('click', openApproveLoan, false)



// view active loans -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

   
async function openActiveLoan() {
    await httpRequest('activeloan.php');
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)
    
    let filteractiveloans = document.getElementById('filteractiveloans');
    const printBtn = document.getElementById('loan-print-action')
    const exportDataToExcel = document.getElementById('export-list-excel')
    
    datasource = [];
    
     
    if(filteractiveloans) filteractiveloans.addEventListener('keyup', (e) => datasource.length && filterLoansTable(e.target.value));
    if(printBtn) printBtn.addEventListener('click', () => datasource.length && printActiveLoanList())
    if(exportDataToExcel) exportDataToExcel.addEventListener('click', () => datasource.length && exportActiveLoans('activeloans', 'loans'))

     
    function setCurrentPage(pageNum) {
                
        currentPage = pageNum;
        
        handleActivePageNumber();
        handlePageButtonsStatus();
    
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        
        if(jtabledata) jtabledata.innerHTML = '';
        if(datasource.length) {
            datasource.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    renderTableHTML(item, index)
                }
            })
            if(document.querySelector('#activeloans tbody').innerHTML === '') activeloanbtn.click()
        }
    }

    function filterLoansTable(q) {
        let query = q.toUpperCase();
        let table = document.getElementById('activeloans')
        let tablerows = table.getElementsByTagName('tr')
        if(table) {
            for (let i = 0; i < tablerows.length; i++) { 
                let td = tablerows[i].getElementsByTagName("td")[1];
                if (td) {
                    let txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(query) > -1) {
                      tablerows[i].style.display = "";
                    } else {
                      tablerows[i].style.display = "none";
                    }
                }
                // if(i === tablerows.length - 1) {
                //     let result = jtabledata.querySelectorAll('source-row-item');
                //     if(result.length === 0) jtabledata.innerHTML = `${renderNoTableData()}`;
                // }
            }
        }
    }
    
    function renderTableHTML(item, index) {
        jtabledata.innerHTML += `
            <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                <td> ${ index +1} </td>
                <td> ${ item.accountnumber }</td>
                <td> ${ item.accountname }</td>
                <td> ${ item.openingdate} </td>
                <td> ${ item.maturitydate} </td>
                <td> ${ formatMoney(item.amount) } </td>
                <td> ${ formatMoney((+item.amount + (5/100 * (+item.amount))).toString())} </td>
                <td> ${ formatMoney(5/100 * (+item.amount)) } </td>
                <td> 
                    <span style="padding:5px;border-radius: 5px;color:white;font-size:8px;text-transform:capitalize;background-color:green">Active</span>
                </td>
                <td> ${ item.loanduration } </td>
                <td> ${ item.interestmethod } </td>
                <td> ${ item.interestrate }% </td>
                <td style="text-transform:none"> ${ item.loanofficer } </td>
            </tr>
            `
    }
    
    function renderNoTableData() {
        return  `
            <tr>
                <td colspan="14">
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
    }
    
    function printActiveLoanList() {
        printContent('Active Loans', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
    }
    
    function exportActiveLoans() {
        tableToExcel('activeloans', 'loans')
    }
    
    async function fetchActiveLoans() {

        showSpinner();
        let paramstr = new FormData()
        paramstr.append('loanofficer', '')
        paramstr.append('loanstatus', 'APPROVED')
        
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchmyloans.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(jtabledata) jtabledata.innerHTML = '';
                        data = datasource = parseRequest.data
                        if(data.length) initPagination(data, setCurrentPage)
                    }
                    else return callModal('No records retrieved')
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        request.setRequestHeader('Connection','close'); 
        request.send(paramstr);
    
    }
    
    
    await fetchActiveLoans()
}

var activeloanbtn = document.getElementById('activeloan');
if(activeloanbtn) activeloanbtn.addEventListener('click', openActiveLoan, false)


// due loans -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function openDueLoan() { 
    
    await httpRequest('dueloan.php');
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)
    
    let filterdueloans = document.getElementById('filterdueloans');
    const printBtn = document.getElementById('dueloan-print-action')
    const exportDataToExcel = document.getElementById('export-dueloan-excel')

    datasource = [];
    
    if(filterdueloans) filterdueloans.addEventListener('keyup', (e) => filterLoansTable(e.target.value));
    if(printBtn) printBtn.addEventListener('click', () => printDueLoanList())
    if(exportDataToExcel) exportDataToExcel.addEventListener('click', () => tableToExcel('dueloans', 'due_loans'))
    
    filterform = document.getElementById('filterdueloansform')
    if(filterform.querySelector('button#submit')) filterform.querySelector('button#submit').addEventListener('click', () => fetchDueloans(true))

    function setCurrentPage(pageNum){
                
        currentPage = pageNum;
        
        handleActivePageNumber();
        handlePageButtonsStatus();
    
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        
        if(jtabledata) jtabledata.innerHTML = '';
        
        if(datasource.length) {
            datasource.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    renderTableHTML(item, index)
                }
            })
            if(document.querySelector('#dueloans tbody').innerHTML === '') dueloanbtn.click()
        }
        else  jtabledata.innerHTML=  renderNoTableData()
    }
    
    function filterLoansTable(q) {
        let query = q.toUpperCase();
        let table = document.getElementById('dueloans')
        let tablerows = table.getElementsByTagName('tr');
        if(table) {
            for (let i = 0; i < tablerows.length; i++) { 
                let td = tablerows[i].getElementsByTagName("td")[1];
                if (td) {
                    let txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(query) > -1) {
                      tablerows[i].style.display = "";
                    } else {
                      tablerows[i].style.display = "none";
                    }
                  }
            }
        }
    }
    
    function renderTableHTML(item, index) {
        jtabledata.innerHTML += `
            <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                <td> ${ index +1} </td>
                <td> ${ item.loanaccount }</td>
                <td> ${ item.accountname }</td>
                <td> ${ item.duedate }</td>
                <td> ${ item.paymentdate == '2000-01-01' ? '-' :  item.paymentdate }</td>
                <td> ${ formatMoney(+item.amountdue + (+item.interestdue)) }</td>
                <td> ${ item.hfield == '-' ? 'Pending' : 'Paid' }</td>
            </tr>
            `
    }
    
    function renderNoTableData() {
        return  `
            <tr id="no-data">
                <td colspan="7">
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
    }
    
    function printDueLoanList() {
        let content = document.getElementById('jpagecontent');
        if(content) {
            var winPrint = window.open('Due loan', '', 'width=1000,height=900');
            winPrint.document.write('<html><head><title></title>');
            winPrint.document.write('<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">');
            winPrint.document.write(' <h1 style="text-align:center;font-weight:400px;text-transform:uppercase;font-size:14px;"> due loans </h1> ' + content.innerHTML);
            winPrint.document.write('<script type="text/javascript">addEventListener("load", () => { print(); close(); })</script></body></html>');
            winPrint.document.close();
            winPrint.focus();
        }
    }
    
    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
          , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
          , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
          if (!table.nodeType) table = document.getElementById(table)
          var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
          window.location.href = uri + base64(format(template, ctx))
        }
      })()
    
    async function fetchDueloans(filtered=false) {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchdueloans.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(jtabledata) jtabledata.innerHTML = '';
                        data = datasource = parseRequest.data
                        if(data.length) initPagination(data, setCurrentPage)
                    }
                    else return callModal('Not records retrieved.')
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        
        request.setRequestHeader('Connection','close'); 
        if(filtered) {
            let paramstr = new FormData()
            paramstr.append('location_id', (locationsvar.find(item => item.location == filterform.querySelector('#location').value.trim()))?.id)
            request.send(paramstr);
        }
        else request.send();
    }
        
    async function fetchLoanLocations() {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchlocation.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        let data =  parseRequest.data?.data;
                        locationsvar = data;
                        let options = '';
                        data?.map(function(item, index){
                            options += `
                                <option value="${item.location} ">
                            `
                        })
                        if(filterform.querySelector('#location')){
                            let datalist = document.createElement('datalist')
                            datalist.id = 'loanlocations'
                            datalist.innerHTML = options
                            filterform.querySelector('#location').innerHTML = ''
                            filterform.querySelector('#location').appendChild(datalist)
                        }
                    }
                    
                }
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        request.setRequestHeader('Connection','close'); 
        request.send();
    }
    
    await fetchLoanLocations()
    fetchDueloans()
}

var dueloanbtn = document.getElementById('dueloan')
if(dueloanbtn) dueloanbtn.addEventListener('click', openDueLoan, false);


// missed repayments -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 async function openMissedRepaymentLoans() {
    
    await httpRequest('missedrepaymentloans.php')
    
    var paginationLimit = 40
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    datasource = [];
    
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    function setNewPaginationContext(e) {
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        setCurrentPage(1);
        paginationNumbers.innerHTML = '';
        getPaginationNumbers();
        handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {setCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
    
    function setCurrentPage(pageNum){
                
        currentPage = pageNum;
        
        handleActivePageNumber();
        handlePageButtonsStatus();
    
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        
        if(jtabledata) jtabledata.innerHTML = '';
        
        if(datasource.length) {
            datasource.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) { 
                    renderTableHTML(item, index)
                }
            })
            if(document.querySelector('#missedrepaymentloantable tbody').innerHTML === '') missedrepaymentloansbtn.click()
        }
        else  jtabledata.innerHTML=  renderNoTableData() 
    }
    
    function renderTableHTML(item, index) {
        jtabledata.innerHTML += `
            <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                <td> ${ index +1} </td>
                <td> ${ item.loanaccount }</td>
                <td> ${ item.accountname }</td>
                <td> ${ item.duedate }</td>
                <td> ${ item.paymentdate }</td>
                <td> ${ formatMoney(+item.amountdue + (+item.interestdue)) }</td>
                <td> ${ item.hfield == '-' ? 'Pending' : 'Paid' } </td>
            </tr>
            `
    }

    function renderNoTableData() {
        return  `
            <tr id="no-data">
                <td colspan="7">
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
    }
    
    async function fetchMissedRepaymentloans(filtered=false) {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/missedloanrepayments.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(jtabledata) jtabledata.innerHTML = '';
                        data = datasource = parseRequest.data
                        if(data.length) setNewPaginationContext(paginationLimitInput)
                    }
                    else return callModal('Not records retrieved.')
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        
        request.setRequestHeader('Connection','close'); 
        request.send();
    }
        
    fetchMissedRepaymentloans();
}

var missedrepaymentloansbtn = document.getElementById('missedrepaymentloans')
if(missedrepaymentloans) missedrepaymentloansbtn.addEventListener('click', openMissedRepaymentLoans, false) 



// past maturity  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function openPastMaturityDateLoans() {
    
    await httpRequest('pastmaturitydateloans.php');
    
    var paginationLimit = 40
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)
        
    let paginationLimitInput = document.getElementById('pagination-limit')
    datasource = [];

    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    function setNewPaginationContext(e) {
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        setCurrentPage(1);
        paginationNumbers.innerHTML = '';
        getPaginationNumbers();
        handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {setCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
    
    
    function setCurrentPage(pageNum){
                
        currentPage = pageNum;
        
        handleActivePageNumber();
        handlePageButtonsStatus();
    
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        
        if(jtabledata) jtabledata.innerHTML = '';
        
        if(datasource.length) {
            datasource.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) { 
                    renderTableHTML(item, index)
                }
            })
            if(document.querySelector('#pastmaturityloanstable tbody').innerHTML === '') setNewPaginationContext()
        }
        else  jtabledata.innerHTML=  renderNoTableData(17) 
    }
    
    async function renderTableHTML(item, index) {
        let loc = await propertylocations.find(value => value.id == (~~Math.abs(item.location)) )
        jtabledata.innerHTML += `
            <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                <td> ${ index +1} </td>
                <td>${item.accountnumber || item.loanaccount}</td>
                <td>${item.accountname}</td>
                <td>${item.openingdate}</td>
                <td>${item.maturitydate}</td>
                <td>${item.loantype}</td>
                <td>${item.loanduration}</td>
                <td>${formatMoney(item.amount)}</td>
                <td>${item.loanofficer}</td>
                <td>${item.interestrate}%</td>
                <td>${item.interesttype}</td>
                <td>${item.interestperiod}</td>
                <td>${item.interestmethod}</td>
                <td>${item.reference}</td>
                <td>${formatMoney(item.installmentamount)}</td>
                <td>${loc?.location}</td>
                <td>${item.hfield == '-' ? 'Pending' : 'Paid'}</td>
            </tr>
            `
    }
    
    function renderNoTableData(colspan) {
        return  `
            <tr id="no-data">
                <td colspan=${colspan}>
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
    }
    
    
    async function fetchLoansPastMaturity() {
       showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchpastmaturityloans.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(jtabledata) jtabledata.innerHTML = '';
                        data = datasource = parseRequest.data
                        if(data.length) setNewPaginationContext(paginationLimitInput)
                    }
                    else {
                        jtabledata.innerHTML=  renderNoTableData(17)
                        return callModal('Not records retrieved.')
                    }
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        
        request.setRequestHeader('Connection','close'); 
        request.send();
    }
    
    await fetchLocations()
    fetchLoansPastMaturity();
    
    
    async function fetchLocations() {
        showSpinner()
        let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
        let res = await result.json();
        if(res?.status) { 
            hideSpinner()
            propertylocations = res.data?.data;
        } else hideSpinner()
    }

}

let pastmaturitydateloansbtn = document.getElementById('pastmaturitydateloans')
if(pastmaturitydateloansbtn) pastmaturitydateloansbtn.addEventListener('click', openPastMaturityDateLoans, false) 
 

 // no repayment  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 async function openNoRepayments () {
    
    await httpRequest('norepaymentloans.php')  
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)
    
    const filterNoRepaymentBtn = document.getElementById('filter-nr')
    const printNoRepaymentBtn = document.getElementById('print-nr')
    const exportNoRepaymentBtn = document.getElementById('export-nr')
    let loanLocationsSelect = document.getElementById('nrllocation');
    const norepaymentstable = document.getElementById('norepaymentstable');
    
    const filterForm = document.getElementById('norepaymentform');

    datasource = [];
    let paginationLimit = 40;

    if(filterNoRepaymentBtn) filterNoRepaymentBtn.addEventListener('click', (e) => fetchNoRepaymentLoans(true))
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    if(printNoRepaymentBtn) printNoRepaymentBtn.addEventListener('click', () => printNoRepaymentLoansList())
    if(exportNoRepaymentBtn) exportNoRepaymentBtn.addEventListener('click', () => tableToExcel('norepaymentstable', 'no_repayments'))
    
    
    function fetchNoRepaymentLoans(filtered=false) {
    
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/noloanrepayments.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(jtabledata) jtabledata.innerHTML = '';
                        data = datasource = parseRequest.data
                        if(data.length) setNewPaginationContext(paginationLimitInput)
                    }
                    else return callModal('Not records retrieved.')
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        
        request.setRequestHeader('Connection','close'); 
        if(filtered) {
            let paramstr = new FormData(filterForm)
            paramstr.set('location_id', (locationsvar.find(item => item.location == filterForm.querySelector('#nrllocation').value.trim()))?.id)
            request.send(paramstr);
        }
        else request.send();
 
    }
    
    function renderNoRepaymentsTable(data) {
        let tbody = norepaymentstable.querySelector('tbody');
        if(data.length) {
            tbody.innerHTML = '';
            data.forEach((item, index) => renderTableHTML(item, index))
        } else tbody.innerHTML = renderNoTableData(6) ?? null
    }
    
    function renderTableHTML(item, index) {
        let tbody = norepaymentstable.querySelector('tbody');
        tbody.innerHTML += `
        <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
            <td> ${ index + 1} </td>
            <td>${item.loanaccount}</td>
            <td>${item.accountname} </td>
            <td>${item.duedate}</td>
            <td>${formatMoney(+item.amountdue + (+item.interestdue))}</td>
            <td>${ item.hfield == '-' ? 'Pending' : 'Paid' }</td>
        </tr>
        `
    }
    
    function getLoanLocations() {
        
        // sample data
    
        let data = loanlocations =  ['GENERAL', 'HEADOFFICE', 'LAGOS']
        if(data.length) {
            data.forEach( location => {
                if(loanLocationsSelect) {
                    let option = document.createElement('option')
                    option.value = option.innerHTML = location;
                    loanLocationsSelect.appendChild(option)
                }
            })
        }
    }
    
    function renderNoTableData(colspan) {
        return  `
            <tr id="no-data">
                <td colspan=${colspan}>
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
    }

    function setCurrentPage(pageNum){
                
        currentPage = pageNum;
        
        handleActivePageNumber();
        handlePageButtonsStatus();
    
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        
        if(norepaymentstable.querySelector('tbody')) norepaymentstable.querySelector('tbody').innerHTML = '';
        
        if(datasource.length) {
            datasource.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) { 
                    renderTableHTML(item, index)
                }
            })
            if(document.querySelector('#norepaymentstable tbody').innerHTML === '') norepaymentloansbtn.click()
        }
        else  jtabledata.innerHTML=  renderNoTableData(6)  
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {setCurrentPage(pageIndex); calPaginationStatus()});
        });
    }

    function setNewPaginationContext(e) {
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        setCurrentPage(1);
        paginationNumbers.innerHTML = '';
        getPaginationNumbers();
        handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }

    function printNoRepaymentLoansList() {
        let content = document.getElementById('jpagecontent');
        if(content) {
            var winPrint = window.open('loan transaction report', '', 'width=1000,height=900');
            winPrint.document.write('<html><head><title></title>');
            winPrint.document.write('<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">');
            winPrint.document.write(' <h1 style="text-align:center;font-weight:400px;text-transform:uppercase;font-size:14px;"> no repayments </h1> ' + content.innerHTML);
            winPrint.document.write('<script type="text/javascript">addEventListener("load", () => { print(); close(); })</script></body></html>');
            winPrint.document.close();
            winPrint.focus();
        }
    }
    
    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
          , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
          , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
          if (!table.nodeType) table = document.getElementById(table)
          var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
          window.location.href = uri + base64(format(template, ctx))
        }
      })()
      
    async function fetchLoanLocations() {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchlocation.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        let data =  parseRequest.data?.data;
                        locationsvar = data;
                        let options = '';
                        data?.map(function(item, index){
                            options += `
                                <option value="${item.location} ">
                            `
                        })
                        if(filterForm.querySelector('#nrllocation')){
                            let datalist = document.createElement('datalist')
                            datalist.id = 'loanlocations'
                            datalist.innerHTML = options
                            filterForm.querySelector('#nrllocation').value = ''
                            filterForm.querySelector('#nrllocation').appendChild(datalist)
                        }
                    }
                    
                }
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        request.setRequestHeader('Connection','close'); 
        request.send();
    }
    
    await fetchLoanLocations()

    fetchNoRepaymentLoans()
    
}

let norepaymentloansbtn = document.getElementById('norepaymentloans')
if(norepaymentloansbtn) norepaymentloansbtn.addEventListener('click', openNoRepayments, false)

// repayment schedule  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
 async function openRepaymentSchedule () {
    
    await httpRequest('repaymentschedule.php')
   
    const repaymentaccountInput = document.getElementById('repaymentaccount')
    const findaccountbtn = document.getElementById('findaccountbtn')
    let scheduleHeader = document.getElementById('scheduleheader')
    const repaymentrescheduletable = document.getElementById('repaymentrescheduletable')
    const modalContent = document.querySelector('.modal-content');
    let paymentscheduleprintaction = document.getElementById('paymentscheduleprintaction')
    if(paymentscheduleprintaction) paymentscheduleprintaction.style.display = 'none'
    
    let datasource = [];
    
    if(findaccountbtn) findaccountbtn.addEventListener('click', runInputValidation)
    
    function setClassficationHeader(accountnumber, accountname) {
        if(scheduleHeader) scheduleHeader.innerHTML =  `<strong> REPAYMENT SCHEDULE </strong> <br><span style="font-weight: 400; text-transform:capitalize;"> <strong> Account Number: </strong> ${ accountnumber } <strong>Account Name:</strong> ${accountname}</span>`
    }
    
    if(paymentscheduleprintaction) paymentscheduleprintaction.addEventListener('click', printRepaymentscheduleList)

    function PaymentHTML(scheduleRecord) {
        return  `
            <div id="repaymentschedulecontent" style="relative">
                <div style="padding:20px;font-size:medium;text-transform:uppercase;font-weight:500;background-color:white;border-bottom:rgb(177, 176, 176);text-align:left"> REPAYMENT </div>
                <div style="padding:20px;background-color:rgb(241, 241, 241)">
                    <form class="jform" id="schedulerepaymentform">
                        <div class="col-form-group">
                            <div class="jformgroup form_row">
                                <div class="jformgroup jformgroupcol">
                                    <label class="jcontrollabel"> Account Number  </label>
                                    <input type="text"
                                        class="jformcontrol jmargin-top" id="scheduleaccountnumber" name="accountnumber" value="${scheduleRecord.loanaccount}" readonly="readonly">
                                </div>
                                <div class="jformgroup jformgroupcol jmargin-left">
                                    <label class="jcontrollabel"> Account Name  </label>
                                    <input type="text"
                                        class="jformcontrol jmargin-top" id="scheduleaccountname" name="scheduleaccountname" value="${scheduleRecord.accountname}" readonly="readonly">
                                </div>
                            </div>
                            <div class="jformgroup form_row">
                                <div class="jformgroup jformgroupcol">
                                    <label class="jcontrollabel"> Amount </label>
                                    <input type="number"
                                        class="jformcontrol jmargin-top" id="schedulecredit" name="credit" value="${+scheduleRecord.amountdue + (+scheduleRecord.interestdue)}" onkeyup="validateRepaymentAmount(event, ${+scheduleRecord.amountdue + (+scheduleRecord.interestdue)})" onchange="validateRepaymentAmount(event, ${+scheduleRecord.amountdue + (+scheduleRecord.interestdue)})">
                                </div>
                                <div class="jformgroup jformgroupcol jmargin-left hidden">
                                    <label class="jcontrollabel"> Debit  </label>
                                    <input type="number"
                                        class="jformcontrol jmargin-top" id="scheduleaccountdebit" name="scheduleaccountdebit" disabled>
                                </div>
                            </div>
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel">Description: </label>
                                <textarea class="jformcontrol jmargin-top" rows="3" resize="none" id="scheduledecription"
                                    name="description"></textarea>
                            </div>
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel">Debit Connected Account: </label>
                                <label class="switch j-slider jmargin-top">
                                    <input type="checkbox" id="debitconnectedaccount">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div>
                                <button type="button" value="${scheduleRecord.id}" class="j-action-btn jmargin-top" style="padding:10px;width:100%"
                                    id="submitschedulerepayment"> submit repayment
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div style="display:flex;align-items:end;justify-content:end;position:absolute;left-0;top:0;width:100%">
                    <button id="jmodal-close" type="button" style="padding: 15px;font-weight:700px;font-size:medium;background-color:transparent;border:none;cursor:pointer;">&#10006;</button>
                </div>
            </div> 
            `
    }
    

    function makeSecurePayment(actionid){
        let id = actionid.split('-')[1]
        let scheduleRecord = datasource[id]
        if(scheduleRecord) {
            let modal = document.querySelector('.modal-content')
            if(modal) {
                modal.parentElement.style.display = 'block'
                modal.innerHTML = PaymentHTML(scheduleRecord)
                if(modalContent) {
                    modalContent.querySelector('#submitschedulerepayment').addEventListener('click', e => runRepaymentInputValidation(e))
                    modalContent.querySelector('#jmodal-close').addEventListener('click', () => closeJmodal())
                }
            }
        }
    } 
    
    function closeJmodal() {
        let modal = document.querySelector('.modal-content');
        modalContent.querySelector('#submitschedulerepayment').removeEventListener('click', undefined);
        modal.querySelector('#repaymentschedulecontent')?.remove();
        modal.parentElement.style.display = 'none'
    }
    
    function repaymentPay(submitbtnevent) {
        let btn = modalContent.querySelector('#submitschedulerepayment') 
        btn.disabled = true;
        btn.innerHTML = 'Making Repayment...'
        
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/repayloan.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                 btn.disabled = false;
                 btn.innerHTML = 'submit repayment'
                 
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        closeJmodal()
                        callModal('Repayment successful', 1)
                        findaccountbtn.click()
                    }
                    else return callModal(parseRequest.message)
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else {
                 btn.disabled = false;
                 btn.innerHTML = 'submit repayment'
                 return hideSpinner()
            };
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        
        let paramstr = new FormData(document.getElementById('schedulerepaymentform'));
        paramstr.append('id', submitbtnevent.target.value)
        paramstr.append('debitconnectedaccount',  document.querySelector('#schedulerepaymentform #debitconnectedaccount').checked ? 'YES' : 'NO')
    
        request.setRequestHeader('Connection','close'); 
        request.send(paramstr);
 
    }
    
    async function fetchRepaymentAccount() {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchloanschedule.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        data = datasource = parseRequest.data
                        renderRepaymentSchedule()
                    }
                    else return callModal('Not records retrieved')
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        let paramstr = new FormData()
        paramstr.append('accountnumber', repaymentaccountInput?.value)
        request.setRequestHeader('Connection','close'); 
        request.send(paramstr);
    }
    
    function renderRepaymentSchedule() {
        if(datasource.length) {
            setClassficationHeader(datasource[0].loanaccount, datasource[0].accountname);
            if(repaymentrescheduletable) repaymentrescheduletable.innerHTML = `
                <thead id="jtableheader">
                    <tr>
                        <th> s/n</th>
                        <th> account number </th>
                        <th> account name </th>
                        <th> due date </th>
                        <th> payment date </th>
                        <th> amount due </th>
                        <th> Int. due </th>
                        <th> repayment amount </th>
                        <th> amount paid </th>
                        <th class="no-pr">status </th>
                        <th class="no-pr">action </th>
                    </tr>
                </thead>
                <tbody id="jtabledata">
                </tbody>
            `
            datasource.forEach((item, index) => {
                repaymentrescheduletable.querySelector('tbody').innerHTML += `
                    <tr>
                        <td> ${ index + 1} </td>
                        <td> ${item.loanaccount }</td>
                        <td> ${item.accountname }</td>
                        <td> ${item.duedate }</td>
                        <td> ${ item.paymentdate == '2000-01-01' || item.hfield == '-' ? '' : item.paymentdate} </td>
                        <td> ${ formatMoney(item.amountdue) }</td>
                        <td> ${ formatMoney(item.interestdue) }</td>
                        <td> ${ formatMoney(+item.amountdue + (+item.interestdue)) }</td>
                        <td> ${ formatMoney(item.amountpaid) } </td>
                        <td class="no-pr"> ${ item.hfield == '-' ? 'Pending' : 'Paid'} </td>
                        <td class="no-pr">  
                            <div style="display:flex;justify-content:center;align-items:center">
                                ${item?.hfield === '-' ? `<button type="button" class="j-action-btn" id="rp-${index}" style="font-size: 10px}">Repay<button>`: '' }
                            </div>
                        </td>
                    </tr>
                `  
            })
    
            repaymentrescheduletable.querySelector('tbody').innerHTML += ` 
                <tr>
                    <td colspan="5" style="text-transform:uppercase;text-align:left"> total </td>
                    <td>${formatMoney(datasource?.filter(item => item.hfield === '-').reduce((total, curr) => total + (+curr.amountdue), 0) )}</td>
                    <td>${formatMoney(datasource?.filter(item => item.hfield === '-').reduce((total, curr) => total + (+curr.interestdue), 0) )}</td>
                    <td>${formatMoney((datasource?.filter(item => item.hfield === '-').reduce((total, curr) => total + (+curr.amountdue), 0) ) + (datasource?.filter(item => item.hfield === '-').reduce((total, curr) => total + (+curr.interestdue), 0) ))} </td>
                    <td>${formatMoney(datasource?.filter(item => item.hfield === 'PAID').reduce((total, curr) => total + (+curr.amountpaid), 0) )}</td>
                </tr>
                <tr>
                    <td colspan="7" style="text-transform:uppercase;text-align:left"> outstanding balance </td>
                    <td> ${formatMoney((datasource?.filter(item => item.hfield === '-').reduce((total, curr) => total + (+curr.amountdue), 0) ) + (datasource?.filter(item => item.hfield === '-').reduce((total, curr) => total + (+curr.interestdue), 0) ))} </td>
                </tr>
            `
    
            addTableEventListeners()
            if(paymentscheduleprintaction) paymentscheduleprintaction.style.display = 'block'
          
        }
    }
    
    function addTableEventListeners() {
        for(let i = 0; i < datasource.length; i++) {
            let btn = document.getElementById(`rp-${i}`);
            if(btn) btn.addEventListener('click', () => makeSecurePayment(btn.id))
        }
    }
    
    function runInputValidation() {
        
        inputs = [{ input: repaymentaccountInput, validation: {required: 'Enter account number', 'pattern': 'Account number not valid'}, pattern: new RegExp(/[0-9]+$/)}]

        let validations = [];
    
        inputs.map( (field, index) => {
            let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
            if(result)  validations.push(result) ;  
        })
    
        if(validations.length) validatorMapper(validations)
    
        else fetchRepaymentAccount()
    }
    
    function runRepaymentInputValidation(e) {
    
        let validations = [];
    
        inputs = [
            { input: document.querySelector('#schedulerepaymentform #scheduledecription'), validation: {required: 'Repayment description is required'}},
            { input: document.querySelector('#schedulerepaymentform #schedulecredit'), validation: {required: 'Credit is required', pattern: 'Credit is not valid'}, pattern: new RegExp(/[0-9]+$/)},
            
        ]
    
        inputs.map( (field, index) => {
            let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
            if(result)  validations.push(result) ;  
        })
    
        if(validations.length) validatorMapper(validations)
    
        else repaymentPay(e)
    }
    
    
    function printRepaymentscheduleList() {
        let content = document.getElementById('jpagecontent');
        if(content) {
            var winPrint = window.open('repayment schedule', '', 'width=1000,height=900');
            winPrint.document.write('<html><head><title></title>');
            winPrint.document.write('<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">');
            winPrint.document.write(' <h1 style="text-align:center;font-weight:400px;text-transform:uppercase;font-size:14px;"> repayment schedule </h1> ' + content.innerHTML);
            winPrint.document.write('<script type="text/javascript">addEventListener("load", () => { print(); close(); })</script></body></html>');
            winPrint.document.close();
            winPrint.focus();
        }
    }
}

function validateRepaymentAmount(event, amount) {
    
    if(parseFloat(event.target.value) > amount) {
        callModal('Amount cannot be higher than due', 0)
        event.target.value = amount
    }
    
    else if(parseFloat(event.target.value) < 0) {
        callModal('Invalid amount entered', 0)
        event.target.value = amount
    }
}

let repaymentschedulebtn = document.getElementById('repaymentschedule')
if(repaymentschedulebtn) repaymentschedulebtn.addEventListener('click', openRepaymentSchedule, false)


// loan transaction report  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
 async function openLoanTransactionReport() {
    
    await httpRequest('loantransactionreport.php')
    
    let paginationLimit = 40;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)

    let loantransactionreporttable = document.getElementById('loantransactionreporttable');
    const viewLoanReport = document.getElementById('view-lr');
    const printLoanReport = document.getElementById('print-lr')
    const exportLoanReport = document.getElementById('export-lr')
    let reportaccountnumber = document.getElementById('reportaccountnumber');
    let reportaccountname = document.getElementById('reportaccountname')

    if(viewLoanReport) viewLoanReport.addEventListener('click', () => viewLoanTransactionReport())
    if(printLoanReport) printLoanReport.addEventListener('click', () => printActiveLoanList())
    if(exportLoanReport) exportLoanReport.addEventListener('click', () => tableToExcel('loantransactionreporttable', 'loan_transact_report'))
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    function viewLoanTransactionReport() {
        if(!((reportaccountnumber.value.length < 1))) fetchTransactionReport(true)  
    }
    
    function setClassficationHeader(account) {
        if(document.querySelector('#reportcontainer h1')) document.querySelector('#reportcontainer h1').innerHTML = `Loan Transaction Report <span> ${account}</span>`
    }
    
    async function setCurrentPage(pageNum){
                
        currentPage = pageNum;
        
        handleActivePageNumber();
        handlePageButtonsStatus();
    
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        
        if(jtabledata) jtabledata.innerHTML = '';
        
        if(datasource.length) {
            let totalbalance = 0
            await datasource.map( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    let balance = 0
                    
                    item.credit = +item.credit
                    item.debit = +item.debit

                    if(item.credit > item.debit) {
                        totalbalance += item.credit;
                        balance = totalbalance + balance;
                    }
                    else if(item.debit > item.credit) {
                        totalbalance -= item.debit;
                        balance = totalbalance - balance;
                    }
                    else totalbalance = totalbalance
                    
                    item.balance = balance
                    renderTableHTML(item, index)
                }
            })
            renderTableTranstionFooter(totalbalance)
            if(document.querySelector('#loantransactionreporttable tbody').innerHTML === '') loantransactionreportbtn.click()
        }
        else  jtabledata.innerHTML=  renderNoTableData(6)  
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {setCurrentPage(pageIndex); calPaginationStatus()});
        });
    }

    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await setCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function printActiveLoanList() {
        let content = document.getElementById('jpagecontent');
        if(content) {
            var winPrint = window.open('loan transaction report', '', 'width=1000,height=900');
            winPrint.document.write('<html><head><title></title>');
            winPrint.document.write('<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">');
            winPrint.document.write(content.innerHTML);
            winPrint.document.write('<script type="text/javascript">addEventListener("load", () => { print(); close(); })</script></body></html>');
            winPrint.document.close();
            winPrint.focus();
        }
    }
    
    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
          , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
          , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
          if (!table.nodeType) table = document.getElementById(table)
          var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
          window.location.href = uri + base64(format(template, ctx))
        }
      })()
      
    async function renderTableHTML(item, index) {
        let loc = await propertylocations.find(value => value.id == (~~Math.abs(item.location)) )
        loantransactionreporttable.querySelector('tbody').innerHTML += `
            <tr class="source-row-item">
                <td> ${ index + 1} </td>
                <td> ${ item.transactiondate } </td>
                <td> ${ item.account} </td>
                <td> ${ item.reference} </td>
                <td> ${ item.description} </td>
                <td> ${ formatMoney(item.principal) } </td>
                <td> ${ loc?.location } </td>
                <td> ${ item.debit == 0 ? '' : formatMoney(item.debit) } </td>
                <td> ${ item.credit == 0 ? '-' : formatMoney(item.credit) } </td>
                <td> ${ formatMoney(item.balance) } </td>
            </tr>
        `
    }
    
    function renderTableTranstionFooter (totalbalance) {
        let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.debit), 0)
        let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.credit), 0)
        let balance = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.balance), 0)
        
        loantransactionreporttable.querySelector('tbody').innerHTML += `
            <tr>
                <td style="text-transform: uppercase;text-align: left;" colspan="7"> total </td>
                <td style="text-transform: uppercase;"> ${formatMoney(debit)}</td>
                <td style="text-transform: uppercase;">${formatMoney(credit)}</td>
                <td style="text-transform: uppercase;"> ${formatMoney(balance)}</td>
            </tr>
            <tr>
                <td style="text-transform: uppercase;text-align: left;" colspan="9"> balance </td>
                <td style="text-transform: uppercase;"> ${formatMoney(totalbalance)}</td>
            </tr>
        `
    }
    
    async function fetchTransactionReport(filtered=false) {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/loantransactionreport.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        document.querySelector('#loantransactionreporttable tbody').innerHTML === ''
                        data = datasource = parseRequest.data
                        if(data.length) {
                            setClassficationHeader(data[0].account)
                            setNewPaginationContext(paginationLimitInput)
                            // initPagination(datasource, setCurrentPage)
                        }
                    }
                    else return callModal('Not records retrieved.')
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        
        request.setRequestHeader('Connection','close'); 
        if(filtered) {
            let paramstr = new FormData()
            paramstr.append('accountnumber', reportaccountnumber?.value)
            paramstr.append('accountname', reportaccountname?.value)
            request.send(paramstr);
        }
        else request.send();
    }
    
    async function fetchLocations() {
        showSpinner()
        let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
        let res = await result.json();
        if(res?.status) { 
            hideSpinner()
            propertylocations = res.data?.data;
        } else hideSpinner()
    }
    
    await fetchLocations()

}

var loantransactionreportbtn = document.getElementById('loantransactionreport')
if(loantransactionreportbtn) loantransactionreportbtn.addEventListener('click', openLoanTransactionReport, false)


// loan classification report  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
   
async function openLoanClassificationReport() { 
    
    await httpRequest('loanclassificationreport.php')
    
    jtabledata = document.getElementById('jtabledata')
    // initializePaginationParams(setCurrentPage)
    
    const loanreportdate = document.getElementById('loanreportdate');
    const loanreporttype = document.getElementById('loanreporttype');
    const viewLoanReport = document.getElementById('view-lcr');
    const printLoanReport = document.getElementById('print-lcr');
    const exportLoanReport = document.getElementById('export-lcr');
    const loanreportbyclasstable = document.getElementById('loanreportbyclasstable');
    
    datasource = [];
    let paginationLimit = 40;
    
    let jtableheader = loanreportbyclasstable ? loanreportbyclasstable.querySelector('#jtableheader') : null
    let reportclassficationheader = document.getElementById('reportclassficationheader');
    
    if(loanreportdate) loanreportdate.valueAsDate = new Date();
    if(viewLoanReport) viewLoanReport.addEventListener('click', () => viewReportByType())
    if(printLoanReport) printLoanReport.addEventListener('click', () => loanreporttype.value.length < 1 ? false : printActiveLoanList());
    if(exportLoanReport) exportLoanReport.addEventListener('click', () => loanreporttype.value.length < 1 ? false : tableToExcel(loanreportbyclasstable.id, loanreporttype.value))
    
    
    function setClassficationHeader(header) {
        if(reportclassficationheader) reportclassficationheader.innerHTML =  `
            <strong>${ header ?? ''} </strong> <br>
            <span style="font-weight: 400; text-transform:capitalize;">
                Reporting Date : ${ new Date(loanreportdate.value).toLocaleDateString() ?? '' }
            </span>
        `
    }
    
    function renderLendingModel() {
        jtableheader.innerHTML = jtabledata.innerHTML = '';
        setClassficationHeader('Schedule of Loans by Lending Model')
    
        if(jtableheader) jtableheader.innerHTML = `
            <tr>
                <th> S/N </th>
                <th> lending model </th>
                <th> number </th>
                <th> amount </th>
                <th> percentage (%) </th>
            </tr>
        `
        records = [];
        if(records.length) {
            records.map((item, index) => {
                if(jtabledata) jtabledata.innerHTML += `
                <tr>
                    <td> ${ index + 1} </td>
                    <td> ${ item.lendingmodel } </td>
                    <td> ${ item.number } </td>
                    <td> ${ item.amount } </td>
                    <td> ${ item.percentage }% </td>
                </tr>
                `
            })
            jtabledata.innerHTML += `
                <tr>
                    <td colspan="2" style="text-transform: uppercase;text-align: left;"> total </td>
                    <td> ${ records.reduce((prev, curr) => prev + curr.number, 0) } </td>
                    <td> ${ records.reduce((prev, curr) => prev + curr.amount, 0) } </td>
                    <td> ${ records.reduce((prev, curr) => prev + curr.percentage, 0) }% </td>
                </tr>
            `
        }
        else {
            jtabledata.innerHTML = renderNoTableData(5)
        }  
        
    }
    
    function renderBreakDownOFOtherLoans() {
        hideSpinner();
        jtableheader.innerHTML = jtabledata.innerHTML = '';
        setClassficationHeader('Break down of other loans')
        
        if(jtableheader) jtableheader.innerHTML = `
        <tr>
            <th> S/N </th>
            <th> names of beneficiary</th>
            <th> loan officer </th>
            <th> date facility granted </th>
            <th> tenor </th>
            <th> amount approved </th>
            <th> principal + interest</th>
            <th> oustanding balance </th>
            <th> status </th>
        </tr>
        `
        // sample data 
        records = [];
        if(records.length) {
            records.map((item, index) => {
                if(jtabledata) jtabledata.innerHTML += `
                <tr>
                </tr>
                `
            })
        }
        else {
            jtabledata.innerHTML = renderNoTableData(9)
        }  
        jtabledata.innerHTML += `
        <tr>
            <td colspan="6" style="text-transform: uppercase;text-align: left;"> total </td>
            <td> ${ records.reduce((prev, curr) => prev + curr.principalandinterest, 0) ?? 0.00 } </td>
            <td> ${ records.reduce((prev, curr) => prev + curr.outbalance, 0) ?? 0.00} </td>
            <td> ${ records.reduce((prev, curr) => prev + curr.status, 0) ?? 0.00}% </td>
        </tr>
    `
    }
    
    function renderSummaryOfLoanClassiifcation() {
        hideSpinner();
        jtableheader.innerHTML = jtabledata.innerHTML = '';
        setClassficationHeader('summary of loan classification')
        
        if(jtableheader) jtableheader.innerHTML = `
        <tr>
            <th> S/N </th>
            <th> class </th>
            <th> amount </th>
        </tr>
        `
        // sample data 
        records = [];
        if(records.length) {
            records.map((item, index) => {
                if(jtabledata) jtabledata.innerHTML += `
                <tr>
                    <td> ${ index + 1 } </td>
                    <td> ${ item.class} </td>
                    <td> ${ item.amount} </td>
                </tr>
                `
            })
            jtabledata.innerHTML += `
                <tr>
                    <td colspan="2" style="text-transform: uppercase;text-align: left;"> total </td>
                    <td> ${ records.reduce((prev, curr) => prev + curr.amount, 0) } </td>
                </tr>
            `
        }  
        else {
            jtabledata.innerHTML = renderNoTableData(3)
        }    
    }
    
    function renderSummaryOfNonPerformingLoans() {
        hideSpinner();
        jtableheader.innerHTML = jtabledata.innerHTML = '';
        setClassficationHeader('Summary of Non Performing Loans')
        
        if(jtableheader) { 
            let i = 1;
            let row = document.createElement('tr');
            while (i < 13) {
                let td = document.createElement('th');
                td.innerHTML = i;
                row.appendChild(td);
                i++;
            }
            jtableheader.appendChild(row);
            jtableheader.innerHTML += `
            <tr style="background-color:transparent">
                <th> S/N </th>
                <th> Customer Code</th>
                <th> Customer's Name </th>
                <th> Past Due Date </th>
                <th> Last Date of Repayment </th>
                <th> Amount Granted</th>
                <th> Principal payment Due and Unpaid </th>
                <th> Accrued Interest unpaid </th>
                <th> Total Non performing Credits </th>           
                <th style="padding:0">
                    <p style="padding:5px 10px">Bank's classification</p> 
                    <table class="jmargin-top">
                        <thead id="jtableheader">
                            <tr style="background-color:transparent">
                                <th style="padding:5px">10a.</th>
                                <th style="padding:5px">10b.</th>
                                <th style="padding:5px">10c.</th>
                                <th style="padding:5px">10d.</th>
                            </tr>
                            <tr style="background-color:transparent">
                                <th style="width:25%">1 - 30 days Pass  Watch</th>
                                <th style="width:25%">31 -60 days Sub - Standard</th>
                                <th style="width:25%">61 -90 days Doubtful</th>
                                <th style="width:25%">91 or More Lost</th>
                            </tr>
                        </thead>
                    </table>               
                </th> 
                <th>Bank's Provision </th>
                <th>Remarks</th>
            </tr>
            `               
        }
            
        // sample data 
        records = [];
        if(records.length) {
            records.map((item, index) => {
                if(jtabledata) jtabledata.innerHTML += `
                <tr>
                    <td> ${ index + 1 } </td>
                    <td> ${ item.customercode} </td>
                    <td> ${ item.customername} </td>
                    <td>  </td>
                    <td> ${ item.lastdateofrepayment} </td>
                    <td> ${ item. amountgranted} </td>
                    <td> ${ item.dueandunpaidprincipal} </td>
                    <td> ${ item.interedunpaid} </td>
                    <td> ${ item.totalnpcredits} </td>
                    <td>
                        <table>
                            <tbody>
                                <tr style="background-color:transparent">
                                <td style="border:none;width:25%"> ${ item.bc10a} </td>
                                <td style="border:none;width:25%"> ${ item.bc10b} </td>
                                <td style="border:none;width:25%"> ${ item.bc10c} </td>
                                <td style="border:none;width:25%"> ${ item.bc10d} </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td> ${ item.bankprovision} </td>
                    <td></td>
                </tr>
                `
            })
        }   
        else {
            jtabledata.innerHTML = renderNoTableData(12)
        }   
    }
    
    function renderSectorialAnalysisOfLoans() {
        hideSpinner();
        jtableheader.innerHTML = jtabledata.innerHTML = '';
        setClassficationHeader('sectorial analysis of loans and advances')
        
        if(jtableheader) jtableheader.innerHTML = `
        <tr>
            <th> S/N </th>
            <th> sector </th>
            <th> number </th>
            <th> amount </th>
            <th> percentage </th>
        </tr>
        `
        // sample data 
        records = [];
        if(records.length) {
            records.map((item, index) => {
                if(jtabledata) jtabledata.innerHTML += `
                <tr>
                    <td> ${ index + 1 } </td>
                    <td> ${ item.sector } </td>
                    <td> ${ item.number} </td>
                    <td> ${ item.amount} </td>
                    <td> ${ item.percentage}% </td>
                </tr>
                `
            })
            jtabledata.innerHTML += `
                <tr>
                    <td colspan="2" style="text-transform: uppercase;text-align: left;"> total </td>
                    <td> ${ records.reduce((prev, curr) => prev + curr.number, 0) } </td>
                    <td> ${ records.reduce((prev, curr) => prev + parseFloat(curr.amount), 0.0) } </td>
                    <td> ${ records.reduce((prev, curr) => prev + curr.percentage, 0) }% </td>
                </tr>
            `
        } 
        else {
            jtabledata.innerHTML = renderNoTableData(5)
        }   
    }
    
    function renderNoTableData(colspan) {
        return  `
            <tr>
                <td colspan="${colspan}">
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
    }
    
    function viewReportByType () {
        if(!(loanreporttype.value.length < 1)) {
            let selectedType = loanreporttype.value;
            if(selectedType) {
                let selectedIndex = loanreporttype.selectedIndex;
                switch(selectedIndex) {
                    case 1:
                        fetchClassifiedReports(renderLendingModel, true)
                        break;
                    case 2:
                        fetchClassifiedReports(renderBreakDownOFOtherLoans, true)
                        break;
                    case 3:
                        fetchClassifiedReports(renderSummaryOfLoanClassiifcation, true) 
                        break;
                    case 4:
                        fetchClassifiedReports(renderSummaryOfNonPerformingLoans, true)
                        break;
                    case 5:
                        fetchClassifiedReports(renderSectorialAnalysisOfLoans, true)
                        break;
                }
            }
        }
    }
    
    function fetchClassifiedReports(renderFunction, filtered=false) {
    
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/loanclassificationreport.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(jtabledata) jtabledata.innerHTML = ''; 
                        data = datasource = records = parseRequest.data 
                        renderFunction()
                        // if(data.length) setNewPaginationContext(paginationLimitInput)
                    }
                    else return callModal('Not records retrieved.')
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        
        request.setRequestHeader('Connection','close'); 
        if(filtered) {
            let paramstr = new FormData(document.getElementById('loanclassificationreportform'))
            request.send(paramstr);
        }
        else request.send();
 
    }
    
    function printActiveLoanList() {
        let content = document.getElementById('jpagecontent');
        if(content) {
            var winPrint = window.open('loan report', '', 'width=1000,height=900');
            winPrint.document.write('<html><head><title></title>');
            winPrint.document.write('<link rel="stylesheet" type="text/css" media="print" href="index.css">');
            winPrint.document.write(content.innerHTML);
            winPrint.document.write('<script type="text/javascript">addEventListener("load", () => { print(); close(); })</script></body></html>');
            winPrint.document.close();
            winPrint.focus();
        }
    }
    
    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
          , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
          , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
          if (!table.nodeType) table = document.getElementById(table)
          var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
          window.location.href = uri + base64(format(template, ctx))
        }
      })()
      
}

var loanclassificationreportbtn = document.getElementById('loanclassificationreport')
if(loanclassificationreportbtn) loanclassificationreportbtn.addEventListener('click', openLoanClassificationReport, false)
 
 
 
 
