function getaddglaccountParams(){
		var paramstr = new FormData();
		paramstr.append('accountnumber',document.getElementById('oreaglaaccountnumber').value);
		paramstr.append('description',document.getElementById('oreagladescription').value);
		paramstr.append('groupname',document.getElementById('oreaglagroupname').value);
		paramstr.append('accounttype',document.getElementById('oreaglaaccounttype').value);
	   return paramstr;
}
	
function getaddglaccountP(){
		var paramstr = new FormData();
		paramstr.append('accountnumber',document.getElementById('oreaglaaccountnumber').value);
	   return paramstr;
}
	

const glacc_fields = [
    // `oreaglaaccountnumber`,
    `oreaglagroupname`,
    `oreaglaaccounttype`,
    `oreagladescription`,
    ]

// const errandadd =async()=>{
//     let deescp = ['VAULT',
//   'TELLER',
//   'TELLER 2',
//   'UBA MKD',
//   'PAGA BANK',
//   'FBN',
//   'UBA AGENCY',
//   'FURNITURE/FITTINGS',
//   'VEHICLES',
//   'LAND & BUILDING',
//   'PLANT & MACHINERY',
//   'OFFICE EQUIPMENT/SOFTWARE',
//   'NTB/BANK PLACEMENTS',
//   'INVESTMENT IN SHARES',
//   'BUSINESS INVESTMENTS',
//   'SHORT TERM INVESTMENT',
//   'STAFF LOAN',
//   'PERSONAL LOAN',
//   'OVERDRAFT',
//   'GROUP/CORPORATE LOAN',
//   'EDUCATION SUPPORT LOAN',
//   'BUSINESS SUPPORT LOAN',
//   'HIREPURCHASE',
//   'ADVANCE',
//   'CLASSIFIED DEBT',
//   'MONEY TRANSFER INCOMING',
//   'BVN & NIN LICENCE',
//   'CHEQUE BOOKS & STAMP',
//   'SAVINGS BOOKLET',
//   'STATIONERY IN STOCK',
//   'SUSPENSE A/C',
//   'PREPAYMENT',
//   'ACCRUED INT. RECIEVABLE',
//   'ONLINE SERVICE APP',
//   'SUNDRY DEBTORS',
//   'DAILY COLLECTION',
//   'PROFIT & LOSS A/C',
//   'SHARE CAPITAL',
//   'SHARE PREMIUM',
//   'GENERAL RESERVES',
//   'STATUTORY RESRVES',
//   'RETAINED PROFIT',
//   'CURRENT A/C',
//   'SAVINGS A/C',
//   'FIXED DEPOSITS',
//   'DEPOSIT FOR SHARE',
//   'DIVIDEND PAYABLE',
//   'STAFF RBSCH',
//   'INTEREST IN SUSPENSE',
//   'ACCRUED INT. PAYABLE',
//   'MONEY TRF OUTGOING',
//   'SUNDRY CREDITORS',
//   'BILLS PAYABLE',
//   'PAYE',
//   'CASHIER SURPLUS',
//   'PROVISION FOR BAD DEBTS',
//   'GENERAL PROVISION',
//   'PROVISION FOR TAX',
//   'ACCUMULATED DEPRECIATION',
//   'PROV. FOR DEP. VEHICLE',
//   'PROV FOR DEP F&F',
//   'PROV FOR DEP P&M',
//   'PROV FOR DEP LAND & B',
//   'PROV FOR DEP OFF EQUIP',
//   'ELECTRIC/SOLAR',
//   'FUEL/OIL',
//   'STATIONARIES',
//   'TRANSPORT/TRAVELLING',
//   'REPAIR/MAINTENACE',
//   'AGM/DIRECTORS EXPENSES',
//   'AUDIT EXPS',
//   'FEES/DUES/SUBSCRIPTIONS',
//   'SALARY',
//   'AIRTIME & DATA',
//   'POSTAGE/COMMUNICATION',
//   'MISCELLANOUS EXPS',
//   'INTEREST ON LOAN/HP',
//   'OTHER INTEREST RECIEVED',
//   'INCOME FROM BUSINESSES',
//   'CASH HANDLING CHG',
//   'SMS CHG',
//   'COT',
//   'LOAN APPLICATION FEE',
//   'LOAN PROCESSING FEE',
//   'LOAN DEFAULT CHG',
//   'POS INCOME',
//   'ACCOUNT MANTENANCE CHG',
//   'ACCOUNT OPENING',
//   'ADDRESS VERIFICATION',
//   'ACCOUNT REACTIVATION',
//   'CHEQUE/WTD BOOKLET',
//   'ASSOCIATION/COMPANY SEARCH',
//   'MONEY TRF CHG',
//   'GENERAL INCOME',
//   'ASSET A/C',
//   'PROVISION FOR LOAN LOSSES',
//   'INTEREST ON SAVINGS',
//   'INTEREST ON FIX DEPOSIT',
//   'CAC FEES/REG. DUES/ASSOC DUES',
//   'LOAN PROVISIONING',
//   'TELLER CASH',
//   'PUB.RELATION/ADVERT/MARKETING',
//   'LOAN A/C',
//   'FIXED DEPOSIT',
//   'OD GL A/C',
//   'CASH A/C',
//   'MISC INCOME'
//   ]
//     let acctyp = ['CASH',
// 'CASH',
// 'CASH',
// 'CURRENT ASSETS',
// 'CURRENT ASSETS',
// 'CURRENT ASSETS',
// 'CURRENT ASSETS',
// 'FIXED ASSET',
// 'FIXED ASSET',
// 'FIXED ASSET',
// 'FIXED ASSET',
// 'FIXED ASSET',
// 'CURRENT ASSETS',
// 'OTHER CURRENT ASSET',
// 'OTHER CURRENT ASSET',
// 'OTHER CURRENT ASSET',
// 'CURRENT ASSETS',
// 'CURRENT ASSETS',
// 'CURRENT ASSETS',
// 'CURRENT ASSETS',
// 'CURRENT ASSETS',
// 'CURRENT ASSETS',
// 'CURRENT ASSETS',
// 'CURRENT ASSETS',
// 'OTHER ASSET',
// 'OTHER ASSET',
// 'OTHER ASSET',
// 'OTHER ASSET',
// 'OTHER ASSET',
// 'OTHER ASSET',
// 'OTHER ASSET',
// 'OTHER ASSET',
// 'OTHER ASSET',
// 'OTHER ASSET',
// 'OTHER ASSET',
// 'CASH',
// 'EQUITY',
// 'EQUITY',
// 'EQUITY',
// 'EQUITY',
// 'EQUITY',
// 'EQUITY',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'OTHER CURRENT LIABILITIES',
// 'OTHER CURRENT LIABILITIES',
// 'OTHER CURRENT LIABILITIES',
// 'OTHER CURRENT LIABILITIES',
// 'OTHER CURRENT LIABILITIES',
// 'OTHER CURRENT LIABILITIES',
// 'OTHER CURRENT LIABILITIES',
// 'OTHER CURRENT LIABILITIES',
// 'OTHER CURRENT LIABILITIES',
// 'OTHER CURRENT LIABILITIES',
// 'LONG TERM LIABILITIES',
// 'LONG TERM LIABILITIES',
// 'LONG TERM LIABILITIES',
// 'ACCUMULATED DEPRECIATION',
// 'ACCUMULATED DEPRECIATION',
// 'ACCUMULATED DEPRECIATION',
// 'ACCUMULATED DEPRECIATION',
// 'ACCUMULATED DEPRECIATION',
// 'ACCUMULATED DEPRECIATION',
// 'EXPENSE',
// 'EXPENSE',
// 'EXPENSE',
// 'EXPENSE',
// 'EXPENSE',
// 'EXPENSE',
// 'EXPENSE',
// 'EXPENSE',
// 'EXPENSE',
// 'EXPENSE',
// 'EXPENSE',
// 'EXPENSE',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'INCOME',
// 'ASSET',
// 'EXPENSE',
// 'EXPENSE',
// 'EXPENSE',
// 'EXPENSE',
// 'INCOME',
// 'CASH',
// 'EXPENSE',
// 'ACCOUNTS RECEIVABLE',
// 'ACCOUNTS PAYABLE',
// 'LIABILITIES',
// 'CASH',
// 'INCOME'
// ]
//     let grname = ['ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'ASSET',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'LIABILITIES',
// 'EXPENSES',
// 'EXPENSES',
// 'EXPENSES',
// 'EXPENSES',
// 'EXPENSES',
// 'EXPENSES',
// 'EXPENSES',
// 'EXPENSES',
// 'EXPENSES',
// 'EXPENSES',
// 'EXPENSES',
// 'EXPENSES',
// 'INTEREST INCOME',
// 'INTEREST INCOME',
// 'BUSINESS INCOME',
// 'COMMISSION',
// 'COMMISSION',
// 'COMMISSION',
// 'OTHER INCOME',
// 'OTHER INCOME',
// 'OTHER INCOME',
// 'OTHER INCOME',
// 'OTHER INCOME',
// 'OTHER INCOME',
// 'OTHER INCOME',
// 'OTHER INCOME',
// 'OTHER INCOME',
// 'OTHER INCOME',
// 'OTHER INCOME',
// 'INCOME',
// 'ASSET',
// 'PROVISION FOR LOSES',
// 'INTEREST EXPENSE',
// 'INTEREST EXPENSE',
// 'EXPENSES',
// 'INCOME',
// 'TELLER CASH',
// 'EXPENSE',
// 'RECIEVABLE',
// 'LIABILITY',
// 'OD GL',
// 'CASH A/C',
// 'OTHER INCOME',]
//     console.log('deescp', deescp.length)
//     console.log('acctyp', acctyp.length)
//     console.log('grname', grname.length)
//     for (let i = 0; i < deescp.length; i++) {
//     console.log(i);
//     document.getElementById('oreagladescription').value = deescp[i];
//     document.getElementById('oreaglaaccounttype').value = acctyp[i];
//     document.getElementById('oreaglagroupname').value = grname[i];
//     callController('glaccountscript.php', getaddglaccountParams(), 'saveglaccount', glacc_fields, null)
//     await new Promise(resolve => setTimeout(resolve, 500));
//   }
// }
        let vieweditglname ;
