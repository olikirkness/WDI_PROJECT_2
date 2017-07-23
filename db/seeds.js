
const mongoose = require('mongoose');
const bluebird = require('bluebird');

// const { db, port }   = require('../config/env');
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(dbURL);
mongoose.Promise = bluebird;

// const rp = require('request-promise');
const List = require('../models/lists');

List.collection.drop();

List
.create({
  name: 'LIST 1',
  location: 'this is the first list',
  items: [{
    name: 'Test 1',
    lat: 2,
    long: 1
  },{
    name: 'Test 2',
    lat: 5,
    long: 2
  }]},
  {
    name: 'LIST 2',
    location: 'this is the second list',
    items: [{
      name: 'Test 3',
      lat: 2,
      long: 1
    },{
      name: 'Test 4',
      lat: 5,
      long: 2
    }]}
  )

  // rp('https://api.foursquare.com/v2/venues/search?near=london&limit=50&client_id=R3KIGZLISIYT0YMGLQDNR2WKCN4LA1CMKNQSLJCLGDBIQC1L&client_secret=GQK1QDAAYHM5FOXS3NNHIRPXDYM1ZKB2N4IKFWEBKNPWJ0VW&v=20170720')
  // .then(htmlString => {
  //   const json = JSON.parse(htmlString);
  //   console.log(json);
  //
  //
  //   for (var i = 0; i < 10; i++) {
  //     Lists
  //     .create({
  //       name: json.response.venues[i].name,
  //       lat: json.response.venues[i].location.lat,
  //       long: json.response.venues[i].location.lng
  //       // category: json.response.venues.category[ || 'no category'
  //     });
  //     console.log(`${json.response.venues[i].name} ${json.response.venues[i].location.lat} ${json.response.venues[i].location.lng}`);
  //   }
  //
  //   // json.forEach(item => {
  //   //   Lists.create({
  //   //     name: item.response.venues.name,
  //   //     lat: item.response.venues.location.lat,
  //   //     long: item.response.venues.location.lng,
  //   //     category: item.response.category[0] || 'no category'
  //   //   });
  //   //   console.log(`${item.response.venues.name} was saved 2`);
  //   // });
  // })
  .finally(() => {
    mongoose.connection.close();
  });
