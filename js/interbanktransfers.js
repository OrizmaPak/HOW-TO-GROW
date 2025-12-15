    // interbank transfers  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = [];let transbatch;
async function openInterbankTransfer() {
    await httpRequest('interbanktransfer.php')
    form = document.getElementById('filterinterbanktransferform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateInterbanktransferTable)
            if(form.querySelector('button#print-it')) form.querySelector('button#print-it').addEventListener('click', printInterbanktransferTable)
            if(form.querySelector('button#export-it')) form.querySelector('button#export-it').addEventListener('click', exportInterbanktransferTable)
            if(document.getElementById('submitforapproval'))document.getElementById('submitforapproval').addEventListener('click', submitinterbankforapproval)
            if(document.getElementById('submitfordisapproval'))document.getElementById('submitfordisapproval').addEventListener('click', submitinterbankfordisapproval)
            if(document.getElementById('submitforfreezeall')){
                document.getElementById('submitforfreezeall').style.display = canFreezeInterbank() ? '' : 'none';
                document.getElementById('submitforfreezeall').addEventListener('click', submitinterbankforfreezeall)
            }
            if(document.getElementById('selectall'))document.getElementById('selectall').addEventListener('click', e=>{
                // Only select visible checkboxes (not hidden ones)
                const checkboxes = document.getElementsByName('selectot');
                for(let i=0;i<checkboxes.length;i++){
                    const checkbox = checkboxes[i];
                    // Check if checkbox is visible (not hidden via class or CSS)
                    if(checkbox && !checkbox.classList.contains('hidden') && checkbox.offsetParent !== null){
                        checkbox.checked = true;
                    }
                }
            })
            if(document.getElementById('deselectall'))document.getElementById('deselectall').addEventListener('click', e=>{
                // Only deselect visible checkboxes (not hidden ones)
                const checkboxes = document.getElementsByName('selectot');
                for(let i=0;i<checkboxes.length;i++){
                    const checkbox = checkboxes[i];
                    // Check if checkbox is visible (not hidden via class or CSS)
                    if(checkbox && !checkbox.classList.contains('hidden') && checkbox.offsetParent !== null){
                        checkbox.checked = false;
                    }
                }
            })
            if(form.querySelector('#startdate'))form.querySelector('#startdate').valueAsDate = new Date()
            if(form.querySelector('#enddate'))form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewInterbanktransfersetCurrentPage)
            // await fetchInterbankTransferTableData()
        }
        if(localStorage.getItem('batch')){
            transbatch = localStorage.getItem('batch')
            localStorage.removeItem('batch');
            form.querySelector('button#submit').click();
        }
}

async function submitinterbankforapproval() {
    // Get all transfer checkboxes
    const checkboxes = document.getElementsByName('selectot');
    if (checkboxes.length < 1) return callModal('No Transfer Selected', 0);

    // Collect selected transfers
    const selectedTransfers = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            const transferId = checkboxes[i].id.split('_')[1];
            selectedTransfers.push(transferId);
        }
    }
    if (selectedTransfers.length < 1) return callModal('No Transfer Selected', 0);

    // Confirm the approval action
    if (confirm('Are you sure you want to approve the selected transfers?')) {
        // Prepare the data
        const formData = new FormData();
        for (let j = 0; j < selectedTransfers.length; j++) {
            formData.append(`id${j + 1}`, selectedTransfers[j]);
        }
        formData.append('rowsize', selectedTransfers.length);

        // Send the request
        try {
            const result = await httpJsonRequest('../controllers/payinterbanktransfer.php', 'POST', formData);
            if (result) {
                const response = JSON.parse(result);
                if (response.status) {
                    callModal(response.message, 1);
                    form.querySelector('button#submit').click();
                } else {
                    callModal(response.message || 'Failed to approve transfer', 0);
                    form.querySelector('button#submit').click();
                }
            }
        } catch (error) {
            console.error('Error during approval:', error);
            callModal('An error occurred while approving the transfers', 0);
                    form.querySelector('button#submit').click();
        }
    }
}

function canFreezeInterbank() {
    const role = document.getElementById('sessionrole')?.value;
    const permissions = document.getElementById('sessionpermission')?.value || '';
    return role === 'SUPERADMIN' || permissions.includes('FREEZE INTERBANK TRANSFER');
}


async function submitinterbankfordisapproval() {
    // Check if any transfer is selected
    const selectElements = document.getElementsByName('selectot');
    if (selectElements.length < 1) {
        return Swal.fire('No Transfer Selected', '', 'warning');
    }

    // Collect selected transfer IDs
    let selectedTransfers = [];
    for (let i = 0; i < selectElements.length; i++) {
        if (selectElements[i].checked) {
            const transferId = selectElements[i].id.split('_')[1];
            selectedTransfers.push(transferId);
        }
    }

    // Check if any transfer is selected after iterating
    if (selectedTransfers.length < 1) {
        return Swal.fire('No Transfer Selected', '', 'warning');
    }

    // SweetAlert confirmation prompt
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to cancel the selected transfer?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it',
    });

    // If the user confirms the action
    if (result.isConfirmed) {
        try {
            let paramstr = new FormData();
            selectedTransfers.forEach((id, index) => {
                paramstr.append(`id${index + 1}`, id);
            });
            paramstr.append('rowsize', selectedTransfers.length)

            const response = await httpJsonRequest('../controllers/cancelinterbanktransfer.php', 'POST', paramstr);

            if (response) {
                const res = JSON.parse(JSON.stringify(response));
                if (res.status) {
                    Swal.fire('Transfer Cancelled!', 'The selected transfers have been cancelled.', 'success');
                    generateInterbanktransferTable(); // Refresh the table
                    form.querySelector('button#submit').click();
                } else {
                    Swal.fire('Error', res.message || 'An error occurred while cancelling transfers.', 'error');
                    form.querySelector('button#submit').click();
                }
            }
        } catch (error) {
            Swal.fire('Error', 'An unexpected error occurred.', 'error');
                    form.querySelector('button#submit').click();
        }
    }
}

