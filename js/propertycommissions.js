var form; datasource = [];
async function openPropertyCommissions() {
    await httpRequest('propertycommissions.php')
    
    form = document.getElementById('filterpropertycommissionsform')
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generatePropertyCommissions)

    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(propertyCommissionssetCurrentPage)
    await retrievePropertyCommissionsInventoryItems()
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
        
        if(document.querySelector('#propertycommissionstable tbody').innerHTML === ''){
            propertycommissionsbtn.click()
            form.querySelector('button#submit').click()
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
            <td>${item.marketer}</td>
            <td style="text-align:left">${formatMoney(item.commission)}</td>
            <td style="text-align:left">${formatMoney(item.productvalue)}</td>
        </tr>
    `
} 


var propertycommissionsbtn = document.getElementById('propertycommissions')
if(propertycommissionsbtn) propertycommissionsbtn.addEventListener('click', openPropertyCommissions)