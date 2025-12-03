// rrr Cash Report --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = [];
async function openwithdrawalrequest() {
    await httpRequest('withdrawalrequest.php')
    dynamiccomma(true)
    
    form = document.getElementById('withdrawalrequestform')
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generatewithdrawalrequest)
    // form.querySelector('button#print-rc').addEventListener('click', printwithdrawalrequest)
    // form.querySelector('button#export-rc').addEventListener('click', exportwithdrawalrequest)
    document.getElementById('requestdate').valueAsDate = new Date();
    document.getElementById('requestdate').disabled = true
    
    document.getElementById('accountofficer').value = document.getElementById('indexEmail').value;

    document.getElementById('cancel').addEventListener('click', e=>{
        document.getElementById('accountnumber').value = '';
        document.getElementById('accountname').value = '';
        document.getElementById('amount').value = '';
    })
    
    document.getElementById('accountnumber').addEventListener('change', e=>{
        if(!document.getElementById('accountnumber').value)document.getElementById('accountname').value = '';
        let param = new FormData();
        param.append('accountnumber', document.getElementById('accountnumber').value)
        callController('fetchaccountprofile.php',param, 'fetchaccountprofile', null, getaccountname)
    })
        
    // jtabledata = document.getElementById('jtabledata')
    // initializePaginationParams(withdrawalrequestsetCurrentPage)
    await fetchwithdrawalrequestgetaccountname()
}

function getaccountname(res){
    document.getElementById('accountname').value = `${res.data[0].customerdetail.firstname??''} ${res.data[0].customerdetail.lastname??''} ${res.data[0].customerdetail.othernames??''}`
}

async function fetchwithdrawalrequestgetaccountname() {
    
}

