    function oresearchcompositeparams(){
		var paramstr = new FormData();
		    paramstr.append('itemname', document.getElementById('viewcompositsinput').value);		
		  //  paramstr.append('itemname', document.getElementById('build_selectitem') ? document.getElementById('build_selectitem').value : '');		
		  //  paramstr.append('qty', document.getElementById('orequantity') ? document.getElementById('orequantity').value : '');		
 
	   return paramstr; 

	} 

async function oreviewcompositeitems() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('viewcompositeitems.php', 'override')  
        const showviewcomposite =(data)=>{
            callModal(data.message)
        }
        // callController =(controller, params, name, validate, funct, silent, e)
        if(document.getElementById('viewcompositsinput'))document.getElementById('viewcompositsinput').addEventListener('keyup', e=>{
            if(document.getElementById('viewcompositsinput').value.length > 0){
                callModal('Loading')
                callController('searchcompositeitems.php', oresearchcompositeparams(), 'searchcompositeitems', null, showviewcomposite, 'silent')}
        },true);
         const dodat =(result)=>{
            //  if(document.getElementById('leavetabledata'))document.getElementById('leavetabledata').innerHTML = result.data.compositeitem
         }
         callController('searchcompositeitems.php', null, 'searchcompositeitems', null, dodat, 'silent')

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


var oreviewcompositeitemsbbtn = document.getElementById("viewcompositeitems");
if (oreviewcompositeitemsbbtn) oreviewcompositeitemsbbtn.addEventListener("click", oreviewcompositeitems, false);
