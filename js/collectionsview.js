const fillupcollection =(result)=>{
    if(document.getElementById('collectionviewsmarketer'))document.getElementById('collectionviewsmarketer').innerHTML = `<option selected value=""></option>`;
    if(document.getElementById('collectionviewsmarketer'))document.getElementById('collectionviewsmarketer').innerHTML += result.data.map(dat=>{
        return(`<option value="${dat.email}">${dat.lastname} ${dat.firstname}</option>`)
    }).join('')
}
const checkcollectionviewsuserstatus =(result)=>{
        // if(document.getElementById('collectionviewsmarketer'))document.getElementById('collectionviewsmarketer').innerHTML = `<option selected value="${result.email}">${result.lastname} ${result.firstname}</option>`;
        if(document.getElementById('collectionviewslocation'))document.getElementById('collectionviewslocation').value = result.location_id;
        if(document.getElementById('collectionviewslocation'))document.getElementById('collectionviewslocation').setAttribute('readonly', true)

}

    const collectionviewaccountname =(result)=>{
            if(document.getElementById('collectionviewaccountname'))document.getElementById('collectionviewaccountname').innerHTML = result.data.map(dat=>{
                let namedd = `${dat.customerdetail.lastname} ${dat.customerdetail.firstname} || ${dat.accountdetail.dailyunit}`
                return `<option value="${dat.accountdetail.accountnumber}">${namedd}</option>`
                
            }
                ).join('')
}

// const docollectionviewlabel =(state)=>{
//     let collectionviewlname = getLabelFromValue(state.value, 'collectionviewaccountname');
//     state.parentElement.parentElement.children[1].textContent = collectionviewlname
// }

// const caltotalcollectionviewcredit =()=>{
//     let colx = 0;
//     for(i=0;i<document.getElementsByClassName('caltotalcollectionviewcredit').length;i++){
//         document.getElementsByClassName('caltotalcollectionviewcredit')[i].value ? colx = colx+Number(document.getElementsByClassName('caltotalcollectionviewcredit')[i].value) : colx = colx
//     }
//     document.getElementById('collectionviewtotal').innerHTML = `&#x20A6; ${formatCurrency(colx)}`;
// }

// const removecollectionviewsrow =(state)=>{
//     if(confirm('Confirm you want to delete the row')){state.parentElement.parentElement.remove()}else{return}
// }
function formatDatexx(inputDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(inputDate);
  return date.toLocaleDateString(undefined, options);
}
const openediter =(id, marketer, transactiondate, location)=>{
    if(document.getElementById(`editorsave_${id}`).textContent == 'Edit'){
        for(i=0;i<document.getElementsByName(`showcv_${id}`).length;i++){
            document.getElementsByName(`showcv_${id}`)[i].classList.add('hidden')
            document.getElementsByName(`editcv_${id}`)[i].classList.remove('hidden')
        }
        document.getElementById(`editorsave_${id}`).textContent = 'Save';
        document.getElementById(`editorsave_${id}`).style.backgroundColor = 'green'
        return
    }
    if(document.getElementById(`editorsave_${id}`).textContent == 'Save'){
        function getmeparamcv(){
            let paramstr = new FormData();
            paramstr.append('id', id)
            paramstr.append('marketer', marketer);
            paramstr.append('transactiondate', transactiondate);
            paramstr.append('location', location);
                paramstr.append(`accountnumber`, document.getElementById(`accountnumber_${id}`).value)
                paramstr.append(`credit`, document.getElementById(`credit_${id}`).value)
            return paramstr
            
        }
        function takecvaction(){
            document.getElementById('collectionviewview').click();
        }
        callController('editcollection.php', getmeparamcv(), 'editcollection', [`accountnumber_${id}`, `credit_${id}`], takecvaction)
        return
    }
}
const docollectionlabelview =(state)=>{
    let collectionlname = getLabelFromValue(state.value, 'collectionviewaccountname');
    state.parentElement.parentElement.parentElement.children[2].children[1].children[0].value = collectionlname.split('||')[0]
    state.parentElement.parentElement.parentElement.children[3].children[1].children[0].value = collectionlname.split('||')[1]
}
const collectionviewdeletion =(id, name)=>{
    function getmeparamcv(){
            let paramstr = new FormData();
            paramstr.append('id', id)
            return paramstr
            
        }
        function takecvaction(){
            document.getElementById('collectionviewview').click();
        }
        if (confirm(`Are you sure you want to delete collection for ${name}?`)) {
            callController('removecollection.php', getmeparamcv(), 'removecollection', [`accountnumber_${id}`, `credit_${id}`], takecvaction)
        } else {
            return                
        }

}
const populatecollectionsview =(result)=>{
        let nn = 0;
    document.getElementById('collectionviewtable').innerHTML = result.data.map(dat=>{
        nn = Number(dat.credit) + nn
        return(`
                 <tr>
                    <td>
                        <input id="${dat.id}" name="collectioncheck" type="checkbox"/>
                    </td>
                    <td>
                        <span name="showcv_${dat.id}">${dat.accountnumber}</span>
                        <span name="editcv_${dat.id}" class="hidden">
                            <input 
                                onchange="this.parentElement.parentElement.parentElement.children[3].children[1].children[0].value = null;checkInputwithdatalist(this.id, this.list.id) ? docollectionlabelview(this) : this.parentElement.parentElement.parentElement.children[2].children[1].children[0].value = null;"
                                list="collectionviewaccountname" style="height:30px;border-radius:7px" id="accountnumber_${dat.id}" value="${dat.accountnumber}" name="collectioncheck" type="text"/>
                        </span>
                    </td>
                    <td>
                        <div name="showcv_${dat.id}">
                            ${getLabelFromValue(dat.accountnumber, 'collectionviewaccountname').split('||')[0]}
                        </div>
                        <div name="editcv_${dat.id}" class="hidden">
                            <input style="height:30px;border-radius:7px" disabled id="accountname_${dat.id}" value="${getLabelFromValue(dat.accountnumber, 'collectionviewaccountname').split('||')[0]}" name="collectioncheck" type="text"/>
                        </div>
                    </td>
                    <td>
                        <span name="showcv_${dat.id}">
                            ${getLabelFromValue(dat.accountnumber, 'collectionviewaccountname').split('||')[1]}
                        </span>
                        <span name="editcv_${dat.id}" class="hidden">
                            <input style="height:30px;border-radius:7px" disabled id="dailyunit_${dat.id}" value="${getLabelFromValue(dat.accountnumber, 'collectionviewaccountname').split('||')[1]}" name="collectioncheck" type="text"/>
                        </span>
                    </td>
                    <td> 
                        ${formatDatexx(dat.transactiondate.split(' ')[0])}
                    </td>
                    <td>
                        <span name="showcv_${dat.id}">
                            ${formatCurrency(dat.credit)}
                        </span>
                        <span name="editcv_${dat.id}" class="hidden">
                            <input style="height:30px;border-radius:7px" id="credit_${dat.id}" value="${dat.credit}" name="collectioncheck" type="text"/>
                        </span>
                    </td>
                    <td>
                        <div class="flex" style="align-items:center">
                            <button onclick="openediter('${dat.id}', '${dat.marketer}', '${dat.transactiondate}', '${dat.location}')" id="editorsave_${dat.id}" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                            <button id="delete_${dat.id}" onclick="collectionviewdeletion('${dat.id}', '${getLabelFromValue(dat.accountnumber, 'collectionviewaccountname').split('||')[0]}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                        </div>
                    </td>
                 </tr>
        `)
    }).join('')
    document.getElementById('collectionviewtotal').innerHTML = formatCurrency(nn)
    }

