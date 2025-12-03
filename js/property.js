/*
    deliveryscript: saving delivery
*/

// build property items -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// const query_field = [
//             `query_personnelmatter`,
//             `query_entrydate`,
//             `query_title`,
//             `query_startdate`,
//             `query_enddate`,
//             ]
    let itemtobuildupdateid 
	let itemid = [];
	let itemname = [];
	let itemprice = [];
	let itemtobuidid = [];
	let itemtobuidname = [];

    function orebuilditemparams(type = 'NO'){
		var paramstr = new FormData();
		    paramstr.append('composite', type);		
 
	   return paramstr; 

	};
	
    function orebuilditemaddparams(){
		var paramstr = new FormData();
		    paramstr.append('itemid', document.getElementById('build_selectitem') ? document.getElementById('build_selectitem').value : '');		
		  //  paramstr.append('qty', document.getElementById('orequantity') ? document.getElementById('orequantity').value : '');		
 
	   return paramstr; 

	} 
	
    function orebuilditemsaveparams(){
		var paramstr = new FormData();
		    
		    paramstr.append('itemtobuildid', document.getElementById('build_selectitembuild') ? itemtobuidid[itemtobuidname.indexOf(document.getElementById('build_selectitembuild').value)] : '');		
		    paramstr.append('gridsize', document.getElementsByClassName('buildgriditemxm').length);		
		    for(i=0; i<document.getElementsByClassName('buildgriditemxm').length; i++){
    		    paramstr.append(`itemid${i}`, document.getElementsByClassName('buildgriditemxm')[i].children[0].textContent);		
		    }
		    for(i=0; i<document.getElementsByClassName('buildgriditemxm').length; i++){
    		    paramstr.append(`qty${i}`, document.getElementsByClassName('buildgriditemxm')[i].children[2].children[0].value);		
		    }
		    for(i=0; i<document.getElementsByClassName('buildgriditemxm').length; i++){
    		    paramstr.append(`price${i}`, document.getElementsByClassName('buildgriditemxm')[i].children[3].textContent);		
		    }
 
	   return paramstr; 

	} 
	
// .innerHTML = `${xm
// 				             orebuildpropertydata.map(data => {
// 				          return(`
//     				        <div id="${data.id}" class="buildgriditem">
//                                 <p>${data.itemname}</p>
//                                 <p>${data.itemtype}</p>
//                                 <input type="number" placeholder="Add" class="buildinput">
//                                 <p class=""><span class="buildaction">delete</span></p>
//                             </div>
// 				          `)
// 				      }).join('')}`
const orefetchbuildproperty =(type)=>{ 
	    const loadfetch = (result) =>{
	         let orebuildpropertydata = result.data.data;
				   /* console.log(orebuildpropertydata)*/
				    if(type == 'YES'){
    				    if(document.getElementById('build_selectitembuild')){
    				        document.getElementById('build_selectitembuild').innerHTML +=  orebuildpropertydata.map(data=>{
    				            itemtobuidid.push(data.itemid)
    				            itemtobuidname.push(data.itemname)
    				            return(`
    				                <option>${data.itemname}</option>
    				            `)
    				        })
    				        
    				    }
				    }else{
    				    if(document.getElementById('build_selectitem')){
    				        document.getElementById('build_selectitem').innerHTML +=  orebuildpropertydata.map(data=>{
    				            itemid.push(data.itemid)
    				            itemname.push(data.itemname) 
    				            itemprice.push(data.savingsellingprice) 
    				            return(`
    				                <option name="${data.itemname}" id="${data.itemid}">${data.itemname}</option>
    				            `)
    				        })
    				        
    				    }
				    }
	    }
	   callController('fetchinventoryitemscript.php', orebuilditemparams(type), 'fetchitemtypescript', '', loadfetch, 'silent');
	   //loadfetch()
	}
	
	const buildselectcontrol = (able, id)=>{
	    /*console.log(able, id)*/
	   /* console.log(id, document.getElementsByName(`${id}`)[0])*/
	   // if(document.getElementsByClassName('buildgriditemxm'))document.getElementsByClassName('buildgriditemxm').disabled = false; 
	   if(able == 'disable'){
	       document.getElementsByName(`${id}`)[0].disabled = true;
	   }
	   if(able == 'enable'){
	       document.getElementsByName(`${id}`)[0].disabled = false;
	   }
            if(document.getElementById('build_selectitem'))document.getElementById('build_selectitem').value = '';
            if(document.getElementById('orequantity'))document.getElementById('orequantity').value = 0;
	}
	
	const buildpropdelete =(value)=>{
	 /*   console.log(value);*/
        if(document.getElementsByName(`${value}`))document.getElementsByName(`${value}`)[0].disabled = false;
            if(document.getElementById(`${value}row`))document.getElementById(`${value}row`).remove();
	   /* console.log(this);*/
        // console.log('enable', el.parentElement.parentElement.parentElement.children[1].textContent, document.getElementsByName(`${el.parentElement.parentElement.parentElement.children[1].textContent}`)[0]);
	   //  if(el.tagName.toLowerCase() == 'button' && el.classList.contains('orebtndeleete') && el.textContent == 'Delete'){
    //                 el.parentElement.parentElement.parentElement.remove();
    //             }
	}
	
const orepopulatetable = () =>{
    if(document.getElementById('orebuildproitemsscreen'))document.getElementById('orebuildproitemsscreen').innerHTML += `
        <tr id="${document.getElementById('build_selectitem').value}row" data-open="false" class="source-row-item buildgriditemxm">
            <td> ${itemid[itemname.indexOf(document.getElementById('build_selectitem').value)]} </td>
            <td> ${document.getElementById('build_selectitem').value} </td>
            <td> <input type="number" min="0" value="${document.getElementById('orequantity').value}" placeholder="Edit"  style="height: 15px !important" class="buildinput nevernegative"> </td>
            <td> ${itemprice[itemname.indexOf(document.getElementById('build_selectitem').value)]} </td>
            <td>
                <div class="flex" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="buildpropdelete('${document.getElementById('build_selectitem').value}')" class="orebtndeleete">Delete</button>
                </div>
            </td>
        </tr>
    `;
    buildselectcontrol('disable', document.getElementById('build_selectitem').value);
    // if(document.getElementById('build_selectitem'))document.getElementById('build_selectitem').children[(itemname.indexOf(document.getElementById('build_selectitem').value)+1)].disabled = true
    // if(document.getElementById('build_selectitem'))document.getElementById('build_selectitem').value = '';
     
}
	

async function orebuildpropertyitems() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('buildpropertyitems.php', 'override')  ;
        
        const clearrefresh =(result)=>{
            if(document.getElementById('oreitementry'))document.getElementById('oreitementry').value = '';
            if(document.getElementById('orebuildproitemsscreen'))document.getElementById('orebuildproitemsscreen').innerHTML = '';
            if(document.getElementById('build_selectitembuild'))document.getElementById('build_selectitembuild').value = '';
            if(document.getElementById('build_selectitem'))document.getElementById('build_selectitem').value = '';
            if(document.getElementById('orequantity'))document.getElementById('orequantity').value = 0;
            for(i=0; i<document.getElementById('build_selectitem').children.length; i++){
                document.getElementById('build_selectitem').children[i].disabled = false;
            }
	    };
	    
        if(document.getElementById('orebuildproitemssubmitbtn'))document.getElementById('orebuildproitemssubmitbtn').addEventListener('click', e=>{
           //ADD BUTTTN
           // callController('fetchanitem.php', orebuilditemaddparams(), 'fetchanitem', ['build_selectitemm','orequantityy'], null)
           if(validateInputsComponent(['build_selectitem','orequantity']))orepopulatetable()
        }, true);
        
        if(document.getElementById('orebuildproitemssavesubmitbtn'))document.getElementById('orebuildproitemssavesubmitbtn').addEventListener('click', e=>{
           //SAVE BUTTTN
        //   console.log()
            callController('builditemscript.php', orebuilditemsaveparams(), 'builditemscript', ['build_selectitembuild'], clearrefresh)
        }, true);
        
        orefetchbuildproperty();
        orefetchbuildproperty('YES');
        
        // if(document.getElementById('query_submitbtn'))document.getElementById('query_submitbtn').addEventListener('click', e=>callController('controller.php', null, 'querysubmit', query_field, alert),true);

        //YOUR VARIABLES STAYS HERE
        // const statementAccountNumber = document.getElementById('smacc')
        // const statementStartDate = document.getElementById('smsd');
        
        //ALWAYS CHECK BEFORE ADDING EVENTLISTENERS
        // if(loadstatementbtn) loadstatementbtn.addEventListener('click', () => loadStatement());
        
        //TO CALL AND HIDE SPINNER WHEN NEEDED
        // showSpinner();
        // hideSpinner()
        
       // THE REST OF YOUR CODE GOES HERE
       
       //THANKS
       
       if(itemtobuildupdateid){
           function param(){
               let p = new FormData()
               p.append('compositeitemid', itemtobuildupdateid)
               return p
           }
           function action(res){
               console.log(res)
               document.getElementById('build_selectitembuild').value = res.data[0].itemnametobuild
               itemtobuildupdateid = ''
            //   for(let i=0;i<res.data.length;i++){
            //       console.log(res.data[i].itemid)
            //       document.getElementById('build_selectitem').value = res.data[i].itemname
            //       document.getElementById('orequantity').value = res.data[i].qty
            //       document.getElementById('orebuildproitemssubmitbtn').click()
            //   }
              if(document.getElementById('orebuildproitemsscreen'))document.getElementById('orebuildproitemsscreen').innerHTML = res.data.map(data=>`
                    <tr id="${data.id}row" data-open="false" class="source-row-item buildgriditemxm">
                        <td>${data.itemid}</td>
                        <td>${data.itemname}</td>
                        <td> <input type="number" min="0" value="${parseInt(data.qty)}" placeholder="Edit"  style="height: 15px !important" class="buildinput nevernegative"/> </td>
                        <td> ${data.price} </td>
                        <td>
                            <div class="flex" style="align-items:center">
                                <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="document.getElementById('${data.id}row').remove()" class="orebtndeleete">Delete</button>
                            </div>
                        </td>
                    </tr>
                  `).join('');
           }
           setTimeout(()=>{
                callController('fetchcompositecomponents.php', param(), 'fetchcompositecomponents', null, action)
           },3000)
       }
       
       if(document.getElementById('build_selectitembuild'))document.getElementById('build_selectitembuild').addEventListener('change', e=>{
           document.getElementById('orebuildproitemsscreen').innerHTML = ``
           function param(){
               let p = new FormData()
               p.append('compositeitemid', itemtobuidid[itemtobuidname.indexOf(document.getElementById('build_selectitembuild').value)])
               return p
           }
           function action(res){
               console.log(res)
               document.getElementById('build_selectitembuild').value = res.data[0].itemnametobuild
               itemtobuildupdateid = ''
            //   for(let i=0;i<res.data.length;i++){
            //       console.log(res.data[i].itemid)
            //       document.getElementById('build_selectitem').value = res.data[i].itemname 
            //       document.getElementById('orequantity').value = res.data[i].qty
            //       document.getElementById('orebuildproitemssubmitbtn').click()
            //   }
            // alert('here')
                  if(document.getElementById('orebuildproitemsscreen'))document.getElementById('orebuildproitemsscreen').innerHTML = res.data.map(data=>`
                    <tr id="${data.id}row" data-open="false" class="source-row-item buildgriditemxm">
                        <td>${data.itemid}</td>
                        <td>${data.itemname}</td>
                        <td> <input type="number" min="0" value="${parseInt(data.qty)}" placeholder="Edit"  style="height: 15px !important" class="buildinput nevernegative"> </td>
                        <td> ${data.price} </td>
                        <td>
                            <div class="flex" style="align-items:center">
                                <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="document.getElementById('${data.id}row').remove()" class="orebtndeleete">Delete</button>
                            </div>
                        </td>
                    </tr>
                  `).join('');
           }
                callController('fetchcompositecomponents.php', param(), 'fetchcompositecomponents', null, action)
       })
        
}




    window.onmousedown=(e)=>{
    var el = e.target;
    if(el.tagName.toLowerCase() == 'span' && el.classList.contains('orebtndeleete') && el.textContent == 'delete'){
                //     console.log('enable', el.parentElement.parentElement.children[1].textContent);
                //     document.getElementsByName(`${id}`)[0].disabled = false;
	               // if(document.getElementById('build_selectitem'))document.getElementById('build_selectitem').value = '';
                    el.parentElement.parentElement.remove();
                }
    if(el.tagName.toLowerCase() == 'p' && el.textContent == 'edit' && el.parentElement.classList.contains('properee')){
        el.parentElement.parentElement.nextElementSibling.classList.remove('hidden');
        setTimeout(() => {
            el.textContent = 'save';
            el.nextElementSibling.textContent = 'cancel'
        }, 100);
        el.parentElement.parentElement.nextElementSibling.children[0].value = el.parentElement.previousElementSibling.textContent
    }
    if(el.tagName.toLowerCase() == 'p' && el.textContent == 'save' && el.parentElement.classList.contains('properee')){ 
        if(el.parentElement.parentElement.nextElementSibling.children[0].value !== ''){
            el.parentElement.parentElement.children[0].textContent = el.parentElement.parentElement.nextElementSibling.children[0].value;
            el.parentElement.parentElement.nextElementSibling.children[0].value = ''; 
            setTimeout(() => {
                el.textContent = 'edit';
                el.nextElementSibling.textContent = 'remove';
            }, 100);
            el.parentElement.parentElement.nextElementSibling.classList.add('hidden');
        }else{
            alert('input must be filled')
        }
    }
    if(el.tagName.toLowerCase() == 'p' && el.textContent == 'cancel' && el.parentElement.classList.contains('properee')){
        el.parentElement.parentElement.nextElementSibling.children[0].value = '';
        el.parentElement.parentElement.nextElementSibling.classList.add('hidden');
        setTimeout(() => {
            el.textContent = 'remove';
            el.previousElementSibling.textContent = 'edit';
        }, 100);
    }
    
}



var buildpropertyitemsbtn = document.getElementById("buildpropertyitems");
if (buildpropertyitemsbtn) buildpropertyitemsbtn.addEventListener("click", orebuildpropertyitems, false);



// add property account  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var form; var  locationx; var  summary; var  user; var  propertyitems; var  locationsvar; var  groupnames; var  propertycustomers; var propertyusers; var localItem;var bankcodes;

async function openPropertyAccount() {
    await httpRequest('propertyaccount.php');
    dynamiccomma(true)
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
        
        if(form.querySelector('#accountnumber')) {
            form.querySelector('#accountnumber').addEventListener('blur', getPropertyAccountProfile)
        }
        
        if(form.querySelector('#customer')) {
            form.querySelector('#customer').addEventListener('change', function() {
                // form.querySelector('#accountnumber').value = ''
                document.getElementById('customer-profile').innerHTML = ''
            })
        }
        
        if(summary) summary.querySelector('button#add-item').addEventListener('click', appendNewitem)
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', validatePropertyAccountForm)
        if(form.querySelector('#user')) form.querySelector('#user').addEventListener('change', fetchMarketersGroup)
    }
    
    await fetchFormData()
    if(checkIfProperyAccountUpdate()) propertyAccountMode('update')
    else propertyAccountMode();
}

async function getPropertyAccountProfile()  {
    document.getElementById('customer-profile').innerHTML = ''
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
                document.getElementById('customer').value = parseResult.data[0].customerdetail.id
                fetchSavingsAccountCustomerAccounts('', { 
                value: parseResult.data[0].customerdetail.id, 
                text: `${parseResult.data[0].customerdetail.firstname} ${parseResult.data[0].customerdetail.othernames ?? ''} ${parseResult.data[0].customerdetail.lastname}`
            });
                const customerNames = `${parseResult.data[0].customerdetail.firstname} ${parseResult.data[0].customerdetail.othernames ?? ''} ${parseResult.data[0].customerdetail.lastname}`
                const template = `
                     <ul style="font-size:small;font-weight:400;text-align:left;display:flex;flex-direction:column;gap:5px" class="hidden">
                        <li style="text-transform:capitalize"> Name: &nbsp; ${customerNames}</li>
                        <li> Gender: &nbsp;${parseResult.data[0].customerdetail.gender}</li>
                        <li> Property Reg. Date: &nbsp;${parseResult.data[0].accountdetail[0].registrationdate}</li>
                    </ul>
                    <span class="customer-images" style="width:max-content;"></span>
                ` 
                document.getElementById('customer-profile').innerHTML = template
                
                document.getElementById('customer').value = parseResult.data[0].customerdetail.id;
                document.getElementById('customername').value = customerNames;
                document.getElementById('customername').setAttribute('readonly', true);
                document.getElementById('dailyunit').value = Number(parseResult.data[0].accountdetail[0].dailyunit);
                document.getElementById('dailyunit').setAttribute('readonly', true);
                document.getElementById('serialnumberfrom').value = Number(parseResult.data[0].accountdetail[0].serialnumberfrom);
                document.getElementById('serialnumberfrom').setAttribute('readonly', true);
                document.getElementById('serialnumberfrom').classList.add('hidden')
                document.getElementById('serialnumberto').value = Number(parseResult.data[0].accountdetail[0].serialnumberto);
                document.getElementById('serialnumberto').setAttribute('readonly', true);
                document.getElementById('serialnumberto').classList.add('hidden')
                
                if(parseResult.data[0].accountdetail[0].photourl !== '' || parseResult.data[0].accountdetail[0].photourl !== '-') {
                    const customerImage = document.createElement('span')
                    img = `<img width="120" class="hidden" src=../images/customer/${parseResult.data[0].customerdetail.photourl}>`
                    customerImage.innerHTML = img
                    customerImage.addEventListener('click', function() {
                        let modalcontent = `
                            <img class="hidden" src=../images/customer/${parseResult.data[0].customerdetail.photourl}>
                            <div class="hidden" style="height: 30px;width:auto"></div>
                        `
                        openJModal(modalcontent)
                    })
                    
                    document.querySelector('.customer-images').appendChild(customerImage)
                }
                
                
           }
           catch(e) {}
        }
        else {
        document.getElementById('customer').value = '';
                document.getElementById('customername').value = '';
                document.getElementById('customername').removeAttribute('readonly');
                document.getElementById('dailyunit').value = '';
                document.getElementById('dailyunit').removeAttribute('readonly');
                document.getElementById('serialnumberfrom').value = '';
                document.getElementById('serialnumberfrom').classList.remove('hidden')
                document.getElementById('serialnumberfrom').removeAttribute('readonly');
                document.getElementById('serialnumberto').value = '';
                document.getElementById('serialnumberto').removeAttribute('readonly');
                document.getElementById('serialnumberto').classList.remove('hidden')
            
            callModal(parseResult.message, 0)}
       
    }
    else {
        document.getElementById('customer').value = '';
                document.getElementById('customername').value = '';
                document.getElementById('customername').removeAttribute('readonly');
                document.getElementById('dailyunit').value = '';
                document.getElementById('dailyunit').removeAttribute('readonly');
                document.getElementById('serialnumberfrom').classList.remove('hidden')
                document.getElementById('serialnumberfrom').value = '';
                document.getElementById('serialnumberfrom').removeAttribute('readonly');
                document.getElementById('serialnumberto').value = '';
                document.getElementById('serialnumberto').removeAttribute('readonly');
                document.getElementById('serialnumberto').classList.remove('hidden')
        hideSpinner();
        callModal('Error! Unable to perform task', 0)
    }
}

var propertyAccountMode = function(mode='savings') { 
    if(mode.includes('update')) {
        let localdata  = sessionStorage.getItem('property')
        let parsedata = localItem = JSON.parse(localdata);
        console.log('parsedata property', parsedata)
        try {
            
            if(parsedata.mode == 'view')  form.querySelector('button#submit').disabled = true;
            else { 
                form.querySelector('button#submit').disabled = false;
                if(form.querySelector('button#submit')) form.querySelector('button#submit').innerHTML = 'Update property account'
            }
            
            document.querySelector('form').setAttribute('update', parsedata.property.id)
            
            customer.value = parsedata.property.customer 
            form.querySelector('#accountnumber').value = parsedata.property.accountnumber 
            code.value = parsedata.property.code;
            // bankname1.value = parsedata.property.bankname1;
            // bankname2.value = parsedata.property.bankname2;
            
            maskInputs([form.serialnumberfrom.id, form.serialnumberto.id])
            form.serialnumberfrom.value = parsedata.property.serialnumberfrom
            form.serialnumberto.value = parsedata.property.serialnumberto
            
            bankname1.selectedIndex = findCustomerBankFromCode(parsedata.property.bankname1);
            bankname2.selectedIndex = findCustomerBankFromCode(parsedata.property.bankname2);
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
            
            fetchSavingsAccountCustomerAccounts('', { 
                value: parsedata.property.customer, 
                text: parsedata.property.customername
            });
            
            
            
            if(parsedata.items.length) onViewAppendTransactionsDetailsItems(parsedata.items)
            
            sessionStorage.removeItem('property')
        }
        catch(e) {  console.log(e) }
        document.querySelector('#accountnumber').value = parsedata.property.accountnumber;
    }
    else {
        sessionStorage.removeItem('property')
        localItem = null;
    }
     
}

