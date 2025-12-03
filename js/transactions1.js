// transaction interfaces by oreva

// property statement of account ------------------------------------------------------------------------------------------------------------------
async function openpropertyStatementOfAccount () {
    
    await  httpRequest('propertystatementofaccount.php')
    form = document.getElementById('filterpropertystatementofaccountform')
    fetchSavingsAccountUsers('accountofficerlist')
    form.querySelector('#startdate').valueAsDate = new Date()
    form.querySelector('#enddate').valueAsDate = new Date()
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', generateStateOfAccount)
    document.querySelector('button#print-soa').addEventListener('click', printpropertyStatementOfAccount)
    document.querySelector('button#export-soa').addEventListener('click', exportpropertyStatementOfAccount)

    let paginationLimit = 20;
    datasource = []
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(propertystatementOfAccountsetCurrentPage)
    
    let paginationLimitInput = document.getElementById('pagination-limit')
    if(paginationLimitInput) paginationLimitInput.addEventListener('change', e => setNewPaginationContext(e.target))
    
    await fetchpropertyStatementOfAccountPageData()
    
    async function setNewPaginationContext(e) {
        if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
        paginationLimit = +e.value;
        pageCount = Math.ceil(datasource.length / paginationLimit);
        await propertystatementOfAccountsetCurrentPage(1);
        paginationNumbers.innerHTML = '';
        await getPaginationNumbers();
        await handleActivePageNumber();
        addPaginationButtonEventListeners()
        calPaginationStatus()
    }
    
    function addPaginationButtonEventListeners() {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));         
            if (pageIndex)  button.addEventListener("click", () => {propertystatementOfAccountsetCurrentPage(pageIndex); calPaginationStatus()});
        });
    }
    
    function printpropertyStatementOfAccount() {
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

    function exportpropertyStatementOfAccount() {
    if(accountstatements.length) tableToExcel('propertystatementofaccounttable', 'statemnent_of_account')
}

    async function generateStateOfAccount(event) {
    event.target.disabled = true;
    let paramstr = new FormData(form)
        if(form.accountnumber.value.length < 1) {
        form.accountnumber.style.borderColor = 'red';
        return
    }
    
    form.accountnumber.style.borderColor = '';
    let result = await fetch('../controllers/statementofaccountproperty.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res.status) {
        event.target.disabled = false;
        accountstatements = datasource = res.data;
        document.querySelector('#propertystatementofaccounttable tbody').innerHTML === ''
        
        if(datasource.length && form.querySelector('#accountnumber').value !== '') {
            try {
                alert()
              
                document.getElementById('accountinfo').style.display = 'flex'
                document.getElementById('accountofficer').innerHTML = datasource[0]?.accountofficer
                document.getElementById('marketergroup').innerHTML = datasource[0]?.marketergroup
                document.getElementById('accountnoo').innerHTML = datasource[0]?.propertyaccount.accountnumber
                document.getElementById('accountnamee').innerHTML = getSelectedOptionLabel('account')
                const debit = datasource.map((item, index) => datasource.slice(0, index + 1).reduce((acc, curr) => acc + Number(curr.propertyaccount.debit), 0));
                const credit = datasource.map((item, index) => datasource.slice(0, index + 1).reduce((acc, curr) => acc + Number(curr.propertyaccount.credit), 0));

                document.getElementById('accbal').innerHTML = formatCurrency(Number(credit.reduce((acc, curr) => acc + curr, 0))-Number(debit.reduce((acc, curr) => acc + curr, 0)))
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
                const debit = datasource.map((item, index) => datasource.slice(0, index + 1).reduce((acc, curr) => acc + Number(curr.propertyaccount.debit), 0));
                const credit = datasource.map((item, index) => datasource.slice(0, index + 1).reduce((acc, curr) => acc + Number(curr.propertyaccount.credit), 0));
   
                document.getElementById('accbal').innerHTML = formatCurrency(Number(credit.reduce((acc, curr) => acc + curr, 0))-Number(debit.reduce((acc, curr) => acc + curr, 0)))
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

    async function fetchpropertyStatementOfAccountPageData() {
    await fetchpropertyStatementOfAccountCustomerAccounts();
    await fetchpropertyStatementOfAccountpropertyaccounts();
    // await fetchpropertyStatementOfAccountLocations()
    await fetchUsersForPropertyStatementOfAccount()
}

    function propertystatementOfAccountsetCurrentPage (pageNum){
    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(accountstatements.length) {
        
        let totalCredits = 0;
        let totalDebits = 0;
        
        accountstatements.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                
                item.propertyaccount.credit = +item.propertyaccount.credit
                item.propertyaccount.debit = +item.propertyaccount.debit
                totalCredits += item.propertyaccount.credit
                totalDebits += item.propertyaccount.debit
                item.calculatedBalance = totalCredits - totalDebits
                
                appendpropertyStatementOfAccountTableRows(item, index)
            }
        })
        
        if (pageCount === currentPage) renderTablepropertyStatementOfAccountFooter()
        else {
            try {
                document.querySelector('#propertystatementofaccounttable #tablefooter')?.remove()
            }
            catch(e) {console.log(e)}
        }
        
        if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#propertystatementofaccounttable #tablefooter')){
            document.querySelector('#propertystatementofaccounttable #tablefooter')?.remove()
            propertystatementofaccountbtn.click()
            form.querySelector('button#submit').click()
        }
        
        // if(document.querySelectorAll('.source-row-item').length == 0 && document.querySelector('#propertystatementofaccounttable #tablefooter'))  form.querySelector('button#submit').click()
        
    }
}

async function appendpropertyStatementOfAccountTableRows(item, index) {
    let user = statementofaccountusers.find(val => val.email == item.propertyaccount.user)
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${formatDate(item.propertyaccount.transactiondate)}</td>
            <td>${formatDate(item.propertyaccount.valuedate)}</td>
            <td>${user ? (user.firstname + ' ' + user.othernames + ' ' + user.lastname): ''}</td>
            <td>${item.propertyaccount.description}</td>
            <td>${ item.propertyaccount.reference}</td>
            <td>${ item.propertyaccount.ttype }</td>
            <td style="text-align:left">${ formatMoney(item.propertyaccount.servicecharge ) } </td>
            <td style="text-align:left">${ item.propertyaccount.credit == 0 ? '-' : formatMoney(item.propertyaccount.credit) }</td>
            <td style="text-align:left">${ item.propertyaccount.debit == 0 ? '-' : formatMoney(item.propertyaccount.debit) }</td>
            <td style="text-align:left">${ formatMoney(item.calculatedBalance) }</td>
        </tr>
    `
} 
    
function renderTablepropertyStatementOfAccountFooter () {
    let debit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.propertyaccount.debit), 0)
    let credit = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.propertyaccount.credit), 0)
    let servcharge = datasource.reduce( (prev, curr) => prev + parseFloat(+curr.propertyaccount.servicecharge), 0)
 
    document.querySelector('#propertystatementofaccounttable tbody').innerHTML += `
        <tr id="tablefooter">
            <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="7"> total </td>
            <td style="text-transform: uppercase;font-weight:bold;text-align:left">${ formatMoney(servcharge) }</td>
            <td style="text-transform: uppercase;font-weight:bold;text-align:left"> ${formatMoney(credit)}</td>
            <td style="text-transform: uppercase;font-weight:bold;text-align:left">${formatMoney(debit)}</td>
            <td style="text-transform: uppercase;font-weight:bold;text-align:left">${ formatMoney(credit - debit) }</td>
        </tr>
    `
}

async function fetchUsersForPropertyStatementOfAccount () {
     let result = await fetch('../controllers/fetchallusers.php', {method: 'POST', headers: new Headers()})
    let res = await result.json();
    if(result) {
        hideSpinner()
        if(res.status) statementofaccountusers = res.data;
        else hideSpinner()
    } else hideSpinner()
}

async function fetchpropertyStatementOfAccountLocations() {
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

    async function fetchpropertyStatementOfAccountCustomerAccounts (event) {
    showSpinner();
    let paramstr = new FormData();
    let result = await fetch('../controllers/fetchcustomeraccountscript.php', {method: 'POST', body: paramstr, headers: new Headers()})
    let res = await result.json();
    if(res?.status) { 
        hideSpinner();
        savingscustomers= res.data?.data;
    } else hideSpinner();
}

    async function fetchpropertyStatementOfAccountpropertyaccounts() {
    showSpinner()
    let result = await fetch('../controllers/fetchpropertyaccounts.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        hideSpinner()
        let data  =  res.data
        propertyaccountslist =  data;
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

var propertystatementofaccountbtn = document.getElementById('propertystatementofaccount');
if(propertystatementofaccountbtn) propertystatementofaccountbtn.addEventListener('click', openpropertyStatementOfAccount, false);


//  collections --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const checkcollectionsuserstatus =(result)=>{
        if(document.getElementById('collectionsmarketer'))document.getElementById('collectionsmarketer').innerHTML = `<option selected value="${result.email}">${result.lastname} ${result.firstname}</option>`;
        if(document.getElementById('collectionslocation'))document.getElementById('collectionslocation').value = result.location_id;
        if(document.getElementById('collectionslocation'))document.getElementById('collectionslocation').setAttribute('readonly', true)

}

    const collectionaccountname =(result)=>{
            if(document.getElementById('collectionaccountname'))document.getElementById('collectionaccountname').innerHTML = result.data.map(dat=>{
                let namedd = `${dat.customerdetail.lastname} ${dat.customerdetail.firstname} || ${dat.accountdetail.dailyunit}`;
                return(`<option value="${dat.accountdetail.accountnumber}"> ${namedd} </option>`)
                
            })
}

const docollectionlabel =(state)=>{
    let collectionlname = getLabelFromValue(state.value, 'collectionaccountname');
    state.parentElement.parentElement.children[1].textContent = collectionlname.split('||')[0]
    state.parentElement.parentElement.children[2].textContent = collectionlname.split('||')[1]
}

const caltotalcollectioncredit =()=>{
    let colx = 0;
    for(i=0;i<document.getElementsByClassName('caltotalcollectioncredit').length;i++){
        document.getElementsByClassName('caltotalcollectioncredit')[i].value ? colx = colx+Number(document.getElementsByClassName('caltotalcollectioncredit')[i].value.replaceAll(',', '')) : colx = colx
    }
    document.getElementById('collectiontotal').innerHTML = `${formatCurrency(colx)}`;
}

const removecollectionsrow =(state)=>{
    if(confirm('Confirm you want to delete the row')){state.parentElement.parentElement.remove()}else{return}
}

const addcollectionsrow =()=>{ 
    if(document.getElementById('collectiontable') && document.getElementById('collectiontable').children.length > 3)return callModal('Please Maximum rows added', 0)
    let newel = document.createElement('tr');
    newel.innerHTML =  `<td>
                                <p class="hidden">Account Number</p> <input name="collectionaccountnumber" id="${Math.random().toString(36).substring(2)}" class="orecot" placeholder="Enter Account Number" list="collectionaccountname" onchange="checkInputwithdatalist(this.id, this.list.id) ? docollectionlabel(this) : this.parentElement.parentElement.children[1].textContent = null" style="width: 97%; height: 23px;text-align: center;" /> </td>
                                <td>  </td>
                                <td>  </td>
                                <td><select name="paymentmethod"  id="paymentmethod-${Math.random()}" class="orecot " style="width: 100px; height: 23px;text-align: center;"><option>CASH</option><option>TRANSFER</option></select> </td>
                                <td><p class="hidden">Credit</p> <input name="collectioncreditt" type="number" placeholder="Enter Credit" onchange="caltotalcollectioncredit()" id="${Math.random().toString(36).substring(2)}" class="orecot comma caltotalcollectioncredit" style="width: 100px; height: 23px;text-align: center;" /> </td>
                                <td style="width: 150px"> 
                                    <button onclick="removecollectionsrow(this)" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                        </td>`
    document.getElementById('collectiontable').append(newel);
    dynamiccomma(true)
    }

async function openCollections(){
    await httpRequest('collections.php');
    dynamiccomma(true)
    if(document.getElementById('collectionslocation'))document.getElementById('collectionslocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('collectionslocation'))document.getElementById('collectionslocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    function getpermissionsParamsgiftview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsgiftview(), 'fetchuserprofile', null, checkcollectionsuserstatus);
        callController('fetchallaccountsprofile.php',null, 'fetchallaccountsprofile', null, collectionaccountname);
        
    if(document.getElementById('collectionsubmit'))document.getElementById('collectionsubmit').addEventListener('click', e=>{
        dynamiccomma(false)
        let checkcolinput = false;
        let orecot = getallid('orecot');
        const today = new Date();
        const day = today.getDate(); // Day of the month (1-31)
        const month = today.getMonth() + 1; // Month (0-11, so we add 1)
        const year = today.getFullYear(); // Full year (e.g., 2023)
        
        // Create a formatted date string (e.g., "2023-08-18")
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        function getcolparams(){
            let paramstr = new FormData;
            paramstr.append('marketer', document.getElementById('collectionsmarketer').value);
            paramstr.append('transactiondate', formattedDate);
            paramstr.append('location', document.getElementById('collectionslocation').value);
            for(i=0;i<document.getElementsByName('collectionaccountnumber').length;i++){
                paramstr.append(`accountnumber${i+1}`, document.getElementsByName('collectionaccountnumber')[i].value)
                paramstr.append(`paymentmethod${i+1}`, document.getElementsByName('paymentmethod')[i].value);
            }
            paramstr.append('rowsize', document.getElementsByName('collectionaccountnumber').length);
            
            for(i=0;i<document.getElementsByName('collectioncreditt').length;i++){
                paramstr.append(`credit${i+1}`, document.getElementsByName('collectioncreditt')[i].value)
            } 
            return paramstr
            
        }
        callController('collectionscript.php', getcolparams(), 'collectionscript', orecot, resetPage)
    })
    

}

var collections = document.getElementById('collections')

if(collections)collections.addEventListener('click',openCollections, false)



// collections view  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const fillupcollection =(result)=>{
    // if(document.getElementById('collectionviewsmarketer'))document.getElementById('collectionviewsmarketer').innerHTML = `<option selected value=""></option>`;
    if(document.getElementById('collectionviewsmarketer'))document.getElementById('collectionviewsmarketer').value = ''
    if(document.getElementById('collectionviewsmarketer'))document.getElementById('collectionviewmarketername').innerHTML += result.data.map(dat=>{
        return(`<option value="${dat.lastname} ${dat.firstname} | ${dat.email}">`)
    }).join('')
}
const checkcollectionviewsuserstatus =(result)=>{
        // if(document.getElementById('collectionviewsmarketer'))document.getElementById('collectionviewsmarketer').innerHTML = `<option selected value="${result.email}">${result.lastname} ${result.firstname}</option>`;
        if(document.getElementById('collectionviewslocation'))document.getElementById('collectionviewslocation').value = result.location_id;
        if(document.getElementById('collectionviewslocation'))document.getElementById('collectionviewslocation').setAttribute('readonly', true)

}

    const collectionviewaccountname =(result)=>{
            if(document.getElementById('collectionviewaccountname'))document.getElementById('collectionviewaccountname').innerHTML = result.data.map(dat=>{
                let namedd = `${dat.customerdetail.lastname} ${dat.customerdetail.firstname} || ${dat.accountdetail.dailyunit}`
                return `<option value="${dat.accountdetail.accountnumber}">${namedd}</option>`
                
            }
                ).join('')
}

// const docollectionviewlabel =(state)=>{
//     let collectionviewlname = getLabelFromValue(state.value, 'collectionviewaccountname');
//     state.parentElement.parentElement.children[1].textContent = collectionviewlname
// }

// const caltotalcollectionviewcredit =()=>{
//     let colx = 0;
//     for(i=0;i<document.getElementsByClassName('caltotalcollectionviewcredit').length;i++){
//         document.getElementsByClassName('caltotalcollectionviewcredit')[i].value ? colx = colx+Number(document.getElementsByClassName('caltotalcollectionviewcredit')[i].value) : colx = colx
//     }
//     document.getElementById('collectionviewtotal').innerHTML = `&#x20A6; ${formatCurrency(colx)}`;
// }

// const removecollectionviewsrow =(state)=>{
//     if(confirm('Confirm you want to delete the row')){state.parentElement.parentElement.remove()}else{return}
// }
function formatDatexx(inputDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(inputDate);
  return date.toLocaleDateString(undefined, options);
}
const openediter =(id, marketer, transactiondate, location, reference)=>{
    if(document.getElementById(`editorsave_${id}`).textContent == 'Edit'){
        for(i=0;i<document.getElementsByName(`showcv_${id}`).length;i++){
            document.getElementsByName(`showcv_${id}`)[i].classList.add('hidden')
            document.getElementsByName(`editcv_${id}`)[i].classList.remove('hidden')
        }
        document.getElementById(`editorsave_${id}`).textContent = 'Save';
        document.getElementById(`editorsave_${id}`).style.backgroundColor = 'green'
        return
    }
    if(document.getElementById(`editorsave_${id}`).textContent == 'Save'){
        function getmeparamcv(){
            let paramstr = new FormData();
            paramstr.append('id', id)
            paramstr.append('marketer', marketer);
            paramstr.append('transactiondate', transactiondate);
            paramstr.append('location', location);
            paramstr.append('reference', reference);
            paramstr.append(`accountnumber`, document.getElementById(`accountnumber_${id}`).value)
            paramstr.append(`credit`, document.getElementById(`credit_${id}`).value)
            return paramstr
            
        }
        function takecvaction(){
            document.getElementById('collectionviewview').click();
        }
        callController('editcollection.php', getmeparamcv(), 'editcollection', [`accountnumber_${id}`, `credit_${id}`], takecvaction)
        return
    }
}
const docollectionlabelview =(state)=>{
    let collectionlname = getLabelFromValue(state.value, 'collectionviewaccountname');
    state.parentElement.parentElement.parentElement.children[2].children[1].children[0].value = collectionlname.split('||')[0]
    state.parentElement.parentElement.parentElement.children[3].children[1].children[0].value = collectionlname.split('||')[1]
}
const collectionviewdeletion =(id, name)=>{
    function getmeparamcv(){
            let paramstr = new FormData();
            paramstr.append('id', id)
            return paramstr
            
        }
        function takecvaction(){
            document.getElementById('collectionviewview').click();
        }
        if (confirm(`Are you sure you want to delete collection for ${name}?`)) {
            callController('removecollection.php', getmeparamcv(), 'removecollection', [`accountnumber_${id}`, `credit_${id}`], takecvaction)
        } else {
            return                
        }

}
const populatecollectionsview =(result)=>{
        let nn = 0;
    document.getElementById('collectionviewtable').innerHTML = '';
    document.getElementById('collectionviewtable').innerHTML = result.data.map(dat=>{
        nn = Number(dat.credit) + nn
        return(`
                 <tr>
                    <td>
                        <input id="${dat.id}" name="collectioncheck" type="checkbox"/>
                    </td>
                    <td>
                        <span name="showcv_${dat.id}">${dat.accountnumber}</span>
                        <span name="editcv_${dat.id}" class="hidden">
                            <input 
                                onchange="this.parentElement.parentElement.parentElement.children[3].children[1].children[0].value = null;checkInputwithdatalist(this.id, this.list.id) ? docollectionlabelview(this) : this.parentElement.parentElement.parentElement.children[2].children[1].children[0].value = null;"
                                list="collectionviewaccountname" style="height:30px;border-radius:7px" id="accountnumber_${dat.id}" value="${dat.accountnumber}" name="collectioncheck" type="text"/>
                        </span>
                    </td>
                    <td>
                        <div name="showcv_${dat.id}">
                            ${dat.customername}
                        </div>
                        <div name="editcv_${dat.id}" class="hidden">
                            <input style="height:30px;border-radius:7px" disabled id="accountname_${dat.id}" value="${dat.customername}" name="collectioncheck" type="text"/>
                        </div>
                    </td>
                    <td>
                        <span name="showcv_${dat.id}">
                            ${dat.dailyunit}
                        </span>
                        <span name="editcv_${dat.id}" class="hidden">
                            <input style="height:30px;border-radius:7px" disabled id="dailyunit_${dat.id}" value="${dat.dailyunit}" name="collectioncheck" type="text"/>
                        </span>
                    </td>
                    <td> 
                        ${formatDatexx(dat.transactiondate.split(' ')[0])}
                    </td>
                    <td>
                        <span name="showcv_${dat.id}">
                            ${formatCurrency(dat.credit)}
                        </span>
                        <span name="editcv_${dat.id}" class="hidden">
                            <input style="height:30px;border-radius:7px" id="credit_${dat.id}" value="${dat.credit}" name="collectioncheck" type="text"/>
                        </span>
                    </td>
                    <td>
                        <div class="flex" style="align-items:center;display: flex;gap: 10px;justify-content: center">
                            <button onclick="openediter('${dat.id}', '${dat.marketer}', '${dat.transactiondate}', '${dat.location}', '${dat.reference}')" id="editorsave_${dat.id}" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                            <button id="delete_${dat.id}" onclick="collectionviewdeletion('${dat.id}', '${getLabelFromValue(dat.accountnumber, 'collectionviewaccountname').split('||')[0]}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                        </div>
                    </td>
                 </tr>
        `)
    }).join('')
    document.getElementById('collectionviewtotal').innerHTML = formatCurrency(nn)
    fetchmarketerscall()
    }
    
    function fetchmarketerscall(){
        callController('fetchmarketerswithdeposits.php',null, 'fetchmarketerswithdeposits', null, populatefetchmarketers, 'silent');
    }
    
    function populatefetchmarketers(result){
        document.getElementById('collectionviewtablemarketer').innerHTML = result.data.map((dat, i)=>`<tr onclick="document.getElementById('collectionviewsmarketer').value = '${dat.marketer.firstname??''} ${dat.marketer.lastname??''} | ${dat.marketer.email}'" data-open="false" class="source-row-item">
                                <td> ${i+1} </td>
                                <td> ${dat.marketer.firstname??''} ${dat.marketer.lastname??''} ${dat.marketer.othernames??''} </td>
                                <td> ${dat.marketer.email}</td>
                            </tr>`).join('')
    }

async function openCollectionviews(){
    await httpRequest('collectionsview.php'); 
    
    getUsers(fillupcollection)
    
    if(document.getElementById('collectionviewslocation'))document.getElementById('collectionviewslocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('collectionviewslocation'))document.getElementById('collectionviewslocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    function getpermissionsParamsgiftview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsgiftview(), 'fetchuserprofile', null, checkcollectionviewsuserstatus);
        // callController('fetchallaccountsprofile.php',null, 'fetchallaccountsprofile', null, collectionviewaccountname);
        fetchmarketerscall()
        
    if(document.getElementById('collectionviewview'))document.getElementById('collectionviewview').addEventListener('click', e=>{
        function getcolparams(){
            let paramstr = new FormData;
            console.log(document.getElementById('collectionviewsmarketer').value.trim().split('|')[1], document.getElementById('collectionviewsmarketer').value.trim())
            paramstr.append('marketer', document.getElementById('collectionviewsmarketer').value ? document.getElementById('collectionviewsmarketer').value.trim().split('|')[1].trim() : '');
            paramstr.append('startdate', document.getElementById('collectionviewstartdate').value);
            paramstr.append('enddate', document.getElementById('collectionviewenddate').value); 
            paramstr.append('paymentmethod', document.getElementById('paymentmethod').value); 
            return paramstr
              
        }
        callController('fetchcollections.php', getcolparams(), 'fetchcollections', ['collectionviewstartdate', 'collectionviewenddate'], populatecollectionsview)
    })
    
    if(document.getElementById('collectionviewcheckall'))document.getElementById('collectionviewcheckall').addEventListener('click', e=>{
        for(i=0;i<document.getElementsByName('collectioncheck').length;i++){
            document.getElementsByName('collectioncheck')[i].checked = true 
        }
    })
    if(document.getElementById('collectionviewuncheckall'))document.getElementById('collectionviewuncheckall').addEventListener('click', e=>{
        for(i=0;i<document.getElementsByName('collectioncheck').length;i++){
            document.getElementsByName('collectioncheck')[i].checked = false
        }
    })
    const reloaddata=(result)=>{
        if(result.status){
            callModal(result.message,1)
        }else{
            return callModal(result.message,2)
        }
        document.getElementById('collectionviewtotal').innerHTML = ''
        document.getElementById('collectionviewtable').innerHTML = ''
        document.getElementById('collectionviewtablemarketer').innerHTML = ''
        document.getElementById('collectionviewview').click()
        fetchmarketerscall()
    }
    if(document.getElementById('collectionviewapprove'))document.getElementById('collectionviewapprove').addEventListener('click', e=>{
        let chek = false;
        let chekid = []
        for(i=0;i<document.getElementsByName('collectioncheck').length;i++){
            document.getElementsByName('collectioncheck')[i].checked == false ? null : chek = true;
            document.getElementsByName('collectioncheck')[i].checked == true ? chekid.push(document.getElementsByName('collectioncheck')[i].id) : '';
        }
        if(chek == false)return callModal('Nothing to Approve', 0);
        function checkparams(){
            let paramstr = new FormData;
            paramstr.append('rowsize', chekid.length)
            for(i=0;i<chekid.length;i++){
                paramstr.append(`id${i+1}`, chekid[i])
            }
            return paramstr
        }
        callController('approvecollections.php', checkparams(), 'approvecollections', null, reloaddata)
    })
    
    if(document.getElementById('collectionviewdecline'))document.getElementById('collectionviewdecline').addEventListener('click', e=>{
        let chek = false;
        let chekid = []
        for(i=0;i<document.getElementsByName('collectioncheck').length;i++){
            document.getElementsByName('collectioncheck')[i].checked == false ? null : chek = true;
            document.getElementsByName('collectioncheck')[i].checked == true ? chekid.push(document.getElementsByName('collectioncheck')[i].id) : '';
        }
        if(chek == false)return callModal('Nothing to Decline', 0);
        function checkparams(){
            let paramstr = new FormData;
            paramstr.append('rowsize', chekid.length)
            for(i=0;i<chekid.length;i++){
                paramstr.append(`id${i+1}`, chekid[i]) 
            }
            return paramstr
        }
        callController('declinecollections.php', checkparams(), 'declinecollections', null, reloaddata)
    })
    

}

var collectionviews = document.getElementById('collectionsview')

if(collectionviews)collectionviews.addEventListener('click',openCollectionviews, false)



//  update daily units --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var updatedailyunitorehistory_datasource = [];

const populateupdatedailyunittable=(result)=>{
    updatedailyunitorehistory_datasource = [];
    updatedailyunitorehistory_datasource = result.data;
    // console.log('updatedailyunitorehistory_datasource', updatedailyunitorehistory_datasource)
    // initPagination(updatedailyunitorehistory_datasource, updatedailyunitorehistoryorehistorysetCurrentPage);
    filterupdatedailyunit()
    dynamiccomma(true)
    }
    
const filterupdatedailyunit =()=>{
    if(document.getElementById('updatedailyunitstartdate').value == ''){
        document.getElementById('updatedailyunitorehistorytablecontent').innerHTML = updatedailyunitorehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.accountdetail.accountnumber} </td>
                                <td> ${dat.customerdetail.lastname} ${dat.customerdetail.firstname}  </td>
                                <td> ${formatCurrency(dat.accountdetail.dailyunit)} </td>
                                <td> 
                                    <label class="hidden">Daily Unit change</label>
                                     <input id="updatedailyunitselect${index}" class="comma" value="${dat.accountdetail.dailyunit}" onchange="if(this.value != ${dat.accountdetail.dailyunit}){document.getElementById('updatedailyunit${index}').style.background = 'green';document.getElementById('updatedailyunit${index}').disabled = false;}else{document.getElementById('updatedailyunit${index}').style.background = '#c3cec3';document.getElementById('updatedailyunit${index}').disabled = true;}" style="width:250px;text-align: center;padding: 3px 10px;border-radius: 7px;border-color: #00000047;border-bottom-right-radius: 0px;border-bottom-left-radius: 0px;" />
                                </td>
                                <td> 
                                    <div class="flex" style="align-items:center">
                                        <button id="updatedailyunit${index}"" onclick="updatedailyunitvalue('${index}', '${dat.accountdetail.accountnumber}')" disabled style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:#c3cec3;border-radius:3px">Update</button>
                                    </div>
                                </td>
                            </tr>`)
    }).join('')
    }
    if(document.getElementById('updatedailyunitstartdate').value != ''){
        document.getElementById('updatedailyunitorehistorytablecontent').innerHTML = updatedailyunitorehistory_datasource.filter(data=>data.accountdetail.accountnumber.includes(document.getElementById('updatedailyunitstartdate').value)).map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.accountdetail.accountnumber} </td>
                                <td> ${dat.customerdetail.lastname} ${dat.customerdetail.firstname}  </td>
                                <td> ${formatCurrency(dat.accountdetail.dailyunit)} </td>
                                <td> 
                                    <label class="hidden">Daily Unit change</label>
                                     <select id="updatedailyunitselect${index}" onchange="if(this.value != ${dat.accountdetail.dailyunit}){document.getElementById('updatedailyunit${index}').style.background = 'green';document.getElementById('updatedailyunit${index}').disabled = false;}else{document.getElementById('updatedailyunit${index}').style.background = '#c3cec3';document.getElementById('updatedailyunit${index}').disabled = true;}" style="padding: 3px 10px;border-radius: 7px;border-color: #00000047;border-bottom-right-radius: 0px;border-bottom-left-radius: 0px;">
                                        <option>Nill</option>
                                        <option ${dat.accountdetail.dailyunit == '1000' ? 'selected' : ''}>1000</option>
                                        <option ${dat.accountdetail.dailyunit == '2000' ? 'selected' : ''}>2000</option>
                                        <option ${dat.accountdetail.dailyunit == '3000' ? 'selected' : ''}>3000</option>
                                     </select> 
                                </td>
                                <td> 
                                    <div class="flex" style="align-items:center">
                                        <button id="updatedailyunit${index}"" onclick="updatedailyunitvalue('${index}', '${dat.accountdetail.accountnumber}')" disabled style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:#c3cec3;border-radius:3px">Update</button>
                                    </div>
                                </td>
                            </tr>`)
    }).join('')
    }
}
    
    
    const updatedailyunitvalue =(id, acc)=>{
        dynamiccomma(false)
        // console.log('value', document.getElementById(`updatedailyunitselect0`).value, document.getElementById(`updatedailyunitselect${id}`).value, id)
        function updatedailyunitrun(result){
            dynamiccomma(true)
            callController('fetchallaccountsprofile.php', null, 'fetchallaccountsprofile', [], populateupdatedailyunittable);
        }
        function updateuniteerparams(){
            let params = new FormData();
            params.append('accountnumber', acc)
            params.append('dailyunit', document.getElementById(`updatedailyunitselect${id}`).value)
            return params
        }
        callController('updatedailyunit.php', updateuniteerparams(), 'updatedailyunit', [`'updatedailyunitselect${id}'`], updatedailyunitrun)
    }
    

