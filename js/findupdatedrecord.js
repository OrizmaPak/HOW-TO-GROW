       async function findupdatedrecord () {
        await  httpRequest('findupdatedrecord.php')
    }
    
    var findupdatedrecordbtn = document.getElementById('findupdatedrecord')
    if(findupdatedrecordbtn) findupdatedrecordbtn.addEventListener('click', e=>findupdatedrecord())