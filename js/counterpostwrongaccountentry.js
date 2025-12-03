       async function counterpostwrongaccountentry () {
        await  httpRequest('counterpostwrongaccountentry.php')
        
        
        
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

	function validateCounterpostwrongaccount(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var matbranch = document.getElementById('matbranch');
		var mataccountofficer = document.getElementById('mataccountofficer');
		var matcounter= document.getElementById('matcounter');
		var matgroup = document.getElementById('matgroup');
		var mattreatedstatus = document.getElementById('mattreatedstatus');
		var matconfirmstatus= document.getElementById('matconfirmstatus');
		var matfromaccountnumber= document.getElementById('matfromaccountnumber');
		var matfromfirstname= document.getElementById('matfromfirstname');
		var matfromlastname= document.getElementById('matfromlastname');
		var matfrommiddlename= document.getElementById('matfrommiddlename');
		var matfromamountpaid= document.getElementById('matfromamountpaid');
		var matfrombalance= document.getElementById('matfrombalance');
		var mattobranch= document.getElementById('mattobranch');
		var mattoaccountnumber= document.getElementById('mattoaccountnumber');
		var mattofirstname= document.getElementById('mattofirstname');
		var mattolastname= document.getElementById('mattolastname');
		var mattomiddlename= document.getElementById('mattomiddlename');
		var mattogroup= document.getElementById('mattogroup');
		var mattobalance= document.getElementById('mattobalance');
	   // var matDepartmentLocation = document.getElementById('matdepartmentlocation');
	
		
		
		if(matbranch.value.length < 1){
			mssg += 'Branch is Invalid <br />';			
			matbranch.style.borderColor = 'red';
			flag =0;
		}
		else{
			matbranch.style.borderColor = 'lightgray';
		}
			
		if(mataccountofficer.value.length < 1){
			mssg += 'Account officer is Invalid <br />';			
			mataccountofficer.style.borderColor = 'red';
			flag =0;
		}
		else{
			mataccountofficer.style.borderColor = 'lightgray';
		}
		if(matcounter.value.length < 1){
			mssg += 'Counter is Invalid <br />';			
			matcounter.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcounter.style.borderColor = 'lightgray';
		}
		if(matgroup.value.length < 1){
			mssg += 'Group is Invalid <br />';			
			matgroup.style.borderColor = 'red';
			flag =0;
		}
		else{
			matgroup.style.borderColor = 'lightgray';
		}
		if(mattreatedstatus.value.length < 1){
			mssg += 'Treated status is Invalid <br />';			
			mattreatedstatus.style.borderColor = 'red';
			flag =0;
		}
		else{
			mattreatedstatus.style.borderColor = 'lightgray';
		}
		if(matconfirmstatus.value.length < 1){
			mssg += 'Confirm status is Invalid <br />';			
			matconfirmstatus.style.borderColor = 'red';
			flag =0;
		}
		else{
			matconfirmstatus.style.borderColor = 'lightgray';
		}
		if(matfromaccountnumber.value.length < 1){
			mssg += 'Account number is Invalid <br />';			
			matfromaccountnumber.style.borderColor = 'red';
			flag =0;
		}
		else{
			matfromaccountnumber.style.borderColor = 'lightgray';
		}
		if(matfromfirstname.value.length < 1){
			mssg += 'First name is Invalid <br />';			
			matfromfirstname.style.borderColor = 'red';
			flag =0;
		}
		else{
			matfromfirstname.style.borderColor = 'lightgray';
		}
		if(matfromlastname.value.length < 1){
			mssg += 'Last name is Invalid <br />';			
			matfromlastname.style.borderColor = 'red';
			flag =0;
		}
		else{
			matfromlastname.style.borderColor = 'lightgray';
		}
		if(matfrommiddlename.value.length < 1){
			mssg += 'Middle name is Invalid <br />';			
			matfrommiddlename.style.borderColor = 'red';
			flag =0;
		}
		else{
			matfrommiddlename.style.borderColor = 'lightgray';
		}
		if(matfrombalance.value.length < 1){
			mssg += 'Balance is Invalid <br />';			
			matfrombalance.style.borderColor = 'red';
			flag =0;
		}
		else{
			matfrombalance.style.borderColor = 'lightgray';
		}
		if(matfromamountpaid.value.length < 1){
			mssg += 'Amount paid is Invalid <br />';			
			matfromamountpaid.style.borderColor = 'red';
			flag =0;
		}
		else{
			matfromamountpaid.style.borderColor = 'lightgray';
		}
		
		if(mattobranch.value.length < 1){
			mssg += 'Branch is Invalid <br />';			
			mattobranch.style.borderColor = 'red';
			flag =0;
		}else{
			mattobranch.style.borderColor = 'lightgray';
		}
		
		if(mattoaccountnumber.value.length < 1){
			mssg += 'Account number is Invalid <br />';			
			mattoaccountnumber.style.borderColor = 'red';
			flag =0;
		}
		else{
		mattoaccountnumber.style.borderColor = 'lightgray';
		}
		if(mattofirstname.value.length < 1){
			mssg += 'First name is Invalid <br />';			
			mattofirstname.style.borderColor = 'red';
			flag =0;
		}
		else{
		    mattofirstname.style.borderColor = 'lightgray';
		}
		if(mattolastname.value.length < 1){
			mssg += 'Last name is Invalid <br />';			
			mattolastname.style.borderColor = 'red';
			flag =0;
		}
		else{
		    mattolastname.style.borderColor = 'lightgray';
		}
		if(mattomiddlename.value.length < 1){
			mssg += 'Middle name is Invalid <br />';			
			mattomiddlename.style.borderColor = 'red';
			flag =0;
		}
		else{
		    mattomiddlename.style.borderColor = 'lightgray';
		}
		if(mattogroup.value.length < 1){
			mssg += 'Group is Invalid <br />';			
			mattogroup.style.borderColor = 'red';
			flag =0;
		}
		else{
		    mattogroup.style.borderColor = 'lightgray';
		}
		if(mattobalance.value.length < 1){
			mssg += 'Balance is Invalid <br />';			
			mattobalance.style.borderColor = 'red';
			flag =0;
		}
		else{
		    mattobalance.style.borderColor = 'lightgray';
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
				 mattobalance.style.borderColor = 'lightgray';
				 mattogroup.style.borderColor = 'lightgray';
				 mattomiddlename.style.borderColor = 'lightgray';
				 mattolastname.style.borderColor = 'lightgray';
				 mattofirstname.style.borderColor = 'lightgray';
				 matfrommiddlename.style.borderColor = 'lightgray';
				 matfromlastname.style.borderColor = 'lightgray';
				 matfromfirstname.style.borderColor = 'lightgray';
				 matfromamountpaid.style.borderColor = 'lightgray';
				 matfrombalance.style.borderColor = 'lightgray';
				 matfromaccountnumber.style.borderColor = 'lightgray';
				 matbranch.style.borderColor = 'lightgray';
				 mattobranch.style.borderColor = 'lightgray';
				 mattoaccountnumber.style.borderColor = 'lightgray';
				 mataccountofficer.style.borderColor = 'lightgray'
				 matcounter.style.borderColor = 'lightgray'
				 matgroup.style.borderColor = 'lightgray'
				 mattreatedstatus.style.borderColor = 'lightgray'
				 matconfirmstatus.style.borderColor = 'lightgray'
				 
				 
				// matDepartmentLocation.style.borderColor = 'lightgray';

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getCounterPostWrongParams(){
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


var	saveCounterPostWrong = function(e){
	  showSpinner();
		
		if(!validateDepartment()){ 
		 hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/company.php',true);
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

if(document.getElementById('matcounterpostwrongbtn'))document.getElementById('matcounterpostwrongbtn').addEventListener('click',validateCounterpostwrongaccount,false);
        
        
        
    }
    
    var counterpostwrongaccountentrybtn = document.getElementById('counterpostwrongaccountentry')
    if(counterpostwrongaccountentrybtn) counterpostwrongaccountentrybtn.addEventListener('click', e=>counterpostwrongaccountentry())