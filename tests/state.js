var tap = require('tap')
var State = require('../js/services/state')

tap.test('State service', function (t) {
  var state = State()
  t.equals(state.getOrgunit(), undefined, 'should return undefined if orgunit not set')
  t.equals(state.getParent(), undefined, 'should return undefined if parent not set')
  var orgunit = { name: 'test', shortName: 't', openingDate: new Date() }
  var parent = { id: 'qJfsArAw5mw' }
  state.setOrgunit(orgunit)
  state.setParent(parent)
  t.equals(state.getOrgunit(), orgunit, 'should set and return orgunit')
  t.equals(state.getParent(), parent, 'should set and return parent')
  t.end()
})