async function openCollectionviews(){
    await httpRequest('collectionsview.php');
    
    getUsers(fillupcollection)
    
    if(document.getElementById('collectionviewslocation'))document.getElementById('collectionviewslocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('collectionviewslocation'))document.getElementById('collectionviewslocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    function getpermissionsParamsgiftview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsgiftview(), 'fetchuserprofile', null, checkcollectionviewsuserstatus);
        callController('fetchallaccountsprofile.php',null, 'fetchallaccountsprofile', null, collectionviewaccountname);
        
    if(document.getElementById('collectionviewview'))document.getElementById('collectionviewview').addEventListener('click', e=>{
        function getcolparams(){
            let paramstr = new FormData;
            paramstr.append('marketer', document.getElementById('collectionviewsmarketer').value);
            paramstr.append('startdate', document.getElementById('collectionviewstartdate').value);
            paramstr.append('enddate', document.getElementById('collectionviewenddate').value); 
            return paramstr
            
        }
        callController('fetchcollections.php', getcolparams(), 'fetchcollections', ['collectionviewstartdate', 'collectionviewenddate'], populatecollectionsview)
    })
    
    if(document.getElementById('collectionviewcheckall'))document.getElementById('collectionviewcheckall').addEventListener('click', e=>{
        for(i=0;i<document.getElementsByName('collectioncheck').length;i++){
            document.getElementsByName('collectioncheck')[i].checked = true
        }
    })
    if(document.getElementById('collectionviewuncheckall'))document.getElementById('collectionviewuncheckall').addEventListener('click', e=>{
        for(i=0;i<document.getElementsByName('collectioncheck').length;i++){
            document.getElementsByName('collectioncheck')[i].checked = false
        }
    })
    const reloaddata=(result)=>{
        document.getElementById('collectionviewview').click()
    }
    if(document.getElementById('collectionviewapprove'))document.getElementById('collectionviewapprove').addEventListener('click', e=>{
        let chek = false;
        let chekid = []
        for(i=0;i<document.getElementsByName('collectioncheck').length;i++){
            document.getElementsByName('collectioncheck')[i].checked == false ? null : chek = true;
            document.getElementsByName('collectioncheck')[i].checked == true ? chekid.push(document.getElementsByName('collectioncheck')[i].id) : chek = true;
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
        callController('approvecollections.php', checkparams(), 'approvecollections', null, reloaddata)
    })
    
    if(document.getElementById('collectionviewdecline'))document.getElementById('collectionviewdecline').addEventListener('click', e=>{
        let chek = false;
        let chekid = []
        for(i=0;i<document.getElementsByName('collectioncheck').length;i++){
            document.getElementsByName('collectioncheck')[i].checked == false ? null : chek = true;
            document.getElementsByName('collectioncheck')[i].checked == true ? chekid.push(document.getElementsByName('collectioncheck')[i].id) : chek = true;
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
        callController('declinecollections.php', checkparams(), 'declinecollections', null, reloaddata)
    })
    

}

var collectionviews = document.getElementById('collectionsview')

if(collectionviews)collectionviews.addEventListener('click',openCollectionviews, false)






