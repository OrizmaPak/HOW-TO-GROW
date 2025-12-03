let branchsetupfetchdata;
let brachsetupid
async function openBranchSetup(){
    
await httpRequest('branchsetup.php');

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
	
	
	function getLocation(){
    const requestLocation = getAjaxObject();
    
    requestLocation .open('POST','../controllers/fetchlocation.php',true);
    
    requestLocation .onreadystatechange = function(){
       
       if(requestLocation .readyState == 4 && requestLocation .status == 200){
           
            // console.log(requestItem);
            const result = JSON.parse(requestLocation .responseText);
            console.log('result', result);
            const ObjectOfObj = result.data;
             branchsetupfetchdata = ObjectOfObj.data;
            
            console.log(branchsetupfetchdata)
            
            let jtabledata = document.getElementById('branchsetuptabledata');
            renderBranchSetUpTable();

       }
       else{
        //   console.log("not success ",requestItem)
       }
    };
    
    requestLocation .setRequestHeader('Connection','close');
  
    requestLocation .send();
}

getLocation();
	
	
	

	
	
// 	branchsetupfetchdata = [{location:'Anambra',state:'Anambra state',description:'Head office',
// 	address:'4, city Biscuit Road UgwuagbaObosi Anambra State', account:'234542322'},
// 	{location:'Onisha',state:'Anambra State',description:'Main Market branch',
// 	address:'1 sokoto road main market onisha', account:'234542322'}]
	
// // 	branchsetupmodal = document.querySelector(".matmodal");
    
//     if(document.querySelector(".matcancelmodal"))document.querySelector(".matcancelmodal").addEventListener('click',function(){
//     console.log("work oo work oo");
//      matmodal.classList.add('matmodalhidde');
//     });
    
    


	function validateBranchSetup(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var matBranchSetupLocation = document.getElementById('matbranchsetuplocation');
		var matBranchSetupState = document.getElementById('matbranchsetupstate');
		var matBranchSetupAccNumber = document.getElementById('matbranchsetupaccno');
		var matBranchSetupAddress = document.getElementById('matbranchsetupaddress');
	    var matBranchSetupDescription = document.getElementById('matbranchsetupdescription');
		
		
		
		if(matBranchSetupAddress.value.length < 1){
			mssg += 'Address is Invalid <br />';			
			matBranchSetupAddress.style.borderColor = 'red';
			flag =0;
		}else if(matBranchSetupAddress.value.lenght > 250){
		    mssg += 'Address must not more than 250 characters<br />';			
			matBranchSetupAddress.style.borderColor = 'red';
			flag =0;
		}
		else{
			matBranchSetupAddress.style.borderColor = 'lightgray';
		}
		
		if(matBranchSetupLocation.value.length < 1){
			mssg += 'Location is Invalid <br />';			
			matBranchSetupLocation.style.borderColor = 'red';
			flag =0;
		}
		else if(matBranchSetupLocation.value.lenght > 50){
		    mssg += 'Location must not more than 50 characters<br />';			
			matBranchSetupLocation.style.borderColor = 'red';
			flag =0;
		}
		else{
			matBranchSetupLocation.style.borderColor = 'lightgray';
		}
		
		if(matBranchSetupAccNumber.value.length < 1){
			mssg += 'Branch acoount number is Invalid <br />';			
			matBranchSetupAccNumber.style.borderColor = 'red';
			flag =0;
		}else{
			matBranchSetupAccNumber.style.borderColor = 'lightgray';
		}
		
		if(matBranchSetupState.value.length < 1){
			mssg += 'State is Invalid <br />';			
			matBranchSetupState.style.borderColor = 'red';
			flag =0;
		}else if(matBranchSetupState.value.lenght > 50){
		    mssg += 'State must not more than 50 characters<br />';			
			matBranchSetupState.style.borderColor = 'red';
			flag =0;
		}
		
		else{
			matBranchSetupState.style.borderColor = 'lightgray';
		}
		
		if(matBranchSetupDescription.value.length < 1){
			mssg += 'Description is Invalid <br />';			
			matBranchSetupDescription.style.borderColor = 'red';
			flag =0;
		}else if(matBranchSetupDescription.value.lenght > 50){
		    mssg += 'Description must not more than 50 characters<br />';			
			matBranchSetupDescription.style.borderColor = 'red';
			flag =0;
		}
		
		else{
			matBranchSetupDescription.style.borderColor = 'lightgray';
		}
		
	
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				matBranchSetupAddress.style.borderColor = 'lightgray';
				matBranchSetupLocation.style.borderColor = 'lightgray';
				matBranchSetupAccNumber.style.borderColor = 'lightgray';
				matBranchSetupState.style.borderColor = 'lightgray';
				matBranchSetupDescription.style.borderColor = 'lightgray';
			

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getBranchSetupParams(){
		var paramstr = new FormData();
		console.log('idd', brachsetupid) 
		if(brachsetupid)paramstr.append('id',brachsetupid)
		paramstr.append('location',document.getElementById('matbranchsetuplocation').value);
		paramstr.append('state',document.getElementById('matbranchsetupstate').value);
		paramstr.append('description',document.getElementById('matbranchsetupdescription').value);
	 	paramstr.append('address',document.getElementById('matbranchsetupaddress').value);	
		paramstr.append('accountnumber',document.getElementById('matbranchsetupaccno').value);
		paramstr.append('cashwithdrawallimit',document.getElementById('cashwithdrawallimit').value);
	
        for (var pair of paramstr.entries()) {
               console.log(pair[0] + ', ' + pair[1] + ', '); 
            }	
		brachsetupid = ''

	    return paramstr;

	}


var	saveBranchSetup = function(e){
		
		showSpinner();
		
		if(!validateBranchSetup()){ 
		 hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/locationscript.php',true);
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
                    resetPage('reset')
                }else{
                    stat = 0;
                }
			     
			     callModal(result.message, stat)
			
				// if(request.responseText === "FAILED"){
				// 	(document.getElementById('loadingicon')).style.visibility = 'hidden';
				// 	(document.getElementById('loadingicon')).style.display = 'none';

				// 	var mbox = document.getElementById('messageBox');
				// 	document.getElementById('messageBox').innerHTML = "Login Failed";
				// 	mbox.style.display = 'block';
				// 	mbox.style.visibility = 'visible';
				// 	setTimeout(function(){
				// 		mbox.style.display = 'none';
				// 		mbox.style.visibility = 'hidden';

				// 	}, 3000);						
				// }else if(request.responseText === "SUCCESS"){
				// 	window.location.href = "companyinfo.php";
				// }else{
				// 	(document.getElementById('loadingicon')).style.visibility = 'hidden';
				// 	(document.getElementById('loadingicon')).style.display = 'none';

				// 	var mbox = document.getElementById('messageBox');
				// 	document.getElementById('messageBox').innerHTML = "MSG: " + request.responseText;
				// 	mbox.style.display = 'block';
				// 	mbox.style.visibility = 'visible';
				// 	setTimeout(function(){
				// 		mbox.style.display = 'none';
				// 		mbox.style.visibility = 'hidden';

				// 	}, 14000);						
					
				// }
			}else{
			    
			     hideSpinner();
				// (document.getElementById('loadingicon')).style.visibility = 'hidden';
				// (document.getElementById('loadingicon')).style.display = 'none';
				
				
			    //document.getElementById('loader').style.display = 'none';
				//sf = '<b>Error getting data</b>';
			}

			e.stopPropagation();
		}

		
		request.setRequestHeader('Connection','close');
		request.send(getBranchSetupParams());

	}


if(document.getElementById('matbranchsetupsubmitbtn'))document.getElementById('matbranchsetupsubmitbtn').addEventListener('click',saveBranchSetup,false); 
if(document.getElementById('matbranchsetupupdatebtn'))document.getElementById('matbranchsetupupdatebtn').addEventListener('click',saveBranchSetup,false);     
}

function matOpenModal(itemid){
    let obj = fetchdata[+itemid]
    matmodal.classList.remove('matmodalhidde');
    console.log(obj);
    document.getElementById("modallocation").value= obj.location;
    document.getElementById("modalstate").value= obj.state;
    document.getElementById("modaldescription").value= obj.description;
    document.getElementById("modaladdress").value= obj.address;
    document.getElementById("modalaccount").value= obj.account
}

function matEditBranchSetUp(itemid, id){
    // if(document.getElementById('matbranchsetupsubmitbtn'))document.getElementById('matbranchsetupsubmitbtn').innerHTML = 'Update';
    brachsetupid = id
    let obj = branchsetupfetchdata[+itemid]
    document.getElementById("matbranchsetuplocation").value= obj.location;
    document.getElementById("matbranchsetupstate").value= obj.state;
    document.getElementById("matbranchsetupdescription").value= obj.description; 
    document.getElementById("matbranchsetupaddress").value= obj.address;
    document.getElementById("matbranchsetupaccno").value= obj.accountnumber
    document.getElementById("cashwithdrawallimit").value= obj.cashwithdrawallimit

    
}

function matDeleteBranchSetUp(id){
     function ddparams(){    
            let params = new FormData()
            params.append('id', id) 
            return params
        }
        function action(result){
            openBranchSetup()
        }
        callController('removelocation.php', ddparams(), 'removelocation', [], action)
}

