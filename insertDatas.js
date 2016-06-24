var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var async = require('async');
/**
 * Created by johnnykuo on 16/5/2.
 */
var url = 'mongodb://127.0.0.1:27017/bwins';
var collectionName = 'ssq';

//针对导出的数据文档,将其导出到数据库中,输入文件路径以及文件名, 文件名需要输入一个数组,数组中包括所有数据文档的名称
exports.insertData = function(filePath, filesName) {
    if(!filePath || !filesName) {
        console.log('Please input valid filePath & filesName')
    }
    else if(filesName.length == 0) {
        console.log('This filesName is empty array, please input valid filesName')
    }
    else{
        MongoClient.connect(url, function(err, db) {
            if(err) {
                console.error(err);
            } else {
                var collection = db.collection(collectionName);
                async.each(filesName, function (item, callback) {
                    fs.exists(filePath+item, function(result) {
                        if(err) {
                            console.error(err);
                        } else if(result==true) {
                            fs.readFile(filePath+item, 'utf-8', function(err, data) {
                                if(err) {
                                    console.error(err);
                                } else {
                                    var fileData = splitData(data);
                                    if(!fileData) {
                                        console.log('please choose valid fileData');
                                    }
                                    else{
                                        async.filter(fileData, function(item, callback) {
                                            filterData(collection, item, function(docs) {
                                                callback(null, docs.length==0);
                                            });
                                        }, function(err, results) {
                                            if(err) {
                                                console.error(err);
                                            }
                                            else if(results!=null && results.length>0){
                                                collection.insertMany(results, function(err, result) {
                                                    if(err) {
                                                        console.error(err);
                                                    }
                                                    else {
                                                        console.log(result);
                                                        callback();
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        } else if(result!==true) {
                            console.log('this file is not exists!');
                        }
                    });
                }, function(err) {
                    if(err) {
                        console.error(err);
                    }
                });
            }
        });
    }
};

//对基础文件的内容进行一个解析
var splitData = function(data) {
    if(!data) {
        console.log('please choose valid fileData');
        return null;
    }
    else{
        var everyData = data.split('\r\n');
        var allBwinsJSONData = [];
        for(var i=0; i<everyData.length; i++) {
            var everyDataArray = everyData[i].split('    ');
            if(everyDataArray.length > 1) {
                var redNumber = everyDataArray[1].split('|')[0];
                var blueNumber = everyDataArray[1].split('|')[1];
                var everyBwinJSON = {
                    "issueNumber":everyDataArray[0],
                    "bwinNumbers":everyDataArray[1],
                    "numberOne":redNumber.split(',')[0],
                    "numberTwo":redNumber.split(',')[1],
                    "numberThree":redNumber.split(',')[2],
                    "numberFour":redNumber.split(',')[3],
                    "numberFive":redNumber.split(',')[4],
                    "numberSix":redNumber.split(',')[5],
                    "numberBlue":blueNumber,
                    "bwinDate":everyDataArray[2]
                };
                allBwinsJSONData.push(everyBwinJSON);
            }
        }
        //console.log(allData);
        return allBwinsJSONData;
    }
};

//对读取文件的内容进行过滤,先在数据库中查看是否已经存在这条记录,如果存在,返回true, 不存在返回false
var filterData = function(collection, fileData, callback) {
    collection.find({'issueNumber':fileData.issueNumber}).toArray(function(err, docs) {
        if(err) {
            console.error(err);
        }
        else {
            callback(docs);
        }
    });
};

//要求输入的newData是一个数组,长度为三,第一个为期号:2003001, 第二个为所有的红篮球:01,02,03,04,05,06|07,第三个为开奖日期2003-01-01
exports.insertNewData = function(newData) {
    if(typeof(newData)!='object' && newData.length!=3) {
        console.log('please input valid data array!');
    }
    else if(newData[1].indexOf('|') > -1){
        var issueNumber = newData[0];
        var ballNumber = newData[1];
        var bwinDate = newData[2];
        var redBallNumbers = ballNumber.split('|')[0];
        var blueBallNumbers = ballNumber.split('|')[1];
        if(redBallNumbers.split(',').length == 6) {
            var bwinJSONString = {
                "issueNumber":issueNumber,
                "bwinNumbers":ballNumber,
                "numberOne":redBallNumbers.split(',')[0],
                "numberTwo":redBallNumbers.split(',')[1],
                "numberThree":redBallNumbers.split(',')[2],
                "numberFour":redBallNumbers.split(',')[3],
                "numberFive":redBallNumbers.split(',')[4],
                "numberSix":redBallNumbers.split(',')[5],
                "numberBlue":blueBallNumbers,
                "bwinDate":bwinDate
            };
            MongoClient.connect(url, function(err, db) {
                if(err) {
                    console.error(err);
                }
                else {
                    db.collection(collectionName).insertOne(bwinJSONString, function(err, result) {
                        if(err) {
                            console.error(err);
                        }
                        else {
                            console.log(result);
                        }
                    });
                }
            });
        }
    }
    else {
        console.log('please check the data array!')
    }
};