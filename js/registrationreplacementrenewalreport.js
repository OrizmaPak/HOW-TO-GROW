       async function registrationreplacementrenewalreport () {
        await  httpRequest('registrationreplacementrenewalreport.php')
    }
    
var registrationreplacementrenewalreportbtn = document.getElementById("registrationreplacementrenewalreport");
if (registrationreplacementrenewalreportbtn) registrationreplacementrenewalreportbtn.addEventListener("click", e=>registrationreplacementrenewalreport());