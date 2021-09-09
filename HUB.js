"use strict";

const io = require("socket.io")(3050);
const hub = io.of("/hub");

hub.on("connection", (socket) => {
  console.log('connected to HUB');

  socket.on("pickup", (order) => {
    socket.join(order.store);

    console.log("EVENT ", {
      event: "pickup",
      time: new Date(),
      payload: order,
    });

    hub.emit("pickup", order);
  });

  socket.on("inTransit", (order) => {
    console.log('socket > ',socket);
    console.log("EVENT ", {
      event: "inTransit",
      time: new Date(),
      payload: order,
    });

    hub.emit("inTransit", order);
  });

  socket.on("delivered", (order) => {
    console.log("EVENT ", {
      event: "delivered",
      time: new Date(),
      payload: order,
    });

    hub.emit("delivered", order);
  });
});

module.exports = hub;
