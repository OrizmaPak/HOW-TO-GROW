var supplierForm; var resetsupplierformbtn; var saveSupplierbtn; var companyName; var contactPerson; var phoneNumber; var officeAddress; var nationality; var state; var typeOfSupplier; var supplierBank; var supplierAccount;
var inputs; var suppliers = []; var itemToUpdate; var ttype

async function openSupplier() {
    await httpRequest('supplier.php')

    supplierForm = document.getElementById('supplierform');
    jtabledata = document.getElementById('jtabledata') 
    
    if(supplierForm) {
        resetsupplierformbtn = supplierForm.querySelector('#resetsupplierformbtn')
        saveSupplierbtn = supplierForm.querySelector('#savesupplierbtn') 
        companyName = supplierForm.querySelector('#companyname')
        contactPerson = supplierForm.querySelector('#contactperson')
        phoneNumber = supplierForm.querySelector('#phonenumber')
        officeAddress = supplierForm.querySelector('#officeaddress')
        nationality = supplierForm.querySelector('#nationality')
        state = supplierForm.querySelector('#state')
        typeOfSupplier = supplierForm.querySelector('#typeofsupplier')
        supplierBank = supplierForm.querySelector('#supplierbank')
        supplierAccount = supplierForm.querySelector('#supplieraccount')
        ttype = supplierForm.querySelector('#ttype')
    }

    if(resetsupplierformbtn) resetsupplierformbtn.addEventListener('click', () => resetSupplierform())
    if(saveSupplierbtn) saveSupplierbtn.addEventListener('click', () => runSupplierFormValidations())
    
    await fetchSuppliers(renderSuppliersTable)

}

function renderSuppliersTable() {
    if(jtabledata) jtabledata.innerHTML = '';
    if(suppliers.length){
        suppliers.map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.companyname } </td>
                    <td> ${ item.typeofsupplier } </td>
                    <td> ${ item.contactperson } </td>
                    <td> ${ item.nationality } </td>
                    <td> ${ item.state } </td>
                    <td> ${ item.officeaddress } </td>
                    <td> ${ item.phonenumber } </td>
                    <td> ${ item.supplierbank } </td>
                    <td> ${ item.supplieraccount } </td>
                    <td>
                        <span class='viewbtn mtablebtn mbtnblue' style="color:rgb(0, 105, 217);font-weight:bold" onclick="updateSupplierItem(${index})">Edit</span>
                    </td>
                </tr>
            `
        })
        if(document.querySelector('#approveloanstable tbody').innerHTML === '') supplierbtn.click()
        
    }
}

function updateSupplierItem(itemindex) { 
    let item = suppliers[+itemindex];
    if(item) {
        itemToUpdate = item;
        supplierForm.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        saveSupplierbtn.innerHTML = 'Update Supplier';
        try {
            Object.keys(item).map((key, i) => {
                let input = supplierForm.querySelector('#'+key)
                if(input) input.value = item[key];
            })
        }
        catch (e){
            null
        } 
    }
}

async function saveSuppliers () {

	showSpinner();
	var request = getAjaxObject();
    
    request.open('POST','../controllers/supplierscript.php',true);
    
    request.onreadystatechange = function(e){
         
        if(request.readyState == 1){} 
        
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            console.log('parserequest', request.responseText)
            let parseRequest = JSON.parse(request.responseText)
            if(parseRequest.message.includes("Successful") || parseRequest.message.includes("Successful")){
                callModal('Request successful', 1)
                resetSupplierform()
            }
            else {
                callModal('Request failed', 0)
            }
        }else{
            hideSpinner()
        }

        e.stopPropagation();
    }


    request.setRequestHeader('Connection','close');
    request.send(collectSupplierFormData());
}

function collectSupplierFormData() {
    if(supplierForm) {
       let paramstr = new FormData(supplierForm)
       if(itemToUpdate) paramstr.append('id', itemToUpdate.id)
       for (const [key, value] of paramstr.entries()) {
            console.log(`${key}: ${value}`);
        }
       return paramstr;
    }
}

async function fetchSuppliers (cb=null) {
    let result = await fetchRequest('../controllers/fetchsupplierscript.php')
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.message.includes('Successful') && parseResult.result.includes('Successful')){
           suppliers = parseResult.data.data
           cb();
        }
    }
}

function resetSupplierform() {
    if(supplierForm) supplierForm.reset();
    itemToUpdate = null;
    saveSupplierbtn.innerHTML = 'Save Supplier';
}

function runSupplierFormValidations () {

    inputs = [
        {input: companyName, validation: {required: 'Company name is required'}},
        {input: contactPerson, validation: {required: 'Contact person is required',}},
        {input: phoneNumber, validation: {required: 'Phone number is required'}},
        {input: officeAddress, validation: {required: 'Address is required'}},
        {input: nationality, validation: {required: 'Nationality is required'}},
        {input: state, validation: {required: 'State is required'}},
        {input: typeOfSupplier, validation: {required: 'Select a supplier type'}},
        {input: supplierBank, validation: {required: 'bank is required'}},
        {input: supplierAccount, validation: {required: 'account number is required'}},
        {input: ttype, validation: {required: 'type of account is required'}}
    ]

    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else saveSuppliers()
}

var supplierbtn = document.getElementById('supplier')
if(supplierbtn) supplierbtn.addEventListener('click', openSupplier, false)