async function submitinterbankforfreezeall() {
    const selectElements = document.getElementsByName('selectot');
    if (selectElements.length < 1) return Swal.fire('No Transfer Selected', '', 'warning');
    if (!canFreezeInterbank()) return Swal.fire('Permission denied', 'You cannot freeze transfers.', 'error');

    const selectedTransfers = [];
    for (let i = 0; i < selectElements.length; i++) {
        if (selectElements[i].checked) {
            const transferId = selectElements[i].id.split('_')[1];
            selectedTransfers.push(transferId);
        }
    }

    if (!selectedTransfers.length) return Swal.fire('No Transfer Selected', '', 'warning');

    const confirmation = await Swal.fire({
        title: 'Freeze transfers?',
        text: 'Do you want to freeze the selected transfer(s)?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, freeze',
        cancelButtonText: 'No, keep active',
    });

    if (!confirmation.isConfirmed) return;

    try {
        const paramstr = new FormData();
        selectedTransfers.forEach((id, idx) => paramstr.append(`id${idx + 1}`, id));
        paramstr.append('rowsize', selectedTransfers.length);

        const response = await httpJsonRequest('../controllers/freezeinterbanktransaction.php', 'POST', paramstr);

        if (response) {
            const res = JSON.parse(JSON.stringify(response));
            if (res.status) {
                Swal.fire('Frozen', res.message || 'Selected transfers have been frozen.', 'success');
            } else {
                Swal.fire('Error', res.message || 'Unable to freeze selected transfers.', 'error');
            }
            generateInterbanktransferTable();
            form.querySelector('button#submit').click();
        }
    } catch (error) {
        console.error('Error freezing transfers:', error);
        Swal.fire('Error', 'An unexpected error occurred.', 'error');
        form.querySelector('button#submit').click();
    }
}

