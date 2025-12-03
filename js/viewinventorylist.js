async function openapproveViewInventoryList(){
    
await httpRequest('approveviewinventory.php'); 

function consumabler(){
    var paramstr = new FormData()
    /*paramstr.append('itemclass', 'Consumable')*/
    
    // for (var pair of paramstr.entries()) {
    //           console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
    //         }
    return paramstr
}
function getConsumabler(){
    const requestItem = getAjaxObject();
    
    requestItem.open('POST','../controllers/fetchinventorybyclass.php',true);
    
    requestItem.onreadystatechange = function(){
       
       if(requestItem.readyState == 4 && requestItem.status == 200){
           
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('fetchConsumable ', result);
            const arrayOfConsumable = result.data.filter(data=>data.status !== 'APPROVED');
            let jtabledata =  document.getElementById('approveinventorylisttabledata')
            if(jtabledata) jtabledata.innerHTML = '';
            if(arrayOfConsumable.length){
                jtabledata.innerHTML = arrayOfConsumable.map( (item, index) => 
                     `
                        <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                            <td> ${ index +1} </td>
                            <td> ${ item.itemname } </td>
                            <td> ${ item.itemtype } </td>
                            <td> ${ item.model } </td>
                            <td> ${ item.cost } </td>
                            <td> ${ item.savingsellingprice } </td>
                            <td> ${ item.cashsellingprice } </td>
                            <td> ${ item.marketingprice } </td>
                            <td> ${ item.tlog ? formatDate(item.tlog) : '-' } </td>
                            <td> ${ item.edited ? formatDate(item.edited) : '-' } </td>
                            <td> ${ item.status == 'APPROVED' ? 'APPROVED' : item.status == 'DECLINED' ? 'DECLINED' : 'NOT APPROVED' } </td>
                             <td class="btncolumn">
                                
                                <span class="viewbtn mtablebtn mbtnblue" style="background: green;color:rgb(0, 105, 217);font-weight:bold" onclick="approveViewInventory(${item.id}, 'APPROVED')">Approve</span>
                                <span class="viewbtn mtablebtn mbtnblue" style="background: red;color:rgb(0, 105, 217);font-weight:bold" onclick="approveViewInventory(${item.id}, 'DECLINED')">Decline</span>
                                <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editapproveViewInventory(${item.id})">Edit</span>
                            </td>
                           
                        </tr>
                    `
                );
            
       }
       else{
        //   console.log("not success ",requestItem)
       }
    };
    
    requestItem.setRequestHeader('Connection','close');
    requestItem.send();
}

    
} 
getConsumabler()

}

function editapproveViewInventory(itemid, ){
    consumablefetchdata, nonconsumablefetchdata
    let obj;
    if(document.getElementById('matapproveviewinventoryfilter').value === 'Consumable'){
      obj =  consumablefetchdata.data.filter(each=> each.id == itemid)[0] 
      localStorage.setItem('inventoryupdate', JSON.stringify(obj));
    }else{
       obj = nonconsumablefetchdata.data.filter(each=> each.id == itemid)[0]
        localStorage.setItem('inventoryupdate', JSON.stringify(obj));
    }
    
    if(document.getElementById('itemregistration'))document.getElementById('itemregistration').click()
    
    // console.log(obj)
    document.getElementById("matapproveviewinventoryitemtype").value= obj.itemtype;
    document.getElementById("matapproveviewinventoryitemname").value= obj.itemname;
    document.getElementById("matapproveviewinventorycost").value= obj.cost;
    document.getElementById("matapproveviewinventorymodel").value= obj.model;
    document.getElementById("matapproveviewinventorycashselling").value= obj.cashsellingprice;
    document.getElementById("matapproveviewinventorymarketingprice").value= obj.marketingprice;
    document.getElementById("matapproveviewinventorysavingselling").value= obj.savingsellingprice;
}

 
var approveviewinventorylist = document.getElementById('approveinventory') 
if(approveviewinventorylist)approveviewinventorylist.addEventListener('click',openapproveViewInventoryList,false)
    



    
    
    
    
    
    
