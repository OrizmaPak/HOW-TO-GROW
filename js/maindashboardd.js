
// const originalmonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
// const originaldataone = [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3];
// const originaldatatwo = [1, 9, 13, 15, 22, 13, 32, 9, 31, 15, 4, 11]; 
let originalmonths = [] // x-axis
let originaldataone = [] // y-axis
let originaldatatwo = [];
const originalyear = '2023';
const originaltype = 'line'
const originalmonths2 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const originaldataone2 = [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3];
const originaldatatwo2 = [1, 9, 13, 15, 22, 13, 32, 9, 31, 15, 4, 11];
const originalyear2 = '2023';
const originaltype2 = 'line'
let startday
let endday
let themonth
let theyear

const setDate = (mm) => {
    // Get the current date
    const currentDate = new Date();
    if (mm) {
        themonth = mm
        theyear = document.getElementById('threedselectyear').value;
    } else {
        themonth = currentDate.getMonth() + 1;
        theyear = currentDate.getFullYear();
    }

    // Calculate the start and end dates of the current month
    const startDate = new Date(theyear, themonth, 1);
    const endDate = new Date(theyear, themonth + 1, 0);

    // Get the day numbers (1-indexed) for the start and end dates
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();

    // Set values for the select elements with IDs 'threedselectmonth' and 'threedselectyear'
    if (document.getElementById('threedselectmonth')) {
        document.getElementById('threedselectmonth').value = themonth.toString().padStart(2, '0');
    }

    if (document.getElementById('threedselectyear')) {
        document.getElementById('threedselectyear').value = theyear;
    }

    // Set the startday and endday variables
    startday = startDay;
    endday = endDay;

    // Use the startday and endday variables as needed in the rest of your code
    //   console.log("Start Day:", startday);
    //   console.log("End Day:", endday);
};
const setoriginalmonths = (num = 30) => {
    originalmonths = []
    for (let i = 1; i < num; i++) { originalmonths.push(i) }
}

