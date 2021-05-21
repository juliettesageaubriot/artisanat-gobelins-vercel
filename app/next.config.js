const withTM = require('next-transpile-modules')([
  'dat.gui',
  'three',
])

module.exports = withTM({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|frag|vert)$/,
      use: [
        require.resolve('raw-loader'),
        require.resolve('glslify-loader'),
      ]
    },)

    return config
  },
})
