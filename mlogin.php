<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>login</title>
    <link rel="stylesheet" type="text/css" href="./css/user.css">
    <link rel="stylesheet" type="text/css" href="./css/index.css">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
  </head>
  <body>
    <div class="formcontainer logincontainer">
      <div class="login__header">
             <img src="../images/howlogo-removebg-preview.png" alt=""> 
           
        </div>
      <div class="formmain loginform ">
            
                <div class="formcontrol">
                    <label for="password">Email</label>
                    <input type="text" name="level" id="mloginemail"> 
                </div>
                <div class="formcontrol">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="mloginpassword"> 
                </div>
            <div class="btns mloginbtn ">
                <button  id="mloginbtn" type="button" class="btnlogin btn btnblue mt"  id="matlevelbtnsubmit">
                Login
                </button>
            </div>
            <div class="matotherlink">
                <span></span>
                <span>Forgot password</span>
            </div>
      </div>
    <div class="loginformtwo"><p>Dont have account yet? <strong>Sign Up</strong></p></div>
    </div>
    
    <div id="notificationmodal">
        <span><em>Notice!!</em></span>
        <!-- <span><em><i>Notice!!</i></em></span> --> 
        <div class="contentcontainer">
            <p id="messageBox2"><br/></p>
        </div>
    </div>
    <!-- VICOL'S CODE [FOR NOTIFICATION MESSAGE] START -->
    <div name="messageBox" id="messageBox" class="messageBox">
                
    </div>
    <div id="loadingicon" name="loadingicon">
		<img src="../../images/djfh (2).gif" alt="" class="">
	</div>
	<div id='spinner' class=''>
               <img class="blink_me" src="../images/WhatsApp Image 2023-01-05 at 08.21.50.jpeg" alt=""> 
                <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

 <script type='text/javascript' src="./js/mlogin.js" >
 </script>

  </body>
</html>
