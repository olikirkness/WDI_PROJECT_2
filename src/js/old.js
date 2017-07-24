

$(init);

function init() {

  $('.submit').click(function(){
    var location = $('.destination').val();

    const title = $('.listTitle').val();

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

      venueSelect.click(function(){
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

        for (var i = 0; i < usedIndex.length; i++) {
          let check = false;

          if (index === usedIndex[i]) {
            $(this).css('background-color', '#ddd');

            const thisIndex = usedIndex.indexOf(index);

            usedIndex.splice(thisIndex, 1);
            list.items.splice(thisIndex-1, 1);
            return;
          }else if(i === usedIndex.length-1){
            check = true;
            usedIndex.push(index);
            list.items.push(listItem);
          }
          if(check){
            $(this).css('background-color', '#ee6e73');
            break;
          }

        }
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

  $('.reSubmit').click(function(){
    console.log('clicked');
    var location = $('.destination').val();

    const title = $('.listTitle').val();

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

    });

  });
}
