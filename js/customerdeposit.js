      function cusdep_accountParams(){
    var paramstr = new FormData();
    paramstr.append('accountno', document.getElementById('cusdep_accountnumber').value);
// for (var pair of paramstr.entries()) {
//             //   console.log(pair[0] + ', ' + pair[1]); 
//             // return(pair[0]+ ', ' + pair[1]); 
//             }
    return paramstr;
}

    // let customerResult = '';
    var cusdepinputfields = [
        `cusdep_postingLimit`,
        `cusdep_counter`,
        `cusdep_datecontrol`,
        `cusdep_accountofficer`,
        `cusdep_accountgroup`,
        `cusdep_transactiondate`,
        `cusdep_valuedate`,
        `cusdep_depositid`,
        `cusdep_particulars`,
        `cusdep_amountpaid`
        ] 
        

    async function openCustomerDeposit() {
        await httpRequest('customerdeposit.php')
    const cusdep_result =(result)=>{
        alert('result', result)
        console.log('result', result)
    }
        if(document.getElementById('cusdep_submitcustomerdeposit'))document.getElementById('cusdep_submitcustomerdeposit').addEventListener('click', e=>callController('controller.php', cusdep_accountParams(), 'submitcustomerdeposit', cusdepinputfields, cusdep_result ),true);
        if(document.getElementById('cusdep_accountnumber'))document.getElementById('cusdep_accountnumber').addEventListener('change', e=>callController('controller.php', cusdep_accountParams(), 'accountdetailsfetch', [`cusdep_accountnumber`], cusdep_result ) ,true);
    }
    
    
    

    
    var customerdepositbtn = document.getElementById('customerdeposit')
    if(customerdepositbtn) customerdepositbtn.addEventListener('click', openCustomerDeposit, false)