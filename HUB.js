"use strict";

const socketIo = require("socket.io")(3050);
const io = socketIo.of("/hub");

io.on("connection", (socket) => {
  console.log('connected to HUB');

  socket.on("pickup", (order) => {
    socket.join(order.store);

    console.log("EVENT ", {
      event: "pickup",
      time: new Date(),
      payload: order,
    });

    io.emit("pickup", payload);
  });

  socket.on("inTransit", (order) => {
    console.log("EVENT ", {
      event: "inTransit",
      time: new Date(),
      payload: order,
    });

    io.emit("inTransit", payload);
  });

  socket.on("delivered", (order) => {
    console.log("EVENT ", {
      event: "delivered",
      time: new Date(),
      payload: order,
    });

    io.emit("delivered", payload);
  });
});

module.exports = { io };
