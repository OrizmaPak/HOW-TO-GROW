const staffloan_field = [
    'staffloanfirstname',
    'staffloanlastname',
    'staffloanmiddlename',
    'staffloanbranch',
    'staffloangroup',
    'staffloanlevel',
    'staffloandepartment',
    'staffloanuser',
    'staffloandate',
    'staffloanamount',
    'staffloanmonthlydeduction',
    ]

async function orestaffloan() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('staffloan.php', 'override')  
        if(document.getElementById('staffloansubmit'))document.getElementById('staffloansubmit').addEventListener('click', e=>callController('controller.php', null, 'staffloansubmit', staffloan_field, alert),true);

        //YOUR VARIABLES STAYS HERE
        // const statementAccountNumber = document.getElementById('smacc')
        // const statementStartDate = document.getElementById('smsd');
        
        //ALWAYS CHECK BEFORE ADDING EVENTLISTENERS
        // if(loadstatementbtn) loadstatementbtn.addEventListener('click', () => loadStatement());
        
        //TO CALL AND HIDE SPINNER WHEN NEEDED
        // showSpinner();
        // hideSpinner()
        
       // THE REST OF YOUR CODE GOES HERE
       
       //THANKS
        
}


var orestaffloanbbtn = document.getElementById("staffloan");
if (orestaffloanbbtn) orestaffloanbbtn.addEventListener("click", orestaffloan, false);