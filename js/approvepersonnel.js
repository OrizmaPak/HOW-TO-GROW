
var approvepersonnelpersonnel_datasource = [];

const approvepersonnelpersonnelepaginate=(data)=>{
    approvepersonnelpersonnel_datasource = [];
    approvepersonnelpersonnel_datasource = datasource = data.data;
    initPagination(approvepersonnelpersonnel_datasource, approvepersonnelpersonnelsetCurrentPage);
    }


var approvepersonnelpersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(approvepersonnelpersonnel_datasource.length) {
        approvepersonnelpersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendapprovepersonnelpersonnelTableRows(item, index)
            }
        })
    }
    else {
        document.getElementById("approvepersonnelpersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const approvepersonnelmodal =(action, data)=>{
    if(action == 'OPEN'){
        document.getElementById('approvepersonnelmodal').style.top = '49px';
        if(data){
            document.getElementById('personelviewfirstname').value = data[0].personnel.firstname;
		    document.getElementById('personelviewlastname').value = data[0].personnel.lastname;
		    document.getElementById('personelviewothernames').value = data[0].personnel.othernames;
		    document.getElementById('personelviewphonenumber').value = data[0].personnel.phonenumber;
		    document.getElementById('personelviewworkstatus').value = data[0].personnel.workstatus;
		    document.getElementById('personelviewmaritalstatus').value = data[0].personnel.maritalstatus;
		    document.getElementById('personelviewresidentialaddress').value = data[0].personnel.residentialaddress;
		    document.getElementById('personelviewpermanenthome').value = data[0].personnel.permanenthomeaddress;
		    document.getElementById('personelviewgender').value = data[0].personnel.gender;
		    document.getElementById('personelviewbasicaccountnumber').value = data[0].personnel.bankaccountnumber1;
		    document.getElementById('personelviewbasicbankname').value = data[0].personnel.bankname1;
		    document.getElementById('personelviewallowaccountnumber').value = data[0].personnel.bankaccountnumber2;
		    document.getElementById('personelviewallowbankname').value = data[0].personnel.bankname2;
		    document.getElementById('personelviewusernameemail').value = data[0].personnel.registereduseremail;
		    document.getElementById('personelviewdepartment').value = data[0].personnel.departmentid;
		    document.getElementById('personelviewbirthdate').value = data[0].personnel.birthdate;
		    document.getElementById('personnelnationalityy').value = data[0].personnel.nationality;
		    document.getElementById('personelviewstate').value = data[0].personnel.state;
		    document.getElementById('personelviewlga').value = data[0].personnel.lga;
		    document.getElementById('personelviewdeformity').value = data[0].personnel.deformity;
		    document.getElementById('personelvieweyeglasses').value = data[0].personnel.eyeglasses;
		    document.getElementById('personelviewotherdeformity').value = data[0].personnel.hearingaid;
		    document.getElementById('personelviewheight').value = data[0].personnel.height;
		    document.getElementById('personelviewweight').value = data[0].personnel.weight;
		  //  document.getElementById('personelviewbank').value = data[0].personnel.;
		    document.getElementById('personelviewemplymentdate').value = data[0].personnel.employmentdate;
		    document.getElementById('personelviewbasicsalary').value = data[0].personnel.basicsalary;
		    document.getElementById('personelviewlevel').value = data[0].personnel.levelid;
		    document.getElementById('personelviewgroup').value = data[0].personnel.groupid;
		    document.getElementById('allowanceviewpersonnelcontainer').innerHTML = data[0].salarystructure.map(dat=>{
		        if(dat.salaryinfotype == 'ALLOWANCE')return(`
		                        <div name="allowancepersonnelcontainer">
                                    <div class="jformgroup jformgroup form_row">
                                        <div class="jformgroup jformgroupcol">
                                            <input readonly value="${dat.salaryinfo}" style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy" type="text" id="" placeholder="Allowance name" required>
                                        </div>
                                        <div class="jformgroup jformgroupcol jmargin-left">
                                            <input readonly value="${dat.amountpercentage}" style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy" type="text" id="" placeholder="Percentage %" required>
                                        </div>
                                        <div class="jformgroup jformgroupcol jmargin-left">
                                            <div id="" class="oreadddebit oreremove mt hidden" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                                        </div>
                                    </div>
                                </div>
	                        `)
		    });
		    document.getElementById('deductionsviewpersonnelcontainer').innerHTML = data[0].salarystructure.map(dat=>{
		        if(dat.salaryinfotype == "DEDUCTION")return(`
		                        <div name="allowancepersonnelcontainer">
                                    <div class="jformgroup jformgroup form_row">
                                        <div class="jformgroup jformgroupcol">
                                            <input readonly value="${dat.salaryinfo}" style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy" type="text" id="" placeholder="Allowance name" required>
                                        </div>
                                        <div class="jformgroup jformgroupcol jmargin-left">
                                            <input readonly value="${dat.amountpercentage}" style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy" type="text" id="" placeholder="Percentage %" required>
                                        </div>
                                        <div class="jformgroup jformgroupcol jmargin-left">
                                            <div id="" class="oreadddebit oreremove mt hidden" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                                        </div>
                                    </div>
                                </div>
	                        `)
		    });
		    
        }
    }
    if(action == 'CLOSE'){
        document.getElementById('approvepersonnelmodal').style.top = '-949px';
    }
}

const approvepersonnelviewfunct =(item)=>{
    console.log('approvepersonnelviewfunct', item, approvepersonnelpersonnel_datasource.filter(data=>data.personnel.id == item));
    approvepersonnelmodal('OPEN', approvepersonnelpersonnel_datasource.filter(data=>data.personnel.id == item));
    
}

const approvepersonneleditfunct =(item)=>{
    console.log('viewpersonneleditfunct', item, approvepersonnelpersonnel_datasource.filter(data=>data.personnel.id == item));
    sessionStorage.setItem('viewpersonneleditfunct', JSON.stringify(approvepersonnelpersonnel_datasource.filter(data=>data.personnel.id == item)));
    document.getElementById("personnel").click(); 
}

const checkallpersonneltoapprove =(state)=>{
    if(state.textContent == 'select all'){
        for(i=0;i<document.getElementsByClassName('approvepersonnelcheckbox').length;i++){
            document.getElementsByClassName('approvepersonnelcheckbox')[i].checked = true
        }
        state.textContent = 'deselect all';
        return
    }
    if(state.textContent == 'deselect all'){
        for(i=0;i<document.getElementsByClassName('approvepersonnelcheckbox').length;i++){
            document.getElementsByClassName('approvepersonnelcheckbox')[i].checked = false
        }
        state.textContent = 'select all';
        return
    }
}

const approvepersonnelparmsforpersonnel =(action)=>{
    let paramstr = new FormData();
    paramstr.append('buttonselected', action);
    let idsp = [];
     for(i=0;i<document.getElementsByClassName('approvepersonnelcheckbox').length;i++){
         if(document.getElementsByClassName('approvepersonnelcheckbox')[i].checked){
            idsp.push(`${document.getElementsByClassName('approvepersonnelcheckbox')[i].id}`) 
         }
     }  
     for(i=0;i<idsp.length;i++){
         paramstr.append(`ids${i}`, `${idsp[i]}`);
     }
         paramstr.append(`idsize`, idsp.length);
   
    return paramstr;
}

const refreshapprovepersonnel =()=>{
    document.getElementById('approvepersonnel').click();
}

const personneltoapprove =()=>{
        let checked = '';
    for(i=0;i<document.getElementsByClassName('approvepersonnelcheckbox').length;i++){
        if(document.getElementsByClassName('approvepersonnelcheckbox')[i].checked){
            checked = 'good'
        }
    }
    if(checked == '')return callModal('No personnel has been selected for approval', 0);
    callController('personnelapprovals.php', approvepersonnelparmsforpersonnel("APPROVE"), 'personnelapprovals', null, refreshapprovepersonnel);
}

const personneltodecline =()=>{
        let checked = ''; 
    for(i=0;i<document.getElementsByClassName('approvepersonnelcheckbox').length;i++){ 
        if(document.getElementsByClassName('approvepersonnelcheckbox')[i].checked){
            checked = 'good'
        }
    }
    if(checked == '')return callModal('No personnel has been selected for decline', 0);
    callController('personnelapprovals.php', approvepersonnelparmsforpersonnel("DECLINE"), 'personnelapprovals', null, refreshapprovepersonnel);
}

function appendapprovepersonnelpersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("approvepersonnelpersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td><input class="approvepersonnelcheckbox" type="checkbox" id="${data.personnel.id}" ></td>
                                <td> ${data.personnel.firstname} </td>
                                <td> ${data.personnel.lastname} </td>
                                <td> ${data.personnel.phonenumber} </td>
                                <td> ${data.personnel.gender} </td>
                                <td> ${data.personnel.residentialaddress} </td>
                                <td> ${data.personnel.user?.toLowerCase()} </td> 
                                <td> ${data.personnel.employmentdate} </td>
                                <td> ${data.personnel.basicsalary} </td>
                                <td>
                                    <div style="width:70px" class="flex" style="align-items:center">
                                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px" onclick="approvepersonnelviewfunct(${data.personnel.id})">view</button>
                                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px" onclick="approvepersonneleditfunct(${data.personnel.id})">Edit</button>
                                    </div>
                                </td>
                            </tr>
    `
} 

function personnelnotapproved() {
    
    let paramstr = new FormData();
    paramstr.append('status', 'NOT APPROVED');
   
    return paramstr
}

const appopvwperdept=(result)=>{
	    document.getElementById('personelviewdepartment').innerHTML += result.data.data.map(data=>{
	        return(`
	            <option disabled value="${data.id}"> ${data.department.toUpperCase()} </option>
	        `)
	    })
	}
const appopvwpergroup=(result)=>{
    document.getElementById('personelviewgroup').innerHTML += result.data.data.map(data=>{
        return(`
            <option disabled value="${data.id}"> ${data.groupname.toUpperCase()} </option>
        `)
    })
}
const appopvwperlevel=(result)=>{
	    document.getElementById('personelviewlevel').innerHTML += result.data.data.map(data=>{
	        return(`
	            <option disabled value="${data.id}"> ${data.level.toUpperCase()} </option>
	        `)
	    })
	}

async function oreapprovepersonnel() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('approvepersonnel.php', 'override')  
        
        jtabledata = document.getElementById('approvepersonnelpersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams(approvepersonnelpersonnelsetCurrentPage);
        
        callController('fetchpersonnels.php', personnelnotapproved(), 'fetchpersonnels', null, approvepersonnelpersonnelepaginate);
        callController('fetchdepartment.php', null, 'fetchdepartment', null,  appopvwperdept, 'silent')
        callController('fetchgroupname.php', null, 'fetchgroupname', null,  appopvwpergroup, 'silent')
        callController('fetchlevel.php', null, 'fetchlevel', null,  appopvwperlevel, 'silent')
        if(document.getElementById('approvepersonnelmodalbtn'))document.getElementById('approvepersonnelmodalbtn').addEventListener('click', e=>approvepersonnelmodal('CLOSE'));
        if(document.getElementById('approvepersonnelmodalbtn2'))document.getElementById('approvepersonnelmodalbtn2').addEventListener('click', e=>approvepersonnelmodal('CLOSE'));
        
             
}


var oreapprovepersonnelbbtn = document.getElementById("approvepersonnel");
if (oreapprovepersonnelbbtn) oreapprovepersonnelbbtn.addEventListener("click", oreapprovepersonnel, false);
