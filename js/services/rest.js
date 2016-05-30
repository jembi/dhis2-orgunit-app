'use strict'

module.exports = function($rootScope, $resource) {
  return {
    OrgUnitRoot: $resource('/api/organisationUnits.json?paging=false&level=1'),
    OrgUnitChildren: $resource('/api/organisationUnits/:uid/children.json?fields=id,displayName,displayShortName', { uid: '@_uid' }),
    OrgUnit: $resource('/api/organisationUnits')
  }
}
