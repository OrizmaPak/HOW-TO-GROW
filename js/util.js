
var jtabledata; var datasource = []; var printBtn;
var paginationLimit = 30; var pageCount; var currentPage = 1; var prevRange; var currRange; var nextButton; var prevButton; var paginationNumbers;
var paginationStatus;


window.onload = function() {
    if(document.getElementById("closesysfootpanel")) document.getElementById("closesysfootpanel").addEventListener("click", () => hideShowResponse());
    assetsUrl.sessionLocation = document.getElementById('sessionlocation')?.value
    
}

async function userLogout() {
    await sessionLogOff();
    location.reload()
}


function maskInputs(arryofInputsIds) {
    if(arryofInputsIds.length) {
        arryofInputsIds.forEach( item => {
            const input = document.getElementById(item)
            if(item) {
                const maskElement = document.createElement('input')
                maskElement.className = 'jformcontrol jmargin-top'
                maskElement.value = '******'
                maskElement.disabled = true
                input.parentElement.appendChild(maskElement)
                input.style.display = 'none';
            }
        })
    }
}

if(document.getElementById('navcontainer')) {
    (function() {
        
        const idleDurationSecs = 60 * 10;
        let idleTimeout
    
        const resetIdleTimeout = function() {
            if(idleTimeout) clearTimeout(idleTimeout);
            idleTimeout = setTimeout(Activitytimeout, idleDurationSecs * 1000);
        };
    	
        resetIdleTimeout();
        window.onmousemove = resetIdleTimeout;
        window.onkeypress = resetIdleTimeout;
        window.click = resetIdleTimeout;
        window.onclick = resetIdleTimeout;
        window.touchstart = resetIdleTimeout;
        window.onfocus = resetIdleTimeout;
        window.onchange = resetIdleTimeout;
        window.onmouseover = resetIdleTimeout;
        window.onmouseout = resetIdleTimeout;
        window.onmousemove = resetIdleTimeout;
        window.onmousedown = resetIdleTimeout;
        window.onmouseup = resetIdleTimeout;
        window.onkeypress = resetIdleTimeout;
        window.onkeydown = resetIdleTimeout;
        window.onkeyup = resetIdleTimeout;
        window.onsubmit = resetIdleTimeout;
        window.onreset = resetIdleTimeout;
        window.onselect = resetIdleTimeout;
        window.onscroll = resetIdleTimeout;
    
    })();
}

function Activitytimeout() {
    let el = document.createElement('div')
    el.id = 'expiredsessionalert'
    el.style.cssText = 'position:absolute;left:0;top:0;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);height:100vh;width:100%; z-index: 9999;  transition: 2s;'
    el.innerHTML = `
        <div style="margin: 100px auto;width: 300px;background-color:white; padding:20px">
            <div>
              <h6 style="text-align:center;color: tomato;margin-bottom: 5px"><i class="fa fa-exclamation-circle"></i> SESSION EXPIRED</h6>
              <p style="opacity:.8;font-size:14px;">Your  session has expired. You need to login again</p>
              <a style="display:block;margin-right:0;width:max-content;padding:8px 12px;background-color:green; font-size:13px;font-weight:500;border-radius:2px;color:white;margin-top:13px" href="login.php">Logout</a>
            </div>
        </div>
    `
    document.getElementById('expiredsessionalert')?.remove()
    document.body.appendChild(el)
    sessionLogOff()
}

async function sessionLogOff() {
    let result = await fetch('../controllers/logoff.php')
}

var  getAjaxObject = function(){
	var requeste;
	try{
		requeste = new XMLHttpRequest();
	}catch(error){
		try{
			requeste = new ActiveXobject('Microsoft.XMLHTTP');
		}catch(error){
			return 'Error';
		}
	}
	return requeste;
}

const assetsUrl = {
    logo: '../images/howlogo-removebg-preview.png'
}

const showResponse = (msg) => {
  document.getElementById("sysfootpanel").innerHTML = `&#8505;&nbsp;${msg}`;
  document.getElementById("footpanel-wrapper").classList.remove("hide");
};

function hideShowResponse() {
    if(document.getElementById("footpanel-wrapper")) document.getElementById("footpanel-wrapper").classList.add("hide");
}

function formatMoney(moneystr) { 
    let fl = Number.parseFloat(moneystr).toFixed(2);
    let parse = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'NGN'}).format(fl);
    let str = parse.toString().replace(/NGN/i, '');
    return str
}

function checkSession() {}

function openJModal(content) {
    let modal = document.querySelector('.modal-content')
    if(modal) {
        modal.parentElement.style.display = 'block'
        modal.innerHTML = `<div id="modal-actual-content">
            ${content}
            <div style="display:flex;align-items:end;justify-content:end;position:absolute;left-0;top:0;width:100%">
                <button id="jmodal-close" type="button" style="padding: 15px;font-weight:700px;font-size:medium;background-color:transparent;border:none;cursor:pointer;">&#10006;</button>
            </div>
        </div>`

        document.querySelector('button#jmodal-close').addEventListener('click', closeJmodal)
        
    }
}

function closeJmodal() {
    let modal = document.querySelector('.modal-content');
    modal.querySelector('#modal-actual-content').remove();
    modal.parentElement.style.display = 'none'
}


function validatorMapper (validationMap) {
    let message = '';
    if(validationMap.length) {
        validationMap.forEach( map => {
            controlFlag(0, map.element);
            message += inputs[map.loopindex].validation[map.validator] + ' <br />'
        })
        validationMap[0].element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
        errorBox(message);
    }
}
    
