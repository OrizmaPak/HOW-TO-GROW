

const viewtrialbalrepresult = (result) => {
    const dataContainer = document.getElementById('viewstaffadvancetabledata');
    console.log('tesing', Object.keys(result.data["cash"][0]))
    if(document.getElementById('viewstaffadvancetabledata'))document.getElementById('viewstaffadvancetabledata').innerHTML = Object.keys(result.data).map((dat, index)=>{
    //                                               ${Object.values(result.data)[index].length != 0 ? Object.keys(Object.values(result.data)[index][0]).map(dat => `<th>${dat}</th>`).join('') : ''}
//                                              ${Object.values(result.data)[index].length != 0 ? Object.values(Object.values(result.data)[index]).map(dat =>dat).map(datt=>datt).map(da=>Object.values(da)).map(ee=>`<tr><td></td>${ee.map(rr=>`<td>${rr}</td>`).join('')}</tr>`).join('') : ''}
    let m
        return `
                <tr>
                        <td colspan="3" style="text-align: left;font-weight: bold">${dat.toUpperCase()}</td>
                </tr>
                        ${Object.values(result.data)[index].length != 0 ? Object.values(Object.values(result.data)[index]).map(dat =>dat).map(datt=>datt).map(da=>Object.values(da)).map(ee=>`<tr>${ee.map((rr, index)=>index < 3 ?`<td>${rr}</td>` : `<p class="hidden">${m=rr}</p>`).join('')}</tr>`).join('') : ''}
                   <tr>
                        <td style="text-align: right;font-weight: bold">${dat} sub total</td>
                        <td>${m}</td>
                   </tr>     
                   <tr>
                   <td colspan="3"></td>
                   </tr>     
                   <tr>
                   <td colspan="3"></td>
                   </tr>     
                
                `
    }).join('');

};




async function openViewtrialbalancereport () {
    await httpRequest('viewtrialbalancereport.php')
    var currentDate = new Date();

        // Format the date as YYYY-MM-DD (required format for date input)
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
        var day = currentDate.getDate().toString().padStart(2, '0');

        // Set the value of the date input 
        document.getElementById('viewtrialbalrepdate').value = year + '-' + month + '-' + day;
        if(document.getElementById('viewtrialbalrepdateviewbtn'))document.getElementById('viewtrialbalrepdateviewbtn').addEventListener('click', e=>{
            function viewtrialbalrepparams(){
                let paramstr = new FormData()
                paramstr.append('currentdate', document.getElementById('viewtrialbalrepdate').value)
                return paramstr
            }
            callController('trialbalance.php', viewtrialbalrepparams(), 'trialbalance', ['viewtrialbalrepdateviewbtn'], viewtrialbalrepresult)
        })
        if(document.getElementById('viewtrialbalrepdateviewbtn'))document.getElementById('viewtrialbalrepdateviewbtn').click();
        
        if(document.getElementById('viewtrialbalrepexport'))document.getElementById('viewtrialbalrepexport').addEventListener('click',e=>{
            tableToExcel('viewstaffadvancetabledatacontainer', 'VIEW TRIAL BALANCE')},false);
        if(document.getElementById('viewtrialbalrepprint'))document.getElementById('viewtrialbalrepprint').addEventListener('click',e=>{
            printContent('VIEW TRIAL BALANCE',`<link rel="stylesheet" type="text/css" media="print" href="./css/index.css"><link rel="stylesheet" type="text/css" media="print" href="./css/user.css"><link rel="stylesheet" type="text/css" media="print" href="./css/style.css"><link rel="stylesheet" type="text/css" media="print" href="./css/jstyle.css">`,'viewstaffadvancetabledatacontainerwrapper')},false);

}

var viewtrialbalancereportbtn = document.getElementById('viewtrialbalancereport')
if(viewtrialbalancereportbtn) viewtrialbalancereportbtn.addEventListener('click', openViewtrialbalancereport, false)