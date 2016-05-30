var tap = require('tap')
var sinon = require('sinon')
var addSite = require('../js/controllers/add-site')

tap.test('Add Site controller - .next()', function (t) {
  var $scope = {}
  var orgunit = { name: 'test', shortName: 't', openingDate: new Date(), long: '45', lat: '135' }
  var $window = { location: { href: 'index.html#/add-site' } }
  var State = { setOrgunit: sinon.spy(), getOrgunit: sinon.spy() }
  addSite($scope, $window, State)
  $scope.next(orgunit)
  t.true(State.setOrgunit.calledWith(orgunit), 'should set orgunit in state')
  var callOrgunit = State.setOrgunit.getCall(0).args[0]
  t.equals(callOrgunit.long, undefined, '.long should be removed')
  t.equals(callOrgunit.lat, undefined, '.lat should be removed')
  t.equals(callOrgunit.coordinates, '[45,135]', '.coordinates should be set correctly')
  t.equals($window.location.href, 'index.html#/match', 'should redirect to match page')
  t.end()
})