function renderBranchSetUpTable() {
    let jtabledata = document.getElementById('branchsetuptabledata');
    if(jtabledata) jtabledata.innerHTML = '';
    if(branchsetupfetchdata.length){
        branchsetupfetchdata.map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.location } </td>
                    <td> ${ item.state } </td>
                    <td> ${ item.description } </td>
                    <td> ${ item.address } </td>
                    <td> ${ item.accountnumber } </td>
                    <td> ${ item.cashwithdrawallimit } </td>
                    <td class="btncolumn">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="matEditBranchSetUp(${index}, ${item.id})" >Edit</span> &nbsp 
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="matDeleteBranchSetUp(${item.id})">Delete</span>
                    </td>
                </tr>
            `;
        });
        
    }
}


var branchSetup = document.getElementById('branchsetup');
if(branchSetup) branchSetup.addEventListener('click',openBranchSetup,false);
    
    
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
              if(document.getElementById('mbranch'))document.getElementById('mbranch').value = result.data.location;
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
   
 var saveRejectedTransaction= function(e, controller="branchselection"){
		showSpinner();
		
		if(!validateBranchSelection()){ 
		    hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST',`../controllers/${controller}.php`,true);
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
                     if(document.getElementById('mbranch'))document.getElementById('mbranch').value = result.data.id;
                     if(document.getElementById('locationdiv'))document.getElementById('locationdiv').innerHTML = result.data.location;
                }else{
                    stat = 0;
                }
			     callModal(result.message, stat)
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
        if(document.getElementById('mbranch'))document.getElementById('mbranch').value = result.location_id;
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


const popperemailer=(result)=>{
	    document.getElementById('personelallemailer').innerHTML = result.data.map(data=>{
	        return(`
	            <option value="${data.email}"> ${data.lastname.toUpperCase()} ${data.firstname.toUpperCase()} </option>
	        `)
	    }).join("")
	}
    
    
    
    
async function openUserRegistration () {
  'use strict';
  
   await httpRequest('userregistration.php');
   
   
   callController('fetchallusers.php', null, 'fetchallusers', null,  popperemailer)
   
   document.getElementById('matuserregretievebtn').addEventListener('click', e=>{
       if(!document.getElementById('matuserregemail').value)return callModal('Please enter an Email address', 0)
       function action(result){
           let user = result.data.filter(data=>data.email == document.getElementById('matuserregemail').value)
           console.log('user', user)
           if(user.length == 0)return callModal('User not found', 0)
           callModal('User found', 1)
           document.getElementById('matuserreglastname').value = user[0].lastname
            document.getElementById('matuserregfirstname').value = user[0].firstname
            document.getElementById('matuserregothername').value = user[0].othernames
            document.getElementById('matuserregaddress').value = user[0].address
            document.getElementById('matuserregphone').value = user[0].phone
            document.getElementById('matuserregemail').value = user[0].email
            document.getElementById('matuserreglocation').value = user[0].location_id
            document.getElementById('matuserregrole').value = user[0].role
            document.getElementById('matuserregdepartmenthead').value = user[0].supervisoremail
       }
      callController('fetchallusers.php', null, 'fetchallusers', null,  action, 'silent')
   })


// Getting  document element with class and id
const matUserRegPasswordBtn = document.querySelectorAll('.passwordbtn')
const matUserRegDisplay = document.querySelector('.display')


matUserRegPasswordBtn.forEach(currentbtn=>{
     currentbtn.addEventListener('click',function(e){
        e.preventDefault()
        const formcontrol = currentbtn.parentElement
        const password =  formcontrol.querySelector('.password')
        if(password.type === 'password'){
            password.type = 'text'
        }else{
            password.type = 'password'
        }
        currentbtn.querySelector('.fa-eye').classList.toggle('hide')
        currentbtn.querySelector('.fa-eye-slash').classList.toggle('hide')
    })
});

// const btns =document.querySelectorAll('button')
// btns.forEach(event=>{
//     event.addEventListener('click',e=>{
//         const btnparent = event.parentElement;
//             e.preventDefault()
//         // if(btnparent.classList.contains('formcontrol')){
          
//         // }
//     })    
// })


	if(document.getElementById('personneladdallowance')){
	    document.getElementById('personneladdallowance').addEventListener('click', e=>{
	        let eleh = document.createElement('div');deposits
        eleh.setAttribute('name', 'allowancepersonnelcontainer');
        let x = `
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <input class="jformcontrol jmargin-top pervfy allowancename" type="text" id="${Date.now()}allowanceamount" placeholder="Allowance name" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <input class="jformcontrol jmargin-top pervfy allowancepercent" type="number" id="${Date.now()}allowpercent" placeholder="Percentage %" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <div id="" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                        </div>
                    </div>
                `
        let elem = eleh.innerHTML = x;        
        document.getElementById('allowancepersonnelcontainer').append(eleh);
        	    }, true)
        	}
        	if(document.getElementById('personneladddeductions')){
	    document.getElementById('personneladddeductions').addEventListener('click', e=>{
	        let eleh = document.createElement('div');
        eleh.setAttribute('name', 'allowancepersonnelcontainer');
        let x = `
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <input class="jformcontrol jmargin-top pervfy deductionname" type="text" id="${Date.now()}deductamount" placeholder="Deductions name" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <input class="jformcontrol jmargin-top pervfy deductionpecent" type="number" id="${Date.now()}deductpercent" placeholder="Percentage %" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <div id="" class="oreadddebit oreremove mt" style="margin-left: 0px" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                        </div>
                    </div>
                `
        let elem = eleh.innerHTML = x;        
        document.getElementById('deductionspersonnelcontainer').append(eleh);
        	    }, true)
        	}


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
          if(  document.getElementById('matuserreglocation')){
            const headerselect = '<option selected> Select Branch</option> '
              document.getElementById('matuserreglocation').innerHTML=  headerselect + strLocations.join(' ')
              console.log(assetsUrl.sessionLocation, document.getElementById('matuserreglocation'))
              document.getElementById('matuserreglocation').value = assetsUrl.sessionLocation
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




    function validateUserRegistration(){
        //console.log("Matttth")
        var flag = 1;
        var mssg='';
        //used for BVN instead
        var matUserRegEmail = document.getElementById('matuserregemail');
        var matUserRegLastName = document.getElementById('matuserreglastname');
        var matUserRegFirstName = document.getElementById('matuserregfirstname');
        var matUserRegOtherName = document.getElementById('matuserregothername');
        var matUserRegAddress = document.getElementById('matuserregaddress');
        var matUserRegPhone = document.getElementById('matuserregphone');
        /*var matUserRegUpw = document.getElementById('matuserregpassword');*/
        var matUserRegLocation = document.getElementById('matuserreglocation');
        /*var matUserRegConfirmUpw = document.getElementById('matuserregcomfirmupw');*/
        // var matUserRegClass = document.getElementById('matuserregclass');
        // var matUserRegLocationId = document.getElementById('matuserreglocationid');
        // var matUserRegSupervisorEmail = document.getElementById('matuserregsupervisoremail');
        // var matUserRegOrganisationId = document.getElementById('matuserregorganisationid');
        var matUserRegRole = document.getElementById('matuserregrole');
        // var matUserRegPermissions = document.getElementById('matuserregpermissions');
        
        
        //var location = document.getElementById('location').options[document.getElementById('location').selectedIndex].value;
        //var papersize = document.getElementById('papersize').options[document.getElementById('papersize').selectedIndex].value;
		//var email = document.getElementById('email');		
        
          var semail = /^[\w]+(\.[\w]+)*@([\w]+\.)+[a-z]{2,7}$/i;
        if(document.getElementById('matuserregemail').value.length < 1 || ! semail.test(document.getElementById('matuserregemail').value)){
            mssg += 'Email is Invalid <br />';			
            matUserRegEmail.style.borderColor = 'red';
            flag =0;
        }else{
            matUserRegEmail.style.borderColor = 'lightgray';
        }
        
        if(matUserRegLastName.value.length < 1){
            mssg += 'Last name is Invalid <br />';			
            matUserRegLastName.style.borderColor = 'red';
            flag = 0;
        }
        else if(matUserRegLastName.value.length > 30){
            mssg += 'Last name must not more than 30 characters <br />'
            matUserRegLastName.style.borderColor = 'red';
            flag =0;
        }
        else{
            matUserRegLastName.style.borderColor = 'lightgray';
        }
    
        if(matUserRegFirstName.value.length < 1){
            mssg += 'First name is Invalid <br />';			
            matUserRegFirstName.style.borderColor = 'red';
            flag =0;
        }
        else if(matUserRegFirstName.value.length > 30){
            mssg += 'First name must not more than 30 characters <br />';
            matUserRegFirstName.style.borderColor = 'red';
            flag =0;
        }
        else{
            matUserRegFirstName.style.borderColor = 'lightgray';
        }
    
        if(matUserRegOtherName.value.length < 1){
            mssg += 'Other name is Invalid <br />';			
            matUserRegOtherName.style.borderColor = 'red';
            flag =0;
        }
        else if(matUserRegOtherName.value.length > 30){
            mssg += 'Other name must not more than 30 characters <br />';
            matUserRegOtherName.style.borderColor = 'red';
            flag =0;
        }
        else{
            matUserRegOtherName.style.borderColor = 'lightgray';
        }
    
        if(matUserRegAddress.value.length < 1){
            mssg += 'Address is blank <br />';			
            matUserRegAddress.style.borderColor = 'red';
            flag =0;
        }
        else if(matUserRegAddress.value.length > 30){
            mssg += 'Address must not more than 200 characters <br />';
            matUserRegAddress.style.borderColor = 'red';
            flag =0;
        }else{
            matUserRegAddress.style.borderColor = 'lightgray';
        }
       
        if(matUserRegPhone.value.length < 1){
            mssg += 'phone is blank <br />';			
            matUserRegPhone.style.borderColor = 'red';
            flag =0;
        }
        else if(matUserRegPhone.value.length > 14){
            mssg += 'phone must not more than 14 characters <br />';
            matUserRegPhone.style.borderColor = 'red';
            flag =0;
        }else{
            matUserRegPhone.style.borderColor = 'lightgray';
        }
    
        /*if(matUserRegUpw.value.length < 1){
            mssg += 'Password is blank <br />';
            matUserRegUpw.style.borderColor = 'red';
            flag = 0;
    
        }
        else if(matUserRegUpw.value > 350){
            mssg += 'Password must not more than 350 characters <br />';
            matUserRegUpw.style.borderColor = 'red'; 
            flag =0;
        }else{
            matUserRegUpw.style.borderColor = 'lightgray';
        }*/
    
        /*if( matUserRegConfirmUpw.value !== matUserRegUpw.value){
            mssg += 'Password does not match <br />';
            matUserRegConfirmUpw.style.borderColor = 'red';
            flag = 0;
          }else{
            matUserRegConfirmUpw.style.borderColor = 'lightgray';
          }*/
          
         if( matUserRegLocation.value.length < 1){
            mssg += 'Location is Invalid <br />';
            matUserRegLocation.style.borderColor = 'red';
            flag = 0;
          }else{
            matUserRegLocation.style.borderColor = 'lightgray';
          }
    
        if(matUserRegRole.value.lenght < 1){
            mssg += 'Role is invalid <br />';
            matUserRegRole.style.borderColor = 'red';
            flag = 0;
        }else if(matUserRegRole.value.lenght >30){
            mssg += 'Role must not more than 30 charaters <br />';
            matUserRegRole.style.borderColor = 'red';
            flag = 0;
        }else{
            matUserRegRole.style.borderColor = 'lightgray';
        }
        // if( matUserRegPermissions.value.length < 1){
        //     mssg += 'Permissions is Invalid <br />';
        //     matUserRegPermissions.style.borderColor = 'red';
        //     flag = 0;
        //   }else{
        //     matUserRegPermissions.style.borderColor = 'lightgray';
        //   }
    
        
       
        
        // var semail = /^[\w]+(\.[\w]+)*@([\w]+\.)+[a-z]{2,7}$/i;
       
        
        if(flag == 0){
            
            var mbox = document.getElementById('messageBox');
            mbox.innerHTML = mssg;
            mbox.style.display = 'block';
            mbox.style.visibility = 'visible';
    
            setTimeout(function(){
                mbox.style.display = 'none';
                mbox.style.visibility = 'hidden';
                matUserRegFirstName.style.borderColor = "lightgray";
                matUserRegLastName.style.borderColor = "lightgray";
                matUserRegOtherName.style.borderColor = "lightgray";
                matUserRegPhone.style.borderColor = 'lightgray';
                matUserRegEmail.style.borderColor = 'lightgray';
                /*matUserRegUpw.style.borderColor = 'lightgray';*/
                matUserRegAddress.style.borderColor = 'lightgray';
                matUserRegRole.style.borderColor = 'lightgray';
                /*matUserRegConfirmUpw.style.borderColor = 'lightgray';*/
                matUserRegLocation.style.borderColor = 'lightgray'
                // matUserRegPermissions.style.borderColor = 'lightgray'
    
                
            }, 2000);	
            return false;
        }else{ 
            return true; 
        }
    
    }
    
    const matPsw = document.getElementById('matuserregpassword');
    const matConfirmPsw = document.getElementById('matuserregcomfirmupw');
    
    if(matConfirmPsw){
        matConfirmPsw.addEventListener('change',function(e){
        console.log(e.target.value)
        if(matConfirmPsw.value === matPsw.value){
           matConfirmPsw.style.borderColor = 'lightgray';  
        }else{
            matConfirmPsw.style.borderColor = 'red';
             callModal('Password do not match');
               console.log(matConfirmPsw.value)
        }
    });
    }
    
    
    function getUserRegistrationParams(){
        var paramstr = new FormData();
        paramstr.append('formname', 'USER REGISTRATION');
        paramstr.append('lastname',document.getElementById('matuserreglastname').value);
        paramstr.append('firstname',document.getElementById('matuserregfirstname').value); 
        paramstr.append('othernames',document.getElementById('matuserregothername').value); 
        /*paramstr.append('upw',document.getElementById('matuserregpassword').value) ;*/
        paramstr.append('address',document.getElementById('matuserregaddress').value);
        paramstr.append('phone',document.getElementById('matuserregphone').value);
        paramstr.append('email',document.getElementById('matuserregemail').value);
        paramstr.append('supervisoremail',document.getElementById('matuserregdepartmenthead').value);
        paramstr.append('location_id',parseInt(document.getElementById('matuserreglocation').value));
        // paramstr.append('organisation_id', document.getElementById('matuserregorganisationid').value);
        // paramstr.append('location_id', document.getElementById('matuserreglocation').value);
        // paramstr.append('class', document.getElementById('matuserregclass').value);
        // paramstr.append('supervisoremail',document.getElementById('matuserregsupervisoremail').value);
        paramstr.append('role',document.getElementById('matuserregrole').value);
        // paramstr.append('permissions',document.getElementById('matuserregpermissions').value);
    
        
        try{
         paramstr.append('imageurl',document.getElementById('matuserreguserphotoname1').files[0].name);		
         
        }catch(ex){
         paramstr.append('imageurl','-');		
        
         
       }				
       
       for (var pair of paramstr.entries()) {
               console.log(pair[0] + ', ' + pair[1] + ', '); 
            }
    
       return paramstr;
    
    }
    
    
    
    // async function matSaveUser(){
        
    //     const data =  getUserRegistrationParams()
    //     const result = await controllerRequest('../controllers/userscript.php', data);
    //     if(result) {
    //         console.log(result)
    //     }
    // }
    
    
    
    
    
    
    var saveUserRegistration = function(e){
        showSpinner();
        if(!validateUserRegistration()){ 
            hideSpinner();
            return; 
        }
        
        var request = getAjaxObject();
        
        request.open('POST','../controllers/userscript.php',true);
        request.onreadystatechange = function(){
            if(request.readyState == 1){
                
            }
            if(request.readyState == 4 && request.status == 200){
                console.log('request.responseText', request.responseText)
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
                callModal(result.message, stat)
                // if(result.result === "Successful"){
                //     callModal
                // }
                
                // if(request.responseText === "FAILED"){
                //     hideSpinner();
                //     callModal( "Failed", 0, time = 5000, id)
                //     // var mbox = document.getElementById('messageBox');
                //     // document.getElementById('messageBox').innerHTML = "Login Failed";
                //     // mbox.style.display = 'block';
                //     // mbox.style.visibility = 'visible';
                //     // setTimeout(function(){
                //     //     mbox.style.display = 'none';
                //     //     mbox.style.visibility = 'hidden';
    
                //     // }, 3000);						
                // }
                // else if(request.responseText === "SUCCESS"){
                //     callModal( "SUCCESS", status = 1, time = 5000, id)
                // }
                // else{
                //     hideSpinner();
                //  callModal( request.responseText, status = 1, time = 5000, id)
                //     // var mbox = document.getElementById('messageBox');
                //     // document.getElementById('messageBox').innerHTML = "MSG: " + request.responseText;
                //     // mbox.style.display = 'block';
                //     // mbox.style.visibility = 'visible';
                //     // setTimeout(function(){
                //     //     mbox.style.display = 'none';
                //     //     mbox.style.visibility = 'hidden';
    
                //     // }, 14000);						
                    
                // }
            }else{
                hideSpinner();
                
                
                //document.getElementById('loader').style.display = 'none';
                //sf = '<b>Error getting data</b>';
            }
    
            e.stopPropagation();
        }
    
    
        
        request.setRequestHeader('Connection','close');
        request.send(getUserRegistrationParams());
    
    }
    
    // if(document.getElementById('matuserregsavebtn')) document.getElementById('matuserregsavebtn').addEventListener('click',function(){
    //     console.log('maaaaa')
    //     saveUserRegistration()
        
    // });
    
if(document.getElementById('matuserregsavebtn')) document.getElementById('matuserregsavebtn').addEventListener('click',saveUserRegistration, false);

// if(document.getElementById('matuserregsavebtn')) document.getElementById('matuserregsavebtn').addEventListener('click',function(){
//     //console.log("mattttttttt")
//     if(validateUserRegistration()) {
//         matSaveUser()
//     }
// });

    
    
    
    
    
    
    
    // document.getElementById("btnSavePhoto").onclick = function(event){
    // document.getElementById("userphotoname1").click();
    // }
    // document.getElementById('userphotoname1').onchange = function(event){
    // //var selectedfile = document.getElementById('photofile');
                        
    // var selectedfile = event.target.files[0];
    // //document.getElementById('sysfootpanel').innerHTML = selectedfile.name;
    // var reader = new FileReader();	
    // var imgtag = document.getElementById('userphoto1');
    // imgtag.title = selectedfile.name;
    
    // reader.onload = function(event){
    //     imgtag.src = event.target.result;
    // }
    // reader.readAsDataURL(selectedfile);
    // }
    
    
    const matUserRegimageInput = document.querySelector('input[type=file]');
    
    matUserRegimageInput.addEventListener('change', evt => {
      const [file] = matUserRegimageInput.files;
      if (file) {
        const matUserImg = document.createElement('img');
    console.log(matUserImg);
    console.log(file);
    matUserImg.alt = 'user image';
    matUserImg.classList.add('displaysty');
        matUserImg.src = URL.createObjectURL(file);
    matUserRegDisplay.appendChild(matUserImg);
    }
    })

}

var userregistration = document.getElementById('userregistration')
if(userregistration)userregistration.addEventListener('click',openUserRegistration, false)



async function organisationInfo () {
    
    await httpRequest('organisation-info.php', 'override'); 
    
    document.getElementById("basic-info-toggler").onclick = function() {
        document.getElementById("organisation-info-div-basic-info").removeAttribute("hidden");
        document.getElementById("basic-info-toggler").setAttribute("class", "subpages-header-active");
        document.getElementById("basic-info-toggler").setAttribute("class", "subpages-header-active");
        document.getElementById("account-prefix-toggler").removeAttribute("class");
        document.getElementById("default-accounts-toggler").removeAttribute("class");
        document.getElementById("organisation-info-div-account-prefix").setAttribute("hidden", "");
        document.getElementById("organisation-info-div-default-accounts").setAttribute("hidden", "");
        // document.getElementById("append-test-script").innerHTML = '<script src="test.js" defer></script>';
    };
    document.getElementById("account-prefix-toggler").onclick = function() {
        document.getElementById("organisation-info-div-account-prefix").removeAttribute("hidden");
        document.getElementById("account-prefix-toggler").setAttribute("class", "subpages-header-active");
        document.getElementById("basic-info-toggler").removeAttribute("class");
        document.getElementById("default-accounts-toggler").removeAttribute("class");
        document.getElementById("organisation-info-div-basic-info").setAttribute("hidden", "");
        document.getElementById("organisation-info-div-default-accounts").setAttribute("hidden", "");
    };
    document.getElementById("default-accounts-toggler").onclick = function() {
        document.getElementById("organisation-info-div-default-accounts").removeAttribute("hidden");
        document.getElementById("default-accounts-toggler").setAttribute("class", "subpages-header-active");
        document.getElementById("account-prefix-toggler").removeAttribute("class");
        document.getElementById("basic-info-toggler").removeAttribute("class");
        document.getElementById("organisation-info-div-account-prefix").setAttribute("hidden", "");
        document.getElementById("organisation-info-div-basic-info").setAttribute("hidden", "");
    };
    document.getElementById("profile-img-edit-icon").onclick = function() {
        document.getElementById("profile-image-upload-input").click();
    };
    document.getElementById('profile-image-upload-input').onchange = function(e) {
        
        if (!fileTypeValidator(e.target.files)) {
            errorBox('Unsupported file selected')
            e.target.value = null
        }
        else {
            document.getElementById('profile-image').src = URL.createObjectURL(event.target.files[0]);
            document.getElementById('profile-image').onload = function() { URL.revokeObjectURL(document.getElementById('profile-image').src) }
        }
    };
    
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

	function validateCompany(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var companyName = document.getElementById('company-name');
		var smsSenderId = document.getElementById('sms-sender-id');
		var numberOfUsers = document.getElementById('number-of-users');
		var telephone = document.getElementById('telephone');
		var mobile = document.getElementById('mobile');
		var email = document.getElementById('email');
		var address = document.getElementById('address');
		var smsCharge = document.getElementById('sms-charge');
		var smsChargeAccount = document.getElementById('sms-charge-account');
		var vatRate = document.getElementById('vat-rate');
		var whtRate = document.getElementById('wht-rate');
		var allowBackDatedTransaction = document.getElementById('allow-back-dated-transaction');
		var allowFutureTransaction = document.getElementById('allow-future-transaction');
		var automateMemorandum = document.getElementById('automate-memorandum');
		var automateSmsCharge = document.getElementById('automate-sms-charge');
		var setAccountingYearEnd = document.getElementById('set-accounting-year-end');
		var savingsAccountPrefix = document.getElementById('savings-account-prefix');
		var isusuPrefix = document.getElementById('isusu-prefix');
		var personalAccountCurrentPrefix = document.getElementById('personal-account-current-prefix');
		var groupCurrentAccountPrefix = document.getElementById('group-current-account-prefix');
		var loanAccountPrefix = document.getElementById('loan-account-prefix');
		var loanTransactionPrefix = document.getElementById('loan-transaction-prefix');
		var odTransactionPrefix = document.getElementById('od-transaction-prefix');
		var customerTransactionPrefix = document.getElementById('customer-transaction-prefix');
		var generalLedgerTransactionPrefix = document.getElementById('general-ledger-transaction-prefix');
		var fixedAccountPrefix = document.getElementById('fixed-account-prefix');
		var assetGlAccountPrefix = document.getElementById('asset-gl-account-prefix');
		var cashGlAccountPrefix = document.getElementById('cash-gl-account-prefix');
		var expenseGlAccountPrefix = document.getElementById('expense-gl-account-prefix');
		var equityGlAccountPrefix = document.getElementById('equity-gl-account-prefix');
		var payableGlAccountPrefix = document.getElementById('payable-gl-account-prefix');
		var receivableGlAccountPrefix = document.getElementById('receivable-gl-account-prefix');
		var liabilitiesGlAccountPrefix = document.getElementById('liabilities-gl-account-prefix');
		var incomeGlAccountPrefix = document.getElementById('income-gl-account-prefix');
		var depreciationGlAccountPrefix = document.getElementById('depreciation-gl-account-prefix');
		var generalLedgerAccountPrefix = document.getElementById('general-ledger-account-prefix');
		var defaultGlIncomeAccount = document.getElementById('default-gl-income-account');
		var defaultGlAssetAccount = document.getElementById('default-gl-asset-account');
		var loanProvisioningAccount = document.getElementById('loan-provisioning-account');
		var defaultGlSavingsAccount = document.getElementById('default-gl-savings-account');
		var defaultGlEsusuAccount = document.getElementById('default-gl-esusu-account');
		var defaultGlCashAccount = document.getElementById('default-gl-cash-account');
		var defaultGlTellerCashAccount = document.getElementById('default-gl-teller-cash-account');
		var defaultGlOdAccount = document.getElementById('default-gl-od-account');
		var defaultCurrentAccount = document.getElementById('default-current-account');
		var defaultGlTaxAccount = document.getElementById('default-gl-tax-account');
		var defaultFixedAccount = document.getElementById('default-fixed-account');
		var defaultFixedInterestAccount = document.getElementById('default-fixed-interest-account');
		var defaultExpenseAccount = document.getElementById('default-expense-account');
		var defaultLoanAccount = document.getElementById('default-loan-account');
		var defaultNonCashAccount = document.getElementById('default-non-cash-account');
		var defaultGlMandatorySavingsAccount = document.getElementById('default-gl-mandatory-savings-account');
		var mandatorySavingsAccountRate = document.getElementById('mandatory-savings-account-rate');
		var defaultGlStaffAccount = document.getElementById('default-gl-staff-account');
		var default_cashtobankaccount = document.getElementById('default_cashtobankaccount');
		
		
// 		var location = document.getElementById('location').options[document.getElementById('location').selectedIndex].value;
// 		var papersize = document.getElementById('papersize').options[document.getElementById('papersize').selectedIndex].value;
		//var email = document.getElementById('email');		
		
		if(companyName.value.length < 1){
			mssg += 'Company Name is blank <br />';			
			companyName.style.borderColor = 'red';
			flag =0;
		} else if (companyName.value.length >= 250) {
			mssg += 'Company Name cannot be greater than 249 characters <br />';			
			companyName.style.borderColor = 'red';
			flag =0;
		} else {
			companyName.style.borderColor = 'lightgray';
		}
		
		if(smsSenderId.value.length < 1){
			mssg += 'SMS Sender ID is blank <br />';			
			smsSenderId.style.borderColor = 'red';
			flag =0;
		}else{
			smsSenderId.style.borderColor = 'lightgray';
		}
		
		if(numberOfUsers.value.length < 1){
			mssg += 'Number Of Users is blank <br />';			
			numberOfUsers.style.borderColor = 'red';
			flag =0;
		} else if (numberOfUsers.value.length > 6) {
			mssg += 'Number of users cannot be greater than 6 characters <br />';			
			numberOfUsers.style.borderColor = 'red';
			flag =0;
		} else{
			numberOfUsers.style.borderColor = 'lightgray';
		}
		
		if(telephone.value.length < 1){
			mssg += 'Telephone is blank <br />';			
			telephone.style.borderColor = 'red';
			flag =0;
		} else if (telephone.value.length >= 100) {
			mssg += 'Telephone cannot be greater than 99 characters <br />';			
			telephone.style.borderColor = 'red';
			flag =0;
		} else{
			telephone.style.borderColor = 'lightgray';
		}
		
		if(mobile.value.length < 1){
			mssg += 'Mobile is blank <br />';			
			mobile.style.borderColor = 'red';
			flag =0;
		} 
		else if (mobile.value.length >= 50) {
			mssg += 'Mobile cannot be greater than 50 characters <br />';			
			mobile.style.borderColor = 'red';
			flag =0;
		} else{
			mobile.style.borderColor = 'lightgray';
		}
		
		var semail = /^[\w]+(\.[\w]+)*@([\w]+\.)+[a-z]{2,7}$/i;
		if(document.getElementById('email').value.length < 1 || ! semail.test(document.getElementById('email').value)){
			mssg += 'Email is blank <br />';			
			email.style.borderColor = 'red';
			flag =0;
		} else if (email.value.length >= 250) {
			mssg += 'Email cannot be greater than 249 characters <br />';			
			email.style.borderColor = 'red';
			flag =0;
		} else{
			email.style.borderColor = 'lightgray';
		}
		
		if(address.value.length < 1){
			mssg += 'Address is blank <br />';			
			address.style.borderColor = 'red';
			flag =0;
		} else if (address.value.length >= 250) {
			mssg += 'Address cannot be greater than 249 characters <br />';			
			address.style.borderColor = 'red';
			flag =0;
		} else{
			address.style.borderColor = 'lightgray';
		}
		
		
		if(smsCharge.value.length < 1){
			mssg += 'SMS Charge is blank <br />';			
			smsCharge.style.borderColor = 'red';
			flag =0;
		}else{
			smsCharge.style.borderColor = 'lightgray';
		}
		
		if(smsChargeAccount.value.length < 1){
			mssg += 'SMS Charge Account must be selected Invalid <br />';			
			smsChargeAccount.style.borderColor = 'red';
			flag =0;
		}else{
			smsChargeAccount.style.borderColor = 'lightgray';
		}
		
		if(vatRate.value.length < 1){
			mssg += 'VAR Rate must be selected <br />';			
			vatRate.style.borderColor = 'red';
			flag =0;
		}else{
			vatRate.style.borderColor = 'lightgray';
		}
		
		if(whtRate.value.length < 1){
			mssg += 'WHT Rate must be selected <br />';			
			whtRate.style.borderColor = 'red';
			flag =0;
		}else{
			whtRate.style.borderColor = 'lightgray';
		}
		
		if(allowBackDatedTransaction.value.length < 1){
			mssg += 'Select Whether To Allow Back-Dated Transaction. <br />';			
			allowBackDatedTransaction.style.borderColor = 'red';
			flag =0;
		} else if (allowBackDatedTransaction.value.length > 10) {
			mssg += 'Allow Back-Dated Transaction cannot be greater than 10 characters <br />';			
			allowBackDatedTransaction.style.borderColor = 'red';
			flag =0;
		} else{
			allowBackDatedTransaction.style.borderColor = 'lightgray';
		}
		
		if(allowFutureTransaction.value.length < 1){
			mssg += 'Select Whether To Allow Future Invoice. <br />';			
			allowFutureTransaction.style.borderColor = 'red';
			flag =0;
		} else if (allowFutureTransaction.value.length >= 10) {
			mssg += 'Allow Future Transaction cannot be gearer than 10 characters <br />';			
			allowFutureTransaction.style.borderColor = 'red';
			flag =0;
		} else{
			allowFutureTransaction.style.borderColor = 'lightgray';
		}
		
		if(automateMemorandum.value.length < 1){
			mssg += 'Select Whether To Automate Memorandum <br />';			
			automateMemorandum.style.borderColor = 'red';
			flag =0;
		}else{
			automateMemorandum.style.borderColor = 'lightgray';
		}
		
		if(automateSmsCharge.value.length < 1){
			mssg += 'Select Whether To Allow Automate SMS Charges <br />';			
			automateSmsCharge.style.borderColor = 'red';
			flag =0;
		}else{
			automateSmsCharge.style.borderColor = 'lightgray';
		}
		
		if(setAccountingYearEnd.value.length < 1){
			mssg += 'Accounting Year must be selected <br />';			
			setAccountingYearEnd.style.borderColor = 'red';
			flag =0;
		} else if (setAccountingYearEnd.value.length >= 250) {
			mssg += 'Account Year End cannot be greater than 249 characters <br />';			
			setAccountingYearEnd.style.borderColor = 'red';
			flag =0;
		} else{
			setAccountingYearEnd.style.borderColor = 'lightgray';
		}
		
		if(savingsAccountPrefix.value.length < 1){
			mssg += 'Savings Account Prefix is blank <br />';			
			savingsAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			savingsAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(isusuPrefix.value.length < 1){
			mssg += 'Isusu Prefix is blank <br />';			
			isusuPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			isusuPrefix.style.borderColor = 'lightgray';
		}
		
		if(personalAccountCurrentPrefix.value.length < 1){
			mssg += 'Personal Account Currency Profile is blank <br />';			
			personalAccountCurrentPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			personalAccountCurrentPrefix.style.borderColor = 'lightgray';
		}
		
		if(groupCurrentAccountPrefix.value.length < 1){
			mssg += 'Group Current Account Prefix is blank <br />';			
			groupCurrentAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			groupCurrentAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(loanAccountPrefix.value.length < 1){
			mssg += 'Loan Account Prefix is blank <br />';			
			loanAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			loanAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(loanTransactionPrefix.value.length < 1){
			mssg += 'Loan Transaction Prefix is blank <br />';			
			loanTransactionPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			loanTransactionPrefix.style.borderColor = 'lightgray';
		}
		
		if(odTransactionPrefix.value.length < 1){
			mssg += 'od Transaction Prefix is blank <br />';			
			odTransactionPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			odTransactionPrefix.style.borderColor = 'lightgray';
		}
		
		if(customerTransactionPrefix.value.length < 1){
			mssg += 'customer Transaction Prefix is Invalid <br />';			
			customerTransactionPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			customerTransactionPrefix.style.borderColor = 'lightgray';
		}
		
		if(generalLedgerTransactionPrefix.value.length < 1){
			mssg += 'General Ledger Transaction Prefix is blank <br />';			
			generalLedgerTransactionPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			generalLedgerTransactionPrefix.style.borderColor = 'lightgray';
		}
		
		if(fixedAccountPrefix.value.length < 1){
			mssg += 'fixed Account Prefix is blank <br />';			
			fixedAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			fixedAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(assetGlAccountPrefix.value.length < 1){
			mssg += 'Asset Gl account Prefix is blank <br />';			
			assetGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			assetGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(cashGlAccountPrefix.value.length < 1){
			mssg += 'Cash GL Account Prefix is blank <br />';			
			cashGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			cashGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(expenseGlAccountPrefix.value.length < 1){
			mssg += 'Expense GL Account Prefix is blank <br />';			
			expenseGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			expenseGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(equityGlAccountPrefix.value.length < 1){
			mssg += 'Equity GL Account Prefix is blank <br />';			
			equityGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			equityGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(payableGlAccountPrefix.value.length < 1){
			mssg += 'Payable GL Account Prefix is blank <br />';			
			payableGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			payableGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(receivableGlAccountPrefix.value.length < 1){
			mssg += 'Recievable GL Account Prefix is blank <br />';			
			receivableGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			receivableGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(liabilitiesGlAccountPrefix.value.length < 1){
			mssg += 'Liabilities GL Account Prefix is blank <br />';			
			liabilitiesGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			liabilitiesGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(incomeGlAccountPrefix.value.length < 1){
			mssg += 'Income GL Account Prefix is blank <br />';			
			incomeGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			incomeGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(depreciationGlAccountPrefix.value.length < 1){
			mssg += 'Depreciation GL Account Prefix is blank <br />';			
			depreciationGlAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			depreciationGlAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(generalLedgerAccountPrefix.value.length < 1){
			mssg += 'General Ledger Account Prefix is blank <br />';			
			generalLedgerAccountPrefix.style.borderColor = 'red';
			flag =0;
		}else{
			generalLedgerAccountPrefix.style.borderColor = 'lightgray';
		}
		
		if(defaultGlIncomeAccount.value.length < 1){
			mssg += 'Default GL Income Account must be selected <br />';			
			defaultGlIncomeAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlIncomeAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlAssetAccount.value.length < 1){
			mssg += 'Default GL Asset Account must be selected <br />';			
			defaultGlAssetAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlAssetAccount.style.borderColor = 'lightgray';
		}
		
		if(loanProvisioningAccount.value.length < 1){
			mssg += 'Loan Provisioning Account must be selected <br />';			
			loanProvisioningAccount.style.borderColor = 'red';
			flag =0;
		}else{
			loanProvisioningAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlSavingsAccount.value.length < 1){
			mssg += 'Default GL Savings Account must be selected <br />';			
			defaultGlSavingsAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlSavingsAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlEsusuAccount.value.length < 1){
			mssg += 'Default GL Esusu Account must be selected <br />';			
			defaultGlEsusuAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlEsusuAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlCashAccount.value.length < 1){
			mssg += 'Default GL Cash Accoun must be selected <br />';			
			defaultGlCashAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlCashAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlTellerCashAccount.value.length < 1){
			mssg += 'Default GL Teller Cash Account must be selected <br />';			
			defaultGlTellerCashAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlTellerCashAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlOdAccount.value.length < 1){
			mssg += 'Default GL OD Account must be selected <br />';			
			defaultGlOdAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlOdAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultCurrentAccount.value.length < 1){
			mssg += 'Default Current Account must be selected <br />';			
			defaultCurrentAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultCurrentAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultGlTaxAccount.value.length < 1){
			mssg += 'Default GL Tax Account must be selected <br />';			
			defaultGlTaxAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlTaxAccount.style.borderColor = 'lightgray';
		}
		
		
		if(defaultFixedAccount.value.length < 1){
			mssg += 'Default Fixed Account must be selected <br />';			
			defaultFixedAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultFixedAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultFixedInterestAccount.value.length < 1){
			mssg += 'Default Fixed Interest Account must be selected <br />';			
			defaultFixedInterestAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultFixedInterestAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultExpenseAccount.value.length < 1){
			mssg += 'Default Expense Account must be selected <br />';			
			defaultExpenseAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultExpenseAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultLoanAccount.value.length < 1){
			mssg += 'Default Loan Account must be selected <br />';			
			defaultLoanAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultLoanAccount.style.borderColor = 'lightgray';
		}
		
		if(defaultNonCashAccount.value.length < 1){
			mssg += 'Default Non-Cash Account (Bank Account) must be selected <br />';			
			defaultNonCashAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultNonCashAccount.style.borderColor = 'lightgray';
		}
		
// 		if(defaultGlMandatorySavingsAccount.value.length < 1){
// 			mssg += 'Default GL Mandatory Savings Account must be selected <br />';			
// 			defaultGlMandatorySavingsAccount.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			defaultGlMandatorySavingsAccount.style.borderColor = 'lightgray';
// 		}
		
		if(mandatorySavingsAccountRate.value.length < 1){
			mssg += 'Mandatory Savings Account Rate must be selected <br />';			
			mandatorySavingsAccountRate.style.borderColor = 'red';
			flag =0;
		}else{
			mandatorySavingsAccountRate.style.borderColor = 'lightgray';
		}
		
		if(defaultGlStaffAccount.value.length < 1){
			mssg += 'Default GL staff Account must be selected <br />';			
			defaultGlStaffAccount.style.borderColor = 'red';
			flag =0;
		}else{
			defaultGlStaffAccount.style.borderColor = 'lightgray';
		}
		if(default_cashtobankaccount.value.length < 1){
			mssg += 'default cash to bank Account must be selected <br />';			
			default_cashtobankaccount.style.borderColor = 'red';
			flag =0;
		}else{
			default_cashtobankaccount.style.borderColor = 'lightgray';
		}
		
		
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				companyName.style.borderColor = 'lightgray';
				smsSenderId.style.borderColor = 'lightgray';
				numberOfUsers.style.borderColor = 'lightgray';
				telephone.style.borderColor = 'lightgray';
				mobile.style.borderColor = 'lightgray';
				email.style.borderColor = 'lightgray';
				address.style.borderColor = 'lightgray';
				smsCharge.style.borderColor = 'lightgray';
				smsChargeAccount.style.borderColor = 'lightgray';
				vatRate.style.borderColor = 'lightgray';
				whtRate.style.borderColor = 'lightgray';
				allowBackDatedTransaction.style.borderColor = 'lightgray';
				allowFutureTransaction.style.borderColor = 'lightgray';
				automateMemorandum.style.borderColor = 'lightgray';
				automateSmsCharge.style.borderColor = 'lightgray';
				setAccountingYearEnd.style.borderColor = 'lightgray';
				savingsAccountPrefix.style.borderColor = 'lightgray';
				isusuPrefix.style.borderColor = 'lightgray';
				personalAccountCurrentPrefix.style.borderColor = 'lightgray';
				groupCurrentAccountPrefix.style.borderColor = 'lightgray';
				loanAccountPrefix.style.borderColor = 'lightgray';
				loanTransactionPrefix.style.borderColor = 'lightgray';
				odTransactionPrefix.style.borderColor = 'lightgray';
				customerTransactionPrefix.style.borderColor = 'lightgray';
				generalLedgerTransactionPrefix.style.borderColor = 'lightgray';
				fixedAccountPrefix.style.borderColor = 'lightgray';
				assetGlAccountPrefix.style.borderColor = 'lightgray';
				cashGlAccountPrefix.style.borderColor = 'lightgray';
				expenseGlAccountPrefix.style.borderColor = 'lightgray';
				equityGlAccountPrefix.style.borderColor = 'lightgray';
				payableGlAccountPrefix.style.borderColor = 'lightgray';
				receivableGlAccountPrefix.style.borderColor = 'lightgray';
				liabilitiesGlAccountPrefix.style.borderColor = 'lightgray';
				incomeGlAccountPrefix.style.borderColor = 'lightgray';
				depreciationGlAccountPrefix.style.borderColor = 'lightgray';
				generalLedgerAccountPrefix.style.borderColor = 'lightgray';
				defaultGlIncomeAccount.style.borderColor = 'lightgray';
				defaultGlAssetAccount.style.borderColor = 'lightgray';
				loanProvisioningAccount.style.borderColor = 'lightgray';
				defaultGlSavingsAccount.style.borderColor = 'lightgray';
				defaultGlEsusuAccount.style.borderColor = 'lightgray';
				defaultGlCashAccount.style.borderColor = 'lightgray';
				defaultGlTellerCashAccount.style.borderColor = 'lightgray';
				defaultGlOdAccount.style.borderColor = 'lightgray';
				defaultCurrentAccount.style.borderColor = 'lightgray';
				defaultGlTaxAccount.style.borderColor = 'lightgray';
				defaultFixedAccount.style.borderColor = 'lightgray';
				defaultFixedInterestAccount.style.borderColor = 'lightgray';
				defaultExpenseAccount.style.borderColor = 'lightgray';
				defaultLoanAccount.style.borderColor = 'lightgray';
				defaultNonCashAccount.style.borderColor = 'lightgray';
				// defaultGlMandatorySavingsAccount.style.borderColor = 'lightgray';
				mandatorySavingsAccountRate.style.borderColor = 'lightgray';
				defaultGlStaffAccount.style.borderColor = 'lightgray';
				default_cashtobankaccount.style.borderColor = 'lightgray';
				
				// (document.getElementById('location')).style.borderColor = 'lightgray';
				// (document.getElementById('papersize')).style.borderColor = 'lightgray';

			}, 3000);	
			return false;
		}else{ 
			return true; 
		}

	}
    
	function getOrganisationParams(){
		var paramstr = new FormData();
	 		
		paramstr.append("companyName".toLowerCase(), document.getElementById('company-name').value);
		paramstr.append("smssenderid".toLowerCase(), document.getElementById('sms-sender-id').value);
		paramstr.append("no_of_users".toLowerCase(), document.getElementById('number-of-users').value);
		paramstr.append("telephone".toLowerCase(), document.getElementById('telephone').value);
		paramstr.append("mobile".toLowerCase(), document.getElementById('mobile').value);
		paramstr.append("email".toLowerCase(), document.getElementById('email').value);
		paramstr.append("address".toLowerCase(), document.getElementById('address').value);
		paramstr.append("smscharge".toLowerCase(), document.getElementById('sms-charge').value);
		paramstr.append("smschargeaccount".toLowerCase(), document.getElementById('sms-charge-account').value);
		paramstr.append("vatrate".toLowerCase(), document.getElementById('vat-rate').value);
		paramstr.append("whtrate".toLowerCase(), document.getElementById('wht-rate').value);
		paramstr.append("backdated_transaction".toLowerCase(), document.getElementById('allow-back-dated-transaction').value);
		paramstr.append("future_transaction".toLowerCase(), document.getElementById('allow-future-transaction').value);
		paramstr.append("automate_memorandum".toLowerCase(), document.getElementById('automate-memorandum').value);
		paramstr.append("automate_smscharge".toLowerCase(), document.getElementById('automate-sms-charge').value);
		paramstr.append("accounting_yearend".toLowerCase(), document.getElementById('set-accounting-year-end').value);
		paramstr.append("savings_prefix".toLowerCase(), document.getElementById('savings-account-prefix').value);
		paramstr.append("isusu_prefix".toLowerCase(), document.getElementById('isusu-prefix').value);
		paramstr.append("personalcurrent_prefix".toLowerCase(), document.getElementById('personal-account-current-prefix').value);
		paramstr.append("groupcurrent_prefix".toLowerCase(), document.getElementById('group-current-account-prefix').value);
		paramstr.append("loan_prefix".toLowerCase(), document.getElementById('loan-account-prefix').value);
		paramstr.append("loantransaction_prefix".toLowerCase(), document.getElementById('loan-transaction-prefix').value);
		paramstr.append("odtransaction_prefix".toLowerCase(), document.getElementById('od-transaction-prefix').value);
		paramstr.append("customertransaction_prefix".toLowerCase(), document.getElementById('customer-transaction-prefix').value);
		paramstr.append("gl_transaction_prefix".toLowerCase(), document.getElementById('general-ledger-transaction-prefix').value);
		paramstr.append("fixedaccount_prefix".toLowerCase(), document.getElementById('fixed-account-prefix').value);
		paramstr.append("glassetprefix".toLowerCase(), document.getElementById('asset-gl-account-prefix').value);
		paramstr.append("glcashprefix".toLowerCase(), document.getElementById('cash-gl-account-prefix').value);
		paramstr.append("glexpenseprefix".toLowerCase(), document.getElementById('expense-gl-account-prefix').value);
		paramstr.append("glequityprefix".toLowerCase(), document.getElementById('equity-gl-account-prefix').value);
		paramstr.append("glpayableprefix".toLowerCase(), document.getElementById('payable-gl-account-prefix').value);
		paramstr.append("glrecievableprefix".toLowerCase(), document.getElementById('receivable-gl-account-prefix').value);
		paramstr.append("glliabilitiesprefix".toLowerCase(), document.getElementById('liabilities-gl-account-prefix').value);
		paramstr.append("glincomeprefix".toLowerCase(), document.getElementById('income-gl-account-prefix').value);
		paramstr.append("gldepreciationprefix".toLowerCase(), document.getElementById('depreciation-gl-account-prefix').value);
		paramstr.append("gl_account_prefix".toLowerCase(), document.getElementById('general-ledger-account-prefix').value);
		paramstr.append("default_incomeaccount".toLowerCase(), document.getElementById('default-gl-income-account').value);
		paramstr.append("default_assetaccount".toLowerCase(), document.getElementById('default-gl-asset-account').value);
		paramstr.append("loan_provisioning_account".toLowerCase(), document.getElementById('loan-provisioning-account').value);
		paramstr.append("default_glsavingsaccount".toLowerCase(), document.getElementById('default-gl-savings-account').value);
		paramstr.append("default_glesusu".toLowerCase(), document.getElementById('default-gl-esusu-account').value);
		paramstr.append("default_cashaccount".toLowerCase(), document.getElementById('default-gl-cash-account').value);
		paramstr.append("default_tellercash".toLowerCase(), document.getElementById('default-gl-teller-cash-account').value);
		paramstr.append("default_glodaccount".toLowerCase(), document.getElementById('default-gl-od-account').value);
		paramstr.append("default_glcurrentaccount".toLowerCase(), document.getElementById('default-current-account').value);
		paramstr.append("default_taxaccount".toLowerCase(), document.getElementById('default-gl-tax-account').value);
		paramstr.append("default_glfixedaccount".toLowerCase(), document.getElementById('default-fixed-account').value);
		paramstr.append("default_fixedinterestaccount".toLowerCase(), document.getElementById('default-fixed-interest-account').value);
		paramstr.append("default_glexpenseaccount".toLowerCase(), document.getElementById('default-expense-account').value);
		paramstr.append("default_glloanaccount".toLowerCase(), document.getElementById('default-loan-account').value);
		paramstr.append("default_noncashaccount".toLowerCase(), document.getElementById('default-non-cash-account').value);
		paramstr.append("default_mandatorysavingsaccount".toLowerCase(), document.getElementById('default-gl-mandatory-savings-account').value);
		paramstr.append("mandatorysavings_rate".toLowerCase(), document.getElementById('mandatory-savings-account-rate').value);
		paramstr.append("default_glstaffaccount".toLowerCase(), document.getElementById('default-gl-staff-account').value);
		paramstr.append("noofdaysforpropertynotice".toLowerCase(), document.getElementById('noofdaysforpropertynotice').value);
		paramstr.append("noofdaystosetasidepropertystock".toLowerCase(), document.getElementById('noofdaystosetasidepropertystock').value);
		paramstr.append("schedulemaintenancecharge".toLowerCase(), document.getElementById('schedulemaintenancecharge').value);
		paramstr.append("maintenancecharge".toLowerCase(), document.getElementById('maintenancecharge').value);
		paramstr.append("schedulesavingsinterest".toLowerCase(), document.getElementById('schedulesavingsinterest').value);
		paramstr.append("scheduleloanrepayment".toLowerCase(), document.getElementById('scheduleloanrepayment').value);
		paramstr.append("company_id", `${orginfo.company_id ? orginfo.company_id : ''}` );
		paramstr.append("default_rrraccount".toLowerCase(), document.getElementById('default-rrr-account').value);
		paramstr.append("default_propertyaccount".toLowerCase(), document.getElementById('default-property-account').value);
		paramstr.append("default_branchcashaccount".toLowerCase(), document.getElementById('default-branch-cash-account').value);
		paramstr.append("default_excessaccount".toLowerCase(), document.getElementById('default-excess-account').value);
		paramstr.append("default_returncashaccount".toLowerCase(), document.getElementById('default-return-cash-account').value);
		paramstr.append("default_niaaccount".toLowerCase(), document.getElementById('Default-nia-account').value);
		paramstr.append("default_bankaccount".toLowerCase(), document.getElementById('default-bank-account').value);
		paramstr.append("default_inventory".toLowerCase(), document.getElementById('default-inventory').value);
		paramstr.append("default_payableaccount".toLowerCase(), document.getElementById('default-payable-account').value);
		paramstr.append("default_receivableaccount".toLowerCase(), document.getElementById('default-receivable-account').value);
        paramstr.append("registrationcharge".toLowerCase(), document.getElementById('registrationcharge').value);
		paramstr.append("renewalcharge".toLowerCase(), document.getElementById('renewalcharge').value);
		paramstr.append("replacementcharge".toLowerCase(), document.getElementById('replacementcharge').value);
		paramstr.append("mfa".toLowerCase(), document.getElementById('mfa').value);
		paramstr.append("default_cashtobankaccount".toLowerCase(), document.getElementById('default_cashtobankaccount').value);
        try {
            paramstr.append('photofilename',document.getElementById('profile-image-upload-input').files[0].name);		
            paramstr.append('userphotoname',document.getElementById('profile-image-upload-input').files[0]);
        }
        catch(ex){
             paramstr.append('photofilename','-');		
             paramstr.append('userphotoname','-');
         
        }				


	   return paramstr;

	}

	var saveOrganisationInfo = function(e){
	    
	    if(!validateCompany()){ 
			return; 
		}
	    
	    showSpinner();
    	var request = getAjaxObject();
    
        request.open('POST','../controllers/organisationinfoscript.php',true);
    
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        callModal('Information saved successfully', 1)
                        /*form.reset();*/
                    }
                    else  return callModal(parseRequest.message, 0)
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
        
            try{
                e.stopPropagation();
            }catch(ex){}
        }
    
        request.setRequestHeader('Connection','close'); 
        request.send(getOrganisationParams());
	    

	}

    if(document.getElementById('btnSaveChanges')) document.getElementById('btnSaveChanges').addEventListener('click',saveOrganisationInfo,false);
    
   await fetchOrganiationFormData()
}

function populateFormwithOrgData() {
    try {
        
        document.getElementById('company-name').value = orginfo.companyname
        document.getElementById('sms-sender-id').value = orginfo.smssenderid
        document.getElementById('number-of-users').value = orginfo.no_of_users
        document.getElementById('telephone').value = orginfo.telephone
        document.getElementById('mobile').value = orginfo.mobile
        document.getElementById('email').value = orginfo.email
        document.getElementById('address').value = orginfo.address
        document.getElementById('sms-charge').value = orginfo.smscharge
        document.getElementById('sms-charge-account').value = orginfo.smschargeaccount
        document.getElementById('allow-back-dated-transaction').value = orginfo.backdated_transaction
        document.getElementById('allow-future-transaction').value = orginfo.future_transaction
        document.getElementById('automate-memorandum').value = orginfo.automate_memorandum
        document.getElementById('automate-sms-charge').value = orginfo.automate_smscharge
        document.getElementById('set-accounting-year-end').value = orginfo.accounting_yearend
        document.getElementById('savings-account-prefix').value = orginfo.savings_prefix
        document.getElementById('isusu-prefix').value = orginfo.isusu_prefix
        document.getElementById('personal-account-current-prefix').value = orginfo.isusu_prefix
        document.getElementById('group-current-account-prefix').value = orginfo.groupcurrent_prefix
        document.getElementById('loan-account-prefix').value = orginfo.loan_prefix
        document.getElementById('loan-transaction-prefix').value = orginfo.loantransaction_prefix
        document.getElementById('od-transaction-prefix').value = orginfo.odtransaction_prefix
        document.getElementById('customer-transaction-prefix').value = orginfo.customertransaction_prefix
        document.getElementById('general-ledger-transaction-prefix').value = orginfo.gl_transaction_prefix
        document.getElementById('fixed-account-prefix').value = orginfo.fixedaccount_prefix
        document.getElementById('asset-gl-account-prefix').value = orginfo.glassetprefix
        document.getElementById('cash-gl-account-prefix').value = orginfo.glcashprefix
        document.getElementById('expense-gl-account-prefix').value = orginfo.glexpenseprefix
        document.getElementById('equity-gl-account-prefix').value = orginfo.glequityprefix
        document.getElementById('payable-gl-account-prefix').value = orginfo.glpayableprefix
        document.getElementById('receivable-gl-account-prefix').value = orginfo.glrecievableprefix
        document.getElementById('liabilities-gl-account-prefix').value = orginfo.glliabilitiesprefix
        document.getElementById('income-gl-account-prefix').value = orginfo.glincomeprefix
        document.getElementById('depreciation-gl-account-prefix').value = orginfo.gldepreciationprefix
        document.getElementById('general-ledger-account-prefix').value = orginfo.gl_account_prefix
        document.getElementById('default-gl-income-account').value = orginfo.default_incomeaccount
        document.getElementById('default-gl-asset-account').value = orginfo.default_assetaccount
        document.getElementById('loan-provisioning-account').value = orginfo.loan_provisioning_account
        document.getElementById('default-gl-savings-account').value = orginfo.default_glsavingsaccount
        document.getElementById('default-gl-esusu-account').value = orginfo.default_glesusu
        document.getElementById('default-gl-cash-account').value = orginfo.default_cashaccount 
        document.getElementById('default-gl-teller-cash-account').value = orginfo.default_tellercash
        document.getElementById('default-gl-od-account').value = orginfo.default_glodaccount
        document.getElementById('default-current-account').value = orginfo.default_glcurrentaccount
        document.getElementById('default-gl-tax-account').value = orginfo.default_taxaccount
        document.getElementById('default-fixed-account').value = orginfo.default_glfixedaccount
        document.getElementById('default-fixed-interest-account').value = orginfo.default_fixedinterestaccount
        document.getElementById('default-expense-account').value = orginfo.default_glexpenseaccount
        document.getElementById('default-loan-account').value = orginfo.default_glloanaccount
        document.getElementById('default-non-cash-account').value = orginfo.default_noncashaccount
        document.getElementById('default-gl-mandatory-savings-account').value = orginfo.default_glsavingsaccount
        document.getElementById('mandatory-savings-account-rate').value = orginfo.mandatorysavings_rate
        document.getElementById('default-gl-staff-account').value = orginfo.default_glstaffaccount
        document.getElementById('wht-rate').value = orginfo.whtrate
        document.getElementById('vat-rate').value = orginfo.vatrate
        document.getElementById('noofdaysforpropertynotice').value = orginfo.noofdaysforpropertynotice 
        document.getElementById('noofdaystosetasidepropertystock').value = orginfo.noofdaystosetasidepropertystock
        document.getElementById('schedulemaintenancecharge').value = orginfo.schedulemaintenancecharge
        document.getElementById('maintenancecharge').value = orginfo.maintenancecharge
        document.getElementById('schedulesavingsinterest').value = orginfo.schedulesavingsinterest
        document.getElementById('scheduleloanrepayment').value = orginfo.scheduleloanrepayment
        document.getElementById('replacementcharge').value = orginfo.replacementcharge
        document.getElementById('mfa').value = orginfo.mfa
        document.getElementById('renewalcharge').value = orginfo.renewalcharge
        document.getElementById('registrationcharge').value = orginfo.registrationcharge
        document.getElementById('profile-image').src = 'https://htg.com.ng/howtogrow/images/'+orginfo.logo
        document.getElementById('default-rrr-account').value = orginfo.default_rrraccount
        document.getElementById('default-property-account').value = orginfo.default_propertyaccount
        document.getElementById('default-branch-cash-account').value = orginfo.default_branchcashaccount
        document.getElementById('default-excess-account').value = orginfo.default_excessaccount
        document.getElementById('default-return-cash-account').value = orginfo.default_returncashaccount
        document.getElementById('Default-nia-account').value = orginfo.default_niaaccount
        document.getElementById('default-bank-account').value = orginfo.default_bankaccount
        document.getElementById('default-inventory').value = orginfo.default_inventory
        document.getElementById('default-payable-account').value = orginfo.default_payableaccount
        document.getElementById('default-receivable-account').value = orginfo.default_receivableaccount
        document.getElementById('default_cashtobankaccount').value = orginfo.default_cashtobankaccount
    }
    catch(e) {console.log}

}

function lazyAppendAccount(e) {
    e.target.innerHTML = optionshtml;
}

async function fetchOrganiationFormData() {
    await fetchGLaccountS()
    await fetchOrganizationInfo()
}

function organizationInfofileTypeValidator(selectedFiles) {
    let isValid = false;
    let selectedFilesArray = Object.values(selectedFiles);
    selectedFilesArray.forEach(file => {
        let splitFileName = file.name.split('.');
        let extension = splitFileName[splitFileName.length - 1];
        if (['jpg','jpeg', 'png'].includes(extension)) isValid = true;
        else isValid = false;
    })
    return isValid;
}


async function fetchGLaccountS() {
    let result = await fetchRequest('../controllers/fetchglbyaccounttype.php');
    if(result) {
        let parseResult  =  JSON.parse(result);
        if(parseResult.status){
            defaultaccounts = parseResult.data;
            optionshtml = ''
            defaultaccounts.map(item => {
                let option = `<option value="${item.accountnumber}">${item.description}</option>`
                optionshtml += option;
                document.getElementById('default-gl-income-account').innerHTML = optionshtml
                document.getElementById('default-gl-asset-account').innerHTML = optionshtml
                document.getElementById('loan-provisioning-account').innerHTML = optionshtml
                document.getElementById('default-gl-savings-account').innerHTML = optionshtml
                document.getElementById('default-gl-esusu-account').innerHTML = optionshtml
                document.getElementById('default-gl-cash-account').innerHTML = optionshtml
                document.getElementById('default-gl-teller-cash-account').innerHTML = optionshtml
                document.getElementById('default-gl-od-account').innerHTML = optionshtml
                document.getElementById('default-current-account').innerHTML = optionshtml
                document.getElementById('default-gl-tax-account').innerHTML = optionshtml
                document.getElementById('default-fixed-account').innerHTML = optionshtml
                document.getElementById('default-fixed-interest-account').innerHTML = optionshtml 
                document.getElementById('default-expense-account').innerHTML = optionshtml
                document.getElementById('default-loan-account').innerHTML = optionshtml
                document.getElementById('default-non-cash-account').innerHTML = optionshtml
                document.getElementById('default-gl-mandatory-savings-account').innerHTML = optionshtml
                document.getElementById('mandatory-savings-account-rate').innerHTML = optionshtml
                document.getElementById('default-gl-staff-account').innerHTML = optionshtml
                document.getElementById('default-rrr-account').innerHTML = optionshtml
                document.getElementById('default-property-account').innerHTML = optionshtml
                document.getElementById('default-branch-cash-account').innerHTML = optionshtml
                document.getElementById('default-excess-account').innerHTML = optionshtml
                document.getElementById('default-return-cash-account').innerHTML = optionshtml
                document.getElementById('Default-nia-account').innerHTML = optionshtml
                document.getElementById('default-bank-account').innerHTML = optionshtml
                document.getElementById('default-inventory').innerHTML = optionshtml
                document.getElementById('default-payable-account').innerHTML = optionshtml
                document.getElementById('default-receivable-account').innerHTML = optionshtml
                document.getElementById('default_cashtobankaccount').innerHTML = optionshtml
            })
        }
    }
}
    
async function fetchOrganizationInfo() {
    let result = await fetchRequest('../controllers/fetchorganisationscript.php');
    if(result) {
        let parseResult  =  JSON.parse(result);
        if(parseResult.status){
            orginfo = parseResult.data.data[0]
            populateFormwithOrgData()
        }
    }
}

var organisationInfoNav = document.getElementById("organisation-info");
if (organisationInfoNav) organisationInfoNav.addEventListener("click", organisationInfo, false);


let toggler, modal,body,tabletoggles,overlay1,overlay2,modalcaller,canclebtn,confirmbtn,closemodalbtn,openmodalbtn,funaccountcontainer, allUsers, onlineUsers;
var datasource = [];

async function openAdminPanel(){
    
    await httpRequest('adminpanel.php')
    
    toggler = document.querySelector(".toggle");
    modal = document.querySelector(".modal");
    body = document.querySelector("body");
    tabletoggles = document.querySelectorAll(".tabletoggle");
    // tablemodal = document.querySelector('.tabletoggle');
    overlay1 = document.querySelector('.overlay1');
    overlay2 = document.querySelector('.overlay2');
    modalcaller = document.querySelectorAll('.unactive');
    canclebtn = document.querySelector('.canclebtn');
    confirmbtn = document.querySelector('.confirmbtn');
    closemodalbtn = document.querySelector('.closemodal');
    openmodalbtn = document.querySelector('.openmodal');
    funaccountcontainer = document.querySelector('.funaccountcontainer');


    //////// MANAGE MODAL LOGIC/////////
    toggler.addEventListener("click", function (e) {
    	e.stopPropagation();
    	modal.classList.toggle("hide");
    	console.log('mattth');
    });
    
    openmodalbtn.addEventListener('click',function(){
    	overlay2.classList.remove('hidden');
    	funaccountcontainer.classList.add('stylespecial');
    // 	console.log(funaccountcontainer.classList);
    	modal.classList.toggle("hide");
    });
    
    closemodalbtn.addEventListener('click',function(){
    	overlay2.classList.add('hidden');
    	funaccountcontainer.classList.remove('stylespecial');
    });
    
    modal.addEventListener("click", function (e) {
    	e.stopPropagation();
    });


    //////// CLOSING OF MODAL FROM BODY  LOGIC ///////////
    body.addEventListener("click", function (e) {
    	if (!modal.classList.contains("hide")) {
    		modal.classList.add("hide");
    	}
    	tabletoggles.forEach(val =>{
    		val.querySelector('.tablemodal').addEventListener('click',function(e){
    			e.currentTarget;
    			e.stopPropagation();
    			console.log(e);
    		});
    		e.stopPropagation();
    		// console.log(val.querySelector(".tablemodal"));
    		if(val.querySelector(".tablemodal").classList.contains('hide'))return;
    		val.querySelector(".tablemodal").classList.toggle('hide');
    	}); 
    });

    ////////// TABLE MODAL LOGIC /////////////
    tabletoggles.forEach(currenttoggle=>{
    	const tablemodal = currenttoggle.querySelector('.tablemodal');
    	const currentcolumn = tablemodal.parentElement.parentElement.parentElement;
    	currenttoggle.addEventListener('click', e=>{
    		e.stopPropagation();
    		currentcolumn.dataset.open='true';
    		const  current = e.currentTarget;
    		const toclose = Array.from(tabletoggles).filter(node=>{
    			return node != current;
    		});
    		toclose.forEach(values=>{
    			values.querySelector('.tablemodal').classList.add('hide');	
    		});
    		const rect = currenttoggle.getBoundingClientRect();
    		const rectp = document
    		.querySelector(".generaltableholder")
    		.getBoundingClientRect();
    		const specificmodalheight = 65;
    		const mattt = rectp.bottom - rect.top;
    		// const modalheight = tablemodal.clientHeight;
    		if (specificmodalheight > mattt) {
    			tablemodal.classList.add("tablemodalchangeposition");  
    		} else {
    			tablemodal.classList.remove("tablemodalchangeposition");
    		}
    		currenttoggle.querySelector('.tablemodal').classList.toggle('hide');
    	
    	});
    });
    
    modalcaller.forEach(currentmodalcaler =>{
    	currentmodalcaler.addEventListener('click', e=>{
    		console.log(e);
    		e.stopPropagation();
    		overlay1.classList.remove('hidden');
    	});
    });

    // Cancle button Logic
    canclebtn.addEventListener('click',function(){
      overlay1.classList.add('hidden');
      console.log('Olamide');
    });
    
    // Confirm button Logic 
    confirmbtn.addEventListener('click',function(){
    	tabletoggles.forEach(currenttoggle=>{
    	const parentcolumn = currenttoggle.parentElement.parentElement;
    	if(parentcolumn.dataset.open === 'true'){
    		if(parentcolumn.querySelector('.unactive').textContent ==='Activate'){
    			parentcolumn.querySelector('.active').textContent ='Activate';
    			parentcolumn.querySelector('.unactive').textContent = 'Disactivate';
    		}
    		else{parentcolumn.querySelector('.active').textContent ='Disactivate';
    		parentcolumn.querySelector('.unactive').textContent = 'Activate';
    	}
    	}
    	parentcolumn.dataset.open = 'false';
    	});
    	overlay1.classList.add('hidden');
    
    });
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(adminsetCurrentPage)
     
    await fetchAllUsers();
    await fetchOnlineUsers(); 
    
    if(document.getElementById('firstcard'))document.getElementById('firstcard').addEventListener('click', e=>fetchAllUsers(), false );       
  if(document.getElementById('secondcard'))document.getElementById('secondcard').addEventListener('click', e=>fetchOnlineUsers(true), false );
  if(document.getElementById('matuserlogviewbtnn'))document.getElementById('matuserlogviewbtnn').addEventListener('click', e=>fetchAllUsers(document.getElementById('usersselecter').value), true );
  
}

async function fetchAllUsers (val='') {
    const param = new FormData();
    if(val)param.append('username', val)
    function action(result){
        if(result.status){
             let parseResult = result;
        console.log('admin panel result', parseResult)
        checkSession();
        if(parseResult.status){
            document.getElementById('regusers').innerHTML = parseResult.data.length;
            allUsers = datasource = parseResult.data;
            initPagination(datasource, adminsetCurrentPage)
        }
        }
    }
     await callController('fetchallusers.php', param, 'fetchallusers', null, action);
}
const adminpanelrowbtn =(state, email, action=false)=>{
     function adminpparams(){
    var paramstr = new FormData();
    paramstr.append('email', email);
        return paramstr;
    };
     function adminpparams2(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('userremoveid').value);
    paramstr.append('upw', document.getElementById('upw').value);
        return paramstr;
    };
    if(state =='activate'){
        callController('reactivateuser.php', adminpparams(), 'reactivateuser', null, resetPage)
    }
    if(state =='deactivate'){
        callController('deactivateuser.php', adminpparams(), 'deactivateuser', null, resetPage)
    }
    if(state =='delete'){
        if(!action){
            document.getElementById('userremoveid').value = email;
            document.getElementById('modal-btn').checked = true;
            return
        }
        if(action){
            callController('removeusers.php', adminpparams2(), 'removeusers', null, resetPage)
        }
    }
}

function appendTableRows(item, index) {
    jtabledata.innerHTML += `
        <tr data-open="false" class="source-row-item">
            <td>
                <div class="flex" style="align-items:center">
                    ${item.rowstatus == "DEACTIVATED" ? `<button onclick="adminpanelrowbtn('activate', '${item.email}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Activate</button>` : '' }
                    ${item.rowstatus == "ACTIVE" ? `<button onclick="adminpanelrowbtn('deactivate', '${item.email}')" style="padding: 5px 6px;cursor:pointer;border:1px solid red;outline:none;font-size:10px;color:red;background-color:transparent;border-radius:3px">Deactivate</button>` : '' }
                    ${item.rowstatus == "VERIFIED" ? `<button onclick="adminpanelrowbtn('deactivate', '${item.email}')" style="padding: 5px 6px;cursor:pointer;border:1px solid red;outline:none;font-size:10px;color:red;background-color:transparent;border-radius:3px">Deactivate</button>` : '' }
                    <button onclick="adminpanelrowbtn('delete', '${item.email}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                </div>
            </td>
            <td>${item.firstname ?? ''}</td>
            <td>${item.lastname ?? ''}</td>
            <td>${item.othernames ?? ''}</td>
            <td>${item.online}</td>
            <td style="text-transform:lowercase">${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.role}</td>
            <td>${item.address}</td>
            <td>${item.supervisoremail}</td>
            <td class="active">${item.rowstatus == "VERIFIED" ? 'ACTIVE' : 'NOT ACTIVE' }</td>
        </tr>
    `
} 

var adminsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(datasource.length) {
        datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendTableRows(item, index)
            }
        })
        if(document.querySelector('#alluserstable tbody').innerHTML === '') adminPanel.click()
    }
    else {
        jtabledata.innerHTML=  renderNoTableData()
    }
}


async function fetchOnlineUsers (state=false) {
    let result = await fetchRequest('../controllers/fetchonlineusers.php');
    if(result) {
        checkSession();
        let parseResult = JSON.parse(result);
        if(parseResult.status) {
            onlineUsers = parseResult.data;
            document.getElementById('onlineusers').innerHTML = parseResult.data.length;
            if(state){
                datasource = parseResult.data
                 initPagination(datasource, adminsetCurrentPage)
            }
        }
    }
}

function validateAdminPanel(){
	var flag = 1;
	var mssg='';
	//used for BVN instead
	
	if(flag == 0){
		
		var mbox = document.getElementById('messageBox');
		mbox.innerHTML = mssg;
		mbox.style.display = 'block';
		mbox.style.visibility = 'visible';

		setTimeout(function(){
			mbox.style.display = 'none';
			mbox.style.visibility = 'hidden';
		

		}, 2000);	
		return false;
	}else{ 
		return true; 
	}

}

function getAdminPanelParams(){
    var paramstr = new FormData();
    return paramstr;
}

var saveAdminPanel = function(e){
    showSpinner();
    if(!validateAdminPanel()){ 
        hideSpinner();
        return; 
    }
    var request = getAjaxObject();

    request.open('POST','../controllers/slipnumbersscript.php',true);
    request.onreadystatechange = function(){
        if(request.readyState == 1){ }
        if(request.readyState == 4 && request.status == 200){
            // console.log('request.responseText', request.responseText)
            let result = JSON.parse(request.responseText);
            // console.log('result', result);
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
            
            callModal(result.message, stat);
        }else{
            hideSpinner();
        }

        e.stopPropagation();
    };

    request.setRequestHeader('Connection','close');
    request.send(getAdminPanelParams());

};


//if(document.getElementById('matregistrationslipnosubmitbtn'))document.getElementById('matregistrationslipnosubmitbtn').addEventListener('click',saveRegistrationSlipno,false);


var adminPanel = document.getElementById('adminpanel')
if(adminPanel)adminPanel.addEventListener('click', openAdminPanel, false)


let arrayOfUsers, currentemail;
async function openUseractivitylog () {
    await httpRequest('useractivitylog.php');
    jtabledata = document.getElementById('useractivitylogtablecontent');
    initializePaginationParams();
    getAllUsers()
    if(document.getElementById('matuserlogviewbtn'))document.getElementById('matuserlogviewbtn').addEventListener('click',e=>callController('fetchuseractivities.php',getUserActivityLogParams() , 'useractivitylog', [`userlogusers`,`userlogstartdate`,`userlogenddate`], logUserActivity, ),true);
    if(document.getElementById("matuseralprintbtn")){
        document.getElementById("matuseralprintbtn").addEventListener('click',printDiv)
    }
}

function getAllUsers(){
    const requestItem = getAjaxObject();
    requestItem.open('POST','../controllers/fetchallusers.php',true);
    requestItem.onreadystatechange = function(){
       
      if(requestItem.readyState == 4 && requestItem.status == 200){
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('', result);
            const allusers= result.data;
            arrayOfUsers = allusers 
            console.log(allusers)
      let strAllUsers = allusers.map(each=>{
             return`
             <option value=${each.firstname}> ${each.firstname} </option>
             `
         })
          if(  document.getElementById('allusers')){
            //   console.log(strLocations.join(' '))
            // const headerselect = '<option selected> Select Marketer </option>'
              document.getElementById('allusers').innerHTML=   strAllUsers.join(' ')
          }
      }
      else{
        //   console.log("not success ",requestItem)
      }
    };
    requestItem.setRequestHeader('Connection','close');
    requestItem.send();
}


function getEmail(ema){
    currentemail = 2
    console.log('currentEmail',currentemail)
}

	function getUserActivityLogParams(){
		var paramstr = new FormData();
	 	
	 	try{
            paramstr.append('email', document.getElementById('userlogusers').value ? arrayOfUsers.filter(each=> each.firstname === document.getElementById('userlogusers').value)[0].email : '-');
    		paramstr.append('startdate',document.getElementById('userlogstartdate').value);
    		paramstr.append('enddate',document.getElementById('userlogenddate').value);
        }catch(err){
            console.log(err)
        }
	 		
	
	
	
	
	   return paramstr;

	}

var useractivitylog_datasource = [];
function logUserActivity(result){
    useractivitylog_datasource = [];
    /*if(!result.data)return callModal(`${result.message}`)*/
    useractivitylog_datasource = result.data;
    console.log('useractivitylog_datasource', useractivitylog_datasource)
    initPagination(useractivitylog_datasource, useractivitylogsetCurrentPage);
  /*const logUserActivityStr =  result.data.map(each=> {
      return`
      <p>${each.description}</p>
      <p>${each.currenttime}</p>
      `
  })*/
  
  /*document.getElementById('useraldisplaycontent').innerHTML= logUserActivityStr.join(' ')*/
    
}
var useractivitylogsetCurrentPage = (pageNum) => {
    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(useractivitylog_datasource.length) {
        useractivitylog_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appenduseractivitylogTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#useractivitylogtablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("useractivitylogtablecontent").innerHTML=  renderNoTableData()
    }
};
function formatTime(inputDateTime) {
  // Parse the input string to create a Date object
  const dateObject = new Date(inputDateTime);

  // Get the hours, minutes, and AM/PM
  let hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time as "h:mm am/pm"
  const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

  return formattedTime;
}

function appenduseractivitylogTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("useractivitylogtablecontent").innerHTML += `
        <tr data-open="false" class="source-row-item">
            <td> ${index+1} </td>
            <td> ${data.description} </td>
            <td> ${data.status} </td>
            <td> ${formatTime(data.currenttime)} </td>
            <td> ${formatDate(data.currenttime)} </td>
        </tr>
    `
} 



function printDiv(id="useraldisplaycontent") {
    var divContents = document.getElementById(id).innerHTML;
    var printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Div</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }

var useractivitylogbtn = document.getElementById('useractivitylog')
if(useractivitylogbtn) useractivitylogbtn.addEventListener('click', e=>openUseractivitylog(), false)


const btnscreen = document.getElementById('prm-btnscreen');
const contentscreen = document.getElementById('prm-contentscreen');
const prmcard = document.getElementById('prm-card');
const prmbckbtn = document.getElementById('prm-bckbtn');
const prmnavselectbtn = document.getElementById('prmnavselectbtn');
const prmnavselect = document.getElementById('prmnavselect');
const prmimgselect = document.getElementById('prmimgselect');
const prmid = document.getElementById('prm-id');
const prmnavselectbtn2 = document.getElementById('prmnavselectbtn2');
const prmnavselect2 = document.getElementById('prmnavselect2');
const prmimgselect2 = document.getElementById('prmimgselect2');
const prmlid = document.getElementById('prm-l-id');

let i = 0;


function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    console.log(rect.top);
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)


    );
}

const permset_activatedata = [
'DEACTIVATE USER'
];
const permset_administrationdata = [
  "ADMIN PANEL",
  "DEACTIVATE USER",
  "ACTIVATE USER",
  "APPROVE BOOKLETS",
  "BOOKLET RENEWAL/REPLACEMENT",
  "BOOKLET STOCK HISTORY",
  "BRANCH SELECTION",
  "CASHIER LIMIT",
  "COMMISSION CATEGORIES",
  "CONFIRM/COLLECT BOOKLET",
  "GROUP TARGET",
  "MARKETERS REGISTRATIONS & RENEWALS",
  "MARKETERS TARGET",
  "MACHINE IDENTIFICATION",
  "MY PROFILE",
  "ORGANISATION INFO",
  "PERMISSION SETTING",
  "REGISTER BRANCH",
  "REGISTER USER",
  "REJECT TRANSACTION DATE",
  "REVIEW SERIAL NUMBERS",
  "SERIAL NUMBER LOOK UPS/COMPLAINTS",
  "SUPPLY BOOKLET",
  "TASK SCHEDULE",
  "VIEW TASK SCHEDULE",
  "USER ACTIVITY LOGS",
  "REGISTRATION POINT",
];


const permset_inventorydata = [
  "ITEM TYPE",
  "REGISTER INVENTORY",
  "VIEW INVENTORY LIST",
  "APPROVE INVENTORY",
  "SUPPLIER / CUSTOMER",
  "INTAKE/STOCK CONTROL",
  "INTAKE HISTORY",
  "STOCK LEDGER",
  "OUTTAKE",
  "OUTTAKE HISTORY",
  "RETURN",
  "RETURN VIEW",
  "GIFTS",
  "GIFTS VIEW",
  "STOCK STATUS REPORT",
  "VIEW ARCHIVE INVENTORY LIST",
  "DELETE SUPPLIER"
];

    
const permset_customerdata = [
  "REGISTER CUSTOMER ACCOUNT",
  "APPROVE CUSTOMER UPDATE",
  "VIEW CUSTOMERS"
];
//   "APPROVE UPDATE OF CUSTOMER PROFILE",

const permset_savingsdata = [
  "SAVINGS PRODUCT",
  "SAVINGS ACCOUNT PRODUCTS",
  "ADD SAVINGS ACCOUNTS",
  "VIEW SAVINGS ACCOUNTS",
  "SAVINGS TRANSACTIONS",
  "SAVINGS DEPOSIT ANALYSIS",
  "LOCAL TRANSFER",
  "VIEW TRANSFERS"
];

    
const permset_propertydata = [
  "BUILD PROPERTY ITEMS",
  "CATEGORY VALUE TIMELINE",
  "ADD PROPERTY ACCOUNT",
  "VIEW COMPOSITE ITEMS",
  "VIEW PROPERTY ACCOUNTS",
  "MATURED PROPERTY ACCOUNTS",
  "MISSED MATURITY",
  "PROPERTY TRANSACTION REPORT",
  "PROPERTY DELIVERY",
  "VIEW DELIVERY",
  "REVERSE DELIVERY",
  "PROPERTY STOCK OUTTAKE REPORT",
  "PROPERTY DEPOSIT ANALYSIS",
  "PROPERTY DEPOSIT STATUS",
  "PROPERTY COMMISSIONS",
  "PROPERTY LEDGER",
  "PROPERTY MARKUP REPORT",
  "APPROVE REVERSED DELIVERY",
  "VIEW REVERSED DELIVERY",
  "VIEW RESERVED PROPERTY STOCK",
  "VIEW PROPERTY ITEM NOT IN STOCK",
  "VIEW PROPERTY BUTTON",
  "EDIT PROPERTY BUTTON"
];

    
const permset_loansdata = [
  "ADD LOAN FEES",
  "LOAN PRODUCTS",
  "ADD LOAN ACCOUNT",
  "VIEW LOANS",
  "ADD COLLATERAL",
  "APPROVE LOAN",
  "VIEW ACTIVE LOANS",
  "DUE LOANS",
  "MISSED REPAYMENTS",
  "PAST MATURITY DATE",
  "NO REPAYMENT",
  "REPAYMENT SCHEDULE",
  "LOAN TRANSACTION REPORT",
  "LOAN CLASSIFICATION REPORT"
];
    
const permset_transactionsdata = [
  "STATEMENT OF ACCOUNT",
  "COLLECTIONS",
  "COLLECTIONS VIEW",
  "UPDATE DAILY UNITS",
  "APPROVED COLLECTIONS",
  "DELETE SERVICE CHARGE",
  "DECLINED COLLECTIONS",
  "WITHDRAWAL",
  "VIEW WITHDRAWALS",
  "APPROVE WITHDRAWALS",
  "DEPOSIT",
  "VIEW DEPOSITS",
  "APPROVE DEPOSITS",
  "GROUP DEPOSIT",
  "VIEW GROUP DEPOSIT",
  "EDIT DEPOSIT",
  "VIEW EDITED DEPOSIT",
  "VIEW DELETED DEPOSIT", 
  "EDIT WITHDRAWALS",
  "VIEW EDITED WITHDRAWALS",
  "VIEW DELETED WITHDRAWALS",
  "DAILY TRANSACTIONS",
  "RESOLVE EXCESS & RETURNED CASH",
  "SUMMARY NET TRANSACTION",
  "BRANCH FUND TRANSFER",
  "VIEW BRANCH FUND TRANSFER",
  "GROUP SYSTEM CASH POSITION",
  "EXCESS CASH REPORT",
  "RETURNED CASH REPORT",
  "AGGREGATED BRANCH DEPOSITS",
  "RRR TRANSACTION REPORT",
  "TRANSFER CASH TO BANK",
  "VIEW TRANSFER CASH TO BANK",
  "VIEW CREDIT (CHARGES) ENTRIES",
  "SPLIT DEPOSITS",
  "SPLIT DEPOSIT IN STATEMENT",
  "TRANSFER CREDIT IN STATEMENT", 
  "STATEMENT IN DAILY DETAIL"
];


    
const permset_PersonnelPayrolldata = [
  "ADD DEPARTMENT",
  "ADD LEVEL",
  "ADD GROUP",
  "ADD PERSONNEL",
  "APPROVE PERSONNEL",
  "VIEW PERSONNEL",
  "PERSONNEL HISTORY",
  "ADD GUARANTOR",
  "ADD EMPLOYMENT RECORD",
  "ADD REFEREE",
  "ADD QUALIFICATION",
  "ADD PARENTS/GUARDIANS",
  "QUERY",
  "PROMOTIONS",
  "TERMINATION/RESIGNATION",
  "SUSPENSION",
  "LEAVE",
  "WARNING",
  "MONITORING/EVALUATION",
  "ADVANCE",
  "VIEW STAFF ADVANCE",
  "STAFF SALARY RECORD",
  "VIEW MONTHLY SALARY SCHEDULE",
  "PAYROLL",
  "APPROVE PAYROLL"
];

    
const permset_accountsdata = [
  "ADD GL ACCOUNT",
  "VIEW GL ACCOUNTS",
  "ADD GL TRANSACTION",
  "VIEW GL TRANSACTION HISTORY",
  "VIEW TRIAL BALANCE",
  "VIEW INCOME STATEMENT",
  "VIEW BALANCE SHEET",
  "VIEW RECIPIENTS",
  "APPROVE TRANSFERS",
  "INTERBANK TRANSFERS",
  "VIEW AGGREGATES",
  "VIEW INTERBANK TRANSFERS",
  "CANCEL INTERBANK TRANSFER",
  "APPROVE INTERBANK TRANSFER",
  "PAY INTERBANK TRANSFER",
  "CANCEL INTERBANK TRANSFER"
];
     
const permset_otherreportsdata = [
    "SEARCH CREDIT RATING",
 'VIEW RETURN CASH TRANSACTION',
  'VIEW EDITED SERVICE CHARGE',
  'VIEW CASH',
  'SUBMITTED ERRORS',
  'GROUP SYSTEM CASH ANALYSES',
  'CONSOLIDATE REPORTS',
 
    ];
     
const permset_otherdata = [
  "WITHDRAWAL REQUEST",
  "PROCESS WITHDRAWAL REQUEST",
  "APPROVE WITHDRAWAL REQUEST",
  "VIEW WITHDRAWAL REQUEST",
  "EXPENDITURES",
  "APPROVE EXPENDITURES",
  "VIEW EXPENDITURES",
  "WAREHOUSE SALES",
  "VIEW WAREHOUSE SALES",
  "APPROVE WAREHOUSE SALES REVERSAL",
  "REVERSE WAREHOUSE SALES",
  "PAYMENTS",
  "VIEW PAYMENTS",
  "VIEW REPORTS ACROSS LOCATIONS",
  "APPROVE COLLECTIONS",
  "DELETE DEPOSIT",
  "DELETE WITHDRAWAL",
  "EDIT WITHDRAWAL",
  "VIEW BALANCE ON MOBILE",
  "APPROVE TRANSACTION",
  "ACTIVATE OR DEACTIVATE MACHINES",
  "TOGGLE CUSTOMER STATUS",
  "APPROVE BALANCE DEPOSIT",
  "ADD BALANCE",
  "APPROVE BALANCE",
  "VIEW BALANCE"
];
 
  
const populate_permissions =(result)=>{
    if(!result){
        if(document.getElementById('perm_user'))document.getElementById('perm_user').value = '';
        if(document.getElementById('perm_role'))document.getElementById('perm_role').value = '';
        if(document.getElementById('platform'))document.getElementById('platform').value = '';
        if(document.getElementById('permset_administration'))document.getElementById('permset_administration').innerHTML = `PLEASE SELECT A USER.`;
        if(document.getElementById('permset_inventory'))document.getElementById('permset_inventory').innerHTML = '';
        if(document.getElementById('permset_customer'))document.getElementById('permset_customer').innerHTML = '';
        if(document.getElementById('permset_savings'))document.getElementById('permset_savings').innerHTML = '';
        if(document.getElementById('permset_property'))document.getElementById('permset_property').innerHTML = '';
        if(document.getElementById('permset_loans'))document.getElementById('permset_loans').innerHTML = '';
        if(document.getElementById('permset_transactions'))document.getElementById('permset_transactions').innerHTML = '';
        if(document.getElementById('permset_PersonnelPayroll'))document.getElementById('permset_PersonnelPayroll').innerHTML = '';
        if(document.getElementById('permset_accounts'))document.getElementById('permset_accounts').innerHTML = '';
        if(document.getElementById('permset_otherreports'))document.getElementById('permset_otherreports').innerHTML = '';
        if(document.getElementById('permset_activatedata'))document.getElementById('permset_activatedata').innerHTML = '';
        if(document.getElementById('permset_other'))document.getElementById('permset_other').innerHTML = '';
        if(document.getElementById('permlocation'))document.getElementById('permlocation').value = '';
    }else{
        if(document.getElementById('permlocation'))document.getElementById('permlocation').value = result.location_name;
        if(document.getElementById('platform'))document.getElementById('platform').value =  result.platform;
        if(document.getElementById('perm_role'))document.getElementById('perm_role').value = result.role;
        if(userstatus != 'SUPERADMIN')document.getElementById('perm_role').setAttribute('disabled', true)
        if(userstatus == 'SUPERADMIN')document.getElementById('perm_role').removeAttribute('disabled')
        let actiiva = result.permissions.split('|');
        if(document.getElementById('permset_activatedata'))document.getElementById('permset_activatedata').innerHTML = `<p class="prmitemheader subheader2">DEACTIVATE USER ACCOUNT</p> ${permset_activatedata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem ${data.split('-')[1] ? userstatus == 'SUPERADMIN' ? '' : 'hidden' : ''}"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span style="color: red">${data.split('-')[0]}</span></div>`
                )
            }else{ 
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem ${data.split('-')[1] ? userstatus == 'SUPERADMIN' ? '' : 'hidden' : ''}"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span style="color: red">${data.split('-')[0]}</span></div>`
                ) 
            };
        }).join('')}`;
        if(document.getElementById('permset_administration'))document.getElementById('permset_administration').innerHTML = `<p class="prmitemheader subheader2">ADMINISTRATION</p> ${permset_administrationdata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem ${data.split('-')[1] ? userstatus == 'SUPERADMIN' ? '' : 'hidden' : ''}"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data.split('-')[0]}</span></div>`
                )
            }else{
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem ${data.split('-')[1] ? userstatus == 'SUPERADMIN' ? '' : 'hidden' : ''}"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data.split('-')[0]}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_inventory'))document.getElementById('permset_inventory').innerHTML = `<p class="prmitemheader subheader2">INVENTORY</p> ${permset_inventorydata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_customer'))document.getElementById('permset_customer').innerHTML = `<p class="prmitemheader subheader2">CUSTOMER</p> ${permset_customerdata.map(data=>{
           if(actiiva.includes(`${data}`)){
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_savings'))document.getElementById('permset_savings').innerHTML = `<p class="prmitemheader subheader2">SAVINGS</p> ${permset_savingsdata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_property'))document.getElementById('permset_property').innerHTML = `<p class="prmitemheader subheader2">PROPERTY</p> ${permset_propertydata.map(data=>{
           if(actiiva.includes(`${data}`)){
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_loans'))document.getElementById('permset_loans').innerHTML = `<p class="prmitemheader subheader2">LOANS</p> ${permset_loansdata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_transactions'))document.getElementById('permset_transactions').innerHTML = `<p class="prmitemheader subheader2">TRANSACTIONS</p> ${permset_transactionsdata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_PersonnelPayroll'))document.getElementById('permset_PersonnelPayroll').innerHTML = `<p class="prmitemheader subheader2">PERSONNEL & PAYROLL</p> ${permset_PersonnelPayrolldata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_accounts'))document.getElementById('permset_accounts').innerHTML = `<p class="prmitemheader subheader2">ACCOUNTS / INTERBANK TRANSACTIONS</p> ${permset_accountsdata.map(data=>{
           if(actiiva.includes(`${data}`)){
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_otherreports'))document.getElementById('permset_otherreports').innerHTML = `<p class="prmitemheader subheader2">OTHER REPORTS</p> ${permset_otherreportsdata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_other'))document.getElementById('permset_other').innerHTML = `<p class="prmitemheader subheader2">OTHERS</p> ${permset_otherdata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div onclick="setTimeout(()=>{document.getElementById('permset_save').click()},600)" class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
    }
}

const populate_user =(result)=>{
    if(document.getElementById('datastaff'))document.getElementById('datastaff').innerHTML = result.data.map(data=>`<option value="${data.lastname} ${data.firstname}">${data.email}</option>`).join('') ;
    // if(document.getElementById('perm_user'))document.getElementById('perm_user').innerHTML = result.data.map(data=>`<option value="${data.email}">${data.lastname} ${data.firstname}</option>`).join('') ;
}

const box = document.querySelector('#prm-contentscreen');
const content = document.querySelector('.prmselectcontainer');
const message = document.querySelector('#message');

const collate_permissions =()=>{
    let permiit = ''
    document.getElementsByName('prmswitch')
    for(i=0; i<document.getElementsByName('prmswitch').length; i++){
        if(document.getElementsByName('prmswitch')[i].value == 1){
            permiit += `${document.getElementsByName('prmswitch')[i].nextElementSibling.nextElementSibling.textContent}|`;
        }
    }
    return `${permiit.slice(0, -1)}`
};

// const colatle_permissions =()=>{
//     let permiit = ''
//     document.getElementsByName('prmswitch')
//     for(i=0; i<document.getElementsByName('prmswitch').length; i++){
//         if(document.getElementsByName('prmswitch')[i].value == 1){
//             permiit += `${document.getElementsByName('prmswitch')[i].nextElementSibling.nextElementSibling.textContent}|`;
//         }
//     }
//     return permiit
// };

function getpermissionsParams(me=''){
    var paramstr = new FormData();
    if(!me)paramstr.append('email', document.getElementById('perm_user').value);
    if(me)paramstr.append('email', document.getElementById('indexEmail').value);
    
// for (var pair of paramstr.entries()) {
//             //   console.log(pair[0] + ', ' + pair[1]); 
//             // return(pair[0]+ ', ' + pair[1]); 
//             }
    return paramstr;
};

function updatepermissionsParams(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('perm_user').value);
    paramstr.append('role', document.getElementById('perm_role').value);
    paramstr.append('permissions', collate_permissions());
    return paramstr;
};

let userstatus

async function permissionsetting() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('permissionsetting.php', 'override');  
        try {
            document.getElementById('perm_role').style.display = 'none'
        } catch(e) {}
        
        userstatus='';
        function permissionaction(result){
            userstatus = result.role
        }
        callController('fetchuserprofile.php', getpermissionsParams('me'), 'fetchuserprofile', null, permissionaction)
        
        if(document.getElementById('prm-card'))document.getElementById('prm-card').addEventListener('click', e=>{
            // console.log('clicked')
            // location.href = '#prm-contentscreen';
            if(document.getElementById('prm-btnscreen'))document.getElementById('prm-btnscreen').style.display = 'none'
            // if(document.getElementById('prm-contentscreen'))document.getElementById('prm-contentscreen').style.display = 'flex'
        });
        if(document.getElementById('prm-bckbtn'))document.getElementById('prm-bckbtn').addEventListener('click', e=>{
            // if(document.getElementById('prm-contentscreen'))document.getElementById('prm-contentscreen').style.display = 'none'
            if(document.getElementById('prm-btnscreen'))document.getElementById('prm-btnscreen').style.display = ''
            // location.href = '#prm-btnscreen'
        });
        // callController =(controller, params, name, validate, funct, e)
        callController('fetchallusers.php', null, 'fetchallusers', null, populate_user, 'silent');
        if(document.getElementById('platform'))document.getElementById('platform').addEventListener('change', e=>{
            if(window.confirm('Are you sure you want to change the platform of this user?')){
                function param(){
                    let par = new FormData();
                    par.append('platform', document.getElementById('platform').value)
                    par.append('email', document.getElementById('perm_user').value)
                    return par;
                }
                callController('updateuserplatform.php', param(), 'updateuserplatform', null)
            }else{
                if(document.getElementById('perm_user').value == '')populate_permissions();
                if(document.getElementById('perm_user').value != '')callController('fetchuserprofile.php', getpermissionsParams(), 'fetchuserprofile', null, populate_permissions)
            }
        })
        if(document.getElementById('perm_user'))document.getElementById('perm_user').addEventListener('change', e=>{
            if(document.getElementById('perm_user').value == '')populate_permissions();
            if(document.getElementById('perm_user').value != '')callController('fetchuserprofile.php', getpermissionsParams(), 'fetchuserprofile', null, populate_permissions)
        })
        if(document.getElementById('permset_save'))document.getElementById('permset_save').addEventListener('click', e=>{
            const call =()=>{
            //     if(document.getElementById('perm_user'))document.getElementById('perm_user').value = ''
            // if(document.getElementById('perm_role'))document.getElementById('perm_role').value = ''
            // populate_permissions();
            }
            callController('updatepermissions.php', updatepermissionsParams(), 'updatepermissions', [`perm_user`,`perm_role`], call);
        })
        window.onmousedown=(e)=>{
    let el = e.target;
    console.log(el);
}
        
        populate_permissions();
        
}


var orepermissionsetting = document.getElementById("permissionsetting");
if (orepermissionsetting) orepermissionsetting.addEventListener("click", e=>permissionsetting());



datasource = []
function machineidsetCurrentPage(pageNum) {
                
        currentPage = pageNum;
        
        handleActivePageNumber();
        handlePageButtonsStatus();
    
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        
        if(document.getElementById('machineidentificationtablejtabledata')) document.getElementById('machineidentificationtablejtabledata').innerHTML = '';
        if(datasource.length) {
            datasource.reverse().forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    machineidrenderTableHTML(item, index)
                }
            })
            if(document.querySelector('#machineidentificationtable tbody').innerHTML === '') machineidentificationbtn.click()
        }
    }
async function fetchMachineIdentifications() {

        showSpinner();
        let paramstr = new FormData(document.getElementById('filtermachineidentification'))
        
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchmachineidentity.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(document.getElementById('machineidentificationtablejtabledata')) document.getElementById('machineidentificationtablejtabledata').innerHTML = '';
                        //console.log('datta', parseRequest)
                        data = datasource = parseRequest.data
                        if(data.length > 0){initPagination(data, machineidsetCurrentPage)}else{document.getElementById('machineidentificationtablejtabledata').innerHTML = 'No data to Display'}
                    }
                    else return callModal('No records retrieved')
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        request.setRequestHeader('Connection','close'); 
        request.send(paramstr);
    
    }
   

    
    function machineidrenderTableHTML(item, index) {
        console.log('itme', item)
        jtabledata.innerHTML += `
            <tr class="source-row-item">
                <td> ${ index +1} </td>
                <td style="max-width: 400px;text-align:left"> ${item.machine} </td>
                <td> ${ item.ip } </td>
                <td> ${ new Date(item.contactdate).toLocaleString() } </td>
                <td class="flex no-pr">
                    <div  style="align-items:center">
                        <button onclick="setMachineStatus(event, ${item.id})" value="${ item.status == 'NOT ACTIVE' ? 'ACTIVE' : 'NOT ACTIVE'}" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:${ item.status === 'NOT ACTIVE' ? 'blue' : 'tomato'};border-radius:3px" >
                            ${ item.status === 'NOT ACTIVE' ? 'ACTIVATE' : 'DE-ACTIVATE'}
                        </button>
                    </div>
                </td>
            </tr>
            `
    }
    
    function renderNoTableData() {
        return  `
            <tr>
                <td colspan="3">
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
    }
    
 async function setMachineStatus(event, id) {
        
        if(!confirm('Are you sure sure?')) return
        
        // selecteditem = datasource[index]
        
        
        showSpinner();
        let paramstr = new FormData()
        paramstr.append('id', id)
        paramstr.append('status', event.target.value)
        
	    var request = getAjaxObject();
        request.open('POST','../controllers/togglemachinestatus.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        callModal(`Machine status ${event.target.value == 'ACTIVE' ? 'activated' : 'deactivated'}`, 1)
                        fetchMachineIdentifications()
                    }
                    else return callModal(parseRequest.message)
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        request.setRequestHeader('Connection','close'); 
        request.send(paramstr);
    }
    
async function openMachineIdentification() {
    await httpRequest('machineidentification.php');
    datasource = [];
     
    jtabledata = document.getElementById('machineidentificationtablejtabledata')
    initializePaginationParams(machineidsetCurrentPage)
    const form = document.querySelector('#filtermachineidentification')
    if(form.querySelector('#submit')) form.querySelector('#submit').addEventListener('click', fetchMachineIdentifications)
    
}
    

    

var machineidentificationbtn = document.getElementById('machineidentification');
if(machineidentificationbtn) machineidentificationbtn.addEventListener('click', openMachineIdentification, false)



var pFiles, fileselect, input, form, submit;
async function openProfile() {
    await httpRequest('profile.php');
    
    form = document.getElementById('profileform');
    if(form) {
        firstname = form.querySelector('#firstname');
        lastname = form.querySelector('#lastname');
        othername = form.querySelector('#othernames');
        email = form.querySelector('#email');
        dateofbirth = form.querySelector('#dateofbirth');
        phone = form.querySelector('#phone');
        address = form.querySelector('#address');
        role = form.querySelector('#role');
        userLocation = form.querySelector('#location');
        question1 = form.querySelector('#question1');
        answer1 = form.querySelector('#answer1');
        question2 = form.querySelector('#question2');
        answer2 = form.querySelector('#answer2');
        upw = form.querySelector('#upw');
        supervisor1 = form.querySelector('#supervisor1')
        supervisor2 = form.querySelector('#supervisor2')
    
        
        pFiles = document.querySelector('#document')
        fileselect = document.querySelector('.file-action')
        if(fileselect) input = fileselect.querySelector('input[id="document"]')
        
        if(fileselect) fileselect.addEventListener('click', () =>{ if(input) input.click()})
        if(input) input.addEventListener('change', (e) => onProfileFileInputChange(e.target))
        
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', validateProfileForm);
        
        await fetchNavProfileLocations()
        await fetchAllProfileUsers()
        await fetchProfile();
        
    }
}

async function fetchProfile() {
    let result = await fetch('../controllers/fetchuserprofile.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        try {
            firstname.value = res.firstname
            lastname.value = res.lastname
            othername.value = res.othernames
            dateofbirth.value = res.dateofbirth 
            phone.value = res.phone 
            address.value = res.address
            userLocation.value = res.location_id
            question1.value = res.question1
            question2.value = res.question2
            answer1.value = res.answer1
            answer2.value = res.answer2
            
            let sup1 = (profileusers.find( item => item.email == res.supervisoremail));
            let sup2 = (profileusers.find( item => item.email == res.supervisoremail2));
            supervisor1.value = sup1 ? sup1.firstname?.concat(' ', sup1.lastname, ' ', sup1.othername ?? '') : ''
            supervisor2.value = sup2 ? sup2.firstname?.concat(' ', sup2.lastname, ' ', sup2.othername ?? '') : ''
            
        }
        catch(e) { console.log(e)}
    }
}

