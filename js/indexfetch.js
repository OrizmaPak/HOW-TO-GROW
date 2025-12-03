    const naira = `&#8358;`
    function getAjaxObject(){
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
    
    const jsmemory = [];

    let currentfamily = '';
    
    const randomnumber =()=>{
        return Math.random()
    }
    
    const showSpinner=()=>{
        if(spinner.classList.contains('hidden'))spinner.classList.remove('hidden')
    }
    const hideSpinner=()=>{
        if(!spinner.classList.contains('hidden'))spinner.classList.add('hidden')
    }
    
    const navnoticeeer=(param)=>{
        //console.log('here highlight', param, 'jhghgjhhb')
        for(let i=0; i<navleftitems.children.length; i++){
			    if(navleftitems.children[i].classList.contains('activeclick'))navleftitems.children[i].classList.remove('activeclick')
			}
		let highlight = param.slice(0, -4);
		//console.log('highlight', highlight);
		//console.log(document.getElementById(highlight));
        try{
		if(!document.getElementById(highlight).classList.contains('activeclick'))document.getElementById(highlight).classList.add('activeclick')
        }catch(err){
            //console.log(err)
        }	
										
    }
    
function dynamiccomma(val=true){
        for(let i=0;i<document.getElementsByClassName('comma').length;i++){
            if(val && document.getElementsByClassName('comma')[i])document.getElementsByClassName('comma')[i].setAttribute('type', 'text')
            if(val && document.getElementsByClassName('comma')[i])document.getElementsByClassName('comma')[i].addEventListener('keyup', e=>{
                const value = e.target.value;
                const formattedValue = formatNumberWithCommas(value.replace(/,/g, ''));
                e.target.value = formattedValue;
            })
            if(val && document.getElementsByClassName('comma')[i].value)document.getElementsByClassName('comma')[i].value = formatNumberWithCommas(document.getElementsByClassName('comma')[i].value.replace(/,/g, ''));                
            if(!val)document.getElementsByClassName('comma')[i].value = document.getElementsByClassName('comma')[i].value.replaceAll(',', '') 
            if(!val){
                document.getElementsByClassName('comma')[i].addEventListener('keyup', e=>{
                console.log('')
            });
            // document.getElementsByClassName('comma')[i].removeEventListener('keyup')
                
            }
            if(!val)document.getElementsByClassName('comma')[i].setAttribute('type', 'number')
        }
}

// this is the interval that adds comma
    
function formatNumberWithCommas(number) {
            if (number === '') return '';
            const parts = number.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        }
    

async function controllerRequest(url, data = null) {
  try {
    showSpinner();
    const res = await fetch(url, { method: "POST", headers: new Headers(), body: data });
    const result = await res.text();
    hideSpinner();
    return result;
  } catch ({ message: error }) {
    //console.error(error);
  } finally {
    hideSpinner();
  }
}
  
    let curpage = '';
async function httpRequest(page, family = 'override', data = null, reset) {
    let result = '';
    
    // if(document.getElementsByClassName('old')[0]){
    //     document.getElementsByClassName('old')[0].id = 'olddata'
    // }
    
    // If the page is not 'checklogin.php', proceed with the logic
    if (page !== 'checklogin.php') {
        if (curpage === page && reset !== 'reset') {
            return;
        } else {
            curpage = page;
        }

        navrightcontainer.classList.remove('hidden');
        navrightcontainer3.classList.remove('hidden');
        navrightcontainer2.style.right = '100%';

        try {
            showSpinner();
            const res = await fetch(page, {
                method: "POST",
                headers: new Headers(),
                body: data
            });
            result = await res.text();
            hideSpinner();
        } catch (error) {
            console.error(error.message);
            hideSpinner();
            return; // Exit the function in case of error
        }

        // Update UI after the request is completed
        navnoticeeer(page);
        navnoticeeer(page);

        if (reset === 'reset') {
            navrightcontainer.innerHTML = '';
            navrightcontainer3.innerHTML = '';
        }

        // Update the appropriate container based on the class
        if (navrightcontainer3.classList.contains('z2')) {
            navrightcontainer.innerHTML = result;
        } else if (navrightcontainer.classList.contains('z2')) {
            navrightcontainer3.innerHTML = result;
        }

        // Switch screen based on the family logic
        if (currentfamily === '') {
            switchScreen('diffnewlanding');
        } else if (currentfamily.split('-')[0] === family.split('-')[0]) {
            const currentFamilyLevel = parseInt(currentfamily.split('-')[1]);
            const newFamilyLevel = parseInt(family.split('-')[1]);

            if (currentFamilyLevel > newFamilyLevel) {
                switchScreen('samechildreturning');
            } else {
                switchScreen('samechildlanding');
            }
        } else if (currentfamily.split('-')[0] !== family.split('-')[0] || currentfamily === 'override') {
            switchScreen('diffnewlanding');
        }

        currentfamily = family;

        // Save the current state to localStorage
        localStorage.removeItem('HTG-lastpage');
        localStorage.setItem('HTG-lastpage', `${page} ${family}`);

        // Ensure all actions are completed before calling the next request
        hideSpinner();
        await httpRequest('checklogin.php');

        // Set all input date fields to the current date
        const inputs = document.getElementsByTagName('input');
        const currentDate = new Date().toISOString().split('T')[0];
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type === 'date') {
                inputs[i].value = currentDate;
            }
        }
    } 

    // Handle 'checklogin.php' case
    if (page === 'checklogin.php') {
        let vvcur = curpage;

        navrightcontainer.classList.remove('hidden');
        navrightcontainer3.classList.remove('hidden');
        navrightcontainer2.style.right = '100%';

        try {
            const res = await fetch(page, {
                method: "POST",
                headers: new Headers(),
                body: data
            });
            const resultt = await res.text();
            if (!resultt) return;
            
            curpage = page;
            result = resultt;
        } catch (error) {
            console.error(error.message);
        } finally {
            hideSpinner();
        }

        if (reset === 'reset') {
            navrightcontainer.innerHTML = '';
            navrightcontainer3.innerHTML = '';
        }

        if (navrightcontainer3.classList.contains('z2')) {
            navrightcontainer.innerHTML = result;
        } else if (navrightcontainer.classList.contains('z2')) {
            navrightcontainer3.innerHTML = result;
        }

        if (currentfamily === '') {
            switchScreen('diffnewlanding');
        } else if (currentfamily.split('-')[0] === family.split('-')[0]) {
            const currentFamilyLevel = parseInt(currentfamily.split('-')[1]);
            const newFamilyLevel = parseInt(family.split('-')[1]);

            if (currentFamilyLevel > newFamilyLevel) {
                switchScreen('samechildreturning');
            } else {
                switchScreen('samechildlanding');
            }
        } else if (currentfamily.split('-')[0] !== family.split('-')[0] || currentfamily === 'override') {
            switchScreen('diffnewlanding');
        }

        currentfamily = family;

        localStorage.removeItem('HTG-lastpage');
        localStorage.setItem('HTG-lastpage', `${page} ${family}`);
        
        curpage = vvcur;
    }
}


