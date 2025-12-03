var form; var withdraws; var datasource = []
async function openEditWithdrawal () {
    await  httpRequest('editwithdrawals.php');
    form = document.getElementById('filtereditwithdrawalform')
    if(form) {
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateEditWithdrawalsTable)
        form.querySelector('#startdate').valueAsDate = new Date()
        form.querySelector('#enddate').valueAsDate = new Date()
        
        
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(editWithdrawalSetCurrentPage)
        await fetchEditWithdrawalTableData()
    }
}

async function fetchEditWithdrawalTableData() {
    await fetchUsersForEditWithdrawals()
    await fetchEditWithdrawalsAccountOfficers()
}

async function generateEditWithdrawalsTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchwithdrawals.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            withdraws = datasource = res.data;
            withdraws.length && initPagination(withdraws, editWithdrawalSetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

async function editWithdrawalSetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(withdraws.length) {
        withdraws.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendEditWithdrawalTableRows(item, index)
            }
        })
        
        if(document.querySelector('#editwithdrawalstable tbody').innerHTML === '') editwithdrawalsbtn.click()
    }
}

async function appendEditWithdrawalTableRows(item, index) {
    let user = await withdrawusers.find(val => val.email == item.user)
    let officerById = await withdrawusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await withdrawusers.find(val => val.email == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')} </td>
            <td> ${ item.accountnumber } </td>
            <td style="text-align:left"> ${ formatMoney(item.debit) } </td>
            <td> ${ item.reference} </td>
            <td> ${ new Date(item.transactiondate).toLocaleDateString() }</td>
            <td style="text-transform:none"> ${  item.accountofficer == undefined ? '' : ( officerById ? officerById.email : (officerByEmail ?  officerByEmail.email : '' ))} </td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="editWithdrawal(event, ${index})">Edit</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:tomato;border-radius:3px" onclick="removeWithdrawal(event, ${index})">Delete</button>
                </div>
            </td>
        </tr>
    `
}

async function removeWithdrawal(event, index) {
    
    if(!confirm('Are you sure you want to delete this withdrawal?')) return
    
    let selecteditem = withdraws[index]
    if(selecteditem) {
        event.target.disabled = true;
        event.target.innerHTML = 'Removing...'
        let paramstr = new FormData()
        paramstr.append('id', withdraws[index].id)
        
        try {
            let result = await fetch('../controllers/removewithdrawal.php', {body: paramstr, method: 'POST', headers: new Headers()})
            let res = await result.json()
            if(res?.status) {
                callModal('Transaction deleted successfully')

                let newarr = withdraws.filter( item => item.id !== withdraws[index].id);
                withdraws = datasource = newarr;
                withdraws.length && initPagination(newarr, editWithdrawalSetCurrentPage)
            }
    
            else {
                event.target.disabled = false;
                event.target.innerHTML = 'Delete'
                return callModal(res?.message)
            }
        }
        catch(e) {
            event.target.disabled = false;
            event.target.innerHTML = 'Delete'
            console.log(e)
        }
    }
}

async function editWithdrawal(event, index) {
    if(!confirm('Are you sure you want to edit this withdrawal?')) return
    
    event.target.disabled = true;
    event.target.innerHTML = 'Loading'
    let paramstr = new FormData()
    paramstr.append('id', withdraws[index].id)
    
    try {
        let result = await fetch('../controllers/fetchtdetail.php', {body: paramstr, method: 'POST', headers: new Headers()})
        let res = await result.json()
        if(res?.status) {
            
            event.target.disabled = false;
            event.target.innerHTML = 'Edit'
            
            let officersbyId = accountofficerslist?.map(function(item, index){
                return  `<option value="${item.id}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othername ?? '' )} </option>`
            }).join('')
            
            let officersbyemail = accountofficerslist?.map(function(item, index){
                return  `<option value="${item.email}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othername ?? '' )} </option>`
            }).join('')
            
            let modalcontent = `
                <h4 style="margin: 5px 10px 20px 10px;font-weight:bolder;text-transform:uppercase">Transaction Details</h4>
                <form class="jform no-pr" id="editwithdrawalform">
                    <div class="section-header" style="display:flex; gap:6px; align-items:center;"></div>
                    <div class="col-form-group" style="margin: 0 auto;width: 90%"> 
                        <div class="jformgroup form_row" > 
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Account Number: </label>
                                <input type="number" class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber" value="${res.data[0].accountnumber}">
                            </div>
                        </div>
                        <div class="jformgroup form_row" > 
                             <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Account officer: </label>
                                <select class="jformcontrol jmargin-top" id="accountofficer" name="accountofficer">
                                    <option value=""> -- Select Officer -- </option>
                                    ${ res.data[0].accountofficer == undefined ? '-' :( Number.isInteger(parseInt(res.data[0].accountofficer)) ? officersbyId : officersbyemail ) }
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Value Date: </label>
                                <input type="date" class="jformcontrol jmargin-top" id="valuedate" name="valuedate">
                            </div>
                        </div>
                        <div class="jformgroup form_row" >
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Amount: </label>
                                <input type="number" class="jformcontrol jmargin-top" id="amount" name="amount" value="${res.data[0].debit}">
                            </div>
                           <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Transaction Date: </label>
                                <input type="date" class="jformcontrol jmargin-top" id="transactiondate" name="transactiondate">
                            </div>
                        </div>
                        <div class="jflex" style="margin: 30px 0;">
                            <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" value="${withdraws[index].id}" onclick="saveWithdrawalChanges(event)"> Save Changes </button>
                        </div>
                    </div>
                </form> 
               
                <div style="height: 30px;width:auto"></div>
                    `
                openJModal(modalcontent)
                document.querySelector('#editwithdrawalform #accountofficer').value= res.data[0].accountofficer
                document.querySelector('#editwithdrawalform #transactiondate').value= res.data[0].transactiondate.split(' ')[0]
                document.querySelector('#editwithdrawalform #valuedate').value= res.data[0].valuedate.split(' ')[0]
        }
        else {
            event.target.disabled = false;
            event.target.innerHTML = 'Edit'
            return callModal(res?.message)
        }
    }
    catch(e) {
        event.target.disabled = false;
        event.target.innerHTML = 'Edit'
        console.log(e)
    }
}

