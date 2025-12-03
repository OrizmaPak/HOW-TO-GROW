const promotions_field = [
            `promotions_personnel`,
            `promotions_entrydate`,
            `promotions_title`,
            `promotions_level`,
            ]
let compensationOpen = false
let prompersonnelid = [];
let prompersonnel = [];
let prompersonnellevelid = [];
let prompersonnellevel = [];
let prompersonnelvalue = ''

const popstaffcompensationpromotion =(open)=>{
    if(document.getElementById('promotions_personnel'))document.getElementById('promotions_personnel').value == '' ? document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = '0px' : null;
    setTimeout(()=>{
    if(document.getElementById('promotions_personnel'))document.getElementById('promotions_personnel').value == '' ? document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = '0px' : null;
    },2000)
    if(prompersonnelvalue == ''){
        document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = '0px';
    }else{
        const promotionsstaffcomparams=()=>{
                    var paramstr = new FormData();
    		
            		paramstr.append('personnelid', prompersonnelvalue);
            		
            	    return paramstr;
            
            	};
        const popscsectionprom =(result)=>{
            document.getElementById('promotionpersonelbasicsalary').value = result.data[0].personnel.basicsalary;
            document.getElementById('promotionsallowance').innerHTML = result.data[0].salarystructure.map((dat, index)=>{
                if(index == 0)document.getElementById('promotionallowancename0').value = dat.salaryinfo
                if(index == 0)document.getElementById('promotionallowancepercent0').value = dat.amountpercentage
                if(dat.salaryinfotype == "ALLOWANCE" && index != 0)return(`
                    <div name="allowancepersonnelcontainer">
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <input value="${dat.salaryinfo}" class="jformcontrol allowancename jmargin-top promvrfy" type="text" id="${Date.now()}promallowance" placeholder="Allowance name" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <input value="${dat.amountpercentage}" class="jformcontrol allowancepercent jmargin-top promvrfy" type="text" id="${Date.now()}prompercentage" placeholder="Percentage %" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <div id="" style="font-size: small;margin-left:0px" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                            </div>
                        </div>
                    </div>
                `)
            }).join("");
            document.getElementById('promotionsdeduction').innerHTML = result.data[0].salarystructure.map((dat, index)=>{
                if(index == 0)document.getElementById('promotiondeductionname0').value = dat.salaryinfo
                if(index == 0)document.getElementById('promotiondeductionpercent0').value = dat.amountpercentage
                if(dat.salaryinfotype == "ALLOWANCE" && index != 0)return(`
                    <div name="allowancepersonnelcontainer">
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <input value="${dat.salaryinfo}" class="jformcontrol deductionname jmargin-top promvrfy" type="text" id="${Date.now()}promallowance" placeholder="Deduction name" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <input value="${dat.amountpercentage}" class="jformcontrol deductionpecent jmargin-top promvrfy" type="text" id="${Date.now()}prompercentage" placeholder="Percentage %" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <div id="" style="font-size: small;margin-left:0px" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                            </div>
                        </div>
                    </div>
                `)
            }).join("");
               if(open)document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = document.getElementById('promotionstaffcompensation').nextElementSibling.scrollHeight + 'px';
            setTimeout(()=>{
               if(open)document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = 'fit-content';
                },2000)
        }
        callController('fetchpersonnels.php', promotionsstaffcomparams(), 'fetchpersonnels', null, popscsectionprom, 'silent');
    }
    
}

