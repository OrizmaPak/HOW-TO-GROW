var viewglhis_datasource = [];

const viewglhisepaginate=(data)=>{
    viewglhis_datasource = [];
    viewglhis_datasource.push(data.data)
    initPagination(viewglhis_datasource[0], viewglhissetCurrentPage)
    document.getElementById('viewgltranstabledata2').innerHTML = viewglhis_datasource[0].map(data=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${data.accountnumber} </td>
                                <td> ${data.credittotal} </td>
                                <td> ${data.debittotal} </td>
                                <td> ${data.description} </td>
                                <td> ${data.paymentmethod} </td>
                                <td> ${data.reference} </td>
                            </tr>`)
    }).join('')
    }


var viewglhissetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewglhis_datasource.length) {
        viewglhis_datasource[0].forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewgltranshisTableRows(item, index)
            }
        })
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("viewgltabledata").innerHTML=  renderNoTableData()
    }
};

const viewgltranshisaccountnamecheck=(data, accountno, element)=>{
	    const gltransconfirmacc =(result)=>{
	        if(result.message == 'Not successful'){
	            callModal(`${data} is not a valid account number`)
	            element.style.color = 'red';
    	        element.style.borderColor = 'red';
    	        callModal(`${data} is not a valid account`, 0);
    	        setTimeout(()=>{
    	            element.value = '';
    	            accountno.value = '';
    	            element.style.color = 'black';
    	            setTimeout(()=>{
            	        element.style.borderColor = 'lightgray';
    	            },1000)
    	        },1000)
    	    }else if(result.message == 'Successful'){
    	        accountno.style.color = 'blue';
    	        accountno.style.textTransform = 'uppercase';
    	        accountno.value = result.data[0].customerdetail.lastname + ' ' + result.data[0].customerdetail.lastname
    	    }
	    }
	    callController('fetchaccountprofile.php', gltranscustomeraccparamsdata(data), 'fetchaccountprofile', [`${element.id}`], gltransconfirmacc, 'silent')
	};


function appendviewgltranshisTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("viewgltranstabledata").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${data.accountnumber} </td>
                                <td> ${data.credittotal} </td>
                                <td> ${data.debittotal} </td>
                                <td> ${data.description} </td>
                                <td> ${data.paymentmethod} </td>
                                <td> ${data.reference} </td>
                            </tr>
    `
} 

function gltranshisaccparamsdata(number){
		var paramstr = new FormData();
		
		paramstr.append('accountnumber', document.getElementById('gltranshisaccountnumber').value);
		paramstr.append('startdate', document.getElementById('gltranshisstartdate').value);
		paramstr.append('enddate', document.getElementById('gltranshisenddate').value);
		
	    return paramstr;

	};


    const accountlistglaccountdata =(result)=>{
            if(document.getElementById('gltranshisaccountnumber'))document.getElementById('gltranshisaccountnumber').innerHTML = result.data.map(dat=>{
                let namedd = `${dat.customerdetail.lastname} ${dat.customerdetail.firstname} || ${dat.accountdetail.dailyunit}`;
                return(`<option value="${dat.accountdetail.accountnumber}"> ${namedd} </option>`)
                
            })
}


async function  openViewglaccounthistory () {
    await httpRequest('viewglaccounthistory.php');
    jtabledata = document.getElementById('viewgltranstabledata');
    initializePaginationParams();
    callController('fetchallaccountsprofile.php',null, 'fetchallaccountsprofile', null, accountlistglaccountdata);
    callController('fetchgltransactions.php', null, 'fetchgltransactions', null, viewglhisepaginate);
    if(document.getElementById('viewglhisexporter'))document.getElementById('viewglhisexporter').addEventListener('click',e=>{
            tableToExcel('viewgltranstabledataparent2', 'GENERAL LEDGER ACCOUNTS')},false);
    if(document.getElementById('viewglhisprinter'))document.getElementById('viewglhisprinter').addEventListener('click',e=>{
            printContent('GENERAL LEDGER ACCOUNTS',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewgltranstabledataparent2')},false);
    if(document.getElementById('viewglhisviewer'))document.getElementById('viewglhisviewer').addEventListener('click',e=>{
            callController('fetchgltransactions.php', gltranshisaccparamsdata(), 'fetchgltransactions', null, viewglhisepaginate);
    },false);
}

var viewglaccounthistorybtn = document.getElementById('viewglaccounthistory');
if(viewglaccounthistorybtn) viewglaccounthistorybtn.addEventListener('click', openViewglaccounthistory, false);