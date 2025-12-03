//BALANCE BF ---------------------------------------------------------------------------------------------------------------------------------------

async function openBalancebf(){
    await httpRequest('balancebf.php', 'override');
    
    // Get today's date
    const today = new Date();
    
    // Format the date as YYYY-MM-DD
    const formattedDate = today.toISOString().split('T')[0];
    
    // Set the value of the input field
    document.getElementById('transactiondate').value = formattedDate;
    document.getElementById('transactiondate').setAttribute('readonly', true)
    document.getElementById('submit').addEventListener('click', e=>{
        submitbalance()
    })
    
    if(document.getElementById('accountnumber'))document.getElementById('accountnumber').addEventListener('change', e=>{
        let param = new FormData()
        param.append('accountnumber', document.getElementById('accountnumber').value)
        function action(res){
            document.getElementById('accountname').value = res.data[0].customerdetail.lastname+' '+res.data[0].customerdetail.firstname+' '+res.data[0].customerdetail.othernames
        }
        callController('fetchaccountprofile.php', param,'fetchaccountprofile', [], action)
    })
    
}

async function submitbalance(){
    const param = new FormData(document.getElementById('balanceform'));
    if(document.getElementById('upload').files[0]){
        param.append('photofilename',document.getElementById('upload').files[0].name);		
	    param.append('userphotoname',document.getElementById('upload').files[0]);
    }

    
    function action(res){
        document.getElementById('balanceform').reset();
        document.getElementById('balancebf').click();
    }
    callController('postbalancedeposit.php', param, 'postbalancedeposit', ['accountnumber','accountname','oldaccountnumber','transactiondate','credit','serialnumber'], action);
}

if(document.getElementById('balancebf'))document.getElementById('balancebf').addEventListener('click', e=>openBalancebf())

//APPROVE BALANCE BF ---------------------------------------------------------------------------------------------------------------------------------------
async function openApproveBalancebf(){
    await httpRequest('approvebalancebf.php', 'override');
    fetchSavingsAccountUsers();
    fetchapprovebalancebf();
    if(document.getElementById('submit'))document.getElementById('submit').addEventListener('click', e=>fetchapprovebalancebf())
}

async function fetchapprovebalancebf(){
    function action(res){
        datasource = res.data;
        document.getElementById('jtabledata').innerHTML = res.data.map((item, index)=>`
        <tr class="source-row-item">
            <td>${index+1}</td>
            <td>${formatDate(item.transactiondate)}</td>
            <td>${item.locationname}</td>
            <td>${item.accountnumber}</td>
            <td>${item.accountname}</td>
            <td>${item.reference}</td>
            <td>${formatMoney(item.credit)}</td>
            <td>${item.serialnumber}</td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center;display:flex;gap:10px">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px" onclick="viewapprovebalancebf(event, ${item.id}, 'APPROVE')">view</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="approveapprovebalancebf(event, ${item.id}, 'APPROVE')">Approve</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:tomato;border-radius:3px" onclick="approveapprovebalancebf(event, ${item.id}, 'DECLINE')">Decline</button>
                </div>
            </td>
        </tr>
        `).join('')
    }
    const param = new FormData();
    param.append('startdate', document.getElementById('startdate').value)
    param.append('enddate', document.getElementById('enddate').value)
    callController('fetchbalancedepositsforapproval.php', param,'fetchbalancedepositsforapproval', [], action)
}

async function approveapprovebalancebf(event, id, state){
    
    event.preventDefault();
    if(!confirm('Are you sure you want to '+state+'?')) return
    
    let selecteditem = id
    if(id) {
        let paramstr = new FormData()
        paramstr.append('id', selecteditem)
        
        let controller = state == 'APPROVE' ? 'approvebalancedeposit' : 'declinebalancedeposit'
        
        let result = await httpJsonRequest(`../controllers/${controller}.php`, 'POST', paramstr)
        if(result) {
            if(result?.status) {
                
                callModal('successfull', 1)
                fetchapprovebalancebf()
            }
            else return callModal(result.message, 0)
        }
        else return callModal('Error: Unable to perform request', 0)
    }
    else return callModal('Item Selected not available', 0);
    fetchapprovebalancebf()

}
 
