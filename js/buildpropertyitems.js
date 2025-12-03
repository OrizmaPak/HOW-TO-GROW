// const query_field = [
//             `query_personnelmatter`,
//             `query_entrydate`,
//             `query_title`,
//             `query_startdate`,
//             `query_enddate`,
//             ]
	let itemid = [];
	let itemname = [];
	let itemtobuidid = [];
	let itemtobuidname = [];

    function orebuilditemparams(type = 'NO'){
		var paramstr = new FormData();
		    paramstr.append('composite', type);		
 
	   return paramstr; 

	};
	
    function orebuilditemaddparams(){
		var paramstr = new FormData();
		    paramstr.append('itemid', document.getElementById('build_selectitem') ? document.getElementById('build_selectitem').value : '');		
		  //  paramstr.append('qty', document.getElementById('orequantity') ? document.getElementById('orequantity').value : '');		
 
	   return paramstr; 

	} 
	
    function orebuilditemsaveparams(){
		var paramstr = new FormData();
		    
		    paramstr.append('itemtobuildid', document.getElementById('build_selectitembuild') ? itemtobuidid[itemtobuidname.indexOf(document.getElementById('build_selectitembuild').value)] : '');		
		    paramstr.append('gridsize', document.getElementsByClassName('buildgriditemxm').length);		
		    for(i=0; i<document.getElementsByClassName('buildgriditemxm').length; i++){
    		    paramstr.append(`itemid${i}`, document.getElementsByClassName('buildgriditemxm')[i].children[0].textContent);		
		    }
		    for(i=0; i<document.getElementsByClassName('buildgriditemxm').length; i++){
    		    paramstr.append(`qty${i}`, document.getElementsByClassName('buildgriditemxm')[i].children[2].children[0].value);		
		    }
 
	   return paramstr; 

	} 
	
// .innerHTML = `${xm
// 				             orebuildpropertydata.map(data => {
// 				          return(`
//     				        <div id="${data.id}" class="buildgriditem">
//                                 <p>${data.itemname}</p>
//                                 <p>${data.itemtype}</p>
//                                 <input type="number" placeholder="Add" class="buildinput">
//                                 <p class=""><span class="buildaction">delete</span></p>
//                             </div>
// 				          `)
// 				      }).join('')}`
const orefetchbuildproperty =(type)=>{ 
	    const loadfetch = (result) =>{
	         let orebuildpropertydata = result.data.data;
				    console.log(orebuildpropertydata)
				    if(type == 'YES'){
    				    if(document.getElementById('build_selectitembuild')){
    				        document.getElementById('build_selectitembuild').innerHTML +=  orebuildpropertydata.map(data=>{
    				            itemtobuidid.push(data.itemid)
    				            itemtobuidname.push(data.itemname)
    				            return(`
    				                <option>${data.itemname}</option>
    				            `)
    				        })
    				        
    				    }
				    }else{
    				    if(document.getElementById('build_selectitem')){
    				        document.getElementById('build_selectitem').innerHTML +=  orebuildpropertydata.map(data=>{
    				            itemid.push(data.itemid)
    				            itemname.push(data.itemname) 
    				            return(`
    				                <option name="${data.itemname}" id="${data.itemid}">${data.itemname}</option>
    				            `)
    				        })
    				        
    				    }
				    }
	    }
	   callController('fetchinventoryitemscript.php', orebuilditemparams(type), 'fetchitemtypescript', '', loadfetch, 'silent');
	   //loadfetch()
	}
	
	const buildselectcontrol = (able, id)=>{
	    console.log(able, id)
	    console.log(id, document.getElementsByName(`${id}`)[0])
	   // if(document.getElementsByClassName('buildgriditemxm'))document.getElementsByClassName('buildgriditemxm').disabled = false; 
	   if(able == 'disable'){
	       document.getElementsByName(`${id}`)[0].disabled = true;
	   }
	   if(able == 'enable'){
	       document.getElementsByName(`${id}`)[0].disabled = false;
	   }
            if(document.getElementById('build_selectitem'))document.getElementById('build_selectitem').value = '';
            if(document.getElementById('orequantity'))document.getElementById('orequantity').value = 0;
	}
	
	const buildpropdelete =(value)=>{
	    console.log(value);
        if(document.getElementsByName(`${value}`))document.getElementsByName(`${value}`)[0].disabled = false;
            if(document.getElementById(`${value}row`))document.getElementById(`${value}row`).remove();
	    console.log(this);
        // console.log('enable', el.parentElement.parentElement.parentElement.children[1].textContent, document.getElementsByName(`${el.parentElement.parentElement.parentElement.children[1].textContent}`)[0]);
	   //  if(el.tagName.toLowerCase() == 'button' && el.classList.contains('orebtndeleete') && el.textContent == 'Delete'){
    //                 el.parentElement.parentElement.parentElement.remove();
    //             }
	}
	
