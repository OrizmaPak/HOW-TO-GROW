async function openMissedRepaymentLoans() {
    
    await httpRequest('missedrepaymentloans.php')
    
    var paginationLimit = 40
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCurrentPage)
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    datasource = [];
    
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
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
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {setCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
    
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
            if(document.querySelector('#missedrepaymentloantable tbody').innerHTML === '') missedrepaymentloansbtn.click()
        }
        else  jtabledata.innerHTML=  renderNoTableData() 
    }
    
    function renderTableHTML(item, index) {
        jtabledata.innerHTML += `
            <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                <td> ${ index +1} </td>
                <td> ${ item.loanaccount }</td>
                <td> ${ item.accountname }</td>
                <td> ${ item.duedate }</td>
                <td> ${ item.paymentdate }</td>
                <td> ${ formatMoney(+item.amountdue + (+item.interestdue)) }</td>
                <td> ${ item.hfield == '-' ? 'Pending' : 'Paid' } </td>
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
    
    async function fetchMissedRepaymentloans(filtered=false) {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/missedloanrepayments.php',true);
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
        request.send();
    }
        
    fetchMissedRepaymentloans();
}

var missedrepaymentloansbtn = document.getElementById('missedrepaymentloans')
if(missedrepaymentloans) missedrepaymentloansbtn.addEventListener('click', openMissedRepaymentLoans, false) 
