var form; var localitem;

async function groupDeposit () {
    await httpRequest('group-deposit.php');
    form = document.getElementById('groupdepositform')
    if(form) {
        if(form.querySelector('button#resetform')) form.querySelector('button#resetform').addEventListener('click', resetGroupDepositForm)
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', saveGroupDeposit)
        
        await fetchGroupDepositPageData()
        if(!!sessionStorage.getItem('groupdeposit')) groupDepositMode('edit')
        
        else groupDepositMode()
    }
}

async function groupDepositMode(mode='save') {
    if(mode == 'edit') {
        localitem = JSON.parse(sessionStorage.getItem('groupdeposit'))
        let item = localitem.item;
        
        Array.from(form.querySelectorAll('input')).concat(Array.from(form.querySelectorAll('select'))).map(input => {
            try {
                if(item[input.id]) {
                    input.value = item[input.id]
                }
            }
            catch (e) {console.log(e)}
        })
        fetchGroupDepositGroupTargets({target:{value: item.groupid}})
        form.querySelector('button#submit').innerHTML = 'Save changes'
        sessionStorage.clear()
    }
    else {
        form.querySelector('#transactiondate').valueAsDate = new Date()
        form.querySelector('#valuedate').valueAsDate = new Date()
        if(form.querySelector('#groupid')) form.querySelector('#groupid').addEventListener('change', fetchGroupDepositGroupTargets)
    }
}
    
function getFetchGroupDepositParams(){
    var paramstr = new FormData();
    paramstr.append("transactiondate", document.getElementById('confirm-detail-transaction-date').value);
    paramstr.append("group", document.getElementById('confirm-detail-group').value);
    return paramstr;

}  

async function fetchGroupDepositPageData() {
    await fetchGroupDepositAccountOfficers()
    await fetchGroupDepositLocations()
    await fetchGroupDepositGroups()
}

async function fetchGroupDepositGroupTargets(event) {
    showSpinner()
    let paramstr = new FormData()
    paramstr.append('id', event.target.value)
    let result = await fetch('../controllers/fetchgroupptarget.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        let options = ''
        res.data?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.target} </option>
            `
        })
        if(form.querySelector('#target')){
            form.querySelector('#target').innerHTML = ''
            form.querySelector('#target').innerHTML = options
        }
    }
    else {
        hideSpinner()
        if(form.querySelector('#target')){
            form.querySelector('#target').innerHTML = ''
            form.querySelector('#target').innerHTML = '<option value=""> -- Select Target --</option>'
        }
    }
}

async function fetchGroupDepositGroups() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        let options = ''
        res.data?.data?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.groupname} </option>
            `
        })
        if(form.querySelector('#groupid')){
            form.querySelector('#groupid').innerHTML = ''
            form.querySelector('#groupid').innerHTML = '<option value=""> -- Select Group -- </option>' + options
        }
    }
    else hideSpinner()
}

async function fetchGroupDepositAccountOfficers() {
    showSpinner()
    let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        let options = ''
        res.data?.map(function(item, index){
            options += `
                <option value="${item.email}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othername ?? '' )} </option>
            `
        }) 
        if(form.querySelector('#accountofficer')){
            form.querySelector('#accountofficer').innerHTML = ''
            form.querySelector('#accountofficer').innerHTML = '<option value=""> -- Select Account Officer -- </option>' + options
        }
    }
    else hideSpinner()
    
}

async function fetchGroupDepositLocations() {
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
            form.querySelector('#location').innerHTML = '<option value="">--Select Branch --</option>'+options
        }
    }else  hideSpinner()
}

