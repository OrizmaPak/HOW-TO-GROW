//  savings product --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    var inputs; var productName; var interestRate; var interestMethod; var interestAdditionToAccount; var minimumBalanceForInterest; var savingsAccountOverdrawn; var minWithdrawalBalance; var branch; var accountProductSubmitbtn;
    var interestMethodHelp; var interestMethodHelpToggle;

    async function openSavingsProducts() {
    
        await httpRequest('savingsproducts.php');
    
        productName = document.getElementById('productname');
        interestRate = document.getElementById('interestrate');
        interestMethod = document.getElementById('interestmethod');
        interestAdditionToAccount = document.getElementById('addinterestperiod');
        minimumBalanceForInterest = document.getElementById('minimumbalanceforinterest');
        savingsAccountOverdrawn = document.querySelector('input[name="savingsaccountoverdrawn"]');
        minWithdrawalBalance = document.getElementById('minimumbalanceforwithdrawal');
        branch = document.getElementById('branch');
        accountProductSubmitbtn = document.getElementById('accountproductsubmitbtn');
        
        if(checkIfUpdate()) mode('update')
        
        else mode()
    
        if(accountProductSubmitbtn) accountProductSubmitbtn.addEventListener('click', (e) => {
            runSavingsProductsValidation();
        })
    
        interestMethodHelp = document.getElementById('interestmethodhelp');
        interestMethodHelpToggle = document.getElementById('interestmethodhelptoggle');
        
        if (interestMethodHelpToggle) interestMethodHelpToggle.addEventListener('click', () => {
            if(interestMethodHelp) {
    
                if(interestMethodHelp.classList.contains('hide')) {
                    interestMethodHelp.style.display = 'block';
                    interestMethodHelp.classList.remove('hide');
                    interestMethodHelp.classList.add('show');
                }
                else {
                    interestMethodHelp.style.display = 'none';
                    interestMethodHelp.classList.add('hide')
                    interestMethodHelp.classList.remove('show');
                }
            }
        })
    
        interestAdditionDate();

    }
    
    function mode(mode='savings') { 
        if(mode.includes('update')) {
            let localdata = sessionStorage.getItem('savingsproduct')
            let parsedata = JSON.parse(localdata)
            
            try {
                productName.value = parsedata.productname;
                interestRate.value = parsedata.interestrate
                interestMethod.value = parsedata.interestmethod
                interestAdditionToAccount.value = parsedata.addinterestperiod
                minimumBalanceForInterest.value = parsedata.interestminbalance
                document.querySelectorAll('input[name="savingsaccountoverdrawn"]')[parsedata.overdrawaccount]
                minWithdrawalBalance.value = parsedata.minwithdrawalbalance
                accountProductSubmitbtn.innerHTML = 'Update Product'
            }
            catch(e) {
                null
            }
        }
        else {
            sessionStorage.removeItem('savingsproduct')
         
        }
    }
    
    function checkIfUpdate() {
        return !!sessionStorage.getItem('savingsproduct')
    }

    function controlErrorReport(status, element) {
        if(status === 0) {
            element.style.border = '1px solid red';
        }
        else {
            element.style.border = 'lightgray';
        }
    }

    function interestAdditionDate() {
                
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement("option");
            if(i === 1) {
                option.value = i;
                option.innerHTML = i + 'st of the month';
            }
            if( i === 2) {
                option.value = i;
                option.innerHTML = i + 'nd of the month';
            }
            if(i === 3) {
                option.value = i;
                option.innerHTML = i + 'rd of the month';
            }
            if(i > 3 && i <= 20)  {
                option.value = i;
                option.innerHTML = i + 'th of the month'
            }
            if(i === 21)  {
                option.value = i;
                option.innerHTML = i + 'st of the month';
            }
            if(i === 22)  {
                option.value = i;
                option.innerHTML = i + 'nd of the month';
            }
            
            if(i === 23) {
                option.value = i;
                option.innerHTML = i + 'rd of the month'
            }
            if(i > 23 && i <= 30 )  {
                option.value = i;
                option.innerHTML = i + 'th of the month';
            }
            if( i === 31) {
                option.value = i;
                option.innerHTML = i + 'st of the month'
            }
            
            interestAdditionToAccount.appendChild(option);
        }
    }

    function runSavingsProductsValidation() {
        
        inputs = [
            {input: productName, validation: {required: 'Savings product name is required'}},
            {input: interestRate, validation: {required: 'Interest rate is required', pattern: 'interest rate not valid'}, pattern: new RegExp(/^[0-9.]+$/)},
            {input: interestMethod, validation: {required: 'Interest method is required'}},
            {input: interestAdditionToAccount, validation: {required: 'Select when to add interest'}},
            {input: minimumBalanceForInterest, validation: {required: 'Provide interest minimum balance', pattern: 'Min interest balance not valid'}, pattern: new RegExp(/^[0-9.]+$/)},
            {input: minWithdrawalBalance, validation: {required: 'Provide minimum balance for withdrawal', pattern: 'Min withdrawal balance not valid'}, pattern: new RegExp(/^[0-9.]+$/)}
        ]

        let validations = [];
    
        inputs.map( (field, index) => {
            let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
            if(result)  validations.push(result) ;  
        })
    
        if(validations.length) validatorMapper(validations)
    
        else saveSavingsProducts()
    }

    function collectSaveSavingsFormData() {
        let paramstr = new FormData();
        checkIfUpdate() && paramstr.append('id', 1); 
        paramstr.append('productname', productName.value)
        paramstr.append('interestrate', interestRate.value)
        paramstr.append('interestmethod', interestMethod.value)
        paramstr.append('addinterestperiod', interestAdditionToAccount.value)
        paramstr.append('interestminbalance', minimumBalanceForInterest.value)
        paramstr.append('minwithdrawalbalance', minWithdrawalBalance.value);

        document.querySelectorAll('input[name="duplicatetransaction"]').forEach( item => {
            if(item.checked) {
                paramstr.append('duplicatetransaction',item.value);
            }
        })
        
        document.querySelectorAll('input[name="savingsaccountoverdrawn"]').forEach( item => {
            if(item.checked) {
                paramstr.append('overdrawaccount', item.value)
            }
        })
        return paramstr
    }
    
    function resetSavinsproductForm() {
        try {
            document.getElementById('savingsproductsform').reset()
        }
        catch(e) {
            null
        }
    }
    
    function saveSavingsProducts() {
        
        const data = collectSaveSavingsFormData();
    
    	showSpinner();
    	var request = getAjaxObject();
        
        request.open('POST','../controllers/savingsproductscript.php',true);
        
        request.onreadystatechange = function(e){
             
            if(request.readyState == 1){} 
            
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.message.includes("Successful") || parseRequest.message.includes("Successful")){
                    callModal('Request successful', 1)
                    resetSavinsproductForm()
                }
                else {
                    callModal('Request failed', 0)
                }
            }else{
                hideSpinner()
            } 
    
            e.stopPropagation();
        }

    
        request.setRequestHeader('Connection','close');
        request.send(data);
	 
    }
    
    var observer = new MutationObserver(function(mutations_list) {
        mutations_list.forEach(function(mutation) {
    		try {
    		    mutation.removedNodes.forEach(function(removed_node) {
    			if(removed_node.classList.contains('obs')) {
                    sessionStorage.clear();
    			}
    		    });
    		}
    		catch(e) {
    		    null
    		}
	    });
    })
    
    observer.observe(document.querySelector("#nav-right-container" || "#nav-right-container3"), { subtree: false, childList: true });