// const deletestockupdatedailyunitentry=(id)=>{
//     const run=(result)=>{
//       function paramsupdatedailyunit(){
//         var paramstr = new FormData();
//         paramstr.append('location', document.getElementById('updatedailyunitlocation').value);
//         paramstr.append('startdate', document.getElementById('updatedailyunitstartdate').value);
//         paramstr.append('enddate', document.getElementById('updatedailyunitenddate').value);
//             return paramstr;
//         };
        
//         callController('fetchupdatedailyunitscript.php', paramsupdatedailyunit(), 'fetchupdatedailyunitscript', ['updatedailyunitenddate', 'updatedailyunitstartdate', 'updatedailyunitlocation'], populateupdatedailyunittable);
//     }
//     function parammm(){
//     var paramstr = new FormData();
//     paramstr.append('id', id);
//         return paramstr;
//     };
//     callController('removeupdatedailyunit.php', parammm(), 'removeupdatedailyunit', null, run)
// }



async function updatedailyunit () {
    await httpRequest('updatedailyunit.php', 'override');
      jtabledata = document.getElementById('updatedailyunitorehistorytablecontent');
        initializePaginationParams();
    
        
        callController('fetchallaccountsprofile.php', null, 'fetchallaccountsprofile', [], populateupdatedailyunittable);
    
    

}

