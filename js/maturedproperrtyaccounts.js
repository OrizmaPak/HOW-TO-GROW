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
                    <option value="${item.accountnumber}"> ${customer.firstname + ' ' + customer.lastname + ' ' + (customer.othernames == '' ? '': customer.othernames) + ' - ' + item.accountnumber + ' - ' + new Date(item.registrationdate).toLocaleDateString() } </option>
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
            <td>${new Date(item.registrationdate).toLocaleDateString()}</td>
            <td>${new Date(item.expectedmaturitydate).toLocaleDateString()}</td>
            <td>${formatMoney(item.totalamount)}</td>
            <td>${item.status}</td>
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
    params.append('id', selecteditem.id)
    let result = await fetch('../controllers/s.php', {method: 'POST', body: params, headers: new Headers()})
    let res = await result.json();
    
    if(res?.status) {
        event.target.innerHTML = 'View'
        event.target.disabled = false
        if(res.data.length) {
            res.data.map(function(item, index) {
                body += `
                    <tr>
                        <td>${++index}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
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
                        <th> item id </th>
                        <th> description  </th>
                        <th> type  </th>
                        <th> cost </th>
                        <th> marketing price </th>
                    </tr>
                </thead> 
                <tbody id="jtabledata">${body}</tbody> 
            </table>
        </div>`
        
    openJModal(html)
}

var maturedproperrtyaccountsbtn = document.getElementById('maturedproperrtyaccounts')
if(maturedproperrtyaccountsbtn) maturedproperrtyaccountsbtn.addEventListener('click', openMaturedPropertyAccounts, false)