var savingsproducts = document.getElementById('savingsproducts');
if(savingsproducts) savingsproducts.addEventListener('click', openSavingsProducts, false)



//  savings account products --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var products = []; var jtabledata;

async function openSavingsAccountsproduct() {
    
    await httpRequest('savingsaccountsproducts.php')
    
    jtabledata = document.getElementById('jtabledata')
    
    await fetchSavingsProducts(renderTable);
}

function renderTable() {
    if(jtabledata) jtabledata.innerHTML = '';
    if(products.length){
        products.map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.productname } </td>
                    <td> ${ item.interestrate} </td>
                    <td> ${ item.interestmethod} </td>
                    <td style="text-transform:none"> ${ item.addinterestperiod} of every month </td>
                    <td>
                        <span style="color:rgb(0, 105, 217);font-weight:bold" onclick="updateItem(${index})">Update</span>
                    </td>
                </tr>
            `
        })
        
    }
}

async function updateItem(itemindex) {
    if(itemindex !== null || itemindex !== undefined) {
        sessionStorage.setItem('savingsproduct', JSON.stringify(products[itemindex]))
        try {
            document.getElementById('savingsproducts').click()
        }
        catch(e) {
            return null
        }
    }
}

async function fetchSavingsProducts(cb=null) {
    let result = await fetchRequest('../controllers/fetchsavingsproductscript.php')
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.message.includes('Successful') && parseResult.result.includes('Successful')){
           products = parseResult.data.data
           cb();
        }
    }
}
var savingsaccountproductbtn = document.getElementById('savingsaccountsproducts')
if(savingsaccountproductbtn) savingsaccountproductbtn.addEventListener('click', openSavingsAccountsproduct, false)


//   savings account --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form;var localItem;var bankcodes;
async function openSavingsAccount () {
    await httpRequest('savingsaccount.php')
    form = document.getElementById('savingsaccountform');
    if(form.querySelector('button')) form.querySelector('button').addEventListener('click', validateSavingsAccount);
    if(document.querySelector('#user')) document.querySelector('#user').addEventListener('change', getsavingsmarketergroup);
    await fetchSavingsFormData();
    if(checkIfSavingsUpdate()){
        await fetchSavingsAccountCustomerAccounts('all')
        setTimeout(()=>{ savingsAccountMode('update')},2000)
    }else savingsAccountMode();
}

function getsavingsmarketergroup(){
    if(!document.querySelector('#user').value)return
    function action(res){
        document.getElementById('marketergroup').value = res.data.id
    }
    function params(){
        let p = new FormData()
        p.append('marketeremail', document.querySelector('#user').value)
        return p
    }
    callController('fetchgroupbymarketeremail.php', params(), 'fetchgroupbymarketeremail', [], action)
}

var savingsaccountidd = [`id`, `customer`,`savingsproduct`, `registrationdate`, `registrationpoints`,
`valuedate`, `bankname1`,`bankaccountnumber1`, `bankname2`,`bankaccountnumber2`,`dailyunit`,`marketergroup`,
`user`,`status`, 'serialnumberfrom', 'serialnumberto', 'registrationcharge']

var checkIfSavingsUpdate = function() {
    return !!sessionStorage.getItem('savingsaccount')
}

var savingsAccountMode = function(mode='savings') { 
    if(mode.includes('update')) {
        let localdata  = sessionStorage.getItem('savingsaccount')
        let parsedata = localItem = JSON.parse(localdata);
        try {
            
            console.log(parsedata)
            
            if(parsedata.mode == 'view')  form.querySelector('button#submit').disabled = true;
            else { 
                form.querySelector('button#submit').disabled = false;
                if(form.querySelector('button#submit')) form.querySelector('button#submit').innerHTML = 'Update savings account'
            }
            
            form.querySelector('#accountnumber').value = parsedata.account.accountnumber 
            form.querySelector('#accountcode').value = parsedata.account.code 
            console.log('the customer', parsedata.account.customer)
            fetchSavingsAccountCustomerAccounts('', { 
                value: parsedata.account.customer, 
                text: parsedata.account.customername
            });

            form.querySelector('#customer').tomselect.setValue(parsedata.account.customer) 
            form.querySelector('#savingsproduct').value = parsedata.account.savingsproduct 
            form.querySelector('#savingsproduct').value = parsedata.account.savingsproduct 
            form.querySelector('#registrationdate').value = parsedata.account.registrationdate 
            form.querySelector('#location').value = parsedata.account.location 
            form.querySelector('#bankaccountnumber1').value = parsedata.account.bankaccountnumber1 
            form.querySelector('#bankaccountnumber2').value = parsedata.account.bankaccountnumber2
            
            form.querySelector('#bankname1').selectedIndex = findBankFromCode(parsedata.account.bankname1)
            form.querySelector('#bankname2').selectedIndex = findBankFromCode(parsedata.account.bankname2)
            // form.querySelector('#bankname1').value = parsedata.account.bankname1
            // form.querySelector('#bankname2').value = parsedata.account.bankname2
            form.querySelector('#dailyunit').value = parsedata.account.dailyunit
            form.querySelector('#marketergroup').value = parsedata.account.marketergroup
            form.querySelector('#user').value = parsedata.account.accountofficer
            
            maskInputs(['serialnumberfrom', 'serialnumberto'])
            form.querySelector('#serialnumberfrom').value = parsedata.account.serialnumberfrom
            form.querySelector('#serialnumberto').value = parsedata.account.serialnumberto

            
            sessionStorage.removeItem('savingsaccount')
        }
        catch(e) {  console.log(e) }
        
    }
    else {
        sessionStorage.removeItem('savingsaccount')
        localItem = null;
    }
}




function findBankFromCode(bankinfo) {
    let findbankIndex = bankcodes?.findIndex( item => item.code == bankinfo?.split('|')[1] )
    return findbankIndex;
}

function validateSavingsAccount(){
	
	inputs = []
    
    savingsaccountidd.forEach(item => {
        if(form.querySelector(`#${item}`)) {
            inputs.push({ input: form.querySelector(`#${item}`), validation: {required: `${item} is required`}})
        }
    })

    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result);  
    })

    if(validations.length) validatorMapper(validations)
    
    if(!validateSerialNumbers()) return
    else  saveSavingsAccount()

}


function validateSerialNumbers() {

      var serialNumberFrom = parseFloat(document.getElementById('serialnumberfrom').value);
      var serialNumberTo = parseFloat(document.getElementById('serialnumberto').value);


    //   if (serialNumberFrom === serialNumberTo) {
    //     callModal('Serial numbers cannot be the same.', 0);
    //     form.querySelector('#serialnumberfrom').style.borderColor = 'red'
    //     form.querySelector('#serialnumberto').style.borderColor = 'red'
    //     return false;
    //   }

 
    //   if (serialNumberFrom >= serialNumberTo) {
    //     callModal('Serial number "From" must be less than "To".', 0);
    //     form.querySelector('#serialnumberfrom').style.borderColor = 'red'
    //     form.querySelector('#serialnumberto').style.borderColor = 'red'
    //     return false;
    //   }


    //   if (!Number.isInteger(serialNumberFrom) || !Number.isInteger(serialNumberTo)) {
    //     callModal('Serial numbers must be whole numbers.', 0);
    //     form.querySelector('#serialnumberfrom').style.borderColor = 'red'
    //     form.querySelector('#serialnumberto').style.borderColor = 'red'
    //     return false;
    //   }

      // Validation passed
      form.querySelector('#serialnumberfrom').style.borderColor = ''
      form.querySelector('#serialnumberto').style.borderColor = ''
      return true;
}

