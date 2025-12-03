let branchsetupfetchdata;
let brachsetupid
async function openBranchSetup(){
    
await httpRequest('branchsetup.php');

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
	
	
	
	
	function getLocation(){
    const requestLocation = getAjaxObject();
    
    requestLocation .open('POST','../controllers/fetchlocation.php',true);
    
    requestLocation .onreadystatechange = function(){
       
       if(requestLocation .readyState == 4 && requestLocation .status == 200){
           
            // console.log(requestItem);
            const result = JSON.parse(requestLocation .responseText);
            console.log('result', result);
            const ObjectOfObj = result.data;
             branchsetupfetchdata = ObjectOfObj.data;
            
            console.log(branchsetupfetchdata)
            
            let jtabledata = document.getElementById('branchsetuptabledata');
            renderBranchSetUpTable();

       }
       else{
        //   console.log("not success ",requestItem)
       }
    };
    
    requestLocation .setRequestHeader('Connection','close');
  
    requestLocation .send();
}

getLocation();
	
	
	

	
	
// 	branchsetupfetchdata = [{location:'Anambra',state:'Anambra state',description:'Head office',
// 	address:'4, city Biscuit Road UgwuagbaObosi Anambra State', account:'234542322'},
// 	{location:'Onisha',state:'Anambra State',description:'Main Market branch',
// 	address:'1 sokoto road main market onisha', account:'234542322'}]
	
// // 	branchsetupmodal = document.querySelector(".matmodal");
    
//     if(document.querySelector(".matcancelmodal"))document.querySelector(".matcancelmodal").addEventListener('click',function(){
//     console.log("work oo work oo");
//      matmodal.classList.add('matmodalhidde');
//     });
    
    


	function validateBranchSetup(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var matBranchSetupLocation = document.getElementById('matbranchsetuplocation');
		var matBranchSetupState = document.getElementById('matbranchsetupstate');
		var matBranchSetupAccNumber = document.getElementById('matbranchsetupaccno');
		var matBranchSetupAddress = document.getElementById('matbranchsetupaddress');
	    var matBranchSetupDescription = document.getElementById('matbranchsetupdescription');
		
		
		
		if(matBranchSetupAddress.value.length < 1){
			mssg += 'Address is Invalid <br />';			
			matBranchSetupAddress.style.borderColor = 'red';
			flag =0;
		}else if(matBranchSetupAddress.value.lenght > 250){
		    mssg += 'Address must not more than 250 characters<br />';			
			matBranchSetupAddress.style.borderColor = 'red';
			flag =0;
		}
		else{
			matBranchSetupAddress.style.borderColor = 'lightgray';
		}
		
		if(matBranchSetupLocation.value.length < 1){
			mssg += 'Location is Invalid <br />';			
			matBranchSetupLocation.style.borderColor = 'red';
			flag =0;
		}
		else if(matBranchSetupLocation.value.lenght > 50){
		    mssg += 'Location must not more than 50 characters<br />';			
			matBranchSetupLocation.style.borderColor = 'red';
			flag =0;
		}
		else{
			matBranchSetupLocation.style.borderColor = 'lightgray';
		}
		
		if(matBranchSetupAccNumber.value.length < 1){
			mssg += 'Branch acoount number is Invalid <br />';			
			matBranchSetupAccNumber.style.borderColor = 'red';
			flag =0;
		}else{
			matBranchSetupAccNumber.style.borderColor = 'lightgray';
		}
		
		if(matBranchSetupState.value.length < 1){
			mssg += 'State is Invalid <br />';			
			matBranchSetupState.style.borderColor = 'red';
			flag =0;
		}else if(matBranchSetupState.value.lenght > 50){
		    mssg += 'State must not more than 50 characters<br />';			
			matBranchSetupState.style.borderColor = 'red';
			flag =0;
		}
		
		else{
			matBranchSetupState.style.borderColor = 'lightgray';
		}
		
		if(matBranchSetupDescription.value.length < 1){
			mssg += 'Description is Invalid <br />';			
			matBranchSetupDescription.style.borderColor = 'red';
			flag =0;
		}else if(matBranchSetupDescription.value.lenght > 50){
		    mssg += 'Description must not more than 50 characters<br />';			
			matBranchSetupDescription.style.borderColor = 'red';
			flag =0;
		}
		
		else{
			matBranchSetupDescription.style.borderColor = 'lightgray';
		}
		
	
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				matBranchSetupAddress.style.borderColor = 'lightgray';
				matBranchSetupLocation.style.borderColor = 'lightgray';
				matBranchSetupAccNumber.style.borderColor = 'lightgray';
				matBranchSetupState.style.borderColor = 'lightgray';
				matBranchSetupDescription.style.borderColor = 'lightgray';
			

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getBranchSetupParams(){
		var paramstr = new FormData();
		console.log('idd', brachsetupid)
		if(brachsetupid)paramstr.append('id', brachsetupid)
		paramstr.append('location',document.getElementById('matbranchsetuplocation').value);
		paramstr.append('state',document.getElementById('matbranchsetupstate').value);
		paramstr.append('description',document.getElementById('matbranchsetupdescription').value);
	 	paramstr.append('address',document.getElementById('matbranchsetupaddress').value);	
		paramstr.append('accountnumber',document.getElementById('matbranchsetupaccno').value);
	
        for (var pair of paramstr.entries()) {
               console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
            }	
		brachsetupid = ''

	    return paramstr;

	}


var	saveBranchSetup = function(e){
		
		showSpinner();
		
		if(!validateBranchSetup()){ 
		 hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/locationscript.php',true);
		request.onreadystatechange = function(){
			if(request.readyState == 1){
		
			}
			if(request.readyState == 4 && request.status == 200){
			
			 console.log('request.responseText', request.responseText);
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
                    resetPage('reset')
                }else{
                    stat = 0;
                }
			     
			     callModal(result.result, stat)
			
				// if(request.responseText === "FAILED"){
				// 	(document.getElementById('loadingicon')).style.visibility = 'hidden';
				// 	(document.getElementById('loadingicon')).style.display = 'none';

				// 	var mbox = document.getElementById('messageBox');
				// 	document.getElementById('messageBox').innerHTML = "Login Failed";
				// 	mbox.style.display = 'block';
				// 	mbox.style.visibility = 'visible';
				// 	setTimeout(function(){
				// 		mbox.style.display = 'none';
				// 		mbox.style.visibility = 'hidden';

				// 	}, 3000);						
				// }else if(request.responseText === "SUCCESS"){
				// 	window.location.href = "companyinfo.php";
				// }else{
				// 	(document.getElementById('loadingicon')).style.visibility = 'hidden';
				// 	(document.getElementById('loadingicon')).style.display = 'none';

				// 	var mbox = document.getElementById('messageBox');
				// 	document.getElementById('messageBox').innerHTML = "MSG: " + request.responseText;
				// 	mbox.style.display = 'block';
				// 	mbox.style.visibility = 'visible';
				// 	setTimeout(function(){
				// 		mbox.style.display = 'none';
				// 		mbox.style.visibility = 'hidden';

				// 	}, 14000);						
					
				// }
			}else{
			    
			     hideSpinner();
				// (document.getElementById('loadingicon')).style.visibility = 'hidden';
				// (document.getElementById('loadingicon')).style.display = 'none';
				
				
			    //document.getElementById('loader').style.display = 'none';
				//sf = '<b>Error getting data</b>';
			}

			e.stopPropagation();
		}

		
		request.setRequestHeader('Connection','close');
		request.send(getBranchSetupParams());

	}


if(document.getElementById('matbranchsetupsubmitbtn'))document.getElementById('matbranchsetupsubmitbtn').addEventListener('click',saveBranchSetup,false); 
if(document.getElementById('matbranchsetupupdatebtn'))document.getElementById('matbranchsetupupdatebtn').addEventListener('click',saveBranchSetup,false);     
}

function matOpenModal(itemid){
    let obj = fetchdata[+itemid]
    matmodal.classList.remove('matmodalhidde');
    console.log(obj);
    document.getElementById("modallocation").value= obj.location;
    document.getElementById("modalstate").value= obj.state;
    document.getElementById("modaldescription").value= obj.description;
    document.getElementById("modaladdress").value= obj.address;
    document.getElementById("modalaccount").value= obj.account
}

function matEditBranchSetUp(itemid){
    // if(document.getElementById('matbranchsetupsubmitbtn'))document.getElementById('matbranchsetupsubmitbtn').innerHTML = 'Update';
    brachsetupid = itemid
    let obj = branchsetupfetchdata[+itemid]
    document.getElementById("matbranchsetuplocation").value= obj.location;
    document.getElementById("matbranchsetupstate").value= obj.state;
    document.getElementById("matbranchsetupdescription").value= obj.description;
    document.getElementById("matbranchsetupaddress").value= obj.address;
    document.getElementById("matbranchsetupaccno").value= obj.accountnumber
    
}

function matDeleteBranchSetUp(itemid){
    let newbranchsetupfetchdata = branchsetupfetchdata.filter((item, index)=> index !== itemid )
    branchsetupfetchdata = newbranchsetupfetchdata
    console.log(newbranchsetupfetchdata)
   
 renderBranchSetUpTable()
}

function renderBranchSetUpTable() {
    let jtabledata = document.getElementById('branchsetuptabledata');
    if(jtabledata) jtabledata.innerHTML = '';
    if(branchsetupfetchdata.length){
        branchsetupfetchdata.map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.location } </td>
                    <td> ${ item.state } </td>
                    <td> ${ item.description } </td>
                    <td> ${ item.address } </td>
                    <td> ${ item.accountnumber } </td>
                    <td class="btncolumn">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="matEditBranchSetUp(${index})" >Edit</span> &nbsp 
                        <span class="viewbtn mtablebtn mbtnred hidden" style="color:rgb(0, 105, 217);font-weight:bold" onclick="matDeleteBranchSetUp(${index})">Delete</span>
                    </td>
                </tr>
            `;
        });
        
    }
}


var branchSetup = document.getElementById('branchsetup');
if(branchSetup) branchSetup.addEventListener('click',openBranchSetup,false);
    
    
    
    