async function fetchAllProfileUsers (cb=null) {
    let result = await fetchRequest('../controllers/fetchallusers.php');
    if(result) {
        let parseResult = JSON.parse(result);
        checkSession();
        if(parseResult.status){
            profileusers = parseResult.data;
            let options = '<option value="" selected="">--Select Supervisor --</option>';
            profileusers?.map( item =>  options += `<option value="${item.firstname?.concat(' ', item.lastname, ' ', item.othername ?? '')}">`)
            
            if(document.getElementById('supervisor1')){
                let datalist1 = document.createElement('datalist')
                datalist1.innerHTML = options;
                datalist1.id = "supervisor1list"
                document.getElementById('supervisor1').parentElement.appendChild(datalist1)
            }
            if(document.getElementById('supervisor2')) {
                let datalist2 = document.createElement('datalist')
                datalist2.innerHTML = options;
                datalist2.id = "supervisor2list"
                document.getElementById('supervisor1').parentElement.appendChild(datalist2)
            }
        }
    }
}



async function fetchNavProfileLocations() {
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        let data = res.data?.data;
        let options = '';
        data.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.location} </option>
            `
        })
        // console.log(document.querySelector('#profileform #location'), data)
        if(document.querySelector('#profileform #location')){
            document.querySelector('#profileform #location').innerHTML = ''
            document.querySelector('#profileform #location').innerHTML = '<option value="" selected="">--Select Location --</option>'+options
            document.querySelector('#profileform #location').value = assetsUrl.sessionLocation
            document.querySelector('#profileform #location').innerHTML = `${ document.querySelector('#profileform #location').options[document.querySelector('#profileform #location').selectedIndex].outerHTML }`
        }
    }
}


function validateProfileForm() {

    inputs = [
        { input: firstname, validation: {required: 'firstname is required'}},
        { input: lastname, validation: {required: 'lastname is required'}},
        { input: othername, validation: {required: 'othername is required'}},
        { input: email, validation: {required: 'email is required'}},
        { input: dateofbirth, validation: {required: 'dateofbirth  is required'}},
        { input: phone, validation: {required: 'phone  is required'}},
        { input: address, validation: {required: 'address  is required'}},
        { input: role, validation: {required: 'role  is required'}},
        { input: userLocation, validation: {required: 'userLocation  is required'}},
        { input: question1, validation: {required: 'question1  is required'}},
        { input: question2, validation: {required: 'question2  is required'}},
        { input: answer2, validation: {required: 'answer2  is required'}},
        { input: upw, validation: {required: 'upw  is required'}}
    ]

    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field?.pattern, index);
        if(result)  validations.push(result) ;  
    })
    
    if(document.getElementById('upw').value != document.getElementById('matuserregcomfirmupw').value)return callModal('Passwords do not match', 0)

    if(validations.length) validatorMapper(validations)

    else  saveProfileForm()
}
   
   
var	saveProfileForm = function(e){ 
	showSpinner();
	var request = getAjaxObject();
    
    request.open('POST','../controllers/userscript.php',true);
    
    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                
                let parseRequest = JSON.parse(request.responseText)
                
                if(parseRequest.status){
                    callModal('Profile Saved', 1)
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();

        try{
            e.stopPropagation();
        }catch(ex){}
    }

    
    request.setRequestHeader('Connection','close'); 
    request.send(getProfileFormParams());
	
} 

function getProfileFormParams() {
    let paramstr = new FormData(document.getElementById('profileform'))
    paramstr.append('supervisoremail', (profileusers?.find( item => item.firstname?.concat(' ', item.lastname, ' ', item.othername ?? '') == document.getElementById('supervisor1').value))?.email)
    paramstr.append('supervisoremail2', (profileusers?.find( item => item.firstname?.concat(' ', item.lastname, ' ', item.othername ?? '') == document.getElementById('supervisor2').value))?.email)
    if(paramstr) {
        try {
            paramstr.append('photofilename',input.files[0].name);		
		    paramstr.append('userphotoname',input.files[0]);
        }
        catch(ex){
    	 paramstr.append('photofilename','-');		
    	 paramstr.append('userphotoname','-');
    	 
       }
    }
    return paramstr;
}

function profileFileTypeValidator(selectedFiles) {
    let isValid = false;
    let selectedFilesArray = Object.values(selectedFiles);
    selectedFilesArray.forEach(file => {
        let splitFileName = file.name.split('.');
        let extension = splitFileName[splitFileName.length - 1];
        if (['jpg','jpeg', 'png'].includes(extension)) isValid = true;
        else isValid = false;
    })  
    return isValid;
}


function onProfileFileInputChange(event) {

    let previewEl = document.querySelector('.file-area');
    if(previewEl) previewEl.innerHTML = '';
    
    let selectedFiles = input.files;

    if (!profileFileTypeValidator(selectedFiles)) {
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
var profilebtn = document.getElementById('profile')
var profilebtn2 = document.getElementById('userprofileview')
if(profilebtn) profilebtn.addEventListener('click', openProfile, false)
if(profilebtn2) profilebtn2.addEventListener('click', openProfile, false)


 var confirmbookletfetchdata;
 
 
async function confirmbookletrenewalandreplacement () {
    'use strict';
        await  httpRequest('confirmbookletrenewalandreplacement.php?x=24')
    
    
        
        
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
                  console.log(pair[0] + ', ' + pair[1] + ', '); 
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
    requestItem.open('POST','../controllers/fetchapprovedbooklets.php',true)
    requestItem.onreadystatechange = function(){
      if(requestItem.readyState == 4 && requestItem.status == 200){
            const result = JSON.parse(requestItem.responseText);
            const booklet = result.data
             renderConfirmBookletTable(booklet)
      }
      else{}
    };
    requestItem.setRequestHeader('Connection','close');
    requestItem.send(getAccountNumber());
}
/* function getBooklets(){
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
}*/

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
                  console.log(pair[0] + ', ' + pair[1] + ', '); 
                }
    
    	   return paramstr;
    
    	}
    
    
function saveRenewalBooklet(e){
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
                        document.getElementById('enteraccountnumber').value = '';
                        return getBooklets()
                        // getBooklets()
                        // confirmbookletrenewalandreplacement()
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
    			     callModal(result.message, stat)
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
                    <td> ${ item.accountname ?? '' } </td>
                    <td>
                        <div class="flex" style="align-items:center">
                            <button onclick="confirmBookletItem(${index})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Confirm</button>
                        </div>
                    </td>
                </tr>
            `;
        });
        
    }
}

