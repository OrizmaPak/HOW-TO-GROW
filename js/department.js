var departmentorehistory_datasource = [];
let departtmenttid

const popdeptablewithdata=(result)=>{
    departmentorehistory_datasource = [];
    if(!result.data)return callModal(`${result.message}`)
    departmentorehistory_datasource = result.data;
    console.log('departmentorehistory_datasource', departmentorehistory_datasource)
    // initPagination(departmentorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('departmenttabledata').innerHTML = departmentorehistory_datasource.map((dat, index)=>{
        return(`<tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ dat.department } </td>
                    <td class="btncolumn">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editDepartment('${dat.id}','${dat.department}')">Edit</span>
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deleteDepartment('${dat.id}')">Delete</span>
                    </td>
                </tr>`)
    }).join('')
    }
    
    const editDepartment =(id, val)=>{
        if(document.getElementById('matdepartment'))document.getElementById('matdepartment').value = val;
        departtmenttid = id
    }
    
const refreshdeptmt =(result='')=>{
callController('fetchdepartment.php', null, 'fetchdepartment', [], popdeptablewithdata)
}
    const deleteDepartment=(id)=>{
        function ddparams(){
            let params = new FormData();
            params.append('id', id)
            return params
        }
        callController('removedepartment.php', ddparams(), 'removedepartment', [], refreshdeptmt)
    }


async function openDepartment(){
await httpRequest('department.php')
departtmenttid = ''
refreshdeptmt()

if(document.getElementById('matdepartmentsubmitbtn'))document.getElementById('matdepartmentsubmitbtn').addEventListener('click', e=>{
    function departparams(){
        let params = new FormData();
        if(departtmenttid)params.append('id', departtmenttid)
        departtmenttid = ''
        params.append('department', document.getElementById('matdepartment').value)
        return params
    }
    callController('department.php', departparams(), 'department', ['matdepartment'], refreshdeptmt)
})
}

var department = document.getElementById('department')
if(department) department.addEventListener('click',openDepartment,false)
    
    // if(document.getElementById('matdepartmentsubmitbtn'))document.getElementById('matdepartmentsubmitbtn')
    
