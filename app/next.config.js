// const withImages = require('next-images');
// const path = require("path");
// const withSass = require("@zeit/next-sass");

// module.exports = require("@react-three/drei");

const withTM = require('next-transpile-modules')(['@react-three/drei', 'three']); // pass the modules you would like to see transpiled

module.exports = withTM();