function getSavingsAccountParams(){
    var paramstr = new FormData(document.getElementById('savingsaccountform'));
    paramstr.set('customer', document.getElementById('customer').tomselect.getValue())
    paramstr.set('bankname1', `${bankcodes[+document.getElementById('bankname1').value]?.name}|${bankcodes[+document.getElementById('bankname1').value]?.code}`)
    paramstr.set('bankname2', `${bankcodes[+document.getElementById('bankname2').value]?.name}|${bankcodes[+document.getElementById('bankname2').value]?.code}`)
    return paramstr;
}

var	saveSavingsAccount = function(e){

    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/savingscript.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Savings Account Saved', 1)
                    form.reset();
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }

    request.setRequestHeader('Connection','close'); 
    request.send(getSavingsAccountParams());
    
}

async function fetchSavingsAccountUsers (officers='officers', second='') {
    showSpinner()
    let result = await fetchRequest('../controllers/fetchallusers.php');
    if(result) {
        hideSpinner()
        let parseResult  =  JSON.parse(result);
        propertyusers = parseResult;
        if(parseResult.status){
            let options = '';
            let options2 = '';
            const loc = document.getElementById('sessionlocation').value;
            parseResult.data.map(function(item, index){
            // options += `
            //     <option value="${item.id}"> ${item.firstname} ${item.othername ?? ''} ${item.lastname} </option>
            // `  
            options += `
                <option value="${item.email}">${item.firstname??'-'}_${item.othernames??'-'}_${item.lastname??'-'}</option>
            `
            options2 += `
                <option value="${item.firstname??'-'}_${item.othernames ?? '-'}_${item.lastname??'-'}">${item.email}</option>
            `
            })
            if(document.getElementById(officers)){
                document.getElementById(officers).innerHTML = ''  
                document.getElementById(officers).innerHTML = options
            }
            
            if(document.getElementById(second)){
                document.getElementById(second).innerHTML = ''
                document.getElementById(second).innerHTML = options2
            }
            
        }
    } else  hideSpinner()
}
async function fetchSavingsAccountLocations() {
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
                <option ${item.id == document.getElementById('sessionlocation').value ? 'selected' : ''} value="${item.id}"> ${item.location} </option>
            `
        })
        if(document.getElementById('location')){
            document.getElementById('location').innerHTML = ''
            document.getElementById('location').innerHTML = '<option value="" >--Select Location --</option>'+options
        }
    }else  hideSpinner()
}
async function fetchSavingsAccountRegistrationPoints() {
    showSpinner()
    let result = await fetch('../controllers/fetchregistrationpoints.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data =  res.data?.data;
        locationsvar = data;
        let options = '';
        data?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.registrationpoint} </option>
            `
        })
        if(document.querySelector('#savingsaccountform #registrationpoints')){
            document.querySelector('#savingsaccountform #registrationpoints').innerHTML = ''
            document.querySelector('#savingsaccountform #registrationpoints').innerHTML = '<option value="" selected="">--Select registration point --</option>'+options
        }
    }else  hideSpinner()
}

async function fetchSavingsAccountCustomerAccounts(state = '', preselectedOption = null) {
    // Debounce function to delay API calls
    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    // Function to fetch customers by name
    async function fetchCustomersByName(query, callback) {
        let formData = new FormData();
        if (query.length) {
            formData.append('customername', query);
        }

        try {
            let response = await fetch('../controllers/fetchcustomerbynames.php', {
                method: 'POST',
                body: formData
            });

            let res = await response.json();

            if (res?.status) {
                let customers = res.data || [];
                let options = customers.map(item => ({
                    value: item.id,
                    text: `${item.lastname} ${item.firstname} ${item.othernames || ''}`
                }));
                callback(options); // Pass the options to TomSelect
            } else {
                callback([]); // Ensure callback is called with an empty array if no valid data
            }
        } catch (error) {
            callback([]); // Ensure callback is called even if there's an error
        }
    }

    // Initialize TomSelect
    function initializeCustomerSelect(loadAll = false, preselectedOption = null) {
        let customerSelect = document.getElementById('customer');
        if (customerSelect?.tomselect) {
            customerSelect.tomselect.destroy(); // Destroy if already initialized
        }

        let selectInstance = new TomSelect('#customer', {
            plugins: ['dropdown_input'],
            load: debounce((query, callback) => {
                console.log('debounce');
                fetchCustomersByName(query.trim(), callback);
            }, 800), // Apply debounce to prevent excessive requests
            maxOptions:10000
        });

        // If `state === 'all'`, fetch and load all data immediately
        if (loadAll) {
            fetchCustomersByName('', (options) => {
                console.log('Fetching all customers');
                selectInstance.clearOptions();
                selectInstance.addOptions(options);
            });
        }

        // If a preselected option is provided, manually add and select it
        if (preselectedOption) {
            selectInstance.clearOptions();
            selectInstance.addOption(preselectedOption); // Add only this option
            selectInstance.setValue(preselectedOption.value); // Select it
        }
    }

    // If `state === 'all'`, fetch all customers immediately
    
    setTimeout(()=>{initializeCustomerSelect(state === 'all', preselectedOption);},2000);
}