// async function httpRequest(page, family = 'override', data = null, reset) {
//     let refresh = ''
//     let result = '';
//     //console.log(curpage, page) 
//     //console.log('page', page) 
//     if(page !== 'checklogin.php'){
//         if(curpage === page){
//         if(reset == 'reset'){
//             curpage = page
//         }else{
//             return
//         }
//     }else{
//         curpage = page
//     }
//     //console.log('curpage', curpage)
//         navrightcontainer.classList.remove('hidden');
//         navrightcontainer3.classList.remove('hidden');
//         navrightcontainer2.style.right = '100%';
//   try {
//     showSpinner();
//     const res = await fetch(page, { method: "POST", headers: new Headers(), body: data });
//     const resultt = await res.text();
//     hideSpinner();
//     result = resultt;
//   } catch ({ message: error }) {
//     console.error(error);
//   } finally {
//     //document.getElementById("footpanel-wrapper").classList.add("hide"); 
//     hideSpinner();
//   }
//   navnoticeeer(page);
//   navnoticeeer(page);
// // 		console.log(request.responseText)
// 	    if(reset == 'reset')navrightcontainer.innerHTML = ''
// 	    if(reset == 'reset')navrightcontainer3.innerHTML = ''
// 	if(navrightcontainer3.classList.contains('z2')){
// 	    navrightcontainer.innerHTML = result;
// 	}
// 	if(navrightcontainer.classList.contains('z2')){
// 	    navrightcontainer3.innerHTML = result;
// 	}
// 	if(currentfamily === ''){
// 	    switchScreen('diffnewlanding');
// 	}else if(currentfamily.split('-')[0] == family.split('-')[0]){
// 	    if(parseInt(currentfamily.split('-')[1]) > parseInt(family.split('-')[1])){
// 	        switchScreen('samechildreturning');
// 	    }else if(parseInt(currentfamily.split('-')[1]) < parseInt(family.split('-')[1])){
// 	        switchScreen('samechildlanding');
// 	    }else if(parseInt(currentfamily.split('-')[1]) == parseInt(family.split('-')[1])){
// 	        switchScreen('samechildlanding');
// 	    }else{
// 	    switchScreen('diffnewlanding');
// 	    }
// 	}else if(currentfamily.split('-')[0] != family.split('-')[0] || currentfamily === 'override'){
// 	    switchScreen('diffnewlanding');
// 	}
// 	    currentfamily = family;
//         localStorage.removeItem('HTG-lastpage');
//         localStorage.setItem('HTG-lastpage', `${page} ${family}`);
    
//     hideSpinner();
//     httpRequest('checklogin.php')
//     /*SET ALL DATE TO CURRENT DATE*/
//     var inputs = document.getElementsByTagName('input');

//             // Loop through the inputs
//             for (var i = 0; i < inputs.length; i++) {
//                 // Check if the input is of type "date"
//                 if (inputs[i].type === 'date') {
//                     // Set the value to the current date (YYYY-MM-DD format)
//                     var currentDate = new Date().toISOString().split('T')[0];
//                     inputs[i].value = currentDate;
//                 }
//             }
//     }
    
//     if(page === 'checklogin.php'){
//         let vvcur = curpage
//     //     if(curpage === page){
//     //     if(reset == 'reset'){
//     //         curpage = page
//     //     }else{
//     //         return
//     //     }
//     // }else{
//     //     curpage = page
//     // }
//     //console.log('curpage', curpage)
//         navrightcontainer.classList.remove('hidden');
//         navrightcontainer3.classList.remove('hidden');
//         navrightcontainer2.style.right = '100%';
//   try {
//     const res = await fetch(page, { method: "POST", headers: new Headers(), body: data });
//     const resultt = await res.text();
//     hideSpinner();
//     if(!resultt)return
//     curpage = page
//     result = resultt;
//   } catch ({ message: error }) {
//     console.error(error);
//   } finally {
//     //document.getElementById("footpanel-wrapper").classList.add("hide"); 
//     hideSpinner();
//   }
// //   navnoticeeer(page);
// //   navnoticeeer(page);
// // 		console.log(request.responseText)
// 	    if(reset == 'reset')navrightcontainer.innerHTML = ''
// 	    if(reset == 'reset')navrightcontainer3.innerHTML = ''
// 	if(navrightcontainer3.classList.contains('z2')){
// 	    navrightcontainer.innerHTML = result;
// 	}
// 	if(navrightcontainer.classList.contains('z2')){
// 	    navrightcontainer3.innerHTML = result;
// 	}
// 	if(currentfamily === ''){
// 	    switchScreen('diffnewlanding');
// 	}else if(currentfamily.split('-')[0] == family.split('-')[0]){
// 	    if(parseInt(currentfamily.split('-')[1]) > parseInt(family.split('-')[1])){
// 	        switchScreen('samechildreturning');
// 	    }else if(parseInt(currentfamily.split('-')[1]) < parseInt(family.split('-')[1])){
// 	        switchScreen('samechildlanding');
// 	    }else if(parseInt(currentfamily.split('-')[1]) == parseInt(family.split('-')[1])){
// 	        switchScreen('samechildlanding');
// 	    }else{
// 	    switchScreen('diffnewlanding');
// 	    }
// 	}else if(currentfamily.split('-')[0] != family.split('-')[0] || currentfamily === 'override'){
// 	    switchScreen('diffnewlanding');
// 	}
// 	    currentfamily = family;
//         localStorage.removeItem('HTG-lastpage');
//         localStorage.setItem('HTG-lastpage', `${page} ${family}`);
//         curpage = vvcur
//     }
  
