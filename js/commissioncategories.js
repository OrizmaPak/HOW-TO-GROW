var commissioncategoriesorehistory_datasource = [];
let commissioncategoriesid

const populatecommissioncategoriestable=(result)=>{
    commissioncategoriesorehistory_datasource = [];
    if(!result.data)return callModal('No data to display..')
    commissioncategoriesorehistory_datasource = result.data;
    console.log('commissioncategoriesorehistory_datasource', commissioncategoriesorehistory_datasource)
    initPagination(commissioncategoriesorehistory_datasource, commissioncategoriesorehistoryorehistorysetCurrentPage);
    document.getElementById('commissioncategories2orehistorytablecontent').innerHTML = commissioncategoriesorehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.commission} </td>
                                <td> ${dat.rangeofpropertyvalue} </td>
                            </tr>`)
    }).join('')
    }
    
var commissioncategoriesorehistoryorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(commissioncategoriesorehistory_datasource.length) {
        commissioncategoriesorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendcommissioncategoriesorehistoryorehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("commissioncategoriesorehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

    const commissioncategoryrun=(result)=>{
        
        callController('fetchcommissioncategory.php', null, 'fetchcommissioncategory', [], populatecommissioncategoriestable);
    }
const deletestockcommissioncategoriesentry=(id)=>{
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removecommissioncategory.php', parammm(), 'removecommissioncategory', null, commissioncategoryrun)
}

const commissioncategoryedit =(id,commission,range)=>{
        document.getElementById('commissioncategoriescommission').value = commission;
        document.getElementById('commissioncategoriesstartrange').value = range.split('-')[0];
        document.getElementById('commissioncategoriesendrange').value = range.split('-')[1];
        commissioncategoriesid = id;
}

function appendcommissioncategoriesorehistoryorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("commissioncategoriesorehistorytablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.commission} </td>
                                <td> ${dat.rangeofpropertyvalue} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="commissioncategoryedit('${dat.id}', '${dat.commission}', '${dat.rangeofpropertyvalue}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletestockcommissioncategoriesentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 


// const checkcommissioncategoriesuserstatus =(result)=>{
//         console.log(document.getElementById('commissioncategorieslocation'))
//         if(document.getElementById('commissioncategorieslocation'))document.getElementById('commissioncategorieslocation').value = result.location_id;
//     if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
//         if(document.getElementById('commissioncategorieslocation'))document.getElementById('commissioncategorieslocation').setAttribute('readonly', false);
//     }else{
//         if(document.getElementById('commissioncategorieslocation'))document.getElementById('commissioncategorieslocation').setAttribute('readonly', true)
//     }
// }



async function commissioncategories () {
    await httpRequest('commissioncategories.php', 'override');
    commissioncategoriesid= ''
    
      jtabledata = document.getElementById('commissioncategoriesorehistorytablecontent');
        initializePaginationParams();
    
    if(document.getElementById('commissioncategoriesfetchview'))document.getElementById('commissioncategoriesfetchview').addEventListener('click', e=>{
        function paramscommissioncategories(){
        var paramstr = new FormData();
        if(commissioncategoriesid)paramstr.append('id', commissioncategoriesid);
        commissioncategoriesid = ''
        paramstr.append('commission', document.getElementById('commissioncategoriescommission').value);
        paramstr.append('rangeofpropertyvalue', `${String(document.getElementById('commissioncategoriesstartrange').value)}-${String(document.getElementById('commissioncategoriesendrange').value)}`);
        return paramstr;
        };
        
        callController('commissioncategoryscript.php', paramscommissioncategories(), 'commissioncategoryscript', ['commissioncategoriescommission', 'commissioncategoriesstartrange', 'commissioncategoriesendrange'], commissioncategoryrun);
    })
        callController('fetchcommissioncategory.php', null, 'fetchcommissioncategory', [], populatecommissioncategoriestable);
    
    // if(document.getElementById('commissioncategorieslocation'))document.getElementById('commissioncategorieslocation').innerHTML = `<option value="" disabled>Select Item</option>`
    // if(document.getElementById('commissioncategorieslocation'))document.getElementById('commissioncategorieslocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
        // function getpermissionsParamscommissioncategories(){
    // var paramstr = new FormData();
    // paramstr.append('email', document.getElementById('indexEmail').value);
    //     return paramstr;
    // };
    // callController('fetchuserprofile.php', getpermissionsParamscommissioncategories(), 'fetchuserprofile', null, checkcommissioncategoriesuserstatus);
    
      if(document.getElementById('viewcommissioncategoriesexport'))document.getElementById('viewcommissioncategoriesexport').addEventListener('click',e=>{
            tableToExcel('commissioncategoriesoretable2', 'LIST OF RETURNS')},false);
        if(document.getElementById('viewcommissioncategoriesprint'))document.getElementById('viewcommissioncategoriesprint').addEventListener('click',e=>{
            printContent('LIST OF RETURNS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'commissioncategoriesorefulltableparant')},false);


}

var commissioncategoriesNav = document.getElementById("commissioncategories");
if (commissioncategoriesNav) commissioncategoriesNav.addEventListener("click", commissioncategories, false);
