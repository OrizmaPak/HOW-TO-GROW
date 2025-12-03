var viewgl_datasource = [];

const viewglepaginate=(data)=>{
    viewgl_datasource = [];
    viewgl_datasource.push(data.data)
    initPagination(viewgl_datasource[0], viewglsetCurrentPage)
    document.getElementById('viewgltabledata2').innerHTML = viewgl_datasource[0].map(dat=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${dat.accountnumber} </td>
                                <td> ${dat.description} </td>
                                <td> ${dat.accounttype} </td>
                                <td> ${dat.groupname} </td>
                            </tr>`)
    }).join('')
    }


var viewglsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewgl_datasource.length) {
        viewgl_datasource[0].forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewglTableRows(item, index)
            }
        })
        if(document.querySelector('#viewglfulltable tbody').innerHTML === '') oreviewglaccountsbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("viewgltabledata").innerHTML=  renderNoTableData()
    }
};

const vieweditgl =( accountnumber, description, accounttype, groupname )=>{
    console.log('vieweditgl', [accountnumber, description, accounttype, groupname]);
    sessionStorage.setItem('vieweditgl', JSON.stringify([accountnumber, description, accounttype, groupname]));
    document.getElementById("addglaccount").click(); 
}

function appendviewglTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("viewgltabledata").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${data.accountnumber} </td>
                                <td> ${data.description} </td>
                                <td> ${data.accounttype} </td>
                                <td> ${data.groupname} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="vieweditgl('${data.accountnumber}', '${data.description}', '${data.accounttype}', '${data.groupname}')">Edit</button>
                                    </div>
                                </td>
                            </tr>
    `
} 



	function getviewglaccountsearchactypeP(){
		var paramstr = new FormData();
		paramstr.append('accounttype',document.getElementById('viewgl_select').value);
	   return paramstr;
}

async function oreviewglaccounts() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('viewglaccounts.php', 'override'); 
        
        jtabledata = document.getElementById('viewgltabledata');
        // paginationLimit = 10;
        initializePaginationParams();
        
        // callController =(controller, params, name, validate, funct, silent, e)
        callController('fetchglbyaccounttype.php', null, 'viewglaccount', null, viewglepaginate, 'silent');
        // if(document.getElementById('viewgl_select'))document.getElementById('viewgl_select').addEventListener('change',e=>callController('controller.php', null, 'viewglselect', null, alert),false);
        if(document.getElementById('viewgl_select'))document.getElementById('viewgl_select').addEventListener('keyup',e=>{
            if(document.getElementById('viewgl_select').value.length < 0){
             return
            }else{
                callController('fetchglbyaccounttype.php', getviewglaccountsearchactypeP(), 'fetchglbyaccounttype', null, viewglepaginate, 'silent')
            }
        },false);
        if(document.getElementById('viewgl_select'))document.getElementById('viewgl_select').addEventListener('change',e=>{
            if(document.getElementById('viewgl_select').value.length < 0){
             return
            }else{
                callController('fetchglbyaccounttype.php', getviewglaccountsearchactypeP(), 'fetchglbyaccounttype', null, viewglepaginate, 'silent')
            }
        },false);
        if(document.getElementById('viewglaccountexport'))document.getElementById('viewglaccountexport').addEventListener('click',e=>{
            tableToExcel('viewglfulltable2', 'LIST OF GENERAL LEDGER ACCOUNT')},false);
        if(document.getElementById('viewglaccountprint'))document.getElementById('viewglaccountprint').addEventListener('click',e=>{
            console.log('ok') 
            printContent('LIST OF GENERAL LEDGER ACCOUNT',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewglfulltableparant')},false);

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


var oreviewglaccountsbbtn = document.getElementById("viewglaccounts");
if (oreviewglaccountsbbtn) oreviewglaccountsbbtn.addEventListener("click", oreviewglaccounts, false);
