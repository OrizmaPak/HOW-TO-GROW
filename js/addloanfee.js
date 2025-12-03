var form;
async function openAddloanFee () {
    await httpRequest('addloanfee.php')
    form = document.getElementById('addloanfeeform');
    let saveLoanFeeBtn = form.querySelector('button#saveloanfeebtn');
    if(document.querySelector('#addloanfeeform #swittchhtr8')){
        document.querySelector('#addloanfeeform #swittchhtr8').addEventListener('click', e=>{
            if(document.querySelector('#addloanfeeform #swittchhtr8').checked){
                document.querySelector('#addloanfeeform #swittchhtr8').checked = false;
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div small').style.left = '0%';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.backgroundColor = 'grey';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.borderColor = 'grey';
            }else{
                document.querySelector('#addloanfeeform #swittchhtr8').checked = true;
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.backgroundColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div').style.borderColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec8 label input + div small').style.left = '50%'
            }
        })
    }
    if(document.querySelector('#addloanfeeform #swittchhtr9')){
        document.querySelector('#addloanfeeform #swittchhtr9').addEventListener('click', e=>{
            if(document.querySelector('#addloanfeeform #swittchhtr9').checked){
               document.querySelector('#addloanfeeform #swittchhtr9').checked = false;
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div small').style.left = '0%';
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.backgroundColor = 'grey';
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.borderColor = 'grey';
            }else{
                document.querySelector('#addloanfeeform #swittchhtr9').checked = true;
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.backgroundColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div').style.borderColor = 'green';
                document.querySelector('div.checkbox.switchergrey.oresec9 label input + div small').style.left = '50%'
            }
        })
    }
    if(saveLoanFeeBtn) saveLoanFeeBtn.addEventListener('click', runLoanFeeFormValidations)
      
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(viewloanFeessetCurrentPage)
    await fetchPageData()
}

async function fetchPageData() {
    await fetchAddLoanGLAccounts()
    await fetchExistingLoanFees()
}

function runLoanFeeFormValidations() {
    
    inputs = [
        {input: form.querySelector('#addfeename'), validation: { required: 'fee is required'}}, 
        {input: form.querySelector('#feemethod'), validation: { required: 'fee posting frequency is required'}},
        {input: form.querySelector('#chargebasedon'), validation: { required: 'fee addition period is required'}},
        {input: form.querySelector('#addloanfeeglaccount'), validation: { required: 'loan fee gl is required'}}
    ]

    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else saveLoanFee()
}

async function saveLoanFee() {
    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/loanfeescript.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    
                    form.querySelector('button#saveloanfeebtn').innerHTML = 'Submit'
                    form.querySelector('#addfeename').removeAttribute('readonly')
                    
                    callModal('loan fee saved successfully', 1)
                    form.reset();
                    openAddloanFee()
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();
    
        try{
            e.stopPropagation();
        }catch(ex){}
    }

    request.setRequestHeader('Connection','close'); 
    request.send(getAddLoanFormFormData());
}

function getAddLoanFormFormData() {
    let paramstr = new FormData(form);
    return paramstr
}

async function fetchAddLoanGLAccounts() {
    let paramstr = new FormData();
    paramstr.append('accounttype', 'INCOME')
    let result = await httpJsonRequest('../controllers/fetchglbyaccounttype.php', 'POST', paramstr);
    if(result?.status) {
        addloanfeeglaccounts = result.data
        let options = ''
        result.data?.map(function(item, index){
            options += `
                <option value="${item.accountnumber}"> ${ item.description} | ${item.accountnumber} </option>
            `
        })
        if(form.querySelector('#addloanfeeglaccount')){
            form.querySelector('#addloanfeeglaccount').innerHTML = ''
            form.querySelector('#addloanfeeglaccount').innerHTML = '<option value=""> -- Select Fee GL Account -- </option>' + options
        }
    }
}

async function fetchExistingLoanFees() {
    let result = await httpJsonRequest('../controllers/fetchloanfees.php');
     if(result?.status) {
         existingfees = datasource = result.data.data;
         existingfees.length && initPagination(existingfees, viewloanFeessetCurrentPage)
     }
}

function viewloanFeessetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(existingfees.length) {
        existingfees.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendLoanFeesTableRows(item, index)
            }
        })
        if(document.querySelector('#viewdepositstable tbody').innerHTML === '') addloanfeebtn.click()
    }
}

async function appendLoanFeesTableRows(item, index) {
    let gl = addloanfeeglaccounts?.find(val => val.accountnumber === item.loanfeeglaccount)
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ item.feename } </td>
            <td>${ item.feemethod } </td>
            <td>${ item.chargebasedon} </td>
            <td>${gl?.description}</td>
            <td>
                <div class="flex" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="editLoanFee(${index})">Edit</button>
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="removeLoanFee(${index})">Delete</button>
                </div>
            </td>
        </tr>
    `
}

async function removeLoanFee(index) {
    let selecteditem = existingfees[index];
    if(confirm(`Are you sure you want to delete ${selecteditem.feename.toLowerCase()}?`)) {
        let paramstr = new FormData() 
        paramstr.append('id', selecteditem?.id)
        let result = await httpJsonRequest('../controllers/deleteloanfee.php', 'POST', paramstr);
        if(result?.status) {
            callModal('Loan fee deleted', 1)
            openAddloanFee()
        }
        else callModal(result.message, 0)
    }
}

function editLoanFee(index) {

    let selecteditem = existingfees[index];
    if(selecteditem) {
        try {
            form.querySelector('button#saveloanfeebtn').innerHTML = 'Update Fee'
            form.querySelector('#addfeename').setAttribute('readonly', true);
            
            form.querySelector('#addfeename').value = selecteditem.feename
            form.querySelector('#addloanfeeglaccount').value = selecteditem.loanfeeglaccount
            form.querySelector('#feemethod').value = selecteditem.feemethod
            form.querySelector('#chargebasedon').value = selecteditem.chargebasedon

        }
        catch(e) {console.log(e)}
    }
}

const addloanfeebtn = document.getElementById('addloanfee')
if(addloanfeebtn) addloanfeebtn.addEventListener('click', openAddloanFee, false)