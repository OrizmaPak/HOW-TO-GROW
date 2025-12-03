var form; var dailytransactions; datasource = []

async function openDailyTransactions() {
    await httpRequest('dailytransaction.php')
    
    form = document.getElementById('filterdailytransactionsform')
    if(form) {
        form.querySelector('#startdate').valueAsDate = new Date()
        form.querySelector('#enddate').valueAsDate = new Date()
        
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generateDailyTransactions)
        document.querySelector('button#print-dt').addEventListener('click', printDailyTransactions)
        document.querySelector('button#export-dt').addEventListener('click', exportDailyTransactions)
    }
    
    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(dailyTransactionssetCurrentPage)

    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    await fetchDailyTransactionsPageData()
    
    async function fetchDailyTransactionsPageData() {
        await fetchDailyTransactionsLocations()
    }
    
    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await dailyTransactionssetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {dailyTransactionssetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
        
    function printDailyTransactions() {
        if(dailytransactions.length) printContent('Daily Transactions', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
    }
    
    function exportDailyTransactions() {
        if(dailytransactions.length) tableToExcel('dailytransactionstable', 'daily_transactions')
    }
    
    async function generateDailyTransactions(event) {
        event.target.disabled = true;
        let paramstr = new FormData(form)
        let result = await fetch('../controllers/fetchperiodictransactions.php', {method: 'POST', body: paramstr, headers: new Headers()})
        let res = await result.json();
        if(res.status) {
            event.target.disabled = false;
            dailytransactions = datasource = res.data;
            document.querySelector('#dailytransactionstable tbody').innerHTML === ''
            if(dailytransactions.length) setNewPaginationContext(paginationLimitInput)
            else return callModal('No records retrieved')
        }
        else {
            if(jtabledata) jtabledata.innerHTML = '';
            event.target.disabled = false;
            callModal(res.message, 0)
        }
    }
    
    async function dailyTransactionssetCurrentPage(pageNum) {
        currentPage = pageNum;
        handleActivePageNumber();
        handlePageButtonsStatus();
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        if(jtabledata) jtabledata.innerHTML = '';
        if(dailytransactions.length) {
            dailytransactions.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    appendDailyTransactionsTableRows(item, index)
                }
            })
            if (pageCount === currentPage) renderTableSavingTransactionsFooter()
            else {
                try {
                    document.querySelector('#dailytransactionstable #tablefooter')?.remove()
                }
                catch(e) {console.log(e)}
            }
            
            if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#dailytransactionstable #tablefooter')){
                document.querySelector('#dailytransactionstable #tablefooter')?.remove()
                dailytransactionsbtn.click()
                form.querySelector('button#submit').click()
                
            }
        }
    }
    
    function renderTableSavingTransactionsFooter () {
        let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.debit), 0)
        let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.credit), 0)
        let servcharge = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.servicecharge), 0)
     
        document.querySelector('#dailytransactionstable tbody').innerHTML += `
            <tr id="tablefooter">
                <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="10"> total </td>
                <td style="text-transform: uppercase;font-weight:bold">${ formatMoney(servcharge) }</td>
                <td style="text-transform: uppercase;font-weight:bold"> ${formatMoney(credit)}</td>
                <td style="text-transform: uppercase;font-weight:bold">${formatMoney(debit)}</td>
            </tr>`
    }
    
    async function appendDailyTransactionsTableRows(item, index) {
         let loc = locationsvar?.find(value => value.id == (~~Math.abs(item.location)) )
        jtabledata.innerHTML += `
            <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.accountnumber}</td>
            <td>${item.reference}</td>
            <td>${item.ttype}</td>
            <td>${item.description}</td>
            <td>${new Date(item.transactiondate).toLocaleDateString() }</td>
            <td style="text-transform:lowercase">${ item.accountofficer == undefined ? '' :  (Number.isInteger(Math.abs(item.accountofficer)) ? '' :  item.accountofficer) }</td>
            <td style="text-transform:lowercase">${ item.approvedby == undefined ? '' : (Number.isInteger(Math.abs(item.approvedby)) ? '' :  item.approvedby) }</td>
            <td>${item.paymentmethod == undefined ? '' : item.paymentmethod}</td>
             <td>${loc !== undefined ?  loc.location : ''}</td>
            <td>${formatMoney(item.servicecharge)}</td>
            <td>${ item.credit == 0 ? '' : formatMoney(item.credit) }</td>
            <td>${ item.debit == 0 ? '' : formatMoney(item.debit) }</td>
        </tr>
        `
    }
    
    
    async function fetchDailyTransactionsLocations() {
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

var dailytransactionsbtn = document.getElementById('dailytransaction')
if(dailytransactionsbtn) dailytransactionsbtn.addEventListener('click', openDailyTransactions, false)