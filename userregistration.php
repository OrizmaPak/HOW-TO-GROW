<?php 
    session_start()
?>
<div class="formcontainer overflowcontainer">

    <div class="formheader">
        <h5>USER REGISTRATION FORM </h5>
    </div>
    <div class="formmain">

        <form>
            <div class="matsubheader">
                <h4>Login Info</h4>
            </div>
            <div class="formcontrol">
                <label for="email">Email:</label>
                <input type="email" id="matuserregemail" placeholder="Email" />
            </div>
            <div class="btns btnend">
                <button type="button" class="btn btnblue " style="cursor:pointer" id="matuserregretievebtn">Retrieve User</button>
                <button type="button" class="btn btnred " style="cursor:pointer" id="matuserregdeletebtn">Delete User</button>
            </div>
            <div class="split hidden">
                <div class="formcontrol">
                    <label for="password">Password:</label>
                    <input type="password" readonly id="matuserregpassword" placeholder="Password" autocomplete=""
                        class="password" name="password" />
                    <button class="passwordbtn iconbtns btnicon">
                        <i class="fa-solid fa-eye hide"></i>
                        <i class="fa-solid fa-eye-slash"></i>
                    </button>
                </div>
                <div class="formcontrol">
                    <label for="confirmpassword">Confirm Password:</label>
                    <input type="password" readonly id="matuserregcomfirmupw" placeholder="Confirm Password" autocomplete=""
                        class="password" />
                    <button class="passwordbtn iconbtns btnicon">
                        <i class="fa-solid fa-eye hide"></i>
                        <i class="fa-solid fa-eye-slash"></i>
                    </button>
                </div>
            </div>
            <div class="split">
                <div class="formcontrol">
                    <label for="userrole">User Role:</label>
                    <input name="userrole" readonly id="matuserregrole" class="formselect"/>
                        <!--<option disabled selected>STAFF</option>
                    </select>-->
                    <button class="sortarrow iconbtns btnicon">
                        <span> <img src="../images/sort-arrows.png" alt="" /></span>
                    </button>
                </div>
                <div class="formcontrol">
                    <label for="location">Location:</label>
                    <select name="" id="matuserreglocation" class="formselect" readonly="readonly">
                        <option selected  value="">Location</option>
                        <option value="1">Lagos</option>
                        <option value="2">Ibadan</option>
                        <option value="3">FCT</option>
                    </select>
                    <button class="sortarrow iconbtns btnicon">
                        <span class="userroll">
                            <img src="images/icons/sort-arrows.png" alt="" />
                        </span>
                    </button>
                </div>
            </div>
            <div class="matsubheader">
                <h4>Bio Data Info</h4>
            </div>
            <div class="split">
                <div class="formcontrol">
                    <label for="lastname">Last Name:</label>
                    <input type="text" id="matuserreglastname" placeholder="last name" />
                </div>
                <div class="formcontrol">
                    <label for="firstname">First Name:</label>
                    <input type="text" id="matuserregfirstname" placeholder="first name" />
                </div>
            </div>
            <div class="split">
                <div class="formcontrol">
                    <label for="othername">Other Name:</label>
                    <input type="text" id="matuserregothername" placeholder="other name" />
                </div>
                <div class="formcontrol">
                    <label for="phonenumber">Phone Number:</label>
                    <input type="number" id="matuserregphone" placeholder="phone number" />
                </div>
            </div>

            <div class="formcontrol">
                <label for="address">Contact Address:</label>
                <textarea style="height: 100px" type="text" id="matuserregaddress" placeholder="contact address" ></textarea>
            </div>

            <div class="matsubheader">
                <h4>Supervisor Info</h4>
            </div>

            <div class="formcontrol">
                <label for="departmenthead">Department Head:</label>
                <input type="text" list="personelallemailer" name="departmenthead" id="matuserregdepartmenthead" onchange="checkdatalist(this)" placeholder="Select Supervisor" />
                <!--select name="departmenthead" id="matuserregdepartmenthead" class="formselect">
                    <option selected value="" class="optionwidth">
                        --SELECT ADMIN HEAD--
                    </option>
                    <option value="Sample1" class="optionwidth">
                        Sample1
                    </option>
                    <option value="Sample2" class="optionwidth">
                        Sample2
                    </option>
                </select>-->
                <button class="sortarrow iconbtns btnicon">
                    <span> <img src="../images/sort-arrows.png" alt="" /></span>
                </button>
            </div>


            <div class="formcontrol userimgcenter">
                <label for="file">Select user image:</label>
                <input type="file" id="matuserreguserphotoname1" class="userimg" />
                <div class="display"></div>
            </div>
            <div id="messageBox" class="hidden"></div>

            <div class="btns btncenter">
                <button type="button" class="btnsizetwo btn btnblue" id="matuserregsavebtn">
                    Save
                </button>
                <button type="button" class="btnsizetwo btn btnred" id="matuserregresetbtn">
                    Reset
                </button>
            </div>
        </form>
        <datalist id="personelallemailer"></datalist>
    </div>
</div>