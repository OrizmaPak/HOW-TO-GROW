let originaldatathree = []; 
let originalmonths3 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let originaldataone3 = [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3];
let originaldatathree3 = []; 
let originalyear3 = '2023';
let originaltype3 = 'line'

const updatethreedatafromcontroller=(result)=>{
    originaldataone3 = []
    result.data.map(data=>{
        originaldataone3.push(data.totalcredit == null ? 0 : Number(data.totalcredit))
    })
    callChartthreeFilter()
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


async function opensavingsdepositanalysis () {
    await httpRequest('savingsdepositanalysis.php', 'override');
    
    let yarray = getLastFiveYears();
    yarray.map((data, index)=>{
        document.getElementById('threedselectyear3').innerHTML += `<option ${index == 0 ? 'selected' : ''}>${data}</option>`
    }).join('')
    originalyear3 = document.getElementById('threedselectyear3').value
    
    
    if(document.getElementById('threedselectmonth3'))document.getElementById('threedselectmonth3').addEventListener('change', e=>callChartthreeFilter(), true)
    if(document.getElementById('threedselectyear3'))document.getElementById('threedselectyear3').addEventListener('change', e=>callChartthreeFilter('year'), true)
    if(document.getElementById('threedselectchart3'))document.getElementById('threedselectchart3').addEventListener('change', e=>callChartthreeFilter(), true)
    
    
    callController('savingsdepositanalysis.php', null, 'savingsdepositanalysis', null, updatethreedatafromcontroller)
}

const callChartthreeFilter =(year)=>{
    if(year == 'year'){
        function paramsyear(){
            let paramstr = new FormData();
            paramstr.append('year', document.getElementById('threedselectyear3').value);
            return paramstr;
        }
        callController('savingsdepositanalysis.php', paramsyear(), 'savingsdepositanalysis', null, updatethreedatafromcontroller)
    }
    let updatemonths3 =  originalmonths3;
    let updatedataone3 = originaldataone3;
    let updatedatathree3 = originaldatathree3;
    let updateyear3 = originalyear3;
    let updatetype3 = originaltype3;
    
    // FOR MONTH SELECT
    if(document.getElementById('threedselectmonth3').value == 'FULL YEAR'){
        updatemonths3 = originalmonths3
        updatedataone3 = updatedataone3
        updatedatathree3 = updatedatathree3
    };
    if(document.getElementById('threedselectmonth3').value == '1ST HALF OF THE YEAR'){
        updatemonths3 = originalmonths3.slice(0, 6)
        updatedataone3 = updatedataone3.slice(0, 6)
        updatedatathree3 = updatedatathree3.slice(0, 6)
    };
    if(document.getElementById('threedselectmonth3').value == '2ND HALF OF THE YEAR'){
        updatemonths3 = originalmonths3.slice(6, 12)
        updatedataone3 = updatedataone3.slice(6, 12)
        updatedatathree3 = updatedatathree3.slice(6, 12)
    };
    if(document.getElementById('threedselectmonth3').value == '1ST QUARTER OF THE YEAR'){
        updatemonths3 = originalmonths3.slice(0, 3)
        updatedataone3 = updatedataone3.slice(0, 3)
        updatedatathree3 = updatedatathree3.slice(0, 3)
    };
    if(document.getElementById('threedselectmonth3').value == '2ND QUARTER OF THE YEAR'){
        updatemonths3 = originalmonths3.slice(3, 6)
        updatedataone3 = updatedataone3.slice(3, 6)
        updatedatathree3 = updatedatathree3.slice(3, 6)
    };
    if(document.getElementById('threedselectmonth3').value == '3RD QUARTER OF THE YEAR'){
        updatemonths3 = originalmonths3.slice(6, 9)
        updatedataone3 = updatedataone3.slice(6, 9)
        updatedatathree3 = updatedatathree3.slice(6, 9)
    };
    if(document.getElementById('threedselectmonth3').value == 'LAST QUARTER OF THE YEAR'){
        updatemonths3 = originalmonths3.slice(9, 12)
        updatedataone3 = updatedataone3.slice(9, 12)
        updatedatathree3 = updatedatathree3.slice(9, 12)
    };
    
    // FOR YEAR SELECT
    updateyear3 = document.getElementById('threedselectyear3').value;
    
    // FOR CHART TYPE
    updatetype3 = document.getElementById('threedselectchart3').value;
    
    callchartthree(updatemonths3, updatedataone3, updatedatathree3, updateyear3, updatetype3, 'destroy');
}

const callchartthree = (labal, data1, data2, year, typer, destroyer) =>{
    const ctx = document.getElementById('myChartthree');
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
    data: {
      labels: labal,
      datasets: [{
        label: 'No. of Savings',
        data: data1,
        borderWidth: 1
      },{
        label: 'Amounts Saved',
        data: data2,
        borderWidth: 1
      }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        height: 300,
        plugins: {
      title: {
        display: true,
        text: `SAVINGS ` ,
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
        //   padding: {top: 30, left: 0, right: 0, bottom: 0}
        // }
      }
        }
    }
  });
}



var savingsdepositanalysis = document.getElementById('savingsdepositanalysis')
if(savingsdepositanalysis) savingsdepositanalysis.addEventListener('click', opensavingsdepositanalysis, false)