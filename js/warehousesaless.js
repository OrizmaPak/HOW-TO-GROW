let whsalessupplierid = [];
let whsalessuppliername = [];
let whsalesupdatebatchidout = '';
let oreorginfo
let whsalesperson
let datafromviewwhsales

const whsalespopulatesuplyto = (result) => {
  if (document.getElementById('matwhsalesreceivedfrom')) {
    document.getElementById('matwhsalesreceivedfrom').innerHTML += result.data.data.map(dat => `<option value="${dat.id}">${dat.state}</option>`).join('')
  }
  if (document.getElementById('matwhsalesreceivedto')) {
    document.getElementById('matwhsalesreceivedto').innerHTML += result.data.data.map(dat => `<option value="${dat.id}">${dat.state}</option>`).join('')
  }
}

let whsalesitemsSelectout

const whsaleschecktoopen=()=>{
    if(validateInputsComponent(['matwhsalesreceivedto', 'matwhsalesreceivedfrom'])){
        document.getElementById('whsalessupplydata').classList.remove('hidden')
    }else{
        document.getElementById('whsalessupplydata').classList.add('hidden')
    }
}

const whsalesactionitemselectout = (result='', id='') => {
      if(result)whsalesitemsSelectout = result.data.data;
    if(!id){
            for(let i=0; i<document.getElementsByName('whsalesselectitemout').length; i++){
                if(document.getElementsByName('whsalesselectitemout')[i].disabled == true){
                    document.getElementsByName('whsalesselectitemout')[i].disabled = false;
                        document.getElementsByName('whsalesselectitemout')[i].innerHTML += whsalesitemsSelectout ? whsalesitemsSelectout.map(data=>{
                            if(document.getElementsByName('whsalesselectitemout')[i].id.split('_')[1] == data.itemid)return `<option selected value="${data.itemid}">${data.itemname}</option>`
                            if(document.getElementsByName('whsalesselectitemout')[i].id.split('_')[1] != data.itemid)return `<option value="${data.itemid}">${data.itemname}</option>`
                    }).join('') : ''
                    }
                    
                }
                return
    }else{
        return whsalesitemsSelectout.filter(data=>data.itemid == id).map(data=>data.itemname)
    }
};

const addwhsalesrowout = (id) => {
  let idd = id.split('_')[1];
  let i = new Date().getTime();
  const index = Array.from(document.getElementById(`rowContainerwhsales`).children).indexOf(document.getElementById(`whsalesgridrow_${idd}`));
  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'outtakegridrow whsalesouttakegridrow')
  divElement.setAttribute('id', `whsalesgridrow_${i}`)
  divElement.innerHTML = `<div class="grid__item">
  <input type="hidden" name="rowid" value="">
    <p class="hidden">Item</p>
    <select disabled name="whsalesselectitemout" onchange="matwhsalesselectitemout(this.id, this.value)" id="matwhsalesselectitem_${i}" class="orejot">
        <option value="" disabled selected >select item</option>
    </select>
  </div>
  <div class="grid__item">
    <p>Type: <span id="whsalestype_${i}"></span></p>
    <p>Model: <span id="whsalesmodel_${i}"></span></p>
    <p>Stock Balance: <span id="whsalesstockbalance_${i}"></span></p>
  </div>
  <div class="grid__item">
    <p class="hidden">Unit cost</p>
    <input type="number" onkeypress="whsalesitemalterout(this.id)" onchange="whsalesitemalterout(this.id)" id="whsalesunitcost_${i}" name="whsalesunitcost" class="orejot">
  </div>
  <div class="grid__item">
    <p class="hidden">Quantity</p>
    <input type="number" onkeypress="whsalesitemalterout(this.id)" onchange="whsalesitemalterout(this.id)" id="whsalesquantity_${i}" name="whsalesquantity" class="orejot">
  </div>
  <div class="grid__item">
    <p class="hidden">Value</p>
    <input type="text" readonly id="whsalesvalue_${i}" name="whsalesvalue" disabled value="" class="orejot">
  </div>
  <div class="grid__item">
    <button id="addnewrowbelow_${i}" onclick="addwhsalesrowout(this.id)" class="outtakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
    <button id="removenewrowbelow_${i}" onclick="whsalescheckoutcontainer();document.getElementById('whsalesgridrow_${i}').remove();" class="outtakeplusbtn"> - <span class="mattooltip"> Remove this row </span> </button>
  </div>`;

  const whsalesparentContainer = document.getElementById('rowContainerwhsales');
  const whsalesnextSibling = whsalesparentContainer.children[index + 1];

  whsalesparentContainer.insertBefore(divElement, whsalesnextSibling);

  whsalesactionitemselectout();

  // <div class="whsalesgridrow" id="whsalesgridrow_0">

  //             </div>
}

