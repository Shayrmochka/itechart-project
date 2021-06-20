"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
var getPrice = function (order) {
    var resultPrice = 0;
    var resultTime = 0;
    var bigRoom = 5;
    var smallRoom = 3;
    var bathRoom = 10;
    var bigRoomCounter = 0;
    var smallRoomCounter = 0;
    var bathRoomCounter = 0;
    var rooms = [];
    for (var key in order) {
        if (key.startsWith('room')) {
            rooms.push(order[key]);
            if (+order[key] <= 20) {
                smallRoomCounter++;
                resultPrice += smallRoom;
            }
            else {
                bigRoomCounter++;
                resultPrice += bigRoom;
            }
        }
    }
    if (order.bathrooms > 0) {
        bathRoomCounter = +order.bathrooms;
        resultPrice += +order.bathrooms * bathRoom;
    }
    resultPrice *= +order.servicePrice;
    resultTime = resultPrice * +order.servicePrice * 5;
    resultTime = +resultTime.toFixed();
    resultPrice += resultPrice / order.priceList;
    resultPrice = +resultPrice.toFixed();
    return {
        resultPrice: resultPrice,
        resultTime: resultTime,
        bathRoomCounter: bathRoomCounter,
        smallRoomCounter: smallRoomCounter,
        bigRoomCounter: bigRoomCounter,
    };
};
exports.default = getPrice;
