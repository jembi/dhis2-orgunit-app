'use strict'

module.exports = function ($scope, Api, State) {
  $scope.orgunit = State.getOrgunit()
  $scope.orgunit.parent = State.getParent()

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

  $scope.saveOrgunit = function (orgunit) {
    Api.OrgUnit.save(orgunit, function (res) {
      if (res.importConflicts) {
        $scope.errorText = 'Error: OrgUnit not be created:'
        res.importConflicts.forEach(function (i) {
          $scope.errorText += i.value + '\n'
        })
      } else {
        $scope.hasMatches = false
      }
      console.log(res)
    }, function (res) {
      $scope.errorText = 'Error: OrgUnit not be created, server error'
    })
  }
}
