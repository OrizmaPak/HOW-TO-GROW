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