async function fetchSavingsAccountGroupName() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data =  groupnames = res.data?.data;
        let options = '';
        data.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.groupname} </option>
            `
        })
        if(document.getElementById('marketergroup')){
            document.getElementById('marketergroup').innerHTML = ''
            document.getElementById('marketergroup').innerHTML = '<option value="" selected="">--Select Group --</option>'+options
        }
        
    } else  hideSpinner()
}
async function fetchSavingsAccountProducts() {
    let result = await fetchRequest('../controllers/fetchsavingsproductscript.php')
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.status){
            products = parseResult.data.data;
            let options = '';
            products?.map(function(item, index){
                options += `
                    <option value="${item.id}"> ${item.productname} </option>
                `
            })
            if(document.getElementById('savingsproduct')){
                document.getElementById('savingsproduct').innerHTML = ''
                document.getElementById('savingsproduct').innerHTML = '<option value="" selected="">--Select product --</option>'+options
            }
        }
    }
}

async function fetchBankAccountNames() {
    let result = await fetchRequest('../controllers/fetchbankaccountnames.php')
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.status){
            bankcodes = parseResult.data;
            let options = ''
            options = bankcodes?.map( (item, index) => `<option value="${index}"> ${item.name} </option>`).join('')
            if(form) {
                if(form.querySelector('#bankname1'))form.querySelector('#bankname1').innerHTML = options
                if(form.querySelector('#bankname2'))form.querySelector('#bankname2').innerHTML = options
            }
        }
        else {
            if(form.querySelector('#bankname1'))form.querySelector('#bankname1').innerHTML = `<option value=""> --Select Bank -- </option>`
            if(form.querySelector('#bankname2'))form.querySelector('#bankname2').innerHTML = `<option value=""> --Select Bank -- </option>`
        }
    }
}

async function fetchRegistrationCharge() {
    let result = await fetchRequest('../controllers/fetchorganisationscript.php')
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.status){
            charge = parseResult.data.data[0].registrationcharge;
            try {
                document.getElementById('registrationcharge').value = formatMoney(charge)
                console.log(formatMoney(charge))
            }
            catch(e) {
                console.log(e)
            }
        }
    }
}

async function fetchSavingsFormData() {
    await fetchSavingsAccountCustomerAccounts();
    await fetchSavingsAccountUsers()
    await fetchBankAccountNames()
    await fetchSavingsAccountLocations();
    await fetchSavingsAccountGroupName();
    await fetchSavingsAccountRegistrationPoints()
    await fetchSavingsAccountProducts()
    await fetchRegistrationCharge()
}


var savingsaccountbtn = document.getElementById('savingsaccount')
if(savingsaccountbtn) savingsaccount.addEventListener('click', openSavingsAccount, false)


//   view savings account --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var viewsavingsusers;var savings;
async function openViewSavingsAccount () {
    await httpRequest('viewsavingsaccount.php')
    form = document.getElementById('filtersavingsaccountform')
    if(form.querySelector('button')) form.querySelector('button').addEventListener('click', generateSavingsReport)
    await fetchViewSavingsFormData()
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(savingsAccountsetCurrentPage)
    fetchSavingsAccountUsers('accountofficerlist')
}

async function generateSavingsReport(event) {
    // Prevent default form submission if this is triggered by a form submit
    event.preventDefault();

    // Disable the button to prevent multiple submissions
    const submitButton = event.target;
    submitButton.disabled = true;

    // Show a loading SweetAlert
    Swal.fire({
        title: 'Generating Report...',
        text: 'Please wait while we generate your savings report.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
        customClass: {
            popup: 'swal-zoom' // Apply your custom CSS class if needed
        }
    });

    try {
        // Assuming the event target is a button inside a form
        const form = submitButton.closest('form');
        if (!form) {
            throw new Error('Form not found.');
        }

        // Create FormData from the form
        const formData = new FormData(form);

        // Send the POST request
        const response = await fetch('../controllers/fetchsavingsaccounts.php', {
            method: 'POST',
            body: formData
            // Note: When using FormData, you should not set the 'Content-Type' header manually.
        });

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const res = await response.json();

        // Close the loading SweetAlert
        Swal.close();

        if (res.status) {
            // Update your data sources
            savings = datasource = res.data;

            if (savings.length) {
                // Initialize pagination or any other UI updates
                initPagination(res.data, savingsAccountsetCurrentPage);

                // Show a success SweetAlert
                Swal.fire({
                    title: 'Success',
                    text: 'Savings report generated successfully.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'swal-zoom' // Apply your custom CSS class if needed
                    }
                });
            } else {
                // Show an informational SweetAlert if no records are found
                Swal.fire({
                    title: 'No Records Found',
                    text: 'There are no savings accounts matching your criteria.',
                    icon: 'info',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'swal-zoom' // Apply your custom CSS class if needed
                    }
                });
            }
        } else {
            // Show an error SweetAlert with the message from the server
            Swal.fire({
                title: 'Error',
                text: res.message || 'An unexpected error occurred.',
                icon: 'error',
                customClass: {
                    popup: 'swal-zoom' // Apply your custom CSS class if needed
                }
            });
        }
    } catch (error) {
        // Close the loading SweetAlert if it's still open
        Swal.close();

        // Show an error SweetAlert for any caught exceptions
        Swal.fire({
            title: 'Error',
            text: error.message || 'Failed to generate the report. Please try again later.',
            icon: 'error',
            customClass: {
                popup: 'swal-zoom' // Apply your custom CSS class if needed
            }
        });
    } finally {
        // Re-enable the submit button regardless of the outcome
        submitButton.disabled = false;
    }
}

var savingsAccountsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(savings.length) {
        savings.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendSavingsAccountTableRows(item, index)
            }
        })
        if(document.querySelector('#approveloanstable tbody').innerHTML === '') viewsavingsaccountbtn.click()
    }
}

async function appendSavingsAccountTableRows(item, index) {
    // let customerinfo = await propertycustomers.find(value => value.id == item.customer)
    // console.log('customerif', propertycustomers, customerinfo, item.customer)
    // let reg = await regpoints.find(value => value.id == item.registrationpoint)
    // let user = await viewsavingsusers.find(value => value.id == item.accountofficer)
    // let loc = await propertylocations.find(value => value.id === item.location)
    // let group = await groupnames.find( value => value.id == item.marketergroup)

            // <td>${customerinfo?.lastname + ' ' + customerinfo?.firstname + ' ' + (customerinfo?.othernames == '-' ? '' : customerinfo?.othernames)}</td>
    document.getElementById('jtabledata').innerHTML += `
        <tr class="source-row-item">
            <td>${ index + 1 }</td>
            <td>${ item.customername }</td>
            <td>${ item.user } </td>
            <td>${ item.accountnumber } </td>
            <td>${ formatCurrency(item.registrationcharge) } </td>
            <td>${item.locationname??''}</td>
            <td>${formatDate(item.registrationdate)}</td>  
            <td>${item.registrationpointname??''}</td>
            <td>${ item.dailyunit }</td> 
            <td>${ item.groupname??'' }</td>
            <td style="text-transform:none">${ item.accountofficer !== undefined ? item.accountofficer : (user !== undefined ?  user.email : '') }</td> 
            <td class="no-pr">${item?.photourl && item?.photourl !== '-' ? `<a href="https://htg.com.ng/howtogrow/images/customer/${item?.photourl}" target="_blank" rel="noopener noreferrer">${item?.photourl??''}</a>` : `${item?.photourl??''}`}</td>
            <td>${ item.status == 'OPEN' ? 'ACTIVE' : item.status }</td> 
            <td>
                <div class="flex" style="display:flex;justify-content: around;align-items:center;">
                    <button style="padding: 5px 6px;margin-right: 15px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="viewSavingsAccount(${index}, 'view',event)">View</button>
                    <button class="${item?.photourl2 && item?.photourl2 !== '-' ? '' : ''}" style="padding: 5px 6px;margin-right: 15px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="window.open('https://htg.com.ng/howtogrow/images/customer/${item?.photourl2}', '_blank')">View signature</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px" onclick="viewSavingsAccount(${index}, 'update', event)">Edit</button>
                    ${
                        item.status == 'OPEN' 
                        ?
                        `<button style="padding: 5px 6px;margin-left: 15px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="viewSavingsAccountStatus(${item.accountnumber}, 'BLOCK', event)">Block</button>`
                        :
                        item.status == 'BLOCKED'
                        ?
                        `<button style="padding: 5px 6px;margin-left: 15px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:orange;border-radius:3px" onclick="viewSavingsAccountStatus(${item.accountnumber}, 'UNBLOCK', event)">Unblock</button>`
                        :
                        `<button style="padding: 5px 6px;margin-left: 15px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="viewSavingsAccountStatus(${item.accountnumber}, 'BLOCK', event)">Block</button>`
                        
                    }
                </div>
            </td>
        </tr>
    `  
} 

async function viewSavingsAccountStatus(id, status, event) {
    event.preventDefault()
    Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        customClass: {
            popup: 'swal-zoom' // Apply custom CSS class for zooming
        },
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // Simulate loading for one second (optional)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const handleResponse = async (res, successMessage, errorMessage) => {
        if (res.status) {
            // Show success alert and call document.getElementById('searchsubmitsavings').click() once closed
            await Swal.fire({
                title: 'Success',
                text: res.message || successMessage,
                icon: 'success',
                customClass: {
                    popup: 'swal-zoom'
                }
            });
        } else {
            // Show error alert and call document.getElementById('searchsubmitsavings').click() once closed
            await Swal.fire({
                title: 'Error',
                text: res.message || errorMessage,
                icon: 'error',
                customClass: {
                    popup: 'swal-zoom'
                }
            });
        }
        document.getElementById('searchsubmitsavings').click();
    };

    if (status === 'BLOCK') {
        Swal.fire({
            title: 'Block Account',
            html: `<form id="blockAccountForm">
                        <label for="reason">Reason for blocking the account:</label>
                        <textarea id="reason" name="reason" rows="4" style="width: 100%; padding: 5px" 
                            placeholder="Enter your reason here..."></textarea>
                   </form>`,
            showCancelButton: true,
            confirmButtonText: 'Continue',
            customClass: {
                popup: 'swal-zoom' // Apply custom CSS class for zooming
            },
            preConfirm: () => {
                const form = document.getElementById('blockAccountForm');
                const formData = new FormData(form);
                const reason = formData.get('reason').trim();

                if (!reason) {
                    Swal.showValidationMessage('Please provide a reason to block the account.');
                    return null;
                }
                return { reason };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { reason } = result.value;
                Swal.fire({
                    title: 'Confirm Block',
                    text: `Are you sure you want to block the account for the following reason: "${reason}"?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Block It',
                    customClass: {
                        popup: 'swal-zoom' // Apply custom CSS class for zooming
                    }
                }).then(async (confirmResult) => {
                    if (confirmResult.isConfirmed) {
                        try {
                            const blockFormData = new FormData();
                            blockFormData.append('accountnumber', id);
                            blockFormData.append('reason', reason);

                            let response = await fetch('../controllers/togglesavingsaccount.php', {
                                method: 'POST',
                                body: blockFormData
                            });

                            let res = await response.json();
                            await handleResponse(res, 'The account has been successfully blocked.', 'Failed to block the account. Please try again later.');
                        } catch (error) {
                            await Swal.fire({
                                title: 'Error',
                                text: 'Failed to block the account. Please try again later.',
                                icon: 'error',
                                customClass: {
                                    popup: 'swal-zoom'
                                }
                            });
                            document.getElementById('searchsubmitsavings').click();
                        }
                    }
                });
            }
        });
    } else if (status === 'UNBLOCK') {
        Swal.fire({
            title: 'Unblock Account',
            text: 'Are you sure you want to unblock this account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Unblock It',
            customClass: {
                popup: 'swal-zoom' // Apply custom CSS class for zooming
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const unblockFormData = new FormData();
                    unblockFormData.append('accountnumber', id);

                    let response = await fetch('../controllers/togglesavingsaccount.php', {
                        method: 'POST',
                        body: unblockFormData
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    let res = await response.json();
                    await handleResponse(res, 'The account has been successfully unblocked.', 'Something went wrong.');
                } catch (error) {
                    await Swal.fire({
                        title: 'Error',
                        text: 'Failed to unblock the account. Please try again later.',
                        icon: 'error',
                        customClass: {
                            popup: 'swal-zoom'
                        }
                    });
                    document.getElementById('searchsubmitsavings').click();
                }
            }
        });
    }
}



