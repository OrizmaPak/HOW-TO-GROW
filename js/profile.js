var pFiles, fileselect, input, form, submit;
async function openProfile() {
    await httpRequest('profile.php');
    
    form = document.getElementById('profileform');
    if(form) {
        firstname = form.querySelector('#firstname');
        lastname = form.querySelector('#lastname');
        othername = form.querySelector('#othernames');
        email = form.querySelector('#email');
        dateofbirth = form.querySelector('#dateofbirth');
        phone = form.querySelector('#phone');
        address = form.querySelector('#address');
        role = form.querySelector('#role');
        userLocation = form.querySelector('#location');
        question1 = form.querySelector('#question1');
        answer1 = form.querySelector('#answer1');
        question2 = form.querySelector('#question2');
        answer2 = form.querySelector('#answer2');
        upw = form.querySelector('#upw');
        supervisor1 = form.querySelector('#supervisor1')
        supervisor2 = form.querySelector('#supervisor2')
    
        
        pFiles = document.querySelector('#document')
        fileselect = document.querySelector('.file-action')
        if(fileselect) input = fileselect.querySelector('input[id="document"]')
        
        if(fileselect) fileselect.addEventListener('click', () =>{ if(input) input.click()})
        if(input) input.addEventListener('change', (e) => onProfileFileInputChange(e.target))
        
        if(form.querySelector('button#submit')) form.querySelector('button#submit').addEventListener('click', validateProfileForm);
        
        await fetchNavProfileLocations()
        await fetchAllProfileUsers()
        await fetchProfile();
        
    }
}

async function fetchProfile() {
    let result = await fetch('../controllers/fetchuserprofile.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        try {
            firstname.value = res.firstname
            lastname.value = res.lastname
            othername.value = res.othernames
            dateofbirth.value = res.dateofbirth 
            phone.value = res.phone 
            address.value = res.address
            userLocation.value = res.location_id
            question1.value = res.question1
            question2.value = res.question2
            answer1.value = res.answer1
            answer2.value = res.answer2
            
            let sup1 = (profileusers.find( item => item.email == res.supervisoremail));
            let sup2 = (profileusers.find( item => item.email == res.supervisoremail2));
            supervisor1.value = sup1 ? sup1.firstname?.concat(' ', sup1.lastname, ' ', sup1.othername ?? '') : ''
            supervisor2.value = sup2 ? sup2.firstname?.concat(' ', sup2.lastname, ' ', sup2.othername ?? '') : ''
            
        }
        catch(e) { console.log(e)}
    }
}

async function fetchAllProfileUsers (cb=null) {
    let result = await fetchRequest('../controllers/fetchallusers.php');
    if(result) {
        let parseResult = JSON.parse(result);
        checkSession();
        if(parseResult.status){
            profileusers = parseResult.data;
            let options = '<option value="" selected="">--Select Supervisor --</option>';
            profileusers?.map( item =>  options += `<option value="${item.firstname?.concat(' ', item.lastname, ' ', item.othername ?? '')}">`)
            
            if(document.getElementById('supervisor1')){
                let datalist1 = document.createElement('datalist')
                datalist1.innerHTML = options;
                datalist1.id = "supervisor1list"
                document.getElementById('supervisor1').parentElement.appendChild(datalist1)
            }
            if(document.getElementById('supervisor2')) {
                let datalist2 = document.createElement('datalist')
                datalist2.innerHTML = options;
                datalist2.id = "supervisor2list"
                document.getElementById('supervisor1').parentElement.appendChild(datalist2)
            }
        }
    }
}



async function fetchNavProfileLocations() {
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) {
        let data = res.data?.data;
        let options = '';
        data.map(function(item, index){
            options += `
                <option value="${item.id}"> ${item.location} </option>
            `
        })
        // console.log(document.querySelector('#profileform #location'), data)
        if(document.querySelector('#profileform #location')){
            document.querySelector('#profileform #location').innerHTML = ''
            document.querySelector('#profileform #location').innerHTML = '<option value="" selected="">--Select Location --</option>'+options
            document.querySelector('#profileform #location').value = assetsUrl.sessionLocation
            document.querySelector('#profileform #location').innerHTML = `${ document.querySelector('#profileform #location').options[document.querySelector('#profileform #location').selectedIndex].outerHTML }`
        }
    }
}


