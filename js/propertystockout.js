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
            <td>${ new Date(item.deliverydate).toLocaleDateString()} </td>
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
