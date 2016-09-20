describe('test app', function() {
  var $rootScope;

  beforeEach(module('app'));

  beforeEach(inject(function( _$rootScope_ ) {
    $rootScope = _$rootScope_;
  }));

  it('should pass', function() {
    expect(true).toBe(true);
  });

});
