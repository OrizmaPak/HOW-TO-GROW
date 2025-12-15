// statement of account  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var accountstatements; datasource = []; balancebb = 0; 
let statementofaccountusers;
let excessfundid
let thetotalstatement

function getSelectedOptionLabel(selectId) { 
    // Get the <select> element by its id
    const selectElement = document.getElementById(selectId);

    // Check if the <select> element exists
    if (selectElement) {
        // Get the index of the selected option
        const selectedIndex = selectElement.selectedIndex;

        // Get the selected option element
        const selectedOption = selectElement.options[selectedIndex];

        // Check if a valid option is selected
        if (selectedOption) {
            // Return the label of the selected option
            return selectedOption.textContent;
        } else {
            // Return a message indicating that no option is selected
            return 'No option selected';
        }
    } else {
        // Return a message indicating that the <select> element does not exist
        return 'Select element not found';
    }
}

let allmodalusers
let modalbal = false

    async function getalluseraccountforstatementmodal(num){
        function param(){
            let p = new FormData()
            p.append('accountnumber', num)
            return p
        }
      let result = await fetch('../controllers/fetchaccountprofile.php', {method: 'POST', headers: new Headers(), body:num ? await param() : ''})
    let res = await result.json();
        if(result) {
            hideSpinner()
            if(res.status)return allmodalusers = res.data[0];
            else hideSpinner()
        } else hideSpinner()
    }


async function gettheaccountnamemodal(el){
        el.nextElementSibling.innerHTML = 'loading...'
        if(!el.value)return;
        if(el.value.length < 9){callModal('The account number provided is incomplete', 0);el.value = '';return el.nextElementSibling.innerHTML = ''};
        let name = await getalluseraccountforstatementmodal(el.value);
        console.log(name, allmodalusers)
        if(!name){callModal('The account number provided is invalid', 0); el.value = '';return  el.nextElementSibling.innerHTML = ''}
        let firstname = name.customerdetail.firstname;
        let lastname = name.customerdetail.lastname;
        let othernames = name.customerdetail.othernames;
        el.nextElementSibling.innerHTML = firstname+' '+lastname+' '+othernames;
        
    }
    
function addaccountmodalrow(){
    let el = document.createElement('tr');
    el.classList.add('source-row-item');
     if(document.querySelector('#tablefooterr'))document.querySelector('#tablefooterr').remove()
    el.innerHTML = `<td><label  class="jcontrollabel hidden">destination account number</label> <input id="${Math.random()}" type="number" name="destinationaccountnumbermodal" class="jformcontrol cont" onchange="gettheaccountnamemodal(this)" /><p></p></td>
                            <td><label  class="jcontrollabel hidden">credit</label> <input id="${Math.random()}" type="number" name="creditmodal" class="jformcontrol cont" onchange="calculateallmodalamount()" /></td>
                            <td>
                                <button type="button" title="Remove this entry row" onclick="this.parentElement.parentElement.remove();calculateallmodalamount()" class="j-action-btn" style="padding:5px;padding-right: 10px;padding-left: 10px;background:red; text-transform: capitalize;width:inherit;" id="addaccountmodalrow" onclick="addaccountmodalrow()"> - </button>
                            </td>`
    const container = document.getElementById('statementofaccountmodalrowbody');
    container.appendChild(el);
    calculateallmodalamount()
}

function calculateallmodalamount(){
    let credit =0
    let total = Number(document.getElementById('amountmodal').value);
    for(let i=0;i<document.getElementsByName('creditmodal').length;i++){
        if(document.getElementsByName('creditmodal')[i].value)credit = credit+Number(document.getElementsByName('creditmodal')[i].value)
    }
    modalbal = total>=credit
    let amountmodalbal = total-credit
    console.log(total, credit, modalbal)
    if(document.querySelector('#tablefooterr'))document.querySelector('#tablefooterr').remove()
    let el =document.createElement('tr');
    el.id = 'tablefooterr';
    el.innerHTML = `
            <td style="text-transform: uppercase;font-weight:bold;text-align:left">Amount left: ${formatMoney(amountmodalbal) }</td>
            <td style="text-transform: uppercase;font-weight:bold;text-align:left">${formatMoney(credit)}</td>
    `
    document.querySelector('#statementofaccounttablemodal tbody').appendChild(el)
}

function callstatementresolvemodal(amount, accno, ref){
    document.getElementById('amountmodal').value = amount;
    document.getElementById('accountnumbermodal').value = accno;
    document.getElementById('referencemodal').value = ref;
    document.getElementById('demo-modal').classList.remove('hidden');
    calculateallmodalamount();
    excessfundid = ref;
}

// bb is where im holding the balance brought forward for statement of account
let bb = 0;
async function removeservicechargetransaction(id) {
        // Helper function for creating the FormData
        function param(id) {
            let p = new FormData();
            p.append('id', id);
            return p;
        }
    // SweetAlert for confirmation
    const swalResult = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this charge!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    // If the user confirms
    if (swalResult.isConfirmed) {
        // Show processing message
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we remove the service charge.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            // Call the PHP controller for removing the service charge
            let result = await fetch('../controllers/removeservicecharge.php', {
                method: 'POST',
                headers: new Headers(),
                body: param(id) // Send data
            });

            // Parse the result
            let res = await result.json();

            if (result.ok) {
                Swal.close();
                // Hide processing

                // Show success message if the operation was successful
                if (res.status) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Service charge has been removed.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });

                    // Optionally, refresh the state of the account
                    document.getElementById('submit').click()
                } else {
                    // Show error if something went wrong
                    Swal.fire({
                        title: 'Error!',
                        text: 'There was a problem removing the service charge.',
                        icon: 'error',
                        confirmButtonText: 'Try Again'
                    });
                }
            } else {
                // If the fetch request failed
                Swal.close();
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an issue connecting to the server.',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        } catch (error) {
            // If there was an error in the fetch process
            Swal.close();
            Swal.fire({
                title: 'Error!',
                text: 'An unexpected error occurred.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}

async function splitdepositstransaction(id, credituu, accountnumber, reference) {
    let creditValue = credituu;

    Swal.fire({
        title: '💰 Split Deposit Transaction',
        html: `
            <style>
                .swal2-input {
                    margin: 6px 0;
                    font-size: 14px;
                    padding: 10px;
                    border-radius: 8px;
                }
                .swal2-label {
                    display: block;
                    margin-top: 10px;
                    font-weight: 600;
                    font-size: 13px;
                    color: #444;
                }
                .credit-display {
                    background: #f0f8ff;
                    padding: 10px;
                    margin-bottom: 12px;
                    border-radius: 6px;
                    font-weight: bold;
                    font-size: 15px;
                    text-align: center;
                    color: #0077b6;
                }
                .match-status {
                    margin-top: 6px;
                    font-size: 13px;
                    font-weight: 600;
                }
                .match-ok {
                    color: green;
                }
                .match-error {
                    color: red;
                }
            </style>

            <div class="credit-display">
                Credit on Row: ₦${Number(creditValue).toLocaleString()}
            </div>

            <label class="swal2-label">First Credit</label>
            <input type="number" id="firstCredit" class="swal2-input" placeholder="Enter first credit" min="0" step="0.01">

            <label class="swal2-label">Current Daily Unit</label>
            <input type="number" id="currentDailyUnit" class="swal2-input" placeholder="Enter current daily unit" min="0" step="0.01">

            <label class="swal2-label">Second Credit</label>
            <input type="number" id="secondCredit" class="swal2-input" placeholder="Enter second credit" min="0" step="0.01">

            <label class="swal2-label">New Daily Unit</label>
            <input type="number" id="newDailyUnit" class="swal2-input" placeholder="Enter new daily unit" min="0" step="0.01">

            <div id="matchStatus" class="match-status"></div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: '✅ Save Split',
        cancelButtonText: '❌ Cancel',
        width: '450px',
        didOpen: () => {
            const firstCreditEl = document.getElementById('firstCredit');
            const secondCreditEl = document.getElementById('secondCredit');
            const matchStatusEl = document.getElementById('matchStatus');

            function updateStatus() {
                const first = parseFloat(firstCreditEl.value) || 0;
                const second = parseFloat(secondCreditEl.value) || 0;
                const total = +(first + second).toFixed(2);

                if (total === +parseFloat(creditValue).toFixed(2)) {
                    matchStatusEl.textContent = "✅ First + Second Credit matches total credit.";
                    matchStatusEl.className = "match-status match-ok";
                } else {
                    matchStatusEl.textContent = `❌ Total must equal ₦${Number(creditValue).toLocaleString()}`;
                    matchStatusEl.className = "match-status match-error";
                }
            }

            firstCreditEl.addEventListener('input', () => {
                const first = parseFloat(firstCreditEl.value) || 0;
                secondCreditEl.value = (creditValue - first).toFixed(2);
                updateStatus();
            });

            secondCreditEl.addEventListener('input', updateStatus);
        },
        preConfirm: () => {
            const firstCredit = parseFloat(document.getElementById('firstCredit').value) || 0;
            const secondCredit = parseFloat(document.getElementById('secondCredit').value) || 0;
            const currentDailyUnit = parseFloat(document.getElementById('currentDailyUnit').value) || 0;
            const newDailyUnit = parseFloat(document.getElementById('newDailyUnit').value) || 0;

            const total = +(firstCredit + secondCredit).toFixed(2);
            const credit = +parseFloat(creditValue).toFixed(2);

            if (total !== credit) {
                Swal.showValidationMessage(
                    `First Credit + Second Credit must equal ₦${credit.toLocaleString()} (currently ₦${total.toLocaleString()})`
                );
                return false;
            }

            return { firstCredit, secondCredit, currentDailyUnit, newDailyUnit };
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            const { firstCredit, secondCredit, currentDailyUnit, newDailyUnit } = result.value;

            const formData = new FormData();
            formData.append('accountnumber', accountnumber);
            formData.append('id', id);
            formData.append('reference', reference);
            formData.append('firstcredit', firstCredit);
            formData.append('secondcredit', secondCredit);
            formData.append('currentdailyunit', currentDailyUnit);
            formData.append('newdailyunit', newDailyUnit);

            try {
                const response = await fetch('../controllers/splitdeposits.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();

                if (data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Split Successful!',
                        text: data.message || 'Deposit was successfully split.',
                        timer: 3000,
                        showConfirmButton: false
                    });
                    generateStateOfAccountdetail();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Split Failed',
                        text: data.message || 'Unable to split deposit. Try again.',
                        showConfirmButton: true
                    });
                }
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Network Error',
                    text: 'Could not connect to server. Please try again.'
                });
            }
        }
    });
}



async function openStatementOfAccount () {
    
    await  httpRequest('statementofaccount.php')
    bb=0
    form = document.getElementById('filterstatementofaccountform')
    fetchSavingsAccountUsers()
    
    form.querySelector('#startdate').valueAsDate = new Date()
    form.querySelector('#enddate').valueAsDate = new Date()
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generateStateOfAccount)
    document.querySelector('button#print-soa').addEventListener('click', printStatementOfAccount)
    document.querySelector('button#export-soa').addEventListener('click', exportStatementOfAccount)
    document.getElementById('submitmodal').addEventListener('click', submitmodalexcess)

    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(statementOfAccountsetCurrentPage)
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    await fetchStatementOfAccountPageData()
    
    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await statementOfAccountsetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    

    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {statementOfAccountsetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
    
    function printStatementOfAccount() {
    if(accountstatements.length) printContent(` <div class="reciept-header">
                        <div>
                            <span>
                                <img id="" src="../images/howlogo-removebg-preview.png" alt="" style="width: 50px;height: auto">
                            </span>
                            <span>
                                <h1>HOW TO GROW</h1>
                                <span>  No 4 City Biscuit Road, Ugwuagba Obosi </span>
                            </span>
                        </div>
                        <div>
                            <span> STATEMENT OF ACOUNT</span>
                            Issued date: ${formatDate(new Date().toLocaleDateString())}
                        </div>
                    </div>`, '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')}

    function exportStatementOfAccount() {
    if(accountstatements.length) tableToExcel('statementofaccounttable', 'statemnent_of_account')
}

    async function generateStateOfAccount(event) {
    document.getElementById('jtabledata').innerHTML = '';
    document.getElementById('accountinfo').style.display = 'none'
    document.getElementById('accountofficer').innerHTML = ''
    document.getElementById('marketergroup').innerHTML = ''
    document.getElementById('accountnoo').innerHTML = ''
    document.getElementById('accountnamee').innerHTML = ''
    document.getElementById('accbal').innerHTML = ''
    event.target.disabled = true;
    let paramstr = new FormData(form)
    if(form.accountnumber.value.length < 1) {
        form.accountnumber.style.borderColor = 'red';
        return
    }
    
    form.accountnumber.style.borderColor = '';
    let result = await fetch('../controllers/statementofaccount.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        bb = Number(res.balancebroughtforward)
        balancebb = Number(res.balancebroughtforward)
        event.target.disabled = false;
        accountstatements = datasource = res.data;
        document.querySelector('#statementofaccounttable tbody').innerHTML === ''
        
        if(datasource.length && form.querySelector('#accountnumber').value !== '') {
            try {
                console.log('datasource[0]', datasource[0])
                document.getElementById('accountinfo').style.display = 'flex'
                document.getElementById('accountofficer').innerHTML = datasource[0]?.accountofficer
                document.getElementById('marketergroup').innerHTML = datasource[0]?.marketergroup
                document.getElementById('accountnoo').innerHTML = datasource[0]?.savingsaccount.accountnumber
                document.getElementById('accountnamee').innerHTML = datasource[0]?.accountname
                let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.savingsaccount.debit), 0)
                let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.savingsaccount.credit), 0)
                console.log('balance', debit, credit)
                thetotalstatement=credit

                document.getElementById('accbal').innerHTML = formatCurrency(Number(credit)-Number(debit)+bb)
            }
            catch(e) {console.log(e)}
        }
        else {
            try {
                document.getElementById('accountinfo').style.display = 'none'
                document.getElementById('accountofficer').innerHTML = ''
                document.getElementById('marketergroup').innerHTML = ''
                document.getElementById('accountnoo').innerHTML = ''
                document.getElementById('accountnamee').innerHTML = ''
                let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.savingsaccount.debit), 0)
    let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.savingsaccount.credit), 0)
                console.log('balance', debit, credit)
                thetotalstatement=credit

                document.getElementById('accbal').innerHTML = formatCurrency(Number(credit)-Number(debit)+bb)
            }
            catch(e) {console.log(e)}
        }
        
        if(accountstatements.length) {
            setNewPaginationContext(paginationLimitInput)
        }

    }
    else {
        if(jtabledata) jtabledata.innerHTML = '';
        event.target.disabled = false;
        callModal(res.message, 0)
    }
}

    async function fetchStatementOfAccountPageData() {
    await fetchStatementOfAccountCustomerAccounts();
    await fetchStatementOfAccountSavingsAccounts();
    // await fetchStatementOfAccountLocations()
    await fetchUsersForSavingsStatementOfAccount()
}

function statementOfAccountsetCurrentPage(pageNum) {
    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;

    if (jtabledata) jtabledata.innerHTML = '';

    if (accountstatements.length) {
        let totalCredits = 0;
        let totalDebits = 0;
        
        console.log('bb', balancebb)
        

        // Calculate total credits and debits for all account statements
        accountstatements.forEach((item, i) => {
    console.log('i', i, balancebb);
    
    // Safely coerce credit and debit to numbers, ensuring nullish values are treated as 0
    item.savingsaccount.credit = +(item.savingsaccount.credit ?? 0);
    item.savingsaccount.debit = +(item.savingsaccount.debit ?? 0);
    
    // Calculate credits and debits individually for each item
    totalCredits += item.savingsaccount.credit;
    totalDebits += item.savingsaccount.debit;

    let currentBalance = totalCredits - totalDebits;
    
    // Assign calculated balance for the first and subsequent items
    // if (i === 0) {
        item.calculatedBalance = currentBalance + balancebb;  // Add initial balance for the first item
    // } else {
        // item.calculatedBalance = currentBalance;  // Use cumulative balance for subsequent items
    // }
    
    console.log('item.calculatedBalance', item.calculatedBalance);
});

        
        // if(datasource[0].accounttype == 'Property'){
        //     document.getElementById('pitem').classList.remove('hidden')
        //     }else{
        //         document.getElementById('pitem').classList.add('hidden')
        // }

        // Add balance brought forward to the table
        jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td colspan="12">BALANCE BROUGHT FORWARD</td>
            <td>${formatMoney(bb)}</td>
        </tr>`;

        // Display only items for the current page
        accountstatements.forEach((item, index) => {
            if (index >= prevRange && index < currRange) {
                appendStatementOfAccountTableRows(item, index);
            }
        });

        if (pageCount === currentPage) renderTableStatementOfAccountFooter();
        else {
            try {
                document.querySelector('#statementofaccounttable #tablefooter')?.remove();
            } catch (e) {
                console.log(e);
            }
        }

        if (document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#statementofaccounttable #tablefooter')) {
            document.querySelector('#statementofaccounttable #tablefooter')?.remove();
            statementofaccountbtn.click();
            form.querySelector('button#submit').click();
        }
    }
}

async function appendStatementOfAccountTableRows(item, index) {
    // let user = statementofaccountusers.find(val => val.email == item.savingsaccount.user);
    
    if(item.savingsproductname == 'EXCESS CASH'){
        document.getElementById('otherinfo').classList.remove('hidden')
    }else{
        document.getElementById('otherinfo').classList.add('hidden')
    }

    jtabledata.innerHTML += `
        <tr class="source-row-item" style="border:0.3px solid #e5e5e5;">
            <td>${index + 1}</td>
            <td>${formatDate(item.savingsaccount.transactiondate ?? '')}</td>
            <td>${formatDate(item.savingsaccount.valuedate ?? '')}</td>
            <td>${item.savingsaccount.description ?? ''}</td>
            <td>${item.savingsaccount.reference ?? ''}</td>
            <td>${item.savingsaccount.debitslipno ?? ''}</td>
            ${datasource[0].accounttype == 'Property' ? `<td>${item.propertyitems.split('|').map(data => data)}</td>` : `<td>-</td>`}
            <td>${item.savingsaccount.ttype ?? ''}</td>
            <td>${item.savingsproductname ?? ''}</td>
            <td style="text-align:left">${formatMoney(item.savingsaccount.servicecharge ?? '')}</td>
            <td style="text-align:left">${item.savingsaccount.credit == 0 ? '-' : formatMoney(item.savingsaccount.credit ?? 0)}</td>
            <td style="text-align:left">${item.savingsaccount.debit == 0 ? '-' : formatMoney(item.savingsaccount.debit ?? 0)}</td>
            <td style="text-align:left">${formatMoney(item.calculatedBalance ?? '')}</td>
            <td style="text-align:left;display:${item.savingsproductname == 'EXCESS CASH'?'flex':'none'}">${item.savingsaccount.tlog}</td>
            <td class="no-pr" style="display:flex;gap:10px;border:none">
                <div class="flex no-pr" style="align-items:center">
                    ${item.savingsproductname == 'EXCESS CASH' && item.savingsaccount.credit > 0 ? `<button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" 
                    onclick="callstatementresolvemodal('${item.savingsaccount.credit}', '${item.savingsaccount.accountnumber}', '${item.savingsaccount.reference}')">Resolve</button>` : ''}
                </div>
                <div class="flex no-pr ${document.getElementById('sessionrole').value == 'SUPERADMIN' ? '' : 'hidden'}" style="align-items:center">
                    ${item.savingsaccount.description.toLowerCase().startsWith('service charge') ? `<button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" 
                    onclick="removeservicechargetransaction('${item.savingsaccount.id}')">Delete</button>` : ''}
                </div>
                <div class="flex no-pr ${document.getElementById('sessionrole').value == 'SUPERADMIN' ? `${Number(item.credit) > 0 ? '' : 'hidden'}` : 'hidden'}" style="align-items:center;border:none">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" 
                    onclick="splitdepositstransaction('${item.savingsaccount.id}', '${item.savingsaccount.totalcredit}', '${item.savingsaccount.accountnumber}', '${item.savingsaccount.reference}')">Split&nbsp;Deposits</button>
                </div>
            </td>
        </tr>`;
}

async function submitmodalexcess(){
    if(!validateInputsComponent(getallid('cont')))return
    if(!modalbal)return callModal('The total must not be lesser than the credit to proceed', 0);
    function param(){
        let dat = new FormData();
        dat.append('accountnumber', document.getElementById('accountnumbermodal').value) 
        dat.append('reference', document.getElementById('referencemodal').value)
        dat.append('transactiondate', document.getElementById('transactiondatemodal').value)
        dat.append('accountofficer', document.getElementById('accofficer').value)
        dat.append('rowsize', document.getElementsByName('creditmodal').length)
        for(let i=0;i<document.getElementsByName('creditmodal').length;i++){
            dat.append(`credit${i+1}`, document.getElementsByName('creditmodal')[i].value)
            dat.append(`destinationaccountnumber${i+1}`, document.getElementsByName('destinationaccountnumbermodal')[i].value)
        }
        return dat;
    }
      let result = await fetch('../controllers/resolveexcesscashstatementofaccount.php', {method: 'POST', headers: new Headers(), body: await param()})
    let res = await result.json();
        hideSpinner()
    if(result) {
        if(res.status){
            callModal(res.message, 1)
            document.getElementById('addaccountmodalrow').click()
            document.getElementById('submit').click()
        }else{callModal(res.message,0)}
    } else{
        callModal('Failed', 0)
    }
}

    
function renderTableStatementOfAccountFooter () {
    let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.savingsaccount.debit), 0)
    let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.savingsaccount.credit), 0)
    let servcharge = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.savingsaccount.servicecharge), 0)
    thetotalstatement=credit
 
    document.querySelector('#statementofaccounttable tbody').innerHTML += `
        <tr id="tablefooter">
            <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="9"> total </td>
            <td style="text-transform: uppercase;font-weight:bold;text-align:left">${ formatMoney(servcharge) }</td>
            <td style="text-transform: uppercase;font-weight:bold;text-align:left"> ${formatMoney(credit)}</td>
            <td style="text-transform: uppercase;font-weight:bold;text-align:left">${formatMoney(debit)}</td>
            <td style="text-transform: uppercase;font-weight:bold;text-align:left">${ formatMoney(credit - debit+bb) }</td>
        </tr>
    `
}


async function fetchUsersForSavingsStatementOfAccount () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) statementofaccountusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

async function fetchStatementOfAccountLocations() {
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

    async function fetchStatementOfAccountCustomerAccounts (event) {
    showSpinner();
    let paramstr = new FormData();
    let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res?.status) { 
        hideSpinner();
        savingscustomers= res.data?.data;
    } else hideSpinner();
}

    async function fetchStatementOfAccountSavingsAccounts() {
    showSpinner()
    let result = await fetch('../controllers/fetchsavingsaccounts.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data  =  res.data
        savingsaccountslist =  data;
        let options = '';
        data?.forEach(async function(item, index){
            try {
                let customer = savingscustomers?.find( val => val.id == item.customer);
                    /*<option value="${item.accountnumber}"> ${customer.firstname + ' ' + customer.lastname + ' ' + (customer.othernames == '' ? '': customer.othernames) + ' - ' + item.accountnumber + ' - ' + new Date(item.registrationdate).toLocaleDateString() } </option>*/
                if(customer) options += `
                    <option value="${item.accountnumber}"> ${customer.lastname + ' ' + customer.firstname + ' ' + (customer.othernames == '' ? '': customer.othernames) } </option>
                `
            }
            catch(e) {console.log(e)}
            
        })
        if(form.querySelector('#account')) {
            form.querySelector('#account').innerHTML = '';
            form.querySelector('#account').innerHTML = '<option value="" selected="">--Select Account --</option>'+options
        }
        
    } else  hideSpinner()
}

}

var statementofaccountbtn = document.getElementById('statementofaccount');
if(statementofaccountbtn) statementofaccountbtn.addEventListener('click', openStatementOfAccount, false);

// statement of daily detail-------------------------------------------------------------------------------------------------------------------------------------

