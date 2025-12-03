var jtabledata; var datasource = null; var printBtn; var exportDataToExcel; var searchBox;

async function openViewCustomer () {
    await httpRequest('viewcustomers.php')
    jtabledata = document.getElementById('jtabledata')
    printBtn = document.getElementById('pc-btn')
    exportDataToExcel = document.getElementById('ec-btn')

    if(printBtn) printBtn.addEventListener('click', () => printCustomers())
    if(exportDataToExcel) exportDataToExcel.addEventListener('click', () => tableToExcel('viewcustomertable', 'customers'))
    initializePaginationParams(viewCustomerSetCurrentPage)
    await fetchCustomers()
}


function renderTableHTML(item, index) {
    jtabledata.innerHTML += `
        <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
            <td> ${ index +1} </td>
            <td> ${ item.firstname } </td>
            <td> ${ item.lastname } </td>
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
    let result = await fetchRequest('../controllers/fetchcustomeraccountscript.php')
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