const viewincomestatementreportdata = (result) => {
    if(document.getElementById('viewincomestatementreportabledata'))document.getElementById('viewincomestatementreportabledata').innerHTML = Object.keys(result.data).map((dat, index)=>{
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

async function openViewincomestatementreport () {
    await httpRequest('viewincomestatementreport.php')
    
    
        function incstatparams(){
            let paramstr = new FormData();
            paramstr.append('startdate', document.getElementById('viewincomestatementreportstartdate').value)
            paramstr.append('enddate', document.getElementById('viewincomestatementreportenddate').value)
        }
    if(document.getElementById('viewincomestatementreportviewbtn'))document.getElementById('viewincomestatementreportviewbtn').addEventListener('click', e=>{
    callController('incomestatement.php', incstatparams(), 'incomestatement', ['viewincomestatementreportstartdate', 'viewincomestatementreportenddate'])  
    })
    callController('incomestatement.php', incstatparams(), 'incomestatement', [], viewincomestatementreportdata)  
    
}

var viewincomestatementreportbtn = document.getElementById('viewincomestatementreport')
if(viewincomestatementreportbtn) viewincomestatementreportbtn.addEventListener('click', openViewincomestatementreport, false)