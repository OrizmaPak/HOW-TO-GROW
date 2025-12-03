let updatebatchidout = ''

const populatesuplyto = (result) => {
  if (document.getElementById('matouttakereceivedfrom')) {
    document.getElementById('matouttakereceivedfrom').innerHTML += result.data.data.map(dat => `<option value="${dat.id}">${dat.state}</option>`).join('')
  }
  if (document.getElementById('matouttakereceivedto')) {
    document.getElementById('matouttakereceivedto').innerHTML += result.data.data.map(dat => `<option value="${dat.id}">${dat.state}</option>`).join('')
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
    <select disabled name="selectitemout" onchange="matouttakeselectitemout(this.id, this.value)" id="matouttakeselectitem_${i}" class="orejot">
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
  <div class="grid__item">
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


// async function openOuttake(){
// 'use strict';
// await httpRequest('outtake.php')

    
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


// 	function validateOuttake(){
// 		var flag = 1;
// 		var mssg='';
// 		//used for BVN instead
// 		var matOuttakeDate = document.getElementById('matouttakedate');
// 		var matOuttakeReferenceno = document.getElementById('matouttakereferenceno');
	   
	
// 		if(matOuttakeDate.value.length < 1){
// 			mssg += 'Date is Invalid <br />';			
// 			matOuttakeDate.style.borderColor = 'red';
// 			flag =0;
// 		}
// 	    else{
// 			matOuttakeDate.style.borderColor = 'lightgray';
// 		}
		
// 		if(matOuttakeReferenceno.value.length < 1){
// 			mssg += 'Reference number is Invalid <br />';			
// 			matOuttakeReferenceno.style.borderColor = 'red';
// 			flag =0;
// 		}
// 	    else{
// 			matOuttakeReferenceno.style.borderColor = 'lightgray';
// 		}
		
	
		
// 		if(flag == 0){
			
// 			var mbox = document.getElementById('messageBox');
// 			mbox.innerHTML = mssg;
// 			mbox.style.display = 'block';
// 			mbox.style.visibility = 'visible';

// 			setTimeout(function(){
// 				mbox.style.display = 'none';
// 				mbox.style.visibility = 'hidden';
			
// 				matOuttakeDate.style.borderColor = 'lightgray';
// 				matOuttakeReferenceno.style.borderColor = 'lightgray';

// 			}, 2000);	
// 			return false;
// 		}else{ 
// 			return true; 
// 		}

// 	}
	
// "use strict";
// const outtakeSelectItems = [
//   //   {
//   //     name: "",
//   //     qty: "",
//   //     cost: "",
//   //     type: "",
//   //     model: "",
//   //     stockBalance: "",
//   //     desc: "",
//   //   },
//   {
//     name: "bread",
//     qty: 2,
//     cost: 3000,
//     type: "consumable",
//     model: "2030",
//     stockBalance: 18,
//     desc: "hello you suck",
//     itemid:30001
//   },

//   {
//     name: "water melon",
//     qty: 4,
//     cost: 2000,
//     type: "consumable",
//     model: "2020",
//     stockBalance: 8,
//     desc: "hello you suck water melon",
//     itemid:30002
//   },

//   {
//     name: "Orange",
//     qty: 10,
//     cost: 20000,
//     type: "consumable",
//     model: "2020",
//     stockBalance: 12,
//     desc: "hello you suck water melon",
//     itemid:30003
//   },

//   {
//     name: "Pawpaw",
//     qty: 4,
//     cost: 2000,
//     type: "consumable",
//     model: "2020",
//     stockBalance: 8,
//     desc: "hello you suck water melon",
//     itemid:30004
//   },

//   {
//     name: "Apple",
//     qty: 4,
//     cost: 500,
//     type: "consumable",
//     model: "2020",
//     stockBalance: 8,
//     desc: "hello you suck water melon",
//     itemid:30005
//   },
// ];

// let outtakeArrayCost = [];
// let outtakeArrayQuantity = [];

// const outtakeUiMapState = new Map();
// let outtakeNumberOfSubsequentGrids = 0;
// let outtakeLastRemove = [];

// console.log(outtakeUiMapState);

// function outtakeGenerateNewGrid(flag) {
//   let gridRow = document.createElement("div");
//   gridRow.classList.add("gridrow");

//   let selectSpace = document.createElement("div");

//   //   if (flag === 0) {
//   let select = document.createElement("select");
//   let option = document.createElement("option");
//   option.value = "";
//   option.innerHTML = "Select Item";
//   option.selected = true;
//   option.disabled = true
//   select.append(option);
//   outtakeSelectItems.forEach((item, index) => {
//     let option = document.createElement("option");
//     option.value = index;
//     option.innerText = item.name;
//     select.append(option);
//   });
//   select.id = flag;
//   selectSpace.append(select);
//   select.addEventListener("change", populateRow);
//   //   }

//   let itemInfo = document.createElement("div");
//   itemInfo.classList.add("grid__item");
//   let itemInfoChild1 = document.createElement("p");
//   itemInfoChild1.innerHTML = `Type: <span id="outtaketype"></span>`;
//   let itemInfoChild2 = document.createElement("p");
//   itemInfoChild2.innerHTML = `Model: <span id="outtakemodel"></span>`;
//   let itemInfoChild3 = document.createElement("p");
//   itemInfoChild3.innerHTML = `Stock Balance: <span id="outtakestockbalance"></span>`;

//   itemInfo.append(itemInfoChild1);
//   itemInfo.append(itemInfoChild2);
//   itemInfo.append(itemInfoChild3);

//   let unitCost = document.createElement("div");
//   unitCost.classList.add("grid__item");
//   let unitCostChild = document.createElement("input");
//   unitCostChild.id = "outtakeunitcost";
//   unitCostChild.name = "outtakeunitcost";
//   unitCostChild.type = "number";
//   unitCostChild.addEventListener("input", calcValueByCost);
//   unitCost.append(unitCostChild);

//   let quantity = document.createElement("div");
//   quantity.classList.add("grid__item");
//   let quantityChild = document.createElement("input");
//   quantityChild.id = "outtakequantity";
//   quantityChild.name = "outtakequantity";
//   quantityChild.type = "number";
//   quantityChild.addEventListener("input", calcValueByQuantity);
//   quantity.append(quantityChild);

//   let value = document.createElement("div");
//   value.classList.add("grid__item");
//   let valueChild = document.createElement("input");
//   valueChild.disabled = true;
//   valueChild.id = "outtakevalue";
//   valueChild.name = "outtakevalue";
//   value.append(valueChild);

//   let description = document.createElement("div");
//   description.classList.add("grid__item");
//   let descriptionChild = document.createElement("input");
//   descriptionChild.disabled = true;
//   descriptionChild.id = "outtakedescription";
//   descriptionChild.name = "outtakedescription";
//   description.append(descriptionChild);

//   let itemname= document.createElement("input");
//   itemname.name = 'outtakeitemname';
//   itemname.id = 'outtakeitemname';
//   itemname.type = 'hidden';

//   let itemid= document.createElement("input");
//   itemid.name = 'outtakeitemid';
//   itemid.id = 'outtakeitemid'
//   itemid.type = 'hidden';
      



//   let rowBtns = document.createElement("div");
//   rowBtns.classList.add("grid__item");
//   let rowBtnPlus = document.createElement("button");
//   rowBtnPlus.innerHTML = `+ <span class='mattooltip'> Add new row </span>`;
//   rowBtnPlus.classList.add("outtakeplusbtn");

//   rowBtnPlus.addEventListener("click", outtakeHandlePlusEvent);

//   if (flag !== 0) {
//     let rowBtnMinus = document.createElement("button");
//     rowBtnMinus.innerHTML = `- <span class='mattooltip'> Remove row </span>`;
//     rowBtnMinus.classList.add("minusbtn");
//     rowBtnMinus.id = flag;
//     rowBtnMinus.addEventListener("click", outtakeHandleRemoveEvent);
//     rowBtns.append(rowBtnMinus);
//   }

//   rowBtns.append(rowBtnPlus);

//   gridRow.append(selectSpace);
//   gridRow.append(itemInfo);
//   gridRow.append(unitCost);
//   gridRow.append(quantity);
//   gridRow.append(value);
//   gridRow.append(description);
//   gridRow.append(itemname);
//   gridRow.append(itemid);
//   gridRow.append(rowBtns);
//   return gridRow;
// }
// ///  plus event listerner

// function outtakeHandlePlusEvent() {
//   // if LR is EMPTY contiue the original count
//   if (outtakeLastRemove.length < 1) {
//     outtakeNumberOfSubsequentGrids += 1;
//   }

//   // if LR is not empty, pick  first index of LR as the index for the next grid else use count
//   const index = outtakeLastRemove.length > 0 ? outtakeLastRemove.shift() : outtakeNumberOfSubsequentGrids;

//   console.log("len of las", outtakeLastRemove.length);

//   // create grid
//   const newGrid = outtakeGenerateNewGrid(index);

//   outtakeUiMapState.set(index, { ui: newGrid, data: "" });
//   outtakeAddGridToDocument();
// }

// /// minus event listener
// function outtakeHandleRemoveEvent(event) {
//   const target = Number(event.currentTarget.id);

//     outtakeLastRemove.push(target);
//   console.log("target for removal ", target);
//   outtakeUiMapState.delete(target);
//   outtakeGridContainer.removeChild(event.currentTarget.parentElement.parentElement);
//   outtakeAddGridToDocument();
// }

// let readyExisting = document.querySelector(".outtakegridrow");

// const outtakeGridContainer = document.createElement("div");
// outtakeGridContainer.className = "outtakeapp_grid";

// // readyExisting.insertAdjacentElement("afterend", gridRow);

// let arrOfUi = [];
// // add grid to ui --- edit to loop throw ui-grid states and pupulate ---
// function outtakeAddGridToDocument() {
//   console.log("last remove", outtakeLastRemove);
//   outtakeUiMapState.forEach((state) => {
//     outtakeGridContainer.append(state.ui);
//   });

//   readyExisting.insertAdjacentElement("afterend", outtakeGridContainer);
// //   readyExisting.innerHTML = ""

//   const allPlusBtn = Array.from(document.querySelectorAll(".outtakeplusbtn"));

//   console.log(allPlusBtn);
//   console.log('mattttttttttttttttttttttttt')
//   const btnToActive = allPlusBtn.pop();

//   allPlusBtn.forEach((btn) => (btn.disabled = true));

//   btnToActive.disabled = false;
// }
// // const trackSelected = []
// function populateRow(e) {
//   const isObj = outtakeSelectItems[e.target.value];
//   console.log(isObj);
//   // if(trackSelected.includes(e.target.value))return;
//   // trackSelected.push(e.target.value)
//   const uiId = Number(e.target.id);

// //   outtakeUiMapState.get(uiId).data = isObj;

//   console.log(outtakeUiMapState.get(uiId));

//   const { name, qty, cost, type, model, stockBalance, desc, itemid } = isObj;

//   const parent = e.target.parentElement.parentElement;

//   parent.querySelector("#outtaketype").innerHTML = type;
//   parent.querySelector("#outtakemodel").innerHTML = model;
//   parent.querySelector("#outtakestockbalance").innerHTML = stockBalance;
//   parent.querySelector("#outtakeunitcost").value = cost;
//   parent.querySelector("#outtakequantity").value = qty;
//   parent.querySelector("#outtakevalue").value = cost * qty;
//   parent.querySelector("#outtakedescription").value = desc;
//   parent.querySelector("#outtakeitemname").value = name;
//   parent.querySelector("#outtakeitemid").value = itemid;
  
// }

// function calcValueByCost(e) {
//   const parent = e.target.parentElement.parentElement;
//   console.log(parent);
//   const cost = e.target.value;
//   const qty = parent.querySelector("#outtakequantity").value;
//   parent.querySelector("#outtakevalue").value = cost * qty;
// }

// function calcValueByQuantity(e) {
//   const parent = e.target.parentElement.parentElement;
//   console.log(parent);
//   const cost = e.target.value;
//   const qty = parent.querySelector("#outtakeunitcost").value;
//   parent.querySelector("#outtakevalue").value = cost * qty;
// }

// document
//   .getElementById("matouttakebtnsubmit")
//   .addEventListener("click", function () {
//     console.log(outtakeUiMapState);
//     getDataFromObj();
//   });

// // function getDataFromObj() {
// //   for (let [key, objValue] of outtakeUiMapState) {
// //     const innerObj = objValue.data;
// //     if (innerObj) {
// //       let { cost, qty } = innerObj;
// //       console.log(cost);
// //       if (!cost) continue;
// //       outtakeArrayCost.push(cost);
// //       if (!qty) continue;
// //       outtakeArrayQuantity.push(qty);
// //     }

// //     console.log(outtakeArrayCost);
// //     console.log(outtakeArrayQuantity);
// //   }
// // }

//   const initialLoad = () => {
//   document
//     .getElementById("matouttakeselectitemout")
//     .addEventListener("change", function (e) {
//       console.log(document.getElementById("matouttakeselectitemout").value);
//       populateRow(e);
    
//     });

//   document.querySelector(".outtakeplusbtn").addEventListener("click", outtakeHandlePlusEvent);
//     };

//     let firstRowSelectitem = document.getElementById("matouttakeselectitemout");
//     function generateFirstSelect() {
//       const arrayOfSelectOption = outtakeSelectItems.map((item, index) => {
//         return `<option value=${index}>${item.name}</option>`;
//       });
//       const head = firstRowSelectitem.innerHTML;
//       firstRowSelectitem.innerHTML = head + arrayOfSelectOption.join("");
//     }
//     document.getElementById('outtakeunitcost').addEventListener('input',function(e){
//       calcValueByQuantity(e);
//     });
//     document.getElementById('outtakequantity').addEventListener('input',function(e){
//       calcValueByQuantity(e);
//     });
    
//     generateFirstSelect();
//     initialLoad();

    
	



// 	function getOuttakeParams(){
// 		var paramstr = new FormData();
	 		
// 		paramstr.append('reference', document.getElementById('matOuttakereferenceno').value);
// 		paramstr.append('transactiondate',document.getElementById('matOuttakedate').value);

		
// 		for (var pair of paramstr.entries()) {
//               console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
//             }
// 	   return paramstr;

// 	}

// var	saveOuttake = function(e){
// 	    showSpinner();
		
// 		if(!validateOuttake()){ 
// 		 hideSpinner();
// 			return; 
// 		}
		
// 		var request = getAjaxObject();
		
// 		request.open('POST','../controllers/level.php',true);
// 		request.onreadystatechange = function(){
// 			if(request.readyState == 1){

// 			}
// 			if(request.readyState == 4 && request.status == 200){
// 			    console.log('request.responseText', request.responseText);
// 			     let result = JSON.parse(request.responseText);
// 			     console.log('result', result);
			     
// 			     let stat = 2;
//                 if(result.result === "Successful"){
//                     stat = 1;
//                     for(let i=0; i<document.getElementsByTagName('input').length; i++){
//                         document.getElementsByTagName('input')[i].value = '';
//                     }
//                     for(let i=0; i<document.getElementsByTagName('select').length; i++){
//                         document.getElementsByTagName('select')[i].value = '';
//                     }
                    
//                 }else{
//                     stat = 0;
//                 }
			     
// 			     callModal(result.result, stat);

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
// 		request.send(getOuttakelParams());

// 	};

// if(document.getElementById('matouttakebtnsubmit'))document.getElementById('matouttakebtnsubmit').addEventListener('click',saveOuttake,false);
// }

var outtake= document.getElementById('outtake');
    
if(outtake) outtake.addEventListener('click',openOuttake,false);