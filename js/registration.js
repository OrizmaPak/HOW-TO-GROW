let email, password, confirmPassword, role, userLocation, firstname, lastname, othername, phone, address, question1, answer1, question2, answer2, departmenthead, dateofbirth, form;
window.onload = function() {
    form = document.getElementById('registrationform')
    if(form) {
        email = form.querySelector('#email')
        password = form.querySelector('#password')
        confirmpassword = form.querySelector('#confirmpassword')
        role = form.querySelector('#role')
        userLocation = form.querySelector('#location')
        firstname = form.querySelector('#firstname')
        lastname = form.querySelector('#lastname')
        othername = form.querySelector('#othername')
        phone = form.querySelector('#phone')
        address = form.querySelector('#address')
        question1 = form.querySelector('#question1')
        answer1 = form.querySelector('#answer1')
        question2 = form.querySelector('#question2')
        answer2 = form.querySelector('#answer2')
        dateofbirth  = form.querySelector('#dateofbirth')
        //console.log(dateofbirth)

        if(document.querySelector('button#submit')) document.querySelector('button#submit').addEventListener('click', e => runSupplierFormValidations(e))
    }
    fetchLocations()
}
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
}

async function fetchLocations() {
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
        if(userLocation){
            userLocation.innerHTML = ''
            userLocation.innerHTML = '<option value="" selected="">--Select Location --</option>'+options
        }
    }
}

async function createAccount(event) {
    event.target.disabled = true;
    event.target.innerHTML = 'Creating...'

    var request = getAjaxObject();
    request.open('POST',`../controllers/userscript.php`,true);
    request.onreadystatechange = function(){
        if(request.readyState == 1){}
        if(request.readyState == 4 && request.status == 200){
            event.target.disabled = false;
            event.target.innerHTML = 'Submit' 
            
            if(request.responseText) {
                let result = JSON.parse(request.responseText);
                if(result['status']) {
                    callModal('Account successfully created.', 1)
                    setTimeout(() => window.location = './login.php', 2000)
                }
                else {
                    callModal(`Error: ${result['message']}`, 0);
                    return 
                }
            } else return callModal(`Error! Unable to create account, try again..`, 0);
            
        }else{
            event.target.innerHTML = 'Submit'
            event.target.disabled = false;
        }
        
        try{
            e.stopPropagation();
        }catch(ex){}
    };
    
    request.setRequestHeader('Connection','close');
    request.send(getRegistrationParams());
}

function getRegistrationParams() {
    let paramstr = new FormData();
    paramstr.append('lastname',lastname.value);
    paramstr.append('firstname',firstname.value); 
    paramstr.append('othernames',othername.value);  
    paramstr.append('upw',password.value) ;
    paramstr.append('address',address.value);
    paramstr.append('phone',phone.value);
    paramstr.append('email',email.value);
    paramstr.append('location_id', userLocation.value);
    paramstr.append('role',role.value);
    paramstr.append('question1',question1.value);
    paramstr.append('question2',question2.value);
    paramstr.append('answer1',answer1.value);
    paramstr.append('answer2',answer2.value);
    paramstr.append('dateofbirth',dateofbirth.value);
    return paramstr;
}

function runSupplierFormValidations (e) {

    inputs = [
        {input: email, validation: {required: 'Company name is required', pattern: 'Email not valid'}, pattern: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)},
        {input: password, validation: {required: 'password is required',}},
        {input: confirmpassword, validation: {required: 'confirm password is required'}},
        {input: role, validation: {required: 'Select account role'}},
        {input: userLocation, validation: {required: 'Select account location'}},
        {input: firstname, validation: {required: 'firstname is required'}},
        {input: lastname, validation: {required: 'lastname is required'}},
        {input: othername, validation: {required: 'othername is required'}},
        {input: phone, validation: {required: 'phone is required'}},
        {input: question1, validation: {required: 'Question one is required'}},
        {input: question2, validation: {required: 'Question two is required'}},
        {input: answer1, validation: {required: 'Answer One is required'}},
        {input: answer2, validation: {required: 'Answer One is required'}},
        {input: dateofbirth, validation: {required: 'dateofbirth is required'}},
        
    ]

    let validations = [];

    inputs.map( (field, index) => {
        let result = FieldValidator(Object.keys(field.validation), field.input, field.pattern, index);
        if(result)  validations.push(result) ;  
    })

    if(validations.length) validatorMapper(validations)

    else {
        if(password.value !== confirmpassword.value) {
            password.style.borderColor = 'red' ;
            callModal('Password does not match', 0);
        }
        else if(String(phone.value.length) < 10) {
            phone.style.borderColor = 'red' ;
            callModal('Provide a valid phone number', 0)
        }
        else {
            password.style.borderColor = '' 
            createAccount(e)
        }
    }
}

