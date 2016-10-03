'use strict'
var app = require('angular').module('dhisOrgUnitApp')

app.directive('orgUnitHierarchy', require('./org-unit-hierarchy'))
app.directive('orgUnitHierarchyNested', require('./org-unit-hierarchy-nested'))