var updatedailyunitNav = document.getElementById("updatedailyunit");
if (updatedailyunitNav) updatedailyunitNav.addEventListener("click", updatedailyunit, false);



// approved collections  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const checkcollectionapproveviewsuserstatus =(result)=>{
        if(document.getElementById('collectionapproveviewsmarketer'))document.getElementById('collectionapproveviewsmarketer').innerHTML = `<option selected value="${result.email}">${result.lastname} ${result.firstname}</option>`;
        if(document.getElementById('collectionapproveviewslocation'))document.getElementById('collectionapproveviewslocation').value = result.location_id;
        if(document.getElementById('collectionapproveviewslocation'))document.getElementById('collectionapproveviewslocation').setAttribute('readonly', true)

}

    const collectionapproveviewaccountname =(result)=>{
            if(document.getElementById('collectionapproveviewaccountname'))document.getElementById('collectionapproveviewaccountname').innerHTML = result.data.map(dat=>`<option value="${dat.accountdetail.accountnumber}">${dat.customerdetail.lastname} ${dat.customerdetail.firstname}</option>`)
}

// const docollectionapproveviewlabel =(state)=>{
//     let collectionapproveviewlname = getLabelFromValue(state.value, 'collectionapproveviewaccountname');
//     state.parentElement.parentElement.children[1].textContent = collectionapproveviewlname
// }

// const caltotalcollectionapproveviewcredit =()=>{
//     let colx = 0;
//     for(i=0;i<document.getElementsByClassName('caltotalcollectionapproveviewcredit').length;i++){
//         document.getElementsByClassName('caltotalcollectionapproveviewcredit')[i].value ? colx = colx+Number(document.getElementsByClassName('caltotalcollectionapproveviewcredit')[i].value) : colx = colx
//     }
//     document.getElementById('collectionapproveviewtotal').innerHTML = `&#x20A6; ${formatCurrency(colx)}`;
// }