async function viewapprovebalancebf(event, id) {
    // Assuming you have an API or data source to fetch the details of the item
    // Let's mock the data for this example
    const item = datasource.find(data=>data.id == id)

    // Create a SweetAlert to display the item details in a modern, sleek way
    await Swal.fire({
        title: 'Transaction Details',
        html: `
            <strong>Transaction Date:</strong> ${item.transactiondate} <br>
            <strong>Account Number:</strong> ${item.accountnumber} <br>
            <strong>Old Account Number:</strong> ${item.oldaccountnumber} <br>
            <strong>Credit Amount:</strong> ${item.credit} <br>
            <strong>Serial Number:</strong> ${item.serialnumber} <br>
        `, 
        icon: 'info',
        confirmButtonText: 'Close',
        customClass: {
            popup: 'swal-wide-popup',
        }
    });
}

if(document.getElementById('approvebalancebf'))document.getElementById('approvebalancebf').addEventListener('click', e=>openApproveBalancebf())

//VIEW BALANCE BF ---------------------------------------------------------------------------------------------------------------------------------------
async function openviewBalancebf(){
    await httpRequest('viewbalancebf.php', 'override');
    fetchSavingsAccountUsers();
    fetchviewbalancebf()
    if(document.getElementById('submitview'))document.getElementById('submitview').addEventListener('click', e=>fetchviewbalancebf())
}