async function maindashboardd() {
    await httpRequest('maindashboardd.php');
    
    await resolveUserAccessCards()
    
    // Call the function to set the variables
    setDate();
    
    document.getElementById('dashname').innerHTML = document.getElementById('sessionfirstname').value
    
    for (let i=0;i<document.getElementsByClassName('supadmin').length;i++){
        if(document.getElementById('sessionrole').value == 'SUPERADMIN'){
            document.getElementsByClassName('supadmin')[i].classList.remove('hidden')
        }else{
            document.getElementsByClassName('supadmin')[i].classList.add('hidden')
        }
        
    }
    
    if(document.getElementById('sessionrole').value == "SUPERADMIN"){
        document.getElementById('forsupadmin').classList.remove('hidden');
        document.getElementById('forusers').classList.add('hidden');
    }else{
        document.getElementById('forsupadmin').classList.add('hidden');
        document.getElementById('forusers').classList.remove('hidden');
    }

    function ddddparams() {
        var paramstr = new FormData();
        // 		2023-02-01
        paramstr.append('startdate', theyear + '-' + themonth.toString().padStart(2, '0') + '-' + startday.toString().padStart(2, '0'));
        paramstr.append('enddate', theyear + '-' + themonth.toString().padStart(2, '0') + '-' + endday.toString().padStart(2, '0'));
        return paramstr;
    }
    const setchartone1 = (result) => {
        setoriginalmonths(endday);
        // console.log('dta', result.data)
        if (result.data) {
            let colation = result.data.map(data => { return (`${data.transactiondate.split(' ')[0].split('-')[2]}, ${data.qty * data.cost}`).split(', ') });
            let colresult = colation.reduce((acc, [key, value]) => {
                const existingIndex = acc.findIndex(obj => obj.hasOwnProperty(key));
                if (existingIndex !== -1) {
                    acc[existingIndex][key] += Number(value);
                } else {
                    const newObj = { [key]: Number(value) };
                    acc.push(newObj);
                }
                return acc;
            }, []);
            // console.log('data', colresult)
            originaldataone = []
            for (let i = 0; i < endday; i++) {
                if (colresult.find(obj => obj.hasOwnProperty(i))) {
                    originaldataone.push(colresult.find(obj => obj.hasOwnProperty(i))[i])
                } else {
                    originaldataone.push('0')
                }
            }
            // console.log('final originaldataone', originaldataone)
            callchartone(originalmonths, originaldataone, originaldatatwo, originalyear, originaltype);
        } else {
            originaldataone = []
            for (let i = 0; i < endday; i++) {
                originaldataone.push('0')
            }
            callchartone(originalmonths, originaldataone, originaldatatwo, originalyear, originaltype);
        }

    }
    callController('fetchintakes.php', ddddparams(), 'fetchintakes', null, setchartone1, 'silent')
    callcharttwo(originalmonths2, originaldataone2, originaldatatwo2, originalyear2, originaltype2);
    if (document.getElementById('threedselectmonth')) document.getElementById('threedselectmonth').addEventListener('change', e => callChartoneFilter(), true)
    if (document.getElementById('threedselectyear')) document.getElementById('threedselectyear').addEventListener('change', e => callChartoneFilter(), true)
    if (document.getElementById('threedselectchart')) document.getElementById('threedselectchart').addEventListener('change', e => callChartoneFilter(), true)
    if (document.getElementById('threedselectmonth2')) document.getElementById('threedselectmonth2').addEventListener('change', e => callCharttwoFilter(), true)
    if (document.getElementById('threedselectyear2')) document.getElementById('threedselectyear2').addEventListener('change', e => callCharttwoFilter(), true)
    if (document.getElementById('threedselectchart2')) document.getElementById('threedselectchart2').addEventListener('change', e => callCharttwoFilter(), true)


    getPropertyAccount()

    getConsumable()

    getNonConsumable()

    getSavings()

    getPersonnels()

    if (document.getElementById('cardpropertyaccount')) {
        document.getElementById('cardpropertyaccount').addEventListener('click', function () {
            // console.log('hello are you there');
            document.getElementById('viewpropertyaccounts').click()
            // window.location.href = 'propertyaccount.php'
        })
    }


    if (document.getElementById('cardsavings')) {
        document.getElementById('cardsavings').addEventListener('click', function () {
            // console.log('hello are you there');
            document.getElementById('viewsavingsaccount').click()
            // window.location.href = 'propertyaccount.php'
        })
    }

    if (document.getElementById('cardconsumable')) {
        document.getElementById('cardconsumable').addEventListener('click', function () {
            // console.log('hello are you there');
            document.getElementById('viewinventorylist').click()
            // window.location.href = 'propertyaccount.php'
        })
    }

    if (document.getElementById('cardnonconsumable')) {
        document.getElementById('cardnonconsumable').addEventListener('click', function () {
            // console.log('hello are you there');
            document.getElementById('viewinventorylist').click()
            // window.location.href = 'propertyaccount.php'
        })
    }



    if (document.getElementById('cardpersonnel')) {
        document.getElementById('cardpersonnel').addEventListener('click', function () {
            // console.log('hello are you there');
            document.getElementById('viewpersonnel').click()
            // window.location.href = 'propertyaccount.php'
        })
    }

}


async function resolveUserAccessCards() {
    document.querySelector('.dashboardmain').style.display = 'none'
    try {
        let paramstr = new FormData()
        const [profileRes, savingsRes, propertiesRes, transactionsRes] = await Promise.all([
            fetch('../controllers/fetchuserprofile.php'),
            fetch('../controllers/fetchmysavings.php'),
            fetch('../controllers/fetchmypropertyaccounts.php'),
            fetch('../controllers/fetchmytransactions.php'),
        ])
        
        const profile = await profileRes.json()
        const savings = await savingsRes.json()
        const properties = await propertiesRes.json()
        const transactions = await transactionsRes.json()

        if(profile?.status) {
            const role = profile.role
            if(role !== 'SUPERADMIN') {
                const cardsArry = ['My Savings Accounts', 'My Property Accounts', 'My Daily Transactions']
                const template = document.getElementById('template')
                document.querySelector('.dashboardmain').innerHTML = ''
                
                const savingsCard = document.importNode(template.content, true)
                const savingsCardContent = savingsCard.querySelector('.dashboardcontent')
                savingsCardContent.children[0].innerHTML = cardsArry[0].toUpperCase()
                savingsCardContent.children[1].lastElementChild.innerHTML = savings.mysavingsaccounts ?? 0
                savingsCardContent.children[2].lastElementChild.innerHTML = 0
                document.querySelector('.dashboardmain').appendChild(savingsCard)
                
                const propertyCard = document.importNode(template.content, true)
                const propertyCardContent = propertyCard.querySelector('.dashboardcontent')
                propertyCardContent.children[0].innerHTML = cardsArry[1].toUpperCase()
                propertyCardContent.children[1].lastElementChild.innerHTML = properties.mypropertyaccounts ?? 0
                propertyCardContent.children[2].lastElementChild.innerHTML = 0
                document.querySelector('.dashboardmain').appendChild(propertyCard)
                
                const transactionsCard = document.importNode(template.content, true)
                const transactionsCardContent = transactionsCard.querySelector('.dashboardcontent')
                transactionsCardContent.children[0].innerHTML = cardsArry[2].toUpperCase()
                transactionsCardContent.children[1].lastElementChild.innerHTML = transactions.mytransactions ?? 0
                transactionsCardContent.children[2].lastElementChild.innerHTML = 0
                document.querySelector('.dashboardmain').appendChild(transactionsCard)
                
                
            }
        }
        else { 
            callModal(result.message, 0)
        }
        
        document.querySelector('.dashboardmain').style.display = 'grid'
        
    }
    catch(e) {console.log(e)}
}


