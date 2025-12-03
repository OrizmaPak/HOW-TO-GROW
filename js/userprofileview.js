var profileusers; var viewuserprofilelocations;

async function userprofileview () {
    await  httpRequest('userprofileview.php');
    
    await fetchProfileLocations();
    await fetchAllViewProfileUsers();
    callController('fetchuserprofile.php', null, 'fetchuserprofile', null, display_userdata)
}

const display_userdata = (result) =>{
    try {
        document.getElementById('orefullname').innerHTML = result.firstname?.concat(' ', result.lastname, ' ', result.othername ?? '');
        document.getElementById('oreemail').innerHTML = result.email;
        document.getElementById('orephone').innerHTML = result.phone;
        document.getElementById('oreaddress').innerHTML = result.address;
        document.getElementById('oreuserrole').innerHTML = result.role;
        if(viewuserprofilelocations) {
            let userlocation = viewuserprofilelocations.find( item => item.id == result.location_id)
            document.getElementById('orelocation').innerHTML = userlocation ? userlocation.location : ''
        }
        
        if(profileusers) {
            let supervisor1 = profileusers.find( item => item.email === result.supervisoremail)
            let supervisor2 = profileusers.find( item => item.email === result.supervisoremail2)
            document.getElementById('oresupervisor1').innerHTML = supervisor1 ? supervisor1.firstname?.concat(' ', supervisor1.lastname, ' ', supervisor1.othername ?? ' ', ' - ', supervisor1.email) : ''
            document.getElementById('oresupervisor2').innerHTML = supervisor2 ? supervisor2.firstname?.concat(' ', supervisor2.lastname, ' ', supervisor2.othername ?? ' ', ' - ', supervisor2.email) : ''
        }
    }
    catch(e) { console.log(e)}
}

async function fetchAllViewProfileUsers () {
    let result = await fetchRequest('../controllers/fetchallusers.php');
    if(result) {
        let parseResult = JSON.parse(result);
        if(parseResult.status) profileusers = parseResult.data;
    }
}

async function fetchProfileLocations() {
    let result = await fetch('../controllers/fetchlocation.php', {method: 'POST', body: {}, headers: new Headers()})
    let res = await result.json();
    if(res?.status) viewuserprofilelocations = res.data?.data;
}

    
var userprofilebtn = document.getElementById('profile')
var userprofileviewbtn = document.getElementById('userprofileview')
if(userprofileviewbtn) userprofileviewbtn.addEventListener('click', e=>userprofileview())
if(userprofilebtn) userprofilebtn.addEventListener('click', e=>userprofileview())