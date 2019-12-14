module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env":{
        "browser":true
    },
    "plugins":[
        "react",
        "jsx-a11y",
        "import",
        'babel'
    ],
    "rules" :{
        "comma-dangle": ["off"],
        "no-plusplus": ["off"],
        "no-await-in-loop": ["off"],
        "no-console":["error",{"allow":["warn","error"]}],
        "indent": ["error", 4],
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prop-types":"off",
        "prefer-destructuring": ["off"],
        "consistent-return": ["off"],
        "react/no-array-index-key": ["warn"],
        "max-len": ["warn"],
        "react/require-default-props": ["warn"],
        "no-param-reassign": ["warn"],
        "no-mixed-operators": ["warn"]
    }
}
