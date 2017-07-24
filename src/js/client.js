

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
      const usedIndex = [51];

      // const savedItems = [];
      const venueSelect = $('.venue');

      //when i click a specific venue
      venueSelect.click(function(){
        //save the index of this venue
        const index = $(this).index();
        const itemName = data.response.venues[index].name;
        const itemLat = data.response.venues[index].location.lat;
        const itemLong = data.response.venues[index].location.lng;
        const itemUrl = data.response.venues[index].url;
        const listItem = {
          name: itemName,
          lat: itemLat,
          long: itemLong,
          url: itemUrl
        };

        //if the user selects an item with the same


        for (var i = 0; i < usedIndex.length; i++) {
          if (i === 0) {
            list.items.push(listItem);
            usedIndex.push(index);
            console.log(usedIndex);
            $(this).css('background-color', '#ee6e73');
          }else if (index === usedIndex[i]) {
            console.log('match');
            $(this).css('background-color', '#ccc');
          }else{
            usedIndex.push(index);
            console.log(usedIndex);
            list.items.push(listItem);
            $(this).css('background-color', '#ee6e73');

          }
        }


        // if(list.items.length === 0){
        //   console.log('unique');
        //   list.items.push(listItem);
        //   console.log(list.items);
        //   $(this).css('background-color', '#ee6e73');
        // }else{
        //   for (var i = 0; i < list.items.length; i++) {
        //     if(list.items[i].long === itemLong){
        //       console.log('match');
        //       list.items.splice(i,1);
        //       $(this).css('background-color', '#ccc');
        //     }else{
        //       console.log('unique');
        //       list.items.push(listItem);
        //       console.log(list.items);
        //       $(this).css('background-color', '#ee6e73');
        //     }
        //   }
        // }





        });



        $('<button class="btn submitBtn" type="button" name="button">Submit</button>').appendTo($('.container'));
        const submitBtn = $('.submitBtn');


        submitBtn.click(function(){
          if(title){
            $.post('/lists', list)
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

        });

      }).fail(() => console.log('error'));
    });

    $('.add').click(function(){

    });

  }