const whsalesgetnamefromidout = (value) => {
  let result = whsalesitemsSelectout.filter(data => data.itemid == value)[0]
  return result.itemname
}

const whsalescheckoutcontainer =()=>{
    console.log('container length', document.getElementById('rowContainerwhsales').children.length)
    if(document.getElementById('rowContainerwhsales').children.length == 1){document.getElementById('rowContainerwhsales').innerHTML = `
        <div class="outtakegridrow whsalesouttakegridrow" id="whsalesgridrow_0">
                    <input type="hidden" name="rowid" value="">
                    <div class="grid__item">
                    <p class="hidden">Item</p>
                        <select disabled name="whsalesselectitemout" onchange="matwhsalesselectitemout(this.id, this.value)" id="matwhsalesselectitem_0" class="orejot">
                            <option value="" disabled selected >select item</option>
                        </select>
                    </div>
                    <div class="grid__item">
                        <p>Type: <span id="whsalestype_0"></span></p>
                        <p>Model: <span id="whsalesmodel_0"></span></p>
                        <p>Stock Balance: <span id="whsalesstockbalance_0"></span></p>
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Unit cost</p>
                        <input type="number" onkeypress="whsalesitemalterout(this.id)" onchange="whsalesitemalterout(this.id)" id="whsalesunitcost_0" name="whsalesunitcost" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Quantity</p>
                        <input type="number" onkeypress="whsalesitemalterout(this.id)" onchange="whsalesitemalterout(this.id)" id="whsalesquantity_0" name="whsalesquantity" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Value</p>
                        <input type="text" readonly id="whsalesvalue_0" name="whsalesvalue" disabled value="" class="orejot">
                    </div>
                    <div class="grid__item">
                        <button id="addnewrowbelow_0" onclick="addwhsalesrowout(this.id)" class="outtakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
                    </div>
                </div>
    `
      whsalesactionitemselectout()   
    }
}



const whsalesitemalterout = (id, load) => {
  let idd = id.split('_')[1];
  document.getElementById(`whsalesvalue_${idd}`).value = document.getElementById(`whsalesunitcost_${idd}`).value * document.getElementById(`whsalesquantity_${idd}`).value
  if(!load){
      if ((Number(document.getElementById(`whsalesstockbalance_${idd}`).textContent) - document.getElementById(`whsalesquantity_${idd}`).value) < 0) {
        callModal(`the Item quanity requested is not available. Total available: ${document.getElementById(`whsalesstockbalance_${idd}`).textContent}`, 0);
        document.getElementById(`whsalesquantity_${idd}`).style.borderColor = 'red';
        document.getElementById(`whsalesquantity_${idd}`).style.outlineColor = 'red';
        document.getElementById(`whsalesquantity_${idd}`).style.color = 'red';
      } else {
        document.getElementById(`whsalesquantity_${idd}`).style.borderColor = 'gray';
        document.getElementById(`whsalesquantity_${idd}`).style.outlineColor = 'gray';
        document.getElementById(`whsalesquantity_${idd}`).style.color = 'gray';
      }
  }
  let i = 0
  let total = 0
      do{
        total = total + Number(document.getElementsByName('whsalesvalue')[i].value)
        i++;
      }while(i<document.getElementsByName('whsalesvalue').length)
      document.getElementById('whsalestotalamount').value = total;
      document.getElementById('whsalestotalamountpaid').value = total;
      document.getElementById('whsalestotalamountformat').innerHTML = formatCurrency(total);
      document.getElementById('whsalestotalamountpaidformat').value = formatCurrency(total);
}

