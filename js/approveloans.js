async function openApproveLoan() {

    await httpRequest('approveloans.php')
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)
    
    const selectAllLoansBtn = document.getElementById('selectall-l');
    const approveLoanBtn = document.getElementById('approve-l');
    const declineLoanBtn = document.getElementById('decline-l');
    const approveloanstable = document.getElementById('approveloanstable')
    
    datasource = []
    let selectedLoans = []
    
    if(selectAllLoansBtn) selectAllLoansBtn.addEventListener('click', selectAllLoans)
    if(approveLoanBtn)approveLoanBtn .addEventListener('click', approveLoan)
    if(declineLoanBtn) declineLoanBtn.addEventListener('click', declineALoan)
    
    
    function selectAllLoans() { 
        let tablebody = approveloanstable.querySelector('tbody') 
        let inputs = tablebody.querySelectorAll('input[type="checkbox"]')
        if(inputs.length) inputs.forEach ( item => item.checked = true)
    }
    
    function approveLoan() { 
        let selectedLoans = getSelectedLoans()
        if(!selectedLoans.length) return errorBox('Please make loan(s) selection')
        else assignLoanAction('APPROVE', selectedLoans)
    }
    
    function declineALoan() { 
        let selectedLoans = getSelectedLoans()
        if(!selectedLoans.length) return errorBox('Please make loan(s) selection')
        else assignLoanAction('DECLINE', selectedLoans)
    }
    
    async function assignLoanAction(action, selectedLoans) {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/loanapprovalscript.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        callModal(`Loan ${action.toLowerCase() == 'approve' ? 'approval' : 'decline'} successful`, 1)
                        openApproveLoan()
                    }
                    else return callModal(parseRequest.message)
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        request.setRequestHeader('Connection','close'); 
        
        let paramstr = new FormData()
        paramstr.append('buttonselected', action)
        paramstr.append('idsize', selectedLoans.length)
        if(selectedLoans.length) selectedLoans.map( (item, index) => paramstr.append(`ids${index}`, +item.id))
        request.send(paramstr);
    }
    
    async function fetchNewLoans() {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchnonapprovedloans.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(jtabledata) jtabledata.innerHTML = '';
                        data = datasource = parseRequest.data
                        if(data.length) initPagination(datasource, setCurrentPage)
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
        request.send();
    }
    
    
    function renderAprroveLoansTable(item, index) {
        if(approveloanstable && datasource.length) {
            let tablebody = approveloanstable.querySelector('tbody')
            if(tablebody) {
                tablebody.innerHTML += `
                    <tr class="source-row-item">
                        <td>
                            <span class="jflex" style="align-items:end;">
                                <span> ${ index + 1 } </span>
                                <span class="jmargin-left"> <input type="checkbox" id="l-${index}"> </span>
                            </span>
                        </td>
                        <td>${item.accountnumber}</td>
                        <td>${item.accountname}</td>
                        <td>${new Date(item.openingdate).toLocaleDateString()}</td>
                        <td>${item.maturitydate}</td>
                        <td>${item.loantype}</td>
                        <td>${item.loanduration}</td>
                        <td>${formatMoney(item.amount)}</td>
                        <td>${item.interestrate}</td>
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
    
    function getSelectedLoans() {
        let arr = [];
        let tablebody = approveloanstable.querySelector('tbody')
        let inputs = tablebody.querySelectorAll('input[type="checkbox"]:checked');
        if(inputs.length) inputs.forEach( item => arr.push({id: getLoanId(item.id.split('-')[1])}))
        return arr
    }
    
    function getLoanId(loanindex) {
        return datasource[+loanindex].id
    }
    
    function setCurrentPage(pageNum) {
                
        currentPage = pageNum;
        
        handleActivePageNumber();
        handlePageButtonsStatus();
    
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        
        if(jtabledata) jtabledata.innerHTML = '';
        
        datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                renderAprroveLoansTable(item, index)
            }
        })
    }
    
   fetchNewLoans()
}

let approveloansbtn = document.getElementById('approveloans')
if(approveloansbtn) approveloansbtn.addEventListener('click', openApproveLoan, false)