function validatorMapper (validationMap) {
    let message = '';
    if(validationMap.length) {
        validationMap.forEach( map => {
            controlFlag(0, map.element);
            message += inputs[map.loopindex].validation[map.validator] + ' <br />'
        })
        validationMap[0].element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
        callModal(message, 0);
    }
}
    
function controlFlag(status, element) {
    if(status === 0 ) element.style.borderBottom = '1px solid red'
    else element.style.borderBottom = '';
}

function FieldValidator(arrayOfValidation = [], element, regexp, loopindex) {
    
    let state;
    
    arrayOfValidation.forEach( validation => {

        if(validation) {

            if(validation.includes('pattern')) {
                let flag = pattern(element, regexp);
                if(flag ===  false)  state =  {element, 'validator': 'pattern', valid: flag, loopindex}
                else controlFlag(1, element);
            }
            else if (validation.includes('required')) {
                    let flag = required(element)
                    if(flag ===  false) state =  {element, 'validator': 'required', valid: flag, loopindex };
                    else controlFlag(1, element);
            }
            else {
                    controlFlag(1, element);
                    state =  null; 
            }  
        }

        return

    })

    return state
    

}

function pattern(element, regexp) {
    return element.value.toString().match(regexp) ? true : false
}

function required(element) {
    return element.value?.toString().length < 1 ? false : true 
}

const callModal =( mssg, status = 2, time = 5000, id)=> {
    
    const notificationmodal = document.getElementById('notificationmodal');
    var mbox = document.getElementById('messageBox2');
    if(id && document.getElementById(id)){
        document.getElementById(id).style.borderColor = 'red';
        mbox.innerHTML = mssg;
        notificationmodal.style.right = '0%';
        notificationmodal.style.opacity = '1';
        setTimeout(function(){
            notificationmodal.style.right = '-120%';
            notificationmodal.style.opacity = '0';
        }, time);	
        setTimeout(function(){
            document.getElementById(id).style.borderColor = 'rgb(62, 63, 64,.5)';
        }, 3000)
    };
    
    if(status == '0'){
        //document.getElementById(id).style.borderColor = 'red';
        notificationmodal.style.backgroundColor = '#360303';
        mbox.style.color = '#fff';
        mbox.innerHTML = mssg;
        notificationmodal.style.right = '0%';
        notificationmodal.style.opacity = '1';
        setTimeout(function(){
          notificationmodal.style.right = '-120%';
          notificationmodal.style.opacity = '0';
        }, time);
        
    } else if(status == '1'){
        //document.getElementById(id).style.borderColor = 'red';
        notificationmodal.style.backgroundColor = '#2a422c';
        mbox.style.color = '#fff';
        mbox.innerHTML = mssg;
        notificationmodal.style.right = '0%';
        notificationmodal.style.opacity = '1';
        setTimeout(function(){
          notificationmodal.style.right = '-120%';
          notificationmodal.style.opacity = '0';
        }, time);
        
    }else{
        notificationmodal.style.backgroundColor = 'white';
        mbox.style.color = 'black';
        mbox.innerHTML = mssg;
        notificationmodal.style.right = '0%';
        notificationmodal.style.opacity = '1';
        setTimeout(function(){
          notificationmodal.style.right = '-120%';
          notificationmodal.style.opacity = '0';
        }, time);
          
    }
    
    mbox.innerHTML = mssg;
    notificationmodal.style.right = '0%';
    notificationmodal.style.opacity = '1';
    setTimeout(function(){
      notificationmodal.style.right = '-120%';
      notificationmodal.style.opacity = '0';
    }, time);
      
};