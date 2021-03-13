module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: ['prettier/vue', 'plugin:prettier/recommended'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': ['error', { semi: true }],
		'vue/html-closing-bracket-newline': 'off',
		'no-unused-vars': 'off',
		'no-multi-spaces': 2,
		'import/no-named-as-default-member': 'off',
		'no-console': 'off'
	}
};
