var form; var paidproperties;

async function openPropertyDelivery() {
    await httpRequest('propertydelivery.php')
    
    await fetchPropertyDeliveryPageData()
    
    form = document.getElementById('propertydeliveryform') 
    if(form) {
         Array.from(form.querySelectorAll('#print-download-btns button')).map( button => button.disabled = true)
        if(form.querySelector('button#searchaccount')) form.querySelector('button#searchaccount').addEventListener('click', searchForPropertyAccount)
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', savePropertyDelivery)
        if(form.querySelector('#deliverydate')) form.querySelector('#deliverydate').valueAsDate = new Date()
        
        if(form.querySelector('#togglerefunddue')) form.querySelector('#togglerefunddue').addEventListener('click', function(e) {
            if(event.target.checked) {  
                form.querySelector('#refunddue').disabled = false 
                form.querySelector('#reasonforrefund').disabled = false
            }
            else {
                form.querySelector('#refunddue').disabled = true
                form.querySelector('#reasonforrefund').disabled = true
                form.querySelector('#refunddue').value = null
                form.querySelector('#reasonforrefund').value = null
            }
        })
        if(form.querySelector('#toggleadditionalcharges')) form.querySelector('#toggleadditionalcharges').addEventListener('click', function(e) {
            if(event.target.checked) {
                form.querySelector('#additionalcharge').disabled = false
                form.querySelector('#additionalchargedescription').disabled = false
                
            }
            else {
                form.querySelector('#additionalcharge').disabled = true
                form.querySelector('#additionalchargedescription').disabled = true
                form.querySelector('#additionalcharge').value = null
                form.querySelector('#additionalchargedescription').value = null
            }
        })
        
        // if(form.querySelector('button#print-pd')) form.querySelector('button#print-pd').addEventListener('click', () => generatePrintReceipt('print'))
        
        // if(form.querySelector('button#download-r')) form.querySelector('button#download-r').addEventListener('click', () => generatePrintReceipt('image'))
        
        if(form.querySelector('button#print-dn')) form.querySelector('button#print-dn').addEventListener('click', () => generatePrintDeliveryNote('print'))
        
        if(form.querySelector('button#download-dn')) form.querySelector('button#download-dn').addEventListener('click', () => generatePrintDeliveryNote('image'))
        
    }
}


async function fetchPropertyDeliveryPageData() {
    await fetchPaidProperties()
    await fetchPropertyDeliveryCustomerAccounts()
    await retrievePropertyDeliveryInventoryItems()
    await fetchPropertyDeliveryLocations()
    await fetchPropertyDeliveryCurrentUserprofile()
    await fetchPropertyDeliveryOrganizationInfo()
}

async function fetchPropertyDeliveryOrganizationInfo() {
    let result = await fetchRequest('../controllers/fetchorganisationscript.php');
    if(result) {
        let parseResult  =  JSON.parse(result);
        if(parseResult.status){
            orginfo = parseResult.data.data[0]
        }
    }
}

async function fetchPaidProperties() {
    showSpinner()
    let result = await fetch('../controllers/fetchpaidupproperties.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        paidproperties = res.data
        let options = paidproperties.map( item => `<option value="${item.accountnumber}">` )
        form.querySelector('#propertyaccount').innerHTML = `
            <datalist id="paidprop">${options}</datalist>
        `
    }
    else hideSpinner()
}


async function retrievePropertyDeliveryInventoryItems() {
    let result = await httpJsonRequest('../controllers/fetchinventoryitemscript.php')
    if(result) {
        if(result.status) {
            inventoryitemslist = result.data.data
        }
    }
}

async function fetchPropertyDeliveryCustomerAccounts() {
    showSpinner()
    let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        propertydeliverycustomers = res.data?.data;
    }
    else hideSpinner()
}

async function fetchPropertyDeliveryLocations() {
    showSpinner()
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        locations =  res.data?.data;
    }else  hideSpinner()
}

async function fetchPropertyDeliveryCurrentUserprofile() {
    showSpinner()
    let result = await fetch('../controllers/fetchuserprofile.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res?.status) {
            currentuserprofile = res;
            hideSpinner()
            let options = `<option value="${ res?.email}"> ${ res?.firstname + ' ' + res?.lastname + ' ' + (res.othernames == undefined ? '' : res.othernames) } </option>`
             try {
                 form.querySelector('#user').innerHTML = options
             }
             catch(e) {}
        }
        else hideSpinner()
    }
    else hideSpinner
}