function updateInterbankTransferTotals() {
    const totalsBar = document.getElementById('interbank-totals');
    const totalCountEl = document.getElementById('interbank-total-count');
    const totalAmountEl = document.getElementById('interbank-total-amount');

    if (!totalsBar || !totalCountEl || !totalAmountEl) return;

    if (!interbanktransfers || !interbanktransfers.length) {
        totalsBar.style.display = 'none';
        totalCountEl.textContent = 'Total records: 0';
        totalAmountEl.textContent = 'Total amount: ' + (typeof formatMoney === 'function' ? formatMoney(0) : '0.00');
        return;
    }

    const totalCount = interbanktransfers.length;
    const totalAmount = interbanktransfers.reduce((sum, item) => {
        const amount = parseFloat(item.amount);
        return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

    totalsBar.style.display = 'flex';
    totalCountEl.textContent = `Total records: ${totalCount}`;
    totalAmountEl.textContent = `Total amount: ${typeof formatMoney === 'function' ? formatMoney(totalAmount) : totalAmount.toFixed(2)}`;
}


async function fetchInterbankTransferTableData() {
    await fetchUsersForInterbanktransfer()
}


function printInterbanktransferTable() {
    if(interbanktransfers?.length) printContent('Interbank Transfers', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportInterbanktransferTable() {
    if(interbanktransfers?.length) tableToExcel('interbanktransfertable', 'withdrawals')
}


async function generateInterbanktransferTable() {
    showSpinner();
    jtabledata.innerHTML = 'Loading...'
    let paramstr 
    if(!transbatch){
        paramstr = new FormData(form)
    }
    if(transbatch){
        paramstr = new FormData()
        paramstr.append('batchnumber', transbatch)
    }
    let result = await fetch('../controllers/fetchauthorisedinterbanktransfers.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    jtabledata.innerHTML = 'No data'
    if(result) {
        hideSpinner()
        if (res.status) {
    transbatch = '';
    interbanktransfers = datasource = res.data;

    // 🔹 update totals bar
    updateInterbankTransferTotals();

    interbanktransfers.length && initPagination(interbanktransfers, viewInterbanktransfersetCurrentPage);
} else {
    hideSpinner();
    transbatch = '';

    // 🔹 clear totals when no data
    interbanktransfers = [];
    updateInterbankTransferTotals();

    setTimeout(() => callModal('No records retrieved'), 4000);
}

    }
    else {
    hideSpinner();
    transbatch = '';
    interbanktransfers = [];
    updateInterbankTransferTotals();
}

}

function viewInterbanktransfersetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(interbanktransfers.length) {
        interbanktransfers.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendInterbanktransfersTableRows(item, index)
            }
        })
        if(document.querySelector('#interbanktransfertable tbody').innerHTML === '') interbanktransferbtn.click()
    }
}

async function appendInterbanktransfersTableRows(item, index) {
     // Keep existing hide rules for checkboxes/actions when locked
     const status = String(item.transactionstatus || '').trim().toUpperCase();
     const hiddenClass = status === 'SUCCESS' || status === 'PROCESSING' ? 'hidden' : '';
     const canFreeze = canFreezeInterbank();
     
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td><input class="${hiddenClass}" type="checkbox" name="selectot" id="check_${item.id}" /></td>
            <td>${item.source}</td>
            <td>${item.currency}</td>
            <td>${item.bankname}</td>
            <td>${item.bankaccountnumber}</td>
            <td>${item.reason}</td>
            <td>${item.recipient}</td>
            <td>${item.reference}</td>
            <td>${item.transfer_code}</td>
            <td>${new Date(item.transferdate).toLocaleDateString() }</td>
            <td>${item.accountnumber}</td>
            <td>${item.transactionstatus}</td>
            <td>${item.localreference}</td>
            <td style="text-align:left">${formatMoney(item.amount)}</td>
            <td class="no-pr" style="white-space:nowrap">
                <div style="display:inline-flex;align-items:center;gap:10px">
                    <div style="display:inline-flex;align-items:center;gap:10px;visibility:${item.authorisation == 'APPROVED' ? 'visible': 'hidden'}" class="no-pr ${hiddenClass}">
                        <button ${item.transactionstatus == 'PENDING' ? 'disabled': ''} style="padding:5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px;display:${item.transactionstatus == 'PENDING' ? 'none': 'inline-block'}" value="${index}" onclick="payInterbankTransfer(${index})">Pay</button>
                        <button style="padding:5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:tomato;border-radius:3px" value="${index}" onclick="cancelInterbankTransfer(${index})">Cancel</button>
                    </div>
                    <button style="padding:5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:#6b21a8;border-radius:3px;display:${canFreeze ? 'inline-block' : 'none'}" value="${index}" onclick="freezeInterbankTransfer(${index})">Freeze</button>
                </div>
            </td>
        </tr>
    `
}

async function payInterbankTransfer(index) {
    let selecteditem = interbanktransfers[index];
    
    if (selecteditem) {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to proceed with the transfer?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed!',
            cancelButtonText: 'No, cancel'
        });

        if (confirmation.isConfirmed) {
            let paramstr = new FormData();
            paramstr.append('rowsize', 1);
            paramstr.append('id1', selecteditem?.id);

            let result = await httpJsonRequest('../controllers/payinterbanktransfer.php', 'POST', paramstr);
            if (result) {
                let res = JSON.parse(JSON.stringify(result));
                if (res.status) {
                    callModal(res.message, 1);
                    generateInterbanktransferTable();
                    form.querySelector('button#submit').click();
                } else {
                    return callModal(res.message, 0);
                    form.querySelector('button#submit').click();
                }
            } else {
                return callModal('Error: Unable to complete task', 0);
                    form.querySelector('button#submit').click();
            }
        }
    }
}


async function cancelInterbankTransfer(index) {
    let selecteditem = interbanktransfers[index];

    if (selecteditem) {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to cancel the transfer?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it'
        });

        if (confirmation.isConfirmed) {
            let paramstr = new FormData();
            paramstr.append('rowsize', 1);
            paramstr.append('id1', selecteditem?.id);

            let result = await httpJsonRequest('../controllers/cancelinterbanktransfer.php', 'POST', paramstr);
            if (result) {
                let res = JSON.parse(JSON.stringify(result));
                if (res.status) {
                    callModal('Transfer cancelled successfully', 1);
                    generateInterbanktransferTable();
                    form.querySelector('button#submit').click();
                } else {
                    return callModal(res.message, 0);
                    form.querySelector('button#submit').click();
                }
            } else {
                return callModal('Error: Unable to complete task', 0);
                    form.querySelector('button#submit').click();
            }
        }
    }
}

async function freezeInterbankTransfer(index) {
    const selecteditem = interbanktransfers[index];

    if (!selecteditem) return;
    if (!canFreezeInterbank()) return;

    const confirmation = await Swal.fire({
        title: 'Freeze transfer?',
        text: 'Do you want to freeze this transfer?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6b21a8',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, freeze it',
        cancelButtonText: 'No, keep it'
    });

    if (!confirmation.isConfirmed) return;

    const paramstr = new FormData();
    paramstr.append('rowsize', 1);
    paramstr.append('id1', selecteditem?.id);

    const result = await httpJsonRequest('../controllers/freezeinterbanktransaction.php', 'POST', paramstr);
    if (result) {
        const res = JSON.parse(JSON.stringify(result));
        if (res.status) {
            callModal(res.message || 'Transfer frozen successfully', 1);
            generateInterbanktransferTable();
            form.querySelector('button#submit').click();
        } else {
            callModal(res.message || 'Unable to freeze transfer', 0);
            form.querySelector('button#submit').click();
        }
    } else {
        callModal('Error: Unable to complete task', 0);
        form.querySelector('button#submit').click();
    }
}


async function fetchUsersForInterbanktransfer () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deletedwithdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var interbanktransferbtn = document.getElementById("interbanktransfer");
if (interbanktransferbtn) interbanktransferbtn.addEventListener("click", openInterbankTransfer, false);

// approve transfer --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function openapproveTransfer() {
    await httpRequest('approvetransfer.php')
    form = document.getElementById('filterapprovetransferform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateapprovetransferTable)
            if(form.querySelector('button#print-it')) form.querySelector('button#print-it').addEventListener('click', printapprovetransferTable)
            if(form.querySelector('button#export-it')) form.querySelector('button#export-it').addEventListener('click', exportapprovetransferTable)
            if(document.getElementById('submitforapproval'))document.getElementById('submitforapproval').addEventListener('click', submitapproveforapproval)
            if(document.getElementById('submitfordisapproval'))document.getElementById('submitfordisapproval').addEventListener('click', submitapprovefordisapproval)
            if(document.getElementById('selectall'))document.getElementById('selectall').addEventListener('click', e=>{
                for(let i=0;i<document.getElementsByName('selectot').length;i++){
                    document.getElementsByName('selectot')[i].checked = true
                }
            })
            if(document.getElementById('deselectall'))document.getElementById('deselectall').addEventListener('click', e=>{
                for(let i=0;i<document.getElementsByName('selectot').length;i++){
                    document.getElementsByName('selectot')[i].checked = false
                }
            })
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewapprovetransfersetCurrentPage)
            // await fetchapproveTransferTableData()
        }
        fetchapprovelocations()
}

async function fetchapprovelocations() {
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        let approvelocationlocations = res.data?.data;
        let options = '';
        approvelocationlocations?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.location} </option>
            `
        })
        if(document.querySelector('#branch')){
            document.querySelector('#branch').innerHTML = ''
            document.querySelector('#branch').innerHTML = '<option value="" selected="">--Select branch --</option>'+options
            // document.querySelector('#branch').value = assetsUrl.sessionLocation
        }
    }
}

