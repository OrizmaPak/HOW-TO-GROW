    const gltrans_field = [
        `oreagltaccountnumber`,
		`oreaglttransactiondate`,
		`oreagltlocation`,
		`oreagltcredit`,
		`oreagltdebit`,
		`oreagltvaluedate`,
		`oreagltdescription`,
		`oreagltmarketer`,
		`oreagltaccountofficer`,
		`oreagltapprovedby`,
		`oreagltuser`,
		`oreagltttype`,
		`oreagltservicecharge`,
		`oreagltdebittotal`,
		`oreagltcredittotal`,
		`oreagltreference`,
		`oreagltbankpaywith100`,
		`oreagltwhichaccount`,
		`oreagltgroupid`
        ]
        

	function gltransparamsdata(){
		var paramstr = new FormData();

		paramstr.append('description',document.getElementById('gltransdescription').value);
		paramstr.append('transactiondate',document.getElementById('gltransdate').value);
		paramstr.append('transactiontype',document.getElementById('gltransactiontype').value);
		
		for(i=0; i<document.getElementsByClassName('gltranscustomeraccount').length; i++){
		    paramstr.append(`customeraccount${i}`,document.getElementsByClassName('gltranscustomeraccount')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('gltranscustomeramount').length; i++){
		    paramstr.append(`customeramount${i}`,document.getElementsByClassName('gltranscustomeramount')[i].value);
		}
		paramstr.append('customergridsize',document.getElementsByClassName('gltranscustomeraccount').length);
		
		for(i=0; i<document.getElementsByClassName('gltrandebitaccount').length; i++){
		    paramstr.append(`debitaccount${i}`,document.getElementsByClassName('gltrandebitaccount')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('gltransdebitamount').length; i++){
		    paramstr.append(`debitamount${i}`,document.getElementsByClassName('gltransdebitamount')[i].value);
		}
		paramstr.append('debitgridsize',document.getElementsByClassName('gltrandebitaccount').length);
		
		for(i=0; i<document.getElementsByClassName('gltranscreditaccount').length; i++){
		    paramstr.append(`creditaccount${i}`,document.getElementsByClassName('gltranscreditaccount')[i].value);
		}
		for(i=0; i<document.getElementsByClassName('gltranscreditamount').length; i++){
		    paramstr.append(`creditamount${i}`,document.getElementsByClassName('gltranscreditamount')[i].value);
		}
		paramstr.append('creditgridsize',document.getElementsByClassName('gltranscreditaccount').length);
		
		paramstr.append('approvingofficer',document.getElementById('gltransapprovedtransaction').value);
		paramstr.append('approved',document.getElementById('orecustomertogl2').checked ? 'YES' : 'NO');
		paramstr.append('customertotal',document.getElementById('gltranscustomertotal').value);
		paramstr.append('debittotal',document.getElementById('gltranstotaldebitt').value);
		paramstr.append('credittotal',document.getElementById('gltranstotalcreditt').value);

        for (var pair of paramstr.entries()) {
              console.log(pair[0] + ', ' + pair[1]);   
            // return(name, pair[0]+ ', ' + pair[1]); 
            }
	    return paramstr;

	};
	
	function gltranscustomeraccparamsdata(number){
		var paramstr = new FormData();
		
		paramstr.append('accountnumber', `${number}`);
		
	    return paramstr;

	};
	
	let glaccountoptions = ``;
	let glaccountnamess = [];
	let glaccountnumbers = [];
	
	const glaccountpopulatecheck=(data, accountno, element)=>{
	    if(glaccountnamess.includes(`${data.replace("&", "&AMP;")}`)){
	        accountno.value = glaccountnumbers[glaccountnamess.indexOf(`${data.replace("&", "&AMP;")}`)];
	       // callModal(accountno.value, 1);
	    }else{
	        element.style.color = 'red';
	        element.style.borderColor = 'red';
	        callModal(`${data} is not a valid account`, 0);
	        setTimeout(()=>{
	            element.value = '';
	            accountno.value = '';
	            element.style.color = 'black';
	            setTimeout(()=>{
        	        element.style.borderColor = 'lightgray';
	            },1000)
	        },1000)
	    }
	};
	
	const glcustomeraccountnamecheck=(data, accountno, element)=>{
	    const gltransconfirmacc =(result)=>{
	        if(result.message == 'Not successful'){
	            callModal(`${data} is not a valid account number`)
	            element.style.color = 'red';
    	        element.style.borderColor = 'red';
    	        callModal(`${data} is not a valid account`, 0);
    	        setTimeout(()=>{
    	            element.value = '';
    	            accountno.value = '';
    	            element.style.color = 'black';
    	            setTimeout(()=>{
            	        element.style.borderColor = 'lightgray';
    	            },1000)
    	        },1000)
    	    }else if(result.message == 'Successful'){
    	        accountno.style.color = 'blue';
    	        accountno.style.textTransform = 'uppercase';
    	        accountno.value = result.data[0].customerdetail.lastname + ' ' + result.data[0].customerdetail.lastname
    	    }
	    }
	    callController('fetchaccountprofile.php', gltranscustomeraccparamsdata(data), 'fetchaccountprofile', [`${element.id}`], gltransconfirmacc, 'silent')
	};
	
	const allcustomeramount=()=>{
	        let count = 0
	    for(i=0; i<document.getElementsByClassName('allcustomeramount').length; i++){
	        console.log(document.getElementsByClassName('allcustomeramount')[i].value, 'i', i);
	        count = count + parseInt(document.getElementsByClassName('allcustomeramount')[i].value ? document.getElementsByClassName('allcustomeramount')[i].value : 0);
	        document.getElementById('gltranscustomertotal').value = count;
	    }
	}
	
	const alldebitamount=()=>{
	        let count = 0
	    for(i=0; i<document.getElementsByClassName('alldebitamount').length; i++){
	        console.log(document.getElementsByClassName('alldebitamount')[i].value, 'i', i);
	        count = count + parseInt(document.getElementsByClassName('alldebitamount')[i].value ? document.getElementsByClassName('alldebitamount')[i].value : 0);
	        document.getElementById('gltranstotaldebitt').value = count;
	    }
	}
	
	const allcreditamount=()=>{
	        let count = 0
	    for(i=0; i<document.getElementsByClassName('allcreditamount').length; i++){
	        console.log(document.getElementsByClassName('allcreditamount')[i].value, 'i', i);
	        count = count + parseInt(document.getElementsByClassName('allcreditamount')[i].value ? document.getElementsByClassName('allcreditamount')[i].value : 0);
	        document.getElementById('gltranstotalcreditt').value = count;
	    }
	}


async function oreaddgltransaction() {
        //the fuction below is what calls the page and please put the 'override' as the second parameter for now.
        await httpRequest('addgltransaction.php', 'override')  ;
        const glaccountoptionpopulator=(data)=>{
            glaccountoptions = data.data.data.map(data=>{
                return(`
                <option value="${data.description}">
                `)
            }).join('');
            data.data.data.map(data=>glaccountnamess.push(data.description)) 
            data.data.data.map(data=>glaccountnumbers.push(data.accountnumber)) 
            document.getElementById('glaccountpopulate').innerHTML = glaccountoptions;
        }
        //  callController =(controller, params, name, validate, funct, silent, e)
         callController('fetchglaccounts.php', null, 'fetchglaccounts', null, glaccountoptionpopulator, 'silent');
        // if(document.getElementById('orecusttogl'))document.getElementById('orecusttogl').classList.remove("hidden");

// window.onmousedown =(e)=>{
//     let el = e.target;
//     if(el.tagName.toLowerCase() == 'p' && el.textContent == 'General Ledger section'){
//         alert('the mudafucker worked')
//     }
// }
    
const orevfygetallid =()=>{
        document.getElementsByClassName('orevfy');
        let idss = []
        for(i=0; i<document.getElementsByClassName('orevfy').length; i++){
            idss.push(document.getElementsByClassName('orevfy')[i].id)
        }
        if(document.getElementById('orecustomertogl').checked == true){
           for(i=0; i<document.getElementsByClassName('orevfyy').length; i++){
            idss.push(document.getElementsByClassName('orevfyy')[i].id)
        }
        }
        return idss
    }

if(document.getElementById('gltransaveform'))document.getElementById('gltransaveform').addEventListener('click',e=>{
    if(document.getElementById('gltranscustomertotal').value > 0){
        if(document.getElementById('gltranscustomertotal').value == document.getElementById('gltranstotaldebitt').value && document.getElementById('gltranstotaldebitt').value == document.getElementById('gltranstotalcreditt').value){
            callController('gltransactionscript.php', gltransparamsdata(), 'gltransactionscript', orevfygetallid(), console.log)
        }else{
            callModal('Customer, debit and credit totals are not equal', 0)
        }
    }else{
        if(document.getElementById('gltranstotaldebitt').value == document.getElementById('gltranscustomertotal').value){
            callController('gltransactionscript.php', gltransparamsdata(), 'gltransactionscript', orevfygetallid(), console.log)
        }else{
            callModal('Debit and credit totals are not equal', 0)
        }
    }
    
},false);
// if(document.getElementById('gltransaveform'))document.getElementById('gltransaveform').addEventListener('click',e=>{
//     if(validateInputsComponent(orevfygetallid())){
//         gltransparamsdata();
//     };
// },false);

if(document.getElementById('orecustomertogl')){
    if(document.getElementById('swittchhtr')){
        document.getElementById('swittchhtr').addEventListener('click', e=>{
            // document.querySelector('div.checkbox.switcher label input + div small').style.backgroundColor = 'red'
            // document.querySelector('div.checkbox.switcher label input + div small').style.left = '0';
            // document.querySelector('div.checkbox.switcher label input + div small').style.right = '';
            if(document.getElementById('orecustomertogl').checked){
                document.getElementById('orecustomertogl').checked = false;
                document.getElementById('gltranscustomertotal').value = 0;
                document.getElementById('orecusttogl').classList.add("hidden")
                document.querySelector('div.checkbox.switcher label input + div small').style.left = '0%';
                // document.querySelector('div.checkbox.switcher label input + div').backgroundColor = 'rgb(0, 105, 217)'
                document.querySelector('div.checkbox.switcher label input + div').style.backgroundColor = '#dc3545';
                document.querySelector('div.checkbox.switcher label input + div').style.borderColor = '#dc3545';
            }else{
                document.getElementById('orecustomertogl').checked = true;
                document.querySelector('div.checkbox.switcher label input + div').style.backgroundColor = 'rgb(0, 105, 217)';
                document.getElementById('orecusttogl').classList.remove("hidden")
                document.querySelector('div.checkbox.switcher label input + div').style.borderColor = 'rgb(0, 105, 217)';
                document.querySelector('div.checkbox.switcher label input + div small').style.left = '50%'
            }
        })
    }
    // if(document.getElementById('orecustomertogl').checked)alert('checked')
    // if(!document.getElementById('orecustomertogl').checked)alert('not checked')
}

if(document.getElementById('swittchhtr2')){
        document.getElementById('swittchhtr2').addEventListener('click', e=>{
            if(document.getElementById('orecustomertogl2').checked){
                document.getElementById('orecustomertogl2').checked = false;
                // document.getElementById('orecusttogl').classList.add("hidden")
                document.querySelector('div.checkbox.switcher.oresec label input + div small').style.left = '0%';
                document.querySelector('div.checkbox.switcher.oresec label input + div').style.backgroundColor = '#dc3545';
                document.querySelector('div.checkbox.switcher.oresec label input + div').style.borderColor = '#dc3545';
            }else{
                document.getElementById('orecustomertogl2').checked = true;
                document.querySelector('div.checkbox.switcher.oresec label input + div').style.backgroundColor = 'rgb(0, 105, 217)';
                document.querySelector('div.checkbox.switcher.oresec label input + div').style.borderColor = 'rgb(0, 105, 217)';
                document.querySelector('div.checkbox.switcher.oresec label input + div small').style.left = '50%'
            }
        })
    }



if(document.getElementById("oreadddebit")){
    document.getElementById('oreadddebit').addEventListener('click', e=>{
        let eleh = document.createElement('div');
        eleh.setAttribute('class', 'stcnsection1');
        let x = `
        <div class="stcs1a2">
            <div class="inputcontainerfn icsn">
            <p class="normaltext">Customer Account No.</p>
            <input class="orevfyy gltranscustomeraccount" id="${Date.now()}account" style="width: 95%" list="" onfocusout="glcustomeraccountnamecheck(this.value, this.nextElementSibling, this)" placeholder="Account No." type="number">
            <input type="text" class="borderless " style="outline: none" readonly>
            </div>
            </div>
        <div class="stcs1a2">
            <div class="inputcontainerfn icsn">
                <p class="normaltext">Amount</p>
                <input class="orevfyy allcustomeramount gltranscustomeramount" onchange="allcustomeramount()" id="${Date.now()}amount" style="width: 90%" placeholder="Amount" type="number">
            </div>
        </div>
        <div id="" class="oreadddebit oreremove mt" style="font-size: small;position: relative;top: -7px;" onclick="this.parentElement.remove(); allcustomeramount()">remove</div>`
        console.log(eleh)
        let elem = eleh.innerHTML = x;        
        console.log(eleh)
        document.getElementById('orecustglrowcont').append(eleh)
    })
}

if(document.getElementById("oreadddebitdebit")){
    document.getElementById('oreadddebitdebit').addEventListener('click', e=>{
        let eleh = document.createElement('div');
        eleh.setAttribute('class', 'stcnsection1');
        let x = `
        <div class="stcs1a2">
            <div class="inputcontainerfn icsn">
                <input class="gltrandebitaccount" type="hidden">
            <p class="normaltext">Debit Account</p>
            <input class="orevfy" id="${Date.now()}account" style="width: 95%" list="glaccountpopulate" onfocusout="glaccountpopulatecheck(this.value, this.previousElementSibling.previousElementSibling, this)" placeholder="Account" type="text">
            </div>
            </div>
        <div class="stcs1a2">
            <div class="inputcontainerfn icsn">
                <p class="normaltext">Amount</p>
                <input class="orevfy alldebitamount gltransdebitamount" onchange="alldebitamount()" id="${Date.now()}amount" style="width: 90%" placeholder="Amount" type="number">
            </div>
        </div>
        <div id="" class="oreadddebit oreremove mt" onclick="this.parentElement.remove(); alldebitamount()">remove</div>`
        console.log(eleh)
        let elem = eleh.innerHTML = x;        
        console.log(eleh)
        document.getElementById('orecustglrowcontdebit').append(eleh)
    })
}

if(document.getElementById("oreadddebitcredit")){
    document.getElementById("oreadddebitcredit").addEventListener('click', e=>{
        let eleh = document.createElement('div');
        eleh.setAttribute('class', 'stcnsection1');
        let x = `
        <div class="stcs1a2">
            <div class="inputcontainerfn icsn">
                <input class="gltranscreditaccount" type="hidden">
            <p class="normaltext">Credit Account</p>
            <input class="orevfy" id="${Date.now()}account" style="width: 95%" list="glaccountpopulate" onfocusout="glaccountpopulatecheck(this.value, this.previousElementSibling.previousElementSibling, this)" placeholder="Account" type="text">
            </div>
            </div>
        <div class="stcs1a2">
            <div class="inputcontainerfn icsn">
                <p class="normaltext">Amount</p>
                <input class="orevfy allcreditamount gltranscreditamount" onchange="allcreditamount()" id="${Date.now()}amount" style="width: 90%" placeholder="Amount" type="number">
            </div>
        </div>
        <div id="" class="oreadddebit oreremove mt" onclick="this.parentElement.remove(); allcreditamount()">remove</div>`
        console.log(eleh);
        let elem = eleh.innerHTML = x;        
        console.log(eleh);
        document.getElementById('orecustglrowcontcredit').append(eleh);
    })
}

        
        
};



var oreaddgltransactionbbtn = document.getElementById("addgltransaction");
if (oreaddgltransactionbbtn) oreaddgltransactionbbtn.addEventListener("click", oreaddgltransaction, false);
