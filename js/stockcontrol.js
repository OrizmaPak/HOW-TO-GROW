async function stockControl () {
    
    // alert("Vicol");
    
    await httpRequest('stockcontrol.php', 'override');
    
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
	}

    
    function getFetchItemDetailParams(){
        var paramstr = new FormData();
        paramstr.append("item", document.getElementById('select-item').value);
        return paramstr;
    
    }
    
    var fetchItemDetail = function(e){
        // alert("Reached fetchItemDetail Function");
        var innerstr = '';
        
        (document.getElementsByName('loadingicon')[0]).style.visibility = 'visible';
        (document.getElementsByName('loadingicon')[0]).style.display = 'block';	
        
        var request = getAjaxObject();
        
        request.open('POST','../controllers/controller.php',true);
        request.onreadystatechange = function(){
            if(request.readyState == 1){
                //sysf.innerHTML = fs + 'Loading...';
                //alert('Loading...' + ' type: ' + e.type + ' Target: ' + e.target.nodeName.toLowerCase());
            }
            if(request.readyState == 4 && request.status == 200){
                    (document.getElementsByName('loadingicon')[0]).style.visibility = 'hidden';
                    (document.getElementsByName('loadingicon')[0]).style.display = 'none';
                    
                    console.log(request.responseText);
                    
                    let result = JSON.parse(request.responseText);
                    if(result["result"] === "ERROR"){
                        var mbox = document.getElementsByName('messageBox')[0];
                        document.getElementsByName('messageBox')[0].innerHTML = "No result for the selected filters";
                        mbox.style.display = 'block';
                        mbox.style.visibility = 'visible';
                        setTimeout(function(){
                            mbox.style.display = 'none';
                            mbox.style.visibility = 'hidden';
    
                        }, 4000);						
                        
                    }else{
                        //var mbox = document.getElementsByName('reportfilterbox')[0];
                        // alert("Reached Item Detail Load Data Function");
                        loadItemDetailData(result);
                        // alert("Passed Item Detail Load Data Function");
                        
                    }
                
            }else{
                (document.getElementsByName('loadingicon')[0]).style.visibility = 'hidden';
                (document.getElementsByName('loadingicon')[0]).style.display = 'none';
                
                
                //document.getElementsByName('loader')[0].style.display = 'none';
                //sf = '<b>Error getting data</b>';
            }
    
    
            try{
                e.stopPropagation();
            }catch(ex){}
        }
    
        
        request.setRequestHeader('Connection','close');
        request.send(getFetchItemDetailParams());
    
    }
    
    function loadItemDetailData(result){
        console.log(result.data);
        if(result.data.length > 0){
            for (var k=0;k<result.data.length;k++){
                document.getElementById('item-detail-type').value = result.data.k.type;
                document.getElementById('item-detail-model').value = result.data.k.model;
                document.getElementById('item-detail-unit-cost').value = result.data.k.unitcost;
                document.getElementById('item-detail-stock-balance').value = result.data.k.stockbalance;
            }
        }
    
    }

	function validateStockControl(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var item = document.getElementById('select-item');
		var type = document.getElementById('item-detail-type');
		var model = document.getElementById('item-detail-model');
		var unit_cost = document.getElementById('item-detail-unit-cost');
		var stock_balance = document.getElementById('item-detail-stock-balance');
		var stock_in_date = document.getElementById('stock-in-date');
		var reference_no = document.getElementById('reference-no');
		var particulars = document.getElementById('particulars');
		var stock_in_qty = document.getElementById('stock-in-qty');
		var value = document.getElementById('value');
		
		
// 		var location = document.getElementById('location').options[document.getElementById('location').selectedIndex].value;
// 		var papersize = document.getElementById('papersize').options[document.getElementById('papersize').selectedIndex].value;
		//var email = document.getElementById('email');		
		
		if(item.value.length < 1){
			mssg += 'An item must be selected <br />';			
			item.style.borderColor = 'red';
			flag =0;
		} else if (item.value.length >= 250) {
			mssg += 'An item must be selected <br />';			
			item.style.borderColor = 'red';
			flag =0;
		} else {
			item.style.borderColor = 'lightgray';
		}
		
		if(type.value.length < 1){
			mssg += 'Item Type is blank <br />';			
			type.style.borderColor = 'red';
			flag =0;
		}else{
			type.style.borderColor = 'lightgray';
		}
		
		if(model.value.length < 1){
			mssg += 'Item Model is blank <br />';			
			model.style.borderColor = 'red';
			flag =0;
		} else{
			model.style.borderColor = 'lightgray';
		}
		
		if(unit_cost.value.length < 1){
			mssg += 'Unit Cost is blank <br />';			
			unit_cost.style.borderColor = 'red';
			flag =0;
		} else{
			unit_cost.style.borderColor = 'lightgray';
		}
		
		if(stock_balance.value.length < 1){
			mssg += 'Stock Balance is blank <br />';			
			stock_balance.style.borderColor = 'red';
			flag =0;
		} else{
			stock_balance.style.borderColor = 'lightgray';
		}
		
		if(stock_in_date.value.length < 1){
			mssg += 'Stock in date is blank <br />';			
			stock_in_date.style.borderColor = 'red';
			flag =0;
		} else{
			stock_in_date.style.borderColor = 'lightgray';
		}
		
		
		if(reference_no.value.length < 1){
			mssg += 'Reference No. is blank <br />';			
			reference_no.style.borderColor = 'red';
			flag =0;
		}else{
			reference_no.style.borderColor = 'lightgray';
		}
		
		if(particulars.value.length < 1){
			mssg += 'Particulars is blank <br />';			
			particulars.style.borderColor = 'red';
			flag =0;
		}else{
			particulars.style.borderColor = 'lightgray';
		}
		
		if(stock_in_qty.value.length < 1){
			mssg += 'Stock in Qty is blank <br />';			
			stock_in_qty.style.borderColor = 'red';
			flag =0;
		}else{
			stock_in_qty.style.borderColor = 'lightgray';
		}
		
		if(value.value.length < 1){
			mssg += 'Value is blank <br />';			
			value.style.borderColor = 'red';
			flag =0;
		}else{
			value.style.borderColor = 'lightgray';
		}
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				item.style.borderColor = 'lightgray';
				type.style.borderColor = 'lightgray';
				model.style.borderColor = 'lightgray';
				unit_cost.style.borderColor = 'lightgray';
				stock_balance.style.borderColor = 'lightgray';
				stock_in_date.style.borderColor = 'lightgray';
				reference_no.style.borderColor = 'lightgray';
				particulars.style.borderColor = 'lightgray';
				stock_in_qty.style.borderColor = 'lightgray';
				value.style.borderColor = 'lightgray';
				
				// (document.getElementById('location')).style.borderColor = 'lightgray';
				// (document.getElementById('papersize')).style.borderColor = 'lightgray';

			}, 3000);	
			return false;
		}else{ 
			return true; 
		}

	}
    
    function displayStockControlParams() {
		console.log("item".toLowerCase() + ": " + document.getElementById('select-item').value);
		console.log("type".toLowerCase() + ": " + document.getElementById('item-detail-type').value);
		console.log("model".toLowerCase() + ": " + document.getElementById('item-detail-model').value);
		console.log("unit_cost".toLowerCase() + ": " + document.getElementById('item-detail-unit-cost').value);
		console.log("stock_balance".toLowerCase() + ": " + document.getElementById('item-detail-stock-balance').value);
		console.log("transactiondate".toLowerCase() + ": " + document.getElementById('stock-in-date').value);
		console.log("reference".toLowerCase() + ": " + document.getElementById('reference-no').value);
		console.log("category".toLowerCase() + ": " + document.getElementById('particulars').value);
		console.log("qtyin".toLowerCase() + ": " + document.getElementById('stock-in-qty').value);
		console.log("value".toLowerCase() + ": " + document.getElementById('value').value);
		try {
		    console.log("logo: " + document.getElementById('profile-image-upload-input').files[0].name);
		} catch(ex) {}
    }
    
	function getStockControlParams(){
		var paramstr = new FormData();
	 		
		paramstr.append("item".toLowerCase(), document.getElementById('select-item').value);
		paramstr.append("type".toLowerCase(), document.getElementById('item-detail-type').value);
		paramstr.append("model".toLowerCase(), document.getElementById('item-detail-model').value);
		paramstr.append("unit_cost".toLowerCase(), document.getElementById('item-detail-unit-cost').value);
		paramstr.append("stock_balance".toLowerCase(), document.getElementById('item-detail-stock-balance').value);
		paramstr.append("transactiondate".toLowerCase(), document.getElementById('stock-in-date').value);
		paramstr.append("reference".toLowerCase(), document.getElementById('reference-no').value);
		paramstr.append("category".toLowerCase(), document.getElementById('particulars').value);
		paramstr.append("qtyin".toLowerCase(), document.getElementById('stock-in-qty').value);
		paramstr.append("value".toLowerCase(), document.getElementById('value').value);

        try{
		 paramstr.append('logo',document.getElementById('profile-image-upload-input').files[0].name);

        }catch(ex){
		 paramstr.append('logo','-');
	   }				


	   return paramstr;

	}


	var saveStockControlInfo = function(e){
		displayStockControlParams();
		var resdiv = document.getElementById('response');
		var innerstr = '';
		
		(document.getElementById('loadingicon')).style.visibility = 'visible';
		(document.getElementById('loadingicon')).style.display = 'block';
		if(!validateStockControl()){ 
			(document.getElementById('loadingicon')).style.visibility = 'hidden';
			(document.getElementById('loadingicon')).style.display = 'none';
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/organisationinfoscript.php',true);
		request.onreadystatechange = function(){
			if(request.readyState == 1){
				//sysf.innerHTML = fs + 'Loading...';
				//alert('Loading...' + ' type: ' + e.type + ' Target: ' + e.target.nodeName.toLowerCase());
			}
			if(request.readyState == 4 && request.status == 200){
				if(request.responseText === "FAILED"){
					(document.getElementById('loadingicon')).style.visibility = 'hidden';
					(document.getElementById('loadingicon')).style.display = 'none';

					var mbox = document.getElementById('messageBox');
					document.getElementById('messageBox').innerHTML = "Login Failed";
					mbox.style.display = 'block';
					mbox.style.visibility = 'visible';
					setTimeout(function(){
						mbox.style.display = 'none';
						mbox.style.visibility = 'hidden';

					}, 3000);						
				// }else if(request.responseText === "SUCCESS"){
				// 	window.location.href = "organisation-info.php";
				// }else{
				} else{
					(document.getElementById('loadingicon')).style.visibility = 'hidden';
					(document.getElementById('loadingicon')).style.display = 'none';

					var mbox = document.getElementById('messageBox');
					document.getElementById('messageBox').innerHTML = "MSG: " + request.responseText;
					mbox.style.display = 'block';
					mbox.style.visibility = 'visible';
					setTimeout(function(){
						mbox.style.display = 'none';
						mbox.style.visibility = 'hidden';

					}, 14000);						
					
				}
			}else{
				(document.getElementById('loadingicon')).style.visibility = 'hidden';
				(document.getElementById('loadingicon')).style.display = 'none';
				
				
			    //document.getElementById('loader').style.display = 'none';
				//sf = '<b>Error getting data</b>';
			}
            try {    
    			e.stopPropagation();
            } catch(ex) {}
		}

		
		request.setRequestHeader('Connection','close');
		request.send(getStockControlParams());

	}

    if(document.getElementById('select-item')) document.getElementById('select-item').addEventListener('change',fetchItemDetail,false);
    if(document.getElementById('btnActivateBF')) document.getElementById('btnActivateBF').addEventListener('click',saveStockControlInfo,false);
    if(document.getElementById('btnSubmit')) document.getElementById('btnSubmit').addEventListener('click',saveStockControlInfo,false);
    
    // alert();
}


var stockControlNav = document.getElementById("stockcontrol");
if (stockControlNav) stockControlNav.addEventListener("click", stockControl, false);