async function openstatementindailydetail () {
    
    await  httpRequest('statementindailydetail.php')
    bb=0
    form = document.getElementById('filterstatementindailydetailform')
    fetchSavingsAccountUsers()
    
    form.querySelector('#startdate').valueAsDate = new Date()
    form.querySelector('#enddate').valueAsDate = new Date()
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generateStateOfAccountdetail)
    document.querySelector('button#print-soa').addEventListener('click', printstatementindailydetail)
    document.querySelector('button#export-soa').addEventListener('click', exportstatementindailydetail)
    document.getElementById('submitmodal').addEventListener('click', submitmodalexcess)

    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(statementindailydetailsetCurrentPage)
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    await fetchstatementindailydetailPageData()
    
    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await statementindailydetailsetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    

    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {statementindailydetailsetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
    
    function printstatementindailydetail() {
    if(accountstatements.length) printContent(` <div class="reciept-header">
                        <div>
                            <span>
                                <img id="" src="../images/howlogo-removebg-preview.png" alt="" style="width: 50px;height: auto">
                            </span>
                            <span>
                                <h1>HOW TO GROW</h1>
                                <span>  No 4 City Biscuit Road, Ugwuagba Obosi </span>
                            </span>
                        </div>
                        <div>
                            <span> STATEMENT OF ACOUNT</span>
                            Issued date: ${formatDate(new Date().toLocaleDateString())}
                        </div>
                    </div>`, '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')}

    function exportstatementindailydetail() {
    if(accountstatements.length) tableToExcel('statementindailydetailtable', 'statemnent_of_account')
}

  async function generateStateOfAccountdetail(event) {
    // Reset UI
    document.getElementById('jtabledata').innerHTML = '';
    document.getElementById('accountinfo').style.display = 'none';
    document.getElementById('accountofficer').innerHTML = '';
    document.getElementById('marketergroup').innerHTML = '';
    document.getElementById('accountnoo').innerHTML = '';
    document.getElementById('accountnamee').innerHTML = '';
    document.getElementById('accbal').innerHTML = '';
    event.target.disabled = true;

    const nf = new Intl.NumberFormat('en-NG'); // number formatter

    const paramstr = new FormData(form);
    if (!form.accountnumber.value || form.accountnumber.value.length < 1) {
        form.accountnumber.style.borderColor = 'red';
        event.target.disabled = false;
        return;
    } else {
        form.accountnumber.style.borderColor = '';
    }

    // 🔹 STEP 1: Call first controller to validate daily deposits
    let result1, res1;
    try {
        result1 = await fetch('../controllers/fetchdepositsfordailydepositvalidation.php', {
            method: 'POST',
            body: paramstr,
            headers: new Headers()
        });
        res1 = await result1.json();
    } catch (e) {
        event.target.disabled = false;
        Swal.fire({
            icon: 'error',
            title: 'Network Error',
            text: 'Could not reach the server. Please try again.',
        });
        return;
    }

    // CASE A: ❌ Error — do not proceed, disable Proceed button
    if (res1 && res1.status === false) {
        await Swal.fire({
            icon: 'error',
            title: 'Cannot Proceed',
            text: res1.message || 'An error occurred while validating deposits. Please review and try again.',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Proceed (Disabled)',
            cancelButtonText: 'Close',
            allowOutsideClick: false,
            didOpen: () => {
                const btn = Swal.getConfirmButton();
                if (btn) btn.setAttribute('disabled', 'disabled');
            }
        });
        // Re-enable the original button so user can adjust filters and retry
        event.target.disabled = false;
        return;
    }

    // CASE B: ✅ Resolved notice — status true but empty data: proceed automatically
    if (res1 && res1.status === true && Array.isArray(res1.data) && res1.data.length === 0) {
        await Swal.fire({
            icon: 'info',
            title: 'Daily Deposits Resolved',
            text: res1.message || 'HTG has resolved the daily deposits for this account. Proceeding to statement…',
            timer: 1800,
            showConfirmButton: false,
            willClose: () => {}
        });

        // Go straight to statementindetail.php
        let result2, res2;
        try {
            result2 = await fetch('../controllers/statementindetail.php', {
                method: 'POST',
                body: paramstr,
                headers: new Headers()
            });
            res2 = await result2.json();
        } catch (e) {
            event.target.disabled = false;
            Swal.fire({ icon: 'error', title: 'Network Error', text: 'Could not fetch statement. Try again.' });
            return;
        }

        event.target.disabled = false;
        if (res2.status) {
            renderStatementDetail(res2);
        } else {
            if (typeof jtabledata !== 'undefined' && jtabledata) jtabledata.innerHTML = '';
            callModal(res2.message, 0);
        }
        return;
    }

    // CASE C: 📋 Has rows — show editable table in SweetAlert
    if (res1 && res1.status === true && Array.isArray(res1.data) && res1.data.length > 0) {
        // Inline modal styles (sticky header + scroll)
        const modalStyles = `
        <style>
          .sa-wrap{margin-top:6px;}
          .sa-meta{font-size:12px;color:#64748b;margin-bottom:8px}
          .sa-count{font-size:12px;color:#334155;margin-bottom:10px}
          .sa-table-wrap{
            max-height:55vh;overflow:auto;border:1px solid #e5e7eb;border-radius:10px;
          }
          .sa-table{width:100%;min-width:980px;border-collapse:separate;border-spacing:0;table-layout:auto;}
          .sa-table thead th{
            position:sticky;top:0;background:#f8fafc;z-index:2;font-weight:600;font-size:12px;
            text-transform:uppercase;letter-spacing:.02em;padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#334155;
          }
          .sa-table tbody td{
            padding:10px 12px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#0f172a;vertical-align:top;
          }
          .sa-table tbody tr:hover{ background:#f9fafb; }
          .sa-id,.sa-credit,.sa-date{ white-space:nowrap; }
          .sa-ref{ word-break:break-word; max-width:420px }
          .sa-input{ width:110px;padding:7px 8px;border:1px solid #cbd5e1;border-radius:8px;text-align:right; }
          .sa-input:focus{ outline:none;border-color:#0ea5e9;box-shadow:0 0 0 3px rgba(14,165,233,.15); }
          .sa-officer{color:#475569;font-size:12px;}
          .swal2-popup{ padding:1.25rem 1.25rem 1rem 1.25rem; }
          .swal2-html-container{ margin:0; }
        </style>`;

        // Build table body
        let rowsHTML = '';
        res1.data.forEach((row, idx) => {
            const creditFmt = nf.format(Number(row.credit || 0));
            rowsHTML += `
              <tr>
                <td class="sa-id">${idx + 1}</td>
                <td class="sa-ref hidden"><div class="sa-meta">${row.reference || '-'}</div></td>
                <td class="sa-date">${typeof formatDate === 'function' ? (formatDate(row.transactiondate) || '-') : (row.transactiondate || '-')}</td>
                <td class="sa-credit">${creditFmt}</td>
                <td>
                  <input type="number" min="0" step="1" value="${row.dailyunit ?? ''}" id="dailyunit_${idx}" class="sa-input" />
                </td>
                <td class="sa-officer">${row.accountofficer || '-'}</td>
              </tr>`;
        });

        const htmlTable = `
          ${modalStyles}
          <div class="sa-wrap">
            <div class="sa-count">Found <strong>${res1.data.length}</strong> credit transaction(s). You can edit <strong>Daily Unit</strong> only.</div>
            <div class="sa-table-wrap">
              <table class="sa-table">
                <thead>
                  <tr>
                    <th style="width:90px;">S/N</th>
                    <th style="min-width:360px;display:none;">Reference</th>
                    <th style="width:170px;">T. Date</th>
                    <th style="width:120px;">Credit</th>
                    <th style="width:140px;">Daily Unit</th>
                    <th style="min-width:180px;">Account Officer</th>
                  </tr>
                </thead>
                <tbody>${rowsHTML}</tbody>
              </table>
            </div>
          </div>`;

        await Swal.fire({
            title: "Confirm the Daily Units",
            html: htmlTable,
            width: "min(1040px, 95vw)",
            confirmButtonText: "Proceed",
            showCancelButton: true,
            reverseButtons: true,
            focusConfirm: false,
            heightAuto: false,
            allowOutsideClick: false,
            preConfirm: () => {
                // Validate edited dailyunit values before proceeding
                let firstInvalidIdx = -1;
                for (let i = 0; i < res1.data.length; i++) {
                    const el = document.getElementById(`dailyunit_${i}`);
                    if (!el) continue;
                    const v = String(el.value || '').trim();
                    const num = Number(v);
                    if (v === '' || Number.isNaN(num) || num < 0) {
                        firstInvalidIdx = i;
                        break;
                    }
                }
                if (firstInvalidIdx !== -1) {
                    Swal.showValidationMessage(`Daily Unit on row ${firstInvalidIdx + 1} is invalid. Enter a non-negative number.`);
                    return false;
                }

                // Build payload: original filters + rowsize + id1..n, reference1..n, dailyunit1..n
                const payload = new FormData(form);

                // ✅ include rowsize
                payload.append('rowsize', res1.data.length);

                res1.data.forEach((row, idx) => {
                    const dailyunitVal = document.getElementById(`dailyunit_${idx}`).value;
                    payload.append(`id${idx + 1}`, row.id);
                    payload.append(`reference${idx + 1}`, row.reference);
                    payload.append(`dailyunit${idx + 1}`, dailyunitVal);
                });
                return payload;
            }
        }).then(async (result) => {
            if (!result.isConfirmed) {
                event.target.disabled = false;
                return;
            }

            const payload = result.value;

            // 🔹 STEP 2: Call statementindetail.php with filters + edited dailyunits
            let result2, res2;
            try {
                result2 = await fetch('../controllers/statementindetail.php', {
                    method: 'POST',
                    body: payload,
                    headers: new Headers()
                });
                res2 = await result2.json();
            } catch (e) {
                event.target.disabled = false;
                Swal.fire({ icon: 'error', title: 'Network Error', text: 'Could not fetch statement. Try again.' });
                return;
            }

            event.target.disabled = false;
            if (res2.status) {
                renderStatementDetail(res2);
            } else {
                callModal(res2.message, 0);
            }
        });

        return;
    }

    // Fallback (shouldn’t hit here often)
    event.target.disabled = false;
    Swal.fire({
        icon: 'warning',
        title: 'No Data',
        text: 'No validation data returned. Please try again.',
    });
}


/* ================================
   Helper function to render details
   ================================ */
function renderStatementDetail(res) {
    bb = Number(res.balancebroughtforward);
    balancebb = Number(res.balancebroughtforward);
    accountstatements = datasource = res.data;

    const tbody = document.querySelector('#statementindailydetailtable tbody');
    if (tbody) tbody.innerHTML = '';

    if (Array.isArray(datasource) && datasource.length && form.querySelector('#accountnumber').value !== '') {
        try {
            document.getElementById('accountinfo').style.display = 'flex';
            document.getElementById('accountofficer').innerHTML = datasource[0]?.accountofficer || '';
            document.getElementById('marketergroup').innerHTML = datasource[0]?.marketergroup || '';
            document.getElementById('accountnoo').innerHTML = datasource[0]?.savingsaccount?.accountnumber || '';
            document.getElementById('accountnamee').innerHTML = datasource[0]?.accountname || '';

            const debit = datasource.reduce((prev, curr) => prev + parseFloat(+curr.savingsaccount.debit), 0);
            const credit = datasource.reduce((prev, curr) => prev + parseFloat(+curr.savingsaccount.credit), 0);

            thetotalstatement = credit;
            document.getElementById('accbal').innerHTML = formatCurrency(Number(credit) - Number(debit) + bb);
        } catch (e) { console.log(e); }
    } else {
        try {
            document.getElementById('accountinfo').style.display = 'none';
            document.getElementById('accountofficer').innerHTML = '';
            document.getElementById('marketergroup').innerHTML = '';
            document.getElementById('accountnoo').innerHTML = '';
            document.getElementById('accountnamee').innerHTML = '';

            const debit = datasource.reduce((prev, curr) => prev + parseFloat(+curr.debit), 0);
            const credit = datasource.reduce((prev, curr) => prev + parseFloat(+curr.credit), 0);

            thetotalstatement = credit;
            document.getElementById('accbal').innerHTML = formatCurrency(Number(credit) - Number(debit) + bb);
        } catch (e) { console.log(e); }
    }

    if (accountstatements && accountstatements.length) {
        setNewPaginationContext(paginationLimitInput);
    }
}


/* ================================
   Helper function to render details
   ================================ */
function renderStatementDetail(res) {
    bb = Number(res.balancebroughtforward);
    balancebb = Number(res.balancebroughtforward);
    accountstatements = datasource = res.data;

    const tbody = document.querySelector('#statementindailydetailtable tbody');
    if (tbody) tbody.innerHTML = '';

    if (Array.isArray(datasource) && datasource.length && form.querySelector('#accountnumber').value !== '') {
        try {
            document.getElementById('accountinfo').style.display = 'flex';
            document.getElementById('accountofficer').innerHTML = datasource[0]?.accountofficer || '';
            document.getElementById('marketergroup').innerHTML = datasource[0]?.marketergroup || '';
            document.getElementById('accountnoo').innerHTML = datasource[0]?.savingsaccount?.accountnumber || '';
            document.getElementById('accountnamee').innerHTML = datasource[0]?.accountname || '';

            let debit = datasource.reduce((prev, curr) => prev + parseFloat(+curr.savingsaccount.debit), 0);
            let credit = datasource.reduce((prev, curr) => prev + parseFloat(+curr.savingsaccount.credit), 0);

            thetotalstatement = credit;
            document.getElementById('accbal').innerHTML = formatCurrency(Number(credit) - Number(debit) + bb);
        } catch (e) { console.log(e); }
    } else {
        try {
            document.getElementById('accountinfo').style.display = 'none';
            document.getElementById('accountofficer').innerHTML = '';
            document.getElementById('marketergroup').innerHTML = '';
            document.getElementById('accountnoo').innerHTML = '';
            document.getElementById('accountnamee').innerHTML = '';

            let debit = datasource.reduce((prev, curr) => prev + parseFloat(+curr.debit), 0);
            let credit = datasource.reduce((prev, curr) => prev + parseFloat(+curr.credit), 0);

            thetotalstatement = credit;
            document.getElementById('accbal').innerHTML = formatCurrency(Number(credit) - Number(debit) + bb);
        } catch (e) { console.log(e); }
    }

    if (accountstatements && accountstatements.length) {
        setNewPaginationContext(paginationLimitInput);
    }
}


    async function fetchstatementindailydetailPageData() {
    await fetchstatementindailydetailCustomerAccounts();
    await fetchstatementindailydetailSavingsAccounts();
    // await fetchstatementindailydetailLocations()
    await fetchUsersForSavingsstatementindailydetail()
}

function statementindailydetailsetCurrentPage(pageNum) {
    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;

    if (jtabledata) jtabledata.innerHTML = '';

    if (accountstatements.length) {
        let totalCredits = 0;
        let totalDebits = 0;
        
        console.log('bb', balancebb)
        

        // Calculate total credits and debits for all account statements
        accountstatements.forEach((item, i) => {
    console.log('i', i, balancebb);
    
    // Safely coerce credit and debit to numbers, ensuring nullish values are treated as 0
    item.credit = +(item.credit ?? 0);
    item.debit = +(item.debit ?? 0);
    
    // Calculate credits and debits individually for each item
    totalCredits += item.credit;
    totalDebits += item.debit;

    let currentBalance = totalCredits - totalDebits;
    
    // Assign calculated balance for the first and subsequent items
    // if (i === 0) {
        item.calculatedBalance = currentBalance + balancebb;  // Add initial balance for the first item
    // } else {
        // item.calculatedBalance = currentBalance;  // Use cumulative balance for subsequent items
    // }
    
    console.log('item.calculatedBalance', item.calculatedBalance);
});

        
        // if(datasource[0].accounttype == 'Property'){
        //     document.getElementById('pitem').classList.remove('hidden')
        //     }else{
        //         document.getElementById('pitem').classList.add('hidden')
        // }

        // Add balance brought forward to the table
        jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td colspan="12">BALANCE BROUGHT FORWARD</td>
            <td>${formatMoney(bb)}</td>
        </tr>`;

        // Display only items for the current page
        accountstatements.forEach((item, index) => {
            if (index >= prevRange && index < currRange) {
                appendstatementindailydetailTableRows(item, index);
            }
        });

        if (pageCount === currentPage) renderTablestatementindailydetailFooter();
        else {
            try {
                document.querySelector('#statementindailydetailtable #tablefooter')?.remove();
            } catch (e) {
                console.log(e);
            }
        }

        if (document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#statementindailydetailtable #tablefooter')) {
            document.querySelector('#statementindailydetailtable #tablefooter')?.remove();
            statementindailydetailbtn.click();
            form.querySelector('button#submit').click();
        }
    }
}




async function appendstatementindailydetailTableRows(item, index) {
    let user = statementindailydetailusers.find(val => val.email == item.user);
    
    if(item.savingsproductname == 'EXCESS CASH'){
        document.getElementById('otherinfo').classList.remove('hidden')
    }else{
        document.getElementById('otherinfo').classList.add('hidden')
    }

    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${formatDate(item.transactiondate ?? '')}</td>
            <td>${formatDate(item.valuedate ?? '')}</td>
            <td>${item.description ?? ''}</td>
            <td>${item.reference ?? ''}</td>
            <td>${item.debitslipno ?? ''}</td>
            ${datasource[0].accounttype == 'Property' ? `<td>${item.propertyitems.split('|').map(data => data)}</td>` : `<td>-</td>`}
            <td>${item.ttype ?? ''}</td>
            <td style="text-align:left">${item.credit == 0 ? '-' : formatMoney(item.credit ?? 0)}</td>
            <td style="text-align:left">${item.debit == 0 ? '-' : formatMoney(item.debit ?? 0)}</td>
            <td style="text-align:left">${item.servicecharge == 0 ? '' : formatMoney(item.servicecharge ?? 0)}</td>
            <td style="text-align:left">${item.totalcredit == 0 ? '-' : formatMoney(item.totalcredit ?? 0)}</td>
            <td style="text-align:left">${item.totaldebit == 0 ? '-' : formatMoney(item.totaldebit ?? 0)}</td>
            <td style="text-align:left">${formatMoney(item.calculatedBalance ?? '')}</td>
            <td style="text-align:left;display:${item.savingsproductname == 'EXCESS CASH'?'flex':'none'}">${item.tlog}</td>
           <td class="no-pr">
  <div class="flex no-pr" style="align-items:center; justify-content:flex-start; gap:6px;display:flex">
    
    <!-- Transfer button -->
    ${item.buttonhere == 'YES' ? `
      <button 
        style="padding:5px 8px;cursor:pointer;border:none;outline:none;font-size:10px;
               color:#fff;background-color:blue;border-radius:3px" 
        onclick="callstatementbuttonhere('${item.accountnumber}', '${item.id}', '${item.accounttype}')">
        Transfer
      </button>` : ''}

    <!-- Resolve button -->
    ${item.savingsproductname == 'EXCESS CASH' && item.credit > 0 ? `
      <button 
        style="padding:5px 8px;cursor:pointer;border:none;outline:none;font-size:10px;
               color:#fff;background-color:blue;border-radius:3px" 
        onclick="callstatementresolvemodal('${item.credit}', '${item.accountnumber}', '${item.reference}')">
        Resolve
      </button>` : ''}

    <!-- Delete button (Superadmin only) -->
    ${document.getElementById('sessionrole').value == 'SUPERADMIN' && 
      item.description.toLowerCase().startsWith('service charge') ? `
      <button 
        style="padding:5px 8px;cursor:pointer;border:none;outline:none;font-size:10px;display:none;
               color:#fff;background-color:red;border-radius:3px" 
        onclick="removeservicechargetransaction('${item.id}')">
        Delete
      </button>` : ''}

    <!-- Split Deposits (Superadmin only + has credit + buttonhere == YES) -->
${document.getElementById('sessionrole').value == 'SUPERADMIN' && Number(item.credit) > 0 && item.buttonhere == 'YES' ? `
  <button 
    style="padding:5px 8px;cursor:pointer;border:none;outline:none;font-size:10px;
           color:#fff;background-color:green;border-radius:3px" 
    onclick="splitdepositstransaction('${item.id}', '${item.totalcredit}', '${item.accountnumber}', '${item.reference}')">
    Split&nbsp;Deposits
  </button>` : ''}


  </div>
</td>

        </tr>`;
}

async function submitmodalexcess(){
    if(!validateInputsComponent(getallid('cont')))return
    if(!modalbal)return callModal('The total must not be lesser than the credit to proceed', 0);
    function param(){
        let dat = new FormData();
        dat.append('accountnumber', document.getElementById('accountnumbermodal').value) 
        dat.append('reference', document.getElementById('referencemodal').value)
        dat.append('transactiondate', document.getElementById('transactiondatemodal').value)
        dat.append('accountofficer', document.getElementById('accofficer').value)
        dat.append('rowsize', document.getElementsByName('creditmodal').length)
        for(let i=0;i<document.getElementsByName('creditmodal').length;i++){
            dat.append(`credit${i+1}`, document.getElementsByName('creditmodal')[i].value)
            dat.append(`destinationaccountnumber${i+1}`, document.getElementsByName('destinationaccountnumbermodal')[i].value)
        }
        return dat;
    }
      let result = await fetch('../controllers/resolveexcesscashstatementindailydetail.php', {method: 'POST', headers: new Headers(), body: await param()})
    let res = await result.json();
        hideSpinner()
    if(result) {
        if(res.status){
            callModal(res.message, 1)
            document.getElementById('addaccountmodalrow').click()
            document.getElementById('submit').click()
        }else{callModal(res.message,0)}
    } else{
        callModal('Failed', 0)
    }
}

    
function renderTablestatementindailydetailFooter () {
    let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.debit), 0)
    let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.credit), 0)
    let servcharge = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.servicecharge), 0)
    
    thetotalstatement = credit
 
    document.querySelector('#statementindailydetailtable tbody').innerHTML += `
        <tr id="tablefooter">
            <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="10"> total </td>
            <td style="text-transform: uppercase;font-weight:bold;text-align:left">${ formatMoney(servcharge) }</td>
            <td style="text-transform: uppercase;font-weight:bold;text-align:left"> ${formatMoney(credit)}</td>
            <td style="text-transform: uppercase;font-weight:bold;text-align:left">${formatMoney(debit)}</td>
            <td style="text-transform: uppercase;font-weight:bold;text-align:left">${ formatMoney(credit - debit+bb) }</td>
        </tr>
    `
}

async function fetchUsersForSavingsstatementindailydetail () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) statementindailydetailusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

async function fetchstatementindailydetailLocations() {
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

    async function fetchstatementindailydetailCustomerAccounts (event) {
    showSpinner();
    let paramstr = new FormData();
    let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res?.status) { 
        hideSpinner();
        savingscustomers= res.data?.data;
    } else hideSpinner();
}

    async function fetchstatementindailydetailSavingsAccounts() {
    showSpinner()
    let result = await fetch('../controllers/fetchsavingsaccounts.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data  =  res.data
        savingsaccountslist =  data;
        let options = '';
        data?.forEach(async function(item, index){
            try {
                let customer = savingscustomers?.find( val => val.id == item.customer);
                    /*<option value="${item.accountnumber}"> ${customer.firstname + ' ' + customer.lastname + ' ' + (customer.othernames == '' ? '': customer.othernames) + ' - ' + item.accountnumber + ' - ' + new Date(item.registrationdate).toLocaleDateString() } </option>*/
                if(customer) options += `
                    <option value="${item.accountnumber}"> ${customer.lastname + ' ' + customer.firstname + ' ' + (customer.othernames == '' ? '': customer.othernames) } </option>
                `
            }
            catch(e) {console.log(e)}
            
        })
        if(form.querySelector('#account')) {
            form.querySelector('#account').innerHTML = '';
            form.querySelector('#account').innerHTML = '<option value="" selected="">--Select Account --</option>'+options
        }
        
    } else  hideSpinner()
}

}

async function callstatementbuttonhere(transferAccountNumber, id, accounttype) {
  // Constants for URLs and styles
  const ACCOUNT_PROFILE_URL = '../controllers/fetchaccountprofile.php';
  const TRANSFER_URL = '../controllers/transferandrollbackcounter.php';
  const GRADIENT_BG = 'radial-gradient(circle at top left, #d1fae5 0%, #ecfdf5 100%)';

  const { isConfirmed } = await Swal.fire({
    title: '💰 Transfer Funds',
    width: '42rem',
    padding: '1.75rem',
    html: `
      <div class="transfer-modal">
        <div class="input-container">
          <input id="swal-accountnumber"
                 class="account-input"
                 maxlength="10"
                 placeholder="Enter 10‑digit account number"
                 autocomplete="off"
                 inputmode="numeric">
          <div class="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-tabler" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#059669" fill="none">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="9" cy="7" r="4" />
              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              <path d="M16 11h6m-3 -3v6" />
            </svg>
          </div>
        </div>
        
        <div id="accountNameDisplay" class="account-name-display">
          <div class="placeholder-text">Account name will appear here</div>
        </div>
      </div>
      
      <style>
        /* ======= MODAL STRUCTURE ======= */
        .transfer-modal {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding: 0.5rem 0.25rem;
        }
        
        /* ======= INPUT CONTAINER ======= */
        .input-container {
          position: relative;
          margin-top: 0.75rem;
        }
        
        .account-input {
          width: 85%;
          padding: 0.85rem 1rem 0.85rem 3rem;
          border-radius: 1.25rem;
          border: 2px solid #a7f3d0;
          background: #f0fdf4;
          font-size: 1.05rem;
          color: #065f46;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(5, 150, 105, 0.05);
        }
        
        .account-input:focus {
          border-color: #34d399;
          box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.25);
          outline: none;
        }
        
        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          color: #059669;
        }
        
        /* ======= ACCOUNT NAME DISPLAY ======= */
        .account-name-display {
          min-height: 3rem;
          padding: 1rem;
          border-radius: 1rem;
          background: rgba(209, 250, 229, 0.4);
          border: 1px dashed rgba(5, 150, 105, 0.3);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .placeholder-text {
          color: rgba(6, 95, 70, 0.6);
          font-style: italic;
          font-weight: 500;
        }
        
        .valid-account {
          background: rgba(167, 243, 208, 0.3);
          border: 1px solid rgba(52, 211, 153, 0.4);
          color: #065f46;
          font-weight: 600;
          font-size: 1.1rem;
        }
        
        .error-account {
          background: rgba(254, 226, 226, 0.3);
          border: 1px dashed rgba(220, 38, 38, 0.3);
          color: #b91c1c;
        }
        
        /* ======= LOADER ANIMATION ======= */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .mini-loader {
          display: inline-block;
          width: 1.1rem;
          height: 1.1rem;
          border: 2px solid rgba(167, 243, 208, 0.8);
          border-top-color: #059669;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          margin-right: 0.75rem;
          vertical-align: middle;
        }
      </style>
    `,
    showCancelButton: true,
    confirmButtonText: 'Transfer Funds',
    cancelButtonText: 'Cancel',
    focusConfirm: false,
    allowOutsideClick: () => !Swal.isLoading(),
    customClass: {
      popup: 'glass-popup',
      title: 'modal-title',
      htmlContainer: 'modal-content',
      confirmButton: 'confirm-btn',
      cancelButton: 'cancel-btn',
      actions: 'modal-actions'
    },
    didOpen: () => {
      const input = document.getElementById('swal-accountnumber');
      const display = document.getElementById('accountNameDisplay');
      const confirmButton = Swal.getConfirmButton();
      let fetchController = null;

      // Focus input immediately
      setTimeout(() => input.focus(), 100);
      
      // Account number validation
      const validateAccount = (value) => /^\d{10}$/.test(value);
      
      // Update account display
      const updateDisplay = (content, status = 'neutral') => {
        display.innerHTML = content;
        display.className = 'account-name-display';
        if (status === 'valid') display.classList.add('valid-account');
        if (status === 'error') display.classList.add('error-account');
      };

      input.addEventListener('input', async () => {
        const accountNumber = input.value.trim();
        
        // Abort previous request if exists
        if (fetchController) fetchController.abort();
        
        // Reset state
        confirmButton.disabled = true;
        updateDisplay('<div class="placeholder-text">Account name will appear here</div>');

        if (validateAccount(accountNumber)) {
          updateDisplay('<span class="mini-loader"></span>Verifying account...');
          fetchController = new AbortController();

          try {
            const formData = new FormData();
            formData.append('accountnumber', accountNumber);
            
            const response = await fetch(ACCOUNT_PROFILE_URL, {
              method: 'POST',
              body: formData,
              signal: fetchController.signal
            });
            
            const data = await response.json();
            
            if (data.status && data.data[0]) {
              const customer = data.data[0].customerdetail;
              const fullName = `${customer.firstname} ${customer.othernames || ''} ${customer.lastname}`.replace(/\s+/g, ' ');
              updateDisplay(`✅ Valid account: <strong>${fullName}</strong>`, 'valid');
              confirmButton.disabled = false;
            } else {
              updateDisplay('❌ Account not found', 'error');
            }
          } catch (error) {
            if (error.name !== 'AbortError') {
              updateDisplay('⚠️ Error fetching account details', 'error');
            }
          }
        }
      });
    },
    preConfirm: async () => {
      const accountInput = document.getElementById('swal-accountnumber');
      const accountNumber = accountInput.value.trim();
      
      if (!/^\d{10}$/.test(accountNumber)) {
        Swal.showValidationMessage('Please enter a valid 10-digit account number');
        return false;
      }

      const formData = new FormData();
      formData.append('id', id);
      formData.append('accountnumber', accountNumber);
      formData.append('transferaccountnumber', transferAccountNumber);
      formData.append('accounttype', accounttype);

      try {
        const response = await fetch(TRANSFER_URL, {
          method: 'POST',
          body: formData
        });
        return await response.json();
      } catch (error) {
        Swal.showValidationMessage('Transfer failed: Network error');
        return false;
      }
    }
  });

  if (isConfirmed) {
  if (typeof Swal.getQueueStep() !== 'undefined') Swal.close(); // close previous modal if still open

  // response from preConfirm
  const transferResponse = Swal.getInput()?.value; // sometimes SweetAlert holds last value
  // but safer: we'll rely on the preConfirm return
  // since you already return `await response.json()` in preConfirm
  const result = await Swal.getResult();

  const resData = result.value;

  if (resData && resData.status === true) {
    await Swal.fire({
      icon: 'success',
      title: 'Transfer Successful!',
      text: resData.message || 'Funds have been transferred successfully',
      showConfirmButton: true,
      timer: 3000,
      background: '#ecfdf5',
      color: '#065f46',
      confirmButtonColor: '#059669',
      width: '32rem',
      customClass: {
        popup: 'success-popup',
        title: 'success-title',
        confirmButton: 'success-confirm-btn'
      }
    });
    generateStateOfAccountdetail();
  } else {
    await Swal.fire({
      icon: 'error',
      title: 'Transfer Failed',
      text: (resData && resData.message) ? resData.message : 'An unexpected error occurred. Please try again.',
      showConfirmButton: true,
      confirmButtonColor: '#dc2626',
      width: '32rem',
      background: '#fef2f2',
      color: '#b91c1c',
      customClass: {
        popup: 'error-popup',
        title: 'error-title',
        confirmButton: 'error-confirm-btn'
      }
    });
  }
}

}

