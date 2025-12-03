const btnscreen = document.getElementById('prm-btnscreen');
const contentscreen = document.getElementById('prm-contentscreen');
const prmcard = document.getElementById('prm-card');
const prmbckbtn = document.getElementById('prm-bckbtn');
const prmnavselectbtn = document.getElementById('prmnavselectbtn');
const prmnavselect = document.getElementById('prmnavselect');
const prmimgselect = document.getElementById('prmimgselect');
const prmid = document.getElementById('prm-id');
const prmnavselectbtn2 = document.getElementById('prmnavselectbtn2');
const prmnavselect2 = document.getElementById('prmnavselect2');
const prmimgselect2 = document.getElementById('prmimgselect2');
const prmlid = document.getElementById('prm-l-id');

let i = 0;


function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    console.log(rect.top);
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)


    );
}

const permset_administrationdata = [
    "REGISTER BRANCH",
    "BRANCH SELECTION",
    "REGISTER USER",
    "ORGANISATION INFO",
    "ADMIN PANEL",
    "USER ACTIVITY LOGS",
    "MACHINE IDENTIFICATION",
    "MARKETERS TARGET",
    "GROUP TARGET",
    "REVIEW SERIAL NUMBERS",
    "REJECT TRANSACTION DATE",
    "MY PROFILE",
    "CONFIRM/COLLECT BOOKLET",
    "SUPPLY BOOKLET",
    "BOOKLET STOCK HISTORY",
    "BOOKLET RENEWAL/REPLACEMENT",
    "SERIAL NUMBER LOOK-UPS/COMPLAINTS",
    "REGISTRATION POINT",
    "TASK SCHEDULE",
    "VIEW TASK SCHEDULE",
    "APPROVE BOOKLETS",
    "CASHIER LIMIT",
    "COMMISSION CATEGORIES"
]

const permset_inventorydata =[
    "ITEM TYPE",
    "REGISTER INVENTORY",
    "VIEW INVENTORY LIST",
    "APPROVE INVENTORY",
    "SUPPLIER / CUSTOMER",
    "INTAKE/STOCK CONTROL",
    "INTAKE HISTORY",
    "STOCK LEDGER",
    "OUTTAKE",
    "OUTTAKE HISTORY",
    "RETURN",
    "RETURN VIEW",
    "GIFTS",
    "GIFTS VIEW",
    "STOCK STATUS REPORT",
  'FIND UPDATED RECORD',
    "VIEW ARCHIVE INVENTORY LIST"
]

    
const permset_customerdata = [
    'VIEW CUSTOMERS',
    'REGISTER CUSTOMER ACCOUNT',
    ];

