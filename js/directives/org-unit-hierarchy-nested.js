'use strict'

module.exports = function($compile) {
  return {
    restrict: 'EA',
    template: '<div/>',
    scope: {
      orgUnit: '=',
      selected: '='
    },
    link: function(scope, element){
      if (scope.orgUnit) {
        element.append('<org-unit-hierarchy org-unit="orgUnit" selected="selected"></org-unit-hierarchy>')
        $compile(element.contents())(scope)
      }
    }
  }
}
