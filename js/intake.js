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
                        <select disabled name="selectitem" onchange="matintakeselectitem(this.id, this.value)" id="matintakeselectitem_${i}" class="orejot">
                            <option value="" disabled selected >select item</option>
                        </select>
                    </div>
                    <div class="grid__item">
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
                    <div class="grid__item">
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
    
    const reload =(result)=>{
        if(document.getElementById('matintakebtnsubmit').textContent == 'Update'){document.getElementById('stockinhistory').click()}else{
            document.getElementById('intake').click();
        }
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






// let intakeSelectItems;
// async function openIntake(){
// 'use strict';
// await httpRequest('intake.php')
    
// var  getAjaxObject = function(){
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
// 	};
	
	
    	
//  function getAllItems(){
//     const requestItem = getAjaxObject();
//     requestItem.open('POST','../controllers/fetchinventoryitemscript.php',true)
//     requestItem.onreadystatechange = function(){
//       if(requestItem.readyState == 4 && requestItem.status == 200){
//             // console.log(requestItem);
//             const result = JSON.parse(requestItem.responseText);
//             console.log('AllItems', result);
//             intakeSelectItems = result.data.data;
//             generateFirstSelect();
//             initialLoad();
          
//           if(  document.getElementById('displayfetchname')){
//             //   document.getElementById('displayfetchname').textContent= accountProfile.name
//           }
//       }
//       else{
//         //   console.log("not success ",requestItem)
//       }
//     };
//     requestItem.setRequestHeader('Connection','close');
//     requestItem.send();
// }	
// getAllItems()	
	


// 	function validateIntake(){
// 		var flag = 1;
// 		var mssg='';
// 		//used for BVN instead
// 		var matIntakeDate = document.getElementById('matintakedate');
// // 		var matIntakeReferenceno = document.getElementById('matintakereferenceno');
	   
	
// 		if(matIntakeDate.value.length < 1){
// 			mssg += 'Date is Invalid <br />';			
// 			matIntakeDate.style.borderColor = 'red';
// 			flag =0;
// 		}
// 	    else{
// 			matIntakeDate.style.borderColor = 'lightgray';
// 		}
		
// // 		if(matIntakeReferenceno.value.length < 1){
// // 			mssg += 'Reference Number is Invalid <br />';			
// // 			matIntakeReferenceno.style.borderColor = 'red';
// // 			flag =0;
// // 		}
// // 	    else{
// // 			matIntakeReferenceno.style.borderColor = 'lightgray';
// // 		}
		
	
		
// 		if(flag == 0){
			
// 			var mbox = document.getElementById('messageBox');
// 			mbox.innerHTML = mssg;
// 			mbox.style.display = 'block';
// 			mbox.style.visibility = 'visible';

// 			setTimeout(function(){
// 				mbox.style.display = 'none';
// 				mbox.style.visibility = 'hidden';
			
// 				matIntakeDate.style.borderColor = 'lightgray';
// 				// matIntakeReferenceno.style.borderColor = 'lightgray';

// 			}, 2000);	
// 			return false;
// 		}else{ 
// 			return true; 
// 		}

// 	}
	

//     var totalRow = 1;
//     let intakeArrayCost = [];
//     let intakeArrayQuantity = [];
    
//     const intakeUiMapState = new Map();
//     let intakeNumberOfSubsequentGrids= 0;
//     let intakeLastRemove = [];

//     console.log(intakeUiMapState);
    
//     function intakeGenerateNewGrid(flag) {
//         console.log("flag", flag);
//       let intakeGridRow = document.createElement("div");
//       intakeGridRow.classList.add("gridrow");
    
//       let selectSpace = document.createElement("div");
    
//       //   if (flag === 0) {
//       let select = document.createElement("select");
//       let option = document.createElement("option");
//       option.value = "";
//       option.innerHTML = "select item";
//       option.disabled = true;
//       option.selected = true;
//       select.append(option);
//      intakeSelectItems.forEach((item, index) => {
//         let option = document.createElement("option");
//         option.value = index;
//         option.innerText = item.itemname;
//         select.append(option);
//       });
//       select.id = flag;
//       selectSpace.append(select);
//       select.addEventListener("change", populateRow);
//       //   }
    
//       let itemInfo = document.createElement("div");
//       itemInfo.classList.add("grid__item");
//       let itemInfoChild1 = document.createElement("p");
//       itemInfoChild1.innerHTML = `Type: <span id="intaketype"></span>`;
//       let itemInfoChild2 = document.createElement("p");
//       itemInfoChild2.innerHTML = `Model: <span id="intakemodel"></span>`;
//       let itemInfoChild3 = document.createElement("p");
//       itemInfoChild3.innerHTML = `Stock Balance: <span id="intakestockbalance"></span>`;
    
//       itemInfo.append(itemInfoChild1);
//       itemInfo.append(itemInfoChild2);
//       itemInfo.append(itemInfoChild3);
    
//       let unitCost = document.createElement("div");
//       unitCost.classList.add("grid__item");
//       let unitCostChild = document.createElement("input");
//       unitCostChild.id = "intakeunitcost";
//       unitCostChild.name = "intakeunitcost";
//       unitCostChild.type = "number";
//       unitCostChild.addEventListener("input", calcValueByCost);
//       unitCost.append(unitCostChild);
    
//       let quantity = document.createElement("div");
//       quantity.classList.add("grid__item");
//       let quantityChild = document.createElement("input");
//       quantityChild.id = "intakequantity";
//       quantityChild.name = "intakequantity";
//       quantityChild.type = "number";
//       quantityChild.addEventListener("input", calcValueByQuantity);
//       quantity.append(quantityChild);
    
//       let value = document.createElement("div");
//       value.classList.add("grid__item");
//       let valueChild = document.createElement("input");
//       valueChild.disabled = true;
//       valueChild.id = "intakevalue";
//       valueChild.name = "intakevalue";
//       value.append(valueChild);
    
//       let description = document.createElement("div");
//       description.classList.add("grid__item");
//       let descriptionChild = document.createElement("input");
//       descriptionChild.disabled = true;
//       descriptionChild.id = "intakedescription";
//       descriptionChild.name = "intakedescription";
//       description.append(descriptionChild);
      

//       let itemname= document.createElement("input");
//       itemname.name = 'intakeitemname';
//       itemname.id = 'intakeitemname';
//       itemname.type = 'hidden';
    
//       let itemid= document.createElement("input");
//       itemid.name = 'intakeitemid';
//       itemid.id = 'intakeitemid'
//       itemid.type = 'hidden';
      
      
    
//       let rowBtns = document.createElement("div");
//       rowBtns.classList.add("grid__item");
//       let rowBtnPlus = document.createElement("button");
//       rowBtnPlus.innerHTML = `+ <span class='mattooltip'> Add new row </span>`;
//       rowBtnPlus.classList.add("intakeplusbtn");
    
//       rowBtnPlus.addEventListener("click", intakeHandlePlusEvent);
    
//       if (flag !== 0) {
//         let rowBtnMinus = document.createElement("button");
//         rowBtnMinus.innerHTML = `- <span class='mattooltip'> Remove row </span>`;
//         rowBtnMinus.classList.add("minusbtn");
//         rowBtnMinus.id = flag;
//         rowBtnMinus.addEventListener("click", intakeHandleRemoveEvent);
//         rowBtns.append(rowBtnMinus);
//       }
    
//       rowBtns.append(rowBtnPlus);
    
//       intakeGridRow.append(selectSpace);
//       intakeGridRow.append(itemInfo);
//       intakeGridRow.append(unitCost);
//       intakeGridRow.append(quantity);
//       intakeGridRow.append(value);
//       intakeGridRow.append(description);
//       intakeGridRow.append(rowBtns);
//       intakeGridRow.append(itemname);
//       intakeGridRow.append(itemid);
//       return intakeGridRow;
//     }

//     //  plus event listerner
//     function intakeHandlePlusEvent() {
//       totalRow ++;
//       // if LR is EMPTY contiue the original count
//       if (intakeLastRemove.length < 1) {
//         intakeNumberOfSubsequentGrids+= 1;
//       }
    
//       // if LR is not empty, pick the first index of LR as the index for the next grid else use count
//       const index =
//         intakeLastRemove.length > 0 ? intakeLastRemove.shift() : intakeNumberOfSubsequentGrids;
    
//       console.log("len of las", intakeLastRemove.length);
    
//       // create grid
//       const newGrid = intakeGenerateNewGrid(index);
//       intakeUiMapState.set(index, { ui: newGrid, data: "" });
//       intakeAddGridToDocument();
//     }

//     // minus event listener
//     function intakeHandleRemoveEvent(event) {
//         totalRow--;
//       const target = Number(event.currentTarget.id);
//     //   if (intakeLastRemove.length < -1) {
//     //     intakeNumberOfSubsequentGrids-= 1;
//     //   } else {
//         intakeLastRemove.push(target);
//     //   }
//       console.log("target for removal ", target);
//       intakeUiMapState.delete(target);
//       intakeGridContainer.removeChild(event.currentTarget.parentElement.parentElement);
//       intakeAddGridToDocument();
//     }

//     let intakeReadyExisting = document.querySelector(".intakegridrow");
    
//     // intakeReadyExisting.innerHTML = "" 
//     const intakeGridContainer = document.createElement("div");
//     intakeGridContainer.className = "intakeApp_grid";

//     // intakeReadyExisting.insertAdjacentElement("afterend", gridRow);

//     // add grid to ui --- edit to loop throw ui-grid states and pupulate ---
//     function intakeAddGridToDocument() {
//       console.log("last remove", intakeLastRemove);
//       intakeUiMapState.forEach((state) => {
//         intakeGridContainer.append(state.ui);
//       });
    
    
//       intakeReadyExisting.insertAdjacentElement("afterend", intakeGridContainer);
    
//       const intakeAllPlusBtn = Array.from(document.querySelectorAll(".intakeplusbtn"));
    
//       console.log("intake btn plus ", intakeAllPlusBtn);
    
//       const btnToActive = intakeAllPlusBtn.pop();
    
//       intakeAllPlusBtn.forEach((btn) => (btn.disabled = true));
    
//       btnToActive.disabled = false;
//     }
    
//     // const trackSelected = []
//     function populateRow(e) {
//       const isObj = intakeSelectItems[e.target.value];
//       console.log(isObj);
//       // if(trackSelected.includes(e.target.value))return;
//       // trackSelected.push(e.target.value)
//       const uiId = Number(e.target.id);
    
//     //   intakeUiMapState.get(uiId).data = isObj;
    
//       console.log(intakeUiMapState.get(uiId));
    
//       const { itemname, qty, cost, itemtype, model, stockBalance, itemid } = isObj;
    
//       const parent = e.target.parentElement.parentElement;
    
//       parent.querySelector("#intaketype").innerHTML = itemtype;
//       parent.querySelector("#intakemodel").innerHTML = model;
//       parent.querySelector("#intakestockbalance").innerHTML = 0;
//       parent.querySelector("#intakeunitcost").value = cost;
//       parent.querySelector("#intakequantity").value = 1;
//       parent.querySelector("#intakevalue").value = cost * 1;
//       parent.querySelector("#intakedescription").value = itemname;
//       parent.querySelector("#intakeitemname").value = itemname;
//       parent.querySelector("#intakeitemid").value = itemid;
      
//     }

//     function calcValueByCost(e) {
//       const parent = e.target.parentElement.parentElement;
//       console.log(parent);
//       const cost = e.target.value;
//       const qty = parent.querySelector("#intakequantity").value;
//       parent.querySelector("#intakevalue").value = cost * qty;
//     }

//     function calcValueByQuantity(e) {
//       const parent = e.target.parentElement.parentElement;
//       console.log(parent);
//       const cost = e.target.value;
//       const qty = parent.querySelector("#intakeunitcost").value;
//       parent.querySelector("#intakevalue").value = cost * qty;
//     }

//     // function getDataFromObj() {
//     //   for (let [key, objValue] of intakeUiMapState) {
//     //     const innerObj = objValue.data;
//     //     if (innerObj) {
//     //       let { cost, qty } = innerObj;
//     //       console.log(cost);
//     //       if (!cost) continue;
//     //       arrayCost.push(cost);
//     //       if (!qty) continue;
//     //       arrayQuantity.push(qty);
//     //     }
//     //   }
//     // }

    
//     const initialLoad = () => {
//     document
//     .getElementById("matintakeselectitem")
//     .addEventListener("change", function (e) {
//       console.log(document.getElementById("matintakeselectitem").value);
//       populateRow(e);
    
//     });

//   document.querySelector(".intakeplusbtn").addEventListener("click", intakeHandlePlusEvent);
//     };

//     let firstRowSelectitem = document.getElementById("matintakeselectitem");
//     function generateFirstSelect() {
//       const arrayOfSelectOption = intakeSelectItems.map((item, index) => {
//         return `<option value=${index}>${item.itemname}</option>`;
//       });
//       const head = firstRowSelectitem.innerHTML;
//       firstRowSelectitem.innerHTML = head + arrayOfSelectOption.join("");
//     }
//     document.getElementById('intakeunitcost').addEventListener('input',function(e){
//       calcValueByQuantity(e);
//     });
//     document.getElementById('intakequantity').addEventListener('input',function(e){
//       calcValueByQuantity(e);
//     });
    
//     // generateFirstSelect();
//     // initialLoad();

    
    

   

// 	function getIntakeParams(){
// 		var paramstr = new FormData();
		
// 	 	const cost = document.getElementsByName('intakeunitcost'); 
// 	 	const description = document.getElementsByName('intakedescription');
// 	 	const quantity = document.getElementsByName('intakequantity');
// 	 	const itemName  = document.getElementsByName('intakeitemname');
// 	 	const itemId = document.getElementsByName('intakeitemid');	
	
// 	 	paramstr.append('rowsize', cost.length);
// 		paramstr.append('reference', document.getElementById('matintakereferenceno').value);
// 		paramstr.append('transactiondate',document.getElementById('matintakedate').value);
// // 	 	paramstr.append('batchid',document.getElementById('batchid').value)
		
// 		for(var j = 0; j < cost.length; j++){
// 		    	paramstr.append('cost'+j, cost[j].value);	
// 		    	paramstr.append('description'+j, description[j].value);
// 		    	paramstr.append('qty'+j, quantity[j].value);
// 		    	paramstr.append('itemname'+j, itemName[j].value);
// 		    	paramstr.append('itemid'+j, itemId[j].value);
// 		}

// 		for (var pair of paramstr.entries()) {
//               console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
//         }
// 	   return paramstr;
// 	}
	
	

//     var	saveIntake = function(e){
// 	    showSpinner();
		
// 		if(!validateIntake()){ 
// 		 hideSpinner();
// 			return; 
// 		}
		
// 		var request = getAjaxObject();
		
// 		request.open('POST','../controllers/intakescript.php',true);
// 		request.onreadystatechange = function(){
// 			if(request.readyState == 1){

// 			}
// 			if(request.readyState == 4 && request.status == 200){
// 			    console.log('request.responseText', request.responseText);
// 			    console.log('Intake Response',request.responseText);
// 			     let resObj = JSON.parse(request.responseText);
// 			     //console.log('result', result);
			     
// 			     let stat = 2;
//                 if(resObj.result === "Successful"){
//                     stat = 1;
//                     for(let i=0; i<document.getElementsByTagName('input').length; i++){
//                         document.getElementsByTagName('input')[i].value = '';
//                     }
//                     for(let i=0; i<document.getElementsByTagName('select').length; i++){
//                         document.getElementsByTagName('select')[i].value = '';
//                     }
//                     openIntake()
                    
//                 }else{
//                     stat = 0;
//                 }
			     
// 			     callModal(resObj.result, stat);

// 			}else{
			    
// 			    hideSpinner();
// 				// (document.getElementById('loadingicon')).style.visibility = 'hidden';
// 				// (document.getElementById('loadingicon')).style.display = 'none';
				
				
// 			    //document.getElementById('loader').style.display = 'none';
// 				//sf = '<b>Error getting data</b>';
// 			}

// 			e.stopPropagation();
// 		};

		
// 		request.setRequestHeader('Connection','close');
// 		request.send(getIntakeParams());

// 	};

//     if(document.getElementById('matintakebtnsubmit'))document.getElementById('matintakebtnsubmit').addEventListener('click',saveIntake,false);
   
// }

// var intake = document.getElementById('intake');
    
// if(intake) intake.addEventListener('click',openIntake,false);