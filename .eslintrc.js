module.exports = {
	root: true,
	env: {
		node: true,
		es6: true
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		sourceType: 'module',
		parser: 'babel-eslint'
	},
	extends: [
		'@nuxtjs',
		'eslint:recommended',
		'plugin:vue-types/recommended',
		'prettier',
		'prettier/vue',
		'plugin:nuxt/recommended',
		'plugin:prettier/recommended'
	],
	plugins: ['vue'],
	rules: {
		// 'prettier/prettier': 0,
		// 'vue/html-closing-bracket-newline': [
		// 	'error',
		// 	{
		// 		multiline: 'always'
		// 	}
		// ],
		// 'indent': ['off', 2, { SwitchCase: 1 }],
		// 'no-console': 'off',
		// 'vue/require-prop-types': 0,
		// 'vue/max-attributes-per-line': 'off',
		// 'vue/html-self-closing': 'off',
		// 'no-unused-vars': 'off',
		// 'no-sequences': 'off',
		// 'no-unused-expressions': 'off',
		// 'no-extra-parens': 1,
		// 'no-multi-spaces': 2,
		// 'vue/singleline-html-element-content-newline': 'off',
		// 'vue/multiline-html-element-content-newline': 'off'
	}
}
