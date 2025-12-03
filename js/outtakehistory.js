function combineBatchData(data) {
  const groupedData = {};
  
  data.forEach((item) => {
    const batchId = item.batchid;
    
    if (!groupedData.hasOwnProperty(batchId)) {
      groupedData[batchId] = {
        batchid: batchId,
        items: [],
      };
    }
    
    groupedData[batchId].items.push(item);
  });
  
  return Object.values(groupedData);
}

var outtakehistory_datasource = [];

const populateoutakehistory=(result)=>{
    outtakehistory_datasource = [];
    outtakehistory_datasource = combineBatchData(result.data);
    console.log('outtakehistory_datasource', outtakehistory_datasource)
    initPagination(outtakehistory_datasource, outtakehistorysetCurrentPage);
    }

var outtakehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(outtakehistory_datasource.length) {
        outtakehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendouttakehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("outtakehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

function outtakemodal(itemid){
    let totalqty = 0
    let totalcost = 0
    let obj = outtakehistory_datasource.find(each => each.batchid == itemid)
    document.querySelector(".matmodal").classList.remove('matmodalhidde');
    console.log('obj',obj);
    document.getElementById('outtaketdmodal').innerHTML = formatDate(obj.items[0].transactiondate.split(' ')[0]);
    document.getElementById('outtakelocationmodal').innerHTML = getLocationById(obj.items[0].location)
    document.getElementById('outtakedesmodal').innerHTML = obj.items[0].description
    document.getElementById('outtakehistorytablecontentmodal').innerHTML = obj.items.map((data, index)=>{
        console.log('the data', data)
        totalqty = totalqty + Number(data.qty)
        totalcost = totalcost + Number(data.cost)
        return `
            <tr data-open="false" class="source-row-item">
                <td> ${index+1} </td>
                <td>${data.itemid}</td>
                <td>${data.itemname}</td>
                <td style="width: 20px">${data.qty}</td>
                <td>&#8358;${formatCurrency(data.cost)}</td>
            </tr>
        `
    }).join('');
    document.getElementById('outtakehistorytablecontentmodal').innerHTML += `
        <tr data-open="false" class="source-row-item">
            <td> Total: </td>
            <td></td>
            <td></td>
            <td> ${totalqty} </td>
            <td> &#8358;${formatCurrency(totalcost)} </td>
        </tr>
    `
    // document.getElementById("modalitemname").value= obj.itemname;
    // document.getElementById("modalquantity").value= obj.qty;
    // document.getElementById("modalcost").value= obj.cost;
    // document.getElementById("modaldescription").value= obj.description;
    // document.getElementById("modaltransactiondate").value= obj.transactiondate;
    // document.getElementById("modallocation").value= intakeHistoryLocationsout.find(each=> each.id == obj.location).location;
}

const editOuttakeItem=(batchid)=>{
    let data = outtakehistory_datasource.find(each => each.batchid == batchid);
    if(!data)return;
    sessionStorage.setItem('outtakeeditdata', JSON.stringify(data));
    if(document.getElementById('outtake'))document.getElementById('outtake').click();
}

function appendouttakehistoryTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("outtakehistorytablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${data.items.length} </td>
                                <td> 
                                    <table>
                                        ${data.items.map((dat, index)=>{
                                            return ( index<3 ?
                                                `
                                            <tr>
                                                <td>${dat.itemname}</td>
                                                <td style="width: 20px">${dat.qty}</td>
                                            </tr>
                                            `
                                            :
                                               index==3?`
                                               <tr>
                                                    <td onclick="outtakemodal(${data.batchid})" style="color:green;cursor:pointer">click to view the remaining items ${data.items.length-3} ....</td>
                                                </tr>
                                                `:``
                                            )
                                        }).join('')}
                                    </table> 
                                </td>
                                <td> ${data.items.reduce((accumulator, currentItem) => {return accumulator + Number(currentItem.qty)}, 0)} </td>
                                <td> ${formatCurrency(data.items.reduce((accumulator, currentItem) => {return accumulator + Number(currentItem.cost)}, 0))} </td>
                                <td> ${data.items[0].transactiondate.split(' ')[0]} </td>
                                <td> ${getLocationById(data.items[0].location)} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="outtakemodal(${data.batchid})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px">View</button>
                                        <button onclick="editOuttakeItem(${data.batchid})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                    </div>
                                </td>
                            </tr>
    `
} 


async function outtakeeHistory(){
    await httpRequest('outtakehistory.php');
    
    jtabledata = document.getElementById('outtakehistorytablecontent');
        initializePaginationParams();
    
    function getStockinHistoryParams(){
		var paramstr = new FormData();
		paramstr.append('startdate',document.getElementById('matstockinhistorystartdate').value);
		paramstr.append('enddate',document.getElementById('matstockinhistoryenddate').value);
	   return paramstr;
	}
    
    if(document.getElementById('matstockinhistoryviewbtn'))document.getElementById('matstockinhistoryviewbtn').addEventListener('click', e=>{
        callController('fetchouttakes.php', getStockinHistoryParams(), 'fetchintakes', ['matstockinhistorystartdate','matstockinhistoryenddate'], populateoutakehistory)
    })
    
}



var outtakehistory = document.getElementById("outtakehistory")
if(outtakehistory ) outtakehistory.addEventListener('click',outtakeeHistory,false) 


