'use strict'

// Adding preventDefault to all the Buttons
const btns =document.querySelectorAll('button')
btns.forEach(event=>{
    event.addEventListener('click',e=>{
        const btnparent = event.parentElement;
        if(btnparent.classList.contains('formcontrol')){
            e.preventDefault()
          
        }
    })    
})
