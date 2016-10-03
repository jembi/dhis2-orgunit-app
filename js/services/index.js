'use strict'
var app = require('angular').module('dhisOrgUnitApp')

app.factory('Api', require('./rest'))
app.factory('State', require('./state'))