function getSavings() {
    const requestItem = getAjaxObject();

    requestItem.open('POST', '../controllers/fetchsavingsaccounts.php', true);

    requestItem.onreadystatechange = function () {

        if (requestItem.readyState == 4 && requestItem.status == 200) {

            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('fetchaccount', result);
            const arrayOfSavings = result.data;
            // console.log('saving',arrayOfSavings)

            if (document.getElementById('msavings') && document.getElementById('sessionrole').value == 'SUPERADMIN') {
                document.getElementById('msavings').textContent = arrayOfSavings?.length || 0
                document.getElementById('msavings2').textContent = arrayOfSavings?.length || 0
            }else{
                document.getElementById('msavings').textContent = arrayOfSavings.filter(data=>data.customer == document.getElementById('sessionuserid').value)?.length || 0
                document.getElementById('msavings2').textContent = arrayOfSavings.filter(data=>data.customer == document.getElementById('sessionuserid').value)?.length || 0
                
            }
        }
        else {
            //   console.log("not success ",requestItem)
        }
    };

    requestItem.setRequestHeader('Connection', 'close');
    requestItem.send();
}


function getPersonnels() {
    const requestItem = getAjaxObject();

    requestItem.open('POST', '../controllers/fetchpersonnels.php', true);

    requestItem.onreadystatechange = function () {

        if (requestItem.readyState == 4 && requestItem.status == 200) {

            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('Personnel1', result);
            const arrayOfPersonnels = result.data;
            // console.log('Personnel',arrayOfPersonnels)

            if (document.getElementById('mpersonnel')) {
                // console.log(document.getElementById('mPropertyAccounts'))
                document.getElementById('mpersonnel').textContent = arrayOfPersonnels?.length || 0
                document.getElementById('mpersonnel2').textContent = arrayOfPersonnels?.length || 0
            }
        }
        else {
            //   console.log("not success ",requestItem)
        }
    };

    requestItem.setRequestHeader('Connection', 'close');
    requestItem.send();
}



function getPropertyAccount() {
    const requestItem = getAjaxObject();

    requestItem.open('POST', '../controllers/fetchpropertyaccounts.php', true);

    requestItem.onreadystatechange = function () {

        if (requestItem.readyState == 4 && requestItem.status == 200) {

            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('fetchaccount', result);
            const arrayOfPropertyAccount = result.data;
            // console.log(arrayOfPropertyAccount)

            if (document.getElementById('mPropertyAccounts')) {
                // console.log(document.getElementById('mPropertyAccounts'))
                document.getElementById('mPropertyAccounts').textContent = arrayOfPropertyAccount?.length || 0
                document.getElementById('mPropertyAccounts2').textContent = arrayOfPropertyAccount?.length || 0
            }
        }
        else {
            //   console.log("not success ",requestItem)
        }
    };

    requestItem.setRequestHeader('Connection', 'close');
    requestItem.send();
}

function consumable() {
    var paramstr = new FormData()
    paramstr.append('itemclass', 'Consumable')

    // for (var pair of paramstr.entries()) {
    //           console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
    //         }
    return paramstr
}
function getConsumable() {
    const requestItem = getAjaxObject();

    requestItem.open('POST', '../controllers/fetchinventorybyclass.php', true);

    requestItem.onreadystatechange = function () {

        if (requestItem.readyState == 4 && requestItem.status == 200) {

            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('fetchConsumable ', result);
            const arrayOfConsumable = result.data;
            // console.log(arrayOfConsumable.total )

            if (document.getElementById('mconsumable')) {
                document.getElementById('mconsumable').textContent = arrayOfConsumable?.total || 0
                document.getElementById('mconsumable2').textContent = arrayOfConsumable?.total || 0
            }
        }
        else {
            //   console.log("not success ",requestItem)
        }
    };

    requestItem.setRequestHeader('Connection', 'close');
    requestItem.send(consumable());
}

