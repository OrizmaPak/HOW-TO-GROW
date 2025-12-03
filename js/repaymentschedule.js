async function openRepaymentSchedule () {
    
    await httpRequest('repaymentschedule.php')
   
    const repaymentaccountInput = document.getElementById('repaymentaccount')
    const findaccountbtn = document.getElementById('findaccountbtn')
    let scheduleHeader = document.getElementById('scheduleheader')
    const repaymentrescheduletable = document.getElementById('repaymentrescheduletable')
    const modalContent = document.querySelector('.modal-content');
    let paymentscheduleprintaction = document.getElementById('paymentscheduleprintaction')
    if(paymentscheduleprintaction) paymentscheduleprintaction.style.display = 'none'
    
    let datasource = [];
    
    if(findaccountbtn) findaccountbtn.addEventListener('click', runInputValidation)
    
    function setClassficationHeader(accountnumber, accountname) {
        if(scheduleHeader) scheduleHeader.innerHTML =  `<strong> REPAYMENT SCHEDULE </strong> <br><span style="font-weight: 400; text-transform:capitalize;"> <strong> Account Number: </strong> ${ accountnumber } <strong>Account Name:</strong> ${accountname}</span>`
    }
    
    if(paymentscheduleprintaction) paymentscheduleprintaction.addEventListener('click', printRepaymentscheduleList)

    function PaymentHTML(scheduleRecord) {
        return  `
            <div id="repaymentschedulecontent" style="relative">
                <div style="padding:20px;font-size:medium;text-transform:uppercase;font-weight:500;background-color:white;border-bottom:rgb(177, 176, 176);text-align:left"> REPAYMENT </div>
                <div style="padding:20px;background-color:rgb(241, 241, 241)">
                    <form class="jform" id="schedulerepaymentform">
                        <div class="col-form-group">
                            <div class="jformgroup form_row">
                                <div class="jformgroup jformgroupcol">
                                    <label class="jcontrollabel"> Account Number  </label>
                                    <input type="text"
                                        class="jformcontrol jmargin-top" id="scheduleaccountnumber" name="accountnumber" value="${scheduleRecord.loanaccount}" readonly="readonly">
                                </div>
                                <div class="jformgroup jformgroupcol jmargin-left">
                                    <label class="jcontrollabel"> Account Name  </label>
                                    <input type="text"
                                        class="jformcontrol jmargin-top" id="scheduleaccountname" name="scheduleaccountname" value="${scheduleRecord.accountname}" readonly="readonly">
                                </div>
                            </div>
                            <div class="jformgroup form_row">
                                <div class="jformgroup jformgroupcol">
                                    <label class="jcontrollabel"> Amount </label>
                                    <input type="number"
                                        class="jformcontrol jmargin-top" id="schedulecredit" name="credit" value="${+scheduleRecord.amountdue + (+scheduleRecord.interestdue)}" onkeyup="validateRepaymentAmount(event, ${+scheduleRecord.amountdue + (+scheduleRecord.interestdue)})" onchange="validateRepaymentAmount(event, ${+scheduleRecord.amountdue + (+scheduleRecord.interestdue)})">
                                </div>
                                <div class="jformgroup jformgroupcol jmargin-left hidden">
                                    <label class="jcontrollabel"> Debit  </label>
                                    <input type="number"
                                        class="jformcontrol jmargin-top" id="scheduleaccountdebit" name="scheduleaccountdebit" disabled>
                                </div>
                            </div>
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel">Description: </label>
                                <textarea class="jformcontrol jmargin-top" rows="3" resize="none" id="scheduledecription"
                                    name="description"></textarea>
                            </div>
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel">Debit Connected Account: </label>
                                <label class="switch j-slider jmargin-top">
                                    <input type="checkbox" id="debitconnectedaccount">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div>
                                <button type="button" value="${scheduleRecord.id}" class="j-action-btn jmargin-top" style="padding:10px;width:100%"
                                    id="submitschedulerepayment"> submit repayment
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div style="display:flex;align-items:end;justify-content:end;position:absolute;left-0;top:0;width:100%">
                    <button id="jmodal-close" type="button" style="padding: 15px;font-weight:700px;font-size:medium;background-color:transparent;border:none;cursor:pointer;">&#10006;</button>
                </div>
            </div> 
            `
    }
    

    function makeSecurePayment(actionid){
        let id = actionid.split('-')[1]
        let scheduleRecord = datasource[id]
        if(scheduleRecord) {
            let modal = document.querySelector('.modal-content')
            if(modal) {
                modal.parentElement.style.display = 'block'
                modal.innerHTML = PaymentHTML(scheduleRecord)
                if(modalContent) {
                    modalContent.querySelector('#submitschedulerepayment').addEventListener('click', e => runRepaymentInputValidation(e))
                    modalContent.querySelector('#jmodal-close').addEventListener('click', () => closeJmodal())
                }
            }
        }
    } 
    
    function closeJmodal() {
        let modal = document.querySelector('.modal-content');
        modalContent.querySelector('#submitschedulerepayment').removeEventListener('click', undefined);
        modal.querySelector('#repaymentschedulecontent')?.remove();
        modal.parentElement.style.display = 'none'
    }
    
    function repaymentPay(submitbtnevent) {
        let btn = modalContent.querySelector('#submitschedulerepayment') 
        btn.disabled = true;
        btn.innerHTML = 'Making Repayment...'
        
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/repayloan.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                 btn.disabled = false;
                 btn.innerHTML = 'submit repayment'
                 
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        closeJmodal()
                        callModal('Repayment successful', 1)
                        findaccountbtn.click()
                    }
                    else return callModal(parseRequest.message)
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else {
                 btn.disabled = false;
                 btn.innerHTML = 'submit repayment'
                 return hideSpinner()
            };
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        
        let paramstr = new FormData(document.getElementById('schedulerepaymentform'));
        paramstr.append('id', submitbtnevent.target.value)
        paramstr.append('debitconnectedaccount',  document.querySelector('#schedulerepaymentform #debitconnectedaccount').checked ? 'YES' : 'NO')
    
        request.setRequestHeader('Connection','close'); 
        request.send(paramstr);
 
    }
    
    async function fetchRepaymentAccount() {
        showSpinner();
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchloanschedule.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        data = datasource = parseRequest.data
                        renderRepaymentSchedule()
                    }
                    else return callModal('Not records retrieved')
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        let paramstr = new FormData()
        paramstr.append('accountnumber', repaymentaccountInput?.value)
        request.setRequestHeader('Connection','close'); 
        request.send(paramstr);
    }
    
    function renderRepaymentSchedule() {
        if(datasource.length) {
            setClassficationHeader(datasource[0].loanaccount, datasource[0].accountname);
            if(repaymentrescheduletable) repaymentrescheduletable.innerHTML = `
                <thead id="jtableheader">
                    <tr>
                        <th> s/n</th>
                        <th> account number </th>
                        <th> account name </th>
                        <th> due date </th>
                        <th> payment date </th>
                        <th> amount due </th>
                        <th> Int. due </th>
                        <th> repayment amount </th>
                        <th> amount paid </th>
                        <th class="no-pr">status </th>
                        <th class="no-pr">action </th>
                    </tr>
                </thead>
                <tbody id="jtabledata">
                </tbody>
            `
            datasource.forEach((item, index) => {
                repaymentrescheduletable.querySelector('tbody').innerHTML += `
                    <tr>
                        <td> ${ index + 1} </td>
                        <td> ${item.loanaccount }</td>
                        <td> ${item.accountname }</td>
                        <td> ${item.duedate }</td>
                        <td> ${ item.paymentdate == '2000-01-01' || item.hfield == '-' ? '' : item.paymentdate} </td>
                        <td> ${ formatMoney(item.amountdue) }</td>
                        <td> ${ formatMoney(item.interestdue) }</td>
                        <td> ${ formatMoney(+item.amountdue + (+item.interestdue)) }</td>
                        <td> ${ formatMoney(item.amountpaid) } </td>
                        <td class="no-pr"> ${ item.hfield == '-' ? 'Pending' : 'Paid'} </td>
                        <td class="no-pr">  
                            <div style="display:flex;justify-content:center;align-items:center">
                                ${item?.hfield === '-' ? `<button type="button" class="j-action-btn" id="rp-${index}" style="font-size: 10px}">Repay<button>`: '' }
                            </div>
                        </td>
                    </tr>
                `  
            })
    
            repaymentrescheduletable.querySelector('tbody').innerHTML += ` 
                <tr>
                    <td colspan="5" style="text-transform:uppercase;text-align:left"> total </td>
                    <td>${formatMoney(datasource?.filter(item => item.hfield === '-').reduce((total, curr) => total + (+curr.amountdue), 0) )}</td>
                    <td>${formatMoney(datasource?.filter(item => item.hfield === '-').reduce((total, curr) => total + (+curr.interestdue), 0) )}</td>
                    <td>${formatMoney((datasource?.filter(item => item.hfield === '-').reduce((total, curr) => total + (+curr.amountdue), 0) ) + (datasource?.filter(item => item.hfield === '-').reduce((total, curr) => total + (+curr.interestdue), 0) ))} </td>
                    <td>${formatMoney(datasource?.filter(item => item.hfield === 'PAID').reduce((total, curr) => total + (+curr.amountpaid), 0) )}</td>
                </tr>
                <tr>
                    <td colspan="7" style="text-transform:uppercase;text-align:left"> outstanding balance </td>
                    <td> ${formatMoney((datasource?.filter(item => item.hfield === '-').reduce((total, curr) => total + (+curr.amountdue), 0) ) + (datasource?.filter(item => item.hfield === '-').reduce((total, curr) => total + (+curr.interestdue), 0) ))} </td>
                </tr>
            `
    
            addTableEventListeners()
            if(paymentscheduleprintaction) paymentscheduleprintaction.style.display = 'block'
          
        }
    }
    
    function addTableEventListeners() {
        for(let i = 0; i < datasource.length; i++) {
            let btn = document.getElementById(`rp-${i}`);
            if(btn) btn.addEventListener('click', () => makeSecurePayment(btn.id))
        }
    }
    
    function runInputValidation() {
        
        inputs = [{ input: repaymentaccountInput, validation: {required: 'Enter account number', 'pattern': 'Account number not valid'}, pattern: new RegExp(/[0-9]+$/)}]

        let validations = [];
    
        inputs.map( (field, index) => {
            let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
            if(result)  validations.push(result) ;  
        })
    
        if(validations.length) validatorMapper(validations)
    
        else fetchRepaymentAccount()
    }
    
    function runRepaymentInputValidation(e) {
    
        let validations = [];
    
        inputs = [
            { input: document.querySelector('#schedulerepaymentform #scheduledecription'), validation: {required: 'Repayment description is required'}},
            { input: document.querySelector('#schedulerepaymentform #schedulecredit'), validation: {required: 'Credit is required', pattern: 'Credit is not valid'}, pattern: new RegExp(/[0-9]+$/)},
            
        ]
    
        inputs.map( (field, index) => {
            let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
            if(result)  validations.push(result) ;  
        })
    
        if(validations.length) validatorMapper(validations)
    
        else repaymentPay(e)
    }
    
    
    function printRepaymentscheduleList() {
        let content = document.getElementById('jpagecontent');
        if(content) {
            var winPrint = window.open('repayment schedule', '', 'width=1000,height=900');
            winPrint.document.write('<html><head><title></title>');
            winPrint.document.write('<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">');
            winPrint.document.write(' <h1 style="text-align:center;font-weight:400px;text-transform:uppercase;font-size:14px;"> repayment schedule </h1> ' + content.innerHTML);
            winPrint.document.write('<script type="text/javascript">addEventListener("load", () => { print(); close(); })</script></body></html>');
            winPrint.document.close();
            winPrint.focus();
        }
    }
}

function validateRepaymentAmount(event, amount) {
    
    if(parseFloat(event.target.value) > amount) {
        callModal('Amount cannot be higher than due', 0)
        event.target.value = amount
    }
    
    else if(parseFloat(event.target.value) < 0) {
        callModal('Invalid amount entered', 0)
        event.target.value = amount
    }
}

let repaymentschedulebtn = document.getElementById('repaymentschedule')
if(repaymentschedulebtn) repaymentschedulebtn.addEventListener('click', openRepaymentSchedule, false)