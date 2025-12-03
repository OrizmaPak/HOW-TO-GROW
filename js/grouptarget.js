let grouptargetid;
var grouptargetorehistory_datasource = [];

const populategrouptargettable=(result)=>{
    grouptargetorehistory_datasource = [];
    grouptargetorehistory_datasource = result.data;
    console.log('grouptargetorehistory_datasource', grouptargetorehistory_datasource)
    initPagination(grouptargetorehistory_datasource, grouptargetsetCurrentPage);
    document.getElementById('grouptargettablecontent2').innerHTML = grouptargetorehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLocationById(dat.location)} </td>
                                <td> ${getthegroup(dat.groupid, 'grouptargetgroup')} </td>
                                <td> ${dat.target} </td>
                                <td> ${dat.startperiod} </td>
                                <td> ${dat.endperiod} </td>
                            </tr>`)
    }).join('')
    }
    
var grouptargetsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(grouptargetorehistory_datasource.length) {
        grouptargetorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                gruoptablerowTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("returnvieworehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletegrouptargetentry=(id)=>{
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removegrouptarget.php', parammm(), 'removegrouptarget', null, resetPage)
}

const editgrouptarget=(id, location, group, target, startperiod, endperiod)=>{
    grouptargetid = id;
    document.getElementById('grouptargetlocation').value = location;
    document.getElementById('grouptargettarget').value = target;
    document.getElementById('grouptargetstartdate').value = startperiod;
    document.getElementById('grouptargetenddate').value = endperiod;
    document.getElementById('grouptargetgroup').value = group;
    document.getElementById('grouptargetsubmitbtn').textContent = 'Update'
}

function gruoptablerowTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("grouptargettablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLocationById(dat.location)} </td>
                                <td> ${getthegroup(dat.groupid, 'grouptargetgroup')} </td>
                                <td> ${dat.target} </td>
                                <td> ${dat.startperiod} </td>
                                <td> ${dat.endperiod} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="editgrouptarget(${dat.id}, ${dat.location}, ${dat.groupid}, ${dat.target}, '${dat.startperiod}', '${dat.endperiod}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletegrouptargetentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 

const checkgrouptargetuserstatus =(result)=>{
        console.log(document.getElementById('grouptargetlocation'))
        if(document.getElementById('grouptargetlocation'))document.getElementById('grouptargetlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('grouptargetlocation'))document.getElementById('grouptargetlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('grouptargetlocation'))document.getElementById('grouptargetlocation').setAttribute('readonly', true)
    }
}


async function opengroupTarget(){

await httpRequest('grouptarget.php')

jtabledata = document.getElementById('grouptargettablecontent');
        initializePaginationParams();

grouptargetid = ''


    if(document.getElementById('grouptargetlocation'))document.getElementById('grouptargetlocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('grouptargetlocation'))document.getElementById('grouptargetlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    function getpermissionsParamsreturnview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsreturnview(), 'fetchuserprofile', null, checkgrouptargetuserstatus);
    
    // const popuser =(result)=>{
    //     if(document.getElementById('grouptargetusers'))document.getElementById('grouptargetusers').innerHTML = `<option value="" selected disabled>Select Marketer</option>`
    //     if(document.getElementById('grouptargetusers'))document.getElementById('grouptargetusers').innerHTML += result.data.map(dat=>`<option value="${dat.email}">${dat.lastname} ${dat.firstname}</option>`).join('');
    // }
    // getUsers(popuser)
    const popgroup =(result)=>{
        if(document.getElementById('grouptargetgroup'))document.getElementById('grouptargetgroup').innerHTML = `<option value="" selected disabled>Select Group</option>`
        if(document.getElementById('grouptargetgroup'))document.getElementById('grouptargetgroup').innerHTML += result.data.data.map(dat=>`<option value="${dat.id}"> ${dat.groupname.toUpperCase()} </option>`).join('');
    }
    getGroup(popgroup)
    
    if(document.getElementById('grouptargetsubmitbtn'))document.getElementById('grouptargetsubmitbtn').addEventListener('click', e=>{
        function gtparams(){
        var paramstr = new FormData();
        if(grouptargetid)paramstr.append('id', grouptargetid);
        paramstr.append('location', document.getElementById('grouptargetlocation').value);
        paramstr.append('target', document.getElementById('grouptargettarget').value);
        paramstr.append('startperiod', document.getElementById('grouptargetstartdate').value);
        paramstr.append('endperiod', document.getElementById('grouptargetenddate').value);
        paramstr.append('groupid', document.getElementById('grouptargetgroup').value);
            return paramstr;
        };
        callController('grouptargetscript.php', gtparams(), 'grouptargetscript', ['grouptargetlocation', 'grouptargettarget', 'grouptargetstartdate', 'grouptargetenddate', 'grouptargetgroup'], resetPage)
        
    })
    
    setTimeout(()=>{
    callController('fetchgroupptarget.php', null, 'fetchgroupptarget', null, populategrouptargettable)
        
    },2000)
    
    if(document.getElementById('grouptargetexport'))document.getElementById('grouptargetexport').addEventListener('click',e=>{
            tableToExcel('grouptargetoretable2', 'LIST OF GROUP TARGET')},false);
        if(document.getElementById('grouptargetprint'))document.getElementById('grouptargetprint').addEventListener('click',e=>{
            printContent('LIST OF GROUP TARGET',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'grouptargetorefulltableparant')},false);

}


var groupTarget = document.getElementById("grouptarget")
if(groupTarget)groupTarget.addEventListener('click',opengroupTarget,false)






