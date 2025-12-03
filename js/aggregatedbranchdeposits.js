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