async function oreviewstaffrecords() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('viewstaffrecords.php', 'override')  
        // if(document.getElementById('viewstaffrecords_submitbtn'))document.getElementById('viewstaffrecords_submitbtn').addEventListener('click', e=>callController('controller.php', null, 'viewstaffrecordssubmit', viewstaffrecords_field, alert),true);

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


var oreviewstaffrecordsbbtn = document.getElementById("viewstaffrecords");
if (oreviewstaffrecordsbbtn) oreviewstaffrecordsbbtn.addEventListener("click", oreviewstaffrecords, false);