function confirmBookletItem(index) {
    if(!confirm('Are you sure you want to confirm this?')) return 
    
    const selectedItem = confirmbookletfetchdata[index]
    const inputElement = document.getElementById('enteraccountnumber');
    inputElement.value = selectedItem.accountnumber;
    
    const parentElement = inputElement.parentElement.parentElement.children[1].children[1];
    mataccoutnumberchecker(inputElement.value, parentElement, inputElement);
    setTimeout(() =>  document.getElementById('matrenewalbookletgo').click(), 1000)
}



     
    var confirmbookletrenewalandreplacementbtn = document.getElementById('confirmbookletrenewalandreplacement')
    if(confirmbookletrenewalandreplacementbtn) confirmbookletrenewalandreplacementbtn.addEventListener('click', e=>confirmbookletrenewalandreplacement())
    
    
    let renewablereplacementfetchdata;
       async function renewalreplacementofbooklet () {
        await  httpRequest('renewalreplacementofbooklet.php')
        
        document.getElementById('actiontype').addEventListener('change', e=>{
            const action =(result)=>{
                let ff 
                if(document.getElementById('actiontype').value == 'RENEWAL')ff = result.data.data[0].renewalcharge
                if(document.getElementById('actiontype').value == 'REPLACEMENT')ff = result.data.data[0].replacementcharge
                document.getElementById('matcharge').value = ff
            }
            callController('fetchorganisationscript.php', null, 'fetchorganisationscript', [], action)
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
    
    requestItem.open('POST','../controllers/fetchallusers.php', true);
    
    requestItem.onreadystatechange = function(){
        if(requestItem.readyState === 4 && requestItem.status === 200){
            try {
                const result = JSON.parse(requestItem.responseText);
                const marketers = result.data;
                
                // Optional: Process locations and marketers if needed
                getRenewalReplacement(locations, marketers);
                
                // Populate the datalist with marketer names
                const datalist = document.getElementById('marketer-list');
                if(datalist){
                    // Clear existing options except the first placeholder
                    datalist.innerHTML = '<option value=""></option>';
                    
                    // Create and append option elements with marketer names
                    marketers.forEach(marketer => {
                        const option = document.createElement('option');
                        option.value = marketer.lastname+' '+marketer.firstname+' '+marketer.othernames+'||'+marketer.id; // Set value to marketer's name
                        datalist.appendChild(option);
                    });
                }

                // Store marketers data globally for later lookup
                window.marketersData = marketers;
            } catch (error) {
                console.error('Error parsing marketers data:', error);
            }
        }
        // Optional: Handle other readyState/status combinations if needed
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
            const booklets= result.data;
           
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
		var serialnumberfrom = document.getElementById('serialnumberfrom');
		var serialnumberto = document.getElementById('serialnumberto');
	 
	
		
		
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
		
		if(serialnumberto.value.length < 1){
			mssg += 'serial number to is Invalid <br />';			
			serialnumberto.style.borderColor = 'red';
			flag =0;
		}
		else{
			serialnumberto.style.borderColor = 'lightgray';
		}
		
		if(serialnumberfrom.value.length < 1){
			mssg += 'serial number from is Invalid <br />';			
			serialnumberfrom.style.borderColor = 'red';
			flag =0;
		}
		else{
			serialnumberfrom.style.borderColor = 'lightgray';
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
				serialnumberfrom.style.borderColor = 'lightgray';
				serialnumberto.style.borderColor = 'lightgray';
			

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
		paramstr.append('actiontype',document.getElementById('actiontype').value);
		paramstr.append('marketer',document.getElementById('matmarketer').value.split('||')[1] );
		paramstr.append('reason',document.getElementById('matreason').value );
		paramstr.append('pages',document.getElementById('matpages').value );
		paramstr.append('requestdate',document.getElementById('matrequestdate').value );
		paramstr.append('location',document.getElementById('matbranch').value );
		paramstr.append('serialnumberto',document.getElementById('serialnumberto').value );
		paramstr.append('serialnumberfrom',document.getElementById('serialnumberfrom').value );
	
        
		for (var pair of paramstr.entries()) {
              console.log(pair[0] + ', ' + pair[1] + ', '); 
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
			     console.log('result', result.message);
			     
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
			     
			     callModal(result.message, stat)
				
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
                    <td> ${ formatDate(item.requestdate) } </td>
                    <td> ${ item.locationname  } </td>
                    <td> ${ item.pages } </td>
                    <td> ${ item.reason } </td>
                    <td> ${ item.marketername } </td>
                    <td> ${ item.charges } </td>
                    
                </tr>
            
            `
        })
    }
}
    
    var renewalreplacementofbookletbtn = document.getElementById('renewalreplacementofbooklet')
    if(renewalreplacementofbookletbtn) renewalreplacementofbookletbtn.addEventListener('click', e=>renewalreplacementofbooklet())
    
    
          var serialnumbercheckfetchdata;
          let serialnumbercheckid;
var serialnumbercheckorehistory_datasource = [];

const populateserialnumberchecktable=(result)=>{
    serialnumbercheckorehistory_datasource = [];
    serialnumbercheckorehistory_datasource = result.data;
    console.log('serialnumbercheckorehistory_datasource', serialnumbercheckorehistory_datasource)
    initPagination(serialnumbercheckorehistory_datasource, serialnumberchecksetCurrentPage);
    }
    
var serialnumberchecksetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(serialnumbercheckorehistory_datasource.length) {
        serialnumbercheckorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                serialnumberchecktablerowTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("serialnumberchecktablecontent").innerHTML=  renderNoTableData()
    }
};

const deleteserialnumbercheckentry=(id)=>{
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removemarketertarget.php', parammm(), 'removemarketertarget', null, resetPage)
}

const editserialnumbercheck=(id, location, accountno, accountname, complaint, requestdate, serialnumber)=>{
    serialnumbercheckid = id;
    document.getElementById('matbranch').value = location;
    document.getElementById('mataccountnumber').value = accountno;
    document.getElementById('chxxxx').textContent = accountname;
    document.getElementById('matcomplain').value = complaint;
    document.getElementById('matdate').value = requestdate;
    document.getElementById('matserialnumber').value = serialnumber;
}

function serialnumberchecktablerowTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("serialnumberchecktablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLocationById(dat.location)} </td>
                                <td> ${dat.accountname} </td>
                                <td> ${dat.accountnumber} </td>
                                <td> ${dat.complaint} </td>
                                <td> ${dateToWords(dat.requestdate)} </td>
                                <td> ${dat.serialnumber} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="editserialnumbercheck('${dat.id}', '${dat.location}', '${dat.accountnumber}', '${dat.accountname}', '${dat.complaint}', '${dat.requestdate}', '${dat.serialnumber}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deleteserialnumbercheckentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 
    
      
       async function serialnumbercheck () {
        await  httpRequest('serialnumbercheck.php');
        serialnumbercheckid = ''
        jtabledata = document.getElementById('serialnumberchecktablecontent');
        initializePaginationParams();
        
        callController('fetchserialcomplaint.php', null, 'fetchserialcomplaint', [], populateserialnumberchecktable)
        
        
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
	
	
	
	
    
	function validateSerialCheck(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		//var matbranch = document.getElementById('matbranch');
		var mataccountno = document.getElementById('mataccountnumber');
		var matserialnumber = document.getElementById('matserialnumber');
		var matdate = document.getElementById('matdate');
	   // var matDepartmentLocation = document.getElementById('matdepartmentlocation');
	
		
		
		/*if(matbranch.value.length < 1){
			mssg += 'Branch is Invalid <br />';			
			matbranch.style.borderColor = 'red';
			flag =0;
		}
		else{
			matbranch.style.borderColor = 'lightgray';
		}*/
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
               console.log(pair[0] + ', ' + pair[1] + ', '); 
            }

	   return paramstr;

	}


var	saveSerialNoCheck = function(e){
	 
		
		if(!validateSerialCheck()){ 
		 //hideSpinner();
			return; 
		}
		
		showSpinner();
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
			     
			     callModal(result.message, stat)
			}else{
			    
			    hideSpinner();
			
			}

			e.stopPropagation();
		}

		
		request.setRequestHeader('Connection','close');
		request.send(getSerialNoCheckParams());

	}

if(document.getElementById('matviewbtn'))document.getElementById('matviewbtn').addEventListener('click',e=>runserialnumbercheck(),false);
        
}

function runserialcomplaintscript(result){
    document.getElementById('mataccountnumber').value = '';
    document.getElementById('matdate').value = '';
    document.getElementById('matbranch').value = '';
    document.getElementById('matcomplain').value = '';
    document.getElementById('matserialnumber').value = '';
    
    console.log('success', result)
    
}

function runserialnumbercheck(){
    function paramsm(){
        let params = new FormData()
        if(serialnumbercheckid)params.append('id', serialnumbercheckid);
        params.append('accountnumber', document.getElementById('mataccountnumber').value);
        params.append('requestdate', document.getElementById('matdate').value);
        params.append('location', document.getElementById('matbranch').value);
        params.append('complaint', document.getElementById('matcomplain').value);
        params.append('serialnumber', document.getElementById('matserialnumber').value);
        return params
    }
    callController('serialcomplaintscript.php', paramsm(), 'serialcomplaintscript', ['mataccountnumber','matdate','matserialnumber'], runserialcomplaintscript);
    serialnumbercheck()
}


    
    var serialnumbercheckbtn = document.getElementById('serialnumbercheck')
    if(serialnumbercheckbtn) serialnumbercheckbtn.addEventListener('click', e=>serialnumbercheck())
    
    
    
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
			    
			    callModal(result.message, stat)
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


let tasksheduleid



async function openScheduleRoster(){
'use strict';

await httpRequest('scheduleroster.php')

tasksheduleid = '';
callController('')
if(document.getElementById('taskschedulebranch'))document.getElementById('taskschedulebranch').innerHTML = `<option value="" disabled>Select Location</option>`;
if(document.getElementById('taskschedulebranch'))document.getElementById('taskschedulebranch').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');

const validateScheduleRoster =()=>{
    const pparaams =()=>{
        let paramstr = new FormData();
        if(tasksheduleid)paramstr.append('id', tasksheduleid)
        paramstr.append('location', document.getElementById('taskschedulebranch').value)
        paramstr.append('entrydate', document.getElementById('taskscheduleentrydate').value)
        paramstr.append('deliverydate', document.getElementById('taskscheduleexpectdeliverydate').value)
        paramstr.append('task', document.getElementById('taskscheduletask').value)
        return paramstr
    }
    const gettoviewtaskschedule=(result)=>document.getElementById('viewscheduleroster').click()
    if(document.getElementById('matschedulerostersubmitbtn').textContent == "Submit")callController('taskschedulescript.php', pparaams(), 'taskschedulescript', ['taskschedulebranch', 'taskscheduleentrydate', 'taskscheduleexpectdeliverydate', 'taskscheduletask'], resetPage)
    if(document.getElementById('matschedulerostersubmitbtn').textContent == "Update")callController('taskschedulescript.php', pparaams(), 'taskschedulescript', ['taskschedulebranch', 'taskscheduleentrydate', 'taskscheduleexpectdeliverydate', 'taskscheduletask'], gettoviewtaskschedule)
}
const tasksheduleaction =(result)=>{
        console.log(document.getElementById('taskschedulebranch'))
        if(document.getElementById('taskschedulebranch'))document.getElementById('taskschedulebranch').value = result.location_id;
    // if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
    //     if(document.getElementById('taskschedulebranch'))document.getElementById('taskschedulebranch').setAttribute('readonly', false);
    // }else{
        if(document.getElementById('taskschedulebranch'))document.getElementById('taskschedulebranch').setAttribute('readonly', true)
    // }
}



const loadtaskschedule =(result)=>{
    if(document.getElementById('matschedulerostersubmitbtn'))document.getElementById('matschedulerostersubmitbtn').innerHTML = "Update";
        document.getElementById('taskschedulebranch').value = result.data[0].location;
        document.getElementById('taskscheduleentrydate').value = result.data[0].entrydate.split(' ')[0];
        document.getElementById('taskscheduleexpectdeliverydate').value = result.data[0].deliverydate.split(' ')[0];
        document.getElementById('taskscheduletask').value = result.data[0].task;
}

function tasksheduleparams(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    setTimeout(()=>{
    if(sessionStorage.getItem('editviewtaskscheduledata')){
        tasksheduleid = sessionStorage.getItem('editviewtaskscheduledata').split(',')[0];
       function paramstaskschedule(){
        var paramstr = new FormData();
        paramstr.append('id', sessionStorage.getItem('editviewtaskscheduledata').split(',')[0]);
        paramstr.append('location', sessionStorage.getItem('editviewtaskscheduledata').split(',')[1]);
            return paramstr;
        };
        
        callController('fetchtaskschedule.php', paramstaskschedule(), 'fetchtaskschedule', null, loadtaskschedule);
         sessionStorage.removeItem('editviewtaskscheduledata')    
    }
    },1500)
        callController('fetchuserprofile.php', tasksheduleparams(), 'fetchuserprofile', null, tasksheduleaction);
if(document.getElementById('matschedulerostersubmitbtn'))document.getElementById('matschedulerostersubmitbtn').addEventListener('click',validateScheduleRoster,false);

}

var scheduleroster = document.getElementById('scheduleroster')
if(scheduleroster) scheduleroster.addEventListener('click',openScheduleRoster,false);


var viewtaskscheduleorehistory_datasource = [];

const populateviewtaskscheduletable=(result)=>{
    viewtaskscheduleorehistory_datasource = [];
    if(!result.data)return callModal('No Task to display')
    viewtaskscheduleorehistory_datasource = result.data;
    console.log('viewtaskscheduleorehistory_datasource', viewtaskscheduleorehistory_datasource)
    initPagination(viewtaskscheduleorehistory_datasource, viewtaskscheduleorehistoryorehistorysetCurrentPage);
    document.getElementById('viewtaskschedule2orehistorytablecontent').innerHTML = viewtaskscheduleorehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLocationById(dat.location)} </td>
                                <td> ${dat.entrydate.split(' ')[0]} </td>
                                <td> ${dat.deliverydate.split(' ')[0]} </td>
                                <td> ${dat.task} </td>
                            </tr>`)
    }).join('')
    }
    
var viewtaskscheduleorehistoryorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewtaskscheduleorehistory_datasource.length) {
        viewtaskscheduleorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewtaskscheduleorehistoryorehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("viewtaskscheduleorehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletestocktaskscheduleentry=(id)=>{
    const run=(result)=>{
       function paramstaskschedule(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('viewtaskschedulelocation').value);
        paramstr.append('startdate', document.getElementById('viewtaskschedulestartdate').value);
        paramstr.append('enddate', document.getElementById('viewtaskscheduleenddate').value);
            return paramstr;
        };
        
        callController('fetchtaskschedule.php', paramstaskschedule(), 'fetchtaskschedule', ['viewtaskscheduleenddate', 'viewtaskschedulestartdate', 'viewtaskschedulelocation'], populateviewtaskscheduletable);
    }
    if (confirm("Are you sure you want to delete?")) {
        function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removetaskschedule.php', parammm(), 'removetaskschedule', null, run)
} else {
    return
}

    
}

function appendviewtaskscheduleorehistoryorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("viewtaskscheduleorehistorytablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLocationById(dat.location)} </td>
                                <td> ${dat.entrydate.split(' ')[0]} </td>
                                <td> ${dat.deliverydate.split(' ')[0]} </td>
                                <td> ${dat.task} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="sessionStorage.setItem('editviewtaskscheduledata', '${dat.id}, ${dat.location}');document.getElementById('scheduleroster').click()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletestocktaskscheduleentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 


const checkviewtaskscheduleuserstatus =(result)=>{
        console.log(document.getElementById('viewtaskschedulelocation'))
        if(document.getElementById('viewtaskschedulelocation'))document.getElementById('viewtaskschedulelocation').value = result.location_id;
    // if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
    //     if(document.getElementById('viewtaskschedulelocation'))document.getElementById('viewtaskschedulelocation').setAttribute('readonly', false);
    // }else{
        // if(document.getElementById('viewtaskschedulelocation'))document.getElementById('viewtaskschedulelocation').setAttribute('readonly', true)
    // }
}



async function openviewtaskschedule () {
    await httpRequest('viewscheduleroster.php', 'override');
    
      jtabledata = document.getElementById('viewtaskscheduleorehistorytablecontent');
        initializePaginationParams();
    
    if(document.getElementById('viewtaskschedulefetchview'))document.getElementById('viewtaskschedulefetchview').addEventListener('click', e=>{
        function paramstaskschedule(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('viewtaskschedulelocation').value);
        paramstr.append('startdate', document.getElementById('viewtaskschedulestartdate').value);
        paramstr.append('enddate', document.getElementById('viewtaskscheduleenddate').value);
            return paramstr;
        };
        
        callController('fetchtaskschedule.php', paramstaskschedule(), 'fetchtaskschedule', ['viewtaskscheduleenddate', 'viewtaskschedulestartdate', 'viewtaskschedulelocation'], populateviewtaskscheduletable);
    })
    
    if(document.getElementById('viewtaskschedulelocation'))document.getElementById('viewtaskschedulelocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('viewtaskschedulelocation'))document.getElementById('viewtaskschedulelocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    function getpermissionsParamsviewtaskschedule(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsviewtaskschedule(), 'fetchuserprofile', null, checkviewtaskscheduleuserstatus);
    
      if(document.getElementById('viewtaskscheduleexport'))document.getElementById('viewtaskscheduleexport').addEventListener('click',e=>{
            tableToExcel('viewtaskscheduleoretable2', 'LIST OF RETURNS')},false);
        if(document.getElementById('viewtaskscheduleprint'))document.getElementById('viewtaskscheduleprint').addEventListener('click',e=>{
            printContent('LIST OF RETURNS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewtaskscheduleorefulltableparant')},false);


}

var viewtaskscheduleNav = document.getElementById("viewscheduleroster");
if (viewtaskscheduleNav) viewtaskscheduleNav.addEventListener("click", openviewtaskschedule, false);


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
                  console.log(pair[0] + ', ' + pair[1] + ', '); 
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
                  console.log(pair[0] + ', ' + pair[1] + ', '); 
                }
    
    	   return paramstr;
    
    	}
    
    