function viewSavingsAccount(propertyindex, mode, event) {
    event.preventDefault()
    sessionStorage.setItem('savingsaccount', JSON.stringify({
            account: datasource[propertyindex],
            mode 
    }))
    if(document.getElementById("savingsaccount")) document.getElementById("savingsaccount").click()
}

async function fetchViewSavingsFormData() {
    await fetchsavingsaccountPropertyUsers()
    await fetchViewSavingsGroupName()
    await fetchViewSavingsCustomerAccounts()
    await fetchViewSavingsRegistrationPoints()
    await fetchSavingsLocations()
    
}

async function fetchsavingsaccountPropertyUsers () {
    showSpinner()
    let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json()
    if(res?.status){
        hideSpinner()
        viewsavingsusers = res.data;
    } else hideSpinner()
    
}
async function fetchViewSavingsGroupName() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data =  groupnames = res.data?.data;
        let options = '';
        data.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.groupname} </option>
            `
        })
        if(form.querySelector('#marketergroup')) {
            form.querySelector('#marketergroup').innerHTML = '';
            form.querySelector('#marketergroup').innerHTML = '<option value="" selected="">--Select Group --</option>'+options
        }
        
    }
    else hideSpinner()
}

async function fetchViewSavingsCustomerAccounts() {
    // Debounce function to delay API calls
    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    // Function to fetch customers by name with debounce
    async function fetchCustomersByName(query, callback) {
        if (!query.length) {
            return callback();
        }

        let formData = new FormData();
        formData.append('customername', query);

        try {
            let response = await fetch('../controllers/fetchcustomerbynames.php', {
                method: 'POST',
                body: formData
            });

            let res = await response.json();

            if (res?.status) {
                let customers = res.data || [];
                let options = customers.map(item => ({
                    value: item.id,
                    text: `${item.lastname} ${item.firstname} ${item.othernames || ''}`
                }));
                callback(options); // Pass the options to TomSelect
            } else {
                callback([]); // Ensure callback is called with an empty array if no valid data
            }
        } catch (error) {
            callback(); // Ensure callback is called even if there's an error
        }
    }

    // Initialize TomSelect with remote search
    function initializeCustomerSelect() {
        let customerSelect = document.getElementById('customer');
        if (customerSelect?.tomselect) { 
            customerSelect.tomselect.destroy(); // Destroy if already initialized
        }

        new TomSelect('#customer', {
            plugins: ['dropdown_input'],
            load: debounce((query, callback) => {
                fetchCustomersByName(query, callback);
            }, 800), // Apply debounce to prevent excessive requests
            maxOptions:10000
        });
    }

    // Call initialization 
    initializeCustomerSelect();
}

// Call function on page load or when needed
// fetchSavingsAccountCustomerAccounts();

async function fetchViewSavingsRegistrationPoints() {
    showSpinner()
    let result = await fetch('../controllers/fetchregistrationpoints.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data = regpoints = res.data?.data;
        locationsvar = data;
        let options = '';
        data?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.registrationpoint} </option>
            `
        })
        if(form.querySelector('#registrationpoint')){
            form.querySelector('#registrationpoint').innerHTML = ''
            form.querySelector('#registrationpoint').innerHTML = '<option value="" selected="">--Select registration point --</option>'+options
        }
    }else  hideSpinner()
}
async function fetchSavingsLocations() {
    showSpinner()
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) { 
        hideSpinner()
        propertylocations = res.data?.data;
    }
    else hideSpinner()
}

var viewsavingsaccountbtn = document.getElementById('viewsavingsaccount')
if(viewsavingsaccountbtn) viewsavingsaccountbtn.addEventListener('click', openViewSavingsAccount)


// savings deposit analysis  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let originaldatathree = []; 
let originalmonths3 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let originaldataone3 = [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3];
let originaldatathree3 = []; 
let originalyear3 = '2023';
let originaltype3 = 'line'

const updatethreedatafromcontroller=(result)=>{
    originaldataone3 = []
    result.data.map(data=>{
        originaldataone3.push(data.totalcredit == null ? 0 : Number(data.totalcredit))
    })
    callChartthreeFilter()
}

