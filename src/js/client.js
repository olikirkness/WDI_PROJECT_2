var listForm = listForm || {};

listForm.setUp = function(){
  this.submitBtn = $('.submit');
  this.reSubmitBtn = $('.reSubmit');
  this.submitStatus = false;


  this.submitBtn.click(function(){

    listForm.formSubmit();
  });
  this.reSubmitBtn.click(function(){
    listForm.submitStatus = true;
    listForm.formSubmit();
  });


};

listForm.formSubmit = function(){
  this.location = $('.destination').val();
  this.title = $('.listTitle').val();
  this.form = $('form');
  this.form.css('display', 'none');
  this.list = {
    name: this.title,
    location: this.location,
    items: []
  };

  this.usedIndex = [51];

  this.getData();
};

listForm.getData = function(){
  $.get(`https://api.foursquare.com/v2/venues/search?near=${this.location}&limit=50&client_id=R3KIGZLISIYT0YMGLQDNR2WKCN4LA1CMKNQSLJCLGDBIQC1L&client_secret=GQK1QDAAYHM5FOXS3NNHIRPXDYM1ZKB2N4IKFWEBKNPWJ0VW&v=20170720`)
  .done(data => {

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
      listForm.submitForm();
    });

    this.venueSelect = $('.venue');

    this.venueSelect.click(function(){
      listForm.index = $(this).index();
      console.log(`${$(this).index()} uibweiufbwibf`);
      console.log(data.response.venues);

      listForm.itemName = data.response.venues[listForm.index].name;
      listForm.itemLat = data.response.venues[listForm.index].location.lat;
      listForm.itemLong = data.response.venues[listForm.index].location.lng;
      listForm.itemUrl = data.response.venues[listForm.index].url;
      listForm.itemCategory = data.response.venues[listForm.index].categories[0].name;
      listForm.listItem = {
        name: listForm.itemName,
        lat: listForm.itemLat,
        long: listForm.itemLong,
        url: listForm.itemUrl,
        category: listForm.itemCategory
      };
      console.log(listForm.list);

      listForm.itemClick();
    });

  });


};

listForm.itemClick = function(){
  this.url = $(location).attr('href');
  this.segments = this.url.split( '/' );
  this.id = this.segments[4];
  console.log('hello');
  console.log(this.usedIndex.length);
  listForm.itemClicked = $('.venue')[listForm.index];
  for (var i = 0; i < this.usedIndex.length; i++) {
    this.check = false;
    console.log($('.venue')[this.index]);
    if (this.index === this.usedIndex[i]) {
      $(listForm.itemClicked).css('background-color', '#ddd');

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
      $(listForm.itemClicked).css('background-color', '#ee6e73');
      break;
    }

  }


};

listForm.submitForm = function(){
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


      // $.ajax({
      //   url: '/lists/:id', // your api url
      //   method: 'PUT', // method is any HTTP method
      //   data: {list: $(this.list)}, // data as js object
      //   success: function() {
      //     console.log('hello');
      //     window.location.href='/lists';
      //   }
      // });
      console.log(listForm);
      $.post(`/lists/${this.id}`, this.list)
      .done(function(){
        listForm.setUp();
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

$(listForm.setUp.bind(listForm));
