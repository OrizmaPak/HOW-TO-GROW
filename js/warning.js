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
        
        //ALWAYS CHECK BEFORE ADDING EVENTLISTENERS
        // if(loadstatementbtn) loadstatementbtn.addEventListener('click', () => loadStatement());
        
        //TO CALL AND HIDE SPINNER WHEN NEEDED
        // showSpinner();
        // hideSpinner()
        
       // THE REST OF YOUR CODE GOES HERE
       
       //THANKS
        
}


var orewarningbbtn = document.getElementById("warning");
if (orewarningbbtn) orewarningbbtn.addEventListener("click", orewarning, false);
