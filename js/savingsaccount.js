var form;var localItem;var bankcodes;
async function openSavingsAccount () {
    await httpRequest('savingsaccount.php')
    form = document.getElementById('savingsaccountform');
    if(form.querySelector('button')) form.querySelector('button').addEventListener('click', validateSavingsAccount);
    await fetchSavingsFormData();
    if(checkIfSavingsUpdate()) savingsAccountMode('update')
    else savingsAccountMode();
}

var savingsaccountidd = [`id`, `customer`,`savingsproduct`, `registrationdate`,`location`, `registrationpoints`, `valuedate`, `bankname1`,`bankaccountnumber1`, `bankname2`,`bankaccountnumber2`,`dailyunit`,`marketergroup`,`user`,`status`]

var checkIfSavingsUpdate = function() {
    return !!sessionStorage.getItem('savingsaccount')
}

var savingsAccountMode = function(mode='savings') { 
    if(mode.includes('update')) {
        let localdata  = sessionStorage.getItem('savingsaccount')
        let parsedata = localItem = JSON.parse(localdata);
        try {
            
            if(parsedata.mode == 'view')  form.querySelector('button#submit').disabled = true;
            else { 
                form.querySelector('button#submit').disabled = false;
                if(form.querySelector('button#submit')) form.querySelector('button#submit').innerHTML = 'Update savings account'
            }
            
            form.querySelector('#accountnumber').value = parsedata.account.accountnumber 
            form.querySelector('#accountcode').value = parsedata.account.code 
            form.querySelector('#customer').value = parsedata.account.customer 
            form.querySelector('#savingsproduct').value = parsedata.account.savingsproduct 
            form.querySelector('#savingsproduct').value = parsedata.account.savingsproduct 
            form.querySelector('#registrationdate').value = parsedata.account.registrationdate 
            form.querySelector('#location').value = parsedata.account.location 
            form.querySelector('#bankaccountnumber1').value = parsedata.account.bankaccountnumber1 
            form.querySelector('#bankaccountnumber2').value = parsedata.account.bankaccountnumber2
            
            form.querySelector('#bankname1').selectedIndex = findBankFromCode(parsedata.account.bankname1)
            form.querySelector('#bankname2').selectedIndex = findBankFromCode(parsedata.account.bankname2)
            // form.querySelector('#bankname1').value = parsedata.account.bankname1
            // form.querySelector('#bankname2').value = parsedata.account.bankname2
            form.querySelector('#dailyunit').value = parsedata.account.dailyunit
            form.querySelector('#marketergroup').value = parsedata.account.marketergroup
            form.querySelector('#user').value = parsedata.account.accountofficer
            
            sessionStorage.removeItem('savingsaccount')
        }
        catch(e) {  console.log(e) }
        
    }
    else {
        sessionStorage.removeItem('savingsaccount')
        localItem = null;
    }
}

function findBankFromCode(bankinfo) {
    let findbankIndex = bankcodes?.findIndex( item => item.code == bankinfo?.split('|')[1] )
    return findbankIndex;
}

function validateSavingsAccount(){
	
	inputs = []
    
    savingsaccountidd.forEach(item => {
        if(form.querySelector(`#${item}`)) {
            inputs.push({ input: form.querySelector(`#${item}`), validation: {required: `${item} is required`}})
        }
    })

    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result);  
    })

    if(validations.length) validatorMapper(validations)

    else  saveSavingsAccount()

}

function getSavingsAccountParams(){
    var paramstr = new FormData(document.getElementById('savingsaccountform'));
    paramstr.set('bankname1', `${bankcodes[+document.getElementById('bankname1').value]?.name}|${bankcodes[+document.getElementById('bankname1').value]?.code}`)
    paramstr.set('bankname2', `${bankcodes[+document.getElementById('bankname2').value]?.name}|${bankcodes[+document.getElementById('bankname2').value]?.code}`)
    return paramstr;
}

var	saveSavingsAccount = function(e){

    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/savingscript.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Savings Account Saved', 1)
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
    request.send(getSavingsAccountParams());
    
}

