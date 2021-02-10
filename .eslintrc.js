module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: [
		'@nuxtjs/eslint-config',
		'prettier',
		'prettier/vue',
		'eslint:recommended',
		'plugin:vue/recommended',
		'plugin:nuxt/recommended'
		// 'plugin:prettier/recommended',
	],
	// *.vue ファイルを lint にかけるために必要
	// plugins: [vue],
	// ここにカスタムルールを追加します。
	rules: {
		// 'prettier/prettier': [
		// 	{
		// 'semi': [2, 'never'],
		'semi': 'off',
		'vue/html-indent': ['off', 2],
		'no-console': 'off', // console.log();OK
		'no-unused-vars': 'off', // 使っていない変数あってもOK
		'vue/html-self-closing': 'off', // imgタグのようにタグが１つで完結してもOK
		'vue/max-attributes-per-line': 'off',
		'indent': ['off', 'tab'],
		'vue/html-closing-bracket-newline': [
			'error',
			{
				multiline: 'always'
			}
		]
		// 	}
		// ]
	}
};
// module.exports = {
// 	root: true,
// 	env: {
// 		node: true,
// 		es6: true
// 	},
// 	// parser: 'vue-eslint-parser',
// 	parserOptions: {
// 		sourceType: 'module',
// 		parser: 'babel-eslint'
// 	},
// 	extends: [
// 		// '@nuxtjs',
// 		'eslint:recommended',
// 		// 'prettier',
// 		'plugin:vue/recommended',
// 		'plugin:prettier/recommended'
// 		// 'prettier/vue'
// 		// 'plugin:nuxt/recommended',
// 	],
// 	plugins: ['vue'],
// 	rules: {
// 		// 'prettier/prettier': 0,
// 		// 'vue/html-closing-bracket-newline': [
// 		// 	'error',
// 		// 	{
// 		// 		multiline: 'always'
// 		// 	}
// 		// ],
// 		// 'indent': ['off', 2, { SwitchCase: 1 }],
// 		// 'no-console': 'off',
// 		// 'vue/require-prop-types': 0,
// 		// 'vue/max-attributes-per-line': 'off',
// 		// 'vue/html-self-closing': 'off',
// 		// 'no-unused-vars': 'off',
// 		// 'no-sequences': 'off',
// 		// 'no-unused-expressions': 'off',
// 		// 'no-extra-parens': 1,
// 		// 'no-multi-spaces': 2,
// 		// 'vue/singleline-html-element-content-newline': 'off',
// 		// 'vue/multiline-html-element-content-newline': 'off'
// 	}
// }
