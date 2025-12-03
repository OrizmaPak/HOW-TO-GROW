var departmentorehistory_datasource = [];
let departtmenttid

const popdeptablewithdata=(result)=>{
    departmentorehistory_datasource = [];
    if(!result.data)return callModal(`${result.message}`)
    departmentorehistory_datasource = result.data;
    console.log('departmentorehistory_datasource', departmentorehistory_datasource)
    // initPagination(departmentorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('departmenttabledata').innerHTML = departmentorehistory_datasource.map((dat, index)=>{
        return(`<tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ dat.department } </td>
                    <td class="btncolumn">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editDepartment('${dat.id}','${dat.department}')">Edit</span>
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deleteDepartment('${dat.id}')">Delete</span>
                    </td>
                </tr>`)
    }).join('')
    }
    
    const editDepartment =(id, val)=>{
        if(document.getElementById('matdepartment'))document.getElementById('matdepartment').value = val;
        departtmenttid = id
    }
    
const refreshdeptmt =(result='')=>{
callController('fetchdepartment.php', null, 'fetchdepartment', [], popdeptablewithdata)
}
    const deleteDepartment=(id)=>{
        function ddparams(){
            let params = new FormData();
            params.append('id', id)
            return params
        }
        callController('removedepartment.php', ddparams(), 'removedepartment', [], refreshdeptmt)
    }


async function openDepartment(){
await httpRequest('department.php')
departtmenttid = ''
refreshdeptmt()

if(document.getElementById('matdepartmentsubmitbtn'))document.getElementById('matdepartmentsubmitbtn').addEventListener('click', e=>{
    function departparams(){
        let params = new FormData();
        if(departtmenttid)params.append('id', departtmenttid)
        departtmenttid = ''
        params.append('department', document.getElementById('matdepartment').value)
        return params
    }
    callController('department.php', departparams(), 'department', ['matdepartment'], refreshdeptmt)
})
}

var department = document.getElementById('department')
if(department) department.addEventListener('click',openDepartment,false)
    
    // if(document.getElementById('matdepartmentsubmitbtn'))document.getElementById('matdepartmentsubmitbtn')
    


var levelorehistory_datasource = [];
let levelnnmenttid

