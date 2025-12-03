let tasksheduleid



async function openScheduleRoster(){
'use strict';

await httpRequest('scheduleroster.php')

tasksheduleid = '';
callController('')
if(document.getElementById('taskschedulebranch'))document.getElementById('taskschedulebranch').innerHTML = `<option value="" disabled>Select Location</option>`;
if(document.getElementById('taskschedulebranch'))document.getElementById('taskschedulebranch').innerHTML += resultOfLocations.map(dat=>`<option value="${dat.id}">${dat.location}</option>`).join('');

const validateScheduleRoster =()=>{
    const pparaams =()=>{
        let paramstr = new FormData();
        if(tasksheduleid)paramstr.append('id', tasksheduleid)
        paramstr.append('location', document.getElementById('taskschedulebranch').value)
        paramstr.append('entrydate', document.getElementById('taskscheduleentrydate').value)
        paramstr.append('deliverydate', document.getElementById('taskscheduleexpectdeliverydate').value)
        paramstr.append('task', document.getElementById('taskscheduletask').value)
        return paramstr
    }
    const gettoviewtaskschedule=(result)=>document.getElementById('viewscheduleroster').click()
    if(document.getElementById('matschedulerostersubmitbtn').textContent == "Submit")callController('taskschedulescript.php', pparaams(), 'taskschedulescript', ['taskschedulebranch', 'taskscheduleentrydate', 'taskscheduleexpectdeliverydate', 'taskscheduletask'], resetPage)
    if(document.getElementById('matschedulerostersubmitbtn').textContent == "Update")callController('taskschedulescript.php', pparaams(), 'taskschedulescript', ['taskschedulebranch', 'taskscheduleentrydate', 'taskscheduleexpectdeliverydate', 'taskscheduletask'], gettoviewtaskschedule)
}
const tasksheduleaction =(result)=>{
        console.log(document.getElementById('taskschedulebranch'))
        if(document.getElementById('taskschedulebranch'))document.getElementById('taskschedulebranch').value = result.location_id;
    // if(result.role == 'SUPERADMIN' || result.role == 'ADMIN'){
    //     if(document.getElementById('taskschedulebranch'))document.getElementById('taskschedulebranch').setAttribute('readonly', false);
    // }else{
        if(document.getElementById('taskschedulebranch'))document.getElementById('taskschedulebranch').setAttribute('readonly', true)
    // }
}



const loadtaskschedule =(result)=>{
    if(document.getElementById('matschedulerostersubmitbtn'))document.getElementById('matschedulerostersubmitbtn').innerHTML = "Update";
        document.getElementById('taskschedulebranch').value = result.data[0].location;
        document.getElementById('taskscheduleentrydate').value = result.data[0].entrydate.split(' ')[0];
        document.getElementById('taskscheduleexpectdeliverydate').value = result.data[0].deliverydate.split(' ')[0];
        document.getElementById('taskscheduletask').value = result.data[0].task;
}

function tasksheduleparams(){
    var paramstr = new FormData();
    paramstr.append('email', document.getElementById('indexEmail').value);
        return paramstr;
    };
    setTimeout(()=>{
    if(sessionStorage.getItem('editviewtaskscheduledata')){
        tasksheduleid = sessionStorage.getItem('editviewtaskscheduledata').split(',')[0];
       function paramstaskschedule(){
        var paramstr = new FormData();
        paramstr.append('id', sessionStorage.getItem('editviewtaskscheduledata').split(',')[0]);
        paramstr.append('location', sessionStorage.getItem('editviewtaskscheduledata').split(',')[1]);
            return paramstr;
        };
        
        callController('fetchtaskschedule.php', paramstaskschedule(), 'fetchtaskschedule', null, loadtaskschedule);
         sessionStorage.removeItem('editviewtaskscheduledata')    
    }
    },1500)
        callController('fetchuserprofile.php', tasksheduleparams(), 'fetchuserprofile', null, tasksheduleaction);
if(document.getElementById('matschedulerostersubmitbtn'))document.getElementById('matschedulerostersubmitbtn').addEventListener('click',validateScheduleRoster,false);

}

var scheduleroster = document.getElementById('scheduleroster')
if(scheduleroster) scheduleroster.addEventListener('click',openScheduleRoster,false);

