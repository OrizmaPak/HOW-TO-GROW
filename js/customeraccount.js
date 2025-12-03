var fieldsIdd = [
 `id`,
 `lastname`,
 `firstname`,
 `othernames`,
 `phonenumber`,
 `homeaddress`,
 `officeaddress`,
 `gender`,
 `occupation`,
 `state`,
 `birthdate`,
 `kinfullname`, 
 `kinphonenumber`,
 `relationship`,
 `kinofficeaddress`,
 `kinhomeaddress`,
 `kinoccupation`, 
 `photourl`,
 `lga`,
 `town`
 ]; 

var pFiles, fileselect, input;
var localItem;
 
async function openCustomerAccount() {
    await httpRequest('customeraccount.php');
    if(document.getElementById('submitcustomeraccount')) document.getElementById('submitcustomeraccount').addEventListener('click', e=>saveCustomerAccount());
    if(checkIfCustomerUpdate()) customerMode('update')
    else customerMode();
    
    pFiles = document.querySelector('#document')
    fileselect = document.querySelector('.file-action')
    if(fileselect) input = fileselect.querySelector('input[id="document"]')
    
    if(fileselect) fileselect.addEventListener('click', () =>{ if(input) input.click()})
    if(input) input.addEventListener('change', (e) => onCustomerFileInputChange(e.target))
}

var customerMode = function(mode='savings') { 
    if(mode.includes('update')) {
        let localdata  = sessionStorage.getItem('customer')
        let parsedata = localItem = JSON.parse(localdata);
        try {
            
            Object.keys(parsedata).forEach( item => {
                let el = document.getElementById(item);
                if(el) el.value = parsedata[item];
            })
            
            sessionStorage.removeItem('customer')
        }
        catch(e) {
            console.log(e)
        }
        
    }
    else {
        sessionStorage.removeItem('customer')
        localItem = null;
    }
}

var checkIfCustomerUpdate = function() {
    return !!sessionStorage.getItem('customer')
}

function validateCustomerAccount(z){

	var flag = 1;
	var mssg='';
	for(var i=0; i<z.length; i++){
	    let x = z[i];
	    if(document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'input' || document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'select' ){
	        if(document.getElementById(x).value.length < 1 ){
	           // console.log(document.getElementById(x).value.length < 1, document.getElementById(x).value.length, document.getElementById(x).value) 
     			mssg += `${x} is Invalid <br />`;			
     			document.getElementById(x).style.borderColor = 'red';
     			flag =0;
 		    }else{
 		        //console.log(document.getElementById(x).value.length, document.getElementById(x).value)
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

function getCustomerAccountParams(z){ 
	var paramstr = new FormData();
	localItem && paramstr.append('id', localItem.id);
	for(var i=0; i<z.length; i++){
 	    let x = z[i]
 	    if(document.getElementById(x) && document.getElementById(x).tagName.toLowerCase() == 'input' || document.getElementById(x) && document.getElementById(x).tagName.toLowerCase() == 'select' ){
 	        if(document.getElementById(x).value.length < 1 || document.getElementById(x).value ){
     			paramstr.append(x, document.getElementById(x).value);
 		    }
 	    }
	}
	
    try {
        paramstr.append('photofilename',input.files[0].name);		
        paramstr.append('userphotoname',input.files[0]);
    }
    catch(ex){
         paramstr.append('photofilename','-');		
         paramstr.append('userphotoname','-');
     
    }
   return paramstr;
}


var	saveCustomerAccount = function(e){ 
    let formstate = validateCustomerAccount(fieldsIdd);
    if(!formstate){ 
		return; 
	}
	
	showSpinner();
	var request = getAjaxObject();
    
    request.open('POST','../controllers/customeraccountscript.php',true);
    
    request.onreadystatechange = function(e){
        
        if(request.readyState == 1){}
        
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            let parseRequest = JSON.parse(request.responseText)
            if(parseRequest.message.includes("Successful") || parseRequest.message.includes("Successful")){
                callModal('Request successful', 1)
            }
            else {
                callModal('Request failed', 0)
            }
        }
        else{
            hideSpinner()
        }

        e.stopPropagation();
    }

    
    request.setRequestHeader('Connection','close'); 
    request.send(getCustomerAccountParams(fieldsIdd));
	
}

function fileTypeValidator(selectedFiles) {
    let isValid = false;
    let selectedFilesArray = Object.values(selectedFiles);
    selectedFilesArray.forEach(file => {
        let splitFileName = file.name.split('.');
        let extension = splitFileName[splitFileName.length - 1];
        if (['jpg','jpeg', 'png', 'pdf', 'docx'].includes(extension)) isValid = true;
        else isValid = false;
    })
    return isValid;
}


function onCustomerFileInputChange(event) {

    let previewEl = document.querySelector('.file-area');
    if(previewEl) previewEl.innerHTML = '';
    
    let selectedFiles = input.files;

    if (!fileTypeValidator(selectedFiles)) {
        errorBox('Unsupported file selected')
        input.value = event = null;
    }

    else {
                
        for(let i = 0; i < selectedFiles.length; i++) {
            let splitFileName = selectedFiles[i].name.split('.');
            let extension = splitFileName[splitFileName.length - 1];
            if(['pdf', 'docx'].includes(extension?.toLowerCase())) {
                const div = document.createElement('div')
                div.style.cssText = 'border-radius:5px;border:1px solid rgba(0, 0, 0, 0.2);padding:30px;font-size:12px'
                div.innerHTML = selectedFiles[i].name;
                previewEl.appendChild(div)
            }
            else {
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `promotion-file-${i}`)
                previewEl.appendChild(img);
                img.src = URL.createObjectURL(event.files[i]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
            }
        }

    }
}


var customerAccountBtn = document.getElementById('customeraccount');
if(customerAccountBtn) customerAccountBtn.addEventListener('click', openCustomerAccount, false);
