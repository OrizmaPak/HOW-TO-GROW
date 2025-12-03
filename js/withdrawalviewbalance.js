       async function withdrawalviewbalance () {
        await  httpRequest('withdrawalviewbalance.php')
    }
    
    var withdrawalviewbalancebtn = document.getElementById('withdrawalviewbalance')
    if(withdrawalviewbalancebtn) withdrawalviewbalancebtn.addEventListener('click', e=>withdrawalviewbalance())