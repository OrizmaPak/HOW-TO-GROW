async function accountregistration2 (){
    await httpRequest('accountregistration2.php', 'override')  
    const acregpropertybtn = document.getElementById('acreg-propertybtn');
    const acregaccounttype = document.getElementById('acreg-accounttype');
    const acregs3scroller = document.getElementsByClassName('acreg-s3scroller')[0]
    
    acregpropertybtn.addEventListener('click', e=>{
        acregpropertybtn.textContent == 'property->' ? acregs3scroller.style.right = '100%' : acregs3scroller.style.right = '0%';
        acregpropertybtn.textContent == 'property->' ? acregpropertybtn.style.left = '0px' : acregpropertybtn.style.left = '87%';
        acregpropertybtn.textContent == 'property->' ? acregpropertybtn.textContent = '<-back' : acregpropertybtn.textContent = 'property->';
    })
    
    acregaccounttype.addEventListener('change', e=>{
        acregaccounttype.value == 'PROPERTY' ? acregpropertybtn.classList.remove('hidden') : acregpropertybtn.classList.add('hidden')
        acregaccounttype.value == 'PROPERTY' ? acregpropertybtn.click() : '';
    })
    
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
    
    let idd = [ 'lastname', 'firstname', 'othernames', 'phonenumber', 'homeaddress', 'officeaddress', 'gender', 'occupation', 'state', 'birthdate', 'kinfullname', 'kinphonenumber', 'relationship', 'kinofficeaddress', 'kinhomeaddress', 'photourl' ]
    
    function validatePropertyStockout(z){
        alert(z)
		var flag = 1;
		var mssg='';
// 		//used for BVN instead
// 		var itemName = document.getElementById('itemname');
// 		var month = document.getElementById('month');
// 		var year = document.getElementById('year');
// 		var totalQty = document.getElementById('totalqty');
		
		for(var i=0; i<z.length; i++){
		    let x = z[i]
		    if(document.getElementById(x)){
		        if(document.getElementById(x).value.length < 1){
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
		
// 		if(itemName.value.length < 1){
// 			mssg += 'Item Name is Invalid <br />';			
// 			itemName.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			itemName.style.borderColor = 'lightgray';
// 		}
		
// 		if(month.value.length < 1){
// 			mssg += 'Month is Invalid <br />';			
// 			month.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			month.style.borderColor = 'lightgray';
// 		}
		
// 		if(year.value.length < 1){
// 			mssg += 'Year is Invalid <br />';			
// 			year.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			year.style.borderColor = 'lightgray';
// 		}
// 		if(totalQty.value.length < 1){
// 			mssg += 'Total quantity is blank <br />';			
// 			totalQty.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			totalQty.style.borderColor = 'lightgray';
// 		}
		
// 		if(flag == 0){
			
// 			var mbox = document.getElementById('messageBox');
// 			mbox.innerHTML = mssg;
// 			mbox.style.display = 'block';
// 			mbox.style.visibility = 'visible';

// 			setTimeout(function(){
// 				mbox.style.display = 'none';
// 				mbox.style.visibility = 'hidden';
// 				itemName.style.borderColor = 'lightgray';
// 				month.style.borderColor = 'lightgray';
// 				year.style.borderColor = 'lightgray';
// 				totalQty.style.borderColor = 'lightgray';
			

// 			}, 2000);	
// 			return false;
// 		}else{ 
// 			return true; 
// 		}

	}
    
    validatePropertyStockout(idd)
    //
}

var accountregistration2m = document.getElementById("accountregistration2");
if (accountregistration2m) accountregistration2m.addEventListener("click", e=>accountregistration2());