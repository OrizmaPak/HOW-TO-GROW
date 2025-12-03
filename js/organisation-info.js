async function organisationInfo () {
    
    await httpRequest('organisation-info.php', 'override'); 
    
    document.getElementById("basic-info-toggler").onclick = function() {
        document.getElementById("organisation-info-div-basic-info").removeAttribute("hidden");
        document.getElementById("basic-info-toggler").setAttribute("class", "subpages-header-active");
        document.getElementById("basic-info-toggler").setAttribute("class", "subpages-header-active");
        document.getElementById("account-prefix-toggler").removeAttribute("class");
        document.getElementById("default-accounts-toggler").removeAttribute("class");
        document.getElementById("organisation-info-div-account-prefix").setAttribute("hidden", "");
        document.getElementById("organisation-info-div-default-accounts").setAttribute("hidden", "");
        // document.getElementById("append-test-script").innerHTML = '<script src="test.js" defer></script>';
    };
    document.getElementById("account-prefix-toggler").onclick = function() {
        document.getElementById("organisation-info-div-account-prefix").removeAttribute("hidden");
        document.getElementById("account-prefix-toggler").setAttribute("class", "subpages-header-active");
        document.getElementById("basic-info-toggler").removeAttribute("class");
        document.getElementById("default-accounts-toggler").removeAttribute("class");
        document.getElementById("organisation-info-div-basic-info").setAttribute("hidden", "");
        document.getElementById("organisation-info-div-default-accounts").setAttribute("hidden", "");
    };
    document.getElementById("default-accounts-toggler").onclick = function() {
        document.getElementById("organisation-info-div-default-accounts").removeAttribute("hidden");
        document.getElementById("default-accounts-toggler").setAttribute("class", "subpages-header-active");
        document.getElementById("account-prefix-toggler").removeAttribute("class");
        document.getElementById("basic-info-toggler").removeAttribute("class");
        document.getElementById("organisation-info-div-account-prefix").setAttribute("hidden", "");
        document.getElementById("organisation-info-div-basic-info").setAttribute("hidden", "");
    };
    document.getElementById("profile-img-edit-icon").onclick = function() {
        document.getElementById("profile-image-upload-input").click();
    };
    document.getElementById('profile-image-upload-input').onchange = function(e) {
        
        if (!fileTypeValidator(e.target.files)) {
            errorBox('Unsupported file selected')
            e.target.value = null
        }
        else {
            document.getElementById('profile-image').src = URL.createObjectURL(event.target.files[0]);
            document.getElementById('profile-image').onload = function() { URL.revokeObjectURL(document.getElementById('profile-image').src) }
        }
    };
    
	var getAjaxObject = function(){
		var requeste;
		try{
			requeste = new XMLHttpRequest();
		}catch(error){
			try{
				requeste = new ActiveXobject('Microsoft.XMLHTTP');
			}catch(error){
				return 'Error';
			}
		}
		return requeste;
	}

	function validateCompany(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var companyName = document.getElementById('company-name');
		var smsSenderId = document.getElementById('sms-sender-id');
		var numberOfUsers = document.getElementById('number-of-users');
		var telephone = document.getElementById('telephone');
		var mobile = document.getElementById('mobile');
		var email = document.getElementById('email');
		var address = document.getElementById('address');
		var smsCharge = document.getElementById('sms-charge');
		var smsChargeAccount = document.getElementById('sms-charge-account');
		var vatRate = document.getElementById('vat-rate');
		var whtRate = document.getElementById('wht-rate');
		var allowBackDatedTransaction = document.getElementById('allow-back-dated-transaction');
		var allowFutureTransaction = document.getElementById('allow-future-transaction');
		var automateMemorandum = document.getElementById('automate-memorandum');
		var automateSmsCharge = document.getElementById('automate-sms-charge');
		var setAccountingYearEnd = document.getElementById('set-accounting-year-end');
		var savingsAccountPrefix = document.getElementById('savings-account-prefix');
		var isusuPrefix = document.getElementById('isusu-prefix');
		var personalAccountCurrentPrefix = document.getElementById('personal-account-current-prefix');
		var groupCurrentAccountPrefix = document.getElementById('group-current-account-prefix');
		var loanAccountPrefix = document.getElementById('loan-account-prefix');
		var loanTransactionPrefix = document.getElementById('loan-transaction-prefix');
		var odTransactionPrefix = document.getElementById('od-transaction-prefix');
		var customerTransactionPrefix = document.getElementById('customer-transaction-prefix');
		var generalLedgerTransactionPrefix = document.getElementById('general-ledger-transaction-prefix');
		var fixedAccountPrefix = document.getElementById('fixed-account-prefix');
		var assetGlAccountPrefix = document.getElementById('asset-gl-account-prefix');
		var cashGlAccountPrefix = document.getElementById('cash-gl-account-prefix');
		var expenseGlAccountPrefix = document.getElementById('expense-gl-account-prefix');
		var equityGlAccountPrefix = document.getElementById('equity-gl-account-prefix');
		var payableGlAccountPrefix = document.getElementById('payable-gl-account-prefix');
		var receivableGlAccountPrefix = document.getElementById('receivable-gl-account-prefix');
		var liabilitiesGlAccountPrefix = document.getElementById('liabilities-gl-account-prefix');
		var incomeGlAccountPrefix = document.getElementById('income-gl-account-prefix');
		var depreciationGlAccountPrefix = document.getElementById('depreciation-gl-account-prefix');
		var generalLedgerAccountPrefix = document.getElementById('general-ledger-account-prefix');
		var defaultGlIncomeAccount = document.getElementById('default-gl-income-account');
		var defaultGlAssetAccount = document.getElementById('default-gl-asset-account');
		var loanProvisioningAccount = document.getElementById('loan-provisioning-account');
		var defaultGlSavingsAccount = document.getElementById('default-gl-savings-account');
		var defaultGlEsusuAccount = document.getElementById('default-gl-esusu-account');
		var defaultGlCashAccount = document.getElementById('default-gl-cash-account');
		var defaultGlTellerCashAccount = document.getElementById('default-gl-teller-cash-account');
		var defaultGlOdAccount = document.getElementById('default-gl-od-account');
		var defaultCurrentAccount = document.getElementById('default-current-account');
		var defaultGlTaxAccount = document.getElementById('default-gl-tax-account');
		var defaultFixedAccount = document.getElementById('default-fixed-account');
		var defaultFixedInterestAccount = document.getElementById('default-fixed-interest-account');
		var defaultExpenseAccount = document.getElementById('default-expense-account');
		var defaultLoanAccount = document.getElementById('default-loan-account');
		var defaultNonCashAccount = document.getElementById('default-non-cash-account');
		var defaultGlMandatorySavingsAccount = document.getElementById('default-gl-mandatory-savings-account');
		var mandatorySavingsAccountRate = document.getElementById('mandatory-savings-account-rate');
		var defaultGlStaffAccount = document.getElementById('default-gl-staff-account');
		
		
// 		var location = document.getElementById('location').options[document.getElementById('location').selectedIndex].value;
// 		var papersize = document.getElementById('papersize').options[document.getElementById('papersize').selectedIndex].value;
		//var email = document.getElementById('email');		
		
		if(companyName.value.length < 1){
			mssg += 'Company Name is blank <br />';			
			companyName.style.borderColor = 'red';
			flag =0;
		} else if (companyName.value.length >= 250) {
			mssg += 'Company Name cannot be greater than 249 characters <br />';			
			companyName.style.borderColor = 'red';
			flag =0;
		} else {
			companyName.style.borderColor = 'lightgray';
		}
		
		if(smsSenderId.value.length < 1){
			mssg += 'SMS Sender ID is blank <br />';			
			smsSenderId.style.borderColor = 'red';
			flag =0;
		}else{
			smsSenderId.style.borderColor = 'lightgray';
		}
		
		if(numberOfUsers.value.length < 1){
			mssg += 'Number Of Users is blank <br />';			
			numberOfUsers.style.borderColor = 'red';
			flag =0;
		} else if (numberOfUsers.value.length > 6) {
			mssg += 'Number of users cannot be greater than 6 characters <br />';			
			numberOfUsers.style.borderColor = 'red';
			flag =0;
		} else{
			numberOfUsers.style.borderColor = 'lightgray';
		}
		
		if(telephone.value.length < 1){
			mssg += 'Telephone is blank <br />';			
			telephone.style.borderColor = 'red';
			flag =0;
		} else if (telephone.value.length >= 100) {
			mssg += 'Telephone cannot be greater than 99 characters <br />';			
			telephone.style.borderColor = 'red';
			flag =0;
		} else{
			telephone.style.borderColor = 'lightgray';
		}
		
		if(mobile.value.length < 1){
			mssg += 'Mobile is blank <br />';			
			mobile.style.borderColor = 'red';
			flag =0;
		} else if (mobile.value.length >= 20) {
			mssg += 'Mobile cannot be greater than 19 characters <br />';			
			mobile.style.borderColor = 'red';
			flag =0;
		} else{
			mobile.style.borderColor = 'lightgray';
		}
		
		var semail = /^[\w]+(\.[\w]+)*@([\w]+\.)+[a-z]{2,7}$/i;
		if(document.getElementById('email').value.length < 1 || ! semail.test(document.getElementById('email').value)){
			mssg += 'Email is blank <br />';			
			email.style.borderColor = 'red';
			flag =0;
		} else if (email.value.length >= 250) {
			mssg += 'Email cannot be greater than 249 characters <br />';			
			email.style.borderColor = 'red';
			flag =0;
		} else{
			email.style.borderColor = 'lightgray';
		}
		
		if(address.value.length < 1){
			mssg += 'Address is blank <br />';			
			address.style.borderColor = 'red';
			flag =0;
		} else if (address.value.length >= 250) {
			mssg += 'Address cannot be greater than 249 characters <br />';			
			address.style.borderColor = 'red';
			flag =0;
		} else{
			address.style.borderColor = 'lightgray';
		}
		
		
		if(smsCharge.value.length < 1){
			mssg += 'SMS Charge is blank <br />';			
			smsCharge.style.borderColor = 'red';
			flag =0;
		}else{
			smsCharge.style.borderColor = 'lightgray';
		}
		
		if(smsChargeAccount.value.length < 1){
			mssg += 'SMS Charge Account must be selected Invalid <br />';			
			smsChargeAccount.style.borderColor = 'red';
			flag =0;
		}else{
			smsChargeAccount.style.borderColor = 'lightgray';
		}
		
		if(vatRate.value.length < 1){
			mssg += 'VAR Rate must be selected <br />';			
			vatRate.style.borderColor = 'red';
			flag =0;
		}else{
			vatRate.style.borderColor = 'lightgray';
		}
		
		if(whtRate.value.length < 1){
			mssg += 'WHT Rate must be selected <br />';			
			whtRate.style.borderColor = 'red';
			flag =0;
		}else{
			whtRate.style.borderColor = 'lightgray';
		}
		
		if(allowBackDatedTransaction.value.length < 1){
			mssg += 'Select Whether To Allow Back-Dated Transaction. <br />';			
			allowBackDatedTransaction.style.borderColor = 'red';
			flag =0;
		} else if (allowBackDatedTransaction.value.length > 10) {
			mssg += 'Allow Back-Dated Transaction cannot be greater than 10 characters <br />';			
			allowBackDatedTransaction.style.borderColor = 'red';
			flag =0;
		} else{
			allowBackDatedTransaction.style.borderColor = 'lightgray';
		}
		
		if(allowFutureTransaction.value.length < 1){
			mssg += 'Select Whether To Allow Future Invoice. <br />';			
			allowFutureTransaction.style.borderColor = 'red';
			flag =0;
		} else if (allowFutureTransaction.value.length >= 10) {
			mssg += 'Allow Future Transaction cannot be gearer than 10 characters <br />';			
			allowFutureTransaction.style.borderColor = 'red';
			flag =0;
		} else{
			allowFutureTransaction.style.borderColor = 'lightgray';
		}
		
		if(automateMemorandum.value.length < 1){
			mssg += 'Select Whether To Automate Memorandum <br />';			
			automateMemorandum.style.borderColor = 'red';
			flag =0;
		}else{
			automateMemorandum.style.borderColor = 'lightgray';
		}
		
		if(automateSmsCharge.value.length < 1){
			mssg += 'Select Whether To Allow Automate SMS Charges <br />';			
			automateSmsCharge.style.borderColor = 'red';
			flag =0;
		}else{
			automateSmsCharge.style.borderColor = 'lightgray';
		}
		
		if(setAccountingYearEnd.value.length < 1){
			mssg += 'Accounting Year must be selected <br />';			
			setAccountingYearEnd.style.borderColor = 'red';
			flag =0;
		} else if (setAccountingYearEnd.value.length >= 250) {
			mssg += 'Account Year End cannot be greater than 249 characters <br />';			
			setAccountingYearEnd.style.borderColor = 'red';
			flag =0;
		} else{
			setAccountingYearEnd.style.borderColor = 'lightgray';
		}
		
		if(savingsAccountPrefix.value.length < 1){
			mssg += 'Savings Account Prefix is blank <br />';			
			savingsAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			savingsAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(isusuPrefix.value.length < 1){
			mssg += 'Isusu Prefix is blank <br />';			
			isusuPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			isusuPrefix.style.borderColor = 'lightgray';
		}
		
		if(personalAccountCurrentPrefix.value.length < 1){
			mssg += 'Personal Account Currency Profile is blank <br />';			
			personalAccountCurrentPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			personalAccountCurrentPrefix.style.borderColor = 'lightgray';
		}
		
		if(groupCurrentAccountPrefix.value.length < 1){
			mssg += 'Group Current Account Prefix is blank <br />';			
			groupCurrentAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			groupCurrentAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(loanAccountPrefix.value.length < 1){
			mssg += 'Loan Account Prefix is blank <br />';			
			loanAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			loanAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(loanTransactionPrefix.value.length < 1){
			mssg += 'Loan Transaction Prefix is blank <br />';			
			loanTransactionPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			loanTransactionPrefix.style.borderColor = 'lightgray';
		}
		
		if(odTransactionPrefix.value.length < 1){
			mssg += 'od Transaction Prefix is blank <br />';			
			odTransactionPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			odTransactionPrefix.style.borderColor = 'lightgray';
		}
		
		if(customerTransactionPrefix.value.length < 1){
			mssg += 'customer Transaction Prefix is Invalid <br />';			
			customerTransactionPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			customerTransactionPrefix.style.borderColor = 'lightgray';
		}
		
		if(generalLedgerTransactionPrefix.value.length < 1){
			mssg += 'General Ledger Transaction Prefix is blank <br />';			
			generalLedgerTransactionPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			generalLedgerTransactionPrefix.style.borderColor = 'lightgray';
		}
		
		if(fixedAccountPrefix.value.length < 1){
			mssg += 'fixed Account Prefix is blank <br />';			
			fixedAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			fixedAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(assetGlAccountPrefix.value.length < 1){
			mssg += 'Asset Gl account Prefix is blank <br />';			
			assetGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			assetGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(cashGlAccountPrefix.value.length < 1){
			mssg += 'Cash GL Account Prefix is blank <br />';			
			cashGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			cashGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(expenseGlAccountPrefix.value.length < 1){
			mssg += 'Expense GL Account Prefix is blank <br />';			
			expenseGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			expenseGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(equityGlAccountPrefix.value.length < 1){
			mssg += 'Equity GL Account Prefix is blank <br />';			
			equityGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			equityGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(payableGlAccountPrefix.value.length < 1){
			mssg += 'Payable GL Account Prefix is blank <br />';			
			payableGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			payableGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(receivableGlAccountPrefix.value.length < 1){
			mssg += 'Recievable GL Account Prefix is blank <br />';			
			receivableGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			receivableGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(liabilitiesGlAccountPrefix.value.length < 1){
			mssg += 'Liabilities GL Account Prefix is blank <br />';			
			liabilitiesGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			liabilitiesGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(incomeGlAccountPrefix.value.length < 1){
			mssg += 'Income GL Account Prefix is blank <br />';			
			incomeGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			incomeGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(depreciationGlAccountPrefix.value.length < 1){
			mssg += 'Depreciation GL Account Prefix is blank <br />';			
			depreciationGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			depreciationGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(generalLedgerAccountPrefix.value.length < 1){
			mssg += 'General Ledger Account Prefix is blank <br />';			
			generalLedgerAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			generalLedgerAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(defaultGlIncomeAccount.value.length < 1){
			mssg += 'Default GL Income Account must be selected <br />';			
			defaultGlIncomeAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlIncomeAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlAssetAccount.value.length < 1){
			mssg += 'Default GL Asset Account must be selected <br />';			
			defaultGlAssetAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlAssetAccount.style.borderColor = 'lightgray';
		}
		
		if(loanProvisioningAccount.value.length < 1){
			mssg += 'Loan Provisioning Account must be selected <br />';			
			loanProvisioningAccount.style.borderColor = 'red';
			flag =0;
		}else{
			loanProvisioningAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlSavingsAccount.value.length < 1){
			mssg += 'Default GL Savings Account must be selected <br />';			
			defaultGlSavingsAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlSavingsAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlEsusuAccount.value.length < 1){
			mssg += 'Default GL Esusu Account must be selected <br />';			
			defaultGlEsusuAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlEsusuAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlCashAccount.value.length < 1){
			mssg += 'Default GL Cash Accoun must be selected <br />';			
			defaultGlCashAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlCashAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlTellerCashAccount.value.length < 1){
			mssg += 'Default GL Teller Cash Account must be selected <br />';			
			defaultGlTellerCashAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlTellerCashAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlOdAccount.value.length < 1){
			mssg += 'Default GL OD Account must be selected <br />';			
			defaultGlOdAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlOdAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultCurrentAccount.value.length < 1){
			mssg += 'Default Current Account must be selected <br />';			
			defaultCurrentAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultCurrentAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlTaxAccount.value.length < 1){
			mssg += 'Default GL Tax Account must be selected <br />';			
			defaultGlTaxAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlTaxAccount.style.borderColor = 'lightgray';
		}
		
		
		if(defaultFixedAccount.value.length < 1){
			mssg += 'Default Fixed Account must be selected <br />';			
			defaultFixedAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultFixedAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultFixedInterestAccount.value.length < 1){
			mssg += 'Default Fixed Interest Account must be selected <br />';			
			defaultFixedInterestAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultFixedInterestAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultExpenseAccount.value.length < 1){
			mssg += 'Default Expense Account must be selected <br />';			
			defaultExpenseAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultExpenseAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultLoanAccount.value.length < 1){
			mssg += 'Default Loan Account must be selected <br />';			
			defaultLoanAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultLoanAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultNonCashAccount.value.length < 1){
			mssg += 'Default Non-Cash Account (Bank Account) must be selected <br />';			
			defaultNonCashAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultNonCashAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlMandatorySavingsAccount.value.length < 1){
			mssg += 'Default GL Mandatory Savings Account must be selected <br />';			
			defaultGlMandatorySavingsAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlMandatorySavingsAccount.style.borderColor = 'lightgray';
		}
		
		if(mandatorySavingsAccountRate.value.length < 1){
			mssg += 'Mandatory Savings Account Rate must be selected <br />';			
			mandatorySavingsAccountRate.style.borderColor = 'red';
			flag =0;
		}else{
			mandatorySavingsAccountRate.style.borderColor = 'lightgray';
		}
		
		if(defaultGlStaffAccount.value.length < 1){
			mssg += 'Default GL staff Account must be selected <br />';			
			defaultGlStaffAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlStaffAccount.style.borderColor = 'lightgray';
		}
		
		
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				companyName.style.borderColor = 'lightgray';
				smsSenderId.style.borderColor = 'lightgray';
				numberOfUsers.style.borderColor = 'lightgray';
				telephone.style.borderColor = 'lightgray';
				mobile.style.borderColor = 'lightgray';
				email.style.borderColor = 'lightgray';
				address.style.borderColor = 'lightgray';
				smsCharge.style.borderColor = 'lightgray';
				smsChargeAccount.style.borderColor = 'lightgray';
				vatRate.style.borderColor = 'lightgray';
				whtRate.style.borderColor = 'lightgray';
				allowBackDatedTransaction.style.borderColor = 'lightgray';
				allowFutureTransaction.style.borderColor = 'lightgray';
				automateMemorandum.style.borderColor = 'lightgray';
				automateSmsCharge.style.borderColor = 'lightgray';
				setAccountingYearEnd.style.borderColor = 'lightgray';
				savingsAccountPrefix.style.borderColor = 'lightgray';
				isusuPrefix.style.borderColor = 'lightgray';
				personalAccountCurrentPrefix.style.borderColor = 'lightgray';
				groupCurrentAccountPrefix.style.borderColor = 'lightgray';
				loanAccountPrefix.style.borderColor = 'lightgray';
				loanTransactionPrefix.style.borderColor = 'lightgray';
				odTransactionPrefix.style.borderColor = 'lightgray';
				customerTransactionPrefix.style.borderColor = 'lightgray';
				generalLedgerTransactionPrefix.style.borderColor = 'lightgray';
				fixedAccountPrefix.style.borderColor = 'lightgray';
				assetGlAccountPrefix.style.borderColor = 'lightgray';
				cashGlAccountPrefix.style.borderColor = 'lightgray';
				expenseGlAccountPrefix.style.borderColor = 'lightgray';
				equityGlAccountPrefix.style.borderColor = 'lightgray';
				payableGlAccountPrefix.style.borderColor = 'lightgray';
				receivableGlAccountPrefix.style.borderColor = 'lightgray';
				liabilitiesGlAccountPrefix.style.borderColor = 'lightgray';
				incomeGlAccountPrefix.style.borderColor = 'lightgray';
				depreciationGlAccountPrefix.style.borderColor = 'lightgray';
				generalLedgerAccountPrefix.style.borderColor = 'lightgray';
				defaultGlIncomeAccount.style.borderColor = 'lightgray';
				defaultGlAssetAccount.style.borderColor = 'lightgray';
				loanProvisioningAccount.style.borderColor = 'lightgray';
				defaultGlSavingsAccount.style.borderColor = 'lightgray';
				defaultGlEsusuAccount.style.borderColor = 'lightgray';
				defaultGlCashAccount.style.borderColor = 'lightgray';
				defaultGlTellerCashAccount.style.borderColor = 'lightgray';
				defaultGlOdAccount.style.borderColor = 'lightgray';
				defaultCurrentAccount.style.borderColor = 'lightgray';
				defaultGlTaxAccount.style.borderColor = 'lightgray';
				defaultFixedAccount.style.borderColor = 'lightgray';
				defaultFixedInterestAccount.style.borderColor = 'lightgray';
				defaultExpenseAccount.style.borderColor = 'lightgray';
				defaultLoanAccount.style.borderColor = 'lightgray';
				defaultNonCashAccount.style.borderColor = 'lightgray';
				defaultGlMandatorySavingsAccount.style.borderColor = 'lightgray';
				mandatorySavingsAccountRate.style.borderColor = 'lightgray';
				defaultGlStaffAccount.style.borderColor = 'lightgray';
				
				// (document.getElementById('location')).style.borderColor = 'lightgray';
				// (document.getElementById('papersize')).style.borderColor = 'lightgray';

			}, 3000);	
			return false;
		}else{ 
			return true; 
		}

	}
    
	function getOrganisationParams(){
		var paramstr = new FormData();
	 		
		paramstr.append("companyName".toLowerCase(), document.getElementById('company-name').value);
		paramstr.append("smssenderid".toLowerCase(), document.getElementById('sms-sender-id').value);
		paramstr.append("no_of_users".toLowerCase(), document.getElementById('number-of-users').value);
		paramstr.append("telephone".toLowerCase(), document.getElementById('telephone').value);
		paramstr.append("mobile".toLowerCase(), document.getElementById('mobile').value);
		paramstr.append("email".toLowerCase(), document.getElementById('email').value);
		paramstr.append("address".toLowerCase(), document.getElementById('address').value);
		paramstr.append("smscharge".toLowerCase(), document.getElementById('sms-charge').value);
		paramstr.append("smschargeaccount".toLowerCase(), document.getElementById('sms-charge-account').value);
		paramstr.append("vatrate".toLowerCase(), document.getElementById('vat-rate').value);
		paramstr.append("whtrate".toLowerCase(), document.getElementById('wht-rate').value);
		paramstr.append("backdated_transaction".toLowerCase(), document.getElementById('allow-back-dated-transaction').value);
		paramstr.append("future_transaction".toLowerCase(), document.getElementById('allow-future-transaction').value);
		paramstr.append("automate_memorandum".toLowerCase(), document.getElementById('automate-memorandum').value);
		paramstr.append("automate_smscharge".toLowerCase(), document.getElementById('automate-sms-charge').value);
		paramstr.append("accounting_yearend".toLowerCase(), document.getElementById('set-accounting-year-end').value);
		paramstr.append("savings_prefix".toLowerCase(), document.getElementById('savings-account-prefix').value);
		paramstr.append("isusu_prefix".toLowerCase(), document.getElementById('isusu-prefix').value);
		paramstr.append("personalcurrent_prefix".toLowerCase(), document.getElementById('personal-account-current-prefix').value);
		paramstr.append("groupcurrent_prefix".toLowerCase(), document.getElementById('group-current-account-prefix').value);
		paramstr.append("loan_prefix".toLowerCase(), document.getElementById('loan-account-prefix').value);
		paramstr.append("loantransaction_prefix".toLowerCase(), document.getElementById('loan-transaction-prefix').value);
		paramstr.append("odtransaction_prefix".toLowerCase(), document.getElementById('od-transaction-prefix').value);
		paramstr.append("customertransaction_prefix".toLowerCase(), document.getElementById('customer-transaction-prefix').value);
		paramstr.append("gl_transaction_prefix".toLowerCase(), document.getElementById('general-ledger-transaction-prefix').value);
		paramstr.append("fixedaccount_prefix".toLowerCase(), document.getElementById('fixed-account-prefix').value);
		paramstr.append("glassetprefix".toLowerCase(), document.getElementById('asset-gl-account-prefix').value);
		paramstr.append("glcashprefix".toLowerCase(), document.getElementById('cash-gl-account-prefix').value);
		paramstr.append("glexpenseprefix".toLowerCase(), document.getElementById('expense-gl-account-prefix').value);
		paramstr.append("glequityprefix".toLowerCase(), document.getElementById('equity-gl-account-prefix').value);
		paramstr.append("glpayableprefix".toLowerCase(), document.getElementById('payable-gl-account-prefix').value);
		paramstr.append("glrecievableprefix".toLowerCase(), document.getElementById('receivable-gl-account-prefix').value);
		paramstr.append("glliabilitiesprefix".toLowerCase(), document.getElementById('liabilities-gl-account-prefix').value);
		paramstr.append("glincomeprefix".toLowerCase(), document.getElementById('income-gl-account-prefix').value);
		paramstr.append("gldepreciationprefix".toLowerCase(), document.getElementById('depreciation-gl-account-prefix').value);
		paramstr.append("gl_account_prefix".toLowerCase(), document.getElementById('general-ledger-account-prefix').value);
		paramstr.append("default_incomeaccount".toLowerCase(), document.getElementById('default-gl-income-account').value);
		paramstr.append("default_assetaccount".toLowerCase(), document.getElementById('default-gl-asset-account').value);
		paramstr.append("loan_provisioning_account".toLowerCase(), document.getElementById('loan-provisioning-account').value);
		paramstr.append("default_glsavingsaccount".toLowerCase(), document.getElementById('default-gl-savings-account').value);
		paramstr.append("default_glesusu".toLowerCase(), document.getElementById('default-gl-esusu-account').value);
		paramstr.append("default_cashaccount".toLowerCase(), document.getElementById('default-gl-cash-account').value);
		paramstr.append("default_tellercash".toLowerCase(), document.getElementById('default-gl-teller-cash-account').value);
		paramstr.append("default_glodaccount".toLowerCase(), document.getElementById('default-gl-od-account').value);
		paramstr.append("default_glcurrentaccount".toLowerCase(), document.getElementById('default-current-account').value);
		paramstr.append("default_taxaccount".toLowerCase(), document.getElementById('default-gl-tax-account').value);
		paramstr.append("default_glfixedaccount".toLowerCase(), document.getElementById('default-fixed-account').value);
		paramstr.append("default_fixedinterestaccount".toLowerCase(), document.getElementById('default-fixed-interest-account').value);
		paramstr.append("default_glexpenseaccount".toLowerCase(), document.getElementById('default-expense-account').value);
		paramstr.append("default_glloanaccount".toLowerCase(), document.getElementById('default-loan-account').value);
		paramstr.append("default_noncashaccount".toLowerCase(), document.getElementById('default-non-cash-account').value);
		paramstr.append("default_mandatorysavingsaccount".toLowerCase(), document.getElementById('default-gl-mandatory-savings-account').value);
		paramstr.append("mandatorysavings_rate".toLowerCase(), document.getElementById('mandatory-savings-account-rate').value);
		paramstr.append("default_glstaffaccount".toLowerCase(), document.getElementById('default-gl-staff-account').value);
		paramstr.append("noofdaysforpropertynotice".toLowerCase(), document.getElementById('noofdaysforpropertynotice').value);
		paramstr.append("noofdaystosetasidepropertystock".toLowerCase(), document.getElementById('noofdaystosetasidepropertystock').value);
		paramstr.append("schedulemaintenancecharge".toLowerCase(), document.getElementById('schedulemaintenancecharge').value);
		paramstr.append("maintenancecharge".toLowerCase(), document.getElementById('maintenancecharge').value);
		paramstr.append("schedulesavingsinterest".toLowerCase(), document.getElementById('schedulesavingsinterest').value);
		paramstr.append("scheduleloanrepayment".toLowerCase(), document.getElementById('scheduleloanrepayment').value);
		paramstr.append("company_id", `${orginfo.company_id ? orginfo.company_id : ''}` );
		paramstr.append("default_rrraccount".toLowerCase(), document.getElementById('default-rrr-account').value);
		paramstr.append("default_propertyaccount".toLowerCase(), document.getElementById('default-property-account').value);
		paramstr.append("default_branchcashaccount".toLowerCase(), document.getElementById('default-branch-cash-account').value);
		paramstr.append("default_excessaccount".toLowerCase(), document.getElementById('default-excess-account').value);
		paramstr.append("default_returncashaccount".toLowerCase(), document.getElementById('default-return-cash-account').value);
		paramstr.append("default_niaaccount".toLowerCase(), document.getElementById('Default-nia-account').value);
		paramstr.append("default_bankaccount".toLowerCase(), document.getElementById('default-bank-account').value);
		paramstr.append("default_inventory".toLowerCase(), document.getElementById('default-inventory').value);
		paramstr.append("default_payableaccount".toLowerCase(), document.getElementById('default-payable-account').value);
		paramstr.append("default_receivableaccount".toLowerCase(), document.getElementById('default-receivable-account').value);

        try {
            paramstr.append('photofilename',document.getElementById('profile-image-upload-input').files[0].name);		
            paramstr.append('userphotoname',document.getElementById('profile-image-upload-input').files[0]);
        }
        catch(ex){
             paramstr.append('photofilename','-');		
             paramstr.append('userphotoname','-');
         
        }				


	   return paramstr;

	}

	var saveOrganisationInfo = function(e){
	    
	    if(!validateCompany()){ 
			return; 
		}
	    
	    showSpinner();
    	var request = getAjaxObject();
    
        request.open('POST','../controllers/organisationinfoscript.php',true);
    
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        callModal('Information saved successfully', 1)
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
        request.send(getOrganisationParams());
	    

	}

    if(document.getElementById('btnSaveChanges')) document.getElementById('btnSaveChanges').addEventListener('click',saveOrganisationInfo,false);
    
   await fetchOrganiationFormData()
}

function populateFormwithOrgData() {
    try {
        
        document.getElementById('company-name').value = orginfo.companyname
        document.getElementById('sms-sender-id').value = orginfo.smssenderid
        document.getElementById('number-of-users').value = orginfo.no_of_users
        document.getElementById('telephone').value = orginfo.telephone
        document.getElementById('mobile').value = orginfo.mobile
        document.getElementById('email').value = orginfo.email
        document.getElementById('address').value = orginfo.address
        document.getElementById('sms-charge').value = orginfo.smscharge
        document.getElementById('sms-charge-account').value = orginfo.smschargeaccount
        document.getElementById('allow-back-dated-transaction').value = orginfo.backdated_transaction
        document.getElementById('allow-future-transaction').value = orginfo.future_transaction
        document.getElementById('automate-memorandum').value = orginfo.automate_memorandum
        document.getElementById('automate-sms-charge').value = orginfo.automate_smscharge
        document.getElementById('set-accounting-year-end').value = orginfo.accounting_yearend
        document.getElementById('savings-account-prefix').value = orginfo.savings_prefix
        document.getElementById('isusu-prefix').value = orginfo.isusu_prefix
        document.getElementById('personal-account-current-prefix').value = orginfo.isusu_prefix
        document.getElementById('group-current-account-prefix').value = orginfo.groupcurrent_prefix
        document.getElementById('loan-account-prefix').value = orginfo.loan_prefix
        document.getElementById('loan-transaction-prefix').value = orginfo.loantransaction_prefix
        document.getElementById('od-transaction-prefix').value = orginfo.odtransaction_prefix
        document.getElementById('customer-transaction-prefix').value = orginfo.customertransaction_prefix
        document.getElementById('general-ledger-transaction-prefix').value = orginfo.gl_transaction_prefix
        document.getElementById('fixed-account-prefix').value = orginfo.fixedaccount_prefix
        document.getElementById('asset-gl-account-prefix').value = orginfo.glassetprefix
        document.getElementById('cash-gl-account-prefix').value = orginfo.glcashprefix
        document.getElementById('expense-gl-account-prefix').value = orginfo.glexpenseprefix
        document.getElementById('equity-gl-account-prefix').value = orginfo.glequityprefix
        document.getElementById('payable-gl-account-prefix').value = orginfo.glpayableprefix
        document.getElementById('receivable-gl-account-prefix').value = orginfo.glrecievableprefix
        document.getElementById('liabilities-gl-account-prefix').value = orginfo.glliabilitiesprefix
        document.getElementById('income-gl-account-prefix').value = orginfo.glincomeprefix
        document.getElementById('depreciation-gl-account-prefix').value = orginfo.gldepreciationprefix
        document.getElementById('general-ledger-account-prefix').value = orginfo.gl_account_prefix
        document.getElementById('default-gl-income-account').value = orginfo.default_incomeaccount
        document.getElementById('default-gl-asset-account').value = orginfo.default_assetaccount
        document.getElementById('loan-provisioning-account').value = orginfo.loan_provisioning_account
        document.getElementById('default-gl-savings-account').value = orginfo.default_glsavingsaccount
        document.getElementById('default-gl-esusu-account').value = orginfo.default_glesusu
        document.getElementById('default-gl-cash-account').value = orginfo.default_cashaccount 
        document.getElementById('default-gl-teller-cash-account').value = orginfo.default_tellercash
        document.getElementById('default-gl-od-account').value = orginfo.default_glodaccount
        document.getElementById('default-current-account').value = orginfo.default_glcurrentaccount
        document.getElementById('default-gl-tax-account').value = orginfo.default_taxaccount
        document.getElementById('default-fixed-account').value = orginfo.default_glfixedaccount
        document.getElementById('default-fixed-interest-account').value = orginfo.default_fixedinterestaccount
        document.getElementById('default-expense-account').value = orginfo.default_glexpenseaccount
        document.getElementById('default-loan-account').value = orginfo.default_glloanaccount
        document.getElementById('default-non-cash-account').value = orginfo.default_noncashaccount
        document.getElementById('default-gl-mandatory-savings-account').value = orginfo.default_mandatorysavingsaccount
        document.getElementById('mandatory-savings-account-rate').value = orginfo.mandatorysavings_rate
        document.getElementById('default-gl-staff-account').value = orginfo.default_glstaffaccount
        document.getElementById('wht-rate').value = orginfo.whtrate
        document.getElementById('vat-rate').value = orginfo.vatrate
        document.getElementById('noofdaysforpropertynotice').value = orginfo.noofdaysforpropertynotice
        document.getElementById('noofdaystosetasidepropertystock').value = orginfo.noofdaystosetasidepropertystock
        document.getElementById('schedulemaintenancecharge').value = orginfo.schedulemaintenancecharge
        document.getElementById('maintenancecharge').value = orginfo.maintenancecharge
        document.getElementById('schedulesavingsinterest').value = orginfo.schedulesavingsinterest
        document.getElementById('scheduleloanrepayment').value = orginfo.scheduleloanrepayment
    }
    catch(e) {console.log}

}

function lazyAppendAccount(e) {
    e.target.innerHTML = optionshtml;
}

async function fetchOrganiationFormData() {
    await fetchGLaccountS()
    await fetchOrganizationInfo()
}

function organizationInfofileTypeValidator(selectedFiles) {
    let isValid = false;
    let selectedFilesArray = Object.values(selectedFiles);
    selectedFilesArray.forEach(file => {
        let splitFileName = file.name.split('.');
        let extension = splitFileName[splitFileName.length - 1];
        if (['jpg','jpeg', 'png'].includes(extension)) isValid = true;
        else isValid = false;
    })
    return isValid;
}


async function fetchGLaccountS() {
    let result = await fetchRequest('../controllers/fetchglbyaccounttype.php');
    if(result) {
        let parseResult  =  JSON.parse(result);
        if(parseResult.status){
            defaultaccounts = parseResult.data;
            optionshtml = ''
            defaultaccounts.map(item => {
                let option = `<option value="${item.accountnumber}">${item.description}</option>`
                optionshtml += option;
                document.getElementById('default-gl-income-account').innerHTML = optionshtml
                document.getElementById('default-gl-asset-account').innerHTML = optionshtml
                document.getElementById('loan-provisioning-account').innerHTML = optionshtml
                document.getElementById('default-gl-savings-account').innerHTML = optionshtml
                document.getElementById('default-gl-esusu-account').innerHTML = optionshtml
                document.getElementById('default-gl-cash-account').innerHTML = optionshtml
                document.getElementById('default-gl-teller-cash-account').innerHTML = optionshtml
                document.getElementById('default-gl-od-account').innerHTML = optionshtml
                document.getElementById('default-current-account').innerHTML = optionshtml
                document.getElementById('default-gl-tax-account').innerHTML = optionshtml
                document.getElementById('default-fixed-account').innerHTML = optionshtml
                document.getElementById('default-fixed-interest-account').innerHTML = optionshtml
                document.getElementById('default-expense-account').innerHTML = optionshtml
                document.getElementById('default-loan-account').innerHTML = optionshtml
                document.getElementById('default-non-cash-account').innerHTML = optionshtml
                document.getElementById('default-gl-mandatory-savings-account').innerHTML = optionshtml
                document.getElementById('mandatory-savings-account-rate').innerHTML = optionshtml
                document.getElementById('default-gl-staff-account').innerHTML = optionshtml
                document.getElementById('default-rrr-account').innerHTML = optionshtml
                document.getElementById('default-property-account').innerHTML = optionshtml
                document.getElementById('default-branch-cash-account').innerHTML = optionshtml
                document.getElementById('default-excess-account').innerHTML = optionshtml
                document.getElementById('default-return-cash-account').innerHTML = optionshtml
                document.getElementById('Default-nia-account').innerHTML = optionshtml
                document.getElementById('default-bank-account').innerHTML = optionshtml
                document.getElementById('default-inventory').innerHTML = optionshtml
                document.getElementById('default-payable-account').innerHTML = optionshtml
                document.getElementById('default-receivable-account').innerHTML = optionshtml
            })
        }
    }
}
    
async function fetchOrganizationInfo() {
    let result = await fetchRequest('../controllers/fetchorganisationscript.php');
    if(result) {
        let parseResult  =  JSON.parse(result);
        if(parseResult.status){
            orginfo = parseResult.data.data[0]
            populateFormwithOrgData()
        }
    }
}

var organisationInfoNav = document.getElementById("organisation-info");
if (organisationInfoNav) organisationInfoNav.addEventListener("click", organisationInfo, false);