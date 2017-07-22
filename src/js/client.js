

$(init);

function init() {


  console.log('client log!');



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

    for (var i = 0; i < data.response.venues.length; i++) {
      $(`<div class="venueName"><li class="venue">${data.response.venues[i].name}</li></div>`).appendTo($('.container'));
      $('.venue').text();
      console.log(data[i]);
    }
    //
    // data.forEach(venue => {
    //   $(`<div class="col-3"><li class="venue"></b> ${venue.name}</li></div>`).appendTo($('container'));
    // });

  }).fail(() => console.log('error'));
  });

}
