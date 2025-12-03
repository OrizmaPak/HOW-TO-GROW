// View Reserved Property Stock--------------------------------------------------------------------------------------------------------------------
var viewpropertyitemnotinstockstockorehistory_datasource = [];
let viewpropertyitemnotinstockstocknnmenttid

const popviewpropertyitemnotinstockstockablewithdata=(result)=>{
    // dynamiccomma(true)
    viewpropertyitemnotinstockstockorehistory_datasource = [];
    if(!result.data)return callModal(`${result.message}`)
    viewpropertyitemnotinstockstockorehistory_datasource = result.data;
    console.log('viewpropertyitemnotinstockstockorehistory_datasource', viewpropertyitemnotinstockstockorehistory_datasource)
    // initPagination(viewpropertyitemnotinstockstockorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('viewpropertyitemnotinstockstocktabledata').innerHTML = viewpropertyitemnotinstockstockorehistory_datasource.map((dat, index)=>{
        return(`<tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }"> 
                    <td> ${ index +1} </td>
                    <td> ${ formatMoney(dat.tdate) } </td>
                    <td> ${ dat.accountnumber } </td>
                    <td> ${ dat.accountname } </td>
                    <td> ${ dat.itemid } </td>
                    <td> ${ dat.itemname } </td>
                    <td> ${ dat.propertyid } </td>
                    <td> ${ dat.qty } </td>
                    <td> ${ dat.ref } </td>
                    <td class="btncolumn hidden">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editviewpropertyitemnotinstockstock('${dat.id}','${dat.totalvaluefrom}','${dat.totalvalueto}', '${dat.numberofdays}')">Edit</span>
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deleteviewpropertyitemnotinstockstock('${dat.id}')">Delete</span>
                    </td>
                </tr>`)
    }).join('')
    }
     
    const editviewpropertyitemnotinstockstock =(id, totalvaluefrom, totalvalueto, numberofdays)=>{
        if(document.getElementById('totalvaluefrom'))document.getElementById('totalvaluefrom').value = totalvaluefrom;
        if(document.getElementById('totalvalueto'))document.getElementById('totalvalueto').value = totalvalueto;
        if(document.getElementById('numberofdays'))document.getElementById('numberofdays').value = numberofdays;
        viewpropertyitemnotinstockstocknnmenttid = id
        dynamiccomma(true)
    }
     
const refreshviewpropertyitemnotinstockstockmt =(result='')=>{
    // if(result)document.getElementById('viewpropertyitemnotinstockstockform').reset()
    callController('fetchsetasidestock.php', null, 'fetchsetasidestock', [], )
} 
    const deleteviewpropertyitemnotinstockstock=(id)=>{ 
        function ddparams(){   
            let params = new FormData()
            params.append('id', id) 
            return params
        }
        callController('removepropetycategoryvalue.php', ddparams(), 'removepropetycategoryvalue', [], refreshviewpropertyitemnotinstockstockmt)
    } 
 
 
async function openviewpropertyitemnotinstockstock(){
await httpRequest('viewpropertyitemnotinstockstock.php') 
viewpropertyitemnotinstockstocknnmenttid = ''
// refreshviewpropertyitemnotinstockstockmt()
if(document.getElementById('submit'))document.getElementById('submit').addEventListener('click', e=>{
    e.preventDefault()
    // dynamiccomma(false)
    function departparams(){
        let params = new FormData(document.getElementById('viewpropertyitemnotinstockstockform'));
        return params
    }
    callController('fetchnotinstockpropertyitems.php', departparams(), 'fetchnotinstockpropertyitems', ['startdate', 'enddate'], popviewpropertyitemnotinstockstockablewithdata)
})
}

var viewpropertyitemnotinstockstock = document.getElementById('viewpropertyitemnotinstockstock')
if(viewpropertyitemnotinstockstock) viewpropertyitemnotinstockstock.addEventListener('click',openviewpropertyitemnotinstockstock,false)
    
    