// const removecollectionapproveviewsrow =(state)=>{
//     if(confirm('Confirm you want to delete the row')){state.parentElement.parentElement.remove()}else{return}
// }
function formatDatexxx(inputDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(inputDate);
  return date.toLocaleDateString(undefined, options);
}
const populatecollectionapprovesview =(result)=>{
        let nn = 0;
    document.getElementById('collectionapproveviewtable').innerHTML = result.data.map(dat=>{
        nn = Number(dat.credit) + nn
        return(`
                 <tr> 
                                <td> ${dat.accountnumber} </td>
                                <td> ${getLabelFromValue(dat.accountnumber, 'collectionapproveviewaccountname')}  </td>
                                <td> ${formatDatexxx(dat.transactiondate.split(' ')[0])} </td>
                                <td>${formatCurrency(dat.credit)}</td>
                 </tr>
        `)
    }).join('')
    document.getElementById('collectionapproveviewtotal').innerHTML = formatCurrency(nn)
    }

async function openCollectionapproveviews(){
    await httpRequest('collectionsapproveview.php');
    
    if(document.getElementById('collectionapproveviewslocation'))document.getElementById('collectionapproveviewslocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('collectionapproveviewslocation'))document.getElementById('collectionapproveviewslocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    function getpermissionsParamsgiftview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsgiftview(), 'fetchuserprofile', null, checkcollectionapproveviewsuserstatus);
        callController('fetchallaccountsprofile.php',null, 'fetchallaccountsprofile', null, collectionapproveviewaccountname);
        
    if(document.getElementById('collectionapproveviewview'))document.getElementById('collectionapproveviewview').addEventListener('click', e=>{
        function getcolparams(){
            let paramstr = new FormData;
            paramstr.append('marketer', document.getElementById('collectionapproveviewsmarketer').value);
            paramstr.append('startdate', document.getElementById('collectionapproveviewstartdate').value);
            paramstr.append('enddate', document.getElementById('collectionapproveviewenddate').value); 
            paramstr.append('paymentmethod', document.getElementById('paymentmethod').value); 
            return paramstr
            
        }
        callController('fetchapprovedcollections.php', getcolparams(), 'fetchapprovedcollections', ['collectionapproveviewstartdate', 'collectionapproveviewenddate'], populatecollectionapprovesview)
    })
    
    if(document.getElementById('collectionapproveviewcheckall'))document.getElementById('collectionapproveviewcheckall').addEventListener('click', e=>{
        for(i=0;i<document.getElementsByName('collectionapprovecheck').length;i++){
            document.getElementsByName('collectionapprovecheck')[i].checked = true
        }
    })
    if(document.getElementById('collectionapproveviewuncheckall'))document.getElementById('collectionapproveviewuncheckall').addEventListener('click', e=>{
        for(i=0;i<document.getElementsByName('collectionapprovecheck').length;i++){
            document.getElementsByName('collectionapprovecheck')[i].checked = false
        }
    })
    const reloaddata=(result)=>{
        if(result.status){
            callModal(result.message,1)
        }else{
           return callModal(result.message,2)
        }
        document.getElementById('collectionapproveviewview').click()
    }
    if(document.getElementById('collectionapproveviewapprove'))document.getElementById('collectionapproveviewapprove').addEventListener('click', e=>{
        let chek = false;
        let chekid = []
        for(i=0;i<document.getElementsByName('collectionapprovecheck').length;i++){
            document.getElementsByName('collectionapprovecheck')[i].checked == false ? null : chek = true;
            document.getElementsByName('collectionapprovecheck')[i].checked == true ? chekid.push(document.getElementsByName('collectionapprovecheck')[i].id) : chek = true;
        }
        if(chek == false)return callModal('Nothing to Approve', 0);
        function checkparams(){
            let paramstr = new FormData;
            paramstr.append('rowsize', chekid.length)
            for(i=0;i<chekid.length;i++){
                paramstr.append(`id${i+1}`, chekid[i])
            }
            return paramstr
        }
        callController('approvecollectionapproves.php', checkparams(), 'approvecollectionapproves', null, reloaddata)
    })
    
    if(document.getElementById('collectionapproveviewdecline'))document.getElementById('collectionapproveviewdecline').addEventListener('click', e=>{
        let chek = false;
        let chekid = []
        for(i=0;i<document.getElementsByName('collectionapprovecheck').length;i++){
            document.getElementsByName('collectionapprovecheck')[i].checked == false ? null : chek = true;
            document.getElementsByName('collectionapprovecheck')[i].checked == true ? chekid.push(document.getElementsByName('collectionapprovecheck')[i].id) : chek = true;
        }
        if(chek == false)return callModal('Nothing to Decline', 0);
        function checkparams(){
            let paramstr = new FormData;
            paramstr.append('rowsize', chekid.length)
            for(i=0;i<chekid.length;i++){
                paramstr.append(`id${i+1}`, chekid[i]) 
            }
            return paramstr
        }
        callController('declinecollectionapproves.php', checkparams(), 'declinecollectionapproves', null, reloaddata)
    })
    

}

var collectionapproveviews = document.getElementById('collectionsapproveview')

if(collectionapproveviews)collectionapproveviews.addEventListener('click',openCollectionapproveviews, false)



// declined collections  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const checkcollectiondeclineviewsuserstatus =(result)=>{
        if(document.getElementById('collectiondeclineviewsmarketer'))document.getElementById('collectiondeclineviewsmarketer').innerHTML = `<option selected value="${result.email}">${result.lastname} ${result.firstname}</option>`;
        if(document.getElementById('collectiondeclineviewslocation'))document.getElementById('collectiondeclineviewslocation').value = result.location_id;
        if(document.getElementById('collectiondeclineviewslocation'))document.getElementById('collectiondeclineviewslocation').setAttribute('readonly', true)

}

    const collectiondeclineviewaccountname =(result)=>{
            if(document.getElementById('collectiondeclineviewaccountname'))document.getElementById('collectiondeclineviewaccountname').innerHTML = result.data.map(dat=>`<option value="${dat.accountdetail.accountnumber}">${dat.customerdetail.lastname} ${dat.customerdetail.firstname}</option>`)
}

// const docollectiondeclineviewlabel =(state)=>{
//     let collectiondeclineviewlname = getLabelFromValue(state.value, 'collectiondeclineviewaccountname');
//     state.parentElement.parentElement.children[1].textContent = collectiondeclineviewlname
// }

// const caltotalcollectiondeclineviewcredit =()=>{
//     let colx = 0;
//     for(i=0;i<document.getElementsByClassName('caltotalcollectiondeclineviewcredit').length;i++){
//         document.getElementsByClassName('caltotalcollectiondeclineviewcredit')[i].value ? colx = colx+Number(document.getElementsByClassName('caltotalcollectiondeclineviewcredit')[i].value) : colx = colx
//     }
//     document.getElementById('collectiondeclineviewtotal').innerHTML = `&#x20A6; ${formatCurrency(colx)}`;
// }

// const removecollectiondeclineviewsrow =(state)=>{
//     if(confirm('Confirm you want to delete the row')){state.parentElement.parentElement.remove()}else{return}
// }
function formatDatexxx(inputDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(inputDate);
  return date.toLocaleDateString(undefined, options);
}
const populatecollectiondeclinesview =(result)=>{
        let nn = 0;
    document.getElementById('collectiondeclineviewtable').innerHTML = result.data.map(dat=>{
        nn = Number(dat.credit) + nn
        return(`
                 <tr> 
                                <td> ${dat.accountnumber} </td>
                                <td> ${getLabelFromValue(dat.accountnumber, 'collectiondeclineviewaccountname')}  </td>
                                <td> ${formatDatexxx(dat.transactiondate.split(' ')[0])} </td>
                                <td>${formatCurrency(dat.credit)}</td>
                 </tr>
        `)
    }).join('')
    document.getElementById('collectiondeclineviewtotal').innerHTML = formatCurrency(nn)
    }

async function openCollectiondeclineviews(){
    await httpRequest('collectionsdeclineview.php');
    
    if(document.getElementById('collectiondeclineviewslocation'))document.getElementById('collectiondeclineviewslocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('collectiondeclineviewslocation'))document.getElementById('collectiondeclineviewslocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    function getpermissionsParamsgiftview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsgiftview(), 'fetchuserprofile', null, checkcollectiondeclineviewsuserstatus);
        callController('fetchallaccountsprofile.php',null, 'fetchallaccountsprofile', null, collectiondeclineviewaccountname);
        
    if(document.getElementById('collectiondeclineviewview'))document.getElementById('collectiondeclineviewview').addEventListener('click', e=>{
        function getcolparams(){
            let paramstr = new FormData;
            paramstr.append('marketer', document.getElementById('collectiondeclineviewsmarketer').value);
            paramstr.append('startdate', document.getElementById('collectiondeclineviewstartdate').value);
            paramstr.append('enddate', document.getElementById('collectiondeclineviewenddate').value); 
            paramstr.append('paymentmethod', document.getElementById('paymentmethod').value); 
            return paramstr
            
        }
        callController('fetchdeclinedcollections.php', getcolparams(), 'fetchdeclinedcollections', ['collectiondeclineviewstartdate', 'collectiondeclineviewenddate'], populatecollectiondeclinesview)
    })
    
    if(document.getElementById('collectiondeclineviewcheckall'))document.getElementById('collectiondeclineviewcheckall').addEventListener('click', e=>{
        for(i=0;i<document.getElementsByName('collectiondeclinecheck').length;i++){
            document.getElementsByName('collectiondeclinecheck')[i].checked = true
        }
    })
    if(document.getElementById('collectiondeclineviewuncheckall'))document.getElementById('collectiondeclineviewuncheckall').addEventListener('click', e=>{
        for(i=0;i<document.getElementsByName('collectiondeclinecheck').length;i++){
            document.getElementsByName('collectiondeclinecheck')[i].checked = false
        }
    })
    const reloaddata=(result)=>{
        if(result.status){
            callModal(result.message,1)
        }else{
            return callModal(result.message,2)
        }
        document.getElementById('collectiondeclineviewview').click()
    }
    if(document.getElementById('collectiondeclineviewdecline'))document.getElementById('collectiondeclineviewdecline').addEventListener('click', e=>{
        let chek = false;
        let chekid = []
        for(i=0;i<document.getElementsByName('collectiondeclinecheck').length;i++){
            document.getElementsByName('collectiondeclinecheck')[i].checked == false ? null : chek = true;
            document.getElementsByName('collectiondeclinecheck')[i].checked == true ? chekid.push(document.getElementsByName('collectiondeclinecheck')[i].id) : chek = true;
        }
        if(chek == false)return callModal('Nothing to decline', 0);
        function checkparams(){
            let paramstr = new FormData;
            paramstr.append('rowsize', chekid.length)
            for(i=0;i<chekid.length;i++){
                paramstr.append(`id${i+1}`, chekid[i])
            }
            return paramstr
        }
        callController('declinecollectiondeclines.php', checkparams(), 'declinecollectiondeclines', null, reloaddata)
    })
    
    if(document.getElementById('collectiondeclineviewdecline'))document.getElementById('collectiondeclineviewdecline').addEventListener('click', e=>{
        let chek = false;
        let chekid = []
        for(i=0;i<document.getElementsByName('collectiondeclinecheck').length;i++){
            document.getElementsByName('collectiondeclinecheck')[i].checked == false ? null : chek = true;
            document.getElementsByName('collectiondeclinecheck')[i].checked == true ? chekid.push(document.getElementsByName('collectiondeclinecheck')[i].id) : chek = true;
        }
        if(chek == false)return callModal('Nothing to Decline', 0);
        function checkparams(){
            let paramstr = new FormData;
            paramstr.append('rowsize', chekid.length)
            for(i=0;i<chekid.length;i++){
                paramstr.append(`id${i+1}`, chekid[i]) 
            }
            return paramstr
        }
        callController('declinecollectiondeclines.php', checkparams(), 'declinecollectiondeclines', null, reloaddata)
    })
    

}

