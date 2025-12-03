window.onload = function() {
    window.addEventListener('storage', handleLocalStorageChange);
    resolvePlatformAccess()
}

async function handleLocalStorageChange(e) {
    if(e.key === 'htgidentify') {
        if(localStorage.getItem('htgidentify') !== null) return resolvePlatformAccess()
    }
    
}

async function resolvePlatformAccess() {
    const htgidentify = localStorage.getItem('htgidentify');
    if (!htgidentify || htgidentify === 'NOT SET') {
        stopLoadingWebsite('<span class="btnloader2"></span><span>Checking Authorization. Please wait...</span>');
        localStorage.setItem('htgidentify', 'SET')
        await setDeviceIndentity()
    } 
    else if (htgidentify && htgidentify === 'SET' && localStorage.getItem('htgmtag')) {
        await  verifyDeviceEligibility()
    }
    else return stopLoadingWebsite('Authorization failed!. Site not available');
}

async function setDeviceIndentity() {
    const deviceDescription = getDeviceDescription(); 
    let paramstr = new FormData()
    let machineinfo = '';
    for (let key in deviceDescription) {
        machineinfo += `${key.toString() + ' : ' + deviceDescription[key].toString()} || `
    }
    paramstr.append('machine', machineinfo)
    paramstr.append('htgidentify', 'SET')

    try {
        
        let sendDeviceDescription = await fetch('../controllers/sethtgidentify.php', {method: 'POST', body: paramstr, headers: new Headers()})
        const sendDeviceDescriptionResponse = await sendDeviceDescription.json()
        if(sendDeviceDescription && sendDeviceDescriptionResponse.status) {
            localStorage.setItem('htgmtag', sendDeviceDescriptionResponse['htgmtag'])
            return stopLoadingWebsite('Not Authorized!. Site not available');
        }
        else if(sendDeviceDescription) {
            return stopLoadingWebsite('Sorry!  <br> Site not available');
        }
        else return stopLoadingWebsite('Sorry!  <br>  You\'re Not Authorized.')
    }
    catch (error) {
        return stopLoadingWebsite('Sorry! Authorization Failed');
    }
}

async function verifyDeviceEligibility() {
    if(localStorage.getItem('htgmtag')) {
        
        let paramstr = new FormData()
        paramstr.append('htgmtag', localStorage.getItem('htgmtag'))
        
        let result = await fetch('../controllers/fetchmachineidentitybytag.php', {method: 'POST', body: paramstr, headers: new Headers()});
        let identity = await result.json()
        
        if(identity.status) {
  
            if(identity.data[0].htgmtag !== localStorage.getItem('htgmtag')) return stopLoadingWebsite('Sorry!  <br>  You\'re Not Authorized.')

            if(identity.data[0].fingerprint && identity.data[0].status == 'ACTIVE') return continueLoadingWebsite()
            
            return verifyDeviceFingerPrint(identity.data[0].fingerprint)

        }
        
        else stopLoadingWebsite('Unable to verify Device');
    }
}

async function verifyDeviceFingerPrint(fingerprint) {

    let paramstr = new FormData()
    paramstr.append('fingerprint', fingerprint)
    paramstr.append('htgmtag', localStorage.getItem('htgmtag'))
        
    let result = await fetch('../controllers/verifyfingerprint.php', {method: 'POST', body: paramstr, headers: new Headers()});
    let verification  = await result.json()
    if(verification.fingerprint) {
        localStorage.setItem('fingerprint', verification.fingerprint)
        return continueLoadingWebsite()
    }
    else {
        
        localStorage.removeItem('htgmtag')
        localStorage.removeItem('fingerprint')
        return stopLoadingWebsite('Not Verified!')
    }
}


function stopLoadingWebsite(mssg) {
   document.querySelector('body').innerHTML = `
        <div style="height:100vh;width:100%;display:flex;justify-content:center;align-items:center;;flex-direction:column">
            <span style="opacity:.6;display:flex;justify-content:center;align-items:center;flex-direction:column;background-color:#fff;padding: 30px;border-radius:5px;text-align:center">${mssg}</span>
        </div>
   `;
}

function continueLoadingWebsite() {

    document.querySelector('body').innerHTML = html;
    
    getLocation();
    if(document.getElementById('mloginbtn')) document.getElementById('mloginbtn').addEventListener('click', e => callController('loginscript.php', getLoginParams(), 'loginscript', login_fields, login_success, e, event ))
    
    if(document.getElementById("mloginpassword")) document.getElementById("mloginpassword").addEventListener('keypress', e => { 
        if(e.key === 'Enter') document.getElementById('mloginbtn').click()
    })
    
}


function getDeviceDescription() {
  const deviceInfo = {};

  deviceInfo.userAgent = navigator.userAgent;
  deviceInfo.language = navigator.language || navigator.userLanguage;
  deviceInfo.platform = navigator.platform;

  deviceInfo.browserName = getBrowserName();
  deviceInfo.browserVersion = getBrowserVersion();

  deviceInfo.timezoneOffset = new Date().getTimezoneOffset();

  return deviceInfo;
}

