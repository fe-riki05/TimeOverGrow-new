export default {
	head: {
		title: 'TimeOverGrow',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	router: {
		middleware: 'authenticated',
	},
	modules: ['@nuxtjs/vuetify'],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
			},
		],
	},
	plugins: ['~/plugins/firebase.js', '~/plugins/firebase.auth.js'],
	components: true,
	buildModules: ['@nuxtjs/eslint-module'],
	build: {
		publicPath: '/assets/',
		buildDir: 'nuxt-dist',
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.devtool = 'inline-cheap-module-source-map'
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/,
					options: {
						fix: true,
					},
				})
			}
		},
	},
	performance: {
		hints: false,
	},
	ssr: false,
	target: 'server',
}
