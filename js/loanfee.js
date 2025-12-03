
async function openLoanFee () {
    
    await httpRequest('loanfee.php')

   
    const resetLoanFeeBtn = document.getElementById('reset-lf')
    const saveLoanFeeBtn = document.getElementById('save-lf')
    const loanfeeform = document.getElementById('loanfeeform')
    const printloanfees = document.getElementById('print-lfs')
    const exportloafees = document.getElementById('export-lfs')
    
    let inputs;
    let datasource = []
    
    if(resetLoanFeeBtn) resetLoanFeeBtn.addEventListener('click', () => resetLoanFeeForm());
    if(saveLoanFeeBtn) saveLoanFeeBtn.addEventListener('click', () => runLoanFeeSaveValidations());
    if(printloanfees) printloanfees.addEventListener('click', () => printLoanFees())
    if(exportloafees) exportloafees.addEventListener('click', () => exportLoanFees(loanfeetable.id, 'loan fees'))
    
    
    function resetLoanFeeForm() {
        if(loanfeeform) loanfeeform.reset()
    }
    
    function runLoanFeeSaveValidations() {
    
        let feename = document.getElementById('loanfeename');
        let feemethod = document.getElementById('loanfeemethod');
        let chargebasis = document.getElementById('loanchargebasis');
        let glaccount = document.getElementById('loanglaccount');
    
        if(glaccount && chargebasis && feemethod && feename) {
            
            inputs = [
                { input: feename, validation: {required: 'Loan fee name is required'} },
                { input: feemethod, validation: {required: 'Loan fee method is required'} },
                { input: chargebasis, validation: {required: ' Select a charge basis'} },
                { input: glaccount, validation: {required: ' Select a GL account'} }
            ] 
    
            let validations = [];
    
            inputs.map( (field, index) => {
                let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
                if(result)  validations.push(result) ;  
            })
        
            if(validations.length) validatorMapper(validations)
        
            else saveLoanFee()
        }
    
    }
    
    async function saveLoanFee() {
        if(loanfeeform) {
            let paramstr = new FormData(loanfeeform)
            if(paramstr) {
                
                // api here 
    
                // sample data
                let data = datasource = []
                renderLoanFeeTable()
            }
        }
    }
    
    
    function renderLoanFeeTable() {
    
        let table = document.getElementById('loanfeetable')
        let tablebody = table.querySelector('tbody')
    
        if(datasource.length) {
            if(tablebody) {
                tablebody.innerHTML = ''            
                datasource.forEach((item, index) => tablebody.innerHTML += `
                    <tr>
                        <td> ${ index +1 }</td>
                    </tr>
                `
            )}
        }
        else {
            if(tablebody) tablebody.innerHTML = renderNoTableData(5)
        }
    }
    
    async function fetchLoanFees () {
    
        // sample data
    
        let data = datasource = []
        renderLoanFeeTable()
    }
    
    fetchLoanFees()
    
    
    function renderNoTableData(colspan) {
        return  `
            <tr id="no-data">
                <td colspan=${colspan}>
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
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
        return element.value?.toString().length < 1 ? false : true
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
    
    function printLoanFees() {
        let content = document.getElementById('jpagecontent'); 
        if(content) {
            var winPrint = window.open('loan fees', '', 'width=1000,height=900'); 
            winPrint.document.write('<html><head><title></title>');
            winPrint.document.write('<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">');
            winPrint.document.write(' <h1 style="text-align:center;font-weight:400px;text-transform:uppercase;font-size:14px;"> loan fees </h1> ' + content.innerHTML);
            winPrint.document.write('<script type="text/javascript">addEventListener("load", () => { print(); close(); })</script></body></html>');
            winPrint.document.close();
            winPrint.focus();
        }
    }
    
    var exportLoanFees = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
          , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
          , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
          if (!table.nodeType) table = document.getElementById(table)
          var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
          window.location.href = uri + base64(format(template, ctx))
        }
      })()
      
}

var loanfeebtn = document.getElementById('loanfee');
if(loanfeebtn) loanfeebtn.addEventListener('click', openLoanFee, false)