async function openExtendLoan() {
    "use strict"
    
    await httpRequest('extendloan.php')
    
    let accountcontainer = document.getElementById('accountcontainer');
    const extendloaninput = document.getElementById('loanaccounts');
    
    if(extendloaninput) extendloaninput.addEventListener('blur', (e) => getLoanAccount(e.target))
    
    async function getLoanAccount(event) {
        showSpinner();
        let loandata = {}; 
        renderLoanHTML(loandata)
    }
    
    function renderLoanHTML(loandata) {
        if(accountcontainer) {
            accountcontainer.innerHTML = html;
            
            const feeAppendBtn = document.getElementById('feeappendbtn');
            const saveLoanAccountBtn = document.getElementById('saveloanaccountbtn')
            const loanSetContainer = document.querySelector('.col-form-group .loan-set');
            
            const customerIds = document.getElementById('customerids');
            const loanProduct = document.getElementById('loanproduct');
            const principalAmount = document.getElementById('principalamount');
            const beginDate = document.getElementById('begindate');
            const interestMethod = document.getElementById('interestmethod');
            const interestType = document.getElementById('interesttype');
            const interestRate = document.getElementById('interestrate');
            const interestPeriod = document.getElementById('interestperiod');
            const loanDuration = document.getElementById('loanduration');
            const loanDurationFactor = document.getElementById('loandurationfactor')
            const loanFrequency = document.getElementById('frequency');
            const noOfRepayments = document.getElementById('no_repayments');
            const loantype = document.getElementById('loantype');
            const installmentAmount = document.getElementById('installmentamount');
            const loanCurrency = document.getElementById('lcurrency');
            const loanPurpose = document.getElementById('purpose');
            const loanSecurity = document.getElementById('security')
            const previousbranch = document.getElementById('previousbranch')
            const previousaccount = document.getElementById('previousaccount')
            const connectcustomeraccount = document.getElementById('connectcustomeraccount')
            const loanOfficer = document.getElementById('loanofficer');
            const customerAccountNumber = document.querySelector('.jformgroup #customeraccount')
            const customerAccountName = document.getElementById('customeraccountname');
            const glloanaccount = document.getElementById('glloanaccount');
            const glcashaccount = document.getElementById('glaccount');
            const loanAccountDecription = document.getElementById('loanaccountdecription');
            const authorisationPassword = document.getElementById('authorisation');
            const loanaccountform = document.getElementById('loanaccountform');
            const sendforapproval = document.getElementById('sendforapproval');
            const resetloanaccountbtn  = document.getElementById('resetloanaccountbtn')
            
            let loanFees = [];
            
            if(feeAppendBtn) feeAppendBtn.addEventListener('click', () => appendLoanFeeHTML())
            if(saveLoanAccountBtn) saveLoanAccountBtn.addEventListener('click', () => runLoanFormValidations())
            if(interestPeriod) interestPeriod.addEventListener('click', e => {
                if(loanFrequency) {
                    loanFrequency.selectedIndex = +e.target.selectedIndex;
                    return
                }
            })
            if(loanFrequency) loanFrequency.addEventListener('click', e => {
                if(interestPeriod) {
                    interestPeriod.selectedIndex = +e.target.selectedIndex;
                    return
                }
            })
            if(resetloanaccountbtn) resetloanaccountbtn.addEventListener('click', () => resetLoanAccountForm())
            
            function saveLoanAccount() {
                let data = collectLoanAccountData();
            }

            function collectLoanAccountData() {
            
                let paramstr;
                let loanfeesarr = [];
                if(loanaccountform) paramstr = new FormData(loanaccountform);
            
                // add loan fees
                let loanfeeset = loanSetContainer.querySelectorAll(`.loan-fee-set`);
                if(loanfeeset.length) {
                    loanfeeset.forEach( feeset => {
                        let loanfeename = feeset.querySelector('select')
                        let loanfeevalue = feeset.querySelector('input[type="text"]')
                        if(loanfeename?.value && loanfeevalue?.value) loanfeesarr.push({fee: loanfeename.value, value: loanfeevalue.value});
                    })
                    if(loanfeesarr.length) paramstr.append('loanfees', loanfeesarr) 
                }
            
                // add disabled inputs
            
                if(loanaccountform) { 
                    loanaccountform.querySelectorAll('input:disabled').forEach( input => paramstr.append(input.getAttribute('name'), input.value)) 
                    loanaccountform.querySelectorAll('select:disabled').forEach( input => paramstr.append(input.getAttribute('name'), input.value)) 
                }
            
                // add send for approval
                paramstr.append('sendforapproval', sendforapproval.checked ? 'yes': 'no')
            
                return paramstr
            }
        
            const inputs = [
                {input: customerIds, validation: { required: 'Borrower name is required'}},
                {input: principalAmount, validation: { required: 'Loan amount is required', pattern: 'Loan amount not valid'}, pattern: new RegExp(/^[0-9.]+$/)},
                {input: interestMethod, validation: { required: 'Interest method is required'}},
                {input: loanDurationFactor, validation: { required: 'Loan duration factor is required', pattern: 'Loan duration not valid'}, pattern: new RegExp(/^[0-9]+$/)},
                {input: loanDuration, validation: { required: 'Loan duration factor is required'}},
                {input: loanFrequency, validation: { required: 'Loan repayment frequency is required'}},
                {input: loanOfficer, validation: { required: 'Loan officer is required'}},
                {input: customerAccountNumber, validation: { required: 'Customer account number is required', pattern: 'customer account number is not valid'}, pattern: new RegExp(/^[0-9]+$/)},
                {input: customerAccountName, validation: { required: 'Customer account name is required'}},
                {input: authorisationPassword, validation: { required: 'Authorizing officer password required'}},
                {input: glloanaccount, validation: { required: 'Gl loan account required'}},
                {input: glcashaccount, validation: { required: 'GL cash account required'}},
                {input: interestRate, validation: { required: 'Interest rate required', pattern: 'Interest rate not valid'}, pattern: new RegExp(/^[0-9]+$/)},
            ]
        
            async function fetchLoanFees () {
                // use sample data
                loanFees = [{feename: 'FORM FEE', id: 0}, {feename: 'PROCESSING FEE', id: 1}, {feename: 'DEFAULT FEE', id: 2}]
            }
        
            function appendLoanFeeHTML() { 
                if(loanSetContainer) {  
                    let setPresentInDom = loanSetContainer.querySelectorAll(`.loan-fee-set`);
                    let options = '<option value=""> -- Select loan fee -- </option>';
                    loanFees.map( (fee)=> options += `<option value="${fee.feename}"> ${fee.feename}</option>`)
                    loanSetContainer.innerHTML += `
                        <div class="jformgroup loan-fee-set" style="align-items:end">
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Loan Fee Name ${setPresentInDom.length + 1}: </label>
                                <select type="text" class="jformcontrol jmargin-top"> ${options}</select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> fee value ${setPresentInDom.length + 1 }: </label>
                                <input type="text" class="jformcontrol jmargin-top" placeholder="Enter fee value">
                            </div>
                             <div class="jmargin-left">
                                <button type="button" class="j-action-btn" id="remove-fee-${setPresentInDom.length + 1 }" style="background-color:red;"> remove </button>
                            </div>
                        </div>
                    `
                    addFeeEventListener();
                }
            }
            
            function addFeeEventListener() {
                loanSetContainer.querySelectorAll('.loan-fee-set').forEach( (set, index) => {
                    let btn = set.querySelector(`#remove-fee-${++index}`);
                    if(btn) btn.addEventListener('click', (e)=> {
                        let el = e.target.parentNode.parentNode;
                        loanSetContainer.removeChild(el)
                    })
                })
            
            }
            
            if(beginDate) beginDate.valueAsDate = new Date();
            fetchLoanFees();
            appendLoanFeeHTML();
        
            /** validations */
            function runLoanFormValidations() {
                
                // inputs.forEach( item => console.log(item.input))
            
                let validations = [];
            
                inputs.map( (field, index) => {
                    let result = FieldValidator(Object.keys(field.validation), field.input, field?.pattern, index);
                    if(result)  validations.push(result) ;  
                })
            
                if(validations.length) validatorMapper(validations)
            
                else saveLoanAccount()
            }
        
        
            function validatorMapper (validationMap) {
                let message = '';
                if(validationMap.length) {
                    validationMap.forEach( map => {
                        controlFlag(0, map.element);
                        message += inputs[map.loopindex].validation[map.validator] + ' <br />'
                    })
                    validationMap[0].element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
                    errorBox(message);
                }
            }
        
        
            function controlFlag(status, element) {
                if(status === 0 ) element.style.border = '1px solid red'
                else element.style.border = '';
            }
        
            function FieldValidator(arrayOfValidation = [], element, regexp, loopindex) {
                
                let state;
                
                arrayOfValidation.forEach( validation => {
            
                    if(validation) {
            
                        if(validation.includes('pattern')) {
                            let flag = pattern(element, regexp);
                            if(flag ===  false)  state =  {element, 'validator': 'pattern', valid: flag, loopindex}
                            else controlFlag(1, element);
                        }
                        else if (validation.includes('required')) {
                                let flag = required(element)
                                if(flag ===  false) state =  {element, 'validator': 'required', valid: flag, loopindex };
                                else controlFlag(1, element);
                        }
                        else {
                                controlFlag(1, element);
                                state =  null; 
                        }  
                    }
            
                    return
            
                })
            
                return state
                
            
            }
        
            function pattern(element, regexp) {
                return element.value.toString().match(regexp) ? true : false
            }
            
            function required(element) {
                return element.value?.length < 1 ? false : true
            }
        
            function errorBox(mssg) {
            
                var mbox = document.getElementById('messageBox');
                    mbox.innerHTML = mssg;
                    mbox.style.display = 'block';
                    mbox.style.visibility = 'visible';
            
                    setTimeout(function(){
                        mbox.style.display = 'none';
                        mbox.style.visibility = 'hidden'
                    }, 10000);
            }
        
        
            function resetLoanAccountForm()  {
                if(loanaccountform) loanaccountform.reset();
            }
        }
        else hideSpinner()
    }
    
    let html = `
    
        <div class="jformcontainer">
            <div class="jformgroup">
                <div class="jformgroup jformgroupcol">
                    <label class="jcontrollabel"> borrower: </label>
                    <input placeholder="Enter Borrower Name" autocomplete="on" type="text"
                        class="jformcontrol jmargin-top" id="customerids" name="customerids">
                </div>
                <div class="jformgroup jformgroupcol jmargin-left">
                    <label class="jcontrollabel"> loan product: </label>
                    <select class="jformcontrol jmargin-top" id="loanproduct" name="loanproduct">
                        <option value=""></option>
                        <option value="MICRO-LOANS"> MICRO-LOANS </option>
                    </select>
                </div>
            </div>
        </div>
    
        <!-- load terms -->
    
        <div class="section-header">
            <h1> loan terms </h1>
        </div>
        <div class="col-form-group">
            <div class="jformgroup">
                <div class="jformgroup jformgroupcol">
                    <label class="jcontrollabel"> Loan Principal: </label>
                    <input type="number" placeholder="Principal Amount" class="jformcontrol jmargin-top"
                        id="principalamount" name="principalamount">
                </div>
                <div class="jformgroup jformgroupcol jmargin-left">
                    <label class="jcontrollabel"> loan begin date: </label>
                    <input type="date" class="jformcontrol jmargin-top" id="begindate" name="begindate">
                </div>
            </div>
            <div class="jformgroup">
                <div class="jformgroup jformgroupcol">
                    <label class="jcontrollabel"> interest method: </label>
                    <select class="jformcontrol jmargin-top" name="interestmethod" id="interestmethod">
                        <option value="" selected=""> -- Select Interest Method --</option>
                        <option value="No Interest">No Interest</option>
                        <option value="Flat Rate">Flat Rate</option>
                        <option value="One Off Interest">One Off Interest</option>
                        <option value="Interest Only">Interest Only</option>
                        <option value="Equal Installments (Reducing Balance)">Equal Installments
                            (Reducing Balance)</option>
    
                    </select>
                </div>
                <div class="jformgroup jformgroupcol jmargin-left">
                    <label class="jcontrollabel"> interest type: </label>
                    <select class="jformcontrol jmargin-top" id="interesttype" name="interesttype">
                        <option value="" selected="">None</option>
                        <option value="Percentage Based">Percentage Based (%)</option>
                        <option value="Fixed Amount Per Cycle">Fixed Amount Per Cycle</option>
                        <option value="One Off Amount">One Off Amount</option>
                    </select>
                </div>
            </div>
        <div class="jformgroup">
            <div class="jformgroup jformgroupcol">
                <label class="jcontrollabel"> interest: </label>
                <div class="col-form-group">
                    <input placeholder="interest (%)" type="text" class="jformcontrol jmargin-top" value="0"
                        id="interestrate" name="interestrate">
                    <select autocomplete="on" type="text" class="jformcontrol" id="interestperiod"
                        name="interestperiod">
                        <option value="" selected="">--Select&nbsp;Interest&nbsp;Period--&nbsp;
                        </option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Every 2 Weeks">Every 2 Weeks</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Every 2 Months">Every 2 Months</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Every 4 Months">Every 4 Months</option>
                        <option value="Semi-Annually">Semi-Annually</option>
                        <option value="Annually">Annually</option>
                    </select>
                </div>
            </div>
            <div class="jformgroup jformgroupcol jmargin-left">
                <div class="jformgroup jformgroupcol">
                    <label class="jcontrollabel"> Duration: </label>
                    <div class="col-form-group">
                        <input placeholder="Duration" type="text" class="jformcontrol jmargin-top"
                            id="loanduration" name="loanduration">
                        <select autocomplete="on" type="text" class="jformcontrol" id="loandurationfactor"
                            name="loandurationfactor">
                            <option value="" selected="">--Select&nbsp;Loan&nbsp;Duration--&nbsp;
                            </option>
                            <option value="Day">Day</option>
                            <option value="Week">Week</option>
                            <option value="Month">Month</option>
                            <option value="Year">Year</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="jformgroup">
            <div class="jformgroup jformgroupcol">
                <label class="jcontrollabel"> Repayment Frequency: </label>
                <select class="jformcontrol jmargin-top" id="frequency" name="frequency">
                    <option value="" selected="">--Select&nbsp;Repayment&nbsp;Frequency--&nbsp;
                    </option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Every 2 Weeks">Every 2 Weeks</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Every 2 Months">Every 2 Months</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Every 4 Months">Every 4 Months</option>
                    <option value="Semi-Annually">Semi-Annually</option>
                    <option value="Annually">Annually</option>
                </select>
            </div>
            <div class="jformgroup jformgroupcol jmargin-left">
                <label class="jcontrollabel"> Number Of Repayments: </label>
                <input placeholder="Number Of Repayments" type="text" class="jformcontrol jmargin-top"
                    id="no_repayments" name="no_repayments" disabled>
            </div>
            <div class="jformgroup jformgroupcol jmargin-left">
                <label class="jcontrollabel"> Type Of Facility: </label>
                <select class="jformcontrol jmargin-top" id="loantype" name="loantype">
                    <option value="" selected="">--Select&nbsp;Facility&nbsp;Type--&nbsp;
                    </option>
                    <option value="I-Instalment">I-Instalment</option>
                    <option value="R-Revolving Credit">R-Revolving Credit</option>
                    <option value="O-Open ">O-Open </option>
                    <option value="C-Credit Card">C-Credit Card</option>
                    <option value="P-Personal Cash">P-Personal Cash</option>
                    <option value="H-Home Loan">H-Home Loan</option>
                    <option value="S-Short Term Insurance">S-Short Term Insurance</option>
                    <option value="L-Long Term Insurance">L-Long Term Insurance</option>
                    <option value="G-Garage Card">G-Garage Card</option>
                    <option value="E-Single Credit Facility">E-Single Credit Facility</option>
                    <option value="U-Utility">U-Utility</option>
                    <option value="N-Pension Backed Lending">N-Pension Backed Lending</option>
                    <option value="B-Building Loan">B-Building Loan</option>
                    <option value="T-Student Loan">T-Student Loan</option>
                    <option value="J-Revolving Unsecured Credit">J-Revolving Unsecured Credit
                    </option>
                    <option value="D-Debt Recovery Account">D-Debt Recovery Account</option>
                    <option value="F-Open Account Without Credit Limit">F-Open Account Without
                        Credit
                        Limit</option>
                    <option value="V-Overdraft">V-Overdraft</option>
                    <option value="MICRO-LOANS">MICRO-LOANS</option>
                    <option value="HIRE PURCHASE">HIRE PURCHASE</option>
                    <option value="MICRO-LEASES">MICRO-LEASES</option>
                    <option value="STAFF LOANS">STAFF LOANS</option>
                </select>
            </div>
        </div>
        <div class="jformgroup">
            <div class="jformgroup jformgroupcol">
                <label class="jcontrollabel"> Installment Amount: </label>
                <input type="text" class="jformcontrol jmargin-top" placeholder="Installment Amount"
                    id="installmentamount" name="installmentamount" disabled>
            </div>
            <div class="jformgroup jformgroupcol jmargin-left">
                <label class="jcontrollabel"> Currency: </label>
                <input placeholder="Currency" value="Naira" type="text" class="jformcontrol jmargin-top"
                    id="lcurrency" name="lcurrency" disabled>
            </div>
            <div class="jformgroup jformgroupcol jmargin-left">
                <label class="jcontrollabel"> Purpose Of Facility: </label>
                <select class="jformcontrol jmargin-top" id="purpose" name="purpose">
                    <option value="" selected="">
                        --Select&nbsp;Purpose&nbsp;Of&nbsp;Facility&nbsp;--&nbsp;
                    </option>
                    <option value="AGRICULTURE">AGRICULTURE</option>
                    <option value="CONSUMER/PERSONAL">CONSUMER/PERSONAL</option>
                    <option value="COMMERCE">COMMERCE</option>
                    <option value="MANUFACTURING">MANUFACTURING</option>
                    <option value="REAL ESTATE/CONSTRUCTION">REAL ESTATE/CONSTRUCTION</option>
                    <option value="COMMUNICATION">COMMUNICATION</option>
                    <option value="HOSPITALITY">HOSPITALITY</option>
                    <option value="MEDICAL">MEDICAL</option>
                    <option value="EDUCATION">EDUCATION</option>
                    <option value="OTHERS">OTHERS</option>
                </select>
            </div>
        </div>
        <div class="jformgroup">
            <div class="jformgroup jformgroupcol">
                <label class="jcontrollabel"> Security: </label>
                <input type="text" class="jformcontrol jmargin-top" placeholder="Security" id="security"
                    name="security">
            </div>
            <div class="jformgroup jformgroupcol jmargin-left">
                <label class="jcontrollabel"> previous account number: </label>
                <input placeholder="Previous account number" type="text" class="jformcontrol jmargin-top"
                    name="previousaccount" id="previousaccount">
            </div>
            <div class="jformgroup jformgroupcol jmargin-left">
                <label class="jcontrollabel"> previous branch: </label>
                <input placeholder="Previous branch" type="text" class="jformcontrol jmargin-top"
                    name="previousbranch" id="previousbranch">
            </div>
        </div>
        <div>
            <button type="button" class="j-action-btn float-left jmargin-top hidden"> calulate </button>
        </div>
        </div>
    
        <!-- other info -->
    
        <div class="section-header">
        <h1 class="jmargin-top"> other info </h1>
        </div>
        <div class="col-form-group">
        <div class="loan-set"></div>
        <div>
            <button type="button" class="j-action-btn jmargin-top float-right" id="feeappendbtn">
                append loan fee
            </button>
        </div>
        </div>
    
        <div class="col-form-group">
        <div class="jformgroup">
            <div class="jformgroup jformgroupcol">
                <label class="jcontrollabel">Link loan to the customers savings | current account?:
                </label>
                <select class="jformcontrol jmargin-top" id="connectcustomeraccount"
                    name="connectcustomeraccount">
                    <option value="No" selected> No</option>
                    <option value="Yes"> Yes</option>
                </select>
            </div>
            <div class="jformgroup jformgroupcol jmargin-left">
                <label class="jcontrollabel"> Loan Officer: </label>
                <select class="jformcontrol jmargin-top" name="loanofficer" id="loanofficer">
                    <option value="Admin" selected> Admin</option>
                </select>
            </div>
        </div>
        <div class="jformgroup">
            <div class="jformgroup jformgroupcol">
                <label class="jcontrollabel">Customer Account Number: </label>
                <input type="text" placeholder="Account Number" class="jformcontrol jmargin-top"
                    id="customeraccount" name="customeraccount">
            </div>
            <div class="jformgroup jformgroupcol jmargin-left">
                <label class="jcontrollabel"> Customer Account Name: </label>
                <input type="text" placeholder="Customer Account Name" class="jformcontrol jmargin-top"
                    id="customeraccountname" name="customeraccountname" disabled>
            </div>
        </div>
        <div class="jformgroup">
            <div class="jformgroup jformgroupcol">
                <label class="jcontrollabel">GL Cash Account: </label>
                <select class="jformcontrol jmargin-top" id="glaccount" name="glaccount">
                    <option value="" selected=""> -- Select GL Cash Account --</option>
                </select>
            </div>
            <div class="jformgroup jformgroupcol jmargin-left">
                <label class="jcontrollabel"> GL Loan Account: </label>
                <select class="jformcontrol jmargin-top" name="glloanaccount" id="glloanaccount">
                    <option value="" selected=""> -- Select Loan Account --</option>
                </select>
            </div>
        </div>
    
        <div class="jformgroup jformgroupcol">
            <label class="jcontrollabel">Description: </label>
            <textarea class="jformcontrol jmargin-top" rows="5" resize="none" id="loanaccountdecription"
                name="description"></textarea>
        </div>
    
        <!-- authorization -->
        <div class="section-header">
            <h1 class="jmargin-top"> Transaction Authorization </h1>
        </div>
        <div class="col-form-group">
            <div class="jformgroup">
                <div class="jformgroup jformgroupcol">
                    <label class="jcontrollabel">Approve Transaction: </label>
                    <input type="password" placeholder="Authorizing officer password"
                        class="jformcontrol jmargin-top" id="authorisation" name="authorisation">
                </div>
                <div class="jformgroup jformgroupcol jmargin-left">
                    <label class="jcontrollabel">Send for Approval: </label>
                    <label class="switch j-slider jmargin-top">
                        <input type="checkbox" id="sendforapproval" name="sendforapproval">
                        <span class="slider round"></span> 
                    </label>
                </div>
            </div>
        </div>
    
        <div class="section-header">
            <h1 class="jmargin-top"> </h1>
        </div>
    
        <div class="jmargin-top">
            <button type="button" style="background-color: #c82333" class="j-action-btn-alt jmargin-top"
                id="resetloanaccountbtn"> rest </button>
            <button type="button" class="j-action-btn-alt jmargin-top jmargin-left"
                id="saveloanaccountbtn">save
            </button>
        </div>
    
        </div>
    `
}

var extendloanbtn = document.getElementById('extendloan')
if(extendloanbtn) extendloanbtn.addEventListener('click', openExtendLoan, false)