var levelorehistory_datasource = [];
let levelnnmenttid

const poplevelablewithdata=(result)=>{
    levelorehistory_datasource = [];
    if(!result.data.data)return callModal(`${result.message}`)
    levelorehistory_datasource = result.data.data;
    console.log('levelorehistory_datasource', levelorehistory_datasource)
    // initPagination(levelorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('leveltabledata').innerHTML = levelorehistory_datasource.map((dat, index)=>{
        return(`<tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ dat.level } </td>
                    <td> ${getLocationById(dat.location)} </td>
                    <td class="btncolumn">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editlevel('${dat.id}','${dat.level}','${dat.location}')">Edit</span>
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deletelevel('${dat.id}')">Delete</span>
                    </td>
                </tr>`)
    }).join('')
    }
    
    const editlevel =(id, val, loc)=>{
        if(document.getElementById('matlevel'))document.getElementById('matlevel').value = val;
        if(document.getElementById('matlevellocation'))document.getElementById('matlevellocation').value = loc;
        levelnnmenttid = id
    }
     
const refreshlevelmt =(result='')=>{
     document.getElementById('matlevel').value = ''
        document.getElementById('matlevellocation').value = ''
callController('fetchlevel.php', null, 'fetchlevel', [], poplevelablewithdata)
} 
    const deletelevel=(id)=>{ 
        function ddparams(){  
            let params = new FormData()
            params.append('id', id) 
            return params
        }
        callController('removelevel.php', ddparams(), 'removelevel', [], refreshlevelmt)
    } 
 
 
async function openlevel(){
await httpRequest('level.php') 
levelnnmenttid = ''
refreshlevelmt()
if(document.getElementById('matlevellocation'))document.getElementById('matlevellocation').innerHTML = `<option value="" selected disabled>Select Location</option>`
    if(document.getElementById('matlevellocation'))document.getElementById('matlevellocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');

if(document.getElementById('matlevelsubmitbtn'))document.getElementById('matlevelsubmitbtn').addEventListener('click', e=>{
    function departparams(){
        let params = new FormData();
        if(levelnnmenttid)params.append('id', levelnnmenttid)
        levelnnmenttid = ''
        params.append('level', document.getElementById('matlevel').value)
        params.append('location', document.getElementById('matlevellocation').value)
        return params
    }
    callController('level.php', departparams(), 'level', ['matlevel', 'matlevellocation'], refreshlevelmt)
})
}

var level = document.getElementById('level')
if(level) level.addEventListener('click',openlevel,false)
    
    // if(document.getElementById('matlevelsubmitbtn'))document.getElementById('matlevelsubmitbtn')
    
