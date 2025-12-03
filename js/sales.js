let whsalessupplierid = [];
let whsalessuppliername = [];
let whsalesupdatebatchidout = '';
let oreorginfo
let whsalesperson
let datafromviewwhsales
let salesresult
let salesview = false 

const whsalespopulatesuplyto = (result) => {
  if (document.getElementById('matwhsalesreceivedfrom')) {
    document.getElementById('matwhsalesreceivedfrom').innerHTML = result.data.data.map(dat => `<option value="${dat.id}">${dat.location}</option>`).join('')
  }
  if (document.getElementById('matwhsalesreceivedto')) {
    document.getElementById('matwhsalesreceivedto').innerHTML += result.data.data.map(dat => `<option value="${dat.id}">${dat.location}</option>`).join('')
  }
  const checkviewwhsalesuserstatusweere =(result)=>{
        console.log(document.getElementById('matwhsalesreceivedfrom'))
        if(document.getElementById('matwhsalesreceivedfrom'))document.getElementById('matwhsalesreceivedfrom').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('matwhsalesreceivedfrom'))document.getElementById('matwhsalesreceivedfrom').setAttribute('readonly', false);
    }else{
        if(document.getElementById('matwhsalesreceivedfrom'))document.getElementById('matwhsalesreceivedfrom').setAttribute('readonly', true)
    }
}
  function getpermissionsParamsviewwhsales(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr; 
    };
    callController('fetchuserprofile.php', getpermissionsParamsviewwhsales(), 'fetchuserprofile', null, checkviewwhsalesuserstatusweere);
  if(document.getElementById('sessionrole').value != 'SUPERADMIN')document.getElementById('matwhsalesreceivedfrom').setAttribute('disabled', true)
  if(document.getElementById('sessionrole').value == 'SUPERADMIN')document.getElementById('matwhsalesreceivedfrom').setAttribute('disabled', false)
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
  divElement.innerHTML = `<div class="grid__item"  style="width: 350px">
  <input type="hidden" name="rowid" value="">
    <p class="hidden">Item</p>
    <select disabled name="whsalesselectitemout" onchange="matwhsalesselectitemout(this.id, this.value)" id="matwhsalesselectitem_${i}" class="orejot" style="width: 350px">
        <option value="" disabled selected >select item</option>
    </select>
  </div>
  <div class="grid__item" style="width:150px">
    <p>Type: <span id="whsalestype_${i}"></span></p>
    <p>Model: <span id="whsalesmodel_${i}"></span></p>
    <p>Stock Balance: <span id="whsalesstockbalance_${i}"></span></p>
  </div>
  <div class="grid__item">
    <p class="hidden">Unit cost</p>
    <input type="number" style="width: 64px;" onkeypress="whsalesitemalterout(this.id)" onchange="whsalesitemalterout(this.id)" id="whsalesunitcost_${i}" name="whsalesunitcost" class="orejot">
  </div>
  <div class="grid__item">
    <p class="hidden">Quantity</p>
    <input type="number" style="width: 64px;" onkeypress="whsalesitemalterout(this.id)" onchange="whsalesitemalterout(this.id)" id="whsalesquantity_${i}" name="whsalesquantity" class="orejot">
  </div>
  <div class="grid__item">
    <p class="hidden">Value</p>
    <input type="text" style="width: 64px;" readonly id="whsalesvalue_${i}" name="whsalesvalue" disabled value="" class="orejot">
  </div>
  <div class="grid__item" style="display: flex;gap:10px">
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
                    <div class="grid__item"style="350px">
                    <p class="hidden">Item</p>
                        <select disabled name="whsalesselectitemout" onchange="matwhsalesselectitemout(this.id, this.value)" id="matwhsalesselectitem_0" class="orejot">
                            <option value="" disabled selected >select item</option>
                        </select>
                    </div>
                    <div class="grid__item" style="width:150px">
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
  document.getElementById(`whsalesunitcost_${idd}`).value = filter ? filter.cashsellingprice : '';
  document.getElementById(`whsalesquantity_${idd}`).value = filter ? 0 : '';
  document.getElementById(`whsalesvalue_${idd}`).value = filter ? filter.cashsellingprice : '';
  whsalesitemalterout(`whsalesquantity_${idd}`);
}


const getorejotoutwhsales = () => {
  let ids = []
  for (let i = 0; i < document.getElementsByClassName('orejot').length; i++) {
    ids.push(document.getElementsByClassName('orejot')[i].getAttribute('id'));
  }
  return ids
}

  /*paramstr.append('supplyto', getLabelFromValue(document.getElementById('matwhsalesreceivedto').value, 'supplierwhsalesdata2'));*/
const whsalessubmitparamsout = (batchid) => {
  var paramstr = new FormData();

    if(batchid)paramstr.append('batchid', whsalesupdatebatchidout);
//   paramstr.append('supplyto', document.getElementById('matwhsalesreceivedto').value);
  paramstr.append('supplyto', getLabelFromValue(document.getElementById('matwhsalesreceivedto').value, 'supplierwhsalesdata2')?getLabelFromValue(document.getElementById('matwhsalesreceivedto').value, 'supplierwhsalesdata2'):document.getElementById('matwhsalesreceivedto').value);
  paramstr.append('location', document.getElementById('matwhsalesreceivedfrom').value);
  paramstr.append('transactiondate', document.getElementById('matwhsalesdate').value);
  paramstr.append('description', document.getElementById('matwhsalesdescription').value);
  paramstr.append('otherdetail', document.getElementById('matwhsalesotherdetail').value);
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
                    <div class="grid__item" style="350px">
                    <p class="hidden">Item</p>
                        <select disabled name="whsalesselectitemout" onchange="matwhsalesselectitemout(this.id, this.value)" id="matwhsalesselectitem_${data.itemid}" class="orejot">
                            <option value="" disabled >select item</option>
                        </select>'
                    </div>
                    <div class="grid__item" style="width:150px">
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

const generatwhsalesreceipt2 = (result, state = "PRINT") => {
    salesresult = result;
    if (!result) result = salesresult;
    
    // Update button text and show download button
    document.getElementById('matwhsalesbtnsubmit').textContent = "Print Receipt";
    document.getElementById('matwhsalesbtndownload').classList.remove('hidden');
     generatwhsalesreceipt(salesresult, 'DOWNLOAD')
}

// updated 16th JUNE 2025
// Modified receipt generator with A4-specific styling
function generatwhsalesreceipt(result, state = "PRINT") {
  try {
    result = result || salesresult;

    // Fallback values
    const companyName = oreorginfo?.companyname || 'Default Company Name';
    const companyAddress = oreorginfo?.address || 'Default Address';
    const companyMobile = oreorginfo?.mobile || '';
    const companyTelephone = oreorginfo?.telephone || '';

    // Create receipt container with A4 dimensions
    let ddiv = document.createElement('div');
    ddiv.className = 'a4-receipt';
    
    // Generate item rows
    const itemRowsHtml = Array.from(document.getElementById('rowContainerwhsales').children)
      .map((_, i) => `
        <tr class="item-row">
          <td>${whsalesactionitemselectout('', document.getElementsByName('whsalesselectitemout')[i].value)}</td>
          <td class="text-right">${naira} ${formatCurrency(document.getElementsByName('whsalesunitcost')[i].value)}</td>
          <td class="text-center">${formatCurrency(document.getElementsByName('whsalesquantity')[i].value)}</td>
          <td class="text-right">${naira} ${formatCurrency(document.getElementsByName('whsalesvalue')[i].value)}</td>
        </tr>`
      ).join('');

    const html = `
    <div class="a4-container">
      <div class="receipt-header">
        <div class="company-brand">
          <img src="${assetsUrl.logo}" alt="Company Logo" class="company-logo">
          <div class="company-info">
            <h1 class="company-name">${companyName}</h1>
            <div class="company-address">${companyAddress}</div>
            <div class="company-contact">
              ${companyMobile ? `<span>${companyMobile}</span>` : ''}
              ${companyTelephone ? `<span>${companyTelephone}</span>` : ''}
            </div>
          </div>
        </div>
        
        <div class="invoice-meta">
          <div class="invoice-id">
            <span class="meta-label">INVOICE #:</span>
            <span class="meta-value">REF|${result?.reference || 'N/A'}</span>
          </div>
          <div class="invoice-date">
            <span class="meta-label">DATE:</span>
            <span class="meta-value">${new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div class="billing-details">
        <div class="billing-section">
          <h3 class="section-title">TRANSACTION DETAILS</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Supply To:</span>
              <span class="detail-value">${String(document.getElementById('matwhsalesreceivedto').value).toUpperCase()}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Supply From:</span>
              <span class="detail-value">${getLocationById(document.getElementById('matwhsalesreceivedfrom').value).toUpperCase()}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Payment Method:</span>
              <span class="detail-value">${document.getElementById('matwhsalespaymentmethod').value.toUpperCase()}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Sales Person:</span>
              <span class="detail-value">${String(whsalesperson).toUpperCase()}</span>
            </div>
            <div class="detail-item full-width">
              <span class="detail-label">Description:</span>
              <span class="detail-value">${document.getElementById('matwhsalesdescription').value.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="items-section">
        <table class="items-table">
          <thead>
            <tr>
              <th class="text-left">ITEM</th>
              <th class="text-right">PRICE</th>
              <th class="text-center">QTY</th>
              <th class="text-right">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            ${itemRowsHtml}
          </tbody>
          <tfoot>
            <tr class="summary-row">
              <td colspan="3" class="text-right">SUBTOTAL</td>
              <td class="text-right">${naira}${document.getElementById('whsalestotalamountpaidformat').value}</td>
            </tr>
            <tr class="summary-row">
              <td colspan="3" class="text-right">VAT</td>
              <td class="text-right">${naira}0.00</td>
            </tr>
            <tr class="total-row">
              <td colspan="3" class="text-right">TOTAL AMOUNT</td>
              <td class="text-right">${naira}${document.getElementById('whsalestotalamountpaidformat').value}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="signature-section">
        <div class="signature-block">
          <div class="signature-line"></div>
          <div class="signature-label">Sender: Signature & Date</div>
        </div>
        <div class="signature-block receiver">
          <div class="signature-line"></div>
          <div class="signature-label">Receiver: Signature & Date</div>
        </div>
      </div>
      
      <div class="footer-note">
        <p>We appreciate you doing business with us.</p>
        <p class="print-date">Generated: ${new Date().toLocaleString()}</p>
      </div>
    </div>

    <style>
      /* A4 Paper Dimensions - Compact version */
      .a4-receipt {
        width: 210mm;
        min-height: 297mm;
        margin: 0 auto;
        background: white;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
      }
      
      .a4-container {
        padding: 8mm 15mm 5mm; /* Reduced top/bottom padding */
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      
      /* Compact Header Styles */
      .receipt-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5mm; /* Reduced margin */
        padding-bottom: 3mm; /* Reduced padding */
        border-bottom: 1px solid #3498db;
      }
      
      .company-brand {
        display: flex;
        gap: 3mm; /* Reduced gap */
        width: 70%;
      }
      
      .company-logo {
        width: 20mm; /* Smaller logo */
        height: 20mm;
        object-fit: contain;
      }
      
      .company-info {
        flex: 1;
      }
      
      .company-name {
        margin: 0;
        font-size: 5mm; /* Smaller font */
        color: #2c3e50;
        line-height: 1.2;
      }
      
      .company-address {
        font-size: 3mm; /* Smaller font */
        color: #666;
        margin: 0.5mm 0;
        line-height: 1.3;
      }
      
      .company-contact {
        font-size: 3mm; /* Smaller font */
        color: #666;
        line-height: 1.3;
      }
      
      .invoice-meta {
        width: 30%;
        text-align: right;
        font-size: 3mm; /* Smaller font */
      }
      
      .invoice-id, .invoice-date {
        margin-bottom: 1mm; /* Reduced margin */
      }
      
      .meta-label {
        font-weight: 600;
        color: #2c3e50;
      }
      
      .meta-value {
        color: #3498db;
      }
      
      /* Compact Billing Details */
      .billing-details {
        margin: 3mm 0; /* Reduced margin */
        padding: 2mm; /* Reduced padding */
        background: #f8f9fa;
        border-radius: 1mm;
        font-size: 3mm; /* Smaller font */
      }
      
      .section-title {
        margin-top: 0;
        margin-bottom: 2mm; /* Reduced margin */
        color: #2c3e50;
        font-size: 3.5mm; /* Smaller font */
        border-bottom: 0.3mm solid #eee; /* Thinner border */
        padding-bottom: 1mm; /* Reduced padding */
      }
      
      .detail-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1mm; /* Reduced gap */
      }
      
      .detail-item {
        display: flex;
        justify-content: space-between;
        page-break-inside: avoid;
        margin-bottom: 0.5mm; /* Reduced margin */
      }
      
      .detail-item.full-width {
        grid-column: 1 / span 2;
      }
      
      .detail-label {
        font-weight: 600;
        color: #666;
      }
      
      .detail-value {
        color: #2c3e50;
        text-align: right;
        max-width: 60%;
        word-break: break-word;
      }
      
      /* Compact Table Styles */
      .items-table {
        width: 100%;
        border-collapse: collapse;
        margin: 3mm 0; /* Reduced margin */
        font-size: 3mm; /* Smaller font */
        page-break-inside: avoid;
      }
      
      .items-table th {
        background: #3498db;
        color: white;
        padding: 1mm 1.5mm; /* Reduced padding */
        text-align: left;
        font-weight: 600;
        font-size: 3mm; /* Smaller font */
      }
      
      .items-table td {
        padding: 1mm 1.5mm; /* Reduced padding */
        border-bottom: 0.1mm solid #eee; /* Thinner border */
        font-size: 2.8mm; /* Smaller font */
      }
      
      .items-table tfoot td {
        border-bottom: none;
        font-weight: 600;
      }
      
      .text-left { text-align: left; }
      .text-center { text-align: center; }
      .text-right { text-align: right; }
      
      .summary-row {
        background-color: #f8f9fa;
      }
      
      .total-row {
        background-color: #e3f2fd;
        font-size: 3.2mm; /* Smaller font */
        border-top: 0.3mm solid #3498db; /* Thinner border */
      }
      
      /* Compact Signature Section */
      .signature-section {
        display: flex;
        justify-content: space-between;
        margin-top: 8mm; /* Reduced margin */
        padding-top: 3mm; /* Reduced padding */
        border-top: 0.3mm dashed #ccc; /* Thinner border */
        font-size: 3mm; /* Smaller font */
        page-break-inside: avoid;
      }
      
      .signature-block {
        width: 45%;
      }
      
      .signature-line {
        height: 0.5mm; /* Reduced height */
        border-bottom: 0.3mm solid #7f8c8d; /* Thinner border */
        margin-bottom: 2mm; /* Reduced margin */
      }
      
      .signature-label {
        color: #666;
        text-align: center;
        font-size: 2.8mm; /* Smaller font */
      }
      
      /* Compact Footer */
      .footer-note {
        text-align: center;
        margin-top: 5mm; /* Reduced margin */
        padding-top: 3mm; /* Reduced padding */
        border-top: 0.3mm solid #eee; /* Thinner border */
        font-style: italic;
        color: #666;
        font-size: 3mm; /* Smaller font */
      }
      
      .print-date {
        font-size: 2.8mm; /* Smaller font */
        margin-top: 1mm; /* Reduced margin */
      }
      
      /* Print-specific styles */
      @media print {
        body, html {
          margin: 0 !important;
          padding: 0 !important;
          size: A4 portrait;
        }
        
        .a4-receipt {
          width: 210mm !important;
          min-height: 297mm !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none;
        }
        
        .a4-container {
          padding: 8mm 15mm 5mm !important;
        }
        
        /* Ensure no page breaks inside critical elements */
        .receipt-header, 
        .billing-details, 
        .items-table, 
        .signature-section {
          page-break-inside: avoid;
        }
        
        /* Prevent page breaks after header */
        .receipt-header {
          page-break-after: avoid;
        }
        
        /* Shrink content if needed */
        .a4-container {
          transform-origin: top left;
        }
      }
    </style>
    `;

    ddiv.innerHTML = html;
    const invoiceContainer = document.getElementById('whsalesinvoicecontainer');
    
    if (invoiceContainer) {
      invoiceContainer.innerHTML = '';
      invoiceContainer.appendChild(ddiv);
    } else {
      throw new Error('Invoice container not found');
    }

    if (state === "PRINT") {
      const printContent = ddiv.outerHTML;
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Sales Receipt</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              background: white;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              width: 210mm;
              height: 297mm;
            }
            @page {
              size: A4 portrait;
              margin: 0;
            }
          </style>
        </head>
        <body>${printContent}</body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        // Adjust scale if content is too tall
        const contentHeight = printWindow.document.body.scrollHeight;
        const a4Height = 1122; // 297mm in pixels (at 96dpi)
        
        if (contentHeight > a4Height) {
          const scale = a4Height / contentHeight * 0.95;
          printWindow.document.querySelector('.a4-container').style.transform = `scale(${scale})`;
        }
        
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 500);
    } else if (state === "DOWNLOAD") {
      html2pdf()
        .set({
          margin: 0,
          filename: `sales_receipt_${result?.reference || Date.now()}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 3, 
            useCORS: true,
            letterRendering: true,
            dpi: 300,
            logging: false
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
          }
        })
        .from(ddiv)
        .save();
    }
  } catch (error) {
    console.error('Error generating receipt:', error);
    alert('There was an error generating the receipt: ' + error.message);
  }
};