async function submitapproveforapproval() {
    const checkboxes = document.getElementsByName('selectot');
    if (checkboxes.length < 1) return callModal('No Transfer Selected', 0);

    const selectedTransfers = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            const transferId = checkboxes[i].id.split('_')[1];
            selectedTransfers.push(transferId);
        }
    }
    if (selectedTransfers.length < 1) return callModal('No Transfer Selected', 0);

    if (!confirm('Are you sure you want to approve the selected transfers?')) return;

    const formData = new FormData();
    selectedTransfers.forEach((id, idx) => formData.append(`id${idx + 1}`, id));
    formData.append('rowsize', selectedTransfers.length);
    formData.append('authorisation', 'APPROVE');

    try {
        const response = await httpJsonRequest('../controllers/authorisetransfer.php', 'POST', formData);
        // httpJsonRequest should already return parsed JSON; handle it defensively
        if (!response) {
            callModal('No response from server', 0);
            if (form) form.querySelector('button#submit').click();
            return;
        }

        if (response.status) {
            callModal(response.message || 'Transfers approved', 1);
        } else {
            callModal(response.message || 'Failed to approve transfer', 0);
        }
        // refresh table
        if (form) form.querySelector('button#submit').click();
    } catch (error) {
        console.error('Error during approval:', error);
        callModal('An error occurred while approving the transfers', 0);
        if (form) form.querySelector('button#submit').click();
    }
}


async function submitapprovefordisapproval() {
    const selectElements = document.getElementsByName('selectot');
    if (selectElements.length < 1) {
        return Swal.fire('No Transfer Selected', '', 'warning');
    }

    const selectedTransfers = [];
    for (let i = 0; i < selectElements.length; i++) {
        if (selectElements[i].checked) {
            const transferId = selectElements[i].id.split('_')[1];
            selectedTransfers.push(transferId);
        }
    }
    if (selectedTransfers.length < 1) {
        return Swal.fire('No Transfer Selected', '', 'warning');
    }

    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to cancel the selected transfer?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it',
    });

    if (!result.isConfirmed) return;

    try {
        let paramstr = new FormData();
        selectedTransfers.forEach((id, index) => paramstr.append(`id${index + 1}`, id));
        paramstr.append('rowsize', selectedTransfers.length);
        paramstr.append('authorisation', 'DECLINE');

        const response = await httpJsonRequest('../controllers/authorisetransfer.php', 'POST', paramstr);

        if (!response) {
            Swal.fire('Error', 'No response from server', 'error');
            if (form) form.querySelector('button#submit').click();
            return;
        }

        if (response.status) {
            Swal.fire('Transfer Cancelled!', 'The selected transfers have been cancelled.', 'success');
        } else {
            Swal.fire('Error', response.message || 'An error occurred while cancelling transfers.', 'error');
        }
        // refresh table
        if (form) form.querySelector('button#submit').click();
    } catch (error) {
        console.error('Error cancelling transfers:', error);
        Swal.fire('Error', 'An unexpected error occurred.', 'error');
        if (form) form.querySelector('button#submit').click();
    }
}



async function fetchapproveTransferTableData() {
    await fetchUsersForapprovetransfer()
}


