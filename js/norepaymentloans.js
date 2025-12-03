async function openNoRepayments () {
    
    await httpRequest('norepaymentloans.php')  
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)
    
    const filterNoRepaymentBtn = document.getElementById('filter-nr')
    const printNoRepaymentBtn = document.getElementById('print-nr')
    const exportNoRepaymentBtn = document.getElementById('export-nr')
    let loanLocationsSelect = document.getElementById('nrllocation');
    const norepaymentstable = document.getElementById('norepaymentstable');
    
    const filterForm = document.getElementById('norepaymentform');

    datasource = [];
    let paginationLimit = 40;

    if(filterNoRepaymentBtn) filterNoRepaymentBtn.addEventListener('click', (e) => fetchNoRepaymentLoans(true))
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    if(printNoRepaymentBtn) printNoRepaymentBtn.addEventListener('click', () => printNoRepaymentLoansList())
    if(exportNoRepaymentBtn) exportNoRepaymentBtn.addEventListener('click', () => tableToExcel('norepaymentstable', 'no_repayments'))
    
    
    function fetchNoRepaymentLoans(filtered=false) {
    
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/noloanrepayments.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(jtabledata) jtabledata.innerHTML = '';
                        data = datasource = parseRequest.data
                        if(data.length) setNewPaginationContext(paginationLimitInput)
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
            let paramstr = new FormData(filterForm)
            paramstr.set('location_id', (locationsvar.find(item => item.location == filterForm.querySelector('#nrllocation').value.trim()))?.id)
            request.send(paramstr);
        }
        else request.send();
 
    }
    
    function renderNoRepaymentsTable(data) {
        let tbody = norepaymentstable.querySelector('tbody');
        if(data.length) {
            tbody.innerHTML = '';
            data.forEach((item, index) => renderTableHTML(item, index))
        } else tbody.innerHTML = renderNoTableData(6) ?? null
    }
    
    function renderTableHTML(item, index) {
        let tbody = norepaymentstable.querySelector('tbody');
        tbody.innerHTML += `
        <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
            <td> ${ index + 1} </td>
            <td>${item.loanaccount}</td>
            <td>${item.accountname} </td>
            <td>${item.duedate}</td>
            <td>${formatMoney(+item.amountdue + (+item.interestdue))}</td>
            <td>${ item.hfield == '-' ? 'Pending' : 'Paid' }</td>
        </tr>
        `
    }
    
    function getLoanLocations() {
        
        // sample data
    
        let data = loanlocations =  ['GENERAL', 'HEADOFFICE', 'LAGOS']
        if(data.length) {
            data.forEach( location => {
                if(loanLocationsSelect) {
                    let option = document.createElement('option')
                    option.value = option.innerHTML = location;
                    loanLocationsSelect.appendChild(option)
                }
            })
        }
    }
    
    function renderNoTableData(colspan) {
        return  `
            <tr id="no-data">
                <td colspan=${colspan}>
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
    }

    function setCurrentPage(pageNum){
                
        currentPage = pageNum;
        
        handleActivePageNumber();
        handlePageButtonsStatus();
    
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        
        if(norepaymentstable.querySelector('tbody')) norepaymentstable.querySelector('tbody').innerHTML = '';
        
        if(datasource.length) {
            datasource.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) { 
                    renderTableHTML(item, index)
                }
            })
            if(document.querySelector('#norepaymentstable tbody').innerHTML === '') norepaymentloansbtn.click()
        }
        else  jtabledata.innerHTML=  renderNoTableData(6)  
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {setCurrentPage(pageIndex); calPaginationStatus()});
        });
    }

    function setNewPaginationContext(e) {
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        setCurrentPage(1);
        paginationNumbers.innerHTML = '';
        getPaginationNumbers();
        handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }

    function printNoRepaymentLoansList() {
        let content = document.getElementById('jpagecontent');
        if(content) {
            var winPrint = window.open('loan transaction report', '', 'width=1000,height=900');
            winPrint.document.write('<html><head><title></title>');
            winPrint.document.write('<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">');
            winPrint.document.write(' <h1 style="text-align:center;font-weight:400px;text-transform:uppercase;font-size:14px;"> no repayments </h1> ' + content.innerHTML);
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
      
    async function fetchLoanLocations() {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchlocation.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        let data =  parseRequest.data?.data;
                        locationsvar = data;
                        let options = '';
                        data?.map(function(item, index){
                            options += `
                                <option value="${item.location} ">
                            `
                        })
                        if(filterForm.querySelector('#nrllocation')){
                            let datalist = document.createElement('datalist')
                            datalist.id = 'loanlocations'
                            datalist.innerHTML = options
                            filterForm.querySelector('#nrllocation').value = ''
                            filterForm.querySelector('#nrllocation').appendChild(datalist)
                        }
                    }
                    
                }
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        request.setRequestHeader('Connection','close'); 
        request.send();
    }
    
    await fetchLoanLocations()

    fetchNoRepaymentLoans()
    
}

let norepaymentloansbtn = document.getElementById('norepaymentloans')
if(norepaymentloansbtn) norepaymentloansbtn.addEventListener('click', openNoRepayments, false)