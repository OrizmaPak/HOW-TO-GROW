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
