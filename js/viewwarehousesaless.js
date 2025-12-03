var viewwhsalesorehistory_datasource = [];
let whsalesallusers
let viewwhsalesoreorginfo

function whsalesviewgroupDataByBatchId(data) {
    const groupedData = [];

    data.forEach(entry => {
        const batchid = entry.batchid;
        let batchObject = groupedData.find(obj => obj.batchid === batchid);

        if (!batchObject) {
            batchObject = {
                batchid: batchid,
                data: []
            };
            groupedData.unshift(batchObject);
        }

        batchObject.data.push(entry);
    });

    return groupedData;
}

const populateviewwhsalestable=(resultt)=>{
    let result = whsalesviewgroupDataByBatchId(resultt.data)
    datafromviewwhsales = result
    console.log('what we getting', result)
    viewwhsalesorehistory_datasource = [];
    viewwhsalesorehistory_datasource = result;
    console.log('viewwhsalesorehistory_datasource', viewwhsalesorehistory_datasource)
    initPagination(viewwhsalesorehistory_datasource, viewwhsalesorehistoryorehistorysetCurrentPage);
    // document.getElementById('viewwhsales2orehistorytablecontent').innerHTML = viewwhsalesorehistory_datasource.map((dat, index)=>{
    //     return(`<tr data-open="false" class="source-row-item">
    //                             <td> ${index+1} </td>
    //                             <td> ${dat[i][0].reference} </td>
    //                             <td> ${index+1} fg</td>
    //                             <td> ${index+1}fg </td>
    //                             <td> ${index+1}d </td>
    //                             <td> ${index+1}e </td>
    //                             <td> ${index+1}w </td>
    //                             <td> ${index+1} u</td>
    //                         </tr>`)
    // }).join('')
    }
    
var viewwhsalesorehistoryorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewwhsalesorehistory_datasource.length) {
        viewwhsalesorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewwhsalesorehistoryorehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("viewwhsalesorehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletestockwhsalesviewentry=(id)=>{
    const run=(result)=>{
       function paramswhsalesview(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('viewwhsaleslocation').value);
        paramstr.append('startdate', document.getElementById('viewwhsalesstartdate').value);
        paramstr.append('enddate', document.getElementById('viewwhsalesenddate').value);
            return paramstr;
        };
        
        callController('fetchwhsalesviewscript.php', paramswhsalesview(), 'fetchwhsalesviewscript', ['viewwhsalesenddate', 'viewwhsalesstartdate', 'viewwhsaleslocation'], populateviewwhsalestable);
    }
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removewhsalesview.php', parammm(), 'removewhsalesview', null, run)
}

const whsalesgetperson =(email)=>{
    return `${whsalesallusers.filter(dat=>dat.email == email)[0].lastname} ${whsalesallusers.filter(dat=>dat.email == email)[0].firstname}`
}

const removewhsalesviewmodal=(e)=>{
     if(e.target.classList.contains('bgwhsales'))e.target.classList.add('hidden')
}

