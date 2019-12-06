const getPrice = percent => price => (1 - percent) * price;
const tenPercentOff = getPrice(0.1);
const twoPercentOff = getPrice(0.2);

const price = tenPercentOff(10000);
const price2 = twoPercentOff(20000);
