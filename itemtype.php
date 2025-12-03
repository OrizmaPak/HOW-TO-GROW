<?php
$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">ADD AN ITEM TYPE </p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orecardcontainer">';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsn">';
$displayhtml .= '<p class="normaltext">Item type</p>';
$displayhtml .= '<input id="oreitementry" type="text" maxlength="150">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="oremaaa0 stcs1a">';
$displayhtml .= '<button id="oreitemtyperesetbtn" class="orewf vicol-btn-primary" style="background: red">Reset <i class="fas fa-save"></i></button>';
$displayhtml .= '<button id="oreitemtypesubmitbtn" class="orewf vicol-btn-primary">Save Changes <i class="fas fa-save"></i></button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jtable-content" style="    width: 500px;
    margin: auto">
                    <table class="jmargin-top" id="">
                        <thead>
                            <tr>
                                <th style="width: 10px"> s/n </th>
                                <th> Item name </th>
                                <th style="width: 78px"> action </th>
                            </tr>
                        </thead>
                        <tbody id="oreitemtypescreennn">
                            
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
                </div>';
$displayhtml .= '<div id="">';
// $displayhtml .= '<div class="oreitemer normaltext">
//                     <div class="oreittemrow">
//                         <p>ITEM</p>
//                         <div class="itemee normaltext">
//                             <p>edit</p>
//                             <p>remove</p>
//                         </div>
//                     </div>
//                     <div class="hidden orehiddenedit">
//                         <input type="text" maxlength="150">
//                     </div>
//                 </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo  $displayhtml;
?>