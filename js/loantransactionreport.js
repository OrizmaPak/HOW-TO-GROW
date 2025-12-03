async function openLoanTransactionReport() {
    
    await httpRequest('loantransactionreport.php')
    
    let paginationLimit = 40;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)

    let loantransactionreporttable = document.getElementById('loantransactionreporttable');
    const viewLoanReport = document.getElementById('view-lr');
    const printLoanReport = document.getElementById('print-lr')
    const exportLoanReport = document.getElementById('export-lr')
    let reportaccountnumber = document.getElementById('reportaccountnumber');
    let reportaccountname = document.getElementById('reportaccountname')

    if(viewLoanReport) viewLoanReport.addEventListener('click', () => viewLoanTransactionReport())
    if(printLoanReport) printLoanReport.addEventListener('click', () => printActiveLoanList())
    if(exportLoanReport) exportLoanReport.addEventListener('click', () => tableToExcel('loantransactionreporttable', 'loan_transact_report'))
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    function viewLoanTransactionReport() {
        if(!((reportaccountnumber.value.length < 1))) fetchTransactionReport(true)  
    }
    
    function setClassficationHeader(account) {
        if(document.querySelector('#reportcontainer h1')) document.querySelector('#reportcontainer h1').innerHTML = `Loan Transaction Report <span> ${account}</span>`
    }
    
    async function setCurrentPage(pageNum){
                
        currentPage = pageNum;
        
        handleActivePageNumber();
        handlePageButtonsStatus();
    
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        
        if(jtabledata) jtabledata.innerHTML = '';
        
        if(datasource.length) {
            let totalbalance = 0
            await datasource.map( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    let balance = 0
                    
                    item.credit = +item.credit
                    item.debit = +item.debit

                    if(item.credit > item.debit) {
                        totalbalance += item.credit;
                        balance = totalbalance + balance;
                    }
                    else if(item.debit > item.credit) {
                        totalbalance -= item.debit;
                        balance = totalbalance - balance;
                    }
                    else totalbalance = totalbalance
                    
                    item.balance = balance
                    renderTableHTML(item, index)
                }
            })
            renderTableTranstionFooter(totalbalance)
            if(document.querySelector('#loantransactionreporttable tbody').innerHTML === '') loantransactionreportbtn.click()
        }
        else  jtabledata.innerHTML=  renderNoTableData(6)  
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {setCurrentPage(pageIndex); calPaginationStatus()});
        });
    }

    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await setCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function printActiveLoanList() {
        let content = document.getElementById('jpagecontent');
        if(content) {
            var winPrint = window.open('loan transaction report', '', 'width=1000,height=900');
            winPrint.document.write('<html><head><title></title>');
            winPrint.document.write('<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">');
            winPrint.document.write(content.innerHTML);
            winPrint.document.write('<script type="text/javascript">addEventListener("load", () => { print(); close(); })</script></body></html>');
            winPrint.document.close();
            winPrint.focus();
        }
    }
    
    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
          , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
          , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
          if (!table.nodeType) table = document.getElementById(table)
          var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
          window.location.href = uri + base64(format(template, ctx))
        }
      })()
      
    async function renderTableHTML(item, index) {
        let loc = await propertylocations.find(value => value.id == (~~Math.abs(item.location)) )
        loantransactionreporttable.querySelector('tbody').innerHTML += `
            <tr class="source-row-item">
                <td> ${ index + 1} </td>
                <td> ${ item.transactiondate } </td>
                <td> ${ item.account} </td>
                <td> ${ item.reference} </td>
                <td> ${ item.description} </td>
                <td> ${ formatMoney(item.principal) } </td>
                <td> ${ loc?.location } </td>
                <td> ${ item.debit == 0 ? '' : formatMoney(item.debit) } </td>
                <td> ${ item.credit == 0 ? '-' : formatMoney(item.credit) } </td>
                <td> ${ formatMoney(item.balance) } </td>
            </tr>
        `
    }
    
    function renderTableTranstionFooter (totalbalance) {
        let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.debit), 0)
        let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.credit), 0)
        let balance = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.balance), 0)
        
        loantransactionreporttable.querySelector('tbody').innerHTML += `
            <tr>
                <td style="text-transform: uppercase;text-align: left;" colspan="7"> total </td>
                <td style="text-transform: uppercase;"> ${formatMoney(debit)}</td>
                <td style="text-transform: uppercase;">${formatMoney(credit)}</td>
                <td style="text-transform: uppercase;"> ${formatMoney(balance)}</td>
            </tr>
            <tr>
                <td style="text-transform: uppercase;text-align: left;" colspan="9"> balance </td>
                <td style="text-transform: uppercase;"> ${formatMoney(totalbalance)}</td>
            </tr>
        `
    }
    
    async function fetchTransactionReport(filtered=false) {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/loantransactionreport.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        document.querySelector('#loantransactionreporttable tbody').innerHTML === ''
                        data = datasource = parseRequest.data
                        if(data.length) {
                            setClassficationHeader(data[0].account)
                            setNewPaginationContext(paginationLimitInput)
                            // initPagination(datasource, setCurrentPage)
                        }
                    }
                    else return callModal('Not records retrieved.')
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        
        request.setRequestHeader('Connection','close'); 
        if(filtered) {
            let paramstr = new FormData()
            paramstr.append('accountnumber', reportaccountnumber?.value)
            paramstr.append('accountname', reportaccountname?.value)
            request.send(paramstr);
        }
        else request.send();
    }
    
    async function fetchLocations() {
        showSpinner()
        let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
        let res = await result.json();
        if(res?.status) { 
            hideSpinner()
            propertylocations = res.data?.data;
        } else hideSpinner()
    }
    
    await fetchLocations()

}

var loantransactionreportbtn = document.getElementById('loantransactionreport')
if(loantransactionreportbtn) loantransactionreportbtn.addEventListener('click', openLoanTransactionReport, false)
