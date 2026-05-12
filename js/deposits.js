var form;
async function openDeposits() {
    await httpRequest('deposits.php')
    form = document.getElementById('depositform')
    form.querySelector('#transactiondate').valueAsDate = new Date()
    form.querySelector('#valuedate').valueAsDate = new Date()
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',validateDeposit);
    await fetchDepositFormData()
}

async function fetchDepositFormData() {
    await fetchDepositAccountOfficers()
    await fetchCustomersLocations()
    await fetchDepositCustomerUserprofile()
    await fetchCustomerGroupName()
}

async function fetchCustomerGroupName() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(result) { 
        hideSpinner()
        if(res?.status) customergroupnames = res.data.data;
    } else hideSpinner()
}

async function fetchDepositCustomerUserprofile() {
    showSpinner()
    let result = await fetch('../controllers/fetchuserprofile.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res?.status) {
            customeruserprofile = res;
            hideSpinner()
             try {
                 form.querySelector('#postinglimit').value =  res.depositlimit
                 form.querySelector('#counter').value =  res.creditcounter
                 form.querySelector('#depositby').value =  `${ res.firstname} ${ res.lastname} ${ res.othername ?? ''}`
             }
             catch(e) {}
        }
        else hideSpinner()
    }
    else hideSpinner
}

async function fetchDepositAccountOfficers() {
    showSpinner();
    let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner();
        let options = ''
        res.data?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othername ?? '' )} </option>
            `
        })
        if(form.querySelector('#accountofficer')){
            form.querySelector('#accountofficer').innerHTML = ''
            form.querySelector('#accountofficer').innerHTML = '<option value=""> -- Select Account Officer -- </option>' + options
        }
    } else hideSpinner()
    
}

async function fetchCustomersLocations() {
    showSpinner();
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status){
        hideSpinner()
        profilelocations =  res.data?.data;
    }
    else hideSpinner();
}

async function fetchDepositCustomerAccount()  {
    showSpinner();
    let paramstr = new FormData();
    paramstr.append('accountnumber', form.querySelector('#accountnumber').value)
    let result = await fetch('../controllers/fetchaccountprofile.php', {method: 'POST', body:paramstr, headers: new Headers()})
    let res = await result.json();
    if(result.status) {
        hideSpinner();
        let parseResult = JSON.parse(JSON.stringify(res))
        if(parseResult.status) {
            depositcustomeraccount = parseResult
            try {
                document.querySelector('.profile #firstname').innerHTML = parseResult.data[0].customerdetail.firstname
                document.querySelector('.profile #lastname').innerHTML = parseResult.data[0].customerdetail.lastname
                document.querySelector('.profile #othername').innerHTML = parseResult.data[0].customerdetail.othernames ?? ''
                document.querySelector('.profile #phone').innerHTML = parseResult.data[0].customerdetail.phonenumber
                document.querySelector('.profile #domicilebranch').innerHTML = (profilelocations.find( value => value.id == parseResult.data[0].accountdetail[0].location))?.location
                document.querySelector('.profile #accounttype').innerHTML = parseResult.data[0].accounttype.toLowerCase()
                document.querySelector('.profile #gender').innerHTML = parseResult.data[0].customerdetail.gender
                document.querySelector('.profile #dateopened').innerHTML = parseResult.data[0].accountdetail[0].registrationdate
                document.querySelector('.profile #marketer').innerHTML = (customergroupnames?.find( val => val.id === parseResult.data[0].accountdetail[0].marketergroup))?.groupname
                document.querySelector('.profile #agreed').innerHTML = parseResult.data[0].accountdetail[0].dailyunit
            }
            catch(e) {}
        }
        else callModal(parseResult.message, 0)
       
    }
    else {
        hideSpinner();
        callModal('Error! Unable to perform task', 0)
    }
}


function validateDeposit(){
    inputs = [
        { input: document.querySelector('#accountnumber'), validation: {required: 'account number is required'}},
        { input: form.querySelector('#postinglimit'), validation: {required: 'posting limit is required'}},
        { input: form.querySelector('#counter'), validation: {required: 'withdrwal counter is required'}},
        { input: form.querySelector('#accountofficer'), validation: {required: 'account officer is required'}},
        { input: form.querySelector('#transactiondate'), validation: {required: 'transaction date is required'}},
        { input: form.querySelector('#valuedate'), validation: {required: 'transaction date is required'}},
        { input: form.querySelector('#depositby'), validation: {required: 'value date is required'}},
        { input: form.querySelector('#amount'), validation: {required: 'value date is required'}},

    ]
    
    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else {
        const remainder = parseFloat(form.amount.value) % depositcustomeraccount?.data[0].accountdetail[0].dailyunit
        if(remainder !== 0) {
            form.amount.style.borderColor = 'red'
            return callModal('Amount paid does not tally')
        }
        else saveDeposit()
    }
}

async function saveDeposit() {
    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/postdeposit.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Deposit posted successfully', 1)
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
    request.send(getDepositFormParams());
}

function getDepositFormParams() {
    let paramstr = new FormData(document.getElementById('depositform'))
    paramstr.append('accountnumber', document.querySelector('#accountnumber').value)
    paramstr.append('ttype', 'DEPOSIT')
    return paramstr;
}

var depositsbtn = document.getElementById('deposits')
if(depositsbtn) depositsbtn.addEventListener('click', openDeposits, false)