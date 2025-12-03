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
            for(let i=2020; i <= new Date().getFullYear(); i++) {
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


function netTransactionSetCurrentPage (pageNum){

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
        
        if (pageCount === currentPage) renderTableNetTransactionFooter()
        else {
            try {
                document.querySelector('#nettransactiontable #tablefooter')?.remove()
            }
            catch(e) {console.log(e)}
        }
        
        if(document.querySelector('#nettransactiontable tbody').innerHTML === '') nettransactionbtn.click()
    }
}

function renderTableNetTransactionFooter() {
    
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

     document.querySelector('#nettransactiontable tbody').innerHTML += `
        <tr id="tablefooter">
            <td style="text-transform: uppercase;text-align: left;font-weight:bold" colspan="${form.location.value !== '0' ? 3 : 2}"> total </td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(dailydeposit)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(dailyrrr)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(cashfrombank)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(cashfrombranch)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(loanrepayments)}</td> 
            <td style="text-align:left;font-weight:bold;">${formatMoney(cashfromproperty)}</td>
            <td style="text-align:left;font-weight:bold;border-right-color: black">${formatMoney(totalcredit)}</td>
            
            <td style="text-align:left;font-weight:bold;">${formatMoney(dailyexpenses)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(cashpayments)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(bankpayments)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(cashtobank)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(nia)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(returnedcash)}</td>
            <td style="text-align:left;font-weight:bold;">${formatMoney(totaldebit)}</td>
           
        </tr>
    `
    //  <td style="text-align:left;font-weight:bold;">${formatMoney(totalcredit - totaldebit)}</td>
}

async function appendNetTransactionTableRows(item, index) {
   
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ new Date(item.date).toLocaleDateString() }</td>
            <td style="display: ${form.location.value !== '0' ? 'block' : 'none' }">${item.location.toUpperCase()}</td>
            <td style="text-align:left">${formatMoney(item.dailydeposit)}</td>
            <td style="text-align:left">${formatMoney(item.dailyrrr)}</td>
            <td style="text-align:left">${formatMoney(item.cashfrombank)}</td>
            <td style="text-align:left">${formatMoney(item.cashfrombranch)}</td>
            <td style="text-align:left">${formatMoney(item.loanrepayments)}</td>
            <td style="text-align:left">${formatMoney(item.cashfromproperty)}</td>
            <td style="text-align:left;border-right-color:black">${formatMoney(item.totalcredit)}</td>
            
            <td style="text-align:left">${formatMoney(item.dailyexpenses)}</td>
            <td style="text-align:left">${formatMoney(item.cashpayments)}</td>
            <td style="text-align:left">${formatMoney(item.bankpayments)}</td>
             <td style="text-align:left">${formatMoney(item.cashtobank)}</td>
            <td style="text-align:left">${formatMoney(item.nia)}</td>
            <td style="text-align:left">${formatMoney(item.returnedcash)}</td>
            <td style="text-align:left">${formatMoney(item.totaldebit)}</td>
         
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
            form.querySelector('#location').innerHTML = '<option value="0">ALL</option>'+options
            form.querySelector('#location').value = assetsUrl.sessionLocation
        }
    }
}

var nettransactionbtn = document.getElementById('nettransaction')
if(nettransactionbtn) nettransactionbtn.addEventListener('click', openNetTransaction, false)