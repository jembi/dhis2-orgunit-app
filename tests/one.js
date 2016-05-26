var tap = require('tap')
var one = require('../js/controllers/one')

tap.test('Controller One .clear()', function (t) {
  var $scope = { text: 'something' }
  one($scope)
  $scope.clear()
  t.equals($scope.text, '', 'text should be cleared')
  t.end()
})