async function findInventoryItem(id) {
    var inventoryitem = await inventoryitemslist.find( value => value.id == id);
    return inventoryitem ? inventoryitem.itemname : ''
}

async function findCustomerProfile(id) {
    var customer = await propertydeliverycustomers.find(value => value.id === id);
    return customer
}

async function populateDeliveryForm(locationid) {
    let location = await locations.find( value => value.id == locationid)
    if(location) {
        form.querySelector('#location').value = location.location;
    }
}

let recieptinfo = {};

async function searchForPropertyAccount() {
    let findlocalaccount = await paidproperties?.find( item => item.accountnumber == form.querySelector('#propertyaccount')?.value.trim())
    if(form.querySelector('#propertyaccount')?.value.trim().length < 1) return callModal('Please Select Property account', 0)
    else if(!findlocalaccount) return callModal('Property not found on the paid list', 0)
    try {
        let paramstr = new FormData()
        paramstr.append('accountnumber', form.querySelector('#propertyaccount').value.trim())
        let result = await httpJsonRequest('../controllers/fetchpropertyaccountdetail.php', 'POST', paramstr)
        if(result?.status) {
            
            let data = JSON.parse(JSON.stringify(result.data));
            if(!propertydeliverycustomers){
                return setTimeout(()=>{searchForPropertyAccount()},1000)
            }
            let customer = await findCustomerProfile(data.propertyaccount[0].customer)
            populateDeliveryForm(data.propertyaccount[0].location)
            
            recieptinfo = {customer, property: data}

            try {
                let html = `
                
                    <tr>
                        <td>
                            <span>Account Name:</span>
                            <span> ${ customer !== undefined ? (customer?.firstname + ' ' + customer?.lastname + ' ' + (customer?.othernames == '-' ? '' : customer?.othernames)) : ''} </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>ACCOUNT NUMBER:</span>
                            <span>${data.propertyaccount[0].accountnumber}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>REG. DATE:</span>
                            <span>${new Date(data.propertyaccount[0].registrationdate).toLocaleDateString()}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>TOTAL Items:</span>
                            <span>${ data.propertyitems.length }</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>TOTAL AMOUNT:</span>
                            <strong>${formatMoney(data.paidtotal)}</strong>
                        </td>
                    </tr> 
                    <tr>
                        <td>
                            <span>ITEMS</span>
                        </td>
                    </tr>
                `
                let items = '';
                for(let i = 0; i < data.propertyitems.length; i++) {
                     let itemname = await findInventoryItem(data.propertyitems[i].itemid);
                     if(itemname) items +=  `
                        <tr>
                            <td>
                                <span style="font-weight: bold;display:block;text-align:left;"> ${itemname} </span>
                                <div style="display:flex;align-items:center;justify-content:space-between;border-bottom: 1px solid lightgray;">
                                    <span>Qty: <strong>${ data.propertyitems[i].qty }</strong></span>
                                    <span>Price: <strong> ${ formatMoney(data.propertyitems[i].price) } </strong></span>
                                </div>
                            </td>
                        </tr>
                        `
                }

                form.querySelector('#result-area').innerHTML = `
                    <table id="description" style="width: 100%;"> ${html} </table>
                    <div style="overflow:hidden;border-radius:5px;background-color:#fff;padding: 5px;font-size:12px;border:1px solid lightgray">
                        <table style="width: 100%;"> ${items}</table>
                    </div>
                `
                form.querySelector('#propertyprev').style.display = 'block'
                
            }
            catch(e) {console.log(e)}
        }
        else { 
            callModal(result.message, 0)
            form.querySelector('#result-area').innerHTML = ''
            form.querySelector('#propertyprev').style.display = 'none'
        }
    }
    catch(e) {console.log(e)}
}