async function openwhsales() {
  await httpRequest('warehousesaless.php', 'override');
  async function orefetchViewDeliveryOrganizationInfo() {
        let result = await fetchRequest('../controllers/fetchorganisationscript.php');
        if(result) {
            let parseResult  =  JSON.parse(result);
            if(parseResult.status){
                oreorginfo = parseResult.data.data[0]
                //  generatwhsalesreceipt(salesresult, 'DOWNLOAD')
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
       console.log(document.getElementById('supplierwhsalesdata'))
        if(document.getElementById('supplierwhsalesdata'))document.getElementById('supplierwhsalesdata').innerHTML = result.data.data.map(dat=>{
            return(`<option>${dat.companyname}</option>`)
        }).join('');
       console.log(document.getElementById('supplierwhsalesdata'))
        if(document.getElementById('supplierwhsalesdata2'))document.getElementById('supplierwhsalesdata2').innerHTML = result.data.data.map(dat=>{
            return(`<option value="${dat.companyname}">${dat.id}</option>`)
        }).join('');
        return
    }
    
    
    await callController('fetchcustomersforwarehousesales.php', null, 'fetchcustomersforwarehousesales', null, populatesupplier, 'silent');
  
  whsalesupdatebatchidout = '';
  
  const rerunout=(result)=>{
      if(document.getElementById('matwhsalesbtnsubmit').textContent == 'Update'){document.getElementById('whsaleshistory').click()}else{
          document.getElementById('whsales').click();
      document.getElementById('rowContainerwhsales').innerHTML =`<div class="outtakegridrow whsalesouttakegridrow" id="whsalesgridrow_0">
                    <input type="hidden" name="rowid" value="">
                    <div class="grid__item" style="350px">
                    <p class="hidden">Item</p>
                        <select disabled name="whsalesselectitemout" onchange="matwhsalesselectitemout(this.id, this.value)" id="matwhsalesselectitem_0" class="orejot">
                            <option value="" disabled selected >select item</option>
                        </select>
                    </div>
                    <div class="grid__item" style="width:150px">
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
      document.getElementById('matwhsalesbtndownload').classList.add('hidden')
      if(document.getElementById('matwhsalesbtnsubmit').textContent == "Submit"){
            let status = false
            for (let i = 0; i < document.getElementsByName('whsalesquantity').length; i++) {
              if (document.getElementsByName('whsalesquantity')[i].style.borderColor == 'red' || document.getElementsByName('whsalesquantity')[i].value == 0) {
                callModal('Quantity request is more than stock balance or quantity is zero', 0);
                status = true
              }
            }
            if(document.getElementById('matwhsalespaymentmethod').value == 'TRANSFER' && !document.getElementById('matwhsalesotherdetail').value)return callModal('Please enter Other details', 0)
            if(document.getElementById('matwhsalesbtnsubmit').textContent == 'Update'){
                if(!status)callController('warehousesalescript.php', whsalessubmitparamsout(whsalesupdatebatchidout), 'warehousesalescript', getorejotoutwhsales)
            }else{
                if(!status)callController('warehousesalescript.php', whsalessubmitparamsout(), 'warehousesalescript', getorejotoutwhsales(), generatwhsalesreceipt2 )
            }
      }else if(document.getElementById('matwhsalesbtnsubmit').textContent == "Print Receipt"){
      document.getElementById('matwhsalesbtndownload').classList.remove('hidden');
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




var viewwhsalesorehistory_datasource = [];
let whsalesallusers
let viewwhsalesoreorginfo

function whsalesviewgroupDataByBatchId(data) {
    const groupedData = [];
    
    console.log('data', data)

    data.forEach(entry => {
        const batchid = entry.batchid;
        let batchObject = groupedData.find(obj => obj.batchid === batchid);

        if (!batchObject) {
            batchObject = {
                batchid: batchid,
                data: []
            };
            groupedData.unshift(batchObject);
        }

        batchObject.data.push(entry);
    });

    return groupedData;
}

const populateviewwhsalestable=(resultt)=>{
    let result = whsalesviewgroupDataByBatchId(resultt.data)
    datafromviewwhsales = result
    console.log('what we getting', result)
    viewwhsalesorehistory_datasource = [];
    viewwhsalesorehistory_datasource = result;
    console.log('viewwhsalesorehistory_datasource', viewwhsalesorehistory_datasource)
    initPagination(viewwhsalesorehistory_datasource, viewwhsalesorehistoryorehistorysetCurrentPage);
    // document.getElementById('viewwhsales2orehistorytablecontent').innerHTML = viewwhsalesorehistory_datasource.map((dat, index)=>{
    //     return(`<tr data-open="false" class="source-row-item">
    //                             <td> ${index+1} </td>
    //                             <td> ${dat[i][0].reference} </td>
    //                             <td> ${index+1} fg</td>
    //                             <td> ${index+1}fg </td>
    //                             <td> ${index+1}d </td>
    //                             <td> ${index+1}e </td>
    //                             <td> ${index+1}w </td>
    //                             <td> ${index+1} u</td>
    //                         </tr>`)
    // }).join('')
    }
    
var viewwhsalesorehistoryorehistorysetCurrentPage = (pageNum) => {
    document.getElementById('cardtprice').innerHTML = ''
  document.getElementById('cardtqty').innerHTML = ''
  document.getElementById('cardtamount').innerHTML = ''

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewwhsalesorehistory_datasource.length) {
        viewwhsalesorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewwhsalesorehistoryorehistoryTableRows(item, index)
            }
        })
        
        
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        appendPropertyAccountTableFoot(viewwhsalesorehistory_datasource)
    }
    else {
        document.getElementById("viewwhsalesorehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

function appendPropertyAccountTableFoot(batches) {
    // Initialize variables to accumulate total values
    let totalQty = 0;
    let totalCost = 0;
    let totalUnitCost = 0;
    let totalSalesValue = 0;
    let totalProfit = 0;

    // Loop through each batch and its items to calculate totals
    batches.forEach(batch => {
        batch.data.forEach(item => {
            const qty = parseInt(item.qty, 10) || 0;
            const cost = parseInt(item.cost, 10) || 0;
            const unitCost = parseInt(item.unitcost, 10) || 0;
            const salesValue = qty * cost;

            totalQty += qty;
            totalCost += cost;
            totalUnitCost += unitCost;
            totalSalesValue += salesValue;
            totalProfit += (cost - unitCost);
        });
    });
 
    // Insert the footer with the aggregated totals
    document.getElementById("viewwhsalesorehistorytablecontent").innerHTML += `
    <tfoot>
      <tr>
        <td colspan="6">Total</td>  
        <td>${formatCurrency(totalQty)}</td>  
        <td class="sadmin hidde">${naira} ${formatCurrency(totalUnitCost)}</td>
        <td class="hidden">${naira} ${formatCurrency(totalCost)}</td>
        <td class="sadmin hidde">${naira} ${formatCurrency(totalProfit)}</td>
        <td>${naira} ${formatCurrency(totalSalesValue)}</td>
      </tr>
    </tfoot>
  `;
  document.getElementById('cardtprice').innerHTML = formatCurrency(totalCost)
  document.getElementById('cardtqty').innerHTML = formatCurrency(totalQty)
  document.getElementById('cardtamount').innerHTML = formatCurrency(totalSalesValue)
  sadmin()
}




const deletestockwhsalesviewentry=(id)=>{
    const run=(result)=>{
       function paramswhsalesview(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('viewwhsaleslocation').value);
        paramstr.append('startdate', document.getElementById('viewwhsalesstartdate').value);
        paramstr.append('enddate', document.getElementById('viewwhsalesenddate').value);
            return paramstr;
        };
        
        callController('fetchwhsalesviewscript.php', paramswhsalesview(), 'fetchwhsalesviewscript', ['viewwhsalesenddate', 'viewwhsalesstartdate', 'viewwhsaleslocation'], populateviewwhsalestable);
    }
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removewhsalesview.php', parammm(), 'removewhsalesview', null, run)
}

const whsalesgetperson =(email)=>{
    return `${whsalesallusers.filter(dat=>dat.email == email)[0].lastname} ${whsalesallusers.filter(dat=>dat.email == email)[0].firstname}`
}

const removewhsalesviewmodal=(e)=>{
     if(e.target.classList.contains('bgwhsales'))e.target.classList.add('hidden')
}


// UPDATED ON THE 16TH JUNE 2025
const whsalesviewsinglesale = (batchid, view) => {
  if (document.getElementById("whsalesviewmodalcontainer") && view == 'view') {
    document.getElementById("whsalesviewmodalcontainer").classList.remove('hidden');
  }
  
  let batchdata = viewwhsalesorehistory_datasource.filter(dat => dat.batchid == batchid)[0];
  console.log('batchdata', batchdata);
  
  if (document.getElementById("whsalesviewmodal")) {
    document.getElementById("whsalesviewmodal").innerHTML = `
      <div class="receipt-container">
        <div class="receipt-actions">
          <div class="print-button" onclick="printwhsalesview(${batchdata.batchid})">Print</div>
        </div>
        
        <div class="receipt">
          <div class="receipt-header">
            <div class="company-brand">
              <img src="${assetsUrl.logo}" alt="Company Logo" class="company-logo">
              <div class="company-info">
                <h1 class="company-name">${viewwhsalesoreorginfo.companyname}</h1>
                <div class="company-address">${viewwhsalesoreorginfo.address}</div>
                <div class="company-contact">
                  ${viewwhsalesoreorginfo.mobile ? `<span>${viewwhsalesoreorginfo.mobile}</span>` : ''}
                  ${viewwhsalesoreorginfo.telephone ? `<span>${viewwhsalesoreorginfo.telephone}</span>` : ''}
                </div>
              </div>
            </div>
            
            <div class="invoice-meta">
              <div class="invoice-id">
                <span class="meta-label">INVOICE #:</span>
                <span class="meta-value">REF|${batchdata?.batchid || ''}</span>
              </div>
              <div class="invoice-date">
                <span class="meta-label">DATE:</span>
                <span class="meta-value">${batchdata.data[0].transactiondate.split(' ')[0]}</span>
              </div>
            </div>
          </div>

          <div class="billing-details">
            <div class="billing-section">
              <h3 class="section-title">TRANSACTION DETAILS</h3>
              <div class="detail-grid">
                <div class="detail-item">
                  <span class="detail-label">Supply To:</span>
                  <span class="detail-value">${String(
                    batchdata.data[0].owner && batchdata.data[0].owner != '-1' ? 
                    getCompanyById(batchdata.data[0].owner) : 
                    batchdata.data[0].description
                  ).toUpperCase()}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Supply From:</span>
                  <span class="detail-value">${String(getLocationById(batchdata.data[0].location)).toUpperCase()}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Payment Method:</span>
                  <span class="detail-value">${String(batchdata.data[0].paymentmethod).toUpperCase()}</span>
                </div>
                <div class="detail-item full-width">
                  <span class="detail-label">Description:</span>
                  <span class="detail-value">${String(batchdata.data[0].description).toUpperCase()}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Sales Person:</span>
                  <span class="detail-value">${String(whsalesgetperson(batchdata.data[0].user)).toUpperCase()}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Reference Number:</span>
                  <span class="detail-value">${String(batchdata.data[0].reference).toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="items-section">
            <table class="items-table">
              <thead>
                <tr>
                  <th class="text-left">ITEM</th>
                  <th class="text-right">PRICE</th>
                  <th class="text-center">QTY</th>
                  <th class="text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                ${batchdata.data.map(item => `
                  <tr class="item-row">
                    <td>${String(item.itemname).toUpperCase()}</td>
                    <td class="text-right">${naira} ${formatCurrency(item.cost)}</td>
                    <td class="text-center">${formatCurrency(item.qty)}</td>
                    <td class="text-right">${naira} ${formatCurrency(Number(item.qty) * Number(item.cost))}</td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr class="summary-row">
                  <td colspan="3" class="text-right">SUBTOTAL</td>
                  <td class="text-right">${naira}${formatCurrency(batchdata.data[0].amountpaid)}</td>
                </tr>
                <tr class="summary-row">
                  <td colspan="3" class="text-right">VAT</td>
                  <td class="text-right">${naira}0.00</td>
                </tr>
                <tr class="total-row">
                  <td colspan="3" class="text-right">TOTAL AMOUNT</td>
                  <td class="text-right">${naira}${formatCurrency(batchdata.data[0].amountpaid)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="signature-section triple">
            <div class="signature-block">
              <div class="signature-line"></div>
              <div class="signature-label">Prepared by: Signature & Date</div>
            </div>
            <div class="signature-block">
              <div class="signature-line"></div>
              <div class="signature-label">Approved by: Signature & Date</div>
            </div>
            <div class="signature-block">
              <div class="signature-line"></div>
              <div class="signature-label">Received by: Signature & Date</div>
            </div>
          </div>
          
          <div class="footer-note">
            <p>We appreciate you doing business with us.</p>
            <p class="print-date">Generated: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>

      <style>
        .receipt-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .receipt-actions {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        
        .print-button {
          padding: 12px 25px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s;
        }
        
        .print-button:hover {
          background: #2980b9;
        }
        
        .receipt {
          font-family: 'Segoe UI', 'Roboto', sans-serif;
          padding: 40px;
          color: #333;
          background: white;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          border-radius: 8px;
        }
        
        .receipt-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #3498db;
        }
        
        .company-brand {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .company-logo {
          width: 80px;
          height: auto;
          border-radius: 4px;
          object-fit: contain;
        }
        
        .company-name {
          margin: 0;
          font-size: 24px;
          color: #2c3e50;
        }
        
        .company-address {
          font-size: 14px;
          color: #7f8c8d;
          margin: 5px 0;
        }
        
        .company-contact {
          display: flex;
          gap: 10px;
          font-size: 13px;
          color: #7f8c8d;
        }
        
        .invoice-meta {
          text-align: right;
        }
        
        .invoice-id, .invoice-date {
          margin-bottom: 8px;
        }
        
        .meta-label {
          font-weight: 600;
          color: #2c3e50;
        }
        
        .meta-value {
          color: #3498db;
        }
        
        .billing-details {
          margin: 25px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 6px;
        }
        
        .section-title {
          margin-top: 0;
          margin-bottom: 15px;
          color: #2c3e50;
          font-size: 18px;
          border-bottom: 1px solid #eee;
          padding-bottom: 8px;
        }
        
        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 12px;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
        }
        
        .detail-item.full-width {
          grid-column: 1 / -1;
        }
        
        .detail-label {
          font-weight: 600;
          color: #7f8c8d;
        }
        
        .detail-value {
          color: #2c3e50;
          text-align: right;
          max-width: 60%;
          word-break: break-word;
        }
        
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 25px 0;
        }
        
        .items-table th {
          background: #3498db;
          color: white;
          padding: 12px 15px;
          text-align: left;
        }
        
        .items-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #eee;
        }
        
        .items-table tfoot td {
          border-bottom: none;
          font-weight: 600;
        }
        
        .text-left { text-align: left; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        
        .item-row:hover {
          background-color: #f8f9fa;
        }
        
        .summary-row {
          background-color: #f8f9fa;
        }
        
        .total-row {
          background-color: #e3f2fd;
          font-size: 1.1em;
          border-top: 2px solid #3498db;
        }
        
        .signature-section {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px dashed #ccc;
        }
        
        .signature-section.triple {
          display: flex;
          justify-content: space-between;
        }
        
        .signature-block {
          width: 30%;
          text-align: center;
        }
        
        .signature-line {
          height: 1px;
          border-bottom: 2px solid #7f8c8d;
          margin-bottom: 8px;
        }
        
        .signature-label {
          font-size: 14px;
          color: #7f8c8d;
        }
        
        .footer-note {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-style: italic;
          color: #7f8c8d;
        }
        
        .print-date {
          font-size: 12px;
          margin-top: 5px;
        }
      </style>
    `;
  }
};

function appendviewwhsalesorehistoryorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    let sttring = JSON.stringify(dat)
    document.getElementById("viewwhsalesorehistorytablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.batchid} </td>
                                <td> ${dateToWords(dat.data[0].transactiondate.split(' ')[0])}</td>
                                <td> ${whsalesgetperson(dat.data[0].user)} </td>
                                <td> 
                                        ${dat.data.length > 0 ? `<table class="jmargin-top" id="table${dat.data.batchid}">
                                            <thead>
                                                <tr>
                                                    <td style="font-weight: bold"> item&nbsp;id </td>
                                                    <td style="font-weight: bold"> item&nbsp;name  </td>
                                                    <td style="font-weight: bold"> quantity  </td>
                                                    <td style="font-weight: bold" class="sadmin hidde"> unit&nbsp;Cost </td>
                                                    <td style="font-weight: bold"> unit&nbsp;Price </td>
                                                    <td style="font-weight: bold" class="sadmin1 hidden"> unit&nbsp;gross profit </td>
                                                    <td style="font-weight: bold">  total&nbsp;Amount </td>
                                                    <td style="font-weight: bold" class="sadmin1 hidden"> total&nbsp;Cost </td>
                                                    <td style="font-weight: bold" class="sadmin1 hidden">  gross&nbsp;profit </td>
                                                </tr>
                                            </thead>
                                            <tbody id="tablebody${dat.data.batchid}">
                                                ${dat.data.map((data, index)=>{
                                                    // if(index < 2){
                                                    data.tamount = parseInt(data.cost)*parseInt(data.qty)
                                                    data.unittamount = parseInt(data.unitcost)*parseInt(data.qty)
                                                    data.tgross = Number(data.tamount)-Number(data.unittamount)
                                                        return `
                                                            <tr>
                                                                <td>${data.itemid}</td>
                                                                <td>${data.itemname}</td>
                                                                <td>${formatCurrency(data.qty)}</td>
                                                                <td class="sadmin hidde"> ${formatCurrency(data.unitcost)}</td>
                                                                <td> ${formatCurrency(Number(data.cost))}</td>
                                                                <td class="sadmin1 hidden"> ${formatCurrency(Number(data.cost)-Number(data.unitcost))}</td>
                                                                <td> ${formatCurrency(parseInt(data.cost)*parseInt(data.qty))}</td>
                                                                <td class="sadmin1 hidden"> ${formatCurrency(data.unittamount)}</td>
                                                                <td class="sadmin1 hidden"><input type="hidden" name="gpunit" value="${Number(data.cost)-Number(data.unitcost)}"/> ${formatCurrency(Number(data.tamount)-Number(data.unittamount))}</td>
                                                            </tr>
                                                        `
                                                    // }else{
                                                        // return
                                                    // } 
                                                }).join('')}
                                                ${dat.data.length > 2 ? `<tr class="hidden"><td colspan="4"><p style="color: green" onclick="whsalesviewsinglesale(${dat.batchid}, 'view')">click to view the remaining ${dat.data.length-2}</p></td></tr>` : ''}
                                            </tbody> 
                                            <tfoot>
                                                <tr>
                                                  <td colspan="2">Total</td>
                                                  <td>${formatCurrency(dat.data.reduce((sum, item) => sum + parseInt(item.qty, 10), 0))}</td>
                                                  <td class="sadmin hidde"> </td>
                                                  <td> </td>
                                                  <td class="sadmin1 hidden"> ${formatCurrency(dat.data.reduce((sum, item) => sum + (parseInt(item.cost, 10)-parseInt(item.unitcost, 10)), 0))}</td>
                                                  <td> 
                                                  ${formatCurrency(
                                                    parseInt(dat.data.reduce((sum, item) => sum + parseInt(item.tamount, 10), 0))
                                                  )}
                                                  </td>
                                                  <td class="sadmin1 hidden"> ${formatCurrency(dat.data.reduce((sum, item) => sum + parseInt(item.unittamount, 10), 0))}</td>
                                                  <td class="sadmin1 hidden"> ${formatCurrency(
                                                    parseInt(dat.data.reduce((sum, item) => sum + parseInt(item.tgross, 10), 0)) 
                                                  )}</td>
                                                </tr>
                                            </tfoot>
                                        </table>` : `No registered Item`}
                                </td>
                                <td> ${formatCurrency(dat.data.length)} </td>
                                <td> ${formatCurrency(dat.data.reduce((accumulator, currentValue) => accumulator + Number(currentValue.qty), 0))} </td>
                                <td> ${formatCurrency(dat.data.reduce((accumulator, currentValue) => accumulator + Number(currentValue.tamount), 0))} </td>
                                <td class="sadmin hidde"> ${formatCurrency(dat.data.reduce((accumulator, currentValue) => accumulator + Number(currentValue.unittamount), 0))} </td>
                                <td class="sadmin hidde">${formatCurrency(dat.data.reduce((accumulator, currentValue) => accumulator + (Number(currentValue.tgross)), 0))}</td>
                                <td class="hidden">${formatCurrency(dat.data.reduce((accumulator, currentValue) => accumulator + Number(currentValue.cost), 0))} </td>
                                <td>${formatCurrency(dat.data[0].amountpaid)} </td>
                                <td>${dat.data[0].paymentmethod} </td>  
                                <td>${dat.data[0].description} </td> 
                                <td>${dat.data[0].otherdetail??''} </td>  
                                <td>
                                    ${salesview == "VIEW" ? `<div class="flex" style="align-items:center;display:flex;gap: 10px">
                                        <button onclick="whsalesviewsinglesale(${dat.batchid}, 'view')" 
                                            style="padding: 8px 12px;cursor:pointer;border:none;outline:none;font-size:12px;
                                            color:white;background-color:green;border-radius:3px">
                                            View
                                        </button>
                                        
                                        <button onclick='sessionStorage.setItem("editviewwhsalesdata", '${sttring}');document.getElementById("warehousesaless").click();' 
                                            style="padding: 8px 12px;cursor:pointer;border:none;outline:none;font-size:12px;
                                            color:white;background-color:blue;border-radius:3px;display: none">
                                            Edit
                                        </button>
                                        
                                        <button onclick="deletestockwhsalesviewentry('${dat.id}')" 
                                            style="padding: 8px 12px;cursor:pointer;border:none;outline:none;font-size:12px;
                                            color:white;background-color:red;border-radius:3px;display: none">
                                            Delete
                                        </button>
                                        
                                        <button onclick="printwhsalesview('${dat.batchid}')" 
                                            style="padding: 8px 12px;cursor:pointer;border:1px solid black;outline:none;font-size:12px;
                                            color:black;background-color:white;border-radius:3px">
                                            Print
                                        </button>
                                        
                                        <button onclick="handleReverseSales('${dat.batchid}')" 
                                            style="padding: 8px 12px;cursor:pointer;border:1px solid red;outline:none;font-size:12px;
                                            color:red;background-color:white;border-radius:3px">
                                            Reverse
                                        </button>
                                    </div>` : ''}
                                    ${salesview == "APPROVE" ? `<div class="flex" style="align-items:center;display:flex;gap: 10px">
                                        <button onclick="salesapprove(${dat.batchid}, 'view')" 
                                            style="padding: 8px 12px;cursor:pointer;border:none;outline:none;font-size:12px;
                                            color:white;background-color:green;border-radius:3px">
                                            Approve
                                        </button>
                                        
                                        <button onclick="salesdecline('${dat.batchid}')" 
                                            style="padding: 8px 12px;cursor:pointer;border:1px solid red;outline:none;font-size:12px;
                                            color:red;background-color:white;border-radius:3px">
                                            Decline
                                        </button>
                                    </div>` : ''}

                                </td>
                            </tr>`
} 


function handleReverseSales(batchId) {
    // Show confirmation dialog
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to reverse this sale?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reverse it!',
        customClass: {
            popup: 'custom-swal-size'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Show loading indicator
            Swal.fire({
                title: 'Reversing...',
                text: 'Please wait while the request is being processed.',
                allowOutsideClick: false,
                showConfirmButton: false,
                customClass: {
                    popup: 'custom-swal-size'
                },
                willOpen: () => {
                    Swal.showLoading();
                }
            });

            // Perform the API call to reversewarehouseales.php
            fetch('../controllers/reversewarehousesales.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `batchid=${batchId}`
            })
            .then(response => response.json())  // Parse JSON response if it's expected
            .then(data => {
                // Check if the reversal was successful based on your API's response structure
                if (data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Reversed!',
                        text: 'The sale has been reversed successfully. Awaiting Approval',
                        customClass: {
                            popup: 'custom-swal-size'
                        }
                    });
                    document.getElementById('viewwhsalesfetchview').click();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed!',
                        text: data.message || 'There was an error reversing the sale.',
                        customClass: {
                            popup: 'custom-swal-size'
                        }
                    });
                }
            })
            .catch(error => {
                // Handle network or other errors
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: 'There was an error connecting to the server.',
                    customClass: {
                        popup: 'custom-swal-size'
                    }
                });
            });
        }
    });
}

