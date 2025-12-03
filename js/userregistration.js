
async function openUserRegistration () {
  'use strict';
  
   await httpRequest('userregistration.php');


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
        var matUserRegUpw = document.getElementById('matuserregpassword');
        var matUserRegLocation = document.getElementById('matuserreglocation');
        var matUserRegConfirmUpw = document.getElementById('matuserregcomfirmupw');
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
    
        if(matUserRegUpw.value.length < 1){
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
        }
    
        if( matUserRegConfirmUpw.value !== matUserRegUpw.value){
            mssg += 'Password does not match <br />';
            matUserRegConfirmUpw.style.borderColor = 'red';
            flag = 0;
          }else{
            matUserRegConfirmUpw.style.borderColor = 'lightgray';
          }
          
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
                matUserRegUpw.style.borderColor = 'lightgray';
                matUserRegAddress.style.borderColor = 'lightgray';
                matUserRegRole.style.borderColor = 'lightgray';
                matUserRegConfirmUpw.style.borderColor = 'lightgray';
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
        paramstr.append('lastname',document.getElementById('matuserreglastname').value);
        paramstr.append('firstname',document.getElementById('matuserregfirstname').value); 
        paramstr.append('othernames',document.getElementById('matuserregothername').value); 
        paramstr.append('upw',document.getElementById('matuserregpassword').value) ;
        paramstr.append('address',document.getElementById('matuserregaddress').value);
        paramstr.append('phone',document.getElementById('matuserregphone').value);
        paramstr.append('email',document.getElementById('matuserregemail').value);
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
               console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
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
                callModal(result.result, stat)
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

