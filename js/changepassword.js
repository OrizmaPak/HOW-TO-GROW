try{
    'use strict'
// selection of classes & IDs
const passwordbtn = document.querySelectorAll('.passwordbtn')
const  showpassword = document.querySelector('.fa-eye') 
const hidepassword = document.querySelector('.fa-eye-slash')



passwordbtn.forEach(currentbtn=>{
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
})
}catch(err){
    console.log(err)
}

async function changepasswordk(){
    await httpRequest('changepassword.php', 'override') 
    return
} 

var changepassword = document.getElementById("changepassword");
if (changepassword) changepassword.addEventListener("click", e=>changepasswordk());