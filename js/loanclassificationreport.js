  
async function openLoanClassificationReport() { 
    
    await httpRequest('loanclassificationreport.php')
    
    jtabledata = document.getElementById('jtabledata')
    // initializePaginationParams(setCurrentPage)
    
    const loanreportdate = document.getElementById('loanreportdate');
    const loanreporttype = document.getElementById('loanreporttype');
    const viewLoanReport = document.getElementById('view-lcr');
    const printLoanReport = document.getElementById('print-lcr');
    const exportLoanReport = document.getElementById('export-lcr');
    const loanreportbyclasstable = document.getElementById('loanreportbyclasstable');
    
    datasource = [];
    let paginationLimit = 40;
    
    let jtableheader = loanreportbyclasstable ? loanreportbyclasstable.querySelector('#jtableheader') : null
    let reportclassficationheader = document.getElementById('reportclassficationheader');
    
    if(loanreportdate) loanreportdate.valueAsDate = new Date();
    if(viewLoanReport) viewLoanReport.addEventListener('click', () => viewReportByType())
    if(printLoanReport) printLoanReport.addEventListener('click', () => loanreporttype.value.length < 1 ? false : printActiveLoanList());
    if(exportLoanReport) exportLoanReport.addEventListener('click', () => loanreporttype.value.length < 1 ? false : tableToExcel(loanreportbyclasstable.id, loanreporttype.value))
    
    
    function setClassficationHeader(header) {
        if(reportclassficationheader) reportclassficationheader.innerHTML =  `
            <strong>${ header ?? ''} </strong> <br>
            <span style="font-weight: 400; text-transform:capitalize;">
                Reporting Date : ${ new Date(loanreportdate.value).toLocaleDateString() ?? '' }
            </span>
        `
    }
    
    function renderLendingModel() {
        jtableheader.innerHTML = jtabledata.innerHTML = '';
        setClassficationHeader('Schedule of Loans by Lending Model')
    
        if(jtableheader) jtableheader.innerHTML = `
            <tr>
                <th> S/N </th>
                <th> lending model </th>
                <th> number </th>
                <th> amount </th>
                <th> percentage (%) </th>
            </tr>
        `
        records = [];
        if(records.length) {
            records.map((item, index) => {
                if(jtabledata) jtabledata.innerHTML += `
                <tr>
                    <td> ${ index + 1} </td>
                    <td> ${ item.lendingmodel } </td>
                    <td> ${ item.number } </td>
                    <td> ${ item.amount } </td>
                    <td> ${ item.percentage }% </td>
                </tr>
                `
            })
            jtabledata.innerHTML += `
                <tr>
                    <td colspan="2" style="text-transform: uppercase;text-align: left;"> total </td>
                    <td> ${ records.reduce((prev, curr) => prev + curr.number, 0) } </td>
                    <td> ${ records.reduce((prev, curr) => prev + curr.amount, 0) } </td>
                    <td> ${ records.reduce((prev, curr) => prev + curr.percentage, 0) }% </td>
                </tr>
            `
        }
        else {
            jtabledata.innerHTML = renderNoTableData(5)
        }  
        
    }
    
    function renderBreakDownOFOtherLoans() {
        hideSpinner();
        jtableheader.innerHTML = jtabledata.innerHTML = '';
        setClassficationHeader('Break down of other loans')
        
        if(jtableheader) jtableheader.innerHTML = `
        <tr>
            <th> S/N </th>
            <th> names of beneficiary</th>
            <th> loan officer </th>
            <th> date facility granted </th>
            <th> tenor </th>
            <th> amount approved </th>
            <th> principal + interest</th>
            <th> oustanding balance </th>
            <th> status </th>
        </tr>
        `
        // sample data 
        records = [];
        if(records.length) {
            records.map((item, index) => {
                if(jtabledata) jtabledata.innerHTML += `
                <tr>
                </tr>
                `
            })
        }
        else {
            jtabledata.innerHTML = renderNoTableData(9)
        }  
        jtabledata.innerHTML += `
        <tr>
            <td colspan="6" style="text-transform: uppercase;text-align: left;"> total </td>
            <td> ${ records.reduce((prev, curr) => prev + curr.principalandinterest, 0) ?? 0.00 } </td>
            <td> ${ records.reduce((prev, curr) => prev + curr.outbalance, 0) ?? 0.00} </td>
            <td> ${ records.reduce((prev, curr) => prev + curr.status, 0) ?? 0.00}% </td>
        </tr>
    `
    }
    
    function renderSummaryOfLoanClassiifcation() {
        hideSpinner();
        jtableheader.innerHTML = jtabledata.innerHTML = '';
        setClassficationHeader('summary of loan classification')
        
        if(jtableheader) jtableheader.innerHTML = `
        <tr>
            <th> S/N </th>
            <th> class </th>
            <th> amount </th>
        </tr>
        `
        // sample data 
        records = [];
        if(records.length) {
            records.map((item, index) => {
                if(jtabledata) jtabledata.innerHTML += `
                <tr>
                    <td> ${ index + 1 } </td>
                    <td> ${ item.class} </td>
                    <td> ${ item.amount} </td>
                </tr>
                `
            })
            jtabledata.innerHTML += `
                <tr>
                    <td colspan="2" style="text-transform: uppercase;text-align: left;"> total </td>
                    <td> ${ records.reduce((prev, curr) => prev + curr.amount, 0) } </td>
                </tr>
            `
        }  
        else {
            jtabledata.innerHTML = renderNoTableData(3)
        }    
    }
    
    function renderSummaryOfNonPerformingLoans() {
        hideSpinner();
        jtableheader.innerHTML = jtabledata.innerHTML = '';
        setClassficationHeader('Summary of Non Performing Loans')
        
        if(jtableheader) { 
            let i = 1;
            let row = document.createElement('tr');
            while (i < 13) {
                let td = document.createElement('th');
                td.innerHTML = i;
                row.appendChild(td);
                i++;
            }
            jtableheader.appendChild(row);
            jtableheader.innerHTML += `
            <tr style="background-color:transparent">
                <th> S/N </th>
                <th> Customer Code</th>
                <th> Customer's Name </th>
                <th> Past Due Date </th>
                <th> Last Date of Repayment </th>
                <th> Amount Granted</th>
                <th> Principal payment Due and Unpaid </th>
                <th> Accrued Interest unpaid </th>
                <th> Total Non performing Credits </th>           
                <th style="padding:0">
                    <p style="padding:5px 10px">Bank's classification</p> 
                    <table class="jmargin-top">
                        <thead id="jtableheader">
                            <tr style="background-color:transparent">
                                <th style="padding:5px">10a.</th>
                                <th style="padding:5px">10b.</th>
                                <th style="padding:5px">10c.</th>
                                <th style="padding:5px">10d.</th>
                            </tr>
                            <tr style="background-color:transparent">
                                <th style="width:25%">1 - 30 days Pass  Watch</th>
                                <th style="width:25%">31 -60 days Sub - Standard</th>
                                <th style="width:25%">61 -90 days Doubtful</th>
                                <th style="width:25%">91 or More Lost</th>
                            </tr>
                        </thead>
                    </table>               
                </th> 
                <th>Bank's Provision </th>
                <th>Remarks</th>
            </tr>
            `               
        }
            
        // sample data 
        records = [];
        if(records.length) {
            records.map((item, index) => {
                if(jtabledata) jtabledata.innerHTML += `
                <tr>
                    <td> ${ index + 1 } </td>
                    <td> ${ item.customercode} </td>
                    <td> ${ item.customername} </td>
                    <td>  </td>
                    <td> ${ item.lastdateofrepayment} </td>
                    <td> ${ item. amountgranted} </td>
                    <td> ${ item.dueandunpaidprincipal} </td>
                    <td> ${ item.interedunpaid} </td>
                    <td> ${ item.totalnpcredits} </td>
                    <td>
                        <table>
                            <tbody>
                                <tr style="background-color:transparent">
                                <td style="border:none;width:25%"> ${ item.bc10a} </td>
                                <td style="border:none;width:25%"> ${ item.bc10b} </td>
                                <td style="border:none;width:25%"> ${ item.bc10c} </td>
                                <td style="border:none;width:25%"> ${ item.bc10d} </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td> ${ item.bankprovision} </td>
                    <td></td>
                </tr>
                `
            })
        }   
        else {
            jtabledata.innerHTML = renderNoTableData(12)
        }   
    }
    
    function renderSectorialAnalysisOfLoans() {
        hideSpinner();
        jtableheader.innerHTML = jtabledata.innerHTML = '';
        setClassficationHeader('sectorial analysis of loans and advances')
        
        if(jtableheader) jtableheader.innerHTML = `
        <tr>
            <th> S/N </th>
            <th> sector </th>
            <th> number </th>
            <th> amount </th>
            <th> percentage </th>
        </tr>
        `
        // sample data 
        records = [];
        if(records.length) {
            records.map((item, index) => {
                if(jtabledata) jtabledata.innerHTML += `
                <tr>
                    <td> ${ index + 1 } </td>
                    <td> ${ item.sector } </td>
                    <td> ${ item.number} </td>
                    <td> ${ item.amount} </td>
                    <td> ${ item.percentage}% </td>
                </tr>
                `
            })
            jtabledata.innerHTML += `
                <tr>
                    <td colspan="2" style="text-transform: uppercase;text-align: left;"> total </td>
                    <td> ${ records.reduce((prev, curr) => prev + curr.number, 0) } </td>
                    <td> ${ records.reduce((prev, curr) => prev + parseFloat(curr.amount), 0.0) } </td>
                    <td> ${ records.reduce((prev, curr) => prev + curr.percentage, 0) }% </td>
                </tr>
            `
        } 
        else {
            jtabledata.innerHTML = renderNoTableData(5)
        }   
    }
    
    function renderNoTableData(colspan) {
        return  `
            <tr>
                <td colspan="${colspan}">
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
    }
    
    function viewReportByType () {
        if(!(loanreporttype.value.length < 1)) {
            let selectedType = loanreporttype.value;
            if(selectedType) {
                let selectedIndex = loanreporttype.selectedIndex;
                switch(selectedIndex) {
                    case 1:
                        fetchClassifiedReports(renderLendingModel, true)
                        break;
                    case 2:
                        fetchClassifiedReports(renderBreakDownOFOtherLoans, true)
                        break;
                    case 3:
                        fetchClassifiedReports(renderSummaryOfLoanClassiifcation, true) 
                        break;
                    case 4:
                        fetchClassifiedReports(renderSummaryOfNonPerformingLoans, true)
                        break;
                    case 5:
                        fetchClassifiedReports(renderSectorialAnalysisOfLoans, true)
                        break;
                }
            }
        }
    }
    
    function fetchClassifiedReports(renderFunction, filtered=false) {
    
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/loanclassificationreport.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(jtabledata) jtabledata.innerHTML = ''; 
                        data = datasource = records = parseRequest.data 
                        renderFunction()
                        // if(data.length) setNewPaginationContext(paginationLimitInput)
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
            let paramstr = new FormData(document.getElementById('loanclassificationreportform'))
            request.send(paramstr);
        }
        else request.send();
 
    }
    
    function printActiveLoanList() {
        let content = document.getElementById('jpagecontent');
        if(content) {
            var winPrint = window.open('loan report', '', 'width=1000,height=900');
            winPrint.document.write('<html><head><title></title>');
            winPrint.document.write('<link rel="stylesheet" type="text/css" media="print" href="index.css">');
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
      
}

var loanclassificationreportbtn = document.getElementById('loanclassificationreport')
if(loanclassificationreportbtn) loanclassificationreportbtn.addEventListener('click', openLoanClassificationReport, false)