const orepopulatetable = () =>{
    if(document.getElementById('orebuildproitemsscreen'))document.getElementById('orebuildproitemsscreen').innerHTML += `
        <tr id="${document.getElementById('build_selectitem').value}row" data-open="false" class="source-row-item buildgriditemxm">
            <td> ${itemid[itemname.indexOf(document.getElementById('build_selectitem').value)]} </td>
            <td> ${document.getElementById('build_selectitem').value} </td>
            <td> <input type="number" min="0" value="${document.getElementById('orequantity').value}" placeholder="Edit"  style="height: 15px !important" class="buildinput nevernegative"> </td>
            <td>
                <div class="flex" style="align-items:center">
                    <button style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px" onclick="buildpropdelete('${document.getElementById('build_selectitem').value}')" class="orebtndeleete">Delete</button>
                </div>
            </td>
        </tr>
    `;
    buildselectcontrol('disable', document.getElementById('build_selectitem').value);
    // if(document.getElementById('build_selectitem'))document.getElementById('build_selectitem').children[(itemname.indexOf(document.getElementById('build_selectitem').value)+1)].disabled = true
    // if(document.getElementById('build_selectitem'))document.getElementById('build_selectitem').value = '';
     
}
	

async function orebuildpropertyitems() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('buildpropertyitems.php', 'override')  ;
        
        const clearrefresh =(result)=>{
            if(document.getElementById('oreitementry'))document.getElementById('oreitementry').value = '';
            if(document.getElementById('orebuildproitemsscreen'))document.getElementById('orebuildproitemsscreen').innerHTML = '';
            if(document.getElementById('build_selectitembuild'))document.getElementById('build_selectitembuild').value = '';
            if(document.getElementById('build_selectitem'))document.getElementById('build_selectitem').value = '';
            if(document.getElementById('orequantity'))document.getElementById('orequantity').value = 0;
            for(i=0; i<document.getElementById('build_selectitem').children.length; i++){
                document.getElementById('build_selectitem').children[i].disabled = false;
            }
	    };
	    
        if(document.getElementById('orebuildproitemssubmitbtn'))document.getElementById('orebuildproitemssubmitbtn').addEventListener('click', e=>{
           //ADD BUTTTN
           // callController('fetchanitem.php', orebuilditemaddparams(), 'fetchanitem', ['build_selectitemm','orequantityy'], null)
           if(validateInputsComponent(['build_selectitem','orequantity']))orepopulatetable()
        }, true);
        
        if(document.getElementById('orebuildproitemssavesubmitbtn'))document.getElementById('orebuildproitemssavesubmitbtn').addEventListener('click', e=>{
           //SAVE BUTTTN
        //   console.log()
            callController('builditemscript.php', orebuilditemsaveparams(), 'builditemscript', ['build_selectitembuild'], clearrefresh)
        }, true);
        
        orefetchbuildproperty();
        orefetchbuildproperty('YES');
        
        // if(document.getElementById('query_submitbtn'))document.getElementById('query_submitbtn').addEventListener('click', e=>callController('controller.php', null, 'querysubmit', query_field, alert),true);

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




    window.onmousedown=(e)=>{
    var el = e.target;
    if(el.tagName.toLowerCase() == 'span' && el.classList.contains('orebtndeleete') && el.textContent == 'delete'){
                //     console.log('enable', el.parentElement.parentElement.children[1].textContent);
                //     document.getElementsByName(`${id}`)[0].disabled = false;
	               // if(document.getElementById('build_selectitem'))document.getElementById('build_selectitem').value = '';
                    el.parentElement.parentElement.remove();
                }
    if(el.tagName.toLowerCase() == 'p' && el.textContent == 'edit' && el.parentElement.classList.contains('properee')){
        el.parentElement.parentElement.nextElementSibling.classList.remove('hidden');
        setTimeout(() => {
            el.textContent = 'save';
            el.nextElementSibling.textContent = 'cancel'
        }, 100);
        el.parentElement.parentElement.nextElementSibling.children[0].value = el.parentElement.previousElementSibling.textContent
    }
    if(el.tagName.toLowerCase() == 'p' && el.textContent == 'save' && el.parentElement.classList.contains('properee')){ 
        if(el.parentElement.parentElement.nextElementSibling.children[0].value !== ''){
            el.parentElement.parentElement.children[0].textContent = el.parentElement.parentElement.nextElementSibling.children[0].value;
            el.parentElement.parentElement.nextElementSibling.children[0].value = ''; 
            setTimeout(() => {
                el.textContent = 'edit';
                el.nextElementSibling.textContent = 'remove';
            }, 100);
            el.parentElement.parentElement.nextElementSibling.classList.add('hidden');
        }else{
            alert('input must be filled')
        }
    }
    if(el.tagName.toLowerCase() == 'p' && el.textContent == 'cancel' && el.parentElement.classList.contains('properee')){
        el.parentElement.parentElement.nextElementSibling.children[0].value = '';
        el.parentElement.parentElement.nextElementSibling.classList.add('hidden');
        setTimeout(() => {
            el.textContent = 'remove';
            el.previousElementSibling.textContent = 'edit';
        }, 100);
    }
    
}



var buildpropertyitemsbtn = document.getElementById("buildpropertyitems");
if (buildpropertyitemsbtn) buildpropertyitemsbtn.addEventListener("click", orebuildpropertyitems, false);