async function reverseviewbalancebf(id) {
    // Ask for confirmation
    const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will reverse the balance brought forward entry. This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, reverse it!',
        cancelButtonText: 'Cancel'
    });

    if (!isConfirmed) return;

    // Show loading
    Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we reverse this entry.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        // Prepare form data
        const formData = new FormData();
        formData.append('id', id);

        // Call your PHP controller
        const response = await fetch('../controllers/reversebalancedeposit.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        Swal.close();

        if (response.ok && result.status) {
            await Swal.fire({
                title: 'Reversed!',
                text: 'The balance brought forward entry has been successfully reversed.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            // Refresh the list
            document.getElementById('submitview').click();
        } else {
            await Swal.fire({
                title: 'Error',
                text: result.message || 'There was a problem reversing the entry.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (err) {
        Swal.close();
        await Swal.fire({
            title: 'Error',
            text: 'An unexpected error occurred. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error('reverseviewbalancebf error:', err);
    }
}

async function fetchviewbalancebf() {
    function action(res) {
        const datasource = res.data;
        
        // Sum the credit values
        const totalCredit = datasource.reduce((acc, item) => acc + parseFloat(item.credit || 0), 0);
        
        // Update the total credit in the 'showtotal' element
        const totalHtml = `
            <div style="display:flex;gap:10px;justify-content:flex-end;background-color: #f9f9f9; padding: 20px; margin-top: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h4 style="color: #333; font-size: 20px; margin-bottom: 10px;">Total Credit:</h4>
                <p style="font-size: 20px; font-weight: bold; color: #2d5e80;">${formatMoney(totalCredit)}</p>
            </div>
        `;
        
        // Insert the total HTML into the 'showtotal' element
        document.getElementById('showtotal').innerHTML = totalHtml;
        
        // Render table data
        document.getElementById('jtabledata').innerHTML = res.data.map((item, index) => `
            <tr class="source-row-item">
                <td>${index + 1}</td>
                <td>${formatDate(item.transactiondate)}</td>
                <td>${item.locationname}</td>
                <td>${item.accountnumber}</td> 
                <td>${item.accountname}</td> 
                <td>${item.reference}</td>
                <td>${formatMoney(item.credit)}</td>
                <td>${item.serialnumber}</td>
                <td>${item.approvedby}</td>
                <td>${item.accountofficer}</td>
                <td>
                        <div class="${document.getElementById('sessionrole')?.value == 'SUPERADMIN' ? 'flex' : 'hidden'}" style="align-items:center">
                            <button onclick="reverseviewbalancebf(${item.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Reverse</button>
                        </div>
                    </td>
            </tr>
        `).join('');
    }

    let param = new FormData(document.getElementById('filterviewbalancebf'));
    callController('fetchbalancedeposits.php', param, 'fetchbalancedeposits', [], action);
}

 
async function viewviewbalancebf(event, id) {
    // Assuming you have an API or data source to fetch the details of the item
    // Let's mock the data for this example
    const item = datasource.find(data=>data.id == id)

    // Create a SweetAlert to display the item details in a modern, sleek way
    await Swal.fire({
        title: 'Transaction Details',
        html: `
            <strong>Transaction Date:</strong> ${item.transactiondate} <br>
            <strong>Account Number:</strong> ${item.accountnumber} <br>
            <strong>Old Account Number:</strong> ${item.oldaccountnumber} <br>
            <strong>Credit Amount:</strong> ${item.credit} <br>
            <strong>Serial Number:</strong> ${item.serialnumber} <br>
        `, 
        icon: 'info',
        confirmButtonText: 'Close',
        customClass: {
            popup: 'swal-wide-popup',
        }
    });
}

if(document.getElementById('viewbalancebf'))document.getElementById('viewbalancebf').addEventListener('click', e=>openviewBalancebf())

//fetchreversedbalancedeposit ---------------------------------------------------------------------------------------------------------------------------------------
async function openfetchreversedbalancedeposit(){
    await httpRequest('fetchreversedbalancedeposit.php', 'override');
    fetchSavingsAccountUsers();
    fetchfetchreversedbalancedeposit()
    if(document.getElementById('submitview'))document.getElementById('submitview').addEventListener('click', e=>fetchfetchreversedbalancedeposit())
}

async function reversefetchreversedbalancedeposit(id) {
    // Ask for confirmation
    const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will reverse the balance brought forward entry. This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, reverse it!',
        cancelButtonText: 'Cancel'
    });

    if (!isConfirmed) return;

    // Show loading
    Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we reverse this entry.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        // Prepare form data
        const formData = new FormData();
        formData.append('id', id);

        // Call your PHP controller
        const response = await fetch('../controllers/reversebalancedeposit.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        Swal.close();

        if (response.ok && result.status) {
            await Swal.fire({
                title: 'Reversed!',
                text: 'The balance brought forward entry has been successfully reversed.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            // Refresh the list
            document.getElementById('submitview').click();
        } else {
            await Swal.fire({
                title: 'Error',
                text: result.message || 'There was a problem reversing the entry.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (err) {
        Swal.close();
        await Swal.fire({
            title: 'Error',
            text: 'An unexpected error occurred. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error('reversefetchreversedbalancedeposit error:', err);
    }
}

async function fetchfetchreversedbalancedeposit() {
    function action(res) {
        const datasource = res.data;
        
        // Sum the credit values
        const totalCredit = datasource.reduce((acc, item) => acc + parseFloat(item.credit || 0), 0);
        
        // Update the total credit in the 'showtotal' element
        const totalHtml = `
            <div style="display:flex;gap:10px;justify-content:flex-end;background-color: #f9f9f9; padding: 20px; margin-top: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h4 style="color: #333; font-size: 20px; margin-bottom: 10px;">Total Credit:</h4>
                <p style="font-size: 20px; font-weight: bold; color: #2d5e80;">${formatMoney(totalCredit)}</p>
            </div>
        `;
        
        // Insert the total HTML into the 'showtotal' element
        document.getElementById('showtotal').innerHTML = totalHtml;
        
        // Render table data
        document.getElementById('jtabledata').innerHTML = res.data.map((item, index) => `
            <tr class="source-row-item">
                <td>${index + 1}</td>
                <td>${formatDate(item.transactiondate)}</td>
                <td>${item.locationname}</td>
                <td>${item.accountnumber}</td> 
                <td>${item.accountname}</td> 
                <td>${item.reference}</td>
                <td>${formatMoney(item.credit)}</td>
                <td>${item.serialnumber}</td>
                <td>${item.approvedby}</td>
                <td>${item.accountofficer}</td>
                <td style="display:none">
                        <div class="flex" style="align-items:center">
                            <button onclick="reversefetchreversedbalancedeposit(${item.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Reverse</button>
                        </div>
                    </td>
            </tr>
        `).join('');
    }

    let param = new FormData(document.getElementById('filterfetchreversedbalancedeposit'));
    callController('fetchreversedbalancedeposit.php', param, 'fetchreversedbalancedeposit', [], action);
}

 
async function viewfetchreversedbalancedeposit(event, id) {
    // Assuming you have an API or data source to fetch the details of the item
    // Let's mock the data for this example
    const item = datasource.find(data=>data.id == id)

    // Create a SweetAlert to display the item details in a modern, sleek way
    await Swal.fire({
        title: 'Transaction Details',
        html: `
            <strong>Transaction Date:</strong> ${item.transactiondate} <br>
            <strong>Account Number:</strong> ${item.accountnumber} <br>
            <strong>Old Account Number:</strong> ${item.oldaccountnumber} <br>
            <strong>Credit Amount:</strong> ${item.credit} <br>
            <strong>Serial Number:</strong> ${item.serialnumber} <br>
        `, 
        icon: 'info', 
        confirmButtonText: 'Close',
        customClass: {
            popup: 'swal-wide-popup',
        }
    });
}

if(document.getElementById('fetchreversedbalancedeposit'))document.getElementById('fetchreversedbalancedeposit').addEventListener('click', e=>openfetchreversedbalancedeposit())
