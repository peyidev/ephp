<?php


$dynamicObj = new Mhmproperties("buildingInner");


echo "<input type='hidden' id='extra-value' value='buildingInner' />";

if(empty($includeType) || $includeType != "UPDATE"){
    echo "<div class='add-new-record'>New Property<i class='fa fa-plus fa-fw'></i></div>";
}else{
    echo "<style>.admin-right-column{width:48% !important;}</style>";
}


echo "<div class='admin-left-column admin-only-left well'>";

echo "<a href='?s=marcaintermedia-vista-grid'>No encontraste la marca?</a>";
$dynamicObj->createAdminTable($tabla[0]);
echo "</div>";

echo "<div class='admin-right-column admin-only-right'>";
//$this->createGrid($tabla[0]);
$dynamicObj->createGridBase($tabla[0]);
echo "</div>";


//echo "</div>";