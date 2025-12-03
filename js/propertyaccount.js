var form; var  locationx; var  summary; var  user; var  propertyitems; var  locationsvar; var  groupnames; var  propertycustomers; var propertyusers; var localItem;var bankcodes;

async function openPropertyAccount() {
    await httpRequest('propertyaccount.php');
    form = document.getElementById('addpropertyaccountform')
    summary = document.getElementById('summary')
    if(form) {
        customer = form.querySelector('#customer')
        code = form.querySelector('#code')
        bankname1 = form.querySelector('#bankname1')
        bankacccountnumber1 = form.querySelector('#bankacccountnumber1')
        bankname2 = form.querySelector('#bankname2')
        bankacccountnumber2 = form.querySelector('#bankacccountnumber2')
        registrationdate = form.querySelector('#registrationdate')
        locationx = form.querySelector('#location')
        registrationpoint = form.querySelector('#registrationpoint')
        dailyunit = form.querySelector('#dailyunit')
        marketergroup = form.querySelector('#marketergroup')
        totalamount = form.querySelector('#totalamount')
        user = form.querySelector('#user')
        numberofdays = form.querySelector('#numberofdays')
        
        if(summary) summary.querySelector('button#add-item').addEventListener('click', appendNewitem)
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', validatePropertyAccountForm)
        if(form.querySelector('#user')) form.querySelector('#user').addEventListener('change', fetchMarketersGroup)
    }
    
    await fetchFormData()
    if(checkIfProperyAccountUpdate()) propertyAccountMode('update')
    else propertyAccountMode();
}


var propertyAccountMode = function(mode='savings') { 
    if(mode.includes('update')) {
        let localdata  = sessionStorage.getItem('property')
        let parsedata = localItem = JSON.parse(localdata);
        try {
            
            if(parsedata.mode == 'view')  form.querySelector('button#submit').disabled = true;
            else { 
                form.querySelector('button#submit').disabled = false;
                if(form.querySelector('button#submit')) form.querySelector('button#submit').innerHTML = 'Update property account'
            }
            
            customer.value = parsedata.property.customer 
            form.querySelector('#accountnumber').value = parsedata.property.accountnumber 
            code.value = parsedata.property.code;
            // bankname1.value = parsedata.property.bankname1;
            // bankname2.value = parsedata.property.bankname2;
            bankname1.selectedIndex = findBankFromCode(parsedata.property.bankname1);
            bankname2.selectedIndex = findBankFromCode(parsedata.property.bankname2);
            bankacccountnumber1.value = parsedata.property.bankaccountnumber1;
            bankacccountnumber2.value = parsedata.property.bankaccountnumber2;
            registrationdate.value = parsedata.property.registrationdate;
            locationx.value = parsedata.property.location 
            registrationpoint.value = parsedata.property.registrationpoint 
            dailyunit.value = parsedata.property.dailyunit;
            // marketergroup.value = parsedata.property.marketergroup;
            user.value = parsedata.property.user
            fetchMarketersGroup()
            form.querySelector('#numberofdays').value = parsedata.property.numberofdays 
            form.querySelector('#expectedmaturitydate').value = parsedata.property.expectedmaturitydate 
            form.querySelector('#totalamount').value = parsedata.property.totalamount 
            
            if(parsedata.items.length) onViewAppendTransactionsDetailsItems(parsedata.items)
            
            sessionStorage.removeItem('property')
        }
        catch(e) {  console.log(e) }
        
    }
    else {
        sessionStorage.removeItem('property')
        localItem = null;
    }
}

function findBankFromCode(bankinfo) {
    let findbankIndex = bankcodes?.findIndex( item => item.code == bankinfo?.split('|')[1] )
    return findbankIndex;
}


