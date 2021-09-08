"use strict";

const events = require("./events.js");

require("./src/vendor.js");
require("./src/driver.js");

events.on("pickup", (order) => {
  console.log("EVENT ", {
    event: "pickup",
    time: new Date(),
    payload: order,
  });
});

events.on("inTransit", (order) => {
  console.log("EVENT ", {
    event: "inTransit",
    time: new Date(),
    payload: order,
  });
});

events.on("delivered", (order) => {
  console.log("EVENT ", {
    event: "delivered",
    time: new Date(),
    payload: order,
  });
});