var statementindailydetailbtn = document.getElementById('statementindailydetail');
if(statementindailydetailbtn) statementindailydetailbtn.addEventListener('click', openstatementindailydetail, false);









// withdrawal  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let invoiceData = {};
let invoiceItem

async function openWithdrawal(){
    await httpRequest('withdrawal.php')
    dynamiccomma(true)
    form = document.getElementById('widthdrwalform')
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',validateWithdrawal);
    if(document.querySelector('#checkerall')) document.querySelector('#checkerall').addEventListener('click',checkerallwithdrawal);
    
    if(document.getElementById('bank3'))document.getElementById('bank3').addEventListener('change',async e=>{
            document.getElementById('beneficiaryname').value = 'Retrieving Name'
        if(document.getElementById('bank3').value.length == 10){
            function action(res){
                if(res.status){
                    document.getElementById('beneficiaryname').value = res.bankaccountname
                }else{
                    document.getElementById('beneficiaryname').value = ''
                    
                }
            }
            let params = new FormData();
            params.append('bankname', `${bankcodes[+document.getElementById('bankaccount3').value]?.name}|${bankcodes[+document.getElementById('bankaccount3').value]?.code}`)
            params.append('accountnumber', document.getElementById('bank3').value)
            let request = await callController('verifybankaccountname.php', params, 'verifybankaccountname', ['bankaccount3'], action)
        }else return document.getElementById('beneficiaryname').value = '';
    })
    
    const transferToCustomerBankSlider = document.getElementById('transfertocustomercbank')
    transferToCustomerBankSlider.checked = false;
    transferToCustomerBankSlider.parentElement.parentElement.style.display = 'none'
    
    const checkboxes = document.querySelectorAll('#bankdetails input[type="checkbox"]');
    if (checkboxes.length > 0) {
        checkboxes[0].checked = true;
        checkboxes[1].previousElementSibling.style.opacity = '0.4'; 
    
        checkboxes.forEach((item) => {
            item.addEventListener('click', () => {
                checkboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                    if (checkbox.previousElementSibling) {
                        checkbox.previousElementSibling.style.opacity = '0.4';
                    }
                });
    
                item.checked = true;
                if (item.previousElementSibling) {
                    item.previousElementSibling.style.opacity = '1';
                }
            });
        });
    }
    
    function checkerallwithdrawal(){
        if(document.getElementsByName('checker').length>0){
            for(let i=0;i<document.getElementsByName('checker').length;i++){
                document.getElementsByName('checker')[i].checked = document.getElementById('checkerall').checked
            }
        }
    }
    
    // if(document.getElementById('swittchhtr9')){
    //     document.getElementById('swittchhtr9').addEventListener('click', e=>{
    //         if(document.getElementById('orecustomertogl9').checked){
    //             document.getElementById('orecustomertogl9').checked = false;
    //             document.querySelector('div.checkbox.switchergrey.oresec9 label input + div small').style.left = '0%';
    //             document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.backgroundColor = 'grey';
    //             document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.borderColor = 'grey';
    //         }else{
    //             document.getElementById('orecustomertogl9').checked = true;
    //             document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.backgroundColor = 'green';
    //             document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.borderColor = 'green';
    //             document.querySelector('div.checkbox.switchergrey.oresec9 label input + div small').style.left = '50%'
    //         }
    //     })
    // }
    
    if(document.getElementById('swittchhtr8')){
        document.getElementById('swittchhtr8').addEventListener('click', e=>{
             if(document.getElementById('orecustomertogl8').checked){
              
                document.getElementById('orecustomertogl8').checked = false;
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div small').style.left = '0%';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.backgroundColor = 'grey';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.borderColor = 'grey';
                try {
                    document.getElementById('thirdparty').style.display = 'none'
                    fetchWithdrawalBankNames()
                } catch(e) {console.log(e)}
            }else{
                
                document.getElementById('orecustomertogl8').checked = true;
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.backgroundColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.borderColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div small').style.left = '50%'
                try {
                    document.getElementById('thirdparty').style.display = 'block'
                    fetchWithdrawalBankNames()
                } catch(e) {console.log(e)}
            }
        })
    }
    
    if(document.getElementById('swittchhtr10')){
        document.getElementById('swittchhtr10').addEventListener('click', e=>{
            if(document.getElementById('orecustomertogl10').checked){
                document.getElementById('orecustomertogl10').checked = false;
                document.querySelector('div.checkbox.switchergrey.oresec10 label input + div small').style.left = '0%';
                document.querySelector('div.checkbox.switchergrey.oresec10 label input + div').style.backgroundColor = 'grey';
                document.querySelector('div.checkbox.switchergrey.oresec10 label input + div').style.borderColor = 'grey';
                document.getElementById('bankdetails').style.display = 'none' 
                transferToCustomerBankSlider.parentElement.parentElement.style.display = 'none'
                transferToCustomerBankSlider.checked = false;
            }else{
                document.getElementById('orecustomertogl10').checked = true;
                document.querySelector('div.checkbox.switchergrey.oresec10 label input + div').style.backgroundColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec10 label input + div').style.borderColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec10 label input + div small').style.left = '50%'
                document.getElementById('bankdetails').style.display = 'block'
                transferToCustomerBankSlider.parentElement.parentElement.style.display = 'block'
                transferToCustomerBankSlider.checked = true;
            }
        })
    }
    
    await fetchWithdrawalFormData()
}

function showThirdPartyDetails() {
    fetchWithdrawalBankNames()
}


async function fetchWithdrawalBankNames() {
    let result = await fetchRequest('../controllers/fetchbankaccountnames.php')
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.status){
            bankcodes = parseResult.data;
            let options = ''
            options = bankcodes?.map( (item, index) => `<option value="${index}"> ${item.name} </option>`).join('')
            if(form) {
                form.querySelector('#bankaccount3').innerHTML = options
            }
        }
        else {
            form.querySelector('#bankaccount3').innerHTML = `<option value=""> --Select Bank -- </option>`
        }
    }
}

async function fetchWithdrawalFormData() {
    await fetchWithdrawalAccountOfficers()
    await fetchCustomersLocations()
    await fetchCustomerUserprofile()
    await fetchCustomerGroupName()
}

async function fetchCustomerGroupName() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(result) { 
        hideSpinner()
        if(res?.status) customergroupnames = res.data.data;
    } else hideSpinner()
}

async function fetchCustomerUserprofile() {
    showSpinner()
    let result = await fetch('../controllers/fetchuserprofile.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res?.status) {
            customeruserprofile = res;
            hideSpinner()
             try {
                 document.querySelector('#widthdrwalform #postinglimit').value =  res.withdrawallimit
                 document.querySelector('#widthdrwalform #counter').value =  res.debitcounter
                 document.querySelector('#widthdrwalform #withdrawalby').value =  `${ res.firstname} ${ res.lastname} ${ res.othername ?? ''}`
             }
             catch(e) {}
        }
        else hideSpinner()
    }
    else hideSpinner
}

async function fetchCustomersLocations() {  
    showSpinner()
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        profilelocations = res.data?.data;
    } 
    else hideSpinner()
}

async function fetchWithdrawalCustomerAccount()  {
    document.getElementById('accountnumber').parentElement.nextElementSibling.innerHTML = ''
      document.querySelector('#withdrwltabledata').innerHTML = ''
      document.querySelector('.profile #firstname').innerHTML = ''
                document.querySelector('.profile #lastname').innerHTML = ''
                document.querySelector('.profile #othername').innerHTML =''
                document.querySelector('.profile #phone').innerHTML = ''
                document.querySelector('.profile #domicilebranch').innerHTML = ''
                document.querySelector('.profile #accounttype').innerHTML = ''
                document.querySelector('.profile #gender').innerHTML = ''
                document.querySelector('.profile #dateopened').innerHTML = ''
                document.querySelector('.profile #balance').innerHTML = ''
                document.querySelector('.profile #marketer').innerHTML = ''
                document.querySelector('#widthdrwalform #bank1').value = ''
                document.querySelector('#widthdrwalform #bank2').value = ''
                document.querySelector('#widthdrwalform #bankaccount1').value = ''
                document.querySelector('#widthdrwalform #bankaccount2').value = ''
                document.querySelector('.profile #agreed').innerHTML = ''
                document.querySelector('.customer-images').innerHTML = ''
    showSpinner();
    let paramstr = new FormData();
    paramstr.append('accountnumber', form.querySelector('#accountnumber').value)
    let result = await fetch('../controllers/fetchaccountprofile.php', {method: 'POST', body:paramstr, headers: new Headers()})
    let res = await result.json();
    if(result.status) {
        hideSpinner();
        let parseResult = JSON.parse(JSON.stringify(res))
        if(parseResult.status) {
            
           invoiceData.customerProfile =  parseResult.data[0]   
           try {
                document.querySelector('.profile #firstname').innerHTML = parseResult.data[0].customerdetail.firstname
                document.querySelector('.profile #lastname').innerHTML = parseResult.data[0].customerdetail.lastname
                document.querySelector('.profile #othername').innerHTML = parseResult.data[0].customerdetail.othernames ?? ''
                document.querySelector('.profile #phone').innerHTML = parseResult.data[0].customerdetail.phonenumber
                document.querySelector('.profile #domicilebranch').innerHTML = (profilelocations.find( value => value.id == parseResult.data[0].accountdetail[0].location))?.location
                document.querySelector('.profile #accounttype').innerHTML = parseResult.data[0].accounttype.toLowerCase()
                document.querySelector('.profile #gender').innerHTML = parseResult.data[0].customerdetail.gender
                document.querySelector('.profile #dateopened').innerHTML = parseResult.data[0].accountdetail[0].registrationdate
                document.querySelector('.profile #balance').innerHTML = `<small>Balance</small>: <strong>${formatMoney(Math.abs(parseResult.data[0].customerbalance))}</strong>`
                
                let accountofficer = accountofficerslist?.find( val => val.email === parseResult.data[0].accountdetail[0].accountofficer)
                if(accountofficer) {
                    document.querySelector('.profile #marketer').innerHTML = accountofficer.firstname + ' ' + (accountofficer.othernames ?? '') + ' ' + accountofficer.lastname
                }
                
                
                document.querySelector('#widthdrwalform #bank1').value = parseResult.data[0].accountdetail[0].bankname1
                document.querySelector('#bank1name').innerHTML = parseResult.data[0].accountdetail[0].bankaccountname1
                document.querySelector('#widthdrwalform #bank2').value = parseResult.data[0].accountdetail[0].bankname2
                document.querySelector('#bank2name').innerHTML = parseResult.data[0].accountdetail[0].bankaccountname2
                document.querySelector('#widthdrwalform #bankaccount1').value = parseResult.data[0].accountdetail[0].bankaccountnumber1
                document.querySelector('#widthdrwalform #bankaccount2').value = parseResult.data[0].accountdetail[0].bankaccountnumber2
                document.querySelector('.profile #agreed').innerHTML = formatMoney(parseResult.data[0].accountdetail[0].dailyunit)
                if(parseResult.data[0].accountdetail[0].photourl !== '' || parseResult.data[0].accountdetail[0].photourl !== '-') {
                    const images = [parseResult.data[0].customerdetail.photourl, parseResult.data[0].customerdetail.photourl2].filter( item => item )
                    images.forEach( item => {
                        let span = document.createElement('span')
                        img = `<img src="../images/customer/${item}">`
                        span.innerHTML = img
                        span.addEventListener('click', function() {
                            let modalcontent = `
                                <img src="../images/customer/${item}">
                                <div style="height: 30px;width:auto"></div>
                            `
                            openJModal(modalcontent)
                        })
                        document.querySelector('.customer-images').appendChild(span)
                    })
                }
           }
           catch(e) {
               document.querySelector('.profile #firstname').innerHTML = ''
                document.querySelector('.profile #lastname').innerHTML = ''
                document.querySelector('.profile #othername').innerHTML =''
                document.querySelector('.profile #phone').innerHTML = ''
                document.querySelector('.profile #domicilebranch').innerHTML = ''
                document.querySelector('.profile #accounttype').innerHTML = ''
                document.querySelector('.profile #gender').innerHTML = ''
                document.querySelector('.profile #dateopened').innerHTML = ''
                document.querySelector('.profile #balance').innerHTML = ''
                document.querySelector('.profile #marketer').innerHTML = ''
                document.querySelector('#widthdrwalform #bank1').value = ''
                document.querySelector('#widthdrwalform #bank2').value = ''
                document.querySelector('#widthdrwalform #bankaccount1').value = ''
                document.querySelector('#widthdrwalform #bankaccount2').value = ''
                document.querySelector('.profile #agreed').innerHTML = ''
           }
           
           if(parseResult.data[0].accounttype.toLowerCase().includes('property')) {
               addSelectPropertyAccountInput(true)
           }
           else {
               addSelectPropertyAccountInput(false)
               document.getElementById('accountnumber').parentElement.nextElementSibling.innerHTML = ''
           }
           
        }
        else callModal(parseResult.message, 0)
       
    }
    else {
        hideSpinner();
        callModal('Error! Unable to perform task', 0)
    }
}

function calculatepropertytotal(){
    let tot = 0
    for(let i=0;i<document.getElementsByName('checker').length;i++){
        if(document.getElementsByName('checker')[i].checked){
            tot = tot+(Number(document.getElementsByName('checker')[i].nextElementSibling.value.split('_')[1]))
        }
    }
    document.getElementById('amountdebited').value = Number(tot)
    dynamiccomma(true)
}


async function addSelectPropertyAccountInput (state) {
    document.getElementById('withdrwltabledata').innerHTML = ''
        document.getElementById('amountdebited').value = ''
    if(!state){
        /*THIS MEANS WHEN ITS A SAVINGS ACCOUNT*/
        document.getElementById('propertytable').classList.add('hidden')
        document.getElementById('propertytoggles').classList.remove('hidden')
        document.getElementById('amountdebited').removeAttribute('readonly')
        
    }else{
        /*THIS MEANS WHEN ITS A PROPERTY ACCOUNT*/
        document.getElementById('propertytable').classList.remove('hidden')
        document.getElementById('propertytoggles').classList.add('hidden')
        document.getElementById('orecustomertogl10').checked ? document.getElementById('swittchhtr10').click() : null;
        document.getElementById('orecustomertogl8').checked ? document.getElementById('swittchhtr8').click() : null;
        document.getElementById('amountdebited').setAttribute('readonly', true)
        
    }
    const properties = await fetchPropertyItemsForSelection()
    if(properties) {
        if(properties.status) {
            
            let map = properties.data.map( item => `
            <option value="${item.propertyid}">No of item(s): ${item.propertyitem.length} -  
            Reg. Date: ${formatDate(item.propertyaccount.registrationdate)} - 
            Total Amount: ${ formatMoney(item.propertyaccount.totalamount) } </option>`).join('')
            
            const ref = document.getElementById('accountnumber')
            ref.parentElement.nextElementSibling.innerHTML =`
                <label class="hidden">Select Property</label>
                <select id="propertyid" name="propertyid" class="hidden">${map}</select>
            `
            let amt = 0
            invoiceItem = properties.data
            document.getElementById('withdrwltabledata').innerHTML = properties.data.map(data=>data.propertyitem.map(dat=>{
            amt = amt + Number(dat.amount);
            return`
        <tr>
            <td> <input id="${dat.itemid}" type="checkbox" name="checker" onclick="calculatepropertytotal()"/><input type="hidden" value="${dat.qty}_${dat.amount}_${dat.id}"/> </td>
            <td> ${dat.itemid} </td>
            <td> ${dat.itemname}  </td>
            <td> ${dat.qty}  </td>
            <td> ${formatCurrency(dat.price)} </td>
            <td> ${formatCurrency(dat.amount)} </td>
        </tr>
        `}).join('')).join('')
         document.getElementById('withdrawalviewtotal').innerHTML = formatCurrency(amt)
        }else{
        document.getElementById('withdrwltabledata').innerHTML = ''
            
        }
    }
}

async function fetchWithdrawalAccountOfficers() {
    showSpinner()
    let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        let options = '';
        accountofficerslist =  res.data;
        accountofficerslist?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othername ?? '' )} </option>
            `
        })
        if(form.querySelector('#accountofficer')){
            form.querySelector('#accountofficer').innerHTML = ''
            form.querySelector('#accountofficer').innerHTML = '<option value=""> -- Select Account Officer -- </option>' + options
        }
    }
    else hideSpinner()
    
}

function validateWithdrawal(){
    if(document.getElementById('propertytoggles').classList.contains('hidden')){
        // THEN THIS IS A PROPERTY ACCOUNT
        inputs = [
        { input: document.querySelector('#accountnumber'), validation: {required: 'account number is required'}},
        { input: form.querySelector('#postinglimit'), validation: {required: 'posting limit is required'}},
        { input: form.querySelector('#counter'), validation: {required: 'withdrwal counter is required'}},
        // { input: form.querySelector('#accountofficer'), validation: {required: 'account officer is required'}},
        { input: form.querySelector('#transactiondate'), validation: {required: 'transaction date is required'}},
        { input: form.querySelector('#valuedate'), validation: {required: 'value date is required'}},
        { input: form.querySelector('#withdrawalby'), validation: {required: 'withdrawal byis required'}},
        { input: form.querySelector('#debitslipno'), validation: {required: 'debit slip no is required'}},
        { input: form.querySelector('#serialno'), validation: {required: 'serial no is required'}},
        { input: form.querySelector('#amountdebited'), validation: {required: 'amount debited is required'}},
        //{ input: form.querySelector('#servicecharge'), validation: {required: 'service charge is required'}},
        //{ input: form.querySelector('#totalamount'), validation: {required: 'total amount is required'}},
        // { input: form.querySelector('#bank1'), validation: {required: 'bank1 is required'}},
        // { input: form.querySelector('#bank2'), validation: {required: 'bank2 is required'}},
        // { input: form.querySelector('#bankaccount1'), validation: {required: 'bank account1 is required'}},
        // { input: form.querySelector('#bankaccount2'), validation: {required: 'bank account2 is required'}},
    ]
    }else{
        // THEN THIS IS A SAVINGS ACCOUNT
        if(document.getElementById('orecustomertogl10').checked){
            inputs = [
        { input: document.querySelector('#accountnumber'), validation: {required: 'account number is required'}},
        { input: form.querySelector('#postinglimit'), validation: {required: 'posting limit is required'}},
        { input: form.querySelector('#counter'), validation: {required: 'withdrwal counter is required'}},
        // { input: form.querySelector('#accountofficer'), validation: {required: 'account officer is required'}},
        { input: form.querySelector('#transactiondate'), validation: {required: 'transaction date is required'}},
        { input: form.querySelector('#valuedate'), validation: {required: 'value date is required'}},
        { input: form.querySelector('#withdrawalby'), validation: {required: 'withdrawal byis required'}},
        { input: form.querySelector('#debitslipno'), validation: {required: 'debit slip no is required'}},
        { input: form.querySelector('#serialno'), validation: {required: 'serial no is required'}},
        { input: form.querySelector('#amountdebited'), validation: {required: 'amount debited is required'}},
        //{ input: form.querySelector('#servicecharge'), validation: {required: 'service charge is required'}},
        //{ input: form.querySelector('#totalamount'), validation: {required: 'total amount is required'}},
        { input: form.querySelector('#bank1'), validation: {required: 'bank1 is required'}},
        { input: form.querySelector('#bank2'), validation: {required: 'bank2 is required'}},
        { input: form.querySelector('#bankaccount1'), validation: {required: 'bank account1 is required'}},
        { input: form.querySelector('#bankaccount2'), validation: {required: 'bank account2 is required'}},
    ]
        }else{
            inputs = [
        { input: document.querySelector('#accountnumber'), validation: {required: 'account number is required'}},
        { input: form.querySelector('#postinglimit'), validation: {required: 'posting limit is required'}},
        { input: form.querySelector('#counter'), validation: {required: 'withdrwal counter is required'}},
        // { input: form.querySelector('#accountofficer'), validation: {required: 'account officer is required'}},
        { input: form.querySelector('#transactiondate'), validation: {required: 'transaction date is required'}},
        { input: form.querySelector('#valuedate'), validation: {required: 'value date is required'}},
        { input: form.querySelector('#withdrawalby'), validation: {required: 'withdrawal byis required'}},
        { input: form.querySelector('#debitslipno'), validation: {required: 'debit slip no is required'}},
        { input: form.querySelector('#serialno'), validation: {required: 'serial no is required'}},
        { input: form.querySelector('#amountdebited'), validation: {required: 'amount debited is required'}},
        //{ input: form.querySelector('#servicecharge'), validation: {required: 'service charge is required'}},
        //{ input: form.querySelector('#totalamount'), validation: {required: 'total amount is required'}},
        // { input: form.querySelector('#bank1'), validation: {required: 'bank1 is required'}},
        // { input: form.querySelector('#bank2'), validation: {required: 'bank2 is required'}},
        // { input: form.querySelector('#bankaccount1'), validation: {required: 'bank account1 is required'}},
        // { input: form.querySelector('#bankaccount2'), validation: {required: 'bank account2 is required'}},
    ]           
        }
    }
    
    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else {
        if(document.getElementById('orecustomertogl8').checked) {
            if(document.getElementById('bankaccount3').value.length < 1) {
                document.getElementById('bankaccount3').style.borderColor = 'red'
                return callModal('Third party bank is required', 0)
            }
            if(document.getElementById('bank3').value.length < 1) {
                document.getElementById('bank3').style.borderColor = 'red'
                return callModal('Third party account number is required', 0)
            }
            if(document.getElementById('beneficiaryname').value.length < 1) {
                document.getElementById('beneficiaryname').style.borderColor = 'red'
                return callModal('Beneficiary name is required', 0)
            }
        }
        try {
             document.getElementById('bankaccount3').style.borderColor = ''
            document.getElementById('bank3').style.borderColor = ''
            document.getElementById('beneficiaryname').style.borderColor = ''
        }
        catch(e) {}
        
        saveWithdrawal()
    }
}

function getWithdrawalParams(){
	var paramstr = new FormData();
}

var	saveWithdrawal = function(e){
    dynamiccomma(false)
    if(document.getElementById('orecustomertogl8').checked) {
        if(confirm('Transact with this third party account?') == false) return
    }
    
    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/postwithdrawal.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Withdrawal posted successfully', 1)
                    // invoiceData.invoicenumber = parseRequest.invoicenumber
                    // provideInvoice()
                    form.reset();
                }
                // else{
                //     callModal('Withdrawal posted successfully', 1)
                //     invoiceData.invoicenumber = 783468789
                //     provideInvoice()
                // }
                else  return callModal(`${parseRequest.message} `)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }

    request.setRequestHeader('Connection','close'); 
    request.send(getWithdrawalFormParams());
}

    let ch = []
function getWithdrawalFormParams() {
  
    ch = []

    let paramstr = new FormData(document.getElementById('widthdrwalform'))
    paramstr.append('accountnumber', document.querySelector('#accountnumber').value)

    paramstr.append('ttype', 'WITHDRAWAL')
    paramstr.append('thirdparty', document.getElementById('orecustomertogl8').checked ? 'YES' : 'NO')
    paramstr.append('paymentmethod', document.getElementById('orecustomertogl10').checked ? 'TRANSFER' : 'CASH')
    if(document.getElementById('orecustomertogl8').checked)paramstr.set('paymentmethod', 'TRANSFER')
    if(document.getElementById('orecustomertogl10').checked) {
        const checkedInput = document.querySelector('#bankdetails input[type="checkbox"]:checked')
        const selectedBank =  checkedInput.previousElementSibling.querySelectorAll('input')
        
        console.log(selectedBank[0].value)
        console.log(selectedBank[1].value)
        paramstr.append('paymentmethodtransferbankname', selectedBank[0].value)
        paramstr.append('paymentmethodtransferbankname', selectedBank[1].value)
    }
    for(let i=0;i<document.getElementsByName('checker').length;i++){
        if(document.getElementsByName('checker')[i].checked)ch.push(document.getElementsByName('checker')[i].nextElementSibling.value.split('_')[2])
    }
    if(ch.length>0){
        for(let i=0;i<ch.length;i++){
            paramstr.append(`pitemid${i+1}`, ch[i])
        }
    }
    paramstr.append('rowsize', ch.length)
    // paramstr.append('bankpaywith100', document.getElementById('orecustomertogl9').checked ? 'YES' : 'NO')
    paramstr.append('sendforapproval', document.getElementById('sendforapproval').checked ? 'YES' : 'YES')
    paramstr.append('transfertocustomercbank', document.getElementById('transfertocustomercbank').checked ? 'YES' : 'NO')
    
    if(document.getElementById('orecustomertogl8').checked) {
      paramstr.append('bank3', `${bankcodes[+document.getElementById('bankaccount3').value]?.name}|${bankcodes[+document.getElementById('bankaccount3').value]?.code}`)
      paramstr.append('bankaccount3', document.getElementById('bank3').value.trim())
      paramstr.append('beneficiaryname', document.getElementById('beneficiaryname').value.trim())
    }
    
    try {
        const input = document.getElementById('voucher')
        paramstr.append('photofilename',input.files[0].name);		
        paramstr.append('userphotoname',input.files[0]);
    }
    catch(ex){
         paramstr.append('photofilename','-');		
         paramstr.append('userphotoname','-');
     
    }
    dynamiccomma(true)
    return paramstr;
}

async function provideInvoice() {
    if(invoiceData.customerProfile.accounttype.toLowerCase() === 'property') {
        openJModal('<div style="display:flex;justify-content:center;align-items:center;padding 15px;background-color:white;"><span class="btnloader"></span></div>')
        await fetchInvoiceCustomerAccounts()
        await fetchInvoiceOrganizationInfo()
        await fetchInvoiceInventoryItems()
        await fetchInvoicePropertyAccounts()
    }
}

async function fetchInvoicePropertyAccounts () {
    
    let paramstr = new FormData()
    paramstr.append('accountnumber', invoiceData.customerProfile.accountdetail[0].accountnumber)
    paramstr.append('id', document.getElementById('propertyid').value)
    let result = await httpJsonRequest('../controllers/fetchpropertyaccountdetail.php', 'POST', paramstr)
    
    console.log({
        accountnumber: invoiceData.customerProfile.accountdetail[0].accountnumber,
        id: document.getElementById('propertyid').value
    })
    
    if(result?.status) {
        closeJmodal();
        let data = JSON.parse(JSON.stringify(result.data));
        let customer = await findInvoiceCustomerProfile(data.propertyaccount[0].customer)
        invoiceData.customer = customer
        invoiceData.property = data
        
        console.log({data, customer, invoiceData})
        
        let modalcontent = `
            <h4 style="margin: 5px 10px 20px 10px;font-weight:bolder;text-transform:uppercase">Invoice options</h4>
            <div class="jflex no-pr" style="justify-content:center;width: 90%;margin: 0 auto;margin-top: 20px;">
                <span class="jcontent-between" id="print-download-btns">
                    <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-pd">print reciept</button>
                    <button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="download-r">PDF Receipt</button>
                </span>
            </div>
            <div style="height: 30px;width:auto"></div>
        `
        openJModal(modalcontent)
                    
        if(document.querySelector('button#print-pd')) document.querySelector('button#print-pd').addEventListener('click', () => invoicePrintReceipt('print'))

        if(document.querySelector('button#download-r')) document.querySelector('button#download-r').addEventListener('click', () => invoicePrintReceipt('image'))
    }
    else {
        closeJmodal();
        return callModal('Unable to retrieve property accounts', 0)
    }
}

async function findInvoiceCustomerProfile(id) {
    var customer = await customers.find(value => value.id === id);
    return customer
}

async function findInvoiceInventoryItem(id) {
    var inventoryitem = await inventoryitemslist.find( value => value.id == id);
    return inventoryitem ? inventoryitem.itemname : ''
}

async function fetchInvoiceInventoryItems() {
    let result = await httpJsonRequest('../controllers/fetchinventoryitemscript.php')
    if(result) {
        if(result.status) {
            inventoryitemslist = result.data.data
        }
    }
}

async function fetchInvoiceCustomerAccounts() {
    showSpinner()
    let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        customers = res.data?.data;
    }
    else hideSpinner()
}

async function fetchInvoiceOrganizationInfo() {
    let result = await fetchRequest('../controllers/fetchorganisationscript.php');
    if(result) {
        let parseResult  =  JSON.parse(result);
        if(parseResult.status){
            orginfo = parseResult.data.data[0]
        }
    }
}

async function fetchPropertyItemsForSelection() {
    let paramstr = new FormData()
    paramstr.append('accountnumber',form.querySelector('#accountnumber').value)
    let result = await httpJsonRequest('../controllers/fetchpropertyitemsforselection.php', 'POST', paramstr)
    return result
}


async function invoicePrintReceipt(button) {
        let rows = ''
        total = 0;
        tt = 0;
        // for(let i = 0; i < invoiceData.property.propertyitems.length; i++) {
        //      let itemname = await findInvoiceInventoryItem(invoiceData.property.propertyitems[i].itemid);
        //      console.log('item', ch, invoiceData.property.propertyitems[i].id)
        //      .map(data=>data.propertyitem.map(dat=>{
        //      if(!ch.includes(invoiceData.property.propertyitems[i].id))itemname = ''
        //      if(ch.includes(invoiceData.property.propertyitems[i].id))total += (+invoiceData.property.propertyitems[i].price) * (+invoiceData.property.propertyitems[i].qty)
        //      if(ch.includes(invoiceData.property.propertyitems[i].id))tt += (+invoiceData.property.propertyitems[i].amount)
        //      if(itemname) rows +=  `
        //         <tr>
        //             <td>
        //                 <h4> ${itemname} </h4>
        //                 <p> </p>
        //             </td>
        //             <td> ${invoiceData.property.propertyitems[i].qty} </td>
        //             <td> ${formatMoney(invoiceData.property.propertyitems[i].price)} </td>
        //             <td> ${formatMoney((+invoiceData.property.propertyitems[i].price) * (+invoiceData.property.propertyitems[i].qty) )} </td>
        //         </tr>
        //         `
        // }
        rows = invoiceItem.map(data=>data.propertyitem.filter(datt=>ch.includes(datt.id)).map(dat=>{
            total = total+(Number(dat.price)*(Number(dat.qty)))
            tt = tt+Number(dat.amount)
            return`
                <tr>
                    <td>
                        <h4> ${dat.itemname} </h4>
                        <p> </p>
                    </td>
                    <td> ${dat.qty} </td>
                    <td class="hidden" style="display:none"> ${formatMoney((dat.price) * (dat.qty) )} </td>
                </tr>
            `
        }).join('')).join('')
    
        let footer = `
            <tr>
                <td colspan="3">
                    SUBTOTAL <br> VAT
                </td>
                <td> ${ formatMoney(total)} <br>  0.00 </td>
            </tr>
            <tr style="font-weight: bold;">
                <td colspan="3">TOTAL</td>
                <td> ${ formatMoney(total) } </td>
            </tr>
        `
        let html = `
                <div class="receipt" style="padding: 40px">
                    <div class="reciept-header">
                        <div>
                            <span>
                                <img src="${assetsUrl.logo}" alt="" style="width: 50px;height: auto">
                            </span>
                            <span>
                                <h1>${orginfo.companyname}</h1>
                                <span> ${orginfo.address} </span>
                                <span> ${orginfo.telephone} </span>
                            </span>
                        </div>
                        <div>
                            <span> Invoice#: <span>${invoiceData.invoicenumber}</span></span>
                            issue date: ${formatDate(new Date().toLocaleDateString())}
                        </div>
                    </div>
                    <div class="billing">
                        <div>
                            <h3> Bill to:</h3>
                            <ul>
                                <li>${ invoiceData?.customer.firstname + ' ' + invoiceData?.customer.lastname + ' ' + (invoiceData?.customer.othernames == undefined ? '' : invoiceData?.customer.othernames) }</li>
                                <li>${ invoiceData?.customer.phonenumber }</li>
                                <li>${ invoiceData?.customer.officeaddress + ' ' +  invoiceData?.customer.state} </li>
                                <li>${ invoiceData?.customer.homeaddress + ' ' +  invoiceData?.customer.state}</li>
                            </ul>
                        </div>
                        <div>
                            <h3> Payment: </h3>
                            <ul>
                                <li>Date: <span>${formatDate(new Date().toLocaleDateString())}</span></li>
                                <li>N ${formatMoney(tt)}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="items">
                        <table>
                            <thead>
                                <tr>
                                    <th>ITEM</th>
                                    <th>QTY</th>
                                </tr>
                            </thead>
                            <tbody>${rows + footer}</tbody>
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
        let div = document.createElement('div')
        div.innerHTML = html;
        div.id = 'printable-receipt';
         if(document.getElementById('printable-receipt')) document.getElementById('printable-receipt').remove()
        document.body.appendChild(div)
        
        if(window.matchMedia('(max-width: 767px)').matches) {
            return html2pdf(document.querySelector('.receipt'))
        }
       
        if(button == "image") html2pdf(document.querySelector('.receipt'))
        else printContent('Receipt', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-receipt')
    
    }
    
// async function invoicePrintDeliveryNote(button) {

//     let rows = ''
//     for(let i = 0; i < invoiceData.property.propertyitems.length; i++) {
//          let itemname = await findInvoiceInventoryItem(invoiceData.property.propertyitems[i].itemid);
//          if(itemname) rows +=  `
//             <tr>
//                 <td><h4> ${itemname} </h4></td>
//                 <td></td>
//                 <td> ${invoiceData.property.propertyitems[i].qty} </td>
              
