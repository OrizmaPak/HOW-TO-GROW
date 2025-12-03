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
