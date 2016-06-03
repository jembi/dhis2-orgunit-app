var tap = require('tap')
var sinon = require('sinon')
var hierarchy = require('../js/controllers/hierarchy')
var State = require('../js/services/state')

tap.test('Hierarchy Controller', function (t) {
  // given
  var $scope = {}
  var Api = {
    OrgUnitRoot: {
      get: sinon.stub().callsArgWith(0, { organisationUnits: [ { name: 'test1' }, { name: 'test2' } ] })
    }
  }

  // when
  hierarchy($scope, Api, {}, {}, {})

  // then
  t.equals($scope.selectDst.selected, null, 'selected should be set to null')
  t.same($scope.roots, [ { name: 'test1' }, { name: 'test2' } ], 'should fetch orgunit roots from Api')
  t.ok($scope.next, 'next() function should be added to  scope')
  t.end()
})

tap.test('Hierarchy Controller - error case', function (t) {
  // given
  var $scope = {}
  var Api = {
    OrgUnitRoot: {
      get: sinon.stub().callsArgWith(1, 'error')
    }
  }
  sinon.spy(console, 'error')

  // when
  hierarchy($scope, Api, {}, {}, {})

  // then
  t.true(console.error.called, 'errors should be logged')
  t.end()
})

tap.test('Hierarchy Controller - .next()', function (t) {
  // given
  var $scope = {}
  var Api = {
    OrgUnitRoot: {
      get: sinon.spy()
    }
  }
  var state = State()
  var $window = { location: {} }

  hierarchy($scope, Api, state, $window)

  // when
  $scope.next({ id: '123' })

  // then
  t.same(state.getParent(), { id: '123' }, 'Parent should be set in state')
  t.equals($window.location.href, 'index.html#/add-site', 'should redirect to add-site page')
  t.end()
})