//             </tr>
//             `
//     }

    
//     let html = `<div class="deliverynote" style="padding: 40px">
//         <div class="note-header">
//             <span>
//                 <img  src="${assetsUrl.logo}" alt="" style="width: 50px;height: auto">
//             </span>
//             <h1> Delivery Note</h1>
//         </div>
//         <div class="note-delivery-info">
//             <div>
//                 <div>
//                     <ul>
//                         <li>${orginfo.companyname}</li>
//                         <li> ${orginfo.address} </li>
//                         <li> ${orginfo.telephone == undefined ? '' : orginfo.telephone } </li>
//                     </ul>

//                     <ul>
//                         <li>To</li>
//                         <li>${ invoiceData?.customer.firstname + ' ' + invoiceData?.customer.lastname + ' ' + (invoiceData?.customer.othernames == undefined ? '' : invoiceData?.customer.othernames) }</li>
//                     </ul>

//                 </div>
//                 <div>
//                     <ul>
//                         <li>${invoiceData.invoicenumber}</li>
//                         <li>Invoice Date: ${new Date().toLocaleDateString()}</li>
//                         <li>client Number: ${ invoiceData?.customer.phonenumber }</li>
//                         <li>Adress 1: ${ invoiceData?.customer.officeaddress + ' ' +  invoiceData?.customer.state}</li>
//                         <li>Adress 2: ${ invoiceData?.customer.homeaddress + ' ' +  invoiceData?.customer.state}</li>
                        
//                     </ul>
//                 </div>
//             </div>
//             <div>
//                 <h4> Additional information</h4>
//                 <p>Returns must be made within 7 days. Please use the included returns lable</p>
//             </div>
//         </div>
//         <div class="items">
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ITEM</th>
//                         <th>DESCRIPTION</th>
//                         <th>QTY</th>
//                     </tr>
//                 </thead>
//                 <tbody>${rows}</tbody>
//             </table>
//         </div>
//         <div class="note-footer">
//             <p>Goods Recieved by: </p>
//             <div>
//                 <div>${ invoiceData?.customer.firstname + ' ' + invoiceData?.customer.lastname + ' ' + (invoiceData?.customer.othernames == undefined ? '' : invoiceData?.customer.othernames) }</div>
//                 <div>Date: </div>
//                 <div>Signature</div>
//             </div>
//         </div>
//     </div>`
    

//     let div = document.createElement('div')
//     div.innerHTML = html;
//     div.id = 'printable-deliverynote';
//      if(document.getElementById('printable-deliverynote')) document.getElementById('printable-deliverynote').remove()
//     document.body.appendChild(div)
    
//     if(window.matchMedia('(max-width: 767px)').matches) {
//         return html2pdf(document.querySelector('.deliverynote'))
//     }
    
//     if(button == "image") html2pdf(document.querySelector('.deliverynote'))
//     else printContent(' ', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-deliverynote')

// }

var withdrawal = document.getElementById('withdrawal');
if(withdrawal)withdrawal.addEventListener('click',openWithdrawal,false)



// View Withdrawals --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var withdrawals;
async function viewWithdrawals() {
    await httpRequest('viewwithdrawals.php')
    form = document.getElementById('filterviewwithdrawalsform')
    if(form) {
        if(form.querySelector('#paymentmethod')) form.querySelector('#paymentmethod').addEventListener('change',runpaymentmethodcheck)
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateWithdrawalTable)
        if(form.querySelector('button#print-wl')) form.querySelector('button#print-wl').addEventListener('click', printWithdrawalTable)
        if(form.querySelector('button#export-wl')) form.querySelector('button#export-wl').addEventListener('click', exportWithdrawalTable)
        form.querySelector('#startdate').valueAsDate = new Date()
        form.querySelector('#enddate').valueAsDate = new Date()
        
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(viewWithdrawalsetCurrentPage)
        await fetchViewwithdrawalsTableData()
    }
}

function runpaymentmethodcheck(){
    let elements = document.getElementsByClassName('tdetails')
    for(let i=0;i<elements.length;i++){
    if(form.querySelector('#paymentmethod').value == 'TRANSFER'){
          elements[i].classList.remove('hidden')
        }else{
          elements[i].classList.add('hidden')
        }
    }
}

async function fetchViewwithdrawalsTableData() {
    await fetchViewWithdrawalOrganizationInfo()
    await fetchUsersForwithdrawal()
}

async function generateWithdrawalTable() {
            document.getElementById('jtabledata').innerHTML = 'No data found'
            if(document.getElementById('accounttype').value == 'PROPERTY'){
                document.getElementById('pitem').classList.remove('hidden')
            }else{
                document.getElementById('pitem').classList.add('hidden')
            }
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchwithdrawals.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            withdrawals = datasource = res.data;
            withdrawals.length && initPagination(withdrawals, viewWithdrawalsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewWithdrawalsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(withdrawals.length) {
        withdrawals.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendWithdrawalsTableRows(item, index)
            }
        })
         if(document.getElementById('jtabledata1'))document.getElementById('jtabledata1').innerHTML = `<table>
        <thead>
        <tr class="source-row-item">
            <th>TOTAL DEBIT</th>
            <th> </th>
            <th> </th>
            <th style="display: flex;justify-content: flex-end;"><h1>${ formatMoney(datasource.reduce((sum, item)=>sum+Number(item.transactionrow.debit),0)) }</h1></th>
        </tr>
        </thead>
        <tbody>
        <tr class="source-row-item">
        </tr>
        </tbody>
        </table>`
        // jtabledata.innerHTML += ` <tr class="source-row-item">
        //     <td></td>
        //     <td></td>
        //     <td></td>
        //     <td></td>
        //     <td></td>
        //     <td></td>
        //     <td></td>
        //     <td>TOTAL</td>
        //     <td>  </td>
        // </tr>` 
        if(document.querySelector('#viewwithdrawalstable tbody').innerHTML === '') viewwithdrawalsbtn.click()
    }
    
}