function printapprovetransferTable() {
    if(approvetransfers?.length) printContent('approve Transfers', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportapprovetransferTable() {
    if(approvetransfers?.length) tableToExcel('approvetransfertable', 'withdrawals')
}


async function generateapprovetransferTable() {
    showSpinner();
    if (jtabledata) jtabledata.innerHTML = 'Loading...'; // <-- fixed from `-` to `=`
    let paramstr = new FormData(form);
    paramstr.append('authorisation', 'APPROVED');

    try {
        let result = await fetch('../controllers/fetchinterbanktransfers.php', { method: 'POST', body: paramstr, headers: new Headers() });
        let res = await result.json();
        jtabledata.innerHTML = 'No Data';
        hideSpinner();

        if (res && res.status) {
            approvetransfers = datasource = res.data || [];
            if (approvetransfers.length) {
                initPagination(approvetransfers, viewapprovetransfersetCurrentPage);
            } else {
                // Ensure totals and empty state are correct
                updateApproveTotals(approvetransfers || [], []);
                setTimeout(()=>callModal('No records retrieved'), 4000);
            }
        } else {
            updateApproveTotals([], []);
            setTimeout(()=>callModal('No records retrieved'), 4000);
        }
    } catch (err) {
        hideSpinner();
        console.error('Error fetching transfers:', err);
        callModal('Failed to fetch transfers', 0);
    }
}

/**
 * Update totals display (overall + current page) and the table footer.
 * - allData: array of all transfers returned by the server (approvetransfers)
 * - pageItems: array of items currently shown on screen (page)
 */
function updateApproveTotals(allData = [], pageItems = []) {
    // safe guards
    if (!Array.isArray(allData)) allData = [];
    if (!Array.isArray(pageItems)) pageItems = [];

    // helper to parse amount (handles strings with commas)
    function parseAmount(val) {
        if (val == null || val === '') return 0;
        if (typeof val === 'number') return val;
        // strip commas / currency symbols and parse
        return Number(String(val).replace(/[^0-9.-]+/g, '')) || 0;
    }

    // overall totals
    const totalCount = allData.length;
    const totalAmount = allData.reduce((s, it) => s + parseAmount(it.amount), 0);

    // page totals
    const pageTotal = pageItems.reduce((s, it) => s + parseAmount(it.amount), 0);

    // status counts (overall)
    const counts = allData.reduce((acc, it) => {
        const st = (it.transactionstatus || '').toUpperCase();
        if (st.indexOf('PENDING') !== -1) acc.pending++;
        else if (st.indexOf('APPROVED') !== -1) acc.approved++;
        else if (st.indexOf('DECLINED') !== -1 || st.indexOf('CANCEL') !== -1) acc.declined++;
        else acc.other++;
        return acc;
    }, { pending: 0, approved: 0, declined: 0, other: 0 });

    // write to DOM (if elements exist)
    const el = id => document.getElementById(id);
    if (el('total-count')) el('total-count').textContent = totalCount;
    if (el('total-amount')) el('total-amount').textContent = formatMoney(totalAmount);
    if (el('page-total')) el('page-total').textContent = formatMoney(pageTotal);
    if (el('count-pending')) el('count-pending').textContent = counts.pending;
    if (el('count-approved')) el('count-approved').textContent = counts.approved;
    if (el('count-declined')) el('count-declined').textContent = counts.declined;
    if (el('tfoot-amount')) el('tfoot-amount').textContent = formatMoney(totalAmount); // show overall total in tfoot

    // If you want the tfoot to show the page total instead, change the above to pageTotal.
}


function viewapprovetransfersetCurrentPage (pageNum){
    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    let pageItems = [];
    if(approvetransfers && approvetransfers.length) {
        approvetransfers.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendapprovetransfersTableRows(item, index)
                pageItems.push(item);
            }
        })
        if(document.querySelector('#approvetransfertable tbody').innerHTML === '') approvetransferbtn.click()
    }
    // update totals for full dataset and current page
    updateApproveTotals(approvetransfers || [], pageItems);
}

