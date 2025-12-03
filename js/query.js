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