async function reverseviewWithdrawalTransaction(id) {
    // Ask user to confirm reversal
    const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will reverse the withdrawal transaction. This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, reverse it!',
        cancelButtonText: 'Cancel'
    });

    if (!isConfirmed) return;

    // Show a loading indicator
    Swal.fire({
        title: 'Processing...',
        text: 'Reversing the withdrawal transaction, please wait.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        // Prepare data to send
        const formData = new FormData();
        formData.append('id', id);

        // Call your PHP controller endpoint
        const response = await fetch('../controllers/reversewithdrawal.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        Swal.close();

        if (response.ok && result.status) {
            // Success alert
            await Swal.fire({
                title: 'Reversed!',
                text: 'The withdrawal transaction has been successfully reversed.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            // Refresh the transactions list
            document.getElementById('submitview').click();
        } else {
            // Server-side error
            await Swal.fire({
                title: 'Error',
                text: result.message || 'Unable to reverse the transaction.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        Swal.close();
        // Network or unexpected error
        await Swal.fire({
            title: 'Error',
            text: 'An unexpected error occurred. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error('reverseviewWithdrawalTransaction error:', error);
    }
}


async function appendWithdrawalsTableRows(item, index) {
    let user = await withdrawlusers.find(val => val.email == item.user)
    let officer = await withdrawlusers.find(val => val.id == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${formatDate(item.transactionrow.transactiondate) }</td> 
            <td>${formatDate(item.transactionrow.valuedate) }</td>
            <td> ${item.transactionrow.accountname} </td> 
            <td> ${ item.transactionrow.accountnumber } </td>
            <td> ${item.transactionrow.imageurl && item.transactionrow.imageurl != '-' ? `<a href="../images/vouchers/${item.transactionrow.imageurl}" target="_blank"> View Voucher</a>` : 'No image'} </td>
            <td> ${ item.transactionrow.reference} </td>
            ${document.getElementById('accounttype').value == 'PROPERTY' ? `<td> ${ item.propertyitems.replace(/\|/g, ',')} </td>` : ''}
            <td> ${ item.transactionrow.accountofficer} </td>
            <td> ${ formatMoney(item.transactionrow.debit) } </td>
            <!-- <td class="tdetails"> ${ item.transactionrow.tlog.split('|')[1]??'' } </td> -->
            <td class="tdetails"> ${ item.transactionrow.tlog.split('|') } </td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center;display:flex;gap: 15px">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="printWithdrawalTransaction(event, ${index})">Print</button>
                    <button class="${document.getElementById('sessionrole').value == 'SUPERADMIN' ? 'flex' : 'hidden'}" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="reverseviewWithdrawalTransaction(event, ${item.transactionrow.id})">Reverse</button>
                </div>
            </td>
        </tr>
    ` 
    runpaymentmethodcheck()
}


async function fetchViewWithdrawalOrganizationInfo() {
        let result = await fetchRequest('../controllers/fetchorganisationscript.php');
        if(result) {
            let parseResult  =  JSON.parse(result);
            if(parseResult.status) orginfo = parseResult.data.data[0]
        }
    }
        
async function printWithdrawalTransaction(event, index) {
    let selecteditem = withdrawals[index]
    let user = await withdrawlusers.find(val => val.email == selecteditem.transactionrow.user)
    let items = selecteditem.forcompositeitem;
    let pitems = selecteditem.propertyitems;
    let html = `
        <div class="transaction-receipt">
            <div>
                <h4>Transaction Receipt</h4>
                <div>
                    <div>
                        <p style="text-transform:capitalize">${orginfo.companyname}</p>
                        <p style="text-transform:capitalize">${orginfo.address}</p>
                        <p style="text-transform:capitalize">${orginfo.telephone}</p>
                    </div> 
                    <span>${formatDate(new Date().toLocaleString())}</span>
                </div>
            </div>
            <ul>
                <li>
                    <span>Name </span>
                    <span> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')}</span>
                </li>
                <li>
                    <span>Account </span>
                    <span>${ selecteditem.transactionrow.accountnumber } </span>
                </li>
                <li>
                    <span>Reference </span>
                    <span style="text-transform: none;">${ selecteditem.transactionrow.reference} </span>
                </li>
                <li>
                    <span>Date </span>
                    <span> ${formatDate(selecteditem.transactionrow.transactiondate)}</span>
                </li>
                <li>
                    <span>Transaction Type </span>
                    <span>Withdrawal</span>
                </li>
                <li style="font-weight:bold">
                    <span>Amount </span>
                    <span>N${ formatMoney(selecteditem.transactionrow.debit) }</span>
                </li>
                ${items.length > 0 || pitems.length > 0 ? `
                    <li style="font-weight:bold;">
                        <div class="jtable-content">
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead>
                                    <tr>
                                        <th style="text-align: left; padding: 8px; border-bottom: 2px solid #ddd;">Items</th>
                                        <th style="text-align: right; padding: 8px; border-bottom: 2px solid #ddd;">Qty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${items.map(item => `
                                        <tr>
                                            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: left;">${item.itemname}</td>
                                            <td class="printnum" style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">${item.qty}</td>
                                        </tr>
                                    `).join('')}
                
                                    ${pitems.split(' | ').map((dat, i) => {
                                        const [itemName, qtyPart] = dat.split(' QTY: '); 
                                        const quantity = parseInt(qtyPart, 10) || 0;
                                        if (i < pitems.split(' | ').length - 1) return `
                                            <tr>
                                                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: left;">${itemName.trim()}</td>
                                                <td class="printnum" style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">${quantity}</td>
                                            </tr>
                                        `;
                                    }).join('')}
                
                                    <tr>
                                        <td style="padding: 8px; border-top: 2px solid #ddd; font-weight: bold;">TOTAL</td>
                                        <td class="printnum" style="text-align: right; padding: 8px; border-top: 2px solid #ddd; font-weight: bold;">
                                            ${items.reduce((sum, item) => sum + item.qty, 0) + pitems.split('|').reduce((sum, dat) => {
                                                const qtyPart = dat.split('QTY:')[1];
                                                const quantity = parseInt(qtyPart, 10) || 0;
                                                return sum + quantity;
                                            }, 0)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>` : ''}

                            </ul>
                            <div class="footer">
                                <p>We appreciate you doing business with us</p>
                                <span>THANK YOU</span> 
                            </div>
                        </div>
                    `
    let div = document.createElement('div') 
    div.innerHTML = html;
    div.id = 'printable-transact'
    if(document.getElementById('printable-transact')) document.getElementById('printable-transact').remove()
    document.body.appendChild(div)
    printContent(' ', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-transact')
}


function printWithdrawalTable() {
    if(withdrawals?.length) printContent('Withdrawals', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportWithdrawalTable() {
    if(withdrawals?.length) tableToExcel('viewwithdrawalstable', 'withdrawals')
}


async function fetchUsersForwithdrawal () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) withdrawlusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewwithdrawalsbtn = document.getElementById("viewwithdrawals");
if (viewwithdrawalsbtn) viewwithdrawalsbtn.addEventListener("click", viewWithdrawals);


// View reversed Withdrawals --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var withdrawals;
async function viewreversedwithdrawals() {
    await httpRequest('viewreversedwithdrawals.php')
    form = document.getElementById('filterviewreversedwithdrawalsform')
    if(form) {
        if(form.querySelector('#paymentmethod')) form.querySelector('#paymentmethod').addEventListener('change',runpaymentmethodcheck)
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generatereversalWithdrawalTable)
        if(form.querySelector('button#print-wl')) form.querySelector('button#print-wl').addEventListener('click', printWithdrawalTable)
        if(form.querySelector('button#export-wl')) form.querySelector('button#export-wl').addEventListener('click', exportWithdrawalTable)
        form.querySelector('#startdate').valueAsDate = new Date()
        form.querySelector('#enddate').valueAsDate = new Date()
        
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(viewreversedWithdrawalsetCurrentPage)
        await fetchViewreversedwithdrawalsTableData()
    }
}

function reverserunpaymentmethodcheck(){
    let elements = document.getElementsByClassName('tdetails')
    for(let i=0;i<elements.length;i++){
    if(form.querySelector('#paymentmethod').value == 'TRANSFER'){
          elements[i].classList.remove('hidden')
        }else{
          elements[i].classList.add('hidden')
        }
    }
}

async function fetchViewreversedwithdrawalsTableData() {
    await fetchViewWithdrawalOrganizationInfo()
    await fetchUsersForwithdrawal()
}

async function generatereversalWithdrawalTable() {
            document.getElementById('jtabledata').innerHTML = 'No data found'
            if(document.getElementById('accounttype').value == 'PROPERTY'){
                // document.getElementById('pitem').classList.remove('hidden')
            }else{
                // document.getElementById('pitem').classList.add('hidden')
            }
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchreversedwithdrawals.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            withdrawals = datasource = res.data;
            withdrawals.length && initPagination(withdrawals, viewreversedWithdrawalsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewreversedWithdrawalsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(withdrawals.length) {
        withdrawals.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendreverseWithdrawalsTableRows(item, index)
            }
        })
         if(document.getElementById('jtabledata1'))document.getElementById('jtabledata1').innerHTML = `<table>
        <thead>
        <tr class="source-row-item">
            <th>TOTAL DEBIT</th>
            <th> </th>
            <th> </th>
            <th style="display: flex;justify-content: flex-end;"><h1>${ formatMoney(datasource.reduce((sum, item)=>sum+Number(item.transactionrow.debit),0)) }</h1></th>
        </tr>
        </thead>
        <tbody>
        <tr class="source-row-item">
        </tr>
        </tbody>
        </table>`
        // jtabledata.innerHTML += ` <tr class="source-row-item">
        //     <td></td>
        //     <td></td>
        //     <td></td>
        //     <td></td>
        //     <td></td>
        //     <td></td>
        //     <td></td>
        //     <td>TOTAL</td>
        //     <td>  </td>
        // </tr>` 
        if(document.querySelector('#viewreversedwithdrawalstable tbody').innerHTML === '') viewreversedwithdrawalsbtn.click()
    }
    
}




async function appendreverseWithdrawalsTableRows(item, index) {
    let user = await withdrawlusers.find(val => val.email == item.user)
    let officer = await withdrawlusers.find(val => val.id == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${formatDate(item.transactionrow.transactiondate) }</td> 
            <td>${formatDate(item.transactionrow.valuedate) }</td>
            <td> ${item.transactionrow.accountname} </td> 
            <td> ${ item.transactionrow.accountnumber } </td>
            <td> ${item.transactionrow.imageurl && item.transactionrow.imageurl != '-' ? `<a href="../images/vouchers/${item.transactionrow.imageurl}" target="_blank"> View Voucher</a>` : 'No image'} </td>
            <td> ${ item.transactionrow.reference} </td>
            <td> ${ item.transactionrow.accountofficer} </td>
            <td> ${ formatMoney(item.transactionrow.debit) } </td>
            <!-- <td class="tdetails"> ${ item.transactionrow.tlog.split('|')[1]??'' } </td> -->
            <td class="tdetails"> ${ item.transactionrow.tlog.split('|') } </td>
            <td class="no-pr" style="display: none;">
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="printWithdrawalTransaction(event, ${index})">Print</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="reverseviewWithdrawalTransaction(event, ${item.transactionrow.id})">Print</button>
                </div>
            </td>
        </tr>
    ` 
    reverserunpaymentmethodcheck()
}


async function fetchUsersForwithdrawal () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) withdrawlusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewreversedwithdrawalsbtn = document.getElementById("viewreversedwithdrawals");
if (viewreversedwithdrawalsbtn) viewreversedwithdrawalsbtn.addEventListener("click", viewreversedwithdrawals);

// Approve Withdrawals --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = []
async function approveWithdrawals() {
    await httpRequest('approvewithdrawals.php')
    form = document.getElementById('filterapprovewithdrawalsform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateApproveWithdrawalTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata1')
            initializePaginationParams(approveWithdrawalsetCurrentPage)
            await fetchApproveWithdrawalTableData()
        }
}

async function fetchApproveWithdrawalTableData() {
    await fetchUsersForApproveWithdrawal()
}

async function generateApproveWithdrawalTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchwithdrawalsforapproval.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            withdrawals = datasource = res.data;
            withdrawals.length && initPagination(withdrawals, approveWithdrawalsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function approveWithdrawalsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(withdrawals.length) {
        withdrawals.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendApproveWithdrawalsTableRows(item, index)
            }
        })
        if(document.querySelector('#approvewithdrawalstable tbody').innerHTML === '') approvewithdrawalsbtn.click()
    }
}

async function appendApproveWithdrawalsTableRows(item, index) {
    let user = await withdrawalusers.find(val => val.email == item.transactionrow.user)
    let officerById = await withdrawalusers.find(val => val.id == item.transactionrow.accountofficer)
    let officerByEmail = await withdrawalusers.find(val => val.email == item.transactionrow.accountofficer) 
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td> ${ formatDate(item.transactionrow.transactiondate)}</td>
            <td> ${ formatDate(item.transactionrow.valuedate)}</td>
            <td> ${ item.transactionrow.user}</td>
            <td> ${ item.transactionrow.accountname}</td>
            <td> ${ item.transactionrow.accountnumber } </td>
            <td> ${ item.transactionrow.paymentmethod } </td>
            <td> ${item.transactionrow.imageurl && item.transactionrow.imageurl != '-' ? `<a href="../images/vouchers/${item.transactionrow.imageurl}" target="_blank"> View Voucher</a>` : 'No image'} </td>
            <td style="text-align:left"> ${ formatMoney(item.transactionrow.debit) } </td>
            <td> ${ item.transactionrow.reference} </td> 
            <td> ${ item.propertyitems.replace(/\|/g, ',')} </td>
            <td> ${ item.transactionrow.accountofficer} </td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="approveWithdrawalTransaction(event, ${index})">Approve</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:tomato;border-radius:3px" onclick="declineWithdrawalTransaction(event, ${index})">Decline</button>
                </div>
            </td>
        </tr>
    `
}

async function declineWithdrawalTransaction(event, index) {
    if(!confirm('Sure you want to decline this transaction?')) return
    
    let selecteditem = withdrawals[index]
    if(selecteditem) {
        let paramstr = new FormData()
        paramstr.append('id', selecteditem.transactionrow.id)
        
        let result = await httpJsonRequest('../controllers/declinetransaction.php', 'POST', paramstr)
        if(result) {
            if(result?.status) {
            
                callModal('Withdrawal transaction declined', 1)
                let arr = withdrawals.filter( item => item.transactionrow.id !== selecteditem.transactionrow.id)
                withdrawals = datasource = arr;
                initPagination(withdrawals, approveWithdrawalsetCurrentPage)
            }
            else return callModal(result.message, 0)
        }
        else return callModal('Error: Unable to perform request', 0)
    }
    else return Modal('Item Selected not available', 0)
}

async function approveWithdrawalTransaction(event, index) {
    
    
    if(!confirm('Are you sure you want to approve?')) return
    
    let selecteditem = withdrawals[index]
    if(selecteditem) {
        let paramstr = new FormData()
        paramstr.append('id', selecteditem.transactionrow.id)
        
        let result = await httpJsonRequest('../controllers/approvetransaction.php', 'POST', paramstr)
        if(result) {
            if(result?.status) {
                
                callModal('Withdrawal approved successfully', 1)
                let arr = withdrawals.filter( item => item.transactionrow.id !== selecteditem.transactionrow.id)
                withdrawals = datasource = arr;
                initPagination(withdrawals, approveWithdrawalsetCurrentPage)
            }
            else return callModal(result.message, 0)
        }
        else return callModal('Error: Unable to perform request', 0)
    }
    else return Modal('Item Selected not available', 0)
}

async function fetchUsersForApproveWithdrawal () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) withdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var approvewithdrawalsbtn = document.getElementById("approvewithdrawals");
if (approvewithdrawalsbtn) approvewithdrawalsbtn.addEventListener("click", approveWithdrawals);

// Deposit --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form;
async function openDeposits() {
    await httpRequest('deposits.php')
    dynamiccomma(true)
    form = document.getElementById('depositform')
    form.querySelector('#transactiondate').valueAsDate = new Date()
    form.querySelector('#valuedate').valueAsDate = new Date()
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',validateDeposit);
    if(document.getElementById('typeofdeposit'))document.getElementById('typeofdeposit').addEventListener('change', e=>{
        if(e.target.value == 'NOT IN ACCOUNT'){
            document.getElementById('marketer1').parentElement.classList.remove('hidden')
            document.getElementById('dateofactualtransaction').parentElement.classList.remove('hidden')
        }else{
            document.getElementById('marketer1').parentElement.classList.add('hidden')
            document.getElementById('dateofactualtransaction').parentElement.classList.add('hidden')
        }
    })
    await fetchDepositFormData()
}

async function fetchDepositFormData() {
    await fetchDepositAccountOfficers()
    await fetchCustomersLocations()
    await fetchDepositCustomerUserprofile()
    await fetchCustomerGroupName()
}

async function fetchCustomerGroupName() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(result) { 
        hideSpinner()
        if(res?.status) customergroupnames = res.data.data;
    } else hideSpinner()
}

async function fetchDepositCustomerUserprofile() {
    showSpinner()
    let result = await fetch('../controllers/fetchuserprofile.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    console.log('customers', res)
    if(result) {
        hideSpinner()
        if(res?.status) {
            customeruserprofile = res;
            hideSpinner()
             try {
                 form.querySelector('#postinglimit').value =  res.depositlimit
                 form.querySelector('#counter').value =  res.creditcounter
                 form.querySelector('#depositby').value =  `${ res.firstname} ${ res.lastname} ${ res.othername ?? ''}`
                 
             }
             catch(e) {}
        }
        else hideSpinner()
    }
    else hideSpinner
}

async function fetchDepositAccountOfficers() {
    showSpinner();
    let result = await fetch('../controllers/fetchmarketers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner();
        let options = ''
        accountofficerslist =  res.data;
        accountofficerslist?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othername ?? '' )} </option>
            `
        }).join('')
        if(document.querySelector('#accountofficer')){
            document.querySelector('#accountofficer').innerHTML = ''
            document.querySelector('#accountofficer').innerHTML = '<option value=""> -- Select Account Officer -- </option>' + options
        }
        if(document.querySelector('#marketer1')){
            document.querySelector('#marketer1').innerHTML = ''
            document.querySelector('#marketer1').innerHTML = '<option value=""> -- Select Marketer -- </option>';
            document.querySelector('#marketer1').innerHTML += accountofficerslist?.map(function(item, index){
                                        return `
                                            <option value="${item.email}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othername ?? '' )} </option>
                                        `
                                    }).join('')
            new TomSelect('#marketer1', {
                plugins:['dropdown_input'],
                maxOptions:10000
            })
        }
    } else hideSpinner()
    
}

async function fetchCustomersLocations() {
    showSpinner();
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status){
        hideSpinner()
        profilelocations =  res.data?.data;
    }
    else hideSpinner();
}

async function fetchDepositCustomerAccount()  {
    showSpinner();
    let paramstr = new FormData();
    paramstr.append('accountnumber', form.querySelector('#accountnumber').value)
    let result = await fetch('../controllers/fetchaccountprofile.php', {method: 'POST', body:paramstr, headers: new Headers()})
    let res = await result.json();
    if(result.status) {
        hideSpinner();
        let parseResult = JSON.parse(JSON.stringify(res))
        if(parseResult.status) { 
            depositcustomeraccount = parseResult
            try {
                document.querySelector('.profile #firstname').innerHTML = parseResult.data[0].customerdetail.firstname
                document.querySelector('.profile #lastname').innerHTML = parseResult.data[0].customerdetail.lastname
                document.querySelector('.profile #othername').innerHTML = parseResult.data[0].customerdetail.othernames ?? ''
                document.querySelector('.profile #phone').innerHTML = parseResult.data[0].customerdetail.phonenumber
                document.querySelector('.profile #domicilebranch').innerHTML = (profilelocations.find( value => value.id == parseResult.data[0].accountdetail[0].location))?.location
                document.querySelector('.profile #accounttype').innerHTML = parseResult.data[0].accounttype.toLowerCase()
                document.querySelector('.profile #gender').innerHTML = parseResult.data[0].customerdetail.gender
                document.querySelector('.profile #dateopened').innerHTML = parseResult.data[0].accountdetail[0].registrationdate
                
                let accountofficer = accountofficerslist?.find( val => val.email === parseResult.data[0].accountdetail[0].accountofficer)
                if(accountofficer) {
                    document.querySelector('.profile #marketer').innerHTML = accountofficer.firstname + ' ' + (accountofficer.othernames ?? '') + ' ' + accountofficer.lastname
                }
                
                document.querySelector('.profile #agreed').innerHTML = formatMoney(parseResult.data[0].accountdetail[0].dailyunit)
                if(parseResult.data[0].accountdetail[0].photourl !== '' || parseResult.data[0].accountdetail[0].photourl !== '-') {
                    let span = document.createElement('span')
                    img = `<img src=../images/customer/${parseResult.data[0].customerdetail.photourl}>`
                    span.innerHTML = img
                    span.addEventListener('click', function() {
                        let modalcontent = `
                            <img src=../images/customer/${parseResult.data[0].customerdetail.photourl}>
                            <div style="height: 30px;width:auto"></div>
                        `
                        openJModal(modalcontent)
                    })
                    document.querySelector('.customer-images').appendChild(span)
                }
            }
            catch(e) {}
        }
        else callModal(parseResult.message, 0)
       
    }
    else {
        hideSpinner();
        callModal('Error! Unable to perform task', 0)
    }
}


function validateDeposit(){
    dynamiccomma(false)
    inputs = [
        { input: document.querySelector('#accountnumber'), validation: {required: 'account number is required'}},
        { input: form.querySelector('#postinglimit'), validation: {required: 'posting limit is required'}},
        { input: form.querySelector('#counter'), validation: {required: 'withdrwal counter is required'}},
        //{ input: form.querySelector('#accountofficer'), validation: {required: 'account officer is required'}},
       // { input: form.querySelector('#transactiondate'), validation: {required: 'transaction date is required'}},
        //{ input: form.querySelector('#valuedate'), validation: {required: 'transaction date is required'}},
        { input: form.querySelector('#depositby'), validation: {required: 'value date is required'}},
        // { input: form.querySelector('#dateofactualtransaction'), validation: {required: 'date of actual transaction date is required'}},
        { input: form.querySelector('#typeofdeposit'), validation: {required: 'type of deposit is required'}},
        // { input: form.querySelector('#marketer'), validation: {required: 'marketer is required'}},
        { input: form.querySelector('#amount'), validation: {required: 'value date is required'}},

    ]
    
    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else {
        const remainder = parseFloat(form.amount.value) % depositcustomeraccount?.data[0].accountdetail[0].dailyunit
        if(remainder !== 0) {
            form.amount.style.borderColor = 'red'
            return callModal('Amount paid does not tally')
        }
        else saveDeposit()
    }
}

async function saveDeposit() {
    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/postdeposit.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Deposit posted successfully', 1)
                    form.reset();
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }

    request.setRequestHeader('Connection','close'); 
    request.send(getDepositFormParams());
}

function getDepositFormParams() {
    let paramstr = new FormData(document.getElementById('depositform'))
    paramstr.append('accountnumber', document.querySelector('#accountnumber').value)
    paramstr.append('ttype', 'DEPOSIT')
    const input = document.getElementById('voucher')
    try {
        paramstr.append('photofilename',input.files[0].name);		
        paramstr.append('userphotoname',input.files[0]);
    }
    catch(ex){
         paramstr.append('photofilename','-');		
         paramstr.append('userphotoname','-');
     
    }
    dynamiccomma(true)
    return paramstr;
}

var depositsbtn = document.getElementById('deposits')
if(depositsbtn) depositsbtn.addEventListener('click', openDeposits, false)


//  View Deposits --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = []
async function viewDeposits() {
    await httpRequest('viewdeposits.php')
    form = document.getElementById('filterviewdepositsform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateViewDepositTable)
            if(form.querySelector('button#print-dl')) form.querySelector('button#print-dl').addEventListener('click', printViewDepositTable)
            if(form.querySelector('button#export-dl')) form.querySelector('button#export-dl').addEventListener('click', exportViewDepositTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewDepositsetCurrentPage)
            await fetchViedepositsTableData()
        }
        
    function actionviewdeposit(res){
        if(document.getElementById('viewdepositaccofficer'))document.getElementById('viewdepositaccofficer').innerHTML = res.data.map(dat=>`<option value="${dat.email}">${dat.firstname} ${dat.lastname}</option>`).join('')
    }
    callController('fetchallusers.php', null, 'fetchallusers', null, actionviewdeposit)
}

async function fetchViedepositsTableData() {
    await fetchViewDepositOrganizationInfo()
    await fetchUsersForViewdeposit()
}

async function generateViewDepositTable() {
    showSpinner();
    jtabledata.innerHTML = '';
    let paramstr = new FormData(form);
    let result = await fetch('../controllers/fetchdeposits.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            deposits = datasource = res.data;
            deposits.length && initPagination(deposits, viewDepositsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewDepositsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    document.querySelector('#viewdepositstable tfoot').innerHTML = '';
    document.getElementById('totalCreditTop').innerHTML = 0
    if(deposits.length) {
        deposits.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendViewDepositsTableRows(item, index)
            }
        })
        if(document.querySelector('#viewdepositstable tbody').innerHTML === '') viewdepositsbtn.click()
        if(document.getElementById('totalCreditTop'))document.getElementById('totalCreditTop').innerHTML = formatMoney(deposits.reduce((sum, item)=>sum+Number(item.credit), 0))
        if(document.querySelector('#viewdepositstable tfoot')){
            document.querySelector('#viewdepositstable tfoot').innerHTML = `<tr class="source-row-item">
            <td style="text-align:left;font-weight: bolder" colspan="5"> TOTAL</td>
            <td style="text-align:left;font-weight: bolder">${formatMoney(deposits.reduce((sum, item)=>sum+Number(item.credit), 0))}</td>
        </tr>`
        }
    }
}

async function appendViewDepositsTableRows(item, index) {
    let user = await depositusers.find(val => val.email == item.user)
    // let officer = await depositusers.find(val => val.id == item.accountofficer)
    let officerById = await depositusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await depositusers.find(val => val.email == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${formatDate(item.transactiondate)}</td> 
            <td>${formatDate(item.valuedate)}</td>
            <td> ${item.accountname} </td>
            <td> ${ item.accountnumber } </td>
            <td> ${ item.reference} </td>
            <td style="text-transform:none"> ${  item.accountofficer == undefined ? '' : ( officerById ? officerById.email : (officerByEmail ?  officerByEmail.email : '' )) } </td>
            <td> ${ item.marketername} </td>
            <td> ${ item.description} </td>
            <td style="text-align:left"> ${ formatMoney(item.credit) } </td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="printViewDepositTransaction(event, ${index})">Print</button>
                </div>
            </td>
        </tr>
    `
}

async function fetchViewDepositOrganizationInfo() {
        let result = await fetchRequest('../controllers/fetchorganisationscript.php');
        if(result) {
            let parseResult  =  JSON.parse(result);
            if(parseResult.status) orginfo = parseResult.data.data[0]
        }
    }
        
async function printViewDepositTransaction(event, index) {
    let selecteditem = deposits[index]
    let user = await depositusers.find(val => val.email == selecteditem.user)
    let html = `
        <div class="transaction-receipt">
            <div>
                <h4>Transaction Receipt</h4>
                <div>
                    <div>
                        <p style="text-transform:capitalize">${orginfo.companyname}</p>
                        <p style="text-transform:capitalize">${orginfo.address}</p>
                        <p style="text-transform:capitalize">${orginfo.telephone}</p>
                    </div> 
                    <span>${formatDate(new Date().toLocaleString())}</span>
                </div>
            </div>
            <ul>
                <li>
                    <span>Name </span>
                    <span> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')}</span>
                </li>
                <li>
                    <span>Account </span>
                    <span>${ selecteditem.accountnumber } </span>
                </li>
                <li>
                    <span>Reference </span>
                    <span style="text-transform: none;">${ selecteditem.reference} </span>
                </li>
                <li>
                    <span>Date </span>
                    <span> ${ formatDate(selecteditem.transactiondate) }</span>
                </li>
                <li>
                    <span>Transaction Type </span>
                    <span>Deposit</span>
                </li>
                <li style="font-weight:bold">
                    <span>Amount </span>
                    <span>N${ formatMoney(selecteditem.credit) }</span>
                </li>
            </ul>
            <div class="footer">
                <p>We appreciate you doing business with us</p>
                <span>THANK YOU</span>
            </div>
        </div>
    `
    let div = document.createElement('div')
    div.innerHTML = html;
    div.id = 'printable-transact'
    if(document.getElementById('printable-transact')) document.getElementById('printable-transact').remove()
    document.body.appendChild(div)
    printContent(' ', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-transact')
}

function printViewDepositTable() {
    if(deposits?.length) printContent('Deposits', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportViewDepositTable() {
    if(deposits?.length) tableToExcel('viewdepositstable', 'deposits')
}


async function fetchUsersForViewdeposit () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) depositusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewdepositsbtn = document.getElementById("viewdeposits");
if (viewdepositsbtn) viewdepositsbtn.addEventListener("click", viewDeposits);


// Approve Deposits --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = []
async function approveDeposits() {
    await httpRequest('approvedeposits.php')
    form = document.getElementById('filterapprovedepositsform')
    if(form) {
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateApproveDepositTable)
        form.querySelector('#startdate').valueAsDate = new Date()
        form.querySelector('#enddate').valueAsDate = new Date()
        
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(approveDepositsetCurrentPage)
        await fetchApproveDepositTableData()
    }
    fetchSavingsAccountUsers()
}

async function fetchApproveDepositTableData() {
    await fetchUsersForApproveDeposit()
}

async function generateApproveDepositTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchdepositsforapproval.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            deposits = datasource = res.data;
            deposits.length && initPagination(deposits, approveDepositsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function approveDepositsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(deposits.length) {
        deposits.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendApproveDepositsTableRows(item, index)
            }
        })
        if(document.querySelector('#approvedepositstable tbody').innerHTML === '') approvedepositsbtn.click()
    }
}

async function appendApproveDepositsTableRows(item, index) {
    let user = await depositusers.find(val => val.email == item.user)
    let officerById = await depositusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await depositusers.find(val => val.email == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${formatDate(item.transactiondate)}</td>
            <td>${formatDate(item.valuedate)}</td>
            <td>${ item.accountname ?? '' }</td>
            <td> ${ item.accountnumber } </td>
            <td style="text-align:left"> ${ formatMoney(item.credit) } </td>
            <td> ${ item.reference} </td>
            <td> ${ item.description} </td>
            <td style="text-transform:none"> ${  item.accountofficer == undefined ? '' : ( officerById ? officerById.email : (officerByEmail ?  officerByEmail.email : '' )) } </td>
            <td> ${ item.marketername} </td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="approveDepositTransaction(event, ${index})">Approve</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:tomato;border-radius:3px" onclick="declineDepositTransaction(event, ${index})">Decline</button>
                </div>
            </td>
        </tr>
    `
}

async function declineDepositTransaction(event, index) {
    if(!confirm('Sure you want to decline this transaction?')) return
    
    let selecteditem = deposits[index]
    if(selecteditem) {
        let paramstr = new FormData()
        paramstr.append('id', selecteditem.id)
        
        let result = await httpJsonRequest('../controllers/declinetransaction.php', 'POST', paramstr)
        if(result) {
            if(result?.status) {
                
                callModal('Deposit approved successfully', 1)
                let arr = deposits.filter( item => item.id !== selecteditem.id)
                deposits = datasource = arr;
                initPagination(deposits, approveDepositsetCurrentPage)
            }
            else return callModal(result.message, 0)
        }
        else return callModal('Error: Unable to perform request', 0)
    }
    else return Modal('Item Selected not available', 0)
}

async function approveDepositTransaction(event, index) {
    if(!confirm('Are you sure you want to approve?')) return
    
    let selecteditem = deposits[index]
    if(selecteditem) {
        let paramstr = new FormData()
        paramstr.append('id', selecteditem.id)
        
        let result = await httpJsonRequest('../controllers/approvetransaction.php', 'POST', paramstr)
        if(result) {
            if(result?.status) {
                
                callModal('Deposit approved successfully', 1)
                let arr = deposits.filter( item => item.id !== selecteditem.id)
                deposits = datasource = arr;
                initPagination(deposits, approveDepositsetCurrentPage)
            }
            else return callModal(result.message, 0)
        }
        else return callModal('Error: Unable to perform request', 0)
    }
    else return Modal('Item Selected not available', 0)
}

async function fetchUsersForApproveDeposit () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) depositusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var approvedepositsbtn = document.getElementById("approvedeposits");
if (approvedepositsbtn) approvedepositsbtn.addEventListener("click", approveDeposits);

// Group Deposit  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var localitem;

async function groupDeposit () {
    await httpRequest('group-deposit.php');
    form = document.getElementById('groupdepositform')
    if(form) {
        if(form.querySelector('button#resetform')) form.querySelector('button#resetform').addEventListener('click', resetGroupDepositForm)
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', saveGroupDeposit)
        
        await fetchGroupDepositPageData()
        if(!!sessionStorage.getItem('groupdeposit')) groupDepositMode('edit')
        
        else groupDepositMode()
    }
}

async function groupDepositMode(mode='save') {
    if(mode == 'edit') {
        localitem = JSON.parse(sessionStorage.getItem('groupdeposit'))
        let item = localitem.item;
        
        Array.from(form.querySelectorAll('input')).concat(Array.from(form.querySelectorAll('select'))).map(input => {
            try {
                if(item[input.id]) {
                    input.value = item[input.id]
                }
            }
            catch (e) {console.log(e)}
        })
        fetchGroupDepositGroupTargets({target:{value: item.groupid}})
        form.querySelector('button#submit').innerHTML = 'Save changes'
        sessionStorage.removeItem('groupdeposit')
    }
    else {
        form.querySelector('#transactiondate').valueAsDate = new Date()
        form.querySelector('#valuedate').valueAsDate = new Date()
        if(form.querySelector('#groupid')) form.querySelector('#groupid').addEventListener('change', fetchGroupDepositGroupTargets)
    }
}
    
function getFetchGroupDepositParams(){
    var paramstr = new FormData();
    paramstr.append("transactiondate", document.getElementById('confirm-detail-transaction-date').value);
    paramstr.append("group", document.getElementById('confirm-detail-group').value);
    return paramstr;

}  

async function fetchGroupDepositPageData() {
    await fetchGroupDepositAccountOfficers()
    await fetchGroupDepositLocations()
    await fetchGroupDepositGroups()
}

async function fetchGroupDepositGroupTargets(event) {
    showSpinner()
    let paramstr = new FormData()
    paramstr.append('id', event.target.value)
    let result = await fetch('../controllers/fetchgroupptarget.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        let options = ''
        res.data?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.target} </option>
            `
        })
        if(form.querySelector('#target')){
            form.querySelector('#target').innerHTML = ''
            form.querySelector('#target').innerHTML = options
        }
    }
    else {
        hideSpinner()
        if(form.querySelector('#target')){
            form.querySelector('#target').innerHTML = ''
            form.querySelector('#target').innerHTML = '<option value=""> -- Select Target --</option>'
        }
    }
}

async function fetchGroupDepositGroups() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        let options = ''
        res.data?.data?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.groupname} </option>
            `
        })
        if(form.querySelector('#groupid')){
            form.querySelector('#groupid').innerHTML = ''
            form.querySelector('#groupid').innerHTML = '<option value=""> -- Select Group -- </option>' + options
        }
    }
    else hideSpinner()
}

async function fetchGroupDepositAccountOfficers() {
    showSpinner()
    let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        let options = ''
        res.data?.map(function(item, index){
            options += `
                <option value="${item.email}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othername ?? '' )} </option>
            `
        }) 
        if(form.querySelector('#accountofficer')){
            form.querySelector('#accountofficer').innerHTML = ''
            form.querySelector('#accountofficer').innerHTML = '<option value=""> -- Select Account Officer -- </option>' + options
        }
    }
    else hideSpinner()
    
}

async function fetchGroupDepositLocations() {
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
            form.querySelector('#location').innerHTML = '<option value="">--Select Branch --</option>'+options
        }
    }else  hideSpinner()
}

function validateGroupDeposit(){
	var flag = 1;
	var mssg='';
    
	var transactiondate = form.querySelector('#transactiondate');
	var accountofficer = form.querySelector('#accountofficer');
	var valuedate = form.querySelector('#valuedate');
	var groupid = form.querySelector('#groupid');
	var deposit = form.querySelector('#deposit');
	var returnedcash = form.querySelector('#returnedcash');
	var excesscash = form.querySelector('#excesscash');
	var total = form.querySelector('#total');
	var numbervisited = form.querySelector('#numbervisited');
	var target = form.querySelector('#target');
	var location = form.querySelector('#location');

	if(transactiondate.value.length < 1){
		mssg += 'Transaction Date must be selected <br />';			
		transactiondate.style.borderColor = 'red';
		flag =0;
	} else if (transactiondate.value.length >= 250) {
		mssg += 'Transaction Date must be selected <br />';			
		transactiondate.style.borderColor = 'red';
		flag =0;
	} else {
		transactiondate.style.borderColor = 'lightgray';
	}
	
	if(accountofficer.value.length < 1){
		mssg += 'Account Officer must be selected <br />';			
		accountofficer.style.borderColor = 'red';
		flag =0;
	}else{
		accountofficer.style.borderColor = 'lightgray';
	}
	
	if(valuedate.value.length < 1){
		mssg += 'Value Date must be selected <br />';			
		valuedate.style.borderColor = 'red';
		flag =0;
	}else{
		valuedate.style.borderColor = 'lightgray';
	}
	
	if(groupid.value.length < 1){
		mssg += 'Group must be selected <br />';			
		groupid.style.borderColor = 'red';
		flag =0;
	}else{
		groupid.style.borderColor = 'lightgray';
	}
	
	if(deposit.value.length < 1){
		mssg += 'Deposit is blank <br />';			
		deposit.style.borderColor = 'red';
		flag =0;
	} else{
		deposit.style.borderColor = 'lightgray';
	}
	
	if(returnedcash.value.length < 1){
		mssg += 'Returned Cash is blank <br />';			
		returnedcash.style.borderColor = 'red';
		flag =0;
	} else{
		returnedcash.style.borderColor = 'lightgray';
	}
	
	if(excesscash.value.length < 1){
		mssg += 'Excess Cash is blank <br />';			
		excesscash.style.borderColor = 'red';
		flag =0;
	} else{
		excesscash.style.borderColor = 'lightgray';
	}
	
	if(total.value.length < 1){
		mssg += 'Total Cash is blank <br />';			
		total.style.borderColor = 'red';
		flag =0;
	} else{
		total.style.borderColor = 'lightgray';
	}
	
	if(numbervisited.value.length < 1){
		mssg += 'Number Visited is blank <br />';			
		numbervisited.style.borderColor = 'red';
		flag =0;
	}else{
		numbervisited.style.borderColor = 'lightgray';
	}
	
	if(target.value.length < 1){
		mssg += 'Target is blank <br />';			
		target.style.borderColor = 'red';
		flag =0;
	}else{
		target.style.borderColor = 'lightgray';
	}
	
	if(location.value.length < 1){
		mssg += 'Branch is blank <br />';			
		location.style.borderColor = 'red';
		flag =0;
	}else{
		location.style.borderColor = 'lightgray';
	}
	
	if(flag == 0){
		
		var mbox = document.getElementById('messageBox');
		mbox.innerHTML = mssg;
		mbox.style.display = 'block';
		mbox.style.visibility = 'visible';

		setTimeout(function(){
			mbox.style.display = 'none';
			mbox.style.visibility = 'hidden';
			transactiondate.style.borderColor = 'lightgray';
			accountofficer.style.borderColor = 'lightgray';
			valuedate.style.borderColor = 'lightgray';
			groupid.style.borderColor = 'lightgray';
			deposit.style.borderColor = 'lightgray';
			returnedcash.style.borderColor = 'lightgray';
			excesscash.style.borderColor = 'lightgray';
			total.style.borderColor = 'lightgray';
			numbervisited.style.borderColor = 'lightgray';
			target.style.borderColor = 'lightgray';
			location.style.borderColor = 'lightgray';

		}, 3000);	
		return false;
	}else{ 
		return true; 
	}

}

function getGroupDepositParams(){
    var paramstr = new FormData(document.getElementById('groupdepositform'));
    if(localitem) paramstr.append('id', localitem.item.id)
    return paramstr;
}

function resetGroupDepositForm() {
    form.querySelector('button#submit').innerHTML = 'Submit'
    form.reset()
    localitem = null;
    form.target.innerHTML = '';
    sessionStorage.clear()
    groupDepositMode()
}

var saveGroupDeposit = function(e){
    
    if(!validateGroupDeposit()) return
	
	let cashinputs = ['deposit', 'returnedcash', 'excesscash', 'total']
	if((parseFloat(form.querySelector('#deposit').value) + parseFloat(form.querySelector('#returnedcash').value) + parseFloat(form.querySelector('#excesscash').value)) !== parseFloat(form.querySelector('#total').value)) {
	     cashinputs.forEach( input => form.querySelector(`#${input}`).style.borderColor = 'red')
	     return callModal('Total cash = Deposit + Returned + Excess cash')
	}
	else {
	   cashinputs.forEach( input => form.querySelector(`#${input}`).style.borderColor = '') 
	}
	 
    showSpinner();
	var request = getAjaxObject();
    request.open('POST','../controllers/groupdepositscript.php',true);
    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                form.querySelector('button#submit').innerHTML = 'Submit'
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Group deposit successful', 1)
                    resetGroupDepositForm()
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  {
                return callModal('Error: Request failed', 0)
                
            }
        }
        else return hideSpinner();
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }
    
	request.setRequestHeader('Connection','close');
	request.send(getGroupDepositParams());

}


