"use strict";

const io = require("socket.io-client");
const hubConnection = io.connect(`http://localhost:3050/hub`);

const faker = require("faker");

setInterval(() => {
  let order = {
    store: faker.company.companyName(),
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.streetName()}, ${faker.address.cityName()}`,
  };
  hubConnection.emit("pickup", order);
}, 6000);

hubConnection.on("delivered", (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
});
