	getAjaxObject = function(){
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


    function oregetitemparams(id){
		var paramstr = new FormData();
	 		try{
		    paramstr.append('itemtype',document.getElementById('oreitementry').value);
		    if(id){
        	    paramstr.append('id', id);		
		    }
	 		}catch(err){
	 		    console.log(err)
	 		}
 
	   return paramstr;

	}
	
	
	const updateOreItemtype =(id, action)=>{
	    const getid =()=>{
	        var paramstr = new FormData();
	 		try{
		    paramstr.append('id', id);		
	 		}catch(err){
	 		    console.log(err)
	 		}
	   return paramstr;
	    }
	    if(action == 'update'){
	       // ENTER EDIT MODE
	       const edititem =(result)=>{
	           if(document.getElementById('oreitementry'))document.getElementById('oreitementry').value = result.data.data[0].itemtype;
	           if(document.getElementById('oreitemtypesubmitbtn'))document.getElementById('oreitemtypesubmitbtn').textContent = 'Update';
	           if(document.getElementById('oreitemtypesubmitbtn'))document.getElementById('oreitemtypesubmitbtn').name = result.data.data[0].id;
	       }
	        callController('fetchitemtypescript.php', getid(), 'fetchitemtypescript', null, edititem )
	    }
	    if(action == 'delete'){
	        const clearrefresh2 =(result)=>{
            if(document.getElementById('oreitementry'))document.getElementById('oreitementry').value = '';
            setTimeout(()=>{orefetchitemtype()},3000);
	    }
	        callController('deleteitemtype.php', getid(), 'deleteitemtype', null, clearrefresh2)
	    }
	} 
	
	const orefetchitemtype =()=>{ 
	
	    const loadfetch = (result) =>{
	         let oreitemtypedata = result.data.data;
				    console.log(oreitemtypedata)
				    if(document.getElementById('oreitemtypescreennn')){
				        document.getElementById('oreitemtypescreennn').innerHTML = 
				             oreitemtypedata.map((data, index) => {
				          return(`
                            <tr class="">
                                <td> ${index+1} </td>
                                <td> ${data.itemtype} </td>
                                <td>
                                    <div class="flex" style="align-items:center;width:fit-content">
                                        <button onclick="updateOreItemtype(${data.id}, 'update')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="updateOreItemtype(${data.id}, 'delete')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
                            `)
				        }).join('')
				    
	    }
	   //loadfetch()
	}

// Example usage:
// loadfetch(result);

	   callController('fetchitemtypescript.php',null, 'fetchitemtypescript', null, loadfetch);
	    
	}


    async function oreitemtype() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('itemtype.php', 'override')  
        const clearrefresh =(result)=>{
            if(document.getElementById('oreitementry'))document.getElementById('oreitementry').value = '';
            orefetchitemtype();
	    }
        if(document.getElementById('oreitemtypesubmitbtn'))document.getElementById('oreitemtypesubmitbtn').addEventListener('click', e=>{
	               if(document.getElementById('oreitemtypesubmitbtn').textContent == 'Update'){
	               callController('itemtypescript.php', oregetitemparams(document.getElementById('oreitemtypesubmitbtn').name), 'itemtypescript', ['oreitementry'], clearrefresh)
	               }else{
	               callController('itemtypescript.php', oregetitemparams(), 'itemtypescript', ['oreitementry'], clearrefresh)};
	               }, true)
        if(document.getElementById('oreitemtyperesetbtn'))document.getElementById('oreitemtyperesetbtn').addEventListener('click', e=>{
	               document.getElementById('oreitemtypesubmitbtn').textContent = 'Save Changes'
	               document.getElementById('oreitemtypesubmitbtn').name =''
	               document.getElementById('oreitementry').value =''
	               }, true)
        // callController('fetchitemtypescript.php',null, 'fetchitemtypescript', null, null);
        orefetchitemtype();
}




    window.onmousedown=(e)=>{
    var el = e.target;
    if(el.tagName.toLowerCase() == 'p' && el.textContent == 'edit' && el.parentElement.classList.contains('itemee')){
        el.parentElement.parentElement.nextElementSibling.classList.remove('hidden');
        setTimeout(() => {
            el.textContent = 'save';
            el.nextElementSibling.textContent = 'cancel'
        }, 100);
        el.parentElement.parentElement.nextElementSibling.children[0].value = el.parentElement.previousElementSibling.textContent
    }
    if(el.tagName.toLowerCase() == 'p' && el.textContent == 'save' && el.parentElement.classList.contains('itemee')){ 
        if(el.parentElement.parentElement.nextElementSibling.children[0].value !== ''){
            el.parentElement.parentElement.children[0].textContent = el.parentElement.parentElement.nextElementSibling.children[0].value;
            el.parentElement.parentElement.nextElementSibling.children[0].value = ''; 
            setTimeout(() => {
                el.textContent = 'edit';
                el.nextElementSibling.textContent = 'remove';
            }, 100);
            el.parentElement.parentElement.nextElementSibling.classList.add('hidden');
        }else{
            alert('input must be filled')
        }
    }
    if(el.tagName.toLowerCase() == 'p' && el.textContent == 'cancel' && el.parentElement.classList.contains('itemee')){
        el.parentElement.parentElement.nextElementSibling.children[0].value = '';
        el.parentElement.parentElement.nextElementSibling.classList.add('hidden');
        setTimeout(() => {
            el.textContent = 'remove';
            el.previousElementSibling.textContent = 'edit';
        }, 100);
    }
    
}


var oreitemtypebbtn = document.getElementById("itemtype");
if (oreitemtypebbtn) oreitemtypebbtn.addEventListener("click", oreitemtype, false);


function handleImagePreview(inputElement, previewElement) {
  inputElement.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;

        // Set max width and height for the image
        img.style.maxWidth = '150px';
        img.style.maxHeight = '150px';
        img.style.objectFit = 'contain';  // Ensure the image maintains aspect ratio

        // Clear the preview area and append the image
        previewElement.innerHTML = '';  // Clear existing preview
        previewElement.appendChild(img);
      }
      reader.readAsDataURL(file);
    } else {
      previewElement.innerHTML = '<span>Preview</span>'; // Default text if no file is selected
    }
  });
}


async function openItemRegistration(){
    
await httpRequest('itemregistration.php'); 


   
  // Initialize the image preview for each input field
  const image1Input = document.getElementById('image1');
  const image1Preview = document.getElementById('preview-image1');
  handleImagePreview(image1Input, image1Preview);

  const image2Input = document.getElementById('image2');
  const image2Preview = document.getElementById('preview-image2');
  handleImagePreview(image2Input, image2Preview);

  const image3Input = document.getElementById('image3');
  const image3Preview = document.getElementById('preview-image3');
  handleImagePreview(image3Input, image3Preview);
    
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




var mattItemRegItemName = document.getElementById('matitemregistrationitemname');
var mattItemRegItemType = document.getElementById('matitemregistrationitemtype');
var mattItemRegModel = document.getElementById('matitemregistrationmodel');
var mattItemRegSavingSelling = document.getElementById('matitemregistrationsavingselling');
var mattItemRegCashSelling = document.getElementById('matitemregistrationcashselling');
var mattItemRegMarketingPrice = document.getElementById('matitemregistrationmarketingprice');
var mattItemRegCost = document.getElementById('matitemregistrationcost');
var matitemregistrationcomposite = document.getElementById('matitemregistrationcomposite');
var matitemregistrationitemclass = document.getElementById('matitemregistrationitemclass');


// Fetching from fetchItemtypescript
let objectForChange = null;
function AddEventToSelectItem (arrayOfObj,matSelectItem){
    let currentValue;
    matSelectItem.addEventListener('change',function(){
        currentValue = matSelectItem.value ;
        // console.log(currentValue);
        const selectObj = arrayOfObj.filter(value=> value.itemid === matSelectItem.value)[0];
        objectForChange = selectObj;
        console.log('the object', selectObj );
        let {
            itemtype,
            itemname,
            model,
            cost,
            savingsellingprice,
            cashsellingprice,
            marketingprice,
            composite,
            itemclass,
            image1,
            image2,
            image3
        } = selectObj;

        matitemregistrationitemclass.value = itemclass
        matitemregistrationcomposite.value = composite
        mattItemRegItemType.value = itemtype;
        mattItemRegItemName.value = itemname;
        mattItemRegModel.value = model;
        mattItemRegSavingSelling.value = savingsellingprice;
        mattItemRegCashSelling.value = cashsellingprice;
        mattItemRegMarketingPrice.value = marketingprice;
        mattItemRegCost.value = cost;
        const linkurl = 'https://htg.com.ng/howtogrow/images/inventory/'
        if(image1){
            const previewElement = document.getElementById('preview-image1')
            const img = new Image();
            img.src = linkurl+image1;
    
            // Set max width and height for the image
            img.style.maxWidth = '150px';
            img.style.maxHeight = '150px';
            img.style.objectFit = 'contain';  // Ensure the image maintains aspect ratio
    
            // Clear the preview area and append the image
            previewElement.innerHTML = '';  // Clear existing preview
            previewElement.appendChild(img);
        } 
        if(image2){
            const previewElement = document.getElementById('preview-image2')
            const img = new Image();
            img.src = linkurl+image2;
    
            // Set max width and height for the image
            img.style.maxWidth = '150px';
            img.style.maxHeight = '150px';
            img.style.objectFit = 'contain';  // Ensure the image maintains aspect ratio
    
            // Clear the preview area and append the image
            previewElement.innerHTML = '';  // Clear existing preview
            previewElement.appendChild(img);
        }   
        if(image3){
            const previewElement = document.getElementById('preview-image3')
            const img = new Image();
            img.src = linkurl+image3;
    
            // Set max width and height for the image
            img.style.maxWidth = '150px';
            img.style.maxHeight = '150px';
            img.style.objectFit = 'contain';  // Ensure the image maintains aspect ratio
    
            // Clear the preview area and append the image
            previewElement.innerHTML = '';  // Clear existing preview
            previewElement.appendChild(img);
        }   
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
await getItemTypes()










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
  setTimeout(()=>{document.getElementById('matitemregistrationselectitem').value = myObject.itemid},2000)
  
  document.getElementById('inventoryedit').value = Number(myObject.id)
  
  localStorage.removeItem('inventoryupdate');
  
  
  // do something with the data
} else {
  // data does not exist in localStorage
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

await getItemType();



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
        paramstr.append("image1", document.getElementById('image1').files[0] );
        paramstr.append("image2", document.getElementById('image2').files[0] );
        paramstr.append("image3", document.getElementById('image3').files[0] );
        if(document.getElementById("inventoryedit")){
            if(document.getElementById("inventoryedit").value)paramstr.append("id", document.getElementById('inventoryedit').value );
        }
       
       
        
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
    
    
const saveItemRegistration = function(event){
    // Prevent form submission
    event.preventDefault();
    
    
    // Show spinner to indicate processing
    showSpinner();
    
    // Validate form inputs
    if(!validateItemRegistration()) { 
        hideSpinner();
        return; 
    }


    if(objectForChange){
        changesChecker();
        objectForChange = null;
    } else {
        changed = false;
    }


    // Create AJAX request object
    var request = getAjaxObject();
    
    // Open the request with POST method
    request.open('POST', '../controllers/inventoryscript.php', true);
    
    // Handle different states of the AJAX request
    request.onreadystatechange = function(){
        if(request.readyState == 1){
        }
        
        if(request.readyState == 4 && request.status == 200){

            const result = JSON.parse(request.responseText);

            let stat = 2;
            if(result.result === 'Successful'){
                stat = 1;
                alert("Operation successful!");
                
                // Clear input fields after success
                for(let i = 0; i < document.getElementsByTagName('input').length; i++){
                    document.getElementsByTagName('input')[i].value = '';
                }

                for(let i = 0; i < document.getElementsByTagName('select').length; i++){
                    document.getElementsByTagName('select')[i].value = '';
                }
            } else {
                stat = 0;
                alert("Operation failed!");
            }

            // Call modal with result status
            callModal(result.result, stat);
        } else {
            callModal("Request failed or is in an unexpected state");
        }

        // Hide the spinner and stop propagation if necessary
        hideSpinner();
        event.stopPropagation();
    };

    // Set request header and send the parameters
    request.setRequestHeader('Connection', 'close');
    request.send(getItemRegistrationParams());
};


if(document.getElementById('matitemregistrationupdatebtn'))document.getElementById('matitemregistrationupdatebtn').addEventListener('click',e=>saveItemRegistration(e),false);
    
}  
  
var itemRegistration = document.getElementById('itemregistration') 
    
if(itemRegistration) itemRegistration.addEventListener('click',openItemRegistration,false)
    

var rowPerPage = 30;
var consumablefetchdata, nonconsumablefetchdata;
var initpagination={
    matstart:0,
    matend:rowPerPage
}
var paginationstate = {...initpagination};

var viewinventorylist_datasource = [];
function showImageGrid(image1, image2, image3) {
    const linkurl = 'https://howtogrowng.com/htg/images/inventory/'
    // Define the HTML structure for the grid of images
    const imageGridHTML = `
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
            <img src="${linkurl}${image1}" alt="Image 1" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <img src="${linkurl}${image2}" alt="Image 2" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <img src="${linkurl}${image3}" alt="Image 3" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        </div>
    `;

    // Use SweetAlert2 to show the images in a modal with the grid layout
    Swal.fire({
        title: 'Image Gallery',
        html: imageGridHTML,
        showCloseButton: true,
        showConfirmButton: false,
        width: '80%', // Adjust modal width
        padding: '20px',
        background: '#fff',
    });
}

async function openViewInventoryList(){
    
await httpRequest('viewinventorylist.php'); 


const viewinventorylistepaginate=(data)=>{
    viewinventorylist_datasource = [];
    viewinventorylist_datasource.push(data.data.data)
    initPagination(viewinventorylist_datasource[0], viewinventorylistsetCurrentPage)
    }


var viewinventorylistsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewinventorylist_datasource.length) {
        viewinventorylist_datasource[0].forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewinventorylistTableRows(item, index)
            }
        })
        /*if(document.querySelector('#viewinventorylistfulltable tbody').innerHTML === '') oreviewinventorylistaccountsbbtn.click()*/
        // appendPropertyAccountTableFoot()
    }
    else {
        if(document.getElementById("viewinventorylisttabledata"))document.getElementById("viewinventorylisttabledata").innerHTML=  renderNoTableData()
    }
};



function appendviewinventorylistTableRows(item, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    if(document.getElementById("viewinventorylisttabledata"))document.getElementById("viewinventorylisttabledata").innerHTML += `
                            <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.itemname } </td>
                    <td> ${ item.itemtype } </td>
                    <td> ${ item.model } </td>
                    <td> ${ item.cost } </td>
                    <td> ${ item.savingsellingprice } </td>
                    <td> ${ item.cashsellingprice } </td>
                    <td> ${ item.marketingprice } </td>
                     <td class="" style="display:flex;gap:10px;">
                        
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editViewInventory(${item.id})">Edit</span>
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="archiveViewInventory(${item.id})"">Archive</span>
                        <span class="viewbtn mtablebtn" style="color:white;background:green;font-weight:bold" onclick="showImageGrid('${item.image1}', '${item.image2}', '${item.image3}')">Images</span>
                        
                    </td>
                   
                </tr>
    `
} 



 jtabledata = document.getElementById('viewinventorylisttabledata');
        // paginationLimit = 10;
        initializePaginationParams(viewinventorylistsetCurrentPage);
        
