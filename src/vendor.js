"use strict";

const events = require("../events.js");
const faker = require("faker");

setInterval(() => {
  let order = {
    store: faker.company.companyName(),
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.streetName()}, ${faker.address.cityName()}`,
  };
  events.emit("pickup", order);
}, 6000);

events.on("delivered", (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
});
