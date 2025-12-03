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
                <td>${new Date(item.registrationdate).toLocaleDateString()}</td>
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
                            </span>
                        </div>
                        <div>
                            <span> Invoice#: <span>${ledgerinvoicedata?.property.ref}</span></span>
                            issue date: ${new Date().toLocaleDateString()}
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
                                <li>Date: <span>${new Date().toLocaleDateString()}</span></li>
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