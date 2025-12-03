let originaldatafour = []; 
let originalmonths4 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let originaldataone4 = [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3];
let originaldatafour4 = []; 
let originalyear4 = '2023';
let originaltype4 = 'line'

const updatefourdatafromcontroller=(result)=>{
    originaldataone4 = []
    result.data.map(data=>{
        originaldataone4.push(data.totalcredit == null ? 0 : Number(data.totalcredit))
    })
    callChartfourFilter4()
}

function getLastFiveYearsfour() {
  const currentYear = new Date().getFullYear(); // Get the current year
  const years = [currentYear]; // Initialize the array with the current year
  
  // Add the last five years to the array
  for (let i = 1; i <= 5; i++) {
    years.push(currentYear - i);
  }

  return years;
}


async function openpropertydepositanalysisfour () {
    await httpRequest('propertydepositanalysis.php', 'override');
    
    let yarray = getLastFiveYearsfour();
    yarray.map((data, index)=>{
        document.getElementById('threedselectyear4').innerHTML += `<option ${index == 0 ? 'selected' : ''}>${data}</option>`
    }).join('')
    originalyear4 = document.getElementById('threedselectyear4').value
    
    
    if(document.getElementById('threedselectmonth4'))document.getElementById('threedselectmonth4').addEventListener('change', e=>callChartfourFilter4(), true)
    if(document.getElementById('threedselectyear4'))document.getElementById('threedselectyear4').addEventListener('change', e=>callChartfourFilter4('year'), true)
    if(document.getElementById('threedselectchart4'))document.getElementById('threedselectchart4').addEventListener('change', e=>callChartfourFilter4(), true)
    
    
    callController('propertydepositanalysis.php', null, 'propertydepositanalysis', null, updatefourdatafromcontroller)
}

const callChartfourFilter4 =(year)=>{
    if(year == 'year'){
        function paramsyear(){
            let paramstr = new FormData();
            paramstr.append('year', document.getElementById('threedselectyear4').value);
            return paramstr;
        }
        callController('propertydepositanalysis.php', paramsyear(), 'propertydepositanalysis', null, updatefourdatafromcontroller)
    }
    let updatemonths4 =  originalmonths4;
    let updatedataone4 = originaldataone4;
    let updatedatafour4 = originaldatafour4;
    let updateyear4 = originalyear4;
    let updatetype4 = originaltype4;
    
    // FOR MONTH SELECT
    if(document.getElementById('threedselectmonth4').value == 'FULL YEAR'){
        updatemonths4 = originalmonths4
        updatedataone4 = updatedataone4
        updatedatafour4 = updatedatafour4
    };
    if(document.getElementById('threedselectmonth4').value == '1ST HALF OF THE YEAR'){
        updatemonths4 = originalmonths4.slice(0, 6)
        updatedataone4 = updatedataone4.slice(0, 6)
        updatedatafour4 = updatedatafour4.slice(0, 6)
    };
    if(document.getElementById('threedselectmonth4').value == '2ND HALF OF THE YEAR'){
        updatemonths4 = originalmonths4.slice(6, 12)
        updatedataone4 = updatedataone4.slice(6, 12)
        updatedatafour4 = updatedatafour4.slice(6, 12)
    };
    if(document.getElementById('threedselectmonth4').value == '1ST QUARTER OF THE YEAR'){
        updatemonths4 = originalmonths4.slice(0, 3)
        updatedataone4 = updatedataone4.slice(0, 3)
        updatedatafour4 = updatedatafour4.slice(0, 3)
    };
    if(document.getElementById('threedselectmonth4').value == '2ND QUARTER OF THE YEAR'){
        updatemonths4 = originalmonths4.slice(3, 6)
        updatedataone4 = updatedataone4.slice(3, 6)
        updatedatafour4 = updatedatafour4.slice(3, 6)
    };
    if(document.getElementById('threedselectmonth4').value == '3RD QUARTER OF THE YEAR'){
        updatemonths4 = originalmonths4.slice(6, 9)
        updatedataone4 = updatedataone4.slice(6, 9)
        updatedatafour4 = updatedatafour4.slice(6, 9)
    };
    if(document.getElementById('threedselectmonth4').value == 'LAST QUARTER OF THE YEAR'){
        updatemonths4 = originalmonths4.slice(9, 12)
        updatedataone4 = updatedataone4.slice(9, 12)
        updatedatafour4 = updatedatafour4.slice(9, 12)
    };
    
    // FOR YEAR SELECT
    updateyear4 = document.getElementById('threedselectyear4').value;
    
    // FOR CHART TYPE
    updatetype4 = document.getElementById('threedselectchart4').value;
    
    callchartfour(updatemonths4, updatedataone4, updatedatafour4, updateyear4, updatetype4, 'destroy');
}

const callchartfour = (labal, data1, data2, year, typer, destroyer) =>{
    const ctx = document.getElementById('myChartfour');
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
        text: `Property Deposit Analysis ` ,
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



var propertydepositanalysis = document.getElementById('propertydepositanalysis')
if(propertydepositanalysis) propertydepositanalysis.addEventListener('click', openpropertydepositanalysisfour, false)