async function oreaddglaccount() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('addglaccount.php', 'override');
        // [accountnumber, description, accounttype, groupname];
        if(sessionStorage.getItem('vieweditgl')){ vieweditglname = JSON.parse(sessionStorage.getItem('vieweditgl'))};
        // console.log(vieweditglname)
        // console.log(vieweditglname.length > 0);
        if(vieweditglname){
            sessionStorage.removeItem('vieweditgl');
            document.getElementById('oreaglaaccountnumber').value = vieweditglname[0];
            document.getElementById('oreagladescription').value = vieweditglname[1];
            document.getElementById('oreaglaaccounttype').value = vieweditglname[2];
            document.getElementById('oreaglagroupname').value = vieweditglname[3];
        };
       
        // if(document.getElementById('glacc_accretrv'))document.getElementById('glacc_accretrv').addEventListener('click', e=>callController('fetchglaccounts.php', getaddglaccountP(), 'retrieveglaccount', [`oreaglaaccountnumber`], alert),true);
        if(document.getElementById('glacc_accretrv'))document.getElementById('glacc_accretrv').addEventListener('click', e=>callModal('feature: Coming soon'),true);
        if(document.getElementById('oreaglabtnSave'))document.getElementById('oreaglabtnSave').addEventListener('click',e=>{
            callController('glaccountscript.php', getaddglaccountParams(), 'saveglaccount', glacc_fields, null)
            document.getElementById('oreaglaaccountnumber').value = '';
            document.getElementById('oreagladescription').value = '';
            document.getElementById('oreaglaaccounttype').value = '';
            document.getElementById('oreaglagroupname').value = '';
            if(vieweditglname.length > 0)document.getElementById("viewglaccounts").click();
        },false);
        if(document.getElementById('oreaglabtnDelete'))document.getElementById('oreaglabtnDelete').addEventListener('click', e=>callController('controller.php', null, 'deleteglaccount', [`oreaglaaccountnumber`], alert),true);
       
        
}


