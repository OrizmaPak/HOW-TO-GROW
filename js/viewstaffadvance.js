var viewstaffadvanceorehistory_datasource = [];

const populateviewstaffadvancetable=(result)=>{
    viewstaffadvanceorehistory_datasource = [];
    if(!result.data)return callModal('No advance found')
    viewstaffadvanceorehistory_datasource = result.data;
    console.log('viewstaffadvanceorehistory_datasource', viewstaffadvanceorehistory_datasource)
    initPagination(viewstaffadvanceorehistory_datasource, viewstaffadvanceorehistoryorehistorysetCurrentPage);
    }
    
var viewstaffadvanceorehistoryorehistorysetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewstaffadvanceorehistory_datasource.length) {
        viewstaffadvanceorehistory_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewstaffadvanceorehistoryorehistoryTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("viewstaffadvanceorehistorytablecontent").innerHTML=  renderNoTableData()
    }
};

const deletestockviewstaffadvanceentry=(id)=>{
    console.log('pending implementation')
}

function appendviewstaffadvanceorehistoryorehistoryTableRows(dat, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("viewstaffadvancetabledata").innerHTML += `<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${getLabelFromValue(`${dat.pid}`, 'personelviewstaffadvance')} </td>
                                <td> ${dat.title} </td>
                                <td> ${naira}${formatCurrency(dat.amount)} </td>
                                <td> ${dat.entrydate} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="sessionStorage.setItem('editviewstaffadvancedata', ${dat.id});document.getElementById('advance').click()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="deletestockviewstaffadvanceentry('${dat.id}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>`
} 


function viewstaffadvanceparams(value=""){
            let paramstr = new FormData()
            paramstr.append('personnelmatter', 'ADVANCE')
            if(value)paramstr.append('personnelid', value)
            return paramstr
        }
        function runviewstaffadvance(value){
            document.getElementById('viewstaffadvancetabledata').innerHTML = ''
            callController('fetchpersonnelmatters.php', viewstaffadvanceparams(value), 'viewstaffadvance', null, populateviewstaffadvancetable)
        }

async function oreviewstaffadvance() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('viewstaffadvance.php', 'override')  
        
        jtabledata = document.getElementById('viewstaffadvanceorehistorytablecontent');
        initializePaginationParams();
        
        
        
        const loadvsadatlist =(result)=>{
        callController('fetchpersonnelmatters.php', viewstaffadvanceparams(), 'viewstaffadvance', null, populateviewstaffadvancetable)
            if(document.getElementById('personelviewstaffadvance'))document.getElementById('personelviewstaffadvance').innerHTML = result.data.map(data=>{
                return `<option value="${data.personnel.staffid}">${data.personnel.lastname} ${data.personnel.firstname}</option>`}).join('');
            if(document.getElementById('selectuserviewstaffadvance'))document.getElementById('selectuserviewstaffadvance').innerHTML = `<option value=""> --Select Personnel-- </option>`;
            if(document.getElementById('selectuserviewstaffadvance'))document.getElementById('selectuserviewstaffadvance').innerHTML += result.data.map(data=>{
                return `<option value="${data.personnel.staffid}">${data.personnel.lastname} ${data.personnel.firstname}</option>`}).join('');
        }
        await callController('fetchpersonnels.php', null, 'fetchpersonnels', null, loadvsadatlist)
        // if(document.getElementById('viewstaffadvance_submitbtn'))document.getElementById('viewstaffadvance_submitbtn').addEventListener('click', e=>callController('controller.php', null, 'viewstaffadvancesubmit', viewstaffadvance_field, alert),true);

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


var oreviewstaffadvancebbtn = document.getElementById("viewstaffadvance");
if (oreviewstaffadvancebbtn) oreviewstaffadvancebbtn.addEventListener("click", oreviewstaffadvance, false);