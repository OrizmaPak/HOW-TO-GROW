var approvepayroll_datasource = [];
const approvepayrollepaginate=(data)=>{
    if(data.message){
        if(data.message == "Payroll calculation not successful."){
            callModal("Payroll calculation not successful.", 0);
            jtabledata.innerHTML = ''
            return;
        }
    }
    approvepayroll_datasource = [];
    approvepayroll_datasource = datasource = data.data;
    initPagination(approvepayroll_datasource, approvepayrollsetCurrentPage);
    }


var approvepayrollsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(approvepayroll_datasource.length) {
        approvepayroll_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendapprovepayrollTableRows(item, index);
            }
        })
    }
    else {
        document.getElementById("approvepayrolltablecontent").innerHTML=  renderNoTableData()
    }
    var payrollnetpayable = 0
    approvepayroll_datasource.map(dat=>{
        payrollnetpayable = Number(dat.netpayable) + payrollnetpayable
    })
    // for(i=0;i<document.getElementsByClassName('netpayable').length;i++){
    //     payrollnetpayable = Number(document.getElementsByClassName('netpayable')[i].value) + payrollnetpayable
    // }
    document.getElementById('payrolltotalsalaries').innerHTML = ` &#x20A6;${formatCurrency(payrollnetpayable)}`;
};

const checkallpayrolltoapprove =(state)=>{
    if(state.textContent == 'select all'){
        for(i=0;i<document.getElementsByClassName('approvepayrollcheckbox').length;i++){
            document.getElementsByClassName('approvepayrollcheckbox')[i].checked = true
        }
        state.textContent = 'deselect all';
        return
    }
    if(state.textContent == 'deselect all'){
        for(i=0;i<document.getElementsByClassName('approvepayrollcheckbox').length;i++){
            document.getElementsByClassName('approvepayrollcheckbox')[i].checked = false
        }
        state.textContent = 'select all';
        return
    }
}

const refreshapprovepayroll =()=>{
    document.getElementById('presalaryapprovebtn').click();
}

const approveparmsforpersonnel =(action)=>{
    let paramstr = new FormData();
    paramstr.append('buttonselected', action);
    let idsp = [];
     for(i=0;i<document.getElementsByClassName('approvepayrollcheckbox').length;i++){
         if(document.getElementsByClassName('approvepayrollcheckbox')[i].checked){
            idsp.push(`${document.getElementsByClassName('approvepayrollcheckbox')[i].id}`) 
         }
     }  
     for(i=0;i<idsp.length;i++){
         paramstr.append(`ids${i}`, `${idsp[i]}`);
     }
         paramstr.append(`idsize`, idsp.length);
    
    return paramstr;
}

const payrolltoapprove =()=>{
        let checked = '';
    for(i=0;i<document.getElementsByClassName('approvepayrollcheckbox').length;i++){
        if(document.getElementsByClassName('approvepayrollcheckbox')[i].checked){
            checked = 'good'
        }
    }
    if(checked == '')return callModal('No payroll has been selected for approval', 0);
    callController('approvepayroll.php', approveparmsforpersonnel("DELETE"), 'approvepayroll', null, refreshapprovepayroll);
}


function appendapprovepayrollTableRows(data, index) {
    console.log('dataaa', data)
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("approvepayrolltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td><input class="approvepayrollcheckbox" type="checkbox" id="${data.payroll.id}" ></td>
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


const presalaryapprovalparams=()=>{
    let paramstr = new FormData();
    paramstr.append('applyattendance', document.getElementById('payrollattendance').value);
    paramstr.append('month', document.getElementById('payrollmonth').value);
    paramstr.append('year', document.getElementById('payrollyear').value);
    return paramstr;
}

async function orepresalaryapproval() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('presalaryapproval.php', 'override');
        
        
        jtabledata = document.getElementById('approvepayrolltablecontent');
        // paginationLimit = 10;
        initializePaginationParams(approvepayrollsetCurrentPage);
        
        var currentYear = new Date().getFullYear();
        let yearspresalaryapprovalyear = [];
        yearspresalaryapprovalyear.push(currentYear-1);
        yearspresalaryapprovalyear.push(currentYear);
        yearspresalaryapprovalyear.push(currentYear+1);
        console.log(yearspresalaryapprovalyear)
        document.getElementById('payrollyear').innerHTML += yearspresalaryapprovalyear.map(data=>`<option>${data}</option>`);
        getpersonneldataready();
        if(document.getElementById('presalaryapprovebtn'))document.getElementById('presalaryapprovebtn').addEventListener('click', e=>callController('dopayroll.php', presalaryapprovalparams(), 'dopayroll', ['payrollattendance','payrollmonth','payrollyear'], approvepayrollepaginate, 'silent'),true);

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


var orepresalaryapprovalbbtn = document.getElementById("presalaryapproval");
if (orepresalaryapprovalbbtn) orepresalaryapprovalbbtn.addEventListener("click", orepresalaryapproval, false);