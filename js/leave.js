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