var oreaddglaccountbbtn = document.getElementById("addglaccount");
if (oreaddglaccountbbtn) oreaddglaccountbbtn.addEventListener("click", oreaddglaccount, false);



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
        initializePaginationParams(viewglsetCurrentPage);
        
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


    const gltrans_field = [
        `oreagltaccountnumber`,
		`oreaglttransactiondate`,
		`oreagltlocation`,
		`oreagltcredit`,
		`oreagltdebit`,
		`oreagltvaluedate`,
		`oreagltdescription`,
		`oreagltmarketer`,
		`oreagltaccountofficer`,
		`oreagltapprovedby`,
		`oreagltuser`,
		`oreagltttype`,
		`oreagltservicecharge`,
		`oreagltdebittotal`,
		`oreagltcredittotal`,
		`oreagltreference`,
		`oreagltbankpaywith100`,
		`oreagltwhichaccount`,
		`oreagltgroupid`
        ]
        

	function gltransparamsdata(){
		var paramstr = new FormData();

		paramstr.append('description',document.getElementById('gltransdescription').value);
		paramstr.append('transactiondate',document.getElementById('gltransdate').value);
		paramstr.append('transactiontype',document.getElementById('gltransactiontype').value);
		
		for(i=0; i<document.getElementsByClassName('gltranscustomeraccount').length; i++){
		    paramstr.append(`customeraccount${i}`,document.getElementsByClassName('gltranscustomeraccount')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('gltranscustomeramount').length; i++){
		    paramstr.append(`customeramount${i}`,document.getElementsByClassName('gltranscustomeramount')[i].value);
		}
		paramstr.append('customergridsize',document.getElementsByClassName('gltranscustomeraccount').length);
		
		for(i=0; i<document.getElementsByClassName('gltrandebitaccount').length; i++){
		    paramstr.append(`debitaccount${i}`,document.getElementsByClassName('gltrandebitaccount')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('gltransdebitamount').length; i++){
		    paramstr.append(`debitamount${i}`,document.getElementsByClassName('gltransdebitamount')[i].value);
		}
		paramstr.append('debitgridsize',document.getElementsByClassName('gltrandebitaccount').length);
		
		for(i=0; i<document.getElementsByClassName('gltranscreditaccount').length; i++){
		    paramstr.append(`creditaccount${i}`,document.getElementsByClassName('gltranscreditaccount')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('gltranscreditamount').length; i++){
		    paramstr.append(`creditamount${i}`,document.getElementsByClassName('gltranscreditamount')[i].value);
		}
		paramstr.append('creditgridsize',document.getElementsByClassName('gltranscreditaccount').length);
		
		paramstr.append('approvingofficer',document.getElementById('gltransapprovedtransaction').value);
		paramstr.append('approved',document.getElementById('orecustomertogl2').checked ? 'YES' : 'NO');
		paramstr.append('customertotal',document.getElementById('gltranscustomertotal').value);
		paramstr.append('debittotal',document.getElementById('gltranstotaldebitt').value);
		paramstr.append('credittotal',document.getElementById('gltranstotalcreditt').value);

        for (var pair of paramstr.entries()) {
              console.log(pair[0] + ', ' + pair[1]);   
            // return(name, pair[0]+ ', ' + pair[1]); 
            }
	    return paramstr;

	};
	
	function gltranscustomeraccparamsdata(number){
		var paramstr = new FormData();
		
		paramstr.append('accountnumber', `${number}`);
		
	    return paramstr;

	};
	
	let glaccountoptions = ``;
	let glaccountnamess = [];
	let glaccountnumbers = [];
	
	const glaccountpopulatecheck=(data, accountno, element)=>{
	    if(glaccountnamess.includes(`${data.replace("&", "&AMP;")}`)){
	        accountno.value = glaccountnumbers[glaccountnamess.indexOf(`${data.replace("&", "&AMP;")}`)];
	       // callModal(accountno.value, 1);
	    }else{
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
	    }
	};
	
	const glcustomeraccountnamecheck=(data, accountno, element)=>{
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
	
	const allcustomeramount=()=>{
	        let count = 0
	    for(i=0; i<document.getElementsByClassName('allcustomeramount').length; i++){
	        console.log(document.getElementsByClassName('allcustomeramount')[i].value, 'i', i);
	        count = count + parseInt(document.getElementsByClassName('allcustomeramount')[i].value ? document.getElementsByClassName('allcustomeramount')[i].value : 0);
	        document.getElementById('gltranscustomertotal').value = count;
	    }
	}
	
	const alldebitamount=()=>{
	        let count = 0
	    for(i=0; i<document.getElementsByClassName('alldebitamount').length; i++){
	        console.log(document.getElementsByClassName('alldebitamount')[i].value, 'i', i);
	        count = count + parseInt(document.getElementsByClassName('alldebitamount')[i].value ? document.getElementsByClassName('alldebitamount')[i].value : 0);
	        document.getElementById('gltranstotaldebitt').value = count;
	    }
	}
	
	const allcreditamount=()=>{
	        let count = 0
	    for(i=0; i<document.getElementsByClassName('allcreditamount').length; i++){
	        console.log(document.getElementsByClassName('allcreditamount')[i].value, 'i', i);
	        count = count + parseInt(document.getElementsByClassName('allcreditamount')[i].value ? document.getElementsByClassName('allcreditamount')[i].value : 0);
	        document.getElementById('gltranstotalcreditt').value = count;
	    }
	}


async function oreaddgltransaction() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('addgltransaction.php', 'override')  ;
        const glaccountoptionpopulator=(data)=>{
            glaccountoptions = data.data.data.map(data=>{
                return(`
                <option>${data.description}</option>
                `)
            }).join('');
            data.data.data.map(data=>glaccountnamess.push(data.description)) 
            data.data.data.map(data=>glaccountnumbers.push(data.accountnumber)) 
            document.getElementById('glaccountpopulate').innerHTML = glaccountoptions;
        }
        //  callController =(controller, params, name, validate, funct, silent, e)
         callController('fetchglaccounts.php', null, 'fetchglaccounts', null, glaccountoptionpopulator, 'silent');
        // if(document.getElementById('orecusttogl'))document.getElementById('orecusttogl').classList.remove("hidden");

// window.onmousedown =(e)=>{
//     let el = e.target;
//     if(el.tagName.toLowerCase() == 'p' && el.textContent == 'General Ledger section'){
//         alert('the mudafucker worked')
//     }
// }
    
const orevfygetallid =()=>{
        document.getElementsByClassName('orevfy');
        let idss = []
        for(i=0; i<document.getElementsByClassName('orevfy').length; i++){
            idss.push(document.getElementsByClassName('orevfy')[i].id)
        }
        if(document.getElementById('orecustomertogl').checked == true){
           for(i=0; i<document.getElementsByClassName('orevfyy').length; i++){
            idss.push(document.getElementsByClassName('orevfyy')[i].id)
        }
        }
        return idss
    }

if(document.getElementById('gltransaveform'))document.getElementById('gltransaveform').addEventListener('click',e=>{
    if(document.getElementById('gltranscustomertotal').value > 0){
        if(document.getElementById('gltranscustomertotal').value == document.getElementById('gltranstotaldebitt').value && document.getElementById('gltranstotaldebitt').value == document.getElementById('gltranstotalcreditt').value){
            callController('gltransactionscript.php', gltransparamsdata(), 'gltransactionscript', orevfygetallid(), console.log)
        }else{
            callModal('Customer, debit and credit totals are not equal', 0)
        }
    }else{
        if(document.getElementById('gltranstotaldebitt').value == document.getElementById('gltranscustomertotal').value){
            callController('gltransactionscript.php', gltransparamsdata(), 'gltransactionscript', orevfygetallid(), console.log)
        }else{
            callModal('Debit and credit totals are not equal', 0)
        }
    }
    
},false);
// if(document.getElementById('gltransaveform'))document.getElementById('gltransaveform').addEventListener('click',e=>{
//     if(validateInputsComponent(orevfygetallid())){
//         gltransparamsdata();
//     };
// },false);

if(document.getElementById('orecustomertogl')){
    if(document.getElementById('swittchhtr')){
        document.getElementById('swittchhtr').addEventListener('click', e=>{
            // document.querySelector('div.checkbox.switcher label input + div small').style.backgroundColor = 'red'
            // document.querySelector('div.checkbox.switcher label input + div small').style.left = '0';
            // document.querySelector('div.checkbox.switcher label input + div small').style.right = '';
            if(document.getElementById('orecustomertogl').checked){
                document.getElementById('orecustomertogl').checked = false;
                document.getElementById('gltranscustomertotal').value = 0;
                document.getElementById('orecusttogl').classList.add("hidden")
                document.querySelector('div.checkbox.switcher label input + div small').style.left = '0%';
                // document.querySelector('div.checkbox.switcher label input + div').backgroundColor = 'rgb(0, 105, 217)'
                document.querySelector('div.checkbox.switcher label input + div').style.backgroundColor = '#dc3545';
                document.querySelector('div.checkbox.switcher label input + div').style.borderColor = '#dc3545';
            }else{
                document.getElementById('orecustomertogl').checked = true;
                document.querySelector('div.checkbox.switcher label input + div').style.backgroundColor = 'rgb(0, 105, 217)';
                document.getElementById('orecusttogl').classList.remove("hidden")
                document.querySelector('div.checkbox.switcher label input + div').style.borderColor = 'rgb(0, 105, 217)';
                document.querySelector('div.checkbox.switcher label input + div small').style.left = '50%'
            }
        })
    }
    // if(document.getElementById('orecustomertogl').checked)alert('checked')
    // if(!document.getElementById('orecustomertogl').checked)alert('not checked')
}

if(document.getElementById('swittchhtr2')){
        document.getElementById('swittchhtr2').addEventListener('click', e=>{
            if(document.getElementById('orecustomertogl2').checked){
                document.getElementById('orecustomertogl2').checked = false;
                // document.getElementById('orecusttogl').classList.add("hidden")
                document.querySelector('div.checkbox.switcher.oresec label input + div small').style.left = '0%';
                document.querySelector('div.checkbox.switcher.oresec label input + div').style.backgroundColor = '#dc3545';
                document.querySelector('div.checkbox.switcher.oresec label input + div').style.borderColor = '#dc3545';
            }else{
                document.getElementById('orecustomertogl2').checked = true;
                document.querySelector('div.checkbox.switcher.oresec label input + div').style.backgroundColor = 'rgb(0, 105, 217)';
                document.querySelector('div.checkbox.switcher.oresec label input + div').style.borderColor = 'rgb(0, 105, 217)';
                document.querySelector('div.checkbox.switcher.oresec label input + div small').style.left = '50%'
            }
        })
    }



if(document.getElementById("oreadddebit")){
    document.getElementById('oreadddebit').addEventListener('click', e=>{
        let eleh = document.createElement('div');
        eleh.setAttribute('class', 'stcnsection1');
        let x = `
        <div class="stcs1a2">
            <div class="inputcontainerfn icsn">
            <p class="normaltext">Customer Account No.</p>
            <input class="orevfyy gltranscustomeraccount" id="${Date.now()}account" style="width: 95%" list="" onfocusout="glcustomeraccountnamecheck(this.value, this.nextElementSibling, this)" placeholder="Account No." type="number">
            <input type="text" class="borderless " style="outline: none" readonly>
            </div>
            </div>
        <div class="stcs1a2">
            <div class="inputcontainerfn icsn">
                <p class="normaltext">Amount</p>
                <input class="orevfyy allcustomeramount gltranscustomeramount" onchange="allcustomeramount()" id="${Date.now()}amount" style="width: 90%" placeholder="Amount" type="number">
            </div>
        </div>
        <div id="" class="oreadddebit oreremove mt" style="font-size: small;position: relative;top: -7px;" onclick="this.parentElement.remove(); allcustomeramount()">remove</div>`
        console.log(eleh)
        let elem = eleh.innerHTML = x;        
        console.log(eleh)
        document.getElementById('orecustglrowcont').append(eleh)
    })
}

if(document.getElementById("oreadddebitdebit")){
    document.getElementById('oreadddebitdebit').addEventListener('click', e=>{
        let eleh = document.createElement('div');
        eleh.setAttribute('class', 'stcnsection1');
        let x = `
        <div class="stcs1a2">
            <div class="inputcontainerfn icsn">
                <input class="gltrandebitaccount" type="hidden">
            <p class="normaltext">Debit Account</p>
            <input class="orevfy" id="${Date.now()}account" style="width: 95%" list="glaccountpopulate" onfocusout="glaccountpopulatecheck(this.value, this.previousElementSibling.previousElementSibling, this)" placeholder="Account" type="text">
            </div>
            </div>
        <div class="stcs1a2">
            <div class="inputcontainerfn icsn">
                <p class="normaltext">Amount</p>
                <input class="orevfy alldebitamount gltransdebitamount" onchange="alldebitamount()" id="${Date.now()}amount" style="width: 90%" placeholder="Amount" type="number">
            </div>
        </div>
        <div id="" class="oreadddebit oreremove mt" onclick="this.parentElement.remove(); alldebitamount()">remove</div>`
        console.log(eleh)
        let elem = eleh.innerHTML = x;        
        console.log(eleh)
        document.getElementById('orecustglrowcontdebit').append(eleh)
    })
}

if(document.getElementById("oreadddebitcredit")){
    document.getElementById("oreadddebitcredit").addEventListener('click', e=>{
        let eleh = document.createElement('div');
        eleh.setAttribute('class', 'stcnsection1');
        let x = `
        <div class="stcs1a2">
            <div class="inputcontainerfn icsn">
                <input class="gltranscreditaccount" type="hidden">
            <p class="normaltext">Credit Account</p>
            <input class="orevfy" id="${Date.now()}account" style="width: 95%" list="glaccountpopulate" onfocusout="glaccountpopulatecheck(this.value, this.previousElementSibling.previousElementSibling, this)" placeholder="Account" type="text">
            </div>
            </div>
        <div class="stcs1a2">
            <div class="inputcontainerfn icsn">
                <p class="normaltext">Amount</p>
                <input class="orevfy allcreditamount gltranscreditamount" onchange="allcreditamount()" id="${Date.now()}amount" style="width: 90%" placeholder="Amount" type="number">
            </div>
        </div>
        <div id="" class="oreadddebit oreremove mt" onclick="this.parentElement.remove(); allcreditamount()">remove</div>`
        console.log(eleh);
        let elem = eleh.innerHTML = x;        
        console.log(eleh);
        document.getElementById('orecustglrowcontcredit').append(eleh);
    })
}

        
        
};



var oreaddgltransactionbbtn = document.getElementById("addgltransaction");
if (oreaddgltransactionbbtn) oreaddgltransactionbbtn.addEventListener("click", oreaddgltransaction, false);


var viewglhis_datasource = [];
let balanceBroughtForward = 0; // Global variable to store balance brought forward
let gl_accts;

let debitbalance = [
    "CASH",
    "ACCOUNTS RECEIVABLE",
    "ASSET",
    "CURRENT ASSETS",
    "OTHER CURRENT ASSET",
    "EXPENSE",
    "OTHER ASSET",
    "INVENTORY",
    "FIXED ASSET",
    "COST OF SALES"
]; 

let creditbalance = [
    "LIABILITY",
    "LIABILITIES",
    "ACCOUNTS PAYABLE",
    "OTHER CURRENT LIABILITIES",
    "LONG TERM LIABILITIES",
    "INCOME",
    "ACCUMULATED DEPRECIATION",
    "EQUITY",
    "EQUITY RETAINED EARNINGS",
    "EQUITY DOES NOT CLOSE"
];

const viewglhisepaginate = (data) => {
    viewglhis_datasource = []; // Reset the data source

    // Clone the data to avoid mutating the original data
    let transactions = JSON.parse(JSON.stringify(data.data));

    // Store the balance brought forward globally
    balanceBroughtForward = parseFloat(data.balancebroughtforward) || 0;

    // Determine account type
    const accounttype = gl_accts.filter(dat=>dat.accountnumber == document.getElementById('gltranshisaccountnumber').value)[0].accounttype; // Ensure 'accounttype' is part of the 'data' object
    console.log('our account type', accounttype, gl_accts)
    const isDebitBalance = debitbalance.includes(accounttype);
    const isCreditBalance = creditbalance.includes(accounttype);

    // Initialize current balance based on account type
    let currentBalance = balanceBroughtForward;
 
    // Compute cumulative balance for each transaction
    transactions = transactions.map(transaction => {
        const credit = parseFloat(transaction.credit) || 0;
        const debit = parseFloat(transaction.debit) || 0;
         
        if (isDebitBalance) {
            currentBalance += debit - credit;
        } else if (isCreditBalance) {
            currentBalance += credit - debit;
        }
        
        return {
            ...transaction,
            balance: currentBalance.toFixed(2) // Ensure two decimal places
        };
    });

    // Update the data source with precomputed balances
    viewglhis_datasource.push(transactions);
    
    // Clear existing table data and footers
    document.getElementById('viewgltranstabledata').innerHTML = '';
    document.getElementById('viewgltranstabledatafoot').innerHTML = '';
    document.getElementById('reportdetails').innerHTML = '';

    // Optionally clear 'viewgltranstabledata2' if it exists
    if (document.getElementById('viewgltranstabledata2')) {
        document.getElementById('viewgltranstabledata2').innerHTML = '';
    }

    // Initialize table with Balance Brought Forward
    document.getElementById("viewgltranstabledata").innerHTML = 
        `<tr data-open="false" class="source-row-item">
            <td colspan="5"> Balance Brought Forward </td>
            <td> ${formatCurrency(balanceBroughtForward)} </td>
        </tr>`;
    
    // Initialize pagination if transactions exist
    if (viewglhis_datasource[0]) {
        initPagination(viewglhis_datasource[0], viewglhissetCurrentPage);
    }

    // Populate 'viewgltranstabledata2' if needed
    // if (viewglhis_datasource[0]) {
    //     document.getElementById('viewgltranstabledata2').innerHTML = viewglhis_datasource[0].length > 0
    //         ? viewglhis_datasource[0].map(transaction => {
    //             return `
    //                 <tr data-open="false" class="source-row-item">
    //                     <td>${transaction.description}</td>
    //                     <td>${transaction.reference}</td>
    //                     <td>${formatCurrency(transaction.credit)}</td>
    //                     <td>${formatCurrency(transaction.debit)}</td>
    //                 </tr>`;
    //         }).join('')
    //         : 'No data';
    // }
};

const viewglhissetCurrentPage = (pageNum) => {
    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    if (viewglhis_datasource.length) {
        // Get the transactions for the current page
        const currentTransactions = viewglhis_datasource[0].slice(prevRange, currRange);

        // Clear existing table data before appending new rows
        document.getElementById("viewgltranstabledata").innerHTML = `
            <tr data-open="false" class="source-row-item">
                <td colspan="5"> Balance Brought Forward </td>
                <td> ${formatCurrency(balanceBroughtForward)} </td>
            </tr>
        `;

        // Append each transaction row
        currentTransactions.forEach((item, index) => {
            appendviewgltranshisTableRows(item, prevRange + index + 1); // Pass the correct index
        });

        // Calculate totals for the current page
        const totalCredit = currentTransactions.reduce((sum, data) => sum + parseFloat(data.credit || 0), 0);
        const totalDebit = currentTransactions.reduce((sum, data) => sum + parseFloat(data.debit || 0), 0);

        // Update the table footer with totals
        document.getElementById("viewgltranstabledatafoot").innerHTML = `
            <tr data-open="false" class="source-row-item" style="text-align: center;">
                <td colspan="3" style="border: 1px solid #ddd; padding: 10px;">TOTAL</td>
                <td style="border: 1px solid #ddd; padding: 10px">${formatCurrency(totalDebit)}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${formatCurrency(totalCredit)}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${formatCurrency(currentTransactions[currentTransactions.length - 1]?.balance || 0)}</td>
            </tr>
        `;

        // Update the report details with the latest balance
        const latestBalance = currentTransactions.length > 0
            ? currentTransactions[currentTransactions.length - 1].balance
            : balanceBroughtForward;
        
        document.getElementById("reportdetails").innerHTML = `
            <div class="account-details" style="display: flex; justify-content: start;gap: 10px; align-items: center; margin-bottom: 12px;">
                <label style="font-weight: bold; font-size: 14px; color: #555; margin-right: 10px;">Account Number:</label>
                <span id="account-number" style="color: #222; font-size: 14px;">${document.getElementById('gltranshisaccountnumber').value}</span>
            </div>
            <div class="account-details" style="display: flex; justify-content: start;gap: 10px; align-items: center; margin-bottom: 12px;">
                <label style="font-weight: bold; font-size: 14px; color: #555; margin-right: 10px;">Account Name:</label>
                <span id="account-name" style="color: #222; font-size: 14px;">${document.getElementById('acc__name').textContent}</span>
            </div>
            <div class="account-details" style="display: flex; justify-content: start;gap: 10px; align-items: center;">
                <label style="font-weight: bold; font-size: 14px; color: #555; margin-right: 10px;">Current Balance:</label>
                <span id="current-bal" style="color: #222; font-size: 14px;">&#8358;${formatCurrency(latestBalance)}</span>
            </div>
        `;
    } else {
        document.getElementById("viewgltranstabledata").innerHTML = renderNoTableData();
        document.getElementById("viewgltranstabledatafoot").innerHTML = '';
        document.getElementById("reportdetails").innerHTML = '';
    }
};

function appendviewgltranshisTableRows(data, index) {
    document.getElementById("viewgltranstabledata").innerHTML += `
        <tr data-open="false" class="source-row-item">
            <td style="padding: 10px;">${formatDate(data.transactiondate)}</td>
            <td style="padding: 10px;">${data.description}</td>
            <td style="padding: 10px;">${data.reference}</td>
            <td style="padding: 10px;">${formatCurrency(data.debit)}</td>
            <td style="padding: 10px;">${formatCurrency(data.credit)}</td>
            <td style="padding: 10px;">${formatCurrency(data.balance)}</td>
        </tr>
    `;
}


const viewgltranshisaccountnamecheck = (data, accountno, element) => {
    const gltransconfirmacc = (result) => {
        if (result.message === 'Not successful') {
            callModal(`${data} is not a valid account number`);
            element.style.color = 'red';
            element.style.borderColor = 'red';
            callModal(`${data} is not a valid account`, 0);
            setTimeout(() => {
                element.value = '';
                accountno.value = '';
                element.style.color = 'black';
                setTimeout(() => {
                    element.style.borderColor = 'lightgray';
                }, 1000);
            }, 1000);
        } else if (result.message === 'Successful') {
            accountno.style.color = 'blue';
            accountno.style.textTransform = 'uppercase';
            accountno.value = `${result.data[0].customerdetail.firstname} ${result.data[0].customerdetail.lastname}`;
            // Corrected to include firstname if needed
        }
    };
    callController('fetchaccountprofile.php', gltranscustomeraccparamsdata(data), 'fetchaccountprofile', [`${element.id}`], gltransconfirmacc, 'silent');
};

function gltranshisaccparamsdata(number) {
    var paramstr = new FormData();
    
    paramstr.append('accountnumber', document.getElementById('gltranshisaccountnumber').value);
    paramstr.append('startdate', document.getElementById('gltranshisstartdate').value);
    paramstr.append('enddate', document.getElementById('gltranshisenddate').value);
    paramstr.append('location', document.getElementById('gllocation').value);
    
    return paramstr;
};

const accountlistglaccountdata = (result) => {
    if (document.getElementById('accountlistglaccountdata')) {
        gl_accts = result.data.data
        document.getElementById('accountlistglaccountdata').innerHTML = result.data.data.map(dat => {
            // let namedd = `${dat.accounttype} ${dat.description}`; 
            let namedd = `${dat.description}`; 
            return(`<option value="${dat.accountnumber}"> ${namedd} </option>`);
        }).join(''); // Ensure options are joined into a single string
    }
}

async function openViewglaccounthistory () {
    try {
        const result = await httpRequest('viewglaccounthistory.php');
        // Assuming httpRequest returns the result needed
        // If 'resultOfLocations' is part of the response, ensure it's defined
        jtabledata = document.getElementById('viewgltranstabledata');
        initializePaginationParams();
        if (document.getElementById('gllocation')) {
            document.getElementById('gllocation').innerHTML = `<option value="">--SELECT LOCATION--</option>`;
            document.getElementById('gllocation').innerHTML += resultOfLocations.map(dat => `<option value="${dat.id}">${dat.location}</option>`).join('');
        }
        
        // Fetch transactions and accounts
        callController('fetchgltransactions.php', null, 'fetchgltransactions', null, viewglhisepaginate);
        callController('fetchglaccounts.php', null, 'fetchglaccounts', null, accountlistglaccountdata);
        
        // Setup Export and Print Event Listeners
        if (document.getElementById('viewglhisexporter')) {
            document.getElementById('viewglhisexporter').addEventListener('click', e => {
                tableToExcel('viewgltranstabledataparent2', 'GENERAL LEDGER ACCOUNTS');
            }, false);
        }
        
        if (document.getElementById('viewglhisprinter')) {
            document.getElementById('viewglhisprinter').addEventListener('click', e => {
                printContent(
                    'GENERAL LEDGER ACCOUNTS',
                    `<link rel="stylesheet" type="text/css" media="print" href="./css/index.css">
                     <link rel="stylesheet" type="text/css" media="print" href="./css/user.css">
                     <link rel="stylesheet" type="text/css" media="print" href="./css/style.css">
                     <link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,
                    'viewgltranstabledataparent'
                );
            }, false);
        }
        
        if (document.getElementById('viewglhisviewer')) {
            document.getElementById('viewglhisviewer').addEventListener('click', e => {
                callController('fetchgltransactions.php', gltranshisaccparamsdata(), 'fetchgltransactions', null, viewglhisepaginate);
            }, false);
        }
    } catch (error) {
        console.error('Error opening GL account history:', error);
        // Optionally, display an error message to the user
    }
}

var viewglaccounthistorybtn = document.getElementById('viewglaccounthistory');
if (viewglaccounthistorybtn) {
    viewglaccounthistorybtn.addEventListener('click', openViewglaccounthistory, false);
}





const viewtrialbalrepresult = (result) => {
    const dataContainer = document.getElementById('viewstaffadvancetabledata');
    console.log('tesing', Object.keys(result.data["cash"][0]))
    if(document.getElementById('viewstaffadvancetabledata'))document.getElementById('viewstaffadvancetabledata').innerHTML = Object.keys(result.data).map((dat, index)=>{
    //                                               ${Object.values(result.data)[index].length != 0 ? Object.keys(Object.values(result.data)[index][0]).map(dat => `<th>${dat}</th>`).join('') : ''}
//                                              ${Object.values(result.data)[index].length != 0 ? Object.values(Object.values(result.data)[index]).map(dat =>dat).map(datt=>datt).map(da=>Object.values(da)).map(ee=>`<tr><td></td>${ee.map(rr=>`<td>${rr}</td>`).join('')}</tr>`).join('') : ''}
    let m
        return `
                <tr>
                        <td colspan="3" style="text-align: left;font-weight: bold">${dat.toUpperCase()}</td>
                </tr>
                        ${Object.values(result.data)[index].length != 0 ? Object.values(Object.values(result.data)[index]).map(dat =>dat).map(datt=>datt).map(da=>Object.values(da)).map(ee=>`<tr>${ee.map((rr, index)=>index < 3 ?`<td>${rr}</td>` : `<p class="hidden">${m=rr}</p>`).join('')}</tr>`).join('') : ''}
                   <tr>
                        <td style="text-align: right;font-weight: bold">${dat} sub total</td>
                        <td>${m}</td>
                   </tr>     
                   <tr>
                   <td colspan="3"></td>
                   </tr>     
                   <tr>
                   <td colspan="3"></td>
                   </tr>     
                
                `
    }).join('');

};




async function openViewtrialbalancereport () {
    await httpRequest('viewtrialbalancereport.php')
    var currentDate = new Date();

        // Format the date as YYYY-MM-DD (required format for date input)
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
        var day = currentDate.getDate().toString().padStart(2, '0');

        // Set the value of the date input 
        document.getElementById('viewtrialbalrepdate').value = year + '-' + month + '-' + day;
        if(document.getElementById('viewtrialbalrepdateviewbtn'))document.getElementById('viewtrialbalrepdateviewbtn').addEventListener('click', e=>{
            function viewtrialbalrepparams(){
                let paramstr = new FormData()
                paramstr.append('currentdate', document.getElementById('viewtrialbalrepdate').value)
                return paramstr
            }
            callController('trialbalance.php', viewtrialbalrepparams(), 'trialbalance', ['viewtrialbalrepdateviewbtn'], viewtrialbalrepresult)
        })
        if(document.getElementById('viewtrialbalrepdateviewbtn'))document.getElementById('viewtrialbalrepdateviewbtn').click();
        
        if(document.getElementById('viewtrialbalrepexport'))document.getElementById('viewtrialbalrepexport').addEventListener('click',e=>{
            tableToExcel('viewstaffadvancetabledatacontainer', 'VIEW TRIAL BALANCE')},false);
        if(document.getElementById('viewtrialbalrepprint'))document.getElementById('viewtrialbalrepprint').addEventListener('click',e=>{
            printContent('VIEW TRIAL BALANCE',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewstaffadvancetabledatacontainerwrapper')},false);

}

var viewtrialbalancereportbtn = document.getElementById('viewtrialbalancereport')
if(viewtrialbalancereportbtn) viewtrialbalancereportbtn.addEventListener('click', openViewtrialbalancereport, false)


const viewincomestatementreportdata = (result) => {
    if(document.getElementById('viewincomestatementreportabledata'))document.getElementById('viewincomestatementreportabledata').innerHTML = Object.keys(result.data).map((dat, index)=>{
    //                                               ${Object.values(result.data)[index].length != 0 ? Object.keys(Object.values(result.data)[index][0]).map(dat => `<th>${dat}</th>`).join('') : ''}
//                                              ${Object.values(result.data)[index].length != 0 ? Object.values(Object.values(result.data)[index]).map(dat =>dat).map(datt=>datt).map(da=>Object.values(da)).map(ee=>`<tr><td></td>${ee.map(rr=>`<td>${rr}</td>`).join('')}</tr>`).join('') : ''}
    let m
        return `
                <tr>
                        <td colspan="3" style="text-align: left;font-weight: bold">${dat.toUpperCase()}</td>
                </tr>
                        ${Object.values(result.data)[index].length != 0 ? Object.values(Object.values(result.data)[index]).map(dat =>dat).map(datt=>datt).map(da=>Object.values(da)).map(ee=>`<tr>${ee.map((rr, index)=>index < 3 ?`<td>${rr}</td>` : `<p class="hidden">${m=rr}</p>`).join('')}</tr>`).join('') : ''}
                   <tr>
                        <td style="text-align: right;font-weight: bold">${dat} sub total</td>
                        <td>${m}</td>
                   </tr>     
                   <tr>
                   <td colspan="3"></td>
                   </tr>     
                   <tr>
                   <td colspan="3"></td>
                   </tr>     
                
                `
    }).join('');

};

async function openViewincomestatementreport () {
    await httpRequest('viewincomestatementreport.php')
    
    
        function incstatparams(){
            let paramstr = new FormData();
            paramstr.append('startdate', document.getElementById('viewincomestatementreportstartdate').value)
            paramstr.append('enddate', document.getElementById('viewincomestatementreportenddate').value)
        }
    if(document.getElementById('viewincomestatementreportviewbtn'))document.getElementById('viewincomestatementreportviewbtn').addEventListener('click', e=>{
    callController('incomestatement.php', incstatparams(), 'incomestatement', ['viewincomestatementreportstartdate', 'viewincomestatementreportenddate'])  
    })
    callController('incomestatement.php', incstatparams(), 'incomestatement', [], viewincomestatementreportdata)  
    
}

var viewincomestatementreportbtn = document.getElementById('viewincomestatementreport')
if(viewincomestatementreportbtn) viewincomestatementreportbtn.addEventListener('click', openViewincomestatementreport, false)


const viewbalancesheetresultdata = (result) => {
    if(document.getElementById('viewbalancesheettabledata'))document.getElementById('viewbalancesheettabledata').innerHTML = Object.keys(result.data).map((dat, index)=>{
    //                                               ${Object.values(result.data)[index].length != 0 ? Object.keys(Object.values(result.data)[index][0]).map(dat => `<th>${dat}</th>`).join('') : ''}
//                                              ${Object.values(result.data)[index].length != 0 ? Object.values(Object.values(result.data)[index]).map(dat =>dat).map(datt=>datt).map(da=>Object.values(da)).map(ee=>`<tr><td></td>${ee.map(rr=>`<td>${rr}</td>`).join('')}</tr>`).join('') : ''}
    let m
        return `
                <tr>
                        <td colspan="3" style="text-align: left;font-weight: bold">${dat.toUpperCase()}</td>
                </tr>
                        ${Object.values(result.data)[index].length != 0 ? Object.values(Object.values(result.data)[index]).map(dat =>dat).map(datt=>datt).map(da=>Object.values(da)).map(ee=>`<tr>${ee.map((rr, index)=>index < 3 ?`<td>${rr}</td>` : `<p class="hidden">${m=rr}</p>`).join('')}</tr>`).join('') : ''}
                   <tr>
                        <td style="text-align: right;font-weight: bold">${dat} sub total</td>
                        <td>${m}</td>
                   </tr>     
                   <tr>
                   <td colspan="3"></td>
                   </tr>     
                   <tr>
                   <td colspan="3"></td>
                   </tr>     
                
                `
    }).join('');

};



async function openViewbalancesheet () {
    await httpRequest('viewbalancesheet.php')
    
    var currentDate = new Date();

        // Format the date as YYYY-MM-DD (required format for date input)
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
        var day = currentDate.getDate().toString().padStart(2, '0');

        // Set the value of the date input 
        document.getElementById('viewbalancesheetdate').value = year + '-' + month + '-' + day;
        if(document.getElementById('viewbalancesheetviewbtn'))document.getElementById('viewbalancesheetviewbtn').addEventListener('click', e=>{
            function viewtrialbalreppabalancesheetrams(){
                let paramstr = new FormData()
                paramstr.append('currentdate', document.getElementById('viewbalancesheetdate').value)
                return paramstr
            }
            callController('balancesheet.php', viewtrialbalreppabalancesheetrams(), 'balancesheet', ['viewbalancesheetdate'], viewbalancesheetresultdata)
        })
        if(document.getElementById('viewbalancesheetviewbtn'))document.getElementById('viewbalancesheetviewbtn').click();
}

var viewbalancesheetbtn = document.getElementById('viewbalancesheet')
if(viewbalancesheetbtn) viewbalancesheetbtn.addEventListener('click', openViewbalancesheet, false)

