var form; var accountstatements; datasource = []

async function openStatementOfAccount () {

    await  httpRequest('statementofaccount.php')
    form = document.getElementById('filterstatementofaccountform')
    
    form.querySelector('#startdate').valueAsDate = new Date()
    form.querySelector('#enddate').valueAsDate = new Date()
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generateStateOfAccount)
    document.querySelector('button#print-soa').addEventListener('click', printStatementOfAccount)
    document.querySelector('button#export-soa').addEventListener('click', exportStatementOfAccount)

    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(statementOfAccountsetCurrentPage)
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    await fetchStatementOfAccountPageData()
    
    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await statementOfAccountsetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {statementOfAccountsetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
    
    function printStatementOfAccount() {
    if(accountstatements.length) printContent('Statement of Account', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

    function exportStatementOfAccount() {
    if(accountstatements.length) tableToExcel('statementofaccounttable', 'statemnent_of_account')
}

    async function generateStateOfAccount(event) {
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/statementofaccount.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        event.target.disabled = false;
        accountstatements = datasource = res.data;
        document.querySelector('#statementofaccounttable tbody').innerHTML === ''
        
        if(datasource.length && form.querySelector('#account').value !== '') {
            try {
                document.getElementById('accountinfo').style.display = 'flex'
                document.getElementById('accountofficer').innerHTML = datasource[0]?.accountofficer
                document.getElementById('marketergroup').innerHTML = datasource[0]?.marketergroup
            }
            catch(e) {console.log(e)}
        }
        else {
            try {
                document.getElementById('accountinfo').style.display = 'none'
                document.getElementById('accountofficer').innerHTML = ''
                document.getElementById('marketergroup').innerHTML = ''
            }
            catch(e) {console.log(e)}
        }
        
        if(accountstatements.length) {
            setNewPaginationContext(paginationLimitInput)
        }

    }
    else {
        if(jtabledata) jtabledata.innerHTML = '';
        event.target.disabled = false;
        callModal(res.message, 0)
    }
}

    async function fetchStatementOfAccountPageData() {
    await fetchStatementOfAccountCustomerAccounts();
    await fetchStatementOfAccountSavingsAccounts();
    // await fetchStatementOfAccountLocations()
}

    function statementOfAccountsetCurrentPage (pageNum){
    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(accountstatements.length) {
        accountstatements.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendStatementOfAccountTableRows(item, index)
            }
        })
        
        if (pageCount === currentPage) renderTableStatementOfAccountFooter()
        else {
            try {
                document.querySelector('#statementofaccounttable #tablefooter')?.remove()
            }
            catch(e) {console.log(e)}
        }
        
        if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#statementofaccounttable #tablefooter')){
            document.querySelector('#statementofaccounttable #tablefooter')?.remove()
            statementofaccountbtn.click()
            form.querySelector('button#submit').click()
        }
        
        // if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#statementofaccounttable #tablefooter'))  form.querySelector('button#submit').click()
        
    }
}

    async function appendStatementOfAccountTableRows(item, index) {
    item.savingsaccount.credit = +item.savingsaccount.credit
    item.savingsaccount.debit = +item.savingsaccount.debit
    
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.savingsaccount.accountnumber}</td>
            <td>${ item.savingsaccount.reference}</td>
            <td>${ item.savingsaccount.ttype }</td>
            <td>${ formatMoney(item.savingsaccount.servicecharge ) } </td>
            <td>${ new Date(item.savingsaccount.transactiondate).toLocaleDateString() }</td>
            <td>${ item.savingsaccount.credit == 0 ? '-' : formatMoney(item.savingsaccount.credit) }</td>
            <td>${ item.savingsaccount.debit == 0 ? '-' : formatMoney(item.savingsaccount.debit) }</td>
        </tr>
    `
} 
    
function renderTableStatementOfAccountFooter () {
    let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.savingsaccount.debit), 0)
    let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.savingsaccount.credit), 0)
    let servcharge = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.savingsaccount.servicecharge), 0)
 
    document.querySelector('#statementofaccounttable tbody').innerHTML += `
        <tr id="tablefooter">
            <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="4"> total </td>
            <td style="text-transform: uppercase;font-weight:bold">${ formatMoney(servcharge) }</td>
            <td style="text-transform: uppercase;"></td>
            <td style="text-transform: uppercase;font-weight:bold"> ${formatMoney(credit)}</td>
            <td style="text-transform: uppercase;font-weight:bold">${formatMoney(debit)}</td>
        </tr>
    `
}

async function fetchStatementOfAccountLocations() {
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

    async function fetchStatementOfAccountCustomerAccounts (event) {
    showSpinner();
    let paramstr = new FormData();
    let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res?.status) { 
        hideSpinner();
        savingscustomers= res.data?.data;
    } else hideSpinner();
}

    async function fetchStatementOfAccountSavingsAccounts() {
    showSpinner()
    let result = await fetch('../controllers/fetchsavingsaccounts.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data  =  res.data
        savingsaccountslist =  data;
        let options = '';
        data?.forEach(async function(item, index){
            try {
                let customer = savingscustomers?.find( val => val.id == item.customer);
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

}

var statementofaccountbtn = document.getElementById('statementofaccount');
if(statementofaccountbtn) statementofaccountbtn.addEventListener('click', openStatementOfAccount, false);

