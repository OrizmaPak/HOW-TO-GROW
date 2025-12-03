var form; datasource = []; var excessandreturns;

async function openresolveExcessAndReturns() {
    await httpRequest('resolveexcessandreturnedcash.php')
    
    form = document.getElementById('filterresolveexcessandreturnedcashform')
    if(document.querySelector('button#submit')) document.querySelector('button#submit').addEventListener('click', generateresolveExcessAndReturnsReport)
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(resolveExcessAndReturnssetCurrentPage)
    await fetchresolveExcessAndReturnsPageData()
}

async function fetchresolveExcessAndReturnsPageData() {
    await fetchresolveExcessAndReturnsLocations()
    await fetchresolveExcessAndReturnsGroupTargets()
    await fetchresolveExcessAndReturnsGroups()
}


async function generateresolveExcessAndReturnsReport(event) {
    showSpinner()
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchgroupdeposit.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        event.target.disabled = false;
        excessandreturns = datasource = res.data;
        if(excessandreturns.length) initPagination(res.data, resolveExcessAndReturnssetCurrentPage)
        else callModal('No records retrieved')
    }
    else {
        hideSpinner()
        if(jtabledata) jtabledata.innerHTML = '';
        event.target.disabled = false;
        callModal(res.message, 0)
    }
}


function openResolveModal(event, index) {
    let selecteditem = excessandreturns[index]
    if(selecteditem) {
        let modalcontent = `
                <h4 style="margin: 5px 10px 20px 10px;font-weight:bolder;text-transform:uppercase"></h4>
                <form class="jform no-pr" id="resolveexcessandreturnedcashform">
                    <div class="section-header" style="display:flex; gap:6px; align-items:center;"></div>
                    <div class="col-form-group" style="margin: 0 auto;width: 90%"> 
                        <div class="jformgroup form_row" > 
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Account Number: </label>
                                <input type="number" class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber">
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Transaction Date: </label>
                                <input type="date" class="jformcontrol jmargin-top" id="transactiondate" name="transactiondate">
                            </div>
                        </div>
                        <div class="jformgroup form_row" > 
                             <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Source: </label>
                                <select class="jformcontrol jmargin-top" id="source" name="source">
                                    <option value="Excess Cash">Excess Cash</option>
                                    <option value="Returned Cash">Returned Cash</option>
                                    <option value="Both">Returned Cash & Excess Cash</option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Amount: </label>
                                <input type="number" class="jformcontrol jmargin-top" id="amount" name="amount">
                            </div>
                        </div>
                        <div class="jformgroup form_row" >
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Description: </label>
                                <textarea class="jformcontrol jmargin-top" id="description" name="description"></textarea>
                            </div>
                        </div>
                        <div class="jflex" style="margin: 30px 0;">
                            <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" value="${selecteditem.id}" onclick="saveResolveExcessAndReturns(event)"> Save Changes </button>
                        </div>
                    </div>
                </form> 
               
                <div style="height: 30px;width:auto"></div>
                    `
                openJModal(modalcontent)
                document.querySelector('#resolveexcessandreturnedcashform #accountnumber').valueAsDate = selecteditem
                document.querySelector('#resolveexcessandreturnedcashform #transactiondate').valueAsDate = new Date()
    }           
    else return callModal('Item not available')
}


function saveResolveExcessAndReturns(event) {
    if(!validateresolveExcessAndReturnsForm()) return
    
    event.target.disabled = true;
    event.target.innerHTML = 'Saving...'
    showSpinner();
	var request = getAjaxObject();
    request.open('POST','../controllers/resolveexcess.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            event.target.disabled = false;
            event.target.innerHTML = 'Save Changes'
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Saved successfully', 1)
                    // excessandreturns = datasource = excessandreturns.filter(item => item.id !== event.target.value);
                    // if(excessandreturns.length) initPagination(excessandreturns, resolveExcessAndReturnssetCurrentPage)
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
    
    let paramstr = new FormData(document.getElementById('resolveexcessandreturnedcashform'))
    paramstr.append('id', event.target.value)
    
	request.setRequestHeader('Connection','close');
	request.send(paramstr);
}



function resolveExcessAndReturnssetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(excessandreturns.length) {
        excessandreturns.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendresolveExcessAndReturnsTableRows(item, index)
            }
        })
        if(document.querySelector('#resolveexcessandreturnedcashtable tbody').innerHTML === '') openMissedMaturity()
    }
}

async function appendresolveExcessAndReturnsTableRows(item, index) {
    let grouptarget = grouptargets?.find(val => val.id == item.target)
    let groupname = depositgrouplists?.find(val => val.id == item.groupid)
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ grouptarget?.target == undefined ? '' : grouptarget.target  }</td>
            <td>${ groupname?.groupname == undefined ? '' : groupname.groupname }</td>
            <td>${ new Date(item.transactiondate).toLocaleDateString() }</td>
            <td style="text-transform: none">${ item.accountofficer}</td>
            <td>${ formatMoney(item.deposit) }</td>
            <td>${ formatMoney(item.excesscash) }</td>
            <td>${ formatMoney(item.returnedcash) }</td>
            <td>${ formatMoney(item.total)  }</td>
            <td>
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="openResolveModal(event, ${index})">Resolve</button>
                </div>
            </td>
        </tr>
    `
} 

async function fetchresolveExcessAndReturnsGroupTargets(event) {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupptarget.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        grouptargets = res.data;
    }
    else hideSpinner()
}

async function fetchresolveExcessAndReturnsGroups() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        depositgrouplists = res.data?.data
    }
    else hideSpinner()
}

async function fetchresolveExcessAndReturnsLocations() {
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

function validateresolveExcessAndReturnsForm() {
    var flag = 1;
	var mssg='';
	let form = document.getElementById('resolveexcessandreturnedcashform')
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
	
	
	if(form.querySelector('#source').value.length < 1){
		mssg += 'Source is Invalid <br />';			
		form.querySelector('#source').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#source').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#accountnumber').value.length < 1){
		mssg += 'Account Number is Invalid <br />';			
		form.querySelector('#accountnumber').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#accountnumber').style.borderColor = 'lightgray';
	}
	
	
	if(form.querySelector('#description').value.length < 1){
		mssg += 'description is Invalid <br />';			
		form.querySelector('#description').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#description').style.borderColor = 'lightgray';
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
			form.querySelector('#source').style.borderColor = 'lightgray';
			form.querySelector('#description').style.borderColor = 'lightgray';
			form.querySelector('#accountnumber').style.borderColor = 'lightgray';
		

		}, 2000);	
		return false;
	}else{ 
		return true; 
	}
}

var excessandreturnsbtn = document.getElementById('resolveexcessandreturnedcash')
if(excessandreturnsbtn) excessandreturnsbtn.addEventListener('click', openresolveExcessAndReturns)