function saveWithdrawalChanges(event) {
    if(!validateEditWithdrawForm()) return
    
    event.target.disabled = true;
    event.target.innerHTML = 'Saving...'
    showSpinner();
	var request = getAjaxObject();
    request.open('POST','../controllers/editwithdrawals.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            event.target.disabled = false;
            event.target.innerHTML = 'Save Changes'
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('withdrawal changes saved', 1)
                    document.getElementById('editwithdrawalform').reset()
                    form.querySelector('button#submit').click()
                    closeJmodal()
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else {
            event.target.disabled = false;
            event.target.innerHTML = 'Save Changes'
            return hideSpinner();
        }
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }
    
    let paramstr = new FormData(document.getElementById('editwithdrawalform'))
    paramstr.append('id', event.target.value)
    
	request.setRequestHeader('Connection','close');
	request.send(paramstr);
}

async function fetchUsersForEditWithdrawals () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) withdrawusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

async function fetchEditWithdrawalsAccountOfficers() {
    showSpinner()
    let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        accountofficerslist = res.data
    }
    else hideSpinner()
    
}

function validateEditWithdrawForm() {
    var flag = 1;
	var mssg='';
	let form = document.getElementById('editwithdrawalform')
	if(form.querySelector('#transactiondate').value.length < 1){
		mssg += 'Transaction date is Invalid <br />';			
		form.querySelector('#transactiondate').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#transactiondate').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#amount').value.length < 1){
		mssg += 'Amount withdrawn is Invalid <br />';			
		form.querySelector('#amount').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#amount').style.borderColor = 'lightgray';
	}
	
	
	if(form.querySelector('#valuedate').value.length < 1){
		mssg += 'Value date is Invalid <br />';			
		form.querySelector('#valuedate').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#valuedate').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#accountofficer').value.length < 1){
		mssg += 'Account officer is Invalid <br />';			
		form.querySelector('#accountofficer').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#accountofficer').style.borderColor = 'lightgray';
	}
	
	
	if(form.querySelector('#accountnumber').value.length < 1){
		mssg += 'Account number is Invalid <br />';			
		form.querySelector('#accountnumber').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#accountnumber').style.borderColor = 'lightgray';
	}
	
	
	if(flag == 0){
		
		var mbox = document.getElementById('messageBox');
		mbox.innerHTML = mssg;
		mbox.style.display = 'block';
		mbox.style.visibility = 'visible';

		setTimeout(function(){
			mbox.style.display = 'none';
			mbox.style.visibility = 'hidden';

			form.querySelector('#transactiondate').style.borderColor = 'lightgray';
			form.querySelector('#amount').style.borderColor = 'lightgray';
			form.querySelector('#valuedate').style.borderColor = 'lightgray';
			form.querySelector('#accountofficer').style.borderColor = 'lightgray';
			form.querySelector('#accountnumber').style.borderColor = 'lightgray';
		

		}, 2000);	
		return false;
	}else{ 
		return true; 
	}
}

var editwithdrawalsbtn = document.getElementById('editwithdrawals')
if(editwithdrawalsbtn) editwithdrawalsbtn.addEventListener('click', openEditWithdrawal, false)
