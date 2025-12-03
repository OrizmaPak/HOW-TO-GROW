var viewbranchfundtransferorehistory_datasource = [];

const populateviewbranchfundtransfertable=(result)=>{
    viewbranchfundtransferorehistory_datasource = [];
    viewbranchfundtransferorehistory_datasource = result.data;
    console.log('viewbranchfundtransferorehistory_datasource', viewbranchfundtransferorehistory_datasource)
    initPagination(viewbranchfundtransferorehistory_datasource, viewbranchfundtransferorehistoryorehistorysetCurrentPage);
    document.getElementById('viewbranchfundtransfer2orehistorytablecontent').innerHTML = viewbranchfundtransferorehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLabelFromValue(dat.accountnumber,'viewbranchfundtransferaccounts')} </td>
                                <td> ${dat.accountnumber} </td>
                                <td> ${dat.accountofficer} </td>
                                <td> ${formatCurrency(dat.credittotal)} </td>
                                <td> ${formatCurrency(dat.debittotal)} </td>
                                <td> ${getLocationById(dat.location)} </td> 
                                <td> ${dat.transactiondate.split(' ')[0]} </td>
                                <td> ${dat.reference} </td>
                            </tr>`)
    }).join('')
    }
    
var viewbranchfundtransferorehistoryorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewbranchfundtransferorehistory_datasource.length) {
        viewbranchfundtransferorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewbranchfundtransferorehistoryorehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("viewbranchfundtransferorehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletestockviewbranchfundtransferentry=(id)=>{
    const run=(result)=>{
       function paramsviewbranchfundtransfer(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('viewbranchfundtransferlocation').value);
        paramstr.append('startdate', document.getElementById('viewbranchfundtransferstartdate').value);
        paramstr.append('enddate', document.getElementById('viewbranchfundtransferenddate').value);
            return paramstr;
        };
        
        callController('fetchviewbranchfundtransferscript.php', paramsviewbranchfundtransfer(), 'fetchviewbranchfundtransferscript', ['viewbranchfundtransferenddate', 'viewbranchfundtransferstartdate', 'viewbranchfundtransferlocation'], populateviewbranchfundtransfertable);
    }
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removeviewbranchfundtransfer.php', parammm(), 'removeviewbranchfundtransfer', null, run)
}

function appendviewbranchfundtransferorehistoryorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("viewbranchfundtransferorehistorytablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLabelFromValue(dat.accountnumber,'viewbranchfundtransferaccounts')} </td>
                                <td> ${dat.accountnumber} </td>
                                <td> ${dat.accountofficer} </td>
                                <td> ${dat.transactiondate.split(' ')[0]} </td>
                                <td> ${formatCurrency(dat.credittotal)} </td>
                                <td> ${formatCurrency(dat.debittotal)} </td>
                                <td> ${getLocationById(dat.location)} </td> 
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button class="hidden" onclick="sessionStorage.setItem('editviewbranchfundtransferdata', '${dat.id} ${dat.location}');document.getElementById('branchfundtransfer').click()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletestockviewbranchfundtransferentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 


const checkviewbranchfundtransferuserstatus =(result)=>{
        console.log(document.getElementById('viewbranchfundtransferlocation'))
        if(document.getElementById('viewbranchfundtransferlocation'))document.getElementById('viewbranchfundtransferlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('viewbranchfundtransferlocation'))document.getElementById('viewbranchfundtransferlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('viewbranchfundtransferlocation'))document.getElementById('viewbranchfundtransferlocation').setAttribute('readonly', true)
    }
}

const viewbranchfundtransferaccounts =(result)=>{
    if(document.getElementById('branchfundtransferaccounts'))document.getElementById('branchfundtransferaccounts').innerHTML = result.data.map(dat=>`<option value="${dat.accountnumber}">${dat.accountnumber}</option>`)
}

const accountnumberviewbranchfundtransfer =(result)=>{
        if(document.getElementById('viewbranchfundtransferaccounts'))document.getElementById('viewbranchfundtransferaccounts').innerHTML = result.data.map(dat=>{
            let namedd = `${dat.customerdetail.lastname} ${dat.customerdetail.firstname}`;
            return(`<option value="${dat.accountdetail.accountnumber}"> ${namedd} </option>`)
            
        })
}

async function viewbranchfundtransfer () {
    await httpRequest('viewbranchfundtransfer.php', 'override');
    
    callController('fetchallaccountsprofile.php',null, 'fetchallaccountsprofile', null, accountnumberviewbranchfundtransfer);
    
      jtabledata = document.getElementById('viewbranchfundtransferorehistorytablecontent');
        initializePaginationParams();
    
    if(document.getElementById('viewbranchfundtransferfetchview'))document.getElementById('viewbranchfundtransferfetchview').addEventListener('click', e=>{
        function paramsviewbranchfundtransfer(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('viewbranchfundtransferlocation').value);
        paramstr.append('startdate', document.getElementById('viewbranchfundtransferstartdate').value);
        paramstr.append('enddate', document.getElementById('viewbranchfundtransferenddate').value);
            return paramstr;
        };
        
        callController('fetchbranchfundtransfer.php', paramsviewbranchfundtransfer(), 'fetchbranchfundtransfer', ['viewbranchfundtransferenddate', 'viewbranchfundtransferstartdate', 'viewbranchfundtransferlocation'], populateviewbranchfundtransfertable);
    })
    
    if(document.getElementById('viewbranchfundtransferlocation'))document.getElementById('viewbranchfundtransferlocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('viewbranchfundtransferlocation'))document.getElementById('viewbranchfundtransferlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    function getpermissionsParamsviewbranchfundtransfer(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsviewbranchfundtransfer(), 'fetchuserprofile', null, checkviewbranchfundtransferuserstatus);
    
      if(document.getElementById('viewviewbranchfundtransferexport'))document.getElementById('viewviewbranchfundtransferexport').addEventListener('click',e=>{
            tableToExcel('viewbranchfundtransferoretable2', 'LIST OF RETURNS')},false);
        if(document.getElementById('viewviewbranchfundtransferprint'))document.getElementById('viewviewbranchfundtransferprint').addEventListener('click',e=>{
            printContent('LIST OF RETURNS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewbranchfundtransferorefulltableparant')},false);


}

var viewbranchfundtransferNav = document.getElementById("viewbranchfundtransfer");
if (viewbranchfundtransferNav) viewbranchfundtransferNav.addEventListener("click", viewbranchfundtransfer, false);
