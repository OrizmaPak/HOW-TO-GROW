var viewpersonnel_datasource = [];
var viewpersonneldata = ''

const viewpersonelpaginate=(data)=>{
    if(document.getElementById('personnelnamedatalist').innerHTML === ''){
        document.getElementById('personnelnamedatalist').innerHTML = data.data.map(dat=>`<option value="${dat.personnel.firstname} ${dat.personnel.lastname}"/>`).join('')
    }
    viewpersonnel_datasource = [];
    viewpersonnel_datasource = datasource = data.data
    initPagination(viewpersonnel_datasource, viewpersonnelsetCurrentPage)
    viewpersonneldata = viewpersonnel_datasource
    document.getElementById('viewpersonneltabledata2').innerHTML = viewpersonnel_datasource.map(dat=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${dat.personnel.staffid} </td>
                                <td> ${dat.personnel.firstname} </td>
                                <td> ${dat.personnel.lastname} </td>
                                <td> ${dat.personnel.gender} </td>
                                <td> ${dat.personnel.nationality} </td>
                                <td> ${dat.personnel.state} </td>
                                <td> ${dat.personnel.lga} </td>
                                <td> ${dat.personnel.residentialaddress} </td>
                            </tr>`)
    }).join('')
    }


var viewpersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(viewpersonnel_datasource.length) {
        viewpersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendviewpersonnelTableRows(item, index)
            }
        })
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("viewpersonneltabledata").innerHTML=  renderNoTableData()
    }
};

        const perdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('staffid', id);
        		paramstr.append('removesavings', document.getElementById(`${check}`).value == 'on' ? 'YES' : 'NO');
        		
        		return paramstr;
        }
        const goperback=()=>{
            callDialog()
            document.getElementById('viewpersonnelmodalbtn').click();
            document.getElementById("viewpersonnel").click();
        }
    const moddata =(id, firstname, lastname)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 100%">
                            <p style="color:black;">Are you sure you want to delete this personnel ${lastname.toUpperCase()} ${firstname.toUpperCase()}.
                            This action will remove this personnel's records from the database.</p>
                            <div style="display: flex;margin-top: 5px">
                                <input id="removesavings" type="checkbox" style="transform: scale(1.2);position:relative;top:1px"> 
                                <p onclick="this.previousElementSibling.click()" onmouseover="this.style.textDecorarion = 'underline'" style="color:#000000;margin-left:10px;font-size: 1.2rem">Remove the staff savings account also?</p>
                            </div>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removepersonnel.php', perdeleteparams(${id}, 'removesavings'), 'removepersonnel', null, goperback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000);
        callDialog('OPEN', content)
    }
const viewpersonnelmodal =(action, data, delit)=>{
    if(delit){ 
        document.getElementById('viewpersonneldeletebtn1').style.visibility = 'visible'
        document.getElementById('viewpersonneldeletebtn2').style.visibility = 'visible'
    }else{
        document.getElementById('viewpersonneldeletebtn1').style.visibility = 'hidden'
        document.getElementById('viewpersonneldeletebtn2').style.visibility = 'hidden'
    }  
    if(action == 'OPEN'){
        document.getElementById('viewpersonnelmodal').style.top = '49px';
        if(data){
            document.getElementById('viewpersonneldeletebtn1').setAttribute('onclick', `moddata('${data[0].personnel.staffid}', '${data[0].personnel.firstname}', '${data[0].personnel.lastname}')`)
            document.getElementById('viewpersonneldeletebtn2').setAttribute('onclick', `moddata('${data[0].personnel.staffid}', '${data[0].personnel.firstname}', '${data[0].personnel.lastname}')`)
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
		    }).join('');
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
		    }).join('');
		    
        }
    }
    if(action == 'CLOSE'){
        document.getElementById('viewpersonnelmodal').style.top = '-949px';
    }
}


const viewpersonnelviewfunct =(item)=>{
    console.log('viewpersonnelviewfunct', item, viewpersonneldata.filter(data=>data.personnel.id == item));
    viewpersonnelmodal('OPEN', viewpersonneldata.filter(data=>data.personnel.id == item));
    
}

const viewpersonneleditfunct =(item)=>{
    console.log('viewpersonneleditfunct', item, viewpersonneldata.filter(data=>data.personnel.id == item));
    sessionStorage.setItem('viewpersonneleditfunct', JSON.stringify(viewpersonneldata.filter(data=>data.personnel.id == item)));
    document.getElementById("personnel").click(); 
}

const viewpersonnelgaurantorfunct =(item)=>{
    console.log('viewpersonnelguarantorfunct', item, viewpersonneldata.filter(data=>data.personnel.id == item));
    sessionStorage.setItem('viewpersonnelguarantorfunct', JSON.stringify(viewpersonneldata.filter(data=>data.personnel.id == item)));
    document.getElementById("guarantor").click(); 
}

const viewpersonnelrefereesfunct =(item)=>{
    console.log('viewpersonnelrefereesfunct', item, viewpersonneldata.filter(data=>data.personnel.id == item));
    sessionStorage.setItem('viewpersonnelrefereesfunct', JSON.stringify(viewpersonneldata.filter(data=>data.personnel.id == item)));
    document.getElementById("referees").click(); 
}

const viewpersonnelqualificationfunct =(item)=>{
    console.log('viewpersonnelqualificationfunct', item, viewpersonneldata.filter(data=>data.personnel.id == item));
    sessionStorage.setItem('viewpersonnelqualificationfunct', JSON.stringify(viewpersonneldata.filter(data=>data.personnel.id == item)));
    document.getElementById("qualificationn").click(); 
}

const viewpersonnelemployerrecordfunct =(item)=>{
    console.log('viewpersonnelemployerrecordfunct', item, viewpersonneldata.filter(data=>data.personnel.id == item));
    sessionStorage.setItem('viewpersonnelemployerrecordfunct', JSON.stringify(viewpersonneldata.filter(data=>data.personnel.id == item)));
    document.getElementById("employerrecord").click(); 
}

const viewpersonnelqueryfunct =(item)=>{
    console.log('viewpersonnelqueryfunct', item, viewpersonneldata.filter(data=>data.personnel.id == item));
    sessionStorage.setItem('viewpersonnelqueryfunct', JSON.stringify(viewpersonneldata.filter(data=>data.personnel.id == item)));
    document.getElementById("query").click(); 
}

const viewpersonnelterminatefunct =(item)=>{
    console.log('viewpersonnelterminatefunct', item, viewpersonneldata.filter(data=>data.personnel.id == item));
    sessionStorage.setItem('viewpersonnelterminatefunct', JSON.stringify(viewpersonneldata.filter(data=>data.personnel.id == item)));
    document.getElementById("termination").click(); 
}

const viewpersonnelsuspensionfunct =(item)=>{
    console.log('viewpersonnelsuspensionfunct', item, viewpersonneldata.filter(data=>data.personnel.id == item));
    sessionStorage.setItem('viewpersonnelsuspensionfunct', JSON.stringify(viewpersonneldata.filter(data=>data.personnel.id == item)));
    document.getElementById("suspension").click(); 
}

const viewpersonnelwarningfunct =(item)=>{
    console.log('viewpersonnelwarningfunct', item, viewpersonneldata.filter(data=>data.personnel.id == item));
    sessionStorage.setItem('viewpersonnelwarningfunct', JSON.stringify(viewpersonneldata.filter(data=>data.personnel.id == item)));
    document.getElementById("warning").click(); 
}

const viewpersonnelpromotionsfunct =(item)=>{
    console.log('viewpersonnelpromotionsfunct', item, viewpersonneldata.filter(data=>data.personnel.id == item));
    sessionStorage.setItem('viewpersonnelpromotionsfunct', JSON.stringify(viewpersonneldata.filter(data=>data.personnel.id == item)));
    document.getElementById("promotions").click(); 
}

const viewpersonnelleavefunct =(item)=>{
    console.log('viewpersonnelleavefunct', item, viewpersonneldata.filter(data=>data.personnel.id == item));
    sessionStorage.setItem('viewpersonnelleavefunct', JSON.stringify(viewpersonneldata.filter(data=>data.personnel.id == item)));
    document.getElementById("leave").click(); 
}

const viewpersonneldeletefunct =(item)=>{
    console.log('viewpersonnelviewfunct', item, viewpersonneldata.filter(data=>data.personnel.id == item));
    viewpersonnelmodal('OPEN', viewpersonneldata.filter(data=>data.personnel.id == item), 'DELETE');
    
}

function appendviewpersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("viewpersonneltabledata").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${data.personnel.staffid} </td>
                                <td> ${data.personnel.firstname} </td>
                                <td> ${data.personnel.lastname} </td>
                                <td> ${data.personnel.gender} </td> 
                                <td> ${data.personnel.nationality} </td>
                                <td> ${data.personnel.state} </td>
                                <td> ${data.personnel.lga} </td>
                                <td> ${data.personnel.residentialaddress} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;color:white;border-radius:3px;cursor: pointer;" class="" name="viewpersonnelaction">Action</button>
                                        <div class=" viewpersnnn viewpersnnn1" style="display: none;position: relative" class="viewpersonnelmodal">
                                            <div class="viewpersonnelcontent viewpersnnn">
                                                <button style="padding: 5px 6px;margin: 5px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px;cursor: pointer;" onclick="viewpersonnelviewfunct(${data.personnel.id})">View</button>
                                                <button style="padding: 5px 6px;margin: 5px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px;cursor: pointer;" onclick="viewpersonneleditfunct(${data.personnel.id})">Edit</button>
                                                <button style="padding: 5px 6px;margin: 5px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px;cursor: pointer;" onclick="viewpersonnelgaurantorfunct(${data.personnel.id})">Add Guarantor</button>
                                                <button style="padding: 5px 6px;margin: 5px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px;cursor: pointer;" onclick="viewpersonnelrefereesfunct(${data.personnel.id})">Add Referee</button>
                                                <button style="padding: 5px 6px;margin: 5px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px;cursor: pointer;" onclick="viewpersonnelqualificationfunct(${data.personnel.id})">Add Qualifications</button>
                                                <button style="padding: 5px 6px;margin: 5px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px;cursor: pointer;" onclick="viewpersonnelemployerrecordfunct(${data.personnel.id})">Add Employer Record</button>
                                                <button style="padding: 5px 6px;margin: 5px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px;cursor: pointer;" onclick="viewpersonnelqueryfunct(${data.personnel.id})">Query</button>
                                                <button style="padding: 5px 6px;margin: 5px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px;cursor: pointer;" onclick="viewpersonnelterminatefunct(${data.personnel.id})">Terminate</button>
                                                <button style="padding: 5px 6px;margin: 5px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px;cursor: pointer;" onclick="viewpersonnelsuspensionfunct(${data.personnel.id})">Suspend</button>
                                                <button style="padding: 5px 6px;margin: 5px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px;cursor: pointer;" onclick="viewpersonnelwarningfunct(${data.personnel.id})">Warn</button>
                                                <button style="padding: 5px 6px;margin: 5px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px;cursor: pointer;" onclick="viewpersonnelpromotionsfunct(${data.personnel.id})">Promote</button>
                                                <button style="padding: 5px 6px;margin: 5px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px;cursor: pointer;" onclick="viewpersonnelleavefunct(${data.personnel.id})">Leave</button>
                                                <button style="padding: 5px 6px;margin: 5px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px;cursor: pointer;" onclick="viewpersonneldeletefunct(${data.personnel.id})">Delete</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
    `
} 

    const popvwperdept=(result)=>{
	    document.getElementById('personelviewdepartment').innerHTML += result.data.data.map(data=>{
	        return(`
	            <option disabled value="${data.id}"> ${data.department.toUpperCase()} </option>
	        `)
	    }).join('')
	}
	const popvwpergroup=(result)=>{
	    document.getElementById('personelviewgroup').innerHTML += result.data.data.map(data=>{
	        return(`
	            <option disabled value="${data.id}"> ${data.groupname.toUpperCase()} </option>
	        `)
	    }).join('')
	}
	const popvwperlevel=(result)=>{
	    document.getElementById('personelviewlevel').innerHTML += result.data.data.map(data=>{
	        return(`
	            <option disabled value="${data.id}"> ${data.level.toUpperCase()} </option>
	        `)
	    }).join('')
	}

async function oreviewpersonnel() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('viewpersonnel.php', 'override')  
        callController('fetchdepartment.php', null, 'fetchdepartment', null,  popvwperdept, 'silent')
        callController('fetchgroupname.php', null, 'fetchgroupname', null,  popvwpergroup, 'silent')
        callController('fetchlevel.php', null, 'fetchlevel', null,  popvwperlevel, 'silent')
        if(document.getElementById('viewpersonnelmodalbtn'))document.getElementById('viewpersonnelmodalbtn').addEventListener('click', e=>viewpersonnelmodal('CLOSE'));
        if(document.getElementById('viewpersonnelmodalbtn2'))document.getElementById('viewpersonnelmodalbtn2').addEventListener('click', e=>viewpersonnelmodal('CLOSE'));
        jtabledata = document.getElementById('viewpersonneltabledata');
        // paginationLimit = 10;
        initializePaginationParams(viewpersonnelsetCurrentPage);
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, viewpersonelpaginate)
        if(document.getElementById('viewpersonnelexport'))document.getElementById('viewpersonnelexport').addEventListener('click',e=>{
            tableToExcel('viewpersonnelfulltable2', 'LIST OF PERSONNEL')},false);
        if(document.getElementById('viewpersonnelprint'))document.getElementById('viewpersonnelprint').addEventListener('click',e=>{
            printContent('LIST OF PERSONNEL',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewpersonnelfulltableparant')},false);

        //YOUR VARIABLES STAYS HERE
        // const statementstaffid = document.getElementById('smacc')
        // const statementStartDate = document.getElementById('smsd');
        
        //ALWAYS CHECK BEFORE ADDING EVENTLISTENERS
        // if(loadstatementbtn) loadstatementbtn.addEventListener('click', () => loadStatement());
        
        //TO CALL AND HIDE SPINNER WHEN NEEDED
        // showSpinner();
        // hideSpinner()
        
       // THE REST OF YOUR CODE GOES HERE
       
       //THANKS
       
       window.onclick =(e)=>{
           var el = e.target;
           if(!el.classList.contains("viewpersnnn") || el.parentElement.classList.contains("viewpersnnn")){
               for(i=0;i<document.getElementsByClassName('viewpersnnn1').length;i++){
                   document.getElementsByClassName('viewpersnnn1')[i].style.display = 'none';
               }
           }
           if(el.tagName.toLowerCase() == 'button' && el.name == 'viewpersonnelaction'){
               if(el.nextElementSibling.style.display == 'none'){
                   el.nextElementSibling.style.display = 'block';
               }else{
                   el.nextElementSibling.style.display = 'none';
               }
           }
       }
        
}


var oreviewpersonnelbbtn = document.getElementById("viewpersonnel");
if (oreviewpersonnelbbtn) oreviewpersonnelbbtn.addEventListener("click", oreviewpersonnel, false);
