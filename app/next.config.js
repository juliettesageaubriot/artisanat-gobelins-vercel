const withTM = require('next-transpile-modules')([
  'dat.gui',
  'three',
])

module.exports = withTM()