const permset_savingsdata = [
    'APPROVE CUSTOMER UPDATE',
    'APPROVE UPDATE OF CUSTOMER PROFILE',
    "SAVINGS PRODUCT",
    "SAVINGS ACCOUNT PRODUCTS",
    "ADD SAVINGS ACCOUNTS",
    "VIEW SAVINGS ACCOUNTS",
    "SAVINGS TRANSACTIONS",
    "SAVINGS DEPOSIT ANALYSIS",
    "TRANSFER SAVINGS"
]

    
const permset_propertydata = [
    "BUILD PROPERTY ITEMS",
    "CATEGORY VALUE TIMELINE",
    "ADD PROPERTY ACCOUNT",
    "VIEW COMPOSITE ITEMS",
    "VIEW PROPERTY ACCOUNTS",
    "MATURED PROPERTY ACCOUNTS",
    "MISSED MATURITY",
    "PROPERTY TRANSACTION REPORT",
    "PROPERTY DELIVERY",
    "VIEW DELIVERY",
    "REVERSE DELIVERY",
    "PROPERTY STOCK OUTTAKE REPORT",
    "PROPERTY DEPOSIT ANALYSIS",
    "PROPERTY DEPOSIT STATUS",
    "PROPERTY COMMISSIONS",
    "PROPERTY LEDGER"
]

    
const permset_loansdata = [
    "ADD LOAN FEES",
    "LOAN PRODUCTS",
    "ADD LOAN ACCOUNT",
    "VIEW LOANS",
    "ADD COLLATERAL",
    "APPROVE LOAN",
    "VIEW ACTIVE LOANS",
    "DUE LOANS",
    "MISSED REPAYMENTS",
    "PAST MATURITY DATE",
    "NO REPAYMENT",
    "REPAYMENT SCHEDULE",
    "LOAN TRANSACTION REPORT",
    "LOAN CLASSIFICATION REPORT"
]

    
const permset_transactionsdata = [
    "STATEMENT OF ACCOUNT",
    "COLLECTIONS",
    "COLLECTIONS VIEW",
    "UPDATE DAILY UNITS",
    "APPROVED COLLECTIONS",
    "DECLINED COLLECTIONS",
    "WITHDRAWAL",
    "VIEW WITHDRAWALS",
    "APPROVE WITHDRAWALS",
    "DEPOSIT",
    "VIEW DEPOSITS",
    "APPROVE DEPOSITS",
    "GROUP DEPOSIT",
    "VIEW GROUP DEPOSIT",
    "EDIT DEPOSIT",
    "VIEW EDITED DEPOSIT",
    "VIEW DELETED DEPOSIT",
    "EDIT WITHDRAWALS",
    "VIEW EDITED WITHDRAWALS",
    "VIEW DELETED WITHDRAWALS",
    "DAILY TRANSACTIONS",
    "RESOLVE EXCESS & RETURNED CASH",
    "NET TRANSACTION",
    "BRANCH FUND TRANSFER",
    "VIEW BRANCH FUND TRANSFER",
    "GROUP SYSTEM CASH POSITION",
    "EXCESS CASH REPORT",
    "RETURNED CASH REPORT",
    "AGGREGATED BRANCH DEPOSITS"
]

    
const permset_PersonnelPayrolldata = [
    "ADD DEPARTMENT",
    "ADD LEVEL",
    "ADD GROUP",
    "ADD PERSONNEL",
    "APPROVE PERSONNEL",
    "VIEW PERSONNEL",
    "PERSONNEL HISTORY",
    "ADD GUARANTOR",
    "ADD EMPLOYMENT RECORD",
    "ADD REFEREE",
    "ADD QUALIFICATION",
    "QUERY",
    "PROMOTIONS",
    "TERMINATION",
    "SUSPENSION",
    "LEAVE",
    "WARNING",
    "ADVANCE",
    "VIEW STAFF ADVANCE",
    "STAFF SALARY RECORD",
    "VIEW MONTHLY SALARY SCHEDULE",
    "PAYROLL",
    "APPROVE PAYROLL"
]

    
const permset_accountsdata = [
    "ADD GL ACCOUNT",
    "VIEW GL ACCOUNTS",
    "ADD GL TRANSACTION",
    "VIEW GL TRANSACTION HISTORY",
    "VIEW TRIAL BALANCE",
    "VIEW INCOME STATEMENT",
    "VIEW BALANCE SHEET"
]

     
const permset_otherreportsdata = [
    "SEARCH CREDIT RATING",
    "WAREHOUSE SALES",
    "VIEW WAREHOUSE SALES",
    "EXPENDITURES",
    "VIEW EXPENDITURES",
    "PAYMENTS",
    "VIEW PAYMENTS",
    "INTERBANK TRANSFERS",
    "VIEW RECIPIENTS",
    "VIEW TRANSFERS",
    'VIEW RETURN CASH TRANSACTION',
  'VIEW EDITED SERVICE CHARGE',
  'VIEW CASH',
  'SUBMITTED ERRORS',
  'GROUP SYSTEM CASH ANALYSES',
  'CONSOLIDATE REPORTS'
    ];
     
const permset_otherdata = [
'VIEW REPORTS ACROSS LOCATIONS',
'APPROVE COLLECTIONS',
'DELETE DEPOSIT',
'DELETE WITHDRAWAL',
'EDIT DEPOSIT',
'EDIT WITHDRAWAL',
'VIEW BALANCE ON MOBILE',
'APPROVE TRANSACTION',
'PAY INTERBANK TRANSFER',
'ACTIVATE OR DEACTIVATE MACHINES'

    ];
  
