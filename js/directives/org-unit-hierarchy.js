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

          if (typeof scope.orgUnit.collapse === 'undefined') {
            // collapsed by default
            scope.orgUnit.collapse = true
          }

          if (!orgUnit.loaded) {
            Api.OrgUnitChildren.get({ uid: orgUnit.id }, function (result) {
                orgUnit.children = result.children
                orgUnit.loaded = true
              },
              errorHandler
            )
          }
        }
      })

      var errorHandler =  function(err) {
        console.error(err)
      }

      var selectOrgUnit = function(orgUnit) {
        scope.selected.selected = orgUnit

        if (!orgUnit.children) {
          orgUnit.collapse = false
        } else if (orgUnit.children.length > 0) {
          orgUnit.collapse = !orgUnit.collapse
        }
      }

      scope.selectOrgUnit = selectOrgUnit
    }
  }
}