function controlFlag(status, element) {
    if(status === 0 ) element.style.border = '1px solid red';
    else element.style.border = '';
}

function FieldValidator(arrayOfValidation = [], element, regexp, loopindex) {
    
    let state;
    
    arrayOfValidation.forEach( validation => {

        if(validation) {

            if(validation.includes('pattern')) {
                let flag = pattern(element, regexp);
                if(flag ===  false)  state =  {element, 'validator': 'pattern', valid: flag, loopindex}
                else controlFlag(1, element);
            }
            else if (validation.includes('required')) {
                    let flag = required(element)
                    if(flag ===  false) state =  {element, 'validator': 'required', valid: flag, loopindex };
                    else controlFlag(1, element);
            }
            else {
                    controlFlag(1, element);
                    state =  null; 
            }  
        }

        return

    })

    return state
    

}

function pattern(element, regexp) {
    return element?.value.toString().match(regexp) ? true : false
}

function required(element) {
    return element?.value.toString().length < 1 ? false : true 
}

function initializePaginationParams(setCurrentPageFunction=function(){}) {
    nextButton = document.getElementById("jnext-button");
    prevButton = document.getElementById("jprev-button");
    paginationNumbers = document.getElementById("pagination-numbers");
    paginationStatus = document.getElementById('pagination-status');
    if(prevButton) prevButton.addEventListener("click", () => {setCurrentPageFunction(currentPage - 1); calPaginationStatus()});
    if(nextButton) nextButton.addEventListener("click", () => {setCurrentPageFunction(currentPage + 1); calPaginationStatus()});
}

async function initPagination(data, setCurrentPageFunction) {
    if(document.getElementById('pagination-numbers')) document.getElementById('pagination-numbers').innerHTML = ''
    pageCount = Math.ceil(data.length / paginationLimit);
    await getPaginationNumbers();
    await setCurrentPageFunction(1);
    document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));         
        if (pageIndex)  button.addEventListener("click", () => {setCurrentPageFunction(pageIndex); calPaginationStatus()});
    });
    // await calPaginationStatus()
    setTimeout(calPaginationStatus, 2000)
    return
}

function calPaginationStatus() {
    let itemsAvailable = jtabledata.querySelectorAll('.source-row-item')?.length;
    if(paginationStatus) paginationStatus.innerHTML = `
            Showing ${ prevRange + 1 }  to ${ itemsAvailable >= currRange * currRange ? (-prevRange + currRange ) + itemsAvailable : itemsAvailable + prevRange} of ${ datasource.length } Records `
}

const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.type = 'button';
    pageNumber.setAttribute("aria-label", "Page " + index);
    paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
      appendPageNumber(i);
    }
};

const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
};
  
const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
    if (currentPage === 1)  disableButton(prevButton);
    else  enableButton(prevButton)
    if (pageCount === currentPage) disableButton(nextButton)  
    else enableButton(nextButton) 
};

const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
      button.classList.remove("active");
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex == currentPage)  button.classList.add("active")
    });
  };

var tableToExcel = (function(table, name) { 
    var uri = 'data:application/vnd.ms-excel;base64,' 
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    return function(table, name) {
      if (!table.nodeType) table = document.getElementById(table)
      var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
      window.location.href = uri + base64(format(template, ctx))
    }
})()

var printContent = (header, path, contentid) => {
    let content = document.getElementById(`${contentid}`);
    if(content) {
        var winPrint = window.open(`${header}`, '', 'width=1000,height=900');
        winPrint.document.write('<html><head><title></title>');
        winPrint.document.write(`${path}`);
        winPrint.document.write(`<h1 style="text-align:center;font-weight:400px;text-transform:uppercase;font-size:14px;">${header}</h1>` + content.innerHTML);
        winPrint.document.write('<script type="text/javascript">addEventListener("load", () => { print(); close(); })</script></body></html>');
        winPrint.document.close();
        winPrint.focus();
    }
}

async function httpJsonRequest(url,  method='GET', payload=null) {
    showSpinner();
    try {
        let result = await fetch(url, {method: (method === 'GET' ? 'GET' : 'POST'), headers: new Headers(), body: payload });
        let res = await result.json();
        return res;
    }
    catch(e) {
        hideSpinner();
    }
    finally {
        hideSpinner();
    }
}

async function fetchRequest(url, data={}) {
    showSpinner();
    try {
        let result = await fetch(url, {method: 'POST', headers: new Headers(), body:data});
        let res = await result.text();
        return res;
    }
    catch(e) {
        hideSpinner();
    }
    finally {
        hideSpinner();
    }
}


function errorBox(mssg, timeout = 3000) {

    var mbox = document.getElementById('messageBox');
       if(mbox) {
            mbox.innerHTML = mssg;
            mbox.style.display = 'block';
            mbox.style.visibility = 'visible';
    
            setTimeout(function(){
                mbox.style.display = 'none';
                mbox.style.visibility = 'hidden'
            }, timeout);
       }
}

var customObserver = new MutationObserver(function(mutations_list) {
    mutations_list.forEach(function(mutation) {
		try {
		    mutation.removedNodes.forEach(function(removed_node) {
    			if(removed_node.classList.contains('obs')) {
                    sessionStorage.clear();
    			}
		    });
		}
		catch(e) {
		    null
		}
    });
})

customObserver.observe(document.querySelector("#nav-right-container" || "#nav-right-container3"), { subtree: false, childList: true });
