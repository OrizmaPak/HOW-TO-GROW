let programrejectedfetchdata, rejecttransationlocation;
let programrejectid 
var rtdrowPerPage = 10;
// rejecttransactiondate =rtd
var rtdinitpagination={
    rtdmatstart:0,
    rtdmatend:rtdrowPerPage
}
var rtdpaginationstate = {...rtdinitpagination};
const preogramrejectlocation =(result)=>{
        console.log(document.getElementById('matrejectedtransactiondatelocations'))
        if(document.getElementById('matrejectedtransactiondatelocations'))document.getElementById('matrejectedtransactiondatelocations').value = result.location_id;
    // if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
    //     if(document.getElementById('matrejectedtransactiondatelocations'))document.getElementById('matrejectedtransactiondatelocations').setAttribute('readonly', true);
    // }else{
    //     if(document.getElementById('matrejectedtransactiondatelocations'))document.getElementById('matrejectedtransactiondatelocations').setAttribute('readonly', true)
    // }
}


async function openProgramRejectedTransactionDate(){
'use strict';

    await httpRequest('programrejectedtransactiondate.php')
    
    callController('fetchrejectdates.php', null, 'fetchrejectdates', null)
    function getpermissionsParamsreturnview(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    callController('fetchuserprofile.php', getpermissionsParamsreturnview(), 'fetchuserprofile', null, preogramrejectlocation);
    
    var  getAjaxObject = function(){
    		var requeste;
    		try{
    			requeste = new XMLHttpRequest();
    		}catch(error){
    			try{
    				requeste = new ActiveXobject('Microsoft.XMLHTTP');
    			}catch(error){
    				return 'Error';
    			}
    		}
    		return requeste;
    	};
	
	


    function getLocations(){
        const requestItem = getAjaxObject();
        requestItem.open('POST','../controllers/fetchlocation.php',true);
        requestItem.onreadystatechange = function(){
          if(requestItem.readyState == 4 && requestItem.status == 200){
               
                // console.log(requestItem);
                const result = JSON.parse(requestItem.responseText);
                // console.log('Location', result);
                const locations= result.data.data;
                // matlocation=locations
                rejecttransationlocation = locations
                console.log('Location',locations )
          let strLocations = locations.map(each=>{
                 return`
                 <option value=${each.id}> ${each.location} </option>
                 `
             })
              if(  document.getElementById('matrejectedtransactiondatelocations')){
                const headerselect = '<option selected> Select Branch </option> <option value="ALL">All</option>'
                  document.getElementById('matrejectedtransactiondatelocations').innerHTML=  headerselect + strLocations.join(' ')
              }
              
            //  getRegistrationPonits(function(regPoint){renderRegistrationPointTable(regPoint, locations);})
             getRejectDate(rejecttransationlocation)
          }
          else{
            //   console.log("not success ",requestItem)
          }
        };
        
        requestItem.setRequestHeader('Connection','close');
      
        requestItem.send();
    }
    
    getLocations()


    function getRejectDate(locations){
        const requestItem = getAjaxObject();
        requestItem.open('POST','../controllers/fetchrejectdates.php',true);
        requestItem.onreadystatechange = function(){
          if(requestItem.readyState == 4 && requestItem.status == 200){
                const result = JSON.parse(requestItem.responseText);
                console.log('Location', result);
                const rejectdate= result.data.data;
                programrejectedfetchdata = rejectdate 
                renderRejectedTransactionDateTable(rejectdate, locations);
          }
          else{
              console.log("not success ",requestItem)
          }
        };
        requestItem.setRequestHeader('Connection','close');
        requestItem.send();
    }
    
rejecttransactionnext.addEventListener("click", function () {
    if (rtdpaginationstate.rtdmatend >= programrejectedfetchdata.length) {
    return;
    }
    rtdpaginationstate.rtdmatstart = rtdpaginationstate.rtdmatend;
    rtdpaginationstate.rtdmatend += rtdrowPerPage;
    renderRejectedTransactionDateTable(programrejectedfetchdata,rejecttransationlocation)
 
    
    
});

rejecttransactionprev.addEventListener("click", function () {
//   console.log("next Click");
  if (rtdpaginationstate.rtdmatstart < 1) {
    return;
  }
  rtdpaginationstate.rtdmatstart -= rtdrowPerPage;
  rtdpaginationstate.rtdmatend -= rtdrowPerPage;
  renderRejectedTransactionDateTable(programrejectedfetchdata,rejecttransationlocation)

});

    
    
    
    
    
    

	function validateRejectedTransaction(){
		var flag = 1;
		var mssg='';
		//used for BVN instead
		var matRejectedTransactionDate = document.getElementById('matrejectedtransactiondate');
		var matRejectedTransactionLocations = document.getElementById('matrejectedtransactiondatelocations');

		if(matRejectedTransactionDate.value.length < 1){
			mssg += 'Rejected date  is Invalid <br />';			
			matRejectedTransactionDate.style.borderColor = 'red';
			flag =0;
		}
		else{
			matRejectedTransactionDate.style.borderColor = 'lightgray';
		}
		
		if(matRejectedTransactionLocations.value.length < 1){
			mssg += 'Location is Invalid <br />';			
			 matRejectedTransactionLocations.style.borderColor = 'red';
			flag =0;
		}else{
			 matRejectedTransactionLocations.style.borderColor = 'lightgray';
		}
		
		
		if(flag == 0){
			
			var mbox = document.getElementById('messageBox');
			mbox.innerHTML = mssg;
			mbox.style.display = 'block';
			mbox.style.visibility = 'visible';

			setTimeout(function(){
				mbox.style.display = 'none';
				mbox.style.visibility = 'hidden';
				matRejectedTransactionDate.style.borderColor = 'lightgray';
				matRejectedTransactionLocations.style.borderColor = 'lightgray';
				// matRejectedTransactionOfficeBranch.style.borderColor = 'lightgray';
			

			}, 2000);	
			return false;
		}else{ 
			return true; 
		}

	}

	function getRejectedTransactionParams(){
		var paramstr = new FormData();
		if(programrejectid)paramstr.append('id',programrejectid);
		paramstr.append('location_id',document.getElementById('matrejectedtransactiondatelocations').value);
		paramstr.append('rejectdate',document.getElementById('matrejectedtransactiondate').value);
	    
	    for (var pair of paramstr.entries()) {
               console.log(pair[0] + ', ' + pair[1] + ', ' + typeof pair[1]); 
            }
	   return paramstr;
	}


var	saveRejectedTransaction= function(e){
		showSpinner();
		if(!validateRejectedTransaction()){ 
		    hideSpinner();
			return; 
		}
		var request = getAjaxObject();
		request.open('POST','../controllers/rejectdatescript.php',true);
		request.onreadystatechange = function(){
			if(request.readyState == 1){
			}
			if(request.readyState == 4 && request.status == 200){
			     console.log('request.responseText', request.responseText);
			     let result = JSON.parse(request.responseText);
			     console.log('result', result);
			     getRejectDate(rejecttransationlocation)
			     let stat = 2;
                 if(result.result === "Successful"){
                    stat = 1;
                    for(let i=0; i<document.getElementsByTagName('input').length; i++){
                        document.getElementsByTagName('input')[i].value = '';
                    }
                    for(let i=0; i<document.getElementsByTagName('select').length; i++){
                        document.getElementsByTagName('select')[i].value = '';
                    }
                }else{
                    stat = 0;
                }
			     callModal(result.result, stat)
			}
			else{
			 hideSpinner();
			}
			e.stopPropagation();
		 };
		request.setRequestHeader('Connection','close');
		request.send(getRejectedTransactionParams());
	};

if(document.getElementById('matrejectedtransactiondatesubmitbtn'))document.getElementById('matrejectedtransactiondatesubmitbtn').addEventListener('click',saveRejectedTransaction,false);

}


function editProgramRejected(itemid){
    programrejectid = itemid;
    const obj = programrejectedfetchdata.find(each => each.id == itemid)
    document.getElementById("matrejectedtransactiondate").value= obj.rejectdate;
    const selected = rejecttransationlocation.filter(each => { 
        return each.id == obj.location})[0]?.id;
    document.getElementById("matrejectedtransactiondatelocations").value= !selected ? 'ALL' : selected;
    document.getElementById("matrejectedtransactiondatesubmitbtn").textContent = 'Update';
}


function deleteProgramRejected(itemid){
    console.log(itemid)
    let newprogramrejectedfetchdata = programrejectedfetchdata.filter((item, index)=> +item.id !== itemid )
    programrejectedfetchdata = newprogramrejectedfetchdata 
    renderRejectedTransactionDateTable(newprogramrejectedfetchdata, rejecttransationlocation)
}

function renderRejectedTransactionDateTable(fetchrejectdate, fetchalllocation ) {
    programrejectedfetchdata = fetchrejectdate
    rejectTransactionindexBtnDisplay(programrejectedfetchdata)
    //  console.log("locations from callback 2", fetchalllocation[0]);
    const getLocation = (id) => fetchalllocation.find(el=>{ 
        return el.id == id})?.location ?? "ALL"
    let jtabledata = document.getElementById('rejectedtransactiondatetabledata');
    if(jtabledata) jtabledata.innerHTML = '';
    if(programrejectedfetchdata.length){
        programrejectedfetchdata.slice(rtdpaginationstate.rtdmatstart, rtdpaginationstate.rtdmatend).map( (item, index) => {
            jtabledata.innerHTML += `
                <tr class="source-row-item ${ index % 2 !== 0 ? 'odd-item' : '' }">
                    <td> ${ index +1} </td>
                    <td> ${ item.rejectdate } </td>
                    <td> ${ getLocation(item.location)  } </td>
                    <td class="btncolumn">
                         <span class="viewbtn mtablebtn mbtnblue" style="color:rgb(0, 105, 217);font-weight:bold" onclick="editProgramRejected(${item.id})" >Edit</span>&nbsp &nbsp
                          <span class="viewbtn mtablebtn mbtnred" style="color:rgb(0, 105, 217);font-weight:bold" onclick="deleteProgramRejected(${item.id})" >Delete</span>
                    </td>
                </tr>
            `;
        });
    }
      
  rejectTransactionHandleBtnColor()
}

const rejectTransactionindexBtnDisplay = (data) => {
    let rtdarrayLength = data.length
    if( rtdarrayLength <  rtdrowPerPage){
         rtdrowPerPage = rtdarrayLength
    }else{
        rtdrowPerPage = 10
    }
  const rtdlengthOfBtn = Math.ceil(rtdarrayLength / rtdrowPerPage);
  const rtdarrayOfButton =Array(rtdlengthOfBtn).fill().map((each,index)=> {
      return `<button  onclick="rejectTransactionIndexBtnClick(${index+1})" class="pagbtn rejecttransactionpagnumber" id="${index+1}" >${index+1}</button>`
  } )
//   console.log(arrayOfButton)
   document.getElementById('rejecttransactionindexBtn').innerHTML = rtdarrayOfButton.join(" ");
};

function rejectTransactionIndexBtnClick(i) {
    rtdpaginationstate.rtdmatstart = (i-1) * rtdrowPerPage;
 
    rtdpaginationstate.rtdmatend = rtdpaginationstate.rtdmatstart + rtdrowPerPage;
//   console.log(start, end)
    renderRejectedTransactionDateTable(programrejectedfetchdata,rejecttransationlocation)
}

function rejectTransactionHandleBtnColor(){
    console.log(paginationstate.matend/rowPerPage)
    document.querySelectorAll('.rejecttransactionpagnumber').forEach(each=>{
        if(+each.id  == (rtdpaginationstate.rtdmatend/rtdrowPerPage)){
            console.log(each)
            each.classList.add('pagicolor')
            console.log(each)
        }
        each.style.background ='#0000FF';
    })
}



var programRejectedTransactionDate = document.getElementById('programrejectedtransactiondate');
if(programRejectedTransactionDate) programRejectedTransactionDate.addEventListener('click',openProgramRejectedTransactionDate, false);










