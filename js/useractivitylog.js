let arrayOfUsers, currentemail;
async function openUseractivitylog () {
    await httpRequest('useractivitylog.php');
    getAllUsers()
    if(document.getElementById('matuserlogviewbtn'))document.getElementById('matuserlogviewbtn').addEventListener('click',e=>callController('fetchuseractivities.php',getUserActivityLogParams() , 'useractivitylog', [`userlogusers`,`userlogstartdate`,`userlogenddate`], logUserActivity, ),true);
    if(document.getElementById("matuseralprintbtn")){
        document.getElementById("matuseralprintbtn").addEventListener('click',printDiv)
    }
}

function getAllUsers(){
    const requestItem = getAjaxObject();
    requestItem.open('POST','../controllers/fetchallusers.php',true);
    requestItem.onreadystatechange = function(){
       
      if(requestItem.readyState == 4 && requestItem.status == 200){
            // console.log(requestItem);
            const result = JSON.parse(requestItem.responseText);
            // console.log('', result);
            const allusers= result.data;
            arrayOfUsers = allusers 
            console.log(allusers)
      let strAllUsers = allusers.map(each=>{
             return`
             <option value=${each.firstname}> ${each.firstname} </option>
             `
         })
          if(  document.getElementById('allusers')){
            //   console.log(strLocations.join(' '))
            // const headerselect = '<option selected> Select Marketer </option>'
              document.getElementById('allusers').innerHTML=   strAllUsers.join(' ')
          }
      }
      else{
        //   console.log("not success ",requestItem)
      }
    };
    requestItem.setRequestHeader('Connection','close');
    requestItem.send();
}


function getEmail(ema){
    currentemail = 2
    console.log('currentEmail',currentemail)
}

	function getUserActivityLogParams(){
		var paramstr = new FormData();
	 	
	 	try{
            paramstr.append('email', document.getElementById('userlogusers').value ? arrayOfUsers.filter(each=> each.firstname === document.getElementById('userlogusers').value)[0].email : '-');
    		paramstr.append('startdate',document.getElementById('userlogstartdate').value);
    		paramstr.append('enddate',document.getElementById('userlogenddate').value);
        }catch(err){
            console.log(err)
        }
	 		
	
	
	
	
	   return paramstr;

	}


function logUserActivity(response){
  const logUserActivityStr =  response.data.map(each=> {
      return`
      <p>${each.description}</p>
      <p>${each.currenttime}</p>
      `
  })
  
  document.getElementById('useraldisplaycontent').innerHTML= logUserActivityStr.join(' ')
    
}


function printDiv() {
    var divContents = document.getElementById("useraldisplaycontent").innerHTML;
    var printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Div</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }

var useractivitylogbtn = document.getElementById('useractivitylog')
if(useractivitylogbtn) useractivitylogbtn.addEventListener('click', e=>openUseractivitylog(), false)