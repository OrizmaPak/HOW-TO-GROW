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