const poplevelablewithdata=(result)=>{
    levelorehistory_datasource = [];
    if(!result.data)return callModal(`${result.message}`) 
    levelorehistory_datasource = result.data;
    console.log('levelorehistory_datasource', levelorehistory_datasource)
    // initPagination(levelorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('leveltabledata').innerHTML = levelorehistory_datasource.map((dat, index)=>{
        return(`<tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ dat.level.level } </td>
                    <td> ${naira}${formatCurrency(dat.level.basicsalary)} </td>
                    <td> ${ dat.salarystructure.filter(data=>data.salaryinfotype == 'ALLOWANCE').length } </td>
                    <td> ${ dat.salarystructure.filter(data=>data.salaryinfotype == 'DEDUCTION').length } </td>
                    <td class="btncolumn">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editlevel('${dat.level.id}')">Edit</span>
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deletelevel('${dat.level}')">Delete</span>
                    </td>
                </tr>`)
    }).join('')
    }
    
    const editlevel =(id)=>{
        let datafiltered = levelorehistory_datasource.filter(data=>data.level.id == id)[0]
        if(document.getElementById('matlevel'))document.getElementById('matlevel').value = datafiltered.level.level;
        if(document.getElementById('matlevellocationbasicsalary'))document.getElementById('matlevellocationbasicsalary').value = Number(datafiltered.level.basicsalary);
        levelnnmenttid = datafiltered.level.id
        document.getElementById('allowancepersonnelcontainer').innerHTML =  datafiltered.salarystructure.filter(data=>data.salaryinfotype == "ALLOWANCE").map((dat, index)=>{
		        if(dat.salaryinfotype == 'ALLOWANCE'){
		            if(index == 0){
		                    document.getElementById('allowancename0').value = dat.salaryinfo;
		                    document.getElementById('allowancepercent0').value = dat.amountpercentage;
		            }else{
		                return(`
		                        <div name="allowancepersonnelcontainer" class="removethisrow">
                                    <div class="jformgroup jformgroup form_row">
                                        <div class="jformgroup jformgroupcol">
                                            <input value="${dat.salaryinfo}" class="jformcontrol jmargin-top pervfy allowancename" type="text" id="${Date.now()+index}allowanceamount" placeholder="Allowance name" required>
                                        </div>
                                        <div class="jformgroup jformgroupcol jmargin-left">
                                            <input value="${dat.amountpercentage}" class="jformcontrol jmargin-top pervfy allowancepercent" type="number" id="${Date.now()+index}allowpercent" placeholder="Percentage %" required>
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
		document.getElementById('deductionspersonnelcontainer').innerHTML =  datafiltered.salarystructure.filter(data=>data.salaryinfotype == "DEDUCTION").map((dat, index)=>{
		        if(dat.salaryinfotype == "DEDUCTION"){
		            if(index == 0){
		                document.getElementById('deductionname0').value = dat.salaryinfo;
		                document.getElementById('deductionpecent0').value = dat.amountpercentage;
		            }else{
		                return(`
		                        <div name="deductionpersonnelcontainer" class="removethisrow">
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
    }
     
const refreshlevelmt =(result='')=>{
     document.getElementById('matlevel').value = ''
        document.getElementById('matlevellocationbasicsalary').value = ''  
        document.getElementById('levelform').reset()
        for(let i=0;i<document.getElementsByClassName('removethisrow').length;i++){
            document.getElementsByClassName('removethisrow')[i].remove()
        }
        levelnnmenttid = ''
    callController('fetchlevel.php', null, 'fetchlevel', [], poplevelablewithdata)
} 
    const deletelevel=(id)=>{ 
        function ddparams(){  
            let params = new FormData()
            params.append('id', id) 
            return params
        }
        callController('removelevel.php', ddparams(), 'removelevel', [], refreshlevelmt)
    } 
 
 
async function openlevel(){
await httpRequest('level.php') 
levelnnmenttid = ''
refreshlevelmt()
/*if(document.getElementById('matlevellocation'))document.getElementById('matlevellocation').innerHTML = `<option value="" selected disabled>Select Location</option>`
    if(document.getElementById('matlevellocation'))document.getElementById('matlevellocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');*/
if(document.getElementById('matlevelsubmitbtn'))document.getElementById('matlevelsubmitbtn').addEventListener('click', e=>{
    e.preventDefault()
/*function action(result){
    document.getElementById('matlevel').value = ''
    document.getElementById('matlevellocationbasicsalary').value = ''
    callController('fetchlevel.php', null, 'fetchlevel', [], poplevelablewithdata)
}*/
    function departparams(){
        let paramstr = new FormData();
        if(levelnnmenttid)paramstr.append('id', levelnnmenttid)
        paramstr.append('level', document.getElementById('matlevel').value)
        paramstr.append('basicsalary', document.getElementById('matlevellocationbasicsalary').value)
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
		paramstr.append('dedgridsize',document.getElementsByClassName('deductionname').length)
        return paramstr
    }
    callController('level.php', departparams(), 'level', getallid('comp'), refreshlevelmt)
})

	if(document.getElementById('personneladdallowance')){
	    document.getElementById('personneladdallowance').addEventListener('click', e=>{
	        let eleh = document.createElement('div');deposits
        eleh.setAttribute('name', 'allowancepersonnelcontainer');
        eleh.setAttribute('class', 'removethisrow');
        let x = `
                    <div class="jformgroup jformgroup form_row removethisrow">
                        <div class="jformgroup jformgroupcol">
                            <input class="jformcontrol jmargin-top pervfy allowancename" type="text" id="${Date.now()}allowanceamount" placeholder="Allowance name" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <input class="jformcontrol jmargin-top pervfy allowancepercent" type="number" id="${Date.now()}allowpercent" placeholder="Percentage %" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <div id="" class="oreadddebit oreremove mt " style="margin-left: 0px" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
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
        eleh.setAttribute('class', 'removethisrow');
        let x = `
                    <div class="jformgroup jformgroup form_row ">
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
}

var level = document.getElementById('level')
if(level) level.addEventListener('click',openlevel,false)
    
    // if(document.getElementById('matlevelsubmitbtn'))document.getElementById('matlevelsubmitbtn')
    


var groupnameorehistory_datasource = [];
let groupnnmenttid

const popgroupablewithdata=(result)=>{
    groupnameorehistory_datasource = [];
    if(!result.data.data)return callModal(`${result.message}`)
    groupnameorehistory_datasource = result.data.data;
    console.log('groupnameorehistory_datasource', groupnameorehistory_datasource)
    // initPagination(groupnameorehistory_datasource, stockledgerorehistorysetCurrentPage);
    document.getElementById('groupnametabledata').innerHTML = groupnameorehistory_datasource.map((dat, index)=>{
        return(`<tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ dat.groupname } </td>
                    <td> ${getLocationById(dat.location)} </td>
                    <td class="btncolumn">
                        <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editgroupname('${dat.id}','${dat.groupname}')">Edit</span>
                        <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deletegroupname('${dat.id}')">Delete</span>
                    </td>
                </tr>`)
    }).join('')
    }
    
    const editgroupname =(id, val)=>{
        if(document.getElementById('matgroupname'))document.getElementById('matgroupname').value = val;
        groupnnmenttid = id
    }
     
const refreshgroupmt =(result='')=>{
     document.getElementById('matgroupname').value = ''
        document.getElementById('matgrouplocation').value = ''
callController('fetchgroupname.php', null, 'fetchgroupname', [], popgroupablewithdata)
} 
    const deletegroupname=(id)=>{ 
        function ddparams(){  
            let params = new FormData()
            params.append('id', id) 
            return params
        }
        callController('removegroup.php', ddparams(), 'removegroup', [], refreshgroupmt)
    } 
 
 
async function opengroupname(){
await httpRequest('groupname.php') 
groupnnmenttid = ''
refreshgroupmt()
if(document.getElementById('matgrouplocation'))document.getElementById('matgrouplocation').innerHTML = `<option value="" selected disabled>Select Location</option>`
    if(document.getElementById('matgrouplocation'))document.getElementById('matgrouplocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');

if(document.getElementById('matgroupnamesubmitbtn'))document.getElementById('matgroupnamesubmitbtn').addEventListener('click', e=>{
    function departparams(){
        let params = new FormData();
        if(groupnnmenttid)params.append('id', groupnnmenttid)
        groupnnmenttid = ''
        params.append('groupname', document.getElementById('matgroupname').value)
        params.append('location', document.getElementById('matgrouplocation').value)
        return params
    }
    callController('groupname.php', departparams(), 'groupname', ['matgroupname', 'matgrouplocation'], refreshgroupmt)
})
}

var groupname = document.getElementById('groupname')
if(groupname) groupname.addEventListener('click',opengroupname,false)
    
    // if(document.getElementById('matgroupnamesubmitbtn'))document.getElementById('matgroupnamesubmitbtn')
    

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
        }else if(state.value.toLowerCase() == 'rivers state'){
            showSpinner();
            getorevacountry(document.getElementById("personnelnationalityy").value, 'Rivers State');
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
        if(statee == 'Rivers State'){
            let harddata = [
      "Port Harcourt",
      "Obio-Akpor",
      "Okrika",
      "Ogu–Bolo",
      "Eleme",
      "Tai",
      "Gokana",
      "Khana",
      "Oyigbo",
      "Opobo–Nkoro",
      "Andoni",
      "Bonny",
      "Degema",
      "Asari-Toru",
      "Akuku-Toru",
      "Abua–Odual",
      "Ahoada West",
      "Ahoada East",
      "Ogba–Egbema–Ndoni",
      "Emohua",
      "Ikwerre",
      "Etche",
      "Omuma"
    ]
            document.getElementById('orelga').innerHTML = harddata.map(data=>{
                reallga.push(data)
                return(`<option value="${data}">`)
            }).join('');
            return
        }
        if(countryy == 'Nigeria'){
            let harderdata = [
    {
        "name": "Abia State",
        "state_code": "AB"
    },
    {
        "name": "Adamawa State",
        "state_code": "AD"
    },
    {
        "name": "Akwa Ibom State",
        "state_code": "AK"
    },
    {
        "name": "Anambra State",
        "state_code": "AN"
    },
    {
        "name": "Bauchi State",
        "state_code": "BA"
    },
    {
        "name": "Bayelsa State",
        "state_code": "BY"
    },
    {
        "name": "Benue State",
        "state_code": "BE"
    },
    {
        "name": "Borno State",
        "state_code": "BO"
    },
    {
        "name": "Cross River State",
        "state_code": "CR"
    },
    {
        "name": "Delta State",
        "state_code": "DE"
    },
    {
        "name": "Ebonyi State",
        "state_code": "EB"
    },
    {
        "name": "Edo State",
        "state_code": "ED"
    },
    {
        "name": "Ekiti State",
        "state_code": "EK"
    },
    {
        "name": "Enugu State",
        "state_code": "EN"
    },
    {
        "name": "Federal Capital Territory",
        "state_code": "FC"
    },
    {
        "name": "Gombe State",
        "state_code": "GO"
    },
    {
        "name": "Imo State",
        "state_code": "IM"
    },
    {
        "name": "Jigawa State",
        "state_code": "JI"
    },
    {
        "name": "Kaduna State",
        "state_code": "KD"
    },
    {
        "name": "Kano State",
        "state_code": "KN"
    },
    {
        "name": "Katsina State",
        "state_code": "KT"
    },
    {
        "name": "Kebbi State",
        "state_code": "KE"
    },
    {
        "name": "Kogi State",
        "state_code": "KO"
    },
    {
        "name": "Kwara State",
        "state_code": "KW"
    },
    {
        "name": "Lagos State",
        "state_code": "LA"
    },
    {
        "name": "Nasarawa State",
        "state_code": "NA"
    },
    {
        "name": "Niger State",
        "state_code": "NI"
    },
    {
        "name": "Ogun State",
        "state_code": "OG"
    },
    {
        "name": "Ondo State",
        "state_code": "ON"
    },
    {
        "name": "Osun State",
        "state_code": "OS"
    },
    {
        "name": "Oyo State",
        "state_code": "OY"
    },
    {
        "name": "Plateau State",
        "state_code": "PL"
    },
    {
        "name": "Rivers State",
        "state_code": "RI"
    },
    {
        "name": "Sokoto State",
        "state_code": "SO"
    },
    {
        "name": "Taraba State",
        "state_code": "TA"
    },
    {
        "name": "Yobe State",
        "state_code": "YO"
    },
    {
        "name": "Zamfara State",
        "state_code": "ZA"
    }
]
             document.getElementById('orestate').innerHTML = harderdata.map(data=>{
                realstates.push(data.name)
                return(`<option value="${data.name}">`)
            }).join('');
            return
        }
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
		/*paramstr.append('basicsalary', document.getElementById('personelbasicsalary').value);*/
		paramstr.append('departmentid', document.getElementById('personeldepartment').value);
		paramstr.append('levelid', document.getElementById('personellevel').value);
		paramstr.append('groupid', document.getElementById('personelgroup').value);
		   try{
	 paramstr.append('photofilename', document.getElementById('document').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('document').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
		
		/*for(i=0; i<document.getElementsByClassName('allowancename').length; i++){
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
		paramstr.append('dedgridsize',document.getElementsByClassName('deductionname').length)*/;
		
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
		/*paramstr.append('basicsalary', document.getElementById('personelbasicsalary').value);*/
		paramstr.append('departmentid', document.getElementById('personeldepartment').value);
		paramstr.append('levelid', document.getElementById('personellevel').value);
		paramstr.append('groupid', document.getElementById('personelgroup').value);
		   try{
            	 paramstr.append('photofilename', document.getElementById('document').files[0].name);		
            	 paramstr.append('userphotoname',document.getElementById('document').files[0]);
            // 	 for(i=0; i<document.getElementById('guarantorpreview').children.length; i++){
            //     	 paramstr.append('photofilename'+i, document.getElementById('guarantorpreview').children[i].src);		
            //     	 paramstr.append('userphotoname'+i, document.getElementById('guarantorpreview').children[i].files[0]);
            // 	 }
            }catch(ex){
            	 paramstr.append('photofilename','-');		
            	 paramstr.append('userphotoname','-');
           }
		
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
	    document.getElementById('personeldepartment').innerHTML += result.data.map(data=>{
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
	    document.getElementById('personellevel').innerHTML += result.data.map(data=>{
	        return(`
	            <option value="${data.level.id}"> ${data.level.level.toUpperCase()} </option>
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

	
    async function openPersonnel () {
        await  httpRequest('personnel.php');
        // document.getElementById('orecountry').innerHTML = getorevacountry().map(data=>console.log(data.data));
        showSpinner();
        getorevacountry();
        hideSpinner();
        let input
        let fileselect = document.querySelector('.file-action')
        if(fileselect) input = fileselect.querySelector('input[id="document"]')
        
        if(fileselect) fileselect.addEventListener('click', () =>{ if(input) input.click()})
        if(input) input.addEventListener('change', (e) => onOreProfileFileInputChange(e.target))
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
        /*	if(document.getElementById('personneladdallowance')){
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
        	}*/
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
		    document.getElementById('personelusernameemail').value = personnelsessiondata[0].personnel.registereduseremail ? personnelsessiondata[0].personnel.registereduseremail : '';
		    document.getElementById('personelbasicsalary').value = personnelsessiondata[0].personnel.basicsalary ? personnelsessiondata[0].personnel.basicsalary : '';
		    document.getElementById('personnelh2gaccountnumber').value = personnelsessiondata[0].personnel.accountnumber ? personnelsessiondata[0].personnel.accountnumber : '';
		    setTimeout(()=>{
    		    document.getElementById('personelgroup').value = personnelsessiondata[0].personnel.groupid ? personnelsessiondata[0].personnel.groupid : '';
    		    document.getElementById('personellevel').value = personnelsessiondata[0].personnel.levelid ? personnelsessiondata[0].personnel.levelid : '';
    		    document.getElementById('personnelnationalityy').value = personnelsessiondata[0].personnel.nationality ? personnelsessiondata[0].personnel.nationality : '';
    		    document.getElementById('personeldepartment').value = personnelsessiondata[0].personnel.departmentid;
		    },1500);
		    /*
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
		    */
		    sessionStorage.removeItem('viewpersonneleditfunct');
		    document.getElementById('personelsubmit').textContent = 'Update';
        }
        
    
    
    }
    
    
    
    var personnelbtn = document.getElementById('personnel')
    if(personnelbtn) personnelbtn.addEventListener('click', e=>openPersonnel())
    
    
    
var approvepersonnelpersonnel_datasource = [];

const approvepersonnelpersonnelepaginate=(data)=>{
    approvepersonnelpersonnel_datasource = [];
    approvepersonnelpersonnel_datasource = datasource = data.data.filter(dat=>dat.personnel.status == 'NOT APPROVED');
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
	    document.getElementById('personelviewdepartment').innerHTML += result.data.map(data=>{
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
	    document.getElementById('personelviewlevel').innerHTML += result.data.map(data=>{
	        return(`
	            <option disabled value="${data.level.id}"> ${data.level.level.toUpperCase()} </option>
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


var viewpersonnel_datasource = [];
var viewpersonneldata = ''

const viewpersonelpaginate=(data)=>{
    document.getElementById('viewpersonneltabledata').innerHTML = ''
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
                                <td> ${dat.personnel.status} </td>
                                <td> ${data.personnel.levelname} </td> 
                                <td> ${formatCurrency(data.personnel.basicsalary)} </td> 
                                <td> ${dat.personnel.gender} </td>
                                <td> ${dat.personnel.nationality} </td>
                                <td> ${dat.personnel.state} </td>
                                <td> ${dat.personnel.lga} </td>
                                <td> <a href="https://htg.com.ng/howtogrow/images/personnel/${dat.personnel.imageurl}" target="_blank">${dat.personnel.imageurl}</a> </td>
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
		    document.getElementById('pvprofileimg').setAttribute('src', `https://htg.com.ng/howtogrow/images/personnel/${data[0].personnel.imageurl}`);
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
                                <td> ${index+1} </td>
                                <td> ${data.personnel.staffid} </td>
                                <td> ${data.personnel.firstname} </td>
                                <td> ${data.personnel.lastname} </td>
                                <td> ${data.personnel.department} </td> 
                                <td> ${data.personnel.status} </td> 
                                <td> ${data.personnel.levelname} </td> 
                                <td> ${formatCurrency(data.personnel.basicsalary)} </td> 
                                <td> ${data.personnel.gender} </td> 
                                <td> ${data.personnel.nationality} </td>
                                <td> ${data.personnel.state} </td>
                                <td> ${data.personnel.lga} </td>
                                <td> <a href="https://htg.com.ng/howtogrow/images/personnel/${data.personnel.imageurl}" target="_blank">${data.personnel.imageurl}</a> </td>
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
	    document.getElementById('personelviewdepartment').innerHTML += result.data.map(data=>{
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
        if(document.getElementById('collectionviewslocation'))document.getElementById('collectionviewslocation').innerHTML = `<option value="">--SELECT LOCATION--</option>`
        if(document.getElementById('collectionviewslocation'))document.getElementById('collectionviewslocation').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');
        console.log('resultOfLocations', resultOfLocations)
        if(document.getElementById('viewpersonnelmodalbtn'))document.getElementById('viewpersonnelmodalbtn').addEventListener('click', e=>viewpersonnelmodal('CLOSE'));
        if(document.getElementById('viewpersonnelmodalbtn2'))document.getElementById('viewpersonnelmodalbtn2').addEventListener('click', e=>viewpersonnelmodal('CLOSE'));
        jtabledata = document.getElementById('viewpersonneltabledata');
        // paginationLimit = 10;
        initializePaginationParams(viewpersonnelsetCurrentPage);
        function paramm(){
            let param = new FormData();
            param.append('location', document.getElementById('collectionviewslocation').value)
            param.append('staffstatus', document.getElementById('staffstatus').value)
            return param
        }
        if(document.getElementById('collectionviewslocation'))document.getElementById('collectionviewslocation').addEventListener('change',e=>callController('fetchpersonnels.php', paramm(), 'fetchpersonnels', null, viewpersonelpaginate))
        if(document.getElementById('staffstatus'))document.getElementById('staffstatus').addEventListener('change',e=>callController('fetchpersonnels.php', paramm(), 'fetchpersonnels', null, viewpersonelpaginate))
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


const guarantor_field = [
            `guarantor_personnel`,
            `guarantor_guarantorname`,
            `guarantor_occupation`,
            `guarantor_phonenumber`,
            `guarantor_address`,
            `guarantor_officeaddress `,
            `guarantor_years`,
            ]

const guarantorfiles = []
            
let guapersonnelid = [];
let guapersonnel = [];
let guapersonnelvalue = '';
const checkguapersonnel =(state)=>{
        console.log('detected', state);
        if(guapersonnel.includes(`${state.value}`)){
            guapersonnelvalue = guapersonnelid[guapersonnel.indexOf(`${state.value}`)];
            console.log('guapersonnelvalue', guapersonnelvalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
const checkguapersonnelid =(state)=>{
        console.log('detected', state)
        if(guapersonnelid.includes(`${state}`)){
            return guapersonnel[guapersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const popguadlis =(result)=>{
   if(document.getElementById('guarantorpersonnelnames'))document.getElementById('guarantorpersonnelnames').innerHTML = result.data.map(data=>{
       guapersonnelid.push(data.personnel.staffid);
       guapersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var guarantorpersonnel_datasource = [];

const guarantorpersonnelepaginate=(data)=>{
    guarantorpersonnel_datasource = [];
    guarantorpersonnel_datasource = data.data;
    initPagination(guarantorpersonnel_datasource, guarantorpersonnelsetCurrentPage);
    }


var guarantorpersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(guarantorpersonnel_datasource.length) {
        guarantorpersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendguarantorpersonnelTableRows(item, index)
            }
        })
        // if(document.guarantorSelector('#guarantorpersonneltablecontent tbody').innerHTML === '') oreguarantorbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("guarantorpersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const guarantorpopulate =(id)=>{
     let data = guarantorpersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('guarantor_personnel').value = checkguapersonnelid(data[0].staffid)
     document.getElementById('guarantor_guarantorname').value = data[0].guarantorname
     document.getElementById('guarantor_occupation').value = data[0].occupation
     document.getElementById('guarantor_phonenumber').value = data[0].phonenumber
     document.getElementById('guarantor_address').value = data[0].address
     document.getElementById('guarantor_officeaddress').value = data[0].officeaddress
     document.getElementById('guarantor_years').value = data[0].yearsknown
     document.getElementById('id').value = data[0].id
    document.getElementById('guarantorpreview').innerHTML = '';
     if(data[0].doc !== '-'){
     const img = document.createElement("img");
    img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
    img.setAttribute('id', `termination-file`)
    document.getElementById('guarantorpreview').appendChild(img);
    img.src = `../images/personnel/${data[0].doc}`; 
    img.onload = function() { URL.revokeObjectURL(img.src) }
     }
    document.getElementById('guarantor_submitbtn').textContent = 'Update';
     
}

const goguaback=()=>{
            callDialog()
            document.getElementById("guarantor").click();
        }
const guarantorperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const guarantordelete =(id, person, guarantor)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${guarantor.toUpperCase()} as a guarantor for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removeguarantor.php', guarantorperdeleteparams(${id}), 'removeguarantor', null, goguaback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }


function appendguarantorpersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("guarantorpersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checkguapersonnelid(data.staffid)} </td>
                                <td> ${data.guarantorname} </td>
                                <td> ${data.occupation} </td>
                                <td> ${data.phonenumber} </td>
                                <td> ${data.address} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="guarantorpopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="guarantordelete(${data.id}, '${checkguapersonnelid(data.staffid)}', '${data.guarantorname}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 





function guarantorFormData() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'GUARANTOR')
    paramstr.append('staffid', guapersonnelvalue)
    paramstr.append('guarantorname', document.getElementById('guarantor_guarantorname').value);
    paramstr.append('occupation', document.getElementById('guarantor_occupation').value);
    paramstr.append('phonenumber', document.getElementById('guarantor_phonenumber').value);
    paramstr.append('address', document.getElementById('guarantor_address').value);
    paramstr.append('officeaddress', document.getElementById('guarantor_officeaddress').value);
    paramstr.append('yearsknown', document.getElementById('guarantor_years').value);
        try{
	 paramstr.append('photofilename', document.getElementById('guarantor_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('guarantor_file').files[0]);
// 	 for(i=0; i<document.getElementById('guarantorpreview').children.length; i++){
//     	 paramstr.append('photofilename'+i, document.getElementById('guarantorpreview').children[i].src);		
//     	 paramstr.append('userphotoname'+i, document.getElementById('guarantorpreview').children[i].files[0]);
// 	 }

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function guarantorFormDataupdate() {
    
    let paramstr = new FormData();
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('personnelmatter', 'GUARANTOR')
    paramstr.append('staffid', guapersonnelvalue)
    paramstr.append('guarantorname', document.getElementById('guarantor_guarantorname').value);
    paramstr.append('occupation', document.getElementById('guarantor_occupation').value);
    paramstr.append('phonenumber', document.getElementById('guarantor_phonenumber').value);
    paramstr.append('address', document.getElementById('guarantor_address').value);
    paramstr.append('officeaddress', document.getElementById('guarantor_officeaddress').value);
    paramstr.append('yearsknown', document.getElementById('guarantor_years').value);
        try{ 
	 paramstr.append('photofilename', document.getElementById('guarantor_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('guarantor_file').files[0]);
// 	 for(i=0; i<document.getElementById('guarantorpreview').children.length; i++){
//     	 paramstr.append('photofilename'+i, document.getElementById('guarantorpreview').children[i].src);		
//     	 paramstr.append('userphotoname'+i, document.getElementById('guarantorpreview').children[i].files[0]);
// 	 }

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function guarantorFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'GUARANTOR')
   
    return paramstr
}

const rerunguarantor =()=>{
    clearAllInputs(guarantor_field);
    document.getElementById('guarantor_submitbtn').textContent = 'Submit';
    for(i=0;i<guarantor_field.length;i++){
        document.getElementById(`${guarantor_field[i]}`).value = '';
    }
    document.getElementById('guarantor').click();
}

const guarantorloadimg=(objfile)=>{ 
                // for(i=0;i<objfile.files.length;i++){
                //     const img = document.createElement("img");
                //     img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                //     img.setAttribute('id', `termination-file`)
                //     // img.setAttribute('onclick', `console.log(this,this.src, guarantorfiles, guarantorfiles.filter(dat=>dat!==this.src)`));
                //     document.getElementById('guarantorpreview').appendChild(img); 
                //     img.src = URL.createObjectURL(objfile.files[i]); 
                //     img.onload = function() { URL.revokeObjectURL(img.src) }
                //     guarantorfiles.push(objfile.files[i])
                //     console.log(document.getElementById('guarantorpreview'), document.getElementById('guarantorpreview').children[i].src);
                // }
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `termination-file`)
                document.getElementById('guarantorpreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function oreguarantor() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('guarantor.php', 'override')  
        
        jtabledata = document.getElementById('guarantorpersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popguadlis, 'silent');
        if(document.getElementById('guarantor_submitbtn'))document.getElementById('guarantor_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('guarantor_submitbtn').textContent == 'Submit'){
                callController('guarantorscript.php', guarantorFormData(), 'guarantorscript', guarantor_field, rerunguarantor,)
            }else{
                checkguapersonnel(document.getElementById('guarantor_personnel'))
                callController('guarantorscript.php', guarantorFormDataupdate(), 'guarantorscript', guarantor_field, rerunguarantor,)
            }
            
        },true);
        
        setTimeout(()=>{
            if(sessionStorage.getItem('viewpersonnelguarantorfunct')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonnelguarantorfunct'));
                console.log('personnelsessiondata', personnelsessiondata[0], personnelsessiondata)
                const guarantorparams=()=>{
                    var paramstr = new FormData();
                    
    		        if(personnelsessiondata[0].personnel.staffid)paramstr.append('staffid', personnelsessiondata[0].personnel.staffid);
            // 		paramstr.append('personnelmatter', 'guarantor');
            		return paramstr;
            		
            	    
            
            	};
                //  FOR guarantor TABLE SINGLE PERSONNEL
                callController('fetchguarantors.php', guarantorparams(), 'fetchguarantors', null, guarantorpersonnelepaginate, 'silent');
                document.getElementById('guarantor_personnel').value = checkguapersonnelid(personnelsessiondata[0].personnel.staffid);
                guapersonnelvalue = personnelsessiondata[0].personnel.staffid
                // document.getElementById('id').value = personnelsessiondata[0].personnel.id;
                document.getElementById('guarantor_personnel').setAttribute('readonly', true)
                document.getElementsByClassName('oremainheader')[0].innerHTML = `GUARANTOR <br><span style="color:green;text-transform:uppercase">[${checkguapersonnelid(personnelsessiondata[0].personnel.staffid)}]</span><input id="guarantorPPIDD" type="hidden" value="${guapersonnelvalue}"/>`;
                // document.getElementById('qualificationnname').value = personnelsessiondata[0].qualificationnname ? personnelsessiondata[0].qualificationnname : '';
                sessionStorage.removeItem('viewpersonnelguarantorfunct')
             }else{
                //  FOR guarantor TABLE ALL PERSONNEL
                // callController('fetchguarantors.php', guarantorFormDatatable(), 'fetchguarantors', null, guarantorpersonnelepaginate, 'silent');
                const guarantorparams=()=>{
                    var paramstr = new FormData();
                    
    		        if(document.getElementById('guarantorPPIDD'))paramstr.append('staffid', document.getElementById('guarantorPPIDD').value);
            // 		paramstr.append('personnelmatter', 'guarantor');
            		return paramstr;
            		
            	    
            
            	};
                callController('fetchguarantors.php', guarantorparams(), 'fetchguarantors', null, guarantorpersonnelepaginate, 'silent');
                if(document.getElementById('guarantorPPIDD')){
                    document.getElementById('guarantor_personnel').value = checkguapersonnelid(document.getElementById('guarantorPPIDD').value);
                    document.getElementById('guarantor_personnel').setAttribute('readonly', true)
                }else{
                    document.getElementById('guarantor_personnel').removeAttribute('readonly')  
                }
             }
        },1000)

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


var oreguarantorbbtn = document.getElementById("guarantor");
if (oreguarantorbbtn) oreguarantorbbtn.addEventListener("click", e=>oreguarantor(), false);


const employerrecord_field = [
            `employerrecord_personnel`,
            `employerrecord_employer`,
            `employerrecord_position`,
            `employerrecord_basic`,
            `employerrecord_yearsemployed`,
            `employerrecord_reasonforleaving`,
            ]
            
let emprpersonnelid = [];
let emprpersonnel = [];
let emprpersonnelvalue = ''
const checkemprpersonnel =(state)=>{
        console.log('detected', state)
        if(emprpersonnel.includes(`${state.value}`)){
            emprpersonnelvalue = emprpersonnelid[emprpersonnel.indexOf(`${state.value}`)];
            console.log('emprpersonnelvalue', emprpersonnelvalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
const checkemprpersonnelid =(state)=>{
        console.log('detected', state)
        if(emprpersonnelid.includes(`${state}`)){
            return emprpersonnel[emprpersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const popemprdlis =(result)=>{
   if(document.getElementById('employerrecordpersonnelnames'))document.getElementById('employerrecordpersonnelnames').innerHTML = result.data.map(data=>{
       emprpersonnelid.push(data.personnel.staffid);
       emprpersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var employerrecordpersonnel_datasource = [];

const employerrecordpersonnelepaginate=(data)=>{
    employerrecordpersonnel_datasource = [];
    employerrecordpersonnel_datasource = data.data;
    initPagination(employerrecordpersonnel_datasource, employerrecordpersonnelsetCurrentPage);
    }


var employerrecordpersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(employerrecordpersonnel_datasource.length) {
        employerrecordpersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendemployerrecordpersonnelTableRows(item, index)
            }
        })
        // if(document.employerrecordSelector('#employerrecordpersonneltablecontent tbody').innerHTML === '') oreemployerrecordbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("employerrecordpersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const employerrecordpopulate =(id)=>{
     let data = employerrecordpersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('id').value = data[0].id;
     document.getElementById('employerrecord_personnel').value = checkguapersonnelid(data[0].staffid);
     document.getElementById('employerrecord_employer').value = data[0].employer;
     document.getElementById('employerrecord_position').value = data[0].position;
     document.getElementById('employerrecord_basic').value = data[0].basic;
     document.getElementById('employerrecord_yearsemployed').value = data[0].yearsemployed;
     document.getElementById('employerrecord_reasonforleaving').value = data[0].reasonforleaving;
     document.getElementById('employerrecordpreview').innerHTML = '';
     if(data[0].doc !== '-'){
     const img = document.createElement("img");
    img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
    img.setAttribute('id', `termination-file`)
    document.getElementById('employerrecordpreview').appendChild(img);
    img.src = `../images/personnel/${data[0].doc}`; 
    img.onload = function() { URL.revokeObjectURL(img.src) }
     }
     document.getElementById('employerrecord_submitbtn').textContent = 'Update';
}

const goempreback=()=>{
            callDialog()
            document.getElementById("employerrecord").click();
        }
const employerrecordperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const employerrecorddelete =(id, person, employerrecord)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${employerrecord.toUpperCase()} as a former employer for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removeemploymentrecord.php', employerrecordperdeleteparams(${id}), 'removeemploymentrecord', null, goempreback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }


function appendemployerrecordpersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("employerrecordpersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checkemprpersonnelid(data.staffid)} </td>
                                <td> ${data.employer} </td>
                                <td> ${data.position} </td>
                                <td> ${data.basic} </td>
                                <td> ${data.yearsemployed} </td>
                                <td> ${data.reasonforleaving } </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="employerrecordpopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="employerrecorddelete(${data.id}, '${checkemprpersonnelid(data.staffid)}', '${data.employer}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 




function employerrecordFormData() {
    
    let paramstr = new FormData();
    // paramstr.append('personnelmatter', 'employerrecord')
    paramstr.append('staffid', emprpersonnelvalue)
    paramstr.append('employer', document.getElementById('employerrecord_employer').value);
    paramstr.append('position', document.getElementById('employerrecord_position').value);
    paramstr.append('basic', document.getElementById('employerrecord_basic').value);
    paramstr.append('yearsemployed', document.getElementById('employerrecord_yearsemployed').value);
    paramstr.append('reasonforleaving', document.getElementById('employerrecord_reasonforleaving').value);
        try{
	 paramstr.append('photofilename',document.getElementById('employerrecord_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('employerrecord_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function employerrecordFormDataupdate() {
    
    let paramstr = new FormData();
    // paramstr.append('personnelmatter', 'employerrecord')
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('staffid', emprpersonnelvalue)
    paramstr.append('employer', document.getElementById('employerrecord_employer').value);
    paramstr.append('position', document.getElementById('employerrecord_position').value);
    paramstr.append('basic', document.getElementById('employerrecord_basic').value);
    paramstr.append('yearsemployed', document.getElementById('employerrecord_yearsemployed').value);
    paramstr.append('reasonforleaving', document.getElementById('employerrecord_reasonforleaving').value);
        try{
	 paramstr.append('photofilename',document.getElementById('employerrecord_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('employerrecord_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function employerrecordFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'EMPLOYERRECORD')
   
    return paramstr
}

const rerunemployerrecord =()=>{
    clearAllInputs(employerrecord_field);
    document.getElementById('employerrecord_submitbtn').textContent = 'Submit';
    document.getElementById('employerrecord').click();
}

const employerrecordloadimg=(objfile)=>{ 
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `termination-file`)
                document.getElementById('employerrecordpreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function oreemployerrecord() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('employerrecord.php', 'override')  
        
        jtabledata = document.getElementById('employerrecordpersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popemprdlis, 'silent');
        if(document.getElementById('employerrecord_submitbtn'))document.getElementById('employerrecord_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('employerrecord_submitbtn').textContent == 'Submit'){
                callController('employmentrecordscript.php', employerrecordFormData(), 'employmentrecordscript', employerrecord_field, rerunemployerrecord);
            }else{
                checkemprpersonnel(document.getElementById('employerrecord_personnel'))
                callController('employmentrecordscript.php', employerrecordFormDataupdate(), 'employmentrecordscript', employerrecord_field, rerunemployerrecord);
            }
        },true);
        
        setTimeout(()=>{
            if(sessionStorage.getItem('viewpersonnelemployerrecordfunct')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonnelemployerrecordfunct'));
                console.log('personnelsessiondata', personnelsessiondata[0], personnelsessiondata)
                const employerrecordparams=()=>{
                    var paramstr = new FormData();
    		
            // 		paramstr.append('personnelmatter', 'employerrecord');
            		if(personnelsessiondata[0].personnel.staffid)paramstr.append('staffid', personnelsessiondata[0].personnel.staffid);
            		
            	    return paramstr;
            
            	};
                //  FOR employerrecord TABLE SINGLE PERSONNEL
                callController('fetchemploymentrecords.php', employerrecordparams(), 'fetchemploymentrecords', null, employerrecordpersonnelepaginate, 'silent');
                document.getElementById('employerrecord_personnel').value = checkemprpersonnelid(personnelsessiondata[0].personnel.staffid);
                emprpersonnelvalue = personnelsessiondata[0].personnel.staffid;
                document.getElementById('employerrecord_personnel').setAttribute('readonly', true)
                document.getElementsByClassName('oremainheader')[0].innerHTML = `EMPLOYMENT RECORD <br><span style="color:green;text-transform:uppercase">[${checkemprpersonnelid(emprpersonnelvalue)}]</span><input id="employerrecordPPIDD" type="hidden" value="${personnelsessiondata[0].personnel.staffid}"/>`;
                // document.getElementById('employerrecordnname').value = personnelsessiondata[0].employerrecordnname ? personnelsessiondata[0].employerrecordnname : '';
                sessionStorage.removeItem('viewpersonnelemployerrecordfunct')
             }else{
                //  FOR employerrecord TABLE ALL PERSONNEL
                const employerrecordparams=()=>{
                    var paramstr = new FormData();
                    
    		        if(document.getElementById('employerrecordPPIDD'))paramstr.append('staffid', document.getElementById('employerrecordPPIDD').value);
            // 		paramstr.append('personnelmatter', 'employerrecord');
            		return paramstr;
            		
            	     
            
            	};
                // callController('fetchpersonnelmatters.php', employerrecordFormDatatable(), 'fetchpersonnelmatters', null, employerrecordpersonnelepaginate, 'silent');
                callController('fetchemploymentrecords.php', employerrecordparams(), 'fetchemploymentrecords', null, employerrecordpersonnelepaginate, 'silent');
                if(document.getElementById('employerrecordPPIDD')){
                    document.getElementById('employerrecord_personnel').value = checkemprpersonnelid(document.getElementById('employerrecordPPIDD').value);
                    document.getElementById('employerrecord_personnel').setAttribute('readonly', true)
                }else{
                    document.getElementById('employerrecord_personnel').removeAttribute('readonly')  
                }
             }
        },1000)

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


var oreemployerrecordbbtn = document.getElementById("employerrecord");
if (oreemployerrecordbbtn) oreemployerrecordbbtn.addEventListener("click", e=>oreemployerrecord(), false);



const qualification_field = [
            `qualification_personnel`,
            `qualification_institution`,
            `qualification_qualification`,
            `qualification_certificationdate`,
            ]
            
let qualipersonnelid = [];
let qualipersonnel = [];
let qualipersonnelvalue = ''
const checkqualipersonnel =(state)=>{
        console.log('detected', state)
        if(qualipersonnel.includes(`${state.value}`)){
            qualipersonnelvalue = qualipersonnelid[qualipersonnel.indexOf(`${state.value}`)];
            console.log('qualipersonnelvalue', qualipersonnelvalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
const checkqualipersonnelid =(state)=>{
        console.log('detected', state)
        if(qualipersonnelid.includes(`${state}`)){
            return qualipersonnel[qualipersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const popqualidlis =(result)=>{
   if(document.getElementById('qualificationpersonnelnames'))document.getElementById('qualificationpersonnelnames').innerHTML = result.data.map(data=>{
       qualipersonnelid.push(data.personnel.staffid);
       qualipersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var qualificationpersonnel_datasource = [];

const qualificationpersonnelepaginate=(data)=>{
    qualificationpersonnel_datasource = [];
    qualificationpersonnel_datasource = data.data;
    initPagination(qualificationpersonnel_datasource, qualificationpersonnelsetCurrentPage);
    }


var qualificationpersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(qualificationpersonnel_datasource.length) {
        qualificationpersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendqualificationpersonnelTableRows(item, index)
            }
        })
        // if(document.qualificationSelector('#qualificationpersonneltablecontent tbody').innerHTML === '') orequalificationbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("qualificationpersonneltablecontent").innerHTML=  renderNoTableData()
    }
}; 

const qualificationpopulate =(id)=>{
     let data = qualificationpersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('id').value = data[0].id;
     document.getElementById('qualification_personnel').value = checkqualipersonnelid(data[0].staffid);
     document.getElementById('qualification_institution').value = data[0].institution;
     document.getElementById('qualification_qualification').value = data[0].qualification;
     document.getElementById('qualification_certificationdate').value = data[0].certificationdate;
     document.getElementById('qualificationpreview').innerHTML = '';
     if(data[0].doc !== '-'){
     const img = document.createElement("img");
    img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
    img.setAttribute('id', `termination-file`)
    document.getElementById('qualificationpreview').appendChild(img);
    img.src = `../images/personnel/${data[0].doc}`; 
    img.onload = function() { URL.revokeObjectURL(img.src) }
     };
    document.getElementById('qualification_submitbtn').textContent = 'Update'
     checkqualipersonnel(document.getElementById('qualification_personnel'))
}

const goquaback=()=>{
            callDialog()
            document.getElementById("qualificationn").click();
        }
const qualificationperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const qualificationdelete =(id, person, qualification)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${qualification.toUpperCase()} as a qualification for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removequalification.php', qualificationperdeleteparams(${id}), 'removequalification', null, goquaback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }


function appendqualificationpersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("qualificationpersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checkqualipersonnelid(data.staffid)} </td>
                                <td> ${data.institution} </td>
                                <td> ${data.qualification} </td>
                                <td> ${data.certificationdate} </td>
                                <td> ${data.doc} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="qualificationpopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="qualificationdelete(${data.id}, '${checkqualipersonnelid(data.staffid)}', '${data.institution} ${data.qualification}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 




function qualificationFormData() {
    
    let paramstr = new FormData();
    // paramstr.append('personnelmatter', 'qualification')
    paramstr.append('staffid', qualipersonnelvalue)
    paramstr.append('institution', document.getElementById('qualification_institution').value);
    paramstr.append('qualification', document.getElementById('qualification_qualification').value);
    paramstr.append('certificationdate', document.getElementById('qualification_certificationdate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('qualification_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('qualification_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function qualificationFormDataupdate() {
    
    let paramstr = new FormData();
    // paramstr.append('personnelmatter', 'qualification')
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('staffid', qualipersonnelvalue)
    paramstr.append('institution', document.getElementById('qualification_institution').value);
    paramstr.append('qualification', document.getElementById('qualification_qualification').value);
    paramstr.append('certificationdate', document.getElementById('qualification_certificationdate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('qualification_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('qualification_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function qualificationFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'qualification')
   
    return paramstr
}

const rerunqualification =()=>{
    let qualiper = '';
    qualiper = document.getElementById("qualification_personnel").value
    document.getElementById("qualification_personnel").classList.add('exempt');
    clearAllInputs(qualification_field);
    document.getElementById("qualification_personnel").classList.remove('exempt');
    document.getElementById("qualificationn").click();
    document.getElementById("qualification_personnel").value = qualiper;
    document.getElementById('qualification_submitbtn').textContent == 'Submit'
}

const qualificationloadimg=(objfile)=>{ 
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `termination-file`)
                document.getElementById('qualificationpreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function orequalification() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('qualificationn.php', 'override')  
        
        jtabledata = document.getElementById('qualificationpersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popqualidlis, 'silent');
        if(document.getElementById('qualification_submitbtn'))document.getElementById('qualification_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('qualification_submitbtn').textContent == 'Submit'){
                callController('qualificationscript.php', qualificationFormData(), 'qualificationscript', qualification_field, rerunqualification,)
            }else{
                callController('qualificationscript.php', qualificationFormDataupdate(), 'qualificationscript', qualification_field, rerunqualification,)
            }
            
        },true);
        
        setTimeout(()=>{
            if(sessionStorage.getItem('viewpersonnelqualificationfunct')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonnelqualificationfunct'));
                console.log('personnelsessiondata', personnelsessiondata[0], personnelsessiondata)
                const qualificationparams=()=>{
                    var paramstr = new FormData();
    		
            // 		paramstr.append('personnelmatter', 'qualification');
            		if(personnelsessiondata[0].personnel.staffid)paramstr.append('staffid', personnelsessiondata[0].personnel.staffid);
            
            	    return paramstr;
            
            	};
                //  FOR qualification TABLE SINGLE PERSONNEL
                callController('fetchqualifications.php', qualificationparams(), 'fetchqualifications', null, qualificationpersonnelepaginate, 'silent');
                    document.getElementById('qualification_personnel').value = checkqualipersonnelid(personnelsessiondata[0].personnel.staffid);
                qualipersonnelvalue = personnelsessiondata[0].personnel.staffid;
                document.getElementById('qualification_personnel').setAttribute('readonly', true)
                    document.getElementsByClassName('oremainheader')[0].innerHTML = `QUALIFICATION <br><span style="color:green;text-transform:uppercase">[${checkqualipersonnelid(qualipersonnelvalue)}]</span><input id="qualificationPPIDD" type="hidden" value="${personnelsessiondata[0].personnel.staffid}"/>`;
                // document.getElementById('qualificationnname').value = personnelsessiondata[0].qualificationnname ? personnelsessiondata[0].qualificationnname : '';
                sessionStorage.removeItem('viewpersonnelqualificationfunct')
                document.getElementById('id').value = personnelsessiondata[0].personnel.id;
             }else{
                //  FOR qualification TABLE ALL PERSONNEL
                 const qualificationparams=()=>{
                    var paramstr = new FormData();
                    
    		        if(document.getElementById('qualificationPPIDD'))paramstr.append('staffid', document.getElementById('qualificationPPIDD').value);
            // 		paramstr.append('personnelmatter', 'qualification');
            		return paramstr;
            		
            	     
            
            	};
                // callController('fetchqualifications.php', qualificationFormDatatable(), 'fetchqualifications', null, qualificationpersonnelepaginate, 'silent');
                callController('fetchqualifications.php', qualificationparams(), 'fetchqualifications', null, qualificationpersonnelepaginate, 'silent');
                if(document.getElementById('qualificationPPIDD')){
                    document.getElementById('qualification_personnel').value = checkqualipersonnelid(document.getElementById('qualificationPPIDD').value);
                    document.getElementById('qualification_personnel').setAttribute('readonly', true)
                }else{
                    document.getElementById('qualification_personnel').removeAttribute('readonly')  
                }
             }
        },1000)

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


var orequalificationbbtn = document.getElementById("qualificationn");
if (orequalificationbbtn) orequalificationbbtn.addEventListener("click", e=>orequalification(), false);


const query_field = [
            `query_personnel`,
            `query_entrydate`,
            `query_title`,
            // `query_startdate`,
            // `query_enddate`,
            ]
            
let qpersonnelid = [];
let qpersonnel = [];
let personnelvalue = ''
const checkqpersonnel =(state)=>{
        console.log('detected', state)
        if(qpersonnel.includes(`${state.value}`)){
            personnelvalue = qpersonnelid[qpersonnel.indexOf(`${state.value}`)];
            console.log('personnelvalue', personnelvalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
const checkqpersonnelid =(state)=>{
        console.log('detected', state)
        if(qpersonnelid.includes(`${state}`)){
            return qpersonnel[qpersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const popperdlis =(result)=>{
   if(document.getElementById('querypersonnelnames'))document.getElementById('querypersonnelnames').innerHTML = result.data.map(data=>{
       qpersonnelid.push(data.personnel.staffid);
       qpersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var querypersonnel_datasource = [];

const querypersonnelepaginate=(data)=>{
    querypersonnel_datasource = [];
    querypersonnel_datasource = data.data;
    initPagination(querypersonnel_datasource, querypersonnelsetCurrentPage);
    }


var querypersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(querypersonnel_datasource.length) {
        querypersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendquerypersonnelTableRows(item, index)
            }
        })
        // if(document.querySelector('#querypersonneltablecontent tbody').innerHTML === '') orequerybbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("querypersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const querypopulate =(id)=>{
     let data = querypersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('id').value = data[0].id;
     document.getElementById('query_personnel').value = checkqpersonnelid(data[0].pid);
     document.getElementById('query_entrydate').value = data[0].entrydate;
     document.getElementById('query_title').value = data[0].title;
    //  document.getElementById('query_startdate').value = data[0].startdate;
    //  document.getElementById('query_enddate').value = data[0].enddate;
     document.getElementById('querypreview').innerHTML = '';
     if(data[0].document !== '-'){
     const img = document.createElement("img");
    img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
    img.setAttribute('id', `termination-file`)
    document.getElementById('querypreview').appendChild(img);
    img.src = `../images/personnel/${data[0].document}`; 
    img.onload = function() { URL.revokeObjectURL(img.src) }
     }
     document.getElementById('query_submitbtn').textContent = 'Update';
     
}

const goqueback=()=>{
            callDialog()
            document.getElementById("query").click();
        }
const queryperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const querydelete =(id, person, query)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${query.toUpperCase()} as a query for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removepersonnelmatter.php', queryperdeleteparams(${id}), 'removepersonnelmatter', null, goqueback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }



function appendquerypersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("querypersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checkqpersonnelid(data.pid)} </td>
                                <td> ${data.entrydate} </td>
                                <td> ${data.title} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="querypopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="querydelete(${data.id}, '${checkqpersonnelid(data.pid)}', '${data.title}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 




function queryFormData() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'QUERY')
    paramstr.append('pid', personnelvalue)
    paramstr.append('entrydate', document.getElementById('query_entrydate').value);
    paramstr.append('title', document.getElementById('query_title').value);
    paramstr.append('startdate', document.getElementById('query_startdate').value);
    paramstr.append('enddate', document.getElementById('query_enddate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('query_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('query_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function queryFormDataupdate() {
    
    let paramstr = new FormData();
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('personnelmatter', 'QUERY')
    paramstr.append('pid', personnelvalue)
    paramstr.append('entrydate', document.getElementById('query_entrydate').value);
    paramstr.append('title', document.getElementById('query_title').value);
    paramstr.append('startdate', document.getElementById('query_startdate').value);
    paramstr.append('enddate', document.getElementById('query_enddate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('query_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('query_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function queryFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'QUERY')
    if(document.getElementById('queryPPIDD'))paramstr.append('personnelid', document.getElementById('queryPPIDD').value);
   
    return paramstr
}

const rerunquery =()=>{
    clearAllInputs(query_field);
    document.getElementById('query_personnel').textContent = 'Submit';
    document.getElementById('query').click();
}

const queryloadimg=(objfile)=>{ 
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `termination-file`)
                document.getElementById('querypreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function orequery() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('query.php', 'override')  
        
        jtabledata = document.getElementById('querypersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popperdlis, 'silent');
        if(document.getElementById('query_submitbtn'))document.getElementById('query_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('query_submitbtn').textContent == 'Submit'){
                callController('personnelmatterscript.php', queryFormData(), 'personnelmatterscript', query_field, rerunquery,)
            }else{
                checkqpersonnel(document.getElementById('query_personnel'))
                callController('personnelmatterscript.php', queryFormDataupdate(), 'personnelmatterscript', query_field, rerunquery,)
            }
            
        },true);
        
        setTimeout(()=>{
            if(sessionStorage.getItem('viewpersonnelqueryfunct')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonnelqueryfunct'));
                console.log('personnelsessiondata', personnelsessiondata[0], personnelsessiondata)
                const queryparams=()=>{
                    var paramstr = new FormData();
    		
            		paramstr.append('personnelmatter', 'QUERY');
            		if(personnelsessiondata[0].personnel.staffid)paramstr.append('personnelid', personnelsessiondata[0].personnel.staffid);

            		
            	    return paramstr;
            
            	};
                //  FOR QUERY TABLE SINGLE PERSONNEL
                callController('fetchpersonnelmatters.php', queryparams(), 'fetchpersonnelmatters', null, querypersonnelepaginate, 'silent');
                document.getElementById('query_personnel').value = checkqpersonnelid(personnelsessiondata[0].personnel.staffid);
                personnelvalue = personnelsessiondata[0].personnel.staffid
                document.getElementById('query_personnel').setAttribute('readonly', true)
                document.getElementsByClassName('oremainheader')[0].innerHTML = `QUERY <br><span style="color:green;text-transform:uppercase">[${checkqpersonnelid(personnelvalue)}]</span><input id="queryPPIDD" type="hidden" value="${personnelsessiondata[0].personnel.staffid}"/>`;
                // document.getElementById('qualificationnname').value = personnelsessiondata[0].qualificationnname ? personnelsessiondata[0].qualificationnname : '';
                sessionStorage.removeItem('viewpersonnelqueryfunct')
             }else{
                //  FOR QUERY TABLE ALL PERSONNEL
                callController('fetchpersonnelmatters.php', queryFormDatatable(), 'fetchpersonnelmatters', null, querypersonnelepaginate, 'silent');
                if(document.getElementById('queryPPIDD')){
                    document.getElementById('query_personnel').value = checkqpersonnelid(document.getElementById('queryPPIDD').value);
                    document.getElementById('query_personnel').setAttribute('readonly', true)
                }else{
                    document.getElementById('query_personnel').removeAttribute('readonly')  
                }
                }
        },1000)

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


var orequerybbtn = document.getElementById("query");
if (orequerybbtn) orequerybbtn.addEventListener("click", e=>orequery(), false);



const terminate_field = [
            `terminate_personnel`,
            `terminate_entrydate`,
            `terminate_title`,
            // `terminate_startdate`,
            // `terminate_enddate`,
            ]
            
let tpersonnelid = [];
let tpersonnel = [];
let terpersonnelvalue = ''
const checktpersonnel =(state)=>{
        console.log('detected', state)
        if(tpersonnel.includes(`${state.value}`)){
            terpersonnelvalue = tpersonnelid[tpersonnel.indexOf(`${state.value}`)];
            console.log('terpersonnelvalue', terpersonnelvalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
const checktpersonnelid =(state)=>{
        console.log('detected', state)
        if(tpersonnelid.includes(`${state}`)){
            return tpersonnel[tpersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const popperterdlis =(result)=>{
   if(document.getElementById('terminationpersonnelnames'))document.getElementById('terminationpersonnelnames').innerHTML = result.data.map(data=>{
       tpersonnelid.push(data.personnel.staffid);
       tpersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var terminationpersonnel_datasource = [];

const terminationpersonnelepaginate=(data)=>{
    terminationpersonnel_datasource = [];
    terminationpersonnel_datasource = data.data;
    initPagination(terminationpersonnel_datasource, terminationpersonnelsetCurrentPage);
    }


var terminationpersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(terminationpersonnel_datasource.length) {
        terminationpersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendterminationpersonnelTableRows(item, index)
            }
        })
        // if(document.terminationSelector('#terminationpersonneltablecontent tbody').innerHTML === '') oreterminationbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("terminationpersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const terminationpopulate =(id)=>{
     let data = terminationpersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('id').value = data[0].id;
     document.getElementById('terminate_personnel').value = checktpersonnelid(data[0].pid);
     document.getElementById('terminate_entrydate').value = data[0].entrydate;
     document.getElementById('terminate_title').value = data[0].title;
    //  document.getElementById('terminate_startdate').value = data[0].startdate;
    //  document.getElementById('terminate_enddate').value = data[0].enddate;
     document.getElementById('terminationpreview').innerHTML = '';
     if(data[0].document !== '-'){
     const img = document.createElement("img");
    img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
    img.setAttribute('id', `termination-file`)
    document.getElementById('terminationpreview').appendChild(img);
    img.src = `../images/personnel/${data[0].document}`; 
    img.onload = function() { URL.revokeObjectURL(img.src) }
     }
     document.getElementById('terminate_submitbtn').textContent = 'Update';
}

const goterback=()=>{
            callDialog()
            document.getElementById("termination").click();
        }
const terminateperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const terminatedelete =(id, person, terminate)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${terminate.toUpperCase()} as a termination entry for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removepersonnelmatter.php', terminateperdeleteparams(${id}), 'removepersonnelmatter', null, goterback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }



function appendterminationpersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("terminationpersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checktpersonnelid(data.pid)} </td>
                                <td> ${data.entrydate} </td>
                                <td> ${data.title} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="terminationpopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="terminatedelete(${data.id}, '${checktpersonnelid(data.pid)}', '${data.title}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 




function terminationFormData() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'TERMINATION')
    paramstr.append('pid', terpersonnelvalue)
    paramstr.append('entrydate', document.getElementById('terminate_entrydate').value);
    paramstr.append('title', document.getElementById('terminate_title').value);
    // paramstr.append('startdate', document.getElementById('terminate_startdate').value);
    // paramstr.append('enddate', document.getElementById('terminate_enddate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('terminate_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('terminate_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function terminationFormDataupdate() {
    
    let paramstr = new FormData();
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('personnelmatter', 'TERMINATION')
    paramstr.append('pid', terpersonnelvalue)
    paramstr.append('entrydate', document.getElementById('terminate_entrydate').value);
    paramstr.append('title', document.getElementById('terminate_title').value);
    // paramstr.append('startdate', document.getElementById('terminate_startdate').value);
    // paramstr.append('enddate', document.getElementById('terminate_enddate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('terminate_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('terminate_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function clearterminationinputs() {
    
    document.getElementById('termination_entrydate').value = '';
    document.getElementById('termination_title').value = '';
    document.getElementById('termination_startdate').value = '';
    document.getElementById('termination_enddate').value = '';
        try{
	 document.getElementById('termination_file').files = null;
    }catch(ex){
   }
}
function terminationFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'TERMINATION')
    if(document.getElementById('terminatePPIDD'))paramstr.append('personnelid', document.getElementById('terminatePPIDD').value);
   
   
    return paramstr
}

const reruntermination =()=>{
    clearAllInputs(terminate_field)
    document.getElementById('terminate_submitbtn').textContent = 'Submit';
    document.getElementById("termination").click();
}

const terminationloadimg=(objfile)=>{
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `termination-file`)
                document.getElementById('terminationpreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function oretermination() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('termination.php', 'override')  
        
        jtabledata = document.getElementById('terminationpersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popperterdlis, 'silent');
        if(document.getElementById('terminate_submitbtn'))document.getElementById('terminate_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('terminate_submitbtn').textContent == 'Submit'){
                callController('personnelmatterscript.php', terminationFormData(), 'personnelmatterscript', terminate_field, reruntermination,);
            }else{
                checktpersonnel(document.getElementById('terminate_personnel'));
                callController('personnelmatterscript.php', terminationFormDataupdate(), 'personnelmatterscript', terminate_field, reruntermination,);
            }
            clearterminationinputs()
        },true);
        
        
        setTimeout(()=>{
            if(sessionStorage.getItem('viewpersonnelterminatefunct')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonnelterminatefunct'));
                const terminationparams=()=>{
                    var paramstr = new FormData();
    		
            		paramstr.append('personnelmatter', 'TERMINATION');
            		if(personnelsessiondata[0].personnel.staffid)paramstr.append('personnelid', personnelsessiondata[0].personnel.staffid);
            		
            	    return paramstr;
            
            	};
                //  FOR termination TABLE SINGLE PERSONNEL
                callController('fetchpersonnelmatters.php', terminationparams(), 'SINGLEfetchpersonnelmatters', null, terminationpersonnelepaginate, 'silent');
                document.getElementById('terminate_personnel').value = checktpersonnelid(personnelsessiondata[0].personnel.staffid);
                terpersonnelvalue = personnelsessiondata[0].personnel.staffid;
                document.getElementById('terminate_personnel').setAttribute('readonly', true)
                document.getElementsByClassName('oremainheader')[0].innerHTML = `TERMINATION <br><span style="color:green;text-transform:uppercase">[${checktpersonnelid(terpersonnelvalue)}]</span><input id="terminatePPIDD" type="hidden" value="${personnelsessiondata[0].personnel.staffid}"/>`;
                // document.getElementById('qualificationnname').value = personnelsessiondata[0].qualificationnname ? personnelsessiondata[0].qualificationnname : '';
                sessionStorage.removeItem('viewpersonnelterminatefunct')
             }else{
                //  FOR termination TABLE ALL PERSONNEL
                callController('fetchpersonnelmatters.php', terminationFormDatatable(), 'ALLfetchpersonnelmatters', null, terminationpersonnelepaginate, 'silent');
                if(document.getElementById('terminatePPIDD')){
                    document.getElementById('terminate_personnel').value = checktpersonnelid(document.getElementById('terminatePPIDD').value);
                    document.getElementById('terminate_personnel').setAttribute('readonly', true)
                }else{
                    document.getElementById('terminate_personnel').removeAttribute('readonly')  
                }
             }
        },1000)

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


var oreterminationbbtn = document.getElementById("termination");
if (oreterminationbbtn) oreterminationbbtn.addEventListener("click", oretermination, false);




const suspension_field = [
            `suspension_personnel`,
            `suspension_entrydate`,
            `suspension_title`,
            // `suspension_startdate`,
            // `suspension_enddate`,
            ]
            
let suspersonnelid = [];
let suspersonnel = [];
let suspersonnelvalue = ''
const checksuspersonnel =(state)=>{
        console.log('detected', state)
        if(suspersonnel.includes(`${state.value}`)){
            suspersonnelvalue = suspersonnelid[suspersonnel.indexOf(`${state.value}`)];
            console.log('suspersonnelvalue', suspersonnelvalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
const checksuspersonnelid =(state)=>{
        console.log('detected', state)
        if(suspersonnelid.includes(`${state}`)){
            return suspersonnel[suspersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const poppersusdlis =(result)=>{
   if(document.getElementById('suspensionpersonnelnames'))document.getElementById('suspensionpersonnelnames').innerHTML = result.data.map(data=>{
       suspersonnelid.push(data.personnel.staffid);
       suspersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var suspensionpersonnel_datasource = [];

const suspensionpersonnelepaginate=(data)=>{
    suspensionpersonnel_datasource = [];
    suspensionpersonnel_datasource = data.data;
    initPagination(suspensionpersonnel_datasource, suspensionpersonnelsetCurrentPage);
    }


var suspensionpersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(suspensionpersonnel_datasource.length) {
        suspensionpersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendsuspensionpersonnelTableRows(item, index)
            }
        })
        // if(document.suspensionSelector('#suspensionpersonneltablecontent tbody').innerHTML === '') oresuspensionbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("suspensionpersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const suspensionpopulate =(id)=>{
     let data = suspensionpersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('id').value = data[0].id;
     document.getElementById('suspension_personnel').value = checksuspersonnelid(data[0].pid);
     document.getElementById('suspension_entrydate').value = data[0].entrydate;
     document.getElementById('suspension_title').value = data[0].title;
    //  document.getElementById('suspension_startdate').value = data[0].startdate;
    //  document.getElementById('suspension_enddate').value = data[0].enddate;
     document.getElementById('suspensionpreview').innerHTML = '';
     if(data[0].doc !== '-'){
     const img = document.createElement("img");
    img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
    img.setAttribute('id', `suspension-file`)
    document.getElementById('suspensionpreview').appendChild(img);
    img.src = `../images/personnel/${data[0].document}`; 
    img.onload = function() { URL.revokeObjectURL(img.src) }
     }
     document.getElementById('suspension_submitbtn').textContent = 'Update';
}

const gosusback=()=>{
            callDialog()
            document.getElementById("suspension").click();
        }
const suspensionperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const suspensiondelete =(id, person, suspension)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${suspension.toUpperCase()} as a suspension entry for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removepersonnelmatter.php', suspensionperdeleteparams(${id}), 'removepersonnelmatter', null, gosusback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }



function appendsuspensionpersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("suspensionpersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checksuspersonnelid(data.pid)} </td>
                                <td> ${data.entrydate} </td>
                                <td> ${data.title} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="suspensionpopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="suspensiondelete(${data.id}, '${checksuspersonnelid(data.pid)}', '${data.title}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 




function suspensionFormData() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'SUSPENSION')
    paramstr.append('pid', suspersonnelvalue)
    paramstr.append('entrydate', document.getElementById('suspension_entrydate').value);
    paramstr.append('title', document.getElementById('suspension_title').value);
    // paramstr.append('startdate', document.getElementById('suspension_startdate').value);
    // paramstr.append('enddate', document.getElementById('suspension_enddate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('suspension_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('suspension_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function suspensionFormDataupdate() {
    
    let paramstr = new FormData();
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('personnelmatter', 'SUSPENSION')
    paramstr.append('pid', suspersonnelvalue)
    paramstr.append('entrydate', document.getElementById('suspension_entrydate').value);
    paramstr.append('title', document.getElementById('suspension_title').value);
    // paramstr.append('startdate', document.getElementById('suspension_startdate').value);
    // paramstr.append('enddate', document.getElementById('suspension_enddate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('suspension_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('suspension_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function suspensionFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'SUSPENSION')
        if(document.getElementById('suspensionPPIDD'))paramstr.append('personnelid', document.getElementById('suspensionPPIDD').value);

   
    return paramstr
}
function clearsuspensioninputs() {
    
    document.getElementById('suspension_entrydate').value = '';
    document.getElementById('suspension_title').value = '';
    // document.getElementById('suspension_startdate').value = '';
    // document.getElementById('suspension_enddate').value = '';
        try{
	 document.getElementById('suspension_file').files = null;
    }catch(ex){
   }
}

const rerunsuspension =()=>{
    clearAllInputs(suspension_field);
    document.getElementById('suspension_personnel').textContent = 'Submit';
    document.getElementById("suspension").click();
}

const suspensionloadimg=(objfile)=>{
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `suspension-file`)
                document.getElementById('suspensionpreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function oresuspension() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('suspension.php', 'override')  
        
        jtabledata = document.getElementById('suspensionpersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, poppersusdlis, 'silent');
        if(document.getElementById('suspension_submitbtn'))document.getElementById('suspension_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('suspension_personnel').textContent == 'Submit'){
                callController('personnelmatterscript.php', suspensionFormData(), 'personnelmatterscript', suspension_field, rerunsuspension,);
            }else{
                checksuspersonnel(document.getElementById('suspension_personnel'))
                callController('personnelmatterscript.php', suspensionFormDataupdate(), 'personnelmatterscript', suspension_field, rerunsuspension,);
            }
            clearsuspensioninputs()
        },true);
        
        setTimeout(()=>{
            if(sessionStorage.getItem('viewpersonnelsuspensionfunct')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonnelsuspensionfunct'));
                const suspensionparams=()=>{
                    var paramstr = new FormData();
    		
            		paramstr.append('personnelmatter', 'SUSPENSION');
            		paramstr.append('personnelid', personnelsessiondata[0].personnel.staffid);
            		
            	    return paramstr;
            
            	};
                //  FOR suspension TABLE SINGLE PERSONNEL
                callController('fetchpersonnelmatters.php', suspensionparams(), 'SINGLEfetchpersonnelmatters', null, suspensionpersonnelepaginate, 'silent');
                document.getElementById('suspension_personnel').value = checksuspersonnelid(personnelsessiondata[0].personnel.staffid);
                suspersonnelvalue = personnelsessiondata[0].personnel.staffid;
                document.getElementById('suspension_personnel').setAttribute('readonly', true)
                document.getElementsByClassName('oremainheader')[0].innerHTML = `SUSPENSION <br><span style="color:green;text-transform:uppercase">[${checksuspersonnelid(suspersonnelvalue)}]</span><input id="suspensionPPIDD" type="hidden" value="${personnelsessiondata[0].personnel.staffid}"/>`;
                // document.getElementById('qualificationnname').value = personnelsessiondata[0].qualificationnname ? personnelsessiondata[0].qualificationnname : '';
                sessionStorage.removeItem('viewpersonnelsuspensionfunct')
             }else{
                //  FOR suspension TABLE ALL PERSONNEL
                callController('fetchpersonnelmatters.php', suspensionFormDatatable(), 'ALLfetchpersonnelmatters', null, suspensionpersonnelepaginate, 'silent');
                if(document.getElementById('suspensionPPIDD')){
                    document.getElementById('suspension_personnel').value = checksuspersonnelid(document.getElementById('suspensionPPIDD').value);
                    document.getElementById('suspension_personnel').setAttribute('readonly', true)
                }else{
                    document.getElementById('suspension_personnel').removeAttribute('readonly')  
                }
             }
        },1000)

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


var oresuspensionbbtn = document.getElementById("suspension");
if (oresuspensionbbtn) oresuspensionbbtn.addEventListener("click", oresuspension, false);


const leave_field = [
            `leave_personnel`,
            `leave_entrydate`,
            `leave_title`,
            `leave_startdate`,
            `leave_enddate`,
            ]
            
let leavpersonnelid = [];
let leavpersonnel = [];
let leavpersonnelvalue = ''
const checkleavpersonnel =(state)=>{
        console.log('detected', state)
        if(leavpersonnel.includes(`${state.value}`)){
            leavpersonnelvalue = leavpersonnelid[leavpersonnel.indexOf(`${state.value}`)];
            console.log('leavpersonnelvalue', leavpersonnelvalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
const checkleavpersonnelid =(state)=>{
        console.log('detected', state)
        if(leavpersonnelid.includes(`${state}`)){
            return leavpersonnel[leavpersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const popperleavdlis =(result)=>{
   if(document.getElementById('leavepersonnelnames'))document.getElementById('leavepersonnelnames').innerHTML = result.data.map(data=>{
       leavpersonnelid.push(data.personnel.staffid);
       leavpersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var leavepersonnel_datasource = [];

const leavepersonnelepaginate=(data)=>{
    leavepersonnel_datasource = [];
    leavepersonnel_datasource = data.data;
    initPagination(leavepersonnel_datasource, leavepersonnelsetCurrentPage);
    }


var leavepersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(leavepersonnel_datasource.length) {
        leavepersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendleavepersonnelTableRows(item, index)
            }
        })
        // if(document.leaveSelector('#leavepersonneltablecontent tbody').innerHTML === '') oreleavebbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("leavepersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const leavepopulate =(id)=>{
     let data = leavepersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('id').value = data[0].id;
     document.getElementById('leave_personnel').value = checkleavpersonnelid(data[0].pid);
     document.getElementById('leave_entrydate').value = data[0].entrydate;
     document.getElementById('leave_title').value = data[0].title;
     document.getElementById('leave_startdate').value = data[0].startdate;
     document.getElementById('leave_enddate').value = data[0].enddate;
     document.getElementById('leavepreview').innerHTML = '';
     if(data[0].doc !== '-'){
     const img = document.createElement("img");
    img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
    img.setAttribute('id', `leave-file`)
    document.getElementById('leavepreview').appendChild(img);
    img.src = `../images/personnel/${data[0].document}`; 
    img.onload = function() { URL.revokeObjectURL(img.src) }
     }
     document.getElementById('leave_submitbtn').textContent = 'Update';
     
}

const goleavback=()=>{
            callDialog()
            document.getElementById("leave").click();
        }
const leaveperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const leavedelete =(id, person, leave)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${leave.toUpperCase()} as a leave entry for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removepersonnelmatter.php', leaveperdeleteparams(${id}), 'removepersonnelmatter', null, goleavback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }



function appendleavepersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("leavepersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checkleavpersonnelid(data.pid)} </td>
                                <td> ${data.entrydate} </td>
                                <td> ${data.title} </td>
                                <td> ${data.startdate} </td>
                                <td> ${data.enddate} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="leavepopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="leavedelete(${data.id}, '${checkleavpersonnelid(data.pid)}', '${data.title}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 




function leaveFormData() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'leave')
    paramstr.append('pid', leavpersonnelvalue)
    paramstr.append('entrydate', document.getElementById('leave_entrydate').value);
    paramstr.append('title', document.getElementById('leave_title').value);
    paramstr.append('startdate', document.getElementById('leave_startdate').value);
    paramstr.append('enddate', document.getElementById('leave_enddate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('leave_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('leave_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function leaveFormDataupdate() {
    
    let paramstr = new FormData();
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('personnelmatter', 'leave')
    paramstr.append('pid', leavpersonnelvalue)
    paramstr.append('entrydate', document.getElementById('leave_entrydate').value);
    paramstr.append('title', document.getElementById('leave_title').value);
    paramstr.append('startdate', document.getElementById('leave_startdate').value);
    paramstr.append('enddate', document.getElementById('leave_enddate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('leave_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('leave_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function leaveFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'leave')
        if(document.getElementById('leavePPIDD'))paramstr.append('personnelid', document.getElementById('leavePPIDD').value);
   
    return paramstr
}
function clearleaveinputs() {
    
    document.getElementById('leave_entrydate').value = '';
    document.getElementById('leave_title').value = '';
    document.getElementById('leave_startdate').value = '';
    document.getElementById('leave_enddate').value = '';
        try{
	 document.getElementById('leave_file').files = null;
    }catch(ex){
   }
}

const rerunleave =()=>{
    document.getElementById('leave_submitbtn').textContent = 'Submit';
    document.getElementById("leave").click();
}

const leaveloadimg=(objfile)=>{
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `leave-file`)
                document.getElementById('leavepreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function oreleave() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('leave.php', 'override')  
        
        jtabledata = document.getElementById('leavepersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popperleavdlis, 'silent');
        if(document.getElementById('leave_submitbtn'))document.getElementById('leave_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('leave_personnel').textContent == 'Submit'){
                callController('personnelmatterscript.php', leaveFormData(), 'personnelmatterscript', leave_field, rerunleave,);
                clearleaveinputs()
            }else{
                checkleavpersonnel(document.getElementById('leave_personnel'))
                callController('personnelmatterscript.php', leaveFormDataupdate(), 'personnelmatterscript', leave_field, rerunleave,);
                clearleaveinputs()
            }
        },true);
        
        setTimeout(()=>{
            if(sessionStorage.getItem('viewpersonnelleavefunct')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonnelleavefunct'));
                const leaveparams=()=>{
                    var paramstr = new FormData();
    		
            		paramstr.append('personnelmatter', 'leave');
            		paramstr.append('personnelid', personnelsessiondata[0].personnel.staffid);
            		
            	    return paramstr;
            
            	};
                //  FOR leave TABLE SINGLE PERSONNEL
                callController('fetchpersonnelmatters.php', leaveparams(), 'SINGLEfetchpersonnelmatters', null, leavepersonnelepaginate, 'silent');
                document.getElementById('leave_personnel').value = checkleavpersonnelid(personnelsessiondata[0].personnel.staffid);
                leavpersonnelvalue = personnelsessiondata[0].personnel.staffid;
                document.getElementById('leave_personnel').setAttribute('readonly', true);
                document.getElementsByClassName('oremainheader')[0].innerHTML = `LEAVE <br><span style="color:green;text-transform:uppercase">[${checkleavpersonnelid(leavpersonnelvalue)}]</span><input id="leavePPIDD" type="hidden" value="${personnelsessiondata[0].personnel.staffid}"/>`;
                // document.getElementById('qualificationnname').value = personnelsessiondata[0].qualificationnname ? personnelsessiondata[0].qualificationnname : '';
                sessionStorage.removeItem('viewpersonnelleavefunct')
             }else{
                 //  FOR leave TABLE ALL PERSONNEL
            callController('fetchpersonnelmatters.php', leaveFormDatatable(), 'ALLfetchpersonnelmatters', null, leavepersonnelepaginate, 'silent');
             if(document.getElementById('leavePPIDD')){
                    document.getElementById('leave_personnel').value = checkleavpersonnelid(document.getElementById('leavePPIDD').value);
                    document.getElementById('leave_personnel').setAttribute('readonly', true)
                }else{
                    document.getElementById('leave_personnel').removeAttribute('readonly')  
                }
             }
        },1000)
            

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


var oreleavebbtn = document.getElementById("leave");
if (oreleavebbtn) oreleavebbtn.addEventListener("click", oreleave, false);


const advances_field = [
            `advances_personnel`,
            `advances_entrydate`,
            `advances_title`,
            `advances_level`,
            ]
let advancediddd
let advanersonnelid = [];
let advanersonnel = [];
let advanersonnellevelid = [];
let advanersonnellevel = [];
let advanersonnelvalue = ''


const checkadvanersonnel =(state)=>{
        if(advanersonnel.includes(`${state.value}`)){
            advanersonnelvalue = advanersonnelid[advanersonnel.indexOf(`${state.value}`)];
            console.log('advanersonnelvalue', advanersonnelvalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
    const popadvlevel=(result)=>{
    //     document.getElementById('advances_level').innerHTML = `<option value=""> --select level-- </option>`
	   // document.getElementById('advances_level').innerHTML += result.data.data.map(data=>{
	   //     advanersonnellevelid.push(data.id);
	   //     advanersonnellevel.push(data.level);
	   //     return(`
	   //         <option value="${data.id}"> ${data.level.toUpperCase()} </option>
	   //     `)
	   // })
	}
const checkadvanersonnelid =(state)=>{
        if(advanersonnelid.includes(`${state}`)){
            return advanersonnel[advanersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const checkadvanersonnellevelid =(state)=>{
        if(advanersonnellevelid.includes(`${state}`)){
            return advanersonnellevel[advanersonnellevelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const popperadvmdlis =(result)=>{ 
   if(document.getElementById('advancespersonnelnames'))document.getElementById('advancespersonnelnames').innerHTML = result.data.map(data=>{
       advanersonnelid.push(data.personnel.staffid);
       advanersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var advancespersonnel_datasource = [];

const advancespersonnelepaginate=(data)=>{
    advancespersonnel_datasource = [];
    if(!data.data)return callModal('No data found')
    advancespersonnel_datasource = data.data;
    initPagination(advancespersonnel_datasource, advancespersonnelsetCurrentPage);
    }


var advancespersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(advancespersonnel_datasource.length) {
        advancespersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendadvancespersonnelTableRows(item, index)
            }
        })
        // if(document.advancesSelector('#advancespersonneltablecontent tbody').innerHTML === '') oreadvancesbbtn.click()
        // appendadvpertyAccountTableFoot()
    }
    else {
        document.getElementById("advancespersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const advancespopulate =(id)=>{
     let data = advancespersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('id').value = data[0].id;
     document.getElementById('advances_personnel').value = checkadvanersonnelid(data[0].pid);
     document.getElementById('advances_entrydate').value = data[0].entrydate;
     document.getElementById('advances_level').value = data[0].amount;
     document.getElementById('advances_title').value = data[0].title;
     document.getElementById('advancespreview').innerHTML = '';
     if(data[0].doc !== '-'){
         const img = document.createElement("img");
        img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
        img.setAttribute('id', `advances-file`)
        document.getElementById('advancespreview').appendChild(img);
        img.src = `../images/personnel/${data[0].document}`; 
        img.onload = function() { URL.revokeObjectURL(img.src) }
     }
     document.getElementById('advances_submitbtn').textContent = 'Update';
}

const goadvback=()=>{
            callDialog()
            document.getElementById("advance").click();
        }
const advancesperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const advancesdelete =(id, person, advances)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${advances.toUpperCase()} as a advances entry for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removepersonnelmatter.php', advancesperdeleteparams(${id}), 'removepersonnelmatter', null, goadvback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }



function appendadvancespersonnelTableRows(data, index) {
    // var customerinfo = advpertycustomers.find(value => value.id === item.customer) 
    document.getElementById("advancespersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checkadvanersonnelid(data.pid)} </td>
                                <td> ${checkadvanersonnellevelid(data.level)} </td>
                                <td> ${data.title} </td>
                                <td> ${data.entrydate} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="advancespopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="advancesdelete(${data.id}, '${checkadvanersonnelid(data.pid)}', '${checkadvanersonnellevelid(data.level)} --> ${data.title}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 




function advancesFormData() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'ADVANCE')
    paramstr.append('pid', advanersonnelvalue)
    paramstr.append('entrydate', document.getElementById('advances_entrydate').value);
    paramstr.append('title', document.getElementById('advances_title').value);
    paramstr.append('amount', document.getElementById('advances_amount').value);
    paramstr.append('amount', document.getElementById('advances_amount').value);
    paramstr.append('level', '-1');
    
        try{
	 paramstr.append('photofilename',document.getElementById('advances_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('advances_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function advancesFormDataupdate() {
    
    let paramstr = new FormData();
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('personnelmatter', 'ADVANCE')
    paramstr.append('pid', advanersonnelvalue)
    paramstr.append('entrydate', document.getElementById('advances_entrydate').value);
    paramstr.append('title', document.getElementById('advances_title').value);
    paramstr.append('amount', document.getElementById('advances_level').value);
    paramstr.append('level', '-1');
    
        try{
	 paramstr.append('photofilename',document.getElementById('advances_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('advances_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function advancesFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'ADVANCE')
        if(document.getElementById('advancesPPIDD'))paramstr.append('personnelid', document.getElementById('advancesPPIDD').value);
   
    return paramstr
}
function clearadvancesinputs() {
    
    document.getElementById('advances_personnel').value = '';
    document.getElementById('advances_entrydate').value = '';
    document.getElementById('advances_title').value = '';
    document.getElementById('advances_level').value = '';
        try{
	 document.getElementById('advances_file').files = null;
    }catch(ex){
   }
}
function advancespersonneleloaddd(result) {
    if(document.getElementById('advances_submitbtn'))document.getElementById('advances_submitbtn').innerHTML= 'Update'
    document.getElementById('advances_personnel').value = checkadvanersonnelid(result.data[0].pid);
    document.getElementById('advances_entrydate').value = result.data[0].entrydate;
    document.getElementById('advances_title').value = result.data[0].title;
    document.getElementById('advances_level').value = result.data[0].amount;
        try{
	 document.getElementById('advances_file').files = null;
    }catch(ex){
   }
}

const rerunadvances =()=>{
    if(document.getElementById('advances_submitbtn').textContent == 'Submit')document.getElementById("advance").click();
    if(document.getElementById('advances_submitbtn').textContent == 'Update')document.getElementById("viewstaffadvance").click();
}

const advancesloadimg=(objfile)=>{
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `advances-file`)
                document.getElementById('advancespreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function oreadvances() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('advance.php', 'override')  
        
        jtabledata = document.getElementById('advancespersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        advancediddd = ''
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popperadvmdlis, 'silent');
        callController('fetchlevel.php', null, 'fetchlevel', null,  popadvlevel, 'silent');
        if(document.getElementById('advances_submitbtn'))document.getElementById('advances_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('advances_submitbtn').textContent == 'Submit'){
                    callController('personnelmatterscript.php', advancesFormData(), 'personnelmatterscript', getallid('promvrfy2'), rerunadvances);
            }else{
                    callController('personnelmatterscript.php', advancesFormDataupdate(), 'personnelmatterscript', getallid('promvrfy2'), rerunadvances);
            }
            // clearadvancesinputs()
        },true);
        setTimeout(()=>{
            if(sessionStorage.getItem('editviewstaffadvancedata')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('editviewstaffadvancedata'));
                advancediddd = personnelsessiondata
                const advancesparams=()=>{
                    var paramstr = new FormData();
    		
            		paramstr.append('personnelmatter', 'ADVANCE');
            		paramstr.append('id', personnelsessiondata);
            		
            	    return paramstr;
            
            	};
                //  FOR advances TABLE SINGLE PERSONNEL
                callController('fetchpersonnelmatters.php', advancesparams(), 'SINGLEfetchpersonnelmatters', null, advancespersonneleloaddd, 'silent');
                document.getElementById('advances_personnel').setAttribute('readonly', true);
                // document.getElementById('qualificationnname').value = personnelsessiondata[0].qualificationnname ? personnelsessiondata[0].qualificationnname : '';
                sessionStorage.removeItem('editviewstaffadvancedata');
             }
        },1000)

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


var oreadvancesbbtn = document.getElementById("advance");
if (oreadvancesbbtn) oreadvancesbbtn.addEventListener("click", oreadvances, false);




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


let stafsalrecpersonnelid = [];
let stafsalrecpersonnel = [];
let stafsalrecpersonnelvalue = ''

var stafsalrec_datasource = [];

const stafsalrecepaginate=(data)=>{
    stafsalrec_datasource = [];
    stafsalrec_datasource = data.data;
    initPagination(stafsalrec_datasource, stafsalrecsetCurrentPage);
    // console.log('this is the data we testing', viewpersonnel_datasource)
    document.getElementById('stafsalrectabledata2').innerHTML = stafsalrec_datasource.map((data, index)=>{
         return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${document.getElementById('stafsalinput').value} </td>
                                <td> ${data.entrydate} </td>
                                <td> ${getMonthRepresentation(data.month)} </td>
                                <td> ${data.year} </td>
                                <td> &#x20A6 ${formatCurrency(data.totalallowance)} </td>
                                <td> &#x20A6 ${formatCurrency(data.totaldeduction)} </td>
                                <td> ${data.withattendance} </td>
                                <td> &#x20A6 ${formatCurrency(data.netpayable)} </td>
                </tr>`)
    }).join('')
    }


var stafsalrecsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(stafsalrec_datasource.length) {
        stafsalrec_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendstafsalrecTableRows(item, index)
            }
        })
        // if(document.warningSelector('#stafsalrectablecontent tbody').innerHTML === '') orewarningbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("stafsalrectablecontent").innerHTML=  renderNoTableData()
    }
};

function getMonthRepresentation(monthValue) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (monthValue >= 1 && monthValue <= 12) {
    return months[monthValue - 1];
  } else {
    return "Invalid month value";
  }
}

function appendstafsalrecTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("staffsalaryrecordtablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${document.getElementById('stafsalinput').value} </td>
                                <td> ${data.entrydate} </td>
                                <td> ${getMonthRepresentation(data.month)} </td>
                                <td> ${data.year} </td>
                                <td> &#x20A6 ${formatCurrency(data.totalallowance)} </td>
                                <td> &#x20A6 ${formatCurrency(data.totaldeduction)} </td>
                                <td> ${data.withattendance} </td>
                                <td> &#x20A6 ${formatCurrency(data.netpayable)} </td>
                            </tr>
    `
} 



const popperstafsalrecdlis =(result)=>{
   if(document.getElementById('personneldatanames'))document.getElementById('personneldatanames').innerHTML = result.data.map(data=>{
       stafsalrecpersonnelid.push(data.personnel.staffid);
       stafsalrecpersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}

const checkstaffsalrecpersonnel =(state)=>{
        console.log('detected', state)
        if(stafsalrecpersonnel.includes(`${state.value}`)){
            stafsalrecpersonnelvalue = stafsalrecpersonnelid[stafsalrecpersonnel.indexOf(`${state.value}`)];
            document.getElementById('staffsalrecsearchbtn').style.display = 'block';
            console.log('stafsalrecpersonnelvalue', stafsalrecpersonnelvalue)
        }else{
            document.getElementById('staffsalrecsearchbtn').style.display = 'none';
        }
    };


const personalstaffsalaryrecord =(data)=>{
        popperstafsalrecdlis(data)
    if(document.getElementById('personneldatanames').innerHTML === ''){
        document.getElementById('personneldatanames').innerHTML = data.data.map(dat=>`<option value="${dat.personnel.firstname} ${dat.personnel.lastname}"/>`).join('')
    }
}

const personnelstaffrecordsearchclick =()=>{
    if(stafsalrecpersonnelvalue == '')return callModal('please enter a valid name', 0);
    const params =()=>{
        let paramstr = new FormData();

        paramstr.append('staffid', stafsalrecpersonnelvalue);

        return paramstr;
    }
    callController('fetchstaffpayroll.php', params(), 'fetchstaffpayroll', null, stafsalrecepaginate)
}


async function orepersonalstaffsalaryrecord() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('personalstaffsalaryrecord.php', 'override')  
        
         jtabledata = document.getElementById('staffsalaryrecordtablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, personalstaffsalaryrecord)
        // if(document.getElementById('personalstaffsalaryrecord_submitbtn'))document.getElementById('personalstaffsalaryrecord_submitbtn').addEventListener('click', e=>callController('controller.php', null, 'personalstaffsalaryrecordsubmit', personalstaffsalaryrecord_field, alert),true);
        // document.getElementById('personneldatanames')
        if(document.getElementById('staffsalexport'))document.getElementById('staffsalexport').addEventListener('click',e=>{
            tableToExcel('stafsalrectabledatafull2', `STAFF SALARY RECORD FOR ${document.getElementById('stafsalinput').value}`)},false);
        if(document.getElementById('staffsalprint'))document.getElementById('staffsalprint').addEventListener('click',e=>{
            printContent(`STAFF SALARY RECORD FOR ${document.getElementById('stafsalinput').value}`,`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'stafsalrectabledatafull2')},false);

        
        
}


var orepersonalstaffsalaryrecordbbtn = document.getElementById("personalstaffsalaryrecord");
if (orepersonalstaffsalaryrecordbbtn) orepersonalstaffsalaryrecordbbtn.addEventListener("click", orepersonalstaffsalaryrecord, false);


const confirmmonthsalary_field = [`confirmmonthpayrollyear`, `confirmmonthpayrollmonth`];
var confirmmonthpayroll_datasource = [];
const confirmmonthpayrollepaginate=(data)=>{
    if(data.message){
        if(data.message == "Payroll calculation not successful."){
            callModal("Payroll calculation not successful.", 0);
            jtabledata.innerHTML = ''
            return;
        }
    }
    confirmmonthpayroll_datasource = [];
    confirmmonthpayroll_datasource = datasource = data.data;
    initPagination(confirmmonthpayroll_datasource, confirmmonthpayrollsetCurrentPage);
    document.getElementById('viewmonthtabledata2').innerHTML = confirmmonthpayroll_datasource.map((data, index)=>{
         return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${data.personnel[0].firstname} </td>
                                <td> ${data.personnel[0].lastname} </td>
                                <td> ${getthelevel(data.personnel[0].levelid)??''} </td>
                                <td><input class="netpayable" value="${data.netpayable}" type="hidden"/> ${formatCurrency(data.netpayable)} </td>
                                <td> ${formatCurrency(data.payroll.totalallowance)} </td>
                                <td> ${formatCurrency(data.payroll.totaldeduction)} </td> 
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "ALLOWANCE").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "DEDUCTION").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> ${data.payroll.entrydate} </td>
                </tr>`)
    }).join('')
    }


var confirmmonthpayrollsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(confirmmonthpayroll_datasource.length) {
        document.getElementById("confirmmonthpayrolltablecontent").innerHTML =  confirmmonthpayroll_datasource.map((data,index)=>`
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td><input class="confirmmonthpayrollcheckbox" type="checkbox" id="${data.payroll.id}" ></td>
                                <td> ${data.personnel[0].firstname} </td>
                                <td> ${data.personnel[0].othernames} </td>
                                <td> ${data.personnel[0].lastname} </td>
                                <td> ${data.personnel[0].department} </td>
                                <td> ${getthelevel(data.personnel[0].levelid)??''} </td>
                                <td><input class="netpayable" value="${data.netpayable}" type="hidden"/> ${formatCurrency(data.netpayable)} </td>
                                <td> ${formatCurrency(data.payroll.totalallowance)} </td>
                                <td> ${formatCurrency(data.payroll.totaldeduction)} </td> 
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "ALLOWANCE").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "DEDUCTION").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> ${data.payroll.entrydate} </td>
                            </tr>
    `).join('')
        confirmmonthpayroll_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                // appendconfirmmonthpayrollTableRows(item, index);
            }
        })
    }
    else {
        document.getElementById("confirmmonthpayrolltablecontent").innerHTML=  renderNoTableData()
    }
    var payrollnetpayable = 0
    var payrolltotalallowance = 0 
    var payrolltotaldeduction = 0
    var personnelbasicsalary = 0
    confirmmonthpayroll_datasource.map(dat=>{
        payrollnetpayable = Number(dat.netpayable) + payrollnetpayable
        payrolltotalallowance = Number(dat.payroll.totalallowance) + payrolltotalallowance
        payrolltotaldeduction = Number(dat.payroll.totaldeduction) + payrolltotaldeduction
        personnelbasicsalary = Number(dat.personnel[0].basicsalary) + personnelbasicsalary
    })
    // for(i=0;i<document.getElementsByClassName('netpayable').length;i++){
    //     payrollnetpayable = Number(document.getElementsByClassName('netpayable')[i].value) + payrollnetpayable
    // }
    document.getElementById('payrolltotalsalaries').innerHTML = ` &#x20A6;${formatCurrency(payrollnetpayable)}`;
    document.getElementById('totalallowance').innerHTML = ` &#x20A6;${formatCurrency(payrolltotalallowance)}`;
    document.getElementById('totaldeductions').innerHTML = ` &#x20A6;${formatCurrency(payrolltotaldeduction)}`;
    // document.getElementById('totalbasicsalary').innerHTML = ` &#x20A6;${formatCurrency(personnelbasicsalary)}`;
    document.getElementById('totalbasicsalary').parentElement.style.display = 'none';
    if(document.getElementById('pmonth')){
        const selectElement = document.getElementById('confirmmonthpayrollmonth');
const selectedOptionText = selectElement.options[selectElement.selectedIndex].textContent;
document.getElementById('pmonth').innerHTML = ` ${selectedOptionText}`
}
    if(document.getElementById('pyear'))document.getElementById('pyear').innerHTML = document.getElementById('confirmmonthpayrollyear').value;
};

const checkallconfirmmonthpayrolltoapprove =(state)=>{
    if(state.textContent == 'select all'){
        for(i=0;i<document.getElementsByClassName('confirmmonthpayrollcheckbox').length;i++){
            document.getElementsByClassName('confirmmonthpayrollcheckbox')[i].checked = true
        }
        state.textContent = 'deselect all';
        return
    }
    if(state.textContent == 'deselect all'){
        for(i=0;i<document.getElementsByClassName('confirmmonthpayrollcheckbox').length;i++){
            document.getElementsByClassName('confirmmonthpayrollcheckbox')[i].checked = false
        }
        state.textContent = 'select all';
        return
    }
}

const refreshconfirmmonthpayroll =()=>{
    document.getElementById('confirmmonthsalary_submitbtn').click();
}

const confirmmonthparmsforpersonnel =(action)=>{
    let paramstr = new FormData();
    paramstr.append('buttonselected', action);
    let idsp = [];
     for(i=0;i<document.getElementsByClassName('confirmmonthpayrollcheckbox').length;i++){
         if(document.getElementsByClassName('confirmmonthpayrollcheckbox')[i].checked){
            idsp.push(`${document.getElementsByClassName('confirmmonthpayrollcheckbox')[i].id}`) 
         }
     }  
     for(i=0;i<idsp.length;i++){
         paramstr.append(`ids${i}`, `${idsp[i]}`);
     }
         paramstr.append(`idsize`, idsp.length);
    
    return paramstr;
}

const confirmmonthpayrolltoapprove =()=>{
        let checked = '';
    for(i=0;i<document.getElementsByClassName('confirmmonthpayrollcheckbox').length;i++){
        if(document.getElementsByClassName('confirmmonthpayrollcheckbox')[i].checked){
            checked = 'good'
        }
    }
    if(checked == '')return callModal('No payroll has been selected for approval', 0);
    callController('approvepayroll.php', confirmmonthparmsforpersonnel("APPROVE"), 'approvepayroll', null, refreshconfirmmonthpayroll);
}

const confirmmonthpayrolltodelete =()=>{
        let checked = '';
    for(i=0;i<document.getElementsByClassName('confirmmonthpayrollcheckbox').length;i++){
        if(document.getElementsByClassName('confirmmonthpayrollcheckbox')[i].checked){
            checked = 'good'
        }
    }
    if(checked == '')return callModal('No payroll has been selected for approval', 0);
    callController('approvepayroll.php', confirmmonthparmsforpersonnel("DELETE"), 'approvepayroll', null, refreshconfirmmonthpayroll);
}


function appendconfirmmonthpayrollTableRows(data, index) {
    console.log('dataaa', data)
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("confirmmonthpayrolltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td><input class="confirmmonthpayrollcheckbox" type="checkbox" id="${data.payroll.id}" ></td>
                                <td> ${data.personnel[0].firstname} </td>
                                <td> ${data.personnel[0].othernames} </td>
                                <td> ${data.personnel[0].lastname} </td>
                                <td> ${data.personnel[0].department} </td>
                                <td> ${getthelevel(data.personnel[0].levelid)??''} </td>
                                <td><input class="netpayable" value="${data.netpayable}" type="hidden"/> ${formatCurrency(data.netpayable)} </td>
                                <td> ${formatCurrency(data.payroll.totalallowance)} </td>
                                <td> ${formatCurrency(data.payroll.totaldeduction)} </td> 
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "ALLOWANCE").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "DEDUCTION").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> ${data.payroll.entrydate} </td>
                            </tr>
    `
} 


const confirmmonthpayrollparams=()=>{
    let paramstr = new FormData();
    // paramstr.append('applyattendance', document.getElementById('payrollattendance').value);
    paramstr.append('location', document.getElementById('appconbranch2').value);
    paramstr.append('month', document.getElementById('confirmmonthpayrollmonth').value);
    paramstr.append('year', document.getElementById('confirmmonthpayrollyear').value);
    return paramstr;
}

const confirmmonthsalpoplocation =(data)=>{
    document.getElementById('appconbranch2').innerHTML += `${data.data.data.map(dat=>`<option>${dat.location.toUpperCase()}</option>`)}`
}

async function oreviewmonthlysalaryschedule() { 
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('viewmonthlysalaryschedule.php', 'override')  
        
        jtabledata = document.getElementById('confirmmonthpayrolltablecontent');
        // paginationLimit = 10;
        initializePaginationParams(confirmmonthpayrollsetCurrentPage);
        callController('fetchlocation.php', null, 'fetchlocation', null, confirmmonthsalpoplocation)
        
         var currentYear = new Date().getFullYear();
        let yearspresalaryapprovalyear = [];
        yearspresalaryapprovalyear.push(currentYear-1);
        yearspresalaryapprovalyear.push(currentYear);
        yearspresalaryapprovalyear.push(currentYear+1);
        console.log(yearspresalaryapprovalyear)
        if(document.getElementById('pc-btn'))document.getElementById('pc-btn').addEventListener('click', e=>printContent('VIEW MONTHLY SALARY SCHEDULE', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'viewmonthlysalaryschedulecontainer'))
        if(document.getElementById('ec-btn'))document.getElementById('ec-btn').addEventListener('click', e=>tableToExcel('viewmonthlysalaryscheduletable', 'VIEW MONTHLY SALARY SCHEDULE'))
        document.getElementById('confirmmonthpayrollyear').innerHTML += yearspresalaryapprovalyear.map((data, index)=>`<option>${data}</option>`);
        getpersonneldataready();
        if(document.getElementById('confirmmonthsalary_submitbtn'))document.getElementById('confirmmonthsalary_submitbtn').addEventListener('click', e=>callController('fetchapprovedpayroll.php', confirmmonthpayrollparams(), 'fetchapprovedpayroll', confirmmonthsalary_field, confirmmonthpayrollepaginate),true);
        if(document.getElementById('viewmonthexport'))document.getElementById('viewmonthexport').addEventListener('click',e=>{
            tableToExcel('viewmonthtabledatafull2', `VIEW MONTHLY SALARY SCHEDULE`)},false);
        if(document.getElementById('viewmonthprint'))document.getElementById('viewmonthprint').addEventListener('click',e=>{
            printContent(`VIEW MONTHLY SALARY SCHEDULE`,`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewmonthtabledatafull2')},false);

        
}


var oreviewmonthlysalaryschedulebbtn = document.getElementById("viewmonthlysalaryschedule");
if (oreviewmonthlysalaryschedulebbtn) oreviewmonthlysalaryschedulebbtn.addEventListener("click", oreviewmonthlysalaryschedule, false);


var approvepayroll_datasource = [];
const approvepayrollepaginate=(data)=>{
    if(data.message){
        if(data.message == "Payroll calculation not successful."){
            callModal("Payroll calculation not successful.", 0);
            jtabledata.innerHTML = ''
            return;
        }
    }
    approvepayroll_datasource = [];
    approvepayroll_datasource = datasource = data.data;
    initPagination(approvepayroll_datasource, approvepayrollsetCurrentPage);
    }


var approvepayrollsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(approvepayroll_datasource.length) {
         document.getElementById("approvepayrolltablecontent").innerHTML = approvepayroll_datasource.map((data, index)=>`
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td><input class="approvepayrollcheckbox" type="checkbox" id="${data.payroll.id}" ></td>
                                <td> ${data.personnel[0].firstname} </td>
                                <td> ${data.personnel[0].lastname} </td>
                                <td> ${getthelevel(data.personnel[0].levelid)??''} </td>
                                <td><input class="netpayable" value="${data.netpayable}" type="hidden"/> ${formatCurrency(data.netpayable)} </td>
                                <td> ${formatCurrency(data.personnel[0].basicsalary)??''} </td>
                                <td> ${formatCurrency(data.payroll.totalallowance)} </td>
                                <td> ${formatCurrency(data.payroll.totaldeduction)} </td> 
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "ALLOWANCE").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "DEDUCTION").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> ${formatDate(data.payroll.entrydate)} </td>
                            </tr>`).join('')
        approvepayroll_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                // appendapprovepayrollTableRows(item, index);
            }
        })
    }
    else {
        document.getElementById("approvepayrolltablecontent").innerHTML=  renderNoTableData()
    }
    var payrollnetpayable = 0
    var payrolltotalallowance = 0 
    var payrolltotaldeduction = 0
    var personnelbasicsalary = 0
    approvepayroll_datasource.map(dat=>{
        payrollnetpayable = Number(dat.netpayable) + payrollnetpayable
        payrolltotalallowance = Number(dat.payroll.totalallowance) + payrolltotalallowance
        payrolltotaldeduction = Number(dat.payroll.totaldeduction) + payrolltotaldeduction
        personnelbasicsalary = Number(dat.personnel[0].basicsalary) + personnelbasicsalary
    })
    // for(i=0;i<document.getElementsByClassName('netpayable').length;i++){
    //     payrollnetpayable = Number(document.getElementsByClassName('netpayable')[i].value) + payrollnetpayable
    // }
    document.getElementById('payrolltotalsalaries').innerHTML = ` &#x20A6;${formatCurrency(payrollnetpayable)}`;
    document.getElementById('totalallowance').innerHTML = ` &#x20A6;${formatCurrency(payrolltotalallowance)}`;
    document.getElementById('totaldeductions').innerHTML = ` &#x20A6;${formatCurrency(payrolltotaldeduction)}`;
    // document.getElementById('totalbasicsalary').innerHTML = ` &#x20A6;${formatCurrency(personnelbasicsalary)}`;
    document.getElementById('totalbasicsalary').parentElement.style.display = 'none';
    if(document.getElementById('pmonth')){
        const selectElement = document.getElementById('payrollmonth');
const selectedOptionText = selectElement.options[selectElement.selectedIndex].textContent;
document.getElementById('pmonth').innerHTML = ` ${selectedOptionText}`
}
    if(document.getElementById('pyear'))document.getElementById('pyear').innerHTML = document.getElementById('payrollyear').value;
};

const checkallpayrolltoapprove =(state)=>{
    if(state.textContent == 'select all'){
        for(i=0;i<document.getElementsByClassName('approvepayrollcheckbox').length;i++){
            document.getElementsByClassName('approvepayrollcheckbox')[i].checked = true
        }
        state.textContent = 'deselect all';
        return
    }
    if(state.textContent == 'deselect all'){
        for(i=0;i<document.getElementsByClassName('approvepayrollcheckbox').length;i++){
            document.getElementsByClassName('approvepayrollcheckbox')[i].checked = false
        }
        state.textContent = 'select all';
        return
    }
}

const refreshapprovepayroll =()=>{
    document.getElementById('presalaryapprovebtn').click();
}

const approveparmsforpersonnel =(action)=>{
    let paramstr = new FormData();
    paramstr.append('buttonselected', action);
    let idsp = [];
     for(i=0;i<document.getElementsByClassName('approvepayrollcheckbox').length;i++){
         if(document.getElementsByClassName('approvepayrollcheckbox')[i].checked){
            idsp.push(`${document.getElementsByClassName('approvepayrollcheckbox')[i].id}`) 
         }
     }  
     for(i=0;i<idsp.length;i++){
         paramstr.append(`ids${i}`, `${idsp[i]}`);
     }
         paramstr.append(`idsize`, idsp.length);
    
    return paramstr;
}

const payrolltoapprove =()=>{
        let checked = '';
    for(i=0;i<document.getElementsByClassName('approvepayrollcheckbox').length;i++){
        if(document.getElementsByClassName('approvepayrollcheckbox')[i].checked){
            checked = 'good'
        }
    }
    if(checked == '')return callModal('No payroll has been selected for approval', 0);
    callController('approvepayroll.php', approveparmsforpersonnel("DELETE"), 'approvepayroll', null, refreshapprovepayroll);
}


function appendapprovepayrollTableRows(data, index) {
    console.log('dataaa', data)
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("approvepayrolltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td><input class="approvepayrollcheckbox" type="checkbox" id="${data.payroll.id}" ></td>
                                <td> ${data.personnel[0].firstname} </td>
                                <td> ${data.personnel[0].lastname} </td>
                                <td> ${getthelevel(data.personnel[0].levelid)??''} </td>
                                <td><input class="netpayable" value="${data.netpayable}" type="hidden"/> ${formatCurrency(data.netpayable)} </td>
                                <td> ${formatCurrency(data.personnel[0].basicsalary)??''} </td>
                                <td> ${formatCurrency(data.payroll.totalallowance)} </td>
                                <td> ${formatCurrency(data.payroll.totaldeduction)} </td> 
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "ALLOWANCE").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "DEDUCTION").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> ${formatDate(data.payroll.entrydate)} </td>
                            </tr>
    `
} 


const presalaryapprovalparams=()=>{
    let paramstr = new FormData();
    paramstr.append('applyattendance', document.getElementById('payrollattendance').value);
    paramstr.append('month', document.getElementById('payrollmonth').value);
    paramstr.append('year', document.getElementById('payrollyear').value);
    return paramstr;
}

async function orepresalaryapproval() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('presalaryapproval.php', 'override');
        
        
        jtabledata = document.getElementById('approvepayrolltablecontent');
        // paginationLimit = 10;
        initializePaginationParams(approvepayrollsetCurrentPage);
        
        var currentYear = new Date().getFullYear();
        let yearspresalaryapprovalyear = [];
        yearspresalaryapprovalyear.push(currentYear-1);
        yearspresalaryapprovalyear.push(currentYear);
        yearspresalaryapprovalyear.push(currentYear+1);
        console.log(yearspresalaryapprovalyear)
        if(document.getElementById('pc-btn'))document.getElementById('pc-btn').addEventListener('click', e=>printContent('PAYROLL', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'presalaryapprovalcontainer'))
        if(document.getElementById('ec-btn'))document.getElementById('ec-btn').addEventListener('click', e=>tableToExcel('presalaryapprovaltable', 'PAYROLL'))
        document.getElementById('payrollyear').innerHTML += yearspresalaryapprovalyear.map(data=>`<option>${data}</option>`);
        getpersonneldataready();
        if(document.getElementById('presalaryapprovebtn'))document.getElementById('presalaryapprovebtn').addEventListener('click', e=>callController('dopayroll.php', presalaryapprovalparams(), 'dopayroll', ['payrollattendance','payrollmonth','payrollyear'], approvepayrollepaginate, 'silent'),true);

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


var orepresalaryapprovalbbtn = document.getElementById("presalaryapproval");
if (orepresalaryapprovalbbtn) orepresalaryapprovalbbtn.addEventListener("click", orepresalaryapproval, false);


const confirmsalary_field = [`confirmpayrollyear`, `confirmpayrollmonth`];
var confirmpayroll_datasource = [];
const confirmpayrollepaginate=(data)=>{
    if(data.message){
        if(data.message == "Payroll calculation not successful."){
            callModal("Payroll calculation not successful.", 0);
            jtabledata.innerHTML = ''
            return;
        }
    }
    confirmpayroll_datasource = [];
    confirmpayroll_datasource = datasource = data.data;
    initPagination(confirmpayroll_datasource, confirmpayrollsetCurrentPage);
    }


var confirmpayrollsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(confirmpayroll_datasource.length) {
        console.log('confirmpayroll_datasource', confirmpayroll_datasource)
        document.getElementById("confirmpayrolltablecontent").innerHTML = confirmpayroll_datasource.map((data, index)=>`
                           <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td><input class="confirmpayrollcheckbox" type="checkbox" id="${data.payroll.id}" ></td>
                                <td> ${data.personnel[0].firstname} </td>
                                <td> ${data.personnel[0].lastname} </td>
                                <td> ${getthelevel(data.personnel[0].levelid)??''} </td>
                                <td><input class="netpayable" value="${data.netpayable}" type="hidden"/> ${formatCurrency(data.netpayable)} </td>
                                <td> ${formatCurrency(data.payroll.totalallowance)} </td>
                                <td> ${formatCurrency(data.payroll.totaldeduction)} </td> 
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "ALLOWANCE").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "DEDUCTION").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> ${data.payroll.entrydate} </td>
                            </tr>
    `).join('')
        confirmpayroll_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                // appendconfirmpayrollTableRows(item, index);
            }
        })
    }
    else {
        document.getElementById("confirmpayrolltablecontent").innerHTML=  renderNoTableData()
    }
    var payrollnetpayable = 0
    var payrolltotalallowance = 0 
    var payrolltotaldeduction = 0
    var personnelbasicsalary = 0
    confirmpayroll_datasource.map(dat=>{
        payrollnetpayable = Number(dat.netpayable) + payrollnetpayable
        payrolltotalallowance = Number(dat.payroll.totalallowance) + payrolltotalallowance
        payrolltotaldeduction = Number(dat.payroll.totaldeduction) + payrolltotaldeduction
        personnelbasicsalary = Number(dat.personnel[0].basicsalary) + personnelbasicsalary
    })
    // for(i=0;i<document.getElementsByClassName('netpayable').length;i++){
    //     payrollnetpayable = Number(document.getElementsByClassName('netpayable')[i].value) + payrollnetpayable
    // }
    document.getElementById('payrolltotalsalaries').innerHTML = ` &#x20A6;${formatCurrency(payrollnetpayable)}`;
    document.getElementById('totalallowance').innerHTML = ` &#x20A6;${formatCurrency(payrolltotalallowance)}`;
    document.getElementById('totaldeductions').innerHTML = ` &#x20A6;${formatCurrency(payrolltotaldeduction)}`;
    // document.getElementById('totalbasicsalary').innerHTML = ` &#x20A6;${formatCurrency(personnelbasicsalary)}`;
    document.getElementById('totalbasicsalary').parentElement.style.display = 'none';
    if(document.getElementById('pmonth')){
        const selectElement = document.getElementById('confirmpayrollmonth');
const selectedOptionText = selectElement.options[selectElement.selectedIndex].textContent;
document.getElementById('pmonth').innerHTML = ` ${selectedOptionText}`
}
    if(document.getElementById('pyear'))document.getElementById('pyear').innerHTML = document.getElementById('payrollyear').value;
};

const checkallconfirmpayrolltoapprove =(state)=>{
    if(state.textContent == 'select all'){
        for(i=0;i<document.getElementsByClassName('confirmpayrollcheckbox').length;i++){
            document.getElementsByClassName('confirmpayrollcheckbox')[i].checked = true
        }
        state.textContent = 'deselect all';
        return
    }
    if(state.textContent == 'deselect all'){
        for(i=0;i<document.getElementsByClassName('confirmpayrollcheckbox').length;i++){
            document.getElementsByClassName('confirmpayrollcheckbox')[i].checked = false
        }
        state.textContent = 'select all';
        return
    }
}

const refreshconfirmpayroll =()=>{
    // document.getElementById('confirmsalary_submitbtn').click();
    document.getElementById('confirmpayrolltablecontent').innerHTML = '';
}

const confirmparmsforpersonnel =(action)=>{
    let paramstr = new FormData();
    paramstr.append('buttonselected', action);
    let idsp = [];
     for(i=0;i<document.getElementsByClassName('confirmpayrollcheckbox').length;i++){
         if(document.getElementsByClassName('confirmpayrollcheckbox')[i].checked){
            idsp.push(`${document.getElementsByClassName('confirmpayrollcheckbox')[i].id}`) 
         }
     }  
     for(i=0;i<idsp.length;i++){
         paramstr.append(`ids${i}`, `${idsp[i]}`);
     }
         paramstr.append(`idsize`, idsp.length);
    
    return paramstr;
}

const confirmpayrolltoapprove =()=>{ 
        let checked = '';
    for(i=0;i<document.getElementsByClassName('confirmpayrollcheckbox').length;i++){
        if(document.getElementsByClassName('confirmpayrollcheckbox')[i].checked){
            checked = 'good'
        }
    }
    if(checked == '')return callModal('No payroll has been selected for approval', 0);
    callController('approvepayroll.php', confirmparmsforpersonnel("APPROVE"), 'approvepayroll', null, refreshconfirmpayroll);
}

const confirmpayrolltodelete = () => {
    let checked = '';
    const checkboxes = document.getElementsByClassName('confirmpayrollcheckbox');

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checked = 'good';
            break;
        }
    }

    if (checked === '') {
        return callModal('No payroll has been selected for approval', 0);
    }

    // SweetAlert2 confirmation
    Swal.fire({
        title: 'Are you sure?',
        text: "This operation will erase the calculated payroll!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, reverse it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            callController(
                'reversepayroll.php',
                confirmparmsforpersonnel("REVERSE"),
                'reversepayroll',
                null,
                refreshconfirmpayroll
            );
        }
    });
};



function appendconfirmpayrollTableRows(data, index) {
    console.log('dataaa', data)
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("confirmpayrolltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td><input class="confirmpayrollcheckbox" type="checkbox" id="${data.payroll.id}" ></td>
                                <td> ${data.personnel[0].firstname} </td>
                                <td> ${data.personnel[0].lastname} </td>
                                <td> ${getthelevel(data.personnel[0].levelid)??''} </td>
                                <td><input class="netpayable" value="${data.netpayable}" type="hidden"/> ${formatCurrency(data.netpayable)} </td>
                                <td> ${formatCurrency(data.payroll.totalallowance)} </td>
                                <td> ${formatCurrency(data.payroll.totaldeduction)} </td> 
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "ALLOWANCE").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> 
                                    <table>
                                        ${data.paydetail != null && data.paydetail.filter(dat=>dat.salaryinfotype == "DEDUCTION").map((dat, index)=>{
                                            return(`
                                                <tr>
                                                  <td>${index+1}</td> 
                                                  <td>${dat.salaryinfo}</td> 
                                                  <td>${formatCurrency(dat.amount)}</td> 
                                                </tr>
                                            `)
                                        }).join('')}
                                    </table>
                                </td>
                                <td> ${data.payroll.entrydate} </td>
                            </tr>
    `
} 


const confirmpayrollparams=()=>{
    let paramstr = new FormData();
    paramstr.append('branch', document.getElementById('appconbranch').value);
    paramstr.append('month', document.getElementById('confirmpayrollmonth').value);
    paramstr.append('year', document.getElementById('confirmpayrollyear').value);
    return paramstr;
}

const confirmsalpoplocation =(data)=>{
    document.getElementById('appconbranch').innerHTML += `${data.data.data.map(dat=>`<option value="${dat.id}">${dat.location.toUpperCase()}</option>`)}`
}
async function oreconfirmsalary() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('confirmsalary.php', 'override') ;
        
        jtabledata = document.getElementById('confirmpayrolltablecontent');
        // paginationLimit = 10;
        initializePaginationParams(confirmpayrollsetCurrentPage);
        callController('fetchlocation.php', null, 'fetchlocation', null, confirmsalpoplocation)
        
         var currentYear = new Date().getFullYear();
        let yearspresalaryapprovalyear = [];
        yearspresalaryapprovalyear.push(currentYear-1);
        yearspresalaryapprovalyear.push(currentYear);
        yearspresalaryapprovalyear.push(currentYear+1);
        console.log(yearspresalaryapprovalyear)
        if(document.getElementById('pc-btn'))document.getElementById('pc-btn').addEventListener('click', e=>printContent('APPROVE/CONFIRM PAYROLL', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'confirmsalarycontainer'))
        if(document.getElementById('ec-btn'))document.getElementById('ec-btn').addEventListener('click', e=>tableToExcel('confirmsalarytable', 'APPROVE/CONFIRM PAYROLL'))
        document.getElementById('confirmpayrollyear').innerHTML += yearspresalaryapprovalyear.map(data=>`<option>${data}</option>`);
        getpersonneldataready();
        if(document.getElementById('confirmsalary_submitbtn'))document.getElementById('confirmsalary_submitbtn').addEventListener('click', e=>callController('fetchnonapprovedpayroll.php', confirmpayrollparams(), 'fetchnonapprovedpayroll', confirmsalary_field, confirmpayrollepaginate),true);

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


var oreconfirmsalarybbtn = document.getElementById("confirmsalary");
if (oreconfirmsalarybbtn) oreconfirmsalarybbtn.addEventListener("click", oreconfirmsalary, false);

async function orepayrollclassa() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('payrollclassa.php', 'override') ;
        
        jtabledata = document.getElementById('payrollclassatablecontent');
        // paginationLimit = 10;
        initializePaginationParams(payrollclassasetCurrentPage);
        callController('fetchlocation.php', null, 'fetchlocation', null, confirmsalpoplocation)
        
         var currentYear = new Date().getFullYear();
        let yearspresalaryapprovalyear = [];
        yearspresalaryapprovalyear.push(currentYear-1);
        yearspresalaryapprovalyear.push(currentYear);
        yearspresalaryapprovalyear.push(currentYear+1);
        console.log(yearspresalaryapprovalyear)
        if(document.getElementById('pc-btn'))document.getElementById('pc-btn').addEventListener('click', e=>printContent('Payroll Class A', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'payrollclassacontainer'))
        if(document.getElementById('ec-btn'))document.getElementById('ec-btn').addEventListener('click', e=>tableToExcel('payrollclassatable', 'Payroll Class A'))
        document.getElementById('payrollclassayear').innerHTML += yearspresalaryapprovalyear.map(data=>`<option>${data}</option>`);
        getpersonneldataready();
        const payrollclassaparams=()=>{
                let paramstr = new FormData();
                paramstr.append('location', document.getElementById('appconbranch').value);
                paramstr.append('month', document.getElementById('payrollclassamonth').value);
                paramstr.append('year', document.getElementById('payrollclassayear').value);
                return paramstr;
            }
        if(document.getElementById('payrollclassa_submitbtn'))document.getElementById('payrollclassa_submitbtn').addEventListener('click', e=>callController('fetchpayrollclassa.php', payrollclassaparams(), 'fetchpayrollclassa', [], payrollclassaepaginate),true);

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

let payrollclassa_datasource = [];
const payrollclassaepaginate=(data)=>{
    if(data.message){
        if(data.message == "Payroll calculation not successful."){
            callModal("Payroll calculation not successful.", 0);
            jtabledata.innerHTML = ''
            return;
        }
    }
    payrollclassa_datasource = [];
    payrollclassa_datasource = datasource = data.data;
    initPagination(payrollclassa_datasource, payrollclassasetCurrentPage);
    }


var payrollclassasetCurrentPage = (pageNum) => {

//     currentPage = pageNum;
//     handleActivePageNumber();
//     handlePageButtonsStatus();
//     prevRange = (pageNum - 1) * paginationLimit;
//     currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(payrollclassa_datasource.length) {
        console.log('payrollclassa_datasource', payrollclassa_datasource)
        document.getElementById("payrollclassatablecontent").innerHTML = payrollclassa_datasource.map((data, index)=>`
                           <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${data.firstname??''} </td>
                                <td> ${data.lastname??''} </td>
                                <td> ${data.othernames??''} </td>
                                <td> ${data.bankaccountnumber??''} </td>
                                <td> ${data.bankname??''} </td>
                                <td> ${data.department??''} </td>
                                <td> ${formatCurrency(data.salary)??''} </td>
                                <td> ${formatCurrency(data.totaldeduction)??''} </td>
                                <td> ${formatCurrency(data.netpayable)??''} </td>
                            </tr>
    `).join('')
        payrollclassa_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                // appendpayrollclassaTableRows(item, index);
            }
        })
    }
    else {
        document.getElementById("payrollclassatablecontent").innerHTML=  renderNoTableData()
    }
    var payrolltotalnetpayables = 0
    var payrolltotalsalaries = 0
    var totaldeductions = 0
    payrollclassa_datasource.map(dat=>{
        payrolltotalnetpayables = Number(dat.netpayable) + payrolltotalnetpayables
        payrolltotalsalaries = Number(dat.salary) + payrolltotalsalaries
        totaldeductions = Number(dat.totaldeduction) + totaldeductions
    })
    // for(i=0;i<document.getElementsByClassName('netpayable').length;i++){
    //     payrollnetpayable = Number(document.getElementsByClassName('netpayable')[i].value) + payrollnetpayable
    // }
    document.getElementById('payrolltotalnetpayables').innerHTML = ` &#x20A6;${formatCurrency(payrolltotalnetpayables)}`;
    document.getElementById('payrolltotalsalaries').innerHTML = ` &#x20A6;${formatCurrency(payrolltotalsalaries)}`;
    document.getElementById('totaldeductions').innerHTML = ` &#x20A6;${formatCurrency(totaldeductions)}`;
    if(document.getElementById('pmonth')){
        const selectElement = document.getElementById('payrollclassamonth');
const selectedOptionText = selectElement.options[selectElement.selectedIndex].textContent;
document.getElementById('pmonth').innerHTML = ` ${selectedOptionText}`
}
    if(document.getElementById('pyear'))document.getElementById('pyear').innerHTML = ` ${document.getElementById('payrollclassayear').value}`;
};



var orepayrollclassabbtn = document.getElementById("payrollclassa");
if (orepayrollclassabbtn) orepayrollclassabbtn.addEventListener("click", orepayrollclassa, false);


async function orepayrollclassb() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('payrollclassb.php', 'override') ;
        
        jtabledata = document.getElementById('payrollclassbtablecontent');
        // paginationLimit = 10;
        initializePaginationParams(payrollclassbsetCurrentPage);
        callController('fetchlocation.php', null, 'fetchlocation', null, confirmsalpoplocation)
        
         var currentYear = new Date().getFullYear();
        let yearspresalaryapprovalyear = [];
        yearspresalaryapprovalyear.push(currentYear-1);
        yearspresalaryapprovalyear.push(currentYear);
        yearspresalaryapprovalyear.push(currentYear+1);
        console.log(yearspresalaryapprovalyear)
        if(document.getElementById('pc-btn'))document.getElementById('pc-btn').addEventListener('click', e=>printContent('Payroll Class B', '<link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">', 'payrollclassbcontainer'))
        if(document.getElementById('ec-btn'))document.getElementById('ec-btn').addEventListener('click', e=>tableToExcel('payrollclassbtable', 'Payroll Class B'))
        document.getElementById('payrollclassbyear').innerHTML += yearspresalaryapprovalyear.map(data=>`<option>${data}</option>`);
        getpersonneldataready();
        const payrollclassbparams=()=>{
                let paramstr = new FormData();
                paramstr.append('location', document.getElementById('appconbranch').value);
                paramstr.append('month', document.getElementById('payrollclassbmonth').value);
                paramstr.append('year', document.getElementById('payrollclassbyear').value);
                return paramstr;
            }
        if(document.getElementById('payrollclassb_submitbtn'))document.getElementById('payrollclassb_submitbtn').addEventListener('click', e=>callController('fetchpayrollclassb.php', payrollclassbparams(), 'fetchpayrollclassb', [], payrollclassbepaginate),true);

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

let payrollclassb_datasource = [];
const payrollclassbepaginate=(data)=>{
    if(data.message){
        if(data.message == "Payroll calculation not successful."){
            callModal("Payroll calculation not successful.", 0);
            jtabledata.innerHTML = ''
            return;
        }
    }
    payrollclassb_datasource = [];
    payrollclassb_datasource = datasource = data.data;
    initPagination(payrollclassb_datasource, payrollclassbsetCurrentPage);
    }


var payrollclassbsetCurrentPage = (pageNum) => {

//     currentPage = pageNum;
//     handleActivePageNumber();
//     handlePageButtonsStatus();
//     prevRange = (pageNum - 1) * paginationLimit;
//     currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(payrollclassb_datasource.length) {
        console.log('payrollclassb_datasource', payrollclassb_datasource)
        document.getElementById("payrollclassbtablecontent").innerHTML = payrollclassb_datasource.map((data, index)=>`
                           <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${data.firstname??''} </td>
                                <td> ${data.lastname??''} </td>
                                <td> ${data.othernames??''} </td>
                                <td> ${data.bankaccountnumber??''} </td>
                                <td> ${data.bankname??''} </td>
                                <td> ${data.department??''} </td>
                                <td> ${formatCurrency(data.totalallowance)??''} </td>
                                <td> ${formatCurrency(data.netpayable)??''} </td>
                            </tr>
    `).join('')
        payrollclassb_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                // appendpayrollclassbTableRows(item, index);
            }
        })
    }
    else {
        document.getElementById("payrollclassbtablecontent").innerHTML=  renderNoTableData()
    }
    var payrolltotalnetpayables = 0
    var totaldeductions = 0
    payrollclassb_datasource.map(dat=>{
        payrolltotalnetpayables = Number(dat.netpayable) + payrolltotalnetpayables
        totaldeductions = Number(dat.totalallowance) + totaldeductions
    })
    // for(i=0;i<document.getElementsByClassName('netpayable').length;i++){
    //     payrollnetpayable = Number(document.getElementsByClassName('netpayable')[i].value) + payrollnetpayable
    // }
    document.getElementById('payrolltotalnetpayables').innerHTML = ` &#x20A6;${formatCurrency(payrolltotalnetpayables)}`;
    document.getElementById('totaldeductions').innerHTML = ` &#x20A6;${formatCurrency(totaldeductions)}`;
    if(document.getElementById('pmonth')){
        const selectElement = document.getElementById('payrollclassbmonth');
const selectedOptionText = selectElement.options[selectElement.selectedIndex].textContent;
document.getElementById('pmonth').innerHTML = ` ${selectedOptionText}`
}
    if(document.getElementById('pyear'))document.getElementById('pyear').innerHTML = document.getElementById('payrollclassbyear').value;
};



var orepayrollclassbbbtn = document.getElementById("payrollclassb");
if (orepayrollclassbbbtn) orepayrollclassbbbtn.addEventListener("click", orepayrollclassb, false);

const promotions_field = [
            `promotions_personnel`,
            `promotions_entrydate`,
            `promotions_title`,
            `promotions_level`,
            ]
let compensationOpen = false
let prompersonnelid = [];
let prompersonnel = [];
let prompersonnellevelid = [];
let prompersonnellevel = [];
let prompersonnelvalue = ''

const popstaffcompensationpromotion =(open)=>{
    if(document.getElementById('promotions_personnel'))document.getElementById('promotions_personnel').value == '' ? document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = '0px' : null;
    setTimeout(()=>{
    if(document.getElementById('promotions_personnel'))document.getElementById('promotions_personnel').value == '' ? document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = '0px' : null;
    },2000)
    if(prompersonnelvalue == ''){
        document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = '0px';
    }else{
        const promotionsstaffcomparams=()=>{
                    var paramstr = new FormData();
    		
            		paramstr.append('personnelid', prompersonnelvalue);
            		
            	    return paramstr;
            
            	};
        const popscsectionprom =(result)=>{
            document.getElementById('promotionpersonelbasicsalary').value = result.data[0].personnel.basicsalary;
            document.getElementById('promotionsallowance').innerHTML = result.data[0].salarystructure.map((dat, index)=>{
                if(index == 0)document.getElementById('promotionallowancename0').value = dat.salaryinfo
                if(index == 0)document.getElementById('promotionallowancepercent0').value = dat.amountpercentage
                if(dat.salaryinfotype == "ALLOWANCE" && index != 0)return(`
                    <div name="allowancepersonnelcontainer">
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <input value="${dat.salaryinfo}" class="jformcontrol allowancename jmargin-top promvrfy" type="text" id="${Date.now()}promallowance" placeholder="Allowance name" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <input value="${dat.amountpercentage}" class="jformcontrol allowancepercent jmargin-top promvrfy" type="text" id="${Date.now()}prompercentage" placeholder="Percentage %" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <div id="" style="font-size: small;margin-left:0px" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                            </div>
                        </div>
                    </div>
                `)
            }).join("");
            document.getElementById('promotionsdeduction').innerHTML = result.data[0].salarystructure.map((dat, index)=>{
                if(index == 0)document.getElementById('promotiondeductionname0').value = dat.salaryinfo
                if(index == 0)document.getElementById('promotiondeductionpercent0').value = dat.amountpercentage
                if(dat.salaryinfotype == "ALLOWANCE" && index != 0)return(`
                    <div name="allowancepersonnelcontainer">
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <input value="${dat.salaryinfo}" class="jformcontrol deductionname jmargin-top promvrfy" type="text" id="${Date.now()}promallowance" placeholder="Deduction name" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <input value="${dat.amountpercentage}" class="jformcontrol deductionpecent jmargin-top promvrfy" type="text" id="${Date.now()}prompercentage" placeholder="Percentage %" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <div id="" style="font-size: small;margin-left:0px" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                            </div>
                        </div>
                    </div>
                `)
            }).join("");
               if(open)document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = document.getElementById('promotionstaffcompensation').nextElementSibling.scrollHeight + 'px';
            setTimeout(()=>{
               if(open)document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = 'fit-content';
                },2000)
        }
        callController('fetchpersonnels.php', promotionsstaffcomparams(), 'fetchpersonnels', null, popscsectionprom, 'silent');
    }
    
}

const checkprompersonnel =(state)=>{
        popstaffcompensationpromotion()
        if(prompersonnel.includes(`${state.value}`)){
            prompersonnelvalue = prompersonnelid[prompersonnel.indexOf(`${state.value}`)];
            console.log('prompersonnelvalue', prompersonnelvalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
    const popprolevel=(result)=>{
        document.getElementById('promotions_level').innerHTML = `<option value=""> --select level-- </option>`
	    document.getElementById('promotions_level').innerHTML += result.data.map(data=>{
	        prompersonnellevelid.push(data.level.id);
	        prompersonnellevel.push(data.level.level);
	        return(`
	            <option value="${data.level.id}"> ${data.level.level.toUpperCase()} </option>
	        `)
	    })
	}
const checkprompersonnelid =(state)=>{
        if(prompersonnelid.includes(`${state}`)){
            return prompersonnel[prompersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const checkprompersonnellevelid =(state)=>{
        if(prompersonnellevelid.includes(`${state}`)){
            return prompersonnellevel[prompersonnellevelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const popperpromdlis =(result)=>{ 
   if(document.getElementById('promotionspersonnelnames'))document.getElementById('promotionspersonnelnames').innerHTML = result.data.map(data=>{
       prompersonnelid.push(data.personnel.staffid);
       prompersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var promotionspersonnel_datasource = [];

const promotionspersonnelepaginate=(data)=>{
    promotionspersonnel_datasource = [];
    promotionspersonnel_datasource = data.data;
    initPagination(promotionspersonnel_datasource, promotionspersonnelsetCurrentPage);
    }


var promotionspersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(promotionspersonnel_datasource.length) {
        promotionspersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendpromotionspersonnelTableRows(item, index)
            }
        })
        // if(document.promotionsSelector('#promotionspersonneltablecontent tbody').innerHTML === '') orepromotionsbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("promotionspersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const promotionspopulate =(id)=>{
     let data = promotionspersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('id').value = data[0].id;
     document.getElementById('promotions_personnel').value = checkprompersonnelid(data[0].pid);
     document.getElementById('promotions_entrydate').value = data[0].entrydate;
     document.getElementById('promotions_level').value = data[0].level;
     document.getElementById('promotions_title').value = data[0].title;
     document.getElementById('promotionspreview').innerHTML = '';
     if(data[0].doc !== '-'){
         const img = document.createElement("img");
        img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
        img.setAttribute('id', `promotions-file`)
        document.getElementById('promotionspreview').appendChild(img);
        img.src = `../images/personnel/${data[0].document}`; 
        img.onload = function() { URL.revokeObjectURL(img.src) }
     }
     document.getElementById('promotions_submitbtn').textContent = 'Update';
}

const goproback=()=>{
            callDialog()
            document.getElementById("promotions").click();
        }
const promotionsperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const promotionsdelete =(id, person, promotions)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${promotions.toUpperCase()} as a promotions entry for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removepersonnelmatter.php', promotionsperdeleteparams(${id}), 'removepersonnelmatter', null, goproback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }



function appendpromotionspersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("promotionspersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checkprompersonnelid(data.pid)} </td>
                                <td> ${checkprompersonnellevelid(data.level)} </td>
                                <td> ${data.title} </td>
                                <td> ${data.entrydate} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="promotionspopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="promotionsdelete(${data.id}, '${checkprompersonnelid(data.pid)}', '${checkprompersonnellevelid(data.level)} --> ${data.title}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 




function promotionsFormData() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'PROMOTION')
    paramstr.append('pid', prompersonnelvalue)
    paramstr.append('entrydate', document.getElementById('promotions_entrydate').value);
    paramstr.append('title', document.getElementById('promotions_title').value);
    paramstr.append('level', document.getElementById('promotions_level').value);
    if(compensationOpen == true){
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
    }
    
        try{
	 paramstr.append('photofilename',document.getElementById('promotions_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('promotions_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function promotionsFormDataupdate() {
    
    let paramstr = new FormData();
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('personnelmatter', 'PROMOTION')
    paramstr.append('pid', prompersonnelvalue)
    paramstr.append('entrydate', document.getElementById('promotions_entrydate').value);
    paramstr.append('title', document.getElementById('promotions_title').value);
    paramstr.append('level', document.getElementById('promotions_level').value);
    if(compensationOpen == true){
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
    }
    
        try{
	 paramstr.append('photofilename',document.getElementById('promotions_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('promotions_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function promotionsFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'promotion')
        if(document.getElementById('promotionsPPIDD'))paramstr.append('personnelid', document.getElementById('promotionsPPIDD').value);
   
    return paramstr
}
function clearpromotionsinputs() {
    
    document.getElementById('promotions_personnel').value = '';
    document.getElementById('promotions_entrydate').value = '';
    document.getElementById('promotions_title').value = '';
    document.getElementById('promotions_level').value = '';
        try{
	 document.getElementById('promotions_file').files = null;
    }catch(ex){
   }
}

const rerunpromotions =()=>{
    document.getElementById('promotions_submitbtn').textContent = 'Submit';
    document.getElementById("promotions").click();
}

const promotionsloadimg=(objfile)=>{
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `promotions-file`)
                document.getElementById('promotionspreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function orepromotions() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('promotions.php', 'override')  
        
        jtabledata = document.getElementById('promotionspersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popperpromdlis, 'silent');
        callController('fetchlevel.php', null, 'fetchlevel', null,  popprolevel, 'silent');
        if(document.getElementById('promotionaddallowance')){
	    document.getElementById('promotionaddallowance').addEventListener('click', e=>{
	        let eleh = document.createElement('div');deposits
        eleh.setAttribute('name', 'allowancepersonnelcontainer');
        let x = `
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <input class="jformcontrol jmargin-top promvrfy allowancename" type="text" id="${Date.now()}allowanceamount" placeholder="Allowance name" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <input class="jformcontrol jmargin-top promvrfy allowancepercent" type="number" id="${Date.now()}allowpercent" placeholder="Percentage %" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                             <div id="" style="font-size: small;margin-left:0px" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                        </div>
                    </div>
                `
        let elem = eleh.innerHTML = x;        
        document.getElementById('promotionsallowance').append(eleh);
        	    }, true)
        	}
        	if(document.getElementById('promotionadddeduction')){
	    document.getElementById('promotionadddeduction').addEventListener('click', e=>{
	        let eleh = document.createElement('div');
        eleh.setAttribute('name', 'allowancepersonnelcontainer');
        let x = `
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <input class="jformcontrol jmargin-top promvrfy deductionname" type="text" id="${Date.now()}deductamount" placeholder="Deductions name" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <input class="jformcontrol jmargin-top promvrfy deductionpecent" type="number" id="${Date.now()}deductpercent" placeholder="Percentage %" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                             <div id="" style="font-size: small;margin-left:0px" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                        </div>
                    </div>
                `
        let elem = eleh.innerHTML = x;        
        document.getElementById('promotionsdeduction').append(eleh);
        	    }, true)
        	}
        if(document.getElementById('promotions_submitbtn'))document.getElementById('promotions_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('promotions_submitbtn').textContent == 'Submit'){
                if(compensationOpen == true){
                    callController('personnelmatterscript.php', promotionsFormData(), 'personnelmatterscript', getallid('promvrfy'), rerunpromotions,);
                }else{
                    callController('personnelmatterscript.php', promotionsFormData(), 'personnelmatterscript', getallid('promvrfy2'), rerunpromotions,);
                }
            }else{
                if(compensationOpen == true){
                    checkprompersonnel(document.getElementById('promotions_personnel'));
                    callController('personnelmatterscript.php', promotionsFormDataupdate(), 'personnelmatterscript', getallid('promvrfy'), rerunpromotions,);
                }else{
                    checkprompersonnel(document.getElementById('promotions_personnel'));
                    callController('personnelmatterscript.php', promotionsFormDataupdate(), 'personnelmatterscript', getallid('promvrfy2'), rerunpromotions,);
                }
            }
            // clearpromotionsinputs()
        },true);
        // STAFF CONPENSATION FUNCTION
        if(document.getElementById('promotionstaffcompensation'))document.getElementById('promotionstaffcompensation').addEventListener('click', e=>{
            if(!validateInputsComponent(['promotions_personnel']))return;
            if(document.getElementById('promotionstaffcompensation').nextElementSibling.style.height == '0px'){
                compensationOpen = true
                popstaffcompensationpromotion('open');
            }else{
                compensationOpen = false
                document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = '0px';
            }
            setTimeout(()=>{
                if(!validateInputsComponent(['promotions_personnel'])){
                    compensationOpen = false
                    document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = '0px';
                }
            }, 2000)
        })
        setTimeout(()=>{
            if(sessionStorage.getItem('viewpersonnelpromotionsfunct')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonnelpromotionsfunct'));
                const promotionsparams=()=>{
                    var paramstr = new FormData();
    		
            		paramstr.append('personnelmatter', 'promotion');
            		paramstr.append('personnelid', personnelsessiondata[0].personnel.staffid);
            		
            	    return paramstr;
            
            	};
                //  FOR promotions TABLE SINGLE PERSONNEL
                callController('fetchpersonnelmatters.php', promotionsparams(), 'SINGLEfetchpersonnelmatters', null, promotionspersonnelepaginate, 'silent');
                document.getElementById('promotions_personnel').value = checkprompersonnelid(personnelsessiondata[0].personnel.staffid);
                document.getElementById('promotions_level').value = personnelsessiondata[0].personnel.levelid;
                prompersonnelvalue = personnelsessiondata[0].personnel.staffid;
                document.getElementById('promotions_personnel').setAttribute('readonly', true);
                document.getElementsByClassName('oremainheader')[0].innerHTML = `PROMOTION <br><span style="color:green;text-transform:uppercase">[${checkprompersonnelid(prompersonnelvalue)}]</span><input id="promotionsPPIDD" type="hidden" value="${personnelsessiondata[0].personnel.staffid}"/>`;
                // document.getElementById('qualificationnname').value = personnelsessiondata[0].qualificationnname ? personnelsessiondata[0].qualificationnname : '';
                sessionStorage.removeItem('viewpersonnelpromotionsfunct');
             }else{
                //  FOR promotions TABLE ALL PERSONNEL
                callController('fetchpersonnelmatters.php', promotionsFormDatatable(), 'ALLfetchpersonnelmatters', null, promotionspersonnelepaginate, 'silent');
                if(document.getElementById('promotionsPPIDD')){
                    document.getElementById('promotions_personnel').value = checkprompersonnelid(document.getElementById('promotionsPPIDD').value);
                    document.getElementById('promotions_personnel').setAttribute('readonly', true)
                }else{
                    document.getElementById('promotions_personnel').removeAttribute('readonly')  
                }
             }
             popstaffcompensationpromotion();
        },1000)

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


var orepromotionsbbtn = document.getElementById("promotions");
if (orepromotionsbbtn) orepromotionsbbtn.addEventListener("click", orepromotions, false);





//     const popprolevel=(result)=>{
// 	    document.getElementById('promotionslevel').innerHTML += result.data.data.map(data=>{
// 	        return(`
// 	            <option value="${data.id}"> ${data.level.toUpperCase()} </option>
// 	        `)
// 	    })
// 	}
// callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popperpromdlis, 'silent');


const referees_field = [
            `referees_personnel`,
            `referees_name`,
            `referees_occupation`,
            `referees_address`,
            `referees_phonenumber`,
            `referees_relationship`,
            ]
            
let refpersonnelid = [];
let refpersonnel = [];
let refpersonnelvalue = ''
const checkrefpersonnel =(state)=>{
        console.log('detected', state)
        if(refpersonnel.includes(`${state.value}`)){
            refpersonnelvalue = refpersonnelid[refpersonnel.indexOf(`${state.value}`)];
            console.log('refpersonnelvalue', refpersonnelvalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
const checkrefpersonnelid =(state)=>{
        console.log('detected', state)
        if(refpersonnelid.includes(`${state}`)){
            return refpersonnel[refpersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const poprefdlis =(result)=>{
   if(document.getElementById('refereespersonnelnames'))document.getElementById('refereespersonnelnames').innerHTML = result.data.map(data=>{
       refpersonnelid.push(data.personnel.staffid);
       refpersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var refereespersonnel_datasource = [];

const refereespersonnelepaginate=(data)=>{
    refereespersonnel_datasource = [];
    refereespersonnel_datasource = data.data;
    initPagination(refereespersonnel_datasource, refereespersonnelsetCurrentPage);
    }


var refereespersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(refereespersonnel_datasource.length) {
        refereespersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendrefereespersonnelTableRows(item, index)
            }
        })
        // if(document.refereesSelector('#refereespersonneltablecontent tbody').innerHTML === '') orerefereesbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("refereespersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const refereespopulate =(id)=>{
     let data = refereespersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('id').value = data[0].id;
     document.getElementById('referees_personnel').value = checkguapersonnelid(data[0].staffid);
     document.getElementById('referees_name').value = data[0].fullname;
     document.getElementById('referees_occupation').value = data[0].occupation;
     document.getElementById('referees_address').value = data[0].address;
     document.getElementById('referees_phonenumber').value = data[0].phonenumber;
     document.getElementById('referees_relationship').value = data[0].relationship;
     document.getElementById('refereespreview').innerHTML = '';
     if(data[0].doc !== '-'){
     const img = document.createElement("img");
    img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
    img.setAttribute('id', `termination-file`)
    document.getElementById('refereespreview').appendChild(img);
    img.src = `../images/personnel/${data[0].doc}`; 
    img.onload = function() { URL.revokeObjectURL(img.src) }
     }
     document.getElementById('referees_submitbtn').textContent = 'Update';
     
}

const gorefback=()=>{
            callDialog()
            document.getElementById("referees").click();
        }
const refereeperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const refereedelete =(id, person, referee)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${referee.toUpperCase()} as a referee for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removereferee.php', refereeperdeleteparams(${id}), 'removereferee', null, gorefback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }


function appendrefereespersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("refereespersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checkrefpersonnelid(data.staffid)} </td>
                                <td> ${data.fullname} </td>
                                <td> ${data.relationship} </td>
                                <td> ${data.occupation} </td>
                                <td> ${data.phonenumber} </td>
                                <td> ${data.address} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="refereespopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="refereedelete(${data.id}, '${checkrefpersonnelid(data.staffid)}', '${data.fullname}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 




function refereesFormData() {
    
    let paramstr = new FormData();
    // paramstr.append('personnelmatter', 'referees')
    paramstr.append('staffid', refpersonnelvalue)
    paramstr.append('fullname', document.getElementById('referees_name').value);
    paramstr.append('occupation', document.getElementById('referees_occupation').value);
    paramstr.append('address', document.getElementById('referees_address').value);
    paramstr.append('phonenumber', document.getElementById('referees_phonenumber').value);
    paramstr.append('relationship', document.getElementById('referees_relationship').value);
        try{
	 paramstr.append('photofilename',document.getElementById('referees_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('referees_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function refereesFormDataupdate() {
    
    let paramstr = new FormData();
    // paramstr.append('personnelmatter', 'referees')
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('staffid', refpersonnelvalue)
    paramstr.append('fullname', document.getElementById('referees_name').value);
    paramstr.append('occupation', document.getElementById('referees_occupation').value);
    paramstr.append('address', document.getElementById('referees_address').value);
    paramstr.append('phonenumber', document.getElementById('referees_phonenumber').value);
    paramstr.append('relationship', document.getElementById('referees_relationship').value);
        try{
	 paramstr.append('photofilename',document.getElementById('referees_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('referees_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function refereesFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'REFEREES')
   
    return paramstr
}

const rerunreferees =()=>{
    document.getElementById("referees_submitbtn").textContent = 'Submit';
    clearAllInputs(referees_field);
    document.getElementById("referees").click();
}

const refereesloadimg=(objfile)=>{ 
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `termination-file`)
                document.getElementById('refereespreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function orereferees() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('referees.php', 'override')  
        
        jtabledata = document.getElementById('refereespersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, poprefdlis, 'silent');
        if(document.getElementById('referees_submitbtn'))document.getElementById('referees_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('referees_submitbtn').textContent == 'Submit'){
                callController('refereescript.php', refereesFormData(), 'refereescript', referees_field, rerunreferees)
            }else{
                callController('refereescript.php', refereesFormDataupdate(), 'refereescript', referees_field, rerunreferees)
            }
            
        },true)
            
        
        
        setTimeout(()=>{
            if(sessionStorage.getItem('viewpersonnelrefereesfunct')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonnelrefereesfunct'));
                console.log('personnelsessiondata', personnelsessiondata[0], personnelsessiondata)
                const refereesparams=()=>{
                    var paramstr = new FormData();
    		
            // 		paramstr.append('personnelmatter', 'referees');
            		if(personnelsessiondata[0].personnel.staffid)paramstr.append('staffid', personnelsessiondata[0].personnel.staffid);
            
            	    return paramstr;
            
            	};
                //  FOR referees TABLE SINGLE PERSONNEL
                callController('fetchreferees.php', refereesparams(), 'fetchreferees', null, refereespersonnelepaginate, 'silent');
                document.getElementById('referees_personnel').value = checkrefpersonnelid(personnelsessiondata[0].personnel.staffid);
                refpersonnelvalue = personnelsessiondata[0].personnel.staffid;
                document.getElementById('referees_personnel').setAttribute('readonly', true)
                document.getElementsByClassName('oremainheader')[0].innerHTML = `REFEREE <br><span style="color:green;text-transform:uppercase">[${checkrefpersonnelid(personnelsessiondata[0].personnel.staffid)}]</span><input id="refereesPPIDD" type="hidden" value="${refpersonnelvalue}"/>`;
                // document.getElementById('qualificationnname').value = personnelsessiondata[0].qualificationnname ? personnelsessiondata[0].qualificationnname : '';
                sessionStorage.removeItem('viewpersonnelrefereesfunct')
             }else{
                //  FOR referees TABLE ALL PERSONNEL
                const refereesparams=()=>{
                    var paramstr = new FormData();
                    
    		        if(document.getElementById('refereesPPIDD'))paramstr.append('staffid', document.getElementById('refereesPPIDD').value);
            // 		paramstr.append('personnelmatter', 'referees');
            		return paramstr;
            		
            	    
            
            	};
                // callController('fetchreferees.php', refereesFormDatatable(), 'fetchreferees', null, refereespersonnelepaginate, 'silent');
                callController('fetchreferees.php', refereesparams(), 'fetchreferees', null, refereespersonnelepaginate, 'silent');
                if(document.getElementById('refereesPPIDD')){
                    document.getElementById('referees_personnel').value = checkrefpersonnelid(document.getElementById('refereesPPIDD').value);
                    document.getElementById('referees_personnel').setAttribute('readonly', true)
                }else{
                    document.getElementById('referees_personnel').removeAttribute('readonly')  
                }
             }
        },1000)

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


var orerefereesbbtn = document.getElementById("referees");
if (orerefereesbbtn) orerefereesbbtn.addEventListener("click", e=>orereferees(), false);



const warning_field = [
            `warning_personnel`,
            `warning_entrydate`,
            `warning_title`,
            // `warning_startdate`,
            // `warning_enddate`,
            ]
            
let warnpersonnelid = [];
let warnpersonnel = [];
let warnpersonnelvalue = ''
const checkwarnpersonnel =(state)=>{
        console.log('detected', state)
        if(warnpersonnel.includes(`${state.value}`)){
            warnpersonnelvalue = warnpersonnelid[warnpersonnel.indexOf(`${state.value}`)];
            console.log('warnpersonnelvalue', warnpersonnelvalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
const checkwarnpersonnelid =(state)=>{
        console.log('detected', state)
        if(warnpersonnelid.includes(`${state}`)){
            return warnpersonnel[warnpersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const popperwarndlis =(result)=>{
   if(document.getElementById('warningpersonnelnames'))document.getElementById('warningpersonnelnames').innerHTML = result.data.map(data=>{
       warnpersonnelid.push(data.personnel.staffid);
       warnpersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var warningpersonnel_datasource = [];

const warningpersonnelepaginate=(data)=>{
    warningpersonnel_datasource = [];
    warningpersonnel_datasource = data.data;
    initPagination(warningpersonnel_datasource, warningpersonnelsetCurrentPage);
    }


var warningpersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(warningpersonnel_datasource.length) {
        warningpersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendwarningpersonnelTableRows(item, index)
            }
        })
        // if(document.warningSelector('#warningpersonneltablecontent tbody').innerHTML === '') orewarningbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("warningpersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const warningpopulate =(id)=>{
     let data = warningpersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('id').value = data[0].id;
     document.getElementById('warning_personnel').value = checkwarnpersonnelid(data[0].pid);
     document.getElementById('warning_entrydate').value = data[0].entrydate;
     document.getElementById('warning_title').value = data[0].title;
    //  document.getElementById('warning_startdate').value = data[0].startdate;
    //  document.getElementById('warning_enddate').value = data[0].enddate;
     document.getElementById('warningpreview').innerHTML = '';
     if(data[0].doc !== '-'){
     const img = document.createElement("img");
    img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
    img.setAttribute('id', `warning-file`)
    document.getElementById('warningpreview').appendChild(img);
    img.src = `../images/personnel/${data[0].document}`; 
    img.onload = function() { URL.revokeObjectURL(img.src) }
     }
     document.getElementById('warning_submitbtn').textContent = 'Update';
}

const gowarback=()=>{
            callDialog()
            document.getElementById("warning").click();
        }
const warningperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const warningdelete =(id, person, warning)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${warning.toUpperCase()} as a warning entry for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removepersonnelmatter.php', warningperdeleteparams(${id}), 'removepersonnelmatter', null, gowarback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }


function appendwarningpersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("warningpersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checkwarnpersonnelid(data.pid)} </td>
                                <td> ${data.entrydate} </td>
                                <td> ${data.title} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="warningpopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="warningdelete(${data.id}, '${checkwarnpersonnelid(data.pid)}', '${data.title}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 




function warningFormData() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'WARNING')
    paramstr.append('pid', warnpersonnelvalue)
    paramstr.append('entrydate', document.getElementById('warning_entrydate').value);
    paramstr.append('title', document.getElementById('warning_title').value);
    // paramstr.append('startdate', document.getElementById('warning_startdate').value);
    // paramstr.append('enddate', document.getElementById('warning_enddate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('warning_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('warning_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function warningFormDataupdate() {
    
    let paramstr = new FormData();
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('personnelmatter', 'WARNING')
    paramstr.append('pid', warnpersonnelvalue)
    paramstr.append('entrydate', document.getElementById('warning_entrydate').value);
    paramstr.append('title', document.getElementById('warning_title').value);
    // paramstr.append('startdate', document.getElementById('warning_startdate').value);
    // paramstr.append('enddate', document.getElementById('warning_enddate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('warning_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('warning_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function warningFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'WARNING')
        if(document.getElementById('warningPPIDD'))paramstr.append('personnelid', document.getElementById('warningPPIDD').value);

   
    return paramstr
}
function clearwarninginputs() {
    
    document.getElementById('warning_entrydate').value = '';
    document.getElementById('warning_title').value = '';
    // document.getElementById('warning_startdate').value = '';
    // document.getElementById('warning_enddate').value = '';
        try{
	 document.getElementById('warning_file').files = null;
    }catch(ex){
   }
}

const rerunwarning =()=>{
    document.getElementById('warning_submitbtn').textContent = 'Update';
    document.getElementById("warning").click();
}

const warningloadimg=(objfile)=>{
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `warning-file`)
                document.getElementById('warningpreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function orewarning() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('warning.php', 'override')  
        
        jtabledata = document.getElementById('warningpersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popperwarndlis, 'silent');
        if(document.getElementById('warning_submitbtn'))document.getElementById('warning_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('warning_personnel').textContent == 'Submit'){
                callController('personnelmatterscript.php', warningFormData(), 'personnelmatterscript', warning_field, rerunwarning,);
                clearwarninginputs()
            }else{
                checkwarnpersonnel(document.getElementById('warning_personnel'));
                callController('personnelmatterscript.php', warningFormDataupdate(), 'personnelmatterscript', warning_field, rerunwarning,);
                clearwarninginputs();
            }
        },true);
        
        setTimeout(()=>{
            if(sessionStorage.getItem('viewpersonnelwarningfunct')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonnelwarningfunct'));
                const warningparams=()=>{
                    var paramstr = new FormData();
    		
            		paramstr.append('personnelmatter', 'WARNING');
            		paramstr.append('personnelid', personnelsessiondata[0].personnel.staffid);
            		
            	    return paramstr;
            
            	};
                //  FOR warning TABLE SINGLE PERSONNEL
                callController('fetchpersonnelmatters.php', warningparams(), 'SINGLEfetchpersonnelmatters', null, warningpersonnelepaginate, 'silent');
                document.getElementById('warning_personnel').value = checkwarnpersonnelid(personnelsessiondata[0].personnel.staffid);
                warnpersonnelvalue = personnelsessiondata[0].personnel.staffid;
                document.getElementById('warning_personnel').removeAttribute('readonly')
                document.getElementsByClassName('oremainheader')[0].innerHTML = `WARNING <br><span style="color:green;text-transform:uppercase">[${checkwarnpersonnelid(warnpersonnelvalue)}]</span><input id="warningPPIDD" type="hidden" value="${personnelsessiondata[0].personnel.staffid}"/>`;
                // document.getElementById('qualificationnname').value = personnelsessiondata[0].qualificationnname ? personnelsessiondata[0].qualificationnname : '';
                sessionStorage.removeItem('viewpersonnelwarningfunct')
             }else{
                //  FOR warning TABLE ALL PERSONNEL
                callController('fetchpersonnelmatters.php', warningFormDatatable(), 'ALLfetchpersonnelmatters', null, warningpersonnelepaginate, 'silent');
                if(document.getElementById('warningPPIDD')){
                    document.getElementById('warning_personnel').value = checkwarnpersonnelid(document.getElementById('warningPPIDD').value);
                    document.getElementById('warning_personnel').setAttribute('readonly', true)
                }else{
                    document.getElementById('warning_personnel').removeAttribute('readonly')  
                }
             }
        },1000)

        //YOUR VARIABLES STAYS HERE
        // const statementAccountNumber = document.getElementById('smacc')
        // const statementStartDate = document.getElementById('smsd');
        
        //ALWAYS CHECK BEFORE ADDING EVENTLISTENER
        // if(loadstatementbtn) loadstatementbtn.addEventListener('click', () => loadStatement());
        
        //TO CALL AND HIDE SPINNER WHEN NEEDED
        // showSpinner();
        // hideSpinner()
        
       // THE REST OF YOUR CODE GOES HERE
       
       //THANKS
        
}


var orewarningbbtn = document.getElementById("warning");
if (orewarningbbtn) orewarningbbtn.addEventListener("click", orewarning, false);


async function orepersonnelhistory(){
    await httpRequest('personnelhistory.php', 'override') 
    if(document.getElementById('personnelhistorypdf'))document.getElementById('personnelhistorypdf').addEventListener('click',e=>{
        const element = document.getElementById('personnelhistorycontainer');
    html2pdf()
        .from(element)
        .save();
    })
    if(document.getElementById('personnelhistoryprint'))document.getElementById('personnelhistoryprint').addEventListener('click',e=>{
            printContent('HOW TO GROW (Personnel History)',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'personnelhistorycontainer')},false);
    function action(data){
        if(document.getElementById('personnelhistorynamedatalist').innerHTML === ''){
            document.getElementById('personnelhistorynamedatalist').innerHTML = data.data.map(dat=>`<option>${dat.personnel.staffid} || ${dat.personnel.firstname} ${dat.personnel.lastname}</option>`).join('')
        }
    }
    const vhpopperdept=(result)=>{
	    document.getElementById('personelviewdepartment').innerHTML += result.data.map(data=>{
	        return(`
	            <option value="${data.id}"> ${data.department.toUpperCase()} </option>
	        `)
	    }).join("")
	}
	const vhpoppergroup=(result)=>{
	    document.getElementById('personelviewgroup').innerHTML += result.data.data.map(data=>{
	        return(`
	            <option value="${data.id}"> ${data.groupname.toUpperCase()} </option>
	        `)
	    }).join("")
	}
	const vhpopperlevel=(result)=>{
	    document.getElementById('personelviewlevel').innerHTML += result.data.map(data=>{
	        return(`
	            <option value="${data.level.id}"> ${data.level.level.toUpperCase()} </option>
	        `)
	    }).join("") 
	}
    callController('fetchdepartment.php', null, 'fetchdepartment', null,  vhpopperdept, 'silent')
    callController('fetchgroupname.php', null, 'fetchgroupname', null,  vhpoppergroup, 'silent')
    callController('fetchlevel.php', null, 'fetchlevel', null,  vhpopperlevel, 'silent')
    callController('fetchpersonnels.php', null, 'fetchpersonnels', null, action)
}

function loadpersonnelhistory(element){
    if(!element)return
        document.getElementById('personneldata').classList.add('hidden')
    let val = element.value.split('||')[0].trim()
    function action(res){
        let data = [res.data[0]]
        document.getElementById('personneldata').classList.remove('hidden')
            document.getElementById('personelviewfirstname').setAttribute('value', data[0].personnel.firstname);
		    document.getElementById('personelviewlastname').setAttribute('value', data[0].personnel.lastname);
		    document.getElementById('personelviewothernames').setAttribute('value', data[0].personnel.othernames);
		    document.getElementById('personelviewphonenumber').setAttribute('value', data[0].personnel.phonenumber);
		    document.getElementById('personelviewworkstatus').setAttribute('value', data[0].personnel.workstatus);
		    document.getElementById('personelviewmaritalstatus').setAttribute('value', data[0].personnel.maritalstatus);
		    document.getElementById('personelviewresidentialaddress').setAttribute('value', data[0].personnel.residentialaddress);
		    document.getElementById('personelviewpermanenthome').setAttribute('value', data[0].personnel.permanenthomeaddress);
		    document.getElementById('personelviewgender').setAttribute('value', data[0].personnel.gender);
		    document.getElementById('personelviewbasicaccountnumber').setAttribute('value', data[0].personnel.bankaccountnumber1);
		    document.getElementById('personelviewbasicbankname').setAttribute('value', data[0].personnel.bankname1);
		    document.getElementById('personelviewallowaccountnumber').setAttribute('value', data[0].personnel.bankaccountnumber2);
		    document.getElementById('personelviewallowbankname').setAttribute('value', data[0].personnel.bankname2);
		    document.getElementById('personelviewusernameemail').setAttribute('value', data[0].personnel.registereduseremail);
		    document.getElementById('personelviewdepartment').setAttribute('value', data[0].personnel.department);
		    document.getElementById('personelviewbirthdate').setAttribute('value', data[0].personnel.birthdate);
		    document.getElementById('personelviewbirthdate').value = data[0].personnel.birthdate;
		    document.getElementById('personnelnationalityy').setAttribute('value', data[0].personnel.nationality);
		    document.getElementById('personelviewstate').setAttribute('value', data[0].personnel.state);
		    document.getElementById('personelviewlga').setAttribute('value', data[0].personnel.lga);
		    document.getElementById('personelviewdeformity').setAttribute('value', data[0].personnel.deformity == '0' ? 'NO' : 'YES');
		    document.getElementById('personelvieweyeglasses').setAttribute('value', data[0].personnel.eyeglasses == '0' ? 'NO' : 'YES');
		    document.getElementById('personelviewotherdeformity').setAttribute('value', data[0].personnel.hearingaid == '0' ? 'NO' : 'YES');
		    document.getElementById('personelviewheight').setAttribute('value', data[0].personnel.height);
		    document.getElementById('personelviewweight').setAttribute('value', data[0].personnel.weight);
		  //  document.getElementById('personelviewbank').setAttribute('value', data[0].personnel.);
		    document.getElementById('personelviewemplymentdate').setAttribute('value', data[0].personnel.employmentdate);
		    document.getElementById('personelviewemplymentdate').value = data[0].personnel.employmentdate;
		    /*document.getElementById('personelviewbasicsalary').setAttribute('value', data[0].personnel.basicsalary);*/
		    document.getElementById('personelviewlevel').setAttribute('value', data[0].personnel.level);
		    document.getElementById('phprofileimg').setAttribute('src', `https://htg.com.ng/howtogrow/images/personnel/${data[0].personnel.imageurl}`);
		    document.getElementById('personelviewgroup').setAttribute('value', data[0].personnel.groupname);
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
		    
		    if(data[0].advance.length){
		        document.getElementById('personnelhistorytabledataadvance').innerHTML = data[0].advance.map((data, index)=>`
		           <tr><td> ${index+1} </td>
                    <td> ${data.title} </td>
                    <td> ${naira}${formatCurrency(data.amount)} </td>
                    <td> ${formatDate(data.entrydate)} </td></tr>
                    
		        `).join('')
		    }
		    if(data[0].leave.length){
		        document.getElementById('personnelhistorytabledataleave').innerHTML = data[0].leave.map((data, index)=>`
		           <tr><td> ${index+1} </td>
                    <td> ${data.title} </td>
                    <td> ${formatDate(data.entrydate)} </td>
                    <td> ${formatDate(data.startdate)} </td>
                    <td> ${formatDate(data.enddate)} </td>
                   <td>${data.document != '-' ? `<a href="https://htg.com.ng/howtogrow/images/personnel/${data.document}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: green; color: white; text-decoration: none; border-radius: 10px; cursor: pointer;">View Document</a>` : 'No Document'}</td>

                    </tr>
                    
		        `).join('')
		    }
		    if(data[0].employeerecords.length){
		        document.getElementById('personnelhistorytabledataemployeerecords').innerHTML = data[0].employeerecords.map((data, index)=>`
                    <tr><td> ${index+1} </td>
                    <td> ${data.employer} </td>
                    <td> ${data.position} </td>
                    <td> ${data.yearsemployed} </td>
                    <td> ${data.reasonforleaving} </td>
                   <td>${data.doc != '-' ? `<a href="https://htg.com.ng/howtogrow/images/personnel/${data.doc}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: green; color: white; text-decoration: none; border-radius: 10px; cursor: pointer;">View Document</a>` : 'No Document'}</td>
                    </tr>
		        `).join('')
		    }
		    if(data[0].guarantors.length){
		        document.getElementById('personnelhistorytabledataguarantors').innerHTML = data[0].guarantors.map((data, index)=>`
                    <tr><td> ${index+1} </td>
                    <td> ${data.guarantorname} </td>
                    <td> ${data.yearsknown} </td>
                    <td> ${data.occupation} </td>
                    <td> ${data.phonenumber} </td>
                    <td> ${data.address} </td>
                   <td>${data.doc != '-' ? `<a href="https://htg.com.ng/howtogrow/images/personnel/${data.doc}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: green; color: white; text-decoration: none; border-radius: 10px; cursor: pointer;">View Document</a>` : 'No Document'}</td>
                   </tr>
		        `).join('')
		    }
		    if(data[0].promotion.length){
		        document.getElementById('personnelhistorytabledatapromotion').innerHTML = data[0].promotion.map((data, index)=>`
                    <tr><td> ${index+1} </td>
                    <td> ${data.title} </td>
                    <td> ${data.level} </td>
                    <td> ${formatDate(data.entrydate)} </td>
                   <td>${data.document != '-' ? `<a href="https://htg.com.ng/howtogrow/images/personnel/${data.document}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: green; color: white; text-decoration: none; border-radius: 10px; cursor: pointer;">View Document</a>` : 'No Document'}</td>
                   </tr>
		        `).join('')
		    }
		    if(data[0].qualifications.length){
		        document.getElementById('personnelhistorytabledataqualifications').innerHTML = data[0].qualifications.map((data, index)=>`
                    <tr><td> ${index+1} </td>
                    <td> ${data.institution} </td>
                    <td> ${data.qualification} </td>
                    <td> ${formatDate(data.certificationdate)} </td>
                    <td>${data.doc != '-' ? `<a href="https://htg.com.ng/howtogrow/images/personnel/${data.doc}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: green; color: white; text-decoration: none; border-radius: 10px; cursor: pointer;">View Document</a>` : 'No Document'}</td>
		        `).join('')
		    }
		    if(data[0].query.length){
		        document.getElementById('personnelhistorytabledataquery').innerHTML = data[0].query.map((data, index)=>`
                    <tr><td> ${index+1} </td>
                    <td> ${data.title} </td>
                    <td> ${formatDate(data.entrydate)} </td>
                    <td>${data.document != '-' ? `<a href="https://htg.com.ng/howtogrow/images/personnel/${data.document}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: green; color: white; text-decoration: none; border-radius: 10px; cursor: pointer;">View Document</a>` : 'No Document'}</td>
                    </tr>
		        `).join('')
		    }
		    if(data[0].referees.length){
		        document.getElementById('personnelhistorytabledatareferees').innerHTML = data[0].referees.map((data, index)=>`
                    <tr><td> ${index+1} </td>
                    <td> ${data.fullname} </td>
                    <td> ${data.relationship} </td>
                    <td> ${data.occupation} </td>
                    <td> ${data.phonenumber} </td>
                    <td> ${data.address} </td>
                    <td>${data.doc != '-' ? `<a href="https://htg.com.ng/howtogrow/images/personnel/${data.doc}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: green; color: white; text-decoration: none; border-radius: 10px; cursor: pointer;">View Document</a>` : 'No Document'}</td>
                    </tr>
		        `).join('')
		    }
		    if(data[0].suspension.length){
		        document.getElementById('personnelhistorytabledatasuspension').innerHTML = data[0].suspension.map((data, index)=>`
                    <tr><td> ${index+1} </td>
                    <td> ${data.title} </td>
                    <td> ${formatDate(data.entrydate)} </td>
                    <td>${data.document != '-' ? `<a href="https://htg.com.ng/howtogrow/images/personnel/${data.document}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: green; color: white; text-decoration: none; border-radius: 10px; cursor: pointer;">View Document</a>` : 'No Document'}</td>
                    </tr>
		        `).join('')
		    }
		    if(data[0].termination.length){
		        document.getElementById('personnelhistorytabledatatermination').innerHTML = data[0].termination.map((data, index)=>`
                    <tr><td> ${index+1} </td>
                    <td> ${data.title} </td>
                    <td> ${formatDate(data.entrydate)} </td>
                    <td>${data.document != '-' ? `<a href="https://htg.com.ng/howtogrow/images/personnel/${data.document}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: green; color: white; text-decoration: none; border-radius: 10px; cursor: pointer;">View Document</a>` : 'No Document'}</td>
                    </tr>
		        `).join('')
		    }
		    if(data[0].warning.length){
		        document.getElementById('personnelhistorytabledatawarning').innerHTML = data[0].warning.map((data, index)=>`
                    <tr><td> ${index+1} </td>
                    <td> ${data.title} </td>
                    <td> ${formatDate(data.entrydate)} </td>
                    <td>${data.document != '-' ? `<a href="https://htg.com.ng/howtogrow/images/personnel/${data.document}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: green; color: white; text-decoration: none; border-radius: 10px; cursor: pointer;">View Document</a>` : 'No Document'}</td>
                    </tr>
		        `).join('')
		    } 
		    if(data[0].evaluation.length){
		        document.getElementById('personnelhistorytabledataevaluation').innerHTML = data[0].evaluation.map((data, index)=>`
                    <tr><td> ${index+1} </td>
                    <td> ${data.title} </td>
                    <td> ${formatDate(data.entrydate)} </td>
                    <td>${data.document != '-' ? `<a href="https://htg.com.ng/howtogrow/images/personnel/${data.document}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: green; color: white; text-decoration: none; border-radius: 10px; cursor: pointer;">View Document</a>` : 'No Document'}</td>
                    </tr>
		        `).join('')
		    } 
		    if(data[0].parents.length){
		        document.getElementById('personnelhistorytabledataparents').innerHTML = data[0].parents.map((data, index)=>`
                    <tr>
                    <td> ${index+1} </td>
                    <td> ${data.parentone} </td>
                    <td> ${data.parenttwo} </td>
                    <td> ${data.parentoneoccupation} </td>
                    <td> ${data.parenttwooccupation} </td>
                    <td> ${data.parentonephone} </td>
                    <td> ${data.parenttwophone} </td>
                    <td> ${data.homeaddress} </td>
                    <td> ${data.officeaddress} </td>
                    <td>${data.doc != '-' ? `<a href="https://htg.com.ng/howtogrow/images/personnel/${data.doc}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: green; color: white; text-decoration: none; border-radius: 10px; cursor: pointer;">View Document</a>` : 'No Document'}</td>
                    </tr>
		        `).join('')
		    } 
		    
        
    }
    function params(){
        let pa = new FormData()
        pa.append('staffid', val)
        return pa
    }
    callController('fetchpersonnelhistory.php', params(), 'fetchpersonnelhistory', null, action)
}

var orepersonnelhistorybbtn = document.getElementById("personnelhistory");
if (orepersonnelhistorybbtn) orepersonnelhistorybbtn.addEventListener("click", orepersonnelhistory, false);



//  Monitoring/Evaluation     --------------------------------------------------------------------------------------------------------------------------------
const monitorevaluation_field = [
            `monitorevaluation_personnel`,
            `monitorevaluation_entrydate`,
            `monitorevaluation_title`,
            // `monitorevaluation_startdate`,
            // `monitorevaluation_enddate`,
            ]
            
let monitorpersonnelid = [];
let monitorpersonnel = [];
let monitorpersonnelvalue = ''
const checkmonitorpersonnel =(state)=>{
        console.log('detected', state)
        if(monitorpersonnel.includes(`${state.value}`)){
            monitorpersonnelvalue = monitorpersonnelid[monitorpersonnel.indexOf(`${state.value}`)];
            console.log('monitorpersonnelvalue', monitorpersonnelvalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
const checkmonitorpersonnelid =(state)=>{
        console.log('detected', state)
        if(monitorpersonnelid.includes(`${state}`)){
            return monitorpersonnel[monitorpersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const poppermonitordlis =(result)=>{
   if(document.getElementById('monitorevaluationpersonnelnames'))document.getElementById('monitorevaluationpersonnelnames').innerHTML = result.data.map(data=>{
       monitorpersonnelid.push(data.personnel.staffid);
       monitorpersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var monitorevaluationpersonnel_datasource = [];

const monitorevaluationpersonnelepaginate=(data)=>{
    monitorevaluationpersonnel_datasource = [];
    monitorevaluationpersonnel_datasource = data.data;
    initPagination(monitorevaluationpersonnel_datasource, monitorevaluationpersonnelsetCurrentPage);
    }


var monitorevaluationpersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(monitorevaluationpersonnel_datasource.length) {
        monitorevaluationpersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendmonitorevaluationpersonnelTableRows(item, index)
            }
        })
        // if(document.monitorevaluationSelector('#monitorevaluationpersonneltablecontent tbody').innerHTML === '') oremonitorevaluationbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("monitorevaluationpersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const monitorevaluationpopulate =(id)=>{
     let data = monitorevaluationpersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('id').value = data[0].id;
     document.getElementById('monitorevaluation_personnel').value = checkmonitorpersonnelid(data[0].pid);
     document.getElementById('monitorevaluation_entrydate').value = data[0].entrydate;
     document.getElementById('monitorevaluation_title').value = data[0].title;
    //  document.getElementById('monitorevaluation_startdate').value = data[0].startdate;
    //  document.getElementById('monitorevaluation_enddate').value = data[0].enddate;
     document.getElementById('monitorevaluationpreview').innerHTML = '';
     if(data[0].doc !== '-'){
     const img = document.createElement("img");
    img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
    img.setAttribute('id', `monitorevaluation-file`)
    document.getElementById('monitorevaluationpreview').appendChild(img);
    img.src = `../images/personnel/${data[0].document}`; 
    img.onload = function() { URL.revokeObjectURL(img.src) }
     }
     document.getElementById('monitorevaluation_submitbtn').textContent = 'Update';
}

const gowarbackmon=()=>{
            callDialog()
            document.getElementById("monitorevaluation").click();
        }
const monitorevaluationperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const monitorevaluationdelete =(id, person, monitorevaluation)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${monitorevaluation.toUpperCase()} as a monitorevaluation entry for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removepersonnelmatter.php', monitorevaluationperdeleteparams(${id}), 'removepersonnelmatter', null, gowarbackmon )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }


function appendmonitorevaluationpersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("monitorevaluationpersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checkmonitorpersonnelid(data.pid)} </td>
                                <td> ${data.entrydate} </td>
                                <td> ${data.title} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="monitorevaluationpopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="monitorevaluationdelete(${data.id}, '${checkmonitorpersonnelid(data.pid)}', '${data.title}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 




function monitorevaluationFormData() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'EVALUATION')
    paramstr.append('pid', monitorpersonnelvalue)
    paramstr.append('entrydate', document.getElementById('monitorevaluation_entrydate').value);
    paramstr.append('title', document.getElementById('monitorevaluation_title').value);
    // paramstr.append('startdate', document.getElementById('monitorevaluation_startdate').value);
    // paramstr.append('enddate', document.getElementById('monitorevaluation_enddate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('monitorevaluation_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('monitorevaluation_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function monitorevaluationFormDataupdate() {
    
    let paramstr = new FormData();
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('personnelmatter', 'EVALUATION')
    paramstr.append('pid', monitorpersonnelvalue)
    paramstr.append('entrydate', document.getElementById('monitorevaluation_entrydate').value);
    paramstr.append('title', document.getElementById('monitorevaluation_title').value);
    // paramstr.append('startdate', document.getElementById('monitorevaluation_startdate').value);
    // paramstr.append('enddate', document.getElementById('monitorevaluation_enddate').value);
        try{
	 paramstr.append('photofilename',document.getElementById('monitorevaluation_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('monitorevaluation_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function monitorevaluationFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'EVALUATION')
        if(document.getElementById('monitorevaluationPPIDD'))paramstr.append('personnelid', document.getElementById('monitorevaluationPPIDD').value);

   
    return paramstr
}
function clearmonitorevaluationinputs() {
    
    document.getElementById('monitorevaluation_entrydate').value = '';
    document.getElementById('monitorevaluation_title').value = '';
    // document.getElementById('monitorevaluation_startdate').value = '';
    // document.getElementById('monitorevaluation_enddate').value = '';
        try{
	 document.getElementById('monitorevaluation_file').files = null;
    }catch(ex){
   }
}

const rerunmonitorevaluation =()=>{
    document.getElementById('monitorevaluation_submitbtn').textContent = 'Update';
    document.getElementById("monitorevaluation").click();
}

const monitorevaluationloadimg=(objfile)=>{
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `monitorevaluation-file`)
                document.getElementById('monitorevaluationpreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function oremonitorevaluation() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('monitorevaluation.php', 'override')  
        
        jtabledata = document.getElementById('monitorevaluationpersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, poppermonitordlis, 'silent');
        if(document.getElementById('monitorevaluation_submitbtn'))document.getElementById('monitorevaluation_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('monitorevaluation_personnel').textContent == 'Submit'){
                callController('personnelmatterscript.php', monitorevaluationFormData(), 'personnelmatterscript', monitorevaluation_field, rerunmonitorevaluation,);
                clearmonitorevaluationinputs()
            }else{
                checkmonitorpersonnel(document.getElementById('monitorevaluation_personnel'));
                callController('personnelmatterscript.php', monitorevaluationFormDataupdate(), 'personnelmatterscript', monitorevaluation_field, rerunmonitorevaluation,);
                clearmonitorevaluationinputs();
            }
        },true);
        
        setTimeout(()=>{
            if(sessionStorage.getItem('viewpersonnelmonitorevaluationfunct')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonnelmonitorevaluationfunct'));
                const monitorevaluationparams=()=>{
                    var paramstr = new FormData();
    		
            		paramstr.append('personnelmatter', 'EVALUATION');
            		paramstr.append('personnelid', personnelsessiondata[0].personnel.staffid);
            		
            	    return paramstr;
            
            	};
                //  FOR monitorevaluation TABLE SINGLE PERSONNEL
                callController('fetchpersonnelmatters.php', monitorevaluationparams(), 'SINGLEfetchpersonnelmatters', null, monitorevaluationpersonnelepaginate, 'silent');
                document.getElementById('monitorevaluation_personnel').value = checkmonitorpersonnelid(personnelsessiondata[0].personnel.staffid);
                monitorpersonnelvalue = personnelsessiondata[0].personnel.staffid;
                document.getElementById('monitorevaluation_personnel').removeAttribute('readonly')
                document.getElementsByClassName('oremainheader')[0].innerHTML = `monitorevaluation <br><span style="color:green;text-transform:uppercase">[${checkmonitorpersonnelid(monitorpersonnelvalue)}]</span><input id="monitorevaluationPPIDD" type="hidden" value="${personnelsessiondata[0].personnel.staffid}"/>`;
                // document.getElementById('qualificationnname').value = personnelsessiondata[0].qualificationnname ? personnelsessiondata[0].qualificationnname : '';
                sessionStorage.removeItem('viewpersonnelmonitorevaluationfunct')
             }else{
                //  FOR monitorevaluation TABLE ALL PERSONNEL
                callController('fetchpersonnelmatters.php', monitorevaluationFormDatatable(), 'ALLfetchpersonnelmatters', null, monitorevaluationpersonnelepaginate, 'silent');
                if(document.getElementById('monitorevaluationPPIDD')){
                    document.getElementById('monitorevaluation_personnel').value = checkmonitorpersonnelid(document.getElementById('monitorevaluationPPIDD').value);
                    document.getElementById('monitorevaluation_personnel').setAttribute('readonly', true)
                }else{
                    document.getElementById('monitorevaluation_personnel').removeAttribute('readonly')  
                }
             }
        },1000)

        //YOUR VARIABLES STAYS HERE
        // const statementAccountNumber = document.getElementById('smacc')
        // const statementStartDate = document.getElementById('smsd');
        
        //ALWAYS CHECK BEFORE ADDING EVENTLISTENER
        // if(loadstatementbtn) loadstatementbtn.addEventListener('click', () => loadStatement());
        
        //TO CALL AND HIDE SPINNER WHEN NEEDED
        // showSpinner();
        // hideSpinner()
        
       // THE REST OF YOUR CODE GOES HERE
       
       //THANKS
        
}


var oremonitorevaluationbbtn = document.getElementById("monitorevaluation");
if (oremonitorevaluationbbtn) oremonitorevaluationbbtn.addEventListener("click", oremonitorevaluation, false);

//  Add Parents/Guardians --------------------------------------------------------------------------------------------------------------------------------

const parentsguardians_field = [
                    `parentsguardians_personnel`,
                    `parentsguardians_parentone`,
                    `parentsguardians_parenttwo`,
                    `parentsguardians_parentoneoccupation`,
                    `parentsguardians_parenttwooccupation`,
                    `parentsguardians_parentonephone`,
                    `parentsguardians_parenttwophone`,
                    `parentsguardians_homeaddress`,
                    `parentsguardians_officeaddress`
            ]

const parentsguardiansfiles = []
            
let parentspersonnelid = [];
let parentspersonnel = [];
let parentspersonnelvalue = '';
const checkparentspersonnel =(state)=>{
        console.log('detected', state);
        if(parentspersonnel.includes(`${state.value}`)){
            parentspersonnelvalue = parentspersonnelid[parentspersonnel.indexOf(`${state.value}`)];
            console.log('parentspersonnelvalue', parentspersonnelvalue)
        }else{
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid personnel`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
        }
    };
const checkparentspersonnelid =(state)=>{
        console.log('detected', state)
        if(parentspersonnelid.includes(`${state}`)){
            return parentspersonnel[parentspersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data' 
        } 
    }; 
const popparentsdlis =(result)=>{  
   if(document.getElementById('parentsguardianspersonnelnames'))document.getElementById('parentsguardianspersonnelnames').innerHTML = result.data.map(data=>{
       parentspersonnelid.push(data.personnel.staffid);
       parentspersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var parentsguardianspersonnel_datasource = [];

const parentsguardianspersonnelepaginate=(data)=>{
    parentsguardianspersonnel_datasource = [];
    parentsguardianspersonnel_datasource = data.data;
    initPagination(parentsguardianspersonnel_datasource, parentsguardianspersonnelsetCurrentPage);
    }


var parentsguardianspersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(parentsguardianspersonnel_datasource.length) {
        parentsguardianspersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendparentsguardianspersonnelTableRows(item, index)
            }
        })
        // if(document.parentsguardiansSelector('#parentsguardianspersonneltablecontent tbody').innerHTML === '') oreparentsguardiansbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("parentsguardianspersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const parentsguardianspopulate =(id)=>{
     let data = parentsguardianspersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('parentsguardians_personnel').value = checkparentspersonnelid(data[0].staffid)
     document.getElementById('parentsguardians_parentone').value = data[0].parentone
     document.getElementById('parentsguardians_parenttwo').value = data[0].parenttwo
     document.getElementById('parentsguardians_parentoneoccupation').value = data[0].parentoneoccupation
     document.getElementById('parentsguardians_parenttwooccupation').value = data[0].parenttwooccupation
     document.getElementById('parentsguardians_parentonephone').value = data[0].parentonephone
     document.getElementById('parentsguardians_parenttwophone').value = data[0].parenttwophone
     document.getElementById('parentsguardians_homeaddress').value = data[0].homeaddress
     document.getElementById('parentsguardians_officeaddress').value = data[0].officeaddress
     document.getElementById('id').value = data[0].id
    document.getElementById('parentsguardianspreview').innerHTML = '';
     if(data[0].doc !== '-'){
     const img = document.createElement("img");
    img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
    img.setAttribute('id', `termination-file`)
    document.getElementById('parentsguardianspreview').appendChild(img);
    img.src = `../images/personnel/${data[0].doc}`; 
    img.onload = function() { URL.revokeObjectURL(img.src) }
     }
    document.getElementById('parentsguardians_submitbtn').textContent = 'Update';
     
}

const goparentsback=()=>{
            callDialog()
            document.getElementById("parentsguardians").click();
        }
const parentsguardiansperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const parentsguardiansdelete =(id, person, parentsguardians)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${parentsguardians.toUpperCase()} as a parentsguardians for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removeparentsguardians.php', parentsguardiansperdeleteparams(${id}), 'removeparentsguardians', null, goparentsback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }


function appendparentsguardianspersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("parentsguardianspersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checkparentspersonnelid(data.staffid)} </td>
                                <td> ${data.parentone} </td>
                                <td> ${data.parenttwo} </td>
                                <td> ${data.parentoneoccupation} </td>
                                <td> ${data.parenttwooccupation} </td>
                                <td> ${data.parentonephone} </td>
                                <td> ${data.parenttwophone} </td>
                                <td> ${data.homeaddress} </td>
                                <td> ${data.officeaddress} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="parentsguardianspopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="parentsguardiansdelete(${data.id}, '${checkparentspersonnelid(data.staffid)}', '${data.parentsguardiansname}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 





function parentsguardiansFormData() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'PARENTS')
    paramstr.append('staffid', parentspersonnelvalue)
    paramstr.append('parentone', document.getElementById('parentsguardians_parentone').value);
    paramstr.append('parenttwo', document.getElementById('parentsguardians_parenttwo').value);
    paramstr.append('parentoneoccupation', document.getElementById('parentsguardians_parentoneoccupation').value);
    paramstr.append('parenttwooccupation', document.getElementById('parentsguardians_parenttwooccupation').value);
    paramstr.append('parentonephone', document.getElementById('parentsguardians_parentonephone').value);
    paramstr.append('parenttwophone', document.getElementById('parentsguardians_parenttwophone').value);
    paramstr.append('homeaddress', document.getElementById('parentsguardians_homeaddress').value);
    paramstr.append('officeaddress', document.getElementById('parentsguardians_officeaddress').value);
        try{
	 paramstr.append('photofilename', document.getElementById('parentsguardians_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('parentsguardians_file').files[0]);
// 	 for(i=0; i<document.getElementById('parentsguardianspreview').children.length; i++){
//     	 paramstr.append('photofilename'+i, document.getElementById('parentsguardianspreview').children[i].src);		
//     	 paramstr.append('userphotoname'+i, document.getElementById('parentsguardianspreview').children[i].files[0]);
// 	 }

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function parentsguardiansFormDataupdate() {
    
    let paramstr = new FormData();
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('personnelmatter', 'PARENTS')
    paramstr.append('staffid', parentspersonnelvalue)
   paramstr.append('parentone', document.getElementById('parentsguardians_parentone').value);
    paramstr.append('parenttwo', document.getElementById('parentsguardians_parenttwo').value);
    paramstr.append('parentoneoccupation', document.getElementById('parentsguardians_parentoneoccupation').value);
    paramstr.append('parenttwooccupation', document.getElementById('parentsguardians_parenttwooccupation').value);
    paramstr.append('parentonephone', document.getElementById('parentsguardians_parentonephone').value);
    paramstr.append('parenttwophone', document.getElementById('parentsguardians_parenttwophone').value);
    paramstr.append('homeaddress', document.getElementById('parentsguardians_homeaddress').value);
    paramstr.append('officeaddress', document.getElementById('parentsguardians_officeaddress').value);
        try{ 
	 paramstr.append('photofilename', document.getElementById('parentsguardians_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('parentsguardians_file').files[0]);
// 	 for(i=0; i<document.getElementById('parentsguardianspreview').children.length; i++){
//     	 paramstr.append('photofilename'+i, document.getElementById('parentsguardianspreview').children[i].src);		
//     	 paramstr.append('userphotoname'+i, document.getElementById('parentsguardianspreview').children[i].files[0]);
// 	 }

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function parentsguardiansFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'PARENTS')
   
    return paramstr
}

const rerunparentsguardians =()=>{
    clearAllInputs(parentsguardians_field);
    document.getElementById('parentsguardians_submitbtn').textContent = 'Submit';
    for(i=0;i<parentsguardians_field.length;i++){
        document.getElementById(`${parentsguardians_field[i]}`).value = '';
    }
    document.getElementById('parentsguardians').click();
}

const parentsguardiansloadimg=(objfile)=>{ 
                // for(i=0;i<objfile.files.length;i++){
                //     const img = document.createElement("img");
                //     img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                //     img.setAttribute('id', `termination-file`)
                //     // img.setAttribute('onclick', `console.log(this,this.src, parentsguardiansfiles, parentsguardiansfiles.filter(dat=>dat!==this.src)`));
                //     document.getElementById('parentsguardianspreview').appendChild(img); 
                //     img.src = URL.createObjectURL(objfile.files[i]); 
                //     img.onload = function() { URL.revokeObjectURL(img.src) }
                //     parentsguardiansfiles.push(objfile.files[i])
                //     console.log(document.getElementById('parentsguardianspreview'), document.getElementById('parentsguardianspreview').children[i].src);
                // }
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `termination-file`)
                document.getElementById('parentsguardianspreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function oreparentsguardians() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('parentsguardians.php', 'override')  
        
        jtabledata = document.getElementById('parentsguardianspersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popparentsdlis, 'silent');
        if(document.getElementById('parentsguardians_submitbtn'))document.getElementById('parentsguardians_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('parentsguardians_submitbtn').textContent == 'Submit'){
                callController('parentscript.php', parentsguardiansFormData(), 'parentscript', parentsguardians_field, rerunparentsguardians,)
            }else{
                checkparentspersonnel(document.getElementById('parentsguardians_personnel'))
                callController('parentscript.php', parentsguardiansFormDataupdate(), 'parentscript', parentsguardians_field, rerunparentsguardians,)
            }
            
        },true);
        
        setTimeout(()=>{
            if(sessionStorage.getItem('viewpersonnelparentsguardiansfunct')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonnelparentsguardiansfunct'));
                console.log('personnelsessiondata', personnelsessiondata[0], personnelsessiondata)
                const parentsguardiansparams=()=>{
                    var paramstr = new FormData();
                    
    		        if(personnelsessiondata[0].personnel.staffid)paramstr.append('staffid', personnelsessiondata[0].personnel.staffid);
            // 		paramstr.append('personnelmatter', 'parentsguardians');
            		return paramstr;
            		
            	    
            
            	};
                //  FOR parentsguardians TABLE SINGLE PERSONNEL
                callController('fetchparents.php', parentsguardiansparams(), 'fetchparents', null, parentsguardianspersonnelepaginate, 'silent');
                document.getElementById('parentsguardians_personnel').value = checkparentspersonnelid(personnelsessiondata[0].personnel.staffid);
                parentspersonnelvalue = personnelsessiondata[0].personnel.staffid
                // document.getElementById('id').value = personnelsessiondata[0].personnel.id;
                document.getElementById('parentsguardians_personnel').setAttribute('readonly', true)
                document.getElementsByClassName('oremainheader')[0].innerHTML = `parentsguardians <br><span style="color:green;text-transform:uppercase">[${checkparentspersonnelid(personnelsessiondata[0].personnel.staffid)}]</span><input id="parentsguardiansPPIDD" type="hidden" value="${parentspersonnelvalue}"/>`;
                // document.getElementById('qualificationnname').value = personnelsessiondata[0].qualificationnname ? personnelsessiondata[0].qualificationnname : '';
                sessionStorage.removeItem('viewpersonnelparentsguardiansfunct')
             }else{
                //  FOR parentsguardians TABLE ALL PERSONNEL
                // callController('fetchparents.php', parentsguardiansFormDatatable(), 'fetchparents', null, parentsguardianspersonnelepaginate, 'silent');
                const parentsguardiansparams=()=>{
                    var paramstr = new FormData();
                    
    		        if(document.getElementById('parentsguardiansPPIDD'))paramstr.append('staffid', document.getElementById('parentsguardiansPPIDD').value);
            // 		paramstr.append('personnelmatter', 'parentsguardians');
            		return paramstr;
            		
            	    
            
            	};
                callController('fetchparents.php', parentsguardiansparams(), 'fetchparents', null, parentsguardianspersonnelepaginate, 'silent');
                if(document.getElementById('parentsguardiansPPIDD')){
                    document.getElementById('parentsguardians_personnel').value = checkparentspersonnelid(document.getElementById('parentsguardiansPPIDD').value);
                    document.getElementById('parentsguardians_personnel').setAttribute('readonly', true)
                }else{
                    document.getElementById('parentsguardians_personnel').removeAttribute('readonly')  
                }
             }
        },1000)

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


var oreparentsguardiansbbtn = document.getElementById("parentsguardians");
if (oreparentsguardiansbbtn) oreparentsguardiansbbtn.addEventListener("click", e=>oreparentsguardians(), false);
