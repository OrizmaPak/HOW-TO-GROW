async function yourFunctionName() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('filename.php', 'override')  
        
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


var filenameprefixed = document.getElementById("idInTheNavigation");
if (filenameprefixed) filenameprefixed.addEventListener("click", yourFunctionName, false);
