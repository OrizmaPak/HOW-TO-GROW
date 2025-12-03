const checkcollectionapproveviewsuserstatus =(result)=>{
        if(document.getElementById('collectionapproveviewsmarketer'))document.getElementById('collectionapproveviewsmarketer').innerHTML = `<option selected value="${result.email}">${result.lastname} ${result.firstname}</option>`;
        if(document.getElementById('collectionapproveviewslocation'))document.getElementById('collectionapproveviewslocation').value = result.location_id;
        if(document.getElementById('collectionapproveviewslocation'))document.getElementById('collectionapproveviewslocation').setAttribute('readonly', true)

}

    const collectionapproveviewaccountname =(result)=>{
            if(document.getElementById('collectionapproveviewaccountname'))document.getElementById('collectionapproveviewaccountname').innerHTML = result.data.map(dat=>`<option value="${dat.accountdetail.accountnumber}">${dat.customerdetail.lastname} ${dat.customerdetail.firstname}</option>`)
}

// const docollectionapproveviewlabel =(state)=>{
//     let collectionapproveviewlname = getLabelFromValue(state.value, 'collectionapproveviewaccountname');
//     state.parentElement.parentElement.children[1].textContent = collectionapproveviewlname
// }

// const caltotalcollectionapproveviewcredit =()=>{
//     let colx = 0;
//     for(i=0;i<document.getElementsByClassName('caltotalcollectionapproveviewcredit').length;i++){
//         document.getElementsByClassName('caltotalcollectionapproveviewcredit')[i].value ? colx = colx+Number(document.getElementsByClassName('caltotalcollectionapproveviewcredit')[i].value) : colx = colx
//     }
//     document.getElementById('collectionapproveviewtotal').innerHTML = `&#x20A6; ${formatCurrency(colx)}`;
// }

// const removecollectionapproveviewsrow =(state)=>{
//     if(confirm('Confirm you want to delete the row')){state.parentElement.parentElement.remove()}else{return}
// }
function formatDatexxx(inputDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(inputDate);
  return date.toLocaleDateString(undefined, options);
}
const populatecollectionapprovesview =(result)=>{
        let nn = 0;
    document.getElementById('collectionapproveviewtable').innerHTML = result.data.map(dat=>{
        nn = Number(dat.credit) + nn
        return(`
                 <tr> 
                                <td> ${dat.accountnumber} </td>
                                <td> ${getLabelFromValue(dat.accountnumber, 'collectionapproveviewaccountname')}  </td>
                                <td> ${formatDatexxx(dat.transactiondate.split(' ')[0])} </td>
                                <td>${formatCurrency(dat.credit)}</td>
                 </tr>
        `)
    }).join('')
    document.getElementById('collectionapproveviewtotal').innerHTML = formatCurrency(nn)
    }

async function openCollectionapproveviews(){
    await httpRequest('collectionsapproveview.php');
    
    if(document.getElementById('collectionapproveviewslocation'))document.getElementById('collectionapproveviewslocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('collectionapproveviewslocation'))document.getElementById('collectionapproveviewslocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    function getpermissionsParamsgiftview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsgiftview(), 'fetchuserprofile', null, checkcollectionapproveviewsuserstatus);
        callController('fetchallaccountsprofile.php',null, 'fetchallaccountsprofile', null, collectionapproveviewaccountname);
        
    if(document.getElementById('collectionapproveviewview'))document.getElementById('collectionapproveviewview').addEventListener('click', e=>{
        function getcolparams(){
            let paramstr = new FormData;
            paramstr.append('marketer', document.getElementById('collectionapproveviewsmarketer').value);
            paramstr.append('startdate', document.getElementById('collectionapproveviewstartdate').value);
            paramstr.append('enddate', document.getElementById('collectionapproveviewenddate').value); 
            return paramstr
            
        }
        callController('fetchapprovedcollections.php', getcolparams(), 'fetchapprovedcollections', ['collectionapproveviewstartdate', 'collectionapproveviewenddate'], populatecollectionapprovesview)
    })
    
    if(document.getElementById('collectionapproveviewcheckall'))document.getElementById('collectionapproveviewcheckall').addEventListener('click', e=>{
        for(i=0;i<document.getElementsByName('collectionapprovecheck').length;i++){
            document.getElementsByName('collectionapprovecheck')[i].checked = true
        }
    })
    if(document.getElementById('collectionapproveviewuncheckall'))document.getElementById('collectionapproveviewuncheckall').addEventListener('click', e=>{
        for(i=0;i<document.getElementsByName('collectionapprovecheck').length;i++){
            document.getElementsByName('collectionapprovecheck')[i].checked = false
        }
    })
    const reloaddata=(result)=>{
        document.getElementById('collectionapproveviewview').click()
    }
    if(document.getElementById('collectionapproveviewapprove'))document.getElementById('collectionapproveviewapprove').addEventListener('click', e=>{
        let chek = false;
        let chekid = []
        for(i=0;i<document.getElementsByName('collectionapprovecheck').length;i++){
            document.getElementsByName('collectionapprovecheck')[i].checked == false ? null : chek = true;
            document.getElementsByName('collectionapprovecheck')[i].checked == true ? chekid.push(document.getElementsByName('collectionapprovecheck')[i].id) : chek = true;
        }
        if(chek == false)return callModal('Nothing to Approve', 0);
        function checkparams(){
            let paramstr = new FormData;
            paramstr.append('rowsize', chekid.length)
            for(i=0;i<chekid.length;i++){
                paramstr.append(`id${i+1}`, chekid[i])
            }
            return paramstr
        }
        callController('approvecollectionapproves.php', checkparams(), 'approvecollectionapproves', null, reloaddata)
    })
    
    if(document.getElementById('collectionapproveviewdecline'))document.getElementById('collectionapproveviewdecline').addEventListener('click', e=>{
        let chek = false;
        let chekid = []
        for(i=0;i<document.getElementsByName('collectionapprovecheck').length;i++){
            document.getElementsByName('collectionapprovecheck')[i].checked == false ? null : chek = true;
            document.getElementsByName('collectionapprovecheck')[i].checked == true ? chekid.push(document.getElementsByName('collectionapprovecheck')[i].id) : chek = true;
        }
        if(chek == false)return callModal('Nothing to Decline', 0);
        function checkparams(){
            let paramstr = new FormData;
            paramstr.append('rowsize', chekid.length)
            for(i=0;i<chekid.length;i++){
                paramstr.append(`id${i+1}`, chekid[i]) 
            }
            return paramstr
        }
        callController('declinecollectionapproves.php', checkparams(), 'declinecollectionapproves', null, reloaddata)
    })
    

}

var collectionapproveviews = document.getElementById('collectionsapproveview')

if(collectionapproveviews)collectionapproveviews.addEventListener('click',openCollectionapproveviews, false)






