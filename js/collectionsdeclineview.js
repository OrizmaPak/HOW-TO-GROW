const checkcollectiondeclineviewsuserstatus =(result)=>{
        if(document.getElementById('collectiondeclineviewsmarketer'))document.getElementById('collectiondeclineviewsmarketer').innerHTML = `<option selected value="${result.email}">${result.lastname} ${result.firstname}</option>`;
        if(document.getElementById('collectiondeclineviewslocation'))document.getElementById('collectiondeclineviewslocation').value = result.location_id;
        if(document.getElementById('collectiondeclineviewslocation'))document.getElementById('collectiondeclineviewslocation').setAttribute('readonly', true)

}

    const collectiondeclineviewaccountname =(result)=>{
            if(document.getElementById('collectiondeclineviewaccountname'))document.getElementById('collectiondeclineviewaccountname').innerHTML = result.data.map(dat=>`<option value="${dat.accountdetail.accountnumber}">${dat.customerdetail.lastname} ${dat.customerdetail.firstname}</option>`)
}

// const docollectiondeclineviewlabel =(state)=>{
//     let collectiondeclineviewlname = getLabelFromValue(state.value, 'collectiondeclineviewaccountname');
//     state.parentElement.parentElement.children[1].textContent = collectiondeclineviewlname
// }

// const caltotalcollectiondeclineviewcredit =()=>{
//     let colx = 0;
//     for(i=0;i<document.getElementsByClassName('caltotalcollectiondeclineviewcredit').length;i++){
//         document.getElementsByClassName('caltotalcollectiondeclineviewcredit')[i].value ? colx = colx+Number(document.getElementsByClassName('caltotalcollectiondeclineviewcredit')[i].value) : colx = colx
//     }
//     document.getElementById('collectiondeclineviewtotal').innerHTML = `&#x20A6; ${formatCurrency(colx)}`;
// }

// const removecollectiondeclineviewsrow =(state)=>{
//     if(confirm('Confirm you want to delete the row')){state.parentElement.parentElement.remove()}else{return}
// }
function formatDatexxx(inputDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(inputDate);
  return date.toLocaleDateString(undefined, options);
}
const populatecollectiondeclinesview =(result)=>{
        let nn = 0;
    document.getElementById('collectiondeclineviewtable').innerHTML = result.data.map(dat=>{
        nn = Number(dat.credit) + nn
        return(`
                 <tr> 
                                <td> ${dat.accountnumber} </td>
                                <td> ${getLabelFromValue(dat.accountnumber, 'collectiondeclineviewaccountname')}  </td>
                                <td> ${formatDatexxx(dat.transactiondate.split(' ')[0])} </td>
                                <td>${formatCurrency(dat.credit)}</td>
                 </tr>
        `)
    }).join('')
    document.getElementById('collectiondeclineviewtotal').innerHTML = formatCurrency(nn)
    }

async function openCollectiondeclineviews(){
    await httpRequest('collectionsdeclineview.php');
    
    if(document.getElementById('collectiondeclineviewslocation'))document.getElementById('collectiondeclineviewslocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('collectiondeclineviewslocation'))document.getElementById('collectiondeclineviewslocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    function getpermissionsParamsgiftview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsgiftview(), 'fetchuserprofile', null, checkcollectiondeclineviewsuserstatus);
        callController('fetchallaccountsprofile.php',null, 'fetchallaccountsprofile', null, collectiondeclineviewaccountname);
        
    if(document.getElementById('collectiondeclineviewview'))document.getElementById('collectiondeclineviewview').addEventListener('click', e=>{
        function getcolparams(){
            let paramstr = new FormData;
            paramstr.append('marketer', document.getElementById('collectiondeclineviewsmarketer').value);
            paramstr.append('startdate', document.getElementById('collectiondeclineviewstartdate').value);
            paramstr.append('enddate', document.getElementById('collectiondeclineviewenddate').value); 
            return paramstr
            
        }
        callController('fetchdeclinedcollections.php', getcolparams(), 'fetchdeclinedcollections', ['collectiondeclineviewstartdate', 'collectiondeclineviewenddate'], populatecollectiondeclinesview)
    })
    
    if(document.getElementById('collectiondeclineviewcheckall'))document.getElementById('collectiondeclineviewcheckall').addEventListener('click', e=>{
        for(i=0;i<document.getElementsByName('collectiondeclinecheck').length;i++){
            document.getElementsByName('collectiondeclinecheck')[i].checked = true
        }
    })
    if(document.getElementById('collectiondeclineviewuncheckall'))document.getElementById('collectiondeclineviewuncheckall').addEventListener('click', e=>{
        for(i=0;i<document.getElementsByName('collectiondeclinecheck').length;i++){
            document.getElementsByName('collectiondeclinecheck')[i].checked = false
        }
    })
    const reloaddata=(result)=>{
        document.getElementById('collectiondeclineviewview').click()
    }
    if(document.getElementById('collectiondeclineviewdecline'))document.getElementById('collectiondeclineviewdecline').addEventListener('click', e=>{
        let chek = false;
        let chekid = []
        for(i=0;i<document.getElementsByName('collectiondeclinecheck').length;i++){
            document.getElementsByName('collectiondeclinecheck')[i].checked == false ? null : chek = true;
            document.getElementsByName('collectiondeclinecheck')[i].checked == true ? chekid.push(document.getElementsByName('collectiondeclinecheck')[i].id) : chek = true;
        }
        if(chek == false)return callModal('Nothing to decline', 0);
        function checkparams(){
            let paramstr = new FormData;
            paramstr.append('rowsize', chekid.length)
            for(i=0;i<chekid.length;i++){
                paramstr.append(`id${i+1}`, chekid[i])
            }
            return paramstr
        }
        callController('declinecollectiondeclines.php', checkparams(), 'declinecollectiondeclines', null, reloaddata)
    })
    
    if(document.getElementById('collectiondeclineviewdecline'))document.getElementById('collectiondeclineviewdecline').addEventListener('click', e=>{
        let chek = false;
        let chekid = []
        for(i=0;i<document.getElementsByName('collectiondeclinecheck').length;i++){
            document.getElementsByName('collectiondeclinecheck')[i].checked == false ? null : chek = true;
            document.getElementsByName('collectiondeclinecheck')[i].checked == true ? chekid.push(document.getElementsByName('collectiondeclinecheck')[i].id) : chek = true;
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
        callController('declinecollectiondeclines.php', checkparams(), 'declinecollectiondeclines', null, reloaddata)
    })
    

}

var collectiondeclineviews = document.getElementById('collectionsdeclineview')

if(collectiondeclineviews)collectiondeclineviews.addEventListener('click',openCollectiondeclineviews, false)






