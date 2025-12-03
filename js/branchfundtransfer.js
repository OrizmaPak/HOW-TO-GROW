let u
const branchtransferids = [
'branchtransferfrom',
'branchtransferto',
'branchtransferamount',
'branchtransferdate',
'branchtransferlocation'
]
const getbranchtransferprofile =(value, acname)=>{
    function branchtransferlocationuserparams(){
    var paramstr = new FormData();
    paramstr.append('accountnumber', value);
        return paramstr;
    };
    const branchtransferactiondo =(result)=>{
        acname.nextElementSibling.innerHTML = `${result.data[0].customerdetail.lastname} ${result.data[0].customerdetail.firstname} ${result.data[0].customerdetail.othernames ? result.data[0].customerdetail.othernames : null}`
    }
    callController('fetchaccountprofile.php', branchtransferlocationuserparams(), 'fetchaccountprofile', null, branchtransferactiondo);
}
const branchfundtransferaccounts =(result)=>{
    if(document.getElementById('branchfundtransferaccounts'))document.getElementById('branchfundtransferaccounts').innerHTML = result.data.map(dat=>`<option value="${dat.accountnumber}">${dat.accountnumber}</option>`)
}

const branchtransferlocationsetup =(result)=>{
        if(document.getElementById('branchtransferlocation'))document.getElementById('branchtransferlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('branchtransferlocation'))document.getElementById('branchtransferlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('branchtransferlocation'))document.getElementById('branchtransferlocation').setAttribute('readonly', true)
    }
}

const populatebranchfundtransfertable =(result)=>{
    let darta = result.data.filter(dat=>dat.id == u.split(' ')[0])
    console.log('darta', darta)
    document.getElementById('branchtransferfrom').value = ''
    document.getElementById('branchtransferto').value = ''
    document.getElementById('branchtransferamount').value = ''
    document.getElementById('branchtransferdate').value = ''
    document.getElementById('branchtransferdate').value = ''
    document.getElementById('branchtransferdescription').value = ''
    document.getElementById('branchtransferlocation').value = ''
    
}
    
async function openBranchFundTransfer() {
    await httpRequest('branchfundtransfer.php');
    u = '';
    callController('fetchsavingsaccounts.php',null, 'fetchsavingsaccounts', null, branchfundtransferaccounts);
    
    if(document.getElementById('branchtransferlocation'))document.getElementById('branchtransferlocation').innerHTML = `<option value="" disabled>Select Location</option>`
    if(document.getElementById('branchtransferlocation'))document.getElementById('branchtransferlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
     function branchtransferlocationuserparams(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', branchtransferlocationuserparams(), 'fetchuserprofile', null, branchtransferlocationsetup);
    
    if(sessionStorage.getItem('editviewbranchfundtransferdata')){
         u = sessionStorage.getItem('editviewbranchfundtransferdata')
        function paramsviewbranchfundtransfer(){
            var paramstr = new FormData();
            paramstr.append('id', u.split(' ')[0]);
            return paramstr;
        };
        
        callController('fetchbranchfundtransfer.php', paramsviewbranchfundtransfer(), 'fetchbranchfundtransfer', [], populatebranchfundtransfertable);
   
    }
    
    if(document.getElementById('branchtransfersavebtn'))document.getElementById('branchtransfersavebtn').addEventListener('click', e=>{
     
        function branchtransferlocationparams(){
        var paramstr = new FormData();
        paramstr.append('transferfrom', document.getElementById('branchtransferfrom').value);
        paramstr.append('transferto', document.getElementById('branchtransferto').value);
        paramstr.append('amount', document.getElementById('branchtransferamount').value);
        paramstr.append('transactiondate', document.getElementById('branchtransferdate').value);
        paramstr.append('reference', document.getElementById('branchtransferdate').value);
        paramstr.append('description', document.getElementById('branchtransferdescription').value);
        paramstr.append('location', document.getElementById('branchtransferlocation').value);
            return paramstr;
        };
        callController('branchtransferscript.php', branchtransferlocationparams(), 'branchtransferscript', branchtransferids, resetPage);
     
    })
    
}


let branchfundtransferbtn = document.getElementById('branchfundtransfer')
if(branchfundtransferbtn) branchfundtransferbtn.addEventListener('click', openBranchFundTransfer, false)