function printwithdrawalrequest() {
    if(returnedcashgroupdeposits.length) printContent('Returned Cash Report', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportwithdrawalrequest() {
    if(returnedcashgroupdeposits.length) tableToExcel('withdrawalrequesttable', 'returned_cash_report')
}


async function generatewithdrawalrequest(event) {
    dynamiccomma(false)
    function runsubmitwithdrawalrequest(res){
        document.getElementById('accountnumber').value = '';
        document.getElementById('accountname').value = '';
        document.getElementById('amount').value = '';
    }
    function param(){
        let p = new FormData(document.getElementById('withdrawalrequestform'));
        return p
    }
    callController('withdrawalrequest.php', param(), 'withdrawalrequest', ['accountnumber', 'accountname', 'amount'], runsubmitwithdrawalrequest)
}

var withdrawalrequestbtn = document.getElementById('withdrawalrequest')
if(withdrawalrequestbtn) withdrawalrequestbtn.addEventListener('click', openwithdrawalrequest)


// processwithdrawalrequest Cash Report --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = [];
async function openprocesswithdrawalrequest() {
    await httpRequest('processwithdrawalrequest.php')
    getUsers(fillupcollection)
    
    form = document.getElementById('processwithdrawalrequestform')
    if(document.querySelector('#processwithdrawalrequestview')) document.querySelector('#processwithdrawalrequestview').addEventListener('click', generateprocesswithdrawalrequest)
    document.querySelector('#print-vwr').addEventListener('click', printprocesswithdrawalrequest)
    document.querySelector('#export-vwr').addEventListener('click', exportprocesswithdrawalrequest)
        
    jtabledata = document.getElementById('processwithdrawalrequesttable')
    // initializePaginationParams(processwithdrawalrequestsetCurrentPage)
    // await fetchprocesswithdrawalrequestPageData()
}

function printprocesswithdrawalrequest() {
    if(returnedcashgroupdeposits.length) printContent('Returned Cash Report', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportprocesswithdrawalrequest() {
    if(returnedcashgroupdeposits.length) tableToExcel('processwithdrawalrequesttable', 'returned_cash_report')
}


async function generateprocesswithdrawalrequest() {
    showSpinner()
    document.getElementById('processwithdrawalrequesttable').innerHTML =''
    // event.target.disabled = true;
    let paramstr = new FormData()
    paramstr.append('marketer', document.getElementById('collectionviewsmarketer').value.split(' | ')[1]??'');
    paramstr.append('startdate', document.getElementById('startdate').value);
    paramstr.append('enddate', document.getElementById('enddate').value);
    let result = await fetch('../controllers/fetchwithdrawallogsforapproval.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        // event.target.disabled = false;
        returnedcashgroupdeposits = datasource = res.data;
        // initPagination(res.data, processwithdrawalrequestsetCurrentPage)
        // else callModal('No records retrieved')
        document.getElementById('processwithdrawalrequesttable').innerHTML = res.data.map((item, index)=>`
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.accountnumber??''}</td>
            <td>${item.accountname??''}</td>
            <td>${item.accountofficername??''}</td>
            <td>${item.reference??''}</td>
            <td>${formatDate(item.requestdate??'')}</td>
            <td><input placeholder="Disbursement Officer" style="padding: 10px" id="disbursementofficer-${index+1}" list="collectionviewmarketername" name="disbursementofficer"  onchange="checkdatalist(this)" /></td>
            <td>${formatCurrency(item.amount??'')}</td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center;gap: 10px">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px" onclick="event.preventDefault();approvewithdrawalrequest('disbursementofficer-${index+1}', '${item.id}', 'approve')">Approve</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="event.preventDefault();approvewithdrawalrequest('disbursementofficer-${index+1}', '${item.id}', 'decline')">Decline</button>
                </div>
            </td>
        </tr>
    `).join('');
        document.getElementById('processwithdrawalrequesttable').innerHTML += `
        <tr class="source-row-item">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>TOTAL</td>
            <td>${formatCurrency(res.data.reduce((sum, item)=>sum+Number(item.amount??0), 0))}</td>
        </tr>
    `
        
    } else {
        hideSpinner()
        if(document.getElementById('processwithdrawalrequesttable')) document.getElementById('processwithdrawalrequesttable').innerHTML = '';
        // event.target.disabled = false;
        // callModal(res.message, 0)
    }
}


function approvewithdrawalrequestactiontransaction(res){
    // console.log('here is running')
    generateprocesswithdrawalrequest()
    // document.getElementById('processwithdrawalrequestview').click()
}

function approvewithdrawalrequest(disburseid, id, state){
    if(state == 'decline')window.confirm('Are you sure you want to decline this request?')
    function param(){
        let p = new FormData();
        p.append('id', id)
       if(state == 'approve')p.append('disbursementofficer', document.getElementById(`${disburseid}`).value.split(' | ')[1])
       return p
    }
    if(state == 'approve'){
        if(!document.getElementById(`${disburseid}`).value){
            return callModal('Please choose a disbursement officer')
        }
        callController('approvewithdrawalrequestlog.php', param(), 'approvewithdrawalrequestlog', null, approvewithdrawalrequestactiontransaction)
    }
    if(state == 'decline'){
        callController('declinewithdrawalrequest.php', param(), 'declinewithdrawalrequest', null, approvewithdrawalrequestactiontransaction)
    }
}


var processwithdrawalrequestbtn = document.getElementById('processwithdrawalrequest')
if(processwithdrawalrequestbtn) processwithdrawalrequestbtn.addEventListener('click', openprocesswithdrawalrequest)



// viewwithdrawalrequest Cash Report --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = [];
async function openviewwithdrawalrequest() {
    await httpRequest('viewwithdrawalrequest.php')
    getUsers(fillupcollection)
    
    form = document.getElementById('viewwithdrawalrequestform')
    if(document.querySelector('#viewwithdrawalrequestview')) document.querySelector('#viewwithdrawalrequestview').addEventListener('click', generateviewwithdrawalrequest)
    document.querySelector('#print-vwr').addEventListener('click', printviewwithdrawalrequest)
    document.querySelector('#export-vwr').addEventListener('click', exportviewwithdrawalrequest)
        
    jtabledata = document.getElementById('viewwithdrawalrequesttable')
    // initializePaginationParams(viewwithdrawalrequestsetCurrentPage)
    // await fetchviewwithdrawalrequestPageData()
    await fetchgroupforwithdrawalrequest();
}

async function fetchgroupforwithdrawalrequest(){
  function action(result){
      console.log('result', result)
      document.getElementById('collectionviewsgroup').innerHTML += result.data.data.map(data=>`<option value="${data.id}">${data.groupname}</option>`).join('');
        new TomSelect('#collectionviewsgroup', {
            plugins: ['dropdown_input']
        });
  }
  callController('fetchgroupname.php', null, 'fetchgroupname', null, action)
}

function printviewwithdrawalrequest() {
    if(datasource.length) printContent('VIEW WITHDRAWAL REQUEST',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'jpagecontent');
}

function exportviewwithdrawalrequest() {
    if(datasource.length) tableToExcel('viewwithdrawalrequesttable', 'jpagecontent')
}


async function generateviewwithdrawalrequest() {
    showSpinner()
    document.getElementById('viewwithdrawalrequesttable').innerHTML =''
    // event.target.disabled = true; 
    let paramstr = new FormData()
    paramstr.append('marketer', document.getElementById('collectionviewsmarketer').value.split(' | ')[1]??'');
    paramstr.append('status', document.getElementById('status').value);
    paramstr.append('startdate', document.getElementById('startdate').value);
    paramstr.append('enddate', document.getElementById('enddate').value);
    paramstr.append('paymentmethod', document.getElementById('paymentmethod').value);
    paramstr.append('groupid', document.getElementById('collectionviewsgroup').value);
    let result = await fetch('../controllers/fetchwithdrawalrequestlogs.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner();
        returnedcashgroupdeposits = datasource = res.data;
        document.getElementById('viewwithdrawalrequesttable').innerHTML = res.data.map((item, index)=>`
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.accountnumber??''}</td>
            <td>${item.accountname??''}</td>
            <td>${item.accountofficername??''}</td>
            <td>${item.disbursementofficer.split(' | ')[1] ? item.disbursementofficer.split(' | ')[0] : item.disbursementofficername??''}</td>
            <td>${item.reference??''}</td>
            <td>${formatDate(item.requestdate??'')}</td>
            <td>${formatDate(item.paymentdate??'')}</td>
            <td>${item.approvedby??''}</td>
            <td>${item.groupname??''}</td>
            <td>${formatCurrency(item.amount??'')}</td>
            <td>${item.status??''}</td>
            <td>${item.paymentdate ? item.paymentstatus??'' : 'PENDING'}</td>
        </tr>
    `).join('');
        document.getElementById('viewwithdrawalrequesttable').innerHTML += `
        <tr class="source-row-item">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>TOTAL</td>
            <td>${formatCurrency(res.data.reduce((sum, item)=>sum+Number(item.amount), 0))}</td>
        </tr>
    `
        
    } else {
        hideSpinner()
        if(jtabledata) jtabledata.innerHTML = '';
        callModal(res.message, 0)
    }
}




var viewwithdrawalrequestbtn = document.getElementById('viewwithdrawalrequest')
if(viewwithdrawalrequestbtn) viewwithdrawalrequestbtn.addEventListener('click', openviewwithdrawalrequest)