var collectiondeclineviews = document.getElementById('collectionsdeclineview')

if(collectiondeclineviews)collectiondeclineviews.addEventListener('click',openCollectiondeclineviews, false)


// branch fund transfer  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let u;
const branchtransferids = [
'branchtransferfrom',
'branchtransferto',
'branchtransferamount',
'branchtransferdate',
'branchtransferlocation'
]
const getbranchtransferprofile =(value, acname)=>{
    function branchtransferlocationuserparams(){
    var paramstr = new FormData();
    paramstr.append('accountnumber', value);
        return paramstr;
    };
    const branchtransferactiondo =(result)=>{
        acname.nextElementSibling.innerHTML = `${result.data[0].customerdetail.lastname} ${result.data[0].customerdetail.firstname} ${result.data[0].customerdetail.othernames ? result.data[0].customerdetail.othernames : null}`
    }
    callController('fetchaccountprofile.php', branchtransferlocationuserparams(), 'fetchaccountprofile', null, branchtransferactiondo);
}
const branchfundtransferaccounts =(result)=>{
    if(document.getElementById('branchfundtransferaccounts'))document.getElementById('branchfundtransferaccounts').innerHTML = result.data.map(dat=>`<option value="${dat.accountnumber}">${dat.accountnumber}</option>`)
}

const branchtransferlocationsetup =(result)=>{
        if(document.getElementById('branchtransferlocation'))document.getElementById('branchtransferlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('branchtransferlocation'))document.getElementById('branchtransferlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('branchtransferlocation'))document.getElementById('branchtransferlocation').setAttribute('readonly', true)
    }
}

const populatebranchfundtransfertable =(result)=>{
    let darta = result.data.filter(dat=>dat.id == u.split(' ')[0])
    // console.log('darta', darta)
    document.getElementById('branchtransferfrom').value = ''
    document.getElementById('branchtransferto').value = ''
    document.getElementById('branchtransferamount').value = ''
    document.getElementById('branchtransferdate').value = ''
    document.getElementById('branchtransferdate').value = ''
    document.getElementById('branchtransferdescription').value = ''
    document.getElementById('branchtransferlocation').value = ''
    
}
    
