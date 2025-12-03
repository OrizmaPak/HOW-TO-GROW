const confirmsalary_field = [`confirmpayrollyear`, `confirmpayrollmonth`];
var confirmpayroll_datasource = [];
const confirmpayrollepaginate=(data)=>{
    if(data.message){
        if(data.message == "Payroll calculation not successful."){
            callModal("Payroll calculation not successful.", 0);
            jtabledata.innerHTML = ''
            return;
        }
    }
    confirmpayroll_datasource = [];
    confirmpayroll_datasource = datasource = data.data;
    initPagination(confirmpayroll_datasource, confirmpayrollsetCurrentPage);
    }


var confirmpayrollsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(confirmpayroll_datasource.length) {
        confirmpayroll_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendconfirmpayrollTableRows(item, index);
            }
        })
    }
    else {
        document.getElementById("confirmpayrolltablecontent").innerHTML=  renderNoTableData()
    }
    var payrollnetpayable = 0
    confirmpayroll_datasource.map(dat=>{
        payrollnetpayable = Number(dat.netpayable) + payrollnetpayable
    })
    // for(i=0;i<document.getElementsByClassName('netpayable').length;i++){
    //     payrollnetpayable = Number(document.getElementsByClassName('netpayable')[i].value) + payrollnetpayable
    // }
    document.getElementById('payrolltotalsalaries').innerHTML = ` &#x20A6;${formatCurrency(payrollnetpayable)}`;
};

const checkallconfirmpayrolltoapprove =(state)=>{
    if(state.textContent == 'select all'){
        for(i=0;i<document.getElementsByClassName('confirmpayrollcheckbox').length;i++){
            document.getElementsByClassName('confirmpayrollcheckbox')[i].checked = true
        }
        state.textContent = 'deselect all';
        return
    }
    if(state.textContent == 'deselect all'){
        for(i=0;i<document.getElementsByClassName('confirmpayrollcheckbox').length;i++){
            document.getElementsByClassName('confirmpayrollcheckbox')[i].checked = false
        }
        state.textContent = 'select all';
        return
    }
}

const refreshconfirmpayroll =()=>{
    document.getElementById('confirmsalary_submitbtn').click();
}

const confirmparmsforpersonnel =(action)=>{
    let paramstr = new FormData();
    paramstr.append('buttonselected', action);
    let idsp = [];
     for(i=0;i<document.getElementsByClassName('confirmpayrollcheckbox').length;i++){
         if(document.getElementsByClassName('confirmpayrollcheckbox')[i].checked){
            idsp.push(`${document.getElementsByClassName('confirmpayrollcheckbox')[i].id}`) 
         }
     }  
     for(i=0;i<idsp.length;i++){
         paramstr.append(`ids${i}`, `${idsp[i]}`);
     }
         paramstr.append(`idsize`, idsp.length);
    
    return paramstr;
}

const confirmpayrolltoapprove =()=>{
        let checked = '';
    for(i=0;i<document.getElementsByClassName('confirmpayrollcheckbox').length;i++){
        if(document.getElementsByClassName('confirmpayrollcheckbox')[i].checked){
            checked = 'good'
        }
    }
    if(checked == '')return callModal('No payroll has been selected for approval', 0);
    callController('approvepayroll.php', confirmparmsforpersonnel("APPROVE"), 'approvepayroll', null, refreshconfirmpayroll);
}

const confirmpayrolltodelete =()=>{
        let checked = '';
    for(i=0;i<document.getElementsByClassName('confirmpayrollcheckbox').length;i++){
        if(document.getElementsByClassName('confirmpayrollcheckbox')[i].checked){
            checked = 'good'
        }
    }
    if(checked == '')return callModal('No payroll has been selected for approval', 0);
    callController('approvepayroll.php', confirmparmsforpersonnel("DELETE"), 'approvepayroll', null, refreshconfirmpayroll);
}


function appendconfirmpayrollTableRows(data, index) {
    console.log('dataaa', data)
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("confirmpayrolltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td><input class="confirmpayrollcheckbox" type="checkbox" id="${data.payroll.id}" ></td>
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


const confirmpayrollparams=()=>{
    let paramstr = new FormData();
    // paramstr.append('applyattendance', document.getElementById('payrollattendance').value);
    paramstr.append('month', document.getElementById('confirmpayrollmonth').value);
    paramstr.append('year', document.getElementById('confirmpayrollyear').value);
    return paramstr;
}

const confirmsalpoplocation =(data)=>{
    document.getElementById('appconbranch').innerHTML += `${data.data.data.map(dat=>`<option>${dat.location.toUpperCase()}`)}`
}
async function oreconfirmsalary() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('confirmsalary.php', 'override') ;
        
        jtabledata = document.getElementById('confirmpayrolltablecontent');
        // paginationLimit = 10;
        initializePaginationParams(confirmpayrollsetCurrentPage);
        callController('fetchlocation.php', null, 'fetchlocation', null, confirmsalpoplocation)
        
         var currentYear = new Date().getFullYear();
        let yearspresalaryapprovalyear = [];
        yearspresalaryapprovalyear.push(currentYear-1);
        yearspresalaryapprovalyear.push(currentYear);
        yearspresalaryapprovalyear.push(currentYear+1);
        console.log(yearspresalaryapprovalyear)
        document.getElementById('confirmpayrollyear').innerHTML += yearspresalaryapprovalyear.map(data=>`<option>${data}</option>`);
        getpersonneldataready();
        if(document.getElementById('confirmsalary_submitbtn'))document.getElementById('confirmsalary_submitbtn').addEventListener('click', e=>callController('fetchnonapprovedpayroll.php', confirmpayrollparams(), 'fetchnonapprovedpayroll', confirmsalary_field, confirmpayrollepaginate),true);

        //YOUR VARIABLES STAYS HERE
        // const statementAccountNumber = document.getElementById('smacc')
        // const statementStartDate = document.getElementById('smsd');
        
        //ALWAYS CHECK BEFORE ADDING EVENTLISTENERS
        // if(loadstatementbtn) loadstatementbtn.addEventListener('click', () => loadStatement());
        
        //TO CALL AND HIDE SPINNER WHEN NEEDED
        // showSpinner();
        // hideSpinner()
        
       // THE REST OF YOUR CODE GOES HERE
       
       //THANKS
        
}


var oreconfirmsalarybbtn = document.getElementById("confirmsalary");
if (oreconfirmsalarybbtn) oreconfirmsalarybbtn.addEventListener("click", oreconfirmsalary, false);