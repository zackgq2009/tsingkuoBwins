var async = require('async');
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

//此方法是对数据库已有数据进行校验,查看红球完全一样的情况,暂时不考虑篮球的情况,返回一个一元数组
exports.matchRedBallsAnd = function (collection, redBallNumbers, callback) {
    if (typeof(redBallNumbers) != 'object') {
        console.log('the redBallNumbers should be array');
    }
    else if (redBallNumbers.length == 6) {
        collection.find({$or: [{'numberOne': redBallNumbers[0]}, {'numberTwo': redBallNumbers[0]}, {'numberThree': redBallNumbers[0]}, {'numberFour': redBallNumbers[0]}, {'numberFive': redBallNumbers[0]}, {'numberSix': redBallNumbers[0]}]}).toArray(function (err, docs) {
            if (err) {
                console.error(err);
            }
            else {
                async.filter(docs, function (item, callback) {
                    callback(null, matchNumber(item, redBallNumbers[1]))
                }, function (err, resultsOne) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        async.filter(resultsOne, function (item, callback) {
                            callback(null, matchNumber(item, redBallNumbers[2]))
                        }, function (err, resultTwo) {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                async.filter(resultTwo, function (item, callback) {
                                    callback(null, matchNumber(item, redBallNumbers[3]))
                                }, function (err, resultThree) {
                                    if (err) {
                                        console.error(err);
                                    }
                                    else {
                                        async.filter(resultThree, function (item, callback) {
                                            callback(null, matchNumber(item, redBallNumbers[4]))
                                        }, function (err, resultFour) {
                                            if (err) {
                                                console.error(err);
                                            }
                                            else {
                                                async.filter(resultFour, function (item, callback) {
                                                    callback(null, matchNumber(item, redBallNumbers[5]))
                                                }, function (err, resultFive) {
                                                    if (err) {
                                                        console.error(err);
                                                    }
                                                    else {
                                                        callback(resultFive);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    else {
        console.log('this array of redBallNumbers is not valid');
    }
};

//此方法是对数据库中已有数据进行校验,查看红球完全不一样的情况(没有一个相同的),暂时不考虑篮球的情况,返回一个一元数组
exports.matchRedBallsOr = function (bwinData, redBallNumbers) {
    if (typeof(redBallNumbers) != 'object' && typeof(bwinData) != 'object') {
        console.log('the redBallNumbers should be array');
    }
    else if (redBallNumbers.length == 6) {
        for(let i=0; i<bwinData.length; i++) {
            if(bwinData[i].numberOne==redBallNumbers[0] || bwinData[i].numberTwo==redBallNumbers[0] || bwinData[i].numberThree==redBallNumbers[0] || bwinData[i].numberFour==redBallNumbers[0] || bwinData[i].numberFive==redBallNumbers[0] || bwinData[i].numberSix==redBallNumbers[0]) {
                bwinData.splice(i, 1);
            }
        }
        for(let i=0; i<bwinData.length; i++) {
            if(bwinData[i].numberOne==redBallNumbers[1] || bwinData[i].numberTwo==redBallNumbers[1] || bwinData[i].numberThree==redBallNumbers[1] || bwinData[i].numberFour==redBallNumbers[1] || bwinData[i].numberFive==redBallNumbers[1] || bwinData[i].numberSix==redBallNumbers[1]) {
                bwinData.splice(i, 1);
            }
        }
        for(let i=0; i<bwinData.length; i++) {
            if(bwinData[i].numberOne==redBallNumbers[2] || bwinData[i].numberTwo==redBallNumbers[2] || bwinData[i].numberThree==redBallNumbers[2] || bwinData[i].numberFour==redBallNumbers[2] || bwinData[i].numberFive==redBallNumbers[2] || bwinData[i].numberSix==redBallNumbers[2]) {
                bwinData.splice(i, 1);
            }
        }
        for(let i=0; i<bwinData.length; i++) {
            if(bwinData[i].numberOne==redBallNumbers[3] || bwinData[i].numberTwo==redBallNumbers[3] || bwinData[i].numberThree==redBallNumbers[3] || bwinData[i].numberFour==redBallNumbers[3] || bwinData[i].numberFive==redBallNumbers[3] || bwinData[i].numberSix==redBallNumbers[3]) {
                bwinData.splice(i, 1);
            }
        }
        for(let i=0; i<bwinData.length; i++) {
            if(bwinData[i].numberOne==redBallNumbers[4] || bwinData[i].numberTwo==redBallNumbers[4] || bwinData[i].numberThree==redBallNumbers[4] || bwinData[i].numberFour==redBallNumbers[4] || bwinData[i].numberFive==redBallNumbers[4] || bwinData[i].numberSix==redBallNumbers[4]) {
                bwinData.splice(i, 1);
            }
        }
        for(let i=0; i<bwinData.length; i++) {
            if(bwinData[i].numberOne==redBallNumbers[5] || bwinData[i].numberTwo==redBallNumbers[5] || bwinData[i].numberThree==redBallNumbers[5] || bwinData[i].numberFour==redBallNumbers[5] || bwinData[i].numberFive==redBallNumbers[5] || bwinData[i].numberSix==redBallNumbers[5]) {
                bwinData.splice(i, 1);
            }
        }
        return bwinData;
    }
    else {
        console.log('this array of redBallNumbers is not valid');
    }
    return null;
};

var matchRedBallsFirst = function (bwinData, redBallNumbers) {
    if (typeof(redBallNumbers) != 'object' && redBallNumbers.length != 6) {
        console.log('this array of redBallNumbers is not valid');
    }
    else if(redBallNumbers.length == 6){
        var bwinNewData = [];
        for(let i=0; i<bwinData.length; i++) {
            if(bwinData[i].numberOne==redBallNumbers[0] || bwinData[i].numberTwo==redBallNumbers[0] || bwinData[i].numberThree==redBallNumbers[0] || bwinData[i].numberFour==redBallNumbers[0] || bwinData[i].numberFive==redBallNumbers[0] || bwinData[i].numberSix==redBallNumbers[0]) {
                bwinNewData.push(bwinData.slice(i, i+1));
            }
        }
        console.log(bwinNewData);
        for(let i=0; i<bwinNewData.length; i++) {
            if(bwinNewData[i].numberOne==redBallNumbers[1] || bwinNewData[i].numberTwo==redBallNumbers[1] || bwinNewData[i].numberThree==redBallNumbers[1] || bwinNewData[i].numberFour==redBallNumbers[1] || bwinNewData[i].numberFive==redBallNumbers[1] || bwinNewData[i].numberSix==redBallNumbers[1]) {
                bwinNewData.splice(i, 1);
            }
        }
        for(let i=0; i<bwinNewData.length; i++) {
            if(bwinNewData[i].numberOne==redBallNumbers[2] || bwinNewData[i].numberTwo==redBallNumbers[2] || bwinNewData[i].numberThree==redBallNumbers[2] || bwinNewData[i].numberFour==redBallNumbers[2] || bwinNewData[i].numberFive==redBallNumbers[2] || bwinNewData[i].numberSix==redBallNumbers[2]) {
                bwinNewData.splice(i, 1);
            }
        }
        for(let i=0; i<bwinNewData.length; i++) {
            if(bwinNewData[i].numberOne==redBallNumbers[3] || bwinNewData[i].numberTwo==redBallNumbers[3] || bwinNewData[i].numberThree==redBallNumbers[3] || bwinNewData[i].numberFour==redBallNumbers[3] || bwinNewData[i].numberFive==redBallNumbers[3] || bwinNewData[i].numberSix==redBallNumbers[3]) {
                bwinNewData.splice(i, 1);
            }
        }
        for(let i=0; i<bwinNewData.length; i++) {
            if(bwinNewData[i].numberOne==redBallNumbers[4] || bwinNewData[i].numberTwo==redBallNumbers[4] || bwinNewData[i].numberThree==redBallNumbers[4] || bwinNewData[i].numberFour==redBallNumbers[4] || bwinNewData[i].numberFive==redBallNumbers[4] || bwinNewData[i].numberSix==redBallNumbers[4]) {
                bwinNewData.splice(i, 1);
            }
        }
        for(let i=0; i<bwinNewData.length; i++) {
            if(bwinNewData[i].numberOne==redBallNumbers[5] || bwinNewData[i].numberTwo==redBallNumbers[5] || bwinNewData[i].numberThree==redBallNumbers[5] || bwinNewData[i].numberFour==redBallNumbers[5] || bwinNewData[i].numberFive==redBallNumbers[5] || bwinNewData[i].numberSix==redBallNumbers[5]) {
                bwinNewData.splice(i, 1);
            }
        }
        return bwinNewData;
    }
    else {
        console.log('this array of redBallNumbers is not valid');
    }
    return null;
};

//利用matchRedBallsFirst方法, 找出有一个红球匹配的情况,这种匹配只匹配只一个红球相同的情况,是绝对匹配,匹配结果中不包括两个红球,三个红球等等情况的数量,返回一个数组
exports.matchRedBallsOne = function (bwinData, redBallNumbers) {
    if (typeof(redBallNumbers) != 'object' && redBallNumbers.length != 6) {
        console.log('this array of redBallNumbers is not valid');
    }
    else {
        var goalBallNumbersS = [];
        var matchData = [];
        for (let i = 0; i < redBallNumbers.length; i++) {
            var goalBallNumbers = copyArray(redBallNumbers);
            var goalBall = redBallNumbers[i];
            goalBallNumbers.splice(i, 1);
            goalBallNumbers.unshift(goalBall);
            goalBallNumbersS.push(goalBallNumbers);
        }
        console.log(goalBallNumbersS);
        for(let i=0; i<goalBallNumbersS.length; i++) {
            if(matchRedBallsFirst(bwinData, goalBallNumbersS[i])!=null) {
                matchData.concat(matchRedBallsFirst(bwinData, goalBallNumbersS[i]));
            }
        }
        return matchData;
    }
    return null;
};

//利用matchRedBallsFirstAndSecond方法,找出有两个红球匹配的情况,是绝对匹配,返回一个二元数组
exports.matchRedBallsTwo = function (collection, redBallNumbers, callback) {
    if (typeof(redBallNumbers) != 'object' && redBallNumbers.length != 6) {
        console.log('this array of redBallNumbers is not valid');
    }
    else {
        var goalBallNumbersS = [];
        for (let i = 0; i < redBallNumbers.length - 1; i++) {
            for (let j = i + 1; j < redBallNumbers.length; j++) {
                var goalBallNumbers = [];
                for (let k = 0; k < redBallNumbers.length; k++) {
                    goalBallNumbers.push(redBallNumbers[k]);
                }
                var goalFirstBall = redBallNumbers[i];
                var goalSecondBall = redBallNumbers[j];
                goalBallNumbers.splice(j, 1);
                goalBallNumbers.splice(i, 1);
                goalBallNumbers.unshift(goalSecondBall);
                goalBallNumbers.unshift(goalFirstBall);
                goalBallNumbersS.push(goalBallNumbers);
            }
        }
        async.map(goalBallNumbersS, function (item, callback) {
            console.log(item);
            matchRedBallsFirstAndSecond(collection, item, function (result) {
                callback(result);
            })
        }, function (err, results) {
            if (err) {
                console.error(err);
            }
            else {
                callback(results);
            }
        });
    }
};

//利用matchRedBallsFirstAndSecondAndThird方法,找出有三个红球匹配的情况,是绝对匹配,返回一个二元数组
exports.matchRedBallsThree = function (collection, redBallNumbers, callback) {
    if (typeof(redBallNumbers) != 'object' && redBallNumbers.length != 6) {
        console.log('this array of redBallNumbers is not valid');
    }
    else {
        var goalBallNumbersS = [];
        for (let i = 0; i < redBallNumbers.length - 2; i++) {
            for (let j = i + 1; j < redBallNumbers.length - 1; j++) {
                for (let k = j + 1; k < redBallNumbers.length; k++) {
                    var goalBallNumbers = [];
                    for (let l = 0; l < redBallNumbers.length; l++) {
                        goalBallNumbers.push(redBallNumbers[l]);
                    }
                    var goalFirstBall = redBallNumbers[i];
                    var goalSecondBall = redBallNumbers[j];
                    var goalThirdBall = redBallNumbers[k];
                    goalBallNumbers.splice(k, 1);
                    goalBallNumbers.splice(j, 1);
                    goalBallNumbers.splice(i, 1);
                    goalBallNumbers.unshift(goalThirdBall);
                    goalBallNumbers.unshift(goalSecondBall);
                    goalBallNumbers.unshift(goalFirstBall);
                    goalBallNumbersS.push(goalBallNumbers);
                }
            }
        }
        async.map(goalBallNumbersS, function (item, callback) {
            matchRedBallsFirstAndSecondAndThird(collection, item, function (result) {
                callback(result);
            })
        }, function (err, results) {
            if (err) {
                console.error(err);
            }
            else {
                callback(results);
            }
        });
    }
};

//利用matchRedBallsFirstToFour方法,找出有四个红球匹配的情况,是绝对匹配,返回一个二元数组
exports.matchRedBallsFour = function (collection, redBallNumbers, callback) {
    if (typeof(redBallNumbers) != 'object' && redBallNumbers.length != 6) {
        console.log('this array of redBallNumbers is not valid');
    }
    else {
        var goalBallNumbersS = [];
        for (let i = 0; i < redBallNumbers.length - 3; i++) {
            for (let j = i + 1; j < redBallNumbers.length - 2; j++) {
                for (let k = j + 1; k < redBallNumbers.length - 1; k++) {
                    for (let l = k + 1; l < redBallNumbers.length; l++) {
                        var goalBallNumbers = [];
                        for (let m = 0; m < redBallNumbers.length; m++) {
                            goalBallNumbers.push(redBallNumbers[m]);
                        }
                        var goalFirstBall = redBallNumbers[i];
                        var goalSecondBall = redBallNumbers[j];
                        var goalThirdBall = redBallNumbers[k];
                        var goalForthBall = redBallNumbers[l];
                        goalBallNumbers.splice(l, 1);
                        goalBallNumbers.splice(k, 1);
                        goalBallNumbers.splice(j, 1);
                        goalBallNumbers.splice(i, 1);
                        goalBallNumbers.unshift(goalForthBall);
                        goalBallNumbers.unshift(goalThirdBall);
                        goalBallNumbers.unshift(goalSecondBall);
                        goalBallNumbers.unshift(goalFirstBall);
                        goalBallNumbersS.push(goalBallNumbers);
                    }
                }
            }
        }
        async.map(goalBallNumbersS, function (item, callback) {
            matchRedBallsFirstToFour(collection, item, function (result) {
                callback(result);
            })
        }, function (err, results) {
            if (err) {
                console.error(err);
            }
            else {
                callback(results);
            }
        });
    }
};

//利用matchRedBallsFirstToFive方法,找出有五个红球匹配的情况,是绝对匹配,返回一个二元数组
exports.matchRedBallsFive = function (collection, redBallNumbers, callback) {
    if (typeof(redBallNumbers) != 'object' && redBallNumbers.length != 6) {
        console.log('this array of redBallNumbers is not valid');
    }
    else {
        var goalBallNumbersS = [];
        for (let i = 0; i < redBallNumbers.length - 4; i++) {
            for (let j = i + 1; j < redBallNumbers.length - 3; j++) {
                for (let k = j + 1; k < redBallNumbers.length - 2; k++) {
                    for (let l = k + 1; l < redBallNumbers.length - 1; l++) {
                        for (let m = l + 1; m < redBallNumbers.length; m++) {
                            var goalBallNumbers = [];
                            for (let n = 0; n < redBallNumbers.length; n++) {
                                goalBallNumbers.push(redBallNumbers[n]);
                            }
                            var goalFirstBall = redBallNumbers[i];
                            var goalSecondBall = redBallNumbers[j];
                            var goalThirdBall = redBallNumbers[k];
                            var goalForthBall = redBallNumbers[l];
                            var goalFifthBall = redBallNumbers[m];
                            goalBallNumbers.splice(m, 1);
                            goalBallNumbers.splice(l, 1);
                            goalBallNumbers.splice(k, 1);
                            goalBallNumbers.splice(j, 1);
                            goalBallNumbers.splice(i, 1);
                            goalBallNumbers.unshift(goalFifthBall);
                            goalBallNumbers.unshift(goalForthBall);
                            goalBallNumbers.unshift(goalThirdBall);
                            goalBallNumbers.unshift(goalSecondBall);
                            goalBallNumbers.unshift(goalFirstBall);
                            goalBallNumbersS.push(goalBallNumbers);
                        }
                    }
                }
            }
        }
        async.map(goalBallNumbersS, function (item, callback) {
            matchRedBallsFirstToFive(collection, item, function (result) {
                callback(result);
            })
        }, function (err, results) {
            if (err) {
                console.error(err);
            }
            else {
                callback(results);
            }
        });
    }
};

var matchRedBallsFirstAndSecond = function (collection, redBallNumbers, callback) {
    if (typeof(redBallNumbers) != 'object' && redBallNumbers.length != 6) {
        console.log('this array of redBallNumbers is not valid');
    }
    else {
        collection.find({$or: [{'numberOne': redBallNumbers[0]}, {'numberTwo': redBallNumbers[0]}, {'numberThree': redBallNumbers[0]}, {'numberFour': redBallNumbers[0]}, {'numberFive': redBallNumbers[0]}, {'numberSix': redBallNumbers[0]}]}).toArray(function (err, docs) {
            if (err) {
                console.error(err);
            }
            else {
                async.filter(docs, function (item, callback) {
                    callback(null, matchNumber(item, redBallNumbers[1]));
                }, function (err, resultOne) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        async.filter(resultOne, function (item, callback) {
                            callback(null, !matchNumber(item, redBallNumbers[2]));
                        }, function (err, resultTwo) {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                async.filter(resultTwo, function (item, callback) {
                                    callback(null, !matchNumber(item, redBallNumbers[3]));
                                }, function (err, resultThree) {
                                    if (err) {
                                        console.error(err);
                                    }
                                    else {
                                        async.filter(resultThree, function (item, callback) {
                                            callback(null, !matchNumber(item, redBallNumbers[4]));
                                        }, function (err, resultFour) {
                                            if (err) {
                                                console.error(err);
                                            }
                                            else {
                                                async.filter(resultFour, function (item, callback) {
                                                    callback(null, !matchNumber(item, redBallNumbers[5]));
                                                }, function (err, resultFive) {
                                                    if (err) {
                                                        console.error(err);
                                                    }
                                                    else {
                                                        console.log(resultFive);
                                                        callback(resultFive);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
};

var matchRedBallsFirstAndSecondAndThird = function (collection, redBallNumbers, callback) {
    if (typeof(redBallNumbers) != 'object' && redBallNumbers.length != 6) {
        console.log('this array of redBallNumbers is not valid');
    }
    else {
        collection.find({$or: [{'numberOne': redBallNumbers[0]}, {'numberTwo': redBallNumbers[0]}, {'numberThree': redBallNumbers[0]}, {'numberFour': redBallNumbers[0]}, {'numberFive': redBallNumbers[0]}, {'numberSix': redBallNumbers[0]}]}).toArray(function (err, docs) {
            if (err) {
                console.error(err);
            }
            else {
                async.filter(docs, function (item, callback) {
                    callback(null, matchNumber(item, redBallNumbers[1]));
                }, function (err, resultOne) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        async.filter(resultOne, function (item, callback) {
                            callback(null, matchNumber(item, redBallNumbers[2]));
                        }, function (err, resultTwo) {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                async.filter(resultTwo, function (item, callback) {
                                    callback(null, !matchNumber(item, redBallNumbers[3]));
                                }, function (err, resultThree) {
                                    if (err) {
                                        console.error(err);
                                    }
                                    else {
                                        async.filter(resultThree, function (item, callback) {
                                            callback(null, !matchNumber(item, redBallNumbers[4]));
                                        }, function (err, resultFour) {
                                            if (err) {
                                                console.error(err);
                                            }
                                            else {
                                                async.filter(resultFour, function (item, callback) {
                                                    callback(null, !matchNumber(item, redBallNumbers[5]));
                                                }, function (err, resultFive) {
                                                    if (err) {
                                                        console.error(err);
                                                    }
                                                    else {
                                                        callback(resultFive);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
};

var matchRedBallsFirstToFour = function (collection, redBallNumbers, callback) {
    if (typeof(redBallNumbers) != 'object' && redBallNumbers.length != 6) {
        console.log('this array of redBallNumbers is not valid');
    }
    else {
        collection.find({$or: [{'numberOne': redBallNumbers[0]}, {'numberTwo': redBallNumbers[0]}, {'numberThree': redBallNumbers[0]}, {'numberFour': redBallNumbers[0]}, {'numberFive': redBallNumbers[0]}, {'numberSix': redBallNumbers[0]}]}).toArray(function (err, docs) {
            if (err) {
                console.error(err);
            }
            else {
                async.filter(docs, function (item, callback) {
                    callback(null, matchNumber(item, redBallNumbers[1]));
                }, function (err, resultOne) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        async.filter(resultOne, function (item, callback) {
                            callback(null, matchNumber(item, redBallNumbers[2]));
                        }, function (err, resultTwo) {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                async.filter(resultTwo, function (item, callback) {
                                    callback(null, matchNumber(item, redBallNumbers[3]));
                                }, function (err, resultThree) {
                                    if (err) {
                                        console.error(err);
                                    }
                                    else {
                                        async.filter(resultThree, function (item, callback) {
                                            callback(null, !matchNumber(item, redBallNumbers[4]));
                                        }, function (err, resultFour) {
                                            if (err) {
                                                console.error(err);
                                            }
                                            else {
                                                async.filter(resultFour, function (item, callback) {
                                                    callback(null, !matchNumber(item, redBallNumbers[5]));
                                                }, function (err, resultFive) {
                                                    if (err) {
                                                        console.error(err);
                                                    }
                                                    else {
                                                        callback(resultFive);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
};

var matchRedBallsFirstToFive = function (collection, redBallNumbers, callback) {
    if (typeof(redBallNumbers) != 'object' && redBallNumbers.length != 6) {
        console.log('this array of redBallNumbers is not valid');
    }
    else {
        collection.find({$or: [{'numberOne': redBallNumbers[0]}, {'numberTwo': redBallNumbers[0]}, {'numberThree': redBallNumbers[0]}, {'numberFour': redBallNumbers[0]}, {'numberFive': redBallNumbers[0]}, {'numberSix': redBallNumbers[0]}]}).toArray(function (err, docs) {
            if (err) {
                console.error(err);
            }
            else {
                async.filter(docs, function (item, callback) {
                    callback(null, matchNumber(item, redBallNumbers[1]));
                }, function (err, resultOne) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        async.filter(resultOne, function (item, callback) {
                            callback(null, matchNumber(item, redBallNumbers[2]));
                        }, function (err, resultTwo) {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                async.filter(resultTwo, function (item, callback) {
                                    callback(null, matchNumber(item, redBallNumbers[3]));
                                }, function (err, resultThree) {
                                    if (err) {
                                        console.error(err);
                                    }
                                    else {
                                        async.filter(resultThree, function (item, callback) {
                                            callback(null, matchNumber(item, redBallNumbers[4]));
                                        }, function (err, resultFour) {
                                            if (err) {
                                                console.error(err);
                                            }
                                            else {
                                                async.filter(resultFour, function (item, callback) {
                                                    callback(null, !matchNumber(item, redBallNumbers[5]));
                                                }, function (err, resultFive) {
                                                    if (err) {
                                                        console.error(err);
                                                    }
                                                    else {
                                                        callback(resultFive);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
};

//该方法是对数据中各个球的情况进行匹配,当有一个球相同,就返回true, 一个球都没有相同的时候,就返回false
var matchNumber = function (fileData, number) {
    if (fileData.numberOne == number || fileData.numberTwo == number || fileData.numberThree == number || fileData.numberFour == number || fileData.numberFive == number || fileData.numberSix == number) {
        return true;
    }
    else {
        return false;
    }
};

var copyArray = function(array) {
    var newArray = [];
    for(let i=0; i<array.length; i++) {
        newArray.push(array[i]);
    }
    return newArray;
};