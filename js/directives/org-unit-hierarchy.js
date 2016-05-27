'use strict'

module.exports = function(Api) {
  return{
    restrict: 'EA',
    templateUrl: 'views/partials/org-unit-hierarchy.html',
    scope: {
      orgUnit: '=',
      selected: '='
    },
    link: function(scope) {
      scope.$watch('orgUnit', function(orgUnit) {
        if (orgUnit) {
          scope.orgUnit = orgUnit
        }
      })

      var errorHandler =  function(err) {
        console.error(err)
      }

      var selectOrgUnit = function(orgUnit) {
        scope.selected.selected = orgUnit

        if (!orgUnit.children) {
          orgUnit.collapse = false

          Api.OrgUnitChildren.get({ uid: orgUnit.id }, function (result) {
              orgUnit.children = result.children
            },
            errorHandler
          )
        } else {
          orgUnit.collapse = !orgUnit.collapse
        }
      }

      scope.selectOrgUnit = selectOrgUnit
    }
  }
}
