let marketerstargetid;
var marketerstargetorehistory_datasource = [];

const populatemarketerstargettable=(result)=>{
    marketerstargetorehistory_datasource = [];
    marketerstargetorehistory_datasource = result.data.data;
    console.log('marketerstargetorehistory_datasource', marketerstargetorehistory_datasource)
    initPagination(marketerstargetorehistory_datasource, marketerstargetsetCurrentPage);
    document.getElementById('marketerstargettablecontent2').innerHTML = marketerstargetorehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLocationById(dat.location)} </td>
                                <td> ${getthegroup(dat.groupid, 'marketerstargetmarketers')} </td>
                                <td> ${dat.target} </td>
                                <td> ${dat.startperiod} </td>
                                <td> ${dat.endperiod} </td>
                            </tr>`)
    }).join('')
    }
    
var marketerstargetsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(marketerstargetorehistory_datasource.length) {
        marketerstargetorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                markettablerowTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("returnvieworehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletemarketerstargetentry=(id)=>{
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removemarketertarget.php', parammm(), 'removemarketertarget', null, resetPage)
}

const editmarketerstarget=(id, location, marketers, target, startperiod, endperiod)=>{
    marketerstargetid = id;
    document.getElementById('marketerstargetlocation').value = location;
    document.getElementById('marketerstargettarget').value = target;
    document.getElementById('marketerstargetstartdate').value = startperiod;
    document.getElementById('marketerstargetenddate').value = endperiod;
    document.getElementById('marketerstargetmarketers').value = marketers;
    document.getElementById('marketerstargetsubmitbtn').textContent = 'Update'
}

function markettablerowTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("marketerstargettablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLocationById(dat.location)} </td>
                                <td> ${getthegroup(dat.groupid, 'marketerstargetmarketers')} </td>
                                <td> ${dat.target} </td>
                                <td> ${dat.startperiod} </td>
                                <td> ${dat.endperiod} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="editmarketerstarget(${dat.id}, ${dat.location}, ${dat.groupid}, ${dat.target}, '${dat.startperiod}', '${dat.endperiod}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletemarketerstargetentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 

const checkmarketerstargetuserstatus =(result)=>{
        console.log(document.getElementById('marketerstargetlocation'))
        if(document.getElementById('marketerstargetlocation'))document.getElementById('marketerstargetlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('marketerstargetlocation'))document.getElementById('marketerstargetlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('marketerstargetlocation'))document.getElementById('marketerstargetlocation').setAttribute('readonly', true)
    }
}


async function openmarketersTarget(){

await httpRequest('marketerstarget.php')

jtabledata = document.getElementById('marketerstargettablecontent');
        initializePaginationParams();

marketerstargetid = ''


    if(document.getElementById('marketerstargetlocation'))document.getElementById('marketerstargetlocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('marketerstargetlocation'))document.getElementById('marketerstargetlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    function getpermissionsParamsreturnview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsreturnview(), 'fetchuserprofile', null, checkmarketerstargetuserstatus);
    
    // const popuser =(result)=>{
    //     if(document.getElementById('marketerstargetusers'))document.getElementById('marketerstargetusers').innerHTML = `<option value="" selected disabled>Select Marketer</option>`
    //     if(document.getElementById('marketerstargetusers'))document.getElementById('marketerstargetusers').innerHTML += result.data.map(dat=>`<option value="${dat.email}">${dat.lastname} ${dat.firstname}</option>`).join('');
    // }
    // getUsers(popuser)
    const popmarketers =(result)=>{
        if(document.getElementById('marketerstargetmarketers'))document.getElementById('marketerstargetmarketers').innerHTML = `<option value="" selected disabled>Select Group</option>`
        if(document.getElementById('marketerstargetmarketers'))document.getElementById('marketerstargetmarketers').innerHTML += result.data.data.map(dat=>`<option value="${dat.id}"> ${dat.groupname.toUpperCase()} </option>`).join('');
    }
    getGroup(popmarketers)
    
    if(document.getElementById('marketerstargetsubmitbtn'))document.getElementById('marketerstargetsubmitbtn').addEventListener('click', e=>{
        function gtparams(){
        var paramstr = new FormData();
        if(marketerstargetid)paramstr.append('id', marketerstargetid);
        paramstr.append('location', document.getElementById('marketerstargetlocation').value);
        paramstr.append('target', document.getElementById('marketerstargettarget').value);
        paramstr.append('startperiod', document.getElementById('marketerstargetstartdate').value);
        paramstr.append('endperiod', document.getElementById('marketerstargetenddate').value);
        paramstr.append('groupid', document.getElementById('marketerstargetmarketers').value);
            return paramstr;
        };
        callController('marketerstargetscript.php', gtparams(), 'marketerstargetscript', ['marketerstargetlocation', 'marketerstargettarget', 'marketerstargetstartdate', 'marketerstargetenddate', 'marketerstargetmarketers'], resetPage)
        
    })
    
    setTimeout(()=>{
    callController('fetchmarketertarget.php', null, 'fetchmarketerstarget', null, populatemarketerstargettable)
        
    },2000)
    
    if(document.getElementById('marketerstargetexport'))document.getElementById('marketerstargetexport').addEventListener('click',e=>{
            tableToExcel('marketerstargetoretable2', 'LIST OF MARKETERS TARGET')},false);
        if(document.getElementById('marketerstargetprint'))document.getElementById('marketerstargetprint').addEventListener('click',e=>{
            printContent('LIST OF MARKETERS TARGET',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'marketerstargetorefulltableparant')},false);

}


var marketersTarget = document.getElementById("marketerstarget")
if(marketersTarget)marketersTarget.addEventListener('click',openmarketersTarget,false)