function findCustomerBankFromCode(bankinfo) {
    let findbankIndex = bankcodes?.findIndex( item => item.code == bankinfo?.split('|')[1] )
    return findbankIndex;
}


function onViewAppendTransactionsDetailsItems(items) {
    console.log('items',  items)
    dynamiccomma(false)
    
    for(let i=0;i<items.length;i++){
        console.log('itemid',i, items[i].inventoryitemid, document.getElementsByClassName(`item-${items[i].inventoryitemid}`)[0].value);
        document.getElementById('items').value = document.getElementsByClassName(`item-${items[i].inventoryitemid}`)[0].value;
        appendNewitem(Number(items[i].qty), 'hidden');
    }
    // items.map((item, index) => {
    //     if(index === items.length - 1) { form.querySelector('#items').value = index}
    //     let itemselected = propertyitems.find(val => val.compositeitemdetail.id == item.itemid)
        
    //     let div = document.createElement('div')
    //     div.style.cssText = 'align-items:end';
    //     div.classList.add('jformgroup', 'jformgrouprow', 'item')
    //     div.id = propertyitems.findIndex(val => val.compositeitemdetail.id == item.itemid)
    //     div.innerHTML = `
    //         <div class="jformgroup jformgroupcol"  style="width: 10%;margin-right: 5px">
    //             <label class="jcontrollabel"> item Id: </label>
    //             <input  type="text"  class="jformcontrol jmargin-top" readonly="readonly" value="${itemselected.compositeitem}" >
    //         </div>
    //         <div class="jformgroup jformgroupcol" style="width: 30%;">
    //             <label class="jcontrollabel"> description: </label>
    //             <input id="item-title"  type="text"  class="jformcontrol jmargin-top" readonly="readonly" value="${itemselected.compositeitemdetail.itemname}" >
    //         </div>
    //         <div class="jformgroup jformgroupcol" style="width: 7%;margin-left: 5px">
    //             <label class="jcontrollabel"> qty: </label>
    //             <input id="item-qty" type="number" min="1" onchange="reCalculateColumnItemPrice(event, ${+(form.querySelector('#items').value)})" class="jformcontrol jmargin-top" value="1">
    //         </div>
    //         <div class="jformgroup jformgroupcol hidden" style="width: 12%;margin-left: 5px">
    //             <label class="jcontrollabel "> cost: </label>
    //             <input id="item-cost" type="number"  class="jformcontrol jmargin-top" value="${item.cost}">
    //         </div>
    //         <div class="jformgroup jformgroupcol" style="width: 12%;margin-left: 5px">
    //             <label class="jcontrollabel"> price: </label>
    //             <input id="item-price" type="number" readonly="readonly" class="jformcontrol jmargin-top comma" value="${item.savingsellingprice}">
    //         </div>
    //         <div class="jformgroup jformgroupcol" style="width: 12%;margin-left: 5px">
    //             <label class="jcontrollabel"> amount: </label>
    //             <input id="item-amount" type="number"  class="jformcontrol jmargin-top comma" value="${Number(item.savingsellingprice)*Number(item.qty)}">
    //         </div>
    //         <div class="jformgroup jformgroupcol" style="width: 7%;margin-left: 5px">
    //             <button type="button" class="j-action-btn"
    //                 style="text-transform: capitalize;margin:5px 0 0 0;border:1px solid blue;color:blue;background-color:transparent;"
    //                 onclick="viewColumnItem(event, ${+(form.querySelector('#items').value)})">view</button>
    //         </div>
    //         <div class="jformgroup jformgroupcol" style="width: 7%;margin-left: 5px">
    //             <button type="button" class="j-action-btn"
    //                 style="text-transform: capitalize;margin:5px 0 0 0;background-color:red"
    //                  onclick="removeColumnItem(event)">remove</button>
    //         </div>
    //     `
    //     summary.querySelector('.items-column').appendChild(div)
    //     reCalculatePropertyItemsTotalPrice()
    //     dynamiccomma(true)
    // })
}

var checkIfProperyAccountUpdate = function() {
    return !!sessionStorage.getItem('property')
}

function savePropertyAccount() { 
    showSpinner();
	var request = getAjaxObject();
    
    request.open('POST','../controllers/propertyscript.php',true);
    
    request.onreadystatechange = function(e){
        dynamiccomma(true)
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
    paramstr.set('customer', document.getElementById('customer').tomselect.getValue())
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
    
    if(document.querySelector('form').getAttribute('update') !== null && document.querySelector('form').getAttribute('update') !== undefined) {
        paramstr.append('propertyid', document.querySelector('form').getAttribute('update'))
    }
    return paramstr;
}

function validatePropertyAccountForm() {
    dynamiccomma(false)
    inputs = [
        // { input: customer, validation: {required: 'customer is required'}},
        { input: registrationdate, validation: {required: 'registration date  is required'}},
        //{ input: locationx, validation: {required: 'location  is required'}},
        { input: registrationpoint, validation: {required: 'registration point  is required'}},
        { input: dailyunit, validation: {required: 'daily unit  is required'}},
        { input: marketergroup, validation: {required: 'marketer group  is required'}},
        { input: totalamount, validation: {required: 'total amount  is required'}},
        { input: user, validation: {required: 'user is required'}},
        // { input: form.querySelector('#numberofdays'), validation: {required: 'number of days is required'}},
        //{ input: form.querySelector('#registrationcharge'), validation: {required: 'Registration charge is required'}},
        { input: form.querySelector('#serialnumberfrom'), validation: {required: 'Serial number "from" is required'}},
        { input: form.querySelector('#serialnumberto'), validation: {required: 'Serial number "to" is required'}}
    ]
    
    if(!document.getElementById('customer').tomselect.getValue())return callModal('customer is required', 0)
    
    if(document.getElementById('settlementtype').value == 'TIME BOUND'){
                        if(!document.getElementById('numberofdays').value){
                            dynamiccomma(true)
                            return callModal('Number of days is required')
                        }
    }

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
    if(!validateSerialNumbers()){ return dynamiccomma(true)}else{savePropertyAccount()}
}

function validateSerialNumbers() {

      var serialNumberFrom = parseFloat(document.getElementById('serialnumberfrom').value);
      var serialNumberTo = parseFloat(document.getElementById('serialnumberto').value);


      if (serialNumberFrom === serialNumberTo) {
        callModal('Serial numbers cannot be the same.', 0);
        form.querySelector('#serialnumberfrom').style.borderColor = 'red'
        form.querySelector('#serialnumberto').style.borderColor = 'red'
        return false;
      }

 
      if (serialNumberFrom >= serialNumberTo) {
        callModal('Serial number "From" must be less than "To".', 0);
        form.querySelector('#serialnumberfrom').style.borderColor = 'red'
        form.querySelector('#serialnumberto').style.borderColor = 'red'
        return false;
      }


      if (!Number.isInteger(serialNumberFrom) || !Number.isInteger(serialNumberTo)) {
        callModal('Serial numbers must be whole numbers.', 0);
        form.querySelector('#serialnumberfrom').style.borderColor = 'red'
        form.querySelector('#serialnumberto').style.borderColor = 'red'
        return false;
      }

      // Validation passed
      form.querySelector('#serialnumberfrom').style.borderColor = ''
      form.querySelector('#serialnumberto').style.borderColor = ''
      return true;
}

function appendNewitem(qty=1, cls='') {
    dynamiccomma(false)
    let itemselected = propertyitems[+(form.querySelector('#items').value)]

    if(itemselected && (form.querySelector('#items').value !== null && form.querySelector('#items').value !== '') ) {
        let div = document.createElement('div')
        div.style.cssText = 'align-items:end';
        div.classList.add('jformgroup', 'jformgrouprow', 'item')
        div.id = document.querySelector('#items').value;
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
                <input id="item-qty" type="number" onchange="reCalculateColumnItemPrice(event, ${+(form.querySelector('#items').value)})"  min="1"  class="jformcontrol jmargin-top" value="${qty}">
            </div>
            <div class="jformgroup jformgroupcol hidden" style="width: 12%;margin-left: 5px">
                <label class="jcontrollabel"> cost: </label>
                <input id="item-cost" type="number" class="jformcontrol jmargin-top comma" value="${itemselected.compositeitemdetail.cost}">
            </div>
            <div class="jformgroup jformgroupcol" style="width: 12%;margin-left: 5px">
                <label class="jcontrollabel"> price: </label>
                <input id="item-price" type="number"  class="jformcontrol jmargin-top comma" readonly="readonly" value="${(+itemselected.compositeitemdetail.savingsellingprice)}">
            </div>
            <div class="jformgroup jformgroupcol ${cls}" style="width: 12%;margin-left: 5px">
                <label class="jcontrollabel"> amount: </label>
                <input id="item-amount" type="number"  class="jformcontrol jmargin-top comma" readonly="readonly" value="${(Number(+itemselected.compositeitemdetail.savingsellingprice)*Number(qty))}">
            </div>
            <div class="jformgroup jformgroupcol" style="width: 7%;margin-left: 5px">
                <button type="button" class="j-action-btn"
                    style=";text-transform: capitalize;margin:5px 0 0 0;border:1px solid blue;color:blue;background-color:transparent;"
                    id="add-item" onclick="viewColumnItem(event, ${+(form.querySelector('#items').value)}, this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[1].value)">view</button>
            </div>
            <div class="jformgroup jformgroupcol" style="width: 7%;margin-left: 5px">
                <button type="button" class="j-action-btn"
                    style="text-transform: capitalize;margin:5px 0 0 0;background-color:red"
                    id="add-item" onclick="removeColumnItem(event)">remove</button>
            </div>
        `
        summary.querySelector('.items-column').appendChild(div)
        reCalculatePropertyItemsTotalPrice()
        dynamiccomma(true)
    }
}

function addDaysToDate(days) {
    // Get today's date
    const today = new Date();
    // Calculate the timestamp for the new date by adding the number of days
    const timestamp = today.getTime() + (days * 24 * 60 * 60 * 1000);
    // Create a new Date object using the calculated timestamp
    const newDate = new Date(timestamp);
    // Get the year, month, and day components of the new date
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(newDate.getDate()).padStart(2, '0');
    // Return the new date in the format YYYY-MM-DD
    return `${year}-${month}-${day}`;
}

function runtotalamountnumberofdays(){
        if(!document.getElementById('totalamount').value)return callModal('Total Amount missing...');
        function funct(res){
            document.getElementById('numberofdays').value = ''
            console.log(res)
            if(!res.status)return callModal('There may not be number of days specified for that value range')
            document.getElementById('numberofdays').value = Number(res.data[0].numberofdays)
            if(Number(res.data[0].numberofdays)){
                document.getElementById('expectedmaturitydate').value = addDaysToDate(res.data[0].numberofdays)
            }
        }
        function param(){ 
            let p = new FormData();
            p.append('propertyvalue', document.getElementById('totalamount').value)
            return p
        }
        callController('getnumberofdaysforpropertyvalue.php', param(), 'getnumberofdaysforpropertyvalue', null, funct, 'silent')
}

function reCalculatePropertyItemsTotalPrice() {
    let total = 0;
    summary.querySelectorAll('.items-column .item').forEach((item, index) => {
            total += (+item.querySelector('#item-amount').value)
    })
    form.querySelector('#totalamount').value = total
    runtotalamountnumberofdays()
}

function reCalculateColumnItemPrice(event, id) {
    dynamiccomma(false)
    let selecteditem = propertyitems[+id]
    let itemColumnPriceElement = event.currentTarget.parentElement.parentElement.querySelector('#item-amount')
    itemColumnPriceElement.value = (+ event.currentTarget.value) * (+selecteditem.compositeitemdetail.savingsellingprice)
    reCalculatePropertyItemsTotalPrice()
    dynamiccomma(true)
}

function removeColumnItem(event) {
    let itemcolumns = summary.querySelectorAll('.items-column .item')
    event.target.parentElement.parentElement.remove()
    reCalculatePropertyItemsTotalPrice()
}

async function viewColumnItem(event, id, qty=1) {
    event.target.innerHTML = 'viewing...';
    event.target.disabled = true
    if(!qty || qty == 0)qty = 1
    let selecteditem = propertyitems[+id]
    let params = new FormData();
    let header = body = footer='';
    params.append('compositeitemid', selecteditem.compositeitem)
    //let result = await fetch('../controllers/fetchcompositedetails.php', {method: 'POST', body: params, headers: new Headers()})
    let result = await fetch('../controllers/fetchcompositedetails.php', {method: 'POST', body: params, headers: new Headers()})
    let res = await result.json();
    let total = 0
    if(res?.status) {
        event.target.innerHTML = 'view'
        event.target.disabled = false
        if(res.data.length) {
            res.data.map(function(item, index) {
                total = total +(Number(item.amount)*Number(qty))
                body += `
                    <tr>
                        <td>${++index}</td>
                        <td>${item.itemdetail[0].itemname + ' - ' + item.itemdetail[0].model }</td>
                        <td>${item.itemdetail[0].itemtype }</td>
                         <td>${item.qty}</td>
                        <td>${ formatMoney(item.amount) }</td>
                    </tr>
                `
               /* body += `
                    <tr>
                        <td>${++index}</td>
                        <td>${item.itemdetail[0].id}</td>
                        <td>${item.itemdetail[0].itemname }</td>
                        <td>${item.itemdetail[0].itemtype }</td>
                        <td>${ formatMoney(item.itemdetail[0].cost)}</td>
                        <td>${ formatMoney(item.itemdetail[0].marketingprice) }</td>
                        <td>${ formatMoney(item.itemdetail[0].savingsellingprice) }</td>
                    </tr>
                `*/
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
                        <th> description  </th>
                        <th> type  </th>
                        <th> qty  </th>
                        <th> price </th>
                    </tr>
                </thead> 
                <tbody id="jtabledata">
                    ${body}
                    <tr>
                        <td colspan="4" style="text-align:left;font-weight:bold">TOTAL ITEMS</td>
                        <td style="font-weight:bold;"> ${res.data.length} </td>
                    </tr>
                    <tr>
                        <td colspan="4" style="text-align:left;font-weight:bold">PACKAGE TOTAL QTY</td>
                        <td style="font-weight:bold;"> ${formatMoney(qty)} </td>
                    </tr>
                    <tr>
                        <td colspan="4" style="text-align:left;font-weight:bold">TOTAL</td>
                        <td style="font-weight:bold;"> ${formatMoney(total)} </td>
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
                document.getElementById('userdata').innerHTML = options
                user.innerHTML = ''
                user.innerHTML = '<option value="" selected=""> --Select User --</option>'+options
            }
        }
    } else  hideSpinner()
}

/*async function fetchCompositeItems() {
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
}*/

async function fetchCompositeItems() {
    showSpinner()
    let result = await fetch('../controllers/itemsforpropertyaccount.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        propertyitems = res.data
        if(form.querySelector('#items')) {
            let options = '';
            res.data?.map(function(item, index){
            options += `
                <option value="${index}" class="item-${item.compositeitemdetail?.itemid} itemtoselect"> ${ item.compositeitemdetail?.itemname } </option>
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

// async function fetchCustomerAccounts() {
//     showSpinner()
//     let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: {}, headers: new Headers()})
//     let res = await result.json();
//     if(res?.status) {
//         hideSpinner()
//         let data  =  res.data?.data;
//       propertycustomers =  data;
//         let options = '';
//         data?.map(function(item, index){
//             options += `
//                 <option value="${item.id}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othernames == '' ? '': item.othernames)} </option>
//             `
//         })
//         if(customer) {
//             customer.innerHTML = '';
//             customer.innerHTML = '<option value="" selected="">--Select Customer --</option>'+options
//             if(document.getElementById('customerdata'))document.getElementById('customerdata').innerHTML = data.map((item, index)=>`<option value="${item.firstname + ' ' + item.lastname + ' ' + (item.othernames == '' ? '': item.othernames)}">${item.id} | ${item.firstname + ' ' + item.lastname + ' ' + (item.othernames == '' ? '': item.othernames)}</option>`).join('')
//         }
        
//     } else  hideSpinner()
// }

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

async function fetchRegistrationCharge() {
    let result = await fetchRequest('../controllers/fetchorganisationscript.php')
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.status){
            charge = parseResult.data.data[0].registrationcharge;
            try {
                document.getElementById('registrationcharge').value = formatMoney(charge)
            }
            catch(e) {
                console.log(e)
            }
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
    //await fetchRegistrationCharge()
}

var propertyaccountbtn = document.getElementById("propertyaccount");
if (propertyaccountbtn) propertyaccountbtn.addEventListener("click", openPropertyAccount);



// view property accounts -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var properties; datasource = []

async function fetchSpropertieesAccountUsers (officers='officers', second='') {
    showSpinner()
    let result = await fetchRequest('../controllers/fetchallusers.php');
    if(result) {
        hideSpinner()
        let parseResult  =  JSON.parse(result);
        propertyusers = parseResult; 
        if(parseResult.status){
            let options = '';
            let options2 = '';
            const loc = document.getElementById('sessionlocation').value;
            // console.log('loc', loc, parseResult, parseResult.filter(dat=>dat.location_id == loc), 'fdgdfg')
            parseResult.data.filter(dat=>dat.location_id == loc).map(function(item, index){
            // options += ` 
            //     <option value="${item.id}"> ${item.firstname} ${item.othername ?? ''} ${item.lastname} </option> 
            // ` 
            options += `
                <option value="${item.email}">${item.firstname??'-'}_${item.othernames??'-'}_${item.lastname??'-'}</option>
            `
            options2 += `
                <option value="${item.firstname??'-'}_${item.othernames ?? '-'}_${item.lastname??'-'}">${item.email}</option>
            `
            })
            if(document.getElementById(officers)){
                document.getElementById(officers).innerHTML = '' 
                document.getElementById(officers).innerHTML = options
            }
            
            if(document.getElementById(second)){
                document.getElementById(second).innerHTML = ''  
                document.getElementById(second).innerHTML = options2
            }
            
        }
    } else  hideSpinner()
}

async function openViewPropertyAccounts() {
    await httpRequest('viewpropertyaccounts.php')
    form = document.getElementById('filterpropertyaccountform')
    if(form) {
        fetchSpropertieesAccountUsers('accountofficerlist', '')
        customer = form.querySelector('#customer')
        marketergroup = form.querySelector('#marketergroup')
        if(form.querySelector('button')) form.querySelector('button').addEventListener('click', generatePropertyReport)
        
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(propertyAccountsetCurrentPage)
        await fetchPropertyFormData()
    }
    
    //  function actionviewdeposit(res){
    //     if(document.getElementById('viewdepositaccofficer'))document.getElementById('viewdepositaccofficer').innerHTML = res.data.map(dat=>`<option value="${dat.email}">${dat.firstname} ${dat.lastname}</option>`).join('')
    // }
    // callController('fetchallusers.php', null, 'fetchallusers', null, actionviewdeposit)
    
} 

async function generatePropertyReport(event) {
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchpropertyaccounts.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        event.target.disabled = false;
        properties = datasource = res.data;
        properties.length && initPagination(res.data, propertyAccountsetCurrentPage)
    }
    else {
        if(jtabledata) jtabledata.innerHTML = '';
        event.target.disabled = false;
        callModal(res.message, 0)
    }
}

var propertyAccountsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(properties.length) {
        properties.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendPropertyAccountTableRows(item, index)
            }
        })
        if(document.querySelector('#approveloanstable tbody').innerHTML === '') viewpropertyaccountsbtn.click()
        // appendPropertyAccountTableFoot()
    }
}

function appendPropertyAccountTableFoot() {
    let footer = document.createElement('tfoot')
    let html = `
        <tfoot>
            <tr>
                <td colspan="8" style="text-align:left;padding:7px;font-weight:bolder;font-size:12px"> GRAND TOTAL</td>
                <td style="font-weight:bolder;padding:7px;font-size:12px">${formatMoney(datasource.reduce((total, curr) => total + (+curr.totalamount), 0))}</td>
                <td></td>
            </tr>
        </tfoot>
    `
    footer.innerHTML = html; 
    if(document.getElementById('approveloanstable')) {
        document.getElementById('approveloanstable').querySelector('tfoot')?.remove()
        document.getElementById('approveloanstable').appendChild(footer)
    }
}

