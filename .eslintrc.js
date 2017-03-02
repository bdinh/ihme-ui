module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "react", "import", "jsx-a11y"
  ],
  "rules": {
    "comma-dangle": 0,
    "no-underscore-dangle": [2, { "allowAfterThis": true }],
    "arrow-body-style": [1, "as-needed"],
    "max-len": [2, 100, 2, { "ignoreUrls": true, "ignoreComments": true }],
    "no-void": 0,
    "react/forbid-prop-types": [2, { "forbid": ['any']}]
  },
  "env": {
    "mocha": true
  },
  "ecmaFeatures": {
    "experimentalObjectRestSpread": true
  },
  "globals": {
    "window": true,
    "navigator": true
  }
};