// }
  
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
   window.onmouseup =(e)=>{
    document.getElementsByName('ul-id')[0].children[1].classList.add('activeb');
    document.getElementsByName('sh-id')[0].children[2].classList.add('activeb');
    let el = e.target;
    let orefirst = ''
            let oresecond = ''
            let orethird = ''
            let oreforth = ''
            window.onmousedown=(e)=>{
                let el = e.target;
                // if(el.tagName.toLowerCase() == 'button' && el.classList.contains('orebtndeleete') && el.textContent == 'Delete'){
                //     console.log('enable', el.parentElement.parentElement.parentElement.children[1].textContent, document.getElementsByName(`${el.parentElement.parentElement.parentElement.children[1].textContent}`)[0]);
                //     if(document.getElementsByName(`${el.parentElement.parentElement.parentElement.children[1].textContent}`))document.getElementsByName(`${el.parentElement.parentElement.parentElement.children[1].textContent}`)[0].disabled = false;
	               // if(document.getElementById('build_selectitem'))document.getElementById('build_selectitem').value = '';
	               // if(document.getElementById('orequantity'))document.getElementById('orequantity').value = '';
                //     el.parentElement.parentElement.parentElement.remove();
                // }
                if(el.tagName.toLowerCase() == 'span' && el.classList.contains('orebtnedit') && el.textContent == 'edit'){
                    el.parentElement.parentElement.children[0].disabled = false;
                    el.parentElement.parentElement.children[1].disabled = false;
                    el.parentElement.parentElement.children[2].disabled = false;
                    el.parentElement.parentElement.children[3].disabled = false;
                    el.parentElement.parentElement.children[0].classList.remove('centerede');
                    el.parentElement.parentElement.children[1].classList.remove('centerede');
                    el.parentElement.parentElement.children[2].classList.remove('centerede');
                    el.parentElement.parentElement.children[3].classList.remove('centerede');
                    el.parentElement.parentElement.children[0].style.color = 'black';
                    el.parentElement.parentElement.children[1].style.color = 'black';
                    el.parentElement.parentElement.children[2].style.color = 'black';
                    el.parentElement.parentElement.children[3].style.color = 'black';
                    el.parentElement.parentElement.children[0].style.background = 'rgba(10, 114, 226, 0.381)';
                    el.parentElement.parentElement.children[1].style.background = 'rgba(10, 114, 226, 0.381)';
                    el.parentElement.parentElement.children[2].style.background = 'rgba(10, 114, 226, 0.381)';
                    el.parentElement.parentElement.children[3].style.background = 'rgba(10, 114, 226, 0.381)';
                    el.parentElement.parentElement.children[0].focus();
                    orefirst = el.parentElement.parentElement.children[0].value
                    oresecond = el.parentElement.parentElement.children[1].value
                    orethird = el.parentElement.parentElement.children[2].value
                    oreforth = el.parentElement.parentElement.children[3].value
                    el.textContent = '';
                    setTimeout(() => {
                        el.textContent = 'update';
                        el.nextElementSibling.textContent = 'cancel';
                    }, 500);
                }
                if(el.tagName.toLowerCase() == 'span' && el.classList.contains('orebtndelte') && el.textContent == 'delete'){
                    el.parentElement.parentElement.remove();
                }
                if(el.tagName.toLowerCase() == 'span' && el.classList.contains('orebtnedit') && el.textContent == 'update'){
                    el.parentElement.parentElement.children[0].disabled = true;
                    el.parentElement.parentElement.children[1].disabled = true;
                    el.parentElement.parentElement.children[2].disabled = true;
                    el.parentElement.parentElement.children[3].disabled = true;
                    el.parentElement.parentElement.children[0].classList.add('centerede');
                    el.parentElement.parentElement.children[1].classList.add('centerede');
                    el.parentElement.parentElement.children[2].classList.add('centerede');
                    el.parentElement.parentElement.children[3].classList.add('centerede');
                    el.parentElement.parentElement.children[0].style.color = 'rgba(0, 0, 0, 0.644)';
                    el.parentElement.parentElement.children[1].style.color = 'rgba(0, 0, 0, 0.644)';
                    el.parentElement.parentElement.children[2].style.color = 'rgba(0, 0, 0, 0.644)';
                    el.parentElement.parentElement.children[3].style.color = 'rgba(0, 0, 0, 0.644)';
                    el.parentElement.parentElement.children[0].style.background = 'white';
                    el.parentElement.parentElement.children[1].style.background = 'white';
                    el.parentElement.parentElement.children[2].style.background = 'white';
                    el.parentElement.parentElement.children[3].style.background = 'white';
                    el.parentElement.parentElement.children[0].focus();
                    el.textContent = '';
                    setTimeout(() => {
                        el.textContent = 'edit';
                        el.nextElementSibling.textContent = 'delete';
                    }, 500);
                }
                
                if(el.tagName.toLowerCase() == 'span' && el.classList.contains('orebtndelte') && el.textContent == 'cancel'){
                    el.parentElement.parentElement.children[0].disabled = true;
                    el.parentElement.parentElement.children[1].disabled = true;
                    el.parentElement.parentElement.children[2].disabled = true;
                    el.parentElement.parentElement.children[3].disabled = true;
                    el.parentElement.parentElement.children[0].classList.add('centerede');
                    el.parentElement.parentElement.children[1].classList.add('centerede');
                    el.parentElement.parentElement.children[2].classList.add('centerede');
                    el.parentElement.parentElement.children[3].classList.add('centerede');
                    el.parentElement.parentElement.children[0].style.color = 'rgba(0, 0, 0, 0.644)';
                    el.parentElement.parentElement.children[1].style.color = 'rgba(0, 0, 0, 0.644)';
                    el.parentElement.parentElement.children[2].style.color = 'rgba(0, 0, 0, 0.644)';
                    el.parentElement.parentElement.children[3].style.color = 'rgba(0, 0, 0, 0.644)';
                    el.parentElement.parentElement.children[0].style.background = 'white';
                    el.parentElement.parentElement.children[1].style.background = 'white';
                    el.parentElement.parentElement.children[2].style.background = 'white';
                    el.parentElement.parentElement.children[3].style.background = 'white';
                    el.parentElement.parentElement.children[0].focus();
                    el.parentElement.parentElement.children[0].value = orefirst;
                    el.parentElement.parentElement.children[1].value = oresecond;
                    el.parentElement.parentElement.children[2].value = orethird;
                    el.parentElement.parentElement.children[3].value = oreforth;
                    el.textContent = '';
                    setTimeout(() => {
                        el.textContent = 'delete';
                        el.nextElementSibling.textContent = 'edit';
                    }, 500);
                }
            }
    if(el.tagName.toLowerCase() == 'img' && el.classList.contains('prmitemimg') || el.tagName.toLowerCase() == 'span' && el.parentNode.classList.contains('prmitem') ){
        el.parentNode.children[0].value == '1' ? el.parentNode.children[0].value = '0' : el.parentNode.children[0].value = '1'
        el.parentNode.children[0].value == '1' ? el.parentNode.children[1].setAttribute('src', '../images/on-button.png') : el.parentNode.children[1].setAttribute('src', '../images/off-button.png')
    }
    //console.log('b4', navbranchselect.value)
    if(el.parentNode.id != 'navnoticeholder' && el.parentNode.parentNode.id != 'navnoticeholder' && el.id != 'navnotificationbtn'){
        if(navnotificationbtn.classList.contains('open'))navnotificationfunction();
    }
    if(el.parentNode.id != 'navuserholder' && el.parentNode.parentNode.id != 'navuserholder' && el.id != 'navuserbtn' && el.id != 'navuserdropdown'){
        if(navuserbtn.classList.contains('open'))navuserfunction();
    }
    if(el.parentNode.id != 'ul-id' && el.parentNode.parentNode.id != 'md-select' && el.id != 'md-select' && el.id != 'navuserdropdown'){
        if(document.getElementById('md-select').classList.contains('active'))document.getElementById('md-select').classList.remove('active');
        if(navbranchselectbtn.classList.contains('activeb'))navbranchselectbtn.classList.remove('activeb');
        setTimeout(() => {
            imgselectbranch.classList.remove('hidden');
        }, 500);
    }
    if(el.parentNode.id != 'sh-id' && el.parentNode.parentNode.id != 'sh-select' && el.id != 'sh-select' && el.id != 'navuserdropdown'){
        if(document.getElementById('sh-select').classList.contains('active'))document.getElementById('sh-select').classList.remove('active');
        if(navsearchselectbtn.classList.contains('activeb'))navsearchselectbtn.classList.remove('activeb');
        setTimeout(() => {
            imgselectsearch.classList.remove('hidden');
        }, 500);
    }
    if(el.tagName.toLowerCase() == 'li' && el.classList.contains('navbranchlist')){
        navbranchselect.value = el.textContent;
        navbranchselectbtn.textContent = navbranchselect.value;
        //console.log('now', navbranchselect.value)
        let index = locations.indexOf(el.textContent);
        if (index > -1) { // only splice array when item is found
            locations.splice(index, 1); // 2nd parameter means remove one item only
            locations.splice(1, 0, el.textContent)
          }
        ulid.innerHTML = locations.map(data =>{
            return (`<li role="option" class="navbranchlist" >${data}</li>`)
          }).join('')
          document.getElementsByName('ul-id')[0].children[1].classList.add('activeb');
          if(document.getElementById('md-select').classList.contains('active'))document.getElementById('md-select').classList.remove('active');
          if(navbranchselectbtn.classList.contains('activeb'))navbranchselectbtn.classList.remove('activeb');
          setTimeout(() => {
            imgselectbranch.classList.remove('hidden');
        }, 500);
    }
    if(el.tagName.toLowerCase() == 'li' && el.classList.contains('navsearchlist')){
        navsearchselect.value = el.textContent;
        navsearchselectbtn.textContent = navsearchselect.value;
        //console.log('now', navsearchselect.value)
        let index = searchitems.indexOf(el.textContent);
        if (index > -1) { // only splice array when item is found
            searchitems.splice(index, 1); // 2nd parameter means remove one item only
            searchitems.splice(2, 0, el.textContent)
          }
        shid.innerHTML = searchitems.map(data =>{
            return (`<li role="option" class="navsearchlist" >${data}</li>`)
          }).join('')
          if(document.getElementById('sh-select').classList.contains('active'))document.getElementById('sh-select').classList.remove('active');
          if(navsearchselectbtn.classList.contains('activeb'))navsearchselectbtn.classList.remove('activeb');
          setTimeout(() => {
            imgselectsearch.classList.remove('hidden');
        }, 500);
    }
    if(el.tagName.toLowerCase() == 'div' && el.classList.contains('navdropper')){
        let id = el.id;
        ainavhandle(id);
    }
    if(el.tagName.toLowerCase() == 'p' && el.parentNode.classList.contains('navdropper') || el.tagName.toLowerCase() == 'img' && el.parentNode.classList.contains('navdropper')){
        let id = el.parentNode.id;
        ainavhandle(id);
    }
    if(el.tagName.toLowerCase() == 'img' && el.parentNode.parentNode.classList.contains('navdropper')){
        let id = el.parentNode.parentNode.id;
        ainavhandle(id);
    }
    if(el.tagName.toLowerCase() == 'div' && el.classList.contains('ttesstt')){
        //  loadReorderList(`${el.id}.php`, 'override', `${el.id}.js`); 
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  
  
 
//   NAVIGATION PAGES
// if(document.getElementById('maindashboard'))document.getElementById('maindashboard').addEventListener('click', async(e)=>{
//     await httpRequest('maindashboardd.php', 'maind-0');
// });


    maindashboardd()
    showSpinner() 

  
//   function getFilterParams(){
//     var paramstr = new FormData();
//     paramstr.append('location', "departure");
//     paramstr.append('fplrecordname', fplrecordnameRequest);
//     console.log('location: ' + "departure");
//     console.log('fplrecordname: ' + fplrecordnameRequest);
// for (var pair of paramstr.entries()) {
//             //   console.log(pair[0] + ', ' + pair[1]); 
//             // return(pair[0]+ ', ' + pair[1]); 
//             }
//     return paramstr;
// }

 function validateInputsComponent(z){

	var flag = 1;
	var mssg='';
	for(var i=0; i<z.length; i++){
	    let x = z[i];
	    if(document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'input' || document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'select' ){
	       // if(document.getElementById(x).getAttribute('type') == 'text')
	        if(document.getElementById(x).value.length < 1 ){
	           // console.log(document.getElementById(x).value.length < 1, document.getElementById(x).value.length, document.getElementById(x).value) 
     			try{mssg += `${document.getElementById(x).previousElementSibling ? document.getElementById(x).previousElementSibling.textContent ? document.getElementById(x).previousElementSibling.textContent : document.getElementById(x).getAttribute("placeholder") : document.getElementById(x).getAttribute("placeholder")} value is Invalid <br />`}
     			catch(err){
     			    console.log(err)
     			    
     			};			
     			document.getElementById(x).style.borderColor = 'red';
     			flag =0;
 		    }else{
 		        //console.log(document.getElementById(x).value.length, document.getElementById(x).value)
 			    document.getElementById(x).style.borderColor = 'lightgray';
 		    }
	    }else{
	       console.log(`${x} is not an input`)
	    }
	}
	
	if(flag == 0){
		var mbox = document.getElementById('messageBox');
		mbox.innerHTML = mssg;
		mbox.style.display = 'block';
		mbox.style.visibility = 'visible';
		setTimeout(function(){
			mbox.style.display = 'none';
			mbox.style.visibility = 'hidden';
			for(var i=0; i<z.length; i++){
     		    let x = z[i]
     		    if(document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'input' || document.getElementById(x) && x !== 'id' && document.getElementById(x).tagName.toLowerCase() == 'select' ){
     		        if(document.getElementById(x).value.length < 1 || document.getElementById(x).value ){
             			document.getElementById(x).style.borderColor = 'lightgray';
         		    }
         	    }
		    }
	    }, 2000);
	    
		return false;
		
	}else{ 
		return true; 
	}
}

const callController =(controller, params, name, validate, funct, silent, e)=>{ 
    silent ? null : showSpinner();
    if(validate){
        if(!validateInputsComponent(validate)){ 
		hideSpinner();
		return null; 
		}
    }
    var request = getAjaxObject();
    request.open('POST',`../controllers/${controller}`,true);
    request.onreadystatechange = function(){
        if(request.readyState == 1){
        }
        if(request.readyState == 4 && request.status == 200){
            hideSpinner();
                //console.log(`controller request.responseText ${name}`, request.responseText)
                //
                let result = JSON.parse(request.responseText);  
                //console.log(result);
                //console.log("Log: " + request.responseText)
                if(result["code"] == "invalid session data. Proceed to login"){
                    // window.location.href = "login.php";
                    return;
                }
                if(result["message"] == "invalid session data. Proceed to login"){
                    // window.location.href = "login.php";
                    return;
                }
                if(result["result"] === "ERROR"){
                    // console.log(`contrlr status ${name}: ERROR`);
                    callModal(`Failed: ${result.message ? result.message : ''}`, 0);
                    return null;
                }else{
                    //  console.log(`controller ${controller}`, result, 'NB: result returned','name', `${name}`);
                    if(!silent){
                        if(result.message == 'Successful'){
                            callModal(`${result.message ? result.message : 'Successful'}`, 1)
                        }else{
                            callModal(`${result.message}`, 2)
                        }
                    }
                    //console.log(funct)
                    if(funct){
                        return funct(result);
                    } 
                }
        }else{
            hideSpinner();
        }
        try{
            e.stopPropagation();
        }catch(ex){}
    };
    
    if(params != null){
            // console.log(name, 'PARAMS BELOW');    
        for (var pair of params.entries()) {
            // console.log(pair[0] + ', ' + pair[1]);   
            // return(name, pair[0]+ ', ' + pair[1]); 
            }
    }
    request.setRequestHeader('Connection','close');
    request.send(params);
};

// let data = "ORGANISATION INFO|ADMIN PANEL|USER ACTIVITY LOG|PERMISSION SETTING|MARKETERS TARGET|REGISTER SLIP NUMBERS|REJECT TRANSACTION DATE|MY PROFILE|CONFIRM BOOKLET RENEWAL|RENEWAL REPLACEMENT OF BOOKLET|SERIAL NUMBER CHECK|REGISTRATION POINT|BRANCH SELECTION|SCHEDULE ROSTER|REGISTER INVENTORY|SUPPLIER|STOCK-IN HISTORY|STOCK LEDGER VIEW|INTAKE|OUTTAKE|RETURN|GIFTS|ITEM LIST|EDITED ITEMS REPORT|STOCK STATUS REPORT|WITHDRAWAL VIEW BALANCE|WAREHOUSE SALES|UPDATE PROVISION|FIND UPDATED RECORD|VIEW WAREHOUSE SALES LEDGER|STOCK CONTROL|CONSUMABLE WITHDRAWAL TRANSACTION|NON-CONSUMABLE WITHDRAWAL TRANSACTION|VIEW CUSTOMERS|SAVINGS PRODUCT|SAVINGS ACCOUNT PRODUCTS|ADD SAVINGS ACCOUNTS|CUSTOMER DEPOSIT|CONSUMABLE ITEMS|PROPERTY STOCKOUT|ADD PROPERTY ACCOUNT|WITHDAWALS - CONSUMABLES|WITHDRAWALS - NONCONSUMABLES|PROPERTY TRANSACTION REPORT|VIEW COMPOSITE ITEMS|VIEW PROPERTY ACCOUNTS|ADD LOAN FEES|ADD LOAN ACCOUNT|ADD COLLATERAL|APPROVE LOAN|EXTEND LOAN|VIEW ACTIVE LOANS|LOAN TRANSACTION REPORT|LOAN CLASSIFICATION REPORT|DUE LOANS|MISSED REPAYMENTS|PAST MATURITY DATE|NO REPAYMENT|REPAYMENT SCHEDULE|EXPENDITURES|WITHDRAWALS|GROUP DEPOSIT|APPROVE COLLECTIONS|DEPOSITS|GROUP DEPOSIT APPROVAL|DAILY TRANSACTION|NET TRANSACTION|NET TRANSACTION ENTRY|EDIT ERRORS IN DEPOSIT|TRANSFER SAVINGS|CONFIRM BALANCE BROUGHT FORWARD|COUNTER POST WRONG ACCOUNT ENTRY|EXCESS CUSTOMER DEPOSIT|BRANCH FUND TRANSFER|COUNTER DEPOSIT INCORRECT AMOUNT PAID|UPDATE EXCESS|UPDATE|USER CONFIRM TRANSACTION|BANK TRANSACTION|VIEW EXCESS NIA ACCOUNT|VIEW EXCESS NIA SOLUTION|REGISTER WRONG ACCOUNT ENTRY|ADD DEPARTMENT|ADD LEVEL|ADD GROUP|REGISTER PERSONNEL|ADD GUARANTOR|ADD EMPLOYMENT RECORD|ADD REFEREE|ADD QUALIFICATION|QUERY|PROMOTIONS|TERMINATION|SUSPENSION|LEAVE|WARNING|VIEW STAFF RECORDS|VIEW STAFF LOAN|VIEW MONTHLY SALARY SCHEDULE|PRE SALARY APPROVAL|CONFIRM SALARY|EXCESS NIA DECLARATION|ADD GL ACCOUNT|VIEW GL ACCOUNTS|ADD GL TRANSACTION|VIEW GL TRANSACTION HISTORY|VIEW TRIAL BALANCE|VIEW INCOME STATEMENT|VIEW BALANCE SHEET|CREDIT REPORTS|VIEW RETURN CASH TRANSACTION|VIEW EDITED SERVICE CHARGE|VIEW CASH|SUBMITTED ERRORS|GROUP SYSTEM CASH ANALYSES";

const controllNavigationPermissions =(dataa)=>{
    let Permission_Switch = 'ON' // 'ON or OFF'
    document.getElementById('navleftitems').style.visibility = 'hidden';
    // console.log('our data', dataa)
     if(!dataa.permissions)return console.log('email is invalid')
    let data = dataa.permissions 
    // FOR SUB ITEMS navleftsubitem
    let subitems = document.getElementsByClassName('navleftsubitem')
    if(dataa.role != "SUPERADMIN"){
    for(i=0; i<subitems.length; i++){
        //console.log(data.split('|'));
        //console.log(data.split('|').includes(subitems[i].children[0].textContent.toUpperCase()), subitems[i].children[0].textContent);
        if(data.split('|').includes('USER PROFILE') && subitems[i].children[0].textContent.toUpperCase().trim() == 'MY PROFILE' && Permission_Switch === 'ON')subitems[i].classList.remove('hidden');
        if(data.split('|').includes(subitems[i].children[0].textContent.toUpperCase().trim())){
            if(Permission_Switch === 'ON')subitems[i].classList.remove('hidden'); 
        }else{
            if(Permission_Switch === 'ON')subitems[i].classList.add('hidden');
        }
    }
    }
    document.getElementById('navleftitems').style.visibility = 'visible';
}
function getindexEmailParams(){
    var paramstr = new FormData();
    // console.log('this is the email.', document.getElementById('indexEmail').value)
    paramstr.append('email', document.getElementById('indexEmail').value);
    return paramstr;
};
callController('fetchuserprofile.php', getindexEmailParams(), 'indexEmail', null, controllNavigationPermissions, 'silent')
  window.addEventListener('load', (e)=>{
    //   if(localStorage.getItem("HTG-lastpage")){
    //       await httpRequest(localStorage.getItem("HTG-lastpage").split(' ')[0], localStorage.getItem("HTG-lastpage").split(' ')[1], localStorage.getItem("HTG-lastpage").split(' ')[2]);
    //       return;
    //   }
      localStorage.setItem('HTG-lastpage', `userregistration.php admin-0 userregistration.js`);
      
    //   document.getElementById('fullnamediv').innerHTML = document.getElementById('lastname').value+' '+document.getElementById('firstname').value
    //   document.getElementById('locationdiv').innerHTML = document.getElementById('sessionlocationname').value
      
    //   await httpRequest('maindashboardd.php', 'maind-0');
    
      hideSpinner();
  }, false);
  
  
//   index block
// setInterval(()=>{
    
// },10000);

const mataccoutnumberchecker=(data, accountno, element, name='')=>{
	    const gltransconfirmacc =(result)=>{
	        if(result.message == 'Not successful'){
	            callModal(`${data} is not a valid account number`)
	            element.style.color = 'red';
    	        element.style.borderColor = 'red'; 
    	        callModal(`${data} is not a valid account`, 0);
    	        setTimeout(()=>{
    	            element.value = '';
    	            accountno.textContent = '';
    	            element.style.color = 'black';
    	            setTimeout(()=>{
            	        element.style.borderColor = 'lightgray';
    	            },1000)
    	        },1000)
    	    }else if(result.message == 'Successful'){
    	        accountno.style.color = 'black';
    	        accountno.style.textTransform = 'uppercase';
    	        accountno.textContent = result.data[0].customerdetail.lastname + ' ' + result.data[0].customerdetail.firstname+ ' ' + result.data[0].customerdetail.othernames
    	        function parr(){
    	           // alert()
    	            let p = new FormData()
    	            p.append('accountnumber', data) 
    	            return p
    	        }
    	        function actt(result){
    	            console.log(result)
    	            if(result?.data) {
    	                document.getElementById('slipnoserialnumberfrom').value = result?.data?.[0]?.serialnumber;
    	                document.getElementById('matregistrationslipnoserialnumberfrom').value = result.data[0].serialnumberfrom;
    	                document.getElementById('matregistrationslipnoserialnumberto').value = result.data[0].serialnumberto;
    	                document.getElementById('reviewslipid').value = result.data[0].id;
    	            }
    	        }
    	        if(name)callController('fetchserialcomplaintbyaccount.php', parr(), 'fetchserialcomplaintbyaccount', [], actt)
    	    }
	    }
	    callController('fetchaccountprofile.php', gltranscustomeraccparamsdata(data), 'fetchaccountprofile', [`${element.id}`], gltransconfirmacc, 'silent')
	};
	    
const getallid =(cls)=>{
        // document.getElementsByClassName(`${cls}`);
        let idss = []
        for(i=0; i<document.getElementsByClassName(`${cls}`).length; i++){
            idss.push(document.getElementsByClassName(`${cls}`)[i].id)
        }
        // console.log(idss)
        return idss
    }
	
const clearAllInputs =(container)=>{
        // document.getElementsByClassName(`${container}`).children;
        let idss = []
        for(i=0; i<container.length; i++){
            if(!document.getElementById(`${container[i]}`).classList.contains('exempt') && !document.getElementById(`${container[i]}`).hasAttribute('readonly'))document.getElementById(`${container[i]}`).value = "";
        }
        // console.log('all input cleared')
    }
    
  function formatCurrency(amount) {
  // Use the Intl.NumberFormat object for currency formatting
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'decimal',
  minimumFractionDigits: 0,
  });

  // Format the amount using the formatter
  const formattedCurrency = formatter.format(amount);

  return formattedCurrency;
}

