const viewbalancesheetresultdata = (result) => {
    if(document.getElementById('viewbalancesheettabledata'))document.getElementById('viewbalancesheettabledata').innerHTML = Object.keys(result.data).map((dat, index)=>{
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



async function openViewbalancesheet () {
    await httpRequest('viewbalancesheet.php')
    
    var currentDate = new Date();

        // Format the date as YYYY-MM-DD (required format for date input)
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
        var day = currentDate.getDate().toString().padStart(2, '0');

        // Set the value of the date input 
        document.getElementById('viewbalancesheetdate').value = year + '-' + month + '-' + day;
        if(document.getElementById('viewbalancesheetviewbtn'))document.getElementById('viewbalancesheetviewbtn').addEventListener('click', e=>{
            function viewtrialbalreppabalancesheetrams(){
                let paramstr = new FormData()
                paramstr.append('currentdate', document.getElementById('viewbalancesheetdate').value)
                return paramstr
            }
            callController('balancesheet.php', viewtrialbalreppabalancesheetrams(), 'balancesheet', ['viewbalancesheetdate'], viewbalancesheetresultdata)
        })
        if(document.getElementById('viewbalancesheetviewbtn'))document.getElementById('viewbalancesheetviewbtn').click();
}

var viewbalancesheetbtn = document.getElementById('viewbalancesheet')
if(viewbalancesheetbtn) viewbalancesheetbtn.addEventListener('click', openViewbalancesheet, false)