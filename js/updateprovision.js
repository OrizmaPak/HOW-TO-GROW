
async function updateprovision () {
    await  httpRequest('updateprovision.php');

    
   
const showtotal = document.querySelector(".showtotal");
const selectedItemContainer = document.querySelector(".selecteditem");
console.log("it's working");
const general = {
  total: 4944,
  groupeditems: [
    {
      title: "50kg bag of rice",
      quantity: 1,
      price: 55000,
      id: 1,
    },
    {
      title: "50kg bag of rice",
      quantity: 1,
      price: 55000,
      id: 2,
    },
    {
      title: "50kg bag of rice",
      quantity: 1,
      price: 55000,
      id: 3,
    },
    {
      title: "50kg bag of rice",
      quantity: 1,
      price: 55000,
      id: 4,
    },

    {
      title: "50kg bag of rice",
      quantity: 1,
      price: 55000,
      id: 5,
    },

    {
      title: "50kg bag of rice",
      quantity: 1,
      price: 55000,
      id: 6,
    },

    {
      title: "50kg bag of rice",
      quantity: 1,
      price: 55000,
      id: 7,
    },
  ],
};

const generateTemplate = () => {
  console.log(general.groupeditems.length);
  const arrayOfGenerateTemplate = general.groupeditems.map((item, index) => {
    return `
        <div class="splitt">
        <span class="descript" >
            <span class="number">${index + 1}</span>
           <span class="description">${item.title}</span>
         </span>
        <span class="figures splitt3">
            <span id="${item.id}" class="minusplus">
                <button type="button" class="btn  updateminus minus"><i class="fa-solid fa-minus "></i></button>
                <span class="volume">${item.quantity}</span>
                <button type="button" class="btn updateplus plus"><i class="fa-solid fa-plus "></i></button>
            </span>
            <span class="quantitycost">${item.price * item.quantity}</span>
            <div class="split">
            <div  class="  removeitem"><i class="fa-solid fa-xmark "></i></div>
            </div>
        </span>
    </div>
        `;
  });
  const stringPopulateTemplate = arrayOfGenerateTemplate.join("");

  return stringPopulateTemplate;
};

const display = () => {
  selectedItemContainer.innerHTML = generateTemplate();
  showtotal.value = grandTotal();

  const plus = document.querySelectorAll(".plus");
  const minus = document.querySelectorAll(".minus");
  const volume = document.querySelectorAll(".volume");
  const deleteitem = document.querySelectorAll(".removeitem");
  
  deleteitem.forEach((del) => {
    del.addEventListener("click", function (e) {
      e.preventDefault();
      const conrrentpres = e.currentTarget.parentElement.parentElement;
      console.log(conrrentpres);
      const parent = conrrentpres.querySelector(".minusplus");
      console.log(parent);
      const id = Number(parent.id);
      console.log(id);
      const remainingitems = general.groupeditems.filter(
        (item) => id !== item.id
      );
      console.log(remainingitems);
      general.groupeditems = remainingitems;
      // showtotal.textContent = grandTotal();
      display();
    });
  });

  plus.forEach((btnplus) => {
    btnplus.addEventListener("click", function (e) {
      e.preventDefault();
      const parent = btnplus.parentElement;
      console.log(parent);
      const id = Number(parent.id);
      console.log(id);
      const [currentItem] = general.groupeditems.filter(
        (item) => id === item.id
      );
      currentItem.quantity++;
      console.log(currentItem);
      display();
      // showtotal.textContent = grandTotal();
    });
  });
  minus.forEach((btnminus) => {
    btnminus.addEventListener("click", function (e) {
      e.preventDefault();
      const parent = btnminus.parentElement;
      const id = Number(parent.id);
      console.log(id);
      const currentItem = general.groupeditems.filter((item) => id === item.id);
      currentItem[0].quantity--;
      console.log(currentItem);
      display();
      // showtotal.textContent = grandTotal();
    });
  });
};


  display();


function grandTotal() {
  const arrOfProductTotalPrice = general.groupeditems.map(
    (item) => item.quantity * item.price
  );
  const grantota = arrOfProductTotalPrice.reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  return grantota;
}


    
    
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

	function validateUpdateProvision(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var matselectitem = document.getElementById('matselectitem');
	   // var matDepartmentLocation = document.getElementById('matdepartmentlocation');
	
		
		
		if(matselectitem.value.length < 1){
			mssg += 'Item is Invalid <br />';			
			matselectitem.style.borderColor = 'red';
			flag =0;
		}
	
		else{
			matselectitem.style.borderColor = 'lightgray';
		}
		
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				matselectitem.style.borderColor = 'lightgray';
				// matDepartmentLocation.style.borderColor = 'lightgray';

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getUpdateProvisionParams(){
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


var	saveUpdateProvision = function(e){
	  showSpinner();
		
		if(!validateUpdateProvision()){ 
		 hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/companyscript.php',true);
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
		request.send(getUpdateProvisionParams());

	}

if(document.getElementById('matupdatebtn'))document.getElementById('matupdatebtn').addEventListener('click',validateUpdateProvision,false);





}

 var updateprovisionbtn = document.getElementById('updateprovision');
    if(updateprovisionbtn) updateprovisionbtn.addEventListener('click', e=>updateprovision());
    
