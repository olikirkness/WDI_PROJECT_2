var itinerist = itinerist || {};

itinerist.setUp = function(){
  $(".button-collapse").sideNav();
  console.log('hello');

  $('.showMap').click(function(){
    itinerist.map();
  });

  this.submitBtn = $('.submit');
  this.reSubmitBtn = $('.reSubmit');
  this.submitStatus = false;
  $('.destination').focus(function(){

    // function initialize() {
      var input = document.getElementById('destinationAuto');
      new google.maps.places.Autocomplete(input);
    // }
    // google.maps.event.addDomListener(window, 'load', initialize);
  });


  this.submitBtn.click(function(){
    if($('.listTitle').val() === ''){
      if($('.pTitle')){
        $('.pTitle').remove()
      }
      $(`<p class="pTitle">Please give your list a title.</P>`).appendTo($('.titleError'));

      $('.listTitle').addClass('invalid');

      console.log('error');

    }else{
      itinerist.formSubmit();
    }
  });
  this.reSubmitBtn.click(function(){
    itinerist.submitStatus = true;
    itinerist.formSubmit();
  });
};



itinerist.formSubmit = function(){

  this.getData();
};

itinerist.getData = function(){

  this.location = $('.destination').val();
  this.city = this.location.split(',')[0];
  this.usedIndex = [51];

  $.get(`https://api.foursquare.com/v2/venues/search?near=${this.location}&limit=50&client_id=R3KIGZLISIYT0YMGLQDNR2WKCN4LA1CMKNQSLJCLGDBIQC1L&client_secret=GQK1QDAAYHM5FOXS3NNHIRPXDYM1ZKB2N4IKFWEBKNPWJ0VW&v=20170720`)
  .done(data => {
    this.photo = 'https://www.roughguides.com/wp-content/uploads/2016/03/Sings-660x420.jpg';
    this.title = $('.listTitle').val();
    this.list = {
      name: this.title,
      location: this.location,
      photo: this.photo,
      items: []
    };

    $.get(`https://api.unsplash.com/photos/random?client_id=9de52c542a6d745606274c8b0767976044f4acab3c341ffa92db5bb79edbb93a&query=${this.city}&featured=true`)
    .done(response => {

      this.list.photo = response.urls.regular;

    })
    .fail(console.log('error'));


    this.form = $('form');
    this.form.css('display', 'none');


    this.itemUl = $(`<ul class="searchListItems"></ul>`).appendTo($('.container'));

    for (var i = 0; i < data.response.venues.length; i++) {
      $(`<div class="venue"><li class="venueName">${data.response.venues[i].name}</li></div>`).appendTo($('.searchListItems'));
      if(data.response.venues[i].categories.length !==0){
        $(`<li class="category">${data.response.venues[i].categories[0].name}</li>"`).appendTo($('.venue')[i]);
        console.log(data.response.venues[i].categories[0].name);
      }
    }
    $('<button class="btn submitBtn" type="button" name="button">Submit</button>').appendTo($('.container'));
    this.submitBtn = $('.submitBtn');

    this.submitBtn.click(function(){
      itinerist.submitForm();
    });

    this.venueSelect = $('.venue');

    this.venueSelect.click(function(){
      itinerist.index = $(this).index();

      itinerist.itemName = data.response.venues[itinerist.index].name;
      itinerist.itemLat = data.response.venues[itinerist.index].location.lat;
      itinerist.itemLong = data.response.venues[itinerist.index].location.lng;
      itinerist.itemUrl = data.response.venues[itinerist.index].url;
      if(data.response.venues[itinerist.index].categories.length >0){
        itinerist.itemCategory = data.response.venues[itinerist.index].categories[0].name;
      }


      itinerist.listItem = {
        name: itinerist.itemName,
        lat: itinerist.itemLat,
        long: itinerist.itemLong,
        url: itinerist.itemUrl,
        category: itinerist.itemCategory
      };

      itinerist.itemClick();
    });

  })
  .fail(function() {
    if($('.p')){
      $('.p').remove();
    }

    $(`<p class="p">There is no data on that location. Please try something else.</P>`).appendTo($('.error'));

    $('.destination').addClass('invalid');
  });


};

itinerist.itemClick = function(){

  this.url = $(location).attr('href');
  this.segments = this.url.split( '/' );
  this.id = this.segments[4];
  itinerist.itemClicked = $('.venue')[itinerist.index];
  for (var i = 0; i < this.usedIndex.length; i++) {
    this.check = false;
    if (this.index === this.usedIndex[i]) {
      $(itinerist.itemClicked).css('background-color', '#ddd');

      this.thisIndex = this.usedIndex.indexOf(this.index);

      this.usedIndex.splice(this.thisIndex, 1);
      this.list.items.splice(this.thisIndex-1, 1);
      return;
    }else if(i === this.usedIndex.length-1){
      this.check = true;
      this.usedIndex.push(this.index);
      itinerist.list.items.push(this.listItem);
    }
    if(this.check){
      $(itinerist.itemClicked).css('background-color', '#ff8f56');
      break;
    }

  }

};

itinerist.submitForm = function(){
  if(this.submitStatus === false){
    if(this.title){
      this.setUp();
      $.post('/lists', this.list)
      .done(function(){
        window.location.href='/lists';
      })
      .fail(function(err){
        console.log(err);
        alert('Something went wrong');
      });

    }else{
      alert('you need a title');
    }

  }else{
    if(this.title){
      $.post(`/lists/${this.id}`, this.list)
      .done(function(){
        itinerist.setUp();
        window.location.href='/lists';
      })
      .fail(function(err){
        console.log(err);
        alert('Something went wrong');
      });

    }else{
      alert('you need a title');
    }
  }

};

itinerist.map = function(){


  const latArray= [];
  const longArray= [];
  this.latSum = 0;
  this.longSum = 0;
  // AIzaSyA6Py5yoDo_wrAbYHn0LCJ8kCW81mUQGKo
  for (var i = 0; i < $('.listItemLat').length; i++) {
    latArray.push($('.listItemLat')[i].dataset.lat);
    this.latSum += parseFloat( $('.listItemLat')[i].dataset.lat);
    this.longSum += parseFloat( $('.listItemLong')[i].dataset.lat);
    longArray.push($('.listItemLong')[i].dataset.long);
  }
  this.latAve = this.latSum/latArray.length;
  this.longAve = this.longSum/longArray.length;
  console.log(this.latAve);
  console.log(this.longAve);

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: new google.maps.LatLng(this.latAve, this.longAve)
  });

  this.bounds  = new google.maps.LatLngBounds();

  for (var a = 0; a < $('.listItemLat').length; a++) {
    this.marker = new google.maps.Marker({
      position: {lat: parseFloat( $('.listItemLat')[a].dataset.lat), lng: parseFloat( $('.listItemLong')[a].dataset.lat) },
      map: map,
      clickable: true
    });

    var loc = new google.maps.LatLng(this.marker.position.lat(), this.marker.position.lng());
    this.bounds.extend(loc);

    this.marker.addListener('click',function() {
      infowindow.open(map, this);
      console.log(this);


      // const markerIndex = indexOf(this)
      // console.log($('.listItemName')[a]);
    });
    var infowindow = new google.maps.InfoWindow({
      content: $('.listItemName')[a].dataset.name
    });
    console.log(itinerist.marker);

  }

  map.fitBounds(this.bounds);

};


$(itinerist.setUp.bind(itinerist));
/* global google:ignore */
