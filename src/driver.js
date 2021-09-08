"use strict";

const events = require("../events.js");

events.on("pickup", (order) => {
  let timing1 = parseInt(Math.random() * 1000);
  let timing2 = parseInt(Math.random() * timing1+4900);

  setTimeout(() => {
    console.log(`DRIVER: picked up order ${order.orderID}`);
    events.emit("inTransit", order);
  }, timing1);

  setTimeout(() => {
    console.log(`DRIVER: delivered order ${order.orderID}`);
    events.emit("delivered", order);
  }, timing2);
});
