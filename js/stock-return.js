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