// TO GET GENERAL LEVEL GROUP AND DEPARTMENT
const generalpersonnellevel =(result)=>{
    document.getElementById('storedlevel').innerHTML = result.data.map(data=>{
	        return(`
	            <option disabled value="${data.level.id}"> ${data.level.level.toUpperCase()} </option>
	        `)
	    }).join('')
}
const generalpersonnelgroup =(result)=>{
    document.getElementById('storedgroup').innerHTML = result.data.data.map(data=>{
	        return(`
	            <option disabled value="${data.id}"> ${data.groupname.toUpperCase()} </option>
	        `)
	    }).join('')
}
const generalpersonneldepartment =(result)=>{
    document.getElementById('storeddepartment').innerHTML = result.data.map(data=>{
	        return(`
	            <option disabled value="${data.id}"> ${data.department.toUpperCase()} </option>
	        `)
	    }).join('')
}

const getthelevel =(id)=>{
    if(!id){
        console.log('id=', id)
        return 'Not found'
    }
    document.getElementById('storedlevel').value = id
    if(document.getElementById('storedlevel').options[document.getElementById('storedlevel').selectedIndex])return document.getElementById('storedlevel').options[document.getElementById('storedlevel').selectedIndex].textContent;
}

const getthegroup =(id, name='storedgroup')=>{
    document.getElementById(name).value = id
    if(document.getElementById(name).options[document.getElementById(name).selectedIndex].textContent)return document.getElementById(name).options[document.getElementById(name).selectedIndex].textContent;
    return
}

