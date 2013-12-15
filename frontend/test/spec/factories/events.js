'use strict';

describe('Providers: EventsFactory', function () {

  beforeEach(module('cocoApp'));

  var factory;
  beforeEach(inject(function (EventsFactory) {
    factory = EventsFactory;
  }));
  it('should attach a list of navigation items to the scope', function () {
    expect(factory.getEvents).toBeDefined();
  });

  it('should provide a proper selector by id', function(){
    expect(factory.getEventById).toBeDefined();
  });
});