function validateGroupDeposit(){
	var flag = 1;
	var mssg='';
    
	var transactiondate = form.querySelector('#transactiondate');
	var accountofficer = form.querySelector('#accountofficer');
	var valuedate = form.querySelector('#valuedate');
	var groupid = form.querySelector('#groupid');
	var deposit = form.querySelector('#deposit');
	var returnedcash = form.querySelector('#returnedcash');
	var excesscash = form.querySelector('#excesscash');
	var total = form.querySelector('#total');
	var numbervisited = form.querySelector('#numbervisited');
	var target = form.querySelector('#target');
	var location = form.querySelector('#location');

	if(transactiondate.value.length < 1){
		mssg += 'Transaction Date must be selected <br />';			
		transactiondate.style.borderColor = 'red';
		flag =0;
	} else if (transactiondate.value.length >= 250) {
		mssg += 'Transaction Date must be selected <br />';			
		transactiondate.style.borderColor = 'red';
		flag =0;
	} else {
		transactiondate.style.borderColor = 'lightgray';
	}
	
	if(accountofficer.value.length < 1){
		mssg += 'Account Officer must be selected <br />';			
		accountofficer.style.borderColor = 'red';
		flag =0;
	}else{
		accountofficer.style.borderColor = 'lightgray';
	}
	
	if(valuedate.value.length < 1){
		mssg += 'Value Date must be selected <br />';			
		valuedate.style.borderColor = 'red';
		flag =0;
	}else{
		valuedate.style.borderColor = 'lightgray';
	}
	
	if(groupid.value.length < 1){
		mssg += 'Group must be selected <br />';			
		groupid.style.borderColor = 'red';
		flag =0;
	}else{
		groupid.style.borderColor = 'lightgray';
	}
	
	if(deposit.value.length < 1){
		mssg += 'Deposit is blank <br />';			
		deposit.style.borderColor = 'red';
		flag =0;
	} else{
		deposit.style.borderColor = 'lightgray';
	}
	
	if(returnedcash.value.length < 1){
		mssg += 'Returned Cash is blank <br />';			
		returnedcash.style.borderColor = 'red';
		flag =0;
	} else{
		returnedcash.style.borderColor = 'lightgray';
	}
	
	if(excesscash.value.length < 1){
		mssg += 'Excess Cash is blank <br />';			
		excesscash.style.borderColor = 'red';
		flag =0;
	} else{
		excesscash.style.borderColor = 'lightgray';
	}
	
	if(total.value.length < 1){
		mssg += 'Total Cash is blank <br />';			
		total.style.borderColor = 'red';
		flag =0;
	} else{
		total.style.borderColor = 'lightgray';
	}
	
	if(numbervisited.value.length < 1){
		mssg += 'Number Visited is blank <br />';			
		numbervisited.style.borderColor = 'red';
		flag =0;
	}else{
		numbervisited.style.borderColor = 'lightgray';
	}
	
	if(target.value.length < 1){
		mssg += 'Target is blank <br />';			
		target.style.borderColor = 'red';
		flag =0;
	}else{
		target.style.borderColor = 'lightgray';
	}
	
	if(location.value.length < 1){
		mssg += 'Branch is blank <br />';			
		location.style.borderColor = 'red';
		flag =0;
	}else{
		location.style.borderColor = 'lightgray';
	}
	
	if(flag == 0){
		
		var mbox = document.getElementById('messageBox');
		mbox.innerHTML = mssg;
		mbox.style.display = 'block';
		mbox.style.visibility = 'visible';

		setTimeout(function(){
			mbox.style.display = 'none';
			mbox.style.visibility = 'hidden';
			transactiondate.style.borderColor = 'lightgray';
			accountofficer.style.borderColor = 'lightgray';
			valuedate.style.borderColor = 'lightgray';
			groupid.style.borderColor = 'lightgray';
			deposit.style.borderColor = 'lightgray';
			returnedcash.style.borderColor = 'lightgray';
			excesscash.style.borderColor = 'lightgray';
			total.style.borderColor = 'lightgray';
			numbervisited.style.borderColor = 'lightgray';
			target.style.borderColor = 'lightgray';
			location.style.borderColor = 'lightgray';

		}, 3000);	
		return false;
	}else{ 
		return true; 
	}

}

function getGroupDepositParams(){
    var paramstr = new FormData(document.getElementById('groupdepositform'));
    if(localitem) paramstr.append('id', localitem.item.id)
    return paramstr;
}

function resetGroupDepositForm() {
    form.querySelector('button#submit').innerHTML = 'Submit'
    form.reset()
    localitem = null;
    form.target.innerHTML = '';
    sessionStorage.clear()
    groupDepositMode()
}

var saveGroupDeposit = function(e){
    
    if(!validateGroupDeposit()) return
	
	let cashinputs = ['deposit', 'returnedcash', 'excesscash', 'total']
	if((parseFloat(form.querySelector('#deposit').value) + parseFloat(form.querySelector('#returnedcash').value) + parseFloat(form.querySelector('#excesscash').value)) !== parseFloat(form.querySelector('#total').value)) {
	     cashinputs.forEach( input => form.querySelector(`#${input}`).style.borderColor = 'red')
	     return callModal('Total cash = Deposit + Returned + Excess cash')
	}
	else {
	   cashinputs.forEach( input => form.querySelector(`#${input}`).style.borderColor = '') 
	}
	 
    showSpinner();
	var request = getAjaxObject();
    request.open('POST','../controllers/groupdepositscript.php',true);
    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                form.querySelector('button#submit').innerHTML = 'Submit'
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Group deposit successful', 1)
                    resetGroupDepositForm()
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  {
                return callModal('Error: Request failed', 0)
                
            }
        }
        else return hideSpinner();
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }
    
	request.setRequestHeader('Connection','close');
	request.send(getGroupDepositParams());

}


var groupDepositNav = document.getElementById("groupdeposit");
if (groupDepositNav) groupDepositNav.addEventListener("click", groupDeposit, false);