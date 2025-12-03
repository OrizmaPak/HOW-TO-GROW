<?php
$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">BUILD PROPERTY ITEMS </p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orecardcontainer">';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="oremaaa0 stcs1a">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="oremaaa0 stcs1a ">';
$displayhtml .= '<button id="orebuildproitemssavesubmitbtn" class="orewf vicol-btn-primary">Save<i class="fas fa-save"></i></button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcnsection1 containertweak">';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<label class="subheadertweak bold">Add Item to build</label>';
$displayhtml .= '<div class="inputcontainerln icsn">';
$displayhtml .= '<p class="selectitem bold">Item To Build</p>';
$displayhtml .= '<select class="selectitem" id="build_selectitembuild">';
$displayhtml .= '<option value="">--select item to build--</option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcnsection1 containertweak mtt mbb">';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<label class="subheadertweak bold">Add Item</label>';
$displayhtml .= '<div class="inputcontainerln icsn">';
$displayhtml .= '<p class="selectitem bold">Item</p>';
$displayhtml .= '<div class="orebuildqty">';
$displayhtml .= '<p class="selectitem hidden">Item</p>';
$displayhtml .= '<select class="selectitem" id="build_selectitem">';
$displayhtml .= '<option value="">--select item--</option>';
$displayhtml .= '</select>';
$displayhtml .= '<p class="selectitem hidden">Quantity</p>';
$displayhtml .= '<input id="orequantity" class="orequantity nevernegative" type="number" min="0" placeholder="Quantity">';
$displayhtml .= '<button id="orebuildproitemssubmitbtn" class="orewf1 vicol-btn-primary">Add</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
// $displayhtml .= '<div class="buildpropertyablecontainermain">';
// $displayhtml .= '<div class="buildpropertyablecontainer">';
// $displayhtml .= '<div class="buildgridheader">';
// $displayhtml .= '<p>Item Id</p>';
// $displayhtml .= '<p>Description</p>';
// $displayhtml .= '<p>Quantity<span style="font-size: smaller; color: blue"><br>[editable]</span></p>';
// $displayhtml .= '<p>Action</p>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="dueloans">
                        <thead>
                            <tr>
                                <th> Item Id </th>
                                <th> Description </th>
                                <th style="width: 40px"> Quantity </th>
                                <th> Price </th>
                                <th style="width: 160px"> action </th>
                            </tr>
                        </thead>
                        <tbody id="orebuildproitemsscreen"></tbody>
                    </table>
                </div>';

// $displayhtml .= '</div>';
// $displayhtml .= '<div class="orebuildproitemsscreen" id="orebuildproitemsscreen">';
// $displayhtml .= '<!-- <div class="buildgriditem"> -->';
// $displayhtml .= '<!-- <p>Automobiles</p> -->';
// $displayhtml .= '<!-- <p>Toyota</p> -->';
// $displayhtml .= '<!-- <input type="number" placeholder="Edit" class="buildinput"> -->';
// $displayhtml .= '<!-- <p class="buildaction">delete</p> -->';
// $displayhtml .= '<!-- </div> -->';
// $displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo  $displayhtml;
?>