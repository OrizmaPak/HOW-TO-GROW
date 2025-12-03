var products = []; var jtabledata;

async function openSavingsAccountsproduct() {
    
    await httpRequest('savingsaccountsproducts.php')
    
    jtabledata = document.getElementById('jtabledata')
    
    await fetchSavingsProducts(renderTable);
}

function renderTable() {
    if(jtabledata) jtabledata.innerHTML = '';
    if(products.length){
        products.map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.productname } </td>
                    <td> ${ item.interestrate} </td>
                    <td> ${ item.interestmethod} </td>
                    <td style="text-transform:none"> ${ item.addinterestperiod} of every month </td>
                    <td>
                        <span style="color:rgb(0, 105, 217);font-weight:bold" onclick="updateItem(${index})">Update</span>
                    </td>
                </tr>
            `
        })
        
    }
}

async function updateItem(itemindex) {
    if(itemindex !== null || itemindex !== undefined) {
        sessionStorage.setItem('savingsproduct', JSON.stringify(products[itemindex]))
        try {
            document.getElementById('savingsproducts').click()
        }
        catch(e) {
            return null
        }
    }
}

async function fetchSavingsProducts(cb=null) {
    let result = await fetchRequest('../controllers/fetchsavingsproductscript.php')
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.message.includes('Successful') && parseResult.result.includes('Successful')){
           products = parseResult.data.data
           cb();
        }
    }
}
var savingsaccountproductbtn = document.getElementById('savingsaccountsproducts')
if(savingsaccountproductbtn) savingsaccountproductbtn.addEventListener('click', openSavingsAccountsproduct, false)