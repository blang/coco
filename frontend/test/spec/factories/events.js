'use strict';

describe('Providers: EventsFactory', function () {

  beforeEach(module('cocoApp'));

  var factory;

  beforeEach(inject(function (EventsFactory) {
    factory = EventsFactory;
  }));
  it('should attach a list of navigation items to the scope', function () {
    expect(factory.getEvents).toBeDefined();
    expect(factory.getEvents().length).toBeGreaterThan(0);
    expect(factory.getEvents()[0].id).toBeGreaterThan(0);
  });

  it('should provide a proper selector by id', function(){
    expect(factory.getEventById).toBeDefined();
    expect(factory.getEventById(1)).toBeDefined();
    expect(factory.getEventById(1).id).toEqual(1);
  });
});