function salesapprove(batchId) {
    // Show confirmation dialog for approval
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to approve this sale?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Approve it!',
        customClass: {
            popup: 'custom-swal-size'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Show loading indicator
            Swal.fire({
                title: 'Approving...',
                text: 'Please wait while the request is being processed.',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    const modal = Swal.getPopup(); // Get the modal element
                    modal.style.transition = 'transform 0.4s ease-in-out'; // Set transition
                    modal.style.transform = 'scale(1.5)'; // Scale up to 1.5
                    Swal.showLoading(); // Show loading
                }
            });

            // Perform the API call to approve the sale
            fetch('../controllers/approvewarehousereversal.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `batchid=${batchId}`
            })
            .then(response => response.json())  // Parse JSON response if expected
            .then(data => {
                const modal = Swal.getPopup();
                modal.style.transform = 'scale(1)'; // Reset scale back to original

                if (data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Approved!',
                        text: 'The sale has been approved successfully.',
                        customClass: {
                            popup: 'custom-swal-size'
                        }
                    });
                    document.getElementById('viewwhsalesfetchview1').click();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed!',
                        text: data.message || 'There was an error approving the sale.',
                        customClass: {
                            popup: 'custom-swal-size'
                        }
                    });
                }
            })
            .catch(error => {
                const modal = Swal.getPopup();
                modal.style.transform = 'scale(1)'; // Reset scale back to original

                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: 'There was an error connecting to the server.',
                    customClass: {
                        popup: 'custom-swal-size'
                    }
                });
            });
        }
    });
}