async function appendPropertyAccountTableRows(item, index) {
    // var customerinfo = await propertycustomers.find(value => value.id === item.propertyaccount.customer);
    // let loc = await propertylocations.find(value => value.id == (~~Math.abs(item.propertyaccount.location)) )
    // let regpoint = regpoints.find(value => value.id == item.propertyaccount.registrationpoint)
            // <td>${customerinfo !== undefined ? (customerinfo?.firstname + ' ' + customerinfo?.lastname + ' ' + (customerinfo?.othernames == '-' ? '' : customerinfo?.othernames)) : ''}</td>
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.propertyaccount.customername}</td>
            <td>${item.propertyaccount.accountnumber}</td>
            <td>${formatDate(item.propertyaccount.registrationdate)}</td>
            <td>${item.locationname??'NA'}</td>
            <td>${item.numberofdays}</td>   
            <td>${formatDate(item.propertyaccount.expectedmaturitydate)}</td> 
            <td>${item.registrationpointname??''}</td>
            <td>${item.itemnames}</td>  
            <td>${item.propertyaccount.settlementtype}</td>  
            <td>${formatMoney(item.propertyaccount.totalamount)}</td> 
              <td class="no-pr"><a style="display: ${(item?.photourl && item?.photourl !== '-' && item?.photourl !== '') ? 'block' : 'none'};color:blue" target="_blank" href="../images/customer/${item?.photourl}" >Click to view</a></td>
            <td>${item.propertyaccount.user??''}</td>
            <td>
                <div class="flex" style="display: flex;gap:15px;align-items:center">
                    ${(
  document.getElementById('sessionpermission').value.includes('VIEW PROPERTY BUTTON') || 
  document.getElementById('sessionrole').value == 'SUPERADMIN'
) 
? `<button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="viewPropertyAccount(${index}, 'view', event)">View</button>` 
: ''}

${(
  document.getElementById('sessionpermission').value.includes('EDIT PROPERTY BUTTON') || 
  document.getElementById('sessionrole').value == 'SUPERADMIN'
) 
? `<button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px" onclick="viewPropertyAccount(${index}, 'update', event)">Edit</button>` 
: ''}

                </div>
            </td>
        </tr>
    `
} 

async function viewPropertyAccount(propertyindex, mode, event) {
    event.preventDefault();
    let paramstr = new FormData()
    paramstr.append('accountnumber', properties[propertyindex].propertyaccount.accountnumber)
    paramstr.append('id', properties[propertyindex].propertyaccount.id)
    showSpinner()
    let result = await fetch ('../controllers/fetchpropertyaccountdetail.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
            if(res?.status) {
                hideSpinner()
                sessionStorage.setItem('property', JSON.stringify({
                    property: properties[propertyindex].propertyaccount,
                    items: res.data.propertyitems,
                    mode 
                }))
            if(document.getElementById("propertyaccount")) document.getElementById("propertyaccount").click()
    }
    else {
        hideSpinner()
        callModal(`Unable to retrieve items for ${ mode == 'view' ? 'viewing' : 'editing'}`, 0)
    }
}

async function fetchGroupName() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data =  groupnames = res.data?.data;
        let options = '';
        await data.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.groupname} </option>
            `
        })
        if(marketergroup) {
            marketergroup.innerHTML = '';
            marketergroup.innerHTML = '<option value="" selected="">--Select Group --</option>'+options
        }
        
    } else hideSpinner()
}

async function fetchPropertyLocations() {
    showSpinner()
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) { 
        hideSpinner()
        propertylocations = res.data?.data;
    } else hideSpinner()
}

async function fetchCustomerAccounts() {
    // Debounce function to delay API calls
    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    // Function to fetch customers by name with debounce
    async function fetchCustomersByName(query, callback) {
        if (!query.length) {
            return callback();
        }

        let formData = new FormData();
        formData.append('customername', query);

        try {
            let response = await fetch('../controllers/fetchcustomerbynames.php', {
                method: 'POST',
                body: formData
            });

            let res = await response.json();

            if (res?.status) {
                let customers = res.data || [];
                let options = customers.map(item => ({
                    value: item.id,
                    text: `${item.lastname} ${item.firstname} ${item.othernames || ''}`
                }));
                callback(options); // Pass the options to TomSelect
            } else {
                callback([]); // Ensure callback is called with an empty array if no valid data
            }
        } catch (error) {
            callback(); // Ensure callback is called even if there's an error
        }
    }

    // Initialize TomSelect with remote search
    function initializeCustomerSelect() {
        setTimeout(()=>{
            let x = 'customer';
        let y = 'customer1'
        let customerSelect = document.getElementById(x);
        let z = x
        if(!customerSelect){
            customerSelect = document.getElementById(y)
            z=y
        }
        if (customerSelect?.tomselect) { 
            customerSelect.tomselect.destroy(); // Destroy if already initialized
        }

        new TomSelect('#'+z, {
            plugins: ['dropdown_input'],
            load: debounce((query, callback) => {
                fetchCustomersByName(query, callback);
            }, 800), // Apply debounce to prevent excessive requests
            maxOptions:10000
        });
        },2000)
        
    }

    // Call initialization 
    initializeCustomerSelect();
}
async function fetchViewProperyRegistrationPoints() {
    showSpinner()
    let result = await fetch('../controllers/fetchregistrationpoints.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data = regpoints = res.data?.data;
        let options = '';
        data?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.registrationpoint} </option>
            `
        })
        if(form.querySelector('#registrationpoint')){
            form.querySelector('#registrationpoint').innerHTML = ''
            form.querySelector('#registrationpoint').innerHTML = '<option value="" selected="">--Select registration point --</option>'+options
        }
    }else  hideSpinner()
}

async function fetchPropertyFormData() {
    await fetchCustomerAccounts()
    await fetchGroupName();
    await fetchPropertyLocations()
    await fetchViewProperyRegistrationPoints()
}

var viewpropertyaccountsbtn = document.getElementById('viewpropertyaccounts')
if(viewpropertyaccountsbtn) viewpropertyaccountsbtn.addEventListener('click', openViewPropertyAccounts)


// view composite items -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    function openbuildproperyitem(itemid){
        itemtobuildupdateid = itemid
        document.getElementById('buildpropertyitems').click()
    }
    function oresearchcompositeparams(){
		var paramstr = new FormData();
		    paramstr.append('itemname', document.getElementById('viewcompositsinput').value);		
		  //  paramstr.append('itemname', document.getElementById('build_selectitem') ? document.getElementById('build_selectitem').value : '');		
		  //  paramstr.append('qty', document.getElementById('orequantity') ? document.getElementById('orequantity').value : '');		
 
	   return paramstr; 

	} 

async function oreviewcompositeitems() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('viewcompositeitems.php', 'override')  
        const showviewcomposite =(result)=>{
             console.log('here', result)
            callModal(data.message)
            if(document.getElementById('viewcompositetabledata'))document.getElementById('viewcompositetabledata').innerHTML = result.data.map((data,i)=>`
                <tr>
                    <td>${i+1}</td>
                    <td>${data.compositeitem}</td>
                    <td>${data.compositeitemname}</td> 
                    <td>${data.compositemembers.length}</td>
                    <td>
                        <div class="flex" style="align-items:center">
                            <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px" onclick="openbuildproperyitem('${data.compositeitem}')">Edit</button>
                        </div>
                    </td>
                </tr>
            `).join('')
        }
        // callController =(controller, params, name, validate, funct, silent, e)
        if(document.getElementById('viewcompositsinput'))document.getElementById('viewcompositsinput').addEventListener('keyup', e=>{
            if(document.getElementById('viewcompositsinput').value.length > 0){
                callModal('Loading')
                callController('searchcompositeitems.php', oresearchcompositeparams(), 'searchcompositeitems', null, showviewcomposite, 'silent')}
        },true);
         const dodat =(result)=>{
             console.log('here', result)
            if(document.getElementById('viewcompositetabledata'))document.getElementById('viewcompositetabledata').innerHTML = result.data.map((data,i)=>`
                <tr>
                    <td>${i+1}</td>
                    <td>${data.compositeitem}</td>
                    <td>${data.compositeitemname}</td>
                    <td>${data.compositemembers.length}</td>
                    <td>
                        <div class="flex" style="align-items:center">
                            <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px" onclick="openbuildproperyitem('${data.compositeitem}')">Edit</button>
                        </div>
                    </td>
                </tr>
            `).join('')
         }
         callController('searchcompositeitems.php', null, 'searchcompositeitems', null, dodat, 'silent')

        //YOUR VARIABLES STAYS HERE
        // const statementAccountNumber = document.getElementById('smacc')
        // const statementStartDate = document.getElementById('smsd');
        
        //ALWAYS CHECK BEFORE ADDING EVENTLISTENERS
        // if(loadstatementbtn) loadstatementbtn.addEventListener('click', () => loadStatement());
        
        //TO CALL AND HIDE SPINNER WHEN NEEDED
        // showSpinner();
        // hideSpinner()
        
       // THE REST OF YOUR CODE GOES HERE
       
       //THANKS
        
}


var oreviewcompositeitemsbbtn = document.getElementById("viewcompositeitems");
if (oreviewcompositeitemsbbtn) oreviewcompositeitemsbbtn.addEventListener("click", oreviewcompositeitems, false);



// matured property accounts  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = [] ; var maturedaccounts;

async function openMaturedPropertyAccounts() {
    await httpRequest('maturedproperrtyaccounts.php')
    
    form = document.getElementById('filtermaturedpropertyaccountsform')
    if(form) {
        if(form.querySelector('button')) form.querySelector('button').addEventListener('click', generateMaturedAccountsReport)
        document.querySelector('button#print-matured-accounts').addEventListener('click', printMaturedAccountsTable)
        document.querySelector('button#export-matured-accounts').addEventListener('click', exportMaturedAccountsTable)
        
        form.querySelector('#startdate').valueAsDate = new Date()
        form.querySelector('#enddate').valueAsDate = new Date()
        
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(maturedPropertyAccounstsetCurrentPage)
        
        await fetchMaturedPropertyAccountsPageData()
    }
}

async function fetchMaturedPropertyAccountsPageData() {
    await fetchMaturedPropertyCustomerAccounts()
    await fetchMaturedPropertyAccounts()
}


async function fetchMaturedPropertyCustomerAccounts (event) {
    showSpinner()
    let paramstr = new FormData()
    let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res?.status) { 
        hideSpinner()
        propertycustomers= res.data?.data;
    } else hideSpinner()
}

async function fetchMaturedPropertyAccounts() {
    showSpinner()
    let result = await fetch('../controllers/fetchpropertyaccounts.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data  =  res.data
        propertiesaccountslist =  data;
        let options = '';
        data?.forEach(async function(item, index){
            try {
                let customer = propertycustomers?.find( val => val.id == item.customer);
                if(customer) options += `
                    <option value="${item.accountnumber}"> ${customer.firstname + ' ' + customer.lastname + ' ' + (customer.othernames == '' ? '': customer.othernames) + ' - ' + item.accountnumber + ' - ' + formatDate(item.registrationdate)} </option>
                `
            }
            catch(e) {console.log(e)}
            
        })
        if(form.querySelector('#account')) {
            form.querySelector('#account').innerHTML = '';
            form.querySelector('#account').innerHTML = '<option value="" selected="">--Select Account --</option>'+options
        }
        
    } else  hideSpinner()
}

function printMaturedAccountsTable() {
    if(maturedaccounts.length) printContent('Matured property accounts', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportMaturedAccountsTable() {
    if(maturedaccounts.length) tableToExcel('maturedpropertyaccountstable', 'mature_property_accounts')
}

async function generateMaturedAccountsReport(event) {
    
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchmaturedproperty.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        event.target.disabled = false;
        maturedaccounts = datasource = res.data;
        maturedaccounts.length && initPagination(res.data, maturedPropertyAccounstsetCurrentPage)
    }
    else {
        if(jtabledata) jtabledata.innerHTML = '';
        event.target.disabled = false;
        callModal(res.message, 0)
    }
}


function maturedPropertyAccounstsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(maturedaccounts.length) {
        maturedaccounts.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendMaturedAccountsTableRows(item, index)
            }
        })
        if(document.querySelector('#maturedpropertyaccountstable tbody').innerHTML === '') openMaturedPropertyAccounts()
    }
}

async function appendMaturedAccountsTableRows(item, index) {
    let customer = propertycustomers?.find( val => val.id == item.customer);
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.accountnumber}</td>
            <td>${customer.firstname + ' ' + customer.lastname + ' ' + (customer.othernames == '' ? '': customer.othernames)}</td>
            <td>${formatDate(item.registrationdate)}</td>
            <td>${formatDate(item.expectedmaturitydate)}</td>
            <td>${formatMoney(item.totalamount)}</td>
            <td >${item.status}</td>
            <td class="no-pr">
                <div class="flex" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="viewMaturedPropertyAccount(event, ${index})">View</button>
                </div>
            </td>
        </tr>
    `
} 

async function viewMaturedPropertyAccount(event, index) {
    event.target.innerHTML = 'Viewing...';
    event.target.disabled = true
    
    let selecteditem = maturedaccounts[+index]
    let params = new FormData();
    let header = body = footer='';
    params.append('id', selecteditem.accountnumber)
    let result = await fetch('../controllers/fetchpropertytransactions.php', {method: 'POST', body: params, headers: new Headers()})
    let res = await result.json();
    
    if(res?.status) {
        event.target.innerHTML = 'View'
        event.target.disabled = false
        if(res.data.length) {
            res.data.map(function(item, index) {
                body += `
                    <tr>
                        <td>${++index }</td>
                        <td>${formatDate(item.transactiondate)}</td>
                        <td>${ item.reference }</td>
                        <td> ${ formatMoney(item.credit) } </td>
                    </tr>
                `
            })
        }
        else body = ` <tr> <td colspan="6" style="font-weight:bolder;font-size:16px;">No Transaction History for this account</td> </tr>`
    } else {
        event.target.innerHTML = 'View'
        event.target.disabled = false
    }
    
    let html = `
        <h4 style="margin: 5px 10px;font-weight:bolder;text-transform:uppercase">Account Transaction History</h4>
        <div class="jtable-content">
            <table class="jmargin-top">
               <thead id="jtableheader">
                    <tr>
                        <th> s/n</th>
                        <th> date </th>
                        <th> reference   </th>
                        <th> credit  </th>
                    </tr>
                </thead> 
                <tbody id="jtabledata">${body}</tbody> 
            </table>
        </div>`
        
    openJModal(html)
}

var maturedproperrtyaccountsbtn = document.getElementById('maturedproperrtyaccounts')
if(maturedproperrtyaccountsbtn) maturedproperrtyaccountsbtn.addEventListener('click', openMaturedPropertyAccounts, false)



// missed maturity -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = [] ; var missedmaturities;

async function openMissedMaturity () {
    await httpRequest('missedmaturity.php')
    
    form = document.getElementById('filtermissedmaturityform')

    if(document.querySelector('button#submit')) document.querySelector('button#submit').addEventListener('click', generateMissedMaturityReport)
    document.querySelector('button#print-missed-maturity').addEventListener('click', printMissedMaturityTable)
    document.querySelector('button#export-missed-maturity').addEventListener('click', exportMissedMaturityTable)
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(maturedMissedMaturitysetCurrentPage)
    document.querySelector('button#submit').click()
}


function printMissedMaturityTable() {
    if(missedmaturities.length) printContent('Missed Property Matured', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportMissedMaturityTable() {
    if(missedmaturities.length) tableToExcel('missedmaturitytable', 'missed_maturity')
}


async function generateMissedMaturityReport(event) {
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/exceededmaturityproperties.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        event.target.disabled = false;
        missedmaturities = datasource = res.data;
        missedmaturities.length && initPagination(res.data, maturedMissedMaturitysetCurrentPage)
    }
    else {
        if(jtabledata) jtabledata.innerHTML = '';
        event.target.disabled = false;
        callModal(res.message, 0)
    }
}


function maturedMissedMaturitysetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(missedmaturities.length) {
        missedmaturities.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendMissedMaturityTableRows(item, index)
            }
        })
        if(document.querySelector('#missedmaturitytable tbody').innerHTML === '') openMissedMaturity()
    }
}

