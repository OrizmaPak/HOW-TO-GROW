var form; var propertytransactions; datasource = []

async function propertytransactionreport () {
    await  httpRequest('propertytransactionreport.php')
    form = document.getElementById('propertytransactionreportform')
    
    form.querySelector('#matpropertytransactionstartdate').valueAsDate = new Date()
    form.querySelector('#matpropertytransactionenddate').valueAsDate = new Date()
    
    if(form.querySelector('#submit'))  form.querySelector('#submit').addEventListener('click',  renderPropertyTransactionReport)
    document.querySelector('button#print-ptr').addEventListener('click', printPropertyTransactionReport)
    document.querySelector('button#export-ptr').addEventListener('click', exportPropertyTransactionReport)
    
    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(propertyTransactionReportsetCurrentPage)
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    // await fetchPropertyTransactionReportPageData()
    
    function printPropertyTransactionReport() {
        if(propertytransactions.length) printContent('Property Transactions Report', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
    }

    function exportPropertyTransactionReport() {
        if(propertytransactions.length) tableToExcel('propertytransactiontable', 'property_transactions_report')
    }

    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await propertyTransactionReportsetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {propertyTransactionReportsetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }

    async function fetchPropertyTransactionReportPageData() {
        await fetchPropertyTransactionReportCustomerAccounts()
        await fetchPropertyTransactionReportPropertyAccounts()
        await retrieveAndAppendMarketers()
        await fetchPropertyTransactionReportLocations()
    }
    
    async function fetchPropertyTransactionReportLocations() {
        showSpinner()
        let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
        let res = await result.json();
        if(res?.status) {
            hideSpinner()
            let data =  res.data?.data;
            locationsvar = data;
            let options = '';
            data?.map(function(item, index){
                options += `
                    <option value="${item.id}"> ${item.location} </option>
                `
            })
            if(form.querySelector('#location')){
                form.querySelector('#location').innerHTML = ''
                form.querySelector('#location').innerHTML = '<option value="">--Select Location --</option>'+options
            }
        }else  hideSpinner()
    }
    
    async function fetchPropertyTransactionReportCustomerAccounts (event) {
        showSpinner()
        let paramstr = new FormData()
        let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: paramstr, headers: new Headers()})
        let res = await result.json();
        if(res?.status) { 
            hideSpinner()
            propertycustomers= res.data?.data;
        } else hideSpinner()
    }
    
    async function fetchPropertyTransactionReportPropertyAccounts() {
        showSpinner()
        let result = await fetch('../controllers/fetchpropertyaccounts.php', {method: 'POST', body: {}, headers: new Headers()})
        let res = await result.json();
        if(res?.status) {
            hideSpinner()
            let data  =  res.data
            propertiesaccountslist =  data;
            // let options = '';
            // data?.forEach(async function(item, index){
            //     try {
            //         let customer = propertycustomers?.find( val => val.id == item.customer);
            //         if(customer) options += `
            //             <option value="${item.accountnumber}"> ${customer.firstname + ' ' + customer.lastname + ' ' + (customer.othernames == '' ? '': customer.othernames) + ' - ' + item.accountnumber + ' - ' + new Date(item.registrationdate).toLocaleDateString() } </option>
            //         `
            //     }
            //     catch(e) {console.log(e)}
                
            // })
            // if(form.querySelector('#account')) {
            //     form.querySelector('#account').innerHTML = '';
            //     form.querySelector('#account').innerHTML = '<option value="" selected="">--Select Account --</option>'+options
            // }
            
        } else  hideSpinner()
    }
    
    async function retrieveAndAppendMarketers() {
        let result = await httpJsonRequest('../controllers/fetchmarketers.php')
        if(result?.status) {
            marketersDataSource = result
            if(document.getElementById('matpropertytransactionmarketer')) document.getElementById('matpropertytransactionmarketer').innerHTML = `
                    <option value=""> -- Select item -- </option>
                `
            marketersDataSource.data?.map((item, index) => {
                try {
                    document.getElementById('matpropertytransactionmarketer').innerHTML += `
                        <option value="${item.marketer[0]['id']}">${ item.marketer[0]['firstname'] + ' ' + item.marketer[0]['lastname'] + ' ' +  item.marketer[0]['othernames'] }</option>
                    `
                }
                catch(e){}
            })
        }
    }
    
    async function renderPropertyTransactionReport(event) {
        event.target.disabled = true;
        let res = await httpJsonRequest('../controllers/fetchpropertytransactions.php', 'POST', getPropertyTransactionFormParams())
        if(res?.status) {
            event.target.disabled = false;
            propertytransactions = datasource = res.data;
            document.querySelector('#propertytransactiontable tbody')?.innerHTML === ''
            if(propertytransactions.length) setNewPaginationContext(paginationLimitInput)
        }
        else {
            if(jtabledata) jtabledata.innerHTML = '';
            event.target.disabled = false;
            callModal(res.message, 0)
        }
        
    }
    
    function propertyTransactionReportsetCurrentPage (pageNum){
        currentPage = pageNum;
        handleActivePageNumber();
        handlePageButtonsStatus();
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        if(jtabledata) jtabledata.innerHTML = '';
        if(propertytransactions.length) {
            propertytransactions.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    appendPropertyTransactionsTableRows(item, index)
                }
            })
            
            if (pageCount === currentPage) renderTablePropertyTransactionsFooter()
            else {
                try {
                    document.querySelector('#propertytransactiontable #tablefooter')?.remove()
                }
                catch(e) {console.log(e)}
            }
            
            if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#propertytransactiontable #tablefooter')){
                document.querySelector('#propertytransactiontable #tablefooter')?.remove()
                propertytransactionreportbtn.click()
                document.querySelector('button#submit').click()
            }

        }
    }
    
    async function appendPropertyTransactionsTableRows(item, index) {
        
        item.credit = +item.credit
        item.debit = +item.debit
        
        jtabledata.innerHTML += `
            <tr class="source-row-item">
                <td>${index + 1}</td>
                <td>${item.accountnumber}</td>
                <td>${ item.reference}</td>
                <td>${ item.ttype }</td>
                <td>${ formatMoney(item.servicecharge ) } </td>
                <td>${ new Date(item.transactiondate).toLocaleDateString() }</td>
                <td>${ item.credit == 0 ? '-' : formatMoney(item.credit) }</td>
                <td>${ item.debit == 0 ? '-' : formatMoney(item.debit) }</td>
            </tr>
        `
    } 
    
    function renderTablePropertyTransactionsFooter () {
        let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.debit), 0)
        let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.credit), 0)
        let servcharge = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.servicecharge), 0)
     
        document.querySelector('#propertytransactiontable tbody').innerHTML += `
            <tr id="tablefooter">
                <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="4"> total </td>
                <td style="text-transform: uppercase;font-weight:bold">${ formatMoney(servcharge) }</td>
                <td style="text-transform: uppercase;"></td>
                <td style="text-transform: uppercase;font-weight:bold"> ${formatMoney(credit)}</td>
                <td style="text-transform: uppercase;font-weight:bold">${formatMoney(debit)}</td>
            </tr>
        `
    }

    
    function validatePropertyTransactionForm(){
    	var flag = 1;
    	var mssg='';
    	//used for BVN instead
    	var matpropertytransactionmarketer = document.getElementById('matpropertytransactionmarketer');
        var matpropertytransactionmonth = document.getElementById('matpropertytransactionstartdate');
    	var matpropertytransactionyear = document.getElementById('matpropertytransactionenddate');
    	var matpropertytransactiontotalqty = document.getElementById('matpropertytransactiontotalqty');
    	var accounts = form.querySelector('#account')
    	
    	
    	if(matpropertytransactionmarketer.value.length < 1){
    		mssg += 'Item Name is Invalid <br />';			
    		matpropertytransactionmarketer.style.borderColor = 'red';
    		flag =0;
    	}
    	else if(matpropertytransactionmarketer.value.length  > 250){
    	    mssg += 'Item name must not more than 250 characters'
    	    matpropertytransactionmarketer.style.borderColor = 'red';
    		flag =0;
    	}
    	else{
    		matpropertytransactionmarketer.style.borderColor = 'lightgray';
    	}
    	
    	if(matpropertytransactionmonth.value.length < 1){
    		mssg += 'Date from is Invalid <br />';			
    		matpropertytransactionmonth.style.borderColor = 'red';
    		flag =0;
    	}else{
    		matpropertytransactionmonth.style.borderColor = 'lightgray';
    	}
    	
    	if(matpropertytransactionyear.value.length < 1){
    		mssg += 'Date to is Invalid <br />';			
    		matpropertytransactionyear.style.borderColor = 'red';
    		flag =0;
    	}else{
    		matpropertytransactionyear.style.borderColor = 'lightgray';
    	}
    	
    	if(flag == 0){
    		
    		var mbox = document.getElementById('messageBox');
    		mbox.innerHTML = mssg;
    		mbox.style.display = 'block';
    		mbox.style.visibility = 'visible';
    
    		setTimeout(function(){
    			mbox.style.display = 'none';
    			mbox.style.visibility = 'hidden';
    			matpropertytransactionmarketer.style.borderColor = 'lightgray';
    			matpropertytransactionmonth.style.borderColor = 'lightgray';
    			matpropertytransactionyear.style.borderColor = 'lightgray';
    			matpropertytransactiontotalqty.style.borderColor = 'lightgray';
    		
    
    		}, 2000);	
    		return false;
    	}else{ 
    		return true; 
    	}
    
    }
    
    function getPropertyTransactionFormParams(){
    	var paramstr = new FormData(form);
        return paramstr;
    }

}


var propertytransactionreportbtn = document.getElementById('propertytransactionreport');
if(propertytransactionreportbtn) propertytransactionreportbtn.addEventListener('click', propertytransactionreport);

