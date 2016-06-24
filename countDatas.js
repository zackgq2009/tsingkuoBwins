var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var url = 'mongodb://127.0.0.1:27017/bwins';
var collectionName = 'ssq';
var matchDatas = require('./matchDatas');
/**
 * Created by johnny on 16/5/3.
 */
const NUMBERONE = 'numberOne';
const NUMBERTWO = 'numberTwo';
const NUMBERTHREE = 'numberThree';
const NUMBERFOUR = 'numberFour';
const NUMBERFIVE = 'numberFive';
const NUMBERSIX = 'numberSix';
const NUMBERBLUE = 'numberBlue';

//输入某一个红球号,返回包含此号球的次数以及在数据库中所有的总次数
exports.countRedBallNumber = function(ballNumber, callback) {
    if(typeof(ballNumber)!='string') {
        console.log('ballNumber should be string');
    }
    else {
        MongoClient.connect(url, function(err, db) {
            if(err) {
                console.error(err);
            }
            else {
                var collection = db.collection(collectionName);
                collection.count({}, function(err, count) {
                    if(err) {
                        console.error(err);
                    }
                    else {
                        var countAll = count;
                        collection.count({ $or: [{'numberOne':ballNumber},{'numberTwo':ballNumber},{'numberThree':ballNumber},{'numberFour':ballNumber},{'numberFive':ballNumber},{'numberSix':ballNumber}]}, function(err, countNumber) {
                            if(err) {
                                console.error(err);
                            }
                            else {
                                callback(countNumber, countAll);
                            }
                        });
                    }
                });
            }
        });
    }
};

//输入某一个篮球号,返回此篮球出现的次数以及在数据库中所有开奖的总次数
exports.countBlueBallNumber = function(ballNumber, callback) {
    if(typeof(ballNumber)!='string') {
        console.log('ballNumber should be string');
    }
    else {
        MongoClient.connect(url, function(err, db) {
            if(err) {
                console.error(err);
            }
            else {
                var collection = db.collection(collectionName);
                collection.count({}, function(err, count) {
                    if(err) {
                        console.error(err);
                    }
                    else {
                        var countAll = count;
                        collection.count({'numberBlue':ballNumber}, function(err, countNumber) {
                            if(err) {
                                console.error(err);
                            }
                            else {
                                callback(countNumber, countAll);
                            }
                        });
                    }
                });
            }
        });
    }
};

//针对现有数据,遍历每一条开奖记录,对其进行一个相同,两个相同,三个相同,四个相同,五个相同,六个相同的数量统计
exports.countMatch = function() {
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
                    console.log(docs);
                    var matchResults = [];
                    for(let i=0; i<docs.length; i++) {
                        var matchResult = matchDatas.matchRedBallsOr(docs, docs[i]);
                        matchResults.push(matchResult);
                    }
                    console.log(matchResults);
                }
            });
        }
    })
};

// var joinMatchDatas = function(matchDatas) {
//     var newMatchData = [];
//     for(let i=0; i<matchDatas.length; i++) {
//         for(let j=0; j<matchDatas[i].length; j++) {
//             newMatchData.push(matchDatas[i][j]);
//         }
//     }
//     return newMatchData;
// };3

exports.parseBwinData = function(bwinData) {
    var redBallNumbers = [];
    redBallNumbers.push(bwinData.numberOne, bwinData.numberTwo, bwinData.numberThree, bwinData.numberFour, bwinData.numberFive, bwinData.numberSix);
    return redBallNumbers;
};

var copyArray = function(array) {
    var newArray = [];
    for(let i=0; i<array.length; i++) {
        newArray.push(array[i]);
    }
    return newArray;
};