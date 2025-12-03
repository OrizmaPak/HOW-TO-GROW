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
                callController('giftscript.php', getgiftdata(), 'giftscript', ['giftlocation', 'giftitemlistgiftelement', 'giftunitcost', 'giftgiftdate', 'giftgiftreceiptno', 'giftstockqty', 'giftstockprodvalue'], resetPage);

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