async function appendapprovetransfersTableRows(item, index) {
    // Decide visibility for approve button:
    // show approve when item.authorisation == 'APPROVED' AND transactionstatus is NOT 'PENDING' 
    const isAuthorised = String(item.authorisation || '').toUpperCase() === 'APPROVED';
    const isPending = String(item.transactionstatus || '').toUpperCase().indexOf('PENDING') !== -1;
    const showApproveBtn = isAuthorised && !isPending;

    const approveBtnStyle = showApproveBtn ? 'display:inline-block' : 'display:none';
    const declineBtnStyle = 'display:inline-block';

    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td><input type="checkbox" name="selectot" id="check_${item.id}" /></td>
            <td>${item.source || ''}</td>
            <td>${item.currency || ''}</td>
            <td>${item.bankname || ''}</td>
            <td>${item.bankaccountnumber || ''}</td>
            <td>${item.reason || ''}</td>
            <td>${item.recipient || ''}</td>
            <td>${item.reference || ''}</td>
            <td>${item.transfer_code || ''}</td>
            <td>${ item.transferdate ? new Date(item.transferdate).toLocaleDateString() : '' }</td>
            <td>${item.accountnumber || ''}</td>
            <td>${item.transactionstatus || ''}</td>
            <td>${item.localreference || ''}</td>
            <td style="text-align:left">${formatMoney(item.amount)}</td>
            <td class="no-pr">
                <div style="align-items:center;display:flex;gap:10px" class="flex no-pr">
                    <button ${!showApproveBtn ? 'disabled' : ''} style="padding:5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px;${approveBtnStyle}" value="${index}" onclick="payapproveTransfer(${index})">Approve</button>
                    <button style="padding:5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:tomato;border-radius:3px;${declineBtnStyle}" value="${index}" onclick="cancelapproveTransfer(${index})">Decline</button>
                </div>
            </td>
        </tr>
    `;
}



async function payapproveTransfer(index) {
    let selecteditem = approvetransfers[index];
    
    if (selecteditem) {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to approve with the transfer?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve!',
            cancelButtonText: 'No, cancel'
        });

        if (confirmation.isConfirmed) {
            let paramstr = new FormData();
            paramstr.append('rowsize', 1);
            paramstr.append('id1', selecteditem?.id);
            paramstr.append('authorisation', 'APPROVE');

            let result = await httpJsonRequest('../controllers/authorisetransfer.php', 'POST', paramstr);
            if (result) {
                let res = JSON.parse(JSON.stringify(result));
                if (res.status) {
                    callModal(res.message, 1);
                    generateapprovetransferTable();
                    form.querySelector('button#submit').click();
                } else {
                    return callModal(res.message, 0);
                    form.querySelector('button#submit').click();
                }
            } else {
                return callModal('Error: Unable to complete task', 0);
                    form.querySelector('button#submit').click();
            }
        }
    }
}


async function cancelapproveTransfer(index) {
    let selecteditem = approvetransfers[index];

    if (selecteditem) {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to decline the transfer?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, decline it!',
            cancelButtonText: 'No, keep it'
        });

        if (confirmation.isConfirmed) {
            let paramstr = new FormData();
            paramstr.append('rowsize', 1);
            paramstr.append('id1', selecteditem?.id);
            paramstr.append('authorisation', 'DECLINE');

            let result = await httpJsonRequest('../controllers/authorisetransfer.php', 'POST', paramstr);
            if (result) {
                let res = JSON.parse(JSON.stringify(result));
                if (res.status) {
                    callModal('Transfer declined successfully', 1);
                    generateapprovetransferTable();
                    form.querySelector('button#submit').click();
                } else {
                    return callModal(res.message, 0);
                    form.querySelector('button#submit').click();
                }
            } else {
                return callModal('Error: Unable to complete task', 0);
                    form.querySelector('button#submit').click();
            }
        }
    }
}


async function fetchUsersForapprovetransfer () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deletedwithdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var approvetransferbtn = document.getElementById("approvetransfer");
if (approvetransferbtn) approvetransferbtn.addEventListener("click", openapproveTransfer, false);

// view recipients --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = []
async function openViewRecipients() {
    await httpRequest('viewrecipients.php')
    form = document.getElementById('filterviewrecipientsform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateViewRecipientsTable)
            if(form.querySelector('button#print-vr')) form.querySelector('button#print-vr').addEventListener('click', printViewRecipientsTable)
            if(form.querySelector('button#export-vr')) form.querySelector('button#export-vr').addEventListener('click', exportViewRecipientsTable)
            if(form.querySelector('#startdate'))form.querySelector('#startdate').valueAsDate = new Date()
            if(form.querySelector('#enddate'))form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewRecipientssetCurrentPage)
            // await fetchViewRecipientsTableData()
        }
}

async function fetchViewRecipientsTableData() {
    await fetchUsersForViewRecipients()
}


function printViewRecipientsTable() {
    if(viewrecipientss?.length) printContent('Recipients', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportViewRecipientsTable() {
    if(viewrecipientss?.length) tableToExcel('viewrecipientstable', 'withdrawals')
}


async function generateViewRecipientsTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchrecipients.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            viewrecipientss = datasource = res.data;
            viewrecipientss.length && initPagination(viewrecipientss, viewRecipientssetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewRecipientssetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewrecipientss.length) {
        viewrecipientss.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendViewRecipientssTableRows(item, index)
            }
        })
        if(document.querySelector('#viewrecipientstable tbody').innerHTML === '') viewrecipientsbtn.click()
    }
}

async function appendViewRecipientssTableRows(item, index) {
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.accounttype}</td>
            <td>${item.accountnumber}</td>
            <td>${item.accountname}</td>
            <td>${item.bankaccountname}</td>
            <td>${item.bankcode}</td>
            <td>${item.bankname}</td>
            <td>${item.currency}</td>
            <td>${item.description}</td>
            <td>${item.authorisationcode}</td>
            <td>${item.customeraccountnumber}</td>
            <td>${item.recipient_code}</td>
            <td>${item.status}</td>
        </tr>
    `
}

       
async function fetchUsersForViewRecipients () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deletedwithdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewrecipientsbtn = document.getElementById("viewrecipients");
if (viewrecipientsbtn) viewrecipientsbtn.addEventListener("click", openViewRecipients, false);


