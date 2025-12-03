<?php
session_start();
    $displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>VIEW WAREHOUSE SALES</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgreceivedfrom">Location </label>';
$displayhtml .= '<select class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="viewwhsaleslocation"';
$displayhtml .= ' class="stockledgreceivedfrom ">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Start Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="viewwhsalesstartdate"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">End Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="viewwhsalesenddate"/>';
$displayhtml .= '</div>';
$displayhtml .= '</div>'; 
$displayhtml .= '';
$displayhtml .= '<div class="">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<div class="wrapbtn" style="justify-content: flex-end">';
$displayhtml .=  '<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="viewwhsalesfetchview">View</button></div>';
$displayhtml .=  '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '</div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="jtable-content">

    <!-- Cards Section -->
    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <!-- Card 1: Total Sales -->
        <div style="
            flex: 1;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            background-color: #f9f9f9;
            text-align: center;
            display: none;
        ">
            <h3 style="margin: 0; font-size: 1.2em; color: #333;">Total Price</h3>
            <p id="cardtprice" style="margin: 10px 0 0; font-size: 1.5em; font-weight: bold;"></p>
        </div>

        <!-- Card 2: Total Items -->
        <div style="
            flex: 1;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            background-color: #f9f9f9;
            text-align: center;
        ">
            <h3 style="margin: 0; font-size: 1.2em; color: #333;">Total Qty</h3>
            <p id="cardtqty" style="margin: 10px 0 0; font-size: 1.5em; font-weight: bold;"></p>
        </div>

        <!-- Card 3: Total Quantity -->
        <div style="
            flex: 1;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            background-color: #f9f9f9;
            text-align: center;
        ">
            <h3 style="margin: 0; font-size: 1.2em; color: #333;">Total Sales</h3>
            <p id="cardtamount" style="margin: 10px 0 0; font-size: 1.5em; font-weight: bold;"></p>
        </div>

        <!-- Add more cards as needed -->
    </div>
    <!-- End of Cards Section -->

    <!-- Existing Table -->
    <table class="jmargin-top" id="viewwhsalesoretable">
        <thead>
            <tr>
                <th> s/n </th>
                <th> ref  </th>
                <th> transaction date </th>
                <th> sales person  </th>
                <th> details </th> 
                <th> total item </th>
                <th> total qty </th>
                <th> total amount </th>
                <th class="sadmin hidde">total cost </th>
                <th class="hidden"> PRICE </th>
                <th class="sadmin hidde">total gross profit </th>
                <th> amount paid </th>
                <th> payment method</th>
                <th>description</th>
                <th> other details</th>
                <th style="width: 150px"> Action </th>
            </tr>
        </thead>
        <tbody id="viewwhsalesorehistorytablecontent">
            <!-- Table content goes here -->
        </tbody>
    </table>
</div>

<div class="j-table-status jflex jcontent-between jmargin-top">
    <span class="jcontrollabel" style="text-transform: none" id="pagination-status"> </span>
    <span class="jflex jpagination">
        <button class="j-no-bg" type="button" id="jprev-button">previous</button>
        <span id="pagination-numbers"></span>
        <button  class="j-no-bg" type="button" id="jnext-button">next</button>
    </span>
</div>
<style>.custom-swal-size {
    transform: scale(1.5);  /* Increase the size by 1.5 times */
}
</style>';
// $displayhtml .= '<div id="viewwhsalesorefulltableparant" class="jtable-content hidden">
//                     <table class="jmargin-top" id="viewwhsalesoretable2">
//                         <thead>
//                             <tr>
//                                  <th>s/n </th>
//                                 <th> ref  </th>
//                                 <th> transaction date </th>
//                                 <th> sales person  </th>
//                                 <th> details </th> 
//                                 <th> total qty </th>
//                                 <th> total cost  </th>
//                                 <th>  amount paid </th>
//                                 <th> payment method</th>
//                             </tr>
//                         </thead>
//                         <tbody id="viewwhsales2orehistorytablecontent">
                            
//                         </tbody>
//                     </table>
//                 </div>';
$displayhtml .= '<div style="display: flex;justify-content: flex-end;margin-top: 40px" class="">
                    <div class="orerbtn" id="viewgiftprint">Print</div>
                    <div style="background: green; width: 90px" class="orerbtn" id="viewgiftexport">Export Excel</div>
                </div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div id="whsalesviewmodalcontainer" onclick="removewhsalesviewmodal(event)" class="hidden bgwhsales" style="overflow:auto;position: fixed; width: 100%; height: 100%;background: #151A1570;top:0%;display: flex;justify-content: center; align-items:center;padding-top: 368px">
                        <div id="whsalesviewmodal" style="position:relative;top:0%;width: 70%; min-width: 400px;min-height: 100%; height: fit-content; background: white;border-radius: 20px;padding: 15px">
                            Modal content goes here
                        </div>
                </div>';
$displayhtml .= '<div id="whsalesviewmodalcontainerprint" onclick="removewhsalesviewmodal(event)" class="hidden bgwhsales" style="overflow:auto;position: fixed; width: 100%; height: 100%;background: #151A1570;top:0%;display: flex;justify-content: center; align-items:center">
                        <div id="whsalesviewmodalprint" style="position:relative;top:10%;width: 70%; min-width: 400px;height: 100%; min-height: 200px; background: white;border-radius: 20px;padding: 15px">
                           
                        </div>
                </div>';
$displayhtml .= '</div>';
echo $displayhtml;
?>
