var form; datasource = [];
async function openReturnedCashReport() {
    await httpRequest('returnedcashreport.php')
    
    form = document.getElementById('filterreturnedcashreportform')
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generateReturnedCashReport)
    form.querySelector('button#print-rc').addEventListener('click', printReturnedCashReport)
    form.querySelector('button#export-rc').addEventListener('click', exportReturnedCashReport)
        
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(returnedCashReportsetCurrentPage)
    await fetchReturnedCashReportPageData()
}

async function fetchReturnedCashReportPageData() {
    await fetchReturnedCashReportLocations()
    await fetchReturnedCashReportGroupTargets()
    await fetchReturnedCashReportGroups()
}

function printReturnedCashReport() {
    if(returnedcashgroupdeposits.length) printContent('Returned Cash Report', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportReturnedCashReport() {
    if(returnedcashgroupdeposits.length) tableToExcel('returnedcashreporttable', 'returned_cash_report')
}


async function generateReturnedCashReport(event) {
    showSpinner()
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchgroupdeposit.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        event.target.disabled = false;
        returnedcashgroupdeposits = datasource = res.data;
        if(returnedcashgroupdeposits.length) initPagination(res.data, returnedCashReportsetCurrentPage)
        else callModal('No records retrieved')
    }
    else {
        hideSpinner()
        if(jtabledata) jtabledata.innerHTML = '';
        event.target.disabled = false;
        callModal(res.message, 0)
    }
}

function returnedCashReportsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(returnedcashgroupdeposits.length) {
        returnedcashgroupdeposits.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendReturnedCashReportTableRows(item, index)
            }
        })
        
        if(document.querySelector('#returnedcashreporttable tbody').innerHTML === ''){
            returnedcashreportbtn.click()
            form.querySelector('button#submit').click()
        }
    }
}

async function appendReturnedCashReportTableRows(item, index) {
    let grouptarget = grouptargets?.find(val => val.id == item.target)
    let groupname = viewdepositsgroups?.find(val => val.id == item.groupid)
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ grouptarget?.target == undefined ? '' : grouptarget.target  }</td>
            <td>${ groupname?.groupname == undefined ? '' : groupname.groupname }</td>
            <td>${ new Date(item.transactiondate).toLocaleDateString() }</td>
            <td style="text-transform: none">${ item.accountofficer}</td>
            <td>${ formatMoney(item.returnedcash) }</td>
            <td>${ formatMoney(item.total)  }</td>
        </tr>
    `
} 

async function fetchReturnedCashReportGroupTargets(event) {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupptarget.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        grouptargets = res.data;
    }
    else hideSpinner()
}

async function fetchReturnedCashReportGroups() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        viewdepositsgroups = res.data?.data
    }
    else hideSpinner()
}

async function fetchReturnedCashReportLocations() {
    showSpinner()
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data =  res.data?.data;
        locationsvar = data;
        let options = '';
        data?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.location} </option>
            `
        })
        if(form.querySelector('#location')){
            form.querySelector('#location').innerHTML = ''
            form.querySelector('#location').innerHTML = '<option value="">--Select Location --</option>'+options
        }
    }else  hideSpinner()
}

var returnedcashreportbtn = document.getElementById('returnedcashreport')
if(returnedcashreportbtn) returnedcashreportbtn.addEventListener('click', openReturnedCashReport)