// Category Value Timeline--------------------------------------------------------------------------------------------------------------------
var viewreservedpropertystockorehistory_datasource = [];
let viewreservedpropertystocknnmenttid

const popviewreservedpropertystockablewithdata=(result)=>{
    // dynamiccomma(true)
    viewreservedpropertystockorehistory_datasource = [];
    if(!result.data)return callModal(`${result.message}`)
    viewreservedpropertystockorehistory_datasource = result.data;
    console.log('viewreservedpropertystockorehistory_datasource', viewreservedpropertystockorehistory_datasource)
    // initPagination(viewreservedpropertystockorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('viewreservedpropertystocktabledata').innerHTML = viewreservedpropertystockorehistory_datasource.map((dat, index)=>{
        return(`<tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ formatMoney(dat.totalvaluefrom) } </td>
                    <td> ${ formatMoney(dat.totalvalueto) } </td>
                    <td> ${ dat.numberofdays } </td>
                    <td class="btncolumn">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editviewreservedpropertystock('${dat.id}','${dat.totalvaluefrom}','${dat.totalvalueto}', '${dat.numberofdays}')">Edit</span>
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deleteviewreservedpropertystock('${dat.id}')">Delete</span>
                    </td>
                </tr>`)
    }).join('')
    }
     
    const editviewreservedpropertystock =(id, totalvaluefrom, totalvalueto, numberofdays)=>{
        if(document.getElementById('totalvaluefrom'))document.getElementById('totalvaluefrom').value = totalvaluefrom;
        if(document.getElementById('totalvalueto'))document.getElementById('totalvalueto').value = totalvalueto;
        if(document.getElementById('numberofdays'))document.getElementById('numberofdays').value = numberofdays;
        viewreservedpropertystocknnmenttid = id
        dynamiccomma(true)
    }
     
const refreshviewreservedpropertystockmt =(result='')=>{
    // if(result)document.getElementById('viewreservedpropertystockform').reset()
    callController('fetchsetasidestock.php', null, 'fetchsetasidestock', [], )
} 
    const deleteviewreservedpropertystock=(id)=>{ 
        function ddparams(){   
            let params = new FormData()
            params.append('id', id) 
            return params
        }
        callController('removepropetycategoryvalue.php', ddparams(), 'removepropetycategoryvalue', [], refreshviewreservedpropertystockmt)
    } 
 
 
async function openviewreservedpropertystock(){
await httpRequest('viewreservedpropertystock.php') 
viewreservedpropertystocknnmenttid = ''
// refreshviewreservedpropertystockmt()
if(document.getElementById('submit'))document.getElementById('submit').addEventListener('click', e=>{
    e.preventDefault()
    // dynamiccomma(false)
    function departparams(){
        let params = new FormData(document.getElementById('viewreservedpropertystockform'));
        return params
    }
    callController('fetchsetasidestock.php', departparams(), 'fetchsetasidestock', ['startdate', 'enddate'], popviewreservedpropertystockablewithdata)
})
}

var viewreservedpropertystock = document.getElementById('viewreservedpropertystock')
if(viewreservedpropertystock) viewreservedpropertystock.addEventListener('click',openviewreservedpropertystock,false)
    
    
