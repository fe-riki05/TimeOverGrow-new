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
		// '@nuxtjs',
		// 'plugin:prettier/recommended',
		// 'eslint:recommended',
		// 'prettier/vue',
		// 'eslint-config-prettier',
		// 'prettier',
		// 'prettier/prettier',
		// 'plugin:nuxt/recommended',
		// 'plugin:prettier/recommended'
		// 'prettier'
		// 'prettier/vue'
		// '@nuxtjs',
		// 'prettier',
		'prettier/vue',
		'plugin:prettier/recommended'
		// 'plugin:nuxt/recommended'
	],
	plugins: [],
	rules: {
		'prettier/prettier': ['error', { semi: false }],
		'vue/html-closing-bracket-newline': 'off',
		// 'vue/max-attributes-per-line': 'off',
		'no-unused-vars': 'off',
		//   'no-extra-parens': 1, // 不要なカッコは消す
		'no-multi-spaces': 2, // 無駄なスペースは削除
		'import/no-named-as-default-member': 'off',
		'no-console': 0 // console.log();OK
	}
}
