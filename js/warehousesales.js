       async function warehousesales () {
        await  httpRequest('warehousesales.php')
        
        
        
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

	function validateDepartment(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var mataccountnumber = document.getElementById('mataccountnumber');
		var mattransactiondate = document.getElementById('mattransactiondate');
		var matdepfirstname = document.getElementById('matdepfirstname');
		var matdeplastname = document.getElementById('matdeplastname');
		var matdepmobilenumber = document.getElementById('matdepmobilenumber');
		var matdepaccountgroup = document.getElementById('matdepaccountgroup');
		var matdepexpirydate = document.getElementById('matdepexpirydate');
		var matdeppenalty = document.getElementById('matdeppenalty');
		var matdeponlineuser = document.getElementById('matdeponlineuser');
		var matdeptransactionpoint = document.getElementById('matdeptransactionpoint');
		var matdepproduct = document.getElementById('matdepproduct');
		var matdepamountpayable = document.getElementById('matdepamountpayable');
		var matdepbalance = document.getElementById('matdepbalance');
		var matitemtype = document.getElementById('matitemtype');
		var matitemmodel = document.getElementById('matitemmodel');
		var matitemstockbalance = document.getElementById('matitemstockbalance');
		var matinvoiceno = document.getElementById('matinvoiceno');
		var mattotalcost = document.getElementById('mattotalcost');
		var matservicecharge = document.getElementById('matservicecharge');
		
	   // var matDepartmentLocation = document.getElementById('matdepartmentlocation');
	
		if(mataccountnumber.value.length < 1){
			mssg += 'Account number is Invalid <br />';			
			mataccountnumber.style.borderColor = 'red';
			flag =0;
		}
		else{
			mataccountnumber.style.borderColor = 'lightgray';
		}
		
		if(mattransactiondate.value.length < 1){
			mssg += 'Account number is Invalid <br />';			
			mattransactiondate.style.borderColor = 'red';
			flag =0;
		}
		else{
			mattransactiondate.style.borderColor = 'lightgray';
		}
		
		if(matdepfirstname.value.length < 1){
			mssg += 'First name is Invalid <br />';			
			matdepfirstname.style.borderColor = 'red';
			flag =0;
		}
		else{
			matdepfirstname.style.borderColor = 'lightgray';
		}
		if(matdeplastname.value.length < 1){
			mssg += 'Last name is Invalid <br />';			
			matdeplastname.style.borderColor = 'red';
			flag =0;
		}
		else{
			matdeplastname.style.borderColor = 'lightgray';
		}
		
		if(matdepmobilenumber.value.length < 1){
			mssg += 'Mobile number is Invalid <br />';			
			matdepmobilenumber.style.borderColor = 'red';
			flag =0;
		}
		else{
			matdepmobilenumber.style.borderColor = 'lightgray';
		}
		if(matdepaccountgroup.value.length < 1){
			mssg += 'Mobile number is Invalid <br />';			
			matdepaccountgroup.style.borderColor = 'red';
			flag =0;
		}
		else{
			matdepaccountgroup.style.borderColor = 'lightgray';
		}
		if(matdepexpirydate.value.length < 1){
			mssg += 'ExpiryDate is Invalid <br />';			
			matdepexpirydate.style.borderColor = 'red';
			flag =0;
		}
		else{
			matdepexpirydate.style.borderColor = 'lightgray';
		}
		if(matdeppenalty.value.length < 1){
			mssg += 'Penalty is Invalid <br />';			
			matdeppenalty.style.borderColor = 'red';
			flag =0;
		}
		else{
			matdeppenalty.style.borderColor = 'lightgray';
		}
		if(matdeponlineuser.value.length < 1){
			mssg += 'Online user is Invalid <br />';			
			matdeponlineuser.style.borderColor = 'red';
			flag =0;
		}
		else{
			matdeponlineuser.style.borderColor = 'lightgray';
		}
		if(matdeptransactionpoint.value.length < 1){
			mssg += 'Transaction point is Invalid <br />';			
			matdeptransactionpoint.style.borderColor = 'red';
			flag =0;
		}
		else{
			matdeptransactionpoint.style.borderColor = 'lightgray';
		}
		if(matdepproduct.value.length < 1){
			mssg += 'Product is Invalid <br />';			
			matdepproduct.style.borderColor = 'red';
			flag =0;
		}
		else{
			matdepproduct.style.borderColor = 'lightgray';
		}
		if(matdepamountpayable.value.length < 1){
			mssg += 'Product is Invalid <br />';			
			matdepamountpayable.style.borderColor = 'red';
			flag =0;
		}
		else{
			matdepamountpayable.style.borderColor = 'lightgray';
		}
		if(matdepbalance.value.length < 1){
			mssg += 'Balance is Invalid <br />';			
			matdepbalance.style.borderColor = 'red';
			flag =0;
		}
		else{
			matdepbalance.style.borderColor = 'lightgray';
		}
		if(matitemtype.value.length < 1){
			mssg += 'Type is Invalid <br />';			
			matitemtype.style.borderColor = 'red';
			flag =0;
		}
		else{
			matitemtype.style.borderColor = 'lightgray';
		}
		if(matitemmodel.value.length < 1){
			mssg += 'Model is Invalid <br />';			
			matitemmodel.style.borderColor = 'red';
			flag =0;
		}
		else{
			matitemmodel.style.borderColor = 'lightgray';
		}
		if(matitemstockbalance.value.length < 1){
			mssg += 'Stock balance is Invalid <br />';			
			matitemstockbalance.style.borderColor = 'red';
			flag =0;
		}
		else{
			matitemstockbalance.style.borderColor = 'lightgray';
		}
		if(matinvoiceno.value.length < 1){
			mssg += 'Invoice number is Invalid <br />';			
			matinvoiceno.style.borderColor = 'red';
			flag =0;
		}
		else{
			matinvoiceno.style.borderColor = 'lightgray';
		}
		if(matservicecharge.value.length < 1){
			mssg += 'Service charge  is Invalid <br />';			
			matservicecharge.style.borderColor = 'red';
			flag =0;
		}
		else{
			matservicecharge.style.borderColor = 'lightgray';
		}
		
		
		
// 		if(matDepartmentLocation.value.length < 1){
// 			mssg += 'Location is Invalid <br />';			
// 			matDepartmentLocation.style.borderColor = 'red';
// 			flag =0;
// 		}
// 		else if(matDepartmentLocation.value.length >50){
// 		    mssg += ' Location must not more than 50 characters';
// 		    matDepartmentmLocation.style.borderColor = "red";
// 		    flag = 0;
// 		}else{
// 			matDepartmentLocation.style.borderColor = 'lightgray';
// 		}
		
		
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				matservicecharge.style.borderColor = 'lightgray';
				matinvoiceno.style.borderColor = 'lightgray';
				matitemstockbalance.style.borderColor = 'lightgray';
				matitemmodel.style.borderColor = 'lightgray';
				matitemtype.style.borderColor = 'lightgray';
				matdepbalance.style.borderColor = 'lightgray';
				matdepamountpayable.style.borderColor = 'lightgray';
				matdepproduct.style.borderColor = 'lightgray';
				matdeponlineuser.style.borderColor = 'lightgray';
				matdeptransactionpoint.style.borderColor = 'lightgray';
				matdeppenalty.style.borderColor = 'lightgray';
				
				
				
				// matDepartmentLocation.style.borderColor = 'lightgray';

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getDepartmentParams(){
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


var	saveDeparment = function(e){
	  showSpinner();
		
		if(!validateDepartment()){ 
		 hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/department.php',true);
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
		request.send(getDepartmentParams());

	}

if(document.getElementById('matdepartmentsubmitbtn'))document.getElementById('matdepartmentsubmitbtn').addEventListener('click',saveDeparment,false);
        
        
        
        
    }
    
    var warehousesalesbtn = document.getElementById('warehousesales')
    if(warehousesalesbtn) warehousesalesbtn.addEventListener('click', e=>warehousesales())