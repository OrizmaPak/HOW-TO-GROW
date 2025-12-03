async function viewLevelChanged () {
    
    // alert("Vicol");
    
    loadReorderList('view-level-changed.php', 'override');
    
	var getAjaxObject = function(){
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

    // document.getElementById('view-level-changed-tbody').innerHTML = "";
    // var result = {
    //     data: {
    //         0 : {
    //             staffname : "Vicol Olawade",
    //             location : "Lagos, Nigeria",
    //             oldlevel : 2,
    //             level : 1,
    //         },
    //         1 : {
    //             staffname : "Vicol Olawade",
    //             location : "Lagos, Nigeria",
    //             oldlevel : 2,
    //             level : 1,
    //         },
    //         2 : {
    //             staffname : "Vicol Olawade",
    //             location : "Lagos, Nigeria",
    //             oldlevel : 2,
    //             level : 1,
    //         },
    //         3 : {
    //             staffname : "Vicol Olawade",
    //             location : "Lagos, Nigeria",
    //             oldlevel : 2,
    //             level : 1,
    //         },
    //         length : 4
    //     }
    // }
    // console.log(result);
    // console.log(result.data.length);
    // for (var k=0;k<result.data.length;k++){
    //     console.log(k);
    //     console.log(result.data);
    //     console.log(result.data.k);
    //     document.getElementById('view-level-changed-tbody').innerHTML += 
    //     `
    //         <tr><td>${k}</td><td>${result.data.k.staffname}</td><td>${result.data.k.location}</td><td>${result.data.k.oldlevel}</td><td>${result.data.k.level}</td></tr>
    //     `;
        
    // }
    
    function getFetchViewLevelChangedParams(){
        var paramstr = new FormData();
        // paramstr.append("item", document.getElementById('select-item').value);
        return paramstr;
    
    }
    
    var fetchViewLevelChanged = function(e){
        // alert("Reached fetchViewLevelChanged Function");
        var innerstr = '';
        
        (document.getElementsByName('loadingicon')[0]).style.visibility = 'visible';
        (document.getElementsByName('loadingicon')[0]).style.display = 'block';	
        
        var request = getAjaxObject();
        
        request.open('POST','../controllers/controller.php',true);
        request.onreadystatechange = function(){
            if(request.readyState == 1){
                //sysf.innerHTML = fs + 'Loading...';
                //alert('Loading...' + ' type: ' + e.type + ' Target: ' + e.target.nodeName.toLowerCase());
            }
            if(request.readyState == 4 && request.status == 200){
                    (document.getElementsByName('loadingicon')[0]).style.visibility = 'hidden';
                    (document.getElementsByName('loadingicon')[0]).style.display = 'none';
                    
                    console.log(request.responseText);
                    
                    let result = JSON.parse(request.responseText);
                    if(result["result"] === "ERROR"){
                        var mbox = document.getElementsByName('messageBox')[0];
                        document.getElementsByName('messageBox')[0].innerHTML = "No result for the selected filters";
                        mbox.style.display = 'block';
                        mbox.style.visibility = 'visible';
                        setTimeout(function(){
                            mbox.style.display = 'none';
                            mbox.style.visibility = 'hidden';
    
                        }, 4000);						
                        
                    }else{
                        //var mbox = document.getElementsByName('reportfilterbox')[0];
                        // alert("Reached Item Detail Load Data Function");
                        loadViewLevelChangedData(result);
                        // alert("Passed Item Detail Load Data Function");
                        
                    }
                
            }else{
                (document.getElementsByName('loadingicon')[0]).style.visibility = 'hidden';
                (document.getElementsByName('loadingicon')[0]).style.display = 'none';
                
                
                //document.getElementsByName('loader')[0].style.display = 'none';
                //sf = '<b>Error getting data</b>';
            }
    
    
            try{
                e.stopPropagation();
            }catch(ex){}
        }
    
        
        request.setRequestHeader('Connection','close');
        request.send(getFetchViewLevelChangedParams());
    
    }
    
    function loadViewLevelChangedData(result){
        console.log(result.data);
        document.getElementById('view-level-changed-tbody').innerHTML = "";
        if(result.data.length > 0){
            for (var k=0;k<result.data.length;k++){
                document.getElementById('view-level-changed-tbody').innerHTML += 
                `
                    <tr><td>${k}</td><td>${result.data.k.staffname}</td><td>${result.data.k.location}</td><td>${result.data.k.oldlevel}</td><td>${result.data.k.level}</td></tr>
                `;
            }
        }
    
    }
    
    fetchViewLevelChanged();
    
}


var viewLevelChangedNav = document.getElementById("idInTheNavigation");
if (viewLevelChangedNav) viewLevelChangedNav.addEventListener("click", viewLevelChanged, false);
