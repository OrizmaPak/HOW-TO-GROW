   
async function openViewLoan() {
    await httpRequest('viewloans.php');
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)
    
    let filterviewloans = document.getElementById('filterviewloans');
    const printBtn = document.getElementById('loan-print-action')
    const exportDataToExcel = document.getElementById('export-list-excel')
    const viewloanstable = document.getElementById('viewloanstable')
    
    datasource = [];
    
    if(filterviewloans) filterviewloans.addEventListener('keyup', (e) => datasource.length && filterLoansTable(e.target.value));
    if(printBtn) printBtn.addEventListener('click', () => datasource.length && printLoanList())
    if(exportDataToExcel) exportDataToExcel.addEventListener('click', () => datasource.length && exportLoans('viewloans', 'loans'))
    if(document.querySelector('#filterloansform button')) document.querySelector('#filterloansform button').addEventListener('click', fetchLoans)
     
    function filterLoansTable(q) {
        let query = q.toUpperCase();
        let table = document.getElementById('viewloanstable')
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
        if(datasource.length) {
             let tablebody = viewloanstable.querySelector('tbody')
            if(tablebody) {
                tablebody.innerHTML += `
                    <tr class="source-row-item">
                        <td><span> ${ index + 1 } </span></td>
                        <td>${item.accountnumber}</td>
                        <td>${item.accountname}</td>
                        <td>${item.openingdate}</td>
                        <td>${item.maturitydate}</td>
                        <td>${item.loantype}</td>
                        <td>${item.loanduration}</td>
                        <td>${formatMoney(item.amount)}</td>
                        <td>${item.interestrate}%</td>
                        <td>${item.interesttype}</td>
                        <td>${item.interestperiod}</td>
                        <td>${item.interestmethod}</td>
                        <td>${item.reference}</td>
                        <td>${formatMoney(item.installmentamount)}</td>
                        <td style="text-transform:none">${item.loanofficer}</td>
                    </tr>
                `
            }
        }
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
    
    function printLoanList() {
        printContent('Loans', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
    }
    
    function exportLoans() {
        tableToExcel('viewloans', 'loans')
    }
    
    async function fetchLoans() {
        if(document.querySelector('#filterloansform #loanstatus')?.value < 1) {
            errorBox('Loan Status is required')
            document.querySelector('#filterloansform #loanstatus').style.borderColor = 'red'
            return;
        }
        document.querySelector('#filterloansform #loanstatus').style.borderColor = ''
        
        showSpinner();
        
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
                    else return callModal('No records retrieved',)
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        
        request.setRequestHeader('Connection','close');
        
        let paramstr = new FormData(document.getElementById('filterloansform'))
        let officer = officers.find( item => document.querySelector('#filterloansform #loanofficer').value == (item.firstname.concat(' ',item.lastname, ' ',item.othernames ?? '' )))
        paramstr.set('loanofficer', officer ? officer.email : '')
        request.send(paramstr);
    
    }
    
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
            if(document.querySelector('#viewloanstable tbody').innerHTML === '') viewloanbtn.click()
        }
    }

    async function fetchLoanAccountOfficers () {
        let result = await httpJsonRequest('../controllers/fetchallusers.php');
        if(result?.status) {
            officers = result.data;
            let options = '';
            officers.map((item, index) =>{
                options += `
                    <option value="${item.firstname} ${item.lastname} ${item.othernames ?? ''}">
                `
            })
            if(document.querySelector('#filterloansform #loanofficer')){
                let datalist = document.createElement('datalist')
                datalist.id="officers"
                datalist.innerHTML = options;
                document.querySelector('#filterloansform #loanofficer').appendChild(datalist)
  
            }
            
        } 
    }
    
    await fetchLoanAccountOfficers()
}

var viewloanbtn = document.getElementById('viewloans');
if(viewloanbtn) viewloanbtn.addEventListener('click', openViewLoan, false)
