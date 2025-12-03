var form; let updateId = null;
async function openCollateral() {
    await httpRequest('collateral.php')
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(setCollateralCurrentPage)
    
    pFiles = document.querySelector('#document')
    fileselect = document.querySelector('.file-action')
    if(fileselect) input = fileselect.querySelector('input[id="document"]')
    
    if(fileselect) fileselect.addEventListener('click', () =>{ if(input) input.click()})
    if(input) input.addEventListener('change', (e) => onCollateralFileInputChange(e.target))
    
    form = document.getElementById('collateralform')
    filterform = document.getElementById('filtercollateralform')
    
    if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', validateCollateralForm)
    if(form.querySelector('button#resetbtn')) form.querySelector('button#resetbtn').addEventListener('click', resetCollateralForm)
    if(filterform.querySelector('button#submit')) filterform.querySelector('button#submit').addEventListener('click', () => fetchCollaterals(true))
    
    fetchCollaterals()
}


function validateCollateralForm() {

    inputs = [
        { input: form.querySelector('#accountnumber'), validation: {required: 'account number is required'}},
        { input: form.querySelector('#documenttitle'), validation: {required: 'document title is required'}},
        { input: form.querySelector('#documentid'), validation: {required: 'document ID is required'}},
    ]
    
    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field?.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else {
        if(form.querySelector('#document').files.length) {
            form.querySelector('#document').parentElement.style.borderColor = ''
            saveCollateral()
        }
        else {
            form.querySelector('#document').parentElement.style.borderColor = 'red';
            return errorBox('Please Select a file')
        }
    }
}

async function saveCollateral() {
    showSpinner();
    var request = getAjaxObject();
    request.open('POST','../controllers/collateralscript.php',true);
    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    resetCollateralForm()
                    fetchCollaterals()
                    callModal('Collacteral successful saved', 1)

                }
                else return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();
        try{
            e.stopPropagation();
        }catch(ex){}
    }
    
    request.setRequestHeader('Connection','close'); 
    request.send(getCollateralFormParams());
}

async function fetchCollaterals(filtered=false) {
    showSpinner();
    var request = getAjaxObject();
    request.open('POST','../controllers/fetchcollaterals.php',true);
    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    if(jtabledata) jtabledata.innerHTML = '';
                    data = datasource = parseRequest.data
                    if(data.length) initPagination(data, setCollateralCurrentPage)
                    
                }
                else return callModal('Not records retrieved')
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();
        try{
            e.stopPropagation();
        }catch(ex){}
    }
    
    request.setRequestHeader('Connection','close'); 
    if(filtered) {
        let paramstr = new FormData(filterform)
        request.send(paramstr);
    }
    else request.send();
    
}

function setCollateralCurrentPage(pageNum) {
                
    currentPage = pageNum;
    
    handleActivePageNumber();
    handlePageButtonsStatus();

    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    
    if(jtabledata) jtabledata.innerHTML = '';
    
    if(datasource.length) {
        datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                renderCollateralTable(item, index)
            }
        })
        if(document.querySelector('#collateralstable tbody').innerHTML === '') collateralbtn.click()
    }
}

function renderCollateralTable(item, index) {
    if(jtabledata) {
        jtabledata.innerHTML +=`
            <tr class="source-row-item">
                <td>${ index + 1 }</td>
                <td>${ item.accountnumber }</td>
                <td>${ item.documentid == '-' ? '' :  item.documentid}</td>
                <td>${ item.documenttitle} </td>
                <td>
                    <div class="flex" style="align-items:center">
                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="editCollateral(${index})">Edit</button>
                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="removeCollateral(${index})">Delete</button>
                    </div>
                </td>
            </tr>
        `
    }
}

function resetCollateralForm() {
    try {
        form.reset();
        updateId = null;
        form.querySelector('button#submit').innerHTML = 'Upload'
        let previewEl = document.querySelector('.file-area');
        if(previewEl) previewEl.innerHTML = '';
    }
    catch(e) {console.log(e)}
}

function editCollateral(index) {
    let selectedItem = datasource[+index]
    if(selectedItem) {
        updateId = selectedItem.id
        try {
            form.querySelector('#documenttitle').value = selectedItem.documenttitle
            form.querySelector('#documentid').value = selectedItem.documenttitle
            form.querySelector('#accountnumber').value = selectedItem.accountnumber
            form.querySelector('button#submit').innerHTML = 'Save Update'
        }
        catch(e) {console.log(e)}
    }
}

async function removeCollateral(index) {
    let selecteditem = datasource[index];
    if(confirm(`Are you sure you want to delete this collateral?`)) {
        let paramstr = new FormData() 
        paramstr.append('id', selecteditem?.id)
        let result = await httpJsonRequest('../controllers/deletecollateral.php', 'POST', paramstr);
        if(result?.status) {
            callModal('Collateral deleted', 1)
            openCollateral() 
        }
        else callModal(result.message, 0)
    }
}

function getCollateralFormParams() {
    let paramstr = new FormData(form)
    if(updateId) paramstr.append('id', updateId)
    if(paramstr) {
        try {
            paramstr.append('photofilename',input.files[0].name);		
		    paramstr.append('userphotoname',input.files[0]);
        }
        catch(ex){
    	 paramstr.append('photofilename','-');		
    	 paramstr.append('userphotoname','-');
    	 
       }
    }
    return paramstr
}

function collateralFileTypeValidator(selectedFiles) {
    let isValid = false;
    let selectedFilesArray = Object.values(selectedFiles);
    selectedFilesArray.forEach(file => {
        let splitFileName = file.name.split('.');
        let extension = splitFileName[splitFileName.length - 1];
        if (['jpg','jpeg', 'png','pdf','docx'].includes(extension)) isValid = true;
        else isValid = false;
    })  
    return isValid;
}

function onCollateralFileInputChange(event) {

    let previewEl = document.querySelector('.file-area');
    if(previewEl) previewEl.innerHTML = '';
    
    let selectedFiles = input.files;

    if (!collateralFileTypeValidator(selectedFiles)) {
        errorBox('Unsupported file selected')
        input.value = event = null;
    }

    else {
                
        for(let i = 0; i < selectedFiles.length; i++) {
            let splitFileName = selectedFiles[i].name.split('.');
            let extension = splitFileName[splitFileName.length - 1];
            if(['pdf', 'docx'].includes(extension?.toLowerCase())) {
                const div = document.createElement('div')
                div.style.cssText = 'border-radius:5px;border:1px solid rgba(0, 0, 0, 0.2);padding:30px;font-size:12px'
                div.innerHTML = selectedFiles[i].name;
                previewEl.appendChild(div)
            }
            else {
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `promotion-file-${i}`)
                previewEl.appendChild(img);
                img.src = URL.createObjectURL(event.files[i]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
            }
        }

    }
}

var collateralbtn = document.getElementById('collateral')
if(collateralbtn) collateralbtn.addEventListener('click', openCollateral, false)