function salesdecline(batchId) {
    // Show confirmation dialog for decline
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to decline this sale?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Decline it!',
        customClass: {
            popup: 'custom-swal-size'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Show loading indicator
            Swal.fire({
                title: 'Declining...',
                text: 'Please wait while the request is being processed.',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    const modal = Swal.getPopup(); // Get the modal element
                    modal.style.transition = 'transform 0.4s ease-in-out'; // Set transition
                    modal.style.transform = 'scale(1.5)'; // Scale up to 1.5
                    Swal.showLoading(); // Show loading
                }
            });

            // Perform the API call to decline the sale
            fetch('../controllers/declinewarehousereversal.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `batchid=${batchId}`
            })
            .then(response => response.json())  // Parse JSON response if expected
            .then(data => {
                const modal = Swal.getPopup();
                modal.style.transform = 'scale(1)'; // Reset scale back to original

                if (data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Declined!',
                        text: 'The sale has been declined successfully.',
                        customClass: {
                            popup: 'custom-swal-size'
                        }
                    });
                    document.getElementById('viewwhsalesfetchview1').click();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed!',
                        text: data.message || 'There was an error declining the sale.',
                        customClass: {
                            popup: 'custom-swal-size'
                        }
                    });
                }
            })
            .catch(error => {
                const modal = Swal.getPopup();
                modal.style.transform = 'scale(1)'; // Reset scale back to original

                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: 'There was an error connecting to the server.',
                    customClass: {
                        popup: 'custom-swal-size'
                    }
                });
            });
        }
    });
}




