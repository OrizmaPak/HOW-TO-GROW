let renewablereplacementfetchdata;
       async function renewalreplacementofbooklet () {
        await  httpRequest('renewalreplacementofbooklet.php')
        
        
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
	


function getLocations(){
    const requestItem = getAjaxObject();
    requestItem.open('POST','../controllers/fetchlocation.php',true);
    requestItem.onreadystatechange = function(){
      if(requestItem.readyState == 4 && requestItem.status == 200){
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('Location', result);
            const locations= result.data.data;
            // console.log('Location',locations )
            getMarketers(locations)
      let strLocations = locations.map(each=>{
             return`
             <option value=${each.id}> ${each.location} </option>
             `
         })
          if(  document.getElementById('matbranch')){
            //   console.log(strLocations.join(' '))
            const headerselect = '<option selected> Select Branch </option>'
              document.getElementById('matbranch').innerHTML= headerselect + strLocations.join(' ')
              document.getElementById('matbranch').value = assetsUrl.sessionLocation
          }
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

function getMarketers(locations){
    const requestItem = getAjaxObject();
    
    requestItem.open('POST','../controllers/fetchallusers.php',true);
    
    requestItem.onreadystatechange = function(){
       
      if(requestItem.readyState == 4 && requestItem.status == 200){
           
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('Marketers', result);
            const marketers= result.data;
            // console.log('Marketers',marketers )
            
            getRenewalReplacement(locations,marketers )
      let strMarketers = marketers.map(each=>{
             return`
             <option value=${each.id}> ${each.firstname} </option>
             `
         })
          if(  document.getElementById('matmarketer')){
            //   console.log(strLocations.join(' '))
            const headerselect = '<option selected> Select Marketer </option>'
              document.getElementById('matmarketer').innerHTML= headerselect + strMarketers.join(' ')
          }
        //  getRegistrationPonits(function(regPoint){renderRegistrationPointTable(regPoint, locations);})
      }
      
      else{
        //   console.log("not success ",requestItem)
      }
    };
    requestItem.setRequestHeader('Connection','close');
    requestItem.send();
}

 
 
 
 function getRenewalReplacement(locations, marketers){
    const requestItem = getAjaxObject();
    requestItem.open('POST','../controllers/fetchbooklets.php',true);
    requestItem.onreadystatechange = function(){
      if(requestItem.readyState == 4 && requestItem.status == 200){
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            console.log('booklets', result);
            const booklets= result.data.data;
           
            console.log(booklets)
            
            renewalrepacementTable(booklets, locations, marketers)
      }
      else{
        //   console.log("not success ",requestItem)
      }
    };
    requestItem.setRequestHeader('Connection','close');
    requestItem.send();
}
// getRenewalReplacement()
	
	

	function validateRenewalReplacementBooklet(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var mataccountnumber = document.getElementById('mataccountnumber');
		var matpages = document.getElementById('matpages');
		var matrequestdate = document.getElementById('matrequestdate');
		var matbranch = document.getElementById('matbranch');
		var matreason = document.getElementById('matreason');
		var matmarketer = document.getElementById('matmarketer');
		var matcharge = document.getElementById('matcharge');
	 
	
		
		
		if(mataccountnumber.value.length < 1 ||mataccountnumber.value.length > 10){
			mssg += 'Account number is Invalid <br />';			
			mataccountnumber.style.borderColor = 'red';
			flag =0;
		}
		else{
			mataccountnumber.style.borderColor = 'lightgray';
		}
	
		if(matpages.value.length < 1){
			mssg += 'Group is Invalid <br />';			
			matpages.style.borderColor = 'red';
			flag =0;
		}
		else{
			matpages.style.borderColor = 'lightgray';
		}
	
		if(matrequestdate.value.length < 1){
			mssg += 'Request date is Invalid <br />';			
			matrequestdate.style.borderColor = 'red';
			flag =0;
		}
		else{
			matrequestdate.style.borderColor = 'lightgray';
		}
		if(matbranch.value.length < 1){
			mssg += 'Branch  is Invalid <br />';			
			matbranch.style.borderColor = 'red';
			flag =0;
		}
		else{
			matbranch.style.borderColor = 'lightgray';
		}
		
		if(matreason.value.length < 1){
			mssg += 'Reason is Invalid <br />';			
			matreason.style.borderColor = 'red';
			flag =0;
		}
		else{
			matreason.style.borderColor = 'lightgray';
		}
		if(matmarketer.value.length < 1){
			mssg += 'Marketer is Invalid <br />';			
			matmarketer.style.borderColor = 'red';
			flag =0;
		}
		else{
			matmarketer.style.borderColor = 'lightgray';
		}
		if(matcharge.value.length < 1){
			mssg += 'Charge is Invalid <br />';			
			matcharge.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcharge.style.borderColor = 'lightgray';
		}
		
		
		

		
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				matcharge.style.borderColor = 'lightgray';
				matmarketer.style.borderColor = 'lightgray';
				matreason.style.borderColor = 'lightgray';
			
				matbranch.style.borderColor = 'lightgray';
				matrequestdate.style.borderColor = 'lightgray';
				matpages.style.borderColor = 'lightgray'
				mataccountnumber.style.borderColor = 'lightgray';
			

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getRenewalReplacementBookletParams(){
		var paramstr = new FormData();
	 		
		paramstr.append('accountnumber', document.getElementById('mataccountnumber').value);
		paramstr.append('charges',document.getElementById('matcharge').value);
		paramstr.append('marketer',document.getElementById('matmarketer').value );
		paramstr.append('reason',document.getElementById('matreason').value );
		paramstr.append('pages',document.getElementById('matpages').value );
		paramstr.append('requestdate',document.getElementById('matrequestdate').value );
		paramstr.append('location',document.getElementById('matbranch').value );
	
        
		for (var pair of paramstr.entries()) {
              console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
            }

	   return paramstr;

	}


var	saveRenewalReplacementBooklet = function(e){
	  showSpinner();
		
		if(!validateRenewalReplacementBooklet()){ 
		 hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/bookletscript.php',true);
		request.onreadystatechange = function(){
			if(request.readyState == 1){
				
			}
			if(request.readyState == 4 && request.status == 200){
				
				 console.log('request.responseText', request.responseText);
			     let result = JSON.parse(request.responseText);
			     console.log('result', result);
			     
			     let stat = 2;
                if(result.result === "Successful"){
                    renewalreplacementofbooklet()
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
		request.send(getRenewalReplacementBookletParams());

	}

if(document.getElementById('matsubmitbtn'))document.getElementById('matsubmitbtn').addEventListener('click',saveRenewalReplacementBooklet,false);
}

function renewalrepacementTable(matbooklet, matlocations, matmarketers){
    
    console.log('whatbooklets', matbooklet)
    console.log('what matmarketers', matmarketers)
    let jtabledata = document.getElementById('renewalreplacementofbooklettabledata');
    renewablereplacementbooklet= matbooklet 
    if(jtabledata) jtabledata.innerHTML = '';
    if(renewablereplacementbooklet.length){
        renewablereplacementbooklet.map((item, index)=>{
            jtabledata.innerHTML +=`
            
             <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.accountnumber } </td>
                    <td> ${ item.requestdate } </td>
                    <td> ${  matlocations.find(each=> each.id == item.location).location  } </td>
                    <td> ${ item.pages } </td>
                    <td> ${ item.reason } </td>
                    <td> ${  matmarketers.find(each=> each.id == item.marketer).firstname } </td>
                    <td> ${ item.charges } </td>
                    
                </tr>
            
            `
        })
    }
}
    
    var renewalreplacementofbookletbtn = document.getElementById('renewalreplacementofbooklet')
    if(renewalreplacementofbookletbtn) renewalreplacementofbookletbtn.addEventListener('click', e=>renewalreplacementofbooklet())
    
    
    