async function viewwarehousesalesledgerr () {
    await  httpRequest('viewwarehousesalesledger.php');

    
    


const demo =  [
    {
      date: "22/09/2022",
      accountno: 2305643012,
      user: 'NNEKA',
      product:'BINATONE IRON SM605',
      cost:6000.00,
      payment:6000.00,
      balance:0.00,
      mode:'Cash',
      bank:'First Bank',
      id: 1,
    },

    {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },

      {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },

      {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },

      {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },

      {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },

      {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },
        
     {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },

      {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },

      {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },
        
     {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },

      {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },

      {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },
     {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },

      {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },

      {
        date: "22/09/2022",
        accountno: 2305643012,
        user: 'NNEKA',
        product:'BINATONE IRON SM605',
        cost:6000.00,
        payment:6000.00,
        balance:0.00,
        mode:'Cash',
        bank:'First Bank',
        id: 1,
      },

   
]

const generateTemplate = () => {
    const arrayOfGenerateTemplate = demo.map((item, index) => {
      return `
      <tr>
      <td></td>
      <td>${item.date}</td>
      <td>${item.accountno}</td>
      <td>${item.user}</td>
      <td>${item.product}</td>
      <td>#${item.cost}</td>
      <td>#${item.payment}</td>
      <td>#${item.balance}</td>
      <td>${item.mode}</td>
      <td>${item.bank}</td>
  </tr>
          `;
    });
    const stringPopulateTemplate = arrayOfGenerateTemplate.join("");
  
    return stringPopulateTemplate;
  };


  const display = () => {
    const table =document.getElementById('viewwarehousesalestable')
    console.log(table)
    const head = table.innerHTML
    table.innerHTML = head + generateTemplate();
}

// window.addEventListener('load', function(){
    display()
// })



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
	};

	function validateViewWarehouse(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var mataccountno = document.getElementById('mataccountno');
		var mattransactiondate = document.getElementById('mattransactiondate');
		var matcompanyaccountno = document.getElementById('matcompanyaccountno');
	   // var matDepartmentLocation = document.getElementById('matdepartmentlocation');
	
		
		
		if(mataccountno.value.length < 1){
			mssg += 'Account Number is Invalid <br />';			
			mataccountno.style.borderColor = 'red';
			flag =0;
		}
		else{
			mataccountno.style.borderColor = 'lightgray';
		}
		
		if(mattransactiondate.value.length < 1){
			mssg += 'Transaction date is Invalid <br />';			
			mattransactiondate.style.borderColor = 'red';
			flag =0;
		}
		else{
			mattransactiondate.style.borderColor = 'lightgray';
		}
		if(matcompanyaccountno.value.length < 1){
			mssg += 'Company Account number is Invalid <br />';			
			matcompanyaccountno.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcompanyaccountno.style.borderColor = 'lightgray';
		}
		


		
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				matcompanyaccountno.style.borderColor = 'lightgray';
				mattransactiondate.style.borderColor = 'lightgray';
				mataccountno.style.borderColor = 'lightgray';
				
				// matDepartmentLocation.style.borderColor = 'lightgray';

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getViewWarehouseParams(){
		var paramstr = new FormData();
	 		
		paramstr.append('department',document.getElementById('matdepartment').value);
// 		paramstr.append('location',document.getElementById('matdepartmentlocation').value);
// 		paramstr.append('status',document.getElementById('matdepartmentstatus').value )
// 		paramstr.append('id',document.getElementById('matdepartmentid').value )
	
        
		for (var pair of paramstr.entries()) {
               console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
            }

	   return paramstr;

	}


var	saveViewWarehouse = function(e){
	  showSpinner();
		
		if(!validateDepartment()){ 
		 hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/department.php',true);
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
		request.send(getViewWarehouseParams());

	}

if(document.getElementById('matviewbtn'))document.getElementById('matviewbtn').addEventListener('click',validateViewWarehouse,false);

}
var viewwarehousesalesledgerbtnn = document.getElementById('viewwarehousesalesledger') ;
    if(viewwarehousesalesledgerbtnn) viewwarehousesalesledgerbtnn.addEventListener('click', e=>viewwarehousesalesledgerr());