// view transfers --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form;  datasource = [];
async function openViewTransfers() {
    transbatch = '';
    await httpRequest('viewtransfers.php')
    let locationx = document.getElementById('location')
    await fetchLocations()
    let options = '';
        locationsvar?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.location} </option>
            `
        })
        locationx.innerHTML = ''
        locationx.innerHTML = '<option value="" selected="">--Select Location --</option>'+options
    form = document.getElementById('filterviewtransfersform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateViewTransfersTable)
            if(form.querySelector('button#print-vt')) form.querySelector('button#print-vt').addEventListener('click', printViewTransfersTable)
            if(form.querySelector('button#export-vt')) form.querySelector('button#export-vt').addEventListener('click', exportViewTransfersTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewTransferssetCurrentPage)
            // await fetchViewTransfersTableData()
        }
        if(localStorage.getItem('batch')){
            transbatch = localStorage.getItem('batch')
            localStorage.removeItem('batch');
            form.querySelector('button#submit').click();
        }
        fetchapprovelocations();
}

// --- SIMPLE THEMING (inline) -------------------------------------------------
const vtThemes = {
  light: {
    container: "display:block; margin-top:20px; border:1px solid #e1e1e1; border-radius:6px; padding:12px; background:#ffffff; color:#111;",
    cardBorder: "#e1e1e1",
    textMain: "#111",
    subOpacity: "0.8",
    buttonRow: ""
  },
  dark: {
    container: "display:block; margin-top:20px; border:1px solid #555; border-radius:6px; padding:12px; background:#1e1e1e; color:#f2f2f2;",
    cardBorder: "#555",
    textMain: "#f2f2f2",
    subOpacity: "0.75",
    buttonRow: ""
  },
  contrast: {
    container: "display:block; margin-top:20px; border:3px solid #000; border-radius:4px; padding:14px; background:#fffd00; color:#000;",
    cardBorder: "#000",
    textMain: "#000",
    subOpacity: "1",
    buttonRow: ""
  }
};

function vtSetTheme(themeKey) {
  const container = document.getElementById('vt-totals');
  if (!container) return;
  const theme = vtThemes[themeKey] || vtThemes.light;

  // container
  container.setAttribute('style', theme.container);

  // borders for “cards”
  const cards = container.querySelectorAll('div[style*="border:1px"], div[style*="border:3px"]');
  cards.forEach(card => {
    // replace border color inline
    const s = card.getAttribute('style') || '';
    const s2 = s.replace(/border:(\s*\d+px\s*solid\s*)(#[0-9a-fA-F]{3,6}|rgb\([^)]+\))/i, (m, p1) => `border:${p1}${theme.cardBorder}`);
    card.setAttribute('style', s2);
  });

  // main text color
  const allText = container.querySelectorAll('*');
  allText.forEach(el => {
    const s = el.getAttribute('style') || '';
    if (!/color:/.test(s)) {
      el.setAttribute('style', s + `; color:${theme.textMain};`);
    }
  });

  // sub labels opacity
  const subs = container.querySelectorAll('div[style*="opacity"]');
  subs.forEach(el => {
    const s = el.getAttribute('style') || '';
    const s2 = s.replace(/opacity:\s*[\d.]+/i, `opacity:${theme.subOpacity}`);
    el.setAttribute('style', s2);
  });
}

// --- TOTALS ------------------------------------------------------------------
function vtClearTotals() {
  const container = document.getElementById('vt-totals');
  if (!container) return;
  container.style.display = 'none';
  [
    'vt-total-count','vt-total-amount',
    'vt-success-count','vt-success-amount',
    'vt-failed-count','vt-failed-amount',
    'vt-reversed-count','vt-reversed-amount',
    'vt-cancelled-count','vt-cancelled-amount'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '0';
  });
}

function vtRenderTotalsFrom(data) {
  const container = document.getElementById('vt-totals');
  if (!container) return;

  const rows = Array.isArray(data) ? data : [];
  if (!rows.length) { vtClearTotals(); return; }

  const totalCount = rows.length;
  const toNum = v => (v == null ? 0 : parseFloat(v) || 0);
  const totalAmount = rows.reduce((s, x) => s + toNum(x.amount), 0);

  const agg = rows.reduce((acc, x) => {
    const st = (x?.transactionstatus || '').toUpperCase();
    if (!acc[st]) acc[st] = { c: 0, a: 0 };
    acc[st].c += 1;
    acc[st].a += toNum(x.amount);
    return acc;
  }, {});

  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  setText('vt-total-count', totalCount.toLocaleString());
  setText('vt-total-amount', (typeof formatMoney === 'function') ? formatMoney(totalAmount) : totalAmount.toLocaleString());

  ['SUCCESS','FAILED','REVERSED','CANCELLED'].forEach(st => {
    const m = agg[st] || { c:0, a:0 };
    setText(`vt-${st.toLowerCase()}-count`, m.c.toLocaleString());
    setText(`vt-${st.toLowerCase()}-amount`, (typeof formatMoney === 'function') ? formatMoney(m.a) : m.a.toLocaleString());
  });

  container.style.display = 'block';

  // default theme once visible
  vtSetTheme('light');
}

// Convenience wrapper that uses your global dataset if present
function renderTotals() {
  const data = (typeof viewtransferss !== 'undefined' && Array.isArray(viewtransferss)) ? viewtransferss : [];
  vtRenderTotalsFrom(data);
}


async function fetchViewTransfersTableData() {
    await fetchUsersForViewTransfers()
}


function printViewTransfersTable() {
    if(viewtransferss?.length) printContent('Transfers', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportViewTransfersTable() {
    if(viewtransferss?.length) tableToExcel('viewtransferstable', 'withdrawals')
}


async function generateViewTransfersTable() {
  showSpinner();
  let paramstr;
  if (!transbatch) {
    paramstr = new FormData(form);
  } else {
    paramstr = new FormData();
    paramstr.append('batchnumber', transbatch);
  }

  let result = await fetch('../controllers/fetchinterbanktransactionsbystatus.php', { method: 'POST', body: paramstr, headers: new Headers() });
  let res = await result.json();

  if (result) {
    hideSpinner();
    if (res.status) {
      viewtransferss = datasource = res.data;

      // ▶️ NEW: render totals for full dataset (simple)
      renderTotals();  // <— add this

      viewtransferss.length && initPagination(viewtransferss, viewTransferssetCurrentPage);
      transbatch = '';
    } else {
      hideSpinner();
      transbatch = '';
      callModal('No records retrieved');

      // ▶️ NEW: clear totals when no data
      vtClearTotals(); // <— add this
    }
  } else {
    hideSpinner();
    // ▶️ NEW: clear totals on error
    vtClearTotals();   // <— add this
  }
}


function viewTransferssetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewtransferss.length) {
        viewtransferss.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendViewTransferssTableRows(item, index)
            }
        })
        if(document.querySelector('#viewtransferstable tbody').innerHTML === '') viewtransfersbtn.click()
    }
}

async function appendViewTransferssTableRows(item, index) {
     document.querySelector('#viewtransferstable tbody').innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.source}</td>
            <td>${item.currency}</td>
            <td>${item.bankname}</td>
            <td>${item.bankaccountnumber}</td>
            <td>${item.reason}</td>
            <td>${item.recipient}</td>
            <td>${item.reference}</td>
            <td>${item.transfer_code}</td>
            <td>${formatDate(item.transferdate) }</td>
            <td>${item.accountnumber}</td>
            <td>${item.transactionstatus}</td>
            <td>${item.localreference}</td>
            <td style="text-align:left">${formatMoney(item.amount)}</td>
        </tr>
    `
}