async function appendMissedMaturityTableRows(item, index) {
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.missedpropertymaturity.accountnumber}</td>
            <td>${item.accountname}</td>
            <td>${formatDate(item.missedpropertymaturity.registrationdate)}</td>
            <td>${formatDate(item.missedpropertymaturity.expectedmaturitydate)}</td>
            <td>${formatMoney(item.pendingbalance)}</td>
            <td>${formatMoney(item.totalpaid)}</td>
        </tr>
    `
} 



var missedmaturitybtn = document.getElementById('missedmaturity')
if(missedmaturitybtn) missedmaturitybtn.addEventListener('click', openMissedMaturity, false)


// property transactions report -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var propertytransactions; datasource = [];
let oreorginfoo;

async function propertytransactionreport () {
    await  httpRequest('propertytransactionreport.php')
    form = document.querySelector('#propertytransactionreportform')
    
    if(form.querySelector('#matpropertytransactionstartdate'))form.querySelector('#matpropertytransactionstartdate').valueAsDate = new Date()
    if(form.querySelector('#matpropertytransactionenddate'))form.querySelector('#matpropertytransactionenddate').valueAsDate = new Date()
    
    if(form.querySelector('#submit'))  form.querySelector('#submit').addEventListener('click',  renderPropertyTransactionReport)
    document.querySelector('button#print-ptr').addEventListener('click', printPropertyTransactionReport)
    document.querySelector('button#export-ptr').addEventListener('click', exportPropertyTransactionReport)
    
    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(propertyTransactionReportsetCurrentPage)
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    await fetchPropertyTransactionReportPageData()
    await fetchPropertyDeliveryOrganizationInforeport()
    
    async function fetchPropertyDeliveryOrganizationInforeport() {
    let result = await fetchRequest('../controllers/fetchorganisationscript.php');
    if(result) {
        let parseResult  =  JSON.parse(result);
        if(parseResult.status){
            oreorginfoo = parseResult.data.data[0]
        }
    }
}
    
    function printPropertyTransactionReport() {
        if(propertytransactions.length) printContent('Property Transactions Report', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
    }

    function exportPropertyTransactionReport() {
        if(propertytransactions.length) tableToExcel('propertytransactiontable', 'property_transactions_report')
    }

    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await propertyTransactionReportsetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {propertyTransactionReportsetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }

    async function fetchPropertyTransactionReportPageData() {
        await fetchPropertyTransactionReportCustomerAccounts()
        await fetchPropertyTransactionReportPropertyAccounts()
        await retrieveAndAppendMarketers()
        await fetchPropertyTransactionReportLocations()
    }
    
    async function fetchPropertyTransactionReportLocations() {
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
    
    async function fetchPropertyTransactionReportCustomerAccounts (event) {
        showSpinner()
        let paramstr = new FormData()
        let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: paramstr, headers: new Headers()})
        let res = await result.json();
        if(res?.status) { 
            hideSpinner()
            propertycustomers= res.data?.data;
        } else hideSpinner()
    }
    
    async function fetchPropertyTransactionReportPropertyAccounts() {
        showSpinner()
        let result = await fetch('../controllers/fetchpropertyaccounts.php', {method: 'POST', body: {}, headers: new Headers()})
        let res = await result.json();
        if(res?.status) {
            hideSpinner()
            let data  =  res.data
            propertiesaccountslist =  data;
            // let options = '';
            // data?.forEach(async function(item, index){
            //     try {
            //         let customer = propertycustomers?.find( val => val.id == item.customer);
            //         if(customer) options += `
            //             <option value="${item.accountnumber}"> ${customer.firstname + ' ' + customer.lastname + ' ' + (customer.othernames == '' ? '': customer.othernames) + ' - ' + item.accountnumber + ' - ' + new Date(item.registrationdate).toLocaleDateString() } </option>
            //         `
            //     }
            //     catch(e) {console.log(e)}
                
            // })
            // if(form.querySelector('#account')) {
            //     form.querySelector('#account').innerHTML = '';
            //     form.querySelector('#account').innerHTML = '<option value="" selected="">--Select Account --</option>'+options
            // }
            
        } else  hideSpinner()
    }
    
    async function retrieveAndAppendMarketers() {
        let result = await httpJsonRequest('../controllers/fetchmarketers.php')
        if(result?.status) {
            marketersDataSource = result
            if(document.getElementById('matpropertytransactionmarketer')) document.getElementById('matpropertytransactionmarketer').innerHTML = `
                    <option value=""> -- Select item -- </option>
                `
            marketersDataSource.data?.map((item, index) => {
                try {
                    document.getElementById('matpropertytransactionmarketer').innerHTML += `
                        <option value="${item.marketer[0]['id']}">${ item.marketer[0]['firstname'] + ' ' + item.marketer[0]['lastname'] + ' ' +  item.marketer[0]['othernames'] }</option>
                    `
                }
                catch(e){}
            })
        }
    }
    
    async function renderPropertyTransactionReport(event) {
        event.target.disabled = true;
        let res = await httpJsonRequest('../controllers/fetchpropertytransactions.php', 'POST', getPropertyTransactionFormParams())
        if(res?.status) {
            event.target.disabled = false;
            propertytransactions = datasource = res.data;
            document.querySelector('#propertytransactiontable tbody')?.innerHTML === ''
            if(propertytransactions.length) setNewPaginationContext(paginationLimitInput)
        }
        else {
            if(jtabledata) jtabledata.innerHTML = '';
            event.target.disabled = false;
            callModal(res.message, 0)
        }
        
    }
    
    function propertyTransactionReportsetCurrentPage (pageNum){
        currentPage = pageNum;
        handleActivePageNumber();
        handlePageButtonsStatus();
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        if(jtabledata) jtabledata.innerHTML = '';
        if(propertytransactions.length) {
            propertytransactions.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    appendPropertyTransactionsTableRows(item, index)
                }
            })
            
            if (pageCount === currentPage) renderTablePropertyTransactionsFooter()
            else {
                try {
                    document.querySelector('#propertytransactiontable #tablefooter')?.remove()
                }
                catch(e) {console.log(e)}
            }
            
            if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#propertytransactiontable #tablefooter')){
                document.querySelector('#propertytransactiontable #tablefooter')?.remove()
                propertytransactionreportbtn.click()
                document.querySelector('button#submit').click()
            }

        }
    }
     function processpropertydelivery(ref){
        
    }
     

    async function appendPropertyTransactionsTableRows(item, index) {
        
        item.transactionrow.credit = +item.transactionrow.credit
        item.transactionrow.debit = +item.transactionrow.debit
        
                // <td>${ formatMoney(item.transactionrow.servicecharge ) } </td>
                // <td>${ item.transactionrow.credit == 0 ? '-' : formatMoney(item.transactionrow.credit) }</td>
                // <td>${ item.transactionrow.ttype }</td>
        jtabledata.innerHTML += `
            <tr class="source-row-item">
                <td>${index + 1}</td>
                <td>${formatDate(item.transactionrow.transactiondate)}</td>
                <td>${item.transactionrow.accountname}</td>
                <td>${item.transactionrow.accountnumber}</td>
                <td>${ item.transactionrow.reference}</td>
                <td>${ item.propertyitems == "" ? '' : item.propertyitems.replace(/\|/g, ',')} </td>
                <td>${ item.transactionrow.debit == 0 ? '-' : formatMoney(item.transactionrow.debit) }</td>
                <td class="no-pr">
                <div class="flex no-pr" style="align-items:center;display: flex;gap: 10px">
                    ${item.transactionrow.deliverystatus == 'DELIVERED' ?
                    `<button disabled style="padding: 5px 6px;cursor:pointer;border:1px;outline:none;font-size:10px;color:black;background-color:white;border-radius:3px;">Delivered</button>`
                    :
                    `<button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="sessionStorage.setItem('propertydelivery', '${item.transactionrow.reference}|||${item.propertyid}');document.getElementById('propertydelivery').click()">Process&nbsp;Delivery</button>`
                    }
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outlie:none;font-size:10px;color:white;background-color:green;border-radius:3px" onclick="printtransactionreportprinterer('${item.propertyitems}', '${item.transactionrow.reference}', '${item.transactionrow.transactiondate}', '${item.transactionrow.accountname} ${item.customerdetail.othernames}', '${item.customerdetail.phonenumber}', '${item.customerdetail.accountname}', '${item.customerdetail.state}', 'print', '${item.transactionrow.debit}', '${JSON.stringify(item.forcompositeitem).replaceAll('"', '|')}')">Print</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outlie:none;font-size:10px;color:white;background-color:brown;border-radius:3px" onclick="printtransactionreportprinterer('${item.propertyitems}', '${item.transactionrow.reference}', '${item.transactionrow.transactiondate}', '${item.transactionrow.accountname} ${item.customerdetail.othernames}', '${item.customerdetail.phonenumber}', '${item.customerdetail.accountname}', '${item.customerdetail.state}', 'pdf', '${item.transactionrow.debit}', '${JSON.stringify(item.forcompositeitem).replaceAll('"', '|')}')">PDF</button>
                </div>
            </td>
            </tr>
        `
    } 

    
   
    
    function renderTablePropertyTransactionsFooter () {
        let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.transactionrow.debit), 0)
        // let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.credit), 0)
        // let servcharge = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.servicecharge), 0)
     
        document.querySelector('#propertytransactiontable tbody').innerHTML += `
            <tr id="tablefooter">
                <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="6"> total </td>
                <td style="text-transform: uppercase;font-weight:bold">${formatMoney(debit)}</td>
                <td style="text-transform: uppercase;"></td>
            </tr>
        `
    }

    
    function validatePropertyTransactionForm(){
    	var flag = 1;
    	var mssg='';
    	//used for BVN instead
    	var matpropertytransactionmarketer = document.getElementById('matpropertytransactionmarketer');
        var matpropertytransactionmonth = document.getElementById('matpropertytransactionstartdate');
    	var matpropertytransactionyear = document.getElementById('matpropertytransactionenddate');
    	var matpropertytransactiontotalqty = document.getElementById('matpropertytransactiontotalqty');
    	var accounts = form.querySelector('#account')
    	
    	
    	if(matpropertytransactionmarketer.value.length < 1){
    		mssg += 'Item Name is Invalid <br />';			
    		matpropertytransactionmarketer.style.borderColor = 'red';
    		flag =0;
    	}
    	else if(matpropertytransactionmarketer.value.length  > 250){
    	    mssg += 'Item name must not more than 250 characters'
    	    matpropertytransactionmarketer.style.borderColor = 'red';
    		flag =0;
    	}
    	else{
    		matpropertytransactionmarketer.style.borderColor = 'lightgray';
    	}
    	
    	if(matpropertytransactionmonth.value.length < 1){
    		mssg += 'Date from is Invalid <br />';			
    		matpropertytransactionmonth.style.borderColor = 'red';
    		flag =0;
    	}else{
    		matpropertytransactionmonth.style.borderColor = 'lightgray';
    	}
    	
    	if(matpropertytransactionyear.value.length < 1){
    		mssg += 'Date to is Invalid <br />';			
    		matpropertytransactionyear.style.borderColor = 'red';
    		flag =0;
    	}else{
    		matpropertytransactionyear.style.borderColor = 'lightgray';
    	}
    	
    	if(flag == 0){
    		
    		var mbox = document.getElementById('messageBox');
    		mbox.innerHTML = mssg;
    		mbox.style.display = 'block';
    		mbox.style.visibility = 'visible';
    
    		setTimeout(function(){
    			mbox.style.display = 'none';
    			mbox.style.visibility = 'hidden';
    			matpropertytransactionmarketer.style.borderColor = 'lightgray';
    			matpropertytransactionmonth.style.borderColor = 'lightgray';
    			matpropertytransactionyear.style.borderColor = 'lightgray';
    			matpropertytransactiontotalqty.style.borderColor = 'lightgray';
    		
    
    		}, 2000);	
    		return false;
    	}else{ 
    		return true; 
    	}
    
    }
    
    function getPropertyTransactionFormParams(){
    	var paramstr = new FormData(form);
        return paramstr;
    }

}

async function printtransactionreportprinterer(
  itemsprop,
  ref,
  tdate,
  name,
  phone,
  address,
  state,
  action,
  paid,
  frocomposite
) {
  const frocompositeitems = JSON.parse(frocomposite.replaceAll('|', '"'));

  let items = [];
  if (itemsprop) {
    items = itemsprop
      .split('|')
      .map((dat) => {
        if (dat.length > 5) {
  // Count commas
  const commaCount = (dat.match(/,/g) || []).length;

  // If there are 4 commas (or more), remove the first comma occurrence
  if (commaCount > 2) {
    dat = dat.replace(',', '');
  }

  // Now safely split the remaining string
  let [itemname, qtyPart, pricePart] = dat.split(',');
  console.log('qtyPart', qtyPart);

  return {
    itemname: itemname.trim(),
    qty: Number(qtyPart.split(':')[1].trim()),
    price: Number(pricePart.split(':')[1].trim()),
  };
}

        return null;
      })
      .filter((item) => item !== null);
  }

  const froNamesSet = new Set(frocompositeitems.map((f) => f.itemname));

  const includedItems = items.filter((item) => froNamesSet.has(item.itemname));
  const excludedItems = items.filter((item) => !froNamesSet.has(item.itemname));

  const excludedTotalAmount = excludedItems.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const froNoPriceItems = frocompositeitems.filter(
    (item) => !item.price || item.price === 0
  );

  let rows = '';

  // Render property items (excludedItems) in blue at top, aligned columns
  if (excludedItems.length > 0) {
    excludedItems.forEach((item) => {
      rows += `
        <tr style="color: #1a3d7c; font-weight: 600;">
          <td style="padding-left: 12px;">${item.itemname}</td>
          <td style="text-align:center;">${item.qty}</td>
          <td style="text-align:center;">${formatMoney(excludedTotalAmount)}</td>
          <td style="text-align:center;">${formatMoney(excludedTotalAmount)}</td>
        </tr>
      `;
    });

    // Total amount row for excluded items
    rows += `
      <tr style="color: #1a3d7c; font-weight: 700; background: #e6f0ff;">
        <td colspan="3" style="text-align:left; padding: 12px 10px;">
          Member Items Below:
        </td>
        <td style="text-align:right; padding: 12px 10px;"></td>
      </tr>
    `;
  }

  // Frocomposite no-price items (normal styling)
  if (froNoPriceItems.length > 0) {
    froNoPriceItems.forEach((item) => {
      rows += `
        <tr>
          <td style="padding-left: 20px;">${item.itemname}</td>
          <td style="text-align:center;">${item.qty}</td>
          <td style="text-align:center; color:#888;">-</td>
          <td></td>
        </tr>
      `;
    });
  }

  // Included items normally
  if (includedItems.length > 0) {
    rows += `
      <tr style="background:#e6f0ff; font-weight:bold;">
        <td colspan="4" style="padding-left: 10px;">Included Items (With Price)</td>
      </tr>
    `;

    includedItems.forEach((item) => {
      const amount = item.price * item.qty;
      rows += `
        <tr style="border-bottom: 1px solid #ddd; transition: background-color 0.3s;">
          <td style="padding-left: 12px;">${item.itemname}</td>
          <td style="text-align:center;">${item.qty}</td>
          <td style="text-align:right;">${formatMoney(item.price)}</td>
          <td style="text-align:right;">${formatMoney(amount)}</td>
        </tr>
      `;
    });
  }

  const footer = `
    <tr style="font-weight: bold; background:#f7f7f7;">
      <td colspan="3" style="text-align:right; padding: 12px 10px;">
        SUBTOTAL <br> VAT
      </td>
      <td style="text-align:right; padding: 12px 10px;">
        ${formatMoney(paid)} <br> 0.00
      </td>
    </tr>
    <tr style="font-weight: bold;">
      <td colspan="3" style="text-align:right; padding: 12px 10px;">TOTAL</td>
      <td style="text-align:right; padding: 12px 10px;">${formatMoney(paid)}</td>
    </tr>
  `;

  const html = `
    <style>
      #printable-receipt table {
        width: 100%;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
      }
      #printable-receipt th, #printable-receipt td {
        padding: 12px 10px;
        border-bottom: 1px solid #ccc;
      }
      #printable-receipt thead tr {
        border-bottom: 3px solid #1a3d7c;
        background-color: #d1e2ff;
        color: #1a3d7c;
        font-weight: 700;
      }
      #printable-receipt tr:hover {
        background-color: #f0f5ff;
      }
      #printable-receipt .notice div {
        font-family: Arial, sans-serif;
        font-size: 0.95em;
        color: #444;
      }
    </style>

    <div class="receipt" style="padding: 40px; font-family: Arial, sans-serif;">
      <div class="reciept-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
        <div style="display:flex; gap:15px; align-items:center;">
          <span>
            <img src="${assetsUrl.logo}" alt="" style="width: 50px; height: auto;">
          </span>
          <span>
            <h1 style="margin:0; color:#1a3d7c;">${oreorginfoo.companyname}</h1>
            <div>${oreorginfoo.address}</div>
            <div>${oreorginfoo.telephone}</div>
            <div>${oreorginfoo.mobile}</div>
          </span>
        </div>
        <div style="text-align:right;">
          <div>Invoice#: <strong>${ref}</strong></div>
          <div>Issue date: ${formatDate(tdate)}</div>
        </div>
      </div>
      <div class="billing" style="display:flex; justify-content:space-between; margin-bottom:30px;">
        <div>
          <h3 style="color:#1a3d7c;">Bill to:</h3>
          <ul style="list-style:none; padding-left:0; color:#333;">
            <li>${name}</li>
            <li>${phone}</li>
            <li>${address}</li>
            <li>${state}</li>
          </ul>
        </div>
        <div>
          <h3 style="color:#1a3d7c;">Payment:</h3>
          <ul style="list-style:none; padding-left:0; color:#333;">
            <li>Date: <span>${formatDate(tdate)}</span></li>
            <li>Amount Paid: N${formatMoney(paid)}</li>
          </ul>
        </div>
      </div>
      <div class="items">
        <table border="0" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th style="text-align:left;">ITEM</th>
              <th style="text-align:center;">QTY</th>
              <th style="text-align:right;">PRICE (N)</th>
              <th style="text-align:right;">AMOUNT (N)</th>
            </tr>
          </thead>
          <tbody>
            ${rows + footer}
          </tbody>
        </table>
      </div>
      <div class="notice" style="margin-top:40px; display:flex; justify-content:space-between;">
        <div>
          <div>We appreciate you doing business with us <br><span style="font-weight:bold;">THANK YOU</span></div>
          <div>Sender: Signature & Date&nbsp;&nbsp;&nbsp;</div>
          <div>Receiver: Signature & Date:&nbsp;&nbsp;&nbsp;</div>
        </div>
      </div>
    </div>
  `;

  const div = document.createElement('div');
  div.innerHTML = html;
  div.id = 'printable-receipt';

  const existing = document.getElementById('printable-receipt');
  if (existing) existing.remove();

  document.body.appendChild(div);

  if (action === 'pdf') {
    return html2pdf(document.querySelector('.receipt'));
  } else if (action === 'print') {
    printContent(
      'Receipt',
      '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">',
      'printable-receipt'
    );
  }
}




var propertytransactionreportbtn = document.getElementById('propertytransactionreport');
if(propertytransactionreportbtn) propertytransactionreportbtn.addEventListener('click', propertytransactionreport);




// property delivery  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var paidproperties;var propertydeliverycustomers;var thepropertyidfromgrid

