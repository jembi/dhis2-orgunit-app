'use strict'

module.exports = function ($scope, Api, State, $window) {
  var errorHandler =  function(err) {
    console.error(err)
  }

  var loadRootOrgUnit = function() {
    var onSuccess = function(result) {
      $scope.roots = result.organisationUnits
    }

    Api.OrgUnitRoot.get(onSuccess, errorHandler)
  }

  $scope.selectDst = {
    selected: null
  }

  $scope.next = function (parent) {
    State.setParent(parent)
    $window.location.href = 'index.html#/add-site'
  }

  loadRootOrgUnit()
}
