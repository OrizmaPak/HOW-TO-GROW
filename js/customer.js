// register customer account  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var fieldsIdd = [
 `id`,
 `lastname`,
 `firstname`,
 `othernames`,
 `phonenumber`,
 `homeaddress`,
 `officeaddress`,
 `gender`,
 `occupation`,
 `state`,
 `birthdate`,
 `kinfullname`, 
 `kinphonenumber`,
 `relationship`,
 `kinofficeaddress`,
 `kinhomeaddress`,
 `kinoccupation`, 
 `photourl`,
 `lga`,
 `town`,
 `stateofresidence`, 
 `lgaofresidence`
 ]; 

var pFiles, pFiles2, fileselect, input, fileselect2, input2;
var localItem;
 
async function openCustomerAccount() {
    await httpRequest('customeraccount.php');
    await addPageData()
    
    if(document.getElementById('submitcustomeraccount')) document.getElementById('submitcustomeraccount').addEventListener('click', e=>saveCustomerAccount());
    if(checkIfCustomerUpdate()) customerMode('update')
    else customerMode();
    
    pFiles = document.querySelector('#document')
    fileselect = document.querySelector('.file-action')
    if(fileselect) input = fileselect.querySelector('input[id="document"]')
    
    if(fileselect) fileselect.addEventListener('click', () =>{ if(input) input.click()})
    if(input) input.addEventListener('change', (e) => onCustomerFileInputChange(e.target, ''))
    
    pFiles2 = document.querySelector('#document2')
    fileselect2 = document.querySelector('.file-action2')
    if(fileselect2) input2 = fileselect2.querySelector('input[id="document2"]')
    
    if(fileselect2) fileselect2.addEventListener('click', () =>{ if(input2) input2.click()})
    if(input2) input2.addEventListener('change', (e) => onCustomerFileInputChange(e.target, '2'))
}

async function addPageData() {
    
    statesSelects = ['state', 'stateofresidence'];
    lgaSelects = ['lga', 'lgaofresidence']

    stateResponse = await fetchRequest('./resource/reststates.json')
    stateResponse = JSON.parse(stateResponse);
    
    const sortedStates = stateResponse.sort((a, b) => a.name.localeCompare(b.name));
    const stateOptions = sortedStates.map( item => `<option value="${item.name.toUpperCase()}">${item.name.toUpperCase()}</option>`).join('')
    
    statesSelects.forEach( (item, index) => {
        const select = document.getElementById(item);
        select.innerHTML += stateOptions
        select.addEventListener('change', async  e => {
            replaceTextWithTextSelect(lgaSelects[index])
            sortStateLga(e.target, lgaSelects[index])
        })
    })
    
}

function replaceSelectWithTextInput(selectId, value=null) {
  const selectElement = document.getElementById(selectId);

  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.id = selectElement.id; 
  textInput.name = selectElement.name; 
  textInput.className = selectElement.className;
  textInput.placeholder = 'Enter State'
  if(value) {
      textInput.value = value
  }
  selectElement.parentNode.replaceChild(textInput, selectElement);
}

function replaceTextWithTextSelect(inputId, option=null) {
  const inputElement = document.getElementById(inputId);

  const selectInput = document.createElement('select');
  selectInput.id = inputElement.id; 
  selectInput.name = inputElement.name; 
  selectInput.className = inputElement.className;
  if(option) {
      selectInput.innerHTML = option
  }
  inputElement.parentNode.replaceChild(selectInput, inputElement);
}

async function sortStateLga(element, lgaSelector) {
    if(!element.value) return 
    
    selectedState = await stateResponse.find( item => item.name.toUpperCase() == element.value.toUpperCase())
    lgas = selectedState.lgs.lgas.map(item => item.toUpperCase())
    const lgaOptions = lgas.map( item => `<option value="${item}">${item}</option>`).join('')

    const select = document.getElementById(lgaSelector)
    select.innerHTML = lgaOptions + `<option value="0"> -- Enter Value -- </option>`
    select.addEventListener('change', e => {
        if(+e.target.value == 0) {
            replaceSelectWithTextInput(e.target.id)
        }
    })
}