callController('fetchinventorybyclass.php', null, 'fetchinventorybyclass', null, viewinventorylistepaginate, 'silent');
    
    
/*var getAjaxObject = function(){
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


function consumable(){
    var paramstr = new FormData()
    paramstr.append('itemclass', 'Consumable')
    
    // for (var pair of paramstr.entries()) {
    //           console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
    //         }
    return paramstr
}
   function getConsumable(){
    const requestItem = getAjaxObject();
    
    requestItem.open('POST','../controllers/fetchinventorybyclass.php',true);
    
    requestItem.onreadystatechange = function(){
       
       if(requestItem.readyState == 4 && requestItem.status == 200){
           
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('fetchConsumable ', result);
            const arrayOfConsumable = result.data;
            // console.log('consumable',arrayOfConsumable )
            consumablefetchdata = arrayOfConsumable
            renderViewInventoryTable(arrayOfConsumable)
            
       }
       else{
        //   console.log("not success ",requestItem)
       }
    };
    
    requestItem.setRequestHeader('Connection','close');
    requestItem.send(consumable());
}

 getConsumable()

function nonConsumable(){
    var paramstr = new FormData()
    paramstr.append('itemclass', 'Non-Consumable')
    
    // for (var pair of paramstr.entries()) {
    //           console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
    //         }
    return paramstr
}

  function getNonConsumable(){
      
    const requestItem = getAjaxObject();
    requestItem.open('POST','../controllers/fetchinventorybyclass.php',true);
    requestItem.onreadystatechange = function(){
       if(requestItem.readyState == 4 && requestItem.status == 200){
            const result = JSON.parse(requestItem.responseText);
            // console.log('fetchConsumable ', result);
            const orearrayOfConsumable = result.data;
            console.log('filtered',orearrayOfConsumable )
            consumablefetchdata = orearrayOfConsumable
            renderViewInventoryTable(orearrayOfConsumable)
            
       }
       else{
        //   console.log("not success ",requestItem)
       }
    };
    requestItem.setRequestHeader('Connection','close');
    requestItem.send(nonConsumable());
}
getNonConsumable()   

function filterConsumable(){
    var paramstr = new FormData()
    paramstr.append('itemclass', document.getElementById('matviewinventoryfilter').value)
    paramstr.append('itemname', document.getElementById('viewinventoryitemname').value)
    paramstr.append('status', document.getElementById('viewinventorystatus').value)
    paramstr.append('composite', document.getElementById('viewinventorycomposite').value)
    
    // for (var pair of paramstr.entries()) {
    //           console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
    //         }
    return paramstr
}

  function getFilterConsumable(){
      
    const requestItem = getAjaxObject();
    requestItem.open('POST','../controllers/fetchinventorybyclass.php',true);
    requestItem.onreadystatechange = function(){
       if(requestItem.readyState == 4 && requestItem.status == 200){
           const result = JSON.parse(requestItem.responseText);
            // console.log(requestItem);
            const arrayOfConsumable = result;
            // console.log('consumable',arrayOfConsumable )
            consumablefetchdata = arrayOfConsumable
            renderViewInventoryTable(arrayOfConsumable)
       }
       else{
        //   console.log("not success ",requestItem)
       }
    };
    requestItem.setRequestHeader('Connection','close');
    requestItem.send(filterConsumable());
}*/

/*if(document.getElementById('matviewinventoryfilter')){
    
document.getElementById('matviewinventoryfilter').addEventListener('change',function(){
    paginationstate = {...initpagination}
    // console.log(document.getElementById('matviewinventoryfilter'))
    if(document.getElementById('matviewinventoryfilter').value === 'Consumable'){
        // console.log(consumablefetchdata)
         renderViewInventoryTable(consumablefetchdata)
    }else{
        // console.log(nonconsumablefetchdata)
        renderViewInventoryTable(nonconsumablefetchdata)
    }
})
}
*/
/*
next.addEventListener("click", function () {
  if (paginationstate.matend >= (document.getElementById("matviewinventoryfilter").value === "Consumable" ? consumablefetchdata.data : nonconsumablefetchdata.data).length) {
    return;
  }
  paginationstate.matstart = paginationstate.matend;
  paginationstate.matend += rowPerPage;

 if(document.getElementById('matviewinventoryfilter').value === 'Consumable'){
        // console.log(consumablefetchdata)
         renderViewInventoryTable(consumablefetchdata)
    }else{
        // console.log(nonconsumablefetchdata)
        renderViewInventoryTable(nonconsumablefetchdata)
    }
    
    
});

prev.addEventListener("click", function () {
//   console.log("next Click");
  if (paginationstate.matstart < 1) {
    return;
  }
  paginationstate.matstart -= rowPerPage;
  paginationstate.matend -= rowPerPage;
 if(document.getElementById('matviewinventoryfilter').value === 'Consumable'){
        // console.log(consumablefetchdata)
         renderViewInventoryTable(consumablefetchdata)
    }else{
        // console.log(nonconsumablefetchdata)
        renderViewInventoryTable(nonconsumablefetchdata)
    }
});*/


function validateViewInventory(){
        var flag = 1;
        var mssg='';
        //used for BVN instead
        // var matItemRegselectItem = document.getElementById("matitemregistrationselectitem");
        var matViewInventoryItemName = document.getElementById('matviewinventoryitemname');
        var matViewInventoryItemType = document.getElementById('matviewinventoryitemtype');
        var matViewInventoryModel = document.getElementById('matviewinventorymodel');
        var matViewInventorySavingSelling = document.getElementById('matviewinventorysavingselling');
        var matViewInventoryCashSelling = document.getElementById('matviewinventorycashselling');
        var matViewInventoryMarketingPrice = document.getElementById('matviewinventorymarketingprice');
        var matViewInventoryCost = document.getElementById('matviewinventorycost');
        
        
        if(matViewInventoryItemName.value.length < 1){
            mssg += 'Item name is Invalid <br />';			
            matViewInventoryItemNamee.style.borderColor = 'red';
            flag = 0;
        }
        else if(matViewInventoryItemName.value.length > 250){
            mssg += 'Item name must not more than 250 characters  <br />'
            matViewInventoryItemName.style.borderColor = 'red';
            flag =0;
        }
        else{
            matViewInventoryItemName.style.borderColor = 'lightgray';
        }
    
        if(matViewInventoryItemType.value.length < 1){
            mssg += 'Item type is Invalid <br />';			
            matViewInventoryItemType.style.borderColor = 'red';
            flag =0;
        }
        else if(matViewInventoryItemType.value.length > 100){
            mssg += 'Item type must not more than 100 characters  <br />';
            matViewInventoryItemType.style.borderColor = 'red';
            flag =0;
        }
        else{
            matViewInventoryItemType.style.borderColor = 'lightgray';
        }
    
        if(matViewInventoryModel.value.length < 1){
            mssg += 'Model is Invalid <br />';			
            matViewInventoryModell.style.borderColor = 'red';
            flag =0;
        }
        else if(matViewInventoryModel.value.length > 150){
            mssg += 'Model must not more than 150 characters  <br />';
            matViewInventoryModel.style.borderColor = 'red';
            flag =0;
        }
        else{
            matViewInventoryModel.style.borderColor = 'lightgray';
        }
    
        if(matViewInventorySavingSelling.value.length < 1){
            mssg += 'Saving selling price is Invalid <br />';			
            matViewInventorySavingSelling.style.borderColor = 'red';
            flag =0;
        }else{
           matViewInventorySavingSelling.style.borderColor = 'lightgray';
        }
       
        if(matViewInventoryCashSelling.value.length < 1){
            mssg += 'Cash selling price is Invalid <br />';			
            matViewInventoryCashSelling.style.borderColor = 'red';
            flag =0;
        }else{
            matViewInventoryCashSelling.style.borderColor = 'lightgray';
        }
    
        if(matViewInventoryMarketingPrice.value.length < 1){
            mssg += 'Marketing price is blank  <br />';
            matViewInventoryMarketingPrice.style.borderColor = 'red';
            flag = 0;
    
        }else{
            matViewInventoryMarketingPrice.style.borderColor = 'lightgray';
        }
        
        if(matViewInventoryCost.value.length < 1){
            mssg += 'Cost is Invalid  <br />';
           matViewInventoryCost.style.borderColor = 'red';
            flag = 0;
        }else{
            matViewInventoryCost.style.borderColor = 'lightgray';
        }
        
        
        if(flag == 0){
            
            var mbox = document.getElementById('messageBox');
            mbox.innerHTML = mssg;
            mbox.style.display = 'block';
            mbox.style.visibility = 'visible';
    
            setTimeout(function(){
                mbox.style.display = 'none';
                mbox.style.visibility = 'hidden';
                matViewInventoryItemName.style.borderColor = "lightgray";
                matViewInventoryItemType.style.borderColor = "lightgray";
                matViewInventoryModel.style.borderColor = "lightgray";
                matViewInventorySavingSelling.style.borderColor = 'lightgray';
                matViewInventoryCashSelling.style.borderColor = 'lightgray';
                matViewInventoryMarketingPrice.style.borderColor = 'lightgray';
                matViewInventoryCost.style.borderColor = 'lightgray'; 
               
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
     

    function getViewInventoryParams(){
        var paramstr = new FormData();
        paramstr.append("itemname", document.getElementById('matviewinventoryitemname').value );
        paramstr.append("itemtype", document.getElementById('matviewinventoryitemtype').value );
        paramstr.append("model", document.getElementById('matviewinventorymodel').value );
        paramstr.append("cost", document.getElementById('matviewinventorycost').value);
        paramstr.append("savingsellingprice", document.getElementById('matviewinventorysavingselling').value );
        paramstr.append("cashsellingprice", document.getElementById('matviewinventorycashselling').value );
        paramstr.append("marketingprice", document.getElementById('matviewinventorymarketingprice').value );
       
       
        for (var pair of paramstr.entries()) {
              console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
            }
    return paramstr;
        
    }
    
const    saveViewInventory = function(event){
    // console.log(document.getElementById('matitemregistrationcomposite').value )
    event.preventDefault()
	    showSpinner()
		if(!validateViewInventory()){ 
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
		
		request.open('POST','../controllers/inventoryscript.php',true);
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
	
	function viewinventparams() {
    // Get form data
    let params = new FormData(document.getElementById('viewinventorylistform'));

    // Log form data to the console
    console.log("Form Data:", params);

    // Return form data
    return params;
}

	
	function actaore(result){
	    console.log('result', result)
	}

if(document.getElementById('matviewinventoryupdatebtn'))document.getElementById('matviewinventoryupdatebtn').addEventListener('click',saveViewInventory,false);
if(document.getElementById('viewinventoryfetch'))document.getElementById('viewinventoryfetch').addEventListener('click',e=>{e.preventDefault();callController('fetchinventorybyclass.php', viewinventparams(), 'fetchinventorybyclass',[],viewinventorylistepaginate)},false);
    const action = (result) => {
  const data = result.data.data;
  const uniqueItemNames = new Set();
  const uniqueOptions = data.map(dat => {
    if (!uniqueItemNames.has(dat.itemname)) {
      uniqueItemNames.add(dat.itemname);
      return `<option value="${dat.itemname}" />`;
    }
    return '';
  }).join('');

  document.getElementById('viewinventoryitemnamedatalist').innerHTML = uniqueOptions;
};

callController('fetchinventorynames.php', null, 'fetchinventorynames', [], action)

function action2(res){
    document.getElementById('viewinventoryitemtypedatalist').innerHTML = res.data.data.map(data=>`<option>${data.itemtype}</option>`).join('')
}

callController('fetchitemtypescript.php', null, 'fetchitemtypescript', [], action2)

 
} 


function renderViewInventoryTable(obj) {
   let viewinventorylistfetchdata = obj.data
    // console.log('hello yes',viewinventorylistfetchdata)
      indexBtnDisplay(viewinventorylistfetchdata) 
     
   if(!(viewinventorylistfetchdata.length > 30)){
       
      paginationstate.matend = viewinventorylistfetchdata.length
  }
    let jtabledata =  document.getElementById('viewinventorylisttabledata')
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewinventorylistfetchdata.length){
        viewinventorylistfetchdata.slice(paginationstate.matstart, paginationstate.matend).map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.itemname } </td>
                    <td> ${ item.itemtype } </td>
                    <td> ${ item.model } </td>
                    <td> ${ item.cost } </td>
                    <td> ${ item.savingsellingprice } </td>
                    <td> ${ item.cashsellingprice } </td>
                    <td> ${ item.marketingprice } </td>
                     <td class="btncolumn">
                        
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editViewInventory(${item.id})">Edit</span>
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="">Archive</span>
                    </td>
                   
                </tr>
            `;
        });
        
    }
    
  handleBtnColor()  
}

const indexBtnDisplay = (data) => {
    let arrayLength = data.length
    if( arrayLength <  rowPerPage){
         rowPerPage = arrayLength
    }else{
        rowPerPage = 30
    }
  const lengthOfBtn = Math.ceil(arrayLength / rowPerPage);
  const arrayOfButton =Array(lengthOfBtn).fill().map((each,index)=> {
      return `<button  onclick="indexBtnClick(${index+1})" class="pagbtn pagnumber" id="${index+1}" >${index+1}</button>`
  } )
//   console.log(arrayOfButton)
   document.getElementById('indexBtn').innerHTML = arrayOfButton.join(" ")
   
};

function indexBtnClick(i) {
  paginationstate.matstart = (i-1) * rowPerPage;
 
  paginationstate.matend = paginationstate.matstart + rowPerPage;
//   console.log(start, end)


if(document.getElementById('matviewinventoryfilter').value === 'Consumable'){
        // console.log(consumablefetchdata)
         renderViewInventoryTable(consumablefetchdata)
    }else{
        // console.log(nonconsumablefetchdata)
        renderViewInventoryTable(nonconsumablefetchdata)
    }
}

// function indexBtnClick(val){
//         // console.log('i see you', val)
//         paginationstate.matstart = val * rowPerPage - rowPerPage
//         paginationstate.matend = val * rowPerPage
          
//           if(document.getElementById('matviewinventoryfilter').value === 'Consumable'){
//         // console.log(consumablefetchdata)
//          renderViewInventoryTable(consumablefetchdata)
//         }else{
//         // console.log(nonconsumablefetchdata)
//         renderViewInventoryTable(nonconsumablefetchdata)
//         }
        
// }

function handleBtnColor(){
    console.log(paginationstate.matend/rowPerPage)
    document.querySelectorAll('.pagnumber').forEach(each=>{
        if(+each.id  == (paginationstate.matend/rowPerPage)){
            console.log(each)
            each.classList.add('pagicolor')
            
            console.log(each)
        }
        each.style.background ='#0000FF'; 
    })
}
 
function editViewInventory(itemid){
    let obj;
    console.log('viewinventorylist_datasource', viewinventorylist_datasource[0])
      obj =  viewinventorylist_datasource[0].filter(each=> each.id == itemid)[0]
      console.log('obj', obj)
      localStorage.setItem('inventoryupdate', JSON.stringify(obj));
    console.log('obj#', obj, obj.id)
    
    if(document.getElementById('itemregistration'))document.getElementById('itemregistration').click()
    
    callModal('Please wait...', 2, 4000)
    setTimeout(()=>{
        document.getElementById("matviewinventoryitemtype").value= obj.itemtype;
        document.getElementById("matviewinventoryitemname").value= obj.itemname;
        document.getElementById("matviewinventorycost").value= obj.cost;
        document.getElementById("matviewinventorymodel").value= obj.model;
        document.getElementById("matviewinventorycashselling").value= obj.cashsellingprice;
        document.getElementById("matviewinventorymarketingprice").value= obj.marketingprice;
        document.getElementById("matviewinventorysavingselling").value= obj.id;
    document.getElementById("inventoryedit").value= obj.id;
    }, 4000)
}

function archiveViewInventory(itemid){
    if(!window.confirm('Are you sure you want to Archive this item?'))return
    function getparam(){
        let p = new FormData()
        p.append('id', itemid)
        return p
    }
    function action(res){
        openViewInventoryList()
    }
    callController('archiveinventory.php', getparam(), 'archiveinventory', [], action)
}

 
var viewinventorylist = document.getElementById('viewinventorylist') 
if(viewinventorylist)viewinventorylist.addEventListener('click',openViewInventoryList,false)
    


var supplierForm; var resetsupplierformbtn; var saveSupplierbtn; var companyName; var contactPerson; var phoneNumber; var officeAddress; var nationality; var state; var typeOfSupplier; var supplierBank; var supplierAccount;
var inputs; var suppliers = []; var itemToUpdate; var ttype

async function openSupplier() {
    await httpRequest('supplier.php')

    supplierForm = document.getElementById('supplierform');
    jtabledata = document.getElementById('jtabledata') 
    
    if(supplierForm) {
        resetsupplierformbtn = supplierForm.querySelector('#resetsupplierformbtn')
        saveSupplierbtn = supplierForm.querySelector('#savesupplierbtn') 
        companyName = supplierForm.querySelector('#companyname')
        contactPerson = supplierForm.querySelector('#contactperson')
        phoneNumber = supplierForm.querySelector('#phonenumber')
        officeAddress = supplierForm.querySelector('#officeaddress')
        nationality = supplierForm.querySelector('#nationality')
        state = supplierForm.querySelector('#state')
        typeOfSupplier = supplierForm.querySelector('#typeofsupplier')
        supplierBank = supplierForm.querySelector('#supplierbank')
        supplierAccount = supplierForm.querySelector('#supplieraccount')
        ttype = supplierForm.querySelector('#ttype')
    }

    if(resetsupplierformbtn) resetsupplierformbtn.addEventListener('click', () => resetSupplierform())
    if(saveSupplierbtn) saveSupplierbtn.addEventListener('click', () => runSupplierFormValidations())
    
    await fetchSuppliers(renderSuppliersTable)

}

function renderSuppliersTable() {
    if(jtabledata) jtabledata.innerHTML = '';
    if(suppliers.length){
        suppliers.map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.companyname } </td>
                    <td> ${ item.typeofsupplier } </td>
                    <td> ${ item.contactperson } </td>
                    <td> ${ item.nationality } </td>
                    <td> ${ item.state } </td>
                    <td> ${ item.officeaddress } </td>
                    <td> ${ item.phonenumber } </td>
                    <td> ${ item.supplierbank } </td>
                    <td> ${ item.supplieraccount } </td>
                    <td style="display: flex;gap: 15px">
                        <span class='viewbtn mtablebtn mbtnblue' style="color:rgb(0, 105, 217);font-weight:bold" onclick="updateSupplierItem(${index})">Edit</span>
                        <span class='viewbtn mtablered mbtnred' style="color:rgb(0, 105, 217);display: flex;justify-content:center;align-items:center;font-weight:bold;padding:5px;border-radius:10px" onclick="deleteSupplierItem(${index})">Delete</span>
                    </td>
                </tr>
            `
        })
        if(document.querySelector('#approveloanstable tbody').innerHTML === '') supplierbtn.click()
        
    }
}

function updateSupplierItem(itemindex) { 
    let item = suppliers[+itemindex];
    if(item) {
        itemToUpdate = item;
        supplierForm.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        saveSupplierbtn.innerHTML = 'Update Supplier';
        try {
            Object.keys(item).map((key, i) => {
                let input = supplierForm.querySelector('#'+key)
                if(input) input.value = item[key];
            })
        }
        catch (e){
            null
        } 
    }
}

async function deleteSupplierItem (itemindex) { 
    if(!window.confirm('Are you sure you want to delete this supplier?'))return
    let item = suppliers[+itemindex];
	showSpinner();
	var request = getAjaxObject();
    
    request.open('POST','../controllers/removesuppliercustomer.php',true);
    
    request.onreadystatechange = function(e){
         
        if(request.readyState == 1){} 
        
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            console.log('parserequest', request.responseText)
            let parseRequest = JSON.parse(request.responseText)
            if(parseRequest.message.includes("Successful") || parseRequest.message.includes("Successful")){
                callModal('Request successful', 1)
                fetchSuppliers(renderSuppliersTable)
            }
            else {
                callModal('Request failed', 0)
            }
        }else{
            hideSpinner()
        }

        e.stopPropagation();
    }


    request.setRequestHeader('Connection','close');
    request.send(deleteparamssuplier(item));
}

