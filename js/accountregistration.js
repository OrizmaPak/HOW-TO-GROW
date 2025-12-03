async function accountregistration(){
    await httpRequest('accountregistration.php', 'override')
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
	}
    
    let idd = [ 'id', 'lastname', 'firstname', 'othernames', 'phonenumber', 'homeaddress', 'officeaddress', 'gender', 'occupation', 'state', 'birthdate', 'kinfullname', 'kinphonenumber', 'relationship', 'kinofficeaddress', 'kinhomeaddress', 'photourl' ]
    
    function validatePropertyStockout(z){
        console.log(z)
		var flag = 1;
		var mssg='';
		
		for(var i=0; i<z.length; i++){
		    let x = z[i]
		    if(document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'input' || document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'select' ){
		        if(document.getElementById(x).value.length < 1 || document.getElementById(x).value ){
        			mssg += `${x} is Invalid <br />`;			
        			document.getElementById(x).style.borderColor = 'red';
        			flag =0;
        		}else{
        			document.getElementById(x).style.borderColor = 'lightgray';
        		}
		    }else{
		        console.log(`${x} is not an input`)
		    }
		    
		}
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				for(var i=0; i<z.length; i++){
        		    let x = z[i]
        		    if(document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'input' || document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'select' ){
        		        if(document.getElementById(x).value.length < 1 || document.getElementById(x).value ){
                			document.getElementById(x).style.borderColor = 'lightgray';
            		    }
            	}
				}
			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}
	
		function getPropertyStockoutParams(){
		var paramstr = new FormData();
		
		for(var i=0; i<z.length; i++){
        		    let x = z[i]
        		    if(document.getElementById(x) && document.getElementById(x).tagName.toLowerCase() == 'input' || document.getElementById(x) && document.getElementById(x).tagName.toLowerCase() == 'select' ){
        		        if(document.getElementById(x).value.length < 1 || document.getElementById(x).value ){
                			paramstr.append(x, document.getElementById(x).value);
            		    }
            	}
		}

	   return paramstr;

	}
	
	var	savePropertyStockout = function(e){
		var resdiv = document.getElementById('response');
		var innerstr = '';
		
		(document.getElementById('loadingicon')).style.visibility = 'visible';
		(document.getElementById('loadingicon')).style.display = 'block';
		if(!validatePropertyStockout()){ 
			(document.getElementById('loadingicon')).style.visibility = 'hidden';
			(document.getElementById('loadingicon')).style.display = 'none';
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','Scripts/companyinfoscript.php',true);
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
				}else if(request.responseText === "SUCCESS"){
					window.location.href = "companyinfo.php";
				}else{
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

			e.stopPropagation();
		}

		
		request.setRequestHeader('Connection','close');
		request.send(getPropertyStockoutParams());

	}
    
    document.getElementById('submitaccountregistration').addEventListener('click', e=>validatePropertyStockout(idd));
    //
}

var accountregistrationm = document.getElementById("accountregistration");
if (accountregistrationm) accountregistrationm.addEventListener("click", e=>accountregistration());