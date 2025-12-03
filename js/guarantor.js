const guarantor_field = [
            `guarantor_personnel`,
            `guarantor_guarantorname`,
            `guarantor_occupation`,
            `guarantor_phonenumber`,
            `guarantor_address`,
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