function getBrowserName() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Firefox") !== -1) {
    return "Firefox";
  } else if (userAgent.indexOf("Chrome") !== -1) {
    return "Chrome";
  } else if (userAgent.indexOf("Safari") !== -1) {
    return "Safari";
  } else if (userAgent.indexOf("Edge") !== -1) {
    return "Edge";
  } else if (userAgent.indexOf("Opera") !== -1 || userAgent.indexOf("OPR") !== -1) {
    return "Opera";
  } else if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1) {
    return "Internet Explorer";
  } else {
    return "Unknown";
  }
}

function getBrowserVersion() {
  const userAgent = navigator.userAgent;
  let versionStart;
  let versionEnd;

  if (userAgent.indexOf("Chrome") !== -1) {
    versionStart = userAgent.indexOf("Chrome") + 7;
    versionEnd = userAgent.indexOf(" ", versionStart);
  } else if (userAgent.indexOf("Firefox") !== -1) {
    versionStart = userAgent.indexOf("Firefox") + 8;
    versionEnd = userAgent.indexOf(".", versionStart);
  } else if (userAgent.indexOf("Safari") !== -1) {
    versionStart = userAgent.indexOf("Version") + 8;
    versionEnd = userAgent.indexOf(".", versionStart);
  } else if (userAgent.indexOf("Edge") !== -1) {
    versionStart = userAgent.indexOf("Edge") + 5;
    versionEnd = userAgent.indexOf(".", versionStart);
  } else if (userAgent.indexOf("Opera") !== -1 || userAgent.indexOf("OPR") !== -1) {
    versionStart = userAgent.indexOf("Opera") + 6;
    versionEnd = userAgent.indexOf(".", versionStart);
  } else if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1) {
    versionStart = userAgent.indexOf("MSIE") + 5;
    versionEnd = userAgent.indexOf(".", versionStart);
  } else {
    return "Unknown";
  }

  return userAgent.substring(versionStart, versionEnd);
}

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
	
let windowLocation = {};	
	
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(returnPosition, showError);
    } 
}

function returnPosition(position) {
    windowLocation.status = true;
    windowLocation.lat = position.coords.latitude;
    windowLocation.long = position.coords.longitude;
}

function showError() {
    windowLocation.status = false
    windowLocation.message = 'Denied'
}

const callModal =( mssg, status = 2, time = 5000, id)=> {
    
    const notificationmodal = document.getElementById('notificationmodal');
    var mbox = document.getElementById('messageBox2');
    if(id && document.getElementById(id)){
        document.getElementById(id).style.borderColor = 'red';
        mbox.innerHTML = mssg;
        notificationmodal.style.right = '0%';
        notificationmodal.style.opacity = '1';
        setTimeout(function(){
            notificationmodal.style.right = '-120%';
            notificationmodal.style.opacity = '0';
        }, time);	
        setTimeout(function(){
            document.getElementById(id).style.borderColor = 'rgb(62, 63, 64,.5)';
        }, 3000)
    };
    
    if(status == '0'){
        //document.getElementById(id).style.borderColor = 'red';
        notificationmodal.style.backgroundColor = '#ffd9e2';
        mbox.style.color = 'red';
        mbox.innerHTML = mssg;
        notificationmodal.style.right = '0%';
        notificationmodal.style.opacity = '1';
        setTimeout(function(){
          notificationmodal.style.right = '-120%';
          notificationmodal.style.opacity = '0';
        }, time);
        
    } else if(status == '1'){
        //document.getElementById(id).style.borderColor = 'red';
        notificationmodal.style.backgroundColor = '#2a422c';
        mbox.style.color = '#fff';
        mbox.innerHTML = mssg;
        notificationmodal.style.right = '0%';
        notificationmodal.style.opacity = '1';
        setTimeout(function(){
          notificationmodal.style.right = '-120%';
          notificationmodal.style.opacity = '0';
        }, time);
        
    }else{
        notificationmodal.style.backgroundColor = 'white';
        mbox.style.color = 'black';
        mbox.innerHTML = mssg;
        notificationmodal.style.right = '0%';
        notificationmodal.style.opacity = '1';
        setTimeout(function(){
          notificationmodal.style.right = '-120%';
          notificationmodal.style.opacity = '0';
        }, time);
          
    }
    
    mbox.innerHTML = mssg;
    notificationmodal.style.right = '0%';
    notificationmodal.style.opacity = '1';
    setTimeout(function(){
      notificationmodal.style.right = '-120%';
      notificationmodal.style.opacity = '0';
    }, time);
      
};
	
