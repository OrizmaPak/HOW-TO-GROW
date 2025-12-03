<?php 
    session_start()
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Account Registration </title>
    <link rel="stylesheet" href="./css/index.css">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

</head>

<style>

    body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 14px;
        color: #333;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f5f5f5;
        
    }
    
    html {
        overflow-y: auto !important;
    }
    
    header {
        background-color: #fff;
        border-bottom: 2px solid #027a3e;
        padding: 5px 0;
    }
    
    .content-width {
      margin-left: auto;
      margin-right: auto;
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }
    
    button:disabled {
        opacity: .3;
    }
    
    @media (min-width: 768px) {
      .content-width {
        width: 91.666667%;
      }
    }
    
    header > div {
        display: flex;
        align-items: center; 
        justify-content: space-between;
    }
    
    header > div > span {
        font-weight: bold;
        font-size: 1.3rem;
    }
    
    header > div > span img {
        width: 40px;
        height: auto;
    }
    
    header > div > div {
        display: flex;
        align-items: center; 
        gap: 18px;
        flex-grow: 1;
        justify-content: end;
    }
    
    header > div > div a {
        font-size: .8rem;
        text-transform: uppercase;
        font-weight: 600;
        text-decoration: none;
        color: #333;
        transition: ease-in .5s;
    }
    
    header > div > div a:nth-child(2) {
         color: #027a3e;
     }
    
    header > div > div a:hover {
        color: #027a3e;
    }
    
    section > div {
        /*height: 100vh;*/
        /*overflow: hidden;*/
        display: flex;
        justify-content:center;
        align-items:center;
        padding-top: 40px;
    }
    
    section > div > div p {
        text-align: center;
        font-weight: bold;
        font-size: 17px;
    }
    
    section > div > div > div {
        margin-top: 40px;
    }
    
    #registrationform > div:nth-child(1) {
        display: flex;
        flex-direction: column;
        gap: 12px; 
        
    }
    
    form {
        width: inherit;
       
    }
    
    form > div {
        display:flex;
        flex-direction:column;
        gap:10px
    }
    
    .form-group {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        gap:5px;
    }
    
    .form-control {
        width: inherit;
        background-color: #fff;
        border-radius: 0;
        border: transparent;
        padding:14px;
        outline: none;
        border-bottom:2px solid lightgray;
        font-size: .8rem;
    }
    
    .form-group label {
        font-size: .8rem;
        font-weight: 400;
        opacity: .8;
    }
    
    form h4 {
        border-bottom:1px solid lightgray;
        padding: 10px 0;
        margin: 15px 0;
        display: block;
    }
    
    .form-control::placeholder {
        opacity: .8;
    }
    
  
    #registrationform  button {
        padding: 16px;
        background: #027a3e;
        color: white;
        font-size: .8rem;
        text-transform: capitalize;
        width: 100%;
        border-radius: 5px;
        outline: none;
        border: none;
        margin-top: 20px;
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        cursor: pointer;
    }
    
    #registrationform > div:nth-child(3) {
        border-top: 1px solid lightgray;
        padding: 16px 0;
        text-align: center;
    }
    
    #registrationform > div:nth-child(3) p {
        color: black;
        opacity: .8;
    }
    
    #registrationform > div:nth-child(3) p a {
        color: #027a3e;
        text-decoration: none;
        transition: ease-in .3s;
    }
    
    #registrationform > div:nth-child(3) p a:hover {
        text-decoration: underline;
    }
    
    .form_row {
        display: block;
    }

    @media (min-width: 1024px) {
        .content-width {
            width: 83.333333%;
        }
      
        section > div > div {
            width: 50%
        }
        
        .form_row {
            display: flex;
            gap: 10px;
            /*width: 100%;*/
        }
    
    }
    
    @media (min-width: 1280px) {
      .content-width {
        width: 80%;
      }
    }
    
    @media (min-width: 1600px) {
      .content-width {
        width: 60%;
      }
    }


</style>