var groupDepositNav = document.getElementById("groupdeposit");
if (groupDepositNav) groupDepositNav.addEventListener("click", groupDeposit, false);

// View Group Deposit  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
    let result = await fetch('../controllers/fetchgroupdepositmodified.php', {method: 'POST', body: paramstr, headers: new Headers()})
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


function viewGroupDepositssetCurrentPage(pageNum) {
  currentPage = pageNum;
  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  // clear table
  jtabledata.innerHTML = '';

  // reset page totals
  let sumCredit         = 0;
  let sumProperty       = 0;
  let sumSavings        = 0;
  let sumRegistrations  = 0;
  let sumRenewals       = 0;

  if (groupdeposits.length) {
    groupdeposits.forEach((item, index) => {
      if (index >= prevRange && index < currRange) {
        appendViewGroupDepositsTableRows(item, index);

        // accumulate
        sumCredit        += Number(item.credit)         || 0;
        sumProperty      += Number(item.totalproperty)  || 0;
        sumSavings       += Number(item.totalsavings)   || 0;
        sumRegistrations += Number(item.totalregistrations) || 0;
        sumRenewals      += Number(item.totalrenewals)  || 0;
      }
    });

    // if no rows, retry fetching
    if (!document.querySelector('#viewgroupdepositstable tbody').innerHTML.trim()) {
      viewgroupdepositsbtn.click();
      form.querySelector('button#submit').click();
    }
  }

  // update footer cells
  document.getElementById('footer-credit').textContent        = formatMoney(sumCredit);
  document.getElementById('footer-property').textContent      = sumProperty.toString();
  document.getElementById('footer-savings').textContent       = sumSavings.toString();
  document.getElementById('footer-registrations').textContent = sumRegistrations.toString();
  document.getElementById('footer-renewals').textContent      = sumRenewals.toString();
}


async function appendViewGroupDepositsTableRows(item, index) {
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td style="display:none">${formatDate(item.transactiondate)}</td> 
            <td style="text-transform:none"> ${  item.accountofficername ?? '' } </td>
            <td style="display:none"> ${ item.accountnumber } </td>
            <td style="display:none"> ${item.accountname} </td>
            <td style="text-align:left"> ${ formatMoney(item.credit) } </td>
            <td> ${ item.totalproperty} </td> 
            <td> ${ item.totalsavings} </td>
            <td> ${ item.totalregistrations} </td> 
            <td> ${ item.totalrenewals} </td>    
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

let thelocationgroupdata = null

async function fetchViewGroupDepositGroups(location="") {
    if(!location)return form.querySelector('#group').innerHTML = '<option value="">--No Location Selected --</option>';
    showSpinner()
    if(thelocationgroupdata){
        try{let options = '';
        thelocationgroupdata?.filter(data=>data.location == location).map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.groupname} </option>
            `
        })
        if(form.querySelector('#group')){
            form.querySelector('#group').innerHTML = ''
            form.querySelector('#group').innerHTML = '<option value="">--Select Group --</option>'+options
        }
        return hideSpinner()}catch(err){return console.log('fileter err', err)}
    }
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        viewdepositsgroups = res.data?.data.filter(data=>data.location == location)
        thelocationgroupdata = res.data?.data
        let options = '';
        viewdepositsgroups?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.groupname} </option>
            `
        })
        if(form.querySelector('#group')){
            form.querySelector('#group').innerHTML = ''
            form.querySelector('#group').innerHTML = '<option value="">--Select Group --</option>'+options
        }
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

// Edit Deposit --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var deposits; datasource = []
async function openEditErrorsinDeposit () {
    await  httpRequest('editerrorsindeposit.php');
    form = document.getElementById('filterediterrosindepositform')
    if(form) {
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateEditErrorsTable)
        form.querySelector('#startdate').valueAsDate = new Date()
        form.querySelector('#enddate').valueAsDate = new Date()
        
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(EditErrorsetCurrentPage)
        await fetchEditErrorsInDepositTableData()
    }
}

async function fetchEditErrorsInDepositTableData() {
    await fetchUsersForEditErrors()
    await fetchEditDepositErrorAccountOfficers()
}

async function generateEditErrorsTable() {
    showSpinner();
    let paramstr = new FormData(form)
    paramstr.append('ttpe', 'DEPOSIT')
    paramstr.append('action', 'EDIT')
    let result = await fetch('../controllers/fetchdeposits.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            deposits = datasource = res.data;
            deposits.length && initPagination(deposits, EditErrorsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function EditErrorsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(deposits.length) {
        deposits.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendEditErrorsTableRows(item, index)
            }
        })
        if(document.querySelector('#errorsindeposittable tbody').innerHTML === '') editerrorsindeposit.click()
    }
}

async function appendEditErrorsTableRows(item, index) {
    let user = await depositusers.find(val => val.email == item.user)
    let officerById = await depositusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await depositusers.find(val => val.email == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')} </td>
            <td> ${ item.accountnumber } </td>
            <td style="text-align:left"> ${ formatMoney(item.credit) } </td>
            <td> ${ item.reference} </td>
            <td> ${formatDate(item.transactiondate)}</td>
            <td style="text-transform:none"> ${  item.accountofficer == undefined ? '' : ( officerById ? officerById.email : (officerByEmail ?  officerByEmail.email : '' ))} </td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="editDepositError(event, ${index})">Edit</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:tomato;border-radius:3px" onclick="removeDeposit(event, ${index})">Delete</button>
                </div>
            </td>
        </tr>
    `
}

async function removeDeposit(event, index) {

    if(!confirm('Are you sure you want to delete this deposit?')) return
    
    let selecteditem = deposits[index]
    if(selecteditem) {
        event.target.disabled = true;
        event.target.innerHTML = 'Removing...'
        let paramstr = new FormData()
        paramstr.append('id', deposits[index].id)
        
        try {
            let result = await fetch('../controllers/removedeposit.php', {body: paramstr, method: 'POST', headers: new Headers()})
            let res = await result.json()
            if(res?.status) {
                
                callModal('Transaction deleted successfully')
                let newarr = deposits.filter( item => item.id !== deposits[index].id);
                deposits = datasource = newarr;
                deposits.length && initPagination(newarr, EditErrorsetCurrentPage)
            }
    
            else {
                event.target.disabled = false;
                event.target.innerHTML = 'Delete'
                return callModal(res?.message, 0)
            }
        }
        catch(e) {
            event.target.disabled = false;
            event.target.innerHTML = 'Delete'
            console.log(e)
        }
    }
}

async function editDepositError(event, index) {
    if(!confirm('Are you sure you want to edit this deposit?')) return
    
    event.target.disabled = true;
    event.target.innerHTML = 'Loading'
    let paramstr = new FormData()
    paramstr.append('id', deposits[index].id)
    
    try {
        let result = await fetch('../controllers/fetchtdetail.php', {body: paramstr, method: 'POST', headers: new Headers()})
        let res = await result.json()
        if(res?.status) {
            
            event.target.disabled = false;
            event.target.innerHTML = 'Edit'
            
            let officersbyId = accountofficerslist?.map(function(item, index){
                return  `<option value="${item.id}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othername ?? '' )} </option>`
            }).join('')
            
            let officersbyemail = accountofficerslist?.map(function(item, index){
                return  `<option value="${item.email}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othername ?? '' )} </option>`
            }).join('')
            
            let modalcontent = `
                <h4 style="margin: 5px 10px 20px 10px;font-weight:bolder;text-transform:uppercase">Transaction Details</h4>
                <form class="jform no-pr" id="editdepositform">
                    <div class="section-header" style="display:flex; gap:6px; align-items:center;"></div>
                    <div class="col-form-group" style="margin: 0 auto;width: 90%"> 
                        <div class="jformgroup form_row" > 
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Account Number: </label>
                                <input type="number" class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber" value="${res.data[0].accountnumber}">
                            </div>
                        </div>
                        <div class="jformgroup form_row" > 
                             <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Account officer: </label>
                                <select class="jformcontrol jmargin-top" id="accountofficer" name="accountofficer">
                                    <option value=""> -- Select Officer -- </option>
                                    ${ res.data[0].accountofficer == undefined ? '-' :( Number.isInteger(parseInt(res.data[0].accountofficer)) ? officersbyId : officersbyemail ) }
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Value Date: </label>
                                <input type="date" class="jformcontrol jmargin-top" id="valuedate" name="valuedate">
                            </div>
                        </div>
                        <div class="jformgroup form_row" >
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Amount deposited: </label>
                                <input type="number" class="jformcontrol jmargin-top" id="amount" name="amount" value="${res.data[0].credit}">
                            </div>
                           <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Transaction Date: </label>
                                <input type="date" class="jformcontrol jmargin-top" id="transactiondate" name="transactiondate">
                            </div>
                        </div>
                        <div class="jflex" style="margin: 30px 0;">
                            <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" value="${deposits[index].id}" onclick="saveDepositErrorChanges(event)"> Save Changes </button>
                        </div>
                    </div>
                </form> 
               
                <div style="height: 30px;width:auto"></div>
                    `
                openJModal(modalcontent)
                document.querySelector('#editdepositform #accountofficer').value= res.data[0].accountofficer
                document.querySelector('#editdepositform #transactiondate').value= res.data[0].transactiondate.split(' ')[0]
                document.querySelector('#editdepositform #valuedate').value= res.data[0].valuedate.split(' ')[0]
        }
        else {
            event.target.disabled = false;
            event.target.innerHTML = 'Edit'
            return callModal(res?.message)
        }
    }
    catch(e) {
        event.target.disabled = false;
        event.target.innerHTML = 'Edit'
        console.log(e)
    }
}

function saveDepositErrorChanges(event) {
    if(!validateEditDepositErrorForm()) return
    
    event.target.disabled = true;
    event.target.innerHTML = 'Saving...'
    showSpinner();
	var request = getAjaxObject();
    request.open('POST','../controllers/editerrorsindeposit.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            event.target.disabled = false;
            event.target.innerHTML = 'Save Changes'
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Deposit changes saved', 1)
                    form.querySelector('button#submit').click()
                    closeJmodal()
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else {
            event.target.disabled = false;
            event.target.innerHTML = 'Save Changes'
            return hideSpinner();
        }
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }
    
    let paramstr = new FormData(document.getElementById('editdepositform'))
    paramstr.append('id', event.target.value)
    
	request.setRequestHeader('Connection','close');
	request.send(paramstr);
}

async function fetchUsersForEditErrors () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) depositusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}


async function fetchEditDepositErrorAccountOfficers() {
    showSpinner()
    let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        accountofficerslist = res.data
    }
    else hideSpinner()
    
}

function validateEditDepositErrorForm() {
    var flag = 1;
	var mssg='';
	let form = document.getElementById('editdepositform')
	if(form.querySelector('#transactiondate').value.length < 1){
		mssg += 'Transaction date is Invalid <br />';			
		form.querySelector('#transactiondate').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#transactiondate').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#amount').value.length < 1){
		mssg += 'Amount deposit is Invalid <br />';			
		form.querySelector('#amount').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#amount').style.borderColor = 'lightgray';
	}
	
	
	if(form.querySelector('#valuedate').value.length < 1){
		mssg += 'Value date is Invalid <br />';			
		form.querySelector('#valuedate').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#valuedate').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#accountofficer').value.length < 1){
		mssg += 'Account officer is Invalid <br />';			
		form.querySelector('#accountofficer').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#accountofficer').style.borderColor = 'lightgray';
	}
	
	
	if(form.querySelector('#accountnumber').value.length < 1){
		mssg += 'Account number is Invalid <br />';			
		form.querySelector('#accountnumber').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#accountnumber').style.borderColor = 'lightgray';
	}
	
	
	if(flag == 0){
		
		var mbox = document.getElementById('messageBox');
		mbox.innerHTML = mssg;
		mbox.style.display = 'block';
		mbox.style.visibility = 'visible';

		setTimeout(function(){
			mbox.style.display = 'none';
			mbox.style.visibility = 'hidden';

			form.querySelector('#transactiondate').style.borderColor = 'lightgray';
			form.querySelector('#amount').style.borderColor = 'lightgray';
			form.querySelector('#valuedate').style.borderColor = 'lightgray';
			form.querySelector('#accountofficer').style.borderColor = 'lightgray';
			form.querySelector('#accountnumber').style.borderColor = 'lightgray';
		

		}, 2000);	
		return false;
	}else{ 
		return true; 
	}
}

var editerrorsindeposit = document.getElementById('editerrorsindeposit')
if(editerrorsindeposit) editerrorsindeposit.addEventListener('click', e=>openEditErrorsinDeposit())


// View Edited Deposit --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var editeddeposits; datasource = []
async function viewEditedDeposits() {
    await httpRequest('viewediteddeposits.php')
    form = document.getElementById('filterviewediteddepositsform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateEditedDepositTable)
            if(form.querySelector('button#print-dl')) form.querySelector('button#print-dl').addEventListener('click', printEditedDepositTable)
            if(form.querySelector('button#export-dl')) form.querySelector('button#export-dl').addEventListener('click', exportEditedDepositTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewEditedDepositsetCurrentPage)
            await fetchViewEditedDepositsTableData()
        }
}

async function fetchViewEditedDepositsTableData() {
    await fetchViewEditedDepositOrganizationInfo()
    await fetchUsersForEditedDeposit()
}

async function generateEditedDepositTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchupdateddeposits.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            editeddeposits = datasource = res.data;
            editeddeposits.length && initPagination(editeddeposits, viewEditedDepositsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewEditedDepositsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(editeddeposits.length) {
        editeddeposits.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendDepositsTableRows(item, index)
            }
        })
        if(document.querySelector('#viewediteddepositstable tbody').innerHTML === '') viewediteddepositsbtn.click()
    }
}

async function appendDepositsTableRows(item, index) {
    let user = await depositusers.find(val => val.email == item.user)
    // let officer = await depositusers.find(val => val.id == item.accountofficer)
    let officerById = await depositusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await depositusers.find(val => val.email == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')} </td>
            <td> ${ item.accountnumber } </td>
            <td style="text-align:left"> ${ formatMoney(item.credit) } </td>
            <td> ${ item.reference} </td>
            <td> ${formatDate(item.transactiondate)}</td>
            <td style="text-transform:none"> ${  item.accountofficer == undefined ? '' : ( officerById ? officerById.email : (officerByEmail ?  officerByEmail.email : '' )) } </td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="printEditedDepositTransaction(event, ${index})">Print</button>
                </div>
            </td>
        </tr>
    `
}

async function fetchViewEditedDepositOrganizationInfo() {
        let result = await fetchRequest('../controllers/fetchorganisationscript.php');
        if(result) {
            let parseResult  =  JSON.parse(result);
            if(parseResult.status) orginfo = parseResult.data.data[0]
        }
    }
        
async function printEditedDepositTransaction(event, index) {
    let selecteditem = editeddeposits[index]
    let user = await depositusers.find(val => val.email == selecteditem.user)
    let html = `
        <div class="transaction-receipt">
            <div>
                <h4>Transaction Receipt</h4>
                <div>
                    <div>
                        <p style="text-transform:capitalize">${orginfo.companyname}</p>
                        <p style="text-transform:capitalize">${orginfo.address}</p>
                        <p style="text-transform:capitalize">${orginfo.telephone}</p>
                    </div> 
                    <span>${formatDate(new Date().toLocaleString())}</span>
                </div>
            </div>
            <ul>
                <li>
                    <span>Name </span> 
                    <span> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')}</span>
                </li>
                <li>
                    <span>Account </span>
                    <span>${ selecteditem.accountnumber } </span>
                </li>
                <li>
                    <span>Reference </span>
                    <span style="text-transform: none;width: 60px">${ selecteditem.reference} </span>
                </li>
                <li> 
                    <span>Date </span>
                    <span> ${formatDate(selecteditem.transactiondate) }</span>
                </li>
                <li>
                    <span>Transaction Type </span>
                    <span>Deposit</span>
                </li>
                <li style="font-weight:bold">
                    <span>Amount </span>
                    <span>N${ formatMoney(selecteditem.credit) }</span>
                </li>
            </ul>
            <div class="footer">
                <p>We appreciate you doing business with us</p>
                <span>THANK YOU</span>
            </div>
        </div>
    `
    let div = document.createElement('div')
    div.innerHTML = html;
    div.id = 'printable-transact'
    if(document.getElementById('printable-transact')) document.getElementById('printable-transact').remove()
    document.body.appendChild(div)
    printContent(' ', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-transact')
}

function printEditedDepositTable() {
    if(editeddeposits?.length) printContent('Deposits', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportEditedDepositTable() {
    if(editeddeposits?.length) tableToExcel('viewediteddepositstable', 'deposits')
}

async function fetchUsersForEditedDeposit () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) depositusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewediteddepositsbtn = document.getElementById("viewediteddeposits");
if (viewediteddepositsbtn) viewediteddepositsbtn.addEventListener("click", viewEditedDeposits);

// View Deleted Deposit --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = []
async function openViewDeletedDeposits() {
    await httpRequest('viewdeleteddeposits.php')
    form = document.getElementById('filterviewdeleteddepositsform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateDeletedDepositTable)
            if(form.querySelector('button#print-ddl')) form.querySelector('button#print-ddl').addEventListener('click', printDeletedDepositTable)
            if(form.querySelector('button#export-ddl')) form.querySelector('button#export-ddl').addEventListener('click', exportDeletedDepositTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewDeletedDepositsetCurrentPage)
            await fetchViewDeletedDepositsTableData()
        }
}

async function fetchViewDeletedDepositsTableData() {
    await fetchUsersForDeletedDeposit()
}


function printDeletedDepositTable() {
    if(deleteddeposits?.length) printContent('Deleted Deposits', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportDeletedDepositTable() {
    if(deleteddeposits?.length) tableToExcel('viewdeleteddepositstable', 'deposits')
}


async function generateDeletedDepositTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchremoveddeposits.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            deleteddeposits = datasource = res.data;
            deleteddeposits.length && initPagination(deleteddeposits, viewDeletedDepositsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewDeletedDepositsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(deleteddeposits.length) {
        deleteddeposits.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendDeletedDepositsTableRows(item, index)
            }
        })
        if(document.querySelector('#viewdeleteddepositstable tbody').innerHTML === '') viewdeleteddepositsbtn.click()
    }
}

async function appendDeletedDepositsTableRows(item, index) {
    let user = await deleteddepositusers.find(val => val.email == item.user)
    // let officer = await deleteddepositusers.find(val => val.id == item.accountofficer)
    let officerById = await deleteddepositusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await deleteddepositusers.find(val => val.email == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')} </td>
            <td> ${ item.accountnumber } </td>
            <td style="text-align:left"> ${ formatMoney(item.credit) } </td>
            <td> ${ item.reference} </td>
            <td> ${formatDate(item.transactiondate)}</td>
            <td style="text-transform:none"> ${  item.accountofficer == undefined ? '' : ( officerById ? officerById.email : (officerByEmail ?  officerByEmail.email : '' )) } </td>
        </tr>
    `
}

       
async function fetchUsersForDeletedDeposit () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deleteddepositusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewdeleteddepositsbtn = document.getElementById("viewdeleteddeposits");
if (viewdeleteddepositsbtn) viewdeleteddepositsbtn.addEventListener("click", openViewDeletedDeposits, false);

// Edit Withdrawals --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var withdraws; var datasource = []
async function openEditWithdrawal () {
    await  httpRequest('editwithdrawals.php');
    form = document.getElementById('filtereditwithdrawalform')
    if(form) {
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateEditWithdrawalsTable)
        form.querySelector('#startdate').valueAsDate = new Date()
        form.querySelector('#enddate').valueAsDate = new Date()
        
        
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(editWithdrawalSetCurrentPage)
        await fetchEditWithdrawalTableData()
    }
}

async function fetchEditWithdrawalTableData() {
    await fetchUsersForEditWithdrawals()
    await fetchEditWithdrawalsAccountOfficers()
}

async function generateEditWithdrawalsTable() {
    showSpinner();
    let paramstr = new FormData(form)
    paramstr.append('action', 'EDIT')
    let result = await fetch('../controllers/fetchwithdrawals.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            withdraws = datasource = res.data;
            withdraws.length && initPagination(withdraws, editWithdrawalSetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

async function editWithdrawalSetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(withdraws.length) {
        withdraws.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendEditWithdrawalTableRows(item, index)
            }
        })
        
        if(document.querySelector('#editwithdrawalstable tbody').innerHTML === '') editwithdrawalsbtn.click()
    }
}

async function appendEditWithdrawalTableRows(item, index) {
    let user = await withdrawusers.find(val => val.email == item.user)
    let officerById = await withdrawusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await withdrawusers.find(val => val.email == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')} </td>
            <td> ${ item.accountnumber } </td>
            <td style="text-align:left"> ${ formatMoney(item.debit) } </td>
            <td> ${ item.reference} </td>
            <td> ${formatDate(item.transactiondate)}</td>
            <td style="text-transform:none"> ${  item.accountofficer == undefined ? '' : ( officerById ? officerById.email : (officerByEmail ?  officerByEmail.email : '' ))} </td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="editWithdrawal(event, ${index})">Edit</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:tomato;border-radius:3px" onclick="removeWithdrawal(event, ${index})">Delete</button>
                </div>
            </td>
        </tr>
    `
}

async function removeWithdrawal(event, index) {
    
    if(!confirm('Are you sure you want to delete this withdrawal?')) return
    
    let selecteditem = withdraws[index]
    if(selecteditem) {
        event.target.disabled = true;
        event.target.innerHTML = 'Removing...'
        let paramstr = new FormData()
        paramstr.append('id', withdraws[index].id)
        
        try {
            let result = await fetch('../controllers/removewithdrawal.php', {body: paramstr, method: 'POST', headers: new Headers()})
            let res = await result.json()
            if(res?.status) {
                callModal('Transaction deleted successfully')

                let newarr = withdraws.filter( item => item.id !== withdraws[index].id);
                withdraws = datasource = newarr;
                withdraws.length && initPagination(newarr, editWithdrawalSetCurrentPage)
            }
    
            else {
                event.target.disabled = false;
                event.target.innerHTML = 'Delete'
                return callModal(res?.message)
            }
        }
        catch(e) {
            event.target.disabled = false;
            event.target.innerHTML = 'Delete'
            console.log(e)
        }
    }
}

async function editWithdrawal(event, index) {
    if(!confirm('Are you sure you want to edit this withdrawal?')) return
    
    event.target.disabled = true;
    event.target.innerHTML = 'Loading'
    let paramstr = new FormData()
    paramstr.append('id', withdraws[index].id)
    
    try {
        let result = await fetch('../controllers/fetchtdetail.php', {body: paramstr, method: 'POST', headers: new Headers()})
        let res = await result.json()
        if(res?.status) {
            
            event.target.disabled = false;
            event.target.innerHTML = 'Edit'
            
            let officersbyId = accountofficerslist?.map(function(item, index){
                return  `<option value="${item.id}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othername ?? '' )} </option>`
            }).join('')
            
            let officersbyemail = accountofficerslist?.map(function(item, index){
                return  `<option value="${item.email}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othername ?? '' )} </option>`
            }).join('')
            
            let modalcontent = `
                <h4 style="margin: 5px 10px 20px 10px;font-weight:bolder;text-transform:uppercase">Transaction Details</h4>
                <form class="jform no-pr" id="editwithdrawalform">
                    <div class="section-header" style="display:flex; gap:6px; align-items:center;"></div>
                    <div class="col-form-group" style="margin: 0 auto;width: 90%"> 
                        <div class="jformgroup form_row" > 
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Account Number: </label>
                                <input type="number" class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber" value="${res.data[0].accountnumber}">
                            </div>
                        </div>
                        <div class="jformgroup form_row" > 
                             <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Account officer: </label>
                                <select class="jformcontrol jmargin-top" id="accountofficer" name="accountofficer">
                                    <option value=""> -- Select Officer -- </option>
                                    ${ res.data[0].accountofficer == undefined ? '-' :( Number.isInteger(parseInt(res.data[0].accountofficer)) ? officersbyId : officersbyemail ) }
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Value Date: </label>
                                <input type="date" class="jformcontrol jmargin-top" id="valuedate" name="valuedate">
                            </div>
                        </div>
                        <div class="jformgroup form_row" >
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Amount: </label>
                                <input type="number" class="jformcontrol jmargin-top" id="amount" name="amount" value="${res.data[0].debit}">
                            </div>
                           <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Transaction Date: </label>
                                <input type="date" class="jformcontrol jmargin-top" id="transactiondate" name="transactiondate">
                            </div>
                        </div>
                        <div class="jflex" style="margin: 30px 0;">
                            <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" value="${withdraws[index].id}" onclick="saveWithdrawalChanges(event)"> Save Changes </button>
                        </div>
                    </div>
                </form> 
               
                <div style="height: 30px;width:auto"></div>
                    `
                openJModal(modalcontent)
                document.querySelector('#editwithdrawalform #accountofficer').value= res.data[0].accountofficer
                document.querySelector('#editwithdrawalform #transactiondate').value= res.data[0].transactiondate.split(' ')[0]
                document.querySelector('#editwithdrawalform #valuedate').value= res.data[0].valuedate.split(' ')[0]
        }
        else {
            event.target.disabled = false;
            event.target.innerHTML = 'Edit'
            return callModal(res?.message)
        }
    }
    catch(e) {
        event.target.disabled = false;
        event.target.innerHTML = 'Edit'
        console.log(e)
    }
}

