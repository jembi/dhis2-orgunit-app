'use strict'

module.exports = function () {
  var state = {}
  return {
    setOrgunit: function (orgunit) {
      state.orgunit = orgunit
    },
    getOrgunit: function () {
      return state.orgunit
    },
    setParent: function (parent) {
      state.parent = parent
    },
    getParent: function () {
      return state.parent
    }
  }
}
