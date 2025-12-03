let invoiceData = {};

async function openWithdrawal(){
    await httpRequest('withdrawal.php')
    form = document.getElementById('widthdrwalform')
    if(form.querySelector('button #submit')) form.querySelector('button #submit').addEventListener('click',validateWithdrawal);
    
    if(document.getElementById('swittchhtr9')){
        document.getElementById('swittchhtr9').addEventListener('click', e=>{
            if(document.getElementById('orecustomertogl9').checked){
                document.getElementById('orecustomertogl9').checked = false;
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div small').style.left = '0%';
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.backgroundColor = 'grey';
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.borderColor = 'grey';
            }else{
                document.getElementById('orecustomertogl9').checked = true;
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.backgroundColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.borderColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div small').style.left = '50%'
            }
        })
    }
    if(document.getElementById('swittchhtr8')){
        document.getElementById('swittchhtr8').addEventListener('click', e=>{
            if(document.getElementById('orecustomertogl8').checked){
                document.getElementById('orecustomertogl8').checked = false;
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div small').style.left = '0%';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.backgroundColor = 'grey';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.borderColor = 'grey';
            }else{
                document.getElementById('orecustomertogl8').checked = true;
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.backgroundColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.borderColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div small').style.left = '50%'
            }
        })
    }
    
    await fetchWithdrawalFormData()
}

async function fetchWithdrawalFormData() {
    await fetchWithdrawalAccountOfficers()
    await fetchCustomersLocations()
    await fetchCustomerUserprofile()
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

async function fetchCustomerUserprofile() {
    showSpinner()
    let result = await fetch('../controllers/fetchuserprofile.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res?.status) {
            customeruserprofile = res;
            hideSpinner()
             try {
                 document.querySelector('#widthdrwalform #postinglimit').value =  res.withdrawallimit
                 document.querySelector('#widthdrwalform #counter').value =  res.debitcounter
                 document.querySelector('#widthdrwalform #withdrawalby').value =  `${ res.firstname} ${ res.lastname} ${ res.othername ?? ''}`
             }
             catch(e) {}
        }
        else hideSpinner()
    }
    else hideSpinner
}

async function fetchCustomersLocations() {  
    showSpinner()
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        profilelocations = res.data?.data;
    } 
    else hideSpinner()
}

