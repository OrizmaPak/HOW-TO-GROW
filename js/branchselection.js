
async function branchselection () {
        await  httpRequest('branchselection.php')
        
        
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
        
        function getLocations(){
    const requestItem = getAjaxObject();
    
    requestItem.open('POST','../controllers/fetchlocationforbranchselection.php',true);
    
    requestItem.onreadystatechange = function(){
       
      if(requestItem.readyState == 4 && requestItem.status == 200){
           
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('Location', result);
            const locations= result.data.data;
            matlocation=locations
            // console.log('Location',locations )
      let strLocations = locations.map(each=>{
             return`
             <option value=${each.id}> ${each.location} </option>
             `
         })
          if(  document.getElementById('mbranch')){
            const headerselect = '<option selected> Select Branch</option> '
              document.getElementById('mbranch').innerHTML=headerselect + strLocations.join(' ')
          }
        //   if(  document.getElementById('locationnow')){
        //     const headerselect = '<option selected> Select Branch</option> '
        //       document.getElementById('locationnow').innerHTML=headerselect + strLocations.join(' ')
        //   }
        //  getRegistrationPonits(function(regPoint){renderRegistrationPointTable(regPoint, locations);})
    
      }
      else{
        //   console.log("not success ",requestItem)
      }
    };
    
    requestItem.setRequestHeader('Connection','close');
  
    requestItem.send();
}

getLocations()

  function validateBranchSelection(){
       var flag = 1;
		var mssg='';
       if(document.getElementById('mbranch').value.length < 1){
			mssg += 'Rejected date  is Invalid <br />';			
			document.getElementById('mbranch').style.borderColor = 'red';
			flag =0;
		}
		else{
		document.getElementById('mbranch').style.borderColor = 'lightgray';
		}
		
			if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				document.getElementById('mbranch').style.borderColor = 'lightgray';
			

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}
       
   }

   function getBranchSelection(){
       var paramstr = new FormData();
       
       paramstr.append('location', document.getElementById('mbranch').value)
       
       return paramstr;
   }
   
 var	saveRejectedTransaction= function(e){
		showSpinner();
		
		if(!validateBranchSelection()){ 
		    hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/branchselection.php',true);
		request.onreadystatechange = function(){
			if(request.readyState == 1){
			
			}
			if(request.readyState == 4){
			
			 console.log('request.responseText', request.responseText);
			     let result = JSON.parse(request.responseText);
			     console.log('result', result);
			     
			     let stat = 2;
                if(result.status){
                    stat = 1;
                    
                    // for(let i=0; i<document.getElementsByTagName('input').length; i++){
                    //     document.getElementsByTagName('input')[i].value = '';
                    // }
                    // for(let i=0; i<document.getElementsByTagName('select').length; i++){
                    //     document.getElementsByTagName('select')[i].value = '';
                    // }
                     if(document.getElementById('mbranch'))document.getElementById('mbranch').value = result.data.id;
                     if(document.getElementById('locationdiv'))document.getElementById('locationdiv').innerHTML = result.data.location;
                    
                }else{
                    stat = 0;
                }
			     callModal(result.result, stat)
			}
			
			else{
			 hideSpinner();
			}
			e.stopPropagation();
		};
		request.setRequestHeader('Connection','close');
		request.send(getBranchSelection());
	};  
	const selectbranchuserstatus =(result)=>{
        console.log(document.getElementById('mbranch'))
        if(document.getElementById('mbranch'))document.getElementById('mbranch').value = result.id;
        if(document.getElementById('locationdiv'))document.getElementById('locationdiv').innerHTML = result.location;
        
    // if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
    //     if(document.getElementById('mbranch'))document.getElementById('mbranch').setAttribute('readonly', false);
    // }else{
    //     if(document.getElementById('mbranch'))document.getElementById('mbranch').setAttribute('readonly', true)
    // }
}
	
	function getpermissionsParamsgiftview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsgiftview(), 'fetchuserprofile', null, selectbranchuserstatus);
   
   
   
   
   
  if(document.getElementById('matbranchselectionsubmitbtn'))document.getElementById('matbranchselectionsubmitbtn').addEventListener('click',	saveRejectedTransaction, false );       
        
        
}
    
var branchselectionbtn = document.getElementById("branchselection");
if (branchselectionbtn) branchselectionbtn.addEventListener("click", e=>branchselection());