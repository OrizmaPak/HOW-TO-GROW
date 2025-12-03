const confirmmonthsalary_field = [`confirmmonthpayrollyear`, `confirmmonthpayrollmonth`];
var confirmmonthpayroll_datasource = [];
const confirmmonthpayrollepaginate=(data)=>{
    if(data.message){
        if(data.message == "Payroll calculation not successful."){
            callModal("Payroll calculation not successful.", 0);
            jtabledata.innerHTML = ''
            return;
        }
    }
    confirmmonthpayroll_datasource = [];
    confirmmonthpayroll_datasource = datasource = data.data;
    initPagination(confirmmonthpayroll_datasource, confirmmonthpayrollsetCurrentPage);
    document.getElementById('viewmonthtabledata2').innerHTML = confirmmonthpayroll_datasource.map((data, index)=>{
         return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${data.personnel[0].firstname} </td>
                                <td> ${data.personnel[0].lastname} </td>
                                <td> ${getthelevel(data.personnel[0].levelid).toLowerCase()} </td>
                                <td><input class="netpayable" value="${data.netpayable}" type="hidden"/> ${formatCurrency(data.netpayable)} </td>
                                <td> ${formatCurrency(data.payroll.totalallowance)} </td>
                                <td> ${formatCurrency(data.payroll.totaldeduction)} </td> 
                                <td> 
                                    <table>
                                        ${data.paydetail.filter(dat=>dat.salaryinfotype == "ALLOWANCE").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> 
                                    <table>
                                        ${data.paydetail.filter(dat=>dat.salaryinfotype == "DEDUCTION").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> ${data.payroll.entrydate} </td>
                </tr>`)
    }).join('')
    }


var confirmmonthpayrollsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(confirmmonthpayroll_datasource.length) {
        confirmmonthpayroll_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendconfirmmonthpayrollTableRows(item, index);
            }
        })
    }
    else {
        document.getElementById("confirmmonthpayrolltablecontent").innerHTML=  renderNoTableData()
    }
    var payrollnetpayable = 0
    confirmmonthpayroll_datasource.map(dat=>{
        payrollnetpayable = Number(dat.netpayable) + payrollnetpayable
    })
    // for(i=0;i<document.getElementsByClassName('netpayable').length;i++){
    //     payrollnetpayable = Number(document.getElementsByClassName('netpayable')[i].value) + payrollnetpayable
    // }
    document.getElementById('payrolltotalsalaries').innerHTML = ` &#x20A6;${formatCurrency(payrollnetpayable)}`;
};

const checkallconfirmmonthpayrolltoapprove =(state)=>{
    if(state.textContent == 'select all'){
        for(i=0;i<document.getElementsByClassName('confirmmonthpayrollcheckbox').length;i++){
            document.getElementsByClassName('confirmmonthpayrollcheckbox')[i].checked = true
        }
        state.textContent = 'deselect all';
        return
    }
    if(state.textContent == 'deselect all'){
        for(i=0;i<document.getElementsByClassName('confirmmonthpayrollcheckbox').length;i++){
            document.getElementsByClassName('confirmmonthpayrollcheckbox')[i].checked = false
        }
        state.textContent = 'select all';
        return
    }
}

const refreshconfirmmonthpayroll =()=>{
    document.getElementById('confirmmonthsalary_submitbtn').click();
}

const confirmmonthparmsforpersonnel =(action)=>{
    let paramstr = new FormData();
    paramstr.append('buttonselected', action);
    let idsp = [];
     for(i=0;i<document.getElementsByClassName('confirmmonthpayrollcheckbox').length;i++){
         if(document.getElementsByClassName('confirmmonthpayrollcheckbox')[i].checked){
            idsp.push(`${document.getElementsByClassName('confirmmonthpayrollcheckbox')[i].id}`) 
         }
     }  
     for(i=0;i<idsp.length;i++){
         paramstr.append(`ids${i}`, `${idsp[i]}`);
     }
         paramstr.append(`idsize`, idsp.length);
    
    return paramstr;
}

const confirmmonthpayrolltoapprove =()=>{
        let checked = '';
    for(i=0;i<document.getElementsByClassName('confirmmonthpayrollcheckbox').length;i++){
        if(document.getElementsByClassName('confirmmonthpayrollcheckbox')[i].checked){
            checked = 'good'
        }
    }
    if(checked == '')return callModal('No payroll has been selected for approval', 0);
    callController('approvepayroll.php', confirmmonthparmsforpersonnel("APPROVE"), 'approvepayroll', null, refreshconfirmmonthpayroll);
}

const confirmmonthpayrolltodelete =()=>{
        let checked = '';
    for(i=0;i<document.getElementsByClassName('confirmmonthpayrollcheckbox').length;i++){
        if(document.getElementsByClassName('confirmmonthpayrollcheckbox')[i].checked){
            checked = 'good'
        }
    }
    if(checked == '')return callModal('No payroll has been selected for approval', 0);
    callController('approvepayroll.php', confirmmonthparmsforpersonnel("DELETE"), 'approvepayroll', null, refreshconfirmmonthpayroll);
}


function appendconfirmmonthpayrollTableRows(data, index) {
    console.log('dataaa', data)
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("confirmmonthpayrolltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td><input class="confirmmonthpayrollcheckbox" type="checkbox" id="${data.payroll.id}" ></td>
                                <td> ${data.personnel[0].firstname} </td>
                                <td> ${data.personnel[0].lastname} </td>
                                <td> ${getthelevel(data.personnel[0].levelid).toLowerCase()} </td>
                                <td><input class="netpayable" value="${data.netpayable}" type="hidden"/> ${formatCurrency(data.netpayable)} </td>
                                <td> ${formatCurrency(data.payroll.totalallowance)} </td>
                                <td> ${formatCurrency(data.payroll.totaldeduction)} </td> 
                                <td> 
                                    <table>
                                        ${data.paydetail.filter(dat=>dat.salaryinfotype == "ALLOWANCE").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> 
                                    <table>
                                        ${data.paydetail.filter(dat=>dat.salaryinfotype == "DEDUCTION").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> ${data.payroll.entrydate} </td>
                            </tr>
    `
} 


const confirmmonthpayrollparams=()=>{
    let paramstr = new FormData();
    // paramstr.append('applyattendance', document.getElementById('payrollattendance').value);
    paramstr.append('month', document.getElementById('confirmmonthpayrollmonth').value);
    paramstr.append('year', document.getElementById('confirmmonthpayrollyear').value);
    return paramstr;
}

const confirmmonthsalpoplocation =(data)=>{
    document.getElementById('appconbranch2').innerHTML += `${data.data.data.map(dat=>`<option>${dat.location.toUpperCase()}</option>`)}`
}

async function oreviewmonthlysalaryschedule() { 
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('viewmonthlysalaryschedule.php', 'override')  
        
        jtabledata = document.getElementById('confirmmonthpayrolltablecontent');
        // paginationLimit = 10;
        initializePaginationParams(confirmmonthpayrollsetCurrentPage);
        callController('fetchlocation.php', null, 'fetchlocation', null, confirmmonthsalpoplocation)
        
         var currentYear = new Date().getFullYear();
        let yearspresalaryapprovalyear = [];
        yearspresalaryapprovalyear.push(currentYear-1);
        yearspresalaryapprovalyear.push(currentYear);
        yearspresalaryapprovalyear.push(currentYear+1);
        console.log(yearspresalaryapprovalyear)
        document.getElementById('confirmmonthpayrollyear').innerHTML += yearspresalaryapprovalyear.map(data=>`<option>${data}</option>`);
        getpersonneldataready();
        if(document.getElementById('confirmmonthsalary_submitbtn'))document.getElementById('confirmmonthsalary_submitbtn').addEventListener('click', e=>callController('fetchapprovedpayroll.php', confirmmonthpayrollparams(), 'fetchapprovedpayroll', confirmmonthsalary_field, confirmmonthpayrollepaginate),true);
        if(document.getElementById('viewmonthexport'))document.getElementById('viewmonthexport').addEventListener('click',e=>{
            tableToExcel('viewmonthtabledatafull2', `VIEW MONTHLY SALARY SCHEDULE`)},false);
        if(document.getElementById('viewmonthprint'))document.getElementById('viewmonthprint').addEventListener('click',e=>{
            printContent(`VIEW MONTHLY SALARY SCHEDULE`,`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewmonthtabledatafull2')},false);

        
}


var oreviewmonthlysalaryschedulebbtn = document.getElementById("viewmonthlysalaryschedule");
if (oreviewmonthlysalaryschedulebbtn) oreviewmonthlysalaryschedulebbtn.addEventListener("click", oreviewmonthlysalaryschedule, false);