var	saveApproveBooklet = function(e){
    	  showSpinner();
    		
    		if(!validateApproveBooklet()){ 
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
    			     
    			     callModal(result.message, stat)
    				
    			}else{
    			    
    			    hideSpinner();
    			
    			}
    
    			e.stopPropagation();
    		}
    
    		
    		request.setRequestHeader('Connection','close');
    		request.send(getApproveBookletParams());
    
    	};
    
    if(document.getElementById('matapprovebookletgo'))document.getElementById('matapprovebookletgo').addEventListener('click', e=>saveApproveBooklet(), true);

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
                  console.log(pair[0] + ', ' + pair[1] + ', '); 
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
    			     callModal(result.message, stat)
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
                  console.log(pair[0] + ', ' + pair[1] + ', '); 
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
    			     callModal(result.message, stat)
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
    
    
    let cashierlimitid;
let cashierlimituserdata;
var cashierlimitorehistory_datasource = [];

const populatecashierlimittable=(result)=>{
    cashierlimitorehistory_datasource = [];
    cashierlimitorehistory_datasource = result.data;
    console.log('cashierlimitorehistory_datasource', cashierlimitorehistory_datasource)
    initPagination(cashierlimitorehistory_datasource, cashierlimitsetCurrentPage);
    // document.getElementById('cashierlimittablecontent2').innerHTML = cashierlimitorehistory_datasource.map((dat, index)=>{
    //     return(`<tr data-open="false" class="source-row-item">
    //                             <td> ${index+1} </td>
    //                             <td> ${getLocationById(dat.location)} </td>
    //                             <td> ${getthegroup(dat.groupid, 'cashierlimitgroup')} </td>
    //                             <td> ${dat.target} </td>
    //                             <td> ${dat.startperiod} </td>
    //                             <td> ${dat.endperiod} </td>
    //                         </tr>`)
    // }).join('')
    }
    
var cashierlimitsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(cashierlimitorehistory_datasource.length) {
        cashierlimitorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                cashierlimittablerowTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("cashierlimittablecontent").innerHTML=  renderNoTableData()
    }
};

const deletecashierlimitentry=(id)=>{
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('cashier', id);
        return paramstr;
    };
    callController('removecashierlimit.php', parammm(), 'removecashierlimit', null, resetPage)
}

const editcashierlimit=(id, cashier, depositlimit, withdrawallimit)=>{
    cashierlimitid = id;
    document.getElementById('cashierlimitcashier').value = cashier;
    document.getElementById('cashierlimitdepositlimit').value = depositlimit;
    document.getElementById('cashierlimitwithdrawallimit').value = withdrawallimit;
    document.getElementById('cashierlimitcashiername').value = getLabelFromValue(cashier, 'cashieruserlist');
    document.getElementById('cashierlimitsubmitbtn').textContent = 'Update'
}

function cashierlimittablerowTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("cashierlimittablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLabelFromValue(dat.cashier, 'cashieruserlist').split(' ')[1]} </td>
                                <td> ${getLabelFromValue(dat.cashier, 'cashieruserlist').split(' ')[0]} </td>
                                <td> ${dat.cashier} </td>
                                <td> ${dat.depositlimit} </td>
                                <td> ${dat.withdrawallimit} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="editcashierlimit('${dat.id}', '${dat.cashier}', '${dat.depositlimit}', '${dat.withdrawallimit}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletecashierlimitentry('${dat.cashier}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 

const checkcashierlimituserstatus =(result)=>{
        console.log(document.getElementById('cashierlimitlocation'))
        if(document.getElementById('cashierlimitlocation'))document.getElementById('cashierlimitlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('cashierlimitlocation'))document.getElementById('cashierlimitlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('cashierlimitlocation'))document.getElementById('cashierlimitlocation').setAttribute('readonly', true)
    }
}

const checkcashieremail=(value)=>{
    if(checkInputwithdatalist("cashierlimitcashier", "cashieruserlist")){
        document.getElementById('cashierlimitcashiername').value = getLabelFromValue(value, 'cashieruserlist')
    }else{
        document.getElementById('cashierlimitcashiername').value = ''
    }
}


async function opencashierlimit(){

await httpRequest('cashierlimit.php')

jtabledata = document.getElementById('cashierlimittablecontent');
        initializePaginationParams();

cashierlimitid = ''


    function getpermissionsParamsreturnview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsreturnview(), 'fetchuserprofile', null, checkcashierlimituserstatus);
    
    const popuser =(result)=>{
        cashierlimituserdata = result.data;
        if(document.getElementById('cashieruserlist'))document.getElementById('cashieruserlist').innerHTML = `<option value="" selected disabled>Select Marketer</option>`
        if(document.getElementById('cashieruserlist'))document.getElementById('cashieruserlist').innerHTML += result.data.map(dat=>`<option value="${dat.email}">${dat.lastname} ${dat.firstname}</option>`).join('');
    }
    getUsers(popuser)
    
    if(document.getElementById('cashierlimitsubmitbtn'))document.getElementById('cashierlimitsubmitbtn').addEventListener('click', e=>{
        function gtparams(){
        var paramstr = new FormData();
        if(cashierlimitid)paramstr.append('id', cashierlimitid);
        paramstr.append('cashier', document.getElementById('cashierlimitcashier').value);
        paramstr.append('depositlimit', document.getElementById('cashierlimitdepositlimit').value);
        paramstr.append('withdrawallimit', document.getElementById('cashierlimitwithdrawallimit').value);
            return paramstr;
        };
        callController('cashierlimitscript.php', gtparams(), 'Cashierlimitscript', ['cashierlimitcashier', 'cashierlimitdepositlimit', 'cashierlimitwithdrawallimit'], resetPage)
        
    })
    
    setTimeout(()=>{
    callController('fetchcashierlimit.php', null, 'fetchcashierlimit', null, populatecashierlimittable)
        
    },2000)
    
}


var cashierlimit = document.getElementById("cashierlimit")
if(cashierlimit)cashierlimit.addEventListener('click',opencashierlimit,false)



var commissioncategoriesorehistory_datasource = [];
let commissioncategoriesid

const populatecommissioncategoriestable=(result)=>{
    commissioncategoriesorehistory_datasource = [];
    if(!result.data)return callModal('No data to display..')
    commissioncategoriesorehistory_datasource = result.data;
    console.log('commissioncategoriesorehistory_datasource', commissioncategoriesorehistory_datasource)
    initPagination(commissioncategoriesorehistory_datasource, commissioncategoriesorehistoryorehistorysetCurrentPage);
    document.getElementById('commissioncategories2orehistorytablecontent').innerHTML = commissioncategoriesorehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.commission} </td>
                                <td> ${dat.rangeofpropertyvalue} </td>
                            </tr>`)
    }).join('')
    }
    
var commissioncategoriesorehistoryorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(commissioncategoriesorehistory_datasource.length) {
        commissioncategoriesorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendcommissioncategoriesorehistoryorehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("commissioncategoriesorehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

    const commissioncategoryrun=(result)=>{
        
        callController('fetchcommissioncategory.php', null, 'fetchcommissioncategory', [], populatecommissioncategoriestable);
    }
const deletestockcommissioncategoriesentry=(id)=>{
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removecommissioncategory.php', parammm(), 'removecommissioncategory', null, commissioncategoryrun)
}

const commissioncategoryedit =(id,commission,range)=>{
        document.getElementById('commissioncategoriescommission').value = commission;
        document.getElementById('commissioncategoriesstartrange').value = range.split('-')[0];
        document.getElementById('commissioncategoriesendrange').value = range.split('-')[1];
        commissioncategoriesid = id;
}

function appendcommissioncategoriesorehistoryorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("commissioncategoriesorehistorytablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.commission} </td>
                                <td> ${dat.rangeofpropertyvalue} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="commissioncategoryedit('${dat.id}', '${dat.commission}', '${dat.rangeofpropertyvalue}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletestockcommissioncategoriesentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 


// const checkcommissioncategoriesuserstatus =(result)=>{
//         console.log(document.getElementById('commissioncategorieslocation'))
//         if(document.getElementById('commissioncategorieslocation'))document.getElementById('commissioncategorieslocation').value = result.location_id;
//     if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
//         if(document.getElementById('commissioncategorieslocation'))document.getElementById('commissioncategorieslocation').setAttribute('readonly', false);
//     }else{
//         if(document.getElementById('commissioncategorieslocation'))document.getElementById('commissioncategorieslocation').setAttribute('readonly', true)
//     }
// }



async function commissioncategories () {
    await httpRequest('commissioncategories.php', 'override');
    commissioncategoriesid= ''
    
      jtabledata = document.getElementById('commissioncategoriesorehistorytablecontent');
        initializePaginationParams();
    
    if(document.getElementById('commissioncategoriesfetchview'))document.getElementById('commissioncategoriesfetchview').addEventListener('click', e=>{
        function paramscommissioncategories(){
        var paramstr = new FormData();
        if(commissioncategoriesid)paramstr.append('id', commissioncategoriesid);
        commissioncategoriesid = ''
        paramstr.append('commission', document.getElementById('commissioncategoriescommission').value);
        paramstr.append('rangeofpropertyvalue', `${String(document.getElementById('commissioncategoriesstartrange').value)}-${String(document.getElementById('commissioncategoriesendrange').value)}`);
        return paramstr;
        };
        
        callController('commissioncategoryscript.php', paramscommissioncategories(), 'commissioncategoryscript', ['commissioncategoriescommission', 'commissioncategoriesstartrange', 'commissioncategoriesendrange'], commissioncategoryrun);
    })
        callController('fetchcommissioncategory.php', null, 'fetchcommissioncategory', [], populatecommissioncategoriestable);
    
    // if(document.getElementById('commissioncategorieslocation'))document.getElementById('commissioncategorieslocation').innerHTML = `<option value="" disabled>Select Item</option>`
    // if(document.getElementById('commissioncategorieslocation'))document.getElementById('commissioncategorieslocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
        // function getpermissionsParamscommissioncategories(){
    // var paramstr = new FormData();
    // paramstr.append('email', document.getElementById('indexEmail').value);
    //     return paramstr;
    // };
    // callController('fetchuserprofile.php', getpermissionsParamscommissioncategories(), 'fetchuserprofile', null, checkcommissioncategoriesuserstatus);
    
      if(document.getElementById('viewcommissioncategoriesexport'))document.getElementById('viewcommissioncategoriesexport').addEventListener('click',e=>{
            tableToExcel('commissioncategoriesoretable2', 'LIST OF RETURNS')},false);
        if(document.getElementById('viewcommissioncategoriesprint'))document.getElementById('viewcommissioncategoriesprint').addEventListener('click',e=>{
            printContent('LIST OF RETURNS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'commissioncategoriesorefulltableparant')},false);


}

var commissioncategoriesNav = document.getElementById("commissioncategories");
if (commissioncategoriesNav) commissioncategoriesNav.addEventListener("click", commissioncategories, false);



let registrationslipnofetchdata;
async function openRegistrationSlipNo(){
'use strict';

await httpRequest('registrationslipno.php')


    
    
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
	

// Select all tab links
    const tabs = document.querySelectorAll('.tab-link');
    // Select all tab contents
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');

            // Remove 'current' class from all tabs
            tabs.forEach(function(item) {
                item.classList.remove('current');
            });

            // Hide all tab contents
            contents.forEach(function(content) {
                content.classList.remove('current');
            });

            // Add 'current' class to the clicked tab
            this.classList.add('current');

            // Show the corresponding tab content
            document.getElementById(target).classList.add('current');
        });
    });

	
	
	
// 	async function fetchSlipNumber(cb=null) {
//     let result = await fetchRequest('../controllers/fetchslipnumberscript.php');
//     if(result) {
//         let parseResult = JSON.parse(result);
//         if(parseResult.message.includes('Successful') && parseResult.result.includes('Successful')){
//           slipnumbers = parseResult.data.data;
//           console.log('slipnumbers',slipnumbers);
//           cb();
//         }
//     }
// }

// fetchSlipNumber();







  function getSlipNumbers(){
    const requestItem = getAjaxObject();
    
    requestItem.open('POST','../controllers/fetchslipnumberscript.php',true);
    
    requestItem.onreadystatechange = function(){
       
       if(requestItem.readyState == 4 && requestItem.status == 200){
           
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('fetchSlipNumbers ', result);
            const arrayOfSlipNumber = result.data.data;
            registrationslipnofetchdata = arrayOfSlipNumber
            // console.log('--yeah----',registrationslipnofetchdata)
            renderSlipNumberTable();
            
            let arrayOfAccStr  = registrationslipnofetchdata.map(each=>{
             return`
             <option value=${each.accountnumber}>
             `
         });
         
         if(document.getElementById('allaccounts')){
             console.log(document.getElementById('allaccounts'))
            document.getElementById('allaccounts').innerHTML =  arrayOfAccStr.join(' ')
         }
            
        }
       else{
        //   console.log("not success ",requestItem)
       }
    };
    
    requestItem.setRequestHeader('Connection','close');
    requestItem.send();
}

getSlipNumbers()

function action(result){
    console.log(result)
    if(result.status){
        document.getElementById('resolvedslipnumbertabledata').innerHTML = result.data.map((item, index)=>`
            <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ formatDate(item.requestdate) } </td>
                    <td> ${ item.accountnumber } </td>
                    <td> ${ item.accountname } </td>
                    <td> ${ item.complaint } </td>
                    <td> ${ item.serialnumber??'' } </td>
                    <td> ${ item.serialnumberedited??'' } </td>
                </tr>
        `).join('');
    }else callModal('No Resolved data found')
}

callController('fetchresolvedserialcomplaint.php', null, 'fetchresolvedserialcomplaint', null, action)

const filterInput = document.getElementById('accountNumberFilter');
    const tableBody = document.getElementById('resolvedslipnumbertabledata');

    // Add an input event listener to the filter
    filterInput.addEventListener('input', function() {
        const filterValue = filterInput.value.toLowerCase();

        // Select all rows in the table body
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const accountNumberCell = row.cells[2]; // Account Number column (3rd column, index starts at 0)
            if (accountNumberCell) {
                const accountNumber = accountNumberCell.textContent.toLowerCase();
                if (accountNumber.includes(filterValue)) {
                    row.style.display = ''; // Show row
                } else {
                    row.style.display = 'none'; // Hide row
                }
            }
        });
    });




//  registrationslipnofetchdata = [{accountnumber:423743723223, serialfrom:2333, serialto:5555},
// {accountnumber:423743723223, serialfrom:2333, serialto:5555},
// {accountnumber:423743723223, serialfrom:2333, serialto:5555},
// {accountnumber:423743723223, serialfrom:2333, serialto:5555},
// {accountnumber:423743723223, serialfrom:2333, serialto:5555}];

// registrationslipnomodal = document.querySelector(".matmodal");


// if(document.querySelector(".matcancelmodal"))document.querySelector(".matcancelmodal").addEventListener('click',function(){
//     console.log("work oo work oo");
//      registrationslipnomodal.classList.add('matmodalhidde');
// });

 
let jtabledata = document.getElementById('registeredslipnumbertabledata');


function renderSlipNumberTable() {
    if(jtabledata) jtabledata.innerHTML = '';
    if(registrationslipnofetchdata.length){
        registrationslipnofetchdata.map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.accountnumber } </td>
                    <td> ${ item.serialnumberfrom } </td>
                    <td> ${ item.serialnumberto } </td>
                   
                </tr>
            `;
        });
        
    }
}



