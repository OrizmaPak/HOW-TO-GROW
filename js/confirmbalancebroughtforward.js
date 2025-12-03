       async function confirmbalancebroughtforward () {
        await  httpRequest('confirmbalancebroughtforward.php')
        
        
        
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

	function validateBalBroughtForward(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var matenteraccountnumber = document.getElementById('matenteraccountnumber');
		var matbalance = document.getElementById('matbalance');
		var matunit = document.getElementById('matunit');
		var mataccountname = document.getElementById('mataccountname');
		var matbroughtforwarddeposit = document.getElementById('matbroughtforwarddeposit');
		var matpostby = document.getElementById('matpostby');
	   // var matDepartmentLocation = document.getElementById('matdepartmentlocation');
	
		
		
		if(matenteraccountnumber.value.length >10 || matenteraccountnumber.value.length < 10){
			mssg += 'Account number is Invalid <br />';			
			matenteraccountnumber.style.borderColor = 'red';
			flag =0;
		}
		else{
			matenteraccountnumber.style.borderColor = 'lightgray';
		}
		if(matunit.value.length < 1){
		    mssg += 'Unit is invalid'
		    matunit.style.borderColor = 'red';
			flag =0;
		}else{
		    matunit.style.borderColor = 'lightgray';
		}
		if(matbalance.value.length < 1){
		    mssg +='Balance is invalid'
		     matbalance.style.borderColor = 'red';
			flag =0;
		}else{
		    matbalance.style.borderColor = 'lightgray'; 
		}
		if(mataccountname.value.length < 1){
		    mssg +='Account name is invalid'
		    mataccountname.style.borderColor = 'red';
			flag =0;
		}else{
		  mataccountname.style.borderColor = 'lightgray';  
		}
		if(matbroughtforwarddeposit.value.length < 1){
		    mssg +='Brought forward is invalid'
		    matbroughtforwarddeposit.style.borderColor = 'red';
			flag =0;
		}else{
		     matbroughtforwarddeposit.style.borderColor = 'lightgray';
		}
		if(matpostby.value.length <1){
		    mssg +='Postby is invalid'
		     matpostby.style.borderColor = 'red';
			flag =0;
		}else{
		     matpostby.style.borderColor = 'lightgray';
		}
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
			 matpostby.style.borderColor = 'lightgray';
			 matbroughtforwarddeposit.style.borderColor = 'lightgray';
			 mataccountname.style.borderColor = 'lightgray'; 
			 matbalance.style.borderColor = 'lightgray';
			 matunit.style.borderColor = 'lightgray';
			 matenteraccountnumber.style.borderColor = 'lightgray';
				// matDepartmentLocation.style.borderColor = 'lightgray';
				

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getBalBroughtForwardParams(){
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


var	saveBalBroughtForward = function(e){
	  showSpinner();
		
		if(!validateBalBroughtForward()){ 
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

if(document.getElementById('matconfirmbroughtforwardbtn'))document.getElementById('matconfirmbroughtforwardbtn').addEventListener('click',validateBalBroughtForward,false);
        
        
        
        
        
        
        
    }
    
    var confirmbalancebroughtforwardbtn = document.getElementById('confirmbalancebroughtforward')
    if(confirmbalancebroughtforwardbtn) confirmbalancebroughtforwardbtn.addEventListener('click', e=>confirmbalancebroughtforward())