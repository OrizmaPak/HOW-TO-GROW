    let realcountries = [];
    let realstates = [];
    let reallga = [];
    const personnelgetstate =(state)=>{
        console.log('detected', state)
        if(realcountries.includes(`${state.value}`)){
            showSpinner();
           getorevacountry(state.value);
            hideSpinner();
            
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid country`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
    const personnelgetcity =(state)=>{
        console.log('detected', state)
        if(realstates.includes(`${state.value}`)){
            showSpinner();
            getorevacountry(document.getElementById("personnelnationalityy").value, state.value);
            hideSpinner();
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid state`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
    const personnelgetlga =(state)=>{
        console.log('detected', state)
        if(reallga.includes(`${state.value}`)){
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid state`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
    
    const getorevacountry =(countryy, statee)=>{
        console.log(countryy, countryy ? 'true' : 'false');
        console.log(countryy, statee);
        var headers = new Headers();
        
        var requestOptionsPOST = {
           method: 'POST',
          headers: {
                'Content-Type': 'application/json'
              },
           redirect: 'follow',
           body:JSON.stringify({"country": `${countryy}`}),
        };
        var requestOptionsPOSTcities = {
           method: 'POST',
          headers: {
                'Content-Type': 'application/json'
              },
           redirect: 'follow',
           body:JSON.stringify({"country": `${countryy}`, "state": `${statee}`}),
        };
        var requestOptionsGET = {
           method: 'GET',
          headers: {
                'Content-Type': 'application/json'
              },
           redirect: 'follow',
        };
        if(countryy && statee)return fetch("https://countriesnow.space/api/v0.1/countries/state/cities", requestOptionsPOSTcities)
        .then(response => response.text())
        .then(result =>{
            console.log(JSON.parse(result));
            reallga = [];
            document.getElementById('orelga').innerHTML = JSON.parse(result).data.map(data=>{
                reallga.push(data)
                return(`<option value="${data}">`)
            }).join('');
        })
        .catch(error => console.log('error', error)); 
        if(countryy && !statee)return fetch("https://countriesnow.space/api/v0.1/countries/states", requestOptionsPOST)
        .then(response => response.text())
        .then(result =>{
            console.log(JSON.parse(result));
            realstates = [];
            document.getElementById('orestate').innerHTML = JSON.parse(result).data.states.map(data=>{
                realstates.push(data.name)
                return(`<option value="${data.name}">`)
            }).join('');
        })
        .catch(error => console.log('error', error)); 
        if(!countryy)return fetch("https://countriesnow.space/api/v0.1/countries", requestOptionsGET)
        .then(response => response.text())
        .then(result =>{
            console.log(JSON.parse(result));
            realcountries = [];
            document.getElementById('orecountry').innerHTML = JSON.parse(result).data.map(data=>{
                realcountries.push(data.country)
                return(`<option value="${data.country}">`)
            }).join('');
        })
        .catch(error => console.log('error', error)); 
    }

    function personnelparamsdata(){
		var paramstr = new FormData();
		
		paramstr.append('maritalstatus', document.getElementById('personelmaritalstatus').value);
		paramstr.append('gender', document.getElementById('personelgender').value);
		paramstr.append('deformity', document.getElementById('personeldeformity').value);
		paramstr.append('eyeglasses', document.getElementById('personeleyeglasses').value);
		paramstr.append('firstname', document.getElementById('personelfirstname').value);
		paramstr.append('hearingaid', document.getElementById('personelotherdeformity').value);
		paramstr.append('lastname', document.getElementById('personellastname').value);
		paramstr.append('othernames', document.getElementById('personelothernames').value);
		paramstr.append('phonenumber', document.getElementById('personelphonenumber').value);
		paramstr.append('workstatus', document.getElementById('personelworkstatus').value);
		paramstr.append('residentialaddress', document.getElementById('personelresidentialaddress').value);
		paramstr.append('permanenthomeaddress', document.getElementById('personelpermanenthome').value);
		paramstr.append('birthdate', document.getElementById('personelbirthdate').value);
		paramstr.append('nationality', document.getElementById('personnelnationalityy').value);
		paramstr.append('state', document.getElementById('personelstate').value);
		paramstr.append('lga', document.getElementById('personellga').value);
		paramstr.append('height', document.getElementById('personelheight').value);
		paramstr.append('weight', document.getElementById('personelweight').value);
// 		paramstr.append('accountnumber', document.getElementById('personelaccountnumber').value);
		paramstr.append('bankaccountnumber1', document.getElementById('personnelaccountnumber1').value);
		paramstr.append('bankname1', document.getElementById('personnelbankname1').value);
		paramstr.append('bankaccountnumber2', document.getElementById('personnelaccountnumber2').value);
		paramstr.append('bankname2', document.getElementById('personnelbankname2').value);
		paramstr.append('employmentdate', document.getElementById('personelemplymentdate').value);
		paramstr.append('registereduseremail', document.getElementById('personelusernameemail').value);
		paramstr.append('basicsalary', document.getElementById('personelbasicsalary').value);
		paramstr.append('departmentid', document.getElementById('personeldepartment').value);
		paramstr.append('levelid', document.getElementById('personellevel').value);
		paramstr.append('groupid', document.getElementById('personelgroup').value);
		
		for(i=0; i<document.getElementsByClassName('allowancename').length; i++){
		    paramstr.append(`allowances${i}`,document.getElementsByClassName('allowancename')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('allowancepercent').length; i++){
		    paramstr.append(`amountpercentage${i}`,document.getElementsByClassName('allowancepercent')[i].value);
		}
		paramstr.append('allgridsize',document.getElementsByClassName('allowancename').length);
		
		for(i=0; i<document.getElementsByClassName('deductionname').length; i++){
		    paramstr.append(`deductions${i}`,document.getElementsByClassName('deductionname')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('deductionpecent').length; i++){
		    paramstr.append(`dedamountpercentage${i}`,document.getElementsByClassName('deductionpecent')[i].value);
		}
		paramstr.append('dedgridsize',document.getElementsByClassName('deductionname').length);
		
	    return paramstr;

	};
    function personnelparamsdataupdate(){
		var paramstr = new FormData();
		
		paramstr.append('id', document.getElementById('id').value);
		paramstr.append('maritalstatus', document.getElementById('personelmaritalstatus').value);
		paramstr.append('gender', document.getElementById('personelgender').value);
		paramstr.append('deformity', document.getElementById('personeldeformity').value);
		paramstr.append('eyeglasses', document.getElementById('personeleyeglasses').value);
		paramstr.append('firstname', document.getElementById('personelfirstname').value);
		paramstr.append('hearingaid', document.getElementById('personelotherdeformity').value);
		paramstr.append('lastname', document.getElementById('personellastname').value);
		paramstr.append('othernames', document.getElementById('personelothernames').value);
		paramstr.append('phonenumber', document.getElementById('personelphonenumber').value);
		paramstr.append('workstatus', document.getElementById('personelworkstatus').value);
		paramstr.append('residentialaddress', document.getElementById('personelresidentialaddress').value);
		paramstr.append('permanenthomeaddress', document.getElementById('personelpermanenthome').value);
		paramstr.append('birthdate', document.getElementById('personelbirthdate').value);
		paramstr.append('nationality', document.getElementById('personnelnationalityy').value);
		paramstr.append('state', document.getElementById('personelstate').value);
		paramstr.append('lga', document.getElementById('personellga').value);
		paramstr.append('height', document.getElementById('personelheight').value);
		paramstr.append('weight', document.getElementById('personelweight').value);
// 		paramstr.append('accountnumber', document.getElementById('personelaccountnumber').value);
		paramstr.append('bankaccountnumber1', document.getElementById('personnelaccountnumber1').value);
		paramstr.append('bankname1', document.getElementById('personnelbankname1').value);
		paramstr.append('bankaccountnumber2', document.getElementById('personnelaccountnumber2').value);
		paramstr.append('bankname2', document.getElementById('personnelbankname2').value);
		paramstr.append('employmentdate', document.getElementById('personelemplymentdate').value);
		paramstr.append('registereduseremail', document.getElementById('personelusernameemail').value);
		paramstr.append('basicsalary', document.getElementById('personelbasicsalary').value);
		paramstr.append('departmentid', document.getElementById('personeldepartment').value);
		paramstr.append('levelid', document.getElementById('personellevel').value);
		paramstr.append('groupid', document.getElementById('personelgroup').value);
		
		for(i=0; i<document.getElementsByClassName('allowancename').length; i++){
		    paramstr.append(`allowances${i}`,document.getElementsByClassName('allowancename')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('allowancepercent').length; i++){
		    paramstr.append(`amountpercentage${i}`,document.getElementsByClassName('allowancepercent')[i].value);
		}
		paramstr.append('allgridsize',document.getElementsByClassName('allowancename').length);
		
		for(i=0; i<document.getElementsByClassName('deductionname').length; i++){
		    paramstr.append(`deductions${i}`,document.getElementsByClassName('deductionname')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('deductionpecent').length; i++){
		    paramstr.append(`dedamountpercentage${i}`,document.getElementsByClassName('deductionpecent')[i].value);
		}
		paramstr.append('dedgridsize',document.getElementsByClassName('deductionname').length);
		
	    return paramstr;

	};
	
	const popperdept=(result)=>{
	    document.getElementById('personeldepartment').innerHTML += result.data.data.map(data=>{
	        return(`
	            <option value="${data.id}"> ${data.department.toUpperCase()} </option>
	        `)
	    }).join("")
	}
	const poppergroup=(result)=>{
	    document.getElementById('personelgroup').innerHTML += result.data.data.map(data=>{
	        return(`
	            <option value="${data.id}"> ${data.groupname.toUpperCase()} </option>
	        `)
	    }).join("")
	}
	const popperlevel=(result)=>{
	    document.getElementById('personellevel').innerHTML += result.data.data.map(data=>{
	        return(`
	            <option value="${data.id}"> ${data.level.toUpperCase()} </option>
	        `)
	    }).join("")
	}
	const popperemail=(result)=>{
	    document.getElementById('personelallemail').innerHTML = result.data.map(data=>{
	        return(`
	            <option value="${data.email}"> ${data.lastname.toUpperCase()} ${data.firstname.toUpperCase()} </option>
	        `)
	    }).join("")
	}
	
// const personnelgetallid =()=>{
//         document.getElementsByClassName('pervfy');
//         let idss = []
//         for(i=0; i<document.getElementsByClassName('pervfy').length; i++){
//             idss.push(document.getElementsByClassName('pervfy')[i].id)
//         }
//         console.log(idss)
//         return idss
//     }

	function onOreProfileFileInputChange(event) {

    let previewEl = document.querySelector('.file-area');
    if(previewEl) previewEl.innerHTML = '';
    
    let selectedFiles = input.files;

    if (!profileFileTypeValidator(selectedFiles)) {
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
                img.style.cssText = 'width:220px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `promotion-file-${i}`)
                previewEl.appendChild(img);
                img.src = URL.createObjectURL(event.files[i]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
            }
        }

    }
}

    async function openPersonnel () {
        await  httpRequest('personnel.php');
        // document.getElementById('orecountry').innerHTML = getorevacountry().map(data=>console.log(data.data));
        showSpinner();
        getorevacountry();
        hideSpinner();
         let pFiles = document.querySelector('#document')
        let fileselect = document.querySelector('.file-action')[0]
        if(fileselect) input = fileselect.querySelector('input[id="document"]')
        
        if(fileselect) fileselect.addEventListener('click', () =>{ if(input) input.click()})
        if(input) input.addEventListener('change', (e) => onOreProfileFileInputChange(e.target))
        	if(document.getElementById('personneladdallowance')){
	    document.getElementById('personneladdallowance').addEventListener('click', e=>{
	        let eleh = document.createElement('div');deposits
        eleh.setAttribute('name', 'allowancepersonnelcontainer');
        let x = `
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <input class="jformcontrol jmargin-top pervfy allowancename" type="text" id="${Date.now()}allowanceamount" placeholder="Allowance name" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <input class="jformcontrol jmargin-top pervfy allowancepercent" type="number" id="${Date.now()}allowpercent" placeholder="Percentage %" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <div id="" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                        </div>
                    </div>
                `
        let elem = eleh.innerHTML = x;        
        document.getElementById('allowancepersonnelcontainer').append(eleh);
        	    }, true)
        	}
        	if(document.getElementById('personneladddeductions')){
	    document.getElementById('personneladddeductions').addEventListener('click', e=>{
	        let eleh = document.createElement('div');
        eleh.setAttribute('name', 'allowancepersonnelcontainer');
        let x = `
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <input class="jformcontrol jmargin-top pervfy deductionname" type="text" id="${Date.now()}deductamount" placeholder="Deductions name" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <input class="jformcontrol jmargin-top pervfy deductionpecent" type="number" id="${Date.now()}deductpercent" placeholder="Percentage %" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <div id="" class="oreadddebit oreremove mt" style="margin-left: 0px" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                        </div>
                    </div>
                `
        let elem = eleh.innerHTML = x;        
        document.getElementById('deductionspersonnelcontainer').append(eleh);
        	    }, true)
        	}
        callController('fetchdepartment.php', null, 'fetchdepartment', null,  popperdept, 'silent')
        callController('fetchgroupname.php', null, 'fetchgroupname', null,  poppergroup, 'silent')
        callController('fetchlevel.php', null, 'fetchlevel', null,  popperlevel, 'silent')
        callController('fetchallusers.php', null, 'fetchallusers', null,  popperemail, 'silent')
        if(document.getElementById('personelsubmit'))document.getElementById('personelsubmit').addEventListener('click',e=>{
                const submitresult=(result)=>{
                    if(result){
                        for(i=0; i<document.getElementsByClassName('pervfy').length; i++){
                            document.getElementsByClassName('pervfy')[i].value = '';
                        }
                    }
                }
            if(document.getElementById('personelsubmit').textContent == 'Submit'){
                callController('personnelscript.php', personnelparamsdata(), 'personnelscript', getallid('pervfy'), submitresult );
            }
            if(document.getElementById('personelsubmit').textContent == 'Update'){
                callController('personnelscript.php', personnelparamsdataupdate(), 'personnelscript', getallid('pervfy'), submitresult );
                document.getElementById('viewpersonnel').click()
                // for(i=0; i<document.getElementsByClassName('pervfy').length; i++){
                //     // document.getElementsByClassName('pervfy')[i].value = '';
                // }
            }
                
                document.getElementById('personelsubmit').textContent = 'Submit';
        },false);
        if(sessionStorage.getItem('viewpersonneleditfunct')){
            let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonneleditfunct'));
            console.log(personnelsessiondata[0]);
            document.getElementById('id').value = personnelsessiondata[0].personnel.id ? personnelsessiondata[0].personnel.id : '';
            document.getElementById('personelmaritalstatus').value = personnelsessiondata[0].personnel.maritalstatus ? personnelsessiondata[0].personnel.maritalstatus : '';
		    document.getElementById('personelgender').value = personnelsessiondata[0].personnel.gender ? personnelsessiondata[0].personnel.gender : '';
		    document.getElementById('personeldeformity').value = personnelsessiondata[0].personnel.deformity ? personnelsessiondata[0].personnel.deformity : '';
		    document.getElementById('personeleyeglasses').value = personnelsessiondata[0].personnel.eyeglasses ? personnelsessiondata[0].personnel.eyeglasses : '';
		    document.getElementById('personelfirstname').value = personnelsessiondata[0].personnel.firstname ? personnelsessiondata[0].personnel.firstname : '';
		    document.getElementById('personelotherdeformity').value = personnelsessiondata[0].personnel.hearingaid !== '-' ? personnelsessiondata[0].personnel.hearingaid : 0;
		    document.getElementById('personellastname').value = personnelsessiondata[0].personnel.lastname ? personnelsessiondata[0].personnel.lastname : '';
		    document.getElementById('personelothernames').value = personnelsessiondata[0].personnel.othernames ? personnelsessiondata[0].personnel.othernames : '';
		    document.getElementById('personelphonenumber').value = personnelsessiondata[0].personnel.phonenumber ? personnelsessiondata[0].personnel.phonenumber : '';
		    document.getElementById('personelworkstatus').value = personnelsessiondata[0].personnel.workstatus ? personnelsessiondata[0].personnel.workstatus : '';
		    document.getElementById('personelresidentialaddress').value = personnelsessiondata[0].personnel.residentialaddress ? personnelsessiondata[0].personnel.residentialaddress : '';
		    document.getElementById('personelpermanenthome').value = personnelsessiondata[0].personnel.permanenthomeaddress ? personnelsessiondata[0].personnel.permanenthomeaddress : '';
		    document.getElementById('personelbirthdate').value = personnelsessiondata[0].personnel.birthdate ? personnelsessiondata[0].personnel.birthdate : '';
		    document.getElementById('personelstate').value = personnelsessiondata[0].personnel.state ? personnelsessiondata[0].personnel.state : '';
		    document.getElementById('personellga').value = personnelsessiondata[0].personnel.lga ? personnelsessiondata[0].personnel.lga : '';
		    document.getElementById('personelheight').value = personnelsessiondata[0].personnel.height ? personnelsessiondata[0].personnel.height : '';
		    document.getElementById('personelweight').value = personnelsessiondata[0].personnel.weight ? personnelsessiondata[0].personnel.weight : '';
		    document.getElementById('personnelbankname1').value = personnelsessiondata[0].personnel.bankname1 ? personnelsessiondata[0].personnel.bankname1 : '';
		    document.getElementById('personnelaccountnumber1').value = personnelsessiondata[0].personnel.bankaccountnumber1 ? personnelsessiondata[0].personnel.bankaccountnumber1 : '';
		    document.getElementById('personnelbankname2').value = personnelsessiondata[0].personnel.bankname2 ? personnelsessiondata[0].personnel.bankname2 : '';
		    document.getElementById('personnelaccountnumber2').value = personnelsessiondata[0].personnel.bankaccountnumber2 ? personnelsessiondata[0].personnel.bankaccountnumber2 : '';
		    document.getElementById('personelemplymentdate').value = personnelsessiondata[0].personnel.employmentdate ? personnelsessiondata[0].personnel.employmentdate : '';
		    document.getElementById('personelusernameemail').value = personnelsessiondata[0].personnel.user ? personnelsessiondata[0].personnel.user : '';
		    document.getElementById('personelbasicsalary').value = personnelsessiondata[0].personnel.basicsalary ? personnelsessiondata[0].personnel.basicsalary : '';
		    document.getElementById('personnelh2gaccountnumber').value = personnelsessiondata[0].personnel.accountnumber ? personnelsessiondata[0].personnel.accountnumber : '';
		    setTimeout(()=>{
    		    document.getElementById('personelgroup').value = personnelsessiondata[0].personnel.groupid ? personnelsessiondata[0].personnel.groupid : '';
    		    document.getElementById('personellevel').value = personnelsessiondata[0].personnel.levelid ? personnelsessiondata[0].personnel.levelid : '';
    		    document.getElementById('personnelnationalityy').value = personnelsessiondata[0].personnel.nationality ? personnelsessiondata[0].personnel.nationality : '';
    		    document.getElementById('personeldepartment').value = personnelsessiondata[0].personnel.departmentid;
		    },1500);
		    document.getElementById('allowancepersonnelcontainer').innerHTML =  personnelsessiondata[0].salarystructure.filter(data=>data.salaryinfotype == "ALLOWANCE").map((dat, index)=>{
		        if(dat.salaryinfotype == 'ALLOWANCE'){
		            if(index == 0){
		                    document.getElementById('allowancename0').value = dat.salaryinfo;
		                    document.getElementById('allowancepercent0').value = dat.amountpercentage;
		            }else{
		                return(`
		                        <div name="allowancepersonnelcontainer">
                                    <div class="jformgroup jformgroup form_row">
                                        <div class="jformgroup jformgroupcol">
                                            <input value="${dat.salaryinfo}" class="jformcontrol jmargin-top pervfy allowancename" type="text" id="${Date.now()+index}allowanceamount" placeholder="Allowance name" required>
                                        </div>
                                        <div class="jformgroup jformgroupcol jmargin-left">
                                            <input value="${dat.amountpercentage}" class="jformcontrol jmargin-top pervfy allowancepercent" type="number" id="${Date.now()+index}allowpercent" placeholder="Percentage %" required>
                                        </div>
                                        <div class="jformgroup jformgroupcol jmargin-left">
                                            <div id="" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                                        </div>
                                    </div>
                                </div> 
	                        `) 
		            }
		        }
		    }).join('');
		    document.getElementById('deductionspersonnelcontainer').innerHTML =  personnelsessiondata[0].salarystructure.filter(data=>data.salaryinfotype == "DEDUCTION").map((dat, index)=>{
		        if(dat.salaryinfotype == "DEDUCTION"){
		            if(index == 0){
		                document.getElementById('deductionname0').value = dat.salaryinfo;
		                document.getElementById('deductionpecent0').value = dat.amountpercentage;
		            }else{
		                return(`
		                        <div name="deductionpersonnelcontainer">
                                    <div class="jformgroup jformgroup form_row">
                                        <div class="jformgroup jformgroupcol">
                                            <input value="${dat.salaryinfo}" class="jformcontrol jmargin-top pervfy deductionname" type="text" id="${Date.now()+index}deductamount" placeholder="Deductions name" required>
                                        </div>
                                        <div class="jformgroup jformgroupcol jmargin-left">
                                            <input value="${dat.amountpercentage}" class="jformcontrol jmargin-top pervfy deductionpecent" type="number" id="${Date.now()+index}deductpercent" placeholder="Percentage %" required>
                                        </div>
                                        <div class="jformgroup jformgroupcol jmargin-left">
                                            <div id="" class="oreadddebit oreremove mt" style="margin-left: 0px" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                                        </div>
                                    </div>
                                </div>
	                        `)
		            }
		        }
		    }).join('');
		    sessionStorage.removeItem('viewpersonneleditfunct');
		    document.getElementById('personelsubmit').textContent = 'Update';
        }
        
    
    
    }
    
    
    
    var personnelbtn = document.getElementById('personnel')
    if(personnelbtn) personnelbtn.addEventListener('click', e=>openPersonnel())