module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'syntax-export-extensions',
    '@babel/plugin-transform-runtime',
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    ["import", { "libraryName": "antd" }]
  ],
  ignore: ['node_modules', 'build']
}
