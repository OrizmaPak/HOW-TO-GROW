var form; datasource = [];

async function openGroupSystemCashPosition () {
    await httpRequest('groupsystemcashposition.php')
    
    form = document.getElementById('filtergroupsystemcashpositionform')
    if(form.querySelector('button')) form.querySelector('button').addEventListener('click', generateGroupSystemCashPositionReport)
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(GroupSystemCashPositionSetCurrentPage)
    await fetchGroupSystemCashPositionTableData()
}

async function fetchGroupSystemCashPositionTableData() {
    
}

async function generateGroupSystemCashPositionReport(event) {
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/groupsystemcash.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        document.querySelector('#groupsystemcashpositiontable tbody').innerHTML === ''
        event.target.disabled = false;
        groupsystemcashpositions = datasource = res.data;
        groupsystemcashpositions.length && initPagination(groupsystemcashpositions, GroupSystemCashPositionSetCurrentPage)
    }
    else {
        callModal('No records retrieved')
        event.target.disabled = false;
    }
}

function GroupSystemCashPositionSetCurrentPage(pageNum) {
    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(groupsystemcashpositions.length) {
        groupsystemcashpositions.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendGroupSystemCashPositionTableRows(item, index)
            }
        })
        
        if(document.querySelectorAll('.source-row-item').length == 0){
            groupsystemcashpositionbtn.click()
            form.querySelector('button').click()
        }
        
    }
}

function appendGroupSystemCashPositionTableRows(item, index) {
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ item.groupid }</td>
            <td>${ item.groupname }</td>
        </tr>
    `
}

var groupsystemcashpositionbtn = document.getElementById('groupsystemcashposition')
if(groupsystemcashpositionbtn) groupsystemcashpositionbtn.addEventListener('click', openGroupSystemCashPosition, false)