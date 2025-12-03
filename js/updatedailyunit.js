var updatedailyunitorehistory_datasource = [];

const populateupdatedailyunittable=(result)=>{
    updatedailyunitorehistory_datasource = [];
    updatedailyunitorehistory_datasource = result.data;
    console.log('updatedailyunitorehistory_datasource', updatedailyunitorehistory_datasource)
    // initPagination(updatedailyunitorehistory_datasource, updatedailyunitorehistoryorehistorysetCurrentPage);
    filterupdatedailyunit()
    }
    
const filterupdatedailyunit =()=>{
    if(document.getElementById('updatedailyunitstartdate').value == ''){
        document.getElementById('updatedailyunitorehistorytablecontent').innerHTML = updatedailyunitorehistory_datasource.map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.accountdetail.accountnumber} </td>
                                <td> ${dat.customerdetail.lastname} ${dat.customerdetail.firstname}  </td>
                                <td> ${dat.accountdetail.dailyunit} </td>
                                <td> 
                                    <label class="hidden">Daily Unit change</label>
                                     <select id="updatedailyunitselect${index}" onchange="if(this.value != ${dat.accountdetail.dailyunit}){document.getElementById('updatedailyunit${index}').style.background = 'green';document.getElementById('updatedailyunit${index}').disabled = false;}else{document.getElementById('updatedailyunit${index}').style.background = '#c3cec3';document.getElementById('updatedailyunit${index}').disabled = true;}" style="padding: 3px 10px;border-radius: 7px;border-color: #00000047;border-bottom-right-radius: 0px;border-bottom-left-radius: 0px;">
                                        <option>Nill</option>
                                        <option ${dat.accountdetail.dailyunit == '1000' ? 'selected' : ''}>1000</option>
                                        <option ${dat.accountdetail.dailyunit == '2000' ? 'selected' : ''}>2000</option>
                                        <option ${dat.accountdetail.dailyunit == '3000' ? 'selected' : ''}>3000</option>
                                     </select> 
                                </td>
                                <td> 
                                    <div class="flex" style="align-items:center">
                                        <button id="updatedailyunit${index}"" onclick="updatedailyunitvalue('${index}', '${dat.accountdetail.accountnumber}')" disabled style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:#c3cec3;border-radius:3px">Update</button>
                                    </div>
                                </td>
                            </tr>`)
    }).join('')
    }
    if(document.getElementById('updatedailyunitstartdate').value != ''){
        document.getElementById('updatedailyunitorehistorytablecontent').innerHTML = updatedailyunitorehistory_datasource.filter(data=>data.accountdetail.accountnumber.includes(document.getElementById('updatedailyunitstartdate').value)).map((dat, index)=>{
        return(`<tr data-open="false" class="source-row-item">
                                <td> ${index+1} </td>
                                <td> ${dat.accountdetail.accountnumber} </td>
                                <td> ${dat.customerdetail.lastname} ${dat.customerdetail.firstname}  </td>
                                <td> ${dat.accountdetail.dailyunit} </td>
                                <td> 
                                    <label class="hidden">Daily Unit change</label>
                                     <select id="updatedailyunitselect${index}" onchange="if(this.value != ${dat.accountdetail.dailyunit}){document.getElementById('updatedailyunit${index}').style.background = 'green';document.getElementById('updatedailyunit${index}').disabled = false;}else{document.getElementById('updatedailyunit${index}').style.background = '#c3cec3';document.getElementById('updatedailyunit${index}').disabled = true;}" style="padding: 3px 10px;border-radius: 7px;border-color: #00000047;border-bottom-right-radius: 0px;border-bottom-left-radius: 0px;">
                                        <option>Nill</option>
                                        <option ${dat.accountdetail.dailyunit == '1000' ? 'selected' : ''}>1000</option>
                                        <option ${dat.accountdetail.dailyunit == '2000' ? 'selected' : ''}>2000</option>
                                        <option ${dat.accountdetail.dailyunit == '3000' ? 'selected' : ''}>3000</option>
                                     </select> 
                                </td>
                                <td> 
                                    <div class="flex" style="align-items:center">
                                        <button id="updatedailyunit${index}"" onclick="updatedailyunitvalue('${index}', '${dat.accountdetail.accountnumber}')" disabled style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:#c3cec3;border-radius:3px">Update</button>
                                    </div>
                                </td>
                            </tr>`)
    }).join('')
    }
}
    
    
    const updatedailyunitvalue =(id, acc)=>{
        
        console.log('value', document.getElementById(`updatedailyunitselect0`).value, document.getElementById(`updatedailyunitselect${id}`).value, id)
        function updatedailyunitrun(result){
            callController('fetchallaccountsprofile.php', null, 'fetchallaccountsprofile', [], populateupdatedailyunittable);
        }
        function updateuniteerparams(){
            let params = new FormData();
            params.append('accountnumber', acc)
            params.append('dailyunit', document.getElementById(`updatedailyunitselect${id}`).value)
            return params
        }
        callController('updatedailyunit.php', updateuniteerparams(), 'updatedailyunit', [`'updatedailyunitselect${id}'`], updatedailyunitrun)
    }
    

// const deletestockupdatedailyunitentry=(id)=>{
//     const run=(result)=>{
//       function paramsupdatedailyunit(){
//         var paramstr = new FormData();
//         paramstr.append('location', document.getElementById('updatedailyunitlocation').value);
//         paramstr.append('startdate', document.getElementById('updatedailyunitstartdate').value);
//         paramstr.append('enddate', document.getElementById('updatedailyunitenddate').value);
//             return paramstr;
//         };
        
//         callController('fetchupdatedailyunitscript.php', paramsupdatedailyunit(), 'fetchupdatedailyunitscript', ['updatedailyunitenddate', 'updatedailyunitstartdate', 'updatedailyunitlocation'], populateupdatedailyunittable);
//     }
//     function parammm(){
//     var paramstr = new FormData();
//     paramstr.append('id', id);
//         return paramstr;
//     };
//     callController('removeupdatedailyunit.php', parammm(), 'removeupdatedailyunit', null, run)
// }



async function updatedailyunit () {
    await httpRequest('updatedailyunit.php', 'override');
    
      jtabledata = document.getElementById('updatedailyunitorehistorytablecontent');
        initializePaginationParams();
    
        
        callController('fetchallaccountsprofile.php', null, 'fetchallaccountsprofile', [], populateupdatedailyunittable);
    
    

}

var updatedailyunitNav = document.getElementById("updatedailyunit");
if (updatedailyunitNav) updatedailyunitNav.addEventListener("click", updatedailyunit, false);