async function retryInterbankTransfer() {
    let selecteditem = viewtransferss[index]
    if(confirm('Are you sure you want to retry transfer?')) {
        if(selecteditem) {
            let paramstr = new FormData()
            paramstr.append('id', selecteditem?.id)
            
            let result = await httpJsonRequest('../controllers/payinterbanktransfer.php', 'POST', paramstr)
            if(result) {
                let res = JSON.parse(JSON.stringify(result))
                if(res.status) {
                    callModal('Transfer successfully', 1)
                    generateViewTransfersTable()
                }
                else return callModal(res.message, 0)
            }
            else return callModal('Error: Unable to complete task', 0)
        }
    }
}
       
async function fetchUsersForViewTransfers () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deletedwithdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewtransfersbtn = document.getElementById("viewtransfers");
if (viewtransfersbtn) viewtransfersbtn.addEventListener("click", openViewTransfers, false);


// view Aggregate --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = []
async function openviewaggregate() {
    await httpRequest('viewaggregate.php')
    form = document.getElementById('filterviewaggregateform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateviewaggregateTable)
            if(form.querySelector('button#print-vt')) form.querySelector('button#print-vt').addEventListener('click', printviewaggregateTable)
            if(form.querySelector('button#export-vt')) form.querySelector('button#export-vt').addEventListener('click', exportviewaggregateTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewaggregatesetCurrentPage)
            // await fetchviewaggregateTableData()
        }
        fetchapprovelocations();
}

async function fetchviewaggregateTableData() {
    await fetchUsersForviewaggregate()
}


function printviewaggregateTable() {
    if(viewaggregates?.length) printContent('Transfers', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportviewaggregateTable() {
    if(viewaggregates?.length) tableToExcel('viewaggregatetable', 'withdrawals')
}


async function generateviewaggregateTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchinterbanktransactionsaggregate.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            viewaggregates = datasource = res.data;
            viewaggregates.length && initPagination(viewaggregates, viewaggregatesetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewaggregatesetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewaggregates.length) {
        viewaggregates.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewaggregatesTableRows(item, index)
            }
        })
        if(document.querySelector('#viewaggregatetable tbody').innerHTML === '') viewaggregatebtn.click()
    }
}

async function appendviewaggregatesTableRows(item, index) {
     document.querySelector('#viewaggregatetable tbody').innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${formatDate(item.transferdate)}</td>
            <td>${item.authorisedby}</td>
            <td>${formatMoney(item.totalamount)}</td>
            <td>${formatMoney(item.successfulamount)}</td>
            <td class="no-pr">
                <div style="align-items:center;display: flex;gap: 10px" class="flex no-pr">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px;" value="${index}" onclick="openviewtransfer(${item.batchnumber})">View&nbsp;All</button>
                    ${Number(item.totalamount)>Number(item.successfulamount) ? `<button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:orange;border-radius:3px;" value="${index}" onclick="openviewtransfer(${item.batchnumber}, 'true')">Resend</button>` : ''}
                </div>
            </td>
        </tr>
    `
}

function openviewtransfer(batch, state = 'false'){
    if(state == 'false'){
        localStorage.setItem('batch', batch)
        document.getElementById('viewtransfers').click()
    }else{
        localStorage.setItem('batch', batch)
        document.getElementById('interbanktransfer').click()
    }
}

async function retryInterbankTransfer() {
    let selecteditem = viewaggregates[index]
    if(confirm('Are you sure you want to retry transfer?')) {
        if(selecteditem) {
            let paramstr = new FormData()
            paramstr.append('id', selecteditem?.id)
            
            let result = await httpJsonRequest('../controllers/payinterbanktransfer.php', 'POST', paramstr)
            if(result) {
                let res = JSON.parse(JSON.stringify(result))
                if(res.status) {
                    callModal('Transfer successfully', 1)
                    generateviewaggregateTable()
                }
                else return callModal(res.message, 0)
            }
            else return callModal('Error: Unable to complete task', 0)
        }
    }
}
       
async function fetchUsersForviewaggregate () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deletedwithdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewaggregatebtn = document.getElementById("viewaggregate");
if (viewaggregatebtn) viewaggregatebtn.addEventListener("click", openviewaggregate, false);
