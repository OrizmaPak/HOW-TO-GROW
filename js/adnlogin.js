       
       async function adnlogin () {
        await  httpRequest('login.php')
        
    }
    
var adnlogin1 = document.getElementById("adnlogin");
if (adnlogin1) adnlogin1.addEventListener("click", adnlogin, false);