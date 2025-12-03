<?php
session_start();
if(!isset($_SESSION["user_id"]) && !isset($_SESSION["user_id"]))
{
	header('Location: login.php');
}
$_SESSION["email"] = $_SESSION["htguseremail"];
//exit("Email session data: " . $_SESSION["email"] . " User ID session: " . $_SESSION["user_id"]);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HOW TO GROW</title>
    <link rel="shortcut icon" href="../images/WhatsApp Image 2023-01-05 at 08.21.50.jpeg" />
    <!--<link rel="preconnect" href="https://fonts.googleapis.com">-->
    <!--<link rel="preconnect" href="https://fonts.googleapis.com">-->
    <!--<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>-->
    <!--<link href="https://fonts.googleapis.com/css2?familys=Josefin+Slab:wght@700&family=Kanit:wght@500&family=Poppins&family=Righteous&display=swap" rel="stylesheet">-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>
    <link rel="stylesheet" type="text/css" href="./css/index.css">
    <!--<link rel="stylesheet" type="text/css" href="./css/testcss.css">--> 
    <link rel="stylesheet" type="text/css" href="./css/user.css">
    <link rel="stylesheet" type="text/css" href="./css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/tom-select@2.4.1/dist/css/tom-select.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/tom-select@2.4.1/dist/js/tom-select.complete.min.js"></script>
    <link rel="stylesheet" type="text/css" href="./css/jstyle.css">
    <!-- DataTables CSS -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css" />

<!-- jQuery (required by DataTables) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- DataTables JS -->
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>

    <!--<link rel="stylesheet" type="text/css" href="./css/3d.css">-->
    <!--<link rel="stylesheet" type="text/css" href="./css/accountcss.css">-->
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

        <style>

/* Custom scaling class */
.custom-swal-size {
    transition: all 0.6s ease; /* Smooth transition */
    transform: scale(1.2); /* Scale the modal to 1.5 times */
}
.jtable-content thead tr {
    color: white;
    background: #346834 !important;
}

</style>
</head>

