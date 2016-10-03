'use strict'

module.exports = function ($scope, Api, State) {
  $scope.orgunit = State.getOrgunit()
  $scope.orgunit.parent = State.getParent()

  $scope.saveOrgunit = function (orgunit) {
    Api.OrgUnit.save(orgunit, function (res) {
      if (res.importConflicts) {
        $scope.errorText = 'Error: OrgUnit not be created:\n'
        res.importConflicts.forEach(function (i) {
          $scope.errorText += i.value + '\n'
        })
      } else {
        $scope.hasMatches = false
      }
    }, function (res) {
      $scope.errorText = 'Error: OrgUnit not be created, server error'
    })
  }

  Api.Match.get({ name: $scope.orgunit.name }, function (results) {
    if (!results.entry || results.entry.length === 0) {
      $scope.saveOrgunit($scope.orgunit)
    } else {
      $scope.hasMatches = true
      $scope.matches = results.entry
    }
  }, function (res) {
    $scope.errorText = 'Failed to contact matching service'
  })
}