const whsalesviewsinglesale =(batchid, view)=>{
    if(document.getElementById("whsalesviewmodalcontainer") && view == 'view')document.getElementById("whsalesviewmodalcontainer").classList.remove('hidden')
    let batchdata = viewwhsalesorehistory_datasource.filter(dat=>dat.batchid == batchid)[0]
    console.log('batchdata', batchdata)
    if(document.getElementById("whsalesviewmodal"))document.getElementById("whsalesviewmodal").innerHTML = `
    <div style="display: flex;justify-content: flex-end;margin-top: 40px" class="">
                    <div class="orerbtn" id="viewgiftprint" onclick="printwhsalesview(${batchdata.batchid})">Print</div>
                </div>
        <h1>INVOICE</h1> 
         <div class="receipt" style="padding: 40px">
                    <div class="reciept-header">
                        <div>
                            <span>
                                <img id="" src="${assetsUrl.logo}" alt="" style="width: 50px;height: auto">
                            </span>
                            <span>
                                 <h1>${viewwhsalesoreorginfo.companyname}</h1>
                                <span> ${viewwhsalesoreorginfo.address} </span>
                            </span>
                        </div>
                        <div>
                            <span> Invoice#: <span>REF|${batchdata ? batchdata.batchid : ''} </span></span>
                            issue date: ${batchdata.data[0].transactiondate.split(' ')[0]}
                        </div>
                    </div>
                    <div class="billing">
                        <div>
                            <h3> Bill to:</h3>
                            <ul>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Sales Person:</p> <p>${String(whsalesgetperson(batchdata.data[0].user)).toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Supply To:</p> <p>${String(getCompanyById(batchdata.data[0].owner)).toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Supply From:</p> <p>${String(getLocationById(batchdata.data[0].location)).toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Payment Method:</p> <p>${String(batchdata.data[0].paymentmethod).toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Description:</p> <p>${String(batchdata.data[0].description).toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Reference Number:</p> <p>${String(batchdata.data[0].reference).toUpperCase()}</p> </li>
                            </ul>
                        </div>
                        <div>
                            <h3> Payment: </h3>
                            <ul>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Date:</p> <span>${String(dateToWords(batchdata.data[0].transactiondate.split(' ')[0])).toUpperCase()}</span></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Total quantity:</p> <p>${String(batchdata.data[0].qty)} Item(s)</p></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Total cost:</p> <p>${formatCurrency(batchdata.data.reduce((accumulator, currentValue) => accumulator + Number(currentValue.cost), 0))}</p></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>VAT:</p> <p>0.00</p></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Total paid:</p> <p>${formatCurrency(batchdata.data[0].amountpaid)}</p></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Remaining Balance:</p> <p>00.00</p></li>
                            </ul>
                        </div>
                    </div>
                    <div class="items">
                        <table>
                            <thead>
                                <tr style="background: #c9c6c6;">
                                    <th>ITEM</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                                ${(() => {
                                        let rowsHtml = '';
                                        for (let i = 0; i < batchdata.data.length; i++) {
                                            rowsHtml += `
                                                <tr>
                                                    <td>${String(batchdata.data[i].itemname).toUpperCase()}</td>
                                                    <td>${naira} ${formatCurrency(batchdata.data[i].cost)}</td>
                                                    <td>${formatCurrency(batchdata.data[i].qty)}</td>
                                                    <td>${naira} ${formatCurrency(Number(batchdata.data[i].qty) * Number(batchdata.data[i].cost))}</td>
                                                </tr>`;
                                        }
                                        return rowsHtml;
                                    })()}
                                    <tr style="background: #c9c6c6;">
                                        <td>SUBTOTAL<br>VAT</td>
                                        <td></td>
                                        <td></td>
                                        <td>${naira} ${formatCurrency(batchdata.data[0].amountpaid)}<br>0.00</td>
                                    </tr>
                                    <tr style="background: #c9c6c6;">
                                        <td>TOTAL AMOUNT:</td>
                                        <td></td>
                                        <td>${formatCurrency(batchdata.data.reduce((accumulator, currentValue) => accumulator + Number(currentValue.qty), 0))}</td>
                                        <td>${formatCurrency(batchdata.data[0].amountpaid)}</td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="display: flex;justify-content: flex-end;margin-top: 40px" class="">
                    <div class="orerbtn" id="viewgiftprint" onclick="printwhsalesview(${batchdata.batchid})">Print</div>
                </div>
                </div>
                
    `
    if(document.getElementById("whsalesviewmodalprint"))document.getElementById("whsalesviewmodalprint").innerHTML = `
        <h1>INVOICE</h1> 
         <div class="receipt" style="padding: 40px">
                    <div class="reciept-header">
                        <div>
                            <span>
                                <img id="" src="${assetsUrl.logo}" alt="" style="width: 50px;height: auto">
                            </span>
                            <span>
                                 <h1>${viewwhsalesoreorginfo.companyname}</h1>
                                <span> ${viewwhsalesoreorginfo.address} </span>
                            </span>
                        </div>
                        <div>
                            <span> Invoice#: <span>REF|${batchdata ? batchdata.batchid : ''} </span></span>
                            issue date: ${batchdata.data[0].transactiondate.split(' ')[0]}
                        </div>
                    </div>
                    <div class="billing">
                        <div>
                            <h3> Bill to:</h3>
                            <ul>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Sales Person:</p> <p>${String(whsalesgetperson(batchdata.data[0].user)).toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Supply To:</p> <p>${String(getCompanyById(batchdata.data[0].owner)).toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Supply From:</p> <p>${String(getLocationById(batchdata.data[0].location)).toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Payment Method:</p> <p>${String(batchdata.data[0].paymentmethod).toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Description:</p> <p>${String(batchdata.data[0].description).toUpperCase()}</p> </li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Reference Number:</p> <p>${String(batchdata.data[0].reference).toUpperCase()}</p> </li>
                            </ul>
                        </div>
                        <div>
                            <h3> Payment: </h3>
                            <ul>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Date:</p> <span>${String(dateToWords(batchdata.data[0].transactiondate.split(' ')[0])).toUpperCase()}</span></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Total quantity:</p> <p>${String(batchdata.data[0].qty)} Item(s)</p></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Total cost:</p> <p>${formatCurrency(batchdata.data.reduce((accumulator, currentValue) => accumulator + Number(currentValue.cost), 0))}</p></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>VAT:</p> <p>0.00</p></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Total paid:</p> <p>${formatCurrency(batchdata.data[0].amountpaid)}</p></li>
                                <li style="display: flex;justify-content:space-between;width: 150%"><p>Remaining Balance:</p> <p>00.00</p></li>
                            </ul>
                        </div>
                    </div>
                    <div class="items">
                        <table>
                            <thead>
                                <tr style="background: #c9c6c6;">
                                    <th>ITEM</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                                ${(() => {
                                        let rowsHtml = '';
                                        for (let i = 0; i < batchdata.data.length; i++) {
                                            rowsHtml += `
                                                <tr>
                                                    <td>${String(batchdata.data[i].itemname).toUpperCase()}</td>
                                                    <td>${naira} ${formatCurrency(batchdata.data[i].cost)}</td>
                                                    <td>${formatCurrency(batchdata.data[i].qty)}</td>
                                                    <td>${naira} ${formatCurrency(Number(batchdata.data[i].qty) * Number(batchdata.data[i].cost))}</td>
                                                </tr>`;
                                        }
                                        return rowsHtml;
                                    })()}
                                    <tr style="background: #c9c6c6;">
                                        <td>SUBTOTAL<br>VAT</td>
                                        <td></td>
                                        <td></td>
                                        <td>${naira} ${formatCurrency(batchdata.data[0].amountpaid)}<br>0.00</td>
                                    </tr>
                                    <tr style="background: #c9c6c6;">
                                        <td>TOTAL AMOUNT:</td>
                                        <td></td>
                                        <td>${formatCurrency(batchdata.data.reduce((accumulator, currentValue) => accumulator + Number(currentValue.qty), 0))}</td>
                                        <td>${formatCurrency(batchdata.data[0].amountpaid)}</td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="notice">
                        <div>
                            <div>We appreciate you doing business with us <br>
                                <span>THANK YOU</span>
                            </div>
                            <div>Sender: Signature & Date&nbsp;&nbsp;&nbsp;</div>
                            <div>Receiver: Signature & Date:&nbsp;&nbsp;&nbsp;</div>
                        </div>
                    </div>
                </div>
                
    `
    
}

function appendviewwhsalesorehistoryorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    let sttring = JSON.stringify(dat)
    document.getElementById("viewwhsalesorehistorytablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.batchid} </td>
                                <td> ${dateToWords(dat.data[0].transactiondate.split(' ')[0])}</td>
                                <td> ${whsalesgetperson(dat.data[0].user)} </td>
                                <td> 
                                        ${dat.data.length > 0 ? `<table class="jmargin-top" id="table${dat.data.batchid}">
                                            <thead>
                                                <tr>
                                                    <td style="font-weight: bold"> item&nbsp;id </td>
                                                    <td style="font-weight: bold"> item&nbsp;name  </td>
                                                    <td style="font-weight: bold"> quantity  </td>
                                                    <td style="font-weight: bold"> unit&nbsp;cost </td>
                                                    <td style="font-weight: bold">  total&nbsp;cost </td>
                                                </tr>
                                            </thead>
                                            <tbody id="tablebody${dat.data.batchid}">
                                                ${dat.data.map((data, index)=>{
                                                    if(index < 2){
                                                        return `
                                                            <tr>
                                                                <td>${data.itemid}</td>
                                                                <td>${data.itemname}</td>
                                                                <td>${formatCurrency(data.qty)}</td>
                                                                <td>${naira} ${formatCurrency(data.cost)}</td>
                                                                <td>${naira} ${formatCurrency(Number(data.qty)*Number(data.cost))}</td>
                                                            </tr>
                                                        `
                                                    }else{
                                                        return
                                                    } 
                                                }).join('')}
                                                ${dat.data.length > 2 ? `<tr><td colspan="4"><p style="color: green" onclick="whsalesviewsinglesale(${dat.batchid}, 'view')">click to view the remaining ${dat.data.length-2}</p></td></tr>` : ''}
                                            </tbody>
                                        </table>` : `No registered Item`}
                                </td>
                                <td> ${formatCurrency(dat.data.length)} </td>
                                <td> ${formatCurrency(dat.data.reduce((accumulator, currentValue) => accumulator + Number(currentValue.qty), 0))} </td>
                                <td>${naira} ${formatCurrency(dat.data.reduce((accumulator, currentValue) => accumulator + Number(currentValue.cost), 0))} </td>
                                <td>${naira} ${formatCurrency(dat.data[0].amountpaid)} </td>
                                <td>${dat.data[0].paymentmethod} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="whsalesviewsinglesale(${dat.batchid}, 'view')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px">View</button>
                                        <button onclick='sessionStorage.setItem("editviewwhsalesdata", '${sttring}');document.getElementById("warehousesaless").click();' style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px;display: none">Edit</button>
                                        <button onclick="deletestockwhsalesviewentry('${dat.id}')" style="display: none;padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                        <button onclick="printwhsalesview('${dat.batchid}')" style="margin-top:10px;margin-left:5px;transform:scale(1.3);padding: 5px 6px;cursor:pointer;border:1px solid black;outline:none;font-size:10px;color:black;background-color:white;border-radius:3px">Print</button>
                                    </div>
                                </td>
                            </tr>`
} 


const checkviewwhsalesuserstatus =(result)=>{
        console.log(document.getElementById('viewwhsaleslocation'))
        if(document.getElementById('viewwhsaleslocation'))document.getElementById('viewwhsaleslocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('viewwhsaleslocation'))document.getElementById('viewwhsaleslocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('viewwhsaleslocation'))document.getElementById('viewwhsaleslocation').setAttribute('readonly', true)
    }
}

const printwhsalesview =(batchid)=>{
    whsalesviewsinglesale(batchid)
    printContent('SALES RECEIPT',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'whsalesviewmodalprint')
}


async function openviewwhsales () {
    await httpRequest('viewwarehousesaless.php', 'override');
    
    
    async function whsalesvieworefetchViewDeliveryOrganizationInfo() {
        let result = await fetchRequest('../controllers/fetchorganisationscript.php');
        if(result) {
            let parseResult  =  JSON.parse(result);
            if(parseResult.status){
                viewwhsalesoreorginfo = parseResult.data.data[0]
                //  generatwhsalesreceipt()
                // document.getElementById('whsaleslogo').src = assetsUrl.logo
            }
        }
    }
    whsalesvieworefetchViewDeliveryOrganizationInfo()
    
    const whsalesassignuser =(result)=>{
        whsalesallusers=result.data;
    }
    callController('fetchallusers.php', null, 'fetchallusers', null, whsalesassignuser, 'silent');
    
      jtabledata = document.getElementById('viewwhsalesorehistorytablecontent');
        initializePaginationParams();
    
    if(document.getElementById('viewwhsalesfetchview'))document.getElementById('viewwhsalesfetchview').addEventListener('click', e=>{
        function paramswhsalesview(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('viewwhsaleslocation').value);
        paramstr.append('startdate', document.getElementById('viewwhsalesstartdate').value);
        paramstr.append('enddate', document.getElementById('viewwhsalesenddate').value);
            return paramstr;
        };
        
        callController('fetchwarehousesales.php', paramswhsalesview(), 'fetchwarehousesales', ['viewwhsalesenddate', 'viewwhsalesstartdate', 'viewwhsaleslocation'], populateviewwhsalestable);
    })
    
    if(document.getElementById('viewwhsaleslocation'))document.getElementById('viewwhsaleslocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('viewwhsaleslocation'))document.getElementById('viewwhsaleslocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    function getpermissionsParamsviewwhsales(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsviewwhsales(), 'fetchuserprofile', null, checkviewwhsalesuserstatus);
    
      if(document.getElementById('viewwhsalesviewexport'))document.getElementById('viewwhsalesviewexport').addEventListener('click',e=>{
            tableToExcel('viewwhsalesoretable2', 'LIST OF RETURNS')},false);
        if(document.getElementById('viewwhsalesviewprint'))document.getElementById('viewwhsalesviewprint').addEventListener('click',e=>{
            printContent('LIST OF RETURNS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewwhsalesorefulltableparant')},false);


}

var viewwhsalesNav = document.getElementById("viewwarehousesaless");
if (viewwhsalesNav) viewwhsalesNav.addEventListener("click", openviewwhsales, false);