function nonConsumable() {
    var paramstr = new FormData()
    paramstr.append('itemclass', 'Non-Consumable')

    // for (var pair of paramstr.entries()) {
    //           console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
    //         }
    return paramstr
}

function getNonConsumable() {

    const requestItem = getAjaxObject();
    requestItem.open('POST', '../controllers/fetchinventorybyclass.php', true);
    requestItem.onreadystatechange = function () {
        if (requestItem.readyState == 4 && requestItem.status == 200) {
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('fetchNonConsumable ', result);
            const responseForNonConsumable = result.data;
            if (document.getElementById('mnonconsumable')) {
                document.getElementById('mnonconsumable').textContent = responseForNonConsumable?.total || 0
            }
        }
        else {
            //   console.log("not success ",requestItem)
        }
    };
    requestItem.setRequestHeader('Connection', 'close');
    requestItem.send(nonConsumable());
}









const callChartoneFilter = () => {
    let updatemonths;
    // let updatedataone = originaldataone;
    // let updatedatatwo = originaldatatwo;
    let updateyear = originalyear;
    let updatetype = originaltype;

    // // FOR MONTH SELECT
    // if(document.getElementById('threedselectmonth').value == 'FULL YEAR'){
    //     updatemonths = originalmonths
    //     updatedataone = updatedataone
    //     updatedatatwo = updatedatatwo
    // };
    // if(document.getElementById('threedselectmonth').value == '1ST HALF OF THE YEAR'){
    //     updatemonths = originalmonths.slice(0, 6)
    //     updatedataone = updatedataone.slice(0, 6)
    //     updatedatatwo = updatedatatwo.slice(0, 6)
    // };
    // if(document.getElementById('threedselectmonth').value == '2ND HALF OF THE YEAR'){
    //     updatemonths = originalmonths.slice(6, 12)
    //     updatedataone = updatedataone.slice(6, 12)
    //     updatedatatwo = updatedatatwo.slice(6, 12)
    // };
    // if(document.getElementById('threedselectmonth').value == '1ST QUARTER OF THE YEAR'){
    //     updatemonths = originalmonths.slice(0, 3)
    //     updatedataone = updatedataone.slice(0, 3)
    //     updatedatatwo = updatedatatwo.slice(0, 3)
    // };
    // if(document.getElementById('threedselectmonth').value == '2ND QUARTER OF THE YEAR'){
    //     updatemonths = originalmonths.slice(3, 6)
    //     updatedataone = updatedataone.slice(3, 6)
    //     updatedatatwo = updatedatatwo.slice(3, 6)
    // };
    // if(document.getElementById('threedselectmonth').value == '3RD QUARTER OF THE YEAR'){
    //     updatemonths = originalmonths.slice(6, 9)
    //     updatedataone = updatedataone.slice(6, 9)
    //     updatedatatwo = updatedatatwo.slice(6, 9)
    // };
    // if(document.getElementById('threedselectmonth').value == 'LAST QUARTER OF THE YEAR'){
    //     updatemonths = originalmonths.slice(9, 12)
    //     updatedataone = updatedataone.slice(9, 12)
    //     updatedatatwo = updatedatatwo.slice(9, 12)
    // };

    // FOR MONTH SELECT
    updatemonths = document.getElementById('threedselectmonth').value;
    setDate(updatemonths)

    // FOR YEAR SELECT
    updateyear = document.getElementById('threedselectyear').value;

    // FOR CHART TYPE
    updatetype = document.getElementById('threedselectchart').value;

    // callchartone(updatemonths, updatedataone, updatedatatwo, updateyear, updatetype, 'destroy');

    function ddddparams() {
        var paramstr = new FormData();
        // 		2023-02-01
        paramstr.append('startdate', updateyear + '-' + themonth.toString().padStart(2, '0') + '-' + startday.toString().padStart(2, '0'));
        paramstr.append('enddate', updateyear + '-' + themonth.toString().padStart(2, '0') + '-' + endday.toString().padStart(2, '0'));
        return paramstr;
    }
    const setchartone1 = (result) => {
        setoriginalmonths(endday);
        // console.log('dta', result.data)
        if (result.data) {
            let colation = result.data.map(data => { return (`${data.transactiondate.split(' ')[0].split('-')[2]}, ${data.qty * data.cost}`).split(', ') });
            let colresult = colation.reduce((acc, [key, value]) => {
                const existingIndex = acc.findIndex(obj => obj.hasOwnProperty(key));
                if (existingIndex !== -1) {
                    acc[existingIndex][key] += Number(value);
                } else {
                    const newObj = { [key]: Number(value) };
                    acc.push(newObj);
                }
                return acc;
            }, []);
            // console.log('data', colresult)
            originaldataone = []
            for (let i = 0; i < endday; i++) {
                if (colresult.find(obj => obj.hasOwnProperty(i))) {
                    originaldataone.push(colresult.find(obj => obj.hasOwnProperty(i))[i])
                } else {
                    originaldataone.push('0')
                }
            }
            // console.log('final originaldataone', originaldataone)
            callchartone(originalmonths, originaldataone, originaldatatwo, updateyear, updatetype, 'destroy');
        } else {
            originaldataone = []
            for (let i = 0; i < endday; i++) {
                originaldataone.push('0')
            }
            callchartone(originalmonths, originaldataone, originaldatatwo, updateyear, updatetype, 'destroy');
        }

    }
    callController('fetchintakes.php', ddddparams(), 'fetchintakes', null, setchartone1, 'silent')
}

