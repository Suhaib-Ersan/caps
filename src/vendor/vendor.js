"use strict";

const io = require("socket.io-client");
const hubConnection = io.connect(`http://localhost:3050/hub`);

// let { vendorGetMessages } = require("../../HUB.js");

const faker = require("faker");


vendorGetMessages();

hubConnection.emit("vendorGetMessages");

setInterval(() => {
  let order = {
    store: faker.company.companyName(),
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.streetName()}, ${faker.address.cityName()}`,
  };
  hubConnection.emit("hubPickup", order);
}, 6000);

hubConnection.on("vendorDelivered", (order) => {
  console.log(`VENDOR: Thank you for delivering ${order.orderID}`);
  hubConnection.emit("hubDelivered", order);
});