const getthedepartment =(id)=>{
    document.getElementById('storeddepartment').value = id
    return document.getElementById('storeddepartment').options[document.getElementById('storeddepartment').selectedIndex].textContent;
}

const getpersonneldataready =()=>{
    callController('fetchdepartment.php', null, 'fetchdepartment', null,  generalpersonneldepartment, 'silent')
    callController('fetchgroupname.php', null, 'fetchgroupname', null,  generalpersonnelgroup, 'silent')
    callController('fetchlevel.php', null, 'fetchlevel', null,  generalpersonnellevel, 'silent')
}

    
let immediateNotice = 0
runNotification()
setInterval(() => { runNotification() }, 1800000)
function runNotification(){
    immediateNotice = 0
    const fetchnonapprovedloansfunct =(result)=>notifier(result, 'fetchnonapprovedloans');
    const bookletspendingapproval =(result)=>notifier(result, 'bookletspendingapproval');
    const fetchpersonnelnotification =(result)=>notifier(result, 'fetchpersonnelnotification');
    const exceededmaturityproperties =(result)=>notifier(result, 'exceededmaturityproperties');
    const fetchinventoryforapproval =(result)=>notifier(result, 'fetchinventoryforapproval');
    const depositspendingapproval =(result)=>notifier(result, 'depositspendingapproval');
    const approvecustomer =(result)=>notifier(result, 'approvecustomer');
    const notinstockproperty =(result)=>notifier(result, 'notinstockproperty');
    const notifier =(result, name)=>{
        if(name == 'fetchnonapprovedloans'){
            if(result.data){
                immediateNotice = immediateNotice + 1;
                document.getElementById('notificationNumber').textContent = immediateNotice;
                let Element = document.createElement('div');
                Element.setAttribute('class', 'navnote'); 
                Element.setAttribute('onclick', 'document.getElementById("approveloans").click();navnotificationfunction()');
                Element.innerHTML = `
                 <h3>${result.data.length} Loan${result.data.length > 1 ? 's' : ''} Pending Approval</h3>
                 <p>${result.data.map((data, index)=>{
                     if(index > 3){
                         return
                     }else{
                         return(`&#x20A6;${formatCurrency(data.amount)} loan for ${data.accountname} <br>`)
                     }
                 }).join('')}</p>
                `;
                document.getElementById('navnoticeholder').append(Element);
            }
        }
        if(name == 'bookletspendingapproval'){
            if(result.data){
                immediateNotice = immediateNotice + 1
                document.getElementById('notificationNumber').textContent = immediateNotice;
                let Element = document.createElement('div');
                Element.setAttribute('class', 'navnote');
                Element.setAttribute('onclick', 'document.getElementById("approvebooklets").click();navnotificationfunction()');
                Element.innerHTML = `
                 <h3>Booklets Pending Approval</h3>
                 <p>${result.data.length} Booklet${result.data.length > 1 ? 's' : ''} Awaiting Approval</p>
                `;
                document.getElementById('navnoticeholder').append(Element);
            }
        }
        if(name == 'fetchpersonnelnotification'){
            if(result.data){
                immediateNotice = immediateNotice + 1
                document.getElementById('notificationNumber').textContent = immediateNotice;
                let Element = document.createElement('div');
                Element.setAttribute('class', 'navnote');
                Element.setAttribute('onclick', 'document.getElementById("approvepersonnel").click();navnotificationfunction()');
                Element.innerHTML = `
                 <h3>Personnel Approvals Required</h3>
                 <p>${result.data.length} Personnel Member${result.data.length > 1 ? 's' : ''} Awaiting Approval</p>
                `;
                document.getElementById('navnoticeholder').append(Element);
            }
        }
        if(name == 'exceededmaturityproperties'){
            // console.log('spread the exceededmaturityproperties data', result)
            if(result.data){ 
                immediateNotice = immediateNotice + 1
                document.getElementById('notificationNumber').textContent = immediateNotice;
                let Element = document.createElement('div');
                Element.setAttribute('class', 'navnote');
                Element.setAttribute('onclick', 'document.getElementById("missedmaturity").click();navnotificationfunction()');
                Element.innerHTML = `
                 <h3>Missed Maturities</h3>
                 <p>${result.data.length} Maturity${result.data.length > 1 ? 'ies' : 'y'} Missed for ${result.data.map(dat=>dat.missedpropertymaturity.user).join(' & ')}</p>
                `;
                document.getElementById('navnoticeholder').append(Element);
            }
        }
        if(name == 'fetchinventoryforapproval'){
            // console.log('spread the exceededmaturityproperties data', result)
            if(result.data){ 
                immediateNotice = immediateNotice + 1
                document.getElementById('notificationNumber').textContent = immediateNotice;
                let Element = document.createElement('div');
                Element.setAttribute('class', 'navnote');
                Element.setAttribute('onclick', 'document.getElementById("approveinventory").click();navnotificationfunction()');
                Element.innerHTML = `
                 <h3>Inventory Item Approvals</h3>
                 <p>${result.data.length} Item${result.data.length > 1 ? 's' : ''} Pending Approval</p>
                `;
                document.getElementById('navnoticeholder').append(Element);
            }
        }
        if(name == 'depositspendingapproval'){
            // console.log('spread the exceededmaturityproperties data', result)
            if(document.getElementById('sessionrole').value !== 'SUPERADMIN' && !document.getElementById('sessionpermission').value.includes('APPROVE DEPOSIT'))return
            if(result.data){ 
                immediateNotice = immediateNotice + 1
                document.getElementById('notificationNumber').textContent = immediateNotice;
                let Element = document.createElement('div');
                Element.setAttribute('class', 'navnote');
                Element.setAttribute('onclick', 'document.getElementById("approvedeposits").click();navnotificationfunction()');
                Element.innerHTML = `
                 <h3>Deposit Approvals Required</h3>
                 <p>${result.data.length} Deposit${result.data.length > 1 ? 's' : ''} Pending Approval</p>
                `;
                document.getElementById('navnoticeholder').append(Element);
            }
        }
        if(name == 'approvecustomer'){
            // console.log('spread the exceededmaturityproperties data', result)
            if(document.getElementById('sessionrole').value !== 'SUPERADMIN' && !document.getElementById('sessionpermission').value.includes('APPROVE UPDATE OF CUSTOMER PROFILE'))return
            if(result.data){ 
                immediateNotice = immediateNotice + 1
                document.getElementById('notificationNumber').textContent = immediateNotice;
                let Element = document.createElement('div');
                Element.setAttribute('class', 'navnote');
                Element.setAttribute('onclick', 'document.getElementById("approvecustomer").click();navnotificationfunction()');
                Element.innerHTML = `
                 <h3>Customer Profile Updates Approval</h3>
                 <p>Approve Updates for ${result.data.length} Customer${result.data.length > 1 ? 's' : ''}</p>
                `;
                document.getElementById('navnoticeholder').append(Element);
            }
        }
            if(name == 'notinstockproperty'){
            // console.log('spread the exceededmaturityproperties data', result)
            if(document.getElementById('sessionrole').value !== 'SUPERADMIN' && !document.getElementById('sessionpermission').value.includes('VIEW PROPERTY ITEM NOT IN STOCK'))return
            if(result.data[0].accountnumber){ 
                immediateNotice = immediateNotice + 1
                document.getElementById('notificationNumber').textContent = immediateNotice;
                let Element = document.createElement('div');
                Element.setAttribute('class', 'navnote');
                Element.setAttribute('onclick', 'document.getElementById("viewpropertyitemnotinstock").click();navnotificationfunction()');
                Element.innerHTML = `
                 <h3>Property Items Out of Stock</h3>
                 <p>${result.data.length} Property Item${result.data.length > 1 ? 's' : ''} Currently Out of Stock</p>
                `;
                document.getElementById('navnoticeholder').append(Element);
            }
        }
    }
    
    callController('fetchnonapprovedloans.php', null, 'fetchnonapprovedloans', null, fetchnonapprovedloansfunct, 'silent');
    callController('bookletspendingapproval.php', null, 'bookletspendingapproval', null, bookletspendingapproval, 'silent');
    callController('fetchpersonnelnotification.php', null, 'fetchpersonnelnotification', null, fetchpersonnelnotification, 'silent');
    callController('exceededmaturityproperties.php', null, 'exceededmaturityproperties', null, exceededmaturityproperties, 'silent');
    callController('fetchinventoryforapproval.php', null, 'fetchinventoryforapproval', null, fetchinventoryforapproval, 'silent');
    callController('depositspendingapproval.php', null, 'depositspendingapproval', null, depositspendingapproval, 'silent');
    callController('fetchcustomerdataforupdate.php', null, 'fetchcustomerdataforupdate', null, approvecustomer, 'silent');
    callController('fetchnotinstockpropertyitems.php', null, 'fetchnotinstockpropertyitems', null, notinstockproperty, 'silent');
}


    let resultOfLocations
    let resultOfCompanies

    const resultt =(result)=>{
            return resultOfLocations = result.data.data
        }
    
    const getLocationById =(id)=>{
        const resulttt =(result)=>{
            resultOfLocations = result.data.data;
            getLocationById(id)
        }
        if(!resultOfLocations)callController('fetchlocation.php', null, 'fetchlocation', null, resulttt, 'silent');
        let obj = resultOfLocations.find(dat=>dat.id == id);
        if(obj)return obj.location
        if(!obj)return id
    }

        callController('fetchlocation.php', null, 'fetchlocation', null, resultt, 'silent');
        
        const comresult =(result)=>{
            return resultOfCompanies = result.data.data
        }
        const getCompanyById =(id)=>{
        const resulttt =(result)=>{
            resultOfCompanies = result.data.data;
            getCompanyById(id)
        }
        if(!resultOfCompanies)callController('fetchsupplierscript.php', null, 'fetchsupplierscript', null, resulttt, 'silent');
        let obj = resultOfCompanies.find(dat=>dat.id == id);
        return obj? obj.companyname : ''
    }
        
        callController('fetchsupplierscript.php', null, 'fetchsupplierscript', null, comresult, 'silent');
        
    const getUsers =(funct)=>{
       return callController('fetchallusers.php', null, 'fetchallusers', null, funct, 'silent')
    }
    
    const getGroup =(funct)=>{
       return callController('fetchgroupname.php', null, 'fetchgroupname', null,  funct)
    }


function formatDate(inputDateTime) {
  if (!inputDateTime) return '-';
  
  // Get the date part only
  const datePart = inputDateTime.split(' ')[0];
  
  // Create a Date object
  const dateObj = new Date(datePart);
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) return '-';
  
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  
  // Function to get the ordinal suffix
  function getOrdinalSuffix(n) {
    if (n > 3 && n < 21) return 'th'; // Special case for 11th to 13th
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  
  const ordinalSuffix = getOrdinalSuffix(day);
  
  const formattedDateTime = `${day}${ordinalSuffix} ${month}, ${year}`;
  
  return formattedDateTime;
}


function formatDateTime(inputDateTime) {
  if (!inputDateTime) return '-';

  const dateObj = new Date(inputDateTime);

  if (isNaN(dateObj.getTime())) return '-';

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  // Get time parts
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 => 12

  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Ordinal suffix
  function getOrdinalSuffix(n) {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  const ordinalSuffix = getOrdinalSuffix(day);
  const formattedDateTime = `${day}${ordinalSuffix} ${month}, ${year} at ${hours}:${paddedMinutes}${ampm}`;

  return formattedDateTime;
}


function checkInputwithdatalist(inputid, dataListid) {
     console.log('inputs',inputid, dataListid)
    const inputElement = document.getElementById(`${inputid}`);
    const datalistOptions = document.getElementById(`${dataListid}`).options;
    const inputValue = inputElement.value;

    let isMatch = false;
    for (let i = 0; i < datalistOptions.length; i++) {
        if (inputValue === datalistOptions[i].value) {
            isMatch = true;
            break;
        }
    }

    if (isMatch) {
        // alert('Input is valid.'); 
        return true
    } else {
        callModal(`${inputValue} is not a valid input`, 0);
        inputElement.style.borderColor = 'red';
        inputElement.style.color = 'red';
            inputElement.value = '';
        setTimeout(()=>{
            inputElement.style.borderColor = '#000000C9';
            inputElement.style.color = 'black';
        },4000)
        return false
    }
}

const resetPage =()=>{
    httpRequest(curpage, 'override', null, 'reset')
    setTimeout(()=>{
    if(document.getElementById(`${curpage.split('.')[0]}`))document.getElementById(`${curpage.split('.')[0]}`).click();
    dynamiccomma(true)
    },1000)
}

function getLabelFromValue(selectedValue, id) {
  const datalist = document.getElementById(id);
  const options = datalist.querySelectorAll('option');
  
  for (const option of options) {
    if (option.value === selectedValue) {
        console.log('value option', option.textContent)
      return option.textContent;
    }
  }
  
  return ''; // Return null if value not found
}

function dateToWords(dateString) {
    // Define arrays for months and days
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const days = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];

    // Parse the input date string
    const parts = dateString.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    // Get the month, day, and year in words
    const monthWord = months[month - 1];
    const dayWord = days[new Date(dateString).getDay()];
    const yearWord = year.toString();

    // Construct the full date in words
    const dateInWords = `${dayWord}, ${monthWord} ${day}, ${yearWord}`;

    return dateInWords;
}

const shownavresult =(result)=>{
    if(result.code == 200){
        if(document.getElementById('navesearchresultscreen'))document.getElementById('navesearchresultscreen').innerHTML =  `
     <div class="jtable-content">
   
      <table style="border-collapse: collapse; border: 2px solid white;">
        <tbody>
            <tr>
                <th style="border: 1px solid white; padding: 8px; text-align: left;background: #58585899">Account number</th>
                <td style="border: 1px solid white; padding: 8px; text-align: left;">${result.data[0].accountnumber}</td>
            </tr>
            <tr>
                <th style="border: 1px solid white; padding: 8px; text-align: left;background: #58585899">First Name</th>
                <td style="border: 1px solid white; padding: 8px; text-align: left;">${result.data[0].firstname}</td>
            </tr>
            <tr>
                <th style="border: 1px solid white; padding: 8px; text-align: left;background: #58585899">Last Name</th>
                <td style="border: 1px solid white; padding: 8px; text-align: left;">${result.data[0].lastname}</td>
            </tr>
            <tr>
                <th style="border: 1px solid white; padding: 8px; text-align: left;background: #58585899">Group Name</th>
                <td style="border: 1px solid white; padding: 8px; text-align: left;">${result.data[0].groupname}</td>
            </tr>
            <tr>
                <th style="border: 1px solid white; padding: 8px; text-align: left;background: #58585899">Daily Unit</th>
                <td style="border: 1px solid white; padding: 8px; text-align: left;">${result.data[0].dailyunit}</td>
            </tr>
            <tr>
                <th style="border: 1px solid white; padding: 8px; text-align: left;background: #58585899">Account Officer</th>
                <td style="border: 1px solid white; padding: 8px; text-align: left;">${result.data[0].accountofficer}</td>
            </tr>
            <tr>
                <th style="border: 1px solid white; padding: 8px; text-align: left;background: #58585899">Registration Date</th>
                <td style="border: 1px solid white; padding: 8px; text-align: left;">${result.data[0].registrationdate}</td>
            </tr>
            <tr>
                <th style="border: 1px solid white; padding: 8px; text-align: left;background: #58585899">Registration Point</th>
                <td style="border: 1px solid white; padding: 8px; text-align: left;">${result.data[0].registrationpoint}</td>
            </tr>
            </tbody>
    </table>
    </div>
    `
    }else{
        if(document.getElementById('navesearchresultscreen'))document.getElementById('navesearchresultscreen').innerHTML =  `
     <div class="jtable-content">
     No data Found
    </div>
    `
    }
 


}

if(navsearchmainbtn)navsearchmainbtn.addEventListener('click', e=>{
    function searchdatabaseparams(){
        let paramstr = new FormData();
        paramstr.append('accounttype', document.getElementById('navsearchselect').value)
        paramstr.append('searchtext', document.getElementById('navsearchinputvalue').value)
        return paramstr
    }
    callController('searchdatabase.php', searchdatabaseparams(), 'searchdatabase', null, shownavresult )
})
    
    
const cvwd =(state)=>{
    
    console.log(checkInputwithdatalist(state.id,state.list.id))
    if(checkInputwithdatalist(state.id,state.list.id)){
        document.getElementById(`${state.id.split('-')[0]}`).value = getLabelFromValue(state.value, state.list.id)
    }else{
        document.getElementById(`${state.id.split('-')[0]}`).value = ''
            state.style.color = 'red';
	        state.style.borderColor = 'red';
	        callModal(`${state.value} is not a valid entry ensure you click from the datalist`, 0);
	        setTimeout(()=>{
	            state.value = '';
	            state.style.color = 'black';
	            setTimeout(()=>{
        	        state.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
    }
    var event = new Event("change");
  document.getElementById(`${state.id.split('-')[0]}`).dispatchEvent(event);
} 
function getLabelByValue(id, value) {
    const selectElement = document.getElementById(id);
    
    for (const option of selectElement.options) {
        if (option.value === value) {
            if(option.text.split('|')[1])return option.text.split('|')[0].trim();
            if(!option.text.split('|')[1])return option.text.trim();
        }
    }

    // If the value is not found
    return null;
}

function getLabelByValue2(id, value) {
    const selectElement = document.getElementById(id);
    
    for (const option of selectElement.options) {
        if (option.value == value) {
            return option.text;
        }
    }

    // If the value is not found
    return null;
}

function checkInputwithdatalist(inputid, dataListid) {
    // Log the input IDs
    console.log('inputs', inputid, dataListid);

    // Get the input element and datalist options
    const inputElement = document.getElementById(inputid);
    const datalistElement = document.getElementById(dataListid);

    // Check if the input element or datalist element doesn't exist
    if (!inputElement || !datalistElement) {
        console.error('Invalid input or datalist ID.');
        return false;
    }

    const datalistOptions = datalistElement.options;
    const inputValue = inputElement.value;

    let isMatch = false;

    // Check if the input value matches any datalist option
    for (let i = 0; i < datalistOptions.length; i++) {
        if (inputValue === datalistOptions[i].value) {
            isMatch = true;
            break;
        }
    }

    if (isMatch) {
        return true;
    } else {
        // Call the modal with the invalid input message
        callModal(`${inputValue} is not a valid input`, 0);
        inputElement.style.borderColor = 'red';
        inputElement.style.color = 'red';
        inputElement.value = '';

        // Reset the styles after 4 seconds
        setTimeout(() => {
            inputElement.style.borderColor = '#000000C9';
            inputElement.style.color = 'black';
        }, 4000);

        return false;
    }
}

const checkdatalist =(element, id, dlist='', clear=true)=>{
    if(!element.value)return
    // console.log(element, element.getAttribute('list'), document.getElementById(id), element.value)
    if(!element.getAttribute('list')){
        document.getElementById(`${id}`).value = element.value
        return
    }
    if(!element.list.id)return
    let list = element.list.id
    const datalistOptions = document.getElementById(`${list}`).options
    const inputValue = element.value;
    
    let isMatch = false;
    for (let i = 0; i < datalistOptions.length; i++) {
        if (inputValue === datalistOptions[i].value) {
            isMatch = true;
            break;
        }
    }

    if (isMatch) {
        // alert('Input is valid.'); 
        console.log('value', getLabelByValue2(dlist ? dlist : element.list.id, element.value))
        if(document.getElementById(id))document.getElementById(id).value = getLabelByValue(dlist ? dlist : element.list.id, element.value)??getLabelByValue2(dlist ? dlist : element.list.id, element.value)
        return true
    } else {
        if(clear){
            callModal(`${inputValue} is not a valid option`, 0);
            let ini = element.style.borderColor
            element.style.borderColor = 'red';
            element.style.color = 'red';
                element.value = '';
            setTimeout(()=>{
                element.style.borderColor = ini;
                element.style.color = 'black';
            },4000)
            if(document.getElementById(id))document.getElementById(id).value = ''
            return false
        }
        if(!clear && id){
             if(document.getElementById(id))document.getElementById(id).value = element.value
        }
    }
}


function showlabel(element){
    if(!element.value){
        if(element.nextElementSibling && element.nextElementSibling.classList.contains('valuelabel'))return element.nextElementSibling.textContent = ''
    }
    if(!element.nextElementSibling || element.nextElementSibling && !element.nextElementSibling.classList.contains('valuelabel')){
        let el = document.createElement('label')
        el.classList.add('valuelabel')
        el.style.padding = '3px'
        el.style.color = 'blue'
        element.parentNode.insertBefore(el, element.nextSibling);
    }
    element.nextElementSibling.textContent = getLabelFromValue(element.value, element.list.id)
}