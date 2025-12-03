// if(document.getElementById('oreitementry'))document.getElementById('oreitementry')
const stleditem =(result)=>{
    if(document.getElementById('stockledgitem'))document.getElementById('stockledgitem').innerHTML = `<option value=""></option>`
    if(document.getElementById('stockledgitem'))document.getElementById('stockledgitem').innerHTML += result.data.data.map(dat=>`<option value="${dat.itemid}">${dat.itemname}</option>`).join('')
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
    stocklederorehistory_datasource = combineBatchData(result.data);
    console.log('stocklederorehistory_datasource', stocklederorehistory_datasource)
    initPagination(stocklederorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('stockledgeroretabledata2').innerHTML = stocklederorehistory_datasource.map(dat=>{
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
    }).join('')
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
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("outtakehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

function appendstocklederorehistoryTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("returnvieworetable").innerHTML += `
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

async function openStockLedgerView(){
    await   httpRequest('stockledgerview.php');
    
    jtabledata = document.getElementById('stockledgeroretable');
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
        callController('fetchstockledger.php', getitemhistoryparams(), 'fetchstockledger', ['stockledgitem', 'stockledglocation', 'stockledgstartdate', 'stockledendgdate'], populatestockledgerorehistory)
    });
     if(document.getElementById('stockledgeroreexport'))document.getElementById('stockledgeroreexport').addEventListener('click',e=>{
            tableToExcel('stockledgerorefulltable2', 'STOCK LEDGER')},false);
        if(document.getElementById('stockledgeroreprint'))document.getElementById('stockledgeroreprint').addEventListener('click',e=>{
            printContent('STOCK LEDGER',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'stockledgerorefulltableparant')},false);
}




































var stockLedgerView = document.getElementById('stockledgerview')
if(stockLedgerView) stockLedgerView.addEventListener('click', openStockLedgerView,false)
 
// async function openStockLedgerView(){

//  'use strict';
    
// await   httpRequest('stockledgerview.php') 

 

// const matStockLedgerDemo =  [
//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },

//     {
      
//         trandate: '24/9/2022',
//         item: '10LITERS VEGETABLE OIL',
//         particulars: '10LITERS VEGETABLE OILBF',
//         refno:105000,
//         qtyin:11,
//         qtyout:1,
//         gift: 0,
//     },



   
// ]

// const matGenerateTemplate = () => {
//     const arrayOfGenerateTemplate = matStockLedgerDemo.map((item, index) => {
//       return `
//       <tr>
//       <td></td>
//       <td>${item.trandate}</td>
//       <td>${item.item}</td>
//       <td>${item.particulars}</td>
//       <td>${item.refno}</td>
//       <td>${item.qtyin}</td>
//       <td>${item.qtyout}</td>
//       <td>${item.gift}</td>
//   </tr>
//           `;
//     });
//     const stringPopulateTemplate = arrayOfGenerateTemplate.join("");
  
//     return stringPopulateTemplate;
//   };


//   const matStockLedgerDisplay = () => {
//     let matStockLedgertable =document.getElementById('matstockledgertable')
//     let tHead =  matStockLedgertable.innerHTML
//      matStockLedgertable.innerHTML = tHead + matGenerateTemplate();
// }



// matStockLedgerDisplay();


    
// // const btns =document.querySelectorAll('button')
// // btns.forEach(event=>{
// //     event.addEventListener('click',e=>{
// //         const btnparent = event.parentElement;
// //             e.preventDefault()
// //     })    
// // })
    
    
   
// var getAjaxObject = function(){
// 		var requeste;
// 		try{
// 			requeste = new XMLHttpRequest();
// 		}catch(error){
// 			try{
// 				requeste = new ActiveXobject('Microsoft.XMLHTTP');
// 			}catch(error){
// 				return 'Error';
// 			}
// 		}
// 		return requeste;
// 	}
	
	
	
// 	 function getIntakes(){
//     const requestItem = getAjaxObject();
//     requestItem.open('POST','../controllers/fetchintakes.php',true)
//     requestItem.onreadystatechange = function(){
//       if(requestItem.readyState == 4 && requestItem.status == 200){
//             // console.log(requestItem);
//             const result = JSON.parse(requestItem.responseText);
//             console.log('Intakes', result);
          
         
       
//       }
//       else{
//         //   console.log("not success ",requestItem)
//       }
//     };
//     requestItem.setRequestHeader('Connection','close');
//     requestItem.send();
// }

// getIntakes()	
	

// 	function validateStockLedgerView(){
// 		var flag = 1;
// 		var mssg='';
// 		//used for BVN instead
		
// 		var matStockLedgerQtyIn = document.getElementById('matstockledgerqtyin');
// 		var matStockLedgerQtyOut = document.getElementById('matstockledgerqtyout');
// 		var matStockLedgerItemName = document.getElementById('matstockledgeritemname');
// 		var matStockLedgerModel = document.getElementById('matstockledgermodel');
// 		var matStockLedgerSavingSelling = document.getElementById('matstockledgersavingselling');
// 		var matStockLedgerCashSelling = document.getElementById('matstockledgercashselling');
// 		var matStockLedgerMarketingPrice = document.getElementById('matstockledgermarketingprice');
// 		var matStockLedgerControlBalance = document.getElementById('matstockledgercontrolbalance');
// 		var matStockLedgerTotalRevenued = document.getElementById('matstockledgertotalrevenued');
// 		var matStockLedgerTotalGift = document.getElementById('matstockledgertotalgift');
// 		var matStockLedgerActualBalance = document.getElementById('matstockledgeractualbalance');
		
		
		
		
			
		
// 		if(matStockLedgerQtyIn.value.length < 1){
// 			mssg += 'Quantity In is Invalid <br />';			
// 			matStockLedgerQtyIn.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			matStockLedgerQtyIn.style.borderColor = 'lightgray';
// 		}
// 		if(matStockLedgerQtyOut.value.length < 1){
// 			mssg += 'Quantity Out is blank <br />';			
// 			matStockLedgerQtyOut.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			matStockLedgerQtyOut.style.borderColor = 'lightgray';
// 		}
// 		if(matStockLedgerItemName.value.length < 1){
// 			mssg += 'Item name is Invalid <br />';			
// 			matStockLedgerItemName.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			matStockLedgerItemName.style.borderColor = 'lightgray';
// 		}
		
// 		if(matStockLedgerModel.value.length < 1){
// 			mssg += 'Model is blank <br />';			
// 			matStockLedgerModel.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			matStockLedgerModel.style.borderColor = 'lightgray';
// 		}
		
// 		if(matStockLedgerSavingSelling.value.length < 1){
// 			mssg += 'Saving selling price is blank <br />';			
// 			matStockLedgerSavingSelling.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			matStockLedgerSavingSelling.style.borderColor = 'lightgray';
// 		}
		
// 		if(matStockLedgerCashSelling .value.length < 1){
// 			mssg += 'Cash selling price is blank <br />';			
// 			matStockLedgerCashSelling .style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			matStockLedgerCashSelling .style.borderColor = 'lightgray';
// 		}
		
// 		if(matStockLedgerMarketingPrice.value.length < 1){
// 			mssg += 'Marketing price is blank <br />';			
// 			matStockLedgerMarketingPrice.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			matStockLedgerMarketingPrice.style.borderColor = 'lightgray';
// 		}
		
// 		if(matStockLedgerControlBalance.value.length < 1){
// 			mssg += 'Control balance is blank <br />';			
// 			matStockLedgerControlBalance.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			matStockLedgerControlBalance.style.borderColor = 'lightgray';
// 		}
		
// 		if(matStockLedgerTotalRevenued.value.length < 1){
// 			mssg += 'Control Revenued is blank <br />';			
// 			matStockLedgerTotalRevenued.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			matStockLedgerTotalRevenued.style.borderColor = 'lightgray';
// 		}
		
// 		if(matStockLedgerTotalGift.value.length < 1){
// 			mssg += 'Total gift is blank <br />';			
// 			matStockLedgerTotalGift.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			matStockLedgerTotalGift.style.borderColor = 'lightgray';
// 		}
		
// 		if(matStockLedgerActualBalance.value.length < 1){
// 			mssg += 'Actual Balance is blank <br />';			
// 			matStockLedgerActualBalance.style.borderColor = 'red';
// 			flag =0;
// 		}else{
// 			matStockLedgerActualBalance.style.borderColor = 'lightgray';
// 		}
		
		
		
// 		if(flag == 0){
			
// 			var mbox = document.getElementById('messageBox');
// 			mbox.innerHTML = mssg;
// 			mbox.style.display = 'block';
// 			mbox.style.visibility = 'visible';

// 			setTimeout(function(){
// 				mbox.style.display = 'none';
// 				mbox.style.visibility = 'hidden';
// 				matStockLedgerQtyIn.style.borderColor = 'lightgray';
// 				matStockLedgerQtyOut.style.borderColor = 'lightgray';
// 				matStockLedgerItemName.style.borderColor = 'lightgray';
// 				matStockLedgerModel.style.borderColor = 'lightgray';
// 				matStockLedgerSavingSelling.style.borderColor = 'lightgray';
// 			    matStockLedgerCashSelling.style.borderColor = 'lightgray';
// 				matStockLedgerMarketingPrice.style.borderColor = 'lightgray';
// 				matStockLedgerControlBalance.style.borderColor = 'lightgray';
// 				matStockLedgerTotalRevenued .style.borderColor = 'lightgray';
// 				matStockLedgerTotalGift.style.borderColor = 'lightgray';
// 			    matStockLedgerActualBalance.style.borderColor = 'lightgray';
// 			}, 2000);	
// 			return false;
// 		}else{ 
// 			return true; 
// 		}

// 	}

// 	function getStockLedgerViewParams(){
// 		var paramstr = new FormData();
	 		
// 		paramstr.append('itemname',document.getElementById('matstockledgeritemnane').value);
// 		paramstr.append('qtyin',document.getElementById('matstockledgerqtyin').value);
// 		paramstr.append('qtyout',document.getElementById('matstockledgerqtyout').value);
// 		paramstr.append('model',document.getElementById('matstockledgermodel').value);
// 		paramstr.append("savingsellingprice", document.getElementById('matstockledgersavingselling').value );
//         paramstr.append("cashsellingprice", document.getElementById('matstockledgercashselling').value );
//         paramstr.append("marketingprice", document.getElementById('matstockledgermarketingprice').value );
// 		paramstr.append('controlbalance',document.getElementById('matstockledgercontrolbalance').value);
// 		paramstr.append('totalrevenued',document.getElementById('matstockledgertotalrevenued').value);
// 		paramstr.append('totalgift',document.getElementById('tmatstockledgerotalgift').value);
// 		paramstr.append('actualbalance',document.getElementById('matstockledgeractualbalance').value);
	

// 	   return paramstr;

// 	}


// 	const saveStockLedgerView = function(e){
// 		var resdiv = document.getElementById('response');
// 		var innerstr = '';
		
// 		(document.getElementById('loadingicon')).style.visibility = 'visible';
// 		(document.getElementById('loadingicon')).style.display = 'block';
// 		if(!validateStockLedgerView()){ 
// 			(document.getElementById('loadingicon')).style.visibility = 'hidden';
// 			(document.getElementById('loadingicon')).style.display = 'none';
// 			return; 
// 		}
		
// 		var request = getAjaxObject();
		
// 		request.open('POST','Scripts/companyinfoscript.php',true);
// 		request.onreadystatechange = function(){
// 			if(request.readyState == 1){
// 				//sysf.innerHTML = fs + 'Loading...';
// 				//alert('Loading...' + ' type: ' + e.type + ' Target: ' + e.target.nodeName.toLowerCase());
// 			}
// 			if(request.readyState == 4 && request.status == 200){
// 				if(request.responseText === "FAILED"){
// 					(document.getElementById('loadingicon')).style.visibility = 'hidden';
// 					(document.getElementById('loadingicon')).style.display = 'none';

// 					var mbox = document.getElementById('messageBox');
// 					document.getElementById('messageBox').innerHTML = "Login Failed";
// 					mbox.style.display = 'block';
// 					mbox.style.visibility = 'visible';
// 					setTimeout(function(){
// 						mbox.style.display = 'none';
// 						mbox.style.visibility = 'hidden';

// 					}, 3000);						
// 				}else if(request.responseText === "SUCCESS"){
// 					window.location.href = "companyinfo.php";
// 				}else{
// 					(document.getElementById('loadingicon')).style.visibility = 'hidden';
// 					(document.getElementById('loadingicon')).style.display = 'none';

// 					var mbox = document.getElementById('messageBox');
// 					document.getElementById('messageBox').innerHTML = "MSG: " + request.responseText;
// 					mbox.style.display = 'block';
// 					mbox.style.visibility = 'visible';
// 					setTimeout(function(){
// 						mbox.style.display = 'none';
// 						mbox.style.visibility = 'hidden';

// 					}, 14000);						
					
// 				}
// 			}else{
// 				(document.getElementById('loadingicon')).style.visibility = 'hidden';
// 				(document.getElementById('loadingicon')).style.display = 'none';
				
				
// 			    //document.getElementById('loader').style.display = 'none';
// 				//sf = '<b>Error getting data</b>';
// 			}

// 			e.stopPropagation();
// 		}

		
// 		request.setRequestHeader('Connection','close');
// 		request.send(getStockLedgerViewParams());

// 	}

// if(document.getElementById('matstockledgerviewbtn'))document.getElementById('matstockledgerviewbtn').addEventListener('click',validateStockLedgerView,true);

// }

var stockLedgerView = document.getElementById('stockledgerview')
if(stockLedgerView) stockLedgerView.addEventListener('click', openStockLedgerView,false)



