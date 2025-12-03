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