<body>
    <header>
        <div class="content-width">
            <span > 
                <img src="../images/howlogo-removebg-preview.png" alt="How to grow logo">
            </span> 
            <div>
                <a href="./login.php">Log in</a>
                <a href="././registration.php">sign up</a>
            </div>
        </div>
    </header>
    <section>
        <div class="content-width">
            <div>
                <p class="text-gray-500">Account Registration</p>
                <div class="mt-10">
                    <form id="registrationform" autocomplete="off">
                        <h4 > Authorization</h4>
                        <div>
                             <div class="form-group">
                                <label for="password">Email</label>
                                <input class="form-control"  type="text" name="email" id="email" autocomplete="off"> 
                            </div>
                            <div class="form_row">
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input class="form-control"  type="password" name=password"" id="password" autocomplete="off"> 
                                </div>
                                <div class="form-group">
                                    <label for="confirmpassword">Confirm Password</label>
                                    <input class="form-control"  type="password" name="confirmpassword" id="confirmpassword" autocomplete="off"> 
                                </div>
                            </div>
                            <div class="form_row">
                                <div class="form-group">
                                    <label for="role">User Role</label>
                                    <select class="form-control" name="role" id="role" >
                                        <option value=""> -- Select Role --</option>
                                        <option value="staff"> Staff </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="location">Location</label>
                                    <select class="form-control" name="location" id="location" >
                                        <option value=""> -- Select Location --</option>
                                    </select>
                                </div>
                            </div>
                            
                        </div>
                
                        <h4 > Bio Data </h4>
                        <div>
                            <div class="form_row">
                                <div class="form-group">
                                    <label for="firstname">First Name</label>
                                    <input class="form-control"  type="text" name="firstname" id="firstname" autocomplete="off"> 
                                </div>
                                <div class="form-group">
                                    <label for="lastname">Last Name</label>
                                    <input class="form-control"  type="text" name="lastname" id="lastname" autocomplete="off"> 
                                </div>
                            </div>
                            <div class="form_row">
                                <div class="form-group">
                                    <label for="othername">Other Name</label>
                                    <input class="form-control"  type="text" name="othername" id="othername" autocomplete="off"> 
                                </div>
                                <div class="form-group">
                                    <label for="phone">Phone Number</label>
                                    <input class="form-control"  type="number" inputmode="numeric" name="phone" id="phone" autocomplete="off"> 
                                </div>
                            </div>
                            <div class="form_row">
                                <div class="form-group">
                                    <label for="address">Contact Address</label>
                                    <input class="form-control"  type="text" name="address" id="address" autocomplete="off"> 
                                </div>
                                <div class="form-group">
                                    <label for="dateofbirth">Date of Birth</label>
                                    <input class="form-control"  type="date" name="dateofbirth" id="dateofbirth"> 
                                </div>
                            </div>
                            
                        </div>
                
                        <h4 > Security Questions </h4>
                        <div>
                            <div class="form_row">
                                <div class="form-group">
                                    <label for="question1">Question One</label>
                                    <select class="form-control" name="question1" id="question1" >
                                        <option value=""> -- Select Question One --</option>
                                        <option value="What is the name of your primary school">What is the name of your primary school?</option>
                                        <option value="What is your favourite food">What is your favourite food?</option>
                                        <option value="What is the name of your best friend">What is the name of your best friend?</option>
                                        <option value="At what age did you complete secondary school?">At what age did you complete secondary school?</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="answer1">Answer One</label>
                                    <input class="form-control"  type="text" name="answer1" id="answer1" autocomplete="off"> 
                                </div>
                            </div>
                            <div class="form_row">
                                <div class="form-group">
                                    <label for="question2">Question Two</label>
                                    <select class="form-control" name="question2" id="question2" >
                                        <option value=""> -- Select Question Two --</option>
                                        <option value="What is the name of your primary school">What is the name of your primary school?</option>
                                        <option value="What is your favourite food">What is your favourite food?</option>
                                        <option value="What is the name of your best friend">What is the name of your best friend?</option>
                                        <option value="At what age did you complete secondary school?">At what age did you complete secondary school?</option>
                                    </select>
                                </div>
                                 <div class="form-group">
                                    <label for="answer2">Answer Two</label>
                                    <input class="form-control"  type="text" name="answer2" id="answer2" autocomplete="off"> 
                                </div>
                            </div>
                        </div>
                
                         <div class="btns mloginbtn " style="margin-top: 40px">
                            <button  id="submit" type="button" style="cursor:pointer">
                                Create Account
                            </button>
                        </div>
                
                    </form>
                </div>
            </div>
        </div>
    </section>
    
    <div id="notificationmodal">
        <div class="contentcontainer">
            <p id="messageBox2"><br/></p>
        </div>
    </div>

    <div name="messageBox" id="messageBox" class="messageBox"></div>
    
    <script type='text/javascript' src="./js/registration.js" ></script>
    
</body>

</html>


