var groupnameorehistory_datasource = [];
let groupnnmenttid

const popgroupablewithdata=(result)=>{
    groupnameorehistory_datasource = [];
    if(!result.data.data)return callModal(`${result.message}`)
    groupnameorehistory_datasource = result.data.data;
    console.log('groupnameorehistory_datasource', groupnameorehistory_datasource)
    // initPagination(groupnameorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('groupnametabledata').innerHTML = groupnameorehistory_datasource.map((dat, index)=>{
        return(`<tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ dat.groupname } </td>
                    <td> ${getLocationById(dat.location)} </td>
                    <td class="btncolumn">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editgroupname('${dat.id}','${dat.groupname}')">Edit</span>
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deletegroupname('${dat.id}')">Delete</span>
                    </td>
                </tr>`)
    }).join('')
    }
    
    const editgroupname =(id, val)=>{
        if(document.getElementById('matgroupname'))document.getElementById('matgroupname').value = val;
        groupnnmenttid = id
    }
     
const refreshgroupmt =(result='')=>{
     document.getElementById('matgroupname').value = ''
        document.getElementById('matgrouplocation').value = ''
callController('fetchgroupname.php', null, 'fetchgroupname', [], popgroupablewithdata)
} 
    const deletegroupname=(id)=>{ 
        function ddparams(){  
            let params = new FormData()
            params.append('id', id) 
            return params
        }
        callController('removegroup.php', ddparams(), 'removegroup', [], refreshgroupmt)
    } 
 
 
async function opengroupname(){
await httpRequest('groupname.php') 
groupnnmenttid = ''
refreshgroupmt()
if(document.getElementById('matgrouplocation'))document.getElementById('matgrouplocation').innerHTML = `<option value="" selected disabled>Select Location</option>`
    if(document.getElementById('matgrouplocation'))document.getElementById('matgrouplocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');

if(document.getElementById('matgroupnamesubmitbtn'))document.getElementById('matgroupnamesubmitbtn').addEventListener('click', e=>{
    function departparams(){
        let params = new FormData();
        if(groupnnmenttid)params.append('id', groupnnmenttid)
        groupnnmenttid = ''
        params.append('groupname', document.getElementById('matgroupname').value)
        params.append('location', document.getElementById('matgrouplocation').value)
        return params
    }
    callController('groupname.php', departparams(), 'groupname', ['matgroupname', 'matgrouplocation'], refreshgroupmt)
})
}

var groupname = document.getElementById('groupname')
if(groupname) groupname.addEventListener('click',opengroupname,false)
    
    // if(document.getElementById('matgroupnamesubmitbtn'))document.getElementById('matgroupnamesubmitbtn')
    
