<?php
session_start();
?>

<div class="formcontainer overflowcontainer">
    <div class="adminpanelheader">
        <h5>ADMIN DASHBOARD</h5>
    </div>
    <!-- Admin panel Cards -->
    <div class="adminpanelcardholder">
        <div id="firstcard" style="cursor: pointer" class="adminpanelcard firstcard">
            <div class="cardcontent">
                <h2 id="regusers">0</h2>
                <h4>Registered Users</h4>
            </div>
            <div class="cardicon"><i class="fa-solid fa-user-plus iconsize"></i></div>
        </div>
        <div id="secondcard" style="cursor: pointer" class="adminpanelcard secondcard">
            <div class="cardcontent">
                <h2 id="onlineusers">0</h2>
                <h4>Online Users</h4>
            </div>
            <div class="cardicon"><i class="fa-solid fa-users iconsize"></i></div>
        </div>
        <div id="secondcard" class="adminpanelcard thirdcard">
            <div class="cardcontent">
                <h2>Load</h2>
                <h4>Service Balance</h4>
            </div>
            <div class="cardicon"><i class="fa-solid fa-window-maximize iconsize"></i></div>
        </div>
    </div>
    
    <!-- Admin panel small Modal -->
    <div class="adminpanelmodalholder hidden">
        
        <button> <span class="toggle" style="height:fit-content">
                <i class="fa-solid fa-caret-left "></i>
                Manage
            </span>
            <div class="modal hide">
                <ul>
                    <li><a href="#!">Password Reset</a></li>
                    <li><a href="#!">Service Usage Report</a></li>
                    <li class="openmodal"><a href="#!">Fun Service Account</a></li>
                </ul>
            </div>
        </button>
    </div>
    
<div style="display: flex;padding: 10px;background: #10ff001f;justify-content: center;align-items:center" class="split">
    <div class="formcontrol" style="width: 300px;">
        <label for="startdate">Name of User</label> 
        <input type="text" name="search" id="usersselecter" placeholder="Please Enter Name" style="/* width: 200px; */"/>
    </div>
    <div class="formcontrol" style="margin-top: 10px;"> 
<div class="wrapbtn btns " style="position: relative; top: 10px">
<button type="button" class="createbranchbtn btn btnmedium btnblue mb " style="margin-top: 10px" id="matuserlogviewbtnn">View</button>
</div>
</div> 
</div> 
    
    <div class="jtable-content">
        <table class="jmargin-top" id="alluserstable">
            <thead>
                <tr>
                    <th style="padding: 10px 52px;">Actions</th>
                    <th>First&nbsp;Name</th>
                    <th>Last&nbsp;Name</th>
                    <th>Middle&nbsp;Name</th>
                    <th>Online</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Role</th>
                    <th>contact&nbsp;Address</th>
                    <th>Admin&nbsp;Head&nbsp;Email</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody id="jtabledata"></tbody>
        </table>
    </div>
    <div class="j-table-status jflex jcontent-between jmargin-top">
        <span class="jcontrollabel" style="text-transform: none" id="pagination-status"> </span>
        <span class="jflex jcontent-between">
            <span class="jflex jpagination">
                <button class="j-no-bg" type="button" id="jprev-button">previous</button>
                <span id="pagination-numbers"></span>
                <button  class="j-no-bg" type="button" id="jnext-button">next</button>
            </span>
        </span>
    </div>

    <div class="overlay1 overlaystyle hidden">
        <div class="mainmodal ">
            <i class="fa-solid fa-triangle-exclamation dangernotice"></i>
            <p>Are you sure you want to perform this operation ?</p>
            <div class="mainmodalbtns">
                <button class="btn btnprimary canclebtn"> <i class="fa-solid fa-xmark marleft"></i>Cancle</button>
                <button class="btn btnsecondary confirmbtn"><i class="fa-solid fa-check marleft"></i>Confirm</button>
            </div>
        </div>
    </div>
    
    <div class="overlay2 overlaystyle hidden ">
    </div>
    <div class="funaccountcontainer ">
        <div class="funaccountheader">
            <h4>FUN SERVICE ACCOUNT </h4>
            <i class="fa-solid fa-xmark closemodal"></i>
        </div>
        <div class="funaccountmain">
            <form action="">
                <div class="formcontrol">
                    <label for="email">E-mail Address</label>
                    <input type="email" name="email" id="email" class="email">
                </div>
                
                <div class="formcontrol">
                    <label for="amount">Amount</label>
                    <input type="text" name="amount" id="amount" class="amount">
                </div>
                
                <div class="split">
                    <div class="formcontrol">
                        <label for="firstname">First Name</label>
                        <input type="text" class="firstname" id="firstname" placeholder="First Name">
                    </div>
                    <div class="formcontrol">
                        <label for="lastname">Last Name</label>
                        <input type="text" class="lastname" id="lastname" placeholder="Last Name">
                    </div>
                </div>
                <button class="btn btnblue">Proceed to payment <i class="fa fa-chevron-right "></i></button>
            </form>
        </div>
    </div>
    