var customerMode = function(mode='savings') { 
    if(mode.includes('update')) {
        let localdata  = sessionStorage.getItem('customer')
        let parsedata = localItem = JSON.parse(localdata);
        try {
            
            Object.keys(parsedata).forEach( item => {
                let el = document.getElementById(item);
                
                if ([...statesSelects, ...lgaSelects].includes(item)) {
                    parsedata[item] = parsedata[item]?.toUpperCase()
                }

                statesSelects.forEach((selectItem, index) => {
                    sortStateLga(document.getElementById(selectItem), lgaSelects[index])
                })

                if(el && parsedata[item]) el.value = parsedata[item];
            })
            
            setTimeout(() => {
                statesSelects.forEach((selectItem, index) => {
                    let el = document.getElementById(lgaSelects[index]);
                    const lga = parsedata[lgaSelects[index]]
                    if(!lgas.includes(lga) && document.getElementById(selectItem).value) {
                        replaceSelectWithTextInput(el.id, lga)
                    } else { el.value = lga }
                    
                })
            }, 1000)
            
            sessionStorage.removeItem('customer')
        }
        catch(e) {
            console.log(e)
        }
        
    }
    else {
        sessionStorage.removeItem('customer')
        localItem = null;
    }
}

var checkIfCustomerUpdate = function() {
    return !!sessionStorage.getItem('customer')
}

function validateCustomerAccount(z){

	var flag = 1;
	var mssg='';
	for(var i=0; i<z.length; i++){
	    let x = z[i];
	    if(document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'input' || document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'select' ){
	        if(document.getElementById(x).value.length < 1 ){
	           // console.log(document.getElementById(x).value.length < 1, document.getElementById(x).value.length, document.getElementById(x).value) 
     			mssg += `${x} is Invalid <br />`;			
     			document.getElementById(x).style.borderColor = 'red';
     			flag =0;
 		    }else{
 		        //console.log(document.getElementById(x).value.length, document.getElementById(x).value)
 			    document.getElementById(x).style.borderColor = 'lightgray';
 		    }
	    }else{
	       console.log(`${x} is not an input`)
	    }
	}
	
	if(flag == 0){
		var mbox = document.getElementById('messageBox');
		mbox.innerHTML = mssg;
		mbox.style.display = 'block';
		mbox.style.visibility = 'visible';
		setTimeout(function(){
			mbox.style.display = 'none';
			mbox.style.visibility = 'hidden';
			for(var i=0; i<z.length; i++){
     		    let x = z[i]
     		    if(document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'input' || document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'select' ){
     		        if(document.getElementById(x).value.length < 1 || document.getElementById(x).value ){
             			document.getElementById(x).style.borderColor = 'lightgray';
         		    }
         	    }
		    }
	    }, 2000);
	    
		return false;
		
	}else{ 
		return true; 
	}
}

function getCustomerAccountParams(z){ 
	var paramstr = new FormData();
	localItem && paramstr.append('id', localItem.id);
	for(var i=0; i<z.length; i++){
 	    let x = z[i]
 	    if(document.getElementById(x) && document.getElementById(x).tagName.toLowerCase() == 'input' || document.getElementById(x) && document.getElementById(x).tagName.toLowerCase() == 'select' ){
 	        if(document.getElementById(x).value.length < 1 || document.getElementById(x).value ){
     			paramstr.append(x, document.getElementById(x).value);
 		    }
 	    }
	}
	
    try {
        paramstr.append('photofilename',input.files[0].name);		
        paramstr.append('userphotoname',input.files[0]);
        paramstr.append('photofilename2',input2.files[0].name);		
        paramstr.append('userphotoname2',input2.files[0]);
    }
    catch(ex){
         paramstr.append('photofilename','-');		
         paramstr.append('userphotoname','-');
     
    }
   return paramstr;
}


var	saveCustomerAccount = function(e){ 
    let formstate = validateCustomerAccount(fieldsIdd);
    if(!formstate){ 
		return; 
	}
	
	showSpinner();
	var request = getAjaxObject();
    
    request.open('POST','../controllers/customeraccountscript.php',true);
    
    request.onreadystatechange = function(e){
        
        if(request.readyState == 1){}
        
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            let parseRequest = JSON.parse(request.responseText)
            if(parseRequest.message.includes("Successful") || parseRequest.message.includes("Successful")){
                callModal('Request successful', 1)
            }
            else {
                callModal('Request failed', 0)
            }
        }
        else{
            hideSpinner()
        }

        e.stopPropagation();
    }

    
    request.setRequestHeader('Connection','close'); 
    request.send(getCustomerAccountParams(fieldsIdd));
	
}

function fileTypeValidator(selectedFiles) {
    let isValid = false;
    let selectedFilesArray = Object.values(selectedFiles);
    selectedFilesArray.forEach(file => {
        let splitFileName = file.name.split('.');
        let extension = splitFileName[splitFileName.length - 1];
        if (['jpg','jpeg', 'png', 'pdf', 'docx'].includes(extension)) isValid = true;
        else isValid = false;
    })
    return isValid;
}