function getLastFiveYears() {
  const currentYear = new Date().getFullYear(); // Get the current year
  const years = [currentYear]; // Initialize the array with the current year
  
  // Add the last five years to the array
  for (let i = 1; i <= 5; i++) {
    years.push(currentYear - i);
  }

  return years;
}


async function opensavingsdepositanalysis () {
    await httpRequest('savingsdepositanalysis.php', 'override');
    
    let yarray = getLastFiveYears();
    yarray.map((data, index)=>{
        document.getElementById('threedselectyear3').innerHTML += `<option ${index == 0 ? 'selected' : ''}>${data}</option>`
    }).join('')
    originalyear3 = document.getElementById('threedselectyear3').value
    
    
    if(document.getElementById('threedselectmonth3'))document.getElementById('threedselectmonth3').addEventListener('change', e=>callChartthreeFilter(), true)
    if(document.getElementById('threedselectyear3'))document.getElementById('threedselectyear3').addEventListener('change', e=>callChartthreeFilter('year'), true)
    if(document.getElementById('threedselectchart3'))document.getElementById('threedselectchart3').addEventListener('change', e=>callChartthreeFilter(), true)
    
    
    callController('savingsdepositanalysis.php', null, 'savingsdepositanalysis', null, updatethreedatafromcontroller)
}

const callChartthreeFilter =(year)=>{
    if(year == 'year'){
        function paramsyear(){
            let paramstr = new FormData();
            paramstr.append('year', document.getElementById('threedselectyear3').value);
            return paramstr;
        }
        callController('savingsdepositanalysis.php', paramsyear(), 'savingsdepositanalysis', null, updatethreedatafromcontroller)
    }
    let updatemonths3 =  originalmonths3;
    let updatedataone3 = originaldataone3;
    let updatedatathree3 = originaldatathree3;
    let updateyear3 = originalyear3;
    let updatetype3 = originaltype3;
    
    // FOR MONTH SELECT
    if(document.getElementById('threedselectmonth3').value == 'FULL YEAR'){
        updatemonths3 = originalmonths3
        updatedataone3 = updatedataone3
        updatedatathree3 = updatedatathree3
    };
    if(document.getElementById('threedselectmonth3').value == '1ST HALF OF THE YEAR'){
        updatemonths3 = originalmonths3.slice(0, 6)
        updatedataone3 = updatedataone3.slice(0, 6)
        updatedatathree3 = updatedatathree3.slice(0, 6)
    };
    if(document.getElementById('threedselectmonth3').value == '2ND HALF OF THE YEAR'){
        updatemonths3 = originalmonths3.slice(6, 12)
        updatedataone3 = updatedataone3.slice(6, 12)
        updatedatathree3 = updatedatathree3.slice(6, 12)
    };
    if(document.getElementById('threedselectmonth3').value == '1ST QUARTER OF THE YEAR'){
        updatemonths3 = originalmonths3.slice(0, 3)
        updatedataone3 = updatedataone3.slice(0, 3)
        updatedatathree3 = updatedatathree3.slice(0, 3)
    };
    if(document.getElementById('threedselectmonth3').value == '2ND QUARTER OF THE YEAR'){
        updatemonths3 = originalmonths3.slice(3, 6)
        updatedataone3 = updatedataone3.slice(3, 6)
        updatedatathree3 = updatedatathree3.slice(3, 6)
    };
    if(document.getElementById('threedselectmonth3').value == '3RD QUARTER OF THE YEAR'){
        updatemonths3 = originalmonths3.slice(6, 9)
        updatedataone3 = updatedataone3.slice(6, 9)
        updatedatathree3 = updatedatathree3.slice(6, 9)
    };
    if(document.getElementById('threedselectmonth3').value == 'LAST QUARTER OF THE YEAR'){
        updatemonths3 = originalmonths3.slice(9, 12)
        updatedataone3 = updatedataone3.slice(9, 12)
        updatedatathree3 = updatedatathree3.slice(9, 12)
    };
    
    // FOR YEAR SELECT
    updateyear3 = document.getElementById('threedselectyear3').value;
    
    // FOR CHART TYPE
    updatetype3 = document.getElementById('threedselectchart3').value;
    
    callchartthree(updatemonths3, updatedataone3, updatedatathree3, updateyear3, updatetype3, 'destroy');
}

const callchartthree = (labal, data1, data2, year, typer, destroyer) =>{
    const ctx = document.getElementById('myChartthree');
    // if(destroyer == 'destroy')ctx.destroy();
            // Get the Chart.js instance from the canvas element
        const chartInstance = Chart.getChart(ctx);
        
        // Call the `destroy` method of the Chart.js instance
        if (chartInstance) {
          chartInstance.destroy();
        }
    let delayed;
    new Chart(ctx, {
    type: typer,
    data: {
      labels: labal,
      datasets: [{
        label: 'No. of Savings',
        data: data1,
        borderWidth: 1
      },{
        label: 'Amounts Saved',
        data: data2,
        borderWidth: 1
      }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        height: 300,
        plugins: {
      title: {
        display: true,
        text: `SAVINGS ` ,
      },
      subtitle: {
        display: true,
        text: 'Click on the tab below to filter',
        color: 'blue',
        font: {
          size: 12,
          family: 'tahoma',
          weight: 'normal',
          style: 'italic'
        },
        padding: {
          bottom: 10
        }
       }
      },
         animation: {
              onComplete: () => {
                delayed = true;
              },
              delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                  delay = context.dataIndex * 600 + context.datasetIndex * 500;
                }
                return delay;
              },
        },
        scales: {
            x: {
        display: true,
        title: {
          display: true,
          text: year,
          color: '#911',
          font: {
            family: 'Comic Sans MS',
            size: 15,
            weight: 'bold',
            lineHeight: 1,
          },
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        }
      },
      y: {
         beginAtZero: true,
        // display: true,
        // title: {
        //   display: true,
        //   text: 'Value',
        //   color: '#191',
        //   font: {
        //     family: 'Times',
        //     size: 15,
        //     style: 'normal',
        //     lineHeight: 1
        //   },
        //   padding: {top: 30, left: 0, right: 0, bottom: 0}
        // }
      }
        }
    }
  });
}



var savingsdepositanalysis = document.getElementById('savingsdepositanalysis')
if(savingsdepositanalysis) savingsdepositanalysis.addEventListener('click', opensavingsdepositanalysis, false)


// transfer savings  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form;
async function transfersavings () {
    
        await  httpRequest('transfersavings.php')
        
        form = document.getElementById('savingstransferform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', saveSavingsTransfer)
            form.querySelector('#accountnumberfrom').addEventListener('blur', () => verifyTransferAccount('from'))
            form.querySelector('#accountnumberto').addEventListener('blur', () => verifyTransferAccount('to'))
            form.querySelector('#transactiondate').valueAsDate = new Date()
            
            await fetchSavingsTransferPageData()
        }
}

async function fetchSavingsTransferPageData() {
    fetchSavingsTransferLocations()
}

