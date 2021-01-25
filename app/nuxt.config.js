export default {
	router: {
		middleware: 'authenticated'
	},
	modules: ['@nuxtjs/vuetify'],
	head: {
		title: 'time-over-grow',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' }
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},
	// css: [],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				// ローダーの対象 // 拡張子 .js の場合
				test: /\.js$/
			}
		]
	},

	// ここは削除しても良いかも
	plugins: [
		'~/plugins/firebase.js',
		'~/plugins/firebase.auth.js',
		{
			src: '@/plugins/plugin'
		}
	],

	components: true,
	buildModules: ['@nuxtjs/eslint-module'],
	build: {
		publicPath: '/assets/',
		buildDir: 'nuxt-dist',
		extend(config, ctx) {
			config.module.rules.push({
				enforce: 'pre',
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				exclude: /(node_modules)/,
				options: {
					fix: true
				}
			})
		}
	},
	performance: {
		hints: false
	},
	ssr: false
}