function sadmin(){
    console.log('sadmin called')
    if(document.getElementsByClassName('sadmin')){
        for(let i=0;i<document.getElementsByClassName('sadmin').length;i++){
            if(document.getElementById('sessionrole').value == 'SUPERADMIN'){
                 document.getElementsByClassName('sadmin')[i].classList.remove('hidden')
            }else{
                 document.getElementsByClassName('sadmin')[i].classList.add('hidden')
                
            }
        }
    }
}

// setInterval(()=>{sadmin()},1000)


const checkviewwhsalesuserstatus =(result)=>{
        console.log(document.getElementById('viewwhsaleslocation'))
        if(document.getElementById('viewwhsaleslocation'))document.getElementById('viewwhsaleslocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('viewwhsaleslocation'))document.getElementById('viewwhsaleslocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('viewwhsaleslocation'))document.getElementById('viewwhsaleslocation').setAttribute('readonly', true)
    }
}

const printwhsalesview =(batchid)=>{
    whsalesviewsinglesale(batchid)
    printContent('SALES RECEIPT',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'whsalesviewmodal')
}


async function openviewwhsales (state="VIEW") {
    // this is used to handle both view and approve view
    salesview = state
    if(salesview == "VIEW")await httpRequest('viewwarehousesaless.php', 'override');
    if(salesview == "APPROVE")await httpRequest('approvereversedsales.php', 'override');
    
    
    async function whsalesvieworefetchViewDeliveryOrganizationInfo() {
        let result = await fetchRequest('../controllers/fetchorganisationscript.php');
        if(result) {
            let parseResult  =  JSON.parse(result);
            if(parseResult.status){
                viewwhsalesoreorginfo = parseResult.data.data[0]
                //  generatwhsalesreceipt()
                // document.getElementById('whsaleslogo').src = assetsUrl.logo
            }
        }
    }
    whsalesvieworefetchViewDeliveryOrganizationInfo()
    
    const whsalesassignuser =(result)=>{
        whsalesallusers=result.data;
    }
    callController('fetchallusers.php', null, 'fetchallusers', null, whsalesassignuser, 'silent');
    
      jtabledata = document.getElementById('viewwhsalesorehistorytablecontent');
        initializePaginationParams();
    
//     if(document.getElementById('fghjmghfndf'))document.getElementById('dfghjghfd').addEventListener('click', function () {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();
    
//     // Define the content of the PDF
//     const content = `
//     ${oreorginfo.companyname}
//     ${oreorginfo.address}

//     Invoice#: REF|${result ? result.reference : 'No reference found'}
//     Issue Date: ${new Date().toLocaleDateString()}

//     Bill to:
//     Sales Person: ${String(whsalesperson).toUpperCase()}
//     Supply To: ${String(document.getElementById('matwhsalesreceivedto').value).toUpperCase()}
//     Supply From: ${getLocationById(document.getElementById('matwhsalesreceivedfrom').value).toUpperCase()}
//     Payment Method: ${document.getElementById('matwhsalespaymentmethod').value.toUpperCase()}
//     Description: ${document.getElementById('matwhsalesdescription').value.toUpperCase()}
//     Reference Number: ${result ? result.reference : ''}

//     Payment:
//     Date: ${new Date().toLocaleDateString()}
//     Total quantity: ${document.getElementById('rowContainerwhsales').children.length} Item(s)
//     Total cost: ${naira}${document.getElementById('whsalestotalamountpaidformat').value}
//     VAT: ${naira} 0.00
//     Total paid: ${naira}${document.getElementById('whsalestotalamountpaidformat').value}
//     Remaining Balance: ${naira}00.00

//     Items:
//     `;

//     // Add rows for each item
//     for (let i = 0; i < document.getElementById('rowContainerwhsales').children.length; i++) {
//         content += `
//         ITEM: ${whsalesactionitemselectout('', document.getElementsByName('whsalesselectitemout')[i].value)}
//         PRICE: ${naira} ${formatCurrency(document.getElementsByName('whsalesunitcost')[i].value)}
//         QTY: ${formatCurrency(document.getElementsByName('whsalesquantity')[i].value)}
//         AMOUNT: ${naira} ${formatCurrency(document.getElementsByName('whsalesvalue')[i].value)}
//         `;
//     }

//     content += `
//     SUBTOTAL: ${document.getElementById('whsalestotalamountpaidformat').value}
//     VAT: ${naira} 0.00
//     TOTAL AMOUNT: ${document.getElementById('whsalestotalamountpaidformat').value}
//     TOTAL ITEMS: ${document.getElementById('rowContainerwhsales').children.length}

//     We appreciate you doing business with us.
//     THANK YOU

//     Sender: Signature & Date
//     Receiver: Signature & Date
//     `;

//     // Add the content to the PDF
//     doc.text(content, 10, 10);

//     // Save the PDF
//     doc.save('receipt.pdf');
// });

    // if(document.getElementById('viewwhsalesfetchview'))document.getElementById('viewwhsalesfetchview').addEventListener('click', e=>{
    //     generatwhsalesreceipt(salesresult, 'DOWNLOAD')
    // })
        if(salesview == "APPROVE")callController('fetchwarehousesalesforapproval.php', null, 'fetchwarehousesalesforapproval', [], populateviewwhsalestable);
    if(document.getElementById('viewwhsalesfetchview'))document.getElementById('viewwhsalesfetchview').addEventListener('click', e=>{
        document.getElementById('viewwhsalesorehistorytablecontent').innerHTML = ''
        function paramswhsalesview(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('viewwhsaleslocation').value);
        paramstr.append('startdate', document.getElementById('viewwhsalesstartdate').value);
        paramstr.append('enddate', document.getElementById('viewwhsalesenddate').value);
            return paramstr;
        };
        
        if(salesview == "APPROVE")callController('fetchwarehousesalesforapproval.php', null, 'fetchwarehousesalesforapproval', [], populateviewwhsalestable);
        if(salesview == "VIEW")callController('fetchwarehousesales.php', paramswhsalesview(), 'fetchwarehousesales', ['viewwhsalesenddate', 'viewwhsalesstartdate', 'viewwhsaleslocation'], populateviewwhsalestable);
    })
    if(document.getElementById('viewwhsalesfetchview1'))document.getElementById('viewwhsalesfetchview1').addEventListener('click', e=>{
        document.getElementById('viewwhsalesorehistorytablecontent').innerHTML = ''
        function paramswhsalesview(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('viewwhsaleslocation').value);
        paramstr.append('startdate', document.getElementById('viewwhsalesstartdate').value);
        paramstr.append('enddate', document.getElementById('viewwhsalesenddate').value);
            return paramstr;
        };
        
        if(salesview == "APPROVE")callController('fetchwarehousesalesforapproval.php', null, 'fetchwarehousesalesforapproval', [], populateviewwhsalestable);
        if(salesview == "VIEW")callController('fetchwarehousesales.php', paramswhsalesview(), 'fetchwarehousesales', ['viewwhsalesenddate', 'viewwhsalesstartdate', 'viewwhsaleslocation'], populateviewwhsalestable);
    })
    
    if(document.getElementById('viewwhsaleslocation'))document.getElementById('viewwhsaleslocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('viewwhsaleslocation'))document.getElementById('viewwhsaleslocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    function getpermissionsParamsviewwhsales(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsviewwhsales(), 'fetchuserprofile', null, checkviewwhsalesuserstatus);
    
      if(document.getElementById('viewwhsalesviewexport'))document.getElementById('viewwhsalesviewexport').addEventListener('click',e=>{
            tableToExcel('viewwhsalesoretable2', 'LIST OF RETURNS')},false);
        if(document.getElementById('viewwhsalesviewprint'))document.getElementById('viewwhsalesviewprint').addEventListener('click',e=>{
            printContent('LIST OF RETURNS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewwhsalesorefulltableparant')},false);


}

var viewwhsalesNav = document.getElementById("viewwarehousesaless");
if (viewwhsalesNav) viewwhsalesNav.addEventListener("click", e=>openviewwhsales('VIEW'), false);
var approvereversedsalesNav = document.getElementById("approvereversedsales");
if (approvereversedsalesNav) approvereversedsalesNav.addEventListener("click", e=>openviewwhsales('APPROVE'), false);
