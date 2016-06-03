'use strict'

module.exports = function ($scope, $window, State) {
  $scope.orgunit = {}

  $scope.next = function (orgunit) {
    if (orgunit.long && orgunit.lat) {
      orgunit.coordinates = '[' + orgunit.long + ',' + orgunit.lat + ']'
    }
    delete orgunit.long
    delete orgunit.lat

    State.setOrgunit(orgunit)
    console.log('Added orgunit to state: ', State.getOrgunit())

    $window.location.href = 'index.html#/match'
  }
}
