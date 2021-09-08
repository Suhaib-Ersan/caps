"use strict";

const faker = require("faker");

let order = {
  store: faker.company.companyName(),
  orderID: faker.datatype.uuid(),
  customer: faker.name.findName(),
  address: `${faker.address.streetName}, ${faker.address.cityName()}`,
};

describe("HUB test", () => {
  it("should test pickup event listener", () => {
    // const consoleSpy = jest.spyOn(console, 'log');

    const events = require("../HUB.js");
    events.emit("pickup", order);


    // expect(consoleSpy).toHaveBeenCalledWith('hello');
  });

  it("should test inTransit event listener", () => {
    // const consoleSpy = jest.spyOn(console, 'log');

    const events = require("../HUB.js");
    events.emit("inTransit", order);


    //  expect(consoleSpy).toHaveBeenCalledWith('hello');
  });

  it("should test delivered event listener", () => {
    // const consoleSpy = jest.spyOn(console, 'log');

    const events = require("../HUB.js");
    events.emit("delivered", order);


    // expect(consoleSpy).toHaveBeenCalledWith();
  });
});

describe("driver test", () => {
  it("should test pickup event listener", () => {
    // const consoleSpy = jest.spyOn(console, 'log');

    const driver = require("../src/driver.js");
    driver.emit("pickup", order);

    // expect(consoleSpy).toHaveBeenCalledWith('hello');
  });
});

describe("vendor test", () => {
  it("should test delivered event listener", () => {
    // const consoleSpy = jest.spyOn(console, 'log');

    const vendor = require("../src/vendor.js");
    vendor.emit("delivered", order);

    // expect(consoleSpy).toHaveBeenCalledWith('hello');
  });
});
