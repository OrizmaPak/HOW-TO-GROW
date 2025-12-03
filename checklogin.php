<?php
session_start();
if(!isset($_SESSION["email"]) || $_SESSION["email"] === null){
    exit('
        <div style="position:absolute;left:0;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);height:100vh;width:100%; z-index: 9999;  transition: 2s;">
            <div style="margin: 100px auto;width: 300px;background-color:white; padding:20px">
                <div>
                  <h6 style="text-align:center;color: tomato;margin-bottom: 5px"><i class="fa fa-exclamation-circle"></i> SESSION EXPIRED</h6>
                  <p style="opacity:.8;font-size:14px;">Please reload and login or click logout</p>
                  <a style="display:block;margin-right:0;width:max-content;padding:8px 12px;background-color:green; font-size:13px;font-weight:500;border-radius:2px;color:white;margin-top:13px" href="login.php">Logout</a>
                </div>
            </div>
        </div>'
    );
}
?>