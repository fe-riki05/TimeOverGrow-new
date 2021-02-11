(window.webpackJsonp = window.webpackJsonp || []).push([
	[7],
	{
		373(t, e, r) {
			let content = r(377)
			typeof content === 'string' && (content = [[t.i, content, '']]), content.locals && (t.exports = content.locals)
			;(0, r(13).default)('ecb09fea', content, !0, { sourceMap: !1 })
		},
		374(t, e, r) {
			'use strict'
			r.r(e)
			const o = r(47)
			const n = {
				methods: {
					googleLogin(t) {
						const e = this
						this.$store
							.dispatch('signInWithGoogle')
							.then(function () {
								e.$router.push({ name: 'index' })
							})
							.catch(function (t) {
								console.error(t),
									(e.$parent.socialLoginErrorMsg = '現在Googleでのログインは使用できません。後ほどお試しください。')
							}),
							console.log(t)
					},
					userLogin() {
						const t = this
						Object(o.a)()
							.signInAnonymously()
							.then(function (e) {
								t.$router.push({ name: 'index' })
							})
							.catch(function (t) {
								const e = t.code
								const r = t.message
								console.error('エラーメッセージ', e, r)
							})
					}
				}
			}
			const l = (r(376), r(67))
			const c = r(83)
			const d = r.n(c)
			const v = r(198)
			const _ = r(357)
			const f = r(609)
			const h = r(186)
			const m = r(365)
			const component = Object(l.a)(
				n,
				function () {
					const t = this
					const e = t.$createElement
					const r = t._self._c || e
					return r(
						'v-row',
						{ attrs: { justify: 'center' } },
						[
							r(
								'v-col',
								{ attrs: { cols: '12', sm: '10', md: '10' } },
								[
									r(
										'v-card',
										[
											r(
												'v-btn',
												{
													staticClass: 'color-google text-capitalize mb-2',
													attrs: { block: '' },
													on: { click: t.googleLogin }
												},
												[
													r('span', { staticClass: 'color-google__icon v-icon notranslate v-icon--left' }, [
														r(
															'svg',
															{
																attrs: {
																	'enable-background': 'new 0 0 46 46',
																	viewBox: '0 0 46 46',
																	xmlns: 'http://www.w3.org/2000/svg'
																}
															},
															[
																r('g', { attrs: { transform: 'translate(14 14)' } }, [
																	r('g', { attrs: { 'clip-rule': 'evenodd', 'fill-rule': 'evenodd' } }, [
																		r('path', {
																			attrs: {
																				d:
																					'm31.1 9.5c0-1.6-.1-3.2-.4-4.7h-21.7v8.9h12.4c-.5 2.9-2.2 5.3-4.6 6.9v5.8h7.4c4.4-4 6.9-9.9 6.9-16.9z',
																				fill: '#4285f4'
																			}
																		}),
																		t._v(' '),
																		r('path', {
																			attrs: {
																				d:
																					'm9 32c6.2 0 11.4-2.1 15.2-5.6l-7.4-5.8c-2.1 1.4-4.7 2.2-7.8 2.2-6 0-11.1-4-12.9-9.5h-7.7v6c3.8 7.5 11.6 12.7 20.6 12.7z',
																				fill: '#34a853'
																			}
																		}),
																		t._v(' '),
																		r('path', {
																			attrs: {
																				d:
																					'm-3.9 13.4c-.4-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4v-6h-7.7c-1.5 3.2-2.4 6.7-2.4 10.4s.9 7.2 2.4 10.3z',
																				fill: '#fbbc05'
																			}
																		}),
																		t._v(' '),
																		r('path', {
																			attrs: {
																				d:
																					'm9-4.9c3.4 0 6.4 1.2 8.8 3.4l6.6-6.5c-4-3.7-9.2-6-15.4-6-9 0-16.8 5.2-20.6 12.7l7.7 6c1.8-5.5 6.9-9.6 12.9-9.6z',
																				fill: '#ea4335'
																			}
																		})
																	]),
																	t._v(' '),
																	r('path', { attrs: { d: 'm-14-14h46v46h-46z', fill: 'none' } })
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
									r(
										'v-card',
										[
											r(
												'v-btn',
												{ staticClass: 'mb-2', attrs: { block: '' }, on: { click: t.userLogin } },
												[
													r('v-icon', { staticClass: 'notranslate v-icon--left theme--light' }, [t._v('mdi-account')]),
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
			e.default = component.exports
			d()(component, { VBtn: v.a, VCard: _.a, VCol: f.a, VIcon: h.a, VRow: m.a })
		},
		376(t, e, r) {
			'use strict'
			r(373)
		},
		377(t, e, r) {
			(e = r(12)(!1)).push([t.i, '.color-google__icon>svg[data-v-1003cf48]{position:absolute}', '']), (t.exports = e)
		},
		616(t, e, r) {
			'use strict'
			r.r(e)
			const main = r(581)
			const o = r.n(main)
			const n = r(374)
			const l =
				(r(47),
				{
					components: { SocialLogin: n.default },
					layout: 'signin',
					data() {
						const t = this
						return {
							registerErrorMsg: '',
							tab: null,
							register_valid: !0,
							register_email: '',
							register_password: '',
							register_password_again: '',
							emailRules: [
								function (t) {
									return !t || /.+@.+\..+/.test(t) || '有効なメールアドレスを入力してください'
								}
							],
							register_passwordRules: [
								function (t) {
									return !!t || 'パスワードを入力してください'
								},
								function (t) {
									return o()(t).score >= 3 || '大文字・小文字・数字・記号を混ぜた強いパスワードにしてください'
								}
							],
							register_passwordAgainRules: [
								function (e) {
									return !e || t.$refs.register_password.value === e || 'パスワードと一致しません'
								}
							],
							show_registerPassword: !1
						}
					},
					computed: {
						progress() {
							return this.score.value
						},
						score() {
							switch (o()(this.register_password).score) {
								case 4:
									return { color: 'green', value: 100 }
								case 3:
									return { color: 'light-green lighten-1', value: 75 }
								case 2:
									return { color: 'amber accent-2', value: 50 }
								case 1:
									return { color: 'deep-orange lighten-1', value: 25 }
								default:
									return { color: 'red darken-3', value: 0 }
							}
						}
					},
					methods: {
						email_register() {
							const t = this
							this.$refs.register_form.validate() &&
								(this.$store
									.dispatch('signUp', { email: this.register_email, password: this.register_password })
									.then(function () {
										(t.register_email = ''),
											(t.register_password = ''),
											t.$router.push({
												name: 'index',
												params: { dashboard_msg: !0, dashboard_msg_text: 'アカウントの登録が完了しました。' }
											})
									})
									.catch(function (e) {
										console.error(e),
											e.code === 'auth/email-already-in-use'
												? (t.registerErrorMsg = 'このメールアドレスは既に登録されています。')
												: e.code === 'auth/invalid-email'
												? (t.registerErrorMsg = '無効なメールアドレスです。')
												: (t.registerErrorMsg = 'エラーにより登録できませんでした。')
									}),
								(this.email = ''),
								(this.password = ''))
						}
					}
				})
			const c = r(67)
			const d = r(83)
			const v = r.n(d)
			const _ = r(618)
			const f = r(198)
			const h = r(357)
			const m = r(356)
			const w = r(609)
			const x = r(369)
			const k = r(610)
			const y = r(611)
			const V = r(188)
			const C = r(365)
			const P = r(612)
			const $ = r(615)
			const E = r(605)
			const component = Object(c.a)(
				l,
				function () {
					const t = this
					const e = t.$createElement
					const r = t._self._c || e
					return r(
						'v-container',
						[
							r(
								'v-row',
								{ attrs: { justify: 'center' } },
								[
									r(
										'v-col',
										{ attrs: { cols: '12', sm: '8', md: '6' } },
										[
											r('h2', { staticClass: 'text-center subtitle-1 font-weight-bold mb-2' }, [
												t._v('メールアドレスで登録')
											]),
											t._v(' '),
											r(
												'v-row',
												[
													r(
														'v-col',
														[
															r(
																'v-tabs',
																{
																	staticClass: 'mb-3',
																	attrs: { 'background-color': 'transparent', color: 'blue accent-2', grow: '' },
																	model: {
																		value: t.tab,
																		callback(e) {
																			t.tab = e
																		},
																		expression: 'tab'
																	}
																},
																[
																	r('v-tab', { attrs: { to: '/login' } }, [t._v(' ログイン ')]),
																	t._v(' '),
																	r('v-tab', { attrs: { to: '/register' } }, [t._v('アカウント登録 ')])
																],
																1
															),
															t._v(' '),
															r(
																'v-row',
																[
																	r(
																		'v-col',
																		{ attrs: { sm: '12' } },
																		[
																			r(
																				'v-card',
																				{ attrs: { flat: '' } },
																				[
																					r(
																						'v-card-text',
																						{ staticClass: 'pa-0' },
																						[
																							r(
																								'v-form',
																								{
																									ref: 'register_form',
																									attrs: { 'lazy-validation': '' },
																									model: {
																										value: t.register_valid,
																										callback(e) {
																											t.register_valid = e
																										},
																										expression: 'register_valid'
																									}
																								},
																								[
																									r('v-text-field', {
																										attrs: {
																											label: 'メールアドレス',
																											rules: t.emailRules,
																											required: '',
																											'validate-on-blur': ''
																										},
																										model: {
																											value: t.register_email,
																											callback(e) {
																												t.register_email = e
																											},
																											expression: 'register_email'
																										}
																									}),
																									t._v(' '),
																									r('v-text-field', {
																										ref: 'register_password',
																										attrs: {
																											label: 'パスワード',
																											required: '',
																											'append-icon': t.show_registerPassword
																												? 'mdi-eye'
																												: 'mdi-eye-off',
																											type: t.show_registerPassword ? 'text' : 'password',
																											rules: t.register_passwordRules,
																											'validate-on-blur': '',
																											loading: ''
																										},
																										on: {
																											'click:append'(e) {
																												t.show_registerPassword = !t.show_registerPassword
																											}
																										},
																										scopedSlots: t._u([
																											{
																												key: 'progress',
																												fn() {
																													return [
																														r('v-progress-linear', {
																															attrs: {
																																value: t.score.value,
																																color: t.score.color,
																																absolute: '',
																																height: '2'
																															}
																														})
																													]
																												},
																												proxy: !0
																											}
																										]),
																										model: {
																											value: t.register_password,
																											callback(e) {
																												t.register_password = e
																											},
																											expression: 'register_password'
																										}
																									}),
																									t._v(' '),
																									r('v-text-field', {
																										attrs: {
																											label: 'パスワード（確認）',
																											required: '',
																											'append-icon': t.show_registerPassword
																												? 'mdi-eye'
																												: 'mdi-eye-off',
																											type: t.show_registerPassword ? 'text' : 'password',
																											'validate-on-blur': '',
																											rules: t.register_passwordAgainRules
																										},
																										on: {
																											'click:append'(e) {
																												t.show_registerPassword = !t.show_registerPassword
																											}
																										},
																										model: {
																											value: t.register_password_again,
																											callback(e) {
																												t.register_password_again = e
																											},
																											expression: 'register_password_again'
																										}
																									}),
																									t._v(' '),
																									t.registerErrorMsg
																										? r('v-alert', { attrs: { dense: '', text: '', type: 'error' } }, [
																												t._v(
																													'\n\t\t\t\t\t\t\t\t\t\t\t' +
																														t._s(t.registerErrorMsg) +
																														'\n\t\t\t\t\t\t\t\t\t\t'
																												)
																										  ])
																										: t._e(),
																									t._v(' '),
																									r(
																										'v-btn',
																										{
																											staticClass: 'mr-4 white--text',
																											attrs: { disabled: !t.register_valid, color: 'blue darken-3' },
																											on: {
																												click(e) {
																													return t.email_register()
																												}
																											}
																										},
																										[t._v('\n\t\t\t\t\t\t\t\t\t\t\t登録\n\t\t\t\t\t\t\t\t\t\t')]
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
															r('v-divider', { staticClass: 'my-8' }),
															t._v(' '),
															r(
																'v-row',
																[
																	r('v-col', { attrs: { sm: '12' } }, [
																		r('h2', { staticClass: 'text-center subtitle-1 font-weight-bold mb-2' }, [
																			t._v('その他のアカウントでログイン')
																		])
																	])
																],
																1
															),
															t._v(' '),
															r('SocialLogin')
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
			e.default = component.exports
			v()(component, { SocialLogin: r(374).default }),
				v()(component, {
					VAlert: _.a,
					VBtn: f.a,
					VCard: h.a,
					VCardText: m.a,
					VCol: w.a,
					VContainer: x.a,
					VDivider: k.a,
					VForm: y.a,
					VProgressLinear: V.a,
					VRow: C.a,
					VTab: P.a,
					VTabs: $.a,
					VTextField: E.a
				})
		}
	}
])