<!--<!DOCTYPE html>-->
<!--<html lang="en">-->
    
  <!--<head>-->
  <!--  <meta charset="UTF-8" />-->
  <!--  <meta http-equiv="X-UA-Compatible" content="IE=edge" />-->
  <!--  <meta name="viewport" content="width=device-width, initial-scale=1.0" />-->
  <!--  <title>Account Registration</title>-->
  <!--  <link rel="stylesheet" type="text/css" href="./css/user.css">-->

  <!--  <link-->
  <!--    rel="stylesheet"-->
  <!--    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"-->
  <!--  />-->
  <!--</head>-->
  
  <!--<style>-->
  <!--  button:disabled {-->
  <!--      opacity: .3 !important;-->
  <!--  }-->
  <!--  #notificationmodal {-->
  <!--      width: 300px;-->
  <!--      position: fixed;-->
  <!--      top: 10%;-->
  <!--      overflow-y: auto;-->
        <!--/* right: 30%; */-->
  <!--      right: -123%;-->
        <!--/* height: fit-content; */-->
  <!--      height: fit-content;-->
  <!--      max-height: 70vh;-->
  <!--      background-color: rgb(var(--notificationbg));-->
  <!--      z-index: 2000;-->
  <!--      display: flex;-->
  <!--      border-radius: 10px;-->
  <!--      justify-content: center;-->
  <!--      align-items: center;-->
  <!--      transition: all ease 0.8s;-->
  <!--      opacity: 0;-->
  <!--      padding: 10px 15px;-->
  <!--      box-shadow: -1px 0px 29px 0px rgba(0,0,0,0.75);-->
  <!--      -webkit-box-shadow: -1px 0px 29px 0px rgba(0,0,0,0.75);-->
  <!--      -moz-box-shadow: -1px 0px 29px 0px rgba(0,0,0,0.75);-->
  <!--  }-->
    
  <!--  #notificationmodal span {-->
  <!--      position: relative;-->
        <!--/* top: -15px; */-->
  <!--      color: red;-->
  <!--      margin: 0px auto;-->
  <!--      display: none-->
  <!--  }-->
    
  <!--  #notificationmodal::-webkit-scrollbar {-->
  <!--      width: 10px;-->
  <!--      }-->
  <!--  #notificationmodal::-webkit-scrollbar-track {-->
  <!--      background: rgb(135, 132, 123);-->
  <!--      }-->
    
  <!--  #notificationmodal::-webkit-scrollbar-thumb {-->
  <!--      background-color: red;-->
  <!--      border-radius: 10px;-->
  <!--      border: 3px none #ffffff;-->
  <!--      }-->
    
  <!--  #notificationmodal p {-->
  <!--      color: red;-->
  <!--      font-size:smaller;-->
  <!--      font-weight: 400;-->
  <!--      line-height: 20px;-->
  <!--      text-align: center;-->
  <!--  }-->
  <!--</style>-->
  
 <!-- <body style="overflow-x:hidden">-->
 <!--   <div class="formcontainer registrationcontainer">-->
       
 <!--       <div class="login__header">-->
 <!--            <img src="../images/howlogo-removebg-preview.png" alt=""> -->
 <!--       </div>-->
        
 <!--       <div id="registrationform" class="formmain loginform registrationform">-->
           <!--<form  autocomplete="off">-->
 <!--               <h4 style="border-bottom:1px solid lightgray;padding: 0 0 10px 0; margin: 15px 0 15px 0"> Authorization</h4>-->
 <!--               <div>-->
 <!--                    <div class="formcontrol">-->
 <!--                       <label for="password">Email</label>-->
 <!--                       <input type="text" name="email" id="email" autocomplete="off"> -->
 <!--                   </div>-->
 <!--                   <div class="form_row">-->
 <!--                       <div class="formcontrol">-->
 <!--                           <label for="password">Password</label>-->
 <!--                           <input type="password" name=password"" id="password" autocomplete="off"> -->
 <!--                       </div>-->
 <!--                       <div class="formcontrol">-->
 <!--                           <label for="confirmpassword">Confirm Password</label>-->
 <!--                           <input type="password" name="confirmpassword" id="confirmpassword" autocomplete="off"> -->
 <!--                       </div>-->
 <!--                   </div>-->
 <!--                   <div class="form_row">-->
 <!--                       <div class="formcontrol">-->
 <!--                           <label for="role">User Role</label>-->
 <!--                           <select name="role" id="role" style="padding:10px">-->
 <!--                               <option value=""> -- Select Role --</option>-->
 <!--                               <option value="staff"> Staff </option>-->
 <!--                           </select>-->
 <!--                       </div>-->
 <!--                       <div class="formcontrol">-->
 <!--                           <label for="location">Location</label>-->
 <!--                           <select name="location" id="location" style="padding:10px">-->
 <!--                               <option value=""> -- Select Location --</option>-->
 <!--                           </select>-->
 <!--                       </div>-->
 <!--                   </div>-->
                    
 <!--               </div>-->
                
 <!--               <h4 style="border-bottom:1px solid lightgray;padding: 0 0 10px 0; margin: 15px 0 15px 0"> Bio Data </h4>-->
 <!--               <div>-->
 <!--                   <div class="form_row">-->
 <!--                       <div class="formcontrol">-->
 <!--                           <label for="firstname">First Name</label>-->
 <!--                           <input type="text" name="firstname" id="firstname" autocomplete="off"> -->
 <!--                       </div>-->
 <!--                       <div class="formcontrol">-->
 <!--                           <label for="lastname">Last Name</label>-->
 <!--                           <input type="text" name="lastname" id="lastname" autocomplete="off"> -->
 <!--                       </div>-->
 <!--                   </div>-->
 <!--                   <div class="form_row">-->
 <!--                       <div class="formcontrol">-->
 <!--                           <label for="othername">Other Name</label>-->
 <!--                           <input type="text" name="othername" id="othername" autocomplete="off"> -->
 <!--                       </div>-->
 <!--                       <div class="formcontrol">-->
 <!--                           <label for="phone">Phone Number</label>-->
 <!--                           <input type="number" inputmode="numeric" name="phone" id="phone" autocomplete="off"> -->
 <!--                       </div>-->
 <!--                   </div>-->
 <!--                   <div class="form_row">-->
 <!--                       <div class="formcontrol">-->
 <!--                           <label for="address">Contact Address</label>-->
 <!--                           <input type="text" name="address" id="address" autocomplete="off"> -->
 <!--                       </div>-->
 <!--                       <div class="formcontrol">-->
 <!--                           <label for="dateofbirth">Date of Birth</label>-->
 <!--                           <input type="date" name="dateofbirth" id="dateofbirth"> -->
 <!--                       </div>-->
 <!--                   </div>-->
                    
 <!--               </div>-->
                
 <!--               <h4 style="border-bottom:1px solid lightgray;padding: 0 0 10px 0; margin: 15px 0 15px 0"> Security Questions </h4>-->
 <!--               <div>-->
 <!--                   <div class="form_row">-->
 <!--                       <div class="formcontrol">-->
 <!--                           <label for="question1">Question One</label>-->
 <!--                           <select name="question1" id="question1" style="padding:10px">-->
 <!--                               <option value=""> -- Select Question One --</option>-->
 <!--                               <option value="What is the name of your primary school">What is the name of your primary school?</option>-->
 <!--                               <option value="What is your favourite food">What is your favourite food?</option>-->
 <!--                               <option value="What is the name of your best friend">What is the name of your best friend?</option>-->
 <!--                               <option value="At what age did you complete secondary school?">At what age did you complete secondary school?</option>-->
 <!--                           </select>-->
 <!--                       </div>-->
 <!--                       <div class="formcontrol">-->
 <!--                           <label for="answer1">Answer One</label>-->
 <!--                           <input type="text" name="answer1" id="answer1" autocomplete="off"> -->
 <!--                       </div>-->
 <!--                   </div>-->
 <!--                   <div class="form_row">-->
 <!--                       <div class="formcontrol">-->
 <!--                           <label for="question2">Question Two</label>-->
 <!--                           <select name="question2" id="question2" style="padding:10px">-->
 <!--                               <option value=""> -- Select Question Two --</option>-->
 <!--                               <option value="What is the name of your primary school">What is the name of your primary school?</option>-->
 <!--                               <option value="What is your favourite food">What is your favourite food?</option>-->
 <!--                               <option value="What is the name of your best friend">What is the name of your best friend?</option>-->
 <!--                               <option value="At what age did you complete secondary school?">At what age did you complete secondary school?</option>-->
 <!--                           </select>-->
 <!--                       </div>-->
 <!--                        <div class="formcontrol">-->
 <!--                           <label for="answer2">Answer Two</label>-->
 <!--                           <input type="text" name="answer2" id="answer2" autocomplete="off"> -->
 <!--                       </div>-->
 <!--                   </div>-->
 <!--               </div>-->
                
 <!--               <div class="btns mloginbtn ">-->
 <!--                   <button  id="submit" type="button" style="cursor:pointer" class="btnlogin btn btnblue mt"  id="matlevelbtnsubmit">-->
 <!--                       Create Account-->
 <!--                   </button>-->
 <!--               </div>-->
                
           <!--</form>-->
 <!--       </div>-->
    
    
 <!--       <div class="registrationformtwo" style="max-width:900px;margin: 10px auto"><p>Already Have an account? <strong><a style="text-decoration:none;color:white" href="./login.php" >Login</a></strong></p></div>-->
 <!--   </div>-->
 <!--   <div id="notificationmodal">-->
 <!--       <span><em></em></span>-->
 <!--       <div class="contentcontainer">-->
 <!--           <p id="messageBox2"><br/></p>-->
 <!--       </div>-->
 <!--   </div>-->

 <!--<script type='text/javascript' src="./js/registration.js" ></script>-->

 <!-- </body>-->
<!--</html>-->
