 var confirmbookletfetchdata;
 
 
async function confirmbookletrenewalandreplacement () {
    'use strict';
        await  httpRequest('confirmbookletrenewalandreplacement.php')
    
    
  
        
        
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
    requestItem.open('POST','../controllers/fetchbooklets.php',true)
    requestItem.onreadystatechange = function(){
      if(requestItem.readyState == 4 && requestItem.status == 200){
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            const booklet = result.data.data
            console.log('Booklets',booklet );
             renderConfirmBookletTable(booklet)
      }
      else{
        //   console.log("not success ",requestItem)
      }
    };
    requestItem.setRequestHeader('Connection','close');
    requestItem.send(getAccountNumber());
}

getBooklets()

	
// if(document.getElementById('enteraccountnumber')){
//     document.getElementById('enteraccountnumber').addEventListener ('blur', function(){
//          getAccountName();
        
//     });
// }

    
    function validateRenewalBooklet(){
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
    
    	function getRenewalBookletParams(){
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
    
    
var	saveRenewalBooklet = function(e){
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
    			     let result = JSON.parse(request.responseText);
    			     console.log('result', result);
    			     let stat = 2;
                    if(result.result === "Successful"){
                        confirmbookletrenewalandreplacement()
                        stat = 1;
                        for(let i=0; i<document.getElementsByTagName('input').length; i++){
                            document.getElementsByTagName('input')[i].value = '';
                        }
                        for(let i=0; i<document.getElementsByTagName('select').length; i++){
                            document.getElementsByTagName('select')[i].value = '';
                        }
                        // document.getElementById('displayfetchname').value = '';
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
    		request.send(getRenewalBookletParams());
    
    	};
    
    if(document.getElementById('matrenewalbookletgo'))document.getElementById('matrenewalbookletgo').addEventListener('click', e=>saveRenewalBooklet(), true);

}

function renderConfirmBookletTable(booklets) {
	 confirmbookletfetchdata = booklets   
    const  jtabledata = document.getElementById("confirmbooklettabledata") 
    if(jtabledata) jtabledata.innerHTML = '';
    if(confirmbookletfetchdata.length){
        confirmbookletfetchdata.map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.accountnumber } </td>
                </tr>
            `;
        });
        
    }
}

     
    var confirmbookletrenewalandreplacementbtn = document.getElementById('confirmbookletrenewalandreplacement')
    if(confirmbookletrenewalandreplacementbtn) confirmbookletrenewalandreplacementbtn.addEventListener('click', e=>confirmbookletrenewalandreplacement())