
async function openPastMaturityDateLoans() {
    
    await httpRequest('pastmaturitydateloans.php');
    
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
            if(document.querySelector('#pastmaturityloanstable tbody').innerHTML === '') setNewPaginationContext()
        }
        else  jtabledata.innerHTML=  renderNoTableData(17) 
    }
    
    async function renderTableHTML(item, index) {
        let loc = await propertylocations.find(value => value.id == (~~Math.abs(item.location)) )
        jtabledata.innerHTML += `
            <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                <td> ${ index +1} </td>
                <td>${item.accountnumber || item.loanaccount}</td>
                <td>${item.accountname}</td>
                <td>${item.openingdate}</td>
                <td>${item.maturitydate}</td>
                <td>${item.loantype}</td>
                <td>${item.loanduration}</td>
                <td>${formatMoney(item.amount)}</td>
                <td>${item.loanofficer}</td>
                <td>${item.interestrate}%</td>
                <td>${item.interesttype}</td>
                <td>${item.interestperiod}</td>
                <td>${item.interestmethod}</td>
                <td>${item.reference}</td>
                <td>${formatMoney(item.installmentamount)}</td>
                <td>${loc?.location}</td>
                <td>${item.hfield == '-' ? 'Pending' : 'Paid'}</td>
            </tr>
            `
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
    
    
    async function fetchLoansPastMaturity() {
       showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchpastmaturityloans.php',true);
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
                    else {
                        jtabledata.innerHTML=  renderNoTableData(17)
                        return callModal('Not records retrieved.')
                    }
                    
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
    
    await fetchLocations()
    fetchLoansPastMaturity();
    
    
    async function fetchLocations() {
        showSpinner()
        let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
        let res = await result.json();
        if(res?.status) { 
            hideSpinner()
            propertylocations = res.data?.data;
        } else hideSpinner()
    }

}

let pastmaturitydateloansbtn = document.getElementById('pastmaturitydateloans')
if(pastmaturitydateloansbtn) pastmaturitydateloansbtn.addEventListener('click', openPastMaturityDateLoans, false) 