async function fetchWithdrawalCustomerAccount()  {
    showSpinner();
    let paramstr = new FormData();
    paramstr.append('accountnumber', form.querySelector('#accountnumber').value)
    let result = await fetch('../controllers/fetchaccountprofile.php', {method: 'POST', body:paramstr, headers: new Headers()})
    let res = await result.json();
    if(result.status) {
        hideSpinner();
        let parseResult = JSON.parse(JSON.stringify(res))
        if(parseResult.status) {
           invoiceData.customerProfile =  parseResult.data[0]   
           try {
                document.querySelector('.profile #firstname').innerHTML = parseResult.data[0].customerdetail.firstname
                document.querySelector('.profile #lastname').innerHTML = parseResult.data[0].customerdetail.lastname
                document.querySelector('.profile #othername').innerHTML = parseResult.data[0].customerdetail.othernames ?? ''
                document.querySelector('.profile #phone').innerHTML = parseResult.data[0].customerdetail.phonenumber
                document.querySelector('.profile #domicilebranch').innerHTML = (profilelocations.find( value => value.id == parseResult.data[0].accountdetail[0].location))?.location
                document.querySelector('.profile #accounttype').innerHTML = parseResult.data[0].accounttype.toLowerCase()
                document.querySelector('.profile #gender').innerHTML = parseResult.data[0].customerdetail.gender
                document.querySelector('.profile #dateopened').innerHTML = parseResult.data[0].accountdetail[0].registrationdate
                document.querySelector('.profile #balance').innerHTML = `<small>Balance</small>: <strong>${formatMoney(parseResult.data[0].customerbalance)}</strong>`
                document.querySelector('.profile #marketer').innerHTML = (customergroupnames?.find( val => val.id === parseResult.data[0].accountdetail[0].marketergroup))?.groupname
                document.querySelector('#widthdrwalform #bank1').value = parseResult.data[0].accountdetail[0].bankname1
                document.querySelector('#widthdrwalform #bank2').value = parseResult.data[0].accountdetail[0].bankname2
                document.querySelector('#widthdrwalform #bankaccount1').value = parseResult.data[0].accountdetail[0].bankaccountnumber1
                document.querySelector('#widthdrwalform #bankaccount2').value = parseResult.data[0].accountdetail[0].bankaccountnumber2
                document.querySelector('.profile #agreed').innerHTML = parseResult.data[0].accountdetail[0].dailyunit
           }
           catch(e) {}
        }
        else{ 
            document.querySelector('.profile #firstname').innerHTML = ''
                document.querySelector('.profile #lastname').innerHTML = ''
                document.querySelector('.profile #othername').innerHTML =''
                document.querySelector('.profile #phone').innerHTML = ''
                document.querySelector('.profile #domicilebranch').innerHTML = ''
                document.querySelector('.profile #accounttype').innerHTML = ''
                document.querySelector('.profile #gender').innerHTML = ''
                document.querySelector('.profile #dateopened').innerHTML = ''
                document.querySelector('.profile #balance').innerHTML = ''
                document.querySelector('.profile #marketer').innerHTML = ''
                document.querySelector('#widthdrwalform #bank1').value = ''
                document.querySelector('#widthdrwalform #bank2').value = ''
                document.querySelector('#widthdrwalform #bankaccount1').value = ''
                document.querySelector('#widthdrwalform #bankaccount2').value = ''
                document.querySelector('.profile #agreed').innerHTML = ''
            callModal(parseResult.message, 0)
        }
       
    }
    else {
        hideSpinner();
        callModal('Error! Unable to perform task', 0)
    }
}


async function fetchWithdrawalCustomerAccount2()  {
    alert()
    showSpinner();
    let paramstr = new FormData();
    paramstr.append('accountnumber', form.querySelector('#accountnumber').value)
    let result2 = await fetch('../controllers/fetchpropertyitemsforselection.php', {method: 'POST', body:paramstr, headers: new Headers()})
    let res2 = await result2.json();
    if(result2.status){
        document.getElementById('withdrwltabledata').innerHTML = result2.data.map(dat=>`
        <tr>
            <td> <input id="${dat.propertyitem[0].itemid}" type="checkbox" name="checker"/> </td>
            <td> ${dat.propertyitem[0].itemid} </td>
            <td> ${dat.propertyitem[0].itemname}  </td>
            <td> ${dat.propertyitem[0].qty}  </td>
            <td> ${formatCurrency(dat.propertyitem[0].price)} </td>
            <td> ${formatCurrency(dat.propertyitem[0].amount)} </td>
        </tr>
        `).join('')
    }else{
        document.getElementById('withdrwltabledata').innerHTML = ''
        callModal('Error! Unable to perform task', 0)
    }
}

async function fetchWithdrawalAccountOfficers() {
    showSpinner()
    let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
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
    }
    else hideSpinner()
    
}

function validateWithdrawal(){
    inputs = [
        { input: document.querySelector('#accountnumber'), validation: {required: 'account number is required'}},
        { input: form.querySelector('#postinglimit'), validation: {required: 'posting limit is required'}},
        { input: form.querySelector('#counter'), validation: {required: 'withdrwal counter is required'}},
        { input: form.querySelector('#accountofficer'), validation: {required: 'account officer is required'}},
        { input: form.querySelector('#transactiondate'), validation: {required: 'transaction date is required'}},
        { input: form.querySelector('#valuedate'), validation: {required: 'value date is required'}},
        { input: form.querySelector('#withdrawalby'), validation: {required: 'withdrawal byis required'}},
        { input: form.querySelector('#debitslipno'), validation: {required: 'debit slip no is required'}},
        { input: form.querySelector('#serialno'), validation: {required: 'serial no is required'}},
        { input: form.querySelector('#amountdebited'), validation: {required: 'amount debited is required'}},
        { input: form.querySelector('#servicecharge'), validation: {required: 'service charge is required'}},
        { input: form.querySelector('#totalamount'), validation: {required: 'total amount is required'}},
        { input: form.querySelector('#bank1'), validation: {required: 'bank1 is required'}},
        { input: form.querySelector('#bank2'), validation: {required: 'bank2 is required'}},
        { input: form.querySelector('#bankaccount1'), validation: {required: 'bank account1 is required'}},
        { input: form.querySelector('#bankaccount2'), validation: {required: 'bank account2 is required'}},
    ]
    
    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else  saveWithdrawal()
}