async function fetchSavingsAccountUsers () {
    showSpinner()
    let result = await fetchRequest('../controllers/fetchallusers.php');
    if(result) {
        hideSpinner()
        let parseResult  =  JSON.parse(result);
        propertyusers = parseResult;
        if(parseResult.status){
            let options = '';
            parseResult.data.map(function(item, index){
            // options += `
            //     <option value="${item.id}"> ${item.firstname} ${item.othername ?? ''} ${item.lastname} </option>
            // `
            options += `
                <option value="${item.email}"> ${item.firstname} ${item.othername ?? ''} ${item.lastname} </option>
            `
            })
            if(document.getElementById('user')){
                document.getElementById('user').innerHTML = ''
                document.getElementById('user').innerHTML = '<option value="" selected=""> --Select Officer --</option>'+options
            }
        }
    } else  hideSpinner()
}
async function fetchSavingsAccountLocations() {
    showSpinner()
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data =  res.data?.data;
        locationsvar = data;
        let options = '';
        data?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.location} </option>
            `
        })
        if(document.getElementById('location')){
            document.getElementById('location').innerHTML = ''
            document.getElementById('location').innerHTML = '<option value="" selected="">--Select Location --</option>'+options
        }
    }else  hideSpinner()
}
async function fetchSavingsAccountRegistrationPoints() {
    showSpinner()
    let result = await fetch('../controllers/fetchregistrationpoints.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data =  res.data?.data;
        locationsvar = data;
        let options = '';
        data?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.registrationpoint} </option>
            `
        })
        if(document.querySelector('#savingsaccountform #registrationpoints')){
            document.querySelector('#savingsaccountform #registrationpoints').innerHTML = ''
            document.querySelector('#savingsaccountform #registrationpoints').innerHTML = '<option value="" selected="">--Select registration point --</option>'+options
        }
    }else  hideSpinner()
}
async function fetchSavingsAccountCustomerAccounts() {
    showSpinner()
    let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data  =  res.data?.data;
        propertycustomers =  data;
        let options = '';
        data?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othernames == '' ? '': item.othernames)} </option>
            `
        })
        if(document.getElementById('customer')){
            document.getElementById('customer').innerHTML = ''
            document.getElementById('customer').innerHTML = '<option value="" selected="">--Select Customer --</option>'+options
        }
        
    } else  hideSpinner()
}
async function fetchSavingsAccountGroupName() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data =  groupnames = res.data?.data;
        let options = '';
        data.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.groupname} </option>
            `
        })
        if(document.getElementById('marketergroup')){
            document.getElementById('marketergroup').innerHTML = ''
            document.getElementById('marketergroup').innerHTML = '<option value="" selected="">--Select Group --</option>'+options
        }
        
    } else  hideSpinner()
}
async function fetchSavingsAccountProducts() {
    let result = await fetchRequest('../controllers/fetchsavingsproductscript.php')
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.status){
            products = parseResult.data.data;
            let options = '';
            products?.map(function(item, index){
                options += `
                    <option value="${item.id}"> ${item.productname} </option>
                `
            })
            if(document.getElementById('savingsproduct')){
                document.getElementById('savingsproduct').innerHTML = ''
                document.getElementById('savingsproduct').innerHTML = '<option value="" selected="">--Select product --</option>'+options
            }
        }
    }
}

async function fetchBankAccountNames() {
    let result = await fetchRequest('../controllers/fetchbankaccountnames.php')
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.status){
            bankcodes = parseResult.data;
            let options = ''
            options = bankcodes?.map( (item, index) => `<option value="${index}"> ${item.name} </option>`).join('')
            if(form) {
                form.querySelector('#bankname1').innerHTML = options
                form.querySelector('#bankname2').innerHTML = options
            }
        }
        else {
            form.querySelector('#bankname1').innerHTML = `<option value=""> --Select Bank -- </option>`
            form.querySelector('#bankname2').innerHTML = `<option value=""> --Select Bank -- </option>`
        }
    }
}

async function fetchSavingsFormData() {
    await fetchSavingsAccountUsers()
    await fetchBankAccountNames()
    await fetchSavingsAccountLocations();
    await fetchSavingsAccountCustomerAccounts();
    await fetchSavingsAccountGroupName();
    await fetchSavingsAccountRegistrationPoints()
    await fetchSavingsAccountProducts()
}


var savingsaccountbtn = document.getElementById('savingsaccount')
if(savingsaccountbtn) savingsaccount.addEventListener('click', openSavingsAccount, false)