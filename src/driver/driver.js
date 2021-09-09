"use strict";

const io = require("socket.io-client");
const hubConnection = io.connect(`http://localhost:3050/hub`);

hubConnection.on("pickup", (order) => {
  let timing1 = parseInt(Math.random() * 1000);
  let timing2 = parseInt(Math.random() * (timing1 + 4900));

  setTimeout(() => {
    console.log(`DRIVER: picked up order ${order.orderID}`);
    hubConnection.emit("inTransit", order);
  }, timing1);

  setTimeout(() => {
    console.log(`DRIVER: delivered order ${order.orderID}`);
    hubConnection.emit("delivered", order);
  }, timing2);
});
