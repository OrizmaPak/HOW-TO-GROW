var form; datasource = [];
async function openExcessCashReport() {
    await httpRequest('excesscashreport.php')
    
    form = document.getElementById('filterexcesscashreportform')
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generateExcessCashReport)
    form.querySelector('button#print-ec').addEventListener('click', printExcessCashReport)
    form.querySelector('button#export-ec').addEventListener('click', exportExcessCashReport)
        
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(excessCashReportsetCurrentPage)
    await fetchExcessCashReportPageData()
}

async function fetchExcessCashReportPageData() {
    await fetchExcessCashReportLocations()
    await fetchExcessCashReportGroupTargets()
    await fetchExcessCashReportGroups()
}

function printExcessCashReport() {
    if(excesscashgroupdeposits.length) printContent('Excess Cash Report', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportExcessCashReport() {
    if(excesscashgroupdeposits.length) tableToExcel('excesscashreporttable', 'excess_cash_report')
}


async function generateExcessCashReport(event) {
    showSpinner()
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchgroupdeposit.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        event.target.disabled = false;
        excesscashgroupdeposits = datasource = res.data;
        if(excesscashgroupdeposits.length) initPagination(res.data, excessCashReportsetCurrentPage)
        else callModal('No records retrieved')
    }
    else {
        hideSpinner()
        if(jtabledata) jtabledata.innerHTML = '';
        event.target.disabled = false;
        callModal(res.message, 0)
    }
}

function excessCashReportsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(excesscashgroupdeposits.length) {
        excesscashgroupdeposits.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendExcessCashReportTableRows(item, index)
            }
        })
        
        if(document.querySelector('#excesscashreporttable tbody').innerHTML === ''){
            excesscashreportbtn.click()
            form.querySelector('button#submit').click()
        }
    }
}

async function appendExcessCashReportTableRows(item, index) {
    let grouptarget = grouptargets?.find(val => val.id == item.target)
    let groupname = viewdepositsgroups?.find(val => val.id == item.groupid)
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ grouptarget?.target == undefined ? '' : grouptarget.target  }</td>
            <td>${ groupname?.groupname == undefined ? '' : groupname.groupname }</td>
            <td>${ new Date(item.transactiondate).toLocaleDateString() }</td>
            <td style="text-transform: none">${ item.accountofficer}</td>
            <td>${ formatMoney(item.excesscash) }</td>
            <td>${ formatMoney(item.total)  }</td>
        </tr>
    `
} 

async function fetchExcessCashReportGroupTargets(event) {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupptarget.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        grouptargets = res.data;
    }
    else hideSpinner()
}

async function fetchExcessCashReportGroups() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        viewdepositsgroups = res.data?.data
    }
    else hideSpinner()
}

async function fetchExcessCashReportLocations() {
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

var excesscashreportbtn = document.getElementById('excesscashreport')
if(excesscashreportbtn) excesscashreportbtn.addEventListener('click', openExcessCashReport)