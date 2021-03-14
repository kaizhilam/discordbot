module.exports = {
  "presets": [
    [
      "@babel/env",
      {
        "useBuiltIns": "entry",
        "corejs": "3.0.0",
        targets: {
          node: "current"
        }
      }
    ],
    "@babel/typescript"
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
};