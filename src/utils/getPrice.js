export const getPrice = (order) => {
  let resultPrice = 0;
  let resultTime = 0;
  const bigRoom = 5;
  const smallRoom = 3;
  const bathRoom = 10;

  let bigRoomCounter = 0;
  let smallRoomCounter = 0;
  let bathRoomCounter = 0;
  console.log(order);
  const rooms = [];
  for (let key in order) {
    if (key.startsWith("room")) {
      rooms.push(order[key]);
      if (+order[key] <= 20) {
        smallRoomCounter++;
        resultPrice += smallRoom;
      } else {
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
    resultPrice,
    resultTime,
    bathRoomCounter,
    smallRoomCounter,
    bigRoomCounter,
  };
};
