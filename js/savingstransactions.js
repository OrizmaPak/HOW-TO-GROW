var form; var savingstransactions;datasource = []

async function openSavingsTransactions() {
    await httpRequest('savingstransactions.php')
    
    form = document.getElementById('filtersavingstransactionsform')
    
    form.querySelector('#startdate').valueAsDate = new Date()
    form.querySelector('#enddate').valueAsDate = new Date()
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generateSavingTransactions)
    
    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(savingsTransactionssetCurrentPage)

    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await savingsTransactionssetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {savingsTransactionssetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
    
    async function generateSavingTransactions(event) {
        event.target.disabled = true;
        let paramstr = new FormData(form)
        let result = await fetch('../controllers/statementofaccount.php', {method: 'POST', body: paramstr, headers: new Headers()})
        let res = await result.json();
        if(res.status) {
            event.target.disabled = false;
            savingstransactions = datasource = res.data;
            document.querySelector('#savingstransactionstable tbody').innerHTML === ''
            
            if(savingstransactions.length) {
                setNewPaginationContext(paginationLimitInput)
            }
        }
        else {
            if(jtabledata) jtabledata.innerHTML = '';
            event.target.disabled = false;
            callModal(res.message, 0)
        }
    }
    
    async function savingsTransactionssetCurrentPage(pageNum) {
        currentPage = pageNum;
        handleActivePageNumber();
        handlePageButtonsStatus();
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        if(jtabledata) jtabledata.innerHTML = '';
        if(savingstransactions.length) {
            savingstransactions.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    appendSavingsTransactionsTableRows(item, index)
                }
            })
            if (pageCount === currentPage) renderTableSavingTransactionsFooter()
            else {
                try {
                    document.querySelector('#savingstransactionstable #tablefooter')?.remove()
                }
                catch(e) {console.log(e)}
            }
            
            if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#savingstransactionstable #tablefooter')){
                document.querySelector('#savingstransactionstable #tablefooter')?.remove()
                savingstransactionsbtn.click()
                form.querySelector('button#submit').click()
                
            }
        }
    }
    
    function renderTableSavingTransactionsFooter () {
        let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.savingsaccount.debit), 0)
        let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.savingsaccount.credit), 0)
        let servcharge = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.savingsaccount.servicecharge), 0)
     
        document.querySelector('#savingstransactionstable tbody').innerHTML += `
            <tr id="tablefooter">
                <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="4"> total </td>
                <td style="text-transform: uppercase;font-weight:bold">${ formatMoney(servcharge) }</td>
                <td style="text-transform: uppercase;"></td>
                <td style="text-transform: uppercase;font-weight:bold"> ${formatMoney(credit)}</td>
                <td style="text-transform: uppercase;font-weight:bold">${formatMoney(debit)}</td>
            </tr>
        `
    }
    
    async function appendSavingsTransactionsTableRows(item, index) {
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

}
var savingstransactionsbtn = document.getElementById('savingstransactions')
if(savingstransactionsbtn) savingstransactionsbtn.addEventListener('click', openSavingsTransactions, false)