async function openPropertyDelivery() {  
    await httpRequest('propertydelivery.php')
    thepropertyidfromgrid = ''
    dynamiccomma(true) 
    form = document.getElementById('propertydeliveryform') 
    if(form) {
    await fetchPropertyDeliveryPageData()
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
        
        if(sessionStorage.getItem('propertydelivery')){
            let x = sessionStorage.getItem('propertydelivery')
            sessionStorage.removeItem('propertydelivery')
            document.getElementById('invoicenumber').value = x.split('|||')[0];
            thepropertyidfromgrid = x.split('|||')[1];
            document.getElementById('searchaccount').click();
        }
        
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
    showSpinner()
    let result = await fetchRequest('../controllers/fetchorganisationscript.php');
    if(result) {
        hideSpinner()
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
        paidproperties = res.data;
        let options = paidproperties.map( item => `<option value="${item.accountnumber}">` ).join('')
        form.querySelector('#propertyaccount').innerHTML = `
            <datalist id="paidprop">${options}</datalist>
        `
    }
    else hideSpinner()
}


async function retrievePropertyDeliveryInventoryItems() {
    showSpinner()
    let result = await httpJsonRequest('../controllers/fetchinventoryitemscript.php')
    if(result) {
        hideSpinner()
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
        console.log('propertydeliverycustomers', propertydeliverycustomers, res.data?.data)
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
            let options = '';
            options =  `<option value="${ res?.email}"> ${ res?.firstname + ' ' + res?.lastname + ' ' + (res.othernames == undefined ? '' : res.othernames) } </option>`
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
    console.log('propertydeliverycustomers', propertydeliverycustomers)
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
    // let findlocalaccount = await paidproperties?.find( item => item.accountnumber == form.querySelector('#propertyaccount')?.value.trim())
    
    // if(form.querySelector('#propertyaccount')?.value.trim().length < 1) return callModal('Please Select Property account', 0)
    
    // else if(!findlocalaccount) return callModal('Property not found', 0)
    
    try {
        let paramstr = new FormData()
        paramstr.append('invoicenumber', form.querySelector('#invoicenumber').value.trim())
        // paramstr.append('id', findlocalaccount.id)
        // let result = await httpJsonRequest('../controllers/fetchpropertyaccountdetail.php', 'POST', paramstr)
        let result = await httpJsonRequest('../controllers/fetchpropertydetailfordelivery.php', 'POST', paramstr)
        if(result?.status) {
            
            let data = JSON.parse(JSON.stringify(result.data));
            let customer = await findCustomerProfile(data.propertyaccount[0].customer)
            populateDeliveryForm(data.propertyaccount[0].location)
            form.querySelector('#propertyaccount').value = data.accountnumber
            
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
                            <span>${formatDate(data.propertyaccount[0].registrationdate)}</span>
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

function getProperDeliveryFormDate(findlocalaccount) {
    // let theaccount = form.querySelector('#propertyaccount')?.value.trim();
    // theaccount = theaccount.toString();
    // let findlocalaccount = await paidproperties?.find( item => item.accountnumber == theaccount)
    // console.log('data=> ', findlocalaccount, form.querySelector('#propertyaccount')?.value.trim(), paidproperties, thepropertyidfromgrid)
    if(findlocalaccount) {
        let paramstr = new FormData(form)
        paramstr.append('propertyaccount', form.querySelector('#propertyaccount').value.trim())
        paramstr.append('propertyid', findlocalaccount.id)
        paramstr.append('invoicenumber', document.getElementById('invoicenumber').value)
        return paramstr
    }else{
    // console.log('form', form)
    // console.log('form', form.querySelector('#propertyaccount').value.trim())
    // console.log('form', thepropertyidfromgrid)
    // console.log('form', document.getElementById('invoicenumber').value)
        let paramstr = new FormData(form)
        paramstr.append('propertyaccount', form.querySelector('#propertyaccount').value.trim())
        paramstr.append('propertyid', thepropertyidfromgrid)
        paramstr.append('invoicenumber', document.getElementById('invoicenumber').value)
        return paramstr
    }
    // return
}

// async function getProperDeliveryFormDate() {
//     let theaccount = form.querySelector('#propertyaccount')?.value.trim();
//     theaccount = theaccount.toString();

//     return paidproperties?.find(item => item.accountnumber == theaccount)
//         ?.then(findlocalaccount => {
//             console.log('data=> ', findlocalaccount, form.querySelector('#propertyaccount')?.value.trim(), paidproperties);
            
//             let paramstr = new FormData(form);
//             paramstr.append('propertyaccount', form.querySelector('#propertyaccount').value.trim());
//             paramstr.append('propertyid', findlocalaccount.id||thepropertyidfromgrid);
//             paramstr.append('invoicenumber', document.getElementById('invoicenumber').value);
//             return paramstr;
//         })
//         .catch(error => {
//             console.error('Error in finding property account:', error);
//             return;
//         });
// }

async function savePropertyDelivery() {
    dynamiccomma(false)
    showSpinner();
    
    let theaccount = form.querySelector('#propertyaccount')?.value.trim();
    theaccount = theaccount.toString();
    let findlocalaccount = await paidproperties?.find( item => item.accountnumber == theaccount)
    console.log('data=> ', findlocalaccount, form.querySelector('#propertyaccount')?.value.trim(), paidproperties, thepropertyidfromgrid)
    
    if(!validatePropertyDeliveryForm()){ 
		hideSpinner();
		return dynamiccomma(true); 
	}

	var request = getAjaxObject();

    request.open('POST','../controllers/deliveryscript.php',true);

    request.onreadystatechange = function(e){
        dynamiccomma(true)
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
	request.send(getProperDeliveryFormDate(findlocalaccount));

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
                        <li> ${orginfo.mobile == undefined ? '' : orginfo.mobile } </li>
                    </ul>

                    <ul>
                        <li>To</li>
                        <li>${ recieptinfo?.customer.firstname + ' ' + recieptinfo?.customer.lastname + ' ' + (recieptinfo?.customer.othernames == undefined ? '' : recieptinfo?.customer.othernames) }</li>
                    </ul>

                </div>
                <div>
                    <ul>
                        <li>${document.getElementById('invoicenumber').value}</li>
                        <li>Invoice Date: ${formatDate(new Date().toLocaleDateString())}</li>
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




// view delivery -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var deliveries; datasource = []; var viewdeliverypropertyacconts;
async function openViewDelivery() {
    
    await httpRequest('viewdelivery.php')
    
    form = document.getElementById('filterviewdeliveryform')
    
    form.querySelector('#startdate').valueAsDate = new Date()
    form.querySelector('#enddate').valueAsDate = new Date()
    
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', fetchDeliveries)
    
    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(viewDeliverysetCurrentPage)
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await viewDeliverysetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {viewDeliverysetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
    
    
    function viewDeliverysetCurrentPage (pageNum){
        currentPage = pageNum;
        handleActivePageNumber();
        handlePageButtonsStatus();
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        if(jtabledata) jtabledata.innerHTML = '';
        console.log('deliveries', deliveries)
        if(deliveries.length) {
            deliveries.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    appendViewDeliveryTableRows(item, index)
                }
            })
    
            if(document.querySelector('#viewdeliverytable tbody').innerHTML === ''){
                viewdeliverybtn.click();
                form.querySelector('button#submit').click();
            }
            
            appendViewDeliveryButtonsEventListener()
    
        }
    }
    
    function appendViewDeliveryButtonsEventListener() {
        Array.from(document.querySelectorAll('#viewdeliverytable .view-delivery')).map( button => {
            if(button) button.addEventListener('click',PreviewDelivery)
        })
        
        Array.from(document.querySelectorAll('#viewdeliverytable .return-property')).map( button => {
            if(button) button.addEventListener('click',returnProperty)
        })
    }
    
    async function appendViewDeliveryTableRows(item, index) {
        let display = 'none';
        if(document.getElementById('sessionrole').value == 'SUPERADMIN' || document.getElementById('sessionpermission').value.includes('REVERSE DELIVERY'))display= 'block'
        let loc = locationsvar?.find(value => value.id == (~~Math.abs(item.transactionrow.locationofprocessing)) )
        jtabledata.innerHTML += `
            <tr class="source-row-item">
                <td>${index + 1}</td>
                <td>${item.transactionrow.propertyaccount  ? item.transactionrow.accountname : ''}</td>
                <td>${item.transactionrow.propertyaccount  ? item.transactionrow.propertyaccount : ''}</td>
                <td>${item.propertyitems.replace(/\|/g, ',')}</td>
                <td>${item.transactionrow.reference}</td>
                <td>${formatDate(item.transactionrow.deliverydate)}</td>
                <td>${item.transactionrow.status.toLowerCase()}</td>
                <td>${item.transactionrow.additionalcharge == '-' ? '' :formatMoney(item.transactionrow.additionalcharge)}</td>
                <td>${item.transactionrow.additionalchargedescription == '' ? '' : item.transactionrow.additionalchargedescription}</td>
                <td>${item.transactionrow.refunddue == '-' ? '' : formatMoney(item.transactionrow.refunddue)}</td>
                <td>${ item.transactionrow.reasonforrefund == '' ? '' : item.transactionrow.reasonforrefund }</td>
                <td style="display: none">${loc !== undefined ?  loc.location : ''}</td>
                <td>${item.locationname}</td>
                <td>
                    <div class="flex no-pr" style="align-items:center;display: flex;gap: 10px">
                        <button name="${item.transactionrow.propertyaccount  ? item.transactionrow.accountname : ''}" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" class="view-delivery" value="${index}">View</button>
                        <button class="return-property" value="${item.transactionrow.id}||${item.transactionrow.propertyid}" style="display: ${display};padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:tomato;border-radius:3px">Return</button>
                    </div>
                </td>
            </tr>
        `
    } 

    async function returnProperty(event) {
        let id = event.target.value.split('||')[0]
        let propertyid = event.target.value.split('||')[1]
        if(!confirm(`Are you sure you want to return property?`)) return
        
        try {
            let paramstr = new FormData()
            paramstr.append('id', id)
            paramstr.append('propertyid', propertyid)
            let result = await httpJsonRequest('../controllers/returnproperty.php', 'POST', paramstr)
            if(result?.status) {
                callModal(result.result, 1)
                deliveries = datasource = deliveries.filter(item => item.id !== id )
                document.querySelector('#reversedeliverytable tbody').innerHTML = ''
                setNewPaginationContext(paginationLimitInput)
                
            }
            else { 
                callModal(result.message, 0)
            }
            
        }
        catch(e) {console.log(e)}
    }
    
    
    let recieptinfo = {};
    
    async function PreviewDelivery(event) {
        try {
            let paramstr = new FormData()
            paramstr.append('invoicenumber', deliveries[+event.target.value]?.transactionrow.invoicenumber)
         /*   let result = await httpJsonRequest('../controllers/fetchpropertyaccountdetail.php', 'POST', paramstr)*/
            let result = await httpJsonRequest('../controllers/fetchpropertybyinvoice.php', 'POST', paramstr)
            if(result?.status) {
                
                let data = JSON.parse(JSON.stringify(result.data));
                let customer = await findViewDeliveryCustomerProfile(data.propertyaccount[0].customer)
                data.ref = deliveries[+event.target.value].reference;
                customer = customer??data.customer

                recieptinfo = {customer, property: data}
    
                try {
                    let html = `
                    
                        <tr>
                            <td style="font-size:12px">
                                <span>Account Name:</span>
                                <span> ${ customer !== undefined ? (customer?.firstname + ' ' + customer?.lastname + ' ' + (customer?.othernames == '-' ? '' : customer?.othernames)) : ''} </span>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size:12px">
                                <span>ACCOUNT NUMBER:</span>
                                <span>${data.propertyaccount[0].accountnumber}</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size:12px">
                                <span>REG. DATE:</span>
                                <span>${formatDate(data.propertyaccount[0].registrationdate)}</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size:12px">
                                <span>TOTAL Items:</span>
                                <span>${ data.propertyitems.length }</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size:12px">
                                <span>TOTAL AMOUNT:</span>
                                <strong>${formatMoney(data.propertyaccount[0].totalamount)}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size:12px">
                                <span>ITEMS</span>
                            </td>
                        </tr>
                    `
                    let items = '';
                    for(let i = 0; i < data.propertyitems.length; i++) {
                         let itemname = await findViewDeliveryInventoryItem(data.propertyitems[i].itemid);
                         if(itemname) items +=  `
                            <tr>
                                <td>
                                    <span style="font-weight: bold;display:block;text-align:left; font-size:12px"> ${itemname} </span>
                                    <div style="display:flex;align-items:center;justify-content:space-between;border-bottom: 1px solid lightgray;padding: 5px 0">
                                        <span style="font-size:12px">Qty: <strong>${ data.propertyitems[i].qty }</strong></span>
                                        <span style="font-size:12px">Price: <strong> ${ formatMoney(data.propertyitems[i].price) } </strong></span>
                                    </div>
                                </td>
                            </tr>
                            `
                    }
    
                    let modalcontent = `
                        <h4 style="margin: 5px 10px 20px 10px;font-weight:bolder;text-transform:uppercase">Delivery Details</h4>
                        <table id="description" style="width: 90%;margin:0 auto;"> ${html} </table>
                        <div style="width: 90%;margin:10px auto;overflow:hidden;font-size:12px;">
                            <table style="width: 100%;"> ${items}</table>
                        </div>
                        <div class="jflex no-pr" style="justify-content:end;width: 90%;margin: 0 auto;margin-top: 20px;">
                            <span class="jcontent-between" id="print-download-btns">
                                <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-dn">print delivery note</button>
                                <button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="download-dn">PDF Delivery Note</button>
                            </span>
                        </div>
                        <div style="height: 30px;width:auto"></div>
                    `
                    openJModal(modalcontent)
                    
                    // if(document.querySelector('button#print-pd')) document.querySelector('button#print-pd').addEventListener('click', () => generatePrintReceipt('print'))
        
                    // if(document.querySelector('button#download-r')) document.querySelector('button#download-r').addEventListener('click', () => generatePrintReceipt('image'))
                    
                    if(document.querySelector('button#print-dn')) document.querySelector('button#print-dn').addEventListener('click', () => generatePrintDeliveryNote('print'))
                    
                    if(document.querySelector('button#download-dn')) document.querySelector('button#download-dn').addEventListener('click', () => generatePrintDeliveryNote('image'))
                    
                    
                }
                catch(e) {console.log(e)}
            }
            else { 
                callModal(result.message, 0)
            }
        }
        catch(e) {console.log(e)}
    }
    
    await fetchViewDeliveryPageData()


    async function fetchViewDeliveryPageData() {
        await fetchViewDeliveryPrpertyAccounts()
        await fetchDeliveryLocations()
        await fetchViewDeliveryCustomerAccounts()
        await retrieveViewDeliveryInventoryItems()
        await fetchViewDeliveryOrganizationInfo()
        await fetchDeliveries()
    }
    
    async function fetchViewDeliveryCustomerAccounts() {
        showSpinner()
        let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: {}, headers: new Headers()})
        let res = await result.json();
        if(res?.status) {
            hideSpinner()
            viewdeliverycustomers = res.data?.data;
        }
        else hideSpinner()
    }
    
    async function findViewDeliveryCustomerProfile(id) {
        var customer = await viewdeliverycustomers.find(value => value.id === id);
        return customer
    }
    
    async function findViewDeliveryInventoryItem(id) {
        var inventoryitem = await inventoryitemslist.find( value => value.id == id);
        return inventoryitem ? inventoryitem.itemname : ''
    }
    
    async function retrieveViewDeliveryInventoryItems() {
        let result = await httpJsonRequest('../controllers/fetchinventoryitemscript.php')
        if(result) {
            if(result.status) {
                inventoryitemslist = result.data.data
            }
        }
    }
    
    async function fetchViewDeliveryPrpertyAccounts(event) {
        showSpinner()
        let result = await fetch('../controllers/fetchpropertyaccounts.php', {method: 'POST', body: {}, headers: new Headers()})
        let res = await result.json();
        if(res.status) {
            viewdeliverypropertyacconts = res.data;
        }
        else {
            if(jtabledata) jtabledata.innerHTML = '';
            callModal(res.message, 0)
        }
    }

    
    async function fetchDeliveries() {
        let paramstr = new FormData(form)
        let result = await httpJsonRequest('../controllers/fetchpropertydelivery.php', 'POST', paramstr)
        if(result?.status) {
            deliveries = datasource = result.data;
            console.log('deliveries', deliveries)
            document.querySelector('#viewdeliverytable tbody').innerHTML = ''
            if(deliveries.length) setNewPaginationContext(paginationLimitInput)
        } else {
            if(jtabledata) jtabledata.innerHTML = '';
            callModal(result?.message, 0)
        }
    }
    
    async function fetchDeliveryLocations() {
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
    
    async function fetchViewDeliveryOrganizationInfo() {
        let result = await fetchRequest('../controllers/fetchorganisationscript.php');
        if(result) {
            let parseResult  =  JSON.parse(result);
            if(parseResult.status){
                orginfo = parseResult.data.data[0]
            }
        }
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
    //                         <span> Invoice#: <span>${'REF|'.concat(recieptinfo?.property.ref) }</span></span>
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
    //                 <div class="notice">
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
                <td style="font-size: 14px;"><h4 style="font-size: 15px;"> ${itemname} </h4></td>
                <td style="font-size: 14px;"></td>
                <td style="font-size: 14px;"> ${recieptinfo.property.propertyitems[i].qty} </td>
              
            </tr>
            `
    }

    // Get current timestamp
    let currentTimestamp = new Date().toLocaleString();
    
    console.log('recieptinfo', recieptinfo)

    let html = `<div class="deliverynote" style="padding: 40px; font-size: 14px;">
        <div class="note-header">
            <span>
                <img  src="${assetsUrl.logo}" alt="" style="width: 50px;height: auto">
            </span>
             <h1 style="font-size: 20px;"> Delivery Note</h1>
        </div>
        <div class="note-delivery-info">
            <div>
                <div>
                    <ul style="font-size: 14px;">
                        <li>${orginfo.companyname}</li>
                        <li> ${orginfo.address} </li>
                        <li> ${orginfo.telephone == undefined ? '' : orginfo.telephone } </li>
                        <li> ${orginfo.mobile == undefined ? '' : orginfo.mobile } </li>
                    </ul>

                    <ul style="font-size: 14px;">
                        <li>To</li>
                        <li>${ recieptinfo?.customer?.firstname + ' ' + recieptinfo?.customer?.lastname + ' ' + (recieptinfo?.customer?.othernames == undefined ? '' : recieptinfo?.customer?.othernames) }</li>
                    </ul>

                </div>
                <div>
                    <ul style="font-size: 14px;">
                        <li>${'REF|'.concat(recieptinfo?.property.ref) }</li>
                        <li>Invoice Date: ${formatDate(new Date().toLocaleDateString())}</li>
                        <li><strong>Time: ${currentTimestamp}</strong></li>
                        <li>Client Number: ${ recieptinfo?.customer.phonenumber }</li>
                        <li>Address 1: ${ recieptinfo?.customer.officeaddress + ' ' +  recieptinfo?.customer.state}</li>
                        <li>Address 2: ${ recieptinfo?.customer.homeaddress + ' ' +  recieptinfo?.customer.state}</li>
                        
                    </ul>
                </div>
            </div>
            <div>
                <h4 style="font-size: 16px;"> Additional information</h4>
                <p style="font-size: 14px;">Returns must be made within 7 days. Please use the included returns label</p>
            </div>
        </div>
        <div class="items">
            <table style="font-size: 14px;">
                <thead>
                    <tr>
                        <th style="font-size: 15px;">ITEM</th>
                        <th style="font-size: 15px;">DESCRIPTION</th>
                        <th style="font-size: 15px;">QTY</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
        <div class="note-footer" style="font-size: 14px;">
            <p style="font-size: 14px;">Goods Received by: </p>
            <div>
                <div style="font-size: 14px;">${ recieptinfo?.customer.firstname + ' ' + recieptinfo?.customer.lastname + ' ' + (recieptinfo?.customer.othernames == undefined ? '' : recieptinfo?.customer.othernames) }</div>
                <div style="font-size: 14px;">Date: </div>
                <div style="font-size: 14px;">Signature</div>
            </div>
        </div>
    </div>`
    

    let div = document.createElement('div')
    div.innerHTML = html;
    div.id = 'printable-deliverynote'
    if(document.getElementById('printable-deliverynote')) document.getElementById('printable-deliverynote').remove()
    document.body.appendChild(div)
    
   
    if(button == "image") html2pdf(document.querySelector('.deliverynote'))
    else printContent(' ', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-deliverynote')

}
}

var viewdeliverybtn = document.getElementById('viewdelivery')
if(viewdeliverybtn) viewdeliverybtn.addEventListener('click', openViewDelivery)


// Property Markup Report  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var propertymarkupreports; datasource = [];

async function openpropertymarkupreport () {
    await  httpRequest('propertymarkupreport.php')
    form = document.getElementById('propertymarkupreportreportform')
    
    form.querySelector('#matpropertymarkupreportstartdate').valueAsDate = new Date()
    form.querySelector('#matpropertymarkupreportenddate').valueAsDate = new Date()
    
    if(form.querySelector('#submit'))  form.querySelector('#submit').addEventListener('click',  renderpropertymarkupreportReport)
    document.querySelector('button#print-ptr').addEventListener('click', printpropertymarkupreportReport)
    document.querySelector('button#export-ptr').addEventListener('click', exportpropertymarkupreportReport)
    
    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(propertymarkupreportReportsetCurrentPage)
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    await fetchpropertymarkupreportReportPageData()
    
    
    
    function printpropertymarkupreportReport() {
        if(propertymarkupreports.length) printContent('Property Transactions Report', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
    }

    function exportpropertymarkupreportReport() {
        if(propertymarkupreports.length) tableToExcel('propertymarkupreporttable', 'property_transactions_report')
    }

    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await propertymarkupreportReportsetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {propertymarkupreportReportsetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }

    async function fetchpropertymarkupreportReportPageData() {
        await fetchpropertymarkupreportReportCustomerAccounts()
        await fetchpropertymarkupreportReportPropertyAccounts()
        await retrieveAndAppendMarketers()
        await fetchpropertymarkupreportReportLocations()
    }
    
    async function fetchpropertymarkupreportReportLocations() {
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
    
    async function fetchpropertymarkupreportReportCustomerAccounts (event) {
        showSpinner()
        let paramstr = new FormData()
        let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: paramstr, headers: new Headers()})
        let res = await result.json();
        if(res?.status) { 
            hideSpinner()
            propertycustomers= res.data?.data;
        } else hideSpinner()
    }
    
    async function fetchpropertymarkupreportReportPropertyAccounts() {
        showSpinner()
        let result = await fetch('../controllers/fetchpropertyaccounts.php', {method: 'POST', body: {}, headers: new Headers()})
        let res = await result.json();
        if(res?.status) {
            hideSpinner()
            let data  =  res.data
            propertiesaccountslist =  data;
            // let options = '';
            // data?.forEach(async function(item, index){
            //     try {
            //         let customer = propertycustomers?.find( val => val.id == item.customer);
            //         if(customer) options += `
            //             <option value="${item.accountnumber}"> ${customer.firstname + ' ' + customer.lastname + ' ' + (customer.othernames == '' ? '': customer.othernames) + ' - ' + item.accountnumber + ' - ' + new Date(item.registrationdate).toLocaleDateString() } </option>
            //         `
            //     }
            //     catch(e) {console.log(e)}
                
            // })
            // if(form.querySelector('#account')) {
            //     form.querySelector('#account').innerHTML = '';
            //     form.querySelector('#account').innerHTML = '<option value="" selected="">--Select Account --</option>'+options
            // }
            
        } else  hideSpinner()
    }
    
    async function retrieveAndAppendMarketers() {
        let result = await httpJsonRequest('../controllers/fetchmarketers.php')
        if(result?.status) {
            marketersDataSource = result
            if(document.getElementById('matpropertymarkupreportmarketer')) document.getElementById('matpropertymarkupreportmarketer').innerHTML = `
                    <option value=""> -- Select item -- </option>
                `
            marketersDataSource.data?.map((item, index) => {
                try {
                    document.getElementById('matpropertymarkupreportmarketer').innerHTML += `
                        <option value="${item.marketer[0]['id']}">${ item.marketer[0]['firstname'] + ' ' + item.marketer[0]['lastname'] + ' ' +  item.marketer[0]['othernames'] }</option>
                    `
                }
                catch(e){}
            })
        }
    }
    
    async function renderpropertymarkupreportReport(event) {
            // document.querySelector('#propertymarkupreporttable tbody')?.innerHTML = ''
        event.target.disabled = true;
        let res = await httpJsonRequest('../controllers/propertymarkupreport.php', 'POST', getpropertymarkupreportFormParams())
        if(res?.status) {
            event.target.disabled = false;
            propertymarkupreports = datasource = res.data;
            document.querySelector('#propertymarkupreporttable tbody').innerHTML = ''
           if(jtabledata) jtabledata.innerHTML = res.data.map((item, index)=>`
            <tr class="source-row-item">
                <td>${index + 1}</td>
                <td>${formatDate(item.transactionrow.transactiondate)}</td>
                <td>${item.transactionrow.accountname}</td>
                <td>${item.transactionrow.accountnumber}</td>
                <td>${ item.transactionrow.reference}</td>
                <td>${ item.propertyitems.replace(/\|/g, ',')}</td>
                <td>${ item.transactionrow.debit == 0 ? '-' : formatMoney(item.transactionrow.debit) }</td>
                <td>${ formatMoney(item.totalcost)}</td>
                <td>${ formatMoney(item.markup)}</td>
            </tr>
        `).join('')
        renderTablepropertymarkupreportsFooter()
        // if(jtabledata)jtabledata.innerHTML += `
        //     <tr id="tablefooter" class="">
        //         <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="6"> total </td>
        //         <td style="text-transform: uppercase;font-weight:bold">${formatMoney(debit)}</td>
        //         <td style="text-transform: uppercase;font-weight:bold">${ formatMoney(tcost) }</td>
        //         <td style="text-transform: uppercase;font-weight:bold"> ${formatMoney(markup)}</td>
        //     </tr>
        // `
            
            // if(propertymarkupreports.length) setNewPaginationContext(paginationLimitInput)
        }
        else {
            if(jtabledata) jtabledata.innerHTML = '';
            event.target.disabled = false;
            callModal(res.message, 0)
        }
        
    }
    
    function propertymarkupreportReportsetCurrentPage (pageNum){
        currentPage = pageNum;
        handleActivePageNumber();
        handlePageButtonsStatus();
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        if(jtabledata) jtabledata.innerHTML = '';
        if(propertymarkupreports.length) {
            propertymarkupreports.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    appendpropertymarkupreportsTableRows(item, index)
                }
            })
            
            if (pageCount === currentPage) renderTablepropertymarkupreportsFooter()
            else {
                try {
                    document.querySelector('#propertymarkupreporttable #tablefooter')?.remove()
                }
                catch(e) {console.log(e)}
            }
            
            if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#propertymarkupreporttable #tablefooter')){
                // document.querySelector('#propertymarkupreporttable #tablefooter')?.remove()
                // propertymarkupreportreportbtn.click()
                // document.querySelector('button#submit').click()
            }

        }
    }
     function processpropertydelivery(ref){
        
    }
     
    
    async function appendpropertymarkupreportsTableRows(item, index) {
        
        item.transactionrow.credit = +item.transactionrow.credit
        item.transactionrow.debit = +item.transactionrow.debit
        
                // <td>${ formatMoney(item.transactionrow.servicecharge ) } </td>
                // <td>${ item.transactionrow.credit == 0 ? '-' : formatMoney(item.transactionrow.credit) }</td>
                // <td>${ item.transactionrow.ttype }</td>
        jtabledata.innerHTML += `
            <tr class="source-row-item">
                <td>${index + 1}</td>
                <td>${formatDate(item.transactionrow.transactiondate)}</td>
                <td>${item.transactionrow.accountname}</td>
                <td>${item.transactionrow.accountnumber}</td>
                <td>${ item.transactionrow.reference}</td>
                <td>${ item.propertyitems.replace(/\|/g, ',')}</td>
                <td>${ item.transactionrow.debit == 0 ? '-' : formatMoney(item.transactionrow.debit) }</td>
                <td>${ formatCurrency(item.totalcost)}</td>
                <td>${ formatCurrency(item.markup)}</td>
            </tr>
        `
    } 

    
   
    
    function renderTablepropertymarkupreportsFooter () {
        let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.transactionrow.debit), 0)
        let markup = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.markup), 0)
        let tcost = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.totalcost), 0)
        // let debit = 0;
        // let markup = 0;
        // let tcost = 0;
     
        document.querySelector('#propertymarkupreporttable tbody').innerHTML += `
            <tr id="tablefooter" class="">
                <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="6"> total </td>
                <td style="text-transform: uppercase;font-weight:bold">${formatMoney(debit)}</td>
                <td style="text-transform: uppercase;font-weight:bold">${ formatMoney(tcost) }</td>
                <td style="text-transform: uppercase;font-weight:bold"> ${formatMoney(markup)}</td>
            </tr>
        `
    }

    
    function validatepropertymarkupreportForm(){
    	var flag = 1;
    	var mssg='';
    	//used for BVN instead
    	var matpropertymarkupreportmarketer = document.getElementById('matpropertymarkupreportmarketer');
        var matpropertymarkupreportmonth = document.getElementById('matpropertymarkupreportstartdate');
    	var matpropertymarkupreportyear = document.getElementById('matpropertymarkupreportenddate');
    	var matpropertymarkupreporttotalqty = document.getElementById('matpropertymarkupreporttotalqty');
    	var accounts = form.querySelector('#account')
    	
    	
    	if(matpropertymarkupreportmarketer.value.length < 1){
    		mssg += 'Item Name is Invalid <br />';			
    		matpropertymarkupreportmarketer.style.borderColor = 'red';
    		flag =0;
    	}
    	else if(matpropertymarkupreportmarketer.value.length  > 250){
    	    mssg += 'Item name must not more than 250 characters'
    	    matpropertymarkupreportmarketer.style.borderColor = 'red';
    		flag =0;
    	}
    	else{
    		matpropertymarkupreportmarketer.style.borderColor = 'lightgray';
    	}
    	
    	if(matpropertymarkupreportmonth.value.length < 1){
    		mssg += 'Date from is Invalid <br />';			
    		matpropertymarkupreportmonth.style.borderColor = 'red';
    		flag =0;
    	}else{
    		matpropertymarkupreportmonth.style.borderColor = 'lightgray';
    	}
    	
    	if(matpropertymarkupreportyear.value.length < 1){
    		mssg += 'Date to is Invalid <br />';			
    		matpropertymarkupreportyear.style.borderColor = 'red';
    		flag =0;
    	}else{
    		matpropertymarkupreportyear.style.borderColor = 'lightgray';
    	}
    	
    	if(flag == 0){
    		
    		var mbox = document.getElementById('messageBox');
    		mbox.innerHTML = mssg;
    		mbox.style.display = 'block';
    		mbox.style.visibility = 'visible';
    
    		setTimeout(function(){
    			mbox.style.display = 'none';
    			mbox.style.visibility = 'hidden';
    			matpropertymarkupreportmarketer.style.borderColor = 'lightgray';
    			matpropertymarkupreportmonth.style.borderColor = 'lightgray';
    			matpropertymarkupreportyear.style.borderColor = 'lightgray';
    			matpropertymarkupreporttotalqty.style.borderColor = 'lightgray';
    		
    
    		}, 2000);	
    		return false;
    	}else{ 
    		return true; 
    	}
    
    }
    
    function getpropertymarkupreportFormParams(){
    	var paramstr = new FormData(form);
        return paramstr;
    }

}


