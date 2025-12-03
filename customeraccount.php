<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> CUSTOMER ACCOUNT </h1>
    <div class="jpagecontent" id="jpagecontent">
        <form class="jform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row" > 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> first name: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="firstname" name="firstname">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> last name: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="lastname" name="lastname">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> other names: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="othernames" name="othernames">
                    </div>
                </div>
                <div class="jformgroup form_row" > 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> phone number: </label>
                        <input type="number" class="jformcontrol jmargin-top" id="phonenumber" name="phonenumber">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> home address: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="homeaddress" name="homeaddress">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> office address: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="officeaddress" name="officeaddress">
                    </div>
                </div>
                <div class="jformgroup form_row" > 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> gender: </label>
                        <select id="gender" type="text"  class="jformcontrol jmargin-top">
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> occupation: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="occupation" name="occupation">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Date of Birth: </label>
                        <input type="date" class="jformcontrol jmargin-top" id="birthdate" name="birthdate">
                    </div>
                </div>
                <div class="jformgroup form_row" > 
                     <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> state: </label>
                        <select type="text" class="jformcontrol jmargin-top" id="state" name="state">
                            <option value=""> -- Select State -- </option>
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol  jmargin-left">
                        <label class="jcontrollabel"> Lga: </label>
                       <select type="text" class="jformcontrol jmargin-top" id="lga" name="lga">
                            <option value="" selected=""> -- Select LGA -- </option>
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Town: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="town" name="town">
                    </div>
                </div>
                <div class="jformgroup form_row">
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> State of Residence: </label>
                        <select type="text" class="jformcontrol jmargin-top" id="stateofresidence" name="stateofresidence">
                            <option value=""> -- Select State -- </option>
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> LGA of Residence: </label>
                        <select type="text" class="jformcontrol jmargin-top" id="lgaofresidence" name="lgaofresidence">
                            <option value=""> -- Select LGA -- </option>
                        </select>
                    </div>
                </div>
                <div class="jformgroup form_row" > 
                     <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> next of kin full name: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="kinfullname" name="kinfullname">
                    </div>
                    <div class="jformgroup jformgroupcol  jmargin-left">
                        <label class="jcontrollabel"> next of kin phone number: </label>
                       <input type="text" class="jformcontrol jmargin-top" id="kinphonenumber" name="kinphonenumber">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> relationship: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="relationship" name="relationship">
                    </div>
                </div>
                <div class="jformgroup form_row" > 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> next of kin office address: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="kinofficeaddress" name="kinofficeaddress">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> next of kin home address: </label>
                       <input type="text" class="jformcontrol jmargin-top" id="kinhomeaddress" name="kinhomeaddress">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> next of kin occupation: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="kinoccupation" name="kinoccupation">
                    </div>
                </div>
                <div class="jformgroup form_row" > 
                    <div class="jformgroup">
                        <div class="jformgroup jformgroupcol file-action">
                            <input type="file" placeholder="Enter title" class="jformcontrol jmargin-top hidden"
                                id="document" multiple>
                            <div class=""> 
                                <p>click to add files</p>
                                <p style="text-transform: none;font-weight: 400;font-size: x-small;">.png | .jpeg |
                                    .jpg | .pdf | .docx </p>
                            </div>
                        </div>
                    </div>
                    <div class="jformgroup  jmargin-left">
                        <div class="jformgroup jformgroupcol file-action2" style="border: 0.3px dashed #B3B3B3; border-radius:4px">
                            <input type="file" placeholder="Enter title" class="jformcontrol jmargin-top hidden"
                                id="document2" multiple>
                            <div class="">
                                <p>click to add files</p>
                                <p style="text-transform: none;font-weight: 400;font-size: x-small;">.png | .jpeg |
                                    .jpg | .pdf | .docx </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="jformgroup jmargin-top">
                    <div class="file-area"></div>
                    <div class="file-area2"></div>
                </div>
               <div class="jflex" style="margin: 30px 0;">
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn orerbtn" id="submitcustomeraccount"> Submit </button>
                </div>
            </div>
        </form>
    </div>
</div>