const matwhsalesselectitemout = (id, valuee) => {
  let idd = id.split('_')[1];
  let value = valuee;
  let filter = whsalesitemsSelectout.filter(data => data.itemid == value)[0]
  document.getElementById(`whsalestype_${idd}`).innerHTML = filter ? filter.itemtype : '';
  document.getElementById(`whsalesmodel_${idd}`).innerHTML = filter ? filter.model : '';
  const itemparams = () => {
    var paramstr = new FormData();

    paramstr.append('itemid', value);
    paramstr.append('location', document.getElementById('matwhsalesreceivedfrom').value);

    return paramstr;
  }
  const stockbal = (result) => {
    document.getElementById(`whsalesstockbalance_${idd}`).innerHTML = filter ? result.balance : '';
  }
  callController('fetchitembalanceinlocation.php', itemparams(), 'fetchitembalanceinlocation', ['matwhsalesreceivedfrom'], stockbal, 'silent');
  document.getElementById(`whsalesunitcost_${idd}`).value = filter ? filter.cost : '';
  document.getElementById(`whsalesquantity_${idd}`).value = filter ? 0 : '';
  document.getElementById(`whsalesvalue_${idd}`).value = filter ? filter.cost : '';
  whsalesitemalterout(`whsalesquantity_${idd}`);
}


const getorejotoutwhsales = () => {
  let ids = []
  for (let i = 0; i < document.getElementsByClassName('orejot').length; i++) {
    ids.push(document.getElementsByClassName('orejot')[i].getAttribute('id'));
  }
  return ids
}

const whsalessubmitparamsout = (batchid) => {
  var paramstr = new FormData();

    if(batchid)paramstr.append('batchid', whsalesupdatebatchidout);
  paramstr.append('supplyto', getLabelFromValue(document.getElementById('matwhsalesreceivedto').value, 'supplierwhsalesdata2'));
  paramstr.append('location', document.getElementById('matwhsalesreceivedfrom').value);
  paramstr.append('transactiondate', document.getElementById('matwhsalesdate').value);
  paramstr.append('description', document.getElementById('matwhsalesdescription').value);
  paramstr.append('paymentmethod', document.getElementById('matwhsalespaymentmethod').value);
  paramstr.append('amountpaid', document.getElementById('whsalestotalamountpaid').value);
  paramstr.append('totalamount', document.getElementById('whsalestotalamount').value);
  paramstr.append('rowsize', document.getElementsByClassName('whsalesouttakegridrow').length);
  for (let i = 0; i < document.getElementsByClassName('whsalesouttakegridrow').length; i++) {
    paramstr.append(`id${i + 1}`, document.getElementsByName('rowid')[i].value);
    paramstr.append(`itemid${i + 1}`, document.getElementsByName('whsalesselectitemout')[i].value);
    paramstr.append(`itemname${i + 1}`, whsalesgetnamefromidout(document.getElementsByName('whsalesselectitemout')[i].value));
    paramstr.append(`qty${i + 1}`, document.getElementsByName('whsalesquantity')[i].value);
    paramstr.append(`cost${i + 1}`, document.getElementsByName('whsalesunitcost')[i].value);
  }

  return paramstr;
}

const whsalesrerunoutaketable = (state) => {
  let whsalesselectitemout = document.getElementsByName('whsalesselectitemout');
  for (i = 0; i < whsalesselectitemout.length; i++) {
    matwhsalesselectitemout(whsalesselectitemout[i].id, whsalesselectitemout[i].value)
  }
}
let whsalestheidout = '';
const whsalesdeleteid =(result)=>{
    console.log('result of deletion', result, whsalestheidout)
    if(result.result == 'Successful: '){
        whsalestheidout.remove();
    }else{
        callModal('something went wrong', 0)
    }
}

const whsalesdeletebyid =(id)=>{
    const idparams =()=>{
        var paramstr = new FormData();
		paramstr.append('id', id);
	   return paramstr;
    }
    callController('removewhsalesbyid.php', idparams(), 'removewhsalesbyid', null, whsalesdeleteid)
}

const whsalesaleert =(id, cont)=>{
    whsalestheidout = cont;
        callModal('',0,10);
    setTimeout(()=>{
        callModal(`<h2>Warning<h2>
        <br/>
        <p>This item was saved and is about to be removed.</p>
        <button onclick="callModal('',0,10)" type="button" style="border-radius: 5px;margin-right: 20px;padding: 9px;cursor: pointer;width: 57px;margin-top: 10px;margin-left: auto;border-width: 0px;color: white;background: #6EB4FFFF;">cancel</button>
        <button onclick="callModal('',0,10);whsalesdeletebyid('${id}')" type="button" style="border-radius: 5px;padding: 9px;cursor: pointer;width: 57px;margin-top: 10px;margin-left: auto;border-width: 0px;color: white;background: #ED404CFF;">delete</button>`
        , 2, 30000)
    },500)
}

