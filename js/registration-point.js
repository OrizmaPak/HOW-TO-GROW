export const registration_point = () => {
    
    // alert("Vicol");
    
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

	function validateRegistrationPoint(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var registrationpoint = document.getElementById('registration-point');
		var branch = document.getElementById('branch');
		
		
// 		var location = document.getElementById('location').options[document.getElementById('location').selectedIndex].value;
// 		var papersize = document.getElementById('papersize').options[document.getElementById('papersize').selectedIndex].value;
		//var email = document.getElementById('email');		
		
		if(registrationpoint.value.length < 1){
			mssg += 'Registration Point is balnk <br />';			
			registrationpoint.style.borderColor = 'red';
			flag =0;
		} else if (registrationpoint.value.length >= 100) {
			mssg += 'Registration Point must not be greater than 100 characters <br />';			
			registrationpoint.style.borderColor = 'red';
			flag =0;
		} else {
			registrationpoint.style.borderColor = 'lightgray';
		}
		
		if(branch.value.length < 1){
			mssg += 'Branch must be selected <br />';			
			branch.style.borderColor = 'red';
			flag =0;
		}else{
			branch.style.borderColor = 'lightgray';
		}
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				registrationpoint.style.borderColor = 'lightgray';
				branch.style.borderColor = 'lightgray';
				
				// (document.getElementById('location')).style.borderColor = 'lightgray';
				// (document.getElementById('papersize')).style.borderColor = 'lightgray';

			}, 3000);	
			return false;
		}else{ 
			return true; 
		}

	}
    
    function displayRegistrationPointarams() {
		console.log("registrationpoint".toLowerCase() + ": " + document.getElementById('branch').value);
		console.log("branch".toLowerCase() + ": " + document.getElementById('registration-point').value);
		try {
		    console.log("logo: " + document.getElementById('profile-image-upload-input').files[0].name);
		} catch(ex) {}
    }
    
	function getRegistrationPointarams(){
		var paramstr = new FormData();
	 		
		paramstr.append("branch".toLowerCase(), document.getElementById('branch').value);
		paramstr.append("registrationpoint".toLowerCase(), document.getElementById('registration-point').value);
		
        try{
		 paramstr.append('logo',document.getElementById('profile-image-upload-input').files[0].name);

        }catch(ex){
		 paramstr.append('logo','-');
	   }				


	   return paramstr;

	}


	var saveRegistrationPointInfo = function(e){
		displayRegistrationPointarams();
		var resdiv = document.getElementById('response');
		var innerstr = '';
		
		(document.getElementById('loadingicon')).style.visibility = 'visible';
		(document.getElementById('loadingicon')).style.display = 'block';
		if(!validateRegistrationPoint()){ 
			(document.getElementById('loadingicon')).style.visibility = 'hidden';
			(document.getElementById('loadingicon')).style.display = 'none';
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/registrationpointscript.php',true);
		request.onreadystatechange = function(){
			if(request.readyState == 1){
				//sysf.innerHTML = fs + 'Loading...';
				//alert('Loading...' + ' type: ' + e.type + ' Target: ' + e.target.nodeName.toLowerCase());
			}
			if(request.readyState == 4 && request.status == 200){
				if(request.responseText === "FAILED"){
					(document.getElementById('loadingicon')).style.visibility = 'hidden';
					(document.getElementById('loadingicon')).style.display = 'none';

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
					(document.getElementById('loadingicon')).style.visibility = 'hidden';
					(document.getElementById('loadingicon')).style.display = 'none';

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
				(document.getElementById('loadingicon')).style.visibility = 'hidden';
				(document.getElementById('loadingicon')).style.display = 'none';
				
				
			    //document.getElementById('loader').style.display = 'none';
				//sf = '<b>Error getting data</b>';
			}
            try {    
    			e.stopPropagation();
            } catch(ex) {}
		}

		
		request.setRequestHeader('Connection','close');
		request.send(getRegistrationPointarams());

	}

    document.getElementById('btnSubmit').addEventListener('click',saveRegistrationPointInfo,false);
    
    // alert();
}