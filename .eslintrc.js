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
		'eslint:recommended',
		'@nuxtjs/eslint-config',
		'prettier',
		'prettier/vue',
		'plugin:vue/recommended',
		'plugin:nuxt/recommended'
	],
	plugins: ['prettier'],
	rules: {
		// 'prettier/prettier': [
		// 	'error',{
		semi: 'off',
		'vue/html-indent': ['off', 2],
		'no-console': 0, // console.log();OK
		'no-unused-vars': 'off', // 使っていない変数あってもOK
		// 'vue/html-self-closing': 'off', // imgタグのようにタグが１つで完結してもOK
		// 'vue/max-attributes-per-line': 'off',
		indent: ['off', 'tab']
		// 'vue/html-closing-bracket-newline': [
		// 	'off',
		// 	{
		// 		multiline: 'always'
		// 	}
		// ]
		// 	}
		// ]
	}
};