async function saveSuppliers () {

	showSpinner();
	var request = getAjaxObject();
    
    request.open('POST','../controllers/supplierscript.php',true);
    
    request.onreadystatechange = function(e){
         
        if(request.readyState == 1){} 
        
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            console.log('parserequest', request.responseText)
            let parseRequest = JSON.parse(request.responseText)
            if(parseRequest.message.includes("Successful") || parseRequest.message.includes("Successful")){
                callModal('Request successful', 1)
                resetSupplierform()
                fetchSuppliers(renderSuppliersTable)
            }
            else {
                callModal('Request failed', 0)
            }
        }else{
            hideSpinner()
        }

        e.stopPropagation();
    }


    request.setRequestHeader('Connection','close');
    request.send(collectSupplierFormData());
}

function collectSupplierFormData() {
    if(supplierForm) {
       let paramstr = new FormData(supplierForm)
       if(itemToUpdate) paramstr.append('id', itemToUpdate.id)
       for (const [key, value] of paramstr.entries()) {
            console.log(`${key}: ${value}`);
        }
       return paramstr;
    }
}
function deleteparamssuplier(item) {
    if(supplierForm) {
       let paramstr = new FormData()
       paramstr.append('id', item.id)
       return paramstr;
    }
}

async function fetchSuppliers (cb=null) {
    let result = await fetchRequest('../controllers/fetchsupplierscript.php')
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.message.includes('Successful') && parseResult.result.includes('Successful')){
           suppliers = parseResult.data.data
           cb();
        }
    }
}

function resetSupplierform() {
    if(supplierForm) supplierForm.reset();
    itemToUpdate = null;
    saveSupplierbtn.innerHTML = 'Save Supplier';
}

function runSupplierFormValidations () {

    inputs = [
        {input: companyName, validation: {required: 'Company name is required'}},
        {input: contactPerson, validation: {required: 'Contact person is required',}},
        {input: phoneNumber, validation: {required: 'Phone number is required'}},
        {input: officeAddress, validation: {required: 'Address is required'}},
        {input: nationality, validation: {required: 'Nationality is required'}},
        {input: state, validation: {required: 'State is required'}},
        {input: typeOfSupplier, validation: {required: 'Select a supplier type'}},
        {input: supplierBank, validation: {required: 'bank is required'}},
        {input: supplierAccount, validation: {required: 'account number is required'}},
        {input: ttype, validation: {required: 'type of account is required'}}
    ]

    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else saveSuppliers()
}

var supplierbtn = document.getElementById('supplier')
if(supplierbtn) supplierbtn.addEventListener('click', openSupplier, false)



// const populatesuplyto =(result)=>{
//     if(document.getElementById('matintakereceivedfrom'))document.getElementById('matintakereceivedfrom').innerHTML += result.data.data.map(dat=>`<option value="${dat.id}">${dat.state}</option>`).join('')
//     if(document.getElementById('matintakereceivedto'))document.getElementById('matintakereceivedto').innerHTML += result.data.data.map(dat=>`<option value="${dat.id}">${dat.state}</option>`).join('')
    
// }

    let supplierid = [];
    let suppliername = [];
    let suppliervalue = '';
    let updatebatchid = ''

    let itemsSelectin
    
           const actionitemselect =(result)=>{
        if(result)itemsSelectin = result.data.data;
        for(let i=0; i<document.getElementsByName('selectitem').length; i++){
            if(document.getElementsByName('selectitem')[i].disabled == true){
                document.getElementsByName('selectitem')[i].disabled = false;
                    document.getElementsByName('selectitem')[i].innerHTML += itemsSelectin ? itemsSelectin.map(data=>{
                        if(document.getElementsByName('selectitem')[i].id.split('_')[1] == data.itemid)return `<option selected value="${data.itemid}">${data.itemname}</option>`
                        if(document.getElementsByName('selectitem')[i].id.split('_')[1] != data.itemid)return `<option value="${data.itemid}">${data.itemname}</option>`
                }).join('') : ''
                }
                
            }
            return
        };
        
        callController('fetchinventoryitemscript.php', null, 'fetchinventoryitemscript', null, actionitemselect, 'silent' );
    
    const getnamefromid =(value)=>{
        let result = itemsSelectin.filter(data=>data.itemid == value)[0]
        return result.itemname
    }
    

const itemalter =(id)=>{
    let idd = id.split('_')[1];
    document.getElementById(`intakevalue_${idd}`).value = document.getElementById(`intakeunitcost_${idd}`).value * document.getElementById(`intakequantity_${idd}`).value
    // if((Number(document.getElementById(`intakestockbalance_${idd}`).textContent) - document.getElementById(`intakequantity_${idd}`).value) < 0){
    //     callModal(`the Item quanity rested is not available. Total available: ${document.getElementById(`intakestockbalance_${idd}`).textContent}`, 0);
    //     document.getElementById(`intakequantity_${idd}`).style.borderColor = 'red';
    //     document.getElementById(`intakequantity_${idd}`).style.outlineColor = 'red';
    //     document.getElementById(`intakequantity_${idd}`).style.color = 'red';
    // }else{
    //     document.getElementById(`intakequantity_${idd}`).style.borderColor = 'gray';
    //     document.getElementById(`intakequantity_${idd}`).style.outlineColor = 'gray';
    //     document.getElementById(`intakequantity_${idd}`).style.color = 'gray';
    // }
}
    
const matintakeselectitem =(id, valuee)=>{
    let idd = id.split('_')[1];
    let value = valuee;
    let filter = itemsSelectin.filter(data=>data.itemid == value)[0]
    document.getElementById(`intaketype_${idd}`).innerHTML = filter ? filter.itemtype : '';
    document.getElementById(`intakemodel_${idd}`).innerHTML = filter ? filter.model : '';
    const itemparams =()=>{
        	var paramstr = new FormData();
	 		
		paramstr.append('itemid', value);
		paramstr.append('location', filter.location);

		
	   return paramstr;
    }
    const stockbal=(result)=>{
        document.getElementById(`intakestockbalance_${idd}`).innerHTML = filter ? result.balance : '';
    }
    callController('fetchitembalanceinlocation.php', itemparams(), 'fetchitembalanceinlocation', null, stockbal, 'silent');
    document.getElementById(`intakeunitcost_${idd}`).value = filter ? filter.cost : '';
    document.getElementById(`intakequantity_${idd}`).value = filter ? 1 : '';
    document.getElementById(`intakevalue_${idd}`).value = filter ? filter.cost : '';
    itemalter(`intakequantity_${idd}`);
}


const addintakerow =(id)=>{
    let idd = id.split('_')[1];
    let i = new Date().getTime();
    const index = Array.from(document.getElementById(`rowContainerintake`).children).indexOf(document.getElementById(`intakegridrow_${idd}`));
    const divElement = document.createElement('div');
    divElement.setAttribute('class', 'intakegridrow')
    divElement.setAttribute('id', `intakegridrow_${i}`)
    divElement.innerHTML = `<div class="grid__item">
    <input type="hidden" name="rowid" >
                        <p class="hidden">Item</p>
                        <select disabled name="selectitem" onchange="matintakeselectitem(this.id, this.value)" id="matintakeselectitem_${i}"  style="width:350px" class="orejot">
                            <option value="" disabled selected >select item</option>
                        </select>
                    </div>
                    <div class="grid__item"  style="width:200px">
                        <p>Type: <span id="intaketype_${i}"></span></p>
                        <p>Model: <span id="intakemodel_${i}"></span></p>
                        <p>Stock Balance: <span id="intakestockbalance_${i}"></span></p>
                    </div>
                    <div class="grid__item">
                        <p class="hidden">Unit cost</p>
                        <input type="number" onkeypress="itemalter(this.id)" onchange="itemalter(this.id)" id="intakeunitcost_${i}" name="intakeunitcost" class="orejot">
                    </div>
                    <div class="grid__item">
                        <p class="hidden">Quantity</p>
                        <input type="number" onkeypress="itemalter(this.id)" onchange="itemalter(this.id)" id="intakequantity_${i}" name="intakequantity" class="orejot">
                    </div>
                    <div class="grid__item">
                        <p class="hidden">Value</p>
                        <input type="text" readonly id="intakevalue_${i}" name="intakevalue" disabled value="" class="orejot">
                    </div>
                    <div class="grid__item" style="display: flex">
                        <button id="addnewrowbelow_${i}" onclick="addintakerow(this.id)" class="intakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
                        <button id="removenewrowbelow_${i}" onclick="document.getElementById('intakegridrow_${i}').remove()" class="intakeplusbtn"> - <span class="mattooltip"> Remove this row </span> </button>
                    </div>`;
                    
    const parentContainer = document.getElementById('rowContainerintake');
  const nextSibling = parentContainer.children[index + 1];

  parentContainer.insertBefore(divElement, nextSibling);
    
    actionitemselect();
    
    // <div class="intakegridrow" id="intakegridrow_${data.itemid}">
    
    //             </div>
}

