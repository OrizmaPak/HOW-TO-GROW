	getAjaxObject = function(){
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


    function oregetitemparams(id){
		var paramstr = new FormData();
	 		try{
		    paramstr.append('itemtype',document.getElementById('oreitementry').value);
		    if(id){
        	    paramstr.append('id', id);		
		    }
	 		}catch(err){
	 		    console.log(err)
	 		}
 
	   return paramstr;

	}
	
	
	const updateOreItemtype =(id, action)=>{
	    const getid =()=>{
	        var paramstr = new FormData();
	 		try{
		    paramstr.append('id', id);		
	 		}catch(err){
	 		    console.log(err)
	 		}
	   return paramstr;
	    }
	    if(action == 'update'){
	       // ENTER EDIT MODE
	       const edititem =(result)=>{
	           if(document.getElementById('oreitementry'))document.getElementById('oreitementry').value = result.data.data[0].itemtype;
	           if(document.getElementById('oreitemtypesubmitbtn'))document.getElementById('oreitemtypesubmitbtn').textContent = 'Update';
	           if(document.getElementById('oreitemtypesubmitbtn'))document.getElementById('oreitemtypesubmitbtn').name = result.data.data[0].id;
	       }
	        callController('fetchitemtypescript.php', getid(), 'fetchitemtypescript', null, edititem )
	    }
	    if(action == 'delete'){
	        const clearrefresh2 =(result)=>{
            if(document.getElementById('oreitementry'))document.getElementById('oreitementry').value = '';
            orefetchitemtype();
	    }
	        callController('deleteitemtype.php', getid(), 'deleteitemtype', null, clearrefresh2)
	    }
	} 
	
	const orefetchitemtype =()=>{ 
	
	    const loadfetch = (result) =>{
	         let oreitemtypedata = result.data.data;
				    console.log(oreitemtypedata)
				    if(document.getElementById('oreitemtypescreennn')){
				        document.getElementById('oreitemtypescreennn').innerHTML = 
				             oreitemtypedata.map((data, index) => {
				          return(`
                            <tr class="">
                                <td> ${index+1} </td>
                                <td> ${data.itemtype} </td>
                                <td>
                                    <div class="flex" style="align-items:center;width:fit-content">
                                        <button onclick="updateOreItemtype(${data.id}, 'update')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:blue;border-radius:3px">Edit</button>
                                        <button onclick="updateOreItemtype(${data.id}, 'delete')" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:red;border-radius:3px">Delete</button>
                                    </div>
                                </td>
                            </tr>
                            `)
				        }).join('')
				    
	    }
	   //loadfetch()
	}

// Example usage:
// loadfetch(result);

	   callController('fetchitemtypescript.php',null, 'fetchitemtypescript', null, loadfetch);
	    
	}


    async function oreitemtype() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('itemtype.php', 'override')  
        const clearrefresh =(result)=>{
            if(document.getElementById('oreitementry'))document.getElementById('oreitementry').value = '';
            orefetchitemtype();
	    }
        if(document.getElementById('oreitemtypesubmitbtn'))document.getElementById('oreitemtypesubmitbtn').addEventListener('click', e=>{
	               if(document.getElementById('oreitemtypesubmitbtn').textContent == 'Update'){
	               callController('itemtypescript.php', oregetitemparams(document.getElementById('oreitemtypesubmitbtn').name), 'itemtypescript', ['oreitementry'], clearrefresh)
	               }else{
	               callController('itemtypescript.php', oregetitemparams(), 'itemtypescript', ['oreitementry'], clearrefresh)};
	               }, true)
        // callController('fetchitemtypescript.php',null, 'fetchitemtypescript', null, null);
        orefetchitemtype();
}




    window.onmousedown=(e)=>{
    var el = e.target;
    if(el.tagName.toLowerCase() == 'p' && el.textContent == 'edit' && el.parentElement.classList.contains('itemee')){
        el.parentElement.parentElement.nextElementSibling.classList.remove('hidden');
        setTimeout(() => {
            el.textContent = 'save';
            el.nextElementSibling.textContent = 'cancel'
        }, 100);
        el.parentElement.parentElement.nextElementSibling.children[0].value = el.parentElement.previousElementSibling.textContent
    }
    if(el.tagName.toLowerCase() == 'p' && el.textContent == 'save' && el.parentElement.classList.contains('itemee')){ 
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
    if(el.tagName.toLowerCase() == 'p' && el.textContent == 'cancel' && el.parentElement.classList.contains('itemee')){
        el.parentElement.parentElement.nextElementSibling.children[0].value = '';
        el.parentElement.parentElement.nextElementSibling.classList.add('hidden');
        setTimeout(() => {
            el.textContent = 'remove';
            el.previousElementSibling.textContent = 'edit';
        }, 100);
    }
    
}


var oreitemtypebbtn = document.getElementById("itemtype");
if (oreitemtypebbtn) oreitemtypebbtn.addEventListener("click", oreitemtype, false);
