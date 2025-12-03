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
    }
    
    async function appendViewDeliveryTableRows(item, index) {
        let loc = locationsvar?.find(value => value.id == (~~Math.abs(item.locationofprocessing)) )
        jtabledata.innerHTML += `
            <tr class="source-row-item">
                <td>${index + 1}</td>
                <td>${item.propertyaccount}</td>
                <td>${item.reference}</td>
                <td>${item.deliverydate}</td>
                <td>${item.status.toLowerCase()}</td>
                <td>${item.additionalcharge == '-' ? '' :formatMoney(item.additionalcharge)}</td>
                <td>${item.additionalchargedescription == '' ? '' : item.additionalchargedescription}</td>
                <td>${item.refunddue == '-' ? '' : formatMoney(item.refunddue)}</td>
                <td>${ item.reasonforrefund == '' ? '' : item.reasonforrefund }</td>
                <td>${loc !== undefined ?  loc.location : ''}</td>
                <td>
                    <div class="flex no-pr" style="align-items:center">
                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" class="view-delivery" value="${index}">View</button>
                    </div>
                </td>
            </tr>
        `
    } 
    
    let recieptinfo = {};
    
    async function PreviewDelivery(event) {
        try {
            let paramstr = new FormData()
            paramstr.append('accountnumber', deliveries[+event.target.value]?.propertyaccount)
            let result = await httpJsonRequest('../controllers/fetchpropertyaccountdetail.php', 'POST', paramstr)
            if(result?.status) {
                
                let data = JSON.parse(JSON.stringify(result.data));
                let customer = await findViewDeliveryCustomerProfile(data.propertyaccount[0].customer)
                data.ref = deliveries[+event.target.value].reference

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
                                <span>${new Date(data.propertyaccount[0].registrationdate).toLocaleDateString()}</span>
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
            document.querySelector('#viewdeliverytable tbody').innerHTML = ''
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
                            <li>${'REF|'.concat(recieptinfo?.property.ref) }</li>
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
        div.id = 'printable-deliverynote'
        if(document.getElementById('printable-deliverynote')) document.getElementById('printable-deliverynote').remove()
        document.body.appendChild(div)
        
       
        if(button == "image") html2pdf(document.querySelector('.deliverynote'))
        else printContent(' ', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-deliverynote')
    
    }
}

var viewdeliverybtn = document.getElementById('viewdelivery')
if(viewdeliverybtn) viewdeliverybtn.addEventListener('click', openViewDelivery)