       async function viewexcessniasolution () {
        await  httpRequest('viewexcessniasolution.php')
    }
    
var viewexcessniasolutionbtn = document.getElementById("viewexcessniasolution");
if (viewexcessniasolutionbtn) viewexcessniasolutionbtn.addEventListener("click", e=>viewexcessniasolution());