const callCharttwoFilter = () => {
    let updatemonths2 = originalmonths2;
    let updatedataone2 = originaldataone2;
    let updatedatatwo2 = originaldatatwo2;
    let updateyear2 = originalyear2;
    let updatetype2 = originaltype2;

    // FOR MONTH SELECT
    if (document.getElementById('threedselectmonth2').value == 'FULL YEAR') {
        updatemonths2 = originalmonths2
        updatedataone2 = updatedataone2
        updatedatatwo2 = updatedatatwo2
    };
    if (document.getElementById('threedselectmonth2').value == '1ST HALF OF THE YEAR') {
        updatemonths2 = originalmonths2.slice(0, 6)
        updatedataone2 = updatedataone2.slice(0, 6)
        updatedatatwo2 = updatedatatwo2.slice(0, 6)
    };
    if (document.getElementById('threedselectmonth2').value == '2ND HALF OF THE YEAR') {
        updatemonths2 = originalmonths2.slice(6, 12)
        updatedataone2 = updatedataone2.slice(6, 12)
        updatedatatwo2 = updatedatatwo2.slice(6, 12)
    };
    if (document.getElementById('threedselectmonth2').value == '1ST QUARTER OF THE YEAR') {
        updatemonths2 = originalmonths2.slice(0, 3)
        updatedataone2 = updatedataone2.slice(0, 3)
        updatedatatwo2 = updatedatatwo2.slice(0, 3)
    };
    if (document.getElementById('threedselectmonth2').value == '2ND QUARTER OF THE YEAR') {
        updatemonths2 = originalmonths2.slice(3, 6)
        updatedataone2 = updatedataone2.slice(3, 6)
        updatedatatwo2 = updatedatatwo2.slice(3, 6)
    };
    if (document.getElementById('threedselectmonth2').value == '3RD QUARTER OF THE YEAR') {
        updatemonths2 = originalmonths2.slice(6, 9)
        updatedataone2 = updatedataone2.slice(6, 9)
        updatedatatwo2 = updatedatatwo2.slice(6, 9)
    };
    if (document.getElementById('threedselectmonth2').value == 'LAST QUARTER OF THE YEAR') {
        updatemonths2 = originalmonths2.slice(9, 12)
        updatedataone2 = updatedataone2.slice(9, 12)
        updatedatatwo2 = updatedatatwo2.slice(9, 12)
    };

    // FOR YEAR SELECT
    updateyear2 = document.getElementById('threedselectyear2').value;

    // FOR CHART TYPE
    updatetype2 = document.getElementById('threedselectchart2').value;

    callcharttwo(updatemonths2, updatedataone2, updatedatatwo2, updateyear2, updatetype2, 'destroy');
}

const callchartone = (labal, data1, data2, year, typer, destroyer) => {
    const ctx = document.getElementById('myChartone');
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
                label: 'Daily transacted Intake',
                data: data1,
                borderWidth: 1
            }, {
                label: '',
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
                    text: `TRANSACTIONS `,
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
                        delay = context.dataIndex * 50 + context.datasetIndex * 50;
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
                        padding: { top: 20, left: 0, right: 0, bottom: 0 }
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

const callcharttwo = (labal, data1, data2, year, typer, destroyer) => {
    const ctx = document.getElementById('myCharttwo');
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
            }, {
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
                    text: `SAVINGS `,
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
                        padding: { top: 20, left: 0, right: 0, bottom: 0 }
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

var maindashboarddbtn = document.getElementById('maindashboardd')
if (maindashboarddbtn) maindashboarddbtn.addEventListener('click', e => maindashboardd());

