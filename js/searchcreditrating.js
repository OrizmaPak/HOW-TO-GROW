async function openSearchCreditRating() {
    await httpRequest('searchcreditrating.php')
    
    if(document.querySelector('button#submit')) document.querySelector('button#submit').addEventListener('click', searchCreditRating)
}

async function searchCreditRating() {
    if(document.getElementById('search')?.value.trim().length < 1) {
        return callModal('Please enter a search keyword')
    }
    try {
        let paramstr = new FormData(document.getElementById('searchcreditratingform'))
        let result =  await httpJsonRequest('../controllers/searchcreditscript.php', 'POST', paramstr)
        if(!result?.status) {
            if(typeof result.message == 'string') {
                let html = `
                    <div style="padding: 12px;font-size: 12px; color: red; background-color:#f2e9e9;border-left:4px solid red;transition:.5s;text-align:left">${result.message}</div>
                `
                try {
                    document.getElementById('result-area').innerHTML = html
                }
                catch(e) { console.log(e) }
            }
        }
    }
    catch(e) {
        console.log(e)
    }
}

var searchcreditratingbtn = document.getElementById('searchcreditrating')
if(searchcreditratingbtn) searchcreditratingbtn.addEventListener('click', openSearchCreditRating, false)