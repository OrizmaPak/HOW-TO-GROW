let cashierlimitid;
let cashierlimituserdata;
var cashierlimitorehistory_datasource = [];

const populatecashierlimittable=(result)=>{
    cashierlimitorehistory_datasource = [];
    cashierlimitorehistory_datasource = result.data;
    console.log('cashierlimitorehistory_datasource', cashierlimitorehistory_datasource)
    initPagination(cashierlimitorehistory_datasource, cashierlimitsetCurrentPage);
    // document.getElementById('cashierlimittablecontent2').innerHTML = cashierlimitorehistory_datasource.map((dat, index)=>{
    //     return(`<tr data-open="false" class="source-row-item">
    //                             <td> ${index+1} </td>
    //                             <td> ${getLocationById(dat.location)} </td>
    //                             <td> ${getthegroup(dat.groupid, 'cashierlimitgroup')} </td>
    //                             <td> ${dat.target} </td>
    //                             <td> ${dat.startperiod} </td>
    //                             <td> ${dat.endperiod} </td>
    //                         </tr>`)
    // }).join('')
    }
    
var cashierlimitsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(cashierlimitorehistory_datasource.length) {
        cashierlimitorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                cashierlimittablerowTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("cashierlimittablecontent").innerHTML=  renderNoTableData()
    }
};

const deletecashierlimitentry=(id)=>{
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('cashier', id);
        return paramstr;
    };
    callController('removecashierlimit.php', parammm(), 'removecashierlimit', null, resetPage)
}

const editcashierlimit=(id, cashier, depositlimit, withdrawallimit)=>{
    cashierlimitid = id;
    document.getElementById('cashierlimitcashier').value = cashier;
    document.getElementById('cashierlimitdepositlimit').value = depositlimit;
    document.getElementById('cashierlimitwithdrawallimit').value = withdrawallimit;
    document.getElementById('cashierlimitcashiername').value = getLabelFromValue(cashier, 'cashieruserlist');
    document.getElementById('cashierlimitsubmitbtn').textContent = 'Update'
}

function cashierlimittablerowTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("cashierlimittablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLabelFromValue(dat.cashier, 'cashieruserlist').split(' ')[1]} </td>
                                <td> ${getLabelFromValue(dat.cashier, 'cashieruserlist').split(' ')[0]} </td>
                                <td> ${dat.cashier} </td>
                                <td> ${dat.depositlimit} </td>
                                <td> ${dat.withdrawallimit} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="editcashierlimit('${dat.id}', '${dat.cashier}', '${dat.depositlimit}', '${dat.withdrawallimit}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletecashierlimitentry('${dat.cashier}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 

const checkcashierlimituserstatus =(result)=>{
        console.log(document.getElementById('cashierlimitlocation'))
        if(document.getElementById('cashierlimitlocation'))document.getElementById('cashierlimitlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('cashierlimitlocation'))document.getElementById('cashierlimitlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('cashierlimitlocation'))document.getElementById('cashierlimitlocation').setAttribute('readonly', true)
    }
}

const checkcashieremail=(value)=>{
    if(checkInputwithdatalist("cashierlimitcashier", "cashieruserlist")){
        document.getElementById('cashierlimitcashiername').value = getLabelFromValue(value, 'cashieruserlist')
    }else{
        document.getElementById('cashierlimitcashiername').value = ''
    }
}


async function opencashierlimit(){

await httpRequest('cashierlimit.php')

jtabledata = document.getElementById('cashierlimittablecontent');
        initializePaginationParams();

cashierlimitid = ''


    function getpermissionsParamsreturnview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsreturnview(), 'fetchuserprofile', null, checkcashierlimituserstatus);
    
    const popuser =(result)=>{
        cashierlimituserdata = result.data;
        if(document.getElementById('cashieruserlist'))document.getElementById('cashieruserlist').innerHTML = `<option value="" selected disabled>Select Marketer</option>`
        if(document.getElementById('cashieruserlist'))document.getElementById('cashieruserlist').innerHTML += result.data.map(dat=>`<option value="${dat.email}">${dat.lastname} ${dat.firstname}</option>`).join('');
    callController('fetchcashierlimit.php', null, 'fetchcashierlimit', null, populatecashierlimittable)
    }
    getUsers(popuser)
    
    if(document.getElementById('cashierlimitsubmitbtn'))document.getElementById('cashierlimitsubmitbtn').addEventListener('click', e=>{
        function gtparams(){
        var paramstr = new FormData();
        if(cashierlimitid)paramstr.append('id', cashierlimitid);
        paramstr.append('cashier', document.getElementById('cashierlimitcashier').value);
        paramstr.append('depositlimit', document.getElementById('cashierlimitdepositlimit').value);
        paramstr.append('withdrawallimit', document.getElementById('cashierlimitwithdrawallimit').value);
            return paramstr;
        };
        callController('cashierlimitscript.php', gtparams(), 'Cashierlimitscript', ['cashierlimitcashier', 'cashierlimitdepositlimit', 'cashierlimitwithdrawallimit'], resetPage)
        
    })
    
    
    
}


var cashierlimit = document.getElementById("cashierlimit")
if(cashierlimit)cashierlimit.addEventListener('click',opencashierlimit,false)






