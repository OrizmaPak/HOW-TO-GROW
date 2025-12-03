       async function groupsystemcashanalysis () {
        await  httpRequest('groupsystemcashanalysis.php')
    }
    
var groupsystemcashanalysisbtn = document.getElementById("groupsystemcashanalysis");
if (groupsystemcashanalysisbtn) groupsystemcashanalysisbtn.addEventListener("click", e=>groupsystemcashanalysis());