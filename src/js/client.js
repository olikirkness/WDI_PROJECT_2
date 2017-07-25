var itinerist = itinerist || {};

itinerist.setUp = function(){
  this.submitBtn = $('.submit');
  this.reSubmitBtn = $('.reSubmit');
  this.submitStatus = false;
  // this.googlePhotos();
  initialize();
  function initialize() {
    var input = document.getElementById('destinationAuto');
    var autocomplete = new google.maps.places.Autocomplete(input);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

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


// itinerist.googlePhotos = function() {
//   this.allLists = $('.index-img');
//   this.listLocations = $('.listLocation');
//   console.log(this.listLocations[1]);
//
//   for (var i = 0; i < this.listLocations.length; i++) {
//     console.log(itinerist.listLocations[i].text());
//     //
//   }
//
//
// };


//   $
//   .get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDJ3zzkIHjjutvXMT2yPX5C6b28OB_FQ_8')
//   .done(data => {
//     console.log(data);
//   });
// };



itinerist.formSubmit = function(){

  this.getData();
};

itinerist.getData = function(){

  this.location = $('.destination').val();
  this.city = this.location.split(',')[0];
  console.log(this.city);
  this.usedIndex = [51];

  $.get(`https://api.foursquare.com/v2/venues/search?near=${this.location}&limit=50&client_id=R3KIGZLISIYT0YMGLQDNR2WKCN4LA1CMKNQSLJCLGDBIQC1L&client_secret=GQK1QDAAYHM5FOXS3NNHIRPXDYM1ZKB2N4IKFWEBKNPWJ0VW&v=20170720`)
  .done(data => {

    $.get(`https://api.unsplash.com/photos/random?client_id=9de52c542a6d745606274c8b0767976044f4acab3c341ffa92db5bb79edbb93a&query=${this.city}&featured=true`)
    .done(response => {

      console.log(response);
      this.photo = response.urls.small;
      console.log(this.photo, 'line 86');
      this.title = $('.listTitle').val();
      this.list = {
        name: this.title,
        location: this.location,
        photo: this.photo,
        items: []
      };

      console.log(this.list);

    });
    console.log(this.photo, '<------------');

    console.log(this.location);

    this.form = $('form');
    this.form.css('display', 'none');

    console.log(this.list);

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
      console.log(`${$(this).index()} uibweiufbwibf`);
      console.log(data.response.venues);

      itinerist.itemName = data.response.venues[itinerist.index].name;
      itinerist.itemLat = data.response.venues[itinerist.index].location.lat;
      itinerist.itemLong = data.response.venues[itinerist.index].location.lng;
      itinerist.itemUrl = data.response.venues[itinerist.index].url;
      itinerist.itemCategory = data.response.venues[itinerist.index].categories[0].name;

      itinerist.listItem = {
        name: itinerist.itemName,
        lat: itinerist.itemLat,
        long: itinerist.itemLong,
        url: itinerist.itemUrl,
        category: itinerist.itemCategory
      };
      console.log(itinerist.list);

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
    console.log($('.venue')[this.index]);
    if (this.index === this.usedIndex[i]) {
      $(itinerist.itemClicked).css('background-color', '#ddd');

      this.thisIndex = this.usedIndex.indexOf(this.index);

      this.usedIndex.splice(this.thisIndex, 1);
      this.list.items.splice(this.thisIndex-1, 1);
      return;
    }else if(i === this.usedIndex.length-1){
      this.check = true;
      this.usedIndex.push(this.index);
      this.list.items.push(this.listItem);
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
      console.log(itinerist);
      $.post(`/lists/${this.id}`, this.list)
      .done(function(){
        itinerist.setUp();
        console.log(this.list);
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

$(itinerist.setUp.bind(itinerist));
