<?php session_start() ?>

<div class="jcontainer">
    <h1 class="jpageheader"> user profile </h1>
    <div class="jpagecontent">
        <form class="jform" id="profileform">
           
            <div class="section-header" style="display:flex; gap:6px; align-items:center">
                <h1>account information</h1>
            </div>
            <div class="col-form-group"> 
                <div class="jformgroup form_row"> 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> first name: </label>
                        <input readonly  autocomplete="on" type="text"
                            class="jformcontrol jmargin-top" id="firstname" name="firstname">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> last name: </label>
                        <input readonly autocomplete="on" type="text"
                            class="jformcontrol jmargin-top" id="lastname" name="lastname">
                    </div>
                </div>
                <div class="jformgroup form_row">
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> other names: </label>
                        <input readonly  autocomplete="on" type="text"
                            class="jformcontrol jmargin-top" id="othernames" name="othernames">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> email: </label>
                        <input readonly autocomplete="on" type="text"
                            class="jformcontrol jmargin-top" id="email" name="email" readonly="readonly" value="<?php echo $_SESSION['email'] ?>">
                    </div>
                </div>
                <div class="jformgroup form_row">
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> date of birth: </label>
                        <input readonly  autocomplete="on" type="date"
                            class="jformcontrol jmargin-top" id="dateofbirth" name="dateofbirth">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> phone: </label>
                        <input readonly autocomplete="on" type="text"
                            class="jformcontrol jmargin-top" id="phone" name="phone">
                    </div>  
                </div>
                <div class="jformgroup jformgroupcol">
                    <label class="jcontrollabel"> address: </label>
                    <input readonly autocomplete="on" type="text"
                        class="jformcontrol jmargin-top" id="address" name="address">
                </div>
                <div class="jformgroup form_row">
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> user role: </label>
                        <select  autocomplete="on" readonly="readonly"
                            class="jformcontrol jmargin-top" id="role" name="role">
                            <option value="<?php echo $_SESSION['role'] ?>" selected> <?php echo $_SESSION['role'] ?>  </option> 
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> location: </label>
                        <select  autocomplete="on" 
                            class="jformcontrol jmargin-top" id="location" name="location_id">
                        </select>
                    </div>
                </div>
                <div class="jformgroup form_row">
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> supervisor one: </label>
                        <input readonly list="supervisor1list"  autocomplete="on"
                            class="jformcontrol jmargin-top" id="supervisor1">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> supervisor two: </label>
                        <input readonly list="supervisor2list"  autocomplete="on" 
                            class="jformcontrol jmargin-top" id="supervisor2">
                    </div>
                </div>
                <div class="jformgroup form_row">
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> security question One: </label>
                        <select autocomplete="on" type="text"
                            class="jformcontrol jmargin-top" id="question1" name="question1">
                            <option value=""> -- Select question one --</option>
                            <option value="What is the name of your primary school">What is the name of your primary school?</option>
                            <option value="What is your favourite food">What is your favourite food?</option>
                            <option value="What is the name of your best friend">What is the name of your best friend?</option>
                            <option value="At what age did you complete secondary school?">At what age did you complete secondary school?</option>
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> answer One: </label>
                         <input autocomplete="on" type="text"
                        class="jformcontrol jmargin-top" id="answer1" name="answer1">
                    </div>
                </div>
                <div class="jformgroup form_row">
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> security question Two: </label>
                        <select autocomplete="on" type="text"
                            class="jformcontrol jmargin-top" id="question2" name="question2">
                            <option value=""> -- Select question one --</option>
                            <option value="What is the name of your primary school">What is the name of your primary school?</option>
                            <option value="What is your favourite food">What is your favourite food?</option>
                            <option value="What is the name of your best friend">What is the name of your best friend?</option>
                            <option value="At what age did you complete secondary school?">At what age did you complete secondary school?</option>
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> answer two: </label>
                         <input autocomplete="on" type="text"
                        class="jformcontrol jmargin-top" id="answer2" name="answer2">
                    </div>
                </div>
                <div class="jformgroup">
                    <div class="file-area"></div>
                </div>
                <div class="jformgroup">
                    <div class="jformgroup jformgroupcol file-action">
                        <input readonly type="file" placeholder="Enter title" class="jformcontrol jmargin-top hidden" id="document">
                        <div class="">
                            <p>click to add files</p>
                            <p style="text-transform: none;font-weight: 400;font-size: x-small;">.png | .jpeg | .jpg </p>
                        </div>
                    </div>
                </div>
                <div class="jformgroup jformgroupcol">
                    <label class="jcontrollabel"> Current Password <span style="color: red;">*</span></label>
                     <input autocomplete="off" type="password"
                    class="jformcontrol jmargin-top" id="oldpw" name="oldpw">
                </div>
            </div>
            <div class="jformgroup form_row">
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Password: </label>
                        <input autocomplete="off" type="password" class="jformcontrol jmargin-top" id="upw" name="upw">
                    <button class="passwordbtn iconbtns btnicon">
                        <i class="fa-solid fa-eye hide"></i>
                        <i class="fa-solid fa-eye-slash"></i>
                    </button>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel">Confirm Password: </label>
                        <input type="password" id="matuserregcomfirmupw" placeholder="Confirm Password" autocomplete=""
                        class="jformcontrol jmargin-top" />
                    <button class="passwordbtn iconbtns btnicon">
                        <i class="fa-solid fa-eye hide"></i>
                        <i class="fa-solid fa-eye-slash"></i>
                    </button>
                    </div>
                </div>
            <div class="section-header">
                <h1 class="jmargin-top"> </h1>
            </div>
            <div class="jmargin-top">
                <button type="button" id="submit" class="j-action-btn-alt jmargin-top jmargin-left" >Save Update</button>
            </div>
        </form>
    </div>
</div>
