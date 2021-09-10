"use strict";

const faker = require("faker");

const io = require("socket.io")(3050);
const hub = io.of("/hub");

const messageQueue = {
  driverData: {},
  vendorData: {},
};

// function driverGetMessages() {
//   Object.keys(messageQueue.driverData).forEach((key) => {
//     io.emit("driverPickup", messageQueue.driverData[key]);
//   });
// }

// function vendorGetMessages() {
//   Object.keys(messageQueue.vendorData).forEach((key) => {
//     io.emit("post-delivery", messageQueue.vendorData[key]);
//   });
// }

hub.on("connection", (socket) => {
  console.log("connected to HUB");

  socket.on("driverGetMessages", () => {
    Object.keys(messageQueue.driverData).forEach((key) => {
      io.emit("driverPickup", messageQueue.driverData[key]);
    });
  });
  socket.on("vendorGetMessages", () => {
    Object.keys(messageQueue.vendorData).forEach((key) => {
          io.emit("vendorDelivered", messageQueue.vendorData[key]);
        });
  });

  socket.on("hubPickup", (order) => {
    socket.join(order.store);

    console.log("EVENT ", {
      event: "pickup",
      time: new Date(),
      payload: order,
    });

    let uuid = faker.datatype.uuid();
    messageQueue.driverData[uuid] = orderId;

    hub.emit("driverPickup", orderId);
  });

  socket.on("hubInTransit", (order) => {
    console.log("socket > ", socket);
    console.log("EVENT ", {
      event: "inTransit",
      time: new Date(),
      payload: order,
    });

    let uuid = faker.datatype.uuid();
    messageQueue.vendorData[uuid] = orderId;

    Object.keys(messageQueue.vendorData).forEach((key, idx) => {
      delete messageQueue.vendorData[messageQKeys[idx]];
    });

    hub.emit("driverInTransit", orderId);
  });

  socket.on("hubDelivered", (order) => {
    console.log("EVENT ", {
      event: "delivered",
      time: new Date(),
      payload: order,
    });

    Object.keys(messageQueue.vendorData).forEach((key, idx) => {
      delete messageQueue.vendorData[messageQKeys[idx]];
    });
  });
});

module.exports = { hub, driverGetMessages, vendorGetMessages };