async function openBranchFundTransfer() {
    await httpRequest('branchfundtransfer.php');
    u = '';
    callController('fetchsavingsaccounts.php',null, 'fetchsavingsaccounts', null, branchfundtransferaccounts);
    
    if(document.getElementById('branchtransferlocation'))document.getElementById('branchtransferlocation').innerHTML = `<option value="" disabled>Select Location</option>`
    if(document.getElementById('branchtransferlocation'))document.getElementById('branchtransferlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
     function branchtransferlocationuserparams(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', branchtransferlocationuserparams(), 'fetchuserprofile', null, branchtransferlocationsetup);
    
    if(sessionStorage.getItem('editviewbranchfundtransferdata')){
         u = sessionStorage.getItem('editviewbranchfundtransferdata')
        function paramsviewbranchfundtransfer(){
            var paramstr = new FormData();
            paramstr.append('id', u.split(' ')[0]);
            return paramstr;
        };
        
        callController('fetchbranchfundtransfer.php', paramsviewbranchfundtransfer(), 'fetchbranchfundtransfer', [], populatebranchfundtransfertable);
   
    }
    
    if(document.getElementById('branchtransfersavebtn'))document.getElementById('branchtransfersavebtn').addEventListener('click', e=>{
     
        function branchtransferlocationparams(){
        var paramstr = new FormData();
        paramstr.append('transferfrom', document.getElementById('branchtransferfrom').value);
        paramstr.append('transferto', document.getElementById('branchtransferto').value);
        paramstr.append('amount', document.getElementById('branchtransferamount').value);
        paramstr.append('transactiondate', document.getElementById('branchtransferdate').value);
        paramstr.append('reference', document.getElementById('branchtransferdate').value);
        paramstr.append('description', document.getElementById('branchtransferdescription').value);
        paramstr.append('location', document.getElementById('branchtransferlocation').value);
            return paramstr;
        };
        callController('branchtransferscript.php', branchtransferlocationparams(), 'branchtransferscript', branchtransferids, resetPage);
     
    })
    
}


let branchfundtransferbtn = document.getElementById('branchfundtransfer')
if(branchfundtransferbtn) branchfundtransferbtn.addEventListener('click', openBranchFundTransfer, false)


//  view branch fund transfers  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var viewbranchfundtransferorehistory_datasource = [];

const populateviewbranchfundtransfertable=(result)=>{
    viewbranchfundtransferorehistory_datasource = [];
    viewbranchfundtransferorehistory_datasource = result.data;
    // console.log('viewbranchfundtransferorehistory_datasource', viewbranchfundtransferorehistory_datasource)
    initPagination(viewbranchfundtransferorehistory_datasource, viewbranchfundtransferorehistoryorehistorysetCurrentPage);
    document.getElementById('viewbranchfundtransfer2orehistorytablecontent').innerHTML = viewbranchfundtransferorehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLabelFromValue(dat.accountnumber,'viewbranchfundtransferaccounts')} </td>
                                <td> ${dat.accountnumber} </td>
                                <td> ${dat.accountofficer} </td>
                                <td> ${formatCurrency(dat.credittotal)} </td>
                                <td> ${formatCurrency(dat.debittotal)} </td>
                                <td> ${getLocationById(dat.location)} </td> 
                                <td> ${dat.transactiondate.split(' ')[0]} </td>
                                <td> ${dat.reference} </td>
                            </tr>`)
    }).join('')
    }
    
var viewbranchfundtransferorehistoryorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewbranchfundtransferorehistory_datasource.length) {
        viewbranchfundtransferorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewbranchfundtransferorehistoryorehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("viewbranchfundtransferorehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletestockviewbranchfundtransferentry=(id)=>{
    const run=(result)=>{
       function paramsviewbranchfundtransfer(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('viewbranchfundtransferlocation').value);
        paramstr.append('startdate', document.getElementById('viewbranchfundtransferstartdate').value);
        paramstr.append('enddate', document.getElementById('viewbranchfundtransferenddate').value);
            return paramstr;
        };
        
        callController('fetchviewbranchfundtransferscript.php', paramsviewbranchfundtransfer(), 'fetchviewbranchfundtransferscript', ['viewbranchfundtransferenddate', 'viewbranchfundtransferstartdate', 'viewbranchfundtransferlocation'], populateviewbranchfundtransfertable);
    }
    function parammm(){
    var paramstr = new FormData();
    paramstr.append('id', id);
        return paramstr;
    };
    callController('removeviewbranchfundtransfer.php', parammm(), 'removeviewbranchfundtransfer', null, run)
}

function appendviewbranchfundtransferorehistoryorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("viewbranchfundtransferorehistorytablecontent").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLabelFromValue(dat.accountnumber,'viewbranchfundtransferaccounts')} </td>
                                <td> ${dat.accountnumber} </td>
                                <td> ${dat.accountofficer} </td>
                                <td> ${dat.transactiondate.split(' ')[0]} </td>
                                <td> ${formatCurrency(dat.credittotal)} </td>
                                <td> ${formatCurrency(dat.debittotal)} </td>
                                <td> ${getLocationById(dat.location)} </td> 
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button class="hidden" onclick="sessionStorage.setItem('editviewbranchfundtransferdata', '${dat.id} ${dat.location}');document.getElementById('branchfundtransfer').click()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletestockviewbranchfundtransferentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 


const checkviewbranchfundtransferuserstatus =(result)=>{
        // console.log(document.getElementById('viewbranchfundtransferlocation'))
        if(document.getElementById('viewbranchfundtransferlocation'))document.getElementById('viewbranchfundtransferlocation').value = result.location_id;
    if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
        if(document.getElementById('viewbranchfundtransferlocation'))document.getElementById('viewbranchfundtransferlocation').setAttribute('readonly', false);
    }else{
        if(document.getElementById('viewbranchfundtransferlocation'))document.getElementById('viewbranchfundtransferlocation').setAttribute('readonly', true)
    }
}

const viewbranchfundtransferaccounts =(result)=>{
    if(document.getElementById('branchfundtransferaccounts'))document.getElementById('branchfundtransferaccounts').innerHTML = result.data.map(dat=>`<option value="${dat.accountnumber}">${dat.accountnumber}</option>`)
}

const accountnumberviewbranchfundtransfer =(result)=>{
        if(document.getElementById('viewbranchfundtransferaccounts'))document.getElementById('viewbranchfundtransferaccounts').innerHTML = result.data.map(dat=>{
            let namedd = `${dat.customerdetail.lastname} ${dat.customerdetail.firstname}`;
            return(`<option value="${dat.accountdetail.accountnumber}"> ${namedd} </option>`)
            
        })
}

async function viewbranchfundtransfer () {
    await httpRequest('viewbranchfundtransfer.php', 'override');
    
    callController('fetchallaccountsprofile.php',null, 'fetchallaccountsprofile', null, accountnumberviewbranchfundtransfer);
    
      jtabledata = document.getElementById('viewbranchfundtransferorehistorytablecontent');
        initializePaginationParams();
    
    if(document.getElementById('viewbranchfundtransferfetchview'))document.getElementById('viewbranchfundtransferfetchview').addEventListener('click', e=>{
        function paramsviewbranchfundtransfer(){
        var paramstr = new FormData();
        paramstr.append('location', document.getElementById('viewbranchfundtransferlocation').value);
        paramstr.append('startdate', document.getElementById('viewbranchfundtransferstartdate').value);
        paramstr.append('enddate', document.getElementById('viewbranchfundtransferenddate').value);
            return paramstr;
        };
        
        callController('fetchbranchfundtransfer.php', paramsviewbranchfundtransfer(), 'fetchbranchfundtransfer', ['viewbranchfundtransferenddate', 'viewbranchfundtransferstartdate', 'viewbranchfundtransferlocation'], populateviewbranchfundtransfertable);
    })
    
    if(document.getElementById('viewbranchfundtransferlocation'))document.getElementById('viewbranchfundtransferlocation').innerHTML = `<option value="" disabled>Select Item</option>`
    if(document.getElementById('viewbranchfundtransferlocation'))document.getElementById('viewbranchfundtransferlocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
    
    function getpermissionsParamsviewbranchfundtransfer(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsviewbranchfundtransfer(), 'fetchuserprofile', null, checkviewbranchfundtransferuserstatus);
    
      if(document.getElementById('viewviewbranchfundtransferexport'))document.getElementById('viewviewbranchfundtransferexport').addEventListener('click',e=>{
            tableToExcel('viewbranchfundtransferoretable2', 'LIST OF RETURNS')},false);
        if(document.getElementById('viewviewbranchfundtransferprint'))document.getElementById('viewviewbranchfundtransferprint').addEventListener('click',e=>{
            printContent('LIST OF RETURNS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewbranchfundtransferorefulltableparant')},false);


}

var viewbranchfundtransferNav = document.getElementById("viewbranchfundtransfer");
if (viewbranchfundtransferNav) viewbranchfundtransferNav.addEventListener("click", viewbranchfundtransfer, false);



// comfirm balance brought forward  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function confirmbalancebroughtforward () {
        await  httpRequest('confirmbalancebroughtforward.php')
        
        
        
        var  getAjaxObject = function(){
		var requeste;
		try{
			requeste = new XMLHttpRequest();
		}catch(error){
			try{
				requeste = new ActiveXobject('Microsoft.XMLHTTP');
			}catch(error){
				return 'Error';
			}
		}
		return requeste;
	};

	function validateBalBroughtForward(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var matenteraccountnumber = document.getElementById('matenteraccountnumber');
		var matbalance = document.getElementById('matbalance');
		var matunit = document.getElementById('matunit');
		var mataccountname = document.getElementById('mataccountname');
		var matbroughtforwarddeposit = document.getElementById('matbroughtforwarddeposit');
		var matpostby = document.getElementById('matpostby');
	   // var matDepartmentLocation = document.getElementById('matdepartmentlocation');
	
		
		
		if(matenteraccountnumber.value.length >10 || matenteraccountnumber.value.length < 10){
			mssg += 'Account number is Invalid <br />';			
			matenteraccountnumber.style.borderColor = 'red';
			flag =0;
		}
		else{
			matenteraccountnumber.style.borderColor = 'lightgray';
		}
		if(matunit.value.length < 1){
		    mssg += 'Unit is invalid'
		    matunit.style.borderColor = 'red';
			flag =0;
		}else{
		    matunit.style.borderColor = 'lightgray';
		}
		if(matbalance.value.length < 1){
		    mssg +='Balance is invalid'
		     matbalance.style.borderColor = 'red';
			flag =0;
		}else{
		    matbalance.style.borderColor = 'lightgray'; 
		}
		if(mataccountname.value.length < 1){
		    mssg +='Account name is invalid'
		    mataccountname.style.borderColor = 'red';
			flag =0;
		}else{
		  mataccountname.style.borderColor = 'lightgray';  
		}
		if(matbroughtforwarddeposit.value.length < 1){
		    mssg +='Brought forward is invalid'
		    matbroughtforwarddeposit.style.borderColor = 'red';
			flag =0;
		}else{
		     matbroughtforwarddeposit.style.borderColor = 'lightgray';
		}
		if(matpostby.value.length <1){
		    mssg +='Postby is invalid'
		     matpostby.style.borderColor = 'red';
			flag =0;
		}else{
		     matpostby.style.borderColor = 'lightgray';
		}
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
			 matpostby.style.borderColor = 'lightgray';
			 matbroughtforwarddeposit.style.borderColor = 'lightgray';
			 mataccountname.style.borderColor = 'lightgray'; 
			 matbalance.style.borderColor = 'lightgray';
			 matunit.style.borderColor = 'lightgray';
			 matenteraccountnumber.style.borderColor = 'lightgray';
				// matDepartmentLocation.style.borderColor = 'lightgray';
				

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getBalBroughtForwardParams(){
		var paramstr = new FormData();
	 		
		paramstr.append('department',document.getElementById('matdepartment').value);
// 		paramstr.append('location',document.getElementById('matdepartmentlocation').value);
// 		paramstr.append('status',document.getElementById('matdepartmentstatus').value )
// 		paramstr.append('id',document.getElementById('matdepartmentid').value )
	
        
		for (var pair of paramstr.entries()) {
            //   console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
            }

	   return paramstr;

	}


    var	saveBalBroughtForward = function(e){
	  showSpinner();
		
		if(!validateBalBroughtForward()){ 
		 hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/company.php',true);
		request.onreadystatechange = function(){
			if(request.readyState == 1){
				
			}
			if(request.readyState == 4 && request.status == 200){
				
				//  console.log('request.responseText', request.responseText);
			     let result = JSON.parse(request.responseText);
			     //console.log('result', result);
			     
			     let stat = 2;
                if(result.result === "Successful"){
                    stat = 1;
                    for(let i=0; i<document.getElementsByTagName('input').length; i++){
                        document.getElementsByTagName('input')[i].value = '';
                    }
                    for(let i=0; i<document.getElementsByTagName('select').length; i++){
                        document.getElementsByTagName('select')[i].value = '';
                    }
                    
                }else{
                    stat = 0;
                }
			     
			     callModal(result.result, stat)
				
			
				// if(request.responseText === "FAILED"){
				// 	(document.getElementById('loadingicon')).style.visibility = 'hidden';
				// 	(document.getElementById('loadingicon')).style.display = 'none';

				// 	var mbox = document.getElementById('messageBox');
				// 	document.getElementById('messageBox').innerHTML = "Login Failed";
				// 	mbox.style.display = 'block';
				// 	mbox.style.visibility = 'visible';
				// 	setTimeout(function(){
				// 		mbox.style.display = 'none';
				// 		mbox.style.visibility = 'hidden';

				// 	}, 3000);						
				// }else if(request.responseText === "SUCCESS"){
				// 	window.location.href = "companyinfo.php";
				// }else{
				// 	(document.getElementById('loadingicon')).style.visibility = 'hidden';
				// 	(document.getElementById('loadingicon')).style.display = 'none';

				// 	var mbox = document.getElementById('messageBox');
				// 	document.getElementById('messageBox').innerHTML = "MSG: " + request.responseText;
				// 	mbox.style.display = 'block';
				// 	mbox.style.visibility = 'visible';
				// 	setTimeout(function(){
				// 		mbox.style.display = 'none';
				// 		mbox.style.visibility = 'hidden';

				// 	}, 14000);						
					
				// }
			}else{
			    
			    hideSpinner();
				// (document.getElementById('loadingicon')).style.visibility = 'hidden';
				// (document.getElementById('loadingicon')).style.display = 'none';
				
				
			    //document.getElementById('loader').style.display = 'none';
				//sf = '<b>Error getting data</b>';
			}

			e.stopPropagation();
		}

		
		request.setRequestHeader('Connection','close');
		request.send(getDepartmentParams());

	}

    if(document.getElementById('matconfirmbroughtforwardbtn'))document.getElementById('matconfirmbroughtforwardbtn').addEventListener('click',validateBalBroughtForward,false);
   
    }
    
var confirmbalancebroughtforwardbtn = document.getElementById('confirmbalancebroughtforward')
if(confirmbalancebroughtforwardbtn) confirmbalancebroughtforwardbtn.addEventListener('click', e=>confirmbalancebroughtforward())

    
// counter post wrong account  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
       async function counterpostwrongaccountentry () {
        await  httpRequest('counterpostwrongaccountentry.php')
        
        
        
        var  getAjaxObject = function(){
		var requeste;
		try{
			requeste = new XMLHttpRequest();
		}catch(error){
			try{
				requeste = new ActiveXobject('Microsoft.XMLHTTP');
			}catch(error){
				return 'Error';
			}
		}
		return requeste;
	};

	function validateCounterpostwrongaccount(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var matbranch = document.getElementById('matbranch');
		var mataccountofficer = document.getElementById('mataccountofficer');
		var matcounter= document.getElementById('matcounter');
		var matgroup = document.getElementById('matgroup');
		var mattreatedstatus = document.getElementById('mattreatedstatus');
		var matconfirmstatus= document.getElementById('matconfirmstatus');
		var matfromaccountnumber= document.getElementById('matfromaccountnumber');
		var matfromfirstname= document.getElementById('matfromfirstname');
		var matfromlastname= document.getElementById('matfromlastname');
		var matfrommiddlename= document.getElementById('matfrommiddlename');
		var matfromamountpaid= document.getElementById('matfromamountpaid');
		var matfrombalance= document.getElementById('matfrombalance');
		var mattobranch= document.getElementById('mattobranch');
		var mattoaccountnumber= document.getElementById('mattoaccountnumber');
		var mattofirstname= document.getElementById('mattofirstname');
		var mattolastname= document.getElementById('mattolastname');
		var mattomiddlename= document.getElementById('mattomiddlename');
		var mattogroup= document.getElementById('mattogroup');
		var mattobalance= document.getElementById('mattobalance');
	   // var matDepartmentLocation = document.getElementById('matdepartmentlocation');
	
		
		
		if(matbranch.value.length < 1){
			mssg += 'Branch is Invalid <br />';			
			matbranch.style.borderColor = 'red';
			flag =0;
		}
		else{
			matbranch.style.borderColor = 'lightgray';
		}
			
		if(mataccountofficer.value.length < 1){
			mssg += 'Account officer is Invalid <br />';			
			mataccountofficer.style.borderColor = 'red';
			flag =0;
		}
		else{
			mataccountofficer.style.borderColor = 'lightgray';
		}
		if(matcounter.value.length < 1){
			mssg += 'Counter is Invalid <br />';			
			matcounter.style.borderColor = 'red';
			flag =0;
		}
		else{
			matcounter.style.borderColor = 'lightgray';
		}
		if(matgroup.value.length < 1){
			mssg += 'Group is Invalid <br />';			
			matgroup.style.borderColor = 'red';
			flag =0;
		}
		else{
			matgroup.style.borderColor = 'lightgray';
		}
		if(mattreatedstatus.value.length < 1){
			mssg += 'Treated status is Invalid <br />';			
			mattreatedstatus.style.borderColor = 'red';
			flag =0;
		}
		else{
			mattreatedstatus.style.borderColor = 'lightgray';
		}
		if(matconfirmstatus.value.length < 1){
			mssg += 'Confirm status is Invalid <br />';			
			matconfirmstatus.style.borderColor = 'red';
			flag =0;
		}
		else{
			matconfirmstatus.style.borderColor = 'lightgray';
		}
		if(matfromaccountnumber.value.length < 1){
			mssg += 'Account number is Invalid <br />';			
			matfromaccountnumber.style.borderColor = 'red';
			flag =0;
		}
		else{
			matfromaccountnumber.style.borderColor = 'lightgray';
		}
		if(matfromfirstname.value.length < 1){
			mssg += 'First name is Invalid <br />';			
			matfromfirstname.style.borderColor = 'red';
			flag =0;
		}
		else{
			matfromfirstname.style.borderColor = 'lightgray';
		}
		if(matfromlastname.value.length < 1){
			mssg += 'Last name is Invalid <br />';			
			matfromlastname.style.borderColor = 'red';
			flag =0;
		}
		else{
			matfromlastname.style.borderColor = 'lightgray';
		}
		if(matfrommiddlename.value.length < 1){
			mssg += 'Middle name is Invalid <br />';			
			matfrommiddlename.style.borderColor = 'red';
			flag =0;
		}
		else{
			matfrommiddlename.style.borderColor = 'lightgray';
		}
		if(matfrombalance.value.length < 1){
			mssg += 'Balance is Invalid <br />';			
			matfrombalance.style.borderColor = 'red';
			flag =0;
		}
		else{
			matfrombalance.style.borderColor = 'lightgray';
		}
		if(matfromamountpaid.value.length < 1){
			mssg += 'Amount paid is Invalid <br />';			
			matfromamountpaid.style.borderColor = 'red';
			flag =0;
		}
		else{
			matfromamountpaid.style.borderColor = 'lightgray';
		}
		
		if(mattobranch.value.length < 1){
			mssg += 'Branch is Invalid <br />';			
			mattobranch.style.borderColor = 'red';
			flag =0;
		}else{
			mattobranch.style.borderColor = 'lightgray';
		}
		
		if(mattoaccountnumber.value.length < 1){
			mssg += 'Account number is Invalid <br />';			
			mattoaccountnumber.style.borderColor = 'red';
			flag =0;
		}
		else{
		mattoaccountnumber.style.borderColor = 'lightgray';
		}
		if(mattofirstname.value.length < 1){
			mssg += 'First name is Invalid <br />';			
			mattofirstname.style.borderColor = 'red';
			flag =0;
		}
		else{
		    mattofirstname.style.borderColor = 'lightgray';
		}
		if(mattolastname.value.length < 1){
			mssg += 'Last name is Invalid <br />';			
			mattolastname.style.borderColor = 'red';
			flag =0;
		}
		else{
		    mattolastname.style.borderColor = 'lightgray';
		}
		if(mattomiddlename.value.length < 1){
			mssg += 'Middle name is Invalid <br />';			
			mattomiddlename.style.borderColor = 'red';
			flag =0;
		}
		else{
		    mattomiddlename.style.borderColor = 'lightgray';
		}
		if(mattogroup.value.length < 1){
			mssg += 'Group is Invalid <br />';			
			mattogroup.style.borderColor = 'red';
			flag =0;
		}
		else{
		    mattogroup.style.borderColor = 'lightgray';
		}
		if(mattobalance.value.length < 1){
			mssg += 'Balance is Invalid <br />';			
			mattobalance.style.borderColor = 'red';
			flag =0;
		}
		else{
		    mattobalance.style.borderColor = 'lightgray';
		}
		
		
		
		
		
		
		
// 		if(matDepartmentLocation.value.length < 1){
// 			mssg += 'Location is Invalid <br />';			
// 			matDepartmentLocation.style.borderColor = 'red';
// 			flag =0;
// 		}
// 		else if(matDepartmentLocation.value.length >50){
// 		    mssg += ' Location must not more than 50 characters';
// 		    matDepartmentmLocation.style.borderColor = "red";
// 		    flag = 0;
// 		}else{
// 			matDepartmentLocation.style.borderColor = 'lightgray';
// 		}
		
		
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				 mattobalance.style.borderColor = 'lightgray';
				 mattogroup.style.borderColor = 'lightgray';
				 mattomiddlename.style.borderColor = 'lightgray';
				 mattolastname.style.borderColor = 'lightgray';
				 mattofirstname.style.borderColor = 'lightgray';
				 matfrommiddlename.style.borderColor = 'lightgray';
				 matfromlastname.style.borderColor = 'lightgray';
				 matfromfirstname.style.borderColor = 'lightgray';
				 matfromamountpaid.style.borderColor = 'lightgray';
				 matfrombalance.style.borderColor = 'lightgray';
				 matfromaccountnumber.style.borderColor = 'lightgray';
				 matbranch.style.borderColor = 'lightgray';
				 mattobranch.style.borderColor = 'lightgray';
				 mattoaccountnumber.style.borderColor = 'lightgray';
				 mataccountofficer.style.borderColor = 'lightgray'
				 matcounter.style.borderColor = 'lightgray'
				 matgroup.style.borderColor = 'lightgray'
				 mattreatedstatus.style.borderColor = 'lightgray'
				 matconfirmstatus.style.borderColor = 'lightgray'
				 
				 
				// matDepartmentLocation.style.borderColor = 'lightgray';

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getCounterPostWrongParams(){
		var paramstr = new FormData();
	 		
		paramstr.append('department',document.getElementById('matdepartment').value);
// 		paramstr.append('location',document.getElementById('matdepartmentlocation').value);
// 		paramstr.append('status',document.getElementById('matdepartmentstatus').value )
// 		paramstr.append('id',document.getElementById('matdepartmentid').value )
	
        
		for (var pair of paramstr.entries()) {
            //   console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
            }

	   return paramstr;

	}


var	saveCounterPostWrong = function(e){
	  showSpinner();
		
		if(!validateDepartment()){ 
		 hideSpinner();
			return; 
		}
		
		var request = getAjaxObject();
		
		request.open('POST','../controllers/company.php',true);
		request.onreadystatechange = function(){
			if(request.readyState == 1){
				
			}
			if(request.readyState == 4 && request.status == 200){
				
				//  console.log('request.responseText', request.responseText);
			     let result = JSON.parse(request.responseText);
			     //console.log('result', result);
			     
			     let stat = 2;
                if(result.result === "Successful"){
                    stat = 1;
                    for(let i=0; i<document.getElementsByTagName('input').length; i++){
                        document.getElementsByTagName('input')[i].value = '';
                    }
                    for(let i=0; i<document.getElementsByTagName('select').length; i++){
                        document.getElementsByTagName('select')[i].value = '';
                    }
                    
                }else{
                    stat = 0;
                }
			     
			     callModal(result.result, stat)
				
			
				// if(request.responseText === "FAILED"){
				// 	(document.getElementById('loadingicon')).style.visibility = 'hidden';
				// 	(document.getElementById('loadingicon')).style.display = 'none';

				// 	var mbox = document.getElementById('messageBox');
				// 	document.getElementById('messageBox').innerHTML = "Login Failed";
				// 	mbox.style.display = 'block';
				// 	mbox.style.visibility = 'visible';
				// 	setTimeout(function(){
				// 		mbox.style.display = 'none';
				// 		mbox.style.visibility = 'hidden';

				// 	}, 3000);						
				// }else if(request.responseText === "SUCCESS"){
				// 	window.location.href = "companyinfo.php";
				// }else{
				// 	(document.getElementById('loadingicon')).style.visibility = 'hidden';
				// 	(document.getElementById('loadingicon')).style.display = 'none';

				// 	var mbox = document.getElementById('messageBox');
				// 	document.getElementById('messageBox').innerHTML = "MSG: " + request.responseText;
				// 	mbox.style.display = 'block';
				// 	mbox.style.visibility = 'visible';
				// 	setTimeout(function(){
				// 		mbox.style.display = 'none';
				// 		mbox.style.visibility = 'hidden';

				// 	}, 14000);						
					
				// }
			}else{
			    
			    hideSpinner();
				// (document.getElementById('loadingicon')).style.visibility = 'hidden';
				// (document.getElementById('loadingicon')).style.display = 'none';
				
				
			    //document.getElementById('loader').style.display = 'none';
				//sf = '<b>Error getting data</b>';
			}

			e.stopPropagation();
		}

		
		request.setRequestHeader('Connection','close');
		request.send(getDepartmentParams());

	}

if(document.getElementById('matcounterpostwrongbtn'))document.getElementById('matcounterpostwrongbtn').addEventListener('click',validateCounterpostwrongaccount,false);
        
        
        
    }
    
    var counterpostwrongaccountentrybtn = document.getElementById('counterpostwrongaccountentry')
    if(counterpostwrongaccountentrybtn) counterpostwrongaccountentrybtn.addEventListener('click', e=>counterpostwrongaccountentry())
    
    
    
// counter deposit incorrect amount  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
       async function counterdepositincorrectamountpaid () {
        await  httpRequest('counterdepositincorrectamountpaid.php')
    }
    
var counterdepositincorrectamountpaidbtn = document.getElementById("counterdepositincorrectamountpaid");
if (counterdepositincorrectamountpaidbtn) counterdepositincorrectamountpaidbtn.addEventListener("click", e=>counterdepositincorrectamountpaid());


// user confirm transaction  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
       async function userconfirmtransaction () {
        await  httpRequest('userconfirmtransaction.php')
    }
    
var userconfirmtransactionbtn = document.getElementById("userconfirmtransaction");
if (userconfirmtransactionbtn) userconfirmtransactionbtn.addEventListener("click", e=>userconfirmtransaction());


//  aggregated branch depost  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let originaldatafive = []; 
let originalmonths5 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let originaldataone5 = [12, 19, 5, 5, 2, 5, 12, 19, 5, 5, 2, 5];
let originaldatafive5 = []; 
let originalyear5 = '2025';
let originaltype5 = 'line';
let datasettt = {
      labels: '',
      datasets: [{
        label: 'No. of Savings',
        data: 'data1',
        borderWidth: 1
      },{
        label: 'Amounts Saved',
        data: 'data2',
        borderWidth: 1
      }]
    }
function truncateString(str) {
  if (str.length <= 15) {
    return str;
  } else {
    return str.slice(0, 15) + '...';
  }
}
const updatefivedatafromcontroller=(result)=>{
    originaldataone5 = []
    if(document.getElementById('aggregatedbranchdepositstabledataheader'))document.getElementById('aggregatedbranchdepositstabledataheader').innerHTML = `
        <th>month</th>
    `
    if(document.getElementById('aggregatedbranchdepositstabledataheader'))document.getElementById('aggregatedbranchdepositstabledataheader').innerHTML += result.data.map(dat=>`
            <th>${dat.branchname}</th>
                            
    `).join('')
    
 datasettt = {
  labels: originalmonths5,
  datasets: []
};

for (let i = 0; i < result.data.length; i++) {
  datasettt.datasets.push({
    label: result.data[i].branchname,
    data: result.data[i].detail.map(dat=>dat.totaldeposit).join(',').split(','),
    borderWidth: 1
  });
}

    
    // result.data.map(data=>{
    //     originaldataone5.push(data.totaldeposit == null ? 0 : Number(data.totaldeposit))
    // })
    if(document.getElementById('aggregatedbranchdepositstabledata'))document.getElementById('aggregatedbranchdepositstabledata').innerHTML = `
                            <tr style="display: flex;flex-direction:row;">
                                    ${result.data[0].detail.map((dat, index)=>`<td style="padding: 10px 8px;min-width:65px;width:fit-content;font-weight: bold">${dat.month == null ? 'null' : dat.month}</td>`).join('')}
                            </tr>`
    
    if(document.getElementById('aggregatedbranchdepositstabledata'))document.getElementById('aggregatedbranchdepositstabledata').innerHTML += result.data.map((dat, index)=>`
                            <tr style="display: flex;flex-direction:row;overflow: auto">
                                    ${result.data[index].detail.map((dat, index)=>`<td style="padding: 10px 8px;width:65px;">${dat.totaldeposit == null ? '0' : truncateString(formatCurrency(dat.totaldeposit))}</td>`).join('')}
                            </tr>`).join('')
    
    callChartfiveFilter()
}

function getLastFiveYears() {
  const currentYear = new Date().getFullYear(); // Get the current year
  const years = [currentYear]; // Initialize the array with the current year
  
  // Add the last five years to the array
  for (let i = 1; i <= 5; i++) {
    years.push(currentYear - i);
  }

  return years;
}


async function openaggregatedbranchdepositsanalysis () {
    await httpRequest('aggregatedbranchdeposits.php', 'override');
    
    let yarray = getLastFiveYears();
    yarray.map((data, index)=>{
        document.getElementById('fivedselectyear5').innerHTML += `<option ${index == 0 ? 'selected' : ''}>${data}</option>`
    }).join('')
    originalyear5 = document.getElementById('fivedselectyear5').value
    
    
    if(document.getElementById('fivedselectmonth5'))document.getElementById('fivedselectmonth5').addEventListener('change', e=>callChartfiveFilter(), true)
    if(document.getElementById('fivedselectyear5'))document.getElementById('fivedselectyear5').addEventListener('change', e=>callChartfiveFilter('year'), true)
    if(document.getElementById('fivedselectchart5'))document.getElementById('fivedselectchart5').addEventListener('change', e=>callChartfiveFilter(), true)
    
    
    callController('aggregatedbranchdeposits.php', null, 'aggregatedbranchdeposits', null, updatefivedatafromcontroller)
    
      if(document.getElementById('viewaggregatedbranchdepositsexport'))document.getElementById('viewaggregatedbranchdepositsexport').addEventListener('click',e=>{
            tableToExcel('aggregatedbranchdepositstabledatacontainer', 'AGGREGATED BRANCH DEPOSITS')},false);
        if(document.getElementById('viewaggregatedbranchdepositsprint'))document.getElementById('viewaggregatedbranchdepositsprint').addEventListener('click',e=>{
            printContent('AGGREGATED BRANCH DEPOSITS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'aggregatedbranchdepositstabledatacontainerwrapper')},false);

}

const callChartfiveFilter =(year)=>{
    if(year == 'year'){
        function paramsyear(){
            let paramstr = new FormData();
            paramstr.append('year', document.getElementById('fivedselectyear5').value);
            return paramstr;
        }
        callController('aggregatedbranchdeposits.php', paramsyear(), 'aggregatedbranchdeposits', null, updatefivedatafromcontroller)
    }
    let updatemonths5 =  originalmonths5;
    let updatedataone5 = originaldataone5;
    let updatedatafive5 = originaldatafive5;
    let updateyear5 = originalyear5;
    let updatetype5 = originaltype5;
    
    // FOR MONTH SELECT
    if(document.getElementById('fivedselectmonth5').value == 'FULL YEAR'){
        updatemonths5 = originalmonths5
        updatedataone5 = updatedataone5
        updatedatafive5 = updatedatafive5
    };
    if(document.getElementById('fivedselectmonth5').value == '1ST HALF OF THE YEAR'){
        updatemonths5 = originalmonths5.slice(0, 6)
        updatedataone5 = updatedataone5.slice(0, 6)
        updatedatafive5 = updatedatafive5.slice(0, 6)
    };
    if(document.getElementById('fivedselectmonth5').value == '2ND HALF OF THE YEAR'){
        updatemonths5 = originalmonths5.slice(6, 12)
        updatedataone5 = updatedataone5.slice(6, 12)
        updatedatafive5 = updatedatafive5.slice(6, 12)
    };
    if(document.getElementById('fivedselectmonth5').value == '1ST QUARTER OF THE YEAR'){
        updatemonths5 = originalmonths5.slice(0, 5)
        updatedataone5 = updatedataone5.slice(0, 5)
        updatedatafive5 = updatedatafive5.slice(0, 5)
    };
    if(document.getElementById('fivedselectmonth5').value == '2ND QUARTER OF THE YEAR'){
        updatemonths5 = originalmonths5.slice(5, 6)
        updatedataone5 = updatedataone5.slice(5, 6)
        updatedatafive5 = updatedatafive5.slice(5, 6)
    };
    if(document.getElementById('fivedselectmonth5').value == '5RD QUARTER OF THE YEAR'){
        updatemonths5 = originalmonths5.slice(6, 9)
        updatedataone5 = updatedataone5.slice(6, 9)
        updatedatafive5 = updatedatafive5.slice(6, 9)
    };
    if(document.getElementById('fivedselectmonth5').value == 'LAST QUARTER OF THE YEAR'){
        updatemonths5 = originalmonths5.slice(9, 12)
        updatedataone5 = updatedataone5.slice(9, 12)
        updatedatafive5 = updatedatafive5.slice(9, 12)
    };
    
    // FOR YEAR SELECT
    updateyear5 = document.getElementById('fivedselectyear5').value;
    
    // FOR CHART TYPE
    updatetype5 = document.getElementById('fivedselectchart5').value;
    
    callchartfive(updatemonths5, updatedataone5, updatedatafive5, updateyear5, updatetype5, 'destroy');
}

const callchartfive = (labal, data1, data2, year, typer, destroyer) =>{
    const ctx = document.getElementById('myChartfive');
    // if(destroyer == 'destroy')ctx.destroy();
            // Get the Chart.js instance from the canvas element
        const chartInstance = Chart.getChart(ctx);
        
        // Call the `destroy` method of the Chart.js instance
        if (chartInstance) {
          chartInstance.destroy();
        }
    let delayed;
    new Chart(ctx, {
    type: typer,
    data: datasettt,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        height: 500,
        plugins: {
      title: {
        display: true,
        text: `AGGREGATED BRANCH DEPOSITS ` ,
      },
      subtitle: {
        display: true,
        text: 'Click on the tab below to filter',
        color: 'blue',
        font: {
          size: 12,
          family: 'tahoma',
          weight: 'normal',
          style: 'italic'
        },
        padding: {
          bottom: 10
        }
       }
      },
         animation: {
              onComplete: () => {
                delayed = true;
              },
              delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                  delay = context.dataIndex * 600 + context.datasetIndex * 500;
                }
                return delay;
              },
        },
        scales: {
            x: {
        display: true,
        title: {
          display: true,
          text: year,
          color: '#911',
          font: {
            family: 'Comic Sans MS',
            size: 15,
            weight: 'bold',
            lineHeight: 1,
          },
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        }
      },
      y: {
         beginAtZero: true,
        // display: true,
        // title: {
        //   display: true,
        //   text: 'Value',
        //   color: '#191',
        //   font: {
        //     family: 'Times',
        //     size: 15,
        //     style: 'normal',
        //     lineHeight: 1
        //   },
        //   padding: {top: 50, left: 0, right: 0, bottom: 0}
        // }
      }
        }
    }
  });
}



var aggregatedbranchdepositsanalysis = document.getElementById('aggregatedbranchdeposits')
if(aggregatedbranchdepositsanalysis) aggregatedbranchdepositsanalysis.addEventListener('click', openaggregatedbranchdepositsanalysis, false)


// rrrr--------------------------------------------------------------------------------------------------------------------------------------------------------------
let rrrtransactionreport_datasource;



async function openrrrtransactionreport() {
    await httpRequest('rrrtransactionreport.php', 'override');

    initializePaginationParams();
    updateLocationCard();
    fetchDepositAccountOfficers()
    

    // Populate Location Dropdown
    const locationSelect = document.getElementById('rrrlocation');
    if (locationSelect) {
        locationSelect.innerHTML = `<option value="">--SELECT LOCATION--</option>`;
        locationSelect.innerHTML += resultOfLocations.map(dat => `<option value="${dat.id}">${dat.location}</option>`).join('');
    }

    // Function to get form parameters
    function param() {
        let pa = new FormData(document.getElementById('filterrrrtransactionreportform'));
        pa.append('marketer', document.getElementById('marketer1').tomselect.getValue())
        return pa;
    }

    // Event Listener for Generate Report Button
    const submitButton = document.getElementById('submit');
    if (submitButton) {
        submitButton.addEventListener('click', e => {
            callController('rrrtransactionreport.php', param(), 'rrrtransactionreport', null, rrrtransactionreporttabler);
        });
    }

    // Event Listener for Export to Excel Button
    const exportButton = document.getElementById('export-wl');
    if (exportButton) {
        exportButton.addEventListener('click', e => {
            tableToExcel('rrrtransactionreporttable', 'RRR Transaction Report');
        }, false);
    }

    // Event Listener for Print Button
    const printButton = document.getElementById('print-wl');
    if (printButton) {
        printButton.addEventListener('click', e => {
            printContent(
                'RRR Transaction Report',
                `<link rel="stylesheet" type="text/css" media="print" href="./css/index.css">
                 <link rel="stylesheet" type="text/css" media="print" href="./css/user.css">
                 <link rel="stylesheet" type="text/css" media="print" href="./css/style.css">
                 <link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,
                'rrrtransactionreporttable'
            );
        }, false);
    }

    // Event Listener for Location Change to Update Location Card
    if (locationSelect) {
        locationSelect.addEventListener('change', updateLocationCard);
    }
}

