var tap = require('tap')
var sinon = require('sinon')
var match = require('../js/controllers/match')
var State = require('../js/services/state')

tap.test('Match controller - maches found case', function (t) {
  // given
  var state = State()
  state.setOrgunit({ name: 'test' })
  state.setParent({ id: 'parentId' })

  var Api = {
    Match: {
      get: sinon.stub().callsArgWith(1, { entry: [ { name: 'test' } ] })
    }
  }

  var $scope = {}

  // when
  match($scope, Api, state)

  // then
  t.ok($scope.orgunit, 'Orgunit should be set')
  t.ok($scope.orgunit.parent, 'Parent should be set')
  t.true(Api.Match.get.calledWith({ name: 'test' }), 'matching service should be called')
  t.true($scope.hasMatches)
  t.equals($scope.matches[0].name, 'test', 'the returns entries should be set on the scope')
  t.end()
})

tap.test('Match controller - no matches found case', function (t) {
  // given
  var state = State()
  state.setOrgunit({ name: 'test' })
  state.setParent({ id: 'parentId' })

  var Api = {
    Match: {
      get: sinon.stub().callsArgWith(1, {})
    },
    OrgUnit: {
      save: sinon.spy()
    }
  }

  var $scope = {}

  // when
  match($scope, Api, state)

  // then
  t.ok($scope.orgunit, 'Orgunit should be set')
  t.ok($scope.orgunit.parent, 'Parent should be set')
  t.true(Api.Match.get.calledWith({ name: 'test' }), 'matching service should be called')
  t.end()
})

tap.test('Match controller - error case', function (t) {
  // given
  var state = State()
  state.setOrgunit({ name: 'test' })
  state.setParent({ id: 'parentId' })

  var Api = {
    Match: {
      get: sinon.stub().callsArg(2)
    }
  }

  var $scope = {}

  // when
  match($scope, Api, state)

  // then
  t.ok($scope.orgunit, 'Orgunit should be set')
  t.ok($scope.orgunit.parent, 'Parent should be set')
  t.true(Api.Match.get.calledWith({ name: 'test' }), 'matching service should be called')
  t.equals($scope.errorText, 'Failed to contact matching service', 'should return an error')
  t.end()
})

tap.test('Match controller $scope.saveOrgunit() - success case', function (t) {
  // given
  var state = State()
  state.setOrgunit({ name: 'test' })
  state.setParent({ id: 'parentId' })

  var Api = {
    Match: {
      get: sinon.stub().callsArgWith(1, { entry: [ { name: 'test' } ] })
    },
    OrgUnit: {
      save: sinon.stub().callsArgWith(1, {})
    }
  }

  var $scope = {}
  match($scope, Api, state)

  // when
  $scope.saveOrgunit()

  // then
  t.true(Api.OrgUnit.save.called)
  t.false($scope.hasMatches)
  t.end()
})

tap.test('Match controller $scope.saveOrgunit() - import conflicts case', function (t) {
  // given
  var state = State()
  state.setOrgunit({ name: 'test' })
  state.setParent({ id: 'parentId' })

  var Api = {
    Match: {
      get: sinon.stub().callsArgWith(1, { entry: [ { name: 'test' } ] })
    },
    OrgUnit: {
      save: sinon.stub().callsArgWith(1, { importConflicts: [ { value: 'error1' }, { value: 'error2' } ] })
    }
  }

  var $scope = {}
  match($scope, Api, state)

  // when
  $scope.saveOrgunit()

  // then
  t.true(Api.OrgUnit.save.called)
  t.equals($scope.errorText, 'Error: OrgUnit not be created:\nerror1\nerror2\n')
  t.end()
})

tap.test('Match controller $scope.saveOrgunit() - server error case', function (t) {
  // given
  var state = State()
  state.setOrgunit({ name: 'test' })
  state.setParent({ id: 'parentId' })

  var Api = {
    Match: {
      get: sinon.stub().callsArgWith(1, { entry: [ { name: 'test' } ] })
    },
    OrgUnit: {
      save: sinon.stub().callsArg(2)
    }
  }

  var $scope = {}
  match($scope, Api, state)

  // when
  $scope.saveOrgunit()

  // then
  t.true(Api.OrgUnit.save.called)
  t.equals($scope.errorText, 'Error: OrgUnit not be created, server error')
  t.end()
})
