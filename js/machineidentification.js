datasource = []
function machineidsetCurrentPage(pageNum) {
                
        currentPage = pageNum;
        
        handleActivePageNumber();
        handlePageButtonsStatus();
    
        prevRange = (pageNum - 1) * paginationLimit;
        currRange = pageNum * paginationLimit;
        
        if(document.getElementById('machineidentificationtablejtabledata')) document.getElementById('machineidentificationtablejtabledata').innerHTML = '';
        if(datasource.length) {
            datasource.reverse().forEach( (item, index) => {
                if (index >= prevRange && index < currRange) {
                    machineidrenderTableHTML(item, index)
                }
            })
            if(document.querySelector('#machineidentificationtable tbody').innerHTML === '') machineidentificationbtn.click()
        }
    }
async function fetchMachineIdentifications() {

        showSpinner();
        let paramstr = new FormData()
        
	    var request = getAjaxObject();
        request.open('POST','../controllers/fetchmachineidentity.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        if(document.getElementById('machineidentificationtablejtabledata')) document.getElementById('machineidentificationtablejtabledata').innerHTML = '';
                        console.log('datta', parseRequest)
                        data = datasource = parseRequest.data
                        if(data.length > 0){initPagination(data, machineidsetCurrentPage)}else{document.getElementById('machineidentificationtablejtabledata').innerHTML = 'No data to Display'}
                    }
                    else return callModal('No records retrieved')
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        request.setRequestHeader('Connection','close'); 
        request.send(paramstr);
    
    }
   

    
    function machineidrenderTableHTML(item, index) {
        console.log('itme', item)
        jtabledata.innerHTML += `
            <tr class="source-row-item">
                <td> ${ index +1} </td>
                <td style="max-width: 400px;text-align:left"> ${item.machine} </td>
                <td> ${ item.ip } </td>
                <td> ${ new Date(item.contactdate).toLocaleString() } </td>
                <td class="flex no-pr">
                    <div  style="align-items:center">
                        <button onclick="setMachineStatus(event, ${item.id})" value="${ item.status == 'NOT ACTIVE' ? 'ACTIVE' : 'NOT ACTIVE'}" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:${ item.status === 'NOT ACTIVE' ? 'blue' : 'tomato'};border-radius:3px" >
                            ${ item.status === 'NOT ACTIVE' ? 'ACTIVATE' : 'DE-ACTIVATE'}
                        </button>
                    </div>
                </td>
            </tr>
            `
    }
    
    function renderNoTableData() {
        return  `
            <tr>
                <td colspan="3">
                    <div class="form-paragraph" style="text-align:center"> No data to show </div>
                </td>
            </tr>
        `
    }
    
 async function setMachineStatus(event, id) {
        
        if(!confirm('Are you sure sure?')) return
        
        // selecteditem = datasource[index]
        
        
        showSpinner();
        let paramstr = new FormData()
        paramstr.append('id', id)
        paramstr.append('status', event.target.value)
        
	    var request = getAjaxObject();
        request.open('POST','../controllers/togglemachinestatus.php',true);
        request.onreadystatechange = function(e){
            if(request.readyState == 4 && request.status == 200){  
                hideSpinner();
                if(request.responseText) {
                    let parseRequest = JSON.parse(request.responseText)
                    if(parseRequest.status){
                        callModal(`Machine status ${event.target.value == 'ACTIVE' ? 'activated' : 'deactivated'}`, 1)
                        fetchMachineIdentifications()
                    }
                    else return callModal(parseRequest.message)
                    
                } else  return callModal('Error: Request failed', 0)
            }
            else return hideSpinner();
            try{
                e.stopPropagation();
            }catch(ex){}
        }
        request.setRequestHeader('Connection','close'); 
        request.send(paramstr);
    }
    
async function openMachineIdentification() {
    await httpRequest('machineidentification.php');
    datasource = [];
     
    jtabledata = document.getElementById('machineidentificationtablejtabledata')
    initializePaginationParams(machineidsetCurrentPage)

    await fetchMachineIdentifications()
    
}
    

    

var machineidentificationbtn = document.getElementById('machineidentification');
if(machineidentificationbtn) machineidentificationbtn.addEventListener('click', openMachineIdentification, false)