// Function to update the Location Card based on selected location
function updateLocationCard() {
    const locationSelect = document.getElementById('rrrlocation');
    const selectedLocationText = document.getElementById('selected-location');
    if (locationSelect && selectedLocationText) {
        const selectedOption = locationSelect.options[locationSelect.selectedIndex];
        // selectedLocationText.textContent = selectedOption.value ? selectedOption.text : 'All Locations';
    }
}

const rrrtransactionreporttabler = (result) => {
    rrrtransactionreport_datasource = result.data;
    if (rrrtransactionreport_datasource.length) {
        let totalDebit = 0;
        let totalCredit = 0;

        rrrtransactionreport_datasource.forEach((item, index) => {
                console.log('index', index)
                
                totalDebit += parseFloat(item.debittotal) || 0;
                totalCredit += parseFloat(item.credittotal) || 0;
        });
        
        document.getElementById('selected-location').textContent = rrrtransactionreport_datasource[0].locationname

        // Update Total Credit and Debit Card
        document.getElementById("total-debit").textContent = formatCurrency(totalDebit);
        document.getElementById("total-credit").textContent = formatCurrency(totalCredit);

        // Update Table Footer Totals
        document.getElementById("table-total-debit").textContent = formatCurrency(totalDebit);
        document.getElementById("table-total-credit").textContent = formatCurrency(totalCredit);
    } else {
        tableData.innerHTML = renderNoTableData();
        // Reset Totals
        document.getElementById("total-debit").textContent = formatCurrency(0);
        document.getElementById("total-credit").textContent = formatCurrency(0);
        document.getElementById("table-total-debit").textContent = formatCurrency(0);
        document.getElementById("table-total-credit").textContent = formatCurrency(0);
    }
    initPagination(rrrtransactionreport_datasource, rrrtransactionreportSetCurrentPage);
};

