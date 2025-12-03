       async function nettransactionentry () {
        await  httpRequest('nettransactionentry.php')
        
        
        var  getAjaxObject = function(){
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
	};

	function validateNetTransactionEntry(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var mattransactiondate = document.getElementById('mattransactiondate');
		var matselectnexttransactiondate = document.getElementById('matselectnexttransactiondate');
		var matentrybranch = document.getElementById('matentrybranch');
		var matcreditbalancebroughtforward = document.getElementById('matcreditbalancebroughtforward');
		var matcreditdailydeposit = document.getElementById('matcreditdailydeposit');
		var matcreditdailyrrr = document.getElementById('matcreditdailyrrr');
		var matcreditcashfrombank = document.getElementById('matcreditcashfrombank');
		var matcreditcashfrombranch = document.getElementById('matcreditcashfrombranch');
		var matcreditexcess = document.getElementById('matcreditexcess');
		var matcreditloanrepayment = document.getElementById('matcreditloanrepayment');
		var matcreditreturncash = document.getElementById('matcreditreturncash');
		var matcreditcashproperty = document.getElementById('matcreditcashproperty');
		var matcredittotalcredit = document.getElementById('matcredittotalcredit');
		var matdebitdailyexpense = document.getElementById('matdebitdailyexpense');
		var matdebitcashpayment = document.getElementById('matdebitcashpayment');
		var matdebitpaymentbybank = document.getElementById('matdebitpaymentbybank');
		var matdebitcashtobank = document.getElementById('matdebitcashtobank');
		var matdebitcashtobranch = document.getElementById('matdebitcashtobranch');
		var matdebitnia = document.getElementById('matdebitnia');
		var matdebitreturncash = document.getElementById('matdebitreturncash');
		var matdebittotaldebit = document.getElementById('matdebittotaldebit');
		var matnetbalance = document.getElementById('matnetbalance');
	   // var matDepartmentLocation = document.getElementById('matdepartmentlocation');
	
		
		
		
		if(mattransactiondate.value.length < 1){
			mssg += 'Date  is Invalid <br />';			
			mattransactiondate.style.borderColor = 'red';
			flag =0;
		}
		else{
			mattransactiondate.style.borderColor = 'lightgray';
		}
		if(matselectnexttransactiondate.value.length < 1){
			mssg += 'Date  is Invalid <br />';			
			matselectnexttransactiondate.style.borderColor = 'red';
			flag =0;
		}
		else{
			matselectnexttransactiondate.style.borderColor = 'lightgray';
		}
		
		if(matentrybranch.value.length < 1){
			mssg += 'Branch  is Invalid <br />';			
			matentrybranch.style.borderColor = 'red';
			flag =0;
		}
		else{
			matentrybranch.style.borderColor = 'lightgray';
		}
		if(matcreditbalancebroughtforward.value.length < 1){
			mssg += 'Balance broght forward  is Invalid <br />';			
			matcreditbalancebroughtforward.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcreditbalancebroughtforward.style.borderColor = 'lightgray';
		}
		if(matcreditdailydeposit.value.length < 1){
			mssg += 'Daily deposit  is Invalid <br />';			
			matcreditdailydeposit.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcreditdailydeposit.style.borderColor = 'lightgray';
		}
		if(matcreditdailyrrr.value.length < 1){
			mssg += 'Daily RRR  is Invalid <br />';			
			matcreditdailyrrr.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcreditdailyrrr.style.borderColor = 'lightgray';
		}
		if(matcreditcashfrombank.value.length < 1){
			mssg += 'Cash from bank is Invalid <br />';			
			matcreditcashfrombank.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcreditcashfrombank.style.borderColor = 'lightgray';
		}
		if(matcreditcashfrombranch.value.length < 1){
			mssg += 'Cash from branch is Invalid <br />';			
			matcreditcashfrombranch.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcreditcashfrombranch.style.borderColor = 'lightgray';
		}
		if(matcreditexcess.value.length < 1){
			mssg += 'Excess is Invalid <br />';			
			matcreditexcess.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcreditexcess.style.borderColor = 'lightgray';
		}
		if(matcreditloanrepayment.value.length < 1){
			mssg += 'Loan repayment is Invalid <br />';			
			matcreditloanrepayment.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcreditloanrepayment.style.borderColor = 'lightgray';
		}
		if(matcreditreturncash.value.length < 1){
			mssg += 'Return cash is Invalid <br />';			
			matcreditreturncash.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcreditreturncash.style.borderColor = 'lightgray';
		}
		if(matcreditcashproperty.value.length < 1){
			mssg += 'Cash property is Invalid <br />';			
			matcreditcashproperty.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcreditcashproperty.style.borderColor = 'lightgray';
		}
		if(matcredittotalcredit.value.length < 1){
			mssg += 'Total credit is Invalid <br />';			
			matcredittotalcredit.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcredittotalcredit.style.borderColor = 'lightgray';
		}
		if(matdebitdailyexpense.value.length < 1){
			mssg += 'Daily expense is Invalid <br />';			
			matdebitdailyexpense.style.borderColor = 'red';
			flag =0;
		}
		else{
			matdebitdailyexpense.style.borderColor = 'lightgray';
		}
		if(matdebitcashpayment.value.length < 1){
			mssg += 'Cash payment is Invalid <br />';			
			matdebitcashpayment.style.borderColor = 'red';
			flag = 0;
		}
		else{
			matdebitcashpayment.style.borderColor = 'lightgray';
		}
		if(matdebitpaymentbybank.value.length < 1){
			mssg += 'Payment by bank is Invalid <br />';			
			matdebitpaymentbybank.style.borderColor = 'red';
			flag = 0;
		}
		else{
			matdebitpaymentbybank.style.borderColor = 'lightgray';
		}
		if(matdebitcashtobank.value.length < 1){
			mssg += 'Cash to Bank is Invalid <br />';			
			matdebitcashtobank.style.borderColor = 'red';
			flag = 0;
		}
		else{
			matdebitcashtobank.style.borderColor = 'lightgray';
		}
		if(matdebitcashtobranch.value.length < 1){
			mssg += 'Cash to Branch is Invalid <br />';			
			matdebitcashtobranch.style.borderColor = 'red';
			flag = 0;
		}
		else{
			matdebitcashtobranch.style.borderColor = 'lightgray';
		}
		if(matdebitnia.value.length < 1){
			mssg += 'NIA is Invalid <br />';			
			matdebitnia.style.borderColor = 'red';
			flag = 0;
		}
		else{
			matdebitnia.style.borderColor = 'lightgray';
		}
		if(matdebitreturncash.value.length < 1){
			mssg += 'Return cash is Invalid <br />';			
			matdebitreturncash.style.borderColor = 'red';
			flag = 0;
		}
		else{
			matdebitreturncash.style.borderColor = 'lightgray';
		}
		if(matdebittotaldebit.value.length < 1){
			mssg += 'Total debit is Invalid <br />';			
			matdebittotaldebit.style.borderColor = 'red';
			flag = 0;
		}
		else{
			matdebittotaldebit.style.borderColor = 'lightgray';
		}
		if(matnetbalance.value.length < 1){
			mssg += 'Net balance is Invalid <br />';			
			matnetbalance.style.borderColor = 'red';
			flag = 0;
		}
		else{
			matnetbalance.style.borderColor = 'lightgray';
		}
		
		
	
	
		
		
		if(flag === 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				mattransactiondate.style.borderColor = 'lightgray';
				matselectnexttransactiondate.style.borderColor = 'lightgray';
				matnetbalance.style.borderColor = 'lightgray';
				matdebittotaldebit.style.borderColor = 'lightgray';
				matdebitreturncash.style.borderColor = 'lightgray';
				matdebitnia.style.borderColor = 'lightgray';
				matdebitcashtobranch.style.borderColor = 'lightgray';
				matdebitcashtobank.style.borderColor = 'lightgray';
				matdebitpaymentbybank.style.borderColor = 'lightgray';
				matdebitcashpayment.style.borderColor = 'lightgray';
				matdebitdailyexpense.style.borderColor = 'lightgray';
				matcredittotalcredit.style.borderColor = 'lightgray';
				matcreditcashproperty.style.borderColor = 'lightgray';
				matcreditreturncash.style.borderColor = 'lightgray';
				matcreditloanrepayment.style.borderColor = 'lightgray';
				matcreditexcess.style.borderColor = 'lightgray';
				matcreditcashfrombranch.style.borderColor = 'lightgray';
				matcreditcashfrombank.style.borderColor = 'lightgray';
				matcreditdailyrrr.style.borderColor = 'lightgray';
				matcreditdailydeposit.style.borderColor = 'lightgray';
				matcreditbalancebroughtforward.style.borderColor = 'lightgray';
				matentrybranch.style.borderColor = 'lightgray';
				
				// matDepartmentLocation.style.borderColor = 'lightgray';

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getNetTransactionParams(){
		var paramstr = new FormData();
	 		
		paramstr.append('department',document.getElementById('matdepartment').value);
// 		paramstr.append('location',document.getElementById('matdepartmentlocation').value);
// 		paramstr.append('status',document.getElementById('matdepartmentstatus').value )
// 		paramstr.append('id',document.getElementById('matdepartmentid').value )
	
        
		for (var pair of paramstr.entries()) {
               console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
            }

	   return paramstr;

	}


var	saveNetTransaction = function(e){
	  showSpinner();
		
		if(!validateDepartment()){ 
		 hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/companyscript.php',true);
		request.onreadystatechange = function(){
			if(request.readyState == 1){
				
			}
			if(request.readyState == 4 && request.status == 200){
				
				 console.log('request.responseText', request.responseText);
			     let result = JSON.parse(request.responseText);
			     console.log('result', result);
			     
			     let stat = 2;
                if(result.result === "Successful"){
                    stat = 1;
                    for(let i=0; i<document.getElementsByTagName('input').length; i++){
                        document.getElementsByTagName('input')[i].value = '';
                    }
                    for(let i=0; i<document.getElementsByTagName('select').length; i++){
                        document.getElementsByTagName('select')[i].value = '';
                    }
                    
                }else{
                    stat = 0;
                }
			     
			     callModal(result.result, stat)
				
			
				// if(request.responseText === "FAILED"){
				// 	(document.getElementById('loadingicon')).style.visibility = 'hidden';
				// 	(document.getElementById('loadingicon')).style.display = 'none';

				// 	var mbox = document.getElementById('messageBox');
				// 	document.getElementById('messageBox').innerHTML = "Login Failed";
				// 	mbox.style.display = 'block';
				// 	mbox.style.visibility = 'visible';
				// 	setTimeout(function(){
				// 		mbox.style.display = 'none';
				// 		mbox.style.visibility = 'hidden';

				// 	}, 3000);						
				// }else if(request.responseText === "SUCCESS"){
				// 	window.location.href = "companyinfo.php";
				// }else{
				// 	(document.getElementById('loadingicon')).style.visibility = 'hidden';
				// 	(document.getElementById('loadingicon')).style.display = 'none';

				// 	var mbox = document.getElementById('messageBox');
				// 	document.getElementById('messageBox').innerHTML = "MSG: " + request.responseText;
				// 	mbox.style.display = 'block';
				// 	mbox.style.visibility = 'visible';
				// 	setTimeout(function(){
				// 		mbox.style.display = 'none';
				// 		mbox.style.visibility = 'hidden';

				// 	}, 14000);						
					
				// }
			}else{
			    
			    hideSpinner();
				// (document.getElementById('loadingicon')).style.visibility = 'hidden';
				// (document.getElementById('loadingicon')).style.display = 'none';
				
				
			    //document.getElementById('loader').style.display = 'none';
				//sf = '<b>Error getting data</b>';
			}

			e.stopPropagation();
		}

		
		request.setRequestHeader('Connection','close');
		request.send(getNetTransactionParams());

	}

if(document.getElementById('matNetTransactionentry'))document.getElementById('matNetTransactionentry').addEventListener('click',validateNetTransactionEntry,false);
        
        
        
    }
    
    var nettransactionentrybtn = document.getElementById('nettransactionentry')
    if(nettransactionentrybtn) nettransactionentrybtn.addEventListener('click', e=>nettransactionentry())