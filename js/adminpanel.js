let toggler, modal,body,tabletoggles,overlay1,overlay2,modalcaller,canclebtn,confirmbtn,closemodalbtn,openmodalbtn,funaccountcontainer, allUsers, onlineUsers;
var datasource = [];

async function openAdminPanel(){
    
    await httpRequest('adminpanel.php')
    
    toggler = document.querySelector(".toggle");
    modal = document.querySelector(".modal");
    body = document.querySelector("body");
    tabletoggles = document.querySelectorAll(".tabletoggle");
    // tablemodal = document.querySelector('.tabletoggle');
    overlay1 = document.querySelector('.overlay1');
    overlay2 = document.querySelector('.overlay2');
    modalcaller = document.querySelectorAll('.unactive');
    canclebtn = document.querySelector('.canclebtn');
    confirmbtn = document.querySelector('.confirmbtn');
    closemodalbtn = document.querySelector('.closemodal');
    openmodalbtn = document.querySelector('.openmodal');
    funaccountcontainer = document.querySelector('.funaccountcontainer');


    //////// MANAGE MODAL LOGIC/////////
    toggler.addEventListener("click", function (e) {
    	e.stopPropagation();
    	modal.classList.toggle("hide");
    	console.log('mattth');
    });
    
    openmodalbtn.addEventListener('click',function(){
    	overlay2.classList.remove('hidden');
    	funaccountcontainer.classList.add('stylespecial');
    // 	console.log(funaccountcontainer.classList);
    	modal.classList.toggle("hide");
    });
    
    closemodalbtn.addEventListener('click',function(){
    	overlay2.classList.add('hidden');
    	funaccountcontainer.classList.remove('stylespecial');
    });
    
    modal.addEventListener("click", function (e) {
    	e.stopPropagation();
    });


    //////// CLOSING OF MODAL FROM BODY  LOGIC ///////////
    body.addEventListener("click", function (e) {
    	if (!modal.classList.contains("hide")) {
    		modal.classList.add("hide");
    	}
    	tabletoggles.forEach(val =>{
    		val.querySelector('.tablemodal').addEventListener('click',function(e){
    			e.currentTarget;
    			e.stopPropagation();
    			console.log(e);
    		});
    		e.stopPropagation();
    		// console.log(val.querySelector(".tablemodal"));
    		if(val.querySelector(".tablemodal").classList.contains('hide'))return;
    		val.querySelector(".tablemodal").classList.toggle('hide');
    	}); 
    });

    ////////// TABLE MODAL LOGIC /////////////
    tabletoggles.forEach(currenttoggle=>{
    	const tablemodal = currenttoggle.querySelector('.tablemodal');
    	const currentcolumn = tablemodal.parentElement.parentElement.parentElement;
    	currenttoggle.addEventListener('click', e=>{
    		e.stopPropagation();
    		currentcolumn.dataset.open='true';
    		const  current = e.currentTarget;
    		const toclose = Array.from(tabletoggles).filter(node=>{
    			return node != current;
    		});
    		toclose.forEach(values=>{
    			values.querySelector('.tablemodal').classList.add('hide');	
    		});
    		const rect = currenttoggle.getBoundingClientRect();
    		const rectp = document
    		.querySelector(".generaltableholder")
    		.getBoundingClientRect();
    		const specificmodalheight = 65;
    		const mattt = rectp.bottom - rect.top;
    		// const modalheight = tablemodal.clientHeight;
    		if (specificmodalheight > mattt) {
    			tablemodal.classList.add("tablemodalchangeposition");  
    		} else {
    			tablemodal.classList.remove("tablemodalchangeposition");
    		}
    		currenttoggle.querySelector('.tablemodal').classList.toggle('hide');
    	
    	});
    });
    
    modalcaller.forEach(currentmodalcaler =>{
    	currentmodalcaler.addEventListener('click', e=>{
    		console.log(e);
    		e.stopPropagation();
    		overlay1.classList.remove('hidden');
    	});
    });

    // Cancle button Logic
    canclebtn.addEventListener('click',function(){
      overlay1.classList.add('hidden');
      console.log('Olamide');
    });
    
    // Confirm button Logic 
    confirmbtn.addEventListener('click',function(){
    	tabletoggles.forEach(currenttoggle=>{
    	const parentcolumn = currenttoggle.parentElement.parentElement;
    	if(parentcolumn.dataset.open === 'true'){
    		if(parentcolumn.querySelector('.unactive').textContent ==='Activate'){
    			parentcolumn.querySelector('.active').textContent ='Activate';
    			parentcolumn.querySelector('.unactive').textContent = 'Disactivate';
    		}
    		else{parentcolumn.querySelector('.active').textContent ='Disactivate';
    		parentcolumn.querySelector('.unactive').textContent = 'Activate';
    	}
    	}
    	parentcolumn.dataset.open = 'false';
    	});
    	overlay1.classList.add('hidden');
    
    });
    
    jtabledata = document.getElementById('jtabledata')
    initializePaginationParams(adminsetCurrentPage)
     
    await fetchAllUsers();
    await fetchOnlineUsers(); 
}