var rrrtransactionreportSetCurrentPage = (pageNum) => {
    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;
    const tableData = document.getElementById("jtabledata");
    tableData.innerHTML = '';

    if (rrrtransactionreport_datasource.length) {
        let totalDebit = 0;
        let totalCredit = 0;

        rrrtransactionreport_datasource.forEach((item, index) => {
            if (index >= prevRange && index < currRange) {
                appendrrrtransactionreportdatasourceorehistoryTableRows(item, index, tableData);
                totalDebit += parseFloat(item.debittotal) || 0;
                totalCredit += parseFloat(item.credittotal) || 0;
            }
        });
        
        document.getElementById('selected-location').textContent = rrrtransactionreport_datasource[0].locationname

        // Update Total Credit and Debit Card
    } else {
        tableData.innerHTML = renderNoTableData();
        // Reset Totals
        document.getElementById("total-debit").textContent = formatCurrency(0);
        document.getElementById("total-credit").textContent = formatCurrency(0);
        document.getElementById("table-total-debit").textContent = formatCurrency(0);
        document.getElementById("table-total-credit").textContent = formatCurrency(0);
    }
};

// Function to append rows to the table
function appendrrrtransactionreportdatasourceorehistoryTableRows(dat, index, tableData) {
    const row = document.createElement("tr");
    row.classList.add("source-row-item");

    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${formatDate(dat.transactiondate)}</td>
        <td>${dat.description}</td>  
        <td>${dat.reference}</td>
        <td>${dat.accountofficer}</td>
        <td>${dat.marketername}</td> 
        <td>${formatCurrency(dat.debittotal)}</td>
        <td>${formatCurrency(dat.credittotal)}</td> 
    `;

    tableData.appendChild(row);
}

// Initialize the Report when the DOM is fully loaded
    const rrrtransactionreport = document.getElementById('rrrtransactionreport');
    if (rrrtransactionreport) {
        rrrtransactionreport.addEventListener('click', openrrrtransactionreport, false);
    }


