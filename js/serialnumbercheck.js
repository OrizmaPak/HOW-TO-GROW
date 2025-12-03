      var serialnumbercheckfetchdata;
      
       async function serialnumbercheck () {
        await  httpRequest('serialnumbercheck.php');
        
        
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
            matlocation=locations
            // console.log('Location',locations )
      let strLocations = locations.map(each=>{
             return`
             <option value=${each.id}> ${each.location} </option>
             `
         })
          if(  document.getElementById('matbranch')){
            const headerselect = '<option selected> Select Branch </option>'
              document.getElementById('matbranch').innerHTML=  headerselect + strLocations.join(' ')
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
	
	
	
	serialnumbercheckfetchdata=[{branch:"Head Office", accountnumber:'4234245233', serialnumber:'34243', sdate:'2023-09-7'}]
	const  jtabledata = document.getElementById("serialnumberchecktabledata") 
    renderSerialNumberCheckTable()
    
	function validateSerialCheck(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var matbranch = document.getElementById('matbranch');
		var mataccountno = document.getElementById('mataccountno');
		var matserialnumber = document.getElementById('matserialnumber');
		var matdate = document.getElementById('matdate');
	   // var matDepartmentLocation = document.getElementById('matdepartmentlocation');
	
		
		
		if(matbranch.value.length < 1){
			mssg += 'Branch is Invalid <br />';			
			matbranch.style.borderColor = 'red';
			flag =0;
		}
		else{
			matbranch.style.borderColor = 'lightgray';
		}
		if(mataccountno.value.length < 1){
			mssg += 'Account number is Invalid <br />';			
			mataccountno.style.borderColor = 'red';
			flag =0;
		}
		else{
			mataccountno.style.borderColor = 'lightgray';
		}
		if(matserialnumber.value.length < 1){
			mssg += 'Serial number is Invalid <br />';			
			matserialnumber.style.borderColor = 'red';
			flag =0;
		}
		else{
			matserialnumber.style.borderColor = 'lightgray';
		}
		if(matdate.value.length < 1){
			mssg += 'Date is Invalid <br />';			
			matdate.style.borderColor = 'red';
			flag =0;
		}
		else{
			matdate.style.borderColor = 'lightgray';
		}
		
		

		
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				matbranch.style.borderColor = 'lightgray';
				mataccountno.style.borderColor = 'lightgray';
				matserialnumber.style.borderColor = 'lightgray';
				matdate.style.borderColor = 'lightgray';
					
				// matDepartmentLocation.style.borderColor = 'lightgray';

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getSerialNoCheckParams(){
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


var	saveSerialNoCheck = function(e){
	  showSpinner();
		
		if(!validateSerialCheck()){ 
		 hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/department.php',true);
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
			}else{
			    
			    hideSpinner();
			
			}

			e.stopPropagation();
		}

		
		request.setRequestHeader('Connection','close');
		request.send(getSerialNoCheckParams());

	}

if(document.getElementById('matviewbtn'))document.getElementById('matviewbtn').addEventListener('click',validateSerialCheck,false);
        
}


	function renderSerialNumberCheckTable() {
    const  jtabledata = document.getElementById("serialnumberchecktabledata") 
    if(jtabledata) jtabledata.innerHTML = '';
    if(serialnumbercheckfetchdata.length){
        serialnumbercheckfetchdata.map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.branch } </td>
                    <td> ${ item.accountnumber } </td>
                    <td> ${ item.serialnumber } </td>
                    <td> ${ item.sdate } </td>
                   
                </tr>
            `;
        });
        
    }
}

    
    var serialnumbercheckbtn = document.getElementById('serialnumbercheck')
    if(serialnumbercheckbtn) serialnumbercheckbtn.addEventListener('click', e=>serialnumbercheck())