async function verifyTransferAccount(input) {
    
    let paramstr = new FormData()
    
    if(input == 'from') {
        if(form.accountnumberfrom.value.trim().length < 1) return callModal('From account number is invalid', 0)
         paramstr.append('accountnumber', form.accountnumberfrom.value)
    }
    else if(input == 'to') {
        if(form.accountnumberto.value.trim().length < 1) return callModal('To account number is invalid', 0)
         paramstr.append('accountnumber', form.accountnumberto.value)
    }
    
    else return
    
    let result = await httpJsonRequest('../controllers/fetchaccountprofile.php', 'POST', paramstr)
    if(result) {
        if(result?.status) {
            let data = (JSON.parse(JSON.stringify(result))).data[0]
            // if(data.accounttype !== 'SAVINGS') {
            //     if(input == 'from') {
            //         form.querySelector('#result-area').firstElementChild.innerHTML = ''
            //     }
                
            //     if(input == 'to') {
            //         form.querySelector('#result-area').lastElementChild.innerHTML = ''
            //     }
                
            //     return callModal('Account type not savings')
            // }
                let template = ''
                let loc = locationsvar?.find(value => value.id == (~~Math.abs(data.accountdetail[0].location)) )
                template = `
                    <table id="description" style="width: 100%;">
                        <tr><td><span>ACCOUNT NAME:</span> <span>${ data.customerdetail.firstname.concat(' ', data.customerdetail.lastname, ' ', data.customerdetail.othernames)}</span> </td></tr>
                        <tr><td><span>ACCOUNT NUMBER:</span> <span>${ data.accountdetail[0].accountnumber }</span> </td></tr>
                        <tr><td><span>ACCOUNT TYPE:</span> <span>${ data.accounttype }</span> </td></tr>
                        <tr><td><span>ACCOUNT BALANCE:</span> <span>${ formatMoney(~~Math.abs(data.customerbalance)) }</span> </td></tr>
                        <tr class="hidden"><td><span>REGISTRATION DATE:</span> <span>${formatDate(data.accountdetail[0].registrationdate)}</span> </td></tr>
                        <tr class="hidden"><td><span>LOCATION:</span> <span>${ loc !== undefined ?  loc.location : '' }</span> </td></tr>
                        <tr class="hidden"><td><span>STATE:</span> <span>${ data.customerdetail.state }</span> </td></tr>
                        <tr class="hidden"><td><span>PHONE:</span> <span>${ data.customerdetail.phonenumber }</span> </td></tr>
                        <tr class="hidden"><td><span>GENDER:</span> <span>${ data.customerdetail.gender }</span> </td></tr>
                    </table>
                    <input type="hidden" id="${input}" value="${data.accountdetail[0].accountnumber}">
                `
                
                try {
                    if(input == 'from') {
                        form.querySelector('#result-area').firstElementChild.innerHTML = `
                            <div class="section-header" style="display:flex; gap:6px; align-items:center;">
                                <h1>From: </h1>
                            </div>
                            ${template}
                        `
                    }
                    else if(input == 'to') {
                        form.querySelector('#result-area').lastElementChild.innerHTML = `
                            <div class="section-header" style="display:flex; gap:6px; align-items:center;">
                                <h1>To: </h1>
                            </div>
                            ${template}
                        `
                    }
                    
                    form.querySelector('#propertyprev').style.display = 'block'
                }
                catch(e) {console.log(e)}

            
        }
        else { 
            if(input == 'from') {
                form.querySelector('#result-area').firstElementChild.innerHTML = ''
            }
            
            if(input == 'to') {
                form.querySelector('#result-area').lastElementChild.innerHTML = ''
            }
            return callModal('Account number invalid.', 0) 
            
        }
    }
    else {
        if(input == 'from') {
                form.querySelector('#result-area').firstElementChild.innerHTML = ''
        }
        
        if(input == 'to') {
            form.querySelector('#result-area').lastElementChild.innerHTML = ''
        }
        return callModal('Error: Unable to verify account number', 0)
    }
}

function saveSavingsTransfer() {
    
    if(!validateSavingsTransferForm()) return
    
    if(form.querySelector('input[type="hidden"]#from')?.value !== form.accountnumberfrom.value.trim()) {
        form.accountnumberfrom.value = ''
        return validateSavingsTransferForm()
    }
    
    if(form.querySelector('input[type="hidden"]#to')?.value !== form.accountnumberto.value.trim()) {
        form.accountnumberto.value = ''
        return validateSavingsTransferForm()
    }
    
    if(form.accountnumberfrom.value.trim() === form.accountnumberto.value.trim()) {
        return callModal('Cannot transfer funds to same accounts', 0)
    }

    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/savingstransferscript.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Savings transfer successful', 1)
                    form.reset();
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }
    
	request.setRequestHeader('Connection','close');
	request.send(getSavingsTransferFormData());
}

function getSavingsTransferFormData() {
    let paramstr = new FormData(form)
    return paramstr;
}

