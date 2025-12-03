const checkcollectionsuserstatus =(result)=>{
        if(document.getElementById('collectionsmarketer'))document.getElementById('collectionsmarketer').innerHTML = `<option selected value="${result.email}">${result.lastname} ${result.firstname}</option>`;
        if(document.getElementById('collectionslocation'))document.getElementById('collectionslocation').value = result.location_id;
        if(document.getElementById('collectionslocation'))document.getElementById('collectionslocation').setAttribute('readonly', true)

}

    const collectionaccountname =(result)=>{
            if(document.getElementById('collectionaccountname'))document.getElementById('collectionaccountname').innerHTML = result.data.map(dat=>{
                let namedd = `${dat.customerdetail.lastname} ${dat.customerdetail.firstname} || ${dat.accountdetail.dailyunit}`;
                return(`<option value="${dat.accountdetail.accountnumber}"> ${namedd} </option>`)
                
            })
}

const docollectionlabel =(state)=>{
    let collectionlname = getLabelFromValue(state.value, 'collectionaccountname');
    state.parentElement.parentElement.children[1].textContent = collectionlname.split('||')[0]
    state.parentElement.parentElement.children[2].textContent = collectionlname.split('||')[1]
}

const caltotalcollectioncredit =()=>{
    let colx = 0;
    for(i=0;i<document.getElementsByClassName('caltotalcollectioncredit').length;i++){
        document.getElementsByClassName('caltotalcollectioncredit')[i].value ? colx = colx+Number(document.getElementsByClassName('caltotalcollectioncredit')[i].value) : colx = colx
    }
    document.getElementById('collectiontotal').innerHTML = `&#x20A6; ${formatCurrency(colx)}`;
}

const removecollectionsrow =(state)=>{
    if(confirm('Confirm you want to delete the row')){state.parentElement.parentElement.remove()}else{return}
}

const addcollectionsrow =()=>{
    let newel = document.createElement('tr');
    newel.innerHTML =  `<td>
                                <p class="hidden">Account Number</p> <input name="collectionaccountnumber" id="${Math.random().toString(36).substring(2)}" class="orecot" placeholder="Enter Account Number" list="collectionaccountname" onchange="checkInputwithdatalist(this.id, this.list.id) ? docollectionlabel(this) : this.parentElement.parentElement.children[1].textContent = null" style="width: 97%; height: 23px;text-align: center;" /> </td>
                                <td>  </td>
                                <td>  </td>
                                <td><p class="hidden">Credit</p> <input name="collectioncreditt" type="number" placeholder="Enter Credit" onchange="caltotalcollectioncredit()" id="${Math.random().toString(36).substring(2)}" class="orecot caltotalcollectioncredit" style="width: 100px; height: 23px;text-align: center;" /> </td>
                                <td style="width: 150px"> 
                                    <button onclick="removecollectionsrow(this)" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                        </td>`
    document.getElementById('collectiontable').append(newel);
    }

async function openCollections(){
    await httpRequest('collections.php');
    
    if(document.getElementById('collectionslocation'))document.getElementById('collectionslocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('collectionslocation'))document.getElementById('collectionslocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    function getpermissionsParamsgiftview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsgiftview(), 'fetchuserprofile', null, checkcollectionsuserstatus);
        callController('fetchallaccountsprofile.php',null, 'fetchallaccountsprofile', null, collectionaccountname);
        
    if(document.getElementById('collectionsubmit'))document.getElementById('collectionsubmit').addEventListener('click', e=>{
        let checkcolinput = false;
        let orecot = getallid('orecot');
        const today = new Date();
        const day = today.getDate(); // Day of the month (1-31)
        const month = today.getMonth() + 1; // Month (0-11, so we add 1)
        const year = today.getFullYear(); // Full year (e.g., 2023)
        
        // Create a formatted date string (e.g., "2023-08-18")
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        function getcolparams(){
            let paramstr = new FormData;
            paramstr.append('marketer', document.getElementById('collectionsmarketer').value);
            paramstr.append('transactiondate', formattedDate);
            paramstr.append('location', document.getElementById('collectionslocation').value);
            for(i=0;i<document.getElementsByName('collectionaccountnumber').length;i++){
                paramstr.append(`accountnumber${i+1}`, document.getElementsByName('collectionaccountnumber')[i].value)
            }
            paramstr.append('rowsize', document.getElementsByName('collectionaccountnumber').length);
            
            for(i=0;i<document.getElementsByName('collectioncreditt').length;i++){
                paramstr.append(`credit${i+1}`, document.getElementsByName('collectioncreditt')[i].value)
            }
            return paramstr
            
        }
        callController('collectionscript.php', getcolparams(), 'collectionscript', orecot, resetPage)
    })
    

}

var collections = document.getElementById('collections')

if(collections)collections.addEventListener('click',openCollections, false)