const getorejot =()=>{
    let ids = []
    for(let i=0; i<document.getElementsByClassName('orejot').length; i++){
        ids.push(document.getElementsByClassName('orejot')[i].getAttribute('id'));
    }
    return ids
}


    const submitparams =(batchid)=>{
    	var paramstr = new FormData();
     	
    // 	paramstr.append('locationto', document.getElementById('matintakereceivedto').value);
    	paramstr.append('owner', suppliervalue);
    	if(batchid)paramstr.append('batchid', updatebatchid);
    	paramstr.append('transactiondate', document.getElementById('matintakedate').value);
    	paramstr.append('description', document.getElementById('matintakedescription').value);
    	paramstr.append('rowsize', document.getElementsByClassName('intakegridrow').length);
    	for(let i=0; i<document.getElementsByClassName('intakegridrow').length; i++){
    	        paramstr.append(`id${i + 1}`, document.getElementsByName('rowid')[i].value);
    	    paramstr.append(`itemid${i+1}`, document.getElementsByName('selectitem')[i].value);
    	    paramstr.append(`itemname${i+1}`, getnamefromid(document.getElementsByName('selectitem')[i].value));
    	    paramstr.append(`qty${i+1}`, document.getElementsByName('intakequantity')[i].value);
    	    paramstr.append(`cost${i+1}`, document.getElementsByName('intakeunitcost')[i].value);
    	}
    	

		
	    return paramstr;
    }
    
    const checkoutcontainerin =()=>{
    console.log('container length', document.getElementById('rowContainerintake').children.length)
    if(document.getElementById('rowContainerintake').children.length == 1){document.getElementById('rowContainerintake').innerHTML = `
        <div class="intakegridrow" id="intakegridrow_0">
                    <input type="hidden" name="rowid" value="">
                    <div class="grid__item">
                    <p class="hidden">Item</p>
                        <select disabled name="selectitem" onchange="matintakeselectitem(this.id, this.value)" id="matintakeselectitem_0" class="orejot">
                            <option value="" disabled selected >select item</option>
                        </select>
                    </div>
                    <div class="grid__item">
                        <p>Type: <span id="intaketype_0"></span></p>
                        <p>Model: <span id="intakemodel_0"></span></p>
                        <p>Stock Balance: <span id="intakestockbalance_0"></span></p>
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Unit cost</p>
                        <input type="number" onkeypress="itemalterout(this.id)" onchange="itemalterout(this.id)" id="intakeunitcost_0" name="intakeunitcost" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Quantity</p>
                        <input type="number" onkeypress="itemalterout(this.id)" onchange="itemalterout(this.id)" id="intakequantity_0" name="intakequantity" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Value</p>
                        <input type="text" readonly id="intakevalue_0" name="intakevalue" disabled value="" class="orejot">
                    </div>
                    <div class="grid__item">
                        <button id="addnewrowbelow_0" onclick="addintakerowout(this.id)" class="intakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
                    </div>
                </div>
    `
      actionitemselect()   
    }
}
    
    
    const checksupplierpersonnel =(state)=>{
        console.log('detected', state);
        if(suppliername.includes(`${state.value}`)){
            suppliervalue = supplierid[suppliername.indexOf(`${state.value}`)];
            console.log('suppliervalue', suppliervalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
    const checksupplierpersonnelid =(state)=>{
        console.log('detected', state);
        setTimeout(()=>{
        document.getElementById('intakesupplier').value = suppliername[supplierid.indexOf(`${state}`)];
        if(supplierid.includes(state)){
            console.log('suppliervalue', suppliername) 
        }else{
	        callModal(`supplier id is invalid`, 0);
        }
        checksupplierpersonnel(document.getElementById('intakesupplier'))
        },2000);
    };
    let theid = '';
    
    const deleteidin =(result)=>{
    console.log('result of deletion', result, theid)
    if(result.result == 'Successful: '){
        theid.remove();
    }else{
        callModal('something went wrong', 0)
    }
}
    
    const deletebyidin =(id)=>{
    const idparams =()=>{
        var paramstr = new FormData();
		paramstr.append('id', id);
	   return paramstr;
    }
    callController('removeouttakebyid.php', idparams(), 'removeouttakebyid', null, deleteidin)
}
    
    const aleertin =(id, cont)=>{
    theid = cont;
        callModal('',0,10);
    setTimeout(()=>{
        callModal(`<h2>Warning<h2>
        <br/>
        <p>This item was saved and is about to be removed.</p>
        <button onclick="callModal('',0,10)" type="button" style="border-radius: 5px;margin-right: 20px;padding: 9px;cursor: pointer;width: 57px;margin-top: 10px;margin-left: auto;border-width: 0px;color: white;background: #6EB4FFFF;">cancel</button>
        <button onclick="callModal('',0,10);deletebyidin('${id}')" type="button" style="border-radius: 5px;padding: 9px;cursor: pointer;width: 57px;margin-top: 10px;margin-left: auto;border-width: 0px;color: white;background: #ED404CFF;">delete</button>`
        , 2, 30000)
    },500)
}
    

const loadintakedatafromsessiondata =async(resultt)=>{
    let result = JSON.parse(resultt)
    console.log(result)
    if(!result)return;
    checksupplierpersonnelid(result.items[0].owner);
    document.getElementById('matintakedate').value = result.items[0].transactiondate.split(' ')[0];
    document.getElementById('matintakedescription').value = result.items[0].description;
    document.getElementById('matintakereferenceno').value = result.items[0].reference;
    document.getElementById('rowContainerintake').innerHTML = result.items.map((data, index)=>{
                        
        return `
            <div class="intakegridrow" id="intakegridrow_${index}">
            <input type="hidden" name="rowid" value="${data.id}">
                    <div class="grid__item">
                    <p class="hidden">Item</p>
                        <select disabled name="selectitem" onchange="matintakeselectitem(this.id, this.value)" id="matintakeselectitem_${data.itemid}" class="orejot">
                            <option value="" disabled >select itemm</option>
                        </select>'
                    </div>
                    <div class="grid__item">
                        <p>Type: <span id="intaketype_${data.itemid}">${itemsSelectin.filter(dat=>dat.itemid == data.itemid)[0].itemtype}</span></p>
                        <p>Model: <span id="intakemodel_${data.itemid}">${itemsSelectin.filter(dat=>dat.itemid == data.itemid)[0].model}</span></p>
                        <p>Stock Balance: <span id="intakestockbalance_${data.itemid}" ></span></p>
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Unit cost</p>
                        <input type="number" value="${itemsSelectin.filter(dat=>dat.itemid == data.itemid)[0].cost}" onkeypress="itemalter(this.id)" onchange="itemalter(this.id)" id="intakeunitcost_${data.itemid}" name="intakeunitcost" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Quantity</p>
                        <input type="number" value="${data.qty}" onkeypress="itemalter(this.id)" onchange="itemalter(this.id)" id="intakequantity_${data.itemid}" name="intakequantity" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Value</p>
                        <input type="text" readonly id="intakevalue_${data.itemid}" name="intakevalue" disabled value="" class="orejot">
                    </div>
                    <div class="grid__item">
                        <button id="addnewrowbelow_${index}" onclick="addintakerow(this.id)" class="intakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
                        <button id="removenewrowbelow_${index}" style="background: #FF4F38FF;border-width: 0px;color: white" onclick="checkoutcontainerin();aleertin(${data.id}, intakegridrow_${index});" class="intakeplusbtn"> X <span class="mattooltip"> Remove this row </span> </button>
                    </div>
            </div>
        `
    }).join('');
    
    setTimeout(()=>{
        console.log(result.items)
        
    for(let i=0; i<result.items.length; i++){
        
        
                            let itemparamss =()=>{
                                	var paramstr = new FormData();
                        	 		
                        		paramstr.append('itemid', result.items[i].itemid);
                        		paramstr.append('location', itemsSelectin.filter(dat=>dat.itemid == result.items[i].itemid)[0].location);
                        
                        		
                        	   return paramstr;
                            }
                            let stockball=(resultt)=>{
                                console.log(`intakestockbalance_${result.items[i].itemid}`, resultt.balance)
                                document.getElementById(`intakestockbalance_${result.items[i].itemid}`).innerHTML = resultt.balance;
                            }
                            callController('fetchitembalanceinlocation.php', itemparamss(), 'fetchitembalanceinlocation', null, stockball, 'silent');
                            itemalter(`sdfdjhfdsfk_${result.items[i].itemid}`)

    }
        
    },2000)
    
    
    
}




async function openIntake(){
    await httpRequest('intake.php', 'override');
    
    supplierid = [];
    suppliername = [];
    suppliervalue = '';
    
    const populatesupplier =(result)=>{
        if(document.getElementById('supplierdata'))document.getElementById('supplierdata').innerHTML = result.data.data.map(dat=>{
            supplierid.push(dat.id);
            suppliername.push(dat.companyname);
            return `<option value="${dat.companyname}">${dat.companyname}</option>`
        }).join('');
        return
    }
    
    
    await callController('fetchsupplierscript.php', null, 'fetchsupplierscript', null, populatesupplier, 'silent');
    
    
    updatebatchid = ''
    
    const reload = async (result) => {
        hideSpinner()
    document.getElementById('rowContainerintake').innerHTML = `<div class="intakegridrow" id="intakegridrow_0">
<input type="hidden" name="rowid" >
            <div class="grid__item">
            <p class="hidden">Item</p>
                <select disabled name="selectitem"  style="width:350px" onchange="matintakeselectitem(this.id, this.value)" id="matintakeselectitem_0" class="orejot">
                    <option value="" disabled selected >select item</option>
                </select>
            </div>
            <div class="grid__item"  style="width:200px">
                <p>Type: <span id="intaketype_0"></span></p>
                <p>Model: <span id="intakemodel_0"></span></p>
                <p>Stock Balance: <span id="intakestockbalance_0"></span></p>
            </div>
            <div class="grid__item">
            <p class="hidden">Unit cost</p>
                <input type="number" onkeypress="itemalter(this.id)" onchange="itemalter(this.id)" id="intakeunitcost_0" name="intakeunitcost" class="orejot">
            </div>
            <div class="grid__item">
            <p class="hidden">Quantity</p>
                <input type="number" onkeypress="itemalter(this.id)" onchange="itemalter(this.id)" id="intakequantity_0" name="intakequantity" class="orejot">
            </div>
            <div class="grid__item">
            <p class="hidden">Value</p>
                <input type="text" readonly id="intakevalue_0" name="intakevalue" disabled value="" class="orejot">
            </div>
            <div class="grid__item">
                <button id="addnewrowbelow_0" onclick="addintakerow(this.id)" class="intakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
            </div>
        </div>`;
    document.getElementById('intakesupplier').innerHTML = '';
    if (document.getElementById('matintakebtnsubmit').textContent == 'Update') {
        document.getElementById('stockinhistory').click();
    } else {
        document.getElementById('intake').click();
    }
    await callController('fetchsupplierscript.php', null, 'fetchsupplierscript', null, populatesupplier, 'silent');
    
    // Show success message using SweetAlert
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Saved successfully!',
        confirmButtonText: 'OK'
    });
}
    
    // const callController =(controller, params, name, validate, funct, silent, e)=>{ 
    if(document.getElementById('matintakebtnsubmit'))document.getElementById('matintakebtnsubmit').addEventListener('click', e=>{
        let status = false
        for(let i=0; i<document.getElementsByName('intakequantity').length; i++){
            if(document.getElementsByName('intakequantity')[i].style.borderColor == 'red' || document.getElementsByName('intakequantity')[i].value == 0){
                callModal('Quantity request is more than stock balance or quantity is zero', 0);
                status = true
            }
        }
        if(document.getElementById('matintakebtnsubmit').textContent == 'Update'){
            if(!status)callController('intakescript.php', submitparams(updatebatchid), 'intakescript', getorejot(), reload )
        }else{
            if(!status)callController('intakescript.php', submitparams(), 'intakescript', getorejot(), reload )
        }
    })
    
    // callController('fetchlocation.php', null, 'fetchlocation', null, populatesuplyto, 'silent' );
    await callController('fetchinventoryitemscript.php', null, 'fetchinventoryitemscript', null, actionitemselect, 'silent' );
    
    const intakeeditdata = sessionStorage.getItem('intakeeditdata');
    if(intakeeditdata){
        document.getElementById('matintakebtnsubmit').textContent = 'Update';
        updatebatchid = JSON.parse(intakeeditdata).batchid
        loadintakedatafromsessiondata(intakeeditdata);
        sessionStorage.removeItem('intakeeditdata');
    }
}

var intake= document.getElementById('intake');
    
if(intake) intake.addEventListener('click',openIntake,false);



    let supplierhistoryid = [];
    let supplierhistoryname = [];
    let supplierhistoryvalue = '';

function combineBatchDataintake(data) {
  const groupedData = {};
  
  data.forEach((item) => {
    const batchId = item.batchid;
    
    if (!groupedData.hasOwnProperty(batchId)) {
      groupedData[batchId] = {
        batchid: batchId,
        items: [],
      };
    }
    
    groupedData[batchId].items.push(item);
  });
  
  return Object.values(groupedData);
}

var intakehistory_datasource = [];

const populateintakehistory=(result)=>{
    intakehistory_datasource = [];
    intakehistory_datasource = combineBatchDataintake(result.data);
    console.log('intakehistory_datasource', intakehistory_datasource)
    initPagination(intakehistory_datasource, intakehistorysetCurrentPage);
    }

var intakehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(intakehistory_datasource.length) {
        intakehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendintakehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("intakehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

function intakemodal(itemid){
    let totalqty = 0
    let totalcost = 0
    let obj = intakehistory_datasource.find(each => each.batchid == itemid)
    document.querySelector(".matmodal").classList.remove('matmodalhidde');
    console.log('obj',obj);
    document.getElementById('intaketdmodal').innerHTML = formatDate(obj.items[0].transactiondate.split(' ')[0]);
    document.getElementById('intakelocationmodal').innerHTML = getLocationById(obj.items[0].location)
    document.getElementById('intakedesmodal').innerHTML = obj.items[0].description
    document.getElementById('intakehistorytablecontentmodal').innerHTML = obj.items.map((data, index)=>{
        console.log('the data', data)
        totalqty = totalqty + Number(data.qty)
        totalcost = totalcost + Number(data.cost)
        return `
            <tr data-open="false" class="source-row-item">
                <td> ${index+1} </td>
                <td>${data.itemid}</td>
                <td>${data.itemname}</td>
                <td>${data.model}</td>
                <td style="width: 20px">${data.qty}</td>
                <td>&#8358;${formatCurrency(data.cost)}</td>
            </tr>
        `
    }).join('');
    document.getElementById('intakehistorytablecontentmodal').innerHTML += `
        <tr data-open="false" class="source-row-item">
            <td> Total: </td>
            <td></td>
            <td></td>
            <td></td>
            <td> ${totalqty} </td>
            <td> &#8358;${formatCurrency(totalcost*totalqty)} </td>
        </tr>
    `
    // document.getElementById("modalitemname").value= obj.itemname;
    // document.getElementById("modalquantity").value= obj.qty;
    // document.getElementById("modalcost").value= obj.cost;
    // document.getElementById("modaldescription").value= obj.description;
    // document.getElementById("modaltransactiondate").value= obj.transactiondate;
    // document.getElementById("modallocation").value= intakeHistoryLocationsout.find(each=> each.id == obj.location).location;
}

const checksupplierhistorypersonnelid =(state)=>{
        console.log('detected', state);
        setTimeout(()=>{
            supplierhistoryname[supplierhistoryid.indexOf(`${state}`)];
        if(supplierhistoryid.includes(state)){
            console.log('supplierhistoryvalue', supplierhistoryname) 
        }else{
	        callModal(`invalid supplier`, 0);
        }
        },500);
    };

function appendintakehistoryTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("intakehistorytablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${data.items.length} </td>
                                <td> 
                                    <table>
                                        ${data.items.map((dat, index)=>{
                                            return ( index<3 ?
                                                `
                                            <tr>
                                                <td>${dat.itemname}</td>
                                                <td  style="width: 40px">${dat.model}</td>
                                                <td style="width: 20px">${dat.qty}</td>
                                            </tr>
                                            `
                                            :
                                               index==3?`
                                               <tr>
                                                    <td onclick="intakemodal(${data.batchid})" style="color:green;cursor:pointer">click to view the remaining items ${data.items.length-3} ....</td>
                                                </tr>
                                                `:``
                                            )
                                        }).join('')}
                                    </table> 
                                </td>
                                <td> ${data.items.reduce((accumulator, currentItem) => {return accumulator + Number(currentItem.qty)}, 0)} </td>
                                <td> ${naira}${formatCurrency(data.items.reduce((accumulator, currentItem) => {return (accumulator + Number(currentItem.cost)*Number(currentItem.qty))}, 0))} </td>
                                <td> ${data.items[0].transactiondate.split(' ')[0]} </td>
                                <td> ${getLocationById(data.items[0].location)} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="intakemodal(${data.batchid})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px">View</button>
                                        <button onclick="editIntakeItem(${data.batchid})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                    </div>
                                </td>
                            </tr>
    `
} 


function editIntakeItem(batchid) {
    let data = intakehistory_datasource.find(each => each.batchid == batchid);
    sessionStorage.setItem('intakeeditdata', JSON.stringify(data));
    if(document.getElementById('intake'))document.getElementById('intake').click();
}

async function intakeeHistory(){
    await httpRequest('stockinhistory.php');
    
    supplierhistoryid = [];
    supplierhistoryname = [];
    supplierhistoryvalue = '';
    
    const populatesupplier =(result)=>{
        result.data.data.map(dat=>{
            supplierhistoryid.push(dat.id);
            supplierhistoryname.push(dat.companyname);
        })
        return
    }
    
    
    callController('fetchsupplierscript.php', null, 'fetchsupplierscript', null, populatesupplier, 'silent');
    
    
    jtabledata = document.getElementById('intakehistorytablecontent');
        initializePaginationParams();
    
    function getStockinHistoryParams(){
		var paramstr = new FormData();
		paramstr.append('startdate',document.getElementById('matstockinhistorystartdate').value);
		paramstr.append('enddate',document.getElementById('matstockinhistoryenddate').value);
	   return paramstr;
	}
    
    if(document.getElementById('matstockinhistoryviewbtn'))document.getElementById('matstockinhistoryviewbtn').addEventListener('click', e=>{
        callController('fetchintakes.php', getStockinHistoryParams(), 'fetchintakes', ['matstockinhistorystartdate','matstockinhistoryenddate'], populateintakehistory)
    })
    
}



var intakehistory = document.getElementById("stockinhistory")
if(intakehistory ) intakehistory.addEventListener('click',intakeeHistory,false) 


// if(document.getElementById('oreitementry'))document.getElementById('oreitementry')
const stleditem =(result)=>{
    if(document.getElementById('stockledgitemdata'))document.getElementById('stockledgitemdata').innerHTML = result.data.data.map(dat=>`<option>${dat.itemname}</option>`).join('')
    if(document.getElementById('stockledgitemdata1'))document.getElementById('stockledgitemdata1').innerHTML = result.data.data.map(dat=>`<option value="${dat.itemname}">${dat.itemid}</option>`).join('')
}


const stockroleaction =(result)=>{
        console.log(document.getElementById('stockledglocation'))
        if(document.getElementById('stockledglocation'))document.getElementById('stockledglocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('stockledglocation'))document.getElementById('stockledglocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('stockledglocation'))document.getElementById('stockledglocation').setAttribute('readonly', true)
    }
}

var stocklederorehistory_datasource = [];

const populatestockledgerorehistory=(result)=>{
    stocklederorehistory_datasource = [];
    if(!result.data)return callModal(`${result.message}`)
    stocklederorehistory_datasource = result.data;
    console.log('stocklederorehistory_datasource', stocklederorehistory_datasource)
    initPagination(stocklederorehistory_datasource, stockledgerorehistorysetCurrentPage);
    /*document.getElementById('stockledgeroretabledata2').innerHTML = stocklederorehistory_datasource.map(dat=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${dat.personnel.staffid} </td>
                                <td> ${dat.personnel.firstname} </td>
                                <td> ${dat.personnel.lastname} </td>
                                <td> ${dat.personnel.gender} </td>
                                <td> ${dat.personnel.nationality} </td>
                                <td> ${dat.personnel.state} </td>
                                <td> ${dat.personnel.lga} </td>
                                <td> ${dat.personnel.residentialaddress} </td>
                            </tr>`)
    }).join('')*/
    }
    
var stockledgerorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(stocklederorehistory_datasource.length) {
        stocklederorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendstocklederorehistoryTableRows(item, index)
            }
        })
        document.getElementById("stockledgerorehistorytablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> </td>
                               <td> </td>
                                <td>  </td>
                                <td>  </td>
                                <td> TOTAL</td>
                                <td> ${stocklederorehistory_datasource.reduce((sum, item)=>sum+Number(item.qtyin), 0)} </td>
                                <td> ${stocklederorehistory_datasource.reduce((sum, item)=>sum+Number(item.qtyout), 0)} </td>
                                <td> ${stocklederorehistory_datasource[stocklederorehistory_datasource.length-1].balance} </td>
                                <td>
                                </td>
                            </tr>
    `
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("outtakehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

function appendstocklederorehistoryTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("stockledgerorehistorytablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                               <td> ${formatDate(data.transactiondate.split(' ')[0])} </td>
                                <td> ${data.accountnumber} </td>
                                <td> ${data.description} </td>
                                <td> ${data.category} </td>
                                <td> ${data.qtyin} </td>
                                <td> ${data.qtyout} </td>
                                <td> ${data.balance} </td>
                                <td>
                                    <div class="${index ==0 ? 'hidden' : 'hidden'}" style="align-items:center">
                                        <button onclick="outtakemodal(${data.batchid})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px">View</button>
                                        <button onclick="editOuttakeItem(${data.batchid})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                    </div>
                                </td>
                            </tr>
    `
} 

async function openStockLedgerView(){
    await   httpRequest('stockledgerview.php');
    
    jtabledata = document.getElementById('stockledgerorehistorytablecontent');
        initializePaginationParams();
    
    callController('fetchinventoryitemscript.php',null, 'fetchinventoryitemscript', null, stleditem);
    if(document.getElementById('stockledglocation'))document.getElementById('stockledglocation').innerHTML = `<option value=""></option>`
    if(document.getElementById('stockledglocation'))document.getElementById('stockledglocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    function getpermissionsParamsstockledger(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
    // for (var pair of paramstr.entries()) {
    //             //   console.log(pair[0] + ', ' + pair[1]); 
    //             // return(pair[0]+ ', ' + pair[1]); 
    //             }
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsstockledger(), 'fetchuserprofile', null, stockroleaction);
    if(document.getElementById('stockledgerhistoryviewbtn'))document.getElementById('stockledgerhistoryviewbtn').addEventListener('click',e=>{
        const getitemhistoryparams =()=>{
            var paramstr = new FormData();
            paramstr.append('item', document.getElementById('stockledgitem').value);
            paramstr.append('location', document.getElementById('stockledglocation').value);
            paramstr.append('startdate', document.getElementById('stockledgstartdate').value);
            paramstr.append('enddate', document.getElementById('stockledendgdate').value);
            return paramstr;
        }
        callController('fetchstockledger.php', getitemhistoryparams(), 'fetchstockledger', ['stockledgitem', 'stockledgstartdate', 'stockledendgdate'], populatestockledgerorehistory)
    });
     if(document.getElementById('stockledgeroreexport'))document.getElementById('stockledgeroreexport').addEventListener('click',e=>{
            tableToExcel('stockledgerorefulltable2', 'STOCK LEDGER')},false);
        if(document.getElementById('stockledgeroreprint'))document.getElementById('stockledgeroreprint').addEventListener('click',e=>{
            printContent('STOCK LEDGER',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'stockledgerorefulltableparant')},false);
}


var stockLedgerView = document.getElementById('stockledgerview')
if(stockLedgerView) stockLedgerView.addEventListener('click', openStockLedgerView,false)




let updatebatchidout = ''

const populatesuplyto = (result) => {
  if (document.getElementById('matouttakereceivedfrom')) {
    document.getElementById('matouttakereceivedfrom').innerHTML += result.data.data.map(dat => `<option value="${dat.id}">${dat.location}</option>`).join('')
  }
  if (document.getElementById('matouttakereceivedto')) {
    document.getElementById('matouttakereceivedto').innerHTML += result.data.data.map(dat => `<option value="${dat.id}">${dat.location}</option>`).join('')
  }
}

let itemsSelectout

const actionitemselectout = (result) => {
  if(result)itemsSelectout = result.data.data;
        for(let i=0; i<document.getElementsByName('selectitemout').length; i++){
            if(document.getElementsByName('selectitemout')[i].disabled == true){
                document.getElementsByName('selectitemout')[i].disabled = false;
                    document.getElementsByName('selectitemout')[i].innerHTML += itemsSelectout ? itemsSelectout.map(data=>{
                        if(document.getElementsByName('selectitemout')[i].id.split('_')[1] == data.itemid)return `<option selected value="${data.itemid}">${data.itemname}</option>`
                        if(document.getElementsByName('selectitemout')[i].id.split('_')[1] != data.itemid)return `<option value="${data.itemid}">${data.itemname}</option>`
                }).join('') : ''
                }
                
            }
            return
};

const addouttakerowout = (id) => {
  let idd = id.split('_')[1];
  let i = new Date().getTime();
  const index = Array.from(document.getElementById(`rowContainerouttake`).children).indexOf(document.getElementById(`outtakegridrow_${idd}`));
  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'outtakegridrow')
  divElement.setAttribute('id', `outtakegridrow_${i}`)
  divElement.innerHTML = `<div class="grid__item">
  <input type="hidden" name="rowid" value="">
    <p class="hidden">Item</p>
    <select disabled   style="width: 400px" name="selectitemout" onchange="matouttakeselectitemout(this.id, this.value)" id="matouttakeselectitem_${i}" class="orejot">
        <option value="" disabled selected >select item</option>
    </select>
  </div>
  <div class="grid__item">
    <p>Type: <span id="outtaketype_${i}"></span></p>
    <p>Model: <span id="outtakemodel_${i}"></span></p>
    <p>Stock Balance: <span id="outtakestockbalance_${i}"></span></p>
  </div>
  <div class="grid__item">
    <p class="hidden">Unit cost</p>
    <input type="number" onkeypress="itemalterout(this.id)" onchange="itemalterout(this.id)" id="outtakeunitcost_${i}" name="outtakeunitcost" class="orejot">
  </div>
  <div class="grid__item">
    <p class="hidden">Quantity</p>
    <input type="number" onkeypress="itemalterout(this.id)" onchange="itemalterout(this.id)" id="outtakequantity_${i}" name="outtakequantity" class="orejot">
  </div>
  <div class="grid__item">
    <p class="hidden">Value</p>
    <input type="text" readonly id="outtakevalue_${i}" name="outtakevalue" disabled value="" class="orejot">
  </div>
  <div class="grid__item" style="display:flex;">
    <button id="addnewrowbelow_${i}" onclick="addouttakerowout(this.id)" class="outtakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
    <button id="removenewrowbelow_${i}" onclick="checkoutcontainer();document.getElementById('outtakegridrow_${i}').remove();" class="outtakeplusbtn"> - <span class="mattooltip"> Remove this row </span> </button>
  </div>`;

  const parentContainer = document.getElementById('rowContainerouttake');
  const nextSibling = parentContainer.children[index + 1];

  parentContainer.insertBefore(divElement, nextSibling);

  actionitemselectout();

  // <div class="outtakegridrow" id="outtakegridrow_0">

  //             </div>
}

const getnamefromidout = (value) => {
  let result = itemsSelectout?.filter(data => data.itemid == value)[0]
  return result.itemname
}

const checkoutcontainer =()=>{
    console.log('container length', document.getElementById('rowContainerouttake').children.length)
    if(document.getElementById('rowContainerouttake').children.length == 1){document.getElementById('rowContainerouttake').innerHTML = `
        <div class="outtakegridrow" id="outtakegridrow_0">
                    <input type="hidden" name="rowid" value="">
                    <div class="grid__item">
                    <p class="hidden">Item</p>
                        <select disabled name="selectitemout" onchange="matouttakeselectitemout(this.id, this.value)" id="matouttakeselectitem_0" class="orejot">
                            <option value="" disabled selected >select item</option>
                        </select>
                    </div>
                    <div class="grid__item">
                        <p>Type: <span id="outtaketype_0"></span></p>
                        <p>Model: <span id="outtakemodel_0"></span></p>
                        <p>Stock Balance: <span id="outtakestockbalance_0"></span></p>
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Unit cost</p>
                        <input type="number" onkeypress="itemalterout(this.id)" onchange="itemalterout(this.id)" id="outtakeunitcost_0" name="outtakeunitcost" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Quantity</p>
                        <input type="number" onkeypress="itemalterout(this.id)" onchange="itemalterout(this.id)" id="outtakequantity_0" name="outtakequantity" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Value</p>
                        <input type="text" readonly id="outtakevalue_0" name="outtakevalue" disabled value="" class="orejot">
                    </div>
                    <div class="grid__item">
                        <button id="addnewrowbelow_0" onclick="addouttakerowout(this.id)" class="outtakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
                    </div>
                </div>
    `
      actionitemselectout()   
    }
}


const itemalterout = (id, load) => {
  let idd = id.split('_')[1];
  document.getElementById(`outtakevalue_${idd}`).value = document.getElementById(`outtakeunitcost_${idd}`).value * document.getElementById(`outtakequantity_${idd}`).value
  if(!load){
      if ((Number(document.getElementById(`outtakestockbalance_${idd}`).textContent) - document.getElementById(`outtakequantity_${idd}`).value) < 0) {
        callModal(`the Item quanity requested is not available. Total available: ${document.getElementById(`outtakestockbalance_${idd}`).textContent}`, 0);
        document.getElementById(`outtakequantity_${idd}`).style.borderColor = 'red';
        document.getElementById(`outtakequantity_${idd}`).style.outlineColor = 'red';
        document.getElementById(`outtakequantity_${idd}`).style.color = 'red';
      } else {
        document.getElementById(`outtakequantity_${idd}`).style.borderColor = 'gray';
        document.getElementById(`outtakequantity_${idd}`).style.outlineColor = 'gray';
        document.getElementById(`outtakequantity_${idd}`).style.color = 'gray';
      }
  }
}

const matouttakeselectitemout = (id, valuee) => {
  let idd = id.split('_')[1];
  let value = valuee;
  let filter = itemsSelectout?.filter(data => data.itemid == value)[0]
  document.getElementById(`outtaketype_${idd}`).innerHTML = filter ? filter.itemtype : '';
  document.getElementById(`outtakemodel_${idd}`).innerHTML = filter ? filter.model : '';
  const itemparams = () => {
    var paramstr = new FormData();

    paramstr.append('itemid', value);
    paramstr.append('location', document.getElementById('matouttakereceivedfrom').value);

    return paramstr;
  }
  const stockbal = (result) => {
    document.getElementById(`outtakestockbalance_${idd}`).innerHTML = filter ? result.balance : '';
  }
  callController('fetchitembalanceinlocation.php', itemparams(), 'fetchitembalanceinlocation', ['matouttakereceivedfrom'], stockbal, 'silent');
  document.getElementById(`outtakeunitcost_${idd}`).value = filter ? filter.cost : '';
  document.getElementById(`outtakequantity_${idd}`).value = filter ? 0 : '';
  document.getElementById(`outtakevalue_${idd}`).value = filter ? filter.cost : '';
  itemalterout(`outtakequantity_${idd}`);
}


const getorejotout = () => {
  let ids = []
  for (let i = 0; i < document.getElementsByClassName('orejot').length; i++) {
    ids.push(document.getElementsByClassName('orejot')[i].getAttribute('id'));
  }
  return ids
}

const submitparamsout = (batchid) => {
  var paramstr = new FormData();

    if(batchid)paramstr.append('batchid', updatebatchidout);
  paramstr.append('locationto', document.getElementById('matouttakereceivedto').value);
  paramstr.append('locationfrom', document.getElementById('matouttakereceivedfrom').value);
  paramstr.append('transactiondate', document.getElementById('matouttakedate').value);
  paramstr.append('description', document.getElementById('matouttakedescription').value);
  paramstr.append('rowsize', document.getElementsByClassName('outtakegridrow').length);
  for (let i = 0; i < document.getElementsByClassName('outtakegridrow').length; i++) {
    paramstr.append(`id${i + 1}`, document.getElementsByName('rowid')[i].value);
    paramstr.append(`itemid${i + 1}`, document.getElementsByName('selectitemout')[i].value);
    paramstr.append(`itemname${i + 1}`, getnamefromidout(document.getElementsByName('selectitemout')[i].value));
    paramstr.append(`qty${i + 1}`, document.getElementsByName('outtakequantity')[i].value);
    paramstr.append(`cost${i + 1}`, document.getElementsByName('outtakeunitcost')[i].value);
  }

  return paramstr;
}

const rerunoutaketable = (state) => {
  let selectitemout = document.getElementsByName('selectitemout');
  for (i = 0; i < selectitemout.length; i++) {
    matouttakeselectitemout(selectitemout[i].id, selectitemout[i].value)
  }
}
let theidout = '';
const deleteid =(result)=>{
    console.log('result of deletion', result, theidout)
    if(result.result == 'Successful: '){
        theidout.remove();
    }else{
        callModal('something went wrong', 0)
    }
}

const deletebyid =(id)=>{
    const idparams =()=>{
        var paramstr = new FormData();
		paramstr.append('id', id);
	   return paramstr;
    }
    callController('removeouttakebyid.php', idparams(), 'removeouttakebyid', null, deleteid)
}

