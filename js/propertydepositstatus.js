var form; datasource = []; var propertydepositstatuses; 

var pdschartdata = {}

const pdsconfig = {
  type: 'bar',
  data: pdschartdata,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    height: 400,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Percentage levels of property account payments'
      }
    }
  },
};

async function openPropertyDepositStatus() {
    await httpRequest('propertydepositstatus.php')
    
    form = document.getElementById('filterpropertydepositstatusform')

    if(document.querySelector('button#submit')) document.querySelector('button#submit').addEventListener('click', generatePropertyDepositStatusReport)
    document.querySelector('button#print-pds').addEventListener('click', printPropertyDepositStatusTable)
    document.querySelector('button#export-pds').addEventListener('click', exportPropertyDepositStatusTable)
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(propertyDepositStatusSetCurrentPage)
    
}

function plotPdsChart(propertydepositstatuses) {
    
    let ctx =  document.getElementById('pdschart')
    pdschartdata.labels = propertydepositstatuses.map( item => item.accountnumber )
    var dataset =  propertydepositstatuses.map( item => item.paidpercentage )
    pdschartdata.datasets = [
        {
            label: 'Property Deposit', 
            data: dataset, 
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: ['rgb(54, 162, 235)'],
            borderWidth: 1
            
        }
    ]
    
    destroyPdsChart()
    new Chart(ctx, pdsconfig)
}

function destroyPdsChart() {
    let ctx =  document.getElementById('pdschart')
    const chartInstance = Chart.getChart(ctx);
    if (chartInstance) {
        chartInstance.destroy();
        // chartInstance?.clear();
    }
}

function printPropertyDepositStatusTable() {
    if(propertydepositstatuses.length) printContent('Property Deposit Status', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'jpagecontent')
}

function exportPropertyDepositStatusTable() {
    if(propertydepositstatuses.length) tableToExcel('propertydepositstatustable', 'property_deposit_status')
}

async function generatePropertyDepositStatusReport() {
    let paramstr = new FormData(form)
    let result = await httpJsonRequest('../controllers/propertydepositstatus.php', 'POST', paramstr)
    if(result.status) {
        propertydepositstatuses = datasource = result.data;
        if(propertydepositstatuses.length) {
            initPagination(propertydepositstatuses, propertyDepositStatusSetCurrentPage)
            plotPdsChart(propertydepositstatuses)
        }
        else {
            callModal('No records returned')
            destroyPdsChart()
        }
    }
    else {
        if(jtabledata) jtabledata.innerHTML = '';
        callModal(result.message, 0)
        destroyPdsChart()
    }
}


function propertyDepositStatusSetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(propertydepositstatuses.length) {
        propertydepositstatuses.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendPropertyDepositStatusesTableRows(item, index)
            }
        })
        if(document.querySelector('#propertydepositstatustable tbody').innerHTML === '') openPropertyDepositStatus()
    }
}

async function appendPropertyDepositStatusesTableRows(item, index) {
    jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${item.accountnumber}</td>
            <td>${item.accountname}</td>
            <td>${new Date(item.registrationdate).toLocaleDateString() }</td>
            <td>${new Date(item.expectedmaturitydate).toLocaleDateString()}</td>
            <td>${item.totalamount == '-1' ? '-' : formatMoney(Math.abs(item.totalamount)) }</td>
            <td>${item.paidamount == '-1' ? '-' :  formatMoney(Math.abs(item.paidamount))}</td>
            <td>${item.paidpercentage !== undefined ? (item.paidpercentage + '%') :  '' }</td>
            <td>${item.stockstatus}</td>
            <td class="flex no-pr">
                <div style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" value="${index}" onclick="acquirePropertyAccount(${index})">Acquire</button>
                </div>
            </td>
        </tr>
    `
} 

async function acquirePropertyAccount(index) {
    let selecteditem = propertydepositstatuses[index]
    if(confirm('Are you sure you want to proceed?')) {
        if(selecteditem) {
            let paramstr = new FormData()
            paramstr.append('stockstatus', 'ACQUIRED')
            paramstr.append('accountnumber', selecteditem?.accountnumber)
            
            let result = await httpJsonRequest('../controllers/togglepropertyacquisition.php', 'POST', paramstr)
            if(result) {
                let res = JSON.parse(JSON.stringify(result))
                console.log(result, res, res.status)
                if(res.status) {
                    callModal('Property status saved successfully', 1)
                    generatePropertyDepositStatusReport()
                }
                else return callModal(res.message, 0)
            }
            else return callModal('Error: Unable to complete task', 0)
        }
    }
}


var propertydepositstatusbtn = document.getElementById('propertydepositstatus')
if(propertydepositstatusbtn) propertydepositstatus.addEventListener('click', openPropertyDepositStatus, false)