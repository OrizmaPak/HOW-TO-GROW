var returnvieworehistory_datasource = [];

const populatereturnviewtable=(result)=>{
    returnvieworehistory_datasource = [];
    returnvieworehistory_datasource = result.data;
    console.log('returnvieworehistory_datasource', returnvieworehistory_datasource)
    initPagination(returnvieworehistory_datasource, returnvieworehistoryorehistorysetCurrentPage);
    document.getElementById('returnview2orehistorytablecontent').innerHTML = returnvieworehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.itemname} </td>
                                <td> ${dat.model} </td>
                                <td> ${dat.itemtype} </td>
                                <td> ${dat.qtyreturned} </td>
                                <td> ${dat.unitcost} </td>
                                <td> ${dat.productvalue} </td>
                                <td> ${dat.returndate} </td>
                                <td> ${dat.servicecharge} </td>
                                <td> ${dat.reason} </td>
                                <td> ${dat.stockbalance} </td> 
                                <td> ${dat.accountname} </td>
                            </tr>`)
    }).join('')
    }
    
var returnvieworehistoryorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(returnvieworehistory_datasource.length) {
        returnvieworehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendreturnvieworehistoryorehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("returnvieworehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletestockreturnentry=(id)=>{
    const run=(result)=>{
        document.getElementById('returnviewfetchview').click();
    }
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removereturnscript.php', parammm(), 'removereturnscript', null, run)
}

function appendreturnvieworehistoryorehistoryTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("returnvieworehistorytablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${data.itemname} </td>
                                <td> ${data.model} </td>
                                <td> ${data.itemtype} </td>
                                <td> ${data.qtyreturned} </td>
                                <td> ${data.unitcost} </td>
                                <td> ${data.productvalue} </td>
                                <td> ${data.returndate} </td>
                                <td> ${data.servicecharge} </td>
                                <td> ${data.reason} </td>
                                <td> ${data.stockbalance} </td> 
                                <td> ${data.accountname} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="sessionStorage.setItem('viewreturnviewdata', ${data.id});document.getElementById('stock-return').click()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px">View</button>
                                        <button onclick="sessionStorage.setItem('editreturnviewdata', ${data.id});document.getElementById('stock-return').click()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletestockreturnentry('${data.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 

const returnviewitemlist =(result)=>{
    if(document.getElementById('returnviewitemlistelement'))document.getElementById('returnviewitemlistelement').innerHTML = `<option value="" selected>All Items</option>`
    if(document.getElementById('returnviewitemlistelement'))document.getElementById('returnviewitemlistelement').innerHTML += result.data.data.map(dat=>`<option value="${dat.itemid}">${dat.itemname}</option>`).join('')
}
const checkreturnviewuserstatus =(result)=>{
        console.log(document.getElementById('returnviewlocation'))
        if(document.getElementById('returnviewlocation'))document.getElementById('returnviewlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('returnviewlocation'))document.getElementById('returnviewlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('returnviewlocation'))document.getElementById('returnviewlocation').setAttribute('readonly', true)
    }
}

async function openstockreturnview () {
    await httpRequest('stockreturnview.php');
    
     jtabledata = document.getElementById('returnvieworehistorytablecontent');
        initializePaginationParams();
        
    callController('fetchinventoryitemscript.php',null, 'fetchinventoryitemscript', null, returnviewitemlist);
    
    if(document.getElementById('returnviewlocation'))document.getElementById('returnviewlocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('returnviewlocation'))document.getElementById('returnviewlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    
    function getpermissionsParamsreturnview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsreturnview(), 'fetchuserprofile', null, checkreturnviewuserstatus);
    
     if(document.getElementById('returnviewfetchview'))document.getElementById('returnviewfetchview').addEventListener('click', e=>{
        function getreturndata(){
            var paramstr = new FormData();
            paramstr.append('location', document.getElementById('returnviewlocation').value);
            paramstr.append('itemid', document.getElementById('returnviewitemlistelement').value);
            paramstr.append('startdate', document.getElementById('returnviewstartdate').value);
            paramstr.append('enddate', document.getElementById('returnviewenddate').value);
            return paramstr;
    };
    callController('fetchreturnscript.php', getreturndata(), 'fetchreturnscript', ['returnviewlocation', 'returnviewstartdate', 'returnviewenddate'], populatereturnviewtable);
    
    })
    
     if(document.getElementById('viewreturnexport'))document.getElementById('viewreturnexport').addEventListener('click',e=>{
            tableToExcel('returnvieworetable2', 'LIST OF RETURNS')},false);
        if(document.getElementById('viewreturnprint'))document.getElementById('viewreturnprint').addEventListener('click',e=>{
            printContent('LIST OF RETURNS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'returnvieworefulltableparant')},false);

    
}



var returnview = document.getElementById('stockreturnview')
if(returnview) returnview.addEventListener('click', openstockreturnview, false)