module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parser: 'vue-eslint-parser', // parserをvue用に指定
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: [
		// '@nuxtjs/eslint-config',
		'eslint:recommended',
		'plugin:vue/recommended',
		// "plugin:nuxt/recommended",
		'plugin:prettier/recommended',
		'prettier',
		'prettier/vue'
		// 'plugin:vue/recommended',
		// 'prettier/vue',
	],
	plugins: ['vue', 'prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				// 'no-extra-parens': 1, // 不要なカッコは消す
				'no-multi-spaces': 2, // 無駄なスペースは削除
				semi: true,
				singleQuote: true,
				quotes: [2, 'single'], // 文字列はシングルクオートのみ
				'vue/html-indent': ['off', 2],
				'no-console': 0, // console.log();OK
				'no-unused-vars': 'off', // 使っていない変数あってもOK
				// 'keyword-spacing': 2, // キーワードの前後には適切なスペースを
				'no-var': 2, // varは禁止
				'no-unneeded-ternary': 2, // true/falseを無駄に使うな
				// 'vue/html-self-closing': 'off', // imgタグのようにタグが１つで完結してもOK
				// 'space-in-parens': [2, 'never'],
				// 'vue/max-attributes-per-line': 'off',
				indent: [2, 'tab'],
				'vue/no-lone-template': [
					'error',
					{
						ignoreAccessible: false
					}
				],
				'vue/html-closing-bracket-newline': [
					'error',
					{
						singleline: 'never',
						multiline: 'always'
					}
				]
			}
		]
	}
};