function validatePropertyDeliveryForm(){
	var flag = 1;
	var mssg='';

	
	if(form.querySelector('#propertyaccount').value.length < 1){
		mssg += 'Account number is Invalid <br />';			
		form.querySelector('#propertyaccount').style.borderColor = 'red';
		flag =0;
	}
	else if(form.querySelector('#propertyaccount').value.length  > 11){
	    mssg += 'Account number cannot be more than 10 digits'
	    form.querySelector('#propertyaccount').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#propertyaccount').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#deliverydate').value.length < 1){
		mssg += 'Delivery date is Invalid <br />';			
		form.querySelector('#deliverydate').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#deliverydate').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#location').value.length < 1){
		mssg += 'Location is Invalid <br />';			
		form.querySelector('#location').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#location').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#user').value.length < 1){
		mssg += 'User is Invalid <br />';			
		form.querySelector('#user').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#user').style.borderColor = 'lightgray';
	}

	
	if(flag == 0){
		
		var mbox = document.getElementById('messageBox');
		mbox.innerHTML = mssg;
		mbox.style.display = 'block';
		mbox.style.visibility = 'visible';

		setTimeout(function(){
			mbox.style.display = 'none';
			mbox.style.visibility = 'hidden';
			form.querySelector('#propertyaccount').style.borderColor = 'lightgray';
			form.querySelector('#deliverydate').style.borderColor = 'lightgray';
			form.querySelector('#location').style.borderColor = 'lightgray';
			form.querySelector('#location').style.borderColor = 'lightgray';
		

		}, 2000);	
		return false;
	}else{ 
		return true; 
	}

}

function savePropertyDelivery() {
    showSpinner();
    
    if(!validatePropertyDeliveryForm()){ 
		hideSpinner();
		return; 
	}

	var request = getAjaxObject();

    request.open('POST','../controllers/deliveryscript.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Saved successfully. Download and printing is now avialable', 1)
                    Array.from(form.querySelectorAll('#print-download-btns button')).map( button => button.disabled = false)
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
	request.send(getProperDeliveryFormDate());

}

function getProperDeliveryFormDate() {
    let paramstr = new FormData(form)
    paramstr.append('propertyaccount', form.querySelector('#propertyaccount').value.trim())
    return paramstr
}

// async function generatePrintReceipt(button) {
//     let rows = ''
//     total = 0;
//     for(let i = 0; i < recieptinfo.property.propertyitems.length; i++) {
//          let itemname = await findInventoryItem(recieptinfo.property.propertyitems[i].itemid);
//          total += (+recieptinfo.property.propertyitems[i].price) * (+recieptinfo.property.propertyitems[i].qty)
//          if(itemname) rows +=  `
//             <tr>
//                 <td>
//                     <h4> ${itemname} </h4>
//                     <p> </p>
//                 </td>
//                 <td> ${recieptinfo.property.propertyitems[i].qty} </td>
//                 <td> ${formatMoney(recieptinfo.property.propertyitems[i].price)} </td>
//                 <td> ${formatMoney( (+recieptinfo.property.propertyitems[i].price) * (+recieptinfo.property.propertyitems[i].qty) )} </td>
//             </tr>
//             `
//     }

//     let footer = `
//         <tr>
//             <td colspan="3">
//                 SUBTOTAL <br> VAT
//             </td>
//             <td> ${ formatMoney(total)} <br>  0.00 </td>
//         </tr>
//         <tr style="font-weight: bold;">
//             <td colspan="3">TOTAL</td>
//             <td> ${ formatMoney(total) } </td>
//         </tr>
//     `
//     let html = `
//             <div class="receipt" style="padding: 40px">
//                 <div class="reciept-header">
//                     <div>
//                         <span>
//                             <img src="${assetsUrl.logo}" alt="" style="width: 50px;height: auto">
//                         </span>
//                         <span>
//                             <h1>${orginfo.companyname}</h1>
//                             <span> ${orginfo.address} </span>
//                         </span>
//                     </div>
//                     <div>
//                         <span> Invoice#: <span>${'REF|'.concat(new Date().getTime()) }</span></span>
//                         issue date: ${new Date().toLocaleDateString()}
//                     </div>
//                 </div>
//                 <div class="billing">
//                     <div>
//                         <h3> Bill to:</h3>
//                         <ul>
//                             <li>${ recieptinfo?.customer.firstname + ' ' + recieptinfo?.customer.lastname + ' ' + (recieptinfo?.customer.othernames == undefined ? '' : recieptinfo?.customer.othernames) }</li>
//                             <li>${ recieptinfo?.customer.phonenumber }</li>
//                             <li>${ recieptinfo?.customer.officeaddress + ' ' +  recieptinfo?.customer.state} </li>
//                             <li>${ recieptinfo?.customer.homeaddress + ' ' +  recieptinfo?.customer.state}</li>
//                         </ul>
//                     </div>
//                     <div>
//                         <h3> Payment: </h3>
//                         <ul>
//                             <li>Date: <span>${new Date().toLocaleDateString()}</span></li>
//                             <li>N ${formatMoney(recieptinfo?.property.propertyaccount[0].totalamount)}</li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div class="items">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>ITEM</th>
//                                 <th>QTY</th>
//                                 <th>PRICE (N)</th>
//                                 <th>AMOUNT (N)</th>
//                             </tr>
//                         </thead>
//                         <tbody>${rows + footer}</tbody>
//                     </table>
//                 </div>
//               <div class="notice">
//                     <div>
//                         <div>We appreciate you doing business with us <br>
//                             <span>THANK YOU</span>
//                         </div>
//                         <div>Sender: Signature & Date&nbsp;&nbsp;&nbsp;</div>
//                         <div>Receiver: Signature & Date:&nbsp;&nbsp;&nbsp;</div>
//                     </div>
//                 </div>
//             </div>
//     `
//     let div = document.createElement('div')
//     div.innerHTML = html;
//     div.id = 'printable-receipt';
//      if(document.getElementById('printable-receipt')) document.getElementById('printable-receipt').remove()
//     document.body.appendChild(div)
    
    
//     if(button == "image") html2pdf(document.querySelector('.receipt'))
//     else printContent('Receipt', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-receipt')

