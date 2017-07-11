var vistas = {

    global          : function() {

        /*Funciones generales del sitio*/
      //this should be on HOME FUNCTIONS
      //OPEN MODAL
      $('.showing-modal').on('click', function (){
        $('#property-modal').fadeIn('slow');
        $('.schedule-form').fadeIn('slow');
      });
      //CLOSE MODAL
      $('#property-modal').on('click', function (e){
        e.preventDefault();
        $('#property-modal').fadeOut('slow');
        $('.schedule-form').fadeOut('slow');
      });
      //CLOSE MODAL
      $('.close').on('click', function (e){
        e.preventDefault();
        e.stopPropagation();
        $('#property-modal').fadeOut('slow');
        $('.schedule-form').fadeOut('slow');
      });
      //MODAL Actions
//       $('.schedule-form').on('click', function (e){
//         console.log('modal');
//         e.preventDefault();
//         e.stopPropagation();
//       });


      if($('.message-popup')){
        $('.message-popup').fadeIn('slow');

        setTimeout( function(){
          $('.message-popup').fadeOut('slow');
        }  , 2500 );
      }


    },
    home            : function() {
      document.cookie = '';
      /*Función default*/

      ajaxData('lib/Execute.php?e=Mhmproperties/getBuildingsFeatured','GET',{},'true',function(json){

        var feauturedHtml = '';
        var delay         = 300;


        for(var ft in json) {
          var shortVar = json[ft];
          var aRutaId = '<a class="color-reset" href="?s=propertydetail&p=' + shortVar.id + '">';

          if(shortVar['bool_mainfeatured'] == 1)
          {
            var mainFt = '#main-ft-';

            $(mainFt + 'name').html(aRutaId + shortVar['nombre'] + '</a>');
            $(mainFt + 'desc').html(shortVar['cms_description']);

            var object = shortVar['id_serialized_amenitie'];
            var amenities = '';
            var amenitiesInicio = '<p><span class="amenities-red-box slider-sun"></span><label>';
            var amenitiesFin = '</label></p>';
            for(var obj in object)
            {
              amenities += amenitiesInicio + object[obj] + amenitiesFin;
            }
            $(mainFt + 'ameni').html(amenities);

            var imgHtml = aRutaId + '<img src="' + shortVar['img_building'] + '" class="slider-hill" alt="slider image ' + shortVar['seoalt'] + '" title="'+ shortVar['seotitle'] +'"></a>';

            $(mainFt + 'img').html(imgHtml);

          }
          else
          {
            var roomsData     = '';
            var rooms         = shortVar['rooms'];
            feauturedHtml     += aRutaId;
            feauturedHtml     += '<div class="col-sm-4 text-center padding wow fadeIn" data-wow-duration="1000ms" data-wow-delay="' + delay + 'ms">';
              feauturedHtml     += '<div class="single-service">';
                feauturedHtml     += '<div class="wow scaleIn feautured-box-container" data-wow-duration="500ms" data-wow-delay="' + delay + 'ms">';

                  if(shortVar['fromfee'] || shortVar['fromfee'] > 0)
                    feauturedHtml   += '<div class="p-red-card"><p>From $ <label for="">' + shortVar['fromfee'] + '</label>/person</p></div>';

                  feauturedHtml     += '<img src="' + shortVar['img_building'] + '"  alt="' + shortVar['seoalt'] + '" title="'+ shortVar['seotitle'] +'">';
                feauturedHtml     += '</div>';
                feauturedHtml += '<div class="v1-property-card-info">';
                  feauturedHtml += '<p class="v1-p-type">';
                    feauturedHtml += shortVar['buildingtype'] + ' FOR RENT';
                  feauturedHtml += '</p>';
                  feauturedHtml += '<p class="v1-p-address">';
                    feauturedHtml += '<i class="fa fa-location-arrow"></i>';
                    feauturedHtml += '<span class="v1-p-a-street">';
                      feauturedHtml += shortVar['nombre'];
                    feauturedHtml += '</span>';
                  feauturedHtml += '</p>';
                  feauturedHtml += '<p class="v1-p-data">';
                  if(rooms.length > 0 )
                  {
                    for (var index in rooms)
                    {

                      var splitResult = rooms[index]['nombre'].split('BR');
                      var resultParse = splitResult[0];//number

                      roomsData += '<label>';
                      roomsData += rooms[index]['nombre'];


                      if(!rooms[index]['pricefrom'].match(/^[a-zA-Z0-9]+$/))
                        roomsData += ': ';
                      else
                        roomsData += ': $';
                      roomsData += rooms[index]['pricefrom'];
                      if(rooms[index]['priceto'])
                        if(!rooms[index]['priceto'].match(/^[a-zA-Z0-9]+$/))
                          continue;
                        else
                          roomsData += ' - $';

                      roomsData += rooms[index]['priceto'];

                      if(resultParse > 1)
                        roomsData += '/person';

                      roomsData += '</label>';
                    }
                    feauturedHtml += roomsData;
                  }
                  feauturedHtml += '</p>';
                feauturedHtml += '</div>';
              feauturedHtml += '</div>';
            feauturedHtml += '</div>';
            feauturedHtml += '</a>';

            delay = delay + 300;

          }
        }
        $('#feautured-list').html(feauturedHtml);

      });
      //GALLERY
      ajaxData('lib/Execute.php?e=Mhmproperties/getHomeGallery','GET',{},'true',function(json){

        var gallery     = json;
        var galleryHtml = '';

        for(var img in gallery){
          var imgIndex = gallery[img];

          galleryHtml += '<li data-thumb="' + imgIndex.img_file + '"><a href="#">';
          galleryHtml += '<img src="' + imgIndex.img_file + '" alt="MHM Properties" title="MHM Properties">';
          galleryHtml += '</a></li>';
        }
        $('#home-gallery').html(galleryHtml);


        $('#home-gallery').lightSlider({
//         gallery:true,
          item:1,
          slideMargin: 0,
          speed:500,
          auto:true,
          loop:true,
          addClass: 'home-slider-zindex',
          pause: 5000,
        });


      });
      //END-GALLERY

      //APARTMENT RESULT
      ajaxData('lib/Execute.php?e=Mhmproperties/getBuildingByType/apartment','GET',{},'true',function(json){
        var responseDataHtml  = utils.homeFullProperties(json);
        $('#inject-full-properties').append(responseDataHtml);
        //HOUSES RESULT
        ajaxData('lib/Execute.php?e=Mhmproperties/getBuildingByType/house','GET',{},'true',function(json){
          var responseDataHtml  = utils.homeFullProperties(json);
          $('#inject-full-properties').append(responseDataHtml);
          //CONDOS RESULT
          ajaxData('lib/Execute.php?e=Mhmproperties/getBuildingByType/condos','GET',{},'true',function(json){
            var responseDataHtml  = utils.homeFullProperties(json);
            $('#inject-full-properties').append(responseDataHtml);
          });
          //END-CONDO RESULT
        });
        //END-HOUSE RESULT
      });
      //END-APARTMENT RESULT

      //ROOMS FILTER
      ajaxData('lib/Execute.php?e=Mhmproperties/getBuildingByType/apartment','GET',{},'true',function(json) {


        var filter = json.roomfilter;
        var filterLi = '';
        var filterInicio = '<li><a class="btn btn-default home-filter-trigger" href="#';
        var filterFin = '</a></li>';

        for (var obj in filter) {
          var splitResult = filter[obj].split('/');
          var resultParse = splitResult[0] + (splitResult[1] ? splitResult[1] : '');
          var filterUnion = filterInicio + 'data-filter=".' + resultParse + '">' + resultParse + filterFin;
          filterLi += filterUnion;
        }
        $('#prop-filter-list').html(filterLi);


        $('.home-filter-trigger').on('click', function(){
          document.cookie = this.innerHTML;
//          document.cookie = 'filterType=' + this.innerHTML;
          window.location.href = "?s=apartments";
        })
      });
      //END-ROOMS FILTER


      $('#lightSlider').lightSlider({
//         gallery:true,
        item:1,
        slideMargin: 0,
        speed:500,
        auto:true,
        loop:true,
        addClass: 'home-slider-zindex',
        pause: 5000,
      });
      $('#feautured-list').fadeIn('slow');
      utils.gmapFunction();

      var contentBottom = $('#sobhtml').html();
      if(contentBottom.length == 0)
        $('.sobhtml').toggleClass('no-display');

      var contentTop = $('#sothtml').html();
      if(contentTop.length == 0)
        $('.sothtml').toggleClass('no-display');



      //Need to test on propertyDetail view, something is broken or not running.
      if($('.message-popup')){
        $('.message-popup').fadeIn('slow');

        setTimeout( function(){
          $('.message-popup').fadeOut('slow');
        }  , 2500 );
      }



      //OPEN MODAL
      $('#showing-form').on('click', function (){
        $('#property-modal').fadeIn('slow');
        $('.schedule-form').fadeIn('slow');
      });
      //CLOSE MODAL
      $('#property-modal').on('click', function (e){
        e.preventDefault();
        $('#property-modal').fadeOut('slow');
        $('.schedule-form').fadeOut('slow');
      });
      //CLOSE MODAL
      $('.close').on('click', function (e){
        e.preventDefault();
        e.stopPropagation();
        $('#property-modal').fadeOut('slow');
        $('.schedule-form').fadeOut('slow');
      });
      //MODAL Actions
//       $('.schedule-form').on('click', function (e){
//         console.log('modal');
//         e.preventDefault();
//         e.stopPropagation();
//       });


    },
    apartments      : function() {
      //Regular Proccess.
      utils.dynamicBuildingContent("apartment");
    },
    houses          : function() {
      $('#search-result').addClass('not-in-houses');
      utils.dynamicBuildingContent("house");
    },
    condos          : function() {
      $('#search-result').addClass('not-in-houses');
        utils.dynamicBuildingContent("condos");

    },
    propertydetail  : function() {
      var seccion = utils.getParameterByName("p");
      ajaxData('lib/Execute.php?e=Mhmproperties/getBuildingDetail/'+ seccion +'','GET',{},'true',function(json) {

        var comingSoonHtml = '<div class="bg-404"><label><img src="images/coming-soon.png" alt="Coming Soon" title="Coming Soon"></label></div>';
        $('#page-title-h1').html('Property Detail');

        //GALLERY
        var gallery     = json.gallery;
        var galleryHtml = '';
        for(var img in gallery){
          var imgIndex = gallery[img];

          galleryHtml += '<li data-thumb="' + imgIndex.img_building + '">';
          galleryHtml += '<img src="' + imgIndex.img_building + '" alt="' + imgIndex.seoalt + '" title="' + imgIndex.seotitle + '">';
          galleryHtml += '</li>';
        }
        $('#lightSlider').html(galleryHtml);
        //END-GALLERY


        //FLOORPLANS
        if(json.floorplans.length <= 0 ) {
          $('#detail-plans').css('display', 'none');
          $('.tool-2').fadeOut();
//          $('.detail-plans-coming-soon').html('<span class="d-ameni-title">Floorplans</span>' + comingSoonHtml);
        }
        else {
          var galleryFloorPlans     = json.floorplans;
          var galleryFloorPlansHtml = '';
          for(var imgFp in galleryFloorPlans){
            var imgFpIndex = galleryFloorPlans[imgFp];

            galleryFloorPlansHtml += '<li data-thumb="' + imgFpIndex.img_building + '">';
            galleryFloorPlansHtml += '<img src="' + imgFpIndex.img_building + '" alt="' + imgFpIndex.seoalt + '-Floorplans" title="' + imgFpIndex.seotitle + '-Floorplans">';
            galleryFloorPlansHtml += '</li>';
          }
          $('#plan-gallery').html(galleryFloorPlansHtml);
        }
        //END-FLOORPLANS

        //PROPERTY DETAILS
        var pDetail = '#p-detail-';
        var data    = json[0];
        var roomDataPrices    = utils.dynamicPricingPlaces(json['places']);

        $(pDetail + 'name').html(data.nombre);
        $(pDetail + 'desc').html(data.cms_description + '<div class="dynamic-pricing">' + roomDataPrices + '</div>');
        $(pDetail + 'img' ).html('<img class="slider-hill" src="'+ gallery[0].img_building +'" alt="slider image ' + gallery[0].seoalt + '" title="' + gallery[0].seotitle + '">');
        //END-PROPERTY DETAILS

        //PROPERTY VIDEO
        if(data.video)
          $(pDetail + 'video').html(data.video);
        else {
          $('#detail-video').css('display', 'none');
          $('.tool-1').fadeOut();
//          $(pDetail + 'video').html(comingSoonHtml);
//          $(pDetail + 'video').toggleClass('sm-no-vid');
        }
        //END-PROPERTY VIDEO

        //AMENITIES
        var amenInicio     = '<p><span class="amenities-red-box slider-sun"></span><label>';
        var amenFin        = '</label></p>';
        var dataAmen       = data.id_serialized_amenitie;
        var amenitiesArray = '';

        for(var index in dataAmen) {
          amenitiesArray += amenInicio + dataAmen[index] + amenFin;
        }
        $(pDetail + 'amenities').html(amenitiesArray);
        //END-AMENITIES

        //NEARBY
        var dataNearby   = data.id_serialized_nerbyamenitie;
        var nAmenitiesArray = '';

        for(var index in dataNearby) {
          nAmenitiesArray += amenInicio + dataNearby[index] + amenFin;
        }
        $(pDetail + 'nearby').html(nAmenitiesArray);


        if(dataNearby.length == 0)
          $(pDetail + 'nearby-cs').html('<span class="d-ameni-title"> Nearby Public Places and Transportation </span>' + comingSoonHtml);
        //END-NEARBY

        //GALLERY-RUN
        $('#lightSlider').lightSlider({
          gallery:true,
          item:1,
          thumbItem:9,
          slideMargin: 0,
          speed:500,
          //auto:true,
          loop:true,
        });
        //END-GALLERY-RUN

        //GALLERY-RUN
        $('#plan-gallery').lightSlider({
          gallery:true,
          item:1,
          thumbItem:9,
          slideMargin: 0,
          speed:500,
          //auto:true,
          loop:true,
        });
        //END-GALLERY-RUN

        //MAPA
        utils.gmapFunction(json);
        //END-MAPA



        //MODAL SELECT
        var selectDynamicHtml = ''

        if(!json.places[0])
          selectDynamicHtml += '<option value="LEASED">LEASED</option>';
        else
          for(var selec in json.places) {
            selectDynamicHtml += '<option value="'+ json.places[selec].nombre +'">'+json.places[selec].nombre+'</option>';
          }

        $('#main-contact-form').append('<input type="hidden" value="'+ json[0].address +'"/>');
        $('#select-dynamic').html(selectDynamicHtml);

        //END MODAL SELECT

      });

      $('#gallery-id').fadeIn('slow');

      //OPEN MODAL
      $('#showing-form').on('click', function (){
        $('#property-modal').fadeIn('slow');
        $('.schedule-form').fadeIn('slow');
      });
      $('#showing-form-bottom').on('click', function (){
        console.log('cobraGay');
        $('#property-modal').fadeIn('slow');
        $('.schedule-form').fadeIn('slow');
      });
      //CLOSE MODAL
      $('#property-modal').on('click', function (e){
        e.preventDefault();
        $('#property-modal').fadeOut('slow');
        $('.schedule-form').fadeOut('slow');
      });
      //CLOSE MODAL
      $('.close').on('click', function (e){
        e.preventDefault();
        e.stopPropagation();
        $('#property-modal').fadeOut('slow');
        $('.schedule-form').fadeOut('slow');
      });
      //MODAL Actions
//       $('.schedule-form').on('click', function (e){
//         console.log('modal');
//         e.preventDefault();
//         e.stopPropagation();
//       });


    },
    resources       : function() {
      utils.gmapFunction();
    },
    contact         : function() {
      $('#home-slider').addClass('not-in-contact');
      utils.gmapFunction();
    },
    rent            : function() {
      var data = $('#mhm-rent-form-uno').serializeArray();
    },
    forwardaddress  : function() {
      $('#page-title-h1').html('Forwarding Address');
      var data = $('#mhm-rent-form-dos').serializeArray();

    },
    moveinreport    : function() {

      $('#page-title-h1').html('Move-In Condition Report');

      $('#next-btn-micr').on('click', function () {
        if($('#fname').val() && $('#lname').val() && $('#propname').val() && $('#aptname').val())
        {
          $('#credentials-div').css('display', 'none');
          $('#move-in-form').fadeIn('slow');
          $('.submit-btn-big-form').fadeIn('slow');

          return false;
        }
      });

      //checkbox unique
      $("input:checkbox").on('click', function () {
        var $box = $(this);
        var group = "input:checkbox[name='" + $box.attr("name") + "']";

        if ($box.is(":checked")) {
          $(group).prop("checked", false);
          $(group).prop("required", false);
          $box.prop("checked", true);
        }
        else {
          $box.prop("checked", false);
          $(group).prop("required", true);
        }
      });


      $(function () {
        $("#datepicker").datepicker({dateFormat: "yy/mm/dd"});
      });

      $( "#mhm-movein-report" ).submit(function( event ) {

        var objects = $('#mhm-movein-report').serializeArray();
        console.log(objects);

        var infoData = {};
        for(var obj in objects ) {
          infoData[objects[obj]['name']] = objects[obj]['value'];
        }

        infoData['date'] = $('#datepicker').val();

        console.log(infoData);

        if($('#fname').val() && $('#lname').val() && $('#propname').val() && $('#aptname').val() && infoData)
        {

          ajaxData('lib/Execute.php?e=Frontend/moveInReport', 'GET', infoData, 'true', function (json) {
            return;
          });

          window.location.href = "/";

//          return false;
          event.preventDefault();
        }
      });





    }
};
