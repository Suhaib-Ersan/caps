"use strict";

const io = require("socket.io-client");
const hubConnection = io.connect(`http://localhost:3050/hub`);

// let { driverGetMessages } = require("../../HUB.js");

hubConnection.emit("driverGetMessages");

driverGetMessages();
let timing1;
let timing2
hubConnection.on("driverPickup", (order) => {
  timing1 = parseInt(Math.random() * 1000);
  timing2 = parseInt(Math.random() * (timing1 + 4900));

  setTimeout(() => {
    console.log(`DRIVER: picked up order ${order.orderID}`);
    hubConnection.emit("hubInTransit", order);
  }, timing1);

  
});

hubConnection.on("driverInTransit", (order) => {
  setTimeout(() => {
    console.log(`DRIVER: delivered order ${order.orderID}`);
    hubConnection.emit("vendorDelivered", order);
  }, timing2);
})