const checkprompersonnel =(state)=>{
        popstaffcompensationpromotion()
        if(prompersonnel.includes(`${state.value}`)){
            prompersonnelvalue = prompersonnelid[prompersonnel.indexOf(`${state.value}`)];
            console.log('prompersonnelvalue', prompersonnelvalue)
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
    const popprolevel=(result)=>{
        document.getElementById('promotions_level').innerHTML = `<option value=""> --select level-- </option>`
	    document.getElementById('promotions_level').innerHTML += result.data.data.map(data=>{
	        prompersonnellevelid.push(data.id);
	        prompersonnellevel.push(data.level);
	        return(`
	            <option value="${data.id}"> ${data.level.toUpperCase()} </option>
	        `)
	    })
	}
const checkprompersonnelid =(state)=>{
        if(prompersonnelid.includes(`${state}`)){
            return prompersonnel[prompersonnelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const checkprompersonnellevelid =(state)=>{
        if(prompersonnellevelid.includes(`${state}`)){
            return prompersonnellevel[prompersonnellevelid.indexOf(`${state}`)];
        }else{
            return 'Bad Data'
        }
    };
const popperpromdlis =(result)=>{ 
   if(document.getElementById('promotionspersonnelnames'))document.getElementById('promotionspersonnelnames').innerHTML = result.data.map(data=>{
       prompersonnelid.push(data.personnel.staffid);
       prompersonnel.push(`${data.personnel.lastname} ${data.personnel.firstname}`);
       return `<option value="${data.personnel.lastname} ${data.personnel.firstname}">`}).join('');
}
var promotionspersonnel_datasource = [];

const promotionspersonnelepaginate=(data)=>{
    promotionspersonnel_datasource = [];
    promotionspersonnel_datasource = data.data;
    initPagination(promotionspersonnel_datasource, promotionspersonnelsetCurrentPage);
    }


var promotionspersonnelsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(promotionspersonnel_datasource.length) {
        promotionspersonnel_datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendpromotionspersonnelTableRows(item, index)
            }
        })
        // if(document.promotionsSelector('#promotionspersonneltablecontent tbody').innerHTML === '') orepromotionsbbtn.click()
        // appendPropertyAccountTableFoot()
    }
    else {
        document.getElementById("promotionspersonneltablecontent").innerHTML=  renderNoTableData()
    }
};

const promotionspopulate =(id)=>{
     let data = promotionspersonnel_datasource.filter(data=>data.id == id);
     console.log('na me', data);
     document.getElementById('id').value = data[0].id;
     document.getElementById('promotions_personnel').value = checkprompersonnelid(data[0].pid);
     document.getElementById('promotions_entrydate').value = data[0].entrydate;
     document.getElementById('promotions_level').value = data[0].level;
     document.getElementById('promotions_title').value = data[0].title;
     document.getElementById('promotionspreview').innerHTML = '';
     if(data[0].doc !== '-'){
         const img = document.createElement("img");
        img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
        img.setAttribute('id', `promotions-file`)
        document.getElementById('promotionspreview').appendChild(img);
        img.src = `../images/personnel/${data[0].document}`; 
        img.onload = function() { URL.revokeObjectURL(img.src) }
     }
     document.getElementById('promotions_submitbtn').textContent = 'Update';
}

const goproback=()=>{
            callDialog()
            document.getElementById("promotions").click();
        }
const promotionsperdeleteparams =(id, check)=>{
            	var paramstr = new FormData();
		
        		paramstr.append('id', id);
        		
        		return paramstr;
        }
const promotionsdelete =(id, person, promotions)=>{
        let content = `<div style="display: flex;flex-direction: column;justify-content:space-between; align-items: center; width: 100%; height: 50%">
                            <p style="color:black;">You are about to remove ${promotions.toUpperCase()} as a promotions entry for ${person.toUpperCase()}. This action cannot be undone.</p>
                            <div style="display: flex;justify-content: space-between;margin-top: 20px;"> 
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" onclick="callDialog()"> CANCEL </button>
                                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;" class="j-action-btn " onclick="
                                callController('removepersonnelmatter.php', promotionsperdeleteparams(${id}), 'removepersonnelmatter', null, goproback )
                                "> DELETE </button>
                            </div>
                        </div>`
        // callModal(content, 2, 30000); 
        callDialog('OPEN', content)
    }



function appendpromotionspersonnelTableRows(data, index) {
    // var customerinfo = propertycustomers.find(value => value.id === item.customer) 
    document.getElementById("promotionspersonneltablecontent").innerHTML += `
                            <tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${checkprompersonnelid(data.pid)} </td>
                                <td> ${checkprompersonnellevelid(data.level)} </td>
                                <td> ${data.title} </td>
                                <td> ${data.entrydate} </td>
                                <td>
                                    <div class="flex" style="align-items:center">
                                        <button onclick="promotionspopulate(${data.id})" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="promotionsdelete(${data.id}, '${checkprompersonnelid(data.pid)}', '${checkprompersonnellevelid(data.level)} --> ${data.title}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
    `
} 




function promotionsFormData() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'PROMOTION')
    paramstr.append('pid', prompersonnelvalue)
    paramstr.append('entrydate', document.getElementById('promotions_entrydate').value);
    paramstr.append('title', document.getElementById('promotions_title').value);
    paramstr.append('level', document.getElementById('promotions_level').value);
    if(compensationOpen == true){
        for(i=0; i<document.getElementsByClassName('allowancename').length; i++){
		    paramstr.append(`allowances${i}`,document.getElementsByClassName('allowancename')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('allowancepercent').length; i++){
		    paramstr.append(`amountpercentage${i}`,document.getElementsByClassName('allowancepercent')[i].value);
		}
		paramstr.append('allgridsize',document.getElementsByClassName('allowancename').length);
		
		for(i=0; i<document.getElementsByClassName('deductionname').length; i++){
		    paramstr.append(`deductions${i}`,document.getElementsByClassName('deductionname')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('deductionpecent').length; i++){
		    paramstr.append(`dedamountpercentage${i}`,document.getElementsByClassName('deductionpecent')[i].value);
		}
		paramstr.append('dedgridsize',document.getElementsByClassName('deductionname').length);
    }
    
        try{
	 paramstr.append('photofilename',document.getElementById('promotions_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('promotions_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function promotionsFormDataupdate() {
    
    let paramstr = new FormData();
    paramstr.append('id', document.getElementById('id').value);
    paramstr.append('personnelmatter', 'PROMOTION')
    paramstr.append('pid', prompersonnelvalue)
    paramstr.append('entrydate', document.getElementById('promotions_entrydate').value);
    paramstr.append('title', document.getElementById('promotions_title').value);
    paramstr.append('level', document.getElementById('promotions_level').value);
    if(compensationOpen == true){
        for(i=0; i<document.getElementsByClassName('allowancename').length; i++){
		    paramstr.append(`allowances${i}`,document.getElementsByClassName('allowancename')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('allowancepercent').length; i++){
		    paramstr.append(`amountpercentage${i}`,document.getElementsByClassName('allowancepercent')[i].value);
		}
		paramstr.append('allgridsize',document.getElementsByClassName('allowancename').length);
		
		for(i=0; i<document.getElementsByClassName('deductionname').length; i++){
		    paramstr.append(`deductions${i}`,document.getElementsByClassName('deductionname')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('deductionpecent').length; i++){
		    paramstr.append(`dedamountpercentage${i}`,document.getElementsByClassName('deductionpecent')[i].value);
		}
		paramstr.append('dedgridsize',document.getElementsByClassName('deductionname').length);
    }
    
        try{
	 paramstr.append('photofilename',document.getElementById('promotions_file').files[0].name);		
	 paramstr.append('userphotoname',document.getElementById('promotions_file').files[0]);

    }catch(ex){
	 paramstr.append('photofilename','-');		
	 paramstr.append('userphotoname','-');
	 
   }
   
    return paramstr
}
function promotionsFormDatatable() {
    
    let paramstr = new FormData();
    paramstr.append('personnelmatter', 'promotion')
        if(document.getElementById('promotionsPPIDD'))paramstr.append('personnelid', document.getElementById('promotionsPPIDD').value);
   
    return paramstr
}
function clearpromotionsinputs() {
    
    document.getElementById('promotions_personnel').value = '';
    document.getElementById('promotions_entrydate').value = '';
    document.getElementById('promotions_title').value = '';
    document.getElementById('promotions_level').value = '';
        try{
	 document.getElementById('promotions_file').files = null;
    }catch(ex){
   }
}

const rerunpromotions =()=>{
    document.getElementById('promotions_submitbtn').textContent = 'Submit';
    document.getElementById("promotions").click();
}

const promotionsloadimg=(objfile)=>{
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `promotions-file`)
                document.getElementById('promotionspreview').appendChild(img);
                img.src = URL.createObjectURL(objfile.files[0]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
}

async function orepromotions() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('promotions.php', 'override')  
        
        jtabledata = document.getElementById('promotionspersonneltablecontent');
        // paginationLimit = 10;
        initializePaginationParams();
        
        
        // POPULATE DATALIST FOR PERSONNEL INPUT
        callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popperpromdlis, 'silent');
        callController('fetchlevel.php', null, 'fetchlevel', null,  popprolevel, 'silent');
        if(document.getElementById('promotionaddallowance')){
	    document.getElementById('promotionaddallowance').addEventListener('click', e=>{
	        let eleh = document.createElement('div');deposits
        eleh.setAttribute('name', 'allowancepersonnelcontainer');
        let x = `
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <input class="jformcontrol jmargin-top promvrfy allowancename" type="text" id="${Date.now()}allowanceamount" placeholder="Allowance name" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <input class="jformcontrol jmargin-top promvrfy allowancepercent" type="number" id="${Date.now()}allowpercent" placeholder="Percentage %" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                             <div id="" style="font-size: small;margin-left:0px" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                        </div>
                    </div>
                `
        let elem = eleh.innerHTML = x;        
        document.getElementById('promotionsallowance').append(eleh);
        	    }, true)
        	}
        	if(document.getElementById('promotionadddeduction')){
	    document.getElementById('promotionadddeduction').addEventListener('click', e=>{
	        let eleh = document.createElement('div');
        eleh.setAttribute('name', 'allowancepersonnelcontainer');
        let x = `
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <input class="jformcontrol jmargin-top promvrfy deductionname" type="text" id="${Date.now()}deductamount" placeholder="Deductions name" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <input class="jformcontrol jmargin-top promvrfy deductionpecent" type="number" id="${Date.now()}deductpercent" placeholder="Percentage %" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                             <div id="" style="font-size: small;margin-left:0px" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                        </div>
                    </div>
                `
        let elem = eleh.innerHTML = x;        
        document.getElementById('promotionsdeduction').append(eleh);
        	    }, true)
        	}
        if(document.getElementById('promotions_submitbtn'))document.getElementById('promotions_submitbtn').addEventListener('click', e=>{
            if(document.getElementById('promotions_submitbtn').textContent == 'Submit'){
                if(compensationOpen == true){
                    callController('personnelmatterscript.php', promotionsFormData(), 'personnelmatterscript', getallid('promvrfy'), rerunpromotions,);
                }else{
                    callController('personnelmatterscript.php', promotionsFormData(), 'personnelmatterscript', getallid('promvrfy2'), rerunpromotions,);
                }
            }else{
                if(compensationOpen == true){
                    checkprompersonnel(document.getElementById('promotions_personnel'));
                    callController('personnelmatterscript.php', promotionsFormDataupdate(), 'personnelmatterscript', getallid('promvrfy'), rerunpromotions,);
                }else{
                    checkprompersonnel(document.getElementById('promotions_personnel'));
                    callController('personnelmatterscript.php', promotionsFormDataupdate(), 'personnelmatterscript', getallid('promvrfy2'), rerunpromotions,);
                }
            }
            // clearpromotionsinputs()
        },true);
        // STAFF CONPENSATION FUNCTION
        if(document.getElementById('promotionstaffcompensation'))document.getElementById('promotionstaffcompensation').addEventListener('click', e=>{
            if(!validateInputsComponent(['promotions_personnel']))return;
            if(document.getElementById('promotionstaffcompensation').nextElementSibling.style.height == '0px'){
                compensationOpen = true
                popstaffcompensationpromotion('open');
            }else{
                compensationOpen = false
                document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = '0px';
            }
            setTimeout(()=>{
                if(!validateInputsComponent(['promotions_personnel'])){
                    compensationOpen = false
                    document.getElementById('promotionstaffcompensation').nextElementSibling.style.height = '0px';
                }
            }, 2000)
        })
        setTimeout(()=>{
            if(sessionStorage.getItem('viewpersonnelpromotionsfunct')){
                let personnelsessiondata = JSON.parse(sessionStorage.getItem('viewpersonnelpromotionsfunct'));
                const promotionsparams=()=>{
                    var paramstr = new FormData();
    		
            		paramstr.append('personnelmatter', 'promotion');
            		paramstr.append('personnelid', personnelsessiondata[0].personnel.staffid);
            		
            	    return paramstr;
            
            	};
                //  FOR promotions TABLE SINGLE PERSONNEL
                callController('fetchpersonnelmatters.php', promotionsparams(), 'SINGLEfetchpersonnelmatters', null, promotionspersonnelepaginate, 'silent');
                document.getElementById('promotions_personnel').value = checkprompersonnelid(personnelsessiondata[0].personnel.staffid);
                document.getElementById('promotions_level').value = personnelsessiondata[0].personnel.levelid;
                prompersonnelvalue = personnelsessiondata[0].personnel.staffid;
                document.getElementById('promotions_personnel').setAttribute('readonly', true);
                document.getElementsByClassName('oremainheader')[0].innerHTML = `PROMOTION <br><span style="color:green;text-transform:uppercase">[${checkprompersonnelid(prompersonnelvalue)}]</span><input id="promotionsPPIDD" type="hidden" value="${personnelsessiondata[0].personnel.staffid}"/>`;
                // document.getElementById('qualificationnname').value = personnelsessiondata[0].qualificationnname ? personnelsessiondata[0].qualificationnname : '';
                sessionStorage.removeItem('viewpersonnelpromotionsfunct');
             }else{
                //  FOR promotions TABLE ALL PERSONNEL
                callController('fetchpersonnelmatters.php', promotionsFormDatatable(), 'ALLfetchpersonnelmatters', null, promotionspersonnelepaginate, 'silent');
                if(document.getElementById('promotionsPPIDD')){
                    document.getElementById('promotions_personnel').value = checkprompersonnelid(document.getElementById('promotionsPPIDD').value);
                    document.getElementById('promotions_personnel').setAttribute('readonly', true)
                }else{
                    document.getElementById('promotions_personnel').removeAttribute('readonly')  
                }
             }
             popstaffcompensationpromotion();
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


var orepromotionsbbtn = document.getElementById("promotions");
if (orepromotionsbbtn) orepromotionsbbtn.addEventListener("click", orepromotions, false);





//     const popprolevel=(result)=>{
// 	    document.getElementById('promotionslevel').innerHTML += result.data.data.map(data=>{
// 	        return(`
// 	            <option value="${data.id}"> ${data.level.toUpperCase()} </option>
// 	        `)
// 	    })
// 	}
// callController('fetchpersonnels.php', null, 'fetchpersonnels', null, popperpromdlis, 'silent');