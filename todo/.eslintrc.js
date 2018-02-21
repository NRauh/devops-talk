module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [2, { "extensions": [".js", ".jsx"] }],
        "react/prefer-stateless-function": [0, { "ignorePureComponents": true }]
    },
    "globals": {
        "it": true,
        "expect": true,
        "describe": true,
        "beforeEach": true,
        "jest": true,
        "document": true
    }
};