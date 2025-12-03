async function openStockStatusReport() {
    await httpRequest('stockstatusreport.php')
    jtabledata = document.getElementById('jtabledata')
    await fetchStockReportData()
}

async function fetchStockReportData() {
    let result = await httpJsonRequest('../controllers/fetchstockstatus.php')
    if(result?.status) {
        console.log('stock result', result)
        stockstatuslist = result.data
        stockstatuslist.length && renderStockStatusTable()
    }
}

function renderStockStatusTable() {
    if(jtabledata) jtabledata.innerHTML = '';
    let cost = 0
    let qty = 0
    let stockval = 0
    stockstatuslist.map((item, index) => {
        cost = cost + Number(item.cost)
        qty = qty + Number(item.stockbalance)
        stockval = stockval + (Number(item.stockbalance)*Number(item.cost))
        jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.itemid}</td>
            <td>${item.itemname}</td>
            <td>${item.itemclass}</td>
            <td>${item.itemtype}</td>
            <td>${naira} ${formatCurrency(item.cost)}</td>
            <td>${item.stockbalance}</td>
            <td>${naira} ${formatCurrency(Number(item.stockbalance)*Number(item.cost))}</td>
        </tr>
    `
    })
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>TOTAL:</td>
            <td>${naira} ${formatCurrency(cost)}</td>
            <td>${formatCurrency(stockval)}</td>
            <td>${naira} ${formatCurrency(stockval)}</td>
        </tr>
    `
    if(document.querySelector('#stockstatustable tbody').innerHTML === '') stockstatusreportbtn.click()
}

let stockstatusreportbtn = document.getElementById('stockstatusreport')
if(stockstatusreportbtn) stockstatusreportbtn.addEventListener('click', openStockStatusReport)