async function fetchAllUsers (cb=null) {
    let result = await fetchRequest('../controllers/fetchallusers.php');
    if(result) {
        let parseResult = JSON.parse(result);
        console.log('admin panel result', parseResult)
        checkSession();
        if(parseResult.status){
            document.getElementById('regusers').innerHTML = parseResult.data.length;
            allUsers = datasource = parseResult.data;
            initPagination(datasource, adminsetCurrentPage)
        }
    }
}
const adminpanelrowbtn =(state, email)=>{
     function adminpparams(){
    var paramstr = new FormData();
    paramstr.append('email', email);
        return paramstr;
    };
    if(state =='activate'){
        callController('reactivateuser.php', adminpparams(), 'reactivateuser', null, resetPage)
    }
    if(state =='deactivate'){
        callController('deactivateuser.php', adminpparams(), 'deactivateuser', null, resetPage)
    }
}

function appendTableRows(item, index) {
    jtabledata.innerHTML += `
        <tr data-open="false" class="source-row-item">
            <td>
                <div class="flex" style="align-items:center">
                    ${item.rowstatus == "DEACTIVATED" ? `<button onclick="adminpanelrowbtn('activate', '${item.email}')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Activate</button>` : '' }
                    ${item.rowstatus == "ACTIVE" ? `<button onclick="adminpanelrowbtn('deactivate', '${item.email}')" style="padding: 5px 6px;cursor:pointer;border:1px solid red;outline:none;font-size:10px;color:red;background-color:transparent;border-radius:3px">Deactivate</button>` : '' }
                    ${item.rowstatus == "VERIFIED" ? `<button onclick="adminpanelrowbtn('deactivate', '${item.email}')" style="padding: 5px 6px;cursor:pointer;border:1px solid red;outline:none;font-size:10px;color:red;background-color:transparent;border-radius:3px">Deactivate</button>` : '' }
                </div>
            </td>
            <td>${item.firstname ?? ''}</td>
            <td>${item.lastname ?? ''}</td>
            <td>${item.othernames ?? ''}</td>
            <td>${item.online}</td>
            <td style="text-transform:lowercase">${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.role}</td>
            <td>${item.address}</td>
            <td>${item.supervisoremail}</td>
            <td class="active">${item.rowstatus == "VERIFIED" ? 'ACTIVE' : 'NOT ACTIVE' }</td>
        </tr>
    `
} 

var adminsetCurrentPage = (pageNum) => {

    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    prevRange = (pageNum - 1) * paginationLimit;
    currRange = pageNum * paginationLimit;
    if(jtabledata) jtabledata.innerHTML = '';
    if(datasource.length) {
        datasource.forEach( (item, index) => {
            if (index >= prevRange && index < currRange) {
                appendTableRows(item, index)
            }
        })
        if(document.querySelector('#alluserstable tbody').innerHTML === '') adminPanel.click()
    }
    else {
        jtabledata.innerHTML=  renderNoTableData()
    }
}


async function fetchOnlineUsers () {
    let result = await fetchRequest('../controllers/fetchonlineusers.php');
    if(result) {
        checkSession();
        let parseResult = JSON.parse(result);
        if(parseResult.status) {
            onlineUsers = parseResult.data;
            document.getElementById('onlineusers').innerHTML = parseResult.data.length;
        }
    }
}

function validateAdminPanel(){
	var flag = 1;
	var mssg='';
	//used for BVN instead
	
	if(flag == 0){
		
		var mbox = document.getElementById('messageBox');
		mbox.innerHTML = mssg;
		mbox.style.display = 'block';
		mbox.style.visibility = 'visible';

		setTimeout(function(){
			mbox.style.display = 'none';
			mbox.style.visibility = 'hidden';
		

		}, 2000);	
		return false;
	}else{ 
		return true; 
	}

}

function getAdminPanelParams(){
    var paramstr = new FormData();
    return paramstr;
}

var saveAdminPanel = function(e){
    showSpinner();
    if(!validateAdminPanel()){ 
        hideSpinner();
        return; 
    }
    var request = getAjaxObject();

    request.open('POST','../controllers/slipnumbersscript.php',true);
    request.onreadystatechange = function(){
        if(request.readyState == 1){ }
        if(request.readyState == 4 && request.status == 200){
            // console.log('request.responseText', request.responseText)
            let result = JSON.parse(request.responseText);
            // console.log('result', result);
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
            
            callModal(result.result, stat);
        }else{
            hideSpinner();
        }

        e.stopPropagation();
    };

    request.setRequestHeader('Connection','close');
    request.send(getAdminPanelParams());

};


//if(document.getElementById('matregistrationslipnosubmitbtn'))document.getElementById('matregistrationslipnosubmitbtn').addEventListener('click',saveRegistrationSlipno,false);


var adminPanel = document.getElementById('adminpanel')
if(adminPanel)adminPanel.addEventListener('click', openAdminPanel, false)
