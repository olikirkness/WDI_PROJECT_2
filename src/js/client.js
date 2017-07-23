

$(init);

function init() {

  $('.submit').click(function(){
    var location = $('.destination').val();

    console.log(location);


    const title = $('.listTitle').val();

    console.log(title);
    console.log(`${title} will contain all the thing you can do in ${location}`);

    $('form').css('display', 'none');

    $.get(`https://api.foursquare.com/v2/venues/search?near=${location}&limit=50&client_id=R3KIGZLISIYT0YMGLQDNR2WKCN4LA1CMKNQSLJCLGDBIQC1L&client_secret=GQK1QDAAYHM5FOXS3NNHIRPXDYM1ZKB2N4IKFWEBKNPWJ0VW&v=20170720`)
    .done(data => {
      console.log(data.response.venues);
      $(`<ul class="listItems"></ul>`).appendTo($('.container'));

      for (var i = 0; i < data.response.venues.length; i++) {
        $(`<div class="venue"><li class="venueName">${data.response.venues[i].name}</li></div>`).appendTo($('.listItems'));
        if(data.response.venues[i].categories.length !==0){
          $(`<li class="category">${data.response.venues[i].categories[0].name}</li>"`).appendTo($('.venue')[i]);
          console.log(data.response.venues[i].categories[0].name);
        }
      }
      const list = {
        name: title,
        location: location,
        items: []
      };



      const savedItems = [];
      const venueSelect = $('.venue');
      // venueSelect();
      venueSelect.click(function(){
        const index = $(this).index();
        const itemName = data.response.venues[index].name;
        const itemLat = data.response.venues[index].location.lat;
        const itemLong = data.response.venues[index].location.lng;

        const listItem = {
          name: itemName,
          lat: itemLat,
          long: itemLong
        };

        list.items.push(listItem);

        console.log(list);


        savedItems.push(list.items);
        console.log(list);
      });

      $('<button class="btn submitBtn" type="button" name="button">Submit</button>').appendTo($('.container'));
      const submitBtn = $('.submitBtn');
      submitBtn.click(function(){
        $.post('/lists', list);
        window.location.href='/lists';

      });
      // ;
      // $('.venue').click(function(){

      // console.log(savedItems);
      // });
      // }


    }).fail(() => console.log('error'));
  });

}
