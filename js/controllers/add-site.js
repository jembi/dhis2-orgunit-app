'use strict'

module.exports = function ($scope, $resource, $http, $mdToast) {
  var OrgUnit = $resource('/api/organisationUnits')
  $scope.orgunit = {}

  $scope.submit = function () {
    var orgunit = $scope.orgunit
    if (orgunit.long && orgunit.lat) {
      orgunit.coordinates = '[' + orgunit.long + ',' + orgunit.lat + ']'
    }
    delete orgunit.long
    delete orgunit.lat

    console.log(orgunit)

    OrgUnit.save(orgunit, function (res) {
      if (res.importConflicts) {
        var text = 'Error: OrgUnit not be created:\n'
        res.importConflicts.forEach(function (i) {
          text += i.value + '\n'
        })
        $mdToast.showSimple(text)
      } else {
        $mdToast.showSimple('Orgunit created.')
      }
      console.log(res)
    }, function (res) {
      $mdToast.showSimple('Error: OrgUnit not be created, server error')
      console.error('Error: OrgUnit not be created, server error', res)
    })
  }

  $scope.test = function () {
    $mdToast.showSimple('Hello')
  }
}
