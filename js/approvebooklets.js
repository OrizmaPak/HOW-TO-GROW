 var approvebookletfetchdata;
 
 
async function openApproveBooklets() {
    'use strict';
        await  httpRequest('approvebooklets.php')
    
    
  
        
        
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
    	
    

    	
function getAccountNumber()	{
    const paramstr = new FormData()
    paramstr.append('accountnumber',document.getElementById('enteraccountnumber').value )
    
    	for (var pair of paramstr.entries()) {
                  console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
                }
                
     return paramstr
}
    	
 function getAccountName(){
    const requestItem = getAjaxObject();
    requestItem.open('POST','../controllers/fetchaccountprofile.php',true)
    requestItem.onreadystatechange = function(){
      if(requestItem.readyState == 4 && requestItem.status == 200){
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            console.log('Accountdetails', result);
          
          if(  document.getElementById('displayfetchname')){
            
            //   document.getElementById('displayfetchname').textContent= accountProfile.name
          }
       
      }
      else{
        //   console.log("not success ",requestItem)
      }
    };
    requestItem.setRequestHeader('Connection','close');
    requestItem.send(getAccountNumber());
}

	
 function getBooklets(){
    const requestItem = getAjaxObject();
    requestItem.open('POST','../controllers/bookletspendingapproval.php',true);
    requestItem.onreadystatechange = function(){
      if(requestItem.readyState == 4 && requestItem.status == 200){
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            console.log('booklets', result);
            const booklets= result.data;
           
            console.log(booklets)
            
             renderApproveBookletTable(booklets)
      }
      else{
        //   console.log("not success ",requestItem)
      }
    };
    requestItem.setRequestHeader('Connection','close');
    requestItem.send();
}

getBooklets()
	
    
    	function validateApproveBooklet(){
    	   // console.log('amtttttttt')
    		var flag = 1;
    		var mssg='';
    		//used for BVN instead
    		var matenteraccountnumber = document.getElementById('enteraccountnumber');
    	   // var matDepartmentLocation = document.getElementById('matdepartmentlocation');
    	
    		
    		if(matenteraccountnumber.value.length < 1){
    			mssg += 'Account number is Invalid <br />';			
    			matenteraccountnumber.style.borderColor = 'red';
    			flag =0;
    		}
  
    		
    		
    		if(flag == 0){
    			
    			var mbox = document.getElementById('messageBox');
    			mbox.innerHTML = mssg;
    			mbox.style.display = 'block';
    			mbox.style.visibility = 'visible';
    
    			setTimeout(function(){
    				mbox.style.display = 'none';
    				mbox.style.visibility = 'hidden';
    			matenteraccountnumber.style.borderColor = 'lightgray';
    				// matDepartmentLocation.style.borderColor = 'lightgray';
    
    			}, 2000);	
    			return false;
    		}else{ 
    			return true; 
    		}
    
    	}
    
    	function getApproveBookletParams(){
    		var paramstr = new FormData();
    	 		
    		paramstr.append('accountnumber',document.getElementById('enteraccountnumber').value);
    // 		paramstr.append('location',document.getElementById('matdepartmentlocation').value);
    // 		paramstr.append('status',document.getElementById('matdepartmentstatus').value )
    // 		paramstr.append('id',document.getElementById('matdepartmentid').value )
    	
            
    		for (var pair of paramstr.entries()) {
                  console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
                }
    
    	   return paramstr;
    
    	}
    
    
var	saveApproveBooklet = function(e){
    	  showSpinner();
    		
    		if(!validateRenewalBooklet()){ 
    		 hideSpinner();
    			return; 
    		}
    		
    		var request = getAjaxObject();
    		
    		request.open('POST','../controllers/collectbooklet.php',true);
    		request.onreadystatechange = function(){
    			if(request.readyState == 1){
    				
    			}
    			if(request.readyState == 4 && request.status == 200){
    				
    				 console.log('request.responseText', request.responseText);
    			     //let result = JSON.parse(request.responseText)
    			     //console.log('result', result);
    			     
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
    				
    			}else{
    			    
    			    hideSpinner();
    			
    			}
    
    			e.stopPropagation();
    		}
    
    		
    		request.setRequestHeader('Connection','close');
    		request.send(getApproveBookletParams());
    
    	};
    
    if(document.getElementById('matapprovebookletgo'))document.getElementById('matapprovebookletgo').addEventListener('click', e=>saveRenewalBooklet(), true);

}

function renderApproveBookletTable(booklets) {
    const approvebookletfetchdata = booklets
    const  jtabledata = document.getElementById("approvebooklettabledata") 
    if(jtabledata) jtabledata.innerHTML = '';
    if(approvebookletfetchdata.length){
        approvebookletfetchdata.map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.pendingbooklet.accountnumber } </td>
                     <td class="btncolumn">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick=" approveBooklet(${item.pendingbooklet.id})">Approve</span>
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="declineBooklet(${item.pendingbooklet.id})">Decline</span>
                    </td>
                </tr>
            `;
        });
    }
}

function approveBooklet(id){
    
    	function getApproveBookletParams(){
    		var paramstr = new FormData();
    		paramstr.append('id',id);
    		for (var pair of paramstr.entries()) {
                  console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
                }
    
    	   return paramstr;
    
    	}
    
    	  showSpinner();
    		
    		var request = getAjaxObject();
    		request.open('POST','../controllers/approvebooklet.php',true);
    		request.onreadystatechange = function(){
    			if(request.readyState == 4 && request.status == 200){
    				 console.log('request.responseText', request.responseText);
    				 result = JSON.parse(request.responseText)
    				 console.log(result)
    			     let stat = 2;
                    if(result.result == "Successful"){
                        stat = 1;
                       openApproveBooklets()
                    }else{
                        stat = 0;
                    }
    			     callModal(result.result, stat)
    			}else{
    			    hideSpinner();
    			}
    // 			e.stopPropagation();
    		}
    		request.setRequestHeader('Connection','close');
    		request.send(getApproveBookletParams());
    	
}

function declineBooklet(id){
    console.log(id)
    
    	function getApproveBookletParams(){
    		var paramstr = new FormData();
    		paramstr.append('id',id);
    		for (var pair of paramstr.entries()) {
                  console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
                }
    
    	   return paramstr;
    
    	}
    	  showSpinner();
    		var request = getAjaxObject();
    		request.open('POST','../controllers/declinebooklet.php',true);
    		request.onreadystatechange = function(){
    			if(request.readyState == 4 && request.status == 200){
    				 console.log('request.responseText', request.responseText);
    				  result = JSON.parse(request.responseText)
    				 console.log(result)
    			     let stat = 2;
                    if(result.result === "Successful"){
                        stat = 1;
                        openApproveBooklets()
                    }else{
                        stat = 0;
                    }
    			     callModal(result.result, stat)
    			}else{
    			    hideSpinner();
    			}
    // 			e.stopPropagation();
    		}
    		request.setRequestHeader('Connection','close');
    		request.send(getApproveBookletParams());
}

     
    var approvebooklets = document.getElementById('approvebooklets')
    if(approvebooklets)approvebooklets.addEventListener('click', e=>openApproveBooklets())