async function fetchSavingsTransferLocations() {
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
                <option ${document.getElementById('sessionlocation').value == item.id ? 'selected' : ''} value="${item.id}"> ${item.location} </option>
            `
        })
        if(form.querySelector('#location')){
            form.querySelector('#location').innerHTML = '';
            form.querySelector('#location').innerHTML = '<option value="">--Select Location --</option>'+options;
            form.querySelector('#location').value = document.getElementById('sessionlocation').value;
            // form.querySelector('#location').setAttribute('disabled', true)
        }
    }else  hideSpinner()
}

function validateSavingsTransferForm() {
    var flag = 1;
	var mssg='';
	
	if(form.querySelector('#accountnumberfrom').value.length < 1){
		mssg += 'From account number is Invalid <br />';			
		form.querySelector('#accountnumberfrom').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#accountnumberfrom').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#accountnumberto').value.length < 1){
		mssg += 'To account number is Invalid <br />';			
		form.querySelector('#accountnumberto').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#accountnumberto').style.borderColor = 'lightgray';
	}
	
	
	if(form.querySelector('#location').value.length < 1){
		mssg += 'Location is Invalid <br />';			
		form.querySelector('#location').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#location').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#transactiondate').value.length < 1){
		mssg += 'Transaction date is Invalid <br />';			
		form.querySelector('#transactiondate').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#transactiondate').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#amount').value.length < 1){
		mssg += 'Transfer amount is Invalid <br />';			
		form.querySelector('#amount').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#amount').style.borderColor = 'lightgray';
	}
	
// 	if(form.querySelector('#naration').value.length < 1){
// 		mssg += 'Unit is Invalid <br />';			
// 		form.querySelector('#naration').style.borderColor = 'red';
// 		flag =0;
// 	}
// 	else{
// 		form.querySelector('#naration').style.borderColor = 'lightgray';
// 	}
	
	
	if(flag == 0){
		
		var mbox = document.getElementById('messageBox');
		mbox.innerHTML = mssg;
		mbox.style.display = 'block';
		mbox.style.visibility = 'visible';

		setTimeout(function(){
			mbox.style.display = 'none';
			mbox.style.visibility = 'hidden';
// 			form.querySelector('#naration').style.borderColor = 'lightgray';
			form.querySelector('#transactiondate').style.borderColor = 'lightgray';
			form.querySelector('#location').style.borderColor = 'lightgray';
			form.querySelector('#accountnumberto').style.borderColor = 'lightgray';
			form.querySelector('#accountnumberfrom').style.borderColor = 'lightgray';
			form.querySelector('#amount').style.borderColor = 'lightgray';
		

		}, 2000);	
		return false;
	}else{ 
		return true; 
	}
}
 
var transfersavingsbtn = document.getElementById('transfersavings')
if(transfersavingsbtn) transfersavingsbtn.addEventListener('click', e=>transfersavings())


// savings transactions  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var savingstransactions;datasource = []

async function openSavingsTransactions() {
    await httpRequest('savingstransactions.php')
    
    form = document.getElementById('filtersavingstransactionsform')
    
    form.querySelector('#startdate').valueAsDate = new Date()
    form.querySelector('#enddate').valueAsDate = new Date()
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generateSavingTransactions)
    
    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(savingsTransactionssetCurrentPage)

    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await savingsTransactionssetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {savingsTransactionssetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
    
    async function generateSavingTransactions(event) {
        event.target.disabled = true;
        let paramstr = new FormData(form)
        // let result = await fetch('../controllers/statementofaccount.php', {method: 'POST', body: paramstr, headers: new Headers()})
        let result = await fetch('../controllers/fetchsavingstransactions.php', {method: 'POST', body: paramstr, headers: new Headers()})
        let res = await result.json();
        if(res.status) {
            event.target.disabled = false;
            savingstransactions = datasource = res.data;
            document.querySelector('#savingstransactionstable tbody').innerHTML === ''
            
            if(savingstransactions.length) {
                setNewPaginationContext(paginationLimitInput)
            }
        }
        else {
            if(jtabledata) jtabledata.innerHTML = '';
            event.target.disabled = false;
            callModal(res.message, 0)
        }
    }
    
    async function savingsTransactionssetCurrentPage(pageNum) {
        currentPage = pageNum;
        handleActivePageNumber();
        handlePageButtonsStatus();
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        if(jtabledata) jtabledata.innerHTML = '';
        if(savingstransactions.length) {
            savingstransactions.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    appendSavingsTransactionsTableRows(item, index)
                }
            })
            if (pageCount === currentPage) renderTableSavingTransactionsFooter()
            else {
                try {
                    document.querySelector('#savingstransactionstable #tablefooter')?.remove()
                }
                catch(e) {console.log(e)}
            }
            
            if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#savingstransactionstable #tablefooter')){
                document.querySelector('#savingstransactionstable #tablefooter')?.remove()
                savingstransactionsbtn.click()
                form.querySelector('button#submit').click()
                
            }
        }
    }
    
    function renderTableSavingTransactionsFooter () {
        let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.debit), 0)
        let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.credit), 0)
        let servcharge = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.servicecharge), 0)
     
        document.querySelector('#savingstransactionstable tbody').innerHTML += `
            <tr id="tablefooter">
                <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="4"> total </td>
                <td style="text-transform: uppercase;font-weight:bold">${ formatMoney(servcharge) }</td>
                <td style="text-transform: uppercase;"></td>
                <td style="text-transform: uppercase;font-weight:bold"> ${formatMoney(credit)}</td>
                <td style="text-transform: uppercase;font-weight:bold">${formatMoney(debit)}</td>
            </tr>
        `
    }
    
    async function appendSavingsTransactionsTableRows(item, index) {
        jtabledata.innerHTML += `
            <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${formatDate(item.transactiondate)}</td>
            <td>${item.accountnumber}</td>
            <td>${ item.ttype }</td>
            <td>${ formatMoney(item.servicecharge ) } </td>
            <td>${ item.credit == 0 ? '-' : formatMoney(item.credit) }</td>
            <td>${ item.debit == 0 ? '-' : formatMoney(item.debit) }</td>
            <td>${ item.reference}</td>
        </tr>
        `
    }

}
var savingstransactionsbtn = document.getElementById('savingstransactions')
if(savingstransactionsbtn) savingstransactionsbtn.addEventListener('click', openSavingsTransactions, false)

// VIEW TRANSFERS WITHIN ACCOUNTS --------------------------------------------------------------------------------------------------------------
var form; datasource = []
async function openviewtransferswithin() {
    await httpRequest('viewtransferswithin.php')
    fetchSavingsAccountLocations()
    form = document.getElementById('filterviewtransferswithinform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateviewtransferswithinTable)
            if(form.querySelector('button#print-vt')) form.querySelector('button#print-vt').addEventListener('click', printviewtransferswithinTable)
            if(form.querySelector('button#export-vt')) form.querySelector('button#export-vt').addEventListener('click', exportviewtransferswithinTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewtransferswithinsetCurrentPage)
            // await fetchviewtransferswithinTableData()
        }
}

async function fetchviewtransferswithinTableData() {
    await fetchUsersForviewtransferswithin()
}


function printviewtransferswithinTable() {
    if(viewtransferswithins?.length) printContent('Transfers', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportviewtransferswithinTable() {
    if(viewtransferswithins?.length) tableToExcel('viewtransferswithintable', 'withdrawals')
}

 
async function generateviewtransferswithinTable() {
    showSpinner(); 
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchintratransfers.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            viewtransferswithins = datasource = res.data;
            viewtransferswithins.length && initPagination(viewtransferswithins, viewtransferswithinsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewtransferswithinsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewtransferswithins.length) {
        viewtransferswithins.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewtransferswithinsTableRows(item, index)
            }
        })
        jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td> 
            <td></td>
            <td></td>
            <td></td>
            <td>TOTAL</td>
            <td>${formatMoney(datasource.reduce((sum, item)=>sum+Number(item.amount), 0))}</td>
        </tr>
    `
        if(document.querySelector('#viewtransferswithintable tbody').innerHTML === '') viewtransferswithinbtn.click()
    }
}

async function appendviewtransferswithinsTableRows(item, index) {
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${formatDate(item.transactiondate)}</td>
            <td>${item.reference}</td>
            <td>${item.debitedaccountnumber}</td>
            <td>${item.debitedaccountname}</td>
            <td>${item.creditedaccountnumber}</td>
            <td>${item.creditedaccountname}</td>
            <td>${item.description}</td>
            <td>${item.user}</td>
            <td>${formatMoney(item.amount)}</td>
        </tr>
    `
}

async function retryInterbankTransfer() {
    let selecteditem = viewtransferswithins[index]
    if(confirm('Are you sure you want to retry transfer?')) {
        if(selecteditem) {
            let paramstr = new FormData()
            paramstr.append('id', selecteditem?.id)
            
            let result = await httpJsonRequest('../controllers/fetchintratransfers.php', 'POST', paramstr)
            if(result) {
                let res = JSON.parse(JSON.stringify(result))
                if(res.status) {
                    callModal('Transfer successfully', 1)
                    generateviewtransferswithinTable()
                }
                else return callModal(res.message, 0)
            }
            else return callModal('Error: Unable to complete task', 0)
        }
    }
}

async function putnameunderaccountnumber(el){
    if(document.getElementById('accname'))document.getElementById('accname').innerHTML = ''
    if(!el.value)return callModal('Please Enter an account number',0)
    let val = el.value
    let paramstr = new FormData();
    paramstr.append('accountnumber', el.value)
    let result = await httpJsonRequest('../controllers/fetchaccountprofile.php', 'POST', paramstr)
    if(result) {
        if(result?.status) {
            let data = (JSON.parse(JSON.stringify(result))).data[0]
            document.getElementById('accname').innerHTML = `${ data.customerdetail.firstname.concat(' ', data.customerdetail.lastname, ' ', data.customerdetail.othernames)}`
            // return el.value = val
        }else{
            el.value = ''
            return callModal('Account Number Invalid', 0)
        }
    }
}
       
async function fetchUsersForviewtransferswithin () {
     let result = await fetch('../controllers/fetchalluers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deletedwithdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewtransferswithinbtn = document.getElementById("viewtransferswithin");
if (viewtransferswithinbtn) viewtransferswithinbtn.addEventListener("click", openviewtransferswithin, false);