// const arrayBtns = document.querySelectorAll(".viewbtn");
// for(let i = 0; i < arrayBtns.length; i++){
//     arrayBtns[i].addEventListener('click',function(){
//         matopenModal(fetchdata[i]);
//     });
// }

	function validateRegistrationSlipNo(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var matRegistrationSlipNoaccnumber = document.getElementById('matregistrationslipnoaccnumber');
	    var matRisgistrationSlipNoSerialFrom= document.getElementById('matregistrationslipnoserialnumberfrom');
	    var matRisgistrationSlipNoSerialTo= document.getElementById('matregistrationslipnoserialnumberto');
	   // var matRisgistrationSlipNoAc= document.getElementById('matregistrationslipnoac');
		
		
		
		
		
		if(matRegistrationSlipNoaccnumber.value.length < 1){
			mssg += 'Account Number is Invalid <br />';			
			matRegistrationSlipNoaccnumber.style.borderColor = 'red';
			flag = 0;
		}else{
			matRegistrationSlipNoaccnumber.style.borderColor = 'lightgray';
		}
		
		if(matRisgistrationSlipNoSerialFrom.value.length < 1){
			mssg += 'Serial Number From is Invalid <br />';			
			matRisgistrationSlipNoSerialFrom.style.borderColor = 'red';
			flag = 0;
		}else{
			matRisgistrationSlipNoSerialFrom.style.borderColor = 'lightgray';
		}
		
		if(matRisgistrationSlipNoSerialTo.value.length < 1){
			mssg += 'Serial Number To is Invalid <br />';			
			matRisgistrationSlipNoSerialTo.style.borderColor = 'red';
			flag = 0;
		}
		else if(Number(matRisgistrationSlipNoSerialFrom.value) > Number(matRisgistrationSlipNoSerialTo.value)){
			mssg += 'Serial Number To must be greater than Serial Number From  <br />';			
			matRisgistrationSlipNoSerialTo.style.borderColor = 'red';
			matRisgistrationSlipNoSerialFrom.style.borderColor = 'red';
			flag = 0;
		}
		else{
			matRisgistrationSlipNoSerialTo.style.borderColor = 'lightgray';
		}
		
// 		if(matRisgistrationSlipNoAc.value.length < 1){
// 			mssg += 'AC is Invalid <br />';			
// 			matRisgistrationSlipNoAc.style.borderColor = 'red';
// 			flag = 0;
// 		}else{
// 			matRisgistrationSlipNoAc.style.borderColor = 'lightgray';
// 		}
		
		
		
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				matRegistrationSlipNoaccnumber.style.borderColor = 'lightgray';
				matRisgistrationSlipNoSerialFrom.style.borderColor = 'lightgray';
				matRisgistrationSlipNoSerialTo.style.borderColor = 'lightgray';
			 //   matRisgistrationSlipNoAc.style.borderColor = 'lightgray';
			

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getRegistrationSlipNoParams(){
		var paramstr = new FormData();
	 		
		paramstr.append('accountnumber',document.getElementById('matregistrationslipnoaccnumber').value);
		paramstr.append('id',document.getElementById('reviewslipid').value);
		paramstr.append('serialnumberedited',document.getElementById('slipnoserialnumberfrom').value);
		paramstr.append('serialnumberfrom',document.getElementById('matregistrationslipnoserialnumberfrom').value);
		paramstr.append('serialnumberto',document.getElementById('matregistrationslipnoserialnumberto').value);
		for (var pair of paramstr.entries()) {
               console.log(pair[0] + ', ' + pair[1] + ', '); 
            }
	   return paramstr;

	}

var saveRegistrationSlipno = function(e){
        showSpinner();
        /*if(!validateRegistrationSlipNo()){ 
            hideSpinner();
            return; 
        }*/
        
        var request = getAjaxObject();
        
        request.open('POST','../controllers/slipnumbersscript.php',true);
        request.onreadystatechange = function(){
            if(request.readyState == 1){
                
            }
            if(request.readyState == 4 && request.status == 200){
                console.log('request.responseText', request.responseText)
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
                    openRegistrationSlipNo()
                    
                }else{
                    stat = 0;
                }
                callModal(result.message, stat);
               
            }
            
            else{
                hideSpinner();
                
                
                //document.getElementById('loader').style.display = 'none';
                //sf = '<b>Error getting data</b>';
            }
    
            e.stopPropagation();
        };
    
    
        
        request.setRequestHeader('Connection','close');
        request.send(getRegistrationSlipNoParams());
    
    };

if(document.getElementById('matregistrationslipnosubmitbtn'))document.getElementById('matregistrationslipnosubmitbtn').addEventListener('click',saveRegistrationSlipno,false);

}

// function registeredSlipNoOpenModal(itemid){
//     let obj = registrationslipnofetchdata[+itemid]
//     registrationslipnomodal.classList.remove('matmodalhidde');
//     console.log(obj);
//     document.getElementById("modalaccountnumber").value= obj.accountnumber;
//     document.getElementById("modalserialnumberfrom").value= obj.serialfrom;
//     document.getElementById("modalserialnumberto").value= obj.serialto;
// }

var registrationSlipNo = document.getElementById('registrationslipno')
if(registrationSlipNo)registrationSlipNo.addEventListener('click', openRegistrationSlipNo, false)



let marketerstargetid;
var marketerstargetorehistory_datasource = [];

const populatemarketerstargettable=(result)=>{
    marketerstargetorehistory_datasource = [];
    marketerstargetorehistory_datasource = result.data.data;
    console.log('marketerstargetorehistory_datasource', marketerstargetorehistory_datasource)
    initPagination(marketerstargetorehistory_datasource, marketerstargetsetCurrentPage);
    document.getElementById('marketerstargettablecontent2').innerHTML = marketerstargetorehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLocationById(dat.location) ? getLocationById(dat.location) : '-'} </td>
                                <td> ${getthegroup(dat.groupid, 'marketerstargetmarketers')} </td>
                                <td> ${dat.target} </td>
                                <td> ${dat.startperiod} </td>
                                <td> ${dat.endperiod} </td>
                            </tr>`)
    }).join('')
    }
    
var marketerstargetsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(marketerstargetorehistory_datasource.length) {
        marketerstargetorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                markettablerowTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("returnvieworehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletemarketerstargetentry=(id)=>{
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removemarketertarget.php', parammm(), 'removemarketertarget', null, resetPage)
}

const editmarketerstarget=(id, location, marketers, target, startperiod, endperiod)=>{
    marketerstargetid = id;
    document.getElementById('marketerstargetlocation').value = location;
    document.getElementById('marketerstargettarget').value = target;
    document.getElementById('marketerstargetstartdate').value = startperiod;
    document.getElementById('marketerstargetenddate').value = endperiod;
    document.getElementById('marketerstargetmarketers').value = marketers;
    document.getElementById('marketerstargetsubmitbtn').textContent = 'Update'
}

function markettablerowTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("marketerstargettablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLocationById(dat.location)} </td>
                                <td> ${getthegroup(dat.groupid, 'marketerstargetmarketers')} </td>
                                <td> ${dat.target} </td>
                                <td> ${dat.startperiod} </td>
                                <td> ${dat.endperiod} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="editmarketerstarget(${dat.id}, ${dat.location}, ${dat.groupid}, ${dat.target}, '${dat.startperiod}', '${dat.endperiod}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletemarketerstargetentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 

const checkmarketerstargetuserstatus =(result)=>{
        console.log(document.getElementById('marketerstargetlocation'))
        if(document.getElementById('marketerstargetlocation'))document.getElementById('marketerstargetlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('marketerstargetlocation'))document.getElementById('marketerstargetlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('marketerstargetlocation'))document.getElementById('marketerstargetlocation').setAttribute('readonly', true)
    }
}


async function openmarketersTarget(){

await httpRequest('marketerstarget.php')

jtabledata = document.getElementById('marketerstargettablecontent');
        initializePaginationParams();

marketerstargetid = ''


    if(document.getElementById('marketerstargetlocation'))document.getElementById('marketerstargetlocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('marketerstargetlocation'))document.getElementById('marketerstargetlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    function getpermissionsParamsreturnview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsreturnview(), 'fetchuserprofile', null, checkmarketerstargetuserstatus);
    
    // const popuser =(result)=>{
    //     if(document.getElementById('marketerstargetusers'))document.getElementById('marketerstargetusers').innerHTML = `<option value="" selected disabled>Select Marketer</option>`
    //     if(document.getElementById('marketerstargetusers'))document.getElementById('marketerstargetusers').innerHTML += result.data.map(dat=>`<option value="${dat.email}">${dat.lastname} ${dat.firstname}</option>`).join('');
    // }
    // getUsers(popuser)
    const popmarketers =(result)=>{
        if(document.getElementById('marketerstargetmarketers'))document.getElementById('marketerstargetmarketers').innerHTML = `<option value="" selected disabled>Select Group</option>`
        if(document.getElementById('marketerstargetmarketers'))document.getElementById('marketerstargetmarketers').innerHTML += result.data.data.map(dat=>`<option value="${dat.id}"> ${dat.groupname.toUpperCase()} </option>`).join('');
    }
    getGroup(popmarketers)
    
    if(document.getElementById('marketerstargetsubmitbtn'))document.getElementById('marketerstargetsubmitbtn').addEventListener('click', e=>{
        function gtparams(){
        var paramstr = new FormData();
        if(marketerstargetid)paramstr.append('id', marketerstargetid);
        paramstr.append('location', document.getElementById('marketerstargetlocation').value);
        paramstr.append('target', document.getElementById('marketerstargettarget').value);
        paramstr.append('startperiod', document.getElementById('marketerstargetstartdate').value);
        paramstr.append('endperiod', document.getElementById('marketerstargetenddate').value);
        paramstr.append('groupid', document.getElementById('marketerstargetmarketers').value);
            return paramstr;
        };
        callController('marketerstargetscript.php', gtparams(), 'marketerstargetscript', ['marketerstargetlocation', 'marketerstargettarget', 'marketerstargetstartdate', 'marketerstargetenddate', 'marketerstargetmarketers'], resetPage)
        
    })
    
    setTimeout(()=>{
    callController('fetchmarketertarget.php', null, 'fetchmarketerstarget', null, populatemarketerstargettable)
        
    },2000)
    
    if(document.getElementById('marketerstargetexport'))document.getElementById('marketerstargetexport').addEventListener('click',e=>{
            tableToExcel('marketerstargetoretable2', 'LIST OF MARKETERS TARGET')},false);
        if(document.getElementById('marketerstargetprint'))document.getElementById('marketerstargetprint').addEventListener('click',e=>{
            printContent('LIST OF MARKETERS TARGET',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'marketerstargetorefulltableparant')},false);

}


var marketersTarget = document.getElementById("marketerstarget")
if(marketersTarget)marketersTarget.addEventListener('click',openmarketersTarget,false)





let programrejectedfetchdata, rejecttransationlocation;
let programrejectid 
var rtdrowPerPage = 10;
// rejecttransactiondate =rtd
var rtdinitpagination={
    rtdmatstart:0,
    rtdmatend:rtdrowPerPage
}
var rtdpaginationstate = {...rtdinitpagination};
const preogramrejectlocation =(result)=>{
        console.log(document.getElementById('matrejectedtransactiondatelocations'))
        if(document.getElementById('matrejectedtransactiondatelocations'))document.getElementById('matrejectedtransactiondatelocations').value = result.location_id;
    // if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
    //     if(document.getElementById('matrejectedtransactiondatelocations'))document.getElementById('matrejectedtransactiondatelocations').setAttribute('readonly', true);
    // }else{
    //     if(document.getElementById('matrejectedtransactiondatelocations'))document.getElementById('matrejectedtransactiondatelocations').setAttribute('readonly', true)
    // }
}


async function openProgramRejectedTransactionDate(){
'use strict';

    await httpRequest('programrejectedtransactiondate.php')
    
    callController('fetchrejectdates.php', null, 'fetchrejectdates', null)
    function getpermissionsParamsreturnview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsreturnview(), 'fetchuserprofile', null, preogramrejectlocation);
    
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
                // matlocation=locations
                rejecttransationlocation = locations
                console.log('Location',locations )
          let strLocations = locations.map(each=>{
                 return`
                 <option value=${each.id}> ${each.location} </option>
                 `
             })
              if(  document.getElementById('matrejectedtransactiondatelocations')){
                const headerselect = '<option selected> Select Branch </option> <option value="ALL">All</option>'
                  document.getElementById('matrejectedtransactiondatelocations').innerHTML=  headerselect + strLocations.join(' ')
              }
              
            //  getRegistrationPonits(function(regPoint){renderRegistrationPointTable(regPoint, locations);})
             getRejectDate(rejecttransationlocation)
          }
          else{
            //   console.log("not success ",requestItem)
          }
        };
        
        requestItem.setRequestHeader('Connection','close');
      
        requestItem.send();
    }
    
    getLocations()


    function getRejectDate(locations){
        const requestItem = getAjaxObject();
        requestItem.open('POST','../controllers/fetchrejectdates.php',true);
        requestItem.onreadystatechange = function(){
          if(requestItem.readyState == 4 && requestItem.status == 200){
                const result = JSON.parse(requestItem.responseText);
                console.log('Location', result);
                const rejectdate= result.data.data;
                programrejectedfetchdata = rejectdate 
                renderRejectedTransactionDateTable(rejectdate, locations);
          }
          else{
              console.log("not success ",requestItem)
          }
        };
        requestItem.setRequestHeader('Connection','close');
        requestItem.send();
    }
    
rejecttransactionnext.addEventListener("click", function () {
    if (rtdpaginationstate.rtdmatend >= programrejectedfetchdata.length) {
    return;
    }
    rtdpaginationstate.rtdmatstart = rtdpaginationstate.rtdmatend;
    rtdpaginationstate.rtdmatend += rtdrowPerPage;
    renderRejectedTransactionDateTable(programrejectedfetchdata,rejecttransationlocation)
 
    
    
});

rejecttransactionprev.addEventListener("click", function () {
//   console.log("next Click");
  if (rtdpaginationstate.rtdmatstart < 1) {
    return;
  }
  rtdpaginationstate.rtdmatstart -= rtdrowPerPage;
  rtdpaginationstate.rtdmatend -= rtdrowPerPage;
  renderRejectedTransactionDateTable(programrejectedfetchdata,rejecttransationlocation)

});

    
    
    
    
    
    

	function validateRejectedTransaction(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var matRejectedTransactionDate = document.getElementById('matrejectedtransactiondate');
		var matRejectedTransactionLocations = document.getElementById('matrejectedtransactiondatelocations');

		if(matRejectedTransactionDate.value.length < 1){
			mssg += 'Rejected date  is Invalid <br />';			
			matRejectedTransactionDate.style.borderColor = 'red';
			flag =0;
		}
		else{
			matRejectedTransactionDate.style.borderColor = 'lightgray';
		}
		
		if(matRejectedTransactionLocations.value.length < 1){
			mssg += 'Location is Invalid <br />';			
			 matRejectedTransactionLocations.style.borderColor = 'red';
			flag =0;
		}else{
			 matRejectedTransactionLocations.style.borderColor = 'lightgray';
		}
		
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				matRejectedTransactionDate.style.borderColor = 'lightgray';
				matRejectedTransactionLocations.style.borderColor = 'lightgray';
				// matRejectedTransactionOfficeBranch.style.borderColor = 'lightgray';
			

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getRejectedTransactionParams(state){
		var paramstr = new FormData();
		if(programrejectid)paramstr.append('id',programrejectid);
		paramstr.append('location_id',document.getElementById('matrejectedtransactiondatelocations').value);
		if(!state)paramstr.append('rejectdate',document.getElementById('matrejectedtransactiondate').value);
	    
	    for (var pair of paramstr.entries()) {
               console.log(pair[0] + ', ' + pair[1] + ', '); 
            }
	   return paramstr;
	}


var	saveRejectedTransaction= function(e, state){
    if(state && !window.confirm(`Are you sure you want to ${state} all location`))return
		showSpinner();
		if(!validateRejectedTransaction()){ 
		    hideSpinner();
			return; 
		}
		var request = getAjaxObject();
		request.open('POST',`../controllers/${!state ? 'rejectdatescript.php' : state == 'block' ? 'blocklocations.php' : 'unblocklocations.php'}`,true);
		request.onreadystatechange = function(){
			if(request.readyState == 1){
			}
			if(request.readyState == 4 && request.status == 200){
			     console.log('request.responseText', request.responseText);
			     let result = JSON.parse(request.responseText);
			     console.log('result', result);
			     getRejectDate(rejecttransationlocation)
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
			     callModal(result.message, stat)
			}
			else{
			 hideSpinner();
			}
			e.stopPropagation();
		 };
		request.setRequestHeader('Connection','close');
		request.send(getRejectedTransactionParams(state));
	};

if(document.getElementById('matrejectedtransactiondatesubmitbtn'))document.getElementById('matrejectedtransactiondatesubmitbtn').addEventListener('click',saveRejectedTransaction,false);
if(document.getElementById('matrejectedtransactiondatesubmitbtnblock'))document.getElementById('matrejectedtransactiondatesubmitbtnblock').addEventListener('click',e=>saveRejectedTransaction(e,'block'),false);
if(document.getElementById('matrejectedtransactiondatesubmitbtnunblock'))document.getElementById('matrejectedtransactiondatesubmitbtnunblock').addEventListener('click',e=>saveRejectedTransaction(e,'unblock'),false);

}


function editProgramRejected(itemid){
    programrejectid = itemid;
    const obj = programrejectedfetchdata.find(each => each.id == itemid)
    document.getElementById("matrejectedtransactiondate").value= obj.rejectdate;
    const selected = rejecttransationlocation.filter(each => { 
        return each.id == obj.location})[0]?.id;
    document.getElementById("matrejectedtransactiondatelocations").value= !selected ? 'ALL' : selected;
    document.getElementById("matrejectedtransactiondatesubmitbtn").textContent = 'Update';
}


function deleteProgramRejected(itemid){
    console.log(itemid)
    let newprogramrejectedfetchdata = programrejectedfetchdata.filter((item, index)=> +item.id !== itemid )
    programrejectedfetchdata = newprogramrejectedfetchdata 
    renderRejectedTransactionDateTable(newprogramrejectedfetchdata, rejecttransationlocation)
}

function renderRejectedTransactionDateTable(fetchrejectdate, fetchalllocation ) {
    programrejectedfetchdata = fetchrejectdate
    rejectTransactionindexBtnDisplay(programrejectedfetchdata)
    //  console.log("locations from callback 2", fetchalllocation[0]);
    const getLocation = (id) => fetchalllocation.find(el=>{ 
        return el.id == id})?.location ?? "ALL"
    let jtabledata = document.getElementById('rejectedtransactiondatetabledata');
    if(jtabledata) jtabledata.innerHTML = '';
    if(programrejectedfetchdata.length){
        programrejectedfetchdata.slice(rtdpaginationstate.rtdmatstart, rtdpaginationstate.rtdmatend).map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.rejectdate } </td>
                    <td> ${ getLocation(item.location)  } </td>
                    <td class="btncolumn">
                         <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editProgramRejected(${item.id})" >Edit</span>&nbsp &nbsp
                          <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deleteProgramRejected(${item.id})" >Delete</span>
                    </td>
                </tr>
            `;
        });
    }
      
  rejectTransactionHandleBtnColor()
}

const rejectTransactionindexBtnDisplay = (data) => {
    let rtdarrayLength = data.length
    if( rtdarrayLength <  rtdrowPerPage){
         rtdrowPerPage = rtdarrayLength
    }else{
        rtdrowPerPage = 10
    }
  const rtdlengthOfBtn = Math.ceil(rtdarrayLength / rtdrowPerPage);
  const rtdarrayOfButton =Array(rtdlengthOfBtn).fill().map((each,index)=> {
      return `<button  onclick="rejectTransactionIndexBtnClick(${index+1})" class="pagbtn rejecttransactionpagnumber" id="${index+1}" >${index+1}</button>`
  } )
//   console.log(arrayOfButton)
   document.getElementById('rejecttransactionindexBtn').innerHTML = rtdarrayOfButton.join(" ");
};

function rejectTransactionIndexBtnClick(i) {
    rtdpaginationstate.rtdmatstart = (i-1) * rtdrowPerPage;
 
    rtdpaginationstate.rtdmatend = rtdpaginationstate.rtdmatstart + rtdrowPerPage;
//   console.log(start, end)
    renderRejectedTransactionDateTable(programrejectedfetchdata,rejecttransationlocation)
}

function rejectTransactionHandleBtnColor(){
    console.log(paginationstate.matend/rowPerPage)
    document.querySelectorAll('.rejecttransactionpagnumber').forEach(each=>{
        if(+each.id  == (rtdpaginationstate.rtdmatend/rtdrowPerPage)){
            console.log(each)
            each.classList.add('pagicolor')
            console.log(each)
        }
        each.style.background ='#0000FF';
    })
}



var programRejectedTransactionDate = document.getElementById('programrejectedtransactiondate');
if(programRejectedTransactionDate) programRejectedTransactionDate.addEventListener('click',openProgramRejectedTransactionDate, false);




let grouptargetid;
var grouptargetorehistory_datasource = [];