var propertymarkupreport = document.getElementById('propertymarkupreport')
if(propertymarkupreport) propertymarkupreport.addEventListener('click', openpropertymarkupreport)

// reverse delivery -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var deliveries = null; datasource = []; var reversedeliverypropertyacconts;

async function openReverseDelivery() {
    await httpRequest('reversedelivery.php')

    form = document.getElementById('filterreversedeliveryform')
    
    form.querySelector('#startdate').valueAsDate = new Date()
    form.querySelector('#enddate').valueAsDate = new Date()
    
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', fetchDeliveries)
    
    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(reverseDeliverysetCurrentPage)
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await reverseDeliverysetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {reverseDeliverysetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
    
    
    function reverseDeliverysetCurrentPage (pageNum){
        currentPage = pageNum;
        handleActivePageNumber();
        handlePageButtonsStatus();
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        if(jtabledata) jtabledata.innerHTML = '';
        if(deliveries.length) {
            deliveries.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    appendReverseDeliveryTableRows(item, index)
                }
            })
    
            if(document.querySelector('#reversedeliverytable tbody').innerHTML === ''){
                reversedeliverybtn.click();
                form.querySelector('button#submit').click();
            }
            
            appendReverseDeliveryButtonsEventListener()
    
        }
    }
    
    function appendReverseDeliveryButtonsEventListener() {
        Array.from(document.querySelectorAll('#reversedeliverytable .view-delivery')).map( button => {
            if(button) button.addEventListener('click',PreviewDelivery)
        })
        
        Array.from(document.querySelectorAll('#reversedeliverytable .reverse-delivery')).map( button => {
            if(button) button.addEventListener('click',reverseADelivery)
        })
    }
    
    async function appendReverseDeliveryTableRows(item, index) {
        let loc = locationsvar?.find(value => value.id == (~~Math.abs(item.locationofprocessing)) )
        jtabledata.innerHTML += `
            <tr class="source-row-item">
                <td>${index + 1}</td>
                <td>${item.transactionrow.propertyaccount ? item.transactionrow.accountname : ''}</td>
                <td>${item.transactionrow.propertyaccount ? item.transactionrow.propertyaccount : ''}</td>
                <td>${item.propertyitems.replace(/\|/g, ',')}</td>
                <td>${item.transactionrow.reference}</td>
                <td>${formatDate(item.transactionrow.deliverydate)}</td>
                <td>${item.transactionrow.status.toLowerCase()}</td>
                <td>${item.transactionrow.additionalcharge == '-' ? '' :formatMoney(item.transactionrow.additionalcharge)}</td>
                <td>${item.transactionrow.additionalchargedescription == '-' ? '' : item.additionalchargedescription}</td>
                <td>${item.transactionrow.refunddue == '-' ? '' : formatMoney(item.transactionrow.refunddue)}</td>
                <td>${ item.transactionrow.reasonforrefund == '' ? '' : item.transactionrow.reasonforrefund }</td>
                <td>${loc !== undefined ?  loc.location : ''}</td>
                <td>
                    <div class="flex no-pr" style="align-items:center;display:flex;gap:10px">
                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" class="view-delivery" value="${index}">View</button>
                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" class="reverse-delivery" value="${index}">Reverse</button>
                    </div>
                </td>
            </tr>
        `
    } 
    

   async function PreviewDelivery(event) {
    console.log('deliveries', deliveries, event.target.value)
    try {
        let paramstr = new FormData()
        paramstr.append('invoicenumber', deliveries[+event.target.value]?.transactionrow.invoicenumber)
        let result = await httpJsonRequest('../controllers/fetchpropertybyinvoice.php', 'POST', paramstr)
        if(result?.status) {
            
            let data = JSON.parse(JSON.stringify(result.data));
            let customer = await findReverseDeliveryCustomerProfile(data.propertyaccount[0].customer)
            // let customer = deliveries[+event.target.value]?.transactionrow.accountname;
                            // <span> ${ customer !== undefined ? customer : ''} </span>

            // Get current timestamp
            let currentTimestamp = new Date().toLocaleString();

            try {
                let html = `
                
                    <tr>
                        <td style="font-size:16px">
                            <span>Account Name:</span>
        <span> ${ customer !== undefined ? (customer?.firstname + ' ' + customer?.lastname + ' ' + (customer?.othernames == '-' ? '' : customer?.othernames)) : ''} </span>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:16px">
                            <span>ACCOUNT NUMBER:</span>
                            <span>${data.propertyaccount[0].accountnumber}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:16px">
                            <span>REG. DATE:</span>
                            <span>${formatDate(data.propertyaccount[0].registrationdate)}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:16px">
                            <span>TIMESTAMP:</span>
                            <span><strong>${currentTimestamp}</strong></span>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:16px">
                            <span>TOTAL Items:</span>
                            <span>${ data.propertyitems.length }</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:16px">
                            <span>TOTAL AMOUNT:</span>
                            <strong>${formatMoney(data.propertyaccount[0].totalamount)}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:16px">
                            <span>ITEMS</span>
                        </td>
                    </tr>
                `
                let items = '';
                for(let i = 0; i < data.propertyitems.length; i++) {
                     let itemname = await findReverseDeliveryInventoryItem(data.propertyitems[i].itemid);
                     if(itemname) items +=  `
                        <tr>
                            <td>
                                <span style="font-weight: bold;display:block;text-align:left; font-size:16px"> ${itemname} </span>
                                <div style="display:flex;align-items:center;justify-content:space-between;border-bottom: 1px solid lightgray;padding: 5px 0">
                                    <span style="font-size:16px">Qty: <strong>${ data.propertyitems[i].qty }</strong></span>
                                    <span style="font-size:16px">Price: <strong> ${ formatMoney(data.propertyitems[i].price) } </strong></span>
                                </div>
                            </td>
                        </tr>
                        `
                }

                let modalcontent = `
                    <h4 style="margin: 5px 10px 20px 10px;font-weight:bolder;text-transform:uppercase;font-size:18px">Delivery Details</h4>
                    <table id="description" style="width: 90%;margin:0 auto;"> ${html} </table>
                    <div style="width: 90%;margin:10px auto;overflow:hidden;font-size:16px;">
                        <table style="width: 100%;"> ${items}</table>
                    </div>
                    <div style="height: 30px;width:auto"></div>
                `
                openJModal(modalcontent)

            }
            catch(e) {console.log(e)}
        }
        else { 
            callModal(result.message, 0)
        }
    }
    catch(e) {console.log(e)}
}

    async function reverseADelivery(event) {
        
        let item = deliveries[+event.target.value]?.transactionrow.propertyaccount;
        if(!confirm(`Are you sure you want to reverse ${item} delivery?`)) return
        
        try {
            let paramstr = new FormData()
            paramstr.append('propertyaccount', deliveries[+event.target.value]?.transactionrow.propertyaccount)
            paramstr.append('id', deliveries[+event.target.value]?.transactionrow.id)
            let result = await httpJsonRequest('../controllers/reversedelivery.php', 'POST', paramstr)
            if(result?.status) {
                callModal(result.result, 1)
                deliveries = datasource = deliveries.filter(item => item.propertyaccount !== deliveries[+event.target.value]?.transactionrow.propertyaccount)
                document.querySelector('#reversedeliverytable tbody').innerHTML = ''
                setNewPaginationContext(paginationLimitInput)
                fetchDeliveries()
                
            }
            else { 
                callModal(result.message, 0)
            }
            
        }
        catch(e) {console.log(e)}
    }
    
    await fetchReverseDeliveryPageData()


    async function fetchReverseDeliveryPageData() {
        await fetchReverseDeliveryPrpertyAccounts()
        await fetchDeliveryLocations()
        await fetchReverseDeliveryCustomerAccounts()
        await retrieveReverseDeliveryInventoryItems()
        await fetchDeliveries()
    }
    
    async function fetchReverseDeliveryCustomerAccounts() {
        showSpinner()
        let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: {}, headers: new Headers()})
        let res = await result.json();
        if(res?.status) {
            hideSpinner()
            reversedeliverycustomers = res.data?.data;
        }
        else hideSpinner()
    }
    
    async function findReverseDeliveryCustomerProfile(id) {
        var customer = await reversedeliverycustomers.find(value => value.id === id);
        return customer
    }
    
    async function findReverseDeliveryInventoryItem(id) {
        var inventoryitem = await inventoryitemslist.find( value => value.id == id);
        return inventoryitem ? inventoryitem.itemname : ''
    }
    
    async function retrieveReverseDeliveryInventoryItems() {
        let result = await httpJsonRequest('../controllers/fetchinventoryitemscript.php')
        if(result) {
            if(result.status) {
                inventoryitemslist = result.data.data
            }
        }
    }
    
    async function fetchReverseDeliveryPrpertyAccounts(event) {
        showSpinner()
        let result = await fetch('../controllers/fetchpropertyaccounts.php', {method: 'POST', body: {}, headers: new Headers()})
        let res = await result.json();
        if(res.status) {
            reversedeliverypropertyacconts = res.data;
        }
        else {
            if(jtabledata) jtabledata.innerHTML = '';
            callModal(res.message, 0)
        }
    }

    
    async function fetchDeliveries() {
        let paramstr = new FormData(form)
        let result = await httpJsonRequest('../controllers/fetchpropertydelivery.php', 'POST', paramstr)
        if(result?.status) {
            deliveries = datasource = result.data;
            document.querySelector('#reversedeliverytable tbody').innerHTML = ''
            if(deliveries.length) setNewPaginationContext(paginationLimitInput)
        }
        else {
            if(jtabledata) jtabledata.innerHTML = '';
            callModal(result?.message, 0)
        }
    }
    
    async function fetchDeliveryLocations() {
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
    
}


var reversedeliverybtn = document.getElementById('reversedelivery')
if(reversedeliverybtn) reversedeliverybtn.addEventListener('click', openReverseDelivery)


// property stock outtake report------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
datasource = [];
var itemsDatasource = null;
var propertystockoutDatasource = null
var inventoryitemslist = []
var form;

async function propertystockout() {
    await httpRequest('propertystockouttakereport.php')
    if(document.getElementById('matpropertystockoutviewbtn'))  document.getElementById('matpropertystockoutviewbtn').addEventListener('click', renderReport)
    form = document.getElementById('propertystockoutform')
    if(form) {
        form.querySelector('#matpropertystockoutto').valueAsDate = new Date()
        form.querySelector('#matpropertystockoutfrom').valueAsDate = new Date()
    }
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(propertyStockoutsetCurrentPage)
    
    await fetchPropertyStockoutPageData()
}

async function fetchPropertyStockoutPageData() {
    await retrieveInventoryItems()
    // await retrieveAndAppendItems()
}

async function retrieveInventoryItems() {
    let result = await httpJsonRequest('../controllers/fetchinventoryitemscript.php')
    if(result) {
        if(result.status) {
            inventoryitemslist = result.data.data
        }
    }
}

async function retrieveAndAppendItems() {
    let result =  await httpJsonRequest('../controllers/fetchpropertyitems.php')
    if(result?.status) {
        itemsDatasource = result;
        if(document.getElementById('matpropertystockoutitemname')) document.getElementById('matpropertystockoutitemname').innerHTML = `
                <option value=""> -- Select item -- </option>
            `
        itemsDatasource.data.data.map((item, index) => {
            try {
                let inventoryitem = inventoryitemslist.find( value => value.id == item.itemid)
                document.getElementById('matpropertystockoutitemname').innerHTML += `
                    <option value="${item.id}">${inventoryitem?.itemname + ' - ' + item.accountnumber}</option>
                `
            }
            catch(e){}
        })
    }
}

async function renderReport() {
    let result = await httpJsonRequest('../controllers/fetchpropertyoutstock.php', 'POST', getPropertyStockoutFormParams())
    if(result?.status) {
        propertystockoutDatasource = datasource = result.data;
        propertystockoutDatasource.length && initPagination(propertystockoutDatasource, propertyStockoutsetCurrentPage)
    }
    else callModal(result?.message)
    
}

function propertyStockoutsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(propertystockoutDatasource.length) {
        propertystockoutDatasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendPropetyStockTableRows(item, index)
            }
        })
        if(document.querySelector('#propertystockouttable tbody').innerHTML === '') matPropertystockout.click()
    }
}

