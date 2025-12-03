async function openDueLoan() { 
    
    await httpRequest('dueloan.php');
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)
    
    let filterdueloans = document.getElementById('filterdueloans');
    const printBtn = document.getElementById('dueloan-print-action')
    const exportDataToExcel = document.getElementById('export-dueloan-excel')

    datasource = [];
    
    if(filterdueloans) filterdueloans.addEventListener('keyup', (e) => filterLoansTable(e.target.value));
    if(printBtn) printBtn.addEventListener('click', () => printDueLoanList())
    if(exportDataToExcel) exportDataToExcel.addEventListener('click', () => tableToExcel('dueloans', 'due_loans'))
    
    filterform = document.getElementById('filterdueloansform')
    if(filterform.querySelector('button#submit')) filterform.querySelector('button#submit').addEventListener('click', () => fetchDueloans(true))

    function setCurrentPage(pageNum){
                
        currentPage = pageNum;
        
        handleActivePageNumber();
        handlePageButtonsStatus();
    
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        
        if(jtabledata) jtabledata.innerHTML = '';
        
        if(datasource.length) {
            datasource.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    renderTableHTML(item, index)
                }
            })
            if(document.querySelector('#dueloans tbody').innerHTML === '') dueloanbtn.click()
        }
        else  jtabledata.innerHTML=  renderNoTableData()
    }
    
    function filterLoansTable(q) {
        let query = q.toUpperCase();
        let table = document.getElementById('dueloans')
        let tablerows = table.getElementsByTagName('tr');
        if(table) {
            for (let i = 0; i < tablerows.length; i++) { 
                let td = tablerows[i].getElementsByTagName("td")[1];
                if (td) {
                    let txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(query) > -1) {
                      tablerows[i].style.display = "";
                    } else {
                      tablerows[i].style.display = "none";
                    }
                  }
            }
        }
    }
    
    function renderTableHTML(item, index) {
        jtabledata.innerHTML += `
            <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                <td> ${ index +1} </td>
                <td> ${ item.loanaccount }</td>
                <td> ${ item.accountname }</td>
                <td> ${ item.duedate }</td>
                <td> ${ item.paymentdate == '2000-01-01' ? '-' :  item.paymentdate }</td>
                <td> ${ formatMoney(+item.amountdue + (+item.interestdue)) }</td>
                <td> ${ item.hfield == '-' ? 'Pending' : 'Paid' }</td>
            </tr>
            `
    }
    
    function renderNoTableData() {
        return  `
            <tr id="no-data">
                <td colspan="7">
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
    }
    
    function printDueLoanList() {
        let content = document.getElementById('jpagecontent');
        if(content) {
            var winPrint = window.open('Due loan', '', 'width=1000,height=900');
            winPrint.document.write('<html><head><title></title>');
            winPrint.document.write('<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">');
            winPrint.document.write(' <h1 style="text-align:center;font-weight:400px;text-transform:uppercase;font-size:14px;"> due loans </h1> ' + content.innerHTML);
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
    
    async function fetchDueloans(filtered=false) {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchdueloans.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(jtabledata) jtabledata.innerHTML = '';
                        data = datasource = parseRequest.data
                        if(data.length) initPagination(data, setCurrentPage)
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
            paramstr.append('location_id', (locationsvar.find(item => item.location == filterform.querySelector('#location').value.trim()))?.id)
            request.send(paramstr);
        }
        else request.send();
    }
        
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
                        if(filterform.querySelector('#location')){
                            let datalist = document.createElement('datalist')
                            datalist.id = 'loanlocations'
                            datalist.innerHTML = options
                            filterform.querySelector('#location').innerHTML = ''
                            filterform.querySelector('#location').appendChild(datalist)
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
    fetchDueloans()
}

var dueloanbtn = document.getElementById('dueloan')
if(dueloanbtn) dueloanbtn.addEventListener('click', openDueLoan, false);
