let stafsalrecpersonnelid = [];
let stafsalrecpersonnel = [];
let stafsalrecpersonnelvalue = ''

var stafsalrec_datasource = [];

const stafsalrecepaginate=(data)=>{
    stafsalrec_datasource = [];
    stafsalrec_datasource = data.data;
    initPagination(stafsalrec_datasource, stafsalrecsetCurrentPage);
    // console.log('this is the data we testing', viewpersonnel_datasource)
    document.getElementById('stafsalrectabledata2').innerHTML = stafsalrec_datasource.map((data, index)=>{
         return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${document.getElementById('stafsalinput').value} </td>
                                <td> ${data.entrydate} </td>
                                <td> ${getMonthRepresentation(data.month)} </td>
                                <td> ${data.year} </td>
                                <td> &#x20A6 ${formatCurrency(data.totalallowance)} </td>
                                <td> &#x20A6 ${formatCurrency(data.totaldeduction)} </td>
                                <td> ${data.withattendance} </td>
                                <td> &#x20A6 ${formatCurrency(data.netpayable)} </td>
                </tr>`)
    }).join('')
    }


var stafsalrecsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(stafsalrec_datasource.length) {
        stafsalrec_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendstafsalrecTableRows(item, index)
            }
        })
        // if(document.warningSelector('#stafsalrectablecontent tbody').innerHTML === '') orewarningbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("stafsalrectablecontent").innerHTML=  renderNoTableData()
    }
};

function getMonthRepresentation(monthValue) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (monthValue >= 1 && monthValue <= 12) {
    return months[monthValue - 1];
  } else {
    return "Invalid month value";
  }
}

function appendstafsalrecTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("staffsalaryrecordtablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${document.getElementById('stafsalinput').value} </td>
                                <td> ${data.entrydate} </td>
                                <td> ${getMonthRepresentation(data.month)} </td>
                                <td> ${data.year} </td>
                                <td> &#x20A6 ${formatCurrency(data.totalallowance)} </td>
                                <td> &#x20A6 ${formatCurrency(data.totaldeduction)} </td>
                                <td> ${data.withattendance} </td>
                                <td> &#x20A6 ${formatCurrency(data.netpayable)} </td>
                            </tr>
    `
} 



const popperstafsalrecdlis =(result)=>{
   if(document.getElementById('personneldatanames'))document.getElementById('personneldatanames').innerHTML = result.data.map(data=>{
       stafsalrecpersonnelid.push(data.personnel.staffid);
       stafsalrecpersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}

const checkstaffsalrecpersonnel =(state)=>{
        console.log('detected', state)
        if(stafsalrecpersonnel.includes(`${state.value}`)){
            stafsalrecpersonnelvalue = stafsalrecpersonnelid[stafsalrecpersonnel.indexOf(`${state.value}`)];
            document.getElementById('staffsalrecsearchbtn').style.display = 'block';
            console.log('stafsalrecpersonnelvalue', stafsalrecpersonnelvalue)
        }else{
            document.getElementById('staffsalrecsearchbtn').style.display = 'none';
        }
    };


const personalstaffsalaryrecord =(data)=>{
        popperstafsalrecdlis(data)
    if(document.getElementById('personneldatanames').innerHTML === ''){
        document.getElementById('personneldatanames').innerHTML = data.data.map(dat=>`<option value="${dat.personnel.firstname} ${dat.personnel.lastname}"/>`).join('')
    }
}

const personnelstaffrecordsearchclick =()=>{
    if(stafsalrecpersonnelvalue == '')return callModal('please enter a valid name', 0);
    const params =()=>{
        let paramstr = new FormData();

        paramstr.append('staffid', stafsalrecpersonnelvalue);

        return paramstr;
    }
    callController('fetchstaffpayroll.php', params(), 'fetchstaffpayroll', null, stafsalrecepaginate)
}


async function orepersonalstaffsalaryrecord() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('personalstaffsalaryrecord.php', 'override')  
        
         jtabledata = document.getElementById('staffsalaryrecordtablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, personalstaffsalaryrecord)
        // if(document.getElementById('personalstaffsalaryrecord_submitbtn'))document.getElementById('personalstaffsalaryrecord_submitbtn').addEventListener('click', e=>callController('controller.php', null, 'personalstaffsalaryrecordsubmit', personalstaffsalaryrecord_field, alert),true);
        // document.getElementById('personneldatanames')
        if(document.getElementById('staffsalexport'))document.getElementById('staffsalexport').addEventListener('click',e=>{
            tableToExcel('stafsalrectabledatafull2', `STAFF SALARY RECORD FOR ${document.getElementById('stafsalinput').value}`)},false);
        if(document.getElementById('staffsalprint'))document.getElementById('staffsalprint').addEventListener('click',e=>{
            printContent(`STAFF SALARY RECORD FOR ${document.getElementById('stafsalinput').value}`,`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'stafsalrectabledatafull2')},false);

        
        
}


var orepersonalstaffsalaryrecordbbtn = document.getElementById("personalstaffsalaryrecord");
if (orepersonalstaffsalaryrecordbbtn) orepersonalstaffsalaryrecordbbtn.addEventListener("click", orepersonalstaffsalaryrecord, false);