'use strict'
var app = require('angular').module('dhisOrgUnitApp')

app.controller('hierarchyCtrl', require('./hierarchy'))
app.controller('AddSiteCtrl', require('./add-site'))
app.controller('MatchCtrl', require('./match'))
