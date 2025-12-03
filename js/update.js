       async function update () {
        await  httpRequest('update.php')
    }
    
var updatebtn = document.getElementById("update");
if (updatebtn) updatebtn.addEventListener("click", e=>update());