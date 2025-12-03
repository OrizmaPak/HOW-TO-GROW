let firstname, lastname, othername, email, form;

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

window.onload = function() {
    form = document.getElementById('verifyemailform')
    if(form) {
        firstname = form.querySelector('#firstname')
        lastname = form.querySelector('#lastname')
        othername = form.querySelector('#othername')
        
        if(form.querySelector('button#verify')) form.querySelector('button#verify').addEventListener('click', e => verifyEmail(e))
    }
}

async function verifyEmail(e) {
    e.target.disabled = true;
    let params = new FormData()
    params.append('email', form.querySelector('#email')?.value);
    let result = await fetch('../controllers/verifyemail.php', {method: 'POST', body: params, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        let html = `
            <h4 style="border-bottom:1px solid lightgray;padding: 0 0 10px 0; margin: 15px 0 15px 0"> We sent you a verification email</h4>
            <div class="formcontrol">
                <label for="vercode" >Verification Code</label>
                <input type="text" id="vercode" name="vercode"> 
            </div>
            <div class="btns mloginbtn ">
                <button  id="proceed" type="button" class="btnlogin btn btnblue mt">Submit Code</button>
            </div>
        `;
        
        form.innerHTML = html;
        
        if(form.querySelector('button#proceed'))form.querySelector('button#proceed').addEventListener('click', async function(event) {
            if(form.querySelector('#vercode').value.length < 1) {
                form.querySelector('#vercode').style.borderColor ='red'
                return callModal('Enter Verification code', 0)
            }
            else {
                form.querySelector('#vercode').style.borderColor =''
                event.target.disabled = true;
                let params = new FormData()
                params.append('vercode', form.querySelector('#vercode')?.value);
                let vresult = await fetch('../controllers/verifyuser.php', {method: 'POST', body: params, headers: new Headers()})
                let vres = await vresult.json();
                if(vres?.status) {
                    event.target.disabled = false;
                    window.location = './index.php'
                }
                else  {
                    event.target.disabled = false;
                    if('message' in vres) {
                        return callModal(vres['message'], 0)
                    }
                    else return callModal('Unable to perform verification', 0)
                }
            }
        })
        
    }
    else callModal('', 0)
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
        notificationmodal.style.backgroundColor = '#360303';
        mbox.style.color = '#fff';
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