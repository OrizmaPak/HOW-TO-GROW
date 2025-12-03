// document.getElementById("vicol-view-excess-nia-act-header").addEventListener("click", () => {
//     document.getElementById("pop-up-container").toggleAttribute("hidden");
// });

async function ViewExcessNiaAct () {
    
    // alert("Vicol");
    
    await httpRequest('viewexcessniaaccount.php', 'override');
    
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

    
    function getFetchExcessDeclarationParams(){
        var paramstr = new FormData();
        paramstr.append("transactiondate", document.getElementById('confirm-detail-transaction-date').value);
        paramstr.append("group", document.getElementById('confirm-detail-group').value);
        return paramstr;
    
    }
    
    var fetchExcessDeclaration = function(e){
        // alert();
        if (document.getElementById("container-wrapper-1")) document.getElementById("container-wrapper-1").setAttribute("hidden", "");
        if (document.getElementById("container-wrapper-2")) document.getElementById("container-wrapper-2").removeAttribute("hidden");
        if (document.getElementById("container-wrapper-3")) document.getElementById("container-wrapper-3").setAttribute("hidden", "");
        
        // alert("Reached fetchExcessDeclaration Function");
        var innerstr = '';
        
        // (document.getElementsByName('loadingicon')[0]).style.visibility = 'visible';
        // (document.getElementsByName('loadingicon')[0]).style.display = 'block';
        showSpinner();
        
        var request = getAjaxObject();
        
        request.open('POST','../controllers/controller.php',true);
        request.onreadystatechange = function(){
            if(request.readyState == 1){
                //sysf.innerHTML = fs + 'Loading...';
                //alert('Loading...' + ' type: ' + e.type + ' Target: ' + e.target.nodeName.toLowerCase());
            }
            if(request.readyState == 4 && request.status == 200){
                    // (document.getElementsByName('loadingicon')[0]).style.visibility = 'hidden';
                    // (document.getElementsByName('loadingicon')[0]).style.display = 'none';
                    hideSpinner();
                    
                    console.log(request.responseText);
                    
                    let result = JSON.parse(request.responseText);
                    if(result["result"] === "ERROR"){
                        var mbox = document.getElementsByName('messageBox')[0];
                        document.getElementsByName('messageBox')[0].innerHTML = "No result for the selected filters";
                        mbox.style.display = 'block';
                        mbox.style.visibility = 'visible';
                        setTimeout(function(){
                            mbox.style.display = 'none';
                            mbox.style.visibility = 'hidden';
    
                        }, 4000);						
                        
                    }else{
                        //var mbox = document.getElementsByName('reportfilterbox')[0];
                        // alert("Reached Item Detail Load Data Function");
                        loadViewExcessNiaActData(result);
                        // alert("Passed Item Detail Load Data Function");
                        
                    }
                
            }else{
                // (document.getElementsByName('loadingicon')[0]).style.visibility = 'hidden';
                // (document.getElementsByName('loadingicon')[0]).style.display = 'none';
                hideSpinner();
                
                
                //document.getElementsByName('loader')[0].style.display = 'none';
                //sf = '<b>Error getting data</b>';
            }
    
    
            try{
                e.stopPropagation();
            }catch(ex){}
        }
    
        
        request.setRequestHeader('Connection','close');
        request.send(getFetchExcessDeclarationParams());
    
    }
    
    function loadViewExcessNiaActData(result){
        console.log(result.data);
        if(result.data.length > 0){
            for (var k=0;k<result.data.length;k++){
                document.getElementById('transaction-date').value = result.data.k.transactiondate;
                document.getElementById('accounting-officer').value = result.data.k.accountofficer;
                document.getElementById('value-date').value = result.data.k.valuedate;
                document.getElementById('group').value = result.data.k.groupid;
                document.getElementById('deposit').value = result.data.k.deposit;
                document.getElementById('return-cash').value = result.data.k.returnedcash;
                document.getElementById('excess-cash').value = result.data.k.excesscash;
                document.getElementById('total-cash').value = result.data.k.total;
                document.getElementById('number-visited').value = result.data.k.numbervisited;
                document.getElementById('target').value = result.data.k.target;
                document.getElementById('branch').value = result.data.k.location;
            }
        }
    
    }

	function validateViewExcessNiaAct(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var transactiondate = document.getElementById('transaction-date');
		var accountofficer = document.getElementById('accounting-officer');
		var valuedate = document.getElementById('vaue-date');
		var groupid = document.getElementById('group');
		var deposit = document.getElementById('deposit');
		var returnedcash = document.getElementById('return-cash');
		var excesscash = document.getElementById('excess-cash');
		var total = document.getElementById('total-cash');
		var numbervisited = document.getElementById('number-visited');
		var target = document.getElementById('target');
		var location = document.getElementById('branch');
		
		
// 		var location = document.getElementById('location').options[document.getElementById('location').selectedIndex].value;
// 		var papersize = document.getElementById('papersize').options[document.getElementById('papersize').selectedIndex].value;
		//var email = document.getElementById('email');		
		
		if(transactiondate.value.length < 1){
			mssg += 'Transaction Date must be selected <br />';			
			transactiondate.style.borderColor = 'red';
			flag =0;
		} else if (transactiondate.value.length >= 250) {
			mssg += 'Transaction Date must be selected <br />';			
			transactiondate.style.borderColor = 'red';
			flag =0;
		} else {
			transactiondate.style.borderColor = 'lightgray';
		}
		
		if(accountofficer.value.length < 1){
			mssg += 'Account Officer must be selected <br />';			
			accountofficer.style.borderColor = 'red';
			flag =0;
		}else{
			accountofficer.style.borderColor = 'lightgray';
		}
		
		if(valuedate.value.length < 1){
			mssg += 'Value Date must be selected <br />';			
			valuedate.style.borderColor = 'red';
			flag =0;
		}else{
			valuedate.style.borderColor = 'lightgray';
		}
		
		if(groupid.value.length < 1){
			mssg += 'Group must be selected <br />';			
			groupid.style.borderColor = 'red';
			flag =0;
		}else{
			groupid.style.borderColor = 'lightgray';
		}
		
		if(deposit.value.length < 1){
			mssg += 'Deposit is blank <br />';			
			deposit.style.borderColor = 'red';
			flag =0;
		} else{
			deposit.style.borderColor = 'lightgray';
		}
		
		if(returnedcash.value.length < 1){
			mssg += 'Returned Cash is blank <br />';			
			returnedcash.style.borderColor = 'red';
			flag =0;
		} else{
			returnedcash.style.borderColor = 'lightgray';
		}
		
		if(excesscash.value.length < 1){
			mssg += 'Excess Cash is blank <br />';			
			excesscash.style.borderColor = 'red';
			flag =0;
		} else{
			excesscash.style.borderColor = 'lightgray';
		}
		
		if(total.value.length < 1){
			mssg += 'Total Cash is blank <br />';			
			total.style.borderColor = 'red';
			flag =0;
		} else{
			total.style.borderColor = 'lightgray';
		}
		
		if(numbervisited.value.length < 1){
			mssg += 'Number Visited is blank <br />';			
			numbervisited.style.borderColor = 'red';
			flag =0;
		}else{
			numbervisited.style.borderColor = 'lightgray';
		}
		
		if(target.value.length < 1){
			mssg += 'Target is blank <br />';			
			target.style.borderColor = 'red';
			flag =0;
		}else{
			target.style.borderColor = 'lightgray';
		}
		
		if(location.value.length < 1){
			mssg += 'Branch is blank <br />';			
			location.style.borderColor = 'red';
			flag =0;
		}else{
			location.style.borderColor = 'lightgray';
		}
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				transactiondate.style.borderColor = 'lightgray';
				accountofficer.style.borderColor = 'lightgray';
				valuedate.style.borderColor = 'lightgray';
				groupid.style.borderColor = 'lightgray';
				deposit.style.borderColor = 'lightgray';
				returnedcash.style.borderColor = 'lightgray';
				excesscash.style.borderColor = 'lightgray';
				total.style.borderColor = 'lightgray';
				numbervisited.style.borderColor = 'lightgray';
				target.style.borderColor = 'lightgray';
				location.style.borderColor = 'lightgray';
				
				// (document.getElementById('location')).style.borderColor = 'lightgray';
				// (document.getElementById('papersize')).style.borderColor = 'lightgray';

			}, 3000);	
			return false;
		}else{ 
			return true; 
		}

	}
    
    function displayViewExcessNiaActParams() {
		console.log("transactiondate".toLowerCase() + ": " + document.getElementById('transaction-date').value);
		console.log("accountofficer".toLowerCase() + ": " + document.getElementById('accounting-officer').value);
		console.log("valuedate".toLowerCase() + ": " + document.getElementById('vaue-date').value);
		console.log("groupid".toLowerCase() + ": " + document.getElementById('group').value);
		console.log("deposit".toLowerCase() + ": " + document.getElementById('deposit').value);
		console.log("returnedcash".toLowerCase() + ": " + document.getElementById('return-cash').value);
		console.log("excesscash".toLowerCase() + ": " + document.getElementById('excess-cash').value);
		console.log("total".toLowerCase() + ": " + document.getElementById('total-cash').value);
		console.log("numbervisited".toLowerCase() + ": " + document.getElementById('number-visited').value);
		console.log("target".toLowerCase() + ": " + document.getElementById('target').value);
		console.log("location".toLowerCase() + ": " + document.getElementById('branch').value);
		try {
		    console.log("logo: " + document.getElementById('profile-image-upload-input').files[0].name);
		} catch(ex) {}
    }
    
	function getViewExcessNiaActParams(){
		var paramstr = new FormData();
	 		
		paramstr.append("transactiondate".toLowerCase(), document.getElementById('transaction-date').value);
		paramstr.append("accountofficer".toLowerCase(), document.getElementById('accounting-officer').value);
		paramstr.append("valuedate".toLowerCase(), document.getElementById('value-date').value);
		paramstr.append("groupid".toLowerCase(), document.getElementById('group').value);
		paramstr.append("deposit".toLowerCase(), document.getElementById('deposit').value);
		paramstr.append("returnedcash".toLowerCase(), document.getElementById('return-cash').value);
		paramstr.append("excesscash".toLowerCase(), document.getElementById('excess-cash').value);
		paramstr.append("total".toLowerCase(), document.getElementById('total-cash').value);
		paramstr.append("numbervisited".toLowerCase(), document.getElementById('number-visited').value);
		paramstr.append("target".toLowerCase(), document.getElementById('target').value);
		paramstr.append("location".toLowerCase(), document.getElementById('branch').value);

        try{
		 paramstr.append('logo',document.getElementById('profile-image-upload-input').files[0].name);

        }catch(ex){
		 paramstr.append('logo','-');
	   }				


	   return paramstr;

	}


	var saveViewExcessNiaActInfo = function(e){
		displayViewExcessNiaActParams();
		var resdiv = document.getElementById('response');
		var innerstr = '';
		
        // (document.getElementById('loadingicon')).style.visibility = 'visible';
        // (document.getElementById('loadingicon')).style.display = 'block';
        showSpinner();
		if(!validateViewExcessNiaAct()){ 
			// (document.getElementById('loadingicon')).style.visibility = 'hidden';
			// (document.getElementById('loadingicon')).style.display = 'none';
			hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/organisationinfoscript.php',true);
		request.onreadystatechange = function(){
			if(request.readyState == 1){
				//sysf.innerHTML = fs + 'Loading...';
				//alert('Loading...' + ' type: ' + e.type + ' Target: ' + e.target.nodeName.toLowerCase());
			}
			if(request.readyState == 4 && request.status == 200){
				if(request.responseText === "FAILED"){
					// (document.getElementById('loadingicon')).style.visibility = 'hidden';
					// (document.getElementById('loadingicon')).style.display = 'none';
					hideSpinner();

					var mbox = document.getElementById('messageBox');
					document.getElementById('messageBox').innerHTML = "Login Failed";
					mbox.style.display = 'block';
					mbox.style.visibility = 'visible';
					setTimeout(function(){
						mbox.style.display = 'none';
						mbox.style.visibility = 'hidden';

					}, 3000);						
				// }else if(request.responseText === "SUCCESS"){
				// 	window.location.href = "organisation-info.php";
				// }else{
				} else{
					// (document.getElementById('loadingicon')).style.visibility = 'hidden';
					// (document.getElementById('loadingicon')).style.display = 'none';
					hideSpinner();

					var mbox = document.getElementById('messageBox');
					document.getElementById('messageBox').innerHTML = "MSG: " + request.responseText;
					mbox.style.display = 'block';
					mbox.style.visibility = 'visible';
					setTimeout(function(){
						mbox.style.display = 'none';
						mbox.style.visibility = 'hidden';

					}, 14000);						
					
				}
			}else{
				// (document.getElementById('loadingicon')).style.visibility = 'hidden';
				// (document.getElementById('loadingicon')).style.display = 'none';
				hideSpinner();
				
				
			    //document.getElementById('loader').style.display = 'none';
				//sf = '<b>Error getting data</b>';
			}
            try {    
    			e.stopPropagation();
            } catch(ex) {}
		}

		
		request.setRequestHeader('Connection','close');
		request.send(getViewExcessNiaActParams());

	}

    if(document.getElementById('radioTickForExcess')) document.getElementById('radioTickForExcess').addEventListener('click',alert(),false);
    if(document.getElementById('radioTickForNia')) document.getElementById('radioTickForNia').addEventListener('click',fetchNiaDeclaration,false);
    if(document.getElementById('btnSubmit')) document.getElementById('btnSubmit').addEventListener('click',saveViewExcessNiaActInfo,false);
    if(document.getElementById('btnReport')) document.getElementById('btnReport').addEventListener('click',saveViewExcessNiaActInfo,false);
    
    // alert();
}


var ViewExcessNiaActNav = document.getElementById("viewexcessniaaccount");
if (ViewExcessNiaActNav) ViewExcessNiaActNav.addEventListener("click", ViewExcessNiaAct, false);