function saveWithdrawalChanges(event) {
    if(!validateEditWithdrawForm()) return
    
    event.target.disabled = true;
    event.target.innerHTML = 'Saving...'
    showSpinner();
	var request = getAjaxObject();
    request.open('POST','../controllers/editwithdrawals.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            event.target.disabled = false;
            event.target.innerHTML = 'Save Changes'
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('withdrawal changes saved', 1)
                    document.getElementById('editwithdrawalform').reset()
                    form.querySelector('button#submit').click()
                    closeJmodal()
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else {
            event.target.disabled = false;
            event.target.innerHTML = 'Save Changes'
            return hideSpinner();
        }
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }
    
    let paramstr = new FormData(document.getElementById('editwithdrawalform'))
    paramstr.append('id', event.target.value)
    
	request.setRequestHeader('Connection','close');
	request.send(paramstr);
}

async function fetchUsersForEditWithdrawals () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) withdrawusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

async function fetchEditWithdrawalsAccountOfficers() {
    showSpinner()
    let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        accountofficerslist = res.data
    }
    else hideSpinner()
    
}

function validateEditWithdrawForm() {
    var flag = 1;
	var mssg='';
	let form = document.getElementById('editwithdrawalform')
	if(form.querySelector('#transactiondate').value.length < 1){
		mssg += 'Transaction date is Invalid <br />';			
		form.querySelector('#transactiondate').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#transactiondate').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#amount').value.length < 1){
		mssg += 'Amount withdrawn is Invalid <br />';			
		form.querySelector('#amount').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#amount').style.borderColor = 'lightgray';
	}
	
	
	if(form.querySelector('#valuedate').value.length < 1){
		mssg += 'Value date is Invalid <br />';			
		form.querySelector('#valuedate').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#valuedate').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#accountofficer').value.length < 1){
		mssg += 'Account officer is Invalid <br />';			
		form.querySelector('#accountofficer').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#accountofficer').style.borderColor = 'lightgray';
	}
	
	
	if(form.querySelector('#accountnumber').value.length < 1){
		mssg += 'Account number is Invalid <br />';			
		form.querySelector('#accountnumber').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#accountnumber').style.borderColor = 'lightgray';
	}
	
	
	if(flag == 0){
		
		var mbox = document.getElementById('messageBox');
		mbox.innerHTML = mssg;
		mbox.style.display = 'block';
		mbox.style.visibility = 'visible';

		setTimeout(function(){
			mbox.style.display = 'none';
			mbox.style.visibility = 'hidden';

			form.querySelector('#transactiondate').style.borderColor = 'lightgray';
			form.querySelector('#amount').style.borderColor = 'lightgray';
			form.querySelector('#valuedate').style.borderColor = 'lightgray';
			form.querySelector('#accountofficer').style.borderColor = 'lightgray';
			form.querySelector('#accountnumber').style.borderColor = 'lightgray';
		

		}, 2000);	
		return false;
	}else{ 
		return true; 
	}
}

var editwithdrawalsbtn = document.getElementById('editwithdrawals')
if(editwithdrawalsbtn) editwithdrawalsbtn.addEventListener('click', openEditWithdrawal, false)


// View Edited Withdrawals --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = []
async function viewEditedWithdraws() {
    await httpRequest('vieweditedwithdraws.php')
    form = document.getElementById('filtervieweditedwithdrawsform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateEditedWithdrawTable)
            if(form.querySelector('button#print-dl')) form.querySelector('button#print-dl').addEventListener('click', printEditedWithdrawTable)
            if(form.querySelector('button#export-dl')) form.querySelector('button#export-dl').addEventListener('click', exportEditedWithdrawTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewEditedWithdrawsetCurrentPage)
            await fetchViewEditedWithdrawsTableData()
        }
}

async function fetchViewEditedWithdrawsTableData() {
    await fetchViewEditedWithdrawOrganizationInfo()
    await fetchUsersForEditedWithdraw()
}

async function generateEditedWithdrawTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchupdatedwithrawals.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            withdraws = datasource = res.data;
            withdraws.length && initPagination(withdraws, viewEditedWithdrawsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewEditedWithdrawsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(withdraws.length) {
        withdraws.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendWithdrawsTableRows(item, index)
            }
        })
        if(document.querySelector('#vieweditedwithdrawstable tbody').innerHTML === '') vieweditedwithdrawsbtn.click()
    }
}

async function appendWithdrawsTableRows(item, index) {
    let user = await withdrawusers.find(val => val.email == item.user)
    // let officer = await withdrawusers.find(val => val.id == item.accountofficer)
    let officerById = await withdrawusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await withdrawusers.find(val => val.email == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')} </td>
            <td> ${ item.accountnumber } </td>
            <td style="text-align:left"> ${ formatMoney(item.debit) } </td>
            <td> ${ item.reference} </td>
            <td> ${formatDate(item.transactiondate)}</td>
            <td style="text-transform:none"> ${  item.accountofficer == undefined ? '' : ( officerById ? officerById.email : (officerByEmail ?  officerByEmail.email : '' )) } </td>
            <td class="no-pr">
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="printEditedWithdrawTransaction(event, ${index})">Print</button>
                </div>
            </td>
        </tr>
    `
}

async function fetchViewEditedWithdrawOrganizationInfo() {
        let result = await fetchRequest('../controllers/fetchorganisationscript.php');
        if(result) {
            let parseResult  =  JSON.parse(result);
            if(parseResult.status) orginfo = parseResult.data.data[0]
        }
    }
        
async function printEditedWithdrawTransaction(event, index) {
    let selecteditem = withdraws[index]
    let user = await withdrawusers.find(val => val.email == selecteditem.user)
    let html = `
        <div class="transaction-receipt">
            <div>
                <h4>Transaction Receipt</h4>
                <div>
                    <div>
                        <p style="text-transform:capitalize">${orginfo.companyname}</p>
                        <p style="text-transform:capitalize">${orginfo.address}</p>
                        <p style="text-transform:capitalize">${orginfo.telephone}</p>
                    </div> 
                    <span>${formatDate(new Date().toLocaleString())}</span>
                </div>
            </div>
            <ul>
                <li>
                    <span>Name </span>
                    <span> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')}</span>
                </li>
                <li>
                    <span>Account </span>
                    <span>${ selecteditem.accountnumber } </span>
                </li>
                <li>
                    <span>Reference </span>
                    <span style="text-transform: none;">${ selecteditem.reference} </span>
                </li>
                <li>
                    <span>Date </span>
                    <span> ${formatDate(selecteditem.transactiondate)}</span>
                </li>
                <li>
                    <span>Transaction Type </span>
                    <span>Withdrawal</span>
                </li>
                <li style="font-weight:bold">
                    <span>Amount </span>
                    <span>N${ formatMoney(selecteditem.debit) }</span>
                </li>
            </ul>
            <div class="footer">
                <p>We appreciate you doing business with us</p>
                <span>THANK YOU</span>
            </div>
        </div>
    `
    let div = document.createElement('div')
    div.innerHTML = html;
    div.id = 'printable-transact'
    if(document.getElementById('printable-transact')) document.getElementById('printable-transact').remove()
    document.body.appendChild(div)
    printContent(' ', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'printable-transact')
}

function printEditedWithdrawTable() {
    if(withdraws?.length) printContent('Withdraws', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportEditedWithdrawTable() {
    if(withdraws?.length) tableToExcel('vieweditedwithdrawstable', 'withdraws')
}

async function fetchUsersForEditedWithdraw () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) withdrawusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var vieweditedwithdrawsbtn = document.getElementById("vieweditedwithdraws");
if (vieweditedwithdrawsbtn) vieweditedwithdrawsbtn.addEventListener("click", viewEditedWithdraws);

// View Deleted Withdrawals --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = []
async function openViewDeletedWithdrawals() {
    await httpRequest('viewdeletedwithdrawals.php')
    form = document.getElementById('filterviewdeletedwithdrawalsform')
        if(form) {
            if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateDeletedWithdrawalTable)
            if(form.querySelector('button#print-dw')) form.querySelector('button#print-dw').addEventListener('click', printDeletedWithdrawalTable)
            if(form.querySelector('button#export-dw')) form.querySelector('button#export-dw').addEventListener('click', exportDeletedWithdrawalTable)
            form.querySelector('#startdate').valueAsDate = new Date()
            form.querySelector('#enddate').valueAsDate = new Date()
            
            jtabledata = document.getElementById('jtabledata')
            initializePaginationParams(viewDeletedWithdrawalsetCurrentPage)
            await fetchViewDeletedWithdrawalsTableData()
        }
}

async function fetchViewDeletedWithdrawalsTableData() {
    await fetchUsersForDeletedWithdrawal()
}


function printDeletedWithdrawalTable() {
    if(deletedwithdrawals?.length) printContent('Deleted Withdrawals', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportDeletedWithdrawalTable() {
    if(deletedwithdrawals?.length) tableToExcel('viewdeletedwithdrawalstable', 'withdrawals')
}


async function generateDeletedWithdrawalTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchremovedwithdrawals.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            deletedwithdrawals = datasource = res.data;
            deletedwithdrawals.length && initPagination(deletedwithdrawals, viewDeletedWithdrawalsetCurrentPage)
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}

function viewDeletedWithdrawalsetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(deletedwithdrawals.length) {
        deletedwithdrawals.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendDeletedWithdrawalsTableRows(item, index)
            }
        })
        if(document.querySelector('#viewdeletedwithdrawalstable tbody').innerHTML === '') viewdeletedwithdrawalsbtn.click()
    }
}

async function appendDeletedWithdrawalsTableRows(item, index) {
    let user = await deletedwithdrawalusers.find(val => val.email == item.user)
    // let officer = await deletedwithdrawalusers.find(val => val.id == item.accountofficer)
    let officerById = await deletedwithdrawalusers.find(val => val.id == item.accountofficer)
    let officerByEmail = await deletedwithdrawalusers.find(val => val.email == item.accountofficer)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td> ${ user.firstname + ' ' + user.lastname + ' ' + (user.othername ?? '')} </td>
            <td> ${ item.accountnumber } </td>
            <td style="text-align:left"> ${ formatMoney(item.debit) } </td>
            <td> ${ item.reference} </td>
            <td> ${formatDate(item.transactiondate)}</td>
            <td style="text-transform:none"> ${  item.accountofficer == undefined ? '' : ( officerById ? officerById.email : (officerByEmail ?  officerByEmail.email : '' )) } </td>
        </tr>
    `
}

       
async function fetchUsersForDeletedWithdrawal () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) deletedwithdrawalusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

var viewdeletedwithdrawalsbtn = document.getElementById("viewdeletedwithdrawals");
if (viewdeletedwithdrawalsbtn) viewdeletedwithdrawalsbtn.addEventListener("click", openViewDeletedWithdrawals, false);


// Daily Transactions --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; var dailytransactions; datasource = []

async function openDailyTransactions() {
    await httpRequest('dailytransaction.php')
    
    form = document.getElementById('filterdailytransactionsform')
    if(form) {
        form.querySelector('#startdate').valueAsDate = new Date()
        form.querySelector('#enddate').valueAsDate = new Date()
        
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generateDailyTransactions)
        document.querySelector('button#print-dt').addEventListener('click', printDailyTransactions)
        document.querySelector('button#export-dt').addEventListener('click', exportDailyTransactions)
    }
    
    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(dailyTransactionssetCurrentPage)

    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    await fetchDailyTransactionsPageData()
    
    async function fetchDailyTransactionsPageData() {
        await fetchDailyTransactionsLocations()
    }
    
    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await dailyTransactionssetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {dailyTransactionssetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
        
    function printDailyTransactions() {
        if(dailytransactions.length) printContent('Daily Transactions', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
    }
    
    function exportDailyTransactions() {
        if(dailytransactions.length) tableToExcel('dailytransactionstable', 'daily_transactions')
    }
    
    async function generateDailyTransactions(event) {
        event.target.disabled = true;
        let paramstr = new FormData(form)
        let result = await fetch('../controllers/fetchperiodictransactions.php', {method: 'POST', body: paramstr, headers: new Headers()})
        let res = await result.json();
        if(res.status) {
            event.target.disabled = false;
            dailytransactions = datasource = res.data;
            document.querySelector('#dailytransactionstable tbody').innerHTML === ''
            if(dailytransactions.length) setNewPaginationContext(paginationLimitInput)
            else return callModal('No records retrieved')
        }
        else {
            if(jtabledata) jtabledata.innerHTML = '';
            event.target.disabled = false;
            callModal(res.message, 0)
        }
    }
    
    async function dailyTransactionssetCurrentPage(pageNum) {
        currentPage = pageNum;
        handleActivePageNumber();
        handlePageButtonsStatus();
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        if(jtabledata) jtabledata.innerHTML = '';
        if(dailytransactions.length) {
            dailytransactions.forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    appendDailyTransactionsTableRows(item, index)
                }
            })
            if (pageCount === currentPage) renderTableSavingTransactionsFooter()
            else {
                try {
                    document.querySelector('#dailytransactionstable #tablefooter')?.remove()
                }
                catch(e) {console.log(e)}
            }
            
            if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#dailytransactionstable #tablefooter')){
                document.querySelector('#dailytransactionstable #tablefooter')?.remove()
                dailytransactionsbtn.click()
                form.querySelector('button#submit').click()
                
            }
        }
    }
    
    function renderTableSavingTransactionsFooter () {
        let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.debit), 0)
        let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.credit), 0)
        let servcharge = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.servicecharge), 0)
     
        document.querySelector('#dailytransactionstable tbody').innerHTML += `
            <tr id="tablefooter">
                <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="11"> total </td>
                <td style="text-transform: uppercase;font-weight:bold">${ formatMoney(servcharge) }</td>
                <td style="text-transform: uppercase;font-weight:bold"> ${formatMoney(credit)}</td>
                <td style="text-transform: uppercase;font-weight:bold">${formatMoney(debit)}</td>
            </tr>`
    }
    
    async function appendDailyTransactionsTableRows(item, index) {
         let loc = locationsvar?.find(value => value.id == (~~Math.abs(item.location)) )
        jtabledata.innerHTML += `
            <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${formatDate(item.transactiondate)}</td>
            <td>${formatDate(item.valuedate)}</td>
            <td>${item.accountnumber}</td>
            <td>${item.reference}</td>
            <td>${item.ttype}</td>
            <td>${item.description}</td>
            <td style="text-transform:lowercase">${ item.accountofficer == undefined ? '' :  (Number.isInteger(Math.abs(item.accountofficer)) ? '' :  item.accountofficer) }</td>
            <td style="text-transform:lowercase">${ item.approvedby == undefined ? '' : (Number.isInteger(Math.abs(item.approvedby)) ? '' :  item.approvedby) }</td>
            <td>${item.paymentmethod == undefined ? '' : item.paymentmethod}</td>
             <td>${loc !== undefined ?  loc.location : ''}</td>
            <td>${formatMoney(item.servicecharge)}</td>
            <td>${ item.credit == 0 ? '' : formatMoney(item.credit) }</td>
            <td>${ item.debit == 0 ? '' : formatMoney(item.debit) }</td>
        </tr>
        `
    }
    
    
    async function fetchDailyTransactionsLocations() {
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


}

var dailytransactionsbtn = document.getElementById('dailytransaction')
if(dailytransactionsbtn) dailytransactionsbtn.addEventListener('click', openDailyTransactions, false)


//  Resolve Excess & Returned Cash --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var form; datasource = []; var excessandreturns;

async function openresolveExcessAndReturns() {
    await httpRequest('resolveexcessandreturnedcash.php')
    
    form = document.getElementById('filterresolveexcessandreturnedcashform')
    if(document.querySelector('button#submit')) document.querySelector('button#submit').addEventListener('click', generateresolveExcessAndReturnsReport)
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(resolveExcessAndReturnssetCurrentPage)
    await fetchresolveExcessAndReturnsPageData()
}

async function fetchresolveExcessAndReturnsPageData() {
    await fetchresolveExcessAndReturnsLocations()
    await fetchresolveExcessAndReturnsGroupTargets()
    await fetchresolveExcessAndReturnsGroups()
}


async function generateresolveExcessAndReturnsReport(event) {
    showSpinner()
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchgroupdeposit.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        event.target.disabled = false;
        excessandreturns = datasource = res.data;
        if(excessandreturns.length) initPagination(res.data, resolveExcessAndReturnssetCurrentPage)
        else callModal('No records retrieved')
    }
    else {
        hideSpinner()
        if(jtabledata) jtabledata.innerHTML = '';
        event.target.disabled = false;
        callModal(res.message, 0)
    }
}


function openResolveModal(event, index) {
    let selecteditem = excessandreturns[index]
    if(selecteditem) {
        let modalcontent = `
                <h4 style="margin: 5px 10px 20px 10px;font-weight:bolder;text-transform:uppercase"></h4>
                <form class="jform no-pr" id="resolveexcessandreturnedcashform">
                    <div class="section-header" style="display:flex; gap:6px; align-items:center;"></div>
                    <div class="col-form-group" style="margin: 0 auto;width: 90%"> 
                        <div class="jformgroup form_row" > 
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Account Number: </label>
                                <input type="number" class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber">
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Transaction Date: </label>
                                <input type="date" class="jformcontrol jmargin-top" id="transactiondate" name="transactiondate">
                            </div>
                        </div>
                        <div class="jformgroup form_row" > 
                             <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Source: </label>
                                <select class="jformcontrol jmargin-top" id="source" name="source">
                                    <option value="Excess Cash">Excess Cash</option>
                                    <option value="Returned Cash">Returned Cash</option>
                                    <option value="Both">Returned Cash & Excess Cash</option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Amount: </label>
                                <input type="number" class="jformcontrol jmargin-top" id="amount" name="amount">
                            </div>
                        </div>
                        <div class="jformgroup form_row" >
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Description: </label>
                                <textarea class="jformcontrol jmargin-top" id="description" name="description"></textarea>
                            </div>
                        </div>
                        <div class="jflex" style="margin: 30px 0;">
                            <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" value="${selecteditem.id}" onclick="saveResolveExcessAndReturns(event)"> Save Changes </button>
                        </div>
                    </div>
                </form> 
               
                <div style="height: 30px;width:auto"></div>
                    `
                openJModal(modalcontent)
                document.querySelector('#resolveexcessandreturnedcashform #accountnumber').valueAsDate = selecteditem
                document.querySelector('#resolveexcessandreturnedcashform #transactiondate').valueAsDate = new Date()
    }           
    else return callModal('Item not available')
}


function saveResolveExcessAndReturns(event) {
    if(!validateresolveExcessAndReturnsForm()) return
    
    event.target.disabled = true;
    event.target.innerHTML = 'Saving...'
    showSpinner();
	var request = getAjaxObject();
    request.open('POST','../controllers/resolveexcess.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            event.target.disabled = false;
            event.target.innerHTML = 'Save Changes'
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Saved successfully', 1)
                    // excessandreturns = datasource = excessandreturns.filter(item => item.id !== event.target.value);
                    // if(excessandreturns.length) initPagination(excessandreturns, resolveExcessAndReturnssetCurrentPage)
                    closeJmodal()
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else {
            event.target.disabled = false;
            event.target.innerHTML = 'Save Changes'
            return hideSpinner();
        }
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }
    
    let paramstr = new FormData(document.getElementById('resolveexcessandreturnedcashform'))
    paramstr.append('id', event.target.value)
    
	request.setRequestHeader('Connection','close');
	request.send(paramstr);
}



function resolveExcessAndReturnssetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(excessandreturns.length) {
        excessandreturns.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendresolveExcessAndReturnsTableRows(item, index)
            }
        })
        if(document.querySelector('#resolveexcessandreturnedcashtable tbody').innerHTML === '') openMissedMaturity()
    }
}

async function appendresolveExcessAndReturnsTableRows(item, index) {
    let grouptarget = grouptargets?.find(val => val.id == item.target)
    let groupname = depositgrouplists?.find(val => val.id == item.groupid)
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ grouptarget?.target == undefined ? '' : grouptarget.target  }</td>
            <td>${ groupname?.groupname == undefined ? '' : groupname.groupname }</td>
            <td>${formatDate(item.transactiondate)}</td>
            <td style="text-transform: none">${ item.accountofficer}</td>
            <td>${ formatMoney(item.deposit) }</td>
            <td>${ formatMoney(item.excesscash) }</td>
            <td>${ formatMoney(item.returnedcash) }</td>
            <td>${ formatMoney(item.total)  }</td>
            <td>
                <div class="flex no-pr" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="openResolveModal(event, ${index})">Resolve</button>
                </div>
            </td>
        </tr>
    `
} 

async function fetchresolveExcessAndReturnsGroupTargets(event) {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupptarget.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        grouptargets = res.data;
    }
    else hideSpinner()
}

async function fetchresolveExcessAndReturnsGroups() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        hideSpinner()
        depositgrouplists = res.data?.data
    }
    else hideSpinner()
}

async function fetchresolveExcessAndReturnsLocations() {
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

function validateresolveExcessAndReturnsForm() {
    var flag = 1;
	var mssg='';
	let form = document.getElementById('resolveexcessandreturnedcashform')
	if(form.querySelector('#transactiondate').value.length < 1){
		mssg += 'Transaction date is Invalid <br />';			
		form.querySelector('#transactiondate').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#transactiondate').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#amount').value.length < 1){
		mssg += 'Amount withdrawn is Invalid <br />';			
		form.querySelector('#amount').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#amount').style.borderColor = 'lightgray';
	}
	
	
	if(form.querySelector('#source').value.length < 1){
		mssg += 'Source is Invalid <br />';			
		form.querySelector('#source').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#source').style.borderColor = 'lightgray';
	}
	
	if(form.querySelector('#accountnumber').value.length < 1){
		mssg += 'Account Number is Invalid <br />';			
		form.querySelector('#accountnumber').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#accountnumber').style.borderColor = 'lightgray';
	}
	
	
	if(form.querySelector('#description').value.length < 1){
		mssg += 'description is Invalid <br />';			
		form.querySelector('#description').style.borderColor = 'red';
		flag =0;
	}
	else{
		form.querySelector('#description').style.borderColor = 'lightgray';
	}
	
	
	if(flag == 0){
		
		var mbox = document.getElementById('messageBox');
		mbox.innerHTML = mssg;
		mbox.style.display = 'block';
		mbox.style.visibility = 'visible';

		setTimeout(function(){
			mbox.style.display = 'none';
			mbox.style.visibility = 'hidden';

			form.querySelector('#transactiondate').style.borderColor = 'lightgray';
			form.querySelector('#amount').style.borderColor = 'lightgray';
			form.querySelector('#source').style.borderColor = 'lightgray';
			form.querySelector('#description').style.borderColor = 'lightgray';
			form.querySelector('#accountnumber').style.borderColor = 'lightgray';
		

		}, 2000);	
		return false;
	}else{ 
		return true; 
	}
}

var excessandreturnsbtn = document.getElementById('resolveexcessandreturnedcash')
if(excessandreturnsbtn) excessandreturnsbtn.addEventListener('click', openresolveExcessAndReturns)


// Net Transaction --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function openNetTransaction () {
    await  httpRequest('nettransaction.php');

    form = document.getElementById('filternettransactionform')
    if(form) {
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generateNetTransactionTable)
        form.querySelector('button#print-nt').addEventListener('click', printNetTransactions)
        form.querySelector('button#export-nt').addEventListener('click', exportNetTransactions)

        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(netTransactionSetCurrentPage)
        
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        if(form.querySelector('#month')) {
            let options =  months.map((month, index) => {
                index++
                if(index.toString().length < 2) (index = '0'+index)

                return  `<option value="${index}">${month}</option>`
                
            }).join('')
            form.querySelector('#month').innerHTML = options
        }
        
        if(form.querySelector('#year')) {
            let options = ''
            for(let i=2020; i <= new Date().getFullYear()+1; i++) {
                options += `<option value="${i}">${i}</option>`
            }
            form.querySelector('#year').innerHTML = options
        }
        
        await fetchNetTransactionTableData()
    }
}

async function fetchNetTransactionTableData() {
    await fetchNetTransactionLocations()
}
    
function printNetTransactions() {
    if(nettransactions.length) printContent('Net Transactions', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportNetTransactions() {
    if(nettransactions.length) tableToExcel('nettransactiontable', 'net_transactions')
}

async function generateNetTransactionTable() {
    showSpinner();
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/netreport.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) {
            document.querySelector('#nettransactiontable tbody').innerHTML === ''
            nettransactions = res.data;
            if(nettransactions.length) {
                var locationresult = []
                if(paramstr.get('location') == '0') {
                    for(let i=0; i<nettransactions.length; i++) {
                        locationresult = [...locationresult, ...nettransactions[i].detailforalllocations]
                    }
                }
                else {
                    locationresult = nettransactions
                }
                nettransactions = datasource = locationresult
                initPagination(locationresult, netTransactionSetCurrentPage)
            }
        }
        else {
           hideSpinner()
           callModal('No records retrieved')
        }
    }
    else hideSpinner()
}


async function netTransactionSetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(nettransactions.length) {
        
        if(document.querySelector('#reportlocation')) {
            if(form.location.value !== '0') {
                document.querySelector('#reportlocation').style.display = 'block'
            }
            else {
                document.querySelector('#reportlocation').style.display = 'none'
            }
        }
        
        nettransactions.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendNetTransactionTableRows(item, index)
            }
        })
        
        await renderTableNetTransactionFooter();
        // await renderTableNetTransactionFooter()
        // if (pageCount === currentPage) renderTableNetTransactionFooter()
        // else {
        //     try {
        //         document.querySelector('#nettransactiontable #tablefooter')?.remove()
        //     }
        //     catch(e) {console.log(e)}
        // }
        
        if(document.querySelector('#nettransactiontable tbody').innerHTML === '') nettransactionbtn.click()
    }
}

async function renderTableNetTransactionFooter() {

    let bankpayments = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.bankpayments), 0)
    let cashfrombank = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.cashfrombank), 0)
    let cashfrombranch = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.cashfrombranch), 0)
    let cashfromproperty = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.cashfromproperty), 0)
    let cashpayments = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.cashpayments), 0)
    let cashtobank = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.cashtobank), 0)
    let dailydeposit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.dailydeposit), 0)
    let dailyexpenses = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.dailyexpenses), 0)
    let dailyrrr = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.dailyrrr), 0)
    let loanrepayments = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.loanrepayments), 0)
    let nia = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.nia), 0)
    let returnedcash = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.returnedcash), 0)
    let totalcredit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.totalcredit), 0)
    let totaldebit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.totaldebit), 0)
    let servicecharge = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.servicecharge), 0)
    let bankcharge = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.bankcharge), 0)
    let balance = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.balance), 0)
    let paybankwith100 = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.paybankwith100), 0) 
    let cashwithdrawals = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.cashwithdrawals), 0)
    let bankwithdrawals = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.bankwithdrawals), 0)
    let depositsbybank = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.depositsbybank), 0)

    document.querySelector('#jtabledatafoot').innerHTML = `
        <tr id="tablefooter">
            <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="${form.location.value !== '0' ? 4 : 4}"> total </td>
            <td style="text-align:left;font-weight:bold;"></td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(dailydeposit)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(dailyrrr)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(servicecharge)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(paybankwith100)}</td>
            <td style="display: none;text-align:left;font-weight:bold;">${formatMoney(bankcharge)}</td>
            <td style="display: none;text-align:left;font-weight:bold;">${formatMoney(cashfrombank)}</td>
            <td style="display: none;text-align:left;font-weight:bold;">${formatMoney(cashfrombranch)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(loanrepayments)}</td>  
            <td style="text-align:left;font-weight:bold;">${formatMoney(cashfromproperty)}</td>
            <td style="text-align:left;font-weight:bold;border-right-color: black"></td>
            
            <td style="text-align:left;font-weight:bold;">${formatMoney(dailyexpenses)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(cashwithdrawals)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(bankwithdrawals)}</td> 
            <td style="display: none;text-align:left;font-weight:bold;">${formatMoney(dailydeposit)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(depositsbybank)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(cashtobank)}</td>
            <td style="display: none;text-align:left;font-weight:bold;">${formatMoney(nia)}</td>
            <td style="display: none;text-align:left;font-weight:bold;">${formatMoney(returnedcash)}</td>
            <td style="text-align:left;font-weight:bold;"></td>
            <td style="text-align:left;font-weight:bold;"></td>
        </tr>
    `
    //  <td style="text-align:left;font-weight:bold;">${formatMoney(totalcredit - totaldebit)}</td>
}

async function appendNetTransactionTableRows(item, index) {
   
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${formatDate(item.date) }</td>
            <td style="display: ${form.location.value !== '0' ? 'block' : 'none' }">${item.location.toUpperCase()}</td>
            <td style="text-align:left">${formatMoney(item.previousbalance)}</td>
            <td style="text-align:left">${formatMoney(item.dailydeposit)}</td>
            <td style="text-align:left">${formatMoney(item.dailyrrr)}</td>
            <td style="text-align:left">${formatMoney(item.servicecharge)}</td>
            <td style="text-align:left">${formatMoney(item.paybankwith100)}</td>
            <td style="display: none;text-align:left">${formatMoney(item.bankcharge)}</td>
            <td style="display: none;text-align:left">${formatMoney(item.cashfrombank)}</td>
            <td style="display: none;text-align:left">${formatMoney(item.cashfrombranch)}</td>
            <td style="text-align:left">${formatMoney(item.loanrepayments)}</td>
            <td style="text-align:left">${formatMoney(item.cashfromproperty)}</td>
            <td style="text-align:left;border-right: 3px solid black">${formatMoney(item.totalcredit)}</td>
            
            <td style="text-align:left">${formatMoney(item.dailyexpenses)}</td>
            <td style="text-align:left">${formatMoney(item.cashwithdrawals)}</td>
            <td style="text-align:left">${formatMoney(item.bankwithdrawals)}</td>
            <td style="display: none;text-align:left">${formatMoney(item.dailydeposit)}</td>
            <td style="text-align:left">${formatMoney(item.depositsbybank)}</td>
            <td style="text-align:left">${formatMoney(item.cashtobank)}</td>
            <td style="display: none;text-align:left">${formatMoney(item.nia)}</td>
            <td style="display: none;text-align:left">${formatMoney(item.returnedcash)}</td>
            <td style="text-align:left">${formatMoney(item.totaldebit)}</td>
            <td style="text-align:left">${formatMoney(item.balance)}</td>
        </tr>
    `
    // <td style="text-align:left">${formatMoney(+item.totalcredit - (+item.totaldebit))}</td>
}