const aleert =(id, cont)=>{
    theidout = cont;
        callModal('',0,10);
    setTimeout(()=>{
        callModal(`<h2>Warning<h2>
        <br/>
        <p>This item was saved and is about to be removed.</p>
        <button onclick="callModal('',0,10)" type="button" style="border-radius: 5px;margin-right: 20px;padding: 9px;cursor: pointer;width: 57px;margin-top: 10px;margin-left: auto;border-width: 0px;color: white;background: #6EB4FFFF;">cancel</button>
        <button onclick="callModal('',0,10);deletebyid('${id}')" type="button" style="border-radius: 5px;padding: 9px;cursor: pointer;width: 57px;margin-top: 10px;margin-left: auto;border-width: 0px;color: white;background: #ED404CFF;">delete</button>`
        , 2, 30000)
    },500)
}

const loadouttakedatafromsessiondata =async(resultt)=>{
    let result = JSON.parse(resultt)
    console.log(result)
    console.log('location', result.items[0].location)
    if(!result)return;
    document.getElementById('matouttakereceivedfrom').value = result.items[0].location
    document.getElementById('matouttakereceivedto').value = result.items[0].tlog.split('|')[1];
    document.getElementById('matouttakedescription').value = result.items[0].description;
    document.getElementById('matouttakedate').value = result.items[0].transactiondate.split(' ')[0];
    document.getElementById('matouttakereferenceno').value = result.items[0].reference;
    document.getElementById('rowContainerouttake').innerHTML = result.items.map((data, index)=>{
                        
        return `
            <div class="outtakegridrow" id="outtakegridrow_${index}">
                    <input type="hidden" name="rowid" value="${data.id}">
                    <div class="grid__item">
                    <p class="hidden">Item</p>
                        <select disabled name="selectitemout" onchange="matouttakeselectitemout(this.id, this.value)" id="matouttakeselectitem_${data.itemid}" class="orejot">
                            <option value="" disabled >select item</option>
                        </select>'
                    </div>
                    <div class="grid__item">
                        <p>Type: <span id="outtaketype_${data.itemid}">${itemsSelectout.filter(dat=>dat.itemid == data.itemid)[0].itemtype}</span></p>
                        <p>Model: <span id="outtakemodel_${data.itemid}">${itemsSelectout.filter(dat=>dat.itemid == data.itemid)[0].model}</span></p>
                        <p>Stock Balance: <span id="outtakestockbalance_${data.itemid}" ></span></p>
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Unit cost</p>
                        <input type="number" value="${itemsSelectout.filter(dat=>dat.itemid == data.itemid)[0].cost}" onkeypress="itemalterout(this.id)" onchange="itemalterout(this.id)" id="outtakeunitcost_${data.itemid}" name="outtakeunitcost" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Quantity</p>
                        <input type="number" value="${data.qty}" onkeypress="itemalterout(this.id)" onchange="itemalterout(this.id)" id="outtakequantity_${data.itemid}" name="outtakequantity" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Value</p>
                        <input type="text" readonly id="outtakevalue_${data.itemid}" name="outtakevalue" disabled value="" class="orejot">
                    </div>
                    <div class="grid__item">
                        <button id="addnewrowbelow_${index}" onclick="addouttakerowout(this.id)" class="outtakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
                        <button id="removenewrowbelow_${index}" style="background: #FF4F38FF;border-width: 0px;color: white" onclick="checkoutcontainer();aleert(${data.id}, outtakegridrow_${index});" class="outtakeplusbtn"> X <span class="mattooltip"> Remove this row </span> </button>
                    </div>
            </div>
        `
    }).join('');
    
    setTimeout(()=>{
        console.log(result.items)
        
    for(let i=0; i<result.items.length; i++){
        
        
                            let itemparamss =()=>{
                                	var paramstr = new FormData();
                        	 		
                        		paramstr.append('itemid', result.items[i].itemid);
                                paramstr.append('location', document.getElementById('matouttakereceivedfrom').value);
                        
                        		
                        	   return paramstr;
                            }
                            let stockball=(resultt)=>{
                                console.log(`outtakestockbalance_${result.items[i].itemid}`, resultt.balance)
                                document.getElementById(`outtakestockbalance_${result.items[i].itemid}`).innerHTML = resultt.balance;
                            }
                            callController('fetchitembalanceinlocation.php', itemparamss(), 'fetchitembalanceinlocation', ['matouttakereceivedfrom'], stockball, 'silent');
                            itemalterout(`sdfdjhfdsfk_${result.items[i].itemid}`, 'load')

    }
    
    actionitemselectout()
        
    },2000)
    
    
    
}

async function openOuttake() {
  await httpRequest('outtake.php', 'override');
  
  updatebatchidout = '';
  
  const rerunout=(result)=>{
      if(document.getElementById('matouttakebtnsubmit').textContent == 'Update'){document.getElementById('outtakehistory').click()}else{
          document.getElementById('outtake').click();
      document.getElementById('rowContainerouttake').innerHTML =`<div class="outtakegridrow" id="outtakegridrow_0">
                    <input type="hidden" name="rowid" value="">
                    <div class="grid__item">
                    <p class="hidden">Item</p>
                        <select disabled name="selectitemout" onchange="matouttakeselectitemout(this.id, this.value)" id="matouttakeselectitem_0" class="orejot">
                            <option value="" disabled selected >select item</option>
                        </select>
                    </div>
                    <div class="grid__item">
                        <p>Type: <span id="outtaketype_0"></span></p>
                        <p>Model: <span id="outtakemodel_0"></span></p>
                        <p>Stock Balance: <span id="outtakestockbalance_0"></span></p>
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Unit cost</p>
                        <input type="number" onkeypress="itemalterout(this.id)" onchange="itemalterout(this.id)" id="outtakeunitcost_0" name="outtakeunitcost" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Quantity</p>
                        <input type="number" onkeypress="itemalterout(this.id)" onchange="itemalterout(this.id)" id="outtakequantity_0" name="outtakequantity" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Value</p>
                        <input type="text" readonly id="outtakevalue_0" name="outtakevalue" disabled value="" class="orejot">
                    </div>
                    <div class="grid__item">
                        <button id="addnewrowbelow_0" onclick="addouttakerowout(this.id)" class="outtakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
                    </div>
                </div>`
          
      }
    
  }

  // const callController =(controller, params, name, validate, funct, silent, e)=>{ 
  document.getElementById('matouttakebtnsubmit').addEventListener('click', e => {
    let status = false
    for (let i = 0; i < document.getElementsByName('outtakequantity').length; i++) {
      if (document.getElementsByName('outtakequantity')[i].style.borderColor == 'red' || document.getElementsByName('outtakequantity')[i].value == 0) {
        callModal('Quantity request is more than stock balance or quantity is zero', 0);
        status = true
      }
    }
    if(document.getElementById('matouttakebtnsubmit').textContent == 'Update'){
        if(!status)callController('outtakescript.php', submitparamsout(updatebatchidout), 'outtakescript', getorejot(), rerunout )
    }else{
        if(!status)callController('outtakescript.php', submitparamsout(), 'outtakescript', getorejot(), rerunout )
    }
  })

  callController('fetchlocation.php', null, 'fetchlocation', null, populatesuplyto, 'silent');
  callController('fetchinventoryitemscript.php', null, 'fetchinventoryitemscript', null, actionitemselectout, 'silent');
  
  const outtakeeditdata = sessionStorage.getItem('outtakeeditdata');
  setTimeout(()=>{if(outtakeeditdata){
        document.getElementById('matouttakebtnsubmit').textContent = 'Update';
        updatebatchidout = JSON.parse(outtakeeditdata).batchid
        console.log('updatebatchidout', updatebatchidout)
        loadouttakedatafromsessiondata(outtakeeditdata);
        sessionStorage.removeItem('outtakeeditdata');
    }},2000)
    
}

var outtake= document.getElementById('outtake');
    
if(outtake) outtake.addEventListener('click',openOuttake,false);



function combineBatchData(data) {
  const groupedData = {};
  
  data.forEach((item) => {
    const batchId = item.batchid;
    
    if (!groupedData.hasOwnProperty(batchId)) {
      groupedData[batchId] = {
        batchid: batchId,
        items: [],
      };
    }
    
    groupedData[batchId].items.push(item);
  });
  
  return Object.values(groupedData);
}

var outtakehistory_datasource = [];

const populateoutakehistory=(result)=>{
    outtakehistory_datasource = [];
    outtakehistory_datasource = combineBatchData(result.data);
    console.log('outtakehistory_datasource', outtakehistory_datasource)
    initPagination(outtakehistory_datasource, outtakehistorysetCurrentPage);
    }

var outtakehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(outtakehistory_datasource.length) {
        outtakehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendouttakehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("outtakehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

function outtakemodal(itemid){
    let totalqty = 0
    let totalcost = 0
    let obj = outtakehistory_datasource.find(each => each.batchid == itemid)
    if(document.querySelector(".matmodal"))document.querySelector(".matmodal").classList.remove('matmodalhidde');
    console.log('obj',obj);
    document.getElementById('outtaketdmodal').innerHTML = formatDate(obj.items[0].transactiondate.split(' ')[0]);
    document.getElementById('outtakelocationmodal').innerHTML = getLocationById(obj.items[0].location)
    document.getElementById('outtakedesmodal').innerHTML = obj.items[0].description
    document.getElementById('outtakehistorytablecontentmodal').innerHTML = obj.items.map((data, index)=>{
        console.log('the data', data)
        totalqty = totalqty + Number(data.qty)
        totalcost = totalcost + Number(data.cost)
        return `
            <tr data-open="false" class="source-row-item">
                <td> ${index+1} </td>
                <td>${data.itemid}</td>
                <td>${data.itemname}</td>
                <td style="width: 20px">${data.qty}</td>
                <td>&#8358;${formatCurrency(data.cost)}</td>
            </tr>
        `
    }).join('');
    document.getElementById('outtakehistorytablecontentmodal').innerHTML += `
        <tr data-open="false" class="source-row-item">
            <td> Total: </td>
            <td></td>
            <td></td>
            <td> ${totalqty} </td>
            <td> &#8358;${formatCurrency(totalcost)} </td>
        </tr>
    `
    // document.getElementById("modalitemname").value= obj.itemname;
    // document.getElementById("modalquantity").value= obj.qty;
    // document.getElementById("modalcost").value= obj.cost;
    // document.getElementById("modaldescription").value= obj.description;
    // document.getElementById("modaltransactiondate").value= obj.transactiondate;
    // document.getElementById("modallocation").value= intakeHistoryLocationsout.find(each=> each.id == obj.location).location;
}

const editOuttakeItem=(batchid)=>{
    let data = outtakehistory_datasource.find(each => each.batchid == batchid);
    if(!data)return;
    sessionStorage.setItem('outtakeeditdata', JSON.stringify(data));
    if(document.getElementById('outtake'))document.getElementById('outtake').click();
}

function appendouttakehistoryTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("outtakehistorytablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${data.items.length} </td>
                                <td> 
                                    <table>
                                        ${data.items.map((dat, index)=>{
                                            return ( index<3 ?
                                                `
                                            <tr>
                                                <td>${dat.itemname}</td>
                                                <td style="width: 20px">${dat.qty}</td>
                                            </tr>
                                            `
                                            :
                                               index==3?`
                                               <tr>
                                                    <td onclick="outtakemodal(${data.batchid})" style="color:green;cursor:pointer">click to view the remaining items ${data.items.length-3} ....</td>
                                                </tr>
                                                `:``
                                            )
                                        }).join('')}
                                    </table> 
                                </td>
                                <td> ${data.items.reduce((accumulator, currentItem) => {return accumulator + Number(currentItem.qty)}, 0)} </td>
                                <td> ${formatCurrency(data.items.reduce((accumulator, currentItem) => {return accumulator + Number(currentItem.cost)}, 0))} </td>
                                <td> ${data.items[0].transactiondate.split(' ')[0]} </td>
                                <td> ${getLocationById(data.items[0].location)} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="outtakemodal(${data.batchid})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px">View</button>
                                        <button onclick="editOuttakeItem(${data.batchid})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                    </div>
                                </td>
                            </tr>
    `
} 


async function outtakeeHistory(){
    await httpRequest('outtakehistory.php');
    
    jtabledata = document.getElementById('outtakehistorytablecontent');
        initializePaginationParams();
    
    function getStockinHistoryParams(){
		var paramstr = new FormData();
		paramstr.append('startdate',document.getElementById('matstockinhistorystartdate').value);
		paramstr.append('enddate',document.getElementById('matstockinhistoryenddate').value);
	   return paramstr;
	}
    
    if(document.getElementById('matstockinhistoryviewbtn'))document.getElementById('matstockinhistoryviewbtn').addEventListener('click', e=>{
        callController('fetchouttakes.php', getStockinHistoryParams(), 'fetchintakes', ['matstockinhistorystartdate','matstockinhistoryenddate'], populateoutakehistory)
    })
    
}



var outtakehistory = document.getElementById("outtakehistory")
if(outtakehistory ) outtakehistory.addEventListener('click',outtakeeHistory,false) 

let returndataid = ''
const checkreturnuserstatus =(result)=>{
        console.log(document.getElementById('returnlocation'))
        if(document.getElementById('returnlocation'))document.getElementById('returnlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('returnlocation'))document.getElementById('returnlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('returnlocation'))document.getElementById('returnlocation').setAttribute('readonly', true)
    }
}

const returnitemlist =(result)=>{
    if(document.getElementById('returnitemlistelement'))document.getElementById('returnitemlistelement').innerHTML = `<option value="" disabled selected>Select Item</option>`
    if(document.getElementById('returnitemlistelement'))document.getElementById('returnitemlistelement').innerHTML += result.data.data.map(dat=>`<option value="${dat.itemid}">${dat.itemname}</option>`).join('')
}

const changesomethingreturn =(state)=>{
    document.getElementById('returnproductvalue').value = state.value*document.getElementById('returnunitcost').value
}


const fetchreturnitemstatus =(id)=>{
    const populatereturnfields =(result)=>{
        if(document.getElementById('returntype'))document.getElementById('returntype').value = result.itemdata[0].itemtype;
        if(document.getElementById('returnmodel'))document.getElementById('returnmodel').value = result.itemdata[0].model;
        if(document.getElementById('returnunitcost'))document.getElementById('returnunitcost').value = result.itemdata[0].cost;
        if(document.getElementById('returnstockbalance'))document.getElementById('returnstockbalance').value = result.balance;
    }
    function gettheoreid(){
    var paramstr = new FormData();
        paramstr.append('itemid', id);
        return paramstr;
    };
    callController('fetchitemstatus.php', gettheoreid(), 'fetchitemstatus', null, populatereturnfields)
}

const accountreturndetails =(result)=>{
    if(document.getElementById('accountreturndetails'))document.getElementById('accountreturndetails').innerHTML = result.data.map(dat=>`<option value="${dat.accountdetail.accountnumber}">${dat.customerdetail.lastname} ${dat.customerdetail.firstname}</option>`)
}

const clearpopulatereturn =()=>{
    if(document.getElementById('returnaccountname'))document.getElementById('returnaccountname').value = ''
        if(document.getElementById('returnaccountbalance'))document.getElementById('returnaccountbalance').value = ''
}

const populatereturnaccountdetails =(value)=>{
    const populatereturnacc =(result)=>{
        if(document.getElementById('returnaccountname'))document.getElementById('returnaccountname').value = result.data[0].customerdetail.lastname + " " + result.data[0].customerdetail.firstname
        if(document.getElementById('returnaccountbalance'))document.getElementById('returnaccountbalance').value = result.data[0].customerbalance
    }
     function getaccountnumber(){
    var paramstr = new FormData();
    paramstr.append('accountnumber', value);
        return paramstr;
    };
    callController('fetchaccountprofile.php',getaccountnumber(), 'fetchaccountprofile', null, populatereturnacc );
}

async function openStockReturn () {
    await httpRequest('stock-return.php');
    returndataid = '';
    
    callController('fetchinventoryitemscript.php',null, 'fetchinventoryitemscript', null, returnitemlist);
    callController('fetchallaccountsprofile.php',null, 'fetchallaccountsprofile', null, accountreturndetails);
   
    
    if(document.getElementById('returnlocation'))document.getElementById('returnlocation').innerHTML = `<option value=""></option>`
    if(document.getElementById('returnlocation'))document.getElementById('returnlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    function getpermissionsParamsstockledger(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsstockledger(), 'fetchuserprofile', null, checkreturnuserstatus);
    
    if(sessionStorage.getItem('viewreturnviewdata')){
        returndataid = sessionStorage.getItem('viewreturnviewdata');
        const runaction =(result)=>{
            let data = result.data[0]
            sessionStorage.removeItem('viewreturnviewdata');
            const rvids = ['returnlocation', 'returnitemlistelement', 'returntype', 'returnmodel', 'returnunitcost', 'returnstockbalance', 'returnreturndate', 'returnreturnreceiptno', 'returnaccountnumber', 'returnaccountname', 'returnaccountbalance', 'returnreturnqty', 'returnproductvalue', 'returnservicecharge', 'returnreason'];
            let rvvalues = [data.location, data.itemid, data.itemtype, data.model, data.unitcost, data.stockbalance, data.returndate, data.reference, data.accountnumber, data.accountname, data.accountbalance, data.qtyreturned, data.productvalue, data.servicecharge, data.reason]
            console.log('result data', rvvalues)
            for(let i=0;i<rvids.length;i++){
                document.getElementById(`${rvids[i]}`).value = rvvalues[i];
                document.getElementById(`${rvids[i]}`).disabled = true;
            }
            if(document.getElementById('returnreturnbtn'))document.getElementById('returnreturnbtn').textContent = 'Edit';
        }
        function getidpara(){
            var paramstr = new FormData()
             paramstr.append('id', sessionStorage.getItem('viewreturnviewdata'));
             return paramstr;
        }
        callController('fetchreturnscript.php', getidpara(), 'fetchreturnscript', null, runaction)
    }
    if(sessionStorage.getItem('editreturnviewdata')){
        returndataid = sessionStorage.getItem('editreturnviewdata');
        const runaction =(result)=>{
            let data = result.data[0]
            sessionStorage.removeItem('editreturnviewdata');
            const rvids = ['returnlocation', 'returnitemlistelement', 'returntype', 'returnmodel', 'returnunitcost', 'returnstockbalance', 'returnreturndate', 'returnreturnreceiptno', 'returnaccountnumber', 'returnaccountname', 'returnaccountbalance', 'returnreturnqty', 'returnproductvalue', 'returnservicecharge', 'returnreason'];
            let rvvalues = [data.location, data.itemid, data.itemtype, data.model, data.unitcost, data.stockbalance, data.returndate, data.reference, data.accountnumber, data.accountname, data.accountbalance, data.qtyreturned, data.productvalue, data.servicecharge, data.reason]
            console.log('result data', rvvalues)
            for(let i=0;i<rvids.length;i++){
                document.getElementById(`${rvids[i]}`).value = rvvalues[i];
                // document.getElementById(`${rvids[i]}`).disabled = true;
            }
            if(document.getElementById('returnreturnbtn'))document.getElementById('returnreturnbtn').textContent = 'Update';
        }
        function getidpara(){
            var paramstr = new FormData()
             paramstr.append('id', sessionStorage.getItem('editreturnviewdata'));
             return paramstr;
        }
        callController('fetchreturnscript.php', getidpara(), 'fetchreturnscript', null, runaction)
    }
    
    if(document.getElementById('returnreturnbtn'))document.getElementById('returnreturnbtn').addEventListener('click', e=>{
        if(document.getElementById('returnreturnbtn').textContent.trim() == "Return" || document.getElementById('returnreturnbtn').textContent.trim() == "Update"){
               function getreturndata(){
                var paramstr = new FormData();
                if(returndataid != ''){
                    paramstr.append('id', returndataid);
                }
                paramstr.append('location', document.getElementById('returnlocation').value);
                paramstr.append('itemid', document.getElementById('returnitemlistelement').value);
                paramstr.append('itemtype', document.getElementById('returntype').value);
                paramstr.append('model', document.getElementById('returnmodel').value);
                paramstr.append('unitcost', document.getElementById('returnunitcost').value);
                paramstr.append('stockbalance', document.getElementById('returnstockbalance').value);
                paramstr.append('returndate', document.getElementById('returnreturndate').value);
                paramstr.append('reference', document.getElementById('returnreturnreceiptno').value);
                paramstr.append('accountnumber', document.getElementById('returnaccountnumber').value);
                paramstr.append('accountname', document.getElementById('returnaccountname').value);
                paramstr.append('accountbalance', document.getElementById('returnaccountbalance').value);
                paramstr.append('qtyreturned', document.getElementById('returnreturnqty').value);
                paramstr.append('productvalue', document.getElementById('returnproductvalue').value);
                paramstr.append('servicecharge', document.getElementById('returnservicecharge').value);
                paramstr.append('reason', document.getElementById('returnreason').value);
                    return paramstr;
                };
                callController('returnscript.php', getreturndata(), 'returnscript', ['returnlocation', 'returnitemlistelement', 'returntype', 'returnmodel', 'returnunitcost', 'returnstockbalance', 'returnreturndate', 'returnreturnreceiptno', 'returnaccountnumber', 'returnaccountname', 'returnaccountbalance', 'returnreturnqty', 'returnservicecharge', 'returnproductvalue', 'returnreason'], resetPage);
                
        }
        if(document.getElementById('returnreturnbtn').textContent.trim() == "Edit"){
            const rvids2 = ['returnlocation', 'returnitemlistelement', 'returntype', 'returnmodel', 'returnunitcost', 'returnstockbalance', 'returnreturndate', 'returnreturnreceiptno', 'returnaccountnumber', 'returnaccountname', 'returnaccountbalance', 'returnreturnqty', 'returnproductvalue', 'returnservicecharge', 'returnreason'];
            for(let i=0;i<rvids2.length;i++){
                document.getElementById(`${rvids2[i]}`).disabled = false;
            }
            callModal('You can now edit the details');
            if(document.getElementById('returnreturnbtn'))document.getElementById('returnreturnbtn').textContent = 'Update';
        }
     
    })
    
}

var stockreturnbtn = document.getElementById('stock-return')
if(stockreturnbtn) stockreturnbtn.addEventListener('click', openStockReturn, false)



var returnvieworehistory_datasource = [];

const populatereturnviewtable=(result)=>{
    returnvieworehistory_datasource = [];
    returnvieworehistory_datasource = result.data;
    console.log('returnvieworehistory_datasource', returnvieworehistory_datasource)
    initPagination(returnvieworehistory_datasource, returnvieworehistoryorehistorysetCurrentPage);
    document.getElementById('returnview2orehistorytablecontent').innerHTML = returnvieworehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.itemname} </td>
                                <td> ${dat.model} </td>
                                <td> ${dat.itemtype} </td>
                                <td> ${dat.qtyreturned} </td>
                                <td> ${dat.unitcost} </td>
                                <td> ${dat.productvalue} </td>
                                <td> ${dat.returndate} </td>
                                <td> ${dat.servicecharge} </td>
                                <td> ${dat.reason} </td>
                                <td> ${dat.stockbalance} </td> 
                                <td> ${dat.accountname} </td>
                            </tr>`)
    }).join('')
    }
    
var returnvieworehistoryorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(returnvieworehistory_datasource.length) {
        returnvieworehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendreturnvieworehistoryorehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("returnvieworehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletestockreturnentry=(id)=>{
    const run=(result)=>{
        document.getElementById('returnviewfetchview').click();
    }
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removereturnscript.php', parammm(), 'removereturnscript', null, run)
}

function appendreturnvieworehistoryorehistoryTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("returnvieworehistorytablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${data.itemname} </td>
                                <td> ${data.model} </td>
                                <td> ${data.itemtype} </td>
                                <td> ${data.qtyreturned} </td>
                                <td> ${data.unitcost} </td>
                                <td> ${data.productvalue} </td>
                                <td> ${data.returndate} </td>
                                <td> ${data.servicecharge} </td>
                                <td> ${data.reason} </td>
                                <td> ${data.stockbalance} </td> 
                                <td> ${data.accountname} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="sessionStorage.setItem('viewreturnviewdata', ${data.id});document.getElementById('stock-return').click()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px">View</button>
                                        <button onclick="sessionStorage.setItem('editreturnviewdata', ${data.id});document.getElementById('stock-return').click()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletestockreturnentry('${data.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 

const returnviewitemlist =(result)=>{
    if(document.getElementById('returnviewitemlistelement'))document.getElementById('returnviewitemlistelement').innerHTML = `<option value="" selected>All Items</option>`
    if(document.getElementById('returnviewitemlistelement'))document.getElementById('returnviewitemlistelement').innerHTML += result.data.data.map(dat=>`<option value="${dat.itemid}">${dat.itemname}</option>`).join('')
}
const checkreturnviewuserstatus =(result)=>{
        console.log(document.getElementById('returnviewlocation'))
        if(document.getElementById('returnviewlocation'))document.getElementById('returnviewlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('returnviewlocation'))document.getElementById('returnviewlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('returnviewlocation'))document.getElementById('returnviewlocation').setAttribute('readonly', true)
    }
}

async function openstockreturnview () {
    await httpRequest('stockreturnview.php');
    
     jtabledata = document.getElementById('returnvieworehistorytablecontent');
        initializePaginationParams();
        
    callController('fetchinventoryitemscript.php',null, 'fetchinventoryitemscript', null, returnviewitemlist);
    
    if(document.getElementById('returnviewlocation'))document.getElementById('returnviewlocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('returnviewlocation'))document.getElementById('returnviewlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    
    function getpermissionsParamsreturnview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsreturnview(), 'fetchuserprofile', null, checkreturnviewuserstatus);
    
     if(document.getElementById('returnviewfetchview'))document.getElementById('returnviewfetchview').addEventListener('click', e=>{
        function getreturndata(){
            var paramstr = new FormData();
            paramstr.append('location', document.getElementById('returnviewlocation').value);
            paramstr.append('itemid', document.getElementById('returnviewitemlistelement').value);
            paramstr.append('startdate', document.getElementById('returnviewstartdate').value);
            paramstr.append('enddate', document.getElementById('returnviewenddate').value);
            return paramstr;
    };
    callController('fetchreturnscript.php', getreturndata(), 'fetchreturnscript', ['returnviewlocation', 'returnviewstartdate', 'returnviewenddate'], populatereturnviewtable);
    
    })
    
     if(document.getElementById('viewreturnexport'))document.getElementById('viewreturnexport').addEventListener('click',e=>{
            tableToExcel('returnvieworetable2', 'LIST OF RETURNS')},false);
        if(document.getElementById('viewreturnprint'))document.getElementById('viewreturnprint').addEventListener('click',e=>{
            printContent('LIST OF RETURNS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'returnvieworefulltableparant')},false);

    
}



var returnview = document.getElementById('stockreturnview')
if(returnview) returnview.addEventListener('click', openstockreturnview, false)
    
    
    
let giftdataid
const giftitemlistgift =(result)=>{
    if(document.getElementById('giftitemlistgiftelement'))document.getElementById('giftitemlistgiftelement').innerHTML = `<option value="" disabled selected>Select Item</option>`
    if(document.getElementById('giftitemlistgiftelement'))document.getElementById('giftitemlistgiftelement').innerHTML += result.data.data.map(dat=>`<option value="${dat.itemid}">${dat.itemname}</option>`).join('')
}

const solveproductvalue =(val)=>{
    document.getElementById('giftstockprodvalue').value = document.getElementById('giftstockqty').value*document.getElementById('giftunitcost').value
}

const fetchgiftstatus =(id)=>{
    const populategiftfields =(result)=>{
        if(document.getElementById('gifttype'))document.getElementById('gifttype').value = result.itemdata[0].itemtype;
        if(document.getElementById('giftmodel'))document.getElementById('giftmodel').value = result.itemdata[0].model;
        if(document.getElementById('giftunitcost'))document.getElementById('giftunitcost').value = result.itemdata[0].cost;
        if(document.getElementById('giftstockbalance'))document.getElementById('giftstockbalance').value = result.balance;
    }
    function gettheoreid(){
    var paramstr = new FormData();
        paramstr.append('itemid', id);
        return paramstr;
    };
    callController('fetchitemstatus.php', gettheoreid(), 'fetchitemstatus', null, populategiftfields)
}

const checkgiftuserstatus =(result)=>{
        console.log(document.getElementById('giftlocation'))
        if(document.getElementById('giftlocation'))document.getElementById('giftlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('giftlocation'))document.getElementById('giftlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('giftlocation'))document.getElementById('giftlocation').setAttribute('readonly', true)
    }
}


async function stockGift () {
    giftdataid = ''
    await httpRequest('stock-gift.php', 'override');
    callController('fetchinventoryitemscript.php',null, 'fetchinventoryitemscript', null, giftitemlistgift);
     if(document.getElementById('giftlocation'))document.getElementById('giftlocation').innerHTML = `<option value=""></option>`
    if(document.getElementById('giftlocation'))document.getElementById('giftlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
     function getpermissionsParamsstockledger(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsstockledger(), 'fetchuserprofile', null, checkgiftuserstatus);
    
    if(sessionStorage.getItem('viewgiftviewdata')){
        giftdataid = sessionStorage.getItem('viewgiftviewdata');
        const runaction =(result)=>{
            let data = result.data[0]
            sessionStorage.removeItem('viewgiftviewdata');
            const rvids = ['giftlocation', 'giftitemlistgiftelement', 'gifttype', 'giftmodel', 'giftunitcost', 'giftstockbalance', 'giftgiftdate', 'giftgiftreceiptno', 'giftstockqty', 'giftstockprodvalue', 'giftreason'];
            let rvvalues = [data.location, data.itemid, data.itemtype, data.model, data.unitcost, data.stockbalance, data.dateissued, data.recipient, data.qtyissued, data.productvalue, data.reason]
            console.log('result data', rvvalues)
            for(let i=0;i<rvids.length;i++){
                document.getElementById(`${rvids[i]}`).value = rvvalues[i];
                document.getElementById(`${rvids[i]}`).disabled = true;
            }
            if(document.getElementById('giftsubmit'))document.getElementById('giftsubmit').textContent = 'Edit';
        }
        function getidpara(){
            var paramstr = new FormData()
             paramstr.append('id', sessionStorage.getItem('viewgiftviewdata'));
             return paramstr;
        }
        callController('fetchgiftscript.php', getidpara(), 'fetchgiftscript', null, runaction)
    }
    if(sessionStorage.getItem('editgiftviewdata')){
        giftdataid = sessionStorage.getItem('editgiftviewdata');
        const runaction =(result)=>{
            let data = result.data[0]
            sessionStorage.removeItem('editgiftviewdata');
            const rvids = ['giftlocation', 'giftitemlistgiftelement', 'gifttype', 'giftmodel', 'giftunitcost', 'giftstockbalance', 'giftgiftdate', 'giftgiftreceiptno', 'giftstockqty', 'giftstockprodvalue', 'giftreason'];
            let rvvalues = [data.location, data.itemid, data.itemtype, data.model, data.unitcost, data.stockbalance, data.dateissued, data.recipient, data.qtyissued, data.productvalue, data.reason]
            console.log('result data', rvvalues)
            for(let i=0;i<rvids.length;i++){
                document.getElementById(`${rvids[i]}`).value = rvvalues[i];
                // document.getElementById(`${rvids[i]}`).disabled = true;
            }
            if(document.getElementById('giftsubmit'))document.getElementById('giftsubmit').textContent = 'Update';
        }
        function getidpara(){
            var paramstr = new FormData()
             paramstr.append('id', sessionStorage.getItem('editgiftviewdata'));
             return paramstr;
        }
        callController('fetchgiftscript.php', getidpara(), 'fetchgiftscript', null, runaction)
    }
    
    if(document.getElementById('giftsubmit'))document.getElementById('giftsubmit').addEventListener('click', e=>{
        if(document.getElementById('giftsubmit').textContent.trim() == 'Submit' || document.getElementById('giftsubmit').textContent.trim() == 'Update'){
               function getgiftdata(){
                var paramstr = new FormData();
                if(giftdataid != ''){
                    paramstr.append('id', giftdataid);
                }
                paramstr.append('location', document.getElementById('giftlocation').value);
                paramstr.append('itemid', document.getElementById('giftitemlistgiftelement').value);
                paramstr.append('itemtype', document.getElementById('gifttype').value);
                paramstr.append('model', document.getElementById('giftmodel').value);
                paramstr.append('unitcost', document.getElementById('giftunitcost').value);
                paramstr.append('stockbalance', document.getElementById('giftstockbalance').value);
                paramstr.append('dateissued', document.getElementById('giftgiftdate').value);
                paramstr.append('recipient', document.getElementById('giftgiftreceiptno').value);
                paramstr.append('qtyissued', document.getElementById('giftstockqty').value);
                paramstr.append('productvalue', document.getElementById('giftstockprodvalue').value);
                paramstr.append('reason', document.getElementById('giftreason').value);
                    return paramstr;
                };
                callController('giftscript.php', getgiftdata(), 'giftscript', ['giftlocation', 'giftitemlistgiftelement', 'giftgiftdate', 'giftgiftreceiptno', 'giftstockqty', 'giftstockprodvalue'], resetPage);

        }
        if(document.getElementById('giftsubmit').textContent.trim() == "Edit"){
            const rvids2 = ['giftlocation', 'giftitemlistgiftelement', 'gifttype', 'giftmodel', 'giftunitcost', 'giftstockbalance', 'giftgiftdate', 'giftgiftreceiptno', 'giftstockqty', 'giftstockprodvalue', 'giftreason'];
            for(let i=0;i<rvids2.length;i++){
                document.getElementById(`${rvids2[i]}`).disabled = false;
            }
            callModal('You can now edit the details');
            if(document.getElementById('giftsubmit'))document.getElementById('giftsubmit').textContent = 'Update';
        }
        
        // if(document.getElementById('giftdataid').textContent == "Edit"){
        //     const rvids2 = ['giftlocation', 'giftitemlistelement', 'gifttype', 'giftmodel', 'giftunitcost', 'giftstockbalance', 'giftgiftdate', 'giftgiftreceiptno', 'giftaccountnumber', 'giftaccountname', 'giftaccountbalance', 'giftgiftqty', 'giftproductvalue', 'giftservicecharge', 'giftreason'];
        //     for(let i=0;i<rvids2.length;i++){
        //         document.getElementById(`${rvids2[i]}`).disabled = false;
        //     }
        //     callModal('You can now edit the details');
        //     if(document.getElementById('giftdataid'))document.getElementById('giftdataid').textContent = 'Update';
        // }
     
    })
}

var stockGiftNav = document.getElementById("stock-gift");
if (stockGiftNav) stockGiftNav.addEventListener("click", stockGift, false);


var giftvieworehistory_datasource = [];

const populategiftviewtable=(result)=>{
    giftvieworehistory_datasource = [];
    giftvieworehistory_datasource = result.data;
    console.log('giftvieworehistory_datasource', giftvieworehistory_datasource)
    initPagination(giftvieworehistory_datasource, giftvieworehistoryorehistorysetCurrentPage);
    document.getElementById('giftview2orehistorytablecontent').innerHTML = giftvieworehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.itemname} </td>
                                <td> ${dat.model} </td>
                                <td> ${dat.itemtype} </td>
                                <td> ${dat.qtyissued} </td>
                                <td> ${dat.unitcost} </td>
                                <td> ${dat.productvalue} </td>
                                <td> ${dat.dateissued} </td>
                                <td> ${dat.stockbalance} </td> 
                                <td> ${dat.reason} </td>
                            </tr>`)
    }).join('')
    }
    
var giftvieworehistoryorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(giftvieworehistory_datasource.length) {
        giftvieworehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendgiftvieworehistoryorehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("giftvieworehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletestockgiftentry=(id)=>{
    const run=(result)=>{
       function paramsgift(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('giftviewlocation').value);
        paramstr.append('startdate', document.getElementById('giftviewstartdate').value);
        paramstr.append('enddate', document.getElementById('giftviewenddate').value);
            return paramstr;
        };
        
        callController('fetchgiftscript.php', paramsgift(), 'fetchgiftscript', ['giftviewenddate', 'giftviewstartdate', 'giftviewlocation'], populategiftviewtable);
    }
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removegift.php', parammm(), 'removegift', null, run)
}

function appendgiftvieworehistoryorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("giftvieworehistorytablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.itemname} </td>
                                <td> ${dat.model} </td>
                                <td> ${dat.itemtype} </td>
                                <td> ${dat.qtyissued} </td>
                                <td> ${dat.unitcost} </td>
                                <td> ${dat.productvalue} </td>
                                <td> ${dat.dateissued} </td>
                                <td> ${dat.stockbalance} </td> 
                                <td> ${dat.reason} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="sessionStorage.setItem('viewgiftviewdata', ${dat.id});document.getElementById('stock-gift').click()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px">View</button>
                                        <button onclick="sessionStorage.setItem('editgiftviewdata', ${dat.id});document.getElementById('stock-gift').click()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletestockgiftentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 


const checkgiftviewuserstatus =(result)=>{
        console.log(document.getElementById('giftviewlocation'))
        if(document.getElementById('giftviewlocation'))document.getElementById('giftviewlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('giftviewlocation'))document.getElementById('giftviewlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('giftviewlocation'))document.getElementById('giftviewlocation').setAttribute('readonly', true)
    }
}



async function giftview () {
    await httpRequest('giftview.php', 'override');
    
      jtabledata = document.getElementById('giftvieworehistorytablecontent');
        initializePaginationParams();
    
    if(document.getElementById('giftviewfetchview'))document.getElementById('giftviewfetchview').addEventListener('click', e=>{
        function paramsgift(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('giftviewlocation').value);
        paramstr.append('startdate', document.getElementById('giftviewstartdate').value);
        paramstr.append('enddate', document.getElementById('giftviewenddate').value);
            return paramstr;
        };
        
        callController('fetchgiftscript.php', paramsgift(), 'fetchgiftscript', ['giftviewenddate', 'giftviewstartdate', 'giftviewlocation'], populategiftviewtable);
    })
    
    if(document.getElementById('giftviewlocation'))document.getElementById('giftviewlocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('giftviewlocation'))document.getElementById('giftviewlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    function getpermissionsParamsgiftview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsgiftview(), 'fetchuserprofile', null, checkgiftviewuserstatus);
    
      if(document.getElementById('viewgiftexport'))document.getElementById('viewgiftexport').addEventListener('click',e=>{
            tableToExcel('giftvieworetable2', 'LIST OF RETURNS')},false);
        if(document.getElementById('viewgiftprint'))document.getElementById('viewgiftprint').addEventListener('click',e=>{
            printContent('LIST OF RETURNS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'giftvieworefulltableparant')},false);


}

var giftviewNav = document.getElementById("giftview");
if (giftviewNav) giftviewNav.addEventListener("click", giftview, false);


async function openStockStatusReport() {
    await httpRequest('stockstatusreport.php')
    jtabledata = document.getElementById('jtabledata')
    await fetchStockReportData()
}

async function fetchStockReportData() {
    let result = await httpJsonRequest('../controllers/fetchstockstatus.php')
    if(result?.status) {
        console.log('stock result', result)
        stockstatuslist = result.data
        stockstatuslist.length && renderStockStatusTable()
    }
}

function renderStockStatusTable() {
    if(jtabledata) jtabledata.innerHTML = '';
    let cost = 0
    let qty = 0
    let stockval = 0
    stockstatuslist.map((item, index) => {
        cost = cost + Number(item.cost)
        qty = qty + Number(item.stockbalance)
        stockval = stockval + (Number(item.stockbalance)*Number(item.cost))
        jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.itemid}</td>
            <td>${item.itemname}</td>
            <td>${item.itemclass}</td>
            <td>${item.itemtype}</td>
            <td>${naira} ${formatCurrency(item.cost)}</td>
            <td>${item.stockbalance}</td>
            <td>${naira} ${formatCurrency(Number(item.stockbalance)*Number(item.cost))}</td>
        </tr>
    `
    })
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>TOTAL:</td>
            <td>${naira} ${formatCurrency(cost)}</td>
            <td>${formatCurrency(stockval)}</td>
            <td>${naira} ${formatCurrency(stockval)}</td>
        </tr>
    `
    if(document.querySelector('#stockstatustable tbody').innerHTML === '') stockstatusreportbtn.click()
}

let stockstatusreportbtn = document.getElementById('stockstatusreport')
if(stockstatusreportbtn) stockstatusreportbtn.addEventListener('click', openStockStatusReport)


async function openArchiveinventoryList(){
    
await httpRequest('archiveinventory.php'); 


const archiveinventoryepaginate=(data)=>{
    archiveinventory_datasource = [];
    archiveinventory_datasource.push(data.data.data)
    initPagination(archiveinventory_datasource[0], archiveinventorysetCurrentPage)
    }


var archiveinventorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(archiveinventory_datasource.length) {
        archiveinventory_datasource[0].forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendarchiveinventoryTableRows(item, index)
            }
        })
        if(document.querySelector('#archiveinventoryfulltable tbody').innerHTML === '') orearchiveinventoryaccountsbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("archiveinventorytabledata").innerHTML=  renderNoTableData()
    }
};

function appendarchiveinventoryTableRows(item, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("archiveinventorytabledata").innerHTML += `
                            <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.itemname } </td>
                    <td> ${ item.itemtype } </td>
                    <td> ${ item.model } </td>
                    <td> ${ item.cost } </td>
                    <td> ${ item.savingsellingprice } </td>
                    <td> ${ item.cashsellingprice } </td>
                    <td> ${ item.marketingprice } </td>
                    <td> ${ formatDate(item.update_at) } </td>
                   
                </tr>
    `
} 



 jtabledata = document.getElementById('archiveinventorytabledata');
        // paginationLimit = 10;
        initializePaginationParams(archiveinventorysetCurrentPage);
        
        function prarm(){
            let p = new FormData()
            p.append('status', 'ARCHIVED')
            return p
        }
        
callController('fetchinventorybyclass.php', prarm(), 'fetchinventorybyclass', null, archiveinventoryepaginate, 'silent');


 
} 



var archiveinventorylist = document.getElementById('archiveinventory') 
if(archiveinventorylist)archiveinventorylist.addEventListener('click',openArchiveinventoryList,false)

//approve inventory---------------------------------------------------
let approveinventorydata
async function openapproveViewInventoryList(){
    
await httpRequest('approveinventory.php'); 

callController('fetchinventoryforapproval.php', null, 'fetchinventoryforapproval', null, getConsumabler, 'silent');

}

function getConsumabler(result){
            console.log('fetchConsumable ', result);
            /*const arrayOfConsumable = result.data.data.filter(data=>data.status !== 'APPROVED');*/
            approveinventorydata = result.data;
            const arrayOfConsumable = result.data;
            let jtabledata =  document.getElementById('approveinventorylisttabledata')
            if(jtabledata) jtabledata.innerHTML = '';
            if(arrayOfConsumable.length){
                jtabledata.innerHTML = arrayOfConsumable.map( (item, index) => 
                     `
                        <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                            <td> ${ index +1} </td>
                            <td> ${ item.itemname } </td>
                            <td> ${ item.itemtype } </td>
                            <td> ${ item.model } </td>
                            <td> ${ item.cost } </td>
                            <td> ${ item.savingsellingprice } </td>
                            <td> ${ item.cashsellingprice } </td>
                            <td> ${ item.marketingprice } </td>
                            <td> ${ item.tlog.split('|').join(',') } </td>
                            <td> ${ item.edited} </td>
                            <td> ${ item.status == 'APPROVED' ? 'APPROVED' : item.status == 'DECLINED' ? 'DECLINED' : item.status } </td>
                             <td class="" style="display: flex;gap:10px">
                                <span class="viewbtn mtablebtn mbtnblue" style="margin-bottom: 10px;background: green;color:rgb(0, 105, 217);font-weight:bold" onclick="approveViewInventory(${item.itemid}, 'APPROVED')">Approve</span>
                                <span class="viewbtn mtablebtn mbtnblue" style="margin-bottom: 10px;background: red;color:rgb(0, 105, 217);font-weight:bold" onclick="approveViewInventory(${item.itemid}, 'DECLINED')">Decline</span>
                                <span class="viewbtn mtablebtn mbtnblue" style="display:none;margin-bottom: 10px;color:rgb(0, 105, 217);font-weight:bold" onclick="editapproveViewInventory(${item.id})">Edit</span>
                            </td>
                           
                        </tr>
                    `
                ).join('');
            
       }
    };


function approveViewInventory(id, action){
    function param(){
        let p = new FormData()
        p.append('itemid', id)
        p.append('status', action)
        return p
    }
    function act(res){
        callModal(`Item ${action}`, 1)
        openapproveViewInventoryList()
    }
callController('approveinventory.php', param(), 'approveinventory', null, act, 'silent');
}
    


function editapproveViewInventory(itemid, ){
    
    let obj;
      obj =  approveinventorydata.filter(each=> each.id == itemid)[0] 
      localStorage.setItem('inventoryupdate', JSON.stringify(obj));
    
    if(document.getElementById('itemregistration'))document.getElementById('itemregistration').click()
    
    // console.log(obj)
//   document.getElementById("matviewinventoryitemtype").value= obj.itemtype;
//     document.getElementById("matviewinventoryitemname").value= obj.itemname;
//     document.getElementById("matviewinventorycost").value= obj.cost;
//     document.getElementById("matviewinventorymodel").value= obj.model;
//     document.getElementById("matviewinventorycashselling").value= obj.cashsellingprice;
//     document.getElementById("matviewinventorymarketingprice").value= obj.marketingprice;
//     document.getElementById("matviewinventorysavingselling").value= obj.id;
//     document.getElementById("inventoryedit").value= obj.id;
    
//      if(document.getElementById('itemregistration'))document.getElementById('itemregistration').click()

console.log('theobj', obj)
    
    callModal('Please wait...', 2, 4000)
    setTimeout(()=>{
        document.getElementById("matviewinventoryitemtype").value= obj.itemtype;
        document.getElementById("matviewinventoryitemname").value= obj.itemname;
        document.getElementById("matviewinventorycost").value= obj.cost;
        document.getElementById("matviewinventorymodel").value= obj.model;
        document.getElementById("matviewinventorycashselling").value= obj.cashsellingprice;
        document.getElementById("matviewinventorymarketingprice").value= obj.marketingprice;
        document.getElementById("matviewinventorysavingselling").value= obj.id;
    document.getElementById("inventoryedit").value= obj.id;
    }, 4000)
    
}
 
var approveviewinventorylist = document.getElementById('approveinventory') 
if(approveviewinventorylist)approveviewinventorylist.addEventListener('click',openapproveViewInventoryList,false)
    



    
    
    
    
    
    
