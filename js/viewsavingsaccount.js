var form; var viewsavingspropertyusers;var savings;
async function openViewSavingsAccount () {
    await httpRequest('viewsavingsaccount.php')
    form = document.getElementById('filtersavingsaccountform')
    if(form.querySelector('button')) form.querySelector('button').addEventListener('click', generateSavingsReport)
    await fetchViewSavingsFormData()
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(savingsAccountsetCurrentPage)
}

async function generateSavingsReport(event) {
    event.target.disabled = true;
    let paramstr = new FormData(form)
    let result = await fetch('../controllers/fetchsavingsaccounts.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        event.target.disabled = false;
        savings = datasource = res.data;
        savings.length && initPagination(res.data, savingsAccountsetCurrentPage)
    }
    else event.target.disabled = false;
}

var savingsAccountsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(savings.length) {
        savings.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendSavingsAccountTableRows(item, index)
            }
        })
        if(document.querySelector('#approveloanstable tbody').innerHTML === '') viewsavingsaccountbtn.click()
    }
}

async function appendSavingsAccountTableRows(item, index) {
    let customerinfo = await propertycustomers.find(value => value.id === item.customer)
    let reg = await regpoints.find(value => value.id == item.registrationpoint)
    let user = await viewsavingspropertyusers.find(value => value.id == item.accountofficer)
    let loc = await propertylocations.find(value => value.id === item.location)
    
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${customerinfo?.firstname + ' ' + customerinfo?.lastname + ' ' + (customerinfo?.othernames == '-' ? '' : customerinfo?.othernames)}</td>
            <td>${ item.accountnumber } </td>
            <td>${loc !== undefined ?  loc.location : ''}</td>
            <td>${ new Date(item.registrationdate).toLocaleDateString() }</td>
            <td>${reg !== undefined ? reg.registrationpoint : ''}</td>
            <td>${ item.dailyunit }</td>
            <td style="text-transform:none">${ item.accountofficer !== undefined ? item.accountofficer : (user !== undefined ?  user.email : '') }</td> 
            <td>
                <div class="flex" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="viewSavingsAccount(${index}, 'view')">View</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px" onclick="viewSavingsAccount(${index}, 'update')">Edit</button>
                </div>
            </td>
        </tr>
    `
} 


function viewSavingsAccount(propertyindex, mode) {
    sessionStorage.setItem('savingsaccount', JSON.stringify({
            account: datasource[propertyindex],
            mode 
    }))
    if(document.getElementById("savingsaccount")) document.getElementById("savingsaccount").click()
}

async function fetchViewSavingsFormData() {
    await fetchsavingsaccountPropertyUsers()
    await fetchViewSavingsGroupName()
    await fetchViewSavingsCustomerAccounts()
    await fetchViewSavingsRegistrationPoints()
    await fetchSavingsLocations()
    
}

async function fetchsavingsaccountPropertyUsers () {
    showSpinner()
    let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json()
    if(res?.status){
        hideSpinner()
        viewsavingspropertyusers = res.data;
    } else hideSpinner()
    
}
async function fetchViewSavingsGroupName() {
    showSpinner()
    let result = await fetch('../controllers/fetchgroupname.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data =  groupnames = res.data?.data;
        let options = '';
        data.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.groupname} </option>
            `
        })
        if(form.querySelector('#marketergroup')) {
            form.querySelector('#marketergroup').innerHTML = '';
            form.querySelector('#marketergroup').innerHTML = '<option value="" selected="">--Select Group --</option>'+options
        }
        
    }
    else hideSpinner()
}
async function fetchViewSavingsCustomerAccounts() {
    showSpinner()
    let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data = propertycustomers = res.data?.data;
        let options = '';
        data.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.firstname + ' ' + item.lastname + ' ' + (item.othernames == '' ? '': item.othernames)} </option>
            `
        })
        if(form.querySelector('#customer')) {
            form.querySelector('#customer').innerHTML = '';
            form.querySelector('#customer').innerHTML = '<option value="" selected="">--Select Customer --</option>'+options
        }
        
    } else hideSpinner()
}
async function fetchViewSavingsRegistrationPoints() {
    showSpinner()
    let result = await fetch('../controllers/fetchregistrationpoints.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data = regpoints = res.data?.data;
        locationsvar = data;
        let options = '';
        data?.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.registrationpoint} </option>
            `
        })
        if(form.querySelector('#registrationpoint')){
            form.querySelector('#registrationpoint').innerHTML = ''
            form.querySelector('#registrationpoint').innerHTML = '<option value="" selected="">--Select registration point --</option>'+options
        }
    }else  hideSpinner()
}
async function fetchSavingsLocations() {
    showSpinner()
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) { 
        hideSpinner()
        propertylocations = res.data?.data;
    }
    else hideSpinner()
}

var viewsavingsaccountbtn = document.getElementById('viewsavingsaccount')
if(viewsavingsaccountbtn) viewsavingsaccountbtn.addEventListener('click', openViewSavingsAccount)