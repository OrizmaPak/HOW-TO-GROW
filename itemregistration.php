<?php
session_start();
?>
<div class="formcontainer overflowcontainer">
    <div class="formheader">
      <h5>ITEM REGISTRATION</h5>
    </div>
    <div class="formmain">
      <form action="" method="POST" enctype="multipart/form-data">
        <!-- Item Information Section -->
        <div class="matsubheader">
          <h4>ITEM INFORMATION</h4>
        </div>

        <!-- Item Select Dropdown -->
        <div class="formcontrol">
          <label for="selectitem">Select Item</label>
          <select name="selectitem" id="matitemregistrationselectitem" class="selectitem">
            <option disabled selected value="">Select Item</option>
          </select>
        </div>

        <!-- Item Class Dropdown -->
        <div class="formcontrol">
          <label for="itemclass">Item Class</label>
          <select name="itemclass" id="matitemregistrationitemclass" class="selectitem">
            <option value="" disabled selected>Select Item Class</option>
            <option value="CONSUMABLE">Consumable</option>
            <option value="NON-CONSUMABLE">Non-Consumable</option>
          </select>
        </div>

        <!-- Composite Dropdown -->
        <div class="formcontrol">
          <label for="composite">Composite</label>
          <select name="composite" id="matitemregistrationcomposite">
            <option value="No" selected>No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <!-- Registration Details Section -->
        <div class="matsubheader">
          <h4>REGISTRATION DETAILS</h4>
        </div>

        <!-- Item Type and Name -->
        <div class="split">
          <div class="formcontrol">
            <label for="itemtype">Item Type</label>
            <input list="allitemtypes" type="text" name="itemtype" id="matitemregistrationitemtype" class="itemtype">
            <datalist id="allitemtypes"></datalist>
          </div>
            <input type="hidden" name="id" id="inventoryedit" class="inventoryedit">

          <div class="formcontrol">
            <label for="itemname">Item Name</label>
            <input type="text" name="itemname" id="matitemregistrationitemname" class="itemname">
          </div>
        </div>

        <!-- Model, Cost, Selling Prices -->
        <div class="split">
          <div class="formcontrol">
            <label for="model">Model</label>
            <input type="text" name="model" id="matitemregistrationmodel" class="model">
          </div>

          <div class="formcontrol">
            <label for="cost">Cost</label>
            <input type="number" name="cost" id="matitemregistrationcost" value="0" class="cost">
          </div>
        </div>

        <div class="split3">
          <div class="formcontrol">
            <label for="savingselling">Saving Selling Price</label>
            <input type="number" id="matitemregistrationsavingselling" class="savingselling" value="0" name="savingselling">
          </div>

          <div class="formcontrol">
            <label for="cashselling">Warehouse/Cash Selling Price</label>
            <input type="number" id="matitemregistrationcashselling" class="cashselling" value="0" name="cashselling">
          </div>

          <div class="formcontrol">
            <label for="marketingprice">Marketing Price</label>
            <input type="number" id="matitemregistrationmarketingprice" class="marketingprice" value="0" name="marketingprice">
          </div>
        </div>

        <!-- File Inputs for Images -->
        <div class="split">
  <!-- Image 1 Input and Preview -->
  <div class="formcontrol">
    <label for="image1">Image 1</label>
    <div id="preview-image1" class="preview">
      <span></span>
    </div>
    <input type="file" name="image1" id="image1" class="imageinput">
  </div>

  <!-- Image 2 Input and Preview --> 
  <div class="formcontrol">
    <label for="image2">Image 2</label>
    <div id="preview-image2" class="preview">
      <span></span>
    </div>
    <input type="file" name="image2" id="image2" class="imageinput">
  </div>

  <!-- Image 3 Input and Preview -->
  <div class="formcontrol">
    <label for="image3">Image 3</label>
    <div id="preview-image3" class="preview">
      <span></span>
    </div>
    <input type="file" name="image3" id="image3" class="imageinput">
  </div>
</div>



        <!-- Submit and Cancel Buttons -->
        <div class="btns btncenter">
          <button type="submit" class="btnsizetwo btn btnblue" id="matitemregistrationupdatebtn">Submit</button>
          <button type="reset" class="btnsizetwo btn btnred" id="matitemregistrationcancelbtn">Cancel</button>
        </div>
      </form>
    </div>
  </div>

