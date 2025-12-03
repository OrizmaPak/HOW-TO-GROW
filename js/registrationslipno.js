let registrationslipnofetchdata;
async function openRegistrationSlipNo(){
'use strict';

await httpRequest('registrationslipno.php')


    
    
var  getAjaxObject = function(){
		var requeste;
		try{
			requeste = new XMLHttpRequest();
		}catch(error){
			try{
				requeste = new ActiveXobject('Microsoft.XMLHTTP');
			}catch(error){
				return 'Error';
			}
		}
		return requeste;
	}
	



	
	
	
// 	async function fetchSlipNumber(cb=null) {
//     let result = await fetchRequest('../controllers/fetchslipnumberscript.php');
//     if(result) {
//         let parseResult = JSON.parse(result);
//         if(parseResult.message.includes('Successful') && parseResult.result.includes('Successful')){
//           slipnumbers = parseResult.data.data;
//           console.log('slipnumbers',slipnumbers);
//           cb();
//         }
//     }
// }

// fetchSlipNumber();







  function getSlipNumbers(){
    const requestItem = getAjaxObject();
    
    requestItem.open('POST','../controllers/fetchslipnumberscript.php',true);
    
    requestItem.onreadystatechange = function(){
       
       if(requestItem.readyState == 4 && requestItem.status == 200){
           
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('fetchSlipNumbers ', result);
            const arrayOfSlipNumber = result.data.data;
            registrationslipnofetchdata = arrayOfSlipNumber
            // console.log('--yeah----',registrationslipnofetchdata)
            renderSlipNumberTable();
            
            let arrayOfAccStr  = registrationslipnofetchdata.map(each=>{
             return`
             <option value=${each.accountnumber}>
             `
         });
         
         if(document.getElementById('allaccounts')){
             console.log(document.getElementById('allaccounts'))
            document.getElementById('allaccounts').innerHTML =  arrayOfAccStr.join(' ')
         }
            
        }
       else{
        //   console.log("not success ",requestItem)
       }
    };
    
    requestItem.setRequestHeader('Connection','close');
    requestItem.send();
}

getSlipNumbers()




//  registrationslipnofetchdata = [{accountnumber:423743723223, serialfrom:2333, serialto:5555},
// {accountnumber:423743723223, serialfrom:2333, serialto:5555},
// {accountnumber:423743723223, serialfrom:2333, serialto:5555},
// {accountnumber:423743723223, serialfrom:2333, serialto:5555},
// {accountnumber:423743723223, serialfrom:2333, serialto:5555}];

// registrationslipnomodal = document.querySelector(".matmodal");


// if(document.querySelector(".matcancelmodal"))document.querySelector(".matcancelmodal").addEventListener('click',function(){
//     console.log("work oo work oo");
//      registrationslipnomodal.classList.add('matmodalhidde');
// });

 
let jtabledata = document.getElementById('registeredslipnumbertabledata');


function renderSlipNumberTable() {
    if(jtabledata) jtabledata.innerHTML = '';
    if(registrationslipnofetchdata.length){
        registrationslipnofetchdata.map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.accountnumber } </td>
                    <td> ${ item.serialnumberfrom } </td>
                    <td> ${ item.serialnumberto } </td>
                   
                </tr>
            `;
        });
        
    }
}



// const arrayBtns = document.querySelectorAll(".viewbtn");
// for(let i = 0; i < arrayBtns.length; i++){
//     arrayBtns[i].addEventListener('click',function(){
//         matopenModal(fetchdata[i]);
//     });
// }

	function validateRegistrationSlipNo(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var matRegistrationSlipNoaccnumber = document.getElementById('matregistrationslipnoaccnumber');
	    var matRisgistrationSlipNoSerialFrom= document.getElementById('matregistrationslipnoserialnumberfrom');
	    var matRisgistrationSlipNoSerialTo= document.getElementById('matregistrationslipnoserialnumberto');
	   // var matRisgistrationSlipNoAc= document.getElementById('matregistrationslipnoac');
		
		
		
		
		
		if(matRegistrationSlipNoaccnumber.value.length < 1){
			mssg += 'Account Number is Invalid <br />';			
			matRegistrationSlipNoaccnumber.style.borderColor = 'red';
			flag = 0;
		}else{
			matRegistrationSlipNoaccnumber.style.borderColor = 'lightgray';
		}
		
		if(matRisgistrationSlipNoSerialFrom.value.length < 1){
			mssg += 'Serial Number From is Invalid <br />';			
			matRisgistrationSlipNoSerialFrom.style.borderColor = 'red';
			flag = 0;
		}else{
			matRisgistrationSlipNoSerialFrom.style.borderColor = 'lightgray';
		}
		
		if(matRisgistrationSlipNoSerialTo.value.length < 1){
			mssg += 'Serial Number To is Invalid <br />';			
			matRisgistrationSlipNoSerialTo.style.borderColor = 'red';
			flag = 0;
		}
		else if(Number(matRisgistrationSlipNoSerialFrom.value) > Number(matRisgistrationSlipNoSerialTo.value)){
			mssg += 'Serial Number To must be greater than Serial Number From  <br />';			
			matRisgistrationSlipNoSerialTo.style.borderColor = 'red';
			matRisgistrationSlipNoSerialFrom.style.borderColor = 'red';
			flag = 0;
		}
		else{
			matRisgistrationSlipNoSerialTo.style.borderColor = 'lightgray';
		}
		
// 		if(matRisgistrationSlipNoAc.value.length < 1){
// 			mssg += 'AC is Invalid <br />';			
// 			matRisgistrationSlipNoAc.style.borderColor = 'red';
// 			flag = 0;
// 		}else{
// 			matRisgistrationSlipNoAc.style.borderColor = 'lightgray';
// 		}
		
		
		
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				matRegistrationSlipNoaccnumber.style.borderColor = 'lightgray';
				matRisgistrationSlipNoSerialFrom.style.borderColor = 'lightgray';
				matRisgistrationSlipNoSerialTo.style.borderColor = 'lightgray';
			 //   matRisgistrationSlipNoAc.style.borderColor = 'lightgray';
			

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getRegistrationSlipNoParams(){
		var paramstr = new FormData();
	 		
		paramstr.append('accountnumber',document.getElementById('matregistrationslipnoaccnumber').value);
		paramstr.append('serialnumberfrom',document.getElementById('matregistrationslipnoserialnumberfrom').value);
		paramstr.append('serialnumberto',document.getElementById('matregistrationslipnoserialnumberto').value);
// 		paramstr.append('ac',document.getElementById('matregistrationslipnoac').value); 
		
	   return paramstr;

	}

var saveRegistrationSlipno = function(e){
        showSpinner();
        if(!validateRegistrationSlipNo()){ 
            hideSpinner();
            return; 
        }
        
        var request = getAjaxObject();
        
        request.open('POST','../controllers/slipnumbersscript.php',true);
        request.onreadystatechange = function(){
            if(request.readyState == 1){
                
            }
            if(request.readyState == 4 && request.status == 200){
                console.log('request.responseText', request.responseText)
                let result = JSON.parse(request.responseText);
                console.log('result', result); 
                let stat = 2;
                if(result.result === "Successful"){
                    stat = 1;
                    for(let i=0; i<document.getElementsByTagName('input').length; i++){
                        document.getElementsByTagName('input')[i].value = '';
                    }
                    for(let i=0; i<document.getElementsByTagName('select').length; i++){
                        document.getElementsByTagName('select')[i].value = '';
                    }
                    openRegistrationSlipNo()
                    
                }else{
                    stat = 0;
                }
                callModal(result.result, stat);
               
            }
            
            else{
                hideSpinner();
                
                
                //document.getElementById('loader').style.display = 'none';
                //sf = '<b>Error getting data</b>';
            }
    
            e.stopPropagation();
        };
    
    
        
        request.setRequestHeader('Connection','close');
        request.send(getRegistrationSlipNoParams());
    
    };

if(document.getElementById('matregistrationslipnosubmitbtn'))document.getElementById('matregistrationslipnosubmitbtn').addEventListener('click',saveRegistrationSlipno,false);

}

// function registeredSlipNoOpenModal(itemid){
//     let obj = registrationslipnofetchdata[+itemid]
//     registrationslipnomodal.classList.remove('matmodalhidde');
//     console.log(obj);
//     document.getElementById("modalaccountnumber").value= obj.accountnumber;
//     document.getElementById("modalserialnumberfrom").value= obj.serialfrom;
//     document.getElementById("modalserialnumberto").value= obj.serialto;
// }

var registrationSlipNo = document.getElementById('registrationslipno')
if(registrationSlipNo)registrationSlipNo.addEventListener('click', openRegistrationSlipNo, false)