const loadwhsalesdatafromsessiondata =async(result)=>{
    console.log('datafromviewwhsales', datafromviewwhsales)
    let data = datafromviewwhsales.filter(data=>data.batchid == result.toString())
    console.log(data)
    if(!data)return;
    document.getElementById('matwhsalesreceivedto').value = data[0].data[0].itemname
    document.getElementById('matwhsalesreceivedfrom').value = data[0].data[0].location;
    whsalesrerunoutaketable(document.getElementById('matwhsalesreceivedfrom'))
    document.getElementById('matwhsalesdescription').value = data[0].data[0].description;
    document.getElementById('matwhsalesdate').value = data[0].data[0].transactiondate.split(' ')[0];
    document.getElementById('matwhsalesreferenceno').value = data[0].data[0].reference;
    document.getElementById('matwhsalespaymentmethod').value = data[0].data[0].paymentmethod;
    document.getElementById('rowContainerwhsales').innerHTML = result.items.map((data, index)=>{
                        
        return `
            <div class="outtakegridrow whsalesouttakegridrow" id="whsalesgridrow_${index}">
                    <input type="hidden" name="rowid" value="${data.id}">
                    <div class="grid__item">
                    <p class="hidden">Item</p>
                        <select disabled name="whsalesselectitemout" onchange="matwhsalesselectitemout(this.id, this.value)" id="matwhsalesselectitem_${data.itemid}" class="orejot">
                            <option value="" disabled >select item</option>
                        </select>'
                    </div>
                    <div class="grid__item">
                        <p>Type: <span id="whsalestype_${data.itemid}">${whsalesitemsSelectout.filter(dat=>dat.itemid == data.itemid)[0].itemtype}</span></p>
                        <p>Model: <span id="whsalesmodel_${data.itemid}">${whsalesitemsSelectout.filter(dat=>dat.itemid == data.itemid)[0].model}</span></p>
                        <p>Stock Balance: <span id="whsalesstockbalance_${data.itemid}" ></span></p>
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Unit cost</p>
                        <input type="number" value="${whsalesitemsSelectout.filter(dat=>dat.itemid == data.itemid)[0].cost}" onkeypress="whsalesitemalterout(this.id)" onchange="whsalesitemalterout(this.id)" id="whsalesunitcost_${data.itemid}" name="whsalesunitcost" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Quantity</p>
                        <input type="number" value="${data.qty}" onkeypress="whsalesitemalterout(this.id)" onchange="whsalesitemalterout(this.id)" id="whsalesquantity_${data.itemid}" name="whsalesquantity" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Value</p>
                        <input type="text" readonly id="whsalesvalue_${data.itemid}" name="whsalesvalue" disabled value="" class="orejot">
                    </div>
                    <div class="grid__item">
                        <button id="addnewrowbelow_${index}" onclick="addwhsalesrowout(this.id)" class="outtakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
                        <button id="removenewrowbelow_${index}" style="background: #FF4F38FF;border-width: 0px;color: white" onclick="whsalescheckoutcontainer();whsalesaleert(${data.id}, whsalesgridrow_${index});" class="outtakeplusbtn"> X <span class="mattooltip"> Remove this row </span> </button>
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
                                paramstr.append('location', document.getElementById('matwhsalesreceivedfrom').value);
                        
                        		
                        	   return paramstr;
                            }
                            let stockball=(resultt)=>{
                                console.log(`whsalesstockbalance_${result.items[i].itemid}`, resultt.balance)
                                document.getElementById(`whsalesstockbalance_${result.items[i].itemid}`).innerHTML = resultt.balance;
                            }
                            callController('fetchitembalanceinlocation.php', itemparamss(), 'fetchitembalanceinlocation', ['matwhsalesreceivedfrom'], stockball, 'silent');
                            whsalesitemalterout(`sdfdjhfdsfk_${result.items[i].itemid}`, 'load')

    }
    
    whsalesactionitemselectout()
        
    },2000)
    
    

}

const generatwhsalesreceipt =(result)=>{
    document.getElementById('matwhsalesbtnsubmit').textContent = "Print Receipt"
    let ddiv = document.createElement('div')
    let html = `
         <h1>Invoice</h1> 
         <div class="receipt" style="padding: 40px">
                    <div class="reciept-header">
                        <div>
                            <span>
                                <img id="" src="${assetsUrl.logo}" alt="" style="width: 50px;height: auto">
                            </span>
                            <span>
                                <h1>${oreorginfo.companyname}</h1>
                                <span> ${oreorginfo.address} </span>
                            </span>
                        </div>
                        <div>
                            <span> Invoice#: <span>REF|${result ? result.reference : ''} </span></span>
                            issue date: ${new Date().toLocaleDateString()}
                        </div>
                    </div>
                    <div class="billing">
                        <div>
                            <h3> Bill to:</h3>
                            <ul>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Sales Person:</p> <p>${String(whsalesperson).toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Supply To:</p> <p>${String(document.getElementById('matwhsalesreceivedto').value).toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Supply From:</p> <p>${getLocationById(document.getElementById('matwhsalesreceivedfrom').value).toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Payment Method:</p> <p>${document.getElementById('matwhsalespaymentmethod').value.toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Description:</p> <p>${document.getElementById('matwhsalesdescription').value.toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Reference Number:</p> <p>${result ? result.reference : ''}</p> </li>
                            </ul>
                        </div>
                        <div>
                            <h3> Payment: </h3>
                            <ul>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Date:</p> <span>${new Date().toLocaleDateString()}</span></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Total quantity:</p> <p> ${document.getElementById('rowContainerwhsales').children.length} Item(s)</p></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Total cost:</p> <p>${naira}${document.getElementById('whsalestotalamountpaidformat').value}</p></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>VAT:</p> <p>${naira} 0.00</p></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Total paid:</p> <p>${naira}${document.getElementById('whsalestotalamountpaidformat').value}</p></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Remaining Balance:</p> <p>${naira}00.00</p></li>
                            </ul>
                        </div>
                    </div>
                    <div class="items">
                        <table>
                            <thead>
                                <tr style="background: #c9c6c6;">
                                    <th>ITEM</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${(() => {
                                        let rowsHtml = '';
                                        for (let i = 0; i < document.getElementById('rowContainerwhsales').children.length; i++) {
                                            rowsHtml += `
                                                <tr>
                                                    <td>${whsalesactionitemselectout('', document.getElementsByName('whsalesselectitemout')[i].value)}</td>
                                                    <td>${naira} ${formatCurrency(document.getElementsByName('whsalesunitcost')[i].value)}</td>
                                                    <td>${formatCurrency(document.getElementsByName('whsalesquantity')[i].value)}</td>
                                                    <td>${naira} ${formatCurrency(document.getElementsByName('whsalesvalue')[i].value)}</td>
                                                </tr>`;
                                        }
                                        return rowsHtml;
                                    })()}
                                    <tr style="background: #c9c6c6;">
                                        <td>SUBTOTAL<br>VAT</td>
                                        <td></td>
                                        <td></td>
                                        <td>${document.getElementById('whsalestotalamountpaidformat').value}<br>${naira} 0.00</td>
                                    </tr>
                                    <tr style="background: #c9c6c6;">
                                        <td>TOTAL AMOUNT:</td>
                                        <td></td>
                                        <td>${document.getElementById('rowContainerwhsales').children.length}</td>
                                        <td>${document.getElementById('whsalestotalamountpaidformat').value}</td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="notice">
                        <div>
                            <div>We appreciate you doing business with us <br>
                                <span>THANK YOU</span>
                            </div>
                            <div>Sender: Signature & Date&nbsp;&nbsp;&nbsp;</div>
                            <div>Receiver: Signature & Date:&nbsp;&nbsp;&nbsp;</div>
                        </div>
                    </div>
                    
                </div>
    `
    ddiv.innerHTML = html
    if(document.getElementById('whsalesinvoicecontainer'))document.getElementById('whsalesinvoicecontainer').append(ddiv)
}


async function openwhsales() {
  await httpRequest('warehousesaless.php', 'override');
  async function orefetchViewDeliveryOrganizationInfo() {
        let result = await fetchRequest('../controllers/fetchorganisationscript.php');
        if(result) {
            let parseResult  =  JSON.parse(result);
            if(parseResult.status){
                oreorginfo = parseResult.data.data[0]
                //  generatwhsalesreceipt()
                // document.getElementById('whsaleslogo').src = assetsUrl.logo
            }
        }
    }
    orefetchViewDeliveryOrganizationInfo();
     callController('fetchallaccountsprofile.php',null, 'fetchallaccountsprofile', null);
     const getthenameoftheuserwhsales=(result)=>{
         whsalesperson = `${result.lastname} ${result.firstname}`
     }
      function userpprams(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', userpprams(), 'fetchuserprofile', null, getthenameoftheuserwhsales);
  
   const populatesupplier =(result)=>{
        if(document.getElementById('supplierwhsalesdata'))document.getElementById('supplierwhsalesdata').innerHTML = result.data.data.map(dat=>{
            return(`<option>${dat.companyname}</option>`)
        }).join('');
        if(document.getElementById('supplierwhsalesdata2'))document.getElementById('supplierwhsalesdata2').innerHTML = result.data.data.map(dat=>{
            return(`<option value="${dat.companyname}">${dat.id}</option>`)
        }).join('');
        return
    }
    
    
    await callController('fetchsupplierscript.php', null, 'fetchsupplierscript', null, populatesupplier, 'silent');
  
  whsalesupdatebatchidout = '';
  
  const rerunout=(result)=>{
      if(document.getElementById('matwhsalesbtnsubmit').textContent == 'Update'){document.getElementById('whsaleshistory').click()}else{
          document.getElementById('whsales').click();
      document.getElementById('rowContainerwhsales').innerHTML =`<div class="outtakegridrow whsalesouttakegridrow" id="whsalesgridrow_0">
                    <input type="hidden" name="rowid" value="">
                    <div class="grid__item">
                    <p class="hidden">Item</p>
                        <select disabled name="whsalesselectitemout" onchange="matwhsalesselectitemout(this.id, this.value)" id="matwhsalesselectitem_0" class="orejot">
                            <option value="" disabled selected >select item</option>
                        </select>
                    </div>
                    <div class="grid__item">
                        <p>Type: <span id="whsalestype_0"></span></p>
                        <p>Model: <span id="whsalesmodel_0"></span></p>
                        <p>Stock Balance: <span id="whsalesstockbalance_0"></span></p>
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Unit cost</p>
                        <input type="number" onkeypress="whsalesitemalterout(this.id)" onchange="whsalesitemalterout(this.id)" id="whsalesunitcost_0" name="whsalesunitcost" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Quantity</p>
                        <input type="number" onkeypress="whsalesitemalterout(this.id)" onchange="whsalesitemalterout(this.id)" id="whsalesquantity_0" name="whsalesquantity" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Value</p>
                        <input type="text" readonly id="whsalesvalue_0" name="whsalesvalue" disabled value="" class="orejot">
                    </div>
                    <div class="grid__item">
                        <button id="addnewrowbelow_0" onclick="addwhsalesrowout(this.id)" class="outtakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
                    </div>
                </div>`
          
      }
    
  }
  // const callController =(controller, params, name, validate, funct, silent, e)=>{ 
  if(document.getElementById('matwhsalesbtnsubmit'))document.getElementById('matwhsalesbtnsubmit').addEventListener('click', e => {
      if(document.getElementById('matwhsalesbtnsubmit').textContent == "Submit"){
            let status = false
            for (let i = 0; i < document.getElementsByName('whsalesquantity').length; i++) {
              if (document.getElementsByName('whsalesquantity')[i].style.borderColor == 'red' || document.getElementsByName('whsalesquantity')[i].value == 0) {
                callModal('Quantity request is more than stock balance or quantity is zero', 0);
                status = true
              }
            }
            if(document.getElementById('matwhsalesbtnsubmit').textContent == 'Update'){
                if(!status)callController('warehousesalescript.php', whsalessubmitparamsout(whsalesupdatebatchidout), 'warehousesalescript', getorejotoutwhsales)
            }else{
                if(!status)callController('warehousesalescript.php', whsalessubmitparamsout(), 'warehousesalescript', getorejotoutwhsales(), generatwhsalesreceipt )
            }
      }else if(document.getElementById('matwhsalesbtnsubmit').textContent == "Print Receipt"){
        printContent('INVOICE',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'whsalesinvoicecontainer')
      }
  })

  callController('fetchlocation.php', null, 'fetchlocation', null, whsalespopulatesuplyto, 'silent');
  callController('fetchinventoryitemscript.php', null, 'fetchinventoryitemscript', null, whsalesactionitemselectout, 'silent');
  
  const editviewwhsalesdata = sessionStorage.getItem('editviewwhsalesdata');
  setTimeout(()=>{if(editviewwhsalesdata){
        document.getElementById('matwhsalesbtnsubmit').textContent = 'Update';
        // whsalesupdatebatchidout = JSON.parse(editviewwhsalesdata)
        console.log('whsalesupdatebatchidout111111111', whsalesupdatebatchidout)
        // loadwhsalesdatafromsessiondata(editviewwhsalesdata);
        sessionStorage.removeItem('editviewwhsalesdata');
    }},2000)
    
}


var whsales= document.getElementById('warehousesaless');
    
if(whsales) whsales.addEventListener('click',openwhsales,false);