const populate_permissions =(result)=>{
    if(!result){
        if(document.getElementById('perm_user'))document.getElementById('perm_user').value = ''; 
        if(document.getElementById('perm_role'))document.getElementById('perm_role').value = '';
        if(document.getElementById('permset_administration'))document.getElementById('permset_administration').innerHTML = `PLEASE SELECT A USER.`;
        if(document.getElementById('permset_inventory'))document.getElementById('permset_inventory').innerHTML = '';
        if(document.getElementById('permset_customer'))document.getElementById('permset_customer').innerHTML = '';
        if(document.getElementById('permset_savings'))document.getElementById('permset_savings').innerHTML = '';
        if(document.getElementById('permset_property'))document.getElementById('permset_property').innerHTML = '';
        if(document.getElementById('permset_loans'))document.getElementById('permset_loans').innerHTML = '';
        if(document.getElementById('permset_transactions'))document.getElementById('permset_transactions').innerHTML = '';
        if(document.getElementById('permset_PersonnelPayroll'))document.getElementById('permset_PersonnelPayroll').innerHTML = '';
        if(document.getElementById('permset_accounts'))document.getElementById('permset_accounts').innerHTML = '';
        if(document.getElementById('permset_otherreports'))document.getElementById('permset_otherreports').innerHTML = '';
        if(document.getElementById('permset_other'))document.getElementById('permset_other').innerHTML = '';
    }else{
        if(document.getElementById('permlocation'))document.getElementById('permlocation').value = result.location_name;
        alert(result.location_name)
        if(document.getElementById('perm_role'))document.getElementById('perm_role').value = result.role;
        let actiiva = result.permissions.split('|');
        if(document.getElementById('permset_administration'))document.getElementById('permset_administration').innerHTML = `<p class="prmitemheader subheader2">ADMINISTRATION</p> ${permset_administrationdata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_inventory'))document.getElementById('permset_inventory').innerHTML = `<p class="prmitemheader subheader2">INVENTORY</p> ${permset_inventorydata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_customer'))document.getElementById('permset_customer').innerHTML = `<p class="prmitemheader subheader2">CUSTOMER</p> ${permset_customerdata.map(data=>{
           if(actiiva.includes(`${data}`)){
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_savings'))document.getElementById('permset_savings').innerHTML = `<p class="prmitemheader subheader2">SAVINGS</p> ${permset_savingsdata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_property'))document.getElementById('permset_property').innerHTML = `<p class="prmitemheader subheader2">PROPERTY</p> ${permset_propertydata.map(data=>{
           if(actiiva.includes(`${data}`)){
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_loans'))document.getElementById('permset_loans').innerHTML = `<p class="prmitemheader subheader2">LOANS</p> ${permset_loansdata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_transactions'))document.getElementById('permset_transactions').innerHTML = `<p class="prmitemheader subheader2">TRANSACTIONS</p> ${permset_transactionsdata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_PersonnelPayroll'))document.getElementById('permset_PersonnelPayroll').innerHTML = `<p class="prmitemheader subheader2">PERSONNEL & PAYROLL</p> ${permset_PersonnelPayrolldata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_accounts'))document.getElementById('permset_accounts').innerHTML = `<p class="prmitemheader subheader2">ACCOUNTS</p> ${permset_accountsdata.map(data=>{
           if(actiiva.includes(`${data}`)){
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_otherreports'))document.getElementById('permset_otherreports').innerHTML = `<p class="prmitemheader subheader2">OTHER REPORTS</p> ${permset_otherreportsdata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
        if(document.getElementById('permset_other'))document.getElementById('permset_other').innerHTML = `<p class="prmitemheader subheader2">OTHERS</p> ${permset_otherdata.map(data=>{
            if(actiiva.includes(`${data}`)){
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="1"><img class="prmitemimg" src="../images/on-button.png" alt=""><span>${data}</span></div>`
                )
            }else{
            return(
                `<div class="prmitem"><input name="prmswitch" type="hidden" value="0"><img class="prmitemimg" src="../images/off-button.png" alt=""><span>${data}</span></div>`
                )
            };
        }).join('')}`;
    }
}

const populate_user =(result)=>{
    if(document.getElementById('perm_user'))document.getElementById('perm_user').innerHTML = `<option value="">--select user--</option> ${result.data.map(data=>`<option value="${data.email}">${data.lastname} ${data.firstname}</option>`)}` ;
}

const box = document.querySelector('#prm-contentscreen');
const content = document.querySelector('.prmselectcontainer');
const message = document.querySelector('#message');

const collate_permissions =()=>{
    let permiit = ''
    document.getElementsByName('prmswitch')
    for(i=0; i<document.getElementsByName('prmswitch').length; i++){
        if(document.getElementsByName('prmswitch')[i].value == 1){
            permiit += `${document.getElementsByName('prmswitch')[i].nextElementSibling.nextElementSibling.textContent}|`;
        }
    }
    return `${permiit.slice(0, -1)}`
};

// const colatle_permissions =()=>{
//     let permiit = ''
//     document.getElementsByName('prmswitch')
//     for(i=0; i<document.getElementsByName('prmswitch').length; i++){
//         if(document.getElementsByName('prmswitch')[i].value == 1){
//             permiit += `${document.getElementsByName('prmswitch')[i].nextElementSibling.nextElementSibling.textContent}|`;
//         }
//     }
//     return permiit
// };

function getpermissionsParams(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('perm_user').value);
// for (var pair of paramstr.entries()) {
//             //   console.log(pair[0] + ', ' + pair[1]); 
//             // return(pair[0]+ ', ' + pair[1]); 
//             }
    return paramstr;
};

function updatepermissionsParams(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('perm_user').value);
    paramstr.append('role', document.getElementById('perm_role').value);
    paramstr.append('permissions', collate_permissions());
    return paramstr;
};

async function permissionsetting() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('permissionsetting.php', 'override');  
        if(document.getElementById('prm-card'))document.getElementById('prm-card').addEventListener('click', e=>{
            // console.log('clicked')
            // location.href = '#prm-contentscreen';
            if(document.getElementById('prm-btnscreen'))document.getElementById('prm-btnscreen').style.display = 'none'
            // if(document.getElementById('prm-contentscreen'))document.getElementById('prm-contentscreen').style.display = 'flex'
        });
        if(document.getElementById('prm-bckbtn'))document.getElementById('prm-bckbtn').addEventListener('click', e=>{
            // if(document.getElementById('prm-contentscreen'))document.getElementById('prm-contentscreen').style.display = 'none'
            if(document.getElementById('prm-btnscreen'))document.getElementById('prm-btnscreen').style.display = ''
            // location.href = '#prm-btnscreen'
        });
        // callController =(controller, params, name, validate, funct, e)
        callController('fetchallusers.php', null, 'fetchallusers', null, populate_user, 'silent');
        if(document.getElementById('perm_user'))document.getElementById('perm_user').addEventListener('change', e=>{
            if(document.getElementById('perm_user').value == '')populate_permissions();
            if(document.getElementById('perm_user').value != '')callController('fetchuserprofile.php', getpermissionsParams(), 'fetchuserprofile', null, populate_permissions)
        })
        if(document.getElementById('permset_save'))document.getElementById('permset_save').addEventListener('click', e=>{
            const call =()=>{
                if(document.getElementById('perm_user'))document.getElementById('perm_user').value = ''
            if(document.getElementById('perm_role'))document.getElementById('perm_role').value = ''
            populate_permissions();
            }
            callController('updatepermissions.php', updatepermissionsParams(), 'updatepermissions', [`perm_user`,`perm_role`], call);
        })
        window.onmousedown=(e)=>{
    let el = e.target;
    console.log(el);
}
        
        populate_permissions();
        
}


var orepermissionsetting = document.getElementById("permissionsetting");
if (orepermissionsetting) orepermissionsetting.addEventListener("click", e=>permissionsetting());

