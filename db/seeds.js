//
// const mongoose = require('mongoose');
// const bluebird = require('bluebird');
//
// // const { db, port }   = require('../config/env');
// const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
// mongoose.connect(dbURL);
// mongoose.Promise = bluebird;
//
// // const rp = require('request-promise');
// const List = require('../models/lists');
//
// List.collection.drop();
//
// List
// .create({
//   name: 'LIST 1',
//   location: 'this is the first list',
//   items: [{
//     name: 'Test 1',
//     lat: 2,
//     long: 1,
//     url: 'www.google.com'
//   },{
//     name: 'Test 2',
//     lat: 5,
//     long: 2,
//     url: 'www.google.com'
//   }]},
//   {
//     name: 'LIST 2',
//     location: 'this is the second list',
//     items: [{
//       name: 'Test 3',
//       lat: 2,
//       long: 1,
//       url: 'www.google.com'
//     },{
//       name: 'Test 4',
//       lat: 5,
//       long: 2,
//       url: 'www.google.com'
//     }]}
//   )
//
//   .finally(() => {
//     mongoose.connection.close();
//   });
