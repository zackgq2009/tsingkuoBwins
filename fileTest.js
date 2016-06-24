/**
 * Created by johnny on 16/6/17.
 */
var insertDatas = require('./insertDatas');
var countDatas = require('./countDatas');
var matchDatas = require('./matchDatas');
var url = 'mongodb://127.0.0.1:27017/bwins';
var collectionName = 'ssq';
var MongoClient = require('mongodb').MongoClient;


var filePath = '/Users/johnny/Documents/bwins/';
var filesName = ['2003.txt'];

var redBalls = ['04','08','12','20','23','30'];
var newData = ['2016009', '11,12,13,14,15,16|17', '2016-06-16'];

// insertDatas.insertData(filePath, filesName);

// countDatas.countRedBallNumber('01', function(countNumber, countAll) {
//     console.log(countAll);
//     console.log(countNumber);
// });

// matchDatas.matchRedBallsOr(redBalls, function(docs) {
//     console.log(docs);
// });

MongoClient.connect(url, function(err, db) {
    if(err) {
        console.error(err);
    }
    else {
        var collection = db.collection(collectionName);
        collection.find({}).toArray(function(err, docs) {
            if(err) {
                console.error(err);
            }
            else {
                // console.log(docs);
                matchDatas.matchRedBallsOne(docs, redBalls);
                // console.log(matchDatas.matchRedBallsOne(docs, redBalls));
            }
        });
    }
});

// insertDatas.insertNewData(newData);

// countDatas.countMatch();

// var copyArray = function(array) {
//     var newArray = [];
//     for(let i=0; i<array.length; i++) {
//         newArray.push(array[i]);
//     }
//     return newArray;
// };

// console.log([].concat([1,2,3]).concat([]).concat([4,5,6]));