    let supplierhistoryid = [];
    let supplierhistoryname = [];
    let supplierhistoryvalue = '';

function combineBatchDataintake(data) {
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

var intakehistory_datasource = [];

const populateintakehistory=(result)=>{
    intakehistory_datasource = [];
    intakehistory_datasource = combineBatchDataintake(result.data);
    console.log('intakehistory_datasource', intakehistory_datasource)
    initPagination(intakehistory_datasource, intakehistorysetCurrentPage);
    }

var intakehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(intakehistory_datasource.length) {
        intakehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendintakehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("intakehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

function intakemodal(itemid){
    let totalqty = 0
    let totalcost = 0
    let obj = intakehistory_datasource.find(each => each.batchid == itemid)
    document.querySelector(".matmodal").classList.remove('matmodalhidde');
    console.log('obj',obj);
    document.getElementById('intaketdmodal').innerHTML = formatDate(obj.items[0].transactiondate.split(' ')[0]);
    document.getElementById('intakelocationmodal').innerHTML = getLocationById(obj.items[0].location)
    document.getElementById('intakedesmodal').innerHTML = obj.items[0].description
    document.getElementById('intakehistorytablecontentmodal').innerHTML = obj.items.map((data, index)=>{
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
    document.getElementById('intakehistorytablecontentmodal').innerHTML += `
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

const checksupplierhistorypersonnelid =(state)=>{
        console.log('detected', state);
        setTimeout(()=>{
            supplierhistoryname[supplierhistoryid.indexOf(`${state}`)];
        if(supplierhistoryid.includes(state)){
            console.log('supplierhistoryvalue', supplierhistoryname) 
        }else{
	        callModal(`invalid supplier`, 0);
        }
        },500);
    };
    
    // <td> ${checksupplierhistorypersonnelid(data.items[0].owner)} </td>

function appendintakehistoryTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("intakehistorytablecontent").innerHTML += `
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
                                                <td>${dat.model}</td>
                                                <td style="width: 20px">${dat.qty}</td>
                                            </tr>
                                            `
                                            :
                                               index==3?`
                                               <tr>
                                                    <td onclick="intakemodal(${data.batchid})" style="color:green;cursor:pointer">click to view the remaining items ${data.items.length-3} ....</td>
                                                </tr>
                                                `:``
                                            )
                                        }).join('')}
                                    </table> 
                                </td>
                                <td> ${data.items.reduce((accumulator, currentItem) => {return accumulator + Number(currentItem.qty)}, 0)} </td>
                                <td> ${naira}${formatCurrency(data.items.reduce((accumulator, currentItem) => {return accumulator + Number(currentItem.cost)}, 0))} </td>
                                <td> ${data.items[0].transactiondate.split(' ')[0]} </td>
                                <td> ${getLocationById(data.items[0].location)} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="intakemodal(${data.batchid})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px">View</button>
                                        <button onclick="editIntakeItem(${data.batchid})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                    </div>
                                </td>
                            </tr>
    `
} 


function editIntakeItem(batchid) {
    let data = intakehistory_datasource.find(each => each.batchid == batchid);
    sessionStorage.setItem('intakeeditdata', JSON.stringify(data));
    if(document.getElementById('intake'))document.getElementById('intake').click();
}

async function intakeeHistory(){
    await httpRequest('stockinhistory.php');
    
    supplierhistoryid = [];
    supplierhistoryname = [];
    supplierhistoryvalue = '';
    
    const populatesupplier =(result)=>{
        result.data.data.map(dat=>{
            supplierhistoryid.push(dat.id);
            supplierhistoryname.push(dat.companyname);
        })
        return
    }
    
    
    callController('fetchsupplierscript.php', null, 'fetchsupplierscript', null, populatesupplier, 'silent');
    
    
    jtabledata = document.getElementById('intakehistorytablecontent');
        initializePaginationParams();
    
    function getStockinHistoryParams(){
		var paramstr = new FormData();
		paramstr.append('startdate',document.getElementById('matstockinhistorystartdate').value);
		paramstr.append('enddate',document.getElementById('matstockinhistoryenddate').value);
	   return paramstr;
	}
    
    if(document.getElementById('matstockinhistoryviewbtn'))document.getElementById('matstockinhistoryviewbtn').addEventListener('click', e=>{
        callController('fetchintakes.php', getStockinHistoryParams(), 'fetchintakes', ['matstockinhistorystartdate','matstockinhistoryenddate'], populateintakehistory)
    })
    
}



var intakehistory = document.getElementById("stockinhistory")
if(intakehistory ) intakehistory.addEventListener('click',intakeeHistory,false) 