async function fetchNetTransactionLocations() {
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        expenditurelocations = res.data?.data;
        let options = '';
        expenditurelocations?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.location} </option>
            `
        })
        if(form.querySelector('#location')){
            form.querySelector('#location').innerHTML = ''
            form.querySelector('#location').innerHTML = options
            form.querySelector('#location').value = assetsUrl.sessionLocation
        }
    }
}

var nettransactionbtn = document.getElementById('nettransaction')
if(nettransactionbtn) nettransactionbtn.addEventListener('click', openNetTransaction, false)

async function opennetreportupdated() {
    await httpRequest('netreportupdated.php');

    form = document.getElementById('filternetreportupdatedform')
    if(form) {
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click',generatenetreportupdatedTable)
        form.querySelector('button#print-nt').addEventListener('click', printnetreportupdateds)
        form.querySelector('button#export-nt').addEventListener('click', exportnetreportupdateds)
        form.querySelector('button#dump-nt').addEventListener('click', exportdumps)

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        if(form.querySelector('#month')) {
            let options =  months.map((month, index) => {
                index++
                if(index.toString().length < 2) (index = '0'+index)
                return  `<option value="${index}">${month}</option>`
            }).join('')
            form.querySelector('#month').innerHTML = options
        }
        
        if(form.querySelector('#year')) {
            let options = ''
            for(let i=2020; i <= new Date().getFullYear()+1; i++) {
                options += `<option value="${i}">${i}</option>`
            }
            form.querySelector('#year').innerHTML = options
        }
        
        await fetchnetreportupdatedLocations()
    }
}

function exportdumps() {
  // Get the form data
  const form = new FormData(document.getElementById('filternetreportupdatedform'));
  
  // Convert form data to query parameters
  const params = new URLSearchParams(form).toString();

  // Build the final URL with query parameters
  const url = `https://htg.com.ng/howtogrow/api/netreportgriddump?${params}`;

  // Create an anchor tag dynamically
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank'; // Opens in new tab
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}




let dayinpoint = 0;
let recbalance = 0;
let allNetReportData = []; // To store all accumulated data

async function generatenetreportupdatedTable() {
    showSpinner();
    allNetReportData = []; // Reset the data when generating new report
    
    // Reset dayinpoint and recbalance for new report
    dayinpoint = 0;
    recbalance = 0;
    
    let hasMoreData = true;
    
    while(hasMoreData) {
        let paramstr = new FormData(form)
        paramstr.append('dayinpoint', dayinpoint)
        paramstr.append('recbalance', recbalance)
        
        let result = await fetch('../controllers/netreportupdated.php', {
            method: 'POST', 
            body: paramstr, 
            headers: new Headers()
        });
        
        let res = await result.json();
        
        if(res.status) {
            // Accumulate the data
            allNetReportData = [...allNetReportData, ...res.data];
            
            // Update dayinpoint and recbalance for next call
            dayinpoint = res.dayinpoint;
            recbalance = res.recbalance;
        } else {
            if(res.code === 204) { // End of report
                hasMoreData = false;
            } else {
                hideSpinner();
                callModal(res.message || 'Error fetching data');
                return;
            }
        }
    }
    
    hideSpinner();
    
    if(allNetReportData.length) {
        // Filter by location if needed
        let locationresult = [];
        if(form.querySelector('#location').value == '0') {
            for(let i=0; i<allNetReportData.length; i++) {
                locationresult = [...locationresult, ...allNetReportData[i].detailforalllocations || []];
            }
        } else {
            locationresult = allNetReportData;
        }
        
        renderNetReportTable(locationresult);
    } else {
        callModal('No records retrieved');
    }
}

function renderNetReportTable(data) {
    const tableBody = document.querySelector('#netreportupdatedtable tbody');
    tableBody.innerHTML = '';
    
    // Show/hide location column based on filter
    const locationColumn = document.querySelector('#netreportupdatedtable th:nth-child(3)');
    const locationCells = document.querySelectorAll('#netreportupdatedtable td:nth-child(3)');
    const showLocation = form.querySelector('#location').value !== '0';
    
    locationColumn.style.display = showLocation ? 'table-cell' : 'none';
    locationCells.forEach(cell => cell.style.display = showLocation ? 'table-cell' : 'none');
    
    // Add rows to table
    data.forEach((item, index) => {
        tableBody.innerHTML += `
            <tr class="source-row-item">
                <td>${index + 1}</td>
                <td>${formatDate(item.date)}</td>
                <td style="display: ${showLocation ? 'table-cell' : 'none'}">${item.location?.toUpperCase() || ''}</td>
                <td style="text-align:left">${formatMoney(item.previousbalance)}</td>
                <td style="text-align:left">${formatMoney(item.dailydeposit)}</td>
                <td style="text-align:left">${formatMoney(item.dailyrrr)}</td>
                <td style="text-align:left">${formatMoney(item.servicecharge)}</td>
                <td style="text-align:left">${formatMoney(item.paybankwith100)}</td>
                <td style="display: none;text-align:left">${formatMoney(item.bankcharge)}</td>
                <td style="display: none;text-align:left">${formatMoney(item.cashfrombank)}</td>
                <td style="display: none;text-align:left">${formatMoney(item.cashfrombranch)}</td>
                <td style="text-align:left">${formatMoney(item.loanrepayments)}</td>
                <td style="text-align:left">${formatMoney(item.cashfromproperty)}</td>
                <td style="text-align:left;border-right: 3px solid black">${formatMoney(item.totalcredit)}</td>
                
                <td style="text-align:left">${formatMoney(item.dailyexpenses)}</td>
                <td style="text-align:left">${formatMoney(item.cashwithdrawals)}</td>
                <td style="text-align:left">${formatMoney(item.bankwithdrawals)}</td>
                <td style="display: none;text-align:left">${formatMoney(item.dailydeposit)}</td>
                <td style="text-align:left">${formatMoney(item.depositsbybank)}</td>
                <td style="text-align:left">${formatMoney(item.cashtobank)}</td>
                <td style="display: none;text-align:left">${formatMoney(item.nia)}</td>
                <td style="display: none;text-align:left">${formatMoney(item.returnedcash)}</td>
                <td style="text-align:left">${formatMoney(item.totaldebit)}</td>
                <td style="text-align:left">${formatMoney(item.balance)}</td>
            </tr>
        `;
    });
    
    // Add footer with totals
    renderTableFooter(data);
}

function renderTableFooter(data) {
    let bankpayments = data.reduce((prev, curr) => prev + parseFloat(+curr.bankpayments || 0), 0);
    let cashfrombank = data.reduce((prev, curr) => prev + parseFloat(+curr.cashfrombank || 0), 0);
    let cashfrombranch = data.reduce((prev, curr) => prev + parseFloat(+curr.cashfrombranch || 0), 0);
    let cashfromproperty = data.reduce((prev, curr) => prev + parseFloat(+curr.cashfromproperty || 0), 0);
    let cashpayments = data.reduce((prev, curr) => prev + parseFloat(+curr.cashpayments || 0), 0);
    let cashtobank = data.reduce((prev, curr) => prev + parseFloat(+curr.cashtobank || 0), 0);
    let dailydeposit = data.reduce((prev, curr) => prev + parseFloat(+curr.dailydeposit || 0), 0);
    let dailyexpenses = data.reduce((prev, curr) => prev + parseFloat(+curr.dailyexpenses || 0), 0);
    let dailyrrr = data.reduce((prev, curr) => prev + parseFloat(+curr.dailyrrr || 0), 0);
    let loanrepayments = data.reduce((prev, curr) => prev + parseFloat(+curr.loanrepayments || 0), 0);
    let nia = data.reduce((prev, curr) => prev + parseFloat(+curr.nia || 0), 0);
    let returnedcash = data.reduce((prev, curr) => prev + parseFloat(+curr.returnedcash || 0), 0);
    let totalcredit = data.reduce((prev, curr) => prev + parseFloat(+curr.totalcredit || 0), 0);
    let totaldebit = data.reduce((prev, curr) => prev + parseFloat(+curr.totaldebit || 0), 0);
    let servicecharge = data.reduce((prev, curr) => prev + parseFloat(+curr.servicecharge || 0), 0);
    let bankcharge = data.reduce((prev, curr) => prev + parseFloat(+curr.bankcharge || 0), 0);
    let balance = data.reduce((prev, curr) => prev + parseFloat(+curr.balance || 0), 0);
    let paybankwith100 = data.reduce((prev, curr) => prev + parseFloat(+curr.paybankwith100 || 0), 0);
    let cashwithdrawals = data.reduce((prev, curr) => prev + parseFloat(+curr.cashwithdrawals || 0), 0);
    let bankwithdrawals = data.reduce((prev, curr) => prev + parseFloat(+curr.bankwithdrawals || 0), 0);
    let depositsbybank = data.reduce((prev, curr) => prev + parseFloat(+curr.depositsbybank || 0), 0);

    document.querySelector('#jtabledatafoot').innerHTML = `
        <tr id="tablefooter">
            <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="4"> TOTAL </td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(dailydeposit)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(dailyrrr)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(servicecharge)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(paybankwith100)}</td>
            <td style="display: none;text-align:left;font-weight:bold;">${formatMoney(bankcharge)}</td>
            <td style="display: none;text-align:left;font-weight:bold;">${formatMoney(cashfrombank)}</td>
            <td style="display: none;text-align:left;font-weight:bold;">${formatMoney(cashfrombranch)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(loanrepayments)}</td>  
            <td style="text-align:left;font-weight:bold;">${formatMoney(cashfromproperty)}</td>
            <td style="text-align:left;font-weight:bold;border-right-color: black">${formatMoney(totalcredit)}</td>
            
            <td style="text-align:left;font-weight:bold;">${formatMoney(dailyexpenses)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(cashwithdrawals)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(bankwithdrawals)}</td> 
            <td style="display: none;text-align:left;font-weight:bold;">${formatMoney(dailydeposit)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(depositsbybank)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(cashtobank)}</td>
            <td style="display: none;text-align:left;font-weight:bold;">${formatMoney(nia)}</td>
            <td style="display: none;text-align:left;font-weight:bold;">${formatMoney(returnedcash)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(totaldebit)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(balance)}</td>
        </tr>
    `;
}

function printnetreportupdateds() {
    if(allNetReportData.length) printContent('Net Transactions', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent');
}

function exportnetreportupdateds() {
    if(allNetReportData.length) tableToExcel('netreportupdatedtable', 'net_transactions');
}

async function fetchnetreportupdatedLocations() {
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()});
    let res = await result.json();
    if(res?.status) {
        let options = '<option value="0">All Locations</option>';
        res.data?.data?.forEach(item => {
            options += `<option value="${item.id}">${item.location}</option>`;
        });
        
        if(form.querySelector('#location')){
            form.querySelector('#location').innerHTML = options;
            form.querySelector('#location').value = assetsUrl.sessionLocation || '0';
        }
    }
}

var netreportupdatedbtn = document.getElementById('netreportupdated');
if(netreportupdatedbtn) netreportupdatedbtn.addEventListener('click', opennetreportupdated, false);

// Group System Cash Position --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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

// Excess Cash Report --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
            <td>${formatDate(item.transactiondate)}</td>
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


// rrr Cash Report --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
            <td>${formatDate(item.transactiondate)}</td>
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
        if(document.querySelector('#location')){
            document.querySelector('#location').innerHTML = ''
            document.querySelector('#location').innerHTML = '<option value="">--Select Location --</option>'+options
        }
    }else  hideSpinner()
}

var returnedcashreportbtn = document.getElementById('returnedcashreport')
if(returnedcashreportbtn) returnedcashreportbtn.addEventListener('click', openReturnedCashReport)

// Customer Balances --------------------------------------------------------------------------------------------------------------------------------------
let customerBalancesLocations = [];

async function openCustomerBalances() {
    await httpRequest('customerbalances.php');
    form = document.getElementById('customerbalancesform');

    if (form) {
        setCustomerBalancesDefaults();
        await fetchCustomerBalancesLocations();

        const submitBtn = form.querySelector('button#submit');
        if (submitBtn) submitBtn.addEventListener('click', submitCustomerBalances);
    }
}

function setCustomerBalancesDefaults() {
    const now = new Date();
    const yearInput = document.getElementById('year');
    const monthSelect = document.getElementById('month');

    if (yearInput && !yearInput.value) yearInput.value = now.getFullYear();
    if (monthSelect && !monthSelect.value) monthSelect.value = now.getMonth() + 1;
}

async function fetchCustomerBalancesLocations() {
    showSpinner();
    try {
        const result = await fetch('../controllers/fetchlocation.php', { method: 'POST', body: {}, headers: new Headers() });
        const res = await result.json();
        if (res?.status) {
            customerBalancesLocations = res.data?.data || [];
            const select = document.querySelector('#location');
            if (select) {
                let options = '<option value=\"\">--Select Location --</option>';
                customerBalancesLocations.forEach(item => {
                    options += `<option value=\"${item.id}\"> ${item.location} </option>`;
                });
                select.innerHTML = options;

                const sessionLocation = document.getElementById('sessionlocation')?.value;
                if (sessionLocation) select.value = sessionLocation;
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        hideSpinner();
    }
}

function submitCustomerBalances(event) {
    event.preventDefault();
    const submitBtn = event.target;
    submitBtn.disabled = true;

    const params = new URLSearchParams();
    const locationVal = form.querySelector('#location')?.value;
    const yearVal = form.querySelector('#year')?.value;
    const monthVal = form.querySelector('#month')?.value;

    if (locationVal) params.append('location', locationVal);
    if (yearVal) params.append('year', yearVal);
    if (monthVal) params.append('month', monthVal);

    const url = `https://htg.com.ng/howtogrow/api/customerbalancesdump${params.toString() ? '?' + params.toString() : ''}`;
    window.open(url, '_blank');

    submitBtn.disabled = false;
}

const customerbalancesbtn = document.getElementById('customerbalances');
if (customerbalancesbtn) customerbalancesbtn.addEventListener('click', openCustomerBalances, false);

// Transfer Cash to Bank --------------------------------------------------------------------------------------------------------------------------------------
async function opentransfercashtobank(){
    await httpRequest('transfercashtobank.php')
    let editid = '';
    
    if(sessionStorage.getItem('transfercashtobank')){
        editid = sessionStorage.getItem('transfercashtobank'); 
        document.getElementById('amount').value = editid.split('_');
        document.getElementById('description').value = '';
        document.getElementById('transactiondate').value = '';
        sessionStorage.removeItem('transfercashtobank');
    } 
    
    function returnaction(res){
        document.getElementById('amount').value = '';
        document.getElementById('description').value = '';
        // document.getElementById('transactiondate').value = '';
    }
    
    function param(){
        let pa = new FormData(document.getElementById('transfercashtobankform'))
        if(editid)pa.append('id', editid.split('_')[0])
        return pa
    }
    document.getElementById('submit').addEventListener('click', e=>callController('cashtobank.php', param(), 'cashtobank', ['amount', 'transactiondate'], returnaction))
}

var transfercashtobankbtn = document.getElementById('transfercashtobank')
if(transfercashtobankbtn) transfercashtobankbtn.addEventListener('click', opentransfercashtobank) 

// View Transfer Cash to Bank --------------------------------------------------------------------------------------------------------------------------------------
let viewtransfercashtobank_datasource
async function openviewtransfercashtobank () {
    await httpRequest('viewtransfercashtobank.php', 'override');
    
    fetchReturnedCashReportLocations()
    
    initializePaginationParams()
    
    function param(){
        let pa = new FormData(document.getElementById('filterviewtransfercashtobankform'));
        return pa;
    }
    
    if(document.getElementById('submit'))document.getElementById('submit').addEventListener('click', e=>callController('fetchcashtobank.php', param(), 'fetchcashtobank', null, viewtransfercashtobanktabler))
    
      if(document.getElementById('export-wl'))document.getElementById('export-wl').addEventListener('click',e=>{
            tableToExcel('viewtransfercashtobanktable', 'RRR Transaction Report')},false);
        if(document.getElementById('print-wl'))document.getElementById('print-wl').addEventListener('click',e=>{
            printContent('RRR Transaction Report',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewtransfercashtobanktable')},false);

}

const viewtransfercashtobanktabler=(result)=>{
    viewtransfercashtobank_datasource = [];
    viewtransfercashtobank_datasource = result.data;
    initPagination(viewtransfercashtobank_datasource, viewtransfercashtobankorehistorysetCurrentPage);
    }
    
    var viewtransfercashtobankorehistorysetCurrentPage = (pageNum) => {
document.getElementById("jtabledata").innerHTML = ''
    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewtransfercashtobank_datasource.length) {
        viewtransfercashtobank_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewtransfercashtobankdatasourceorehistoryTableRows(item, index)
            }
        });
        document.getElementById("jtabledata").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td> TOTAL: </td>
                                <td> ${formatMoney(viewtransfercashtobank_datasource.reduce((sum, dat)=>sum+Number(dat.amount),0))} </td>
                                <td></td>
                            </tr>`
    }
    else {
        document.getElementById("jtabledata").innerHTML =  renderNoTableData()
    }
};

function appendviewtransfercashtobankdatasourceorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("jtabledata").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${formatDate(dat.transactiondate.split(' ')[0]??'')} </td>
                                <td> ${dat.username??''} </td>
                                <td> ${dat.accountname??''} </td>
                                <td> ${dat.accountnumber??''} </td>
                                <td> ${dat.bank??''} </td>
                                <td> ${dat.reference??''} </td>
                                <td> ${dat.description??''} </td>
                                <td> ${formatMoney(dat.amount??'')} </td>
                                <td>
                                    <div class="flex no-pr" style="align-items:center">
                                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="transfertobankedit('${dat.id}', '${dat.amount}', '${dat.transactiondate}', '${dat.description}'')">Edit</button>
                                    </div>
                                </td>
                            </tr>`
} 

function transfertobankedit(id, amount, date, desc){
    if(!id)return callModal('id not provided')
    sessionStorage.setItem('transfercashtobank', `${id}_${amount}_${date}_${desc}`)
    document.getElementById('transfercashtobank').click();
    
}



var viewtransfercashtobank = document.getElementById('viewtransfercashtobank')
if(viewtransfercashtobank) viewtransfercashtobank.addEventListener('click', openviewtransfercashtobank, false)

// View Credit (Charges) Entries--------------------------------------------------------------------------------------------------------------------------------------------------------------
let viewcreditentries_datasource
async function openviewcreditentries () {
    await httpRequest('viewcreditentries.php', 'override');
    // initializePaginationParams(propertystatementOfAccountsetCurrentPage)
    initializePaginationParams(viewcreditentriesorehistorysetCurrentPage)
    
    const viewcreditentriesname =(result)=>{
    // if(document.getElementById('collectionviewsmarketer'))document.getElementById('collectionviewsmarketer').innerHTML = `<option selected value=""></option>`;
    if(document.getElementById('viewcreditentriesname'))document.getElementById('viewcreditentriesname').value = ''
    if(document.getElementById('viewcreditentriesname'))document.getElementById('viewcreditentriesname').innerHTML += result.data.map(dat=>{
        return(`<option value="${dat.lastname} ${dat.firstname} | ${dat.email}">`)
    }).join('')
}
    
   getUsers(viewcreditentriesname)
    
    
    if(document.getElementById('rrrlocation'))document.getElementById('rrrlocation').innerHTML = `<option value="">--SELECT LOCATION--</option>`
    if(document.getElementById('rrrlocation'))document.getElementById('rrrlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    function param(){
        let pa = new FormData(document.getElementById('filterviewcreditentriesform'));
        if(document.getElementById('accountofficer').value)pa.set('accountofficer', document.getElementById('accountofficer').value.split(' | ')[1])
        return pa
    }
    if(document.getElementById('submit'))document.getElementById('submit').addEventListener('click', e=>callController('fetchcreditchargeincome.php', param(), 'fetchcreditchargeincome', null, viewcreditentriestabler))
    
      if(document.getElementById('export-wl'))document.getElementById('export-wl').addEventListener('click',e=>{
            tableToExcel('viewcreditentriestable', 'View Credit (Charges) Entries')},false);
        if(document.getElementById('print-wl'))document.getElementById('print-wl').addEventListener('click',e=>{
            printContent('View Credit (Charges) Entries',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewcreditentriestable')},false);

}

const viewcreditentriestabler=(result)=>{
    viewcreditentries_datasource = [];
    viewcreditentries_datasource = result.data;
    initPagination(viewcreditentries_datasource, viewcreditentriesorehistorysetCurrentPage);
    }
    
    var viewcreditentriesorehistorysetCurrentPage = (pageNum) => {
      if(jtabledata) jtabledata.innerHTML = `No Data`

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewcreditentries_datasource.length) {
        document.getElementById('totcredit').innerHTML = formatCurrency(viewcreditentries_datasource.reduce((sum, dat)=>sum+Number(dat.credit), 0))
        viewcreditentries_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewcreditentriesdatasourceorehistoryTableRows(item, index)
            }
        })
    document.getElementById("jtabledata").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> ${formatCurrency(viewcreditentries_datasource.reduce((sum, dat)=>sum+Number(dat.credit), 0))} </td>
                            </tr>`
    }
    else { 
        document.getElementById("jtabledata").innerHTML=  renderNoTableData()
    }
};

function appendviewcreditentriesdatasourceorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("jtabledata").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${formatDate(dat.tdate.split(' ')[0])} </td>
                                <td> ${dat.accountnumber??''} </td>
                                <td> ${dat.accountname??''} </td>
                                <td> ${dat.reference??''} </td>
                                <td> ${formatCurrency(dat.credit)} </td>
                            </tr>`
} 



var viewcreditentries = document.getElementById('viewcreditentries')
if(viewcreditentries) viewcreditentries.addEventListener('click', openviewcreditentries, false)
