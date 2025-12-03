var form;
async function transfersavings () {
    
        await  httpRequest('transfersavings.php')
        
        form = document.getElementById('savingstransferform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', saveSavingsTransfer)
            form.querySelector('#accountnumberfrom').addEventListener('blur', () => verifyTransferAccount('from'))
            form.querySelector('#accountnumberto').addEventListener('blur', () => verifyTransferAccount('to'))
            form.querySelector('#transactiondate').valueAsDate = new Date()
            
            await fetchSavingsTransferPageData()
        }
}

async function fetchSavingsTransferPageData() {
    fetchSavingsTransferLocations()
}

async function verifyTransferAccount(input) {
    
    let paramstr = new FormData()
    
    if(input == 'from') {
        if(form.accountnumberfrom.value.trim().length < 1) return callModal('From account number is invalid', 0)
         paramstr.append('accountnumber', form.accountnumberfrom.value)
    }
    else if(input == 'to') {
        if(form.accountnumberto.value.trim().length < 1) return callModal('To account number is invalid', 0)
         paramstr.append('accountnumber', form.accountnumberto.value)
    }
    
    else return
    
    let result = await httpJsonRequest('../controllers/fetchaccountprofile.php', 'POST', paramstr)
    if(result) {
        if(result?.status) {
            let data = (JSON.parse(JSON.stringify(result))).data[0]
            if(data.accounttype !== 'SAVINGS') {
                if(input == 'from') {
                    form.querySelector('#result-area').firstElementChild.innerHTML = ''
                }
                
                if(input == 'to') {
                    form.querySelector('#result-area').lastElementChild.innerHTML = ''
                }
                
                return callModal('Account type not savings')
            }
            else {
                let template = ''
                let loc = locationsvar?.find(value => value.id == (~~Math.abs(data.accountdetail[0].location)) )
                template = `
                    <table id="description" style="width: 100%;">
                        <tr><td><span>ACCOUNT NAME:</span> <span>${ data.customerdetail.firstname.concat(' ', data.customerdetail.lastname, ' ', data.customerdetail.othernames)}</span> </td></tr>
                        <tr><td><span>ACCOUNT NUMBER:</span> <span>${ data.accountdetail[0].accountnumber }</span> </td></tr>
                        <tr><td><span>ACCOUNT BALANCE:</span> <span>${ formatMoney(~~Math.abs(data.customerbalance)) }</span> </td></tr>
                        <tr><td><span>REGISTRATION DATE:</span> <span>${ new Date(data.accountdetail[0].registrationdate).toLocaleDateString() }</span> </td></tr>
                        <tr><td><span>LOCATION:</span> <span>${ loc !== undefined ?  loc.location : '' }</span> </td></tr>
                        <tr><td><span>STATE:</span> <span>${ data.customerdetail.state }</span> </td></tr>
                        <tr><td><span>PHONE:</span> <span>${ data.customerdetail.phonenumber }</span> </td></tr>
                        <tr><td><span>GENDER:</span> <span>${ data.customerdetail.gender }</span> </td></tr>
                    </table>
                    <input type="hidden" id="${input}" value="${data.accountdetail[0].accountnumber}">
                `
                
                try {
                    if(input == 'from') {
                        form.querySelector('#result-area').firstElementChild.innerHTML = `
                            <div class="section-header" style="display:flex; gap:6px; align-items:center;">
                                <h1>From: </h1>
                            </div>
                            ${template}
                        `
                    }
                    else if(input == 'to') {
                        form.querySelector('#result-area').lastElementChild.innerHTML = `
                            <div class="section-header" style="display:flex; gap:6px; align-items:center;">
                                <h1>To: </h1>
                            </div>
                            ${template}
                        `
                    }
                    
                    form.querySelector('#propertyprev').style.display = 'block'
                }
                catch(e) {console.log(e)}

            }
        }
        else { 
            if(input == 'from') {
                form.querySelector('#result-area').firstElementChild.innerHTML = ''
            }
            
            if(input == 'to') {
                form.querySelector('#result-area').lastElementChild.innerHTML = ''
            }
            return callModal('Account number invalid.', 0) 
            
        }
    }
    else {
        if(input == 'from') {
                form.querySelector('#result-area').firstElementChild.innerHTML = ''
        }
        
        if(input == 'to') {
            form.querySelector('#result-area').lastElementChild.innerHTML = ''
        }
        return callModal('Error: Unable to verify account number', 0)
    }
}

