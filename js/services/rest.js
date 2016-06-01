'use strict'

module.exports = function($rootScope, $resource) {
  return {
    OrgUnitRoot: $resource('/api/organisationUnits.json?paging=false&level=1'),
    OrgUnitChildren: $resource('/api/organisationUnits/:uid/children.json?fields=id,displayName,displayShortName', { uid: '@_uid' }),
    OrgUnit: $resource('/api/organisationUnits'),
    Match: $resource('http://localhost:1337/localhost:9085/registry/fhir/Location?_query=match')
  }
}
