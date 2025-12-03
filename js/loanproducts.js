var form;
async function openLoanProducts () {
    await httpRequest('loanproducts.php')
    form = document.getElementById('loanproductform');
    if(form) {
        
        form.querySelector('button').addEventListener('click', function() {
            if(form.querySelector('#loanproduct').value < 1) {
                errorBox('Product name is required')
                form.querySelector('#loanproduct').style.borderColor ='red'
            }
            else {
                form.querySelector('#loanproduct').style.borderColor =''
                saveLoanProduct()
            }
        })
        
        jtabledata = document.getElementById('jtabledata')
        initializePaginationParams(existingLoanProductsSetCurrentPage)
        await fetchExistingLoanProducts()
    }
}

async function fetchExistingLoanProducts() {
    let result = await httpJsonRequest('../controllers/fetchloanproducts.php')
    if(result?.status) {
        existingloansproducts = datasource = result.data.data
        existingloansproducts.length && initPagination(existingloansproducts, existingLoanProductsSetCurrentPage)
    }
}

function existingLoanProductsSetCurrentPage (pageNum){

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(existingloansproducts.length) {
        existingloansproducts.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendLoanProductsTableRows(item, index)
            }
        })
        
        if(document.querySelector('#loanproducttable tbody').innerHTML === '') LoanProductsbtn.click()
    }
}

async function appendLoanProductsTableRows(item, index) {
     jtabledata.innerHTML += `
        <tr class="source-row-item">
            <td>${index + 1}</td>
            <td>${ item.loanproductname } </td>
            <td>
                <div class="flex" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="removeLoanProduct(${index})">Delete</button>
                </div>
            </td>
        </tr>
    `
}

async function removeLoanProduct(index) {
    let selecteditem = existingloansproducts[index];
    if(confirm(`Are you sure you want to delete ${selecteditem.loanproductname.toLowerCase()}?`)) {
        let paramstr = new FormData() 
        paramstr.append('id', selecteditem?.id)
        let result = await httpJsonRequest('../controllers/deleteloanproduct.php', 'POST', paramstr);
        if(result?.status) {
            callModal('Loan product deleted', 1)
            openLoanProducts()
        }
        else callModal(result.message, 0)
    }
}


async function saveLoanProduct() {
    let paramstr = new FormData(form)
    showSpinner();
	var request = getAjaxObject();

    request.open('POST','../controllers/loanproductscript.php',true);

    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                let parseRequest = JSON.parse(request.responseText)
                if(parseRequest.status){
                    callModal('Loan product saved successfully', 1)
                    form.reset();
                    openLoanProducts()
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
    request.send(paramstr);
    
}

const LoanProductsbtn = document.getElementById('loanproducts')
if(LoanProductsbtn) LoanProductsbtn.addEventListener('click', openLoanProducts, false)