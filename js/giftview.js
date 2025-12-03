var giftvieworehistory_datasource = [];

const populategiftviewtable=(result)=>{
    giftvieworehistory_datasource = [];
    giftvieworehistory_datasource = result.data;
    console.log('giftvieworehistory_datasource', giftvieworehistory_datasource)
    initPagination(giftvieworehistory_datasource, giftvieworehistoryorehistorysetCurrentPage);
    document.getElementById('giftview2orehistorytablecontent').innerHTML = giftvieworehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.itemname} </td>
                                <td> ${dat.model} </td>
                                <td> ${dat.itemtype} </td>
                                <td> ${dat.qtyissued} </td>
                                <td> ${dat.unitcost} </td>
                                <td> ${dat.productvalue} </td>
                                <td> ${dat.dateissued} </td>
                                <td> ${dat.stockbalance} </td> 
                                <td> ${dat.reason} </td>
                            </tr>`)
    }).join('')
    }
    
var giftvieworehistoryorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(giftvieworehistory_datasource.length) {
        giftvieworehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendgiftvieworehistoryorehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("giftvieworehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletestockgiftentry=(id)=>{
    const run=(result)=>{
       function paramsgift(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('giftviewlocation').value);
        paramstr.append('startdate', document.getElementById('giftviewstartdate').value);
        paramstr.append('enddate', document.getElementById('giftviewenddate').value);
            return paramstr;
        };
        
        callController('fetchgiftscript.php', paramsgift(), 'fetchgiftscript', ['giftviewenddate', 'giftviewstartdate', 'giftviewlocation'], populategiftviewtable);
    }
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removegift.php', parammm(), 'removegift', null, run)
}

function appendgiftvieworehistoryorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("giftvieworehistorytablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.itemname} </td>
                                <td> ${dat.model} </td>
                                <td> ${dat.itemtype} </td>
                                <td> ${dat.qtyissued} </td>
                                <td> ${dat.unitcost} </td>
                                <td> ${dat.productvalue} </td>
                                <td> ${dat.dateissued} </td>
                                <td> ${dat.stockbalance} </td> 
                                <td> ${dat.reason} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="sessionStorage.setItem('viewgiftviewdata', ${dat.id});document.getElementById('stock-gift').click()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px">View</button>
                                        <button onclick="sessionStorage.setItem('editgiftviewdata', ${dat.id});document.getElementById('stock-gift').click()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletestockgiftentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 


const checkgiftviewuserstatus =(result)=>{
        console.log(document.getElementById('giftviewlocation'))
        if(document.getElementById('giftviewlocation'))document.getElementById('giftviewlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('giftviewlocation'))document.getElementById('giftviewlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('giftviewlocation'))document.getElementById('giftviewlocation').setAttribute('readonly', true)
    }
}



async function giftview () {
    await httpRequest('giftview.php', 'override');
    
      jtabledata = document.getElementById('giftvieworehistorytablecontent');
        initializePaginationParams();
    
    if(document.getElementById('giftviewfetchview'))document.getElementById('giftviewfetchview').addEventListener('click', e=>{
        function paramsgift(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('giftviewlocation').value);
        paramstr.append('startdate', document.getElementById('giftviewstartdate').value);
        paramstr.append('enddate', document.getElementById('giftviewenddate').value);
            return paramstr;
        };
        
        callController('fetchgiftscript.php', paramsgift(), 'fetchgiftscript', ['giftviewenddate', 'giftviewstartdate', 'giftviewlocation'], populategiftviewtable);
    })
    
    if(document.getElementById('giftviewlocation'))document.getElementById('giftviewlocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('giftviewlocation'))document.getElementById('giftviewlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    function getpermissionsParamsgiftview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsgiftview(), 'fetchuserprofile', null, checkgiftviewuserstatus);
    
      if(document.getElementById('viewgiftexport'))document.getElementById('viewgiftexport').addEventListener('click',e=>{
            tableToExcel('giftvieworetable2', 'LIST OF RETURNS')},false);
        if(document.getElementById('viewgiftprint'))document.getElementById('viewgiftprint').addEventListener('click',e=>{
            printContent('LIST OF RETURNS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'giftvieworefulltableparant')},false);


}

var giftviewNav = document.getElementById("giftview");
if (giftviewNav) giftviewNav.addEventListener("click", giftview, false);
