'use strict';

describe('Providers: SlotsFactory', function () {

  beforeEach(module('cocoApp'));

  var factory;

  beforeEach(inject(function (SlotsFactory) {
    factory = SlotsFactory;
  }));
  it('should return a list of slots by event', function () {
    expect(factory.getSlotsByEventId).toBeDefined();
    expect(factory.getSlotsByEventId(1).length).toBeGreaterThan(0);
    expect(factory.getSlotsByEventId(1)[0].id).toBeGreaterThan(0);
  });

});