function validateProfileForm() {

    inputs = [
        { input: firstname, validation: {required: 'firstname is required'}},
        { input: lastname, validation: {required: 'lastname is required'}},
        { input: othername, validation: {required: 'othername is required'}},
        { input: email, validation: {required: 'email is required'}},
        { input: dateofbirth, validation: {required: 'dateofbirth  is required'}},
        { input: phone, validation: {required: 'phone  is required'}},
        { input: address, validation: {required: 'address  is required'}},
        { input: role, validation: {required: 'role  is required'}},
        { input: userLocation, validation: {required: 'userLocation  is required'}},
        { input: question1, validation: {required: 'question1  is required'}},
        { input: question2, validation: {required: 'question2  is required'}},
        { input: answer2, validation: {required: 'answer2  is required'}},
        { input: upw, validation: {required: 'upw  is required'}}
    ]

    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field?.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else  saveProfileForm()
}
   
   
var	saveProfileForm = function(e){ 
	showSpinner();
	var request = getAjaxObject();
    
    request.open('POST','../controllers/userscript.php',true);
    
    request.onreadystatechange = function(e){
        if(request.readyState == 4 && request.status == 200){  
            hideSpinner();
            if(request.responseText) {
                
                let parseRequest = JSON.parse(request.responseText)
                
                if(parseRequest.status){
                    callModal('Profile Saved', 1)
                }
                else  return callModal(parseRequest.message, 0)
                
            } else  return callModal('Error: Request failed', 0)
        }
        else return hideSpinner();

        try{
            e.stopPropagation();
        }catch(ex){}
    }

    
    request.setRequestHeader('Connection','close'); 
    request.send(getProfileFormParams());
	
} 

function getProfileFormParams() {
    let paramstr = new FormData(document.getElementById('profileform'))
    paramstr.append('supervisoremail', (profileusers?.find( item => item.firstname?.concat(' ', item.lastname, ' ', item.othername ?? '') == document.getElementById('supervisor1').value))?.email)
    paramstr.append('supervisoremail2', (profileusers?.find( item => item.firstname?.concat(' ', item.lastname, ' ', item.othername ?? '') == document.getElementById('supervisor2').value))?.email)
    if(paramstr) {
        try {
            paramstr.append('photofilename',input.files[0].name);		
		    paramstr.append('userphotoname',input.files[0]);
        }
        catch(ex){
    	 paramstr.append('photofilename','-');		
    	 paramstr.append('userphotoname','-');
    	 
       }
    }
    return paramstr;
}

function profileFileTypeValidator(selectedFiles) {
    let isValid = false;
    let selectedFilesArray = Object.values(selectedFiles);
    selectedFilesArray.forEach(file => {
        let splitFileName = file.name.split('.');
        let extension = splitFileName[splitFileName.length - 1];
        if (['jpg','jpeg', 'png'].includes(extension)) isValid = true;
        else isValid = false;
    })  
    return isValid;
}


function onProfileFileInputChange(event) {

    let previewEl = document.querySelector('.file-area');
    if(previewEl) previewEl.innerHTML = '';
    
    let selectedFiles = input.files;

    if (!profileFileTypeValidator(selectedFiles)) {
        errorBox('Unsupported file selected')
        input.value = event = null;
    }

    else {
                
        for(let i = 0; i < selectedFiles.length; i++) {
            let splitFileName = selectedFiles[i].name.split('.');
            let extension = splitFileName[splitFileName.length - 1];
            if(['pdf', 'docx'].includes(extension?.toLowerCase())) {
                const div = document.createElement('div')
                div.style.cssText = 'border-radius:5px;border:1px solid rgba(0, 0, 0, 0.2);padding:30px;font-size:12px'
                div.innerHTML = selectedFiles[i].name;
                previewEl.appendChild(div)
            }
            else {
                const img = document.createElement("img");
                img.style.cssText = 'width:120px;max-height: 150px;border-radius:5px;';
                img.setAttribute('id', `promotion-file-${i}`)
                previewEl.appendChild(img);
                img.src = URL.createObjectURL(event.files[i]); 
                img.onload = function() { URL.revokeObjectURL(img.src) }
            }
        }

    }
}
var profilebtn = document.getElementById('profile')
var profilebtn2 = document.getElementById('userprofileview')
if(profilebtn) profilebtn.addEventListener('click', openProfile, false)
if(profilebtn2) profilebtn2.addEventListener('click', openProfile, false)