function onCustomerFileInputChange(event, whic='') {
    
    if(whic == ''){
    let previewEl = document.querySelector('.file-area');
    if(previewEl) previewEl.innerHTML = '';
    let selectedFiles = input.files;

    if (!fileTypeValidator(selectedFiles)) {
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
    
    if(whic != ''){
    let previewEl = document.querySelector('.file-area2');
    if(previewEl) previewEl.innerHTML = '';
    let selectedFiles = input2.files;

    if (!fileTypeValidator(selectedFiles)) {
        errorBox('Unsupported file selected')
        input2.value = event = null;
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
    
}


var customerAccountBtn = document.getElementById('customeraccount');
if(customerAccountBtn) customerAccountBtn.addEventListener('click', openCustomerAccount, false);


// view customers  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var jtabledata; var datasource = null; var printBtn; var exportDataToExcel; var searchBox;

async function openViewCustomer () {
    await httpRequest('viewcustomers.php')
    jtabledata = document.getElementById('jtabledata')
    printBtn = document.getElementById('pc-btn')
    exportDataToExcel = document.getElementById('ec-btn')
    
    document.getElementById('startdate').value = '';
    document.getElementById('enddate').value = '';

    if(printBtn) printBtn.addEventListener('click', () => printCustomers())
    if(exportDataToExcel) exportDataToExcel.addEventListener('click', () => tableToExcel('viewcustomertable', 'customers'))
    if(document.querySelector('button#submit')) document.querySelector('button#submit').addEventListener('click', fetchCustomers)

    initializePaginationParams(viewCustomerSetCurrentPage)
    await fetchCustomers()
}


function sortByRegistrationDate(items) {
  items.sort((a, b) => {
    const dateA = new Date(a.registrationDate);
    const dateB = new Date(b.registrationDate);
    return dateA - dateB;
  });
  return items;
}


function renderTableHTML(item, index) {
    jtabledata.innerHTML += `
        <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
            <td> ${ index +1} </td>
            <td> ${ formatDate(item.created_at) } </td>
            <td> ${ item.lastname } </td>
            <td> ${ item.firstname } </td>
            <td> ${ item.othernames } </td>
            <td> ${ item.phonenumber } </td>
            <td> ${ item.homeaddress } </td>
            <td> ${ item.officeaddress } </td>
            <td> ${ item.gender } </td>
            <td> ${ item.occupation } </td>
            <td> ${ item.state } </td>
            <td> ${ formatDate(item.birthdate) } </td>
            <td> ${ item.town } </td>
            <td> ${ item.lga } </td>
            <td> ${ item.stateofresidence ?? '' } </td>
            <td> ${ item.lgaofresidence ?? '' } </td>
            <td class="no-pr">
                <div style="display: flex;gap:5px">
                    <a style="display: ${(item.photourl && item.photourl !== '-' && item.photourl !== '') ? 'block' : 'none'};" target="_blank" href="../images/customer/${item.photourl}" >
                        <div style="width: 50px;height:50px;background-image:url('../images/customer/${item.photourl}');background-size: cover;background-repeat:no-repeat"></div>
                    </a>
                    <a style="display: ${(item.photourl2 && item.photourl2 !== '-' && item.photourl2 !== '') ? 'block' : 'none'};" target="_blank" href="../images/customer/${item.photourl2}" >
                        <div style="width: 50px;height:50px;background-image:url('../images/customer/${item.photourl2}');background-size: cover;background-repeat:no-repeat"></div>
                    </a>
                </div>
            </td>
            <td class="no-pr">
                 <div style="align-items:center;">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:rgb(0, 105, 217);border-radius:3px;" onclick="updateCustomerItem(${index})">Update</button>
                </div>
            </td>
            
        </tr>
    `
}  

var viewCustomerSetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    
    if(datasource.length) {
        datasource.forEach(async function(item, index){
            if (index >= prevRange && index < currRange) {
                await renderTableHTML(item, index)
            }
        })
        if(document.querySelector('#viewcustomertable tbody').innerHTML === '') openViewCustomerBtn.click()
    }
    else {
        jtabledata.innerHTML=  renderNoTableData()
    }
}


function updateCustomerItem(itemindex) {
    if(itemindex !== null || itemindex !== undefined) {
        sessionStorage.setItem('customer', JSON.stringify(datasource[+itemindex]))
        try {
            document.getElementById('customeraccount').click()
        }
        catch(e) {
            return null
        }
    }
} 

async function fetchCustomers () {
    let payload = new FormData(document.getElementById('filterviewcustomers'))
    let result = await fetchRequest('../controllers/fetchcustomeraccountscript.php', payload)
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.status){
           datasource = parseResult.data.data
           parseResult.data.data?.length && initPagination(datasource, viewCustomerSetCurrentPage)
        }
    }
}

function printCustomers() {
    let content = document.getElementById('jpagecontent');  
    if(content) { 
        var winPrint = window.open('Customers', '', 'width=1000,height=900');  
        winPrint.document.write('<html><head><title></title>');
        winPrint.document.write('<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">');
        winPrint.document.write(' <h1 style="text-align:center;font-weight:400px;text-transform:uppercase;font-size:14px;"> Customers </h1> ' + content.innerHTML);
        winPrint.document.write('<script type="text/javascript">addEventListener("load", () => { print(); close(); })</script></body></html>');
        winPrint.document.close();
        winPrint.focus(); 
    }
}  
 
function renderNoTableData() {
    return  `
        <tr id="no-data">
            <td colspan="12">
                <div class="form-paragraph" style="text-align:center"> No data to show </div>
            </td>
        </tr>
    `
}

var openViewCustomerBtn = document.getElementById('viewcustomers')
if(openViewCustomerBtn) openViewCustomerBtn.addEventListener('click', openViewCustomer, false)

// APPROVE CUSTOMER ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var jtabledata; var datasource = null; var printBtn; var exportDataToExcel; var searchBox;

async function openapprovecustomer () {
    await httpRequest('approvecustomer.php')
    jtabledata = document.getElementById('jtabledata')
    printBtn = document.getElementById('pc-btn')
    exportDataToExcel = document.getElementById('ec-btn')

    if(printBtn) printBtn.addEventListener('click', () => printCustomers())
    if(exportDataToExcel) exportDataToExcel.addEventListener('click', () => tableToExcel('viewcustomertable', 'customers'))
    if(document.querySelector('button#submit')) document.querySelector('button#submit').addEventListener('click', fetchapproveCustomers)

    initializePaginationParams(viewapproveCustomerSetCurrentPage)
    await fetchapproveCustomers()
}


function sortByRegistrationDate(items) {
  items.sort((a, b) => {
    const dateA = new Date(a.registrationDate);
    const dateB = new Date(b.registrationDate);
    return dateA - dateB;
  });
  return items;
}


function approverenderTableHTML(item, index) {
    jtabledata.innerHTML += `
        <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
            <td> ${ index +1} </td>
            <td> ${ item.lastname } </td>
            <td> ${ item.firstname } </td>
            <td> ${ item.othernames } </td>
            <td> ${ item.phonenumber } </td>
            <td> ${ item.homeaddress } </td>
            <td> ${ item.officeaddress } </td>
            <td> ${ item.gender } </td>
            <td> ${ item.occupation } </td>
            <td> ${ item.state } </td>
            <td> ${ item.birthdate } </td>
            <td> ${ item.town } </td>
            <td> ${ item.lga } </td>
            <td> ${ item.stateofresidence ?? '' } </td>
            <td> ${ item.lgaofresidence ?? '' } </td>
            <td> ${ formatDate(item.created_at ?? '') } </td>
            <td class="no-pr"><a style="display: ${(item.photourl && item.photourl !== '-' && item.photourl !== '') ? 'block' : 'none'};color:blue" target="_blank" href="../images/customer/${item.photourl}" >Click to view</a></td>
            <td class="no-pr">
                 <div style="align-items:center;display:flex;gap:7px">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px;" onclick="viewCustomerUpdate(${item.existingcustomerid}, event)">View</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px;" onclick="approvedeclinecustomer(${item.id}, 'decline')">Decline</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px;" onclick="approvedeclinecustomer(${item.id}, 'approve')">Approve</button>
                </div>
            </td>
            
        </tr>
    `
}  

async function viewCustomerUpdate(id, event){
    event.target.innerHTL = 'loading...'
    event.target.style.opacity = 0.4
    let payload = new FormData()
    payload.append('existingcustomerid', id)
    const  result = await fetchRequest('../controllers/fetchcustomerdatabeingupdated.php', payload)
    if(result) {
        event.target.innerHTL = 'view'
        event.target.style.opacity = 1
        let parseResult = JSON.parse(result);
        if(parseResult.status){
            const rows  = parseResult.data.map( item => `
                <tr>
                    <th> Last&nbsp;Name</th>
                    <td> ${ item.lastname } </td>
                </tr>
                <tr>
                    <th> First&nbsp;Name </th>
                    <td> ${ item.firstname } </td>
                </tr>
                <tr>
                    <th> Other&nbsp;Names&nbsp;</th>
                    <td> ${ item.othernames } </td>
                </tr>
                <tr>
                    <th> Phone&nbsp;Number </th>
                    <td> ${ item.phonenumber } </td>
                </tr>
                <tr>
                    <th> Home&nbsp;Address </th>
                    <td> ${ item.homeaddress } </td>
                </tr>
                <tr>
                    <th> Office&nbsp;Address </th>
                    <td> ${ item.officeaddress } </td>
                </tr>
                <tr>
                    <th> Gender </th>
                    <td> ${ item.gender } </td>
                </tr>
                <tr>
                    <th> Occupation </th>
                    <td> ${ item.occupation } </td>
                </tr>
                <tr>
                    <th> State </th>
                    <td> ${ item.state } </td>
                </tr>
                <tr>
                    <th> Birthdate </th>
                    <td> ${ item.birthdate } </td>
                </tr>
                <tr>
                    <th> Town </th>
                    <td> ${ item.town } </td>
                </tr>
                <tr>
                    <th> Lga </th>
                    <td> ${ item.lga } </td>
                </tr>
                <tr>
                    <th> State of Residence </th>
                    <td> ${ item.stateofresidence ?? '' } </td>
                </tr>
                <tr>
                    <th> Lga of Residence </th>
                    <td> ${ item.lgaofresidence ?? '' } </td>
                </tr>
            `)
            let modalcontent = `
                <h4 style="margin: 5px 10px 20px 10px;font-weight:bolder;text-transform:uppercase">Current Profile Information</h4>
                <div class="jtable-content">
                    <table id="description" style="width: 90%;margin:0 auto;">
                        <tbody id="jtabledata">${ rows }</tbody>
                    </table>
                </div>
                <div style="height: 30px;width:auto"></div>
            `
            openJModal(modalcontent)
        }
    }
}

async function approvedeclinecustomer(id, state){
    if(!window.confirm(`Are you sure you want to ${state} this customer update?`))return
     let result
     let payload = new FormData()
     payload.append('id', id)
     if(state == 'approve')result = await fetchRequest('../controllers/approvecustomerprofile.php', payload)
     if(state == 'decline')result = await fetchRequest('../controllers/declinecustomerprofileupdate.php', payload)
     console.log(result, typeof result)
        if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.status){
            callModal('Successful',1)
           fetchapproveCustomers()
        }
    }
}

var viewapproveCustomerSetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    
    if(datasource.length) {
        datasource.forEach(async function(item, index){
            if (index >= prevRange && index < currRange) {
                await approverenderTableHTML(item, index)
            }
        })
        if(document.querySelector('#viewcustomertable tbody').innerHTML === '') openapprovecustomerBtn.click()
    }
    else {
        jtabledata.innerHTML=  renderNoTableData()
    }
}


function updateCustomerItem(itemindex) {
    if(itemindex !== null || itemindex !== undefined) {
        sessionStorage.setItem('customer', JSON.stringify(datasource[+itemindex]))
        try {
            document.getElementById('customeraccount').click()
        }
        catch(e) {
            return null
        }
    }
} 

async function fetchapproveCustomers () {
    // let payload = new FormData(document.getElementById('filterviewcustomers'))
    jtabledata.innerHTML =  ''
    let result = await fetchRequest('../controllers/fetchcustomerdataforupdate.php')
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.status){
           datasource = parseResult.data
           parseResult.data?.length && initPagination(datasource, viewapproveCustomerSetCurrentPage)
        }
    }
}

function printCustomers() {
    let content = document.getElementById('jpagecontent');  
    if(content) { 
        var winPrint = window.open('Customers', '', 'width=1000,height=900');  
        winPrint.document.write('<html><head><title></title>');
        winPrint.document.write('<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">');
        winPrint.document.write(' <h1 style="text-align:center;font-weight:400px;text-transform:uppercase;font-size:14px;"> Customers </h1> ' + content.innerHTML);
        winPrint.document.write('<script type="text/javascript">addEventListener("load", () => { print(); close(); })</script></body></html>');
        winPrint.document.close();
        winPrint.focus(); 
    }
}  
 
function renderNoTableData() {
    return  `
        <tr id="no-data">
            <td colspan="12">
                <div class="form-paragraph" style="text-align:center"> No data to show </div>
            </td>
        </tr>
    `
}

var openapprovecustomerBtn = document.getElementById('approvecustomer')
if(openapprovecustomerBtn) openapprovecustomerBtn.addEventListener('click', openapprovecustomer, false)
