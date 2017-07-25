var itinerist = itinerist || {};

itinerist.setUp = function(){
  this.submitBtn = $('.submit');
  this.reSubmitBtn = $('.reSubmit');
  this.submitStatus = false;

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


// this.initialize = function() {
//   initAutocomplete();
//   function initAutocomplete() {
//     // Create the autocomplete object, restricting the search to geographical
//     // location types.
//     this.autocomplete = new google.maps.places.Autocomplete(
//         /** @type {!HTMLInputElement} */(document.getElementById('YOUR_INPUT_ELEMENT_ID')),
//         {types: ['geocode']});
//
//     // When the user selects an address from the dropdown, populate the address
//     // fields in the form.
//     this.autocomplete.addListener('place_changed', fillInAddress);
//   }
//
//   function fillInAddress() {
//     // Get the place details from the autocomplete object.
//     this.place = this.autocomplete.getPlace();
//
//   }
//   }

// itinerist.getFlickrImage = function(){
  //   Key:
  // 41fd6b3d04ea754c08d8b2539dab07d5
  //157041428@N06
  // Secret:
  // d0caae690651b524

  //AIzaSyDJ3zzkIHjjutvXMT2yPX5C6b28OB_FQ_8

  // ApplicationItinerist Key: 4gfcxb7mmrdjewckghe6sz4u Secret: 325n6fpNP2PgGgPbvxhYYWUj9cENcgYxmJZhaZBnh7FTm
  //
  // $.get('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyDJ3zzkIHjjutvXMT2yPX5C6b28OB_FQ_8')
  // .done(data => {
  //   console.log('hello');
  //   console.log(data);
  //
  // });
//
//   $.ajax({
//     url: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyDJ3zzkIHjjutvXMT2yPX5C6b28OB_FQ_8',
//     type: 'GET',
//     dataType: 'jsonp',
//     cache: false,
//     success: function(data){
//       console.log('hello');
//
//     }
//   });
//
// };

itinerist.formSubmit = function(){




  this.getData();
};

itinerist.getData = function(){

  this.location = $('.destination').val();
  this.usedIndex = [51];
  $.get(`https://api.foursquare.com/v2/venues/search?near=${this.location}&limit=50&client_id=R3KIGZLISIYT0YMGLQDNR2WKCN4LA1CMKNQSLJCLGDBIQC1L&client_secret=GQK1QDAAYHM5FOXS3NNHIRPXDYM1ZKB2N4IKFWEBKNPWJ0VW&v=20170720`)
  .done(data => {

    console.log(this.location);
    this.title = $('.listTitle').val();
    this.form = $('form');
    this.form.css('display', 'none');
    this.list = {
      name: this.title,
      location: this.location,
      items: []
    };

    this.itemUl = $(`<ul class="listItems"></ul>`).appendTo($('.container'));

    for (var i = 0; i < data.response.venues.length; i++) {
      $(`<div class="venue"><li class="venueName">${data.response.venues[i].name}</li></div>`).appendTo($('.listItems'));
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
      $('.p').remove()
    }

    $(`<p class="p">There is no data on that location. Please try something else.</P>`).appendTo($('.error'));

    $('.destination').addClass('invalid');
  });


};

itinerist.itemClick = function(){
  this.url = $(location).attr('href');
  this.segments = this.url.split( '/' );
  this.id = this.segments[4];
  console.log('hello');
  console.log(this.usedIndex.length);
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
      $(itinerist.itemClicked).css('background-color', '#ee6e73');
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
