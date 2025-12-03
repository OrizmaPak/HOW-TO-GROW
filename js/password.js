window.onload = function() {
    let form = document.getElementById('passwordform')
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', passwordRecoverSubmitHander, false)
}

async function passwordRecoverSubmitHander() {
    if(!validatePasswordForm()) return

    let paramstr = new FormData(document.getElementById('passwordform'))
    let result = await fetch('../controllers/forgotpassword.php', {body: paramstr, method: 'POST', headers: new Headers()})
    let res = await result.json()
   if(result) {
    if(res.status) {
        callModal('Successful! Please check your email for new password', 1)
        setTimeout(() => window.location = './login.php', 3000)
    }
    else {
        if(res.message) return callModal(res.code, 0)
        else return callModal('Unable to reset password', 0)
    }
   }
   else return callModal('Unable to reset password', 0)
}

function validatePasswordForm() {


    let form = document.getElementById('passwordform')
    let errorElements = form.querySelectorAll('.control-error')
    let controls = []

    if(form.querySelector('#email').value.length < 1)  controls.push([form.querySelector('#email'), 'Email is required'])
    
    else if(!form.querySelector('#email').value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) controls.push([form.querySelector('#email'), 'Email not a valid address'])

    errorElements.forEach( item => {
        item.previousElementSibling.style.borderColor = '';
        item.remove()
    })

    if(controls.length) {
        controls.map( item => {
            let errorElement = document.createElement('span')
            errorElement.classList.add('control-error','dom-entrance')
            let control = item[0] , mssg = item[1]
            errorElement.textContent = mssg;
            control.parentElement.appendChild(errorElement)            
        })
        return false
    }
    
    return true

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