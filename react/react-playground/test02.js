const getPrice = percent => price => price * percent;
const getPrice2 = function getPrice2(percent) {
  return function (price) {
    return price * percent;
  };
};
const getPrice3 = getPrice(percent)`${price * percent}`;