function getWithdrawalParams(){
	var paramstr = new FormData();
}

var	saveWithdrawal = function(e){
    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/postwithdrawal.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Withdrawal posted successfully', 1)
                    invoiceData.invoicenumber = parseRequest.invoicenumber
                    provideInvoice()
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
    request.send(getWithdrawalFormParams());
}

function getWithdrawalFormParams() {
    let paramstr = new FormData(document.getElementById('widthdrwalform'))
    paramstr.append('accountnumber', document.querySelector('#accountnumber').value)
    // paramstr.set('withdrawalby', customeruserprofile)
    paramstr.append('ttype', 'WITHDRAWAL')
    paramstr.append('paymentmethod', document.getElementById('orecustomertogl8').checked ? 'CHEQUE' : 'CASH')
    paramstr.append('bankpaywith100', document.getElementById('orecustomertogl9').checked ? 'YES' : 'NO')
    paramstr.append('sendforapproval', document.getElementById('sendforapproval').checked ? 'YES' : 'NO')
    paramstr.append('transfertocustomercbank', document.getElementById('transfertocustomercbank').checked ? 'YES' : 'NO')
    return paramstr;
}

async function provideInvoice() {
    if(invoiceData.customerProfile.accounttype.toLowerCase() === 'property') {
        openJModal('<div style="display:flex;justify-content:center;align-items:center;padding 15px;background-color:white;"><span class="btnloader"></span></div>')
        await fetchInvoiceCustomerAccounts()
        await fetchInvoiceOrganizationInfo()
        await fetchInvoiceInventoryItems()
        await fetchInvoicePropertyAccounts()
    }
}

async function fetchInvoicePropertyAccounts () {
    
    let paramstr = new FormData()
    paramstr.append('accountnumber', invoiceData.customerProfile.accountdetail[0].accountnumber)
    let result = await httpJsonRequest('../controllers/fetchpropertyaccountdetail.php', 'POST', paramstr)
    if(result?.status) {
        closeJmodal();
        let data = JSON.parse(JSON.stringify(result.data));
        let customer = await findInvoiceCustomerProfile(data.propertyaccount[0].customer)
        invoiceData.customer = customer
        invoiceData.property = data
        
        let modalcontent = `
            <h4 style="margin: 5px 10px 20px 10px;font-weight:bolder;text-transform:uppercase">Invoice options</h4>
            <div class="jflex no-pr" style="justify-content:center;width: 90%;margin: 0 auto;margin-top: 20px;">
                <span class="jcontent-between" id="print-download-btns">
                    <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-pd">print reciept</button>
                    <button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="download-r">PDF Receipt</button>
                </span>
            </div>
            <div style="height: 30px;width:auto"></div>
        `
        openJModal(modalcontent)
                    
        if(document.querySelector('button#print-pd')) document.querySelector('button#print-pd').addEventListener('click', () => invoicePrintReceipt('print'))

        if(document.querySelector('button#download-r')) document.querySelector('button#download-r').addEventListener('click', () => invoicePrintReceipt('image'))
    }
    else {
        closeJmodal();
        return callModal('Unable to retrieve property accounts', 0)
    }
}

async function findInvoiceCustomerProfile(id) {
    var customer = await customers.find(value => value.id === id);
    return customer
}

async function findInvoiceInventoryItem(id) {
    var inventoryitem = await inventoryitemslist.find( value => value.id == id);
    return inventoryitem ? inventoryitem.itemname : ''
}

