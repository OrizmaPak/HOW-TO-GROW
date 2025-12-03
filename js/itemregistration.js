
async function openItemRegistration(){
    
await httpRequest('itemregistration.php'); 


    
    
var getAjaxObject = function(){
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


const matLocalStorageData = localStorage.getItem('inventoryupdate');
if (matLocalStorageData !== null) {
  const myObject = JSON.parse(matLocalStorageData);
  console.log('matthew is getting it', myObject)
  document.getElementById('matitemregistrationitemname').value = myObject.itemname;
  document.getElementById('matitemregistrationitemtype').value = myObject.itemtype.toLowerCase();
  document.getElementById('matitemregistrationmodel').value = myObject.model;
  document.getElementById('matitemregistrationsavingselling').value = myObject.savingsellingprice;
  document.getElementById('matitemregistrationcashselling').value = myObject.cashsellingprice;
  document.getElementById('matitemregistrationmarketingprice').value = myObject.marketingprice;
  document.getElementById('matitemregistrationitemclass').value = myObject.itemclass;
  document.getElementById('matitemregistrationcost').value = myObject.cost
  document.getElementById('matitemregistrationcomposite').value = myObject.composite
  
  localStorage.clear()
  
  
  // do something with the data
} else {
  // data does not exist in localStorage
}

var mattItemRegItemName = document.getElementById('matitemregistrationitemname');
var mattItemRegItemType = document.getElementById('matitemregistrationitemtype');
var mattItemRegModel = document.getElementById('matitemregistrationmodel');
var mattItemRegSavingSelling = document.getElementById('matitemregistrationsavingselling');
var mattItemRegCashSelling = document.getElementById('matitemregistrationcashselling');
var mattItemRegMarketingPrice = document.getElementById('matitemregistrationmarketingprice');
var mattItemRegCost = document.getElementById('matitemregistrationcost');


// Fetching from fetchItemtypescript
let objectForChange = null;
function AddEventToSelectItem (arrayOfObj,matSelectItem){
    let currentValue;
    matSelectItem.addEventListener('change',function(){
        currentValue = matSelectItem.value ;
        // console.log(currentValue);
        const selectObj = arrayOfObj.filter(value=> value.itemid === matSelectItem.value)[0];
        objectForChange = selectObj;
        // console.log(selectObj );
        let {
            itemtype,
            itemname,
            model,
            cost,
            savingsellingprice,
            cashsellingprice,
            marketingprice,
        } = selectObj;
        
        mattItemRegItemType.value = itemtype;
        mattItemRegItemName.value = itemname;
        mattItemRegModel.value = model;
        mattItemRegSavingSelling.value = savingsellingprice;
        mattItemRegCashSelling.value = cashsellingprice;
        mattItemRegMarketingPrice.value = marketingprice;
        mattItemRegCost.value = cost;
           
    });
    
}


  function getItemTypes(){
    const requestItem = getAjaxObject();
    requestItem.open('POST','../controllers/fetchitemtypescript.php',true);
    requestItem.onreadystatechange = function(){
       if(requestItem.readyState == 4 && requestItem.status == 200){
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            console.log('itemtype ', result);
            const arrayOfItemType = result.data.data;
            console.log('--yeah----',arrayOfItemType)
            let arrayOfItemTypeStr  = arrayOfItemType.map(each=>{
             return`
             <option value=${each.itemtype}>  `
         });
         if(document.getElementById('allitemtypes')){
             
            document.getElementById('allitemtypes').innerHTML =  arrayOfItemTypeStr.join(' ')
         }
        }
       else{
        //   console.log("not success ",requestItem)
       }
    };
    requestItem.setRequestHeader('Connection','close');
    requestItem.send();
}
getItemTypes()










function getItemType(){
    const requestItem = getAjaxObject();
    
    requestItem.open('POST','../controllers/fetchinventoryitemscript.php',true);
    
    requestItem.onreadystatechange = function(){
       
       if(requestItem.readyState == 4 && requestItem.status == 200){
           
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('result', result);
            const ObjectOfObj = result.data;
            const arrayOfObj = ObjectOfObj.data;
            // console.log(arrayOfObj);
            
           
            function GenerateOptionsTemplate(){
              let arrayOfOptionTemplate =  arrayOfObj.map((eachObj,index)=>{
                    return `<option value ="${eachObj.itemid}" id="${index}" > ${eachObj.itemname} </option>`;
                });
                let stringOfPopulatedOption = arrayOfOptionTemplate.join('');
                
                return stringOfPopulatedOption;
            }
            
            // console.log(GenerateOptionsTemplate());
            const matSelectItem = document.getElementById('matitemregistrationselectitem');
            if(matSelectItem){
                let selectItemHead = matSelectItem.innerHTML;
                matSelectItem.innerHTML = selectItemHead + GenerateOptionsTemplate();
                
                    //  var mattItemRegselectItem = document.getElementById("matitemregistrationselectitem");
                
                    if(matSelectItem) {
                           AddEventToSelectItem(arrayOfObj, matSelectItem)
                    } 
                
            }
                  
                        
                   
       }
       else{
        //   console.log("not success ",requestItem)
       }
    };
    
    requestItem.setRequestHeader('Connection','close');
  
    requestItem.send();
}

getItemType();



function changesChecker(){
    const initialValue = objectForChange;
    const selectData = {
        // selectitem: selectItem.value,
        itemname: mattItemRegItemName.value,
        itemtype: mattItemRegItemType.value,
        model: mattItemRegModel.value,
        savingsellingprice: mattItemRegSavingSelling.value,
        cashsellingprice: mattItemRegCashSelling.value,
        marketingprice:  mattItemRegMarketingPrice.value,
        cost:mattItemRegCost.value,
    };
  
    // console.log('maaaaaaaaa');
    // console.log(initialValue);
    // console.log(selectData);

    for (let [key, value] of Object.entries(selectData)) {
        // console.log(key, initialValue[key], selectData[key]);
        if (selectData[key] != initialValue[key]) {
          changed = true;
        }
    }

} 

// Dynamically setting options to Select Item 



function validateItemRegistration(){
        var flag = 1;
        var mssg='';
        //used for BVN instead
        var matItemRegselectItem = document.getElementById("matitemregistrationselectitem");
        var matItemRegItemName = document.getElementById('matitemregistrationitemname');
        var matItemRegItemType = document.getElementById('matitemregistrationitemtype');
        var matItemRegModel = document.getElementById('matitemregistrationmodel');
        var matItemRegSavingSelling = document.getElementById('matitemregistrationsavingselling');
        var matItemRegCashSelling = document.getElementById('matitemregistrationcashselling');
        var matItemRegMarketingPrice = document.getElementById('matitemregistrationmarketingprice');
        var matItemRegCost = document.getElementById('matitemregistrationcost');
        
        // const checkItemType = itemType.value;
        // const checkModel = model.value;
        // const checkSavingSellingPrice = savingSellingPrice.value 
        // const checkCashSellingPrice = cashSellingPrice.value
        // const CheckMarketingPrice = marketingPrice.value
        // const checkCost = cost.value
       
        
        if(matItemRegItemName.value.length < 1){
            mssg += 'Item name is Invalid <br />';			
            matItemRegItemName.style.borderColor = 'red';
            flag = 0;
        }
        else if(matItemRegItemName.value.length > 250){
            mssg += 'Item name must not more than 250 characters  <br />'
            matItemRegItemName.style.borderColor = 'red';
            flag =0;
        }
        else{
            matItemRegItemName.style.borderColor = 'lightgray';
        }
    
        if(matItemRegItemType.value.length < 1){
            mssg += 'Item type is Invalid <br />';			
            matItemRegItemType.style.borderColor = 'red';
            flag =0;
        }
        else if(matItemRegItemType.value.length > 100){
            mssg += 'Item type must not more than 100 characters  <br />';
            matItemRegItemType.style.borderColor = 'red';
            flag =0;
        }
        else{
            matItemRegItemType.style.borderColor = 'lightgray';
        }
    
        if(matItemRegModel.value.length < 1){
            mssg += 'Model is Invalid <br />';			
            matItemRegModel.style.borderColor = 'red';
            flag =0;
        }
        else if(matItemRegModel.value.length > 150){
            mssg += 'Model must not more than 150 characters  <br />';
            matItemRegModel.style.borderColor = 'red';
            flag =0;
        }
        else{
            matItemRegModel.style.borderColor = 'lightgray';
        }
    
        if(matItemRegSavingSelling.value.length < 1){
            mssg += 'Saving selling price is Invalid <br />';			
            matItemRegSavingSelling.style.borderColor = 'red';
            flag =0;
        }else{
            matItemRegSavingSelling.style.borderColor = 'lightgray';
        }
       
        if(matItemRegCashSelling.value.length < 1){
            mssg += 'Cash selling price is Invalid <br />';			
            matItemRegCashSelling.style.borderColor = 'red';
            flag =0;
        }else{
            matItemRegCashSelling.style.borderColor = 'lightgray';
        }
    
        if(matItemRegMarketingPrice.value.length < 1){
            mssg += 'Marketing price is blank  <br />';
            matItemRegMarketingPrice.style.borderColor = 'red';
            flag = 0;
    
        }else{
            matItemRegMarketingPrice.style.borderColor = 'lightgray';
        }
        
        if(matItemRegCost.value.length < 1){
            mssg += 'Cost is Invalid  <br />';
            matItemRegCost.style.borderColor = 'red';
            flag = 0;
        }else{
            matItemRegCost.style.borderColor = 'lightgray';
        }
        
        
        if(flag == 0){
            
            var mbox = document.getElementById('messageBox');
            mbox.innerHTML = mssg;
            mbox.style.display = 'block';
            mbox.style.visibility = 'visible';
    
            setTimeout(function(){
                mbox.style.display = 'none';
                mbox.style.visibility = 'hidden';
                matItemRegItemName.style.borderColor = "lightgray";
                matItemRegItemType.style.borderColor = "lightgray";
                matItemRegModel.style.borderColor = "lightgray";
                matItemRegSavingSelling.style.borderColor = 'lightgray';
                matItemRegCashSelling.style.borderColor = 'lightgray';
                matItemRegMarketingPrice.style.borderColor = 'lightgray';
                matItemRegCost.style.borderColor = 'lightgray'; 
               
                // matItemRegCost.style.borderColor = 'lightgray';
                // stockIn.style.borderColor = 'lightgray';
                // stockOut.style.borderColor = 'lightgray';
                // gift.style.borderColor = 'lightgray';
                // balance.style.borderColor = 'lightgray';
    
            }, 2000);	
            return false;
        }else{ 
            return true; 
        }
    
    }
    
    
    
let changed = false
    function getItemRegistrationParams(){
        var paramstr = new FormData();
        paramstr.append("itemid", document.getElementById('matitemregistrationselectitem').value );
        paramstr.append("itemname", document.getElementById('matitemregistrationitemname').value );
        paramstr.append("itemtype", document.getElementById('matitemregistrationitemtype').value );
         paramstr.append("itemclass", document.getElementById('matitemregistrationitemclass').value );
        paramstr.append("model", document.getElementById('matitemregistrationmodel').value );
        paramstr.append("cost", document.getElementById('matitemregistrationcost').value);
        paramstr.append("savingsellingprice", document.getElementById('matitemregistrationsavingselling').value );
        paramstr.append("cashsellingprice", document.getElementById('matitemregistrationcashselling').value );
        paramstr.append("composite", document.getElementById('matitemregistrationcomposite').value );
        paramstr.append("marketingprice", document.getElementById('matitemregistrationmarketingprice').value );
       
       
        
        if(changed){
            paramstr.append("edited", 'TRUE');
        };
       
        for (var pair of paramstr.entries()) {
              console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
            }
        // paramstr.append("stockin", document.getElementById('stockin').value);
        // paramstr.append("stockout", document.getElementById('stockout').value);
        // paramstr.append("gift", document.getElementById('gift').value);
        // paramstr.append("balance", document.getElementById('balance').value);
        
       /* const checkItemType = itemType;
        const checkModel = model;
        const checkSavingSellingPrice = savingSellingPrice 
        const checkCashSellingPrice = cashSellingPrice
        const CheckMarketingPrice = marketingPrice
        const checkCost = cost
        
        if( checkItemType !== document.getElementById('itemname').value ){
            paramstr.append("edited", 'YES' ); 
        }*/
        
    return paramstr;
        
    }
    
    
const    saveItemRegistration = function(e){
    // console.log(document.getElementById('matitemregistrationcomposite').value )
	    showSpinner()
		if(!validateItemRegistration()){ 
		    hideSpinner()
			return; 
		}
		if(objectForChange){
		  //  console.log('Checking..........');
		   changesChecker() ;
		   objectForChange = null;
		}else{
		   changed = false;
		    
		}
       
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers//inventoryscript.php',true);
		request.onreadystatechange = function(){
			if(request.readyState == 1){

			}
			if(request.readyState == 4 && request.status == 200){
			 //   console.log('responseText', request.responseText )
			    const result = JSON.parse(request.responseText)
			 //   console.log('result', result)
			    let stat = 2
			    if(result.result === 'Successful'){
			        stat = 1
			        for(let i = 0; i < document.getElementsByTagName('input').length; i++){
			            document.getElementsByTagName('input')[i].value = ''   
			        }
			        
			        for(let i = 0; i < document.getElementsByTagName('select').length; i++){
			            document.getElementsByTagName('select')[i].value = ''
			        }
			    }
			    else{
			        
			        stat = 0
			    }
			    
			    callModal(result.result, stat)
				
			}else{
			    
			    hideSpinner();
				
			}

			e.stopPropagation();
		}

		request.setRequestHeader('Connection','close');
		request.send(getItemRegistrationParams());

	}

if(document.getElementById('matitemregistrationupdatebtn'))document.getElementById('matitemregistrationupdatebtn').addEventListener('click',saveItemRegistration,false);
    
}  
  
var itemRegistration = document.getElementById('itemregistration') 
    
if(itemRegistration) itemRegistration.addEventListener('click',openItemRegistration,false)
    



    
    
    
    
    
    