</div>
	<div class="section full-height">
      	<input class="modal-btn hidden" type="checkbox" id="modal-btn" name="modal-btn"/>		
      	<input type="hidden" id="userremoveid" />		
      	<div class="modal" id="modaller" onclick="if(event.target.id == 'modaller')document.getElementById('modal-btn').checked = false;">		
	      	<div class="modal-wrap" style="padding: 30px; background-color: #f8f9fa; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.15); max-width: 400px; margin: 1em auto;">	
                <div class="formcontrol" style="display: flex; flex-direction: column;">
                    <label for="lastname" style="margin-bottom: 0.5em; color: #333; font-weight: bold;">Enter Password</label>
                    <input type="password" name="upw" id="upw" placeholder="Enter password" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 0.95em; color: #333;">
                    <div style="display:flex;gap:20px;justify-content:flex-end;">
                        <button onclick="document.getElementById('modal-btn').checked = false;" style="width: fit-content;margin-top: 20px; padding: 10px; background-color: #007BFF; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
                        <button onclick="document.getElementById('modal-btn').checked = false;adminpanelrowbtn('delete', '', true)" style="width: fit-content;margin-top: 20px; padding: 10px; background-color: #dc3545; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Delete User</button>
                    </div>
                </div>
            </div>
			          		
      	</div>	
	</div>
<style>.modal-btn:checked + label,
.modal-btn:not(:checked) + label{
  position: relative;
  font-weight: 500;
  font-size: 15px;
  line-height: 2;
  height: 50px;
  transition: all 200ms linear;
  border-radius: 4px;
  width: 240px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
    -ms-flex-item-align: center;
    align-self: center;
  border: none;
  cursor: pointer;
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 12px 35px 0 rgba(16,39,112,.25);
}
.modal-btn:not(:checked) + label:hover{
  background-color: #ffeba7;
  color: #102770;
}
.modal-btn:checked + label .uil,
.modal-btn:not(:checked) + label .uil{
	margin-left: 10px;
	font-size: 18px;
}
.modal-btn:checked + label:after,
.modal-btn:not(:checked) + label:after{
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 110;
  width: 40px;
  border-radius: 3px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 18px;
  background-color: #ffeba7;
  color: #102770;
  box-shadow: 0 12px 25px 0 rgba(16,39,112,.25);
  transition: all 200ms linear;
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px);
}
.modal-btn:checked + label:hover:after,
.modal-btn:not(:checked) + label:hover:after{
  background-color: #102770;
  color: #ffeba7;
}
.modal-btn:checked + label:after{
  transition: opacity 300ms 300ms ease, transform 300ms 300ms ease, background-color 250ms linear, color 250ms linear;
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
.modal{
  position: fixed;
  display: block;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  overflow-x: hidden;
  background-color: rgba(31,32,41,.75);
  pointer-events: none;
  opacity: 0;
  transition: opacity 250ms 700ms ease;
}
.modal-btn:checked ~ .modal{
  pointer-events: auto;
  opacity: 1;
  transition: all 300ms ease-in-out;
}
.modal-wrap {
  position: relative;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  overflow: hidden;
  padding-bottom: 20px;
  background-color: #fff;
    -ms-flex-item-align: center;
    align-self: center;
    box-shadow: 0 12px 25px 0 rgba(199,175,189,.25);
  opacity: 0;
  transform: scale(0.6);
  transition: opacity 250ms 250ms ease, transform 300ms 250ms ease;
}
.modal-wrap img {
  display: block;
  width: 100%;
  height: auto;
}
.modal-wrap p {
  padding: 20px 30px 0 30px;
}
.modal-btn:checked ~ .modal .modal-wrap{
  opacity: 1;
  transform: scale(1);
  transition: opacity 250ms 500ms ease, transform 350ms 500ms ease;
}


.logo {
	position: absolute;
	top: 25px;
	left: 25px;
	display: block;
	z-index: 1000;
	transition: all 250ms linear;
}
.logo img {
	height: 26px;
	width: auto;
	display: block;
  	filter: brightness(10%);
	transition: filter 250ms 700ms linear;
}
.modal-btn:checked ~ .logo img {
  	filter: brightness(100%);
	transition: all 250ms linear;
}


@media screen and (max-width: 500px) {
	.modal-wrap {
		width: calc(100% - 40px);
		padding-bottom: 15px;
	}
	.modal-wrap p {
	  padding: 15px 20px 0 20px;
	}
}</style>