function onViewAppendTransactionsDetailsItems(items) {
    items.map((item, index) => {
        if(index === items.length - 1) { form.querySelector('#items').value = index}
        let itemselected = propertyitems.find(val => val.compositeitemdetail.id == item.itemid)
        let div = document.createElement('div')
        div.style.cssText = 'align-items:end';
        div.classList.add('jformgroup', 'jformgrouprow', 'item')
        div.id = propertyitems.findIndex(val => val.compositeitemdetail.id == item.itemid)
        div.innerHTML = `
            <div class="jformgroup jformgroupcol"  style="width: 10%;margin-right: 5px">
                <label class="jcontrollabel"> item Id: </label>
                <input  type="text"  class="jformcontrol jmargin-top" readonly="readonly" value="${itemselected.compositeitem}" >
            </div>
            <div class="jformgroup jformgroupcol" style="width: 30%;">
                <label class="jcontrollabel"> description: </label>
                <input id="item-title"  type="text"  class="jformcontrol jmargin-top" readonly="readonly" value="${itemselected.compositeitemdetail.itemname}" >
            </div>
            <div class="jformgroup jformgroupcol" style="width: 7%;margin-left: 5px">
                <label class="jcontrollabel"> qty: </label>
                <input id="item-qty" type="number"  class="jformcontrol jmargin-top" value="1">
            </div>
            <div class="jformgroup jformgroupcol" style="width: 12%;margin-left: 5px">
                <label class="jcontrollabel"> cost: </label>
                <input id="item-cost" type="number"  class="jformcontrol jmargin-top" value="${item.cost}">
            </div>
            <div class="jformgroup jformgroupcol" style="width: 12%;margin-left: 5px">
                <label class="jcontrollabel"> price: </label>
                <input id="item-price" type="number"  class="jformcontrol jmargin-top" value="${item.price}">
            </div>
            <div class="jformgroup jformgroupcol" style="width: 12%;margin-left: 5px">
                <label class="jcontrollabel"> amount: </label>
                <input id="item-amount" type="number"  class="jformcontrol jmargin-top" value="${item.amount}">
            </div>
            <div class="jformgroup jformgroupcol" style="width: 7%;margin-left: 5px">
                <button type="button" class="j-action-btn"
                    style="text-transform: capitalize;margin:5px 0 0 0;border:1px solid blue;color:blue;background-color:transparent;"
                    onclick="viewColumnItem(event, ${+(form.querySelector('#items').value)})">view</button>
            </div>
            <div class="jformgroup jformgroupcol" style="width: 7%;margin-left: 5px">
                <button type="button" class="j-action-btn"
                    style="text-transform: capitalize;margin:5px 0 0 0;background-color:red"
                     onclick="removeColumnItem(event)">remove</button>
            </div>
        `
        summary.querySelector('.items-column').appendChild(div)
    })
}

var checkIfProperyAccountUpdate = function() {
    return !!sessionStorage.getItem('property')
}