function validateInputsComponent(z){
	var flag = 1;
	var mssg='';
	for(var i=0; i<z.length; i++){
	    let x = z[i];
	    if(document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'input' || document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'select' ){
	        if(document.getElementById(x).value.length < 1 ){
     			mssg += `${document.getElementById(x).previousElementSibling.getAttribute('for')} value is Invalid <br />`;			
     			document.getElementById(x).style.borderColor = 'red';
     			flag =0;
 		    }else{
 			    document.getElementById(x).style.borderColor = 'lightgray';
 		    }
	    }else{
	       console.log(`${x} is not an input`)
	    }
	}
	
	if(flag == 0){
		var mbox = document.getElementById('messageBox');
		callModal(mssg, 0);
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

function buttonDisabled(){
    document.getElementById('mloginbtn').disabled = true
}
function buttonEnabled(){
    document.getElementById('mloginbtn').disabled = false
}
const callController =(controller, params, name, validate, funct, e, event)=>{ 
    buttonDisabled()
    event.target.disabled = true;
    if(validate){
        if(!validateInputsComponent(validate)){ 
            event.target.disabled = false;
		 
		    return null; 
		}
    }
    
    event.target.querySelector('.btnloader').style.display = 'block'
    var request = getAjaxObject();
    request.open('POST',`../controllers/${controller}`,true);
    request.onreadystatechange = function(){
        if(request.readyState == 1){}
        if(request.readyState == 4 && request.status == 200){
         
            
            for(let i=0; i<document.getElementsByTagName('input').length; i++){
                document.getElementsByTagName('input')[i].value = '';
            }

            event.target.disabled = false;
            event.target.querySelector('.btnloader').style.display = 'none'
            if(request.responseText) {
                let result = JSON.parse(request.responseText);
                buttonEnabled()
                if(result['status']) {
                    return login_success(result)
                }
                else {
                    callModal(`Invalid Credentials`, 0);
                    return 
                }
            } else return callModal(`Error! Unable to login, try again..`, 0);
            
        }else{
            event.target.disabled = false;
             event.target.querySelector('.btnloader').style.display = 'none'
         
        }
        
        try{
            event.target.disabled = false;
            e.stopPropagation();
        }catch(ex){}
    };
    
    request.setRequestHeader('Connection','close');
    request.send(params);
};
	
function getLoginParams(){
	var paramstr = new FormData();
	paramstr.append('email',document.getElementById("mloginemail").value);
	paramstr.append('upw',document.getElementById("mloginpassword").value);
	paramstr.append('location', windowLocation.status ? `latitude=${windowLocation.lat}&longitude=${windowLocation.long}` : '');
	paramstr.append('ip', '');
    return paramstr;
}
	
const login_fields = [`mloginemail`,`mloginpassword`]
    
const login_success =(result)=>{
    if(result.data.status && result.message == 'Unverified user') {
        let html = `
            <form id="verifyparams" method="POST" action="./verifyemail.php", enctype="application/x-www-form-urlencoded">
                <input type="hidden" name="firstname" value="${result.data.data.firstname}">
                <input type="hidden" name="lastname" value="${result.data.data.lastname}">
                <input type="hidden" name="othername" value="${result.data.data.othernames}">
                <input type="hidden" name="email" value="${result.data.data.email}">
                <button type="hidden" name="submit" style="display:none">
            </form>
        `
        let el = document.createElement("div");
        el.innerHTML = html;

        document.querySelector('body').appendChild(el)
        document.querySelector('#verifyparams button').click();
    }
    else {
        if(result.data.mfa == 'OFF')return window.location = './index.php';
        if(result.data.mfa == 'ON')return window.location = './mfa.php';
    };
   
}

const html = `

    <header>
        <div class="content-width">
            <span > 
                <img src="../images/howlogo-removebg-preview.png" alt="How to grow logo">
            </span> 
            <div>
                <a href="./login.php">Log in</a>
                <a href="././registration.php">sign up</a>
            </div>
        </div>
    </header>
    <section>
        <div class="content-width">
            <div>
                <p class="text-gray-500">Welcome Back!</p>
                <div class="mt-10">
                    <form id="loginform">
                        <div>
                            <div class="form-group">
                                <label for="email"></label>
                                <input type="email" name="level" id="mloginemail" class="form-control" placeholder="Email">
                            </div>
                            <div class="form-group">
                                  <label for="password"></label>
                                <input type="password" name="password" id="mloginpassword" class="form-control" placeholder="Password" autocomplete="true">
                            </div>
                        </div>
                        <div class="my-10">  
                            <a href="./password.php?action=forgot">Forgot Password?</a>
                            <button type="button" id="mloginbtn">
                                <span class="btnloader" style="display: none;"></span>
                                <span>Log in</span>
                            </button>
                        </div>
                        <div class="border-t py-7 text-center hidden">
                            <p> Don't have an account yet?&nbsp; <a href="./registration.php" class="hover:underline text-primary text-center">Create an account</a></p>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    </section>
    
    <div id="notificationmodal">
        <div class="contentcontainer">
            <p id="messageBox2"><br/></p>
        </div>
    </div>

    <div name="messageBox" id="messageBox" class="messageBox"></div>
    
    <script type='text/javascript' src="./js/mlogin.js" ></script>

`
 //<a href="./passwordreset.php?action=forgot">Forgot Password?</a>