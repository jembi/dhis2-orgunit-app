'use strict'

module.exports = function ($scope, Api) {
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

  loadRootOrgUnit()
}