async function appendPropetyStockTableRows(item, index) {
    inventorydetails = item.inventorydetail.map( inventory => {
                        let inventoryitem = inventoryitemslist.find( value => value.id == inventory.itemid)
                        return  `<tr>
                                    <td>${inventoryitem.itemname}</td>
                                    <td>${ formatMoney(inventory.cost) }</td>
                                    <td>${ inventory.qtyin}</td>
                                    <td>${ inventory.qtyout}</td>
                                </tr>`
                    }).join('')
                    
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ item.accountnumber }</td>
            <td>${ item.firstname + ' ' + item.lastname}</td>
            <td>${formatDate(item.deliverydate)} </td>
            <td>
                <table>
                    <tr>
                        <th>Item Name</th>
                        <th>Cost</th>
                        <th>qty in</th>
                        <th>qty out</th>
                    </tr>
                    ${inventorydetails}
                </table>
            </td>
        </tr>
    `
}

function getPropertyStockoutFormParams(){
	var paramstr = new FormData(form);
   return paramstr;

}

var matPropertystockout = document.getElementById("propertystockout");
if (matPropertystockout) matPropertystockout.addEventListener("click", propertystockout, false);




// property deposit analysis -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let originaldatafour = []; 
let originalmonths4 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let originaldataone4 = [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3];
let originaldatafour4 = []; 
let originalyear4 = '2023';
let originaltype4 = 'line'

const updatefourdatafromcontroller=(result)=>{
    originaldataone4 = []
    result.data.map(data=>{
        originaldataone4.push(data.totalcredit == null ? 0 : Number(data.totalcredit))
    })
    callChartfourFilter4()
}

function getLastFiveYearsfour() {
  const currentYear = new Date().getFullYear(); // Get the current year
  const years = [currentYear]; // Initialize the array with the current year
  
  // Add the last five years to the array
  for (let i = 1; i <= 5; i++) {
    years.push(currentYear - i);
  }

  return years;
}


async function openpropertydepositanalysisfour () {
    await httpRequest('propertydepositanalysis.php', 'override');
    
    let yarray = getLastFiveYearsfour();
    yarray.map((data, index)=>{
        document.getElementById('threedselectyear4').innerHTML += `<option ${index == 0 ? 'selected' : ''}>${data}</option>`
    }).join('')
    originalyear4 = document.getElementById('threedselectyear4').value
    
    
    if(document.getElementById('threedselectmonth4'))document.getElementById('threedselectmonth4').addEventListener('change', e=>callChartfourFilter4(), true)
    if(document.getElementById('threedselectyear4'))document.getElementById('threedselectyear4').addEventListener('change', e=>callChartfourFilter4('year'), true)
    if(document.getElementById('threedselectchart4'))document.getElementById('threedselectchart4').addEventListener('change', e=>callChartfourFilter4(), true)
    
    
    callController('propertydepositanalysis.php', null, 'propertydepositanalysis', null, updatefourdatafromcontroller)
}

const callChartfourFilter4 =(year)=>{
    if(year == 'year'){
        function paramsyear(){
            let paramstr = new FormData();
            paramstr.append('year', document.getElementById('threedselectyear4').value);
            return paramstr;
        }
        callController('propertydepositanalysis.php', paramsyear(), 'propertydepositanalysis', null, updatefourdatafromcontroller)
    }
    let updatemonths4 =  originalmonths4;
    let updatedataone4 = originaldataone4;
    let updatedatafour4 = originaldatafour4;
    let updateyear4 = originalyear4;
    let updatetype4 = originaltype4;
    
    // FOR MONTH SELECT
    if(document.getElementById('threedselectmonth4').value == 'FULL YEAR'){
        updatemonths4 = originalmonths4
        updatedataone4 = updatedataone4
        updatedatafour4 = updatedatafour4
    };
    if(document.getElementById('threedselectmonth4').value == '1ST HALF OF THE YEAR'){
        updatemonths4 = originalmonths4.slice(0, 6)
        updatedataone4 = updatedataone4.slice(0, 6)
        updatedatafour4 = updatedatafour4.slice(0, 6)
    };
    if(document.getElementById('threedselectmonth4').value == '2ND HALF OF THE YEAR'){
        updatemonths4 = originalmonths4.slice(6, 12)
        updatedataone4 = updatedataone4.slice(6, 12)
        updatedatafour4 = updatedatafour4.slice(6, 12)
    };
    if(document.getElementById('threedselectmonth4').value == '1ST QUARTER OF THE YEAR'){
        updatemonths4 = originalmonths4.slice(0, 3)
        updatedataone4 = updatedataone4.slice(0, 3)
        updatedatafour4 = updatedatafour4.slice(0, 3)
    };
    if(document.getElementById('threedselectmonth4').value == '2ND QUARTER OF THE YEAR'){
        updatemonths4 = originalmonths4.slice(3, 6)
        updatedataone4 = updatedataone4.slice(3, 6)
        updatedatafour4 = updatedatafour4.slice(3, 6)
    };
    if(document.getElementById('threedselectmonth4').value == '3RD QUARTER OF THE YEAR'){
        updatemonths4 = originalmonths4.slice(6, 9)
        updatedataone4 = updatedataone4.slice(6, 9)
        updatedatafour4 = updatedatafour4.slice(6, 9)
    };
    if(document.getElementById('threedselectmonth4').value == 'LAST QUARTER OF THE YEAR'){
        updatemonths4 = originalmonths4.slice(9, 12)
        updatedataone4 = updatedataone4.slice(9, 12)
        updatedatafour4 = updatedatafour4.slice(9, 12)
    };
    
    // FOR YEAR SELECT
    updateyear4 = document.getElementById('threedselectyear4').value;
    
    // FOR CHART TYPE
    updatetype4 = document.getElementById('threedselectchart4').value;
    
    callchartfour(updatemonths4, updatedataone4, updatedatafour4, updateyear4, updatetype4, 'destroy');
}

const callchartfour = (labal, data1, data2, year, typer, destroyer) =>{
    const ctx = document.getElementById('myChartfour');
    // if(destroyer == 'destroy')ctx.destroy();
            // Get the Chart.js instance from the canvas element
        const chartInstance = Chart.getChart(ctx);
        
        // Call the `destroy` method of the Chart.js instance
        if (chartInstance) {
          chartInstance.destroy();
        }
    let delayed;
    new Chart(ctx, {
    type: typer,
    data: {
      labels: labal,
      datasets: [{
        label: 'No. of Savings',
        data: data1,
        borderWidth: 1
      },{
        label: 'Amounts Saved',
        data: data2,
        borderWidth: 1
      }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        height: 300,
        plugins: {
      title: {
        display: true,
        text: `Property Deposit Analysis ` ,
      },
      subtitle: {
        display: true,
        text: 'Click on the tab below to filter',
        color: 'blue',
        font: {
          size: 12,
          family: 'tahoma',
          weight: 'normal',
          style: 'italic'
        },
        padding: {
          bottom: 10
        }
       }
      },
         animation: {
              onComplete: () => {
                delayed = true;
              },
              delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                  delay = context.dataIndex * 600 + context.datasetIndex * 500;
                }
                return delay;
              },
        },
        scales: {
            x: {
        display: true,
        title: {
          display: true,
          text: year,
          color: '#911',
          font: {
            family: 'Comic Sans MS',
            size: 15,
            weight: 'bold',
            lineHeight: 1,
          },
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        }
      },
      y: {
         beginAtZero: true,
        // display: true,
        // title: {
        //   display: true,
        //   text: 'Value',
        //   color: '#191',
        //   font: {
        //     family: 'Times',
        //     size: 15,
        //     style: 'normal',
        //     lineHeight: 1
        //   },
        //   padding: {top: 30, left: 0, right: 0, bottom: 0}
        // }
      }
        }
    }
  });
}



var propertydepositanalysis = document.getElementById('propertydepositanalysis')
if(propertydepositanalysis) propertydepositanalysis.addEventListener('click', openpropertydepositanalysisfour, false)


// property deposit status -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = []; var propertydepositstatuses; 

var pdschartdata = {}

const pdsconfig = {
  type: 'bar',
  data: pdschartdata,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    height: 400,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Percentage levels of property account payments'
      }
    }
  },
};

async function openPropertyDepositStatus() {
    await httpRequest('propertydepositstatus.php')
    
    form = document.getElementById('filterpropertydepositstatusform')

    if(document.querySelector('button#submit')) document.querySelector('button#submit').addEventListener('click', generatePropertyDepositStatusReport)
    document.querySelector('button#print-pds').addEventListener('click', printPropertyDepositStatusTable)
    document.querySelector('button#export-pds').addEventListener('click', exportPropertyDepositStatusTable)
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(propertyDepositStatusSetCurrentPage)
    
}

function plotPdsChart(propertydepositstatuses) {
    
    let ctx =  document.getElementById('pdschart')
    pdschartdata.labels = propertydepositstatuses.map( item => item.accountnumber )
    var dataset =  propertydepositstatuses.map( item => item.paidpercentage )
    pdschartdata.datasets = [
        {
            label: 'Property Deposit', 
            data: dataset, 
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: ['rgb(54, 162, 235)'],
            borderWidth: 1
            
        }
    ]
    
    destroyPdsChart()
    new Chart(ctx, pdsconfig)
}

function destroyPdsChart() {
    let ctx =  document.getElementById('pdschart')
    const chartInstance = Chart.getChart(ctx);
    if (chartInstance) {
        chartInstance.destroy();
        // chartInstance?.clear();
    }
}

function printPropertyDepositStatusTable() {
    if(propertydepositstatuses.length) printContent('Property Deposit Status', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportPropertyDepositStatusTable() {
    if(propertydepositstatuses.length) tableToExcel('propertydepositstatustable', 'property_deposit_status')
}

async function generatePropertyDepositStatusReport() {
    let paramstr = new FormData(form)
    let result = await httpJsonRequest('../controllers/propertydepositstatus.php', 'POST', paramstr)
    if(result.status) {
        propertydepositstatuses = datasource = result.data;
        if(propertydepositstatuses.length) {
            initPagination(propertydepositstatuses, propertyDepositStatusSetCurrentPage)
            plotPdsChart(propertydepositstatuses)
        }
        else {
            callModal('No records returned')
            destroyPdsChart()
        }
    }
    else {
        if(jtabledata) jtabledata.innerHTML = '';
        callModal(result.message, 0)
        destroyPdsChart()
    }
}


function propertyDepositStatusSetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(propertydepositstatuses.length) {
        propertydepositstatuses.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendPropertyDepositStatusesTableRows(item, index)
            }
        })
        if(document.querySelector('#propertydepositstatustable tbody').innerHTML === '') openPropertyDepositStatus()
    }
}

async function appendPropertyDepositStatusesTableRows(item, index) {
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.accountnumber}</td>
            <td>${item.accountname}</td>
            <td>${formatDate(item.registrationdate)}</td>
            <td>${formatDate(item.expectedmaturitydate)}</td>
            <td>${item.totalamount == '-1' ? '-' : formatMoney(Math.abs(item.totalamount)) }</td>
            <td>${item.paidamount == '-1' ? '-' :  formatMoney(Math.abs(item.paidamount))}</td>
            <td>${item.paidpercentage !== undefined ? (item.paidpercentage + '%') :  '' }</td>
            <td>${item.stockstatus}</td>
            <td class="flex no-pr">
                <div style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" value="${index}" onclick="acquirePropertyAccount(${index})">Acquire</button>
                </div>
            </td>
        </tr>
    `
} 

async function acquirePropertyAccount(index) {
    let selecteditem = propertydepositstatuses[index]
    if(confirm('Are you sure you want to proceed?')) {
        if(selecteditem) {
            let paramstr = new FormData()
            paramstr.append('stockstatus', 'ACQUIRED')
            paramstr.append('accountnumber', selecteditem?.accountnumber)
            paramstr.append('propertyid', selecteditem?.propertyid)
            
            let result = await httpJsonRequest('../controllers/togglepropertyacquisition.php', 'POST', paramstr)
            if(result) {
                let res = JSON.parse(JSON.stringify(result))
                /*console.log(result, res, res.status)*/
                if(res.status) {
                    callModal('Property status saved successfully', 1)
                    generatePropertyDepositStatusReport()
                }
                else return callModal(res.message, 0)
            }
            else return callModal('Error: Unable to complete task', 0)
        }
    }
}


var propertydepositstatusbtn = document.getElementById('propertydepositstatus')
if(propertydepositstatusbtn) propertydepositstatus.addEventListener('click', openPropertyDepositStatus, false)


// property commissions-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = [];
async function openPropertyCommissions() {
    await httpRequest('propertycommissions.php')
    
    form = document.getElementById('filterpropertycommissionsform')
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generatePropertyCommissions)

    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(propertyCommissionssetCurrentPage)
    await retrievePropertyCommissionsInventoryItems()
    await fetchPropertycommissionLocations()
    await fetchSavingsAccountUsers('', 'accountofficerlist')
}

async function fetchPropertycommissionLocations() {
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

function printPropertyCommissions() {
    if(propertycommissions.length) printContent('Property Commissions', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportPropertyCommissions() {
    if(propertycommissions.length) tableToExcel('propertycommissionstable', 'excess_cash_report')
}


async function generatePropertyCommissions(event) {
    showSpinner()
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/propertycommisionsreport.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        event.target.disabled = false;
        propertycommissions = datasource = res.data;
        if(propertycommissions.length) initPagination(res.data, propertyCommissionssetCurrentPage)
        else callModal('No records retrieved')
    }
    else {
        hideSpinner()
        if(jtabledata) jtabledata.innerHTML = '';
        event.target.disabled = false;
        callModal(res.message, 0)
    }
}

function propertyCommissionssetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(propertycommissions.length) {
        propertycommissions.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendPropertyCommissionsTableRows(item, index)
            }
        })
                jtabledata.innerHTML += `
                                        <tr class="source-row-item">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td style="text-align:left">${formatMoney(propertycommissions.reduce((sum, item)=>sum+Number(item.commission), 0))}</td>
                                            <td style="text-align:left">${formatMoney(propertycommissions.reduce((sum, item)=>sum+Number(item.productvalue), 0))}</td>
                                        </tr>
                                    `
        
        if(document.querySelector('#propertycommissionstable tbody').innerHTML === ''){
            // propertycommissionsbtn.click()
            // form.querySelector('button#submit').click()
        }
    }
}

async function retrievePropertyCommissionsInventoryItems() {
        let result = await httpJsonRequest('../controllers/fetchinventoryitemscript.php')
        if(result) {
            if(result.status) {
                inventoryitemslist = result.data.data
            }
        }
    }

async function appendPropertyCommissionsTableRows(item, index) {
    // console.log('products', products)
    let products
    let productt
    productt = item.itemdata 
    // let inventoryitem = inventoryitemslist.filter( value => value.itemid == product.itemid)[0]
    // console.log(inventoryitemslist, inventoryitem)
    products = productt.map(product=>`<tr>
               <td>${product.itemname}</td>   
               <td>${product.qty}</td> 
               <td style="text-align:left">${formatMoney(product.price)}</td> 
               <td style="text-align:left;display: none">${formatMoney(product.cost)}</td> 
               <td style="text-align:left">${formatMoney(product.amount)}</td> 
            </tr>`).join('')
        
    jtabledata.innerHTML += `
        <tr class="source-row-item"> 
            <td>${index + 1}</td>
            <td>${item.accountnumber}</td>
            <td>${item.accountname}</td>
            <td>${formatDate(item.registrationdate)}</td>
            <td>${item.invoicenumber ?? ''}</td>
            <td>${item.location}</td>
            <td>
                <table>
                    <tr>
                        <th>Items</th> 
                        <th>Qty</th>
                        <th>Price</th>
                        <th style="display: none">Cost</th>
                        <th>Amount</th>
                    </tr>
                    ${products}
                </table>
            </td>
            <td>${item.marketer}</td>
            <td style="text-align:left">${formatMoney(item.commission)}</td>
            <td style="text-align:left">${formatMoney(item.productvalue)}</td>
        </tr>
    `
} 


var propertycommissionsbtn = document.getElementById('propertycommissions')
if(propertycommissionsbtn) propertycommissionsbtn.addEventListener('click', openPropertyCommissions)


// property ledger-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var propertyledgerlist; datasource = [];
async function openPropertyLedger() {
    
    await httpRequest('propertyledger.php')
    
    form = document.getElementById('filterpropertyledgerform')
    
    form.querySelector('#startdate').valueAsDate = new Date()
    form.querySelector('#enddate').valueAsDate = new Date()
    
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generatePropertyLedgerReport)
    
    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(propertyLedgersetCurrentPage)
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await propertyLedgersetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {propertyLedgersetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
    
    function propertyLedgersetCurrentPage (pageNum){
        currentPage = pageNum;
        handleActivePageNumber();
        handlePageButtonsStatus();
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        if(jtabledata) jtabledata.innerHTML = '';
        if(propertyledgerlist.length) {
            propertyledgerlist.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    appendPropertyLedgerTableRows(item, index)
                }
            })
    
            if(document.querySelector('#propertyledgertable tbody').innerHTML === ''){
                propertyledgerbtn.click();
                form.querySelector('button#submit').click();
            }
            
            appendLedgerButtonsEventListener()

        }
    }

    async function appendPropertyLedgerTableRows(item, index) {

        products = item.products.map( product => {
            let inventoryitem = inventoryitemslist.find( value => value.id == product.itemid)
            return  `<tr>
                   <td>${inventoryitem.itemname}</td> 
                   <td>${product.qty}</td> 
                   <td style="text-align:left">${formatMoney(product.price)}</td> 
                   <td style="text-align:left">${formatMoney(product.cost)}</td> 
                   <td style="text-align:left">${formatMoney(product.amount)}</td> 
                </tr>`
        })
        
        jtabledata.innerHTML += `
            <tr class="source-row-item">
                <td>${index + 1}</td>
                <td>${item.accountnumber}</td>
                <td>${item.accountname}</td>
                <td>${formatDate(item.registrationdate)}</td>
                <td>${item.invoicenumber ?? ''}</td>
                <td>${item.status}</td>
                <td>${item.location}</td>
                <td>
                    <table>
                        <tr>
                            <th>Title</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Cost</th>
                            <th>Amount</th>
                        </tr>
                        ${products}
                    </table>
                </td>
                <td style="text-align:left">${formatMoney(item.costvalue)}</td>
                <td style="text-align:left">${formatMoney(item.paidvalue)}</td>
                <td style="text-align:left" >${formatMoney(item.balance)}</td>
                <td style="text-align:left">${item.servicecharge == null ? '' : formatMoney(item.servicecharge)}</td>
               
                <td class="flex no-pr">
                    <div style="align-items:center">
                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" class="view-property" value="${index}">View</button>
                    </div>
                </td>
            </tr>
        `
    } 
     
    async function retrieveLedgerInventoryItems() {
        let result = await httpJsonRequest('../controllers/fetchinventoryitemscript.php')
        if(result) {
            if(result.status) {
                inventoryitemslist = result.data.data
            }
        }
    }
    
    async function generatePropertyLedgerReport() {
        let paramstr = new FormData(form)
        let result = await httpJsonRequest('../controllers/fetchpropertyledger.php', 'POST', paramstr)
        if(result?.status) {
            propertyledgerlist = datasource = result.data;
            document.querySelector('#propertyledgertable tbody').innerHTML = ''
            if(propertyledgerlist.length) setNewPaginationContext(paginationLimitInput)
            else callModal('No records retrieved')
        }
        else {
            if(jtabledata) jtabledata.innerHTML = '';
            callModal(result?.message, 0)
        }
    }
    
    await retrieveLedgerInventoryItems()
    let ledgerinvoicedata = {};
    
    function appendLedgerButtonsEventListener() {
        Array.from(document.querySelectorAll('#propertyledgertable .view-property')).map( button => {
            if(button) button.addEventListener('click',openLedgerInvoice)
        })
    }
    
    async function openLedgerInvoice(event) {
        await fetchLedgerCustomerAccounts();
        await fetchledgerOrganizationInfo()
        
        try {
           
            let paramstr = new FormData()
            paramstr.append('accountnumber', propertyledgerlist[+event.target.value].accountnumber)
            let result = await httpJsonRequest('../controllers/fetchpropertyaccountdetail.php', 'POST', paramstr)
            if(result?.status) {
                
                let data = JSON.parse(JSON.stringify(result.data));
                let customer = await findLedgerCustomerProfile(data.propertyaccount[0].customer)
                data.ref = propertyledgerlist[+event.target.value].invoicenumber

                ledgerinvoicedata = {customer, property: data}
    
                try {

                    let modalcontent = `
                        <h4 style="margin: 5px 10px 20px 10px;font-weight:bolder;text-transform:uppercase">Property options</h4>
                        <div class="jflex no-pr" style="justify-content:center;width: 90%;margin: 0 auto;margin-top: 20px;">
                            <span class="jcontent-between" id="print-download-btns">
                                <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-pd">print reciept</button>
                                <button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="download-r">PDF Receipt</button>
                            </span>
                        </div>
                        <div style="height: 30px;width:auto"></div>
                    `
                    
                    openJModal(modalcontent)
                    
                    if(document.querySelector('button#print-pd')) document.querySelector('button#print-pd').addEventListener('click', () => printLedgerReceipt('print'))
        
                    if(document.querySelector('button#download-r')) document.querySelector('button#download-r').addEventListener('click', () => printLedgerReceipt('image'))
                    
                    // if(document.querySelector('button#print-dn')) document.querySelector('button#print-dn').addEventListener('click', () => printLedgerDeliveryNote('print'))
                    
                    // if(document.querySelector('button#download-dn')) document.querySelector('button#download-dn').addEventListener('click', () => printLedgerDeliveryNote('image'))
                    
                    
                }
                catch(e) {console.log(e)}
            }
            else { 
                callModal(result.message, 0)
            }
        }
        catch(e) {console.log(e)}
    }
    
    async function fetchledgerOrganizationInfo() {
        let result = await fetchRequest('../controllers/fetchorganisationscript.php');
        if(result) {
            let parseResult  =  JSON.parse(result);
            if(parseResult.status){
                orginfo = parseResult.data.data[0]
            }
        }
    }
    
    async function fetchLedgerCustomerAccounts() {
        showSpinner()
        let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: {}, headers: new Headers()})
        let res = await result.json();
        if(res?.status) {
            hideSpinner()
            viewdeliverycustomers = res.data?.data;
        }
        else hideSpinner()
    }
    
    async function findLedgerCustomerProfile(id) {
        var customer = await viewdeliverycustomers.find(value => value.id === id);
        return customer
    }
    
    async function printLedgerReceipt(button) {
        let rows = ''
        total = 0;
        for(let i = 0; i < ledgerinvoicedata.property.propertyitems.length; i++) {
             let itemname = await findInventoryItem(ledgerinvoicedata.property.propertyitems[i].itemid);
             total += (+ledgerinvoicedata.property.propertyitems[i].price) * (+ledgerinvoicedata.property.propertyitems[i].qty)
             if(itemname) rows +=  `
                <tr>
                    <td>
                        <h4> ${itemname} </h4>
                        <p> </p>
                    </td>
                    <td> ${ledgerinvoicedata.property.propertyitems[i].qty} </td>
                    <td> ${formatMoney(ledgerinvoicedata.property.propertyitems[i].price)} </td>
                    <td> ${formatMoney( (+ledgerinvoicedata.property.propertyitems[i].price) * (+ledgerinvoicedata.property.propertyitems[i].qty) )} </td>
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
                                <span> ${orginfo.telephone} </span>
                                <span> ${orginfo.mobile} </span>
                            </span>
                        </div>
                        <div>
                            <span> Invoice#: <span>${ledgerinvoicedata?.property.ref}</span></span>
                            issue date: ${formatDate(new Date().toLocaleDateString())}
                        </div>
                    </div>
                    <div class="billing">
                        <div>
                            <h3> Bill to:</h3>
                            <ul>
                                <li>${ ledgerinvoicedata?.customer.firstname + ' ' + ledgerinvoicedata?.customer.lastname + ' ' + (ledgerinvoicedata?.customer.othernames == undefined ? '' : ledgerinvoicedata?.customer.othernames) }</li>
                                <li>${ ledgerinvoicedata?.customer.phonenumber }</li>
                                <li>${ ledgerinvoicedata?.customer.officeaddress + ' ' +  ledgerinvoicedata?.customer.state} </li>
                                <li>${ ledgerinvoicedata?.customer.homeaddress + ' ' +  ledgerinvoicedata?.customer.state}</li>
                            </ul>
                        </div>
                        <div>
                            <h3> Payment: </h3>
                            <ul>
                                <li>Date: <span>${formatDate(new Date().toLocaleDateString())}</span></li>
                                <li>N ${formatMoney(ledgerinvoicedata?.property.propertyaccount[0].totalamount)}</li>
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
    
    // async function printLedgerDeliveryNote(button) {
    
    //     let rows = ''
    //     for(let i = 0; i < ledgerinvoicedata.property.propertyitems.length; i++) {
    //          let itemname = await findInventoryItem(ledgerinvoicedata.property.propertyitems[i].itemid);
    //          if(itemname) rows +=  `
    //             <tr>
    //                 <td><h4> ${itemname} </h4></td>
    //                 <td></td>
    //                 <td> ${ledgerinvoicedata.property.propertyitems[i].qty} </td>
                  
    //             </tr>
    //             `
    //     }

    //     let html = `<div class="deliverynote" style="padding: 40px">
    //         <div class="note-header">
    //             <span>
    //                 <img  src="${assetsUrl.logo}" alt="" style="width: 50px;height: auto">
    //             </span>
    //              <h1> Delivery Note</h1>
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
    //                         <li>${ ledgerinvoicedata?.customer.firstname + ' ' + ledgerinvoicedata?.customer.lastname + ' ' + (ledgerinvoicedata?.customer.othernames == undefined ? '' : ledgerinvoicedata?.customer.othernames) }</li>
    //                     </ul>
    
    //                 </div>
    //                 <div>
    //                     <ul>
    //                         <li>${ ledgerinvoicedata?.property.ref }</li>
    //                         <li>Invoice Date: ${new Date().toLocaleDateString()}</li>
    //                         <li>client Number: ${ ledgerinvoicedata?.customer.phonenumber }</li>
    //                         <li>Adress 1: ${ ledgerinvoicedata?.customer.officeaddress + ' ' +  ledgerinvoicedata?.customer.state}</li>
    //                         <li>Adress 2: ${ ledgerinvoicedata?.customer.homeaddress + ' ' +  ledgerinvoicedata?.customer.state}</li>
                            
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
    //                 <div>${ ledgerinvoicedata?.customer.firstname + ' ' + ledgerinvoicedata?.customer.lastname + ' ' + (ledgerinvoicedata?.customer.othernames == undefined ? '' : ledgerinvoicedata?.customer.othernames) }</div>
    //                 <div>Date: </div>
    //                 <div>Signature</div>
    //             </div>
    //         </div>
    //     </div>`
        
    
    //     let div = document.createElement('div')
    //     div.innerHTML = html;
    //     div.id = 'printable-deliverynote'
    //     if(document.getElementById('printable-deliverynote')) document.getElementById('printable-deliverynote').remove()
    //     document.body.appendChild(div)
        
    //     if(window.matchMedia('(max-width: 767px)').matches) {
    //         return html2pdf(document.querySelector('.deliverynote'))
    //     }
       
    //     if(button == "image") html2pdf(document.querySelector('.deliverynote'))
    //     else printContent(' ', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-deliverynote')
    
    // }
    
}

var propertyledgerbtn = document.getElementById('propertyledger')
if(propertyledgerbtn) propertyledgerbtn.addEventListener('click', openPropertyLedger)


// Category Value Timeline--------------------------------------------------------------------------------------------------------------------
var categoryvaluetimelineorehistory_datasource = [];
let categoryvaluetimelinennmenttid

const popcategoryvaluetimelineablewithdata=(result)=>{
    dynamiccomma(true)
    categoryvaluetimelineorehistory_datasource = [];
    if(!result.data)return callModal(`${result.message}`)
    categoryvaluetimelineorehistory_datasource = result.data;
    console.log('categoryvaluetimelineorehistory_datasource', categoryvaluetimelineorehistory_datasource)
    // initPagination(categoryvaluetimelineorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('categoryvaluetimelinetabledata').innerHTML = categoryvaluetimelineorehistory_datasource.map((dat, index)=>{
        return(`<tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ formatMoney(dat.totalvaluefrom) } </td>
                    <td> ${ formatMoney(dat.totalvalueto) } </td>
                    <td> ${ dat.numberofdays } </td>
                    <td class="btncolumn">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editcategoryvaluetimeline('${dat.id}','${dat.totalvaluefrom}','${dat.totalvalueto}', '${dat.numberofdays}')">Edit</span>
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deletecategoryvaluetimeline('${dat.id}')">Delete</span>
                    </td>
                </tr>`)
    }).join('')
    }
     
    const editcategoryvaluetimeline =(id, totalvaluefrom, totalvalueto, numberofdays)=>{
        if(document.getElementById('totalvaluefrom'))document.getElementById('totalvaluefrom').value = totalvaluefrom;
        if(document.getElementById('totalvalueto'))document.getElementById('totalvalueto').value = totalvalueto;
        if(document.getElementById('numberofdays'))document.getElementById('numberofdays').value = numberofdays;
        categoryvaluetimelinennmenttid = id
        dynamiccomma(true)
    }
     
