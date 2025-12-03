var viewtaskscheduleorehistory_datasource = [];

const populateviewtaskscheduletable=(result)=>{
    viewtaskscheduleorehistory_datasource = [];
    if(!result.data)return callModal('No Task to display')
    viewtaskscheduleorehistory_datasource = result.data;
    console.log('viewtaskscheduleorehistory_datasource', viewtaskscheduleorehistory_datasource)
    initPagination(viewtaskscheduleorehistory_datasource, viewtaskscheduleorehistoryorehistorysetCurrentPage);
    document.getElementById('viewtaskschedule2orehistorytablecontent').innerHTML = viewtaskscheduleorehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLocationById(dat.location)} </td>
                                <td> ${dat.entrydate.split(' ')[0]} </td>
                                <td> ${dat.deliverydate.split(' ')[0]} </td>
                                <td> ${dat.task} </td>
                            </tr>`)
    }).join('')
    }
    
var viewtaskscheduleorehistoryorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewtaskscheduleorehistory_datasource.length) {
        viewtaskscheduleorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewtaskscheduleorehistoryorehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("viewtaskscheduleorehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletestocktaskscheduleentry=(id)=>{
    const run=(result)=>{
       function paramstaskschedule(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('viewtaskschedulelocation').value);
        paramstr.append('startdate', document.getElementById('viewtaskschedulestartdate').value);
        paramstr.append('enddate', document.getElementById('viewtaskscheduleenddate').value);
            return paramstr;
        };
        
        callController('fetchtaskschedule.php', paramstaskschedule(), 'fetchtaskschedule', ['viewtaskscheduleenddate', 'viewtaskschedulestartdate', 'viewtaskschedulelocation'], populateviewtaskscheduletable);
    }
    if (confirm("Are you sure you want to delete?")) {
        function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removetaskschedule.php', parammm(), 'removetaskschedule', null, run)
} else {
    return
}

    
}

function appendviewtaskscheduleorehistoryorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("viewtaskscheduleorehistorytablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLocationById(dat.location)} </td>
                                <td> ${dat.entrydate.split(' ')[0]} </td>
                                <td> ${dat.deliverydate.split(' ')[0]} </td>
                                <td> ${dat.task} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="sessionStorage.setItem('editviewtaskscheduledata', '${dat.id}, ${dat.location}');document.getElementById('scheduleroster').click()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletestocktaskscheduleentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 


const checkviewtaskscheduleuserstatus =(result)=>{
        console.log(document.getElementById('viewtaskschedulelocation'))
        if(document.getElementById('viewtaskschedulelocation'))document.getElementById('viewtaskschedulelocation').value = result.location_id;
    // if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
    //     if(document.getElementById('viewtaskschedulelocation'))document.getElementById('viewtaskschedulelocation').setAttribute('readonly', false);
    // }else{
        // if(document.getElementById('viewtaskschedulelocation'))document.getElementById('viewtaskschedulelocation').setAttribute('readonly', true)
    // }
}



async function openviewtaskschedule () {
    await httpRequest('viewscheduleroster.php', 'override');
    
      jtabledata = document.getElementById('viewtaskscheduleorehistorytablecontent');
        initializePaginationParams();
    
    if(document.getElementById('viewtaskschedulefetchview'))document.getElementById('viewtaskschedulefetchview').addEventListener('click', e=>{
        function paramstaskschedule(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('viewtaskschedulelocation').value);
        paramstr.append('startdate', document.getElementById('viewtaskschedulestartdate').value);
        paramstr.append('enddate', document.getElementById('viewtaskscheduleenddate').value);
            return paramstr;
        };
        
        callController('fetchtaskschedule.php', paramstaskschedule(), 'fetchtaskschedule', ['viewtaskscheduleenddate', 'viewtaskschedulestartdate', 'viewtaskschedulelocation'], populateviewtaskscheduletable);
    })
    
    if(document.getElementById('viewtaskschedulelocation'))document.getElementById('viewtaskschedulelocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('viewtaskschedulelocation'))document.getElementById('viewtaskschedulelocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    function getpermissionsParamsviewtaskschedule(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsviewtaskschedule(), 'fetchuserprofile', null, checkviewtaskscheduleuserstatus);
    
      if(document.getElementById('viewtaskscheduleexport'))document.getElementById('viewtaskscheduleexport').addEventListener('click',e=>{
            tableToExcel('viewtaskscheduleoretable2', 'LIST OF RETURNS')},false);
        if(document.getElementById('viewtaskscheduleprint'))document.getElementById('viewtaskscheduleprint').addEventListener('click',e=>{
            printContent('LIST OF RETURNS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewtaskscheduleorefulltableparant')},false);


}

var viewtaskscheduleNav = document.getElementById("viewscheduleroster");
if (viewtaskscheduleNav) viewtaskscheduleNav.addEventListener("click", openviewtaskschedule, false);
