const withTM = require('next-transpile-modules')([
  'dat.gui',
  'three',
  '@react-three/drei'
],)


module.exports = withTM()