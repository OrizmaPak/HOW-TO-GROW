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
                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" class="reverse-delivery" value="${index}">Reverse</button>
                    </div>
                </td>
            </tr>
        `
    } 
    

    async function PreviewDelivery(event) {
        try {
            let paramstr = new FormData()
            paramstr.append('accountnumber', deliveries[+event.target.value]?.propertyaccount)
            let result = await httpJsonRequest('../controllers/fetchpropertyaccountdetail.php', 'POST', paramstr)
            if(result?.status) {
                
                let data = JSON.parse(JSON.stringify(result.data));
                let customer = await findReverseDeliveryCustomerProfile(data.propertyaccount[0].customer)

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
                         let itemname = await findReverseDeliveryInventoryItem(data.propertyitems[i].itemid);
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
        
        let item = deliveries[+event.target.value]?.propertyaccount;
        if(!confirm(`Are you sure you want to reverse ${item} delivery?`)) return
        
        try {
            let paramstr = new FormData()
            paramstr.append('propertyaccount', deliveries[+event.target.value]?.propertyaccount)
            let result = await httpJsonRequest('../controllers/reversedelivery.php', 'POST', paramstr)
            if(result?.status) {
                callModal(result.result, 1)
                deliveries = datasource = deliveries.filter(item => item.propertyaccount !== deliveries[+event.target.value]?.propertyaccount)
                document.querySelector('#reversedeliverytable tbody').innerHTML = ''
                setNewPaginationContext(paginationLimitInput)
                
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