const refreshcategoryvaluetimelinemt =(result='')=>{
    if(result)document.getElementById('categoryvaluetimelineform').reset()
    callController('fetchcategoryvaluetimeline.php', null, 'fetchcategoryvaluetimeline', [], popcategoryvaluetimelineablewithdata)
} 
    const deletecategoryvaluetimeline=(id)=>{ 
        function ddparams(){   
            let params = new FormData()
            params.append('id', id) 
            return params
        }
        callController('removepropetycategoryvalue.php', ddparams(), 'removepropetycategoryvalue', [], refreshcategoryvaluetimelinemt)
    } 
 
 
async function opencategoryvaluetimeline(){
await httpRequest('categoryvaluetimeline.php') 
categoryvaluetimelinennmenttid = ''
refreshcategoryvaluetimelinemt()
if(document.getElementById('catformsubmit'))document.getElementById('catformsubmit').addEventListener('click', e=>{
    e.preventDefault()
    dynamiccomma(false)
    function departparams(){
        let params = new FormData(document.getElementById('categoryvaluetimelineform'));
        if(categoryvaluetimelinennmenttid)params.append('id', categoryvaluetimelinennmenttid)
        categoryvaluetimelinennmenttid = ''
        return params
    }
    callController('propertycategorytimeline.php', departparams(), 'propertycategorytimeline', ['totalvaluefrom', 'totalvalueto', 'numberofdays'], refreshcategoryvaluetimelinemt)
})
}

var categoryvaluetimeline = document.getElementById('categoryvaluetimeline')
if(categoryvaluetimeline) categoryvaluetimeline.addEventListener('click',opencategoryvaluetimeline,false)
    
    
// View Reserved Property Stock--------------------------------------------------------------------------------------------------------------------
var viewreservedpropertystockorehistory_datasource = [];
let viewreservedpropertystocknnmenttid

const popviewreservedpropertystockablewithdata=(result)=>{
    // dynamiccomma(true)
    viewreservedpropertystockorehistory_datasource = [];
    if(!result.data)return callModal(`${result.message}`)
    viewreservedpropertystockorehistory_datasource = result.data;
    console.log('viewreservedpropertystockorehistory_datasource', viewreservedpropertystockorehistory_datasource)
    // initPagination(viewreservedpropertystockorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('viewreservedpropertystocktabledata').innerHTML = viewreservedpropertystockorehistory_datasource.map((dat, index)=>{
        return(`<tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ formatMoney(dat.tdate) } </td>
                    <td> ${ formatMoney(dat.maturitydate) } </td>
                    <td> ${ dat.accountnumber } </td>
                    <td> ${ dat.accountname } </td>
                    <td> ${ dat.itemid } </td>
                    <td> ${ dat.itemname } </td>
                    <td> ${ dat.price } </td>
                    <td> ${ dat.propertyid } </td>
                    <td> ${ dat.qty } </td>
                    <td> ${ dat.reference } </td>
                    <td class="btncolumn hidden">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editviewreservedpropertystock('${dat.id}','${dat.totalvaluefrom}','${dat.totalvalueto}', '${dat.numberofdays}')">Edit</span>
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deleteviewreservedpropertystock('${dat.id}')">Delete</span>
                    </td>
                </tr>`)
    }).join('')
    }
     
    const editviewreservedpropertystock =(id, totalvaluefrom, totalvalueto, numberofdays)=>{
        if(document.getElementById('totalvaluefrom'))document.getElementById('totalvaluefrom').value = totalvaluefrom;
        if(document.getElementById('totalvalueto'))document.getElementById('totalvalueto').value = totalvalueto;
        if(document.getElementById('numberofdays'))document.getElementById('numberofdays').value = numberofdays;
        viewreservedpropertystocknnmenttid = id
        dynamiccomma(true)
    }
     
const refreshviewreservedpropertystockmt =(result='')=>{
    // if(result)document.getElementById('viewreservedpropertystockform').reset()
    callController('fetchsetasidestock.php', null, 'fetchsetasidestock', [], )
} 
   function matDeleteBranchSetUp(id) {
    // Function to prepare the FormData parameters
    function ddparams() {   
        let params = new FormData();
        params.append('id', id); 
        return params;
    }

    // Callback function after successful deletion
    function action(result) {
        // Check the result to determine if deletion was successful
        // This depends on how 'removelocation.php' responds
        // For example, assume it returns JSON with a 'success' field
        if (result.success) {
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'The branch has been successfully deleted.',
                confirmButtonText: 'OK'
            }).then(() => {
                openBranchSetup();
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: result.message || 'There was a problem deleting the branch.',
                confirmButtonText: 'OK'
            });
        }
    }

    // Function to handle the delete action with SweetAlert confirmation
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to delete this branch? This action cannot be undone.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33', // Red color for delete action
        cancelButtonColor: '#3085d6', // Default blue color
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Show a loading indicator while processing
            Swal.fire({
                title: 'Deleting...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Call the controller to perform deletion
            callController('removelocation.php', ddparams(), 'removelocation', [], action)
                .then(response => {
                    // Assuming 'callController' returns a Promise that resolves with the result
                    // Close the loading indicator and handle the response in 'action'
                })
                .catch(error => {
                    // Handle any errors during the AJAX call
                    Swal.fire({
                        icon: 'error',
                        title: 'Deletion Failed',
                        text: error.message || 'An unexpected error occurred.',
                        confirmButtonText: 'OK'
                    });
                });
        }
        // If the user cancels, you can optionally handle it here
        else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: 'Cancelled',
                text: 'The branch was not deleted.',
                icon: 'info',
                confirmButtonText: 'OK'
            });
        }
    });
}

 
 
async function openviewreservedpropertystock(){
await httpRequest('viewreservedpropertystock.php') 
viewreservedpropertystocknnmenttid = ''
// refreshviewreservedpropertystockmt()
if(document.getElementById('submit'))document.getElementById('submit').addEventListener('click', e=>{
    e.preventDefault()
    // dynamiccomma(false)
    function departparams(){
        let params = new FormData(document.getElementById('viewreservedpropertystockform'));
        return params
    }
    callController('fetchsetasidestock.php', departparams(), 'fetchsetasidestock', ['startdate', 'enddate'], popviewreservedpropertystockablewithdata)
})
}

var viewreservedpropertystock = document.getElementById('viewreservedpropertystock')
if(viewreservedpropertystock) viewreservedpropertystock.addEventListener('click',openviewreservedpropertystock,false)
    
    
// View Property Not In Stock--------------------------------------------------------------------------------------------------------------------
var viewpropertyitemnotinstockorehistory_datasource = [];
let viewpropertyitemnotinstocknnmenttid

const popviewpropertyitemnotinstockablewithdata=(result)=>{
    // dynamiccomma(true)
    viewpropertyitemnotinstockorehistory_datasource = [];
    if(!result.data)return callModal(`${result.message}`)
    viewpropertyitemnotinstockorehistory_datasource = result.data;
    console.log('viewpropertyitemnotinstockorehistory_datasource', viewpropertyitemnotinstockorehistory_datasource)
    // initPagination(viewpropertyitemnotinstockorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('viewpropertyitemnotinstocktabledata').innerHTML = viewpropertyitemnotinstockorehistory_datasource.map((dat, index)=>{
        return(`<tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }"> 
                    <td> ${ index +1} </td>
                    <td> ${ formatDate(dat.tdate) } </td>
                    <td> ${ formatDate(dat.maturitydate) } </td>
                    <td> ${ dat.accountnumber } </td>
                    <td> ${ dat.accountname } </td>
                    <td> ${ dat.itemid } </td>
                    <td> ${ dat.itemname } </td>
                    <td> ${ dat.propertyid } </td>
                    <td> ${ dat.requiredstock } </td>
                    <td> ${ dat.stockbalance } </td>
                    <td class="btncolumn hidden">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editviewpropertyitemnotinstock('${dat.id}','${dat.totalvaluefrom}','${dat.totalvalueto}', '${dat.numberofdays}')">Edit</span>
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deleteviewpropertyitemnotinstock('${dat.id}')">Delete</span>
                    </td>
                </tr>`)
    }).join('')
    }
     
    const editviewpropertyitemnotinstock =(id, totalvaluefrom, totalvalueto, numberofdays)=>{
        if(document.getElementById('totalvaluefrom'))document.getElementById('totalvaluefrom').value = totalvaluefrom;
        if(document.getElementById('totalvalueto'))document.getElementById('totalvalueto').value = totalvalueto;
        if(document.getElementById('numberofdays'))document.getElementById('numberofdays').value = numberofdays;
        viewpropertyitemnotinstocknnmenttid = id
        dynamiccomma(true)
    }
     
const refreshviewpropertyitemnotinstockmt =(result='')=>{
    // if(result)document.getElementById('viewpropertyitemnotinstockform').reset()
    callController('fetchsetasidestock.php', null, 'fetchsetasidestock', [], )
} 
    const deleteviewpropertyitemnotinstock=(id)=>{ 
        function ddparams(){   
            let params = new FormData()
            params.append('id', id) 
            return params
        }
        callController('removepropetycategoryvalue.php', ddparams(), 'removepropetycategoryvalue', [], refreshviewpropertyitemnotinstockmt)
    } 
 
 
async function openviewpropertyitemnotinstock(){
await httpRequest('viewpropertyitemnotinstock.php') 
viewpropertyitemnotinstocknnmenttid = ''
// refreshviewpropertyitemnotinstockmt()
    callController('fetchnotinstockpropertyitems.php', null, 'fetchnotinstockpropertyitems', ['startdate', 'enddate'], popviewpropertyitemnotinstockablewithdata)
}

var viewpropertyitemnotinstock = document.getElementById('viewpropertyitemnotinstock')
if(viewpropertyitemnotinstock) viewpropertyitemnotinstock.addEventListener('click',openviewpropertyitemnotinstock,false);

// Approve Reverse Delivery--------------------------------------------------------------------------------------------------------------------
var approvereverseddeliveryorehistory_datasource = [];
let approvereverseddeliverynnmenttid

const popapprovereverseddeliveryablewithdata=(result)=>{
    document.getElementById('jtabledata2').innerHTML = ''
    // dynamiccomma(true)
    approvereverseddeliveryorehistory_datasource = [];
    if(!result.data)return callModal(`${result.message}`)
    approvereverseddeliveryorehistory_datasource = result.data;
    console.log('approvereverseddeliveryorehistory_datasource', approvereverseddeliveryorehistory_datasource)
    // initPagination(approvereverseddeliveryorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('jtabledata2').innerHTML = approvereverseddeliveryorehistory_datasource.map((item, index)=>{
        return(`<tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }"> 
                    <td>${index + 1}</td>
                <td>${item.transactionrow.propertyaccount ? item.transactionrow.accountname : ''}</td>
                <td>${item.transactionrow.propertyaccount ? item.transactionrow.propertyaccount : ''}</td>
                <td>${item.propertyitems.replace(/\|/g, ',')}</td> 
                <td>${item.transactionrow.reference}</td>
                <td>${formatDate(item.transactionrow.deliverydate)}</td>
                <td>${item.transactionrow.status.toLowerCase()}</td>
                <td>${item.transactionrow.additionalcharge == '-' ? '' :formatMoney(item.transactionrow.additionalcharge)}</td>
                <td>${item.transactionrow.additionalchargedescription == '-' ? '' : item.additionalchargedescription}</td>
                <td>${item.transactionrow.refunddue == '-' ? '' : formatMoney(item.transactionrow.refunddue)}</td>
                <td>${ item.transactionrow.reasonforrefund == '' ? '' : item.transactionrow.reasonforrefund }</td>
                <td>
                    <div class="flex no-pr" style="align-items:center;display: flex; gap: 10px">
                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" class="" onclick="approvedeclinereverseddelivery('${item.transactionrow.id}','${item.transactionrow.propertyaccount}', 'APPROVED')">Approve</button>
                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" class="" onclick="approvedeclinereverseddelivery('${item.transactionrow.id}','${item.transactionrow.propertyaccount}', 'DECLINED')">Decline</button>
                    </div>
                </td>
                </tr>`)
    }).join('')
    }
     
    // const editapprovereverseddelivery =(id, totalvaluefrom, totalvalueto, numberofdays)=>{
    //     if(document.getElementById('totalvaluefrom'))document.getElementById('totalvaluefrom').value = totalvaluefrom;
    //     if(document.getElementById('totalvalueto'))document.getElementById('totalvalueto').value = totalvalueto;
    //     if(document.getElementById('numberofdays'))document.getElementById('numberofdays').value = numberofdays;
    //     approvereverseddeliverynnmenttid = id
    //     dynamiccomma(true)
    // }
     
const refreshapprovereverseddeliverymt =(result='')=>{
    // if(result)document.getElementById('approvereverseddeliveryform').reset()
    Swal.fire({
              title: "Approved!",
              text: "Your Delivery has been approved.",
              icon: "success"
            });
    callController('fetchreverseddeliveries.php', null, 'fetchreverseddeliveries', [], popapprovereverseddeliveryablewithdata)
} 

const refreshapprovereverseddeliverymtdecline =(result='')=>{
    // if(result)document.getElementById('approvereverseddeliveryform').reset()
    Swal.fire({
              title: "Declined!",
              text: "Your Delivery has been declined.",
              icon: "success"
            });
    callController('fetchreverseddeliveries.php', null, 'fetchreverseddeliveries', [], popapprovereverseddeliveryablewithdata)
} 


const approvedeclinereverseddelivery = (id, propertyaccount, state) => {
    if (state === 'APPROVED') {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to Approve the reversal!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve it!"
        }).then((result) => {
            if (result.isConfirmed) {
                function ddparams() {
                    let params = new FormData();
                    params.append('id', id);
                    params.append('propertyaccount', propertyaccount);
                    return params;
                }
                callController('approvereverseddelivery.php', ddparams(), 'approvereverseddelivery', [], refreshapprovereverseddeliverymt);
            }
        });
    } 
    else if (state === 'DECLINED') {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to Decline the reversal!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            cancelButtonColor: "blue",
            confirmButtonText: "Yes, Decline it!"
        }).then((result) => {
            if (result.isConfirmed) {
                function ddparams() {
                    let params = new FormData();
                    params.append('id', id);
                    params.append('propertyaccount', propertyaccount);
                    return params;
                }
                callController('declinereverseddelivery.php', ddparams(), 'declinereverseddelivery', [], refreshapprovereverseddeliverymtdecline);
            }
        });
    }
}

 
 
async function openapprovereverseddelivery(){
await httpRequest('approvereversedelivery.php') 
approvereverseddeliverynnmenttid = ''
// refreshapprovereverseddeliverymt()
    callController('fetchreverseddeliveries.php', null, 'fetchreverseddeliveries', [], popapprovereverseddeliveryablewithdata)
}

var approvereverseddelivery = document.getElementById('approvereversedelivery')
if(approvereverseddelivery) approvereverseddelivery.addEventListener('click',openapprovereverseddelivery,false);
// View Deleted Reverse Delivery--------------------------------------------------------------------------------------------------------------------
var viewdeletedreversedeliveryorehistory_datasource = [];
let viewdeletedreversedeliverynnmenttid

const popviewdeletedreversedeliveryablewithdata=(result)=>{
    document.getElementById('jtabledata3').innerHTML = ''
    // dynamiccomma(true)
    viewdeletedreversedeliveryorehistory_datasource = [];
    if(!result.data)return callModal(`${result.message}`)
    viewdeletedreversedeliveryorehistory_datasource = result.data;
    console.log('viewdeletedreversedeliveryorehistory_datasource', viewdeletedreversedeliveryorehistory_datasource)
    // initPagination(viewdeletedreversedeliveryorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('jtabledata3').innerHTML = viewdeletedreversedeliveryorehistory_datasource.map((item, index)=>{
        return(`<tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }"> 
                    <td>${index + 1}</td>
                <td>${item.transactionrow.propertyaccount ? item.transactionrow.accountname : ''}</td>
                <td>${item.transactionrow.propertyaccount ? item.transactionrow.propertyaccount : ''}</td>
                <td>${item.propertyitems.replace(/\|/g, ',')}</td> 
                <td>${item.transactionrow.reference}</td>
                <td>${formatDate(item.transactionrow.deliverydate)}</td>
                <td>${item.transactionrow.status.toLowerCase()}</td>
                <td>${item.transactionrow.additionalcharge == '-' ? '' :formatMoney(item.transactionrow.additionalcharge)}</td>
                <td>${item.transactionrow.additionalchargedescription == '-' ? '' : item.additionalchargedescription}</td>
                <td>${item.transactionrow.refunddue == '-' ? '' : formatMoney(item.transactionrow.refunddue)}</td>
                <td>${ item.transactionrow.reasonforrefund == '' ? '' : item.transactionrow.reasonforrefund }</td>
                </tr>`)
    }).join('')
    }
     
    // const editviewdeletedreversedelivery =(id, totalvaluefrom, totalvalueto, numberofdays)=>{
    //     if(document.getElementById('totalvaluefrom'))document.getElementById('totalvaluefrom').value = totalvaluefrom;
    //     if(document.getElementById('totalvalueto'))document.getElementById('totalvalueto').value = totalvalueto;
    //     if(document.getElementById('numberofdays'))document.getElementById('numberofdays').value = numberofdays;
    //     viewdeletedreversedeliverynnmenttid = id
    //     dynamiccomma(true)
    // }
     
const refreshviewdeletedreversedeliverymt =(result='')=>{
    callController('fetchdeleteddeliveries.php', null, 'fetchdeleteddeliveries', [], popviewdeletedreversedeliveryablewithdata)
} 



 
 
async function openviewdeletedreversedelivery(){
await httpRequest('viewdeletedreversedelivery.php') 
viewdeletedreversedeliverynnmenttid = ''
// refreshviewdeletedreversedeliverymt()
    callController('fetchdeleteddeliveries.php', null, 'fetchdeleteddeliveries', [], popviewdeletedreversedeliveryablewithdata)
}

var viewdeletedreversedelivery = document.getElementById('viewdeletedreversedelivery')
if(viewdeletedreversedelivery) viewdeletedreversedelivery.addEventListener('click',openviewdeletedreversedelivery,false);