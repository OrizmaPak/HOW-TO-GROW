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
                    callController('personnelmatterscript.php', advancesFormData(), 'personnelmatterscript', getallid('advmvrfy2'), rerunadvances,);
            }else{
                    callController('personnelmatterscript.php', advancesFormDataupdate(), 'personnelmatterscript', getallid('advmvrfy2'), rerunadvances,);
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





//     const popadvlevel=(result)=>{
// 	    document.getElementById('advanceslevel').innerHTML += result.data.data.map(data=>{
// 	        return(`
// 	            <option value="${data.id}"> ${data.level.toUpperCase()} </option>
// 	        `)
// 	    })
// 	}
// callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popperadvmdlis, 'silent');