async function fetchInvoiceInventoryItems() {
    let result = await httpJsonRequest('../controllers/fetchinventoryitemscript.php')
    if(result) {
        if(result.status) {
            inventoryitemslist = result.data.data
        }
    }
}

async function fetchInvoiceCustomerAccounts() {
    showSpinner()
    let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        customers = res.data?.data;
    }
    else hideSpinner()
}

async function fetchInvoiceOrganizationInfo() {
    let result = await fetchRequest('../controllers/fetchorganisationscript.php');
    if(result) {
        let parseResult  =  JSON.parse(result);
        if(parseResult.status){
            orginfo = parseResult.data.data[0]
        }
    }
}

async function invoicePrintReceipt(button) {
        let rows = ''
        total = 0;
        for(let i = 0; i < invoiceData.property.propertyitems.length; i++) {
             let itemname = await findInvoiceInventoryItem(invoiceData.property.propertyitems[i].itemid);
             total += (+invoiceData.property.propertyitems[i].price) * (+invoiceData.property.propertyitems[i].qty)
             if(itemname) rows +=  `
                <tr>
                    <td>
                        <h4> ${itemname} </h4>
                        <p> </p>
                    </td>
                    <td> ${invoiceData.property.propertyitems[i].qty} </td>
                    <td> ${formatMoney(invoiceData.property.propertyitems[i].price)} </td>
                    <td> ${formatMoney( (+invoiceData.property.propertyitems[i].price) * (+invoiceData.property.propertyitems[i].qty) )} </td>
                </tr>
                `
        }
    
        let footer = `
            <tr>
                <td colspan="3">
                    SUBTOTAL <br> VAT
                </td>
                <td> ${ formatMoney(total)} <br>  0.00 </td>
            </tr>
            <tr style="font-weight: bold;">
                <td colspan="3">TOTAL</td>
                <td> ${ formatMoney(total) } </td>
            </tr>
        `
        let html = `
                <div class="receipt" style="padding: 40px">
                    <div class="reciept-header">
                        <div>
                            <span>
                                <img src="${assetsUrl.logo}" alt="" style="width: 50px;height: auto">
                            </span>
                            <span>
                                <h1>${orginfo.companyname}</h1>
                                <span> ${orginfo.address} </span>
                            </span>
                        </div>
                        <div>
                            <span> Invoice#: <span>${invoiceData.invoicenumber}</span></span>
                            issue date: ${new Date().toLocaleDateString()}
                        </div>
                    </div>
                    <div class="billing">
                        <div>
                            <h3> Bill to:</h3>
                            <ul>
                                <li>${ invoiceData?.customer.firstname + ' ' + invoiceData?.customer.lastname + ' ' + (invoiceData?.customer.othernames == undefined ? '' : invoiceData?.customer.othernames) }</li>
                                <li>${ invoiceData?.customer.phonenumber }</li>
                                <li>${ invoiceData?.customer.officeaddress + ' ' +  invoiceData?.customer.state} </li>
                                <li>${ invoiceData?.customer.homeaddress + ' ' +  invoiceData?.customer.state}</li>
                            </ul>
                        </div>
                        <div>
                            <h3> Payment: </h3>
                            <ul>
                                <li>Date: <span>${new Date().toLocaleDateString()}</span></li>
                                <li>N ${formatMoney(invoiceData?.property.propertyaccount[0].totalamount)}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="items">
                        <table>
                            <thead>
                                <tr>
                                    <th>ITEM</th>
                                    <th>QTY</th>
                                    <th>PRICE (N)</th>
                                    <th>AMOUNT (N)</th>
                                </tr>
                            </thead>
                            <tbody>${rows + footer}</tbody>
                        </table>
                    </div>
                    <div class="notice">
                        <div>
                            <div>We appreciate you doing business with us <br>
                                <span>THANK YOU</span>
                            </div>
                            <div>Sender: Signature & Date&nbsp;&nbsp;&nbsp;</div>
                            <div>Receiver: Signature & Date:&nbsp;&nbsp;&nbsp;</div>
                        </div>
                    </div>
                </div>
        `
        let div = document.createElement('div')
        div.innerHTML = html;
        div.id = 'printable-receipt';
         if(document.getElementById('printable-receipt')) document.getElementById('printable-receipt').remove()
        document.body.appendChild(div)
        
        if(window.matchMedia('(max-width: 767px)').matches) {
            return html2pdf(document.querySelector('.receipt'))
        }
       
        if(button == "image") html2pdf(document.querySelector('.receipt'))
        else printContent('Receipt', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-receipt')
    
    }
    
// async function invoicePrintDeliveryNote(button) {

//     let rows = ''
//     for(let i = 0; i < invoiceData.property.propertyitems.length; i++) {
//          let itemname = await findInvoiceInventoryItem(invoiceData.property.propertyitems[i].itemid);
//          if(itemname) rows +=  `
//             <tr>
//                 <td><h4> ${itemname} </h4></td>
//                 <td></td>
//                 <td> ${invoiceData.property.propertyitems[i].qty} </td>
              
//             </tr>
//             `
//     }

    
//     let html = `<div class="deliverynote" style="padding: 40px">
//         <div class="note-header">
//             <span>
//                 <img  src="${assetsUrl.logo}" alt="" style="width: 50px;height: auto">
//             </span>
//             <h1> Delivery Note</h1>
//         </div>
//         <div class="note-delivery-info">
//             <div>
//                 <div>
//                     <ul>
//                         <li>${orginfo.companyname}</li>
//                         <li> ${orginfo.address} </li>
//                         <li> ${orginfo.telephone == undefined ? '' : orginfo.telephone } </li>
//                     </ul>

//                     <ul>
//                         <li>To</li>
//                         <li>${ invoiceData?.customer.firstname + ' ' + invoiceData?.customer.lastname + ' ' + (invoiceData?.customer.othernames == undefined ? '' : invoiceData?.customer.othernames) }</li>
//                     </ul>

//                 </div>
//                 <div>
//                     <ul>
//                         <li>${invoiceData.invoicenumber}</li>
//                         <li>Invoice Date: ${new Date().toLocaleDateString()}</li>
//                         <li>client Number: ${ invoiceData?.customer.phonenumber }</li>
//                         <li>Adress 1: ${ invoiceData?.customer.officeaddress + ' ' +  invoiceData?.customer.state}</li>
//                         <li>Adress 2: ${ invoiceData?.customer.homeaddress + ' ' +  invoiceData?.customer.state}</li>
                        
//                     </ul>
//                 </div>
//             </div>
//             <div>
//                 <h4> Additional information</h4>
//                 <p>Returns must be made within 7 days. Please use the included returns lable</p>
//             </div>
//         </div>
//         <div class="items">
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ITEM</th>
//                         <th>DESCRIPTION</th>
//                         <th>QTY</th>
//                     </tr>
//                 </thead>
//                 <tbody>${rows}</tbody>
//             </table>
//         </div>
//         <div class="note-footer">
//             <p>Goods Recieved by: </p>
//             <div>
//                 <div>${ invoiceData?.customer.firstname + ' ' + invoiceData?.customer.lastname + ' ' + (invoiceData?.customer.othernames == undefined ? '' : invoiceData?.customer.othernames) }</div>
//                 <div>Date: </div>
//                 <div>Signature</div>
//             </div>
//         </div>
//     </div>`
    

//     let div = document.createElement('div')
//     div.innerHTML = html;
//     div.id = 'printable-deliverynote';
//      if(document.getElementById('printable-deliverynote')) document.getElementById('printable-deliverynote').remove()
//     document.body.appendChild(div)
    
//     if(window.matchMedia('(max-width: 767px)').matches) {
//         return html2pdf(document.querySelector('.deliverynote'))
//     }
    
//     if(button == "image") html2pdf(document.querySelector('.deliverynote'))
//     else printContent(' ', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-deliverynote')

// }

var withdrawal = document.getElementById('withdrawal');
if(withdrawal)withdrawal.addEventListener('click',openWithdrawal,false)






