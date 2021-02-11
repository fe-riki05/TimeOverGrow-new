(window.webpackJsonp = window.webpackJsonp || []).push([
	[6],
	{
		373(t, o, n) {
			let content = n(377)
			typeof content === 'string' && (content = [[t.i, content, '']]), content.locals && (t.exports = content.locals)
			;(0, n(13).default)('ecb09fea', content, !0, { sourceMap: !1 })
		},
		374(t, o, n) {
			'use strict'
			n.r(o)
			const e = n(47)
			const l = {
				methods: {
					googleLogin(t) {
						const o = this
						this.$store
							.dispatch('signInWithGoogle')
							.then(function () {
								o.$router.push({ name: 'index' })
							})
							.catch(function (t) {
								console.error(t),
									(o.$parent.socialLoginErrorMsg = '現在Googleでのログインは使用できません。後ほどお試しください。')
							}),
							console.log(t)
					},
					userLogin() {
						const t = this
						Object(e.a)()
							.signInAnonymously()
							.then(function (o) {
								t.$router.push({ name: 'index' })
							})
							.catch(function (t) {
								const o = t.code
								const n = t.message
								console.error('エラーメッセージ', o, n)
							})
					}
				}
			}
			const r = (n(376), n(67))
			const c = n(83)
			const v = n.n(c)
			const d = n(198)
			const _ = n(357)
			const f = n(609)
			const h = n(186)
			const m = n(365)
			const component = Object(r.a)(
				l,
				function () {
					const t = this
					const o = t.$createElement
					const n = t._self._c || o
					return n(
						'v-row',
						{ attrs: { justify: 'center' } },
						[
							n(
								'v-col',
								{ attrs: { cols: '12', sm: '10', md: '10' } },
								[
									n(
										'v-card',
										[
											n(
												'v-btn',
												{
													staticClass: 'color-google text-capitalize mb-2',
													attrs: { block: '' },
													on: { click: t.googleLogin }
												},
												[
													n('span', { staticClass: 'color-google__icon v-icon notranslate v-icon--left' }, [
														n(
															'svg',
															{
																attrs: {
																	'enable-background': 'new 0 0 46 46',
																	viewBox: '0 0 46 46',
																	xmlns: 'http://www.w3.org/2000/svg'
																}
															},
															[
																n('g', { attrs: { transform: 'translate(14 14)' } }, [
																	n('g', { attrs: { 'clip-rule': 'evenodd', 'fill-rule': 'evenodd' } }, [
																		n('path', {
																			attrs: {
																				d:
																					'm31.1 9.5c0-1.6-.1-3.2-.4-4.7h-21.7v8.9h12.4c-.5 2.9-2.2 5.3-4.6 6.9v5.8h7.4c4.4-4 6.9-9.9 6.9-16.9z',
																				fill: '#4285f4'
																			}
																		}),
																		t._v(' '),
																		n('path', {
																			attrs: {
																				d:
																					'm9 32c6.2 0 11.4-2.1 15.2-5.6l-7.4-5.8c-2.1 1.4-4.7 2.2-7.8 2.2-6 0-11.1-4-12.9-9.5h-7.7v6c3.8 7.5 11.6 12.7 20.6 12.7z',
																				fill: '#34a853'
																			}
																		}),
																		t._v(' '),
																		n('path', {
																			attrs: {
																				d:
																					'm-3.9 13.4c-.4-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4v-6h-7.7c-1.5 3.2-2.4 6.7-2.4 10.4s.9 7.2 2.4 10.3z',
																				fill: '#fbbc05'
																			}
																		}),
																		t._v(' '),
																		n('path', {
																			attrs: {
																				d:
																					'm9-4.9c3.4 0 6.4 1.2 8.8 3.4l6.6-6.5c-4-3.7-9.2-6-15.4-6-9 0-16.8 5.2-20.6 12.7l7.7 6c1.8-5.5 6.9-9.6 12.9-9.6z',
																				fill: '#ea4335'
																			}
																		})
																	]),
																	t._v(' '),
																	n('path', { attrs: { d: 'm-14-14h46v46h-46z', fill: 'none' } })
																])
															]
														)
													]),
													t._v('\n\t\t\t\tGoogleアカウントでログイン\n\t\t\t')
												]
											)
										],
										1
									),
									t._v(' '),
									n(
										'v-card',
										[
											n(
												'v-btn',
												{ staticClass: 'mb-2', attrs: { block: '' }, on: { click: t.userLogin } },
												[
													n('v-icon', { staticClass: 'notranslate v-icon--left theme--light' }, [t._v('mdi-account')]),
													t._v('\n\t\t\t\t匿名アカウントでログイン\n\t\t\t')
												],
												1
											)
										],
										1
									)
								],
								1
							)
						],
						1
					)
				},
				[],
				!1,
				null,
				'1003cf48',
				null
			)
			o.default = component.exports
			v()(component, { VBtn: d.a, VCard: _.a, VCol: f.a, VIcon: h.a, VRow: m.a })
		},
		376(t, o, n) {
			'use strict'
			n(373)
		},
		377(t, o, n) {
			(o = n(12)(!1)).push([t.i, '.color-google__icon>svg[data-v-1003cf48]{position:absolute}', '']), (t.exports = o)
		},
		614(t, o, n) {
			'use strict'
			n.r(o)
			const e = n(543)
			const l = (n.n(e).a.create({ baseURL: 'https://identitytoolkit.googleapis.com/v1' }), n(374))
			const r =
				(n(47),
				{
					components: { SocialLogin: l.default },
					layout: 'signin',
					data() {
						return {
							tab: null,
							login_valid: !0,
							login_email: '',
							login_password: '',
							show_loginpassword: !1,
							loginErrorMsg: '',
							socialLoginErrorMsg: ''
						}
					},
					methods: {
						email_login(t) {
							const o = this
							this.$store
								.dispatch('signInWithEmail', { email: this.login_email, password: this.login_password })
								.then(function () {
									(o.login_email = ''), (o.login_password = ''), o.$router.push({ name: 'index' })
								})
								.catch(function (t) {
									t.code === 'auth/user-disabled'
										? (o.loginErrorMsg = 'このアカウントはロックされています。')
										: (o.loginErrorMsg = 'メールアドレスまたはパスワードが間違っています。')
								}),
								console.log(t)
						}
					}
				})
			const c = n(67)
			const v = n(83)
			const d = n.n(v)
			const _ = n(618)
			const f = n(198)
			const h = n(357)
			const m = n(356)
			const w = n(609)
			const x = n(369)
			const V = n(610)
			const k = n(611)
			const C = n(365)
			const y = n(612)
			const E = n(615)
			const L = n(605)
			const component = Object(c.a)(
				r,
				function () {
					const t = this
					const o = t.$createElement
					const n = t._self._c || o
					return n(
						'v-container',
						[
							n(
								'v-row',
								{ attrs: { justify: 'center' } },
								[
									n(
										'v-col',
										{ attrs: { cols: '12', sm: '8', md: '6' } },
										[
											n('h2', { staticClass: 'text-center subtitle-1 font-weight-bold mb-2' }, [
												t._v('メールアドレスでログイン')
											]),
											t._v(' '),
											n(
												'v-row',
												[
													n(
														'v-col',
														[
															n(
																'v-tabs',
																{
																	staticClass: 'mb-3',
																	attrs: { 'background-color': 'transparent', color: 'blue accent-2', grow: '' },
																	model: {
																		value: t.tab,
																		callback(o) {
																			t.tab = o
																		},
																		expression: 'tab'
																	}
																},
																[
																	n('v-tab', { attrs: { to: '/login' } }, [t._v('ログイン')]),
																	t._v(' '),
																	n('v-tab', { attrs: { to: '/register' } }, [t._v('アカウント登録')])
																],
																1
															),
															t._v(' '),
															n(
																'v-row',
																[
																	n(
																		'v-col',
																		{ attrs: { sm: '12' } },
																		[
																			n(
																				'v-card',
																				{ attrs: { flat: '' } },
																				[
																					n(
																						'v-card-text',
																						{ staticClass: 'pa-0' },
																						[
																							n(
																								'v-form',
																								{
																									ref: 'login_form',
																									attrs: { 'lazy-validation': '' },
																									model: {
																										value: t.login_valid,
																										callback(o) {
																											t.login_valid = o
																										},
																										expression: 'login_valid'
																									}
																								},
																								[
																									n('v-text-field', {
																										attrs: { label: 'メールアドレス', required: '' },
																										model: {
																											value: t.login_email,
																											callback(o) {
																												t.login_email = o
																											},
																											expression: 'login_email'
																										}
																									}),
																									t._v(' '),
																									n('v-text-field', {
																										attrs: {
																											label: 'パスワード',
																											required: '',
																											'append-icon': t.show_loginpassword ? 'mdi-eye' : 'mdi-eye-off',
																											type: t.show_loginpassword ? 'text' : 'password'
																										},
																										on: {
																											'click:append'(o) {
																												t.show_loginpassword = !t.show_loginpassword
																											}
																										},
																										model: {
																											value: t.login_password,
																											callback(o) {
																												t.login_password = o
																											},
																											expression: 'login_password'
																										}
																									}),
																									t._v(' '),
																									t.loginErrorMsg
																										? n('v-alert', { attrs: { dense: '', text: '', type: 'error' } }, [
																												t._v(
																													'\n\t\t\t\t\t\t\t\t\t\t\t' +
																														t._s(t.loginErrorMsg) +
																														'\n\t\t\t\t\t\t\t\t\t\t'
																												)
																										  ])
																										: t._e(),
																									t._v(' '),
																									n(
																										'v-btn',
																										{
																											staticClass: 'my-4 white--text',
																											attrs: { disabled: !t.login_valid, color: 'blue darken-3' },
																											on: {
																												click(o) {
																													return t.email_login()
																												}
																											}
																										},
																										[t._v('\n\t\t\t\t\t\t\t\t\t\t\tログイン\n\t\t\t\t\t\t\t\t\t\t')]
																									)
																								],
																								1
																							)
																						],
																						1
																					)
																				],
																				1
																			)
																		],
																		1
																	)
																],
																1
															),
															t._v(' '),
															n('v-divider', { staticClass: 'my-8' }),
															t._v(' '),
															n(
																'v-row',
																[
																	n('v-col', { attrs: { sm: '12' } }, [
																		n('h2', { staticClass: 'text-center subtitle-1 font-weight-bold mb-2' }, [
																			t._v('その他のアカウントでログイン')
																		])
																	])
																],
																1
															),
															t._v(' '),
															t.socialLoginErrorMsg
																? n('v-alert', { attrs: { dense: '', text: '', type: 'error', dismissible: '' } }, [
																		t._v('\n\t\t\t\t\t\t' + t._s(t.socialLoginErrorMsg) + '\n\t\t\t\t\t')
																  ])
																: t._e(),
															t._v(' '),
															n('SocialLogin')
														],
														1
													)
												],
												1
											)
										],
										1
									)
								],
								1
							)
						],
						1
					)
				},
				[],
				!1,
				null,
				null,
				null
			)
			o.default = component.exports
			d()(component, { SocialLogin: n(374).default }),
				d()(component, {
					VAlert: _.a,
					VBtn: f.a,
					VCard: h.a,
					VCardText: m.a,
					VCol: w.a,
					VContainer: x.a,
					VDivider: V.a,
					VForm: k.a,
					VRow: C.a,
					VTab: y.a,
					VTabs: E.a,
					VTextField: L.a
				})
		}
	}
])