function savePropertyAccount() { 
    showSpinner();
	var request = getAjaxObject();
    
    request.open('POST','../controllers/propertyscript.php',true);
    
    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                
                let parseRequest = JSON.parse(request.responseText)
                
                if(parseRequest.status){
                    callModal('Property Account Saved', 1)
                    form.reset()
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
    request.send(collectPropertyAccountFormParams());
}

function collectPropertyAccountFormParams() {
    let paramstr = new FormData(document.getElementById('addpropertyaccountform'))
    paramstr.set('bankname1', `${bankcodes[+document.getElementById('bankname1').value]?.name}|${bankcodes[+document.getElementById('bankname1').value]?.code}`)
    paramstr.set('bankname2', `${bankcodes[+document.getElementById('bankname2').value]?.name}|${bankcodes[+document.getElementById('bankname2').value]?.code}`)
    if(paramstr) {
        paramstr.append('propertyitemsize', summary.querySelectorAll('.items-column .item').length)
        summary.querySelectorAll('.items-column .item').forEach((item, index) => {
            paramstr.append(`itemid${index}`, propertyitems[+item.id]?.compositeitemdetail?.id)
            paramstr.append(`qty${index}`, item.querySelector('#item-qty').value)
            paramstr.append(`price${index}`, item.querySelector('#item-price').value)
            paramstr.append(`cost${index}`, item.querySelector('#item-cost').value)
            paramstr.append(`amount${index}`, item.querySelector('#item-amount').value)
        })
    }
    return paramstr;
}

function validatePropertyAccountForm() {
    inputs = [
        { input: customer, validation: {required: 'customer is required'}},
        { input: bankname1, validation: {required: 'bank name 1 is required'}},
        { input: bankacccountnumber1, validation: {required: 'bank acccount number 1 is required'}},
        { input: bankname2, validation: {required: 'bank name 2  is required'}},
        { input: bankacccountnumber2, validation: {required: 'bank acccountnumber 2  is required'}},
        { input: registrationdate, validation: {required: 'registration date  is required'}},
        { input: locationx, validation: {required: 'location  is required'}},
        { input: registrationpoint, validation: {required: 'registration point  is required'}},
        { input: dailyunit, validation: {required: 'daily unit  is required'}},
        { input: marketergroup, validation: {required: 'marketer group  is required'}},
        { input: totalamount, validation: {required: 'total amount  is required'}},
        { input: user, validation: {required: 'user is required'}},
        { input: form.querySelector('#numberofdays'), validation: {required: 'number of days is required'}}
    ]

    if(!summary.querySelectorAll('.items-column .item').length) inputs.push({input: form.querySelector('#items'), validation: {required: `Please select property item(s)`}})
    else {
        inputs.push({input: form.querySelector('#items'), validation: {required: `Please select property item(s)`}})
        if(summary.querySelectorAll('.items-column .item')) {
            summary.querySelectorAll('.items-column .item').forEach((item, index) => {
                inputs.push({input: item.querySelector('#item-title'), validation: {required: `item ${index+1} name  is required`}})
                inputs.push({input: item.querySelector('#item-qty'), validation: {required: `item ${index+1} qty  is required`}})
            })
        }
    }
    
    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else  savePropertyAccount()
}

function appendNewitem() {
    let itemselected = propertyitems[+(form.querySelector('#items').value)]
    if(itemselected && (form.querySelector('#items').value !== null && form.querySelector('#items').value !== '') ) {
        let div = document.createElement('div')
        div.style.cssText = 'align-items:end';
        div.classList.add('jformgroup', 'jformgrouprow', 'item')
        div.id = summary.querySelector('#items').value;
        div.innerHTML = `
            <div class="jformgroup jformgroupcol"  style="width: 10%;margin-right: 5px">
                <label class="jcontrollabel"> item Id: </label>
                <input  type="text"  class="jformcontrol jmargin-top" readonly="readonly" value="${itemselected.compositeitem}" >
            </div>
            <div class="jformgroup jformgroupcol" style="width: 30%;">
                <label class="jcontrollabel"> description: </label>
                <input id="item-title"  type="text"  class="jformcontrol jmargin-top" readonly="readonly" value="${itemselected.compositeitemdetail.itemname}" >
            </div>
            <div class="jformgroup jformgroupcol" style="width: 7%;margin-left: 5px">
                <label class="jcontrollabel"> qty: </label>
                <input id="item-qty" type="number"  class="jformcontrol jmargin-top" value="1">
            </div>
            <div class="jformgroup jformgroupcol" style="width: 12%;margin-left: 5px">
                <label class="jcontrollabel"> cost: </label>
                <input id="item-cost" type="number"  class="jformcontrol jmargin-top" value="${itemselected.compositeitemdetail.cost}">
            </div>
            <div class="jformgroup jformgroupcol" style="width: 12%;margin-left: 5px">
                <label class="jcontrollabel"> price: </label>
                <input id="item-price" type="number"  class="jformcontrol jmargin-top" value="${itemselected.compositeitemdetail.price}">
            </div>
            <div class="jformgroup jformgroupcol" style="width: 12%;margin-left: 5px">
                <label class="jcontrollabel"> amount: </label>
                <input id="item-amount" type="number"  class="jformcontrol jmargin-top value="">
            </div>
            <div class="jformgroup jformgroupcol" style="width: 7%;margin-left: 5px">
                <button type="button" class="j-action-btn"
                    style=";text-transform: capitalize;margin:5px 0 0 0;border:1px solid blue;color:blue;background-color:transparent;"
                    id="add-item" onclick="viewColumnItem(event, ${+(form.querySelector('#items').value)})">view</button>
            </div>
            <div class="jformgroup jformgroupcol" style="width: 7%;margin-left: 5px">
                <button type="button" class="j-action-btn"
                    style="text-transform: capitalize;margin:5px 0 0 0;background-color:red"
                    id="add-item" onclick="removeColumnItem(event)">remove</button>
            </div>
        `
        summary.querySelector('.items-column').appendChild(div)
    }
}

function removeColumnItem(event) {
    let itemcolumns = summary.querySelectorAll('.items-column .item')
    if(itemcolumns.length !== 1) event.target.parentElement.parentElement.remove()
}

async function viewColumnItem(event, id) {
    event.target.innerHTML = 'viewing...';
    event.target.disabled = true
    let selecteditem = propertyitems[+id]
    let params = new FormData();
    let header = body = footer='';
    params.append('compositeitemid', selecteditem.compositeitem)
    let result = await fetch('../controllers/fetchcompositedetails.php', {method: 'POST', body: params, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        event.target.innerHTML = 'view'
        event.target.disabled = false
        if(res.data.length) {
            res.data.map(function(item, index) {
                body += `
                    <tr>
                        <td>${++index}</td>
                        <td>${item.itemdetail[0].id}</td>
                        <td>${item.itemdetail[0].itemname }</td>
                        <td>${item.itemdetail[0].itemtype }</td>
                        <td>${ formatMoney(item.itemdetail[0].cost)}</td>
                        <td>${ formatMoney(item.itemdetail[0].marketingprice) }</td>
                        <td>${ formatMoney(item.itemdetail[0].savingsellingprice) }</td>
                    </tr>
                `
            })
        }
        else body = ` <tr> <td colspan="7" style="font-weight:bolder;font-size:16px;">NO ITEMS IN THIS COMPOSITE</td> </tr>`
    } else {
        event.target.innerHTML = 'view'
        event.target.disabled = false
    }
    
    let html = `
        <h4 style="margin: 5px 10px;font-weight:bolder;text-transform:uppercase">${selecteditem.compositeitemdetail.itemname} Details</h4>
        <div class="jtable-content">
            <table class="jmargin-top">
               <thead id="jtableheader">
                    <tr>
                        <th> s/n</th>
                        <th> item id </th>
                        <th> description  </th>
                        <th> type  </th>
                        <th> cost </th>
                        <th> marketing price </th>
                        <th> cash selling price </th>
                    </tr>
                </thead> 
                <tbody id="jtabledata">
                    ${body}
                    <tr>
                        <td colspan="6" style="text-align:left;font-weight:bold;">LOCATION</td>
                        <td style="font-weight:bold;"> ${locationsvar[+selecteditem.compositeitemdetail.location]['location']} </td>
                    </tr>
                    <tr>
                        <td colspan="6" style="text-align:left;font-weight:bold">TOTAL ITEMS</td>
                        <td style="font-weight:bold;"> ${ res.data.length} </td>
                    </tr>
                    <tr>
                        <td colspan="4" style="text-align:left;font-weight:bold">TOTAL</td>
                        <td style="font-weight:bold;"> ${formatMoney((res.data.reduce((total, curr) => total + (+curr.itemdetail[0].cost), 0)).toString())} </td>
                        <td style="font-weight:bold;"> ${formatMoney((res.data.reduce((total, curr) => total + (+curr.itemdetail[0].marketingprice), 0)).toString())} </td>
                        <td style="font-weight:bold;"> ${formatMoney((res.data.reduce((total, curr) => total + (+curr.itemdetail[0].savingsellingprice), 0)).toString())} </td>
                    </tr>
                </tbody> 
            </table>
        </div>`
    openJModal(html)
}

async function fetchPropertyUsers () {
    showSpinner()
    let result = await fetchRequest('../controllers/fetchallusers.php');
    if(result) {
        hideSpinner()
        let parseResult  =  JSON.parse(result);
        propertyusers = parseResult;
        if(parseResult.status){
            let options = '';
            parseResult.data.map(function(item, index){
            options += `
                <option value="${item.email}"> ${item.firstname} ${item.othername ?? ''} ${item.lastname} </option>
            `
            })
            if(user){
                user.innerHTML = ''
                user.innerHTML = '<option value="" selected=""> --Select User --</option>'+options
            }
        }
    } else  hideSpinner()
}

async function fetchCompositeItems() {
    showSpinner()
    let result = await fetch('../controllers/fetchcompositeitemscript.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        propertyitems = res.data
        if(form.querySelector('#items')) {
            let options = '';
            res.data?.map(function(item, index){
            options += `
                <option value="${index}"> ${ item.compositeitemdetail.itemname } </option>
            `
            })
            form.querySelector('#items').innerHTML = ''
            form.querySelector('#items').innerHTML = '<option value=""> --Select item --</option>'+options
        }
    } else  hideSpinner()
}

async function fetchLocations() {
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
        if(locationx){
            locationx.innerHTML = ''
            locationx.innerHTML = '<option value="" selected="">--Select Location --</option>'+options
        }
    }else  hideSpinner()
}

// async function fetchGroupName() {
//     showSpinner()
//     let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', body: {}, headers: new Headers()})
//     let res = await result.json();
//     if(res?.status) {
//         hideSpinner()
//         let data =  groupnames = res.data?.data;
//         let options = '';
//         data?.map(function(item, index){
//             options += `
//                 <option value="${item.id}"> ${item.groupname} </option>
//             `
//         })
//         if(marketergroup) {
//             marketergroup.innerHTML = '';
//             marketergroup.innerHTML = '<option value="" selected="">--Select Group --</option>'+options
//         }
        
//     } else  hideSpinner()
// }

async function fetchMarketersGroup() {
    showSpinner()
    let paramstr = new FormData()
    // let selectedItem = propertyusers?.data?.find( item => item.id == event.target.value)
    // paramstr.append('id', event.target.value)
    paramstr.append('marketeremail', form.querySelector('#user').value)
    let result = await fetch('../controllers/fetchgroupbymarketeremail.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        let options = `
                <option value="${res.data.id}"> ${res.data.groupname} </option>
            `
        if(marketergroup) {
            marketergroup.innerHTML = '';
            marketergroup.innerHTML = options
        }
    }
    else {
        hideSpinner()
        if(marketergroup) {
            marketergroup.innerHTML = '';
            marketergroup.innerHTML = '';
        }
    }
}

async function fetchCustomerAccounts() {
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
        if(customer) {
            customer.innerHTML = '';
            customer.innerHTML = '<option value="" selected="">--Select Customer --</option>'+options
        }
        
    } else  hideSpinner()
}

async function fetchPropertyAccountRegistrationPoints() {
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
        if(registrationpoint){
            registrationpoint.innerHTML = ''
            registrationpoint.innerHTML = '<option value="" selected="">--Select registration point --</option>'+options
        }
    }else  hideSpinner()
}

async function fetchPropertyAccountBankAccountNames() {
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

async function fetchFormData() {
    await fetchCustomerAccounts()
    await fetchPropertyAccountBankAccountNames()
    await fetchLocations();
    await fetchPropertyUsers();
    await fetchCompositeItems();
    // await fetchGroupName();
    await fetchPropertyAccountRegistrationPoints()
}

var propertyaccountbtn = document.getElementById("propertyaccount");
if (propertyaccountbtn) propertyaccountbtn.addEventListener("click", openPropertyAccount);