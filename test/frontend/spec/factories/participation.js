'use strict';

describe('Providers: ParticipationFactory', function () {

  beforeEach(module('cocoApp'));

  var factory,
    $q;

  beforeEach(inject(function (ParticipationFactory, _$q_) {
    factory = ParticipationFactory;
    $q = _$q_;
  }));
  it('should provide participation getter by eventid', function () {
    expect(factory.getParticipationByEventId).toBeDefined();
  });
});
