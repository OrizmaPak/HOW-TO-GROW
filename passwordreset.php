<?php
session_start();

$displayhtml .= '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
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
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content:center;
        align-items:center;
    }
    
    section > div > div p {
        text-align: center;
        color: gray;
    }
    
    section > div > div > div {
        margin-top: 40px;
    }
    
    #loginform > div:nth-child(1) {
        display: flex;
        flex-direction: column;
        gap: 12px; 
        
    }
    
    form {
        width: inherit;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
    }
    
    .form-control {
        width: inherit;
        background-color: #fff;
        border-radius: 0;
        border: transparent;
        padding:20px;
        outline: none;
        border-bottom:2px solid lightgray;
        font-size: .8rem;
    }
    
    .form-control::placeholder {
        opacity: .8;
    }
    
    #loginform > div:nth-child(2) {
        margin: 40px 0;
        width: inherit;
    }
    
    #loginform > div:nth-child(2) a {
        display: block;
        text-decoration: none;
        color: black;
        opacity: .8;
    }
    
    #loginform > div:nth-child(2) a:hover {
        text-decoration: underline;
    }
    
    #loginform > div:nth-child(2) button {
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
    
    #loginform > div:nth-child(3) {
        border-top: 1px solid lightgray;
        padding: 16px 0;
        text-align: center;
    }
    
    #loginform > div:nth-child(3) p {
        color: black;
        opacity: .8;
    }
    
    #loginform > div:nth-child(3) p a {
        color: #027a3e;
        text-decoration: none;
        transition: ease-in .3s;
    }
    
    #loginform > div:nth-child(3) p a:hover {
        text-decoration: underline;
    }
     
    @media (min-width: 1024px) {
        .content-width {
            width: 83.333333%;
        }
      
        section > div > div {
            width: 33.333333%;
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


</style>';
$displayhtml .= '<div class="formcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>PASSWORD RESET</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="selectuser">Select User:</label>';
$displayhtml .= '<select name="selectuser" id="selectuser" class="selectuser">';
$displayhtml .= '<option selected value="">--SELECT USER--</option>';
$displayhtml .= '</select>';
$displayhtml .= '<span class="sortarrow">';
$displayhtml .= '<img src="images/icons/sort-arrows.png" alt=""/>';
$displayhtml .= '</span>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="formcontrol ">';
$displayhtml .= '<label for="email">User email:</label>';
$displayhtml .= '<input type="email" id="email" placeholder="email"            autocomplete="" class="email">';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="formcontrol ">';
$displayhtml .= '<label for="password"> Password:</label>';
$displayhtml .= '<input type="password" id="password" placeholder="********" autocomplete="" class="password">';
$displayhtml .= '<button class="passwordbtn btnicon iconbtns">';
$displayhtml .= '<i class="fa-solid fa-eye hide"></i>';
$displayhtml .= '<i class="fa-solid fa-eye-slash"></i>';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="formcontrol ">';
$displayhtml .= '<label for="confirmpassword">Confirm Password:</label>';
$displayhtml .= '<input type="password" id="confirmpassword" placeholder="********" autocomplete="" class="password">';
$displayhtml .= '<button class="passwordbtn btnicon iconbtns ">';
$displayhtml .= '<i class="fa-solid fa-eye hide"></i>';
$displayhtml .= '<i class="fa-solid fa-eye-slash"></i>';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="btns btncenter">';
$displayhtml .= '<button type="submit" class="btn btnblue btnsizetwo">Submit';
$displayhtml .= '<i class="fa-solid fa-paper-plane"></i>';
$displayhtml .= '</button>';
$displayhtml .= '<button type="submit" class="btn btnred btnsizetwo "><i class="fa-solid fa-angle-left"></i> Back </button>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo $displayhtml;
?>
