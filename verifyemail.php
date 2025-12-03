<?php
session_start();
if(!isset($_SESSION["user_id"]) && !isset($_SESSION["user_id"]))
{
	header('Location: login.php');
}

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Email</title>
    <link rel="stylesheet" type="text/css" href="./css/user.css">
    <link rel="stylesheet" type="text/css" href="./css/index.css">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
  </head>
  <style>
      html {
          overflow-y: auto;
      }
      input:read-only {
          background-color:rgb(250, 248, 247,0.8);
      }
      button:disabled {
          opacity: .3;
      }
  </style>
  <body>

    <div class="formcontainer registrationcontainer" style="background-color: #fff">

      <div class="formmain loginform" id="verifyemailform" style="box-shadow: none;border: 1px solid lightgray;">
              <h4 style="border-bottom:1px solid lightgray;padding: 0 0 10px 0; margin: 15px 0 15px 0"> Verify Your Email</h4>
            <div class="formcontrol">
                <label for="firstname" >First Name</label>
                <input type="text" name=firstname"level" id="firstname" readonly="readonly" value="<?php echo isset($_POST['firstname']) ? $_POST['firstname'] : '' ?>"> 
            </div>
            <div class="formcontrol">
                <label for="firstname" >Last Name</label>
                <input type="text" name="lastname" id="lastname" readonly="readonly" value="<?php echo isset($_POST['lastname']) ? $_POST['lastname'] : '' ?>"> 
            </div>
            <div class="formcontrol">
                <label for="firstname" >Other Names</label>
                <input type="text" name="othername" id="othername" readonly="readonly" value="<?php echo isset($_POST['othername']) ? $_POST['othername'] : '' ?>"> 
            </div>
            <div class="formcontrol">
                <input type="hidden" id="email" name="email" readonly="readonly" value="<?php echo isset($_POST['email']) ? $_POST['email'] : '' ?>"> 
            </div>
            <div class="btns mloginbtn ">
                <button  id="verify" type="button" class="btnlogin btn btnblue mt">Verify Email</button>
            </div>
            
      </div>
      
    <div class="loginformtwo"><p><a style="text-decoration:none;color:gray" href="./login.php" >Back to Login</a></p></div>
    </div>
    
    <div id="notificationmodal">
        <span><em></em></span>
        <div class="contentcontainer">
            <p id="messageBox2"><br/></p>
        </div>
    </div>

 <script type='text/javascript' src="./js/verifyemail.js" >
 </script>

  </body>
</html>
