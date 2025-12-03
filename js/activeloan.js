   
async function openActiveLoan() {
    await httpRequest('activeloan.php');
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)
    
    let filteractiveloans = document.getElementById('filteractiveloans');
    const printBtn = document.getElementById('loan-print-action')
    const exportDataToExcel = document.getElementById('export-list-excel')
    
    datasource = [];
    
     
    if(filteractiveloans) filteractiveloans.addEventListener('keyup', (e) => datasource.length && filterLoansTable(e.target.value));
    if(printBtn) printBtn.addEventListener('click', () => datasource.length && printActiveLoanList())
    if(exportDataToExcel) exportDataToExcel.addEventListener('click', () => datasource.length && exportActiveLoans('activeloans', 'loans'))

     
    function setCurrentPage(pageNum) {
                
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
            if(document.querySelector('#activeloans tbody').innerHTML === '') activeloanbtn.click()
        }
    }

    function filterLoansTable(q) {
        let query = q.toUpperCase();
        let table = document.getElementById('activeloans')
        let tablerows = table.getElementsByTagName('tr')
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
                // if(i === tablerows.length - 1) {
                //     let result = jtabledata.querySelectorAll('source-row-item');
                //     if(result.length === 0) jtabledata.innerHTML = `${renderNoTableData()}`;
                // }
            }
        }
    }
    
    function renderTableHTML(item, index) {
        jtabledata.innerHTML += `
            <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                <td> ${ index +1} </td>
                <td> ${ item.accountnumber }</td>
                <td> ${ item.accountname }</td>
                <td> ${ item.openingdate} </td>
                <td> ${ item.maturitydate} </td>
                <td> ${ formatMoney(item.amount) } </td>
                <td> ${ formatMoney((+item.amount + (5/100 * (+item.amount))).toString())} </td>
                <td> ${ formatMoney(5/100 * (+item.amount)) } </td>
                <td> 
                    <span style="padding:5px;border-radius: 5px;color:white;font-size:8px;text-transform:capitalize;background-color:green">Active</span>
                </td>
                <td> ${ item.loanduration } </td>
                <td> ${ item.interestmethod } </td>
                <td> ${ item.interestrate }% </td>
                <td style="text-transform:none"> ${ item.loanofficer } </td>
            </tr>
            `
    }
    
    function renderNoTableData() {
        return  `
            <tr>
                <td colspan="14">
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
    }
    
    function printActiveLoanList() {
        printContent('Active Loans', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
    }
    
    function exportActiveLoans() {
        tableToExcel('activeloans', 'loans')
    }
    
    async function fetchActiveLoans() {

        showSpinner();
        let paramstr = new FormData()
        paramstr.append('loanofficer', '')
        paramstr.append('loanstatus', 'APPROVED')
        
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchmyloans.php',true);
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
                    else return callModal('No records retrieved')
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        request.setRequestHeader('Connection','close'); 
        request.send(paramstr);
    
    }
    
    
    await fetchActiveLoans()
}

var activeloanbtn = document.getElementById('activeloan');
if(activeloanbtn) activeloanbtn.addEventListener('click', openActiveLoan, false)
