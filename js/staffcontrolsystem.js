        
async function orestaffcontrolsystem() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('staffcontrolsystem.php', 'override')  
        // if(document.getElementById('staffcontrolsystem_submitbtn'))document.getElementById('staffcontrolsystem_submitbtn').addEventListener('click', e=>callController('controller.php', null, 'staffcontrolsystemsubmit', staffcontrolsystem_field, alert),true);

        // if(addfile)addfile.addEventListener('click', e=>fileinput.click());
        
        
        //updateupload()
        }
        
        
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
        




var orestaffcontrolsystembbtn = document.getElementById("staffcontrolsystem");
if (orestaffcontrolsystembbtn) orestaffcontrolsystembbtn.addEventListener("click", e=>orestaffcontrolsystem(), false);