// }

async function generatePrintDeliveryNote(button) {

    let rows = ''
    for(let i = 0; i < recieptinfo.property.propertyitems.length; i++) {
         let itemname = await findInventoryItem(recieptinfo.property.propertyitems[i].itemid);
         if(itemname) rows +=  `
            <tr>
                <td><h4> ${itemname} </h4></td>
                <td></td>
                <td> ${recieptinfo.property.propertyitems[i].qty} </td>
              
            </tr>
            `
    }

    
    let html = `<div class="deliverynote" style="padding: 40px">
        <div class="note-header">
            <span>
                <img  src="${assetsUrl.logo}" alt="" style="width: 50px;height: auto">
            </span>
            <h1> Delivery Note</h1>
        </div>
        <div class="note-delivery-info">
            <div>
                <div>
                    <ul>
                        <li>${orginfo.companyname}</li>
                        <li> ${orginfo.address} </li>
                        <li> ${orginfo.telephone == undefined ? '' : orginfo.telephone } </li>
                    </ul>

                    <ul>
                        <li>To</li>
                        <li>${ recieptinfo?.customer.firstname + ' ' + recieptinfo?.customer.lastname + ' ' + (recieptinfo?.customer.othernames == undefined ? '' : recieptinfo?.customer.othernames) }</li>
                    </ul>

                </div>
                <div>
                    <ul>
                        <li>${'REF|'+recieptinfo?.property.propertyaccount[0].invoicenumber }</li>
                        <li>Invoice Date: ${new Date().toLocaleDateString()}</li>
                        <li>client Number: ${ recieptinfo?.customer.phonenumber }</li>
                        <li>Adress 1: ${ recieptinfo?.customer.officeaddress + ' ' +  recieptinfo?.customer.state}</li>
                        <li>Adress 2: ${ recieptinfo?.customer.homeaddress + ' ' +  recieptinfo?.customer.state}</li>
                        
                    </ul>
                </div>
            </div>
            <div>
                <h4> Additional information</h4>
                <p>Returns must be made within 7 days. Please use the included returns lable</p>
            </div>
        </div>
        <div class="items">
            <table>
                <thead>
                    <tr>
                        <th>ITEM</th>
                        <th>DESCRIPTION</th>
                        <th>QTY</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
        <div class="note-footer">
            <p>Goods Recieved by: </p>
            <div>
                <div>${ recieptinfo?.customer.firstname + ' ' + recieptinfo?.customer.lastname + ' ' + (recieptinfo?.customer.othernames == undefined ? '' : recieptinfo?.customer.othernames) }</div>
                <div>Date: </div>
                <div>Signature</div>
            </div>
        </div>
    </div>`
    

    let div = document.createElement('div')
    div.innerHTML = html;
    div.id = 'printable-deliverynote';
     if(document.getElementById('printable-deliverynote')) document.getElementById('printable-deliverynote').remove()
    document.body.appendChild(div)
    
    if(button == "image") html2pdf(document.querySelector('.deliverynote'))
    else printContent(' ', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-deliverynote')

}

var propertydeliverybtn = document.getElementById('propertydelivery')
if(propertydeliverybtn) propertydeliverybtn.addEventListener('click', openPropertyDelivery, false)