var form; datasource = [];
async function openViewGroupDeposits() {
    await httpRequest('viewgroupdeposits.php')
    
    form = document.getElementById('filterviewgroupdepositsform')
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generateViewGroupDepositsReport)
    form.querySelector('button#print-gd').addEventListener('click', printViewGroupDeposits)
    form.querySelector('button#export-gd').addEventListener('click', exportViewGroupDeposits)
        
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(viewGroupDepositssetCurrentPage)
    await fetchViewGroupDepositsPageData()
}

async function fetchViewGroupDepositsPageData() {
    await fetchViewGroupDepositLocations()
    await fetchViewGroupDepositGroupTargets()
    await fetchViewGroupDepositGroups()
}

function printViewGroupDeposits() {
    if(groupdeposits.length) printContent('Group Deposits', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportViewGroupDeposits() {
    if(groupdeposits.length) tableToExcel('viewgroupdepositstable', 'net_transactions')
}


async function generateViewGroupDepositsReport(event) {
    showSpinner()
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchgroupdeposit.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        event.target.disabled = false;
        groupdeposits = datasource = res.data;
        if(groupdeposits.length) initPagination(res.data, viewGroupDepositssetCurrentPage)
        else callModal('No records retrieved')
    }
    else {
        hideSpinner()
        if(jtabledata) jtabledata.innerHTML = '';
        event.target.disabled = false;
        callModal(res.message, 0)
    }
}


function editGroupDeposit(event, index) {
    let selecteditem = groupdeposits[index]
    if(selecteditem) {
        sessionStorage.setItem('groupdeposit', JSON.stringify({
            item: selecteditem
        }))
        groupDepositNav.click()
    }
    else return callModal('Item not available')
}


function viewGroupDepositssetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(groupdeposits.length) {
        groupdeposits.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendViewGroupDepositsTableRows(item, index)
            }
        })
        if(document.querySelector('#viewgroupdepositstable tbody').innerHTML === ''){
            viewgroupdepositsbtn.click()
            form.querySelector('button#submit').click()
        }
    }
}

async function appendViewGroupDepositsTableRows(item, index) {
    let grouptarget = grouptargets?.find(val => val.id == item.target)
    let groupname = viewdepositsgroups?.find(val => val.id == item.groupid)
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ grouptarget?.target == undefined ? '' : grouptarget.target  }</td>
            <td>${ groupname?.groupname == undefined ? '' : groupname.groupname }</td>
            <td>${ new Date(item.transactiondate).toLocaleDateString() }</td>
            <td style="text-transform: none">${ item.accountofficer}</td>
            <td>${ formatMoney(item.deposit) }</td>
            <td>${ formatMoney(item.excesscash) }</td>
            <td>${ formatMoney(item.returnedcash) }</td>
            <td>${ formatMoney(item.total)  }</td>
            <td class="flex no-pr">
                <div  style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="editGroupDeposit(event, ${index})">Edit</button>
                </div>
            </td>
        </tr>
    `
} 

async function fetchViewGroupDepositGroupTargets(event) {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupptarget.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        grouptargets = res.data;
    }
    else hideSpinner()
}

async function fetchViewGroupDepositGroups() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        viewdepositsgroups = res.data?.data
    }
    else hideSpinner()
}

async function fetchViewGroupDepositLocations() {
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

var viewgroupdepositsbtn = document.getElementById('viewgroupdeposits')
if(viewgroupdepositsbtn) viewgroupdepositsbtn.addEventListener('click', openViewGroupDeposits)