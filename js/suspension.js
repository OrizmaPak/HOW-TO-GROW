
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