const populategrouptargettable=(result)=>{
    grouptargetorehistory_datasource = [];
    grouptargetorehistory_datasource = result.data;
    console.log('grouptargetorehistory_datasource', grouptargetorehistory_datasource)
    initPagination(grouptargetorehistory_datasource, grouptargetsetCurrentPage);
    document.getElementById('grouptargettablecontent2').innerHTML = grouptargetorehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLocationById(dat.location)} </td>
                                <td> ${getthegroup(dat.groupid, 'grouptargetgroup')} </td>
                                <td> ${dat.target} </td>
                                <td> ${dat.startperiod} </td>
                                <td> ${dat.endperiod} </td>
                            </tr>`)
    }).join('')
    }
    
var grouptargetsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(grouptargetorehistory_datasource.length) {
        grouptargetorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                gruoptablerowTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("returnvieworehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletegrouptargetentry=(id)=>{
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removegrouptarget.php', parammm(), 'removegrouptarget', null, resetPage)
}

const editgrouptarget=(id, location, group, target, startperiod, endperiod)=>{
    grouptargetid = id;
    document.getElementById('grouptargetlocation').value = location;
    document.getElementById('grouptargettarget').value = target;
    document.getElementById('grouptargetstartdate').value = startperiod;
    document.getElementById('grouptargetenddate').value = endperiod;
    document.getElementById('grouptargetgroup').value = group;
    document.getElementById('grouptargetsubmitbtn').textContent = 'Update'
}

function gruoptablerowTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("grouptargettablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLocationById(dat.location)} </td>
                                <td> ${getthegroup(dat.groupid, 'grouptargetgroup')} </td>
                                <td> ${dat.target} </td>
                                <td> ${dat.startperiod} </td>
                                <td> ${dat.endperiod} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="editgrouptarget(${dat.id}, ${dat.location}, ${dat.groupid}, ${dat.target}, '${dat.startperiod}', '${dat.endperiod}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletegrouptargetentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 

const checkgrouptargetuserstatus =(result)=>{
        console.log(document.getElementById('grouptargetlocation'))
        if(document.getElementById('grouptargetlocation'))document.getElementById('grouptargetlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('grouptargetlocation'))document.getElementById('grouptargetlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('grouptargetlocation'))document.getElementById('grouptargetlocation').setAttribute('readonly', true)
    }
}


async function opengroupTarget(){

await httpRequest('grouptarget.php')

jtabledata = document.getElementById('grouptargettablecontent');
        initializePaginationParams();

grouptargetid = ''


    if(document.getElementById('grouptargetlocation'))document.getElementById('grouptargetlocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('grouptargetlocation'))document.getElementById('grouptargetlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    function getpermissionsParamsreturnview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsreturnview(), 'fetchuserprofile', null, checkgrouptargetuserstatus);
    
    // const popuser =(result)=>{
    //     if(document.getElementById('grouptargetusers'))document.getElementById('grouptargetusers').innerHTML = `<option value="" selected disabled>Select Marketer</option>`
    //     if(document.getElementById('grouptargetusers'))document.getElementById('grouptargetusers').innerHTML += result.data.map(dat=>`<option value="${dat.email}">${dat.lastname} ${dat.firstname}</option>`).join('');
    // }
    // getUsers(popuser)
    const popgroup =(result)=>{
        if(document.getElementById('grouptargetgroup'))document.getElementById('grouptargetgroup').innerHTML = `<option value="" selected disabled>Select Group</option>`
        if(document.getElementById('grouptargetgroup'))document.getElementById('grouptargetgroup').innerHTML += result.data.data.map(dat=>`<option value="${dat.id}"> ${dat.groupname.toUpperCase()} </option>`).join('');
    }
    getGroup(popgroup)
    
    if(document.getElementById('grouptargetsubmitbtn'))document.getElementById('grouptargetsubmitbtn').addEventListener('click', e=>{
        function gtparams(){
        var paramstr = new FormData();
        if(grouptargetid)paramstr.append('id', grouptargetid);
        paramstr.append('location', document.getElementById('grouptargetlocation').value);
        paramstr.append('target', document.getElementById('grouptargettarget').value);
        paramstr.append('startperiod', document.getElementById('grouptargetstartdate').value);
        paramstr.append('endperiod', document.getElementById('grouptargetenddate').value);
        paramstr.append('groupid', document.getElementById('grouptargetgroup').value);
            return paramstr;
        };
        callController('grouptargetscript.php', gtparams(), 'grouptargetscript', ['grouptargetlocation', 'grouptargettarget', 'grouptargetstartdate', 'grouptargetenddate', 'grouptargetgroup'], resetPage)
        
    })
    
    setTimeout(()=>{
    callController('fetchgroupptarget.php', null, 'fetchgroupptarget', null, populategrouptargettable)
        
    },2000)
    
    if(document.getElementById('grouptargetexport'))document.getElementById('grouptargetexport').addEventListener('click',e=>{
            tableToExcel('grouptargetoretable2', 'LIST OF GROUP TARGET')},false);
        if(document.getElementById('grouptargetprint'))document.getElementById('grouptargetprint').addEventListener('click',e=>{
            printContent('LIST OF GROUP TARGET',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'grouptargetorefulltableparant')},false);

}


var groupTarget = document.getElementById("grouptarget")
if(groupTarget)groupTarget.addEventListener('click',opengroupTarget,false)



async function openSupplyBooklet() {
    await httpRequest('supplybooklets.php')
    form = document.getElementById('supplybookletform')
    if(form) {
        
        if(form.querySelector('button')) form.querySelector('button').addEventListener('click', validateSupplyBookletForm)
        
        let paginationLimit = 20;
        datasource = []
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(viewSupplyBookletsetCurrentPage)
        
        let paginationLimitInput = document.getElementById('pagination-limit')
        if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
        
        async function setNewPaginationContext(e) {
            if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
            paginationLimit = +e.value;
            pageCount = Math.ceil(datasource.length / paginationLimit);
            await viewSupplyBookletsetCurrentPage(1);
            paginationNumbers.innerHTML = '';
            await getPaginationNumbers();
            await handleActivePageNumber();
            addPaginationButtonEventListeners()
            calPaginationStatus()
        }
        
        function addPaginationButtonEventListeners() {
            document.querySelectorAll(".pagination-number").forEach((button) => {
                const pageIndex = Number(button.getAttribute("page-index"));         
                if (pageIndex)  button.addEventListener("click", () => {viewSupplyBookletsetCurrentPage(pageIndex); calPaginationStatus()});
            });
        }
        
        function viewSupplyBookletsetCurrentPage (pageNum){
            currentPage = pageNum;
            handleActivePageNumber();
            handlePageButtonsStatus();
            prevRange = (pageNum - 1) * paginationLimit;
            currRange = pageNum * paginationLimit;
            if(jtabledata) jtabledata.innerHTML = '';
            if(supplyBooklets.length) {
                supplyBooklets.forEach( (item, index) => {
                    if (index >= prevRange && index < currRange) {
                        appendSupplyBookletTableRows(item, index)
                    }
                })
        
                if(document.querySelector('#supplybooklettable tbody').innerHTML === ''){
                    supplybookletsbtn.click();
                    form.querySelector('button#submit').click();
                }
                
                appendSupplyBookleButtonsEventListener()
        
            }
        }
        
        function appendSupplyBookleButtonsEventListener() {
            Array.from(document.querySelectorAll('#supplybooklettable .edit')).map( button => {
                if(button) button.addEventListener('click', editBookletSupply)
            })
            
            Array.from(document.querySelectorAll('#supplybooklettable .delete')).map( button => {
                if(button) button.addEventListener('click', removeBookletSupply)
            })
        }
        
        async function appendSupplyBookletTableRows(item, index) {
            let locfrom = locationsvar?.find(value => value.id == item.locationfrom )
            let loc = locationsvar?.find(value => value.id == item.location )
            jtabledata.innerHTML += `
                <tr class="source-row-item">
                    <td>${index + 1}</td>
                    <td>${locfrom !== undefined ?  locfrom.location : ''}</td>
                    <td>${loc !== undefined ?  loc.location : ''}</td>
                    <td>${ item.qtyout }</td>
                    <td>${ item.receivedby }</td>
                    <td>
                        <div class="flex no-pr" style="align-items:center">
                            <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" value="${index}" class="edit">Edit</button>
                            <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:tomato;border-radius:3px" value="${index}" class="delete">Delete</button>
                        </div>
                    </td>
                </tr>
            `
        }
        
        
        await fetchSupplyBookletFormData()
        
        function editBookletSupply(e) {
            const selectedItem = supplyBooklets[+e.target.value]
            try {
                console.log(selectedItem)
                form.locationto.value = selectedItem.location
                form.qty.value = selectedItem.qtyout
                form.receivedby.value = selectedItem.receivedby
                form.setAttribute('tref', selectedItem.tref)
                
            } catch(e) {console.log(e) }
        }
        
        function removeBookletSupply() {
            console.log(true)
        }
   
    
        function validateSupplyBookletForm() {
            inputs = [
        /*        { input: document.getElementById('locationfrom'), validation: {required: 'Location From is required'}},*/
                { input: document.getElementById('locationto'), validation: {required: 'Location To is required'}},
                { input: document.getElementById('qty'), validation: {required: 'quantity is required'}},
        /*       { input: document.getElementById('qtyin'), validation: {required: 'quantity received is required'}},
                { input: document.getElementById('qtyout'), validation: {required: 'quantity supplied is required'}},*/
                { input: document.getElementById('receivedby'), validation: {required: 'received by is required'}},
            ]
            
            let validations = [];
        
            inputs.map( (field, index) => {
                let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
                if(result)  validations.push(result) ;  
            })
        
            if(validations.length) validatorMapper(validations)
            else  saveSupplyBooklet()
        }
        
        function saveSupplyBooklet() { 
            showSpinner();
        	var request = getAjaxObject();
            
            request.open('POST','../controllers/bookletstock.php',true);
            
            request.onreadystatechange = function(e){
                if(request.readyState == 4 && request.status == 200){  
                    hideSpinner();
                    if(request.responseText) {
                        
                        let parseRequest = JSON.parse(request.responseText)
                        
                        if(parseRequest.status){
                            callModal('Saved Successfully', 1)
                            document.querySelector('form').reset()
                        }
                        else  return callModal(parseRequest.message, 0)
                        
                    } else  return callModal('Error: Request failed', 0)
                }
                else return hideSpinner();
        
                try{
                    e.stopPropagation();
                }catch(ex){}
            }
        
            
            request.setRequestHeader('Connection','close'); 
            request.send(collectSupplyBookletParams());
        }
        
        function collectSupplyBookletParams() {
            let paramstr = new FormData(document.getElementById('supplybookletform'))
            if(form.getAttribute('tref')) paramstr.append('tref', form.getAttribute('tref'))
            return paramstr;
        }
        
        async function generateSupplyBookletReport(event) {
            event.target.disabled = true;
            let paramstr = new FormData(form)
            let result = await fetch('../controllers/fetchpropertyaccounts.php', {method: 'POST', body: paramstr, headers: new Headers()})
            let res = await result.json();
            if(res.status) {
                event.target.disabled = false;
                properties = datasource = res.data;
                properties.length && initPagination(res.data, propertyAccountsetCurrentPage)
            }
            else {
                if(jtabledata) jtabledata.innerHTML = '';
                event.target.disabled = false;
                callModal(res.message, 0)
            }
        }
        
        async function fetchSupplyBookletFormData() {
            await fetchSupplyBookletLocations()
            //await fetchSupplyBookletReceivers()
            await fetchSupplyBooklet()
        }
        
        async function fetchSupplyBookletReceivers() {
            showSpinner()
            let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
            let res = await result.json();
            if(res.status) {
                hideSpinner()
                let options = '';
                accountofficerslist =  res.data;
                const sortedList = accountofficerslist.sort((a, b) => a.firstname.localeCompare(b.firstname));
                sortedList?.map(function(item, index){
                    options += `
                        <option value="${item.id}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othername ?? '' )} </option>
                    `
                })
                if(form.querySelector('#receivedby')){
                    form.querySelector('#receivedby').innerHTML = '<option value=""> -- Select Receiver -- </option>' + options
                }
            }
            else hideSpinner()
            
        }
        
        async function fetchSupplyBookletLocations() {
            showSpinner()
            let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
            let res = await result.json();
            if(res?.status) {
                hideSpinner()
                let data =  res.data?.data;
                locationsvar = data;
                const sortedList = data.sort((a, b) => a.location.localeCompare(b.location));
                let options = sortedList?.map((item, idex) => `
                        <option value="${item.id}"> ${item.location} </option>
                    `).join('')
                
                if(document.querySelector('#locationto')){
                    //document.querySelector('#locationfrom').innerHTML = ''
                    document.querySelector('#locationto').innerHTML = ''
                    //document.querySelector('#locationfrom').innerHTML = '<option value="" selected="">--Select Location --</option>'+options
                    document.querySelector('#locationto').innerHTML = '<option value="" selected="">--Select Location --</option>'+options
                }
            }else  hideSpinner()
        } 
        
        async function fetchSupplyBooklet() {
            let result = await httpJsonRequest('../controllers/fetchbookletstock.php')
            if(result?.status) {
                supplyBooklets = datasource = result.data;
                document.querySelector('#supplybooklettable tbody').innerHTML = ''
                if(supplyBooklets.length) setNewPaginationContext(paginationLimitInput)
            }
            else {
                if(jtabledata) jtabledata.innerHTML = '';
                callModal(result?.message, 0)
            }
        }
    
    }

} 

var supplybookletsbtn = document.getElementById('supplybooklets')
if(supplybookletsbtn) supplybookletsbtn.addEventListener('click', openSupplyBooklet)



async function openBookletStockHistory() {
    await httpRequest('bookletstockhistory.php')
    form = document.getElementById('filterbookletstockhistoryform')
    if(form) {
        if(form.querySelector('button')) form.querySelector('button').addEventListener('click', generateBookletStockHistory)
        
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(BookletStockHistorysetCurrentPage)
    }
} 


async function generateBookletStockHistory(event) {
    showSpinner();
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/getbookletstockhistory.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner();
        event.target.disabled = false;
        stockhistories = datasource = res.data?.history;
        stockhistories.length && initPagination(res.data?.history, BookletStockHistorysetCurrentPage)
    }
    else {
        hideSpinner();
        if(jtabledata) jtabledata.innerHTML = '';
        event.target.disabled = false;
        callModal(res.message, 0)
    }
}

var BookletStockHistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(stockhistories.length) {
        stockhistories.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendBookletStockTableRows(item, index)
            }
        })
        if(document.querySelector('#bookletstockhistorytable tbody').innerHTML === '') bookletstockhistorybtn.click()
    }
}


async function appendBookletStockTableRows(item, index) {
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${new Date(item.created_at).toLocaleDateString() }</td>
            <td>${ item.accountnumber }</td>
            <td>${ item.qtyin }</td>
            <td>${ item.qtyout }</td>
            <td>${ item.receivedby }</td>
            <td>${ item.balance ?? '' }</td>
        </tr>
    `
} 


var bookletstockhistorybtn = document.getElementById('bookletstockhistory')
if(bookletstockhistorybtn) bookletstockhistorybtn.addEventListener('click', openBookletStockHistory)



// rrr Cash Report --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let marketerregistrationsandrenewals_datasource
async function openmarketerregistrationsandrenewals () {
    await httpRequest('marketerregistrationsandrenewals.php', 'override');
    
    initializePaginationParams()
    
    if(document.getElementById('rrrlocation'))document.getElementById('rrrlocation').innerHTML = `<option value="">--SELECT LOCATION--</option>`
    if(document.getElementById('rrrlocation'))document.getElementById('rrrlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    function param(){
        let pa = new FormData(document.getElementById('filtermarketerregistrationsandrenewalsform'));
        return pa
    }
    if(document.getElementById('submit'))document.getElementById('submit').addEventListener('click', e=>callController('fetchregistrationsbymarketers.php', param(), 'fetchregistrationsbymarketers', null, marketerregistrationsandrenewalstabler))
    
      if(document.getElementById('export-wl'))document.getElementById('export-wl').addEventListener('click',e=>{
            tableToExcel('marketerregistrationsandrenewalstable', 'RRR Transaction Report')},false);
        if(document.getElementById('print-wl'))document.getElementById('print-wl').addEventListener('click',e=>{
            printContent('RRR Transaction Report',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'marketerregistrationsandrenewalstable')},false);

}

const marketerregistrationsandrenewalstabler=(result)=>{
    document.getElementById("jtabledata").innerHTML = ''
    marketerregistrationsandrenewals_datasource = [];
    marketerregistrationsandrenewals_datasource = result.data;
    initPagination(marketerregistrationsandrenewals_datasource, marketerregistrationsandrenewalsorehistorysetCurrentPage);
    }
    
    var marketerregistrationsandrenewalsorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(marketerregistrationsandrenewals_datasource.length) {
        marketerregistrationsandrenewals_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendmarketerregistrationsandrenewalsdatasourceorehistoryTableRows(item, index)
            }
        })
    document.getElementById("jtabledata").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td></td>
                                <td> </td>
                                <td> Total </td>
                                <td> ${marketerregistrationsandrenewals_datasource.reduce((sum, dat)=>{return sum+Number(dat.totalpropertyregistered)}, 0)} </td>
                                <td> ${marketerregistrationsandrenewals_datasource.reduce((sum, dat)=>{return sum+Number(dat.totalrenewals)}, 0)} </td>
                                <td> ${marketerregistrationsandrenewals_datasource.reduce((sum, dat)=>{return sum+Number(dat.totalsavingsregistered)}, 0)} </td>
                            </tr>`
    }
    else {
        document.getElementById("jtabledata").innerHTML=  renderNoTableData()
    }
};

function appendmarketerregistrationsandrenewalsdatasourceorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("jtabledata").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.marketer.firstname} ${dat.marketer.lastname} ${dat.marketer.othernames??''} </td>
                                <td> ${dat.marketer.email} </td>
                                <td> ${dat.totalpropertyregistered} </td>
                                <td> ${dat.totalrenewals} </td>
                                <td> ${dat.totalsavingsregistered} </td>
                            </tr>`
} 



var marketerregistrationsandrenewals = document.getElementById('marketerregistrationsandrenewals')
if(marketerregistrationsandrenewals) marketerregistrationsandrenewals.addEventListener('click', openmarketerregistrationsandrenewals, false);

// VIEW MFA -----------------------------------------------------------------------------------------------------------------------------------------------------

var viewmfaorehistory_datasource = [];

const populateviewmfatable=(result)=>{
    viewmfaorehistory_datasource = [];
    if(!result.data)return callModal('No Task to display')
    viewmfaorehistory_datasource = result.data.sort((a, b) => Number(b.id) - Number(a.id));;
    console.log('viewmfaorehistory_datasource', viewmfaorehistory_datasource)
    initPagination(viewmfaorehistory_datasource, viewmfaorehistoryorehistorysetCurrentPage);
    document.getElementById('viewmfa2orehistorytablecontent').innerHTML = viewmfaorehistory_datasource.map((dat, index)=>{
       return (`
  <tr data-open="false" class="source-row-item">
    <td>${index + 1}</td>
    <td>${dat.user}</td>
    <td>${dat.authcode}</td>
    <td>${dat.currentdate.split(' ')[0]}</td>
    <td>${dat.expiratontime.split(' ')[0]}</td>
    <td>${dat.status}</td>
  </tr>
`);

    }).join('')
    }
    
var viewmfaorehistoryorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewmfaorehistory_datasource.length) {
        viewmfaorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewmfaorehistoryorehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("viewmfaorehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletestockmfaentry=(id)=>{
    const run=(result)=>{
       function paramstaskschedule(){
        var paramstr = new FormData();
        paramstr.append('status', document.getElementById('viewmfastatus').value);
        paramstr.append('startdate', document.getElementById('viewmfastartdate').value);
        paramstr.append('enddate', document.getElementById('viewmfaenddate').value);
            return paramstr;
        };
        
        callController('fetchmfa.php', paramstaskschedule(), 'fetchmfa', ['viewmfaenddate', 'viewmfastartdate'], populateviewmfatable);
    }
    if (confirm("Are you sure you want to delete?")) {
        function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removetaskschedule.php', parammm(), 'removetaskschedule', null, run)
} else {
    return
}

    
}

function appendviewmfaorehistoryorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("viewmfaorehistorytablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
   <td style="text-align: left">${index + 1}</td>
    <td style="text-align: left">${dat.user}</td>
    <td style="text-align: left">${dat.authcode}</td>
    <td style="text-align: left">${formatDateTime(dat.currentdate)}</td>
    <td style="text-align: left">${formatDateTime(dat.expiratontime)}</td>
    <td style="text-align: left">${dat.status}</td>
</tr>`
} 


const checkviewmfauserstatus =(result)=>{
        console.log(document.getElementById('viewmfastatus'))
        if(document.getElementById('viewmfastatus'))document.getElementById('viewmfastatus').value = result.location_id;
    // if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
    //     if(document.getElementById('viewmfastatus'))document.getElementById('viewmfastatus').setAttribute('readonly', false);
    // }else{
        // if(document.getElementById('viewmfastatus'))document.getElementById('viewmfastatus').setAttribute('readonly', true)
    // }
}



async function openviewmfa () {
    await httpRequest('viewmfa.php', 'override');
    
      jtabledata = document.getElementById('viewmfaorehistorytablecontent');
        initializePaginationParams();
    
    if(document.getElementById('viewmfafetchview'))document.getElementById('viewmfafetchview').addEventListener('click', e=>{
        function paramstaskschedule(){
        var paramstr = new FormData();
        paramstr.append('status', document.getElementById('viewmfastatus').value);
        paramstr.append('startdate', document.getElementById('viewmfastartdate').value);
        paramstr.append('enddate', document.getElementById('viewmfaenddate').value);
            return paramstr;
        };
        
        callController('fetchmfa.php', paramstaskschedule(), 'fetchmfa', ['viewmfaenddate', 'viewmfastartdate'], populateviewmfatable);
    })
    
    
    function getpermissionsParamsviewmfa(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsviewmfa(), 'fetchuserprofile', null, checkviewmfauserstatus);
    
      if(document.getElementById('viewmfaexport'))document.getElementById('viewmfaexport').addEventListener('click',e=>{
            tableToExcel('viewmfaoretable2', 'LIST OF RETURNS')},false);
        if(document.getElementById('viewmfaprint'))document.getElementById('viewmfaprint').addEventListener('click',e=>{
            printContent('LIST OF RETURNS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewmfaorefulltableparant')},false);


}

var viewmfaNav = document.getElementById("viewmfa");
if (viewmfaNav) viewmfaNav.addEventListener("click", openviewmfa, false);

// OPEN ADJUST COLLECTION SETTINGS ------------------------------------------------------------------------------------------------------------------------------

async function openadjustcollectionsettings () {
    await httpRequest('adjustcollectionsettings.php', 'override');
    
    
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
                  if(  document.getElementById('location')){
                    const headerselect = '<option selected> Select Location</option> '
                      document.getElementById('location').innerHTML=headerselect + strLocations.join(' ')
                    //   if(document.getElementById('location'))document.getElementById('location').value = result.data.location;
                  }
            
              }
              else{
                //   console.log("not success ",requestItem)
              }
            };
            
            requestItem.setRequestHeader('Connection','close');
          
            requestItem.send();
        }
        
        getLocations();
        
const datetimeInput = document.getElementById('date');

  const now = new Date();

  // Format as YYYY-MM-DDTHH:MM
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const localDatetime = `${year}-${month}-${day}T${hours}:${minutes}`;
  datetimeInput.setAttribute('max', localDatetime);

    function fetchcurrentcollectionsetting() {
    function fetchadjustcollectionsettings(result) {
        if (!result.status) return callModal(result.message, 0);
        callModal(result.message, 1);

        const tableBody = document.getElementById("adjustcollectionsettingstablecontent");
        const data = result.data;

        // Destroy existing DataTable if initialized
        if ($.fn.DataTable.isDataTable("#adjustcollectionsettingstable")) {
            $("#adjustcollectionsettingstable").DataTable().destroy();
        }

        // Clear previous table rows
        tableBody.innerHTML = "";

        // Populate new rows
        data.forEach((item, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>
                    ${item.mode}
                </td>
                <td>
                    ${formatDateTime(item.settingdate)}
                </td>
                <td>
                    ${item.locationname}
                </td>
            `;

            tableBody.appendChild(row);
        });

        // Re-initialize DataTable
        $("#adjustcollectionsettingstable").DataTable({
            paging: true,
            searching: false,
            ordering: true,
            info: true
        });
    }

    callController(
        "fetchcurrentcollectionsetting.php",
        null,
        "fetchcurrentcollectionsetting",
        null,
        fetchadjustcollectionsettings
    );
}

    if(document.getElementById('adjustcollectionsettingssubmit'))document.getElementById('adjustcollectionsettingssubmit').addEventListener('click', e=>{
        function paramstaskschedule(){
        var paramstr = new FormData(document.getElementById('adjustcollectionsettingsform'));
            return paramstr;
        };
        
        function populateadjustcollectionsettingstable(result){
            if(!result.status)return callModal(result.message, 0)
            callModal(result.message, 1)
            fetchcurrentcollectionsetting()
        }
        
        callController('collectionsettingscript.php', paramstaskschedule(), 'collectionsettingscript', ['date', 'location'], populateadjustcollectionsettingstable);
    })
    
    fetchcurrentcollectionsetting()
    
    
}

var adjustcollectionsettingsNav = document.getElementById("adjustcollectionsettings");
if (adjustcollectionsettingsNav) adjustcollectionsettingsNav.addEventListener("click", openadjustcollectionsettings, false);

// OPEN COLLECTION APPROVAL SETTINGS NET -------------------------------------------------------------------------------------------------------------------------

async function opencollectionapprovalsettingsnet () {
    await httpRequest('collectionapprovalsettingsnet.php', 'override');
    
    
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
                  if(  document.getElementById('location')){
                    const headerselect = '<option selected> Select Location</option> '
                      document.getElementById('location').innerHTML=headerselect + strLocations.join(' ')
                    //   if(document.getElementById('location'))document.getElementById('location').value = result.data.location;
                  }
            
              }
              else{
                //   console.log("not success ",requestItem)
              }
            };
            
            requestItem.setRequestHeader('Connection','close');
          
            requestItem.send();
        }
        
        getLocations();
        
const datetimeInput = document.getElementById('date');

  const now = new Date();

  // Format as YYYY-MM-DDTHH:MM
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const localDatetime = `${year}-${month}-${day}T${hours}:${minutes}`;
  datetimeInput.setAttribute('max', localDatetime);

    function fetchcurrentcollectionsetting() {
    function fetchcollectionapprovalsettingsnet(result) {
        if (!result.status) return callModal(result.message, 0);
        callModal(result.message, 1);

        const tableBody = document.getElementById("collectionapprovalsettingsnettablecontent");
        const data = result.data;

        // Destroy existing DataTable if initialized
        if ($.fn.DataTable.isDataTable("#collectionapprovalsettingsnettable")) {
            $("#collectionapprovalsettingsnettable").DataTable().destroy();
        }

        // Clear previous table rows
        tableBody.innerHTML = "";

        // Populate new rows
        data.forEach((item, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>
                    ${item.mode}
                </td>
                <td>
                    ${formatDateTime(item.settingdate)}
                </td>
                <td>
                    ${item.locationname}
                </td>
            `;

            tableBody.appendChild(row);
        });

        // Re-initialize DataTable
        $("#collectionapprovalsettingsnettable").DataTable({
            paging: true,
            searching: false,
            ordering: true,
            info: true
        });
    }

    callController(
        "fetchcollectionapprovalsetting.php",
        null,
        "fetchcollectionapprovalsetting",
        null,
        fetchcollectionapprovalsettingsnet
    );
}

    if(document.getElementById('collectionapprovalsettingsnetsubmit'))document.getElementById('collectionapprovalsettingsnetsubmit').addEventListener('click', e=>{
        function paramstaskschedule(){
        var paramstr = new FormData(document.getElementById('collectionapprovalsettingsnetform'));
            return paramstr;
        };
        
        function populatecollectionapprovalsettingsnettable(result){
            if(!result.status)return callModal(result.message, 0)
            callModal(result.message, 1)
            fetchcurrentcollectionsetting()
        }
        
        callController('collectionapprovalsettingscript.php', paramstaskschedule(), 'collectionapprovalsettingscript', ['date', 'location'], populatecollectionapprovalsettingsnettable);
    })
    
    fetchcurrentcollectionsetting()
    
    
}

var collectionapprovalsettingsnetNav = document.getElementById("collectionapprovalsettingsnet");
if (collectionapprovalsettingsnetNav) collectionapprovalsettingsnetNav.addEventListener("click", opencollectionapprovalsettingsnet, false);