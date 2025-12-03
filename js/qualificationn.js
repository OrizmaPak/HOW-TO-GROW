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