<body>
    <input type='hidden' id='indexEmail' value="<?php echo $_SESSION["email"] ?>" />
    <input type='hidden' id='sessionDataEmail' value="<?php echo $_SESSION["email"] ?>" />
    <input type='hidden' id='sessionpermission' value="<?php echo $_SESSION["permissions"] ?>" />
    <input type='hidden' id='sessionrole' value="<?php echo $_SESSION["role"] ?>" />
    <input type='hidden' id='sessionlocation' value="<?php echo $_SESSION["location_id"] ?>" />
    <input type='hidden' id='sessionlocationname' value="<?php echo $_SESSION["locationname"] ?>" />
    <input type='hidden' id='sessionuserid' value="<?php echo $_SESSION["user_id"] ?>" />
    <input type='hidden' id='sessionfirstname' value="<?php echo $_SESSION["firstname"] ?>" />
    <input type='hidden' id='sessionlastname' value="<?php echo $_SESSION["lastname"] ?>" />

    <div id="dialogContainer" onclick="callDialog()">
        <input type="hidden" />
        <div id="dialogmodal" onclick="event.stopPropagation();">

        </div>
    </div>
    <div id="navhead">
        <div id="notificationmodal">
            <span><em>Notice!!</em></span>
            <!-- <span><em><i>Notice!!</i></em></span> -->
            <div class="contentcontainer">
                <p id="messageBox2"><br /></p>
            </div>
        </div>
        <!-- VICOL'S CODE [FOR NOTIFICATION MESSAGE] START -->
        <div name="messageBox" id="messageBox" class="messageBox">

        </div>
        <div id="loadingicon" name="loadingicon">
            <!--<img src="../../images/djfh (2).gif" alt="" class="">-->
        </div>

        <!-- VICOL'S CODE END -->

        <div class="navbutton">
            <img id="navopen" class="" src="../images/bars-solid.svg" alt="">
            <img id="navclose" class="hidden" src="../images/xmark-solid.svg" alt="">
        </div>
        <p onclick="switchScreen('diffnewlanding')" class="coolShadow">HOW TO GROW</p>
        <div class="navbuttonright">
            <div id="navuserholder" class="hidden">
                <div id='userprofileview' class="navuseritem">
                    <p>Profile</p>
                    <img src="../images/key (1).png" alt="">
                </div>
                <div id='changepassword' class="navuseritem">
                    <p>Change password</p>
                    <img src="../images/key (1).png" alt="">
                </div>
               <!--  <div class="navuseritem">
                    <p>Select branch</p>
                    <img src="../images/company.png" alt="">
                </div>
                <div class="navuseritem">
                    <p>Theme</p>
                    <img id="lightimg" src="../images/iconmonstr-idea-5-240.png" alt="">
                    <img id='darkimg' src="../images/night-mode.png" alt=""> 
                </div>-->
                <div class="navuseritemlogout" onclick="userLogout()">
                    <p>Log Out</p>
                    <img src="../images/power.png" alt="">
                </div>
            </div>
            <div id="navnoticeholder" class="hidden">
            </div>
            <img title='Search' id="nav-searchbtn" class="imgflip hover" src="../images/magnifier-4-240.png" alt="">
            <div style="position: relative" class="hover" id="navnotificationbtn">
                <img title='Notification' id='' class="imgshak " src="../images/bell.png" alt="">
                <p id="notificationNumber"
                    style="background: yellow;left: 4px;position: absolute;top: -10px;padding: 0px 5px;border-radius: 100px;transform: scale(.9);">
               </p>
            </div>
            <img title='User Settings' id="navuserbtn" src="../images/user (2).png" alt="">
            <img title='User Settings' id="navuserdropdown" class="navdd" src="../images/caret-down-solid.svg" alt="">
        </div>
    </div>
    <div id="nav-search-section">
        <div id="nav-search-container">
            <div class="nav-search-back">
                <ul id="navul" class="navul navull">
                    <img class="hidden" src="" alt="">
                    <li class="navli"><img class="imginvert" src="../images/delete-left-solid.svg" alt="">BACK</li>
                </ul>
            </div>

            <div id="navsearchdetail">
                <div class="navsearchdetailheader">
                    <img src="../images/binoculars-8-240.png" alt="" class="blink_me">
                    <p>SEARCH ANYWHERE</p>
                </div>
                <div class="navsearchinputs">
                    <div class="navsearchselectcontainer">
                        <div id="sh-select">
                            <label for="sh-id"><input type="hidden" value="PROPERTY" id="navsearchselect"><button
                                    id="navsearchselectbtn" type="button" class="ng-binding">SEARCH</button><img
                                    src="../images/select.svg" alt="" id="imgselectsearch"></label>
                            <ul role="listbox" id="sh-id" class="md-whiteframe-z1" aria-activedescendant="state2_AK"
                                name="sh-id">
                                <!-- ELEMENTS GOES HERE -->
                            </ul>
                        </div>
                    </div>
                    <input type="text" id="navsearchinputvalue">
                </div>
                <div id="navsearchcliickbtn">

                    <button id="navsearchmainbtn"><img src="../images/searchmonster.png" alt="">search</button>
                </div>
                <div id="navesearchresultscreen" style="color: white">
                   
                </div>

            </div>
        </div>
    </div>
    <div id="navcontainer">
        <div id="nav-left-section">
            <div style="font-family: 'Roboto' !important" id="nav-left-container">
                
                <div class="hidden" style="font-family: 'Roboto' !important" id="nav-left-fixed">
                    <div style="font-family: 'Roboto' !important" id="navleftprofile" class="">
                        <!-- <img src="../images/Screenshot (5).png" alt=""> -->
                        <div style="font-family: 'Roboto' !important" style="visibility: hidden" class="navprofilepic">
                        </div>
                        <p class="navbar-brand" onclick="switchScreen('samechildlanding')">ADMIN ADMIN</p>
                    </div>
                    <div style="font-family: 'Roboto' !important" id="navleftbranch" class="">
                        <img src="../images/headquarter.png" alt="">
                        <!-- <div style="font-family: 'Roboto' !important" class="navbranchpic"></div> -->
                        <p class="disbran" onclick="switchScreen('samechildreturning')">HEAD OFFICE</p>
                    </div>
                    <div style="font-family: 'Roboto' !important" id="navleftselect" class="">
                        <div style="font-family: 'Roboto' !important" id="md-select">
                            <label for="ul-id"><input type="hidden" value="head office" id="navbranchselect"><button
                                    id="navbranchselectbtn" type="button" class="ng-binding">LOCATION</button><img
                                    src="../images/select.svg" alt="" id="imgselectbranch"></label>
                            <ul role="listbox" id="ul-id" class="md-whiteframe-z1" aria-activedescendant="state2_AK"
                                name="ul-id">
                                <!-- ELEMENTS GOES HERE -->
                            </ul>

                        </div>
                    </div>
                </div>
                
                <div style="display: flex;
                            height: 100px;
                            padding: 20px 10px;
                            background-color: #ffffff;
                            margin-top: 31px;
                            border: none;">
                    <img src="../images/headquarter.png" alt="Profile Picture" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                    <div style="display: flex; flex-direction: column;">
                        <span id="fullnamediv" style="font-weight: bold; font-size: 16px;"><?php echo $_SESSION["lastname"] ?> <?php echo $_SESSION["firstname"] ?></span>
                        <span id="locationdiv" style="font-size: 14px; color: #888; hidden"><?php echo $_SESSION["locationname"] ?></span>
                    </div>
                </div>


                <div style="font-family: 'Roboto' !important" id="navleftitems">
                    <div style="font-family: 'Roboto' !important" id='maindashboardd' class="navleftitem">
                        <p>Dashboard</p>
                        <!--<img src="../images/monitor.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id="navadministration" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Administration</p>
                        <!--<img src="../images/leader.png" alt="">-->
                    </div>

                    <div style="font-family: 'Roboto' !important" id='branchsetup' name="navadministration"
                        class="navleftsubitem">
                        <p>Register branch</p>
                        <img src="../images/franchise.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="branchselection" name="navadministration"
                        class="navleftsubitem">
                        <p>Branch Selection</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='userregistration' name="navadministration"
                        class="navleftsubitem">
                        <p>Register user</p>
                        <img src="../images/userregisteration.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewmfa' name="navadministration"
                        class="navleftsubitem superadminonly">
                        <p>MFA Logs</p>
                        <img src="../images/userregisteration.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="organisation-info" name="navadministration"
                        class="navleftsubitem">
                        <p>Organisation info</p>
                        <img src="../images/office-building.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id="adminpanel" name="navadministration"
                        class="navleftsubitem">
                        <p>Admin panel</p>
                        <img src="../images/analytics.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="useractivitylog" name="navadministration"
                        class="navleftsubitem">
                        <p>user activity logs</p>
                        <img src="../images/user.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="permissionsetting" name="navadministration"
                        class="navleftsubitem">
                        <p>Permission setting</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="machineidentification" name="navadministration"
                        class="navleftsubitem">
                        <p>Machine Identification</p>
                        <img src="../images/key.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id="marketerstarget" name="navadministration"
                        class="navleftsubitem">
                        <p>Marketers Target</p>
                        <img src="../images/key.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id="grouptarget" name="navadministration"
                        class="navleftsubitem">
                        <p>Group Target</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="programrejectedtransactiondate"
                        name="navadministration" class="navleftsubitem">
                        <p>Reject Transaction Date</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="profile" name="navadministration"
                        class="navleftsubitem">
                        <p>My Profile</p>
                        <!--<p>My Profile</p>-->
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="renewalreplacementofbooklet"
                        name="navadministration" class="navleftsubitem">
                        <p>Booklet Renewal/Replacement</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="approvebooklets" name="navadministration"
                        class="navleftsubitem">
                        <p>Approve Booklets</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="confirmbookletrenewalandreplacement"
                        name="navadministration" class="navleftsubitem">
                        <p>Confirm/Collect Booklet</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="serialnumbercheck" name="navadministration"
                        class="navleftsubitem">
                        <p>Serial Number Look ups/Complaints</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="registrationslipno" name="navadministration"
                        class="navleftsubitem">
                        <p>Review Serial Numbers</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="supplybooklets"
                        name="navadministration" class="navleftsubitem">
                        <p>Supply Booklet</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="bookletstockhistory"
                        name="navadministration" class="navleftsubitem">
                        <p>Booklet Stock History</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="registrationpoint" name="navadministration"
                        class="navleftsubitem">
                        <p>Registration Point</p>
                        <img src="../images/key.png" alt="">
                    </div>


                    <div style="font-family: 'Roboto' !important" id="scheduleroster" name="navadministration"
                        class="navleftsubitem">
                        <p>Task Schedule</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="viewscheduleroster" name="navadministration"
                        class="navleftsubitem">
                        <p>View Task Schedule</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="cashierlimit" name="navadministration"
                        class="navleftsubitem">
                        <p>Cashier Limit</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="commissioncategories" name="navadministration"
                        class="navleftsubitem">
                        <p>Commission Categories</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="marketerregistrationsandrenewals" name="navadministration"
                        class="navleftsubitem">
                        <p>Marketers Registrations & Renewals</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="adjustcollectionsettings" name="navadministration"
                        class="navleftsubitem superadminonly">
                        <p>Collections Settings</p>   
                        <img src="../images/key.png" alt=""> 
                    </div>
                    <div style="font-family: 'Roboto' !important" id="collectionapprovalsettingsnet" name="navadministration"
                        class="navleftsubitem superadminonly">
                        <p>Collection Approval Settings (NET)</p>
                        <img src="../images/key.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id="naveventory" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Inventory</p>
                        <!--<img src="../images/order.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id='itemtype' name="naveventory"
                        class="navleftsubitem">
                        <p>Item Type</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='itemregistration' name="naveventory"
                        class="navleftsubitem">
                        <p>Register Inventory</p>
                        <img src="../images/item.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id='viewinventorylist' name="naveventory"
                        class="navleftsubitem">
                        <p>View Inventory List</p>
                        <img src="../images/item.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id='approveinventory' name="naveventory"
                        class="navleftsubitem">
                        <p>Approve Inventory</p>
                        <img src="../images/item.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id='supplier' name="naveventory"
                        class="navleftsubitem">
                        <p>supplier / Customer</p>
                        <img src="../images/item.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id='intake' name="naveventory" class="navleftsubitem">
                        <p>Intake/Stock Control</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='stockinhistory' name="naveventory"
                        class="navleftsubitem">
                        <p>Intake History</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='stockledgerview' name="naveventory"
                        class="navleftsubitem">
                        <p>Stock Ledger</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='outtake' name="naveventory"
                        class="navleftsubitem">
                        <p>Outtake</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='outtakehistory' name="naveventory"
                        class="navleftsubitem">
                        <p>Outtake History</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='stock-return' name="naveventory"
                        class="navleftsubitem">
                        <p>Return</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='stockreturnview' name="naveventory"
                        class="navleftsubitem">
                        <p>Return View</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='stock-gift' name="naveventory"
                        class="navleftsubitem">
                        <p>Gifts</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='giftview' name="naveventory"
                        class="navleftsubitem">
                        <p>Gifts View</p>
                        <img src="../images/item.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id='stockstatusreport' name="naveventory"
                        class="navleftsubitem">
                        <p>Stock Status Report</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="withdrawalviewbalance" name="naveventory"
                        class="navleftsubitem hidden">
                        <p>Withdrawal View Balance</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="archiveinventory" name="naveventory"
                        class="navleftsubitem">
                        <p>View Archive Inventory List</p>
                        <img src="../images/key.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id="consumablewithdrawaltransaction"
                        name="naveventory" class="navleftsubitem hidden">
                        <p>Consumable Withdrawal Transaction</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="nonconsumablewithdrawaltransaction"
                        name="naveventory" class="navleftsubitem hidden">
                        <p>Non-Consumable Withdrawal Transaction</p>
                        <img src="../images/key.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id="navcustomer" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Customer</p>
                        <!--<img src="../images/customer.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id='customeraccount' name="navcustomer"
                        class="navleftsubitem">
                        <p>Register Customer Account</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='approvecustomer' name="navcustomer"
                        class="navleftsubitem">
                        <p>Approve Customer Update</p>
                        <img src="../images/item.png" alt=""> 
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewcustomers' name="navcustomer"
                        class="navleftsubitem">
                        <p>View Customers</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="navsavings" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Savings</p>
                        <!--<img src="../images/savings.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id='savingsproducts' name="navsavings"
                        class="navleftsubitem">
                        <p>Savings Product</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='savingsaccountsproducts' name="navsavings"
                        class="navleftsubitem">
                        <p>Savings Account Products</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='savingsaccount' name="navsavings"
                        class="navleftsubitem">
                        <p>Add Savings Accounts</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewsavingsaccount' name="navsavings"
                        class="navleftsubitem">
                        <p>View Savings Accounts</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    
                    <div style="font-family: 'Roboto' !important" id='savingstransactions' name="navsavings"
                        class="navleftsubitem">
                        <p>Savings Transactions</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='savingsdepositanalysis' name="navsavings"
                        class="navleftsubitem">
                        <p>Savings Deposit Analysis</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='transfersavings' name="navsavings"
                        class="navleftsubitem">
                        <p>Local Transfer</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewtransferswithin' name="navsavings"
                        class="navleftsubitem">
                        <p>View Transfers</p>
                        <img src="../images/item.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id="navproperty" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Property</p>
                        <!--<img src="../images/property.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id='buildpropertyitems' name="navproperty"
                        class="navleftsubitem">
                        <p>Build Property Items</p>
                        <img src="../images/item.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id='categoryvaluetimeline' name="navproperty"
                        class="navleftsubitem">
                        <p>Category Value Timeline</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='propertyaccount' name="navproperty"
                        class="navleftsubitem">
                        <p>Add Property Account</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewcompositeitems' name="navproperty"
                        class="navleftsubitem">
                        <p>View Composite Items</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewpropertyaccounts' name="navproperty"
                        class="navleftsubitem">
                        <p>View Property Accounts</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='maturedproperrtyaccounts' name="navproperty"
                        class="navleftsubitem">
                        <p>Matured Property Accounts</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='missedmaturity' name="navproperty"
                        class="navleftsubitem">
                        <p>Missed Maturity</p>
                        <img src="../images/item.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id='propertytransactionreport' name="navproperty"
                        class="navleftsubitem">
                        <p>Property Transaction Report</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='propertydelivery' name="navproperty"
                        class="navleftsubitem">
                        <p>Property Delivery</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewdelivery' name="navproperty"
                        class="navleftsubitem">
                        <p>View Delivery</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='propertymarkupreport' name="navproperty"
                        class="navleftsubitem">
                        <p>Property Markup Report</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='reversedelivery' name="navproperty"
                        class="navleftsubitem">
                        <p>Reverse Delivery</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='approvereversedelivery' name="navproperty"
                        class="navleftsubitem">
                        <p>Approve Reversed Delivery</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewdeletedreversedelivery' name="navproperty"
                        class="navleftsubitem">
                        <p>View Reversed Delivery</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='propertystockout' name="navproperty"
                        class="navleftsubitem">
                        <p>Property Stock Outtake Report</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='propertydepositanalysis' name="navproperty"
                        class="navleftsubitem">
                        <p>Property Deposit Analysis</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='propertydepositstatus' name="navproperty"
                        class="navleftsubitem">
                        <p>Property Deposit Status</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='propertycommissions' name="navproperty"
                        class="navleftsubitem">
                        <p>Property Commissions</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='propertyledger' name="navproperty"
                        class="navleftsubitem">
                        <p>Property Ledger</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewreservedpropertystock' name="navproperty"
                        class="navleftsubitem">
                        <p>View Reserved Property Stock</p>
                        <img src="../images/item.png" alt="">
                    </div> 
                    <div style="font-family: 'Roboto' !important" id='viewpropertyitemnotinstock' name="navproperty"
                        class="navleftsubitem">
                        <p>View Property Item Not In Stock</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <!--<div style="font-family: 'Roboto' !important" id='propertystatementofaccount' name="navproperty"
                        class="navleftsubitem">
                        <p>Property Statement of Account</p>
                        <img src="../images/item.png" alt="">
                    </div>-->
                    <!--<div style="font-family: 'Roboto' !important" id='propertycustomerstatement' name="navproperty"
                        class="navleftsubitem">
                        <p></p>
                        <img src="../images/item.png" alt="">
                    </div>-->

                    <div style="font-family: 'Roboto' !important" id="navloans" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Loans</p>
                        <p id="tabnotificationloanmodule"></p>
                        <!--<img src="../images/loans.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id='addloanfee' name="navloans"
                        class="navleftsubitem">
                        <p>Add Loan Fees</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='loanproducts' name="navloans"
                        class="navleftsubitem">
                        <p>Loan Products</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='loanaccount' name="navloans"
                        class="navleftsubitem">
                        <p>Add Loan Account</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewloans' name="navloans" class="navleftsubitem">
                        <p>View Loans</p>
                        <img src="../images/item.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id='collateral' name="navloans"
                        class="navleftsubitem">
                        <p>Add Collateral</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='approveloans' name="navloans"
                        class="navleftsubitem">
                        <p>Approve Loan</p>
                        <img src="../images/item.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id='activeloan' name="navloans"
                        class="navleftsubitem">
                        <p>View Active Loans</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='dueloan' name="navloans" class="navleftsubitem">
                        <p>Due Loans</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='missedrepaymentloans' name="navloans"
                        class="navleftsubitem">
                        <p>Missed Repayments</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='pastmaturitydateloans' name="navloans"
                        class="navleftsubitem">
                        <p>Past Maturity Date</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='norepaymentloans' name="navloans"
                        class="navleftsubitem">
                        <p>No Repayment</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='repaymentschedule' name="navloans"
                        class="navleftsubitem">
                        <p>Repayment Schedule</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='loantransactionreport' name="navloans"
                        class="navleftsubitem">
                        <p>Loan Transaction Report</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='loanclassificationreport' name="navloans"
                        class="navleftsubitem">
                        <p>Loan Classification Report</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="navtransactions" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Transactions</p>
                        <!--<img src="../images/transactions.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id='statementofaccount' name="navtransactions"
                        class="navleftsubitem">
                        <p>Statement of Account</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='collections' name="navtransactions"
                        class="navleftsubitem">
                        <p>Collections</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='collectionsview' name="navtransactions"
                        class="navleftsubitem">
                        <p>Collections View</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='updatedailyunit' name="navtransactions"
                        class="navleftsubitem">
                        <p>Update Daily Units</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='collectionsapproveview' name="navtransactions"
                        class="navleftsubitem">
                        <p>Approved Collections</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='collectionsdeclineview' name="navtransactions"
                        class="navleftsubitem">
                        <p>Declined Collections</p>
                        <img src="../images/item.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id='withdrawal' name="navtransactions"
                        class="navleftsubitem">
                        <p>Withdrawal</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewwithdrawals' name="navtransactions"
                        class="navleftsubitem">
                        <p>View Withdrawals</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewreversedwithdrawals' name="navtransactions"
                        class="navleftsubitem superadminonly">
                        <p>View Reversed Withdrawals</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='approvewithdrawals' name="navtransactions"
                        class="navleftsubitem">
                        <p>Approve Withdrawals</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='deposits' name="navtransactions"
                        class="navleftsubitem">
                        <p>Deposit</p>
                        <img src="../images/item.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id='viewdeposits' name="navtransactions"
                        class="navleftsubitem">
                        <p>View Deposits</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='approvedeposits' name="navtransactions"
                        class="navleftsubitem">
                        <p>Approve Deposits</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='groupdeposit' name="navtransactions"
                        class="navleftsubitem">
                        <p>Group Deposit</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewgroupdeposits' name="navtransactions"
                        class="navleftsubitem">
                        <p>View Group Deposit</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='editerrorsindeposit' name="navtransactions"
                        class="navleftsubitem">
                        <p>Edit Deposit</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewediteddeposits' name="navtransactions"
                        class="navleftsubitem">
                        <p>View Edited Deposit</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewdeleteddeposits' name="navtransactions"
                        class="navleftsubitem">
                        <p>View Deleted Deposit</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='editwithdrawals' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>Edit Withdrawals</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='vieweditedwithdraws' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>View Edited Withdrawals</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewdeletedwithdrawals' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>View Deleted Withdrawals</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='dailytransaction' name="navtransactions"
                        class="navleftsubitem">
                        <p>Daily Transactions</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='resolveexcessandreturnedcash'
                        name="navtransactions" class="navleftsubitem">
                        <p>Resolve Excess & Returned Cash</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <!--<div style="font-family: 'Roboto' !important; display:none !important" id='nettransaction' name="navtransactions"-->
                    <!--    class="navleftsubitem">-->
                    <!--    <p>Summary Net Transaction</p>-->
                    <!--    <img src="../images/item.png" alt="">-->
                    <!--</div>-->

                    <div style="font-family: 'Roboto' !important" id="netreportupdated" name="navtransactions" class="navleftsubitem">
                        <p>Summary Net Transaction</p>
                        <img src="../images/item.png" alt="">
                    </div>

                    <div style="font-family: 'Roboto' !important" id='branchfundtransfer' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>branch fund transfer</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewbranchfundtransfer' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>view branch fund transfer</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='groupsystemcashposition' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>Group System Cash Position</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='excesscashreport' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>Excess Cash Report</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='returnedcashreport' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>Returned Cash Report</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <!--<div style="font-family: 'Roboto' !important" id='confirmbalancebroughtforward'-->
                    <!--    name="navtransactions" class="navleftsubitem">-->
                    <!--    <p>Confirm Balance Brought Forward</p>-->
                    <!--    <img src="../images/item.png" alt="">-->
                    <!--</div>-->
                    <!--<div style="font-family: 'Roboto' !important" id='counterpostwrongaccountentry'-->
                    <!--    name="navtransactions" class="navleftsubitem">-->
                    <!--    <p>Counter Post Wrong Account Entry</p>-->
                    <!--    <img src="../images/item.png" alt="">-->
                    <!--</div>-->

                    <!--<div style="font-family: 'Roboto' !important" id='counterdepositincorrectamountpaid'-->
                    <!--    name="navtransactions" class="navleftsubitem ttesstt">-->
                    <!--    <p>Counter Deposit Incorrect Amount Paid</p>-->
                    <!--    <img src="../images/monitor.png" alt="">-->
                    <!--</div>-->

                    <!--<div style="font-family: 'Roboto' !important" id='userconfirmtransaction' name="navtransactions"-->
                    <!--    class="navleftsubitem ttesstt">-->
                    <!--    <p>User Confirm Transaction</p>-->
                    <!--    <img src="../images/monitor.png" alt="">-->
                    <!--</div>-->
                    
                    <div style="font-family: 'Roboto' !important" id='aggregatedbranchdeposits' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>Aggregated Branch Deposits</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='rrrtransactionreport' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>RRR Transaction Report</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='transfercashtobank' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>Transfer Cash to Bank</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewtransfercashtobank' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>View Transfer Cash to Bank</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewcreditentries' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>View Credit (Charges) Entries</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='statementindailydetail' name="navtransactions"
                        class="navleftsubitem ttesstt">
                        <p>Statement In Daily Detail</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    
                    <div style="font-family: 'Roboto' !important" id="navbalancebf" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Balance BF</p>
                        <!--<img src="../images/transactions.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id='balancebf' name="navbalancebf"
                        class="navleftsubitem">
                        <p>add balance</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='approvebalancebf' name="navbalancebf"
                        class="navleftsubitem">
                        <p>approve balance</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewbalancebf' name="navbalancebf"
                        class="navleftsubitem">
                        <p>view balance</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='fetchreversedbalancedeposit' name="navbalancebf"
                        class="navleftsubitem superadminonly"> 
                        <p>View Reversed Balances</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    


                    <div style="font-family: 'Roboto' !important" id="withdrawallogs" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Withdrawal Logs</p>
                        <!--<img src="../images/transactions.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id='withdrawalrequest' name="withdrawallogs"
                        class="navleftsubitem ttesstt">
                        <p>Withdrawal Request</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='processwithdrawalrequest' name="withdrawallogs"
                        class="navleftsubitem ttesstt">
                        <p>Process Withdrawal Request</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewwithdrawalrequest' name="withdrawallogs"
                        class="navleftsubitem ttesstt">
                        <p>View Withdrawal Request</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="interbanktransfers" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> InterBank Transactions</p>
                        <!--<img src="../images/transactions.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewrecipients' name="interbanktransfers"
                        class="navleftsubitem ttesstt">
                        <p>View Recipients</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='approvetransfer' name="interbanktransfers"
                        class="navleftsubitem ttesstt">
                        <p>Approve Transfers</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='interbanktransfer' name="interbanktransfers"
                        class="navleftsubitem ttesstt">
                        <p>Interbank Transfers</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewaggregate' name="interbanktransfers"
                        class="navleftsubitem ttesstt">
                        <p>View Aggregates</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewtransfers' name="interbanktransfers"
                        class="navleftsubitem ttesstt">
                        <p>View Interbank Transfers</p>
                        <img src="../images/monitor.png" alt="">
                    </div>
                    
                    
                    <div style="font-family: 'Roboto' !important" id="navexpenditures" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Expenditures</p>
                        <!--<img src="../images/transactions.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id='expenditure' name="navexpenditures"
                        class="navleftsubitem">
                        <p>Expenditures</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='approveexpenditures' name="navexpenditures"
                        class="navleftsubitem">
                        <p>Approve Expenditures</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewexpenditures' name="navexpenditures"
                        class="navleftsubitem">
                        <p>View Expenditures</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='payments' name="navexpenditures"
                        class="navleftsubitem">
                        <p>Payments</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewpayments' name="navexpenditures"
                        class="navleftsubitem">
                        <p>View Payments</p>
                        <img src="../images/item.png" alt="">
                    </div>



                    <div style="font-family: 'Roboto' !important" id="navsales" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Sales</p>
                        <!--<img src="../images/personnel.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id="warehousesaless" name="navsales"
                        class="navleftsubitem">
                        <p>Warehouse Sales</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="viewwarehousesaless" name="navsales"
                        class="navleftsubitem">
                        <p>View Warehouse Sales</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="approvereversedsales" name="navsales"
                        class="navleftsubitem">
                        <p>Approve Warehouse Sales Reversal</p>
                        <img src="../images/key.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="navperpayroll" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Personnel & Payroll</p>
                        <!--<img src="../images/personnel.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id='department' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Add Department</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='level' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Add Level</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='groupname' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Add Group</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='personnel' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Add Personnel</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='approvepersonnel' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Approve Personnel</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewpersonnel' name="navperpayroll"
                        class="navleftsubitem">
                        <p>View Personnel</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='personnelhistory' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Personnel History</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='guarantor' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Add Guarantor</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='employerrecord' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Add Employment Record</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='referees' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Add Referee</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='qualificationn' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Add Qualification</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='parentsguardians' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Add Parents/Guardians</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='query' name="navperpayroll"
                        class="navleftsubitem">
                        <p>query</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='promotions' name="navperpayroll"
                        class="navleftsubitem">
                        <p>promotions</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='termination' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Termination/Resignation</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='suspension' name="navperpayroll"
                        class="navleftsubitem">
                        <p>suspension</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='leave' name="navperpayroll"
                        class="navleftsubitem">
                        <p>leave</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='warning' name="navperpayroll"
                        class="navleftsubitem">
                        <p>warning</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='monitorevaluation' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Monitoring/Evaluation</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='advance' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Advance</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewstaffadvance' name="navperpayroll"
                        class="navleftsubitem">
                        <p>view Staff Advance</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='personalstaffsalaryrecord' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Staff Salary Record</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewmonthlysalaryschedule' name="navperpayroll"
                        class="navleftsubitem">
                        <p>View Monthly Salary Schedule</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='presalaryapproval' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Payroll</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='confirmsalary' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Approve Payroll</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='payrollclassa' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Payroll Class A</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='payrollclassb' name="navperpayroll"
                        class="navleftsubitem">
                        <p>Payroll Class B</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="navaccounts" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Accounts</p>
                        <!--<img src="../images/accounts.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id='addglaccount' name="navaccounts"
                        class="navleftsubitem">
                        <p>Add GL Account</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewglaccounts' name="navaccounts"
                        class="navleftsubitem">
                        <p>View GL Accounts</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='addgltransaction' name="navaccounts"
                        class="navleftsubitem">
                        <p>Add GL Transaction</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewglaccounthistory' name="navaccounts"
                        class="navleftsubitem">
                        <p>View GL Transaction History</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewtrialbalancereport' name="navaccounts"
                        class="navleftsubitem">
                        <p>View Trial Balance</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewincomestatementreport' name="navaccounts"
                        class="navleftsubitem">
                        <p>View Income Statement</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id='viewbalancesheet' name="navaccounts"
                        class="navleftsubitem">
                        <p>View Balance Sheet</p>
                        <img src="../images/item.png" alt="">
                    </div>
                    <div style="font-family: 'Roboto' !important" id="navcreditbureau" class="navleftitem navdropper">
                        <p class="navdropindicator"><img class="navdropindicator" style="filter: invert(100%);"
                                src="../images/greater-than-solid.svg" alt=""> Credit Bureau</p>
                        <!--<img src="../images/credit.png" alt="">-->
                    </div>
                    <div style="font-family: 'Roboto' !important" id="searchcreditrating" name="navcreditbureau"
                        class="navleftsubitem">
                        <p>Search Credit Rating</p>
                        <img src="../images/key.png" alt="">
                    </div>
            
                </div>
            </div>
            <div id="navmarker">
                <img src="../images/WhatsApp Image 2023-01-05 at 08.21.50.jpeg" alt="">
                <p class="orefont1">HOW TO GROW</p>

            </div>
        </div>
        <div class="grid" id="nav-right-section">
            <div id='spinner' class=''>
                <img class="blink_me" src="../images/WhatsApp Image 2023-01-05 at 08.21.50.jpeg" alt="">
                <div class="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <!-- screen -->
            <div class="z2" id="nav-right-container">

            </div>
            <div id="nav-right-container3">
            </div>
            <div id="nav-right-container2">
            </div>

        </div>


        <div class="hidden" id="nav-right-section2">
        </div>
    </div>
    <!--hidden contents-->
    <select id="storedlevel" class="hidden"></select>
    <select id="storedgroup" class="hidden"></select>
    <select id="storeddepartment" class="hidden"></select>

    <script type="text/javascript" src="./js/util.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script type="text/javascript" src="./js/index.js"></script>
    <script type="text/javascript" src="./js/maindashboardd.js"></script>
     <script type="text/javascript" src="./js/indexfetch.js"></script> 
    
    
   
    
    
   
    <script type="text/javascript" src="./js/administration.js"></script>
    <script type="text/javascript" src="./js/inventory.js"></script>
    <script type="text/javascript" src="./js/loans.js"></script>
    <script type="text/javascript" src="./js/property.js"></script>
    <script type="text/javascript" src="./js/savings.js"></script>
    <script type="text/javascript" src="./js/customer.js"></script>
    <script type="text/javascript" src="./js/expenditures.js"></script>
    <script type="text/javascript" src="./js/interbanktransfers.js"></script>
    <script type="text/javascript" src="./js/transactions1.js"></script>
    <script type="text/javascript" src="./js/transactions2.js"></script>
    <script type="text/javascript" src="./js/balancebf.js"></script>
    <script type="text/javascript" src="./js/sales.js"></script>
    <script type="text/javascript" src="./js/personnelandpayroll.js"></script>
    <script type="text/javascript" src="./js/accounts.js"></script>
    <script type="text/javascript" src="./js/withdrawallogs.js"></script>
    
    
    
    
    
    <script type="text/javascript" src="./js/adnlogin.js"></script>
    <!--<script type="text/javascript" src="./js/accountregistration.js"></script>-->
    <!--<script type="text/javascript" src="./js/accountregistration2.js"></script>-->
    
    
    
    
    
    
    
    <!--<script type="text/javascript" src="./js/customerdeposit.js"></script>-->
    <script type="text/javascript" src="./js/changepassword.js"></script>
    <!--<script type="text/javascript" src="./js/group-deposit.js"></script>-->
    <!--<script type="text/javascript" src="./js/viewwarehousesalesledger.js"></script>-->
    <!--<script type="text/javascript" src="./js/warehousesales.js"></script>-->
    <!--<script type="text/javascript" src="./js/updateprovision.js"></script>-->
    <!--<script type="text/javascript" src="./js/findupdatedrecord.js"></script>-->
    <!--<script type="text/javascript" src="./js/withdrawalviewbalance.js"></script>-->
    <!--<script type="text/javascript" src="./js/stockcontrol.js"></script>-->
    <!--<script type="text/javascript" src="./js/consumablewithdrawaltransaction.js"></script>-->
    <!--<script type="text/javascript" src="./js/nonconsumablewithdrawaltransaction.js"></script>-->
    <!--<script type="text/javascript" src="./js/update.js"></script>-->
    <!--<script type="text/javascript" src="./js/bankingtransaction.js"></script>-->
    <!--<script type="text/javascript" src="./js/groupsystemcashanalysis.js"></script>-->
    <!--<script type="text/javascript" src="./js/registrationreplacementrenewalreport.js"></script>-->
    <!--<script type="text/javascript" src="./js/submittederrors.js"></script>-->
    <!--<script type="text/javascript" src="./js/viewreturncashtransaction.js"></script>-->
    <!--<script type="text/javascript" src="./js/viewsavingstransfer.js"></script>-->
    <!--<script type="text/javascript" src="./js/viewcash.js"></script>-->
    <!--<script type="text/javascript" src="./js/vieweditedservicecharge.js"></script>-->
    <!--<script type="text/javascript" src="./js/viewediteditems.js"></script>-->
    <!--<script type="text/javascript" src="./js/viewstaffrecords.js"></script>-->
    <!--<script type="text/javascript" src="./js/staffloan.js"></script>-->
    <!--<script type="text/javascript" src="./js/staffcontrolsystem.js"></script>-->
    <script type="text/javascript" src="./js/searchcreditrating.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>

    
    <!--<script type="text/javascript" src="./js/nettransactionentry.js"></script> -->
    <!--<script type="text/javascript" src="./js/excesscustomerdeposit.js"></script>-->
    <!--<script type="text/javascript" src="./js/updateexcess.js"></script>-->
    <!--<script type="text/javascript" src="./js/excess-nia-declaration.js"></script>-->
    <!--<script type="text/javascript" src="./js/view-excess-nia-act.js"></script>-->
        <!--<script type="text/javascript" src="./js/dashboard.js"></script>-->
    <!--<script type="text/javascript" src="./js/permissionsetting.js"></script>-->
    <!--<script type="text/javascript" src="./js/view-expenditure.js"></script>-->
        <!--<script type="text/javascript" src="./js/raw1.js"></script> -->
    <!--<script type="text/javascript" src="./js/raw.js"></script>-->
        <!--<script type="text/javascript" src="./js/stock-control.js"></script>-->
            <!--<script type="text/javascript" src="./js/userprofileview.js"></script>-->
                <!--<script type="text/javascript" src="./js/viewexcessniaaccount.js"></script>-->
    <!--<script type="text/javascript" src="./js/viewexcessniasolution.js"></script>-->
    <!--<script type="text/javascript" src="./js/registerwrongaccountentry.js"></script>-->
    <!--<script src="https://x3dom.org/release/x3dom.js"></script>-->
    

    <div class="j-outer-container" id="jmodal-area">
        <div class="modal-content" id="modal-content"></div>
    </div>

    <div class="hide" id="footpanel-wrapper" style="position: relative;">
        <div class="footer-container shadow-lg p-2 text-capitalize font-weight-bold alert-info">
            <div id="sysfootpanel"
                style="min-width: 250px; max-height: calc(100vh - 100px); padding: 10px; overflow-y: auto;"> </div>
            <button class="btn btn-sm btn-secondary" id="closesysfootpanel"
                style="position: absolute; top: -20px; right: -8px; cursor:pointer;background-color:darkgray"><i
                    class="fa fa-times"></i></button>
        </div>
    </div>

    <!-- session location -->
    <input type="hidden" id="sessionlocation" value="<?php echo $_SESSION['location_id'] ?>" readonly="readonly">

</body>

</html>