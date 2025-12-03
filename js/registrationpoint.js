    let  registrationpointfetchdata,matlocation,regpointid; 
       async function OpenRegistrationpoint () {
        await  httpRequest('registrationpoint.php')
        
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

 function getRegistrationPonits(callback){
    const requestItem = getAjaxObject();
    
    requestItem.open('POST','../controllers/fetchregistrationpoints.php',true);
    
    requestItem.onreadystatechange = function(){
       
      if(requestItem.readyState == 4 && requestItem.status == 200){
           
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('fetchRegistration POint', result);
            const registrationPoints = result.data;
            registrationpointfetchdata = registrationPoints.data
            // console.log('RegistrationPoint',registrationPoints )
           callback(registrationPoints)
    
      }
      else{
        //   console.log("not success ",requestItem)
      }
    };
    
    requestItem.setRequestHeader('Connection','close');
  
    requestItem.send();
}

// getRegistrationPonits()	


function getLocations(){
    const requestItem = getAjaxObject();
    
    requestItem.open('POST','../controllers/fetchlocation.php',true);
    
    requestItem.onreadystatechange = function(){
      if(requestItem.readyState == 4 && requestItem.status == 200){
        const result = JSON.parse(requestItem.responseText);
        const locations= result.data.data;
        matlocation=locations
        let strLocations = locations.map(each=>{
             return`
             <option value=${each.id}> ${each.location} </option>
             `
        })
        if(  document.getElementById('registrationpointbranch')){
             const headerselect = '<option selected> Select Branch</option> '
              document.getElementById('registrationpointbranch').innerHTML= headerselect  + strLocations.join(' ')
          }
         getRegistrationPonits(function(regPoint){renderRegistrationPointTable(regPoint, locations);})
      }
      else{
        //   console.log("not success ",requestItem)
      }
    };
    requestItem.setRequestHeader('Connection','close');
    requestItem.send();
}
getLocations()	
	
	
	  
	
let jtabledata = document.getElementById('registrationpointtabledata');	
	


	

	function validateRegistrationPoint(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var registrationpoint = document.getElementById('mregistrationpoint');
		var branch = document.getElementById('registrationpointbranch');
		
		
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
// 		console.log("registrationpoint".toLowerCase() + ": " + document.getElementById('mregistrationpoint').value);
// 		console.log("branch".toLowerCase() + ": " + document.getElementById('registration-point').value);
		try {
		    console.log("logo: " + document.getElementById('profile-image-upload-input').files[0].name);
		} catch(ex) {}
    }
    
	function getRegistrationPointarams(){
		var paramstr = new FormData();
	 	if(regpointid)paramstr.append('id', regpointid)
		paramstr.append("branch".toLowerCase(), document.getElementById('registrationpointbranch').value);
		paramstr.append("registrationpoint".toLowerCase(), document.getElementById('mregistrationpoint').value);
		
        try{
		 paramstr.append('logo',document.getElementById('profile-image-upload-input').files[0].name);

        }catch(ex){
		 paramstr.append('logo','-');
	   }				
	   if(paramstr != null){
              console.log(name, 'PARAMS BELOW');    
        for (var pair of paramstr.entries()) {
              console.log(pair[0] + ', ' + pair[1]);   
            // return(name, pair[0]+ ', ' + pair[1]); 
            }}
            
        regpointid = ''
        

	   return paramstr;

	}


	var saveRegistrationPointInfo = function(e){
		showSpinner()
		if(!validateRegistrationPoint()){ 
		    hideSpinner()
			return; 
		}
// 		if(objectForChange){
// 		  //  console.log('Checking..........');
// 		   changesChecker() ;
// 		   objectForChange = null;
// 		}else{
// 		   changed = false;
		    
// 		}
		var request = getAjaxObject();
		
		request.open('POST','../controllers/registrationpointscript.php',true);
		request.onreadystatechange = function(){
			if(request.readyState == 1){
				//sysf.innerHTML = fs + 'Loading...';
				//alert('Loading...' + ' type: ' + e.type + ' Target: ' + e.target.nodeName.toLowerCase());
			}
		if(request.readyState == 4 && request.status == 200){
			    console.log('responseText', request.responseText )
			    const result = JSON.parse(request.responseText)
			 //   console.log('result', result)
			    let stat = 2
			    if(result.result === 'Successful'){
			        stat = 1
			        for(let i = 0; i < document.getElementsByTagName('input').length; i++){
			            document.getElementsByTagName('input')[i].value = ''   
			        }
			        
			        for(let i = 0; i < document.getElementsByTagName('select').length; i++){
			            document.getElementsByTagName('select')[i].value = ''
			        }
			        OpenRegistrationpoint()
			    }
			    else{
			        
			        stat = 0
			    }
			    
			    callModal(result.result, stat)
			    resetPage()
				
			}
			else{
				  hideSpinner();
			}
               
    			e.stopPropagation();
           
		}

		
		request.setRequestHeader('Connection','close');
		request.send(getRegistrationPointarams());

	}

    document.getElementById('btnSubmit').addEventListener('click',saveRegistrationPointInfo,false); 
        
}


function editRegistrationPoint(itemid, id){
    regpointid = id
     const obj = registrationpointfetchdata[+itemid]
     console.log(registrationpointfetchdata)
     console.log(obj)
     document.getElementById('mregistrationpoint').value= obj.registrationpoint;
     document.getElementById('registrationpointbranch').value= obj.location;
    
}

function deleteRegistrationPoint(itemid, id){
    if (confirm("Are you sure you want to delete?")) {
        function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removeregistrationpoint.php', parammm(), 'removeregistrationpoint', null, resetPage)
} else {
    return
}
    
}


function renderRegistrationPointTable(registrationpointfetchdata, location) {
    
   
    console.log("reg points ----- pop", location)
      console.log("reg points ----- pop", registrationpointfetchdata)
    
    let jtabledata = document.getElementById('registrationpointtabledata');
    if(jtabledata) jtabledata.innerHTML = '';
    if(registrationpointfetchdata?.data?.length){
        registrationpointfetchdata.data?.map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.registrationpoint } </td>
                    <td> ${ location.find(el => el.id === item.location)?.location} </td>
                    <td class="btncolumn">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editRegistrationPoint(${index}, ${item.id})" >Edit</span> &nbsp &nbsp
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deleteRegistrationPoint(${index}, ${item.id})">Delete</span>
                        
                    </td>
                </tr>
            `;
        });
        
    }
}
    
var registrationpointbtn = document.getElementById("registrationpoint");
if (registrationpointbtn) registrationpointbtn.addEventListener("click", e=>OpenRegistrationpoint());