function saveSavingsTransfer() {
    
    if(!validateSavingsTransferForm()) return
    
    if(form.querySelector('input[type="hidden"]#from')?.value !== form.accountnumberfrom.value.trim()) {
        form.accountnumberfrom.value = ''
        return validateSavingsTransferForm()
    }
    
    if(form.querySelector('input[type="hidden"]#to')?.value !== form.accountnumberto.value.trim()) {
        form.accountnumberto.value = ''
        return validateSavingsTransferForm()
    }
    
    if(form.accountnumberfrom.value.trim() === form.accountnumberto.value.trim()) {
        return callModal('Cannot transfer funds to same accounts', 0)
    }

    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/savingstransferscript.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Savings transfer successful', 1)
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
	request.send(getSavingsTransferFormData());
}

function getSavingsTransferFormData() {
    let paramstr = new FormData(form)
    return paramstr;
}

async function fetchSavingsTransferLocations() {
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
        if(form.querySelector('#location')){
            form.querySelector('#location').innerHTML = ''
            form.querySelector('#location').innerHTML = '<option value="">--Select Location --</option>'+options
        }
    }else  hideSpinner()
}

function validateSavingsTransferForm() {
    var flag = 1;
	var mssg='';
	
	if(form.querySelector('#accountnumberfrom').value.length < 1){
		mssg += 'From account number is Invalid <br />';			
		form.querySelector('#accountnumberfrom').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#accountnumberfrom').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#accountnumberto').value.length < 1){
		mssg += 'To account number is Invalid <br />';			
		form.querySelector('#accountnumberto').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#accountnumberto').style.borderColor = 'lightgray';
	}
	
	
	if(form.querySelector('#location').value.length < 1){
		mssg += 'Location is Invalid <br />';			
		form.querySelector('#location').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#location').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#transactiondate').value.length < 1){
		mssg += 'Transaction date is Invalid <br />';			
		form.querySelector('#transactiondate').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#transactiondate').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#amount').value.length < 1){
		mssg += 'Transfer amount is Invalid <br />';			
		form.querySelector('#amount').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#amount').style.borderColor = 'lightgray';
	}
	
// 	if(form.querySelector('#naration').value.length < 1){
// 		mssg += 'Unit is Invalid <br />';			
// 		form.querySelector('#naration').style.borderColor = 'red';
// 		flag =0;
// 	}
// 	else{
// 		form.querySelector('#naration').style.borderColor = 'lightgray';
// 	}
	
	
	if(flag == 0){
		
		var mbox = document.getElementById('messageBox');
		mbox.innerHTML = mssg;
		mbox.style.display = 'block';
		mbox.style.visibility = 'visible';

		setTimeout(function(){
			mbox.style.display = 'none';
			mbox.style.visibility = 'hidden';
// 			form.querySelector('#naration').style.borderColor = 'lightgray';
			form.querySelector('#transactiondate').style.borderColor = 'lightgray';
			form.querySelector('#location').style.borderColor = 'lightgray';
			form.querySelector('#accountnumberto').style.borderColor = 'lightgray';
			form.querySelector('#accountnumberfrom').style.borderColor = 'lightgray';
			form.querySelector('#amount').style.borderColor = 'lightgray';
		

		}, 2000);	
		return false;
	}else{ 
		return true; 
	}
}
 
var transfersavingsbtn = document.getElementById('transfersavings')
if(transfersavingsbtn) transfersavingsbtn.addEventListener('click', e=>transfersavings())