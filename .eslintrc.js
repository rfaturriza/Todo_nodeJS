module.exports = {
	env: {
		commonjs: true,
		es6: false,
		node: true
	},
	extends: 'eslint:recommended',
	globals: {},
	parserOptions: {
		ecmaVersion: 2018
	},
	rules: {
		indent: [ 'error', 'tab' ],
		'linebreak-style': [ 'error', 'unix' ],
		quotes: [ 'error', 'single' ],
		semi: [ 'error', 'always' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'object-curly-spacing': [ 'error', 'always' ],